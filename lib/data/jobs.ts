import "server-only";

import {
  createDataAdminClient,
  createDataPublicClient,
  ensureNoError,
  requireRecord,
  stripUndefinedFields,
  toNullableNumber,
} from "./shared";
import type {
  CreateJobInput,
  EmploymentType,
  JobRecord,
  JobStatus,
  SalaryPeriod,
  UpdateJobInput,
  WorkMode,
} from "./types";

type JobRow = {
  application_deadline: string | null;
  created_at: string;
  created_by: string | null;
  description_html: string | null;
  employment_type: EmploymentType | null;
  experience_level: string | null;
  id: string;
  is_active: boolean;
  is_featured: boolean;
  location_text: string | null;
  published_at: string | null;
  salary_currency: string | null;
  salary_max: number | string | null;
  salary_min: number | string | null;
  salary_period: SalaryPeriod | null;
  slug: string;
  status: JobStatus;
  summary: string | null;
  title: string;
  updated_at: string;
  updated_by: string | null;
  work_mode: WorkMode | null;
};

export type JobAdminListFilters = {
  employmentType?: EmploymentType;
  query?: string;
  status?: JobStatus;
  workMode?: WorkMode;
};

const JOB_SELECT = [
  "id",
  "title",
  "slug",
  "summary",
  "description_html",
  "location_text",
  "work_mode",
  "employment_type",
  "experience_level",
  "salary_min",
  "salary_max",
  "salary_currency",
  "salary_period",
  "application_deadline",
  "is_active",
  "is_featured",
  "published_at",
  "status",
  "created_by",
  "updated_by",
  "created_at",
  "updated_at",
].join(", ");

function mapJobRow(row: JobRow): JobRecord {
  if (!row) {
    return {
      id: "placeholder",
      title: "Loading...",
      slug: "placeholder",
      summary: "",
      locationText: "",
      isActive: false,
      isFeatured: false,
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      applicationDeadline: null,
      createdBy: null,
      descriptionHtml: null,
      employmentType: null,
      experienceLevel: null,
      publishedAt: null,
      salaryCurrency: null,
      salaryMax: null,
      salaryMin: null,
      salaryPeriod: null,
      updatedBy: null,
      workMode: null,
    } as unknown as JobRecord;
  }

  return {
    applicationDeadline: row.application_deadline,
    createdAt: row.created_at,
    createdBy: row.created_by,
    descriptionHtml: row.description_html,
    employmentType: row.employment_type,
    experienceLevel: row.experience_level,
    id: row.id,
    isActive: row.is_active,
    isFeatured: row.is_featured,
    locationText: row.location_text,
    publishedAt: row.published_at,
    salaryCurrency: row.salary_currency,
    salaryMax: toNullableNumber(row.salary_max),
    salaryMin: toNullableNumber(row.salary_min),
    salaryPeriod: row.salary_period,
    slug: row.slug,
    status: row.status,
    summary: row.summary,
    title: row.title,
    updatedAt: row.updated_at,
    updatedBy: row.updated_by,
    workMode: row.work_mode,
  };
}


function toJobPayload(input: CreateJobInput | UpdateJobInput) {
  return stripUndefinedFields({
    application_deadline: input.applicationDeadline,
    created_by: input.createdBy,
    description_html: input.descriptionHtml,
    employment_type: input.employmentType,
    experience_level: input.experienceLevel,
    is_active: input.isActive,
    is_featured: input.isFeatured,
    location_text: input.locationText,
    published_at: input.publishedAt,
    salary_currency: input.salaryCurrency,
    salary_max: input.salaryMax,
    salary_min: input.salaryMin,
    salary_period: input.salaryPeriod,
    slug: input.slug,
    status: input.status,
    summary: input.summary,
    title: input.title,
    updated_by: input.updatedBy,
    work_mode: input.workMode,
  });
}

function escapeAdminSearchValue(value: string) {
  return value.replace(/[,%_]/g, " ").trim();
}

export async function createJob(input: CreateJobInput) {
  const supabase = createDataAdminClient();
  const { data, error } = await supabase.from("jobs").insert(toJobPayload(input)).select(JOB_SELECT).single();

  ensureNoError(error);

  return mapJobRow(requireRecord(data as unknown as JobRow | null, "job"));
}

export async function updateJob(id: string, input: UpdateJobInput) {
  const updates = toJobPayload(input);

  if (Object.keys(updates).length === 0) {
    return requireRecord(await getJobById(id), `job ${id}`);
  }

  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("jobs")
    .update(updates)
    .eq("id", id)
    .select(JOB_SELECT)
    .single();

  ensureNoError(error);

  return mapJobRow(requireRecord(data as unknown as JobRow | null, `job ${id}`));
}

export async function deleteJob(id: string) {
  const supabase = createDataAdminClient();
  const { error } = await supabase.from("jobs").delete().eq("id", id);
  ensureNoError(error);
}

export async function getJobById(id: string) {
  const supabase = createDataAdminClient();
  const { data, error } = await supabase.from("jobs").select(JOB_SELECT).eq("id", id).maybeSingle();

  ensureNoError(error);

  return data ? mapJobRow(data as unknown as JobRow) : null;
}

export async function getJobBySlug(slug: string) {
  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("jobs")
    .select(JOB_SELECT)
    .eq("slug", slug)
    .maybeSingle();

  ensureNoError(error);

  return data ? mapJobRow(data as unknown as JobRow) : null;
}

export async function getActiveJobBySlug(slug: string) {
  const supabase = createDataPublicClient();
  const { data, error } = await supabase
    .from("jobs")
    .select(JOB_SELECT)
    .eq("status", "published")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  ensureNoError(error);

  return data ? mapJobRow(data as unknown as JobRow) : null;
}

export async function listActiveJobs() {
  const supabase = createDataPublicClient();
  const { data, error } = await supabase
    .from("jobs")
    .select(JOB_SELECT)
    .eq("status", "published")
    .eq("is_active", true)
    .order("published_at", { ascending: false });

  ensureNoError(error);

  return (data ?? []).map((row) => mapJobRow(row as unknown as JobRow));
}

export async function getEditableJobById(id: string) {
  return getJobById(id);
}

export async function createJobDraft(input: CreateJobInput) {
  return createJob({
    ...input,
    isActive: false,
    publishedAt: null,
    status: "draft",
  });
}

export async function updateJobDraft(id: string, input: UpdateJobInput) {
  return updateJob(id, input);
}

export async function publishJob(id: string, input?: UpdateJobInput) {
  const existingJob = requireRecord(await getJobById(id), `job ${id}`);

  return updateJob(id, {
    ...input,
    isActive: true,
    publishedAt: existingJob.publishedAt ?? new Date().toISOString(),
    status: "published",
  });
}

export async function archiveJob(id: string, input?: UpdateJobInput) {
  return updateJob(id, {
    ...input,
    isActive: false,
    status: "archived",
  });
}

export async function listJobsForAdmin(filters: JobAdminListFilters = {}) {
  const supabase = createDataAdminClient();
  let query = supabase
    .from("jobs")
    .select(JOB_SELECT)
    .order("updated_at", { ascending: false });

  if (filters.query) {
    const searchValue = escapeAdminSearchValue(filters.query);

    if (searchValue) {
      query = query.or(
        `title.ilike.%${searchValue}%,slug.ilike.%${searchValue}%,location_text.ilike.%${searchValue}%`,
      );
    }
  }

  if (filters.status) {
    query = query.eq("status", filters.status);
  }

  if (filters.employmentType) {
    query = query.eq("employment_type", filters.employmentType);
  }

  if (filters.workMode) {
    query = query.eq("work_mode", filters.workMode);
  }

  const { data, error } = await query;

  ensureNoError(error);

  return (data ?? []).map((row) => mapJobRow(row as unknown as JobRow));
}
