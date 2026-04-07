"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import type { AdminViewer } from "@/lib/auth/roles";
import { normalizeOptionalText } from "@/lib/blogs/content";
import { normalizeCareerDescription } from "@/lib/careers/content";
import type {
  CareerEditorActionState,
  CareerFieldName,
} from "@/lib/careers/form-state";
import {
  assertCanArchiveCareerPosting,
  assertCanCreateCareerPosting,
  assertCanEditCareerPosting,
  assertCanPublishCareerPosting,
} from "@/lib/careers/permissions";
import {
  EMPLOYMENT_TYPE_OPTIONS,
  EXPERIENCE_LEVEL_OPTIONS,
  WORK_MODE_OPTIONS,
} from "@/lib/careers/options";
import { resolveUniqueJobSlug } from "@/lib/careers/slug";
import {
  archiveJob,
  createJobDraft,
  getEditableJobById,
  publishJob,
  updateJob,
} from "@/lib/data/jobs";
import type { JobStatus, SalaryPeriod } from "@/lib/data/types";

const SALARY_PERIOD_OPTIONS = ["hour", "month", "year"] as const satisfies readonly SalaryPeriod[];

function getSafeRedirectTarget(value: FormDataEntryValue | null) {
  if (typeof value === "string" && value.startsWith("/admin/careers")) {
    return value;
  }

  return "/admin/careers";
}

function buildRedirectWithNotice(
  pathname: string,
  notice: string,
  kind: "error" | "success" = "success",
) {
  const searchParams = new URLSearchParams();
  searchParams.set("notice", notice);
  searchParams.set("kind", kind);
  return `${pathname}?${searchParams.toString()}`;
}

async function requireViewerOrRedirect() {
  const viewer = await getAuthenticatedAdmin();

  if (!viewer) {
    redirect("/admin/login?next=%2Fadmin%2Fcareers");
  }

  return viewer;
}

function normalizeEnumValue<T extends string>(
  value: FormDataEntryValue | null,
  allowedValues: readonly T[],
) {
  return typeof value === "string" && allowedValues.includes(value as T)
    ? (value as T)
    : null;
}

function normalizeSalaryNumber(
  value: FormDataEntryValue | null,
  fieldErrors: Partial<Record<CareerFieldName, string>>,
  fieldName: "salaryMin" | "salaryMax",
) {
  const normalizedValue = normalizeOptionalText(value);

  if (!normalizedValue) {
    return null;
  }

  const parsedValue = Number(normalizedValue);

  if (!Number.isFinite(parsedValue) || parsedValue < 0) {
    fieldErrors[fieldName] = "Enter a valid number.";
    return null;
  }

  return parsedValue;
}

function normalizeApplicationDeadline(
  value: FormDataEntryValue | null,
  fieldErrors: Partial<Record<CareerFieldName, string>>,
) {
  const normalizedValue = normalizeOptionalText(value);

  if (!normalizedValue) {
    return null;
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalizedValue)) {
    fieldErrors.applicationDeadline = "Choose a valid deadline date.";
    return null;
  }

  const isoValue = `${normalizedValue}T23:59:59.999Z`;
  const parsedDate = new Date(isoValue);

  if (Number.isNaN(parsedDate.getTime())) {
    fieldErrors.applicationDeadline = "Choose a valid deadline date.";
    return null;
  }

  return parsedDate.toISOString();
}

async function buildValidatedJobPayload(
  viewer: AdminViewer,
  formData: FormData,
  options: {
    existingJobId?: string;
    lockSlug?: boolean;
  },
) {
  const fieldErrors: Partial<Record<CareerFieldName, string>> = {};
  const title = normalizeOptionalText(formData.get("title"));
  const summary = normalizeOptionalText(formData.get("summary"));
  const description = normalizeCareerDescription(formData.get("descriptionText"));
  const locationText = normalizeOptionalText(formData.get("locationText"));
  const employmentType = normalizeEnumValue(
    formData.get("employmentType"),
    EMPLOYMENT_TYPE_OPTIONS,
  );
  const workMode = normalizeEnumValue(formData.get("workMode"), WORK_MODE_OPTIONS);
  const experienceLevel = normalizeEnumValue(
    formData.get("experienceLevel"),
    EXPERIENCE_LEVEL_OPTIONS,
  );
  const salaryMin = normalizeSalaryNumber(formData.get("salaryMin"), fieldErrors, "salaryMin");
  const salaryMax = normalizeSalaryNumber(formData.get("salaryMax"), fieldErrors, "salaryMax");
  const salaryCurrency = normalizeOptionalText(formData.get("salaryCurrency"))?.toUpperCase() ?? null;
  const salaryPeriod = normalizeEnumValue(
    formData.get("salaryPeriod"),
    SALARY_PERIOD_OPTIONS,
  );
  const applicationDeadline = normalizeApplicationDeadline(
    formData.get("applicationDeadline"),
    fieldErrors,
  );
  const isFeatured = formData.get("isFeatured") === "on";

  if (!title) {
    fieldErrors.title = "Enter the role title.";
  }

  if (!summary) {
    fieldErrors.summary = "Enter a short summary.";
  }

  if (!description.descriptionHtml) {
    fieldErrors.descriptionText = "Enter the job description.";
  }

  if (!locationText) {
    fieldErrors.locationText = "Enter the job location.";
  }

  if (!employmentType) {
    fieldErrors.employmentType = "Choose the employment type.";
  }

  if (!workMode) {
    fieldErrors.workMode = "Choose the work mode.";
  }

  if (!experienceLevel) {
    fieldErrors.experienceLevel = "Choose the experience level.";
  }

  if (salaryMin !== null && salaryMax !== null && salaryMax < salaryMin) {
    fieldErrors.salaryMax = "Maximum salary must be greater than or equal to minimum salary.";
  }

  if ((salaryMin !== null || salaryMax !== null) && !salaryCurrency) {
    fieldErrors.salaryCurrency = "Add a salary currency when salary values are provided.";
  }

  if ((salaryMin !== null || salaryMax !== null) && !salaryPeriod) {
    fieldErrors.salaryPeriod = "Choose a salary period when salary values are provided.";
  }

  const requestedSlug = normalizeOptionalText(formData.get("slug")) ?? title ?? "";
  const resolvedSlug = options.lockSlug
    ? normalizeOptionalText(formData.get("existingSlug"))
    : await resolveUniqueJobSlug(requestedSlug, {
        excludeJobId: options.existingJobId,
      });

  if (!resolvedSlug) {
    fieldErrors.slug = "A valid slug is required.";
  }

  if (Object.keys(fieldErrors).length > 0 || !title || !summary || !resolvedSlug) {
    return {
      fieldErrors,
      formError: "Fix the highlighted fields and try again.",
      payload: null,
      viewer,
    };
  }

  return {
    fieldErrors,
    formError: null,
    payload: {
      applicationDeadline,
      descriptionHtml: description.descriptionHtml,
      employmentType,
      experienceLevel,
      isFeatured,
      locationText,
      salaryCurrency,
      salaryMax,
      salaryMin,
      salaryPeriod,
      slug: resolvedSlug,
      summary,
      title,
      updatedBy: viewer.id,
      workMode,
    },
    viewer,
  };
}

function getSaveStatus(existingStatus: JobStatus): JobStatus {
  if (existingStatus === "published") {
    return "published";
  }

  if (existingStatus === "archived") {
    return "archived";
  }

  return "draft";
}

function revalidateCareerPaths(job?: { id?: string | null; slug?: string | null }) {
  revalidatePath("/admin/careers");
  revalidatePath("/admin/careers/new");
  revalidatePath("/careers");

  if (job?.id) {
    revalidatePath(`/admin/careers/${job.id}/edit`);
  }

  if (job?.slug) {
    revalidatePath(`/careers/${job.slug}`);
  }
}

export async function createCareerPostingAction(
  _previousState: CareerEditorActionState,
  formData: FormData,
) {
  const viewer = await requireViewerOrRedirect();
  assertCanCreateCareerPosting(viewer);

  const validation = await buildValidatedJobPayload(viewer, formData, {});

  if (!validation.payload) {
    return {
      fieldErrors: validation.fieldErrors,
      formError: validation.formError,
    };
  }

  const job = await createJobDraft({
    ...validation.payload,
    createdBy: viewer.id,
  });

  revalidateCareerPaths(job);

  redirect(
    buildRedirectWithNotice(`/admin/careers/${job.id}/edit`, "Draft created."),
  );
}

export async function updateCareerPostingAction(
  jobId: string,
  _previousState: CareerEditorActionState,
  formData: FormData,
) {
  const viewer = await requireViewerOrRedirect();
  const existingJob = await getEditableJobById(jobId);

  if (!existingJob) {
    return {
      fieldErrors: {},
      formError: "This career posting no longer exists.",
    };
  }

  assertCanEditCareerPosting(viewer, existingJob);

  const intent = formData.get("intent") === "publish" ? "publish" : "save";
  const validation = await buildValidatedJobPayload(viewer, formData, {
    existingJobId: jobId,
    lockSlug: existingJob.status === "published",
  });

  if (!validation.payload) {
    return {
      fieldErrors: validation.fieldErrors,
      formError: validation.formError,
    };
  }

  if (intent === "publish") {
    assertCanPublishCareerPosting(viewer);
    const publishedJob = await publishJob(jobId, validation.payload);
    revalidateCareerPaths(publishedJob);
    redirect(buildRedirectWithNotice("/admin/careers", "Career posting published."));
  }

  const updatedJob = await updateJob(jobId, {
    ...validation.payload,
    status: getSaveStatus(existingJob.status),
  });

  revalidateCareerPaths(updatedJob);

  redirect(
    buildRedirectWithNotice(
      `/admin/careers/${updatedJob.id}/edit`,
      "Changes saved.",
    ),
  );
}

export async function archiveCareerPostingAction(
  jobId: string,
  redirectTo = "/admin/careers",
) {
  const viewer = await requireViewerOrRedirect();
  const existingJob = await getEditableJobById(jobId);

  if (!existingJob) {
    redirect(
      buildRedirectWithNotice(
        getSafeRedirectTarget(redirectTo),
        "This career posting no longer exists.",
        "error",
      ),
    );
  }

  assertCanArchiveCareerPosting(viewer);
  const archivedJob = await archiveJob(jobId, {
    updatedBy: viewer.id,
  });
  revalidateCareerPaths(archivedJob);
  redirect(
    buildRedirectWithNotice(
      getSafeRedirectTarget(redirectTo),
      "Career posting archived.",
    ),
  );
}

export async function manageCareerPostingAction(formData: FormData) {
  const viewer = await requireViewerOrRedirect();
  const jobId = normalizeOptionalText(formData.get("jobId"));
  const intent = normalizeOptionalText(formData.get("intent"));
  const redirectTo = getSafeRedirectTarget(formData.get("redirectTo"));

  if (!jobId || !intent) {
    redirect(
      buildRedirectWithNotice(
        redirectTo,
        "The requested career action could not be completed.",
        "error",
      ),
    );
  }

  const existingJob = await getEditableJobById(jobId);

  if (!existingJob) {
    redirect(
      buildRedirectWithNotice(
        redirectTo,
        "This career posting no longer exists.",
        "error",
      ),
    );
  }

  if (intent === "publish") {
    assertCanPublishCareerPosting(viewer);
    const publishedJob = await publishJob(jobId, {
      updatedBy: viewer.id,
    });
    revalidateCareerPaths(publishedJob);
    redirect(buildRedirectWithNotice(redirectTo, "Career posting published."));
  }

  if (intent === "archive") {
    assertCanArchiveCareerPosting(viewer);
    const archivedJob = await archiveJob(jobId, {
      updatedBy: viewer.id,
    });
    revalidateCareerPaths(archivedJob);
    redirect(buildRedirectWithNotice(redirectTo, "Career posting archived."));
  }

  redirect(
    buildRedirectWithNotice(
      redirectTo,
      "The requested career action is not supported.",
      "error",
    ),
  );
}
