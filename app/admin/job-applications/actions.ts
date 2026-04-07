"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { normalizeOptionalText } from "@/lib/blogs/content";
import { APPLICATION_STATUS_OPTIONS } from "@/lib/careers/options";
import { deleteStoredResume, RESUME_BUCKET } from "@/lib/careers/resumes";
import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import { deleteJobApplication, getJobApplicationById, updateJobApplication } from "@/lib/data/applications";
import { deleteMediaAsset, getMediaAssetByPath } from "@/lib/data/media";

function buildRedirectWithNotice(
  pathname: string,
  notice: string,
  kind: "error" | "success" = "success",
) {
  const searchParams = new URLSearchParams();
  searchParams.set("kind", kind);
  searchParams.set("notice", notice);
  return `${pathname}?${searchParams.toString()}`;
}

function getSafeRedirectTarget(value: FormDataEntryValue | null) {
  if (typeof value === "string" && value.startsWith("/admin/job-applications")) {
    return value;
  }

  return "/admin/job-applications";
}

async function requireSuperAdminOrRedirect() {
  const viewer = await getAuthenticatedAdmin();

  if (!viewer) {
    redirect("/admin/login?next=%2Fadmin%2Fjob-applications");
  }

  if (viewer.role !== "super_admin") {
    redirect("/admin/forbidden");
  }

  return viewer;
}

function revalidateApplicationPaths() {
  revalidatePath("/admin/job-applications");
}

export async function updateJobApplicationStatusAction(formData: FormData) {
  const viewer = await requireSuperAdminOrRedirect();
  const applicationId = normalizeOptionalText(formData.get("applicationId"));
  const nextStatus = normalizeOptionalText(formData.get("status"));
  const redirectTo = getSafeRedirectTarget(formData.get("redirectTo"));

  if (!applicationId || !nextStatus) {
    redirect(
      buildRedirectWithNotice(
        redirectTo,
        "The application status could not be updated.",
        "error",
      ),
    );
  }

  if (
    !APPLICATION_STATUS_OPTIONS.includes(
      nextStatus as (typeof APPLICATION_STATUS_OPTIONS)[number],
    )
  ) {
    redirect(
      buildRedirectWithNotice(
        redirectTo,
        "Choose a valid application status.",
        "error",
      ),
    );
  }

  const application = await getJobApplicationById(applicationId);

  if (!application) {
    redirect(
      buildRedirectWithNotice(
        redirectTo,
        "This application no longer exists.",
        "error",
      ),
    );
  }

  await updateJobApplication(applicationId, {
    reviewedAt: nextStatus === "pending" ? null : new Date().toISOString(),
    reviewedBy: nextStatus === "pending" ? null : viewer.id,
    status: nextStatus as (typeof APPLICATION_STATUS_OPTIONS)[number],
  });

  revalidateApplicationPaths();
  redirect(buildRedirectWithNotice(redirectTo, "Application status updated."));
}

export async function deleteJobApplicationAction(formData: FormData) {
  await requireSuperAdminOrRedirect();
  const applicationId = normalizeOptionalText(formData.get("applicationId"));
  const redirectTo = getSafeRedirectTarget(formData.get("redirectTo"));

  if (!applicationId) {
    redirect(
      buildRedirectWithNotice(
        redirectTo,
        "The application could not be deleted.",
        "error",
      ),
    );
  }

  const application = await getJobApplicationById(applicationId);

  if (!application) {
    redirect(
      buildRedirectWithNotice(
        redirectTo,
        "This application no longer exists.",
        "error",
      ),
    );
  }

  if (application.resumePath) {
    try {
      const mediaAsset = await getMediaAssetByPath(RESUME_BUCKET, application.resumePath);

      if (mediaAsset) {
        await deleteMediaAsset(mediaAsset.id);
      }
    } catch {}

    try {
      await deleteStoredResume(application.resumePath);
    } catch {}
  }

  await deleteJobApplication(applicationId);
  revalidateApplicationPaths();
  redirect(buildRedirectWithNotice(redirectTo, "Application deleted."));
}
