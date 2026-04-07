import "server-only";

import {
  createDataAdminClient,
  ensureNoError,
  requireRecord,
  stripUndefinedFields,
} from "./shared";
import type {
  ApplicationStatus,
  CreateJobApplicationInput,
  CreateVolunteerApplicationInput,
  JobApplicationRecord,
  UpdateJobApplicationInput,
  UpdateVolunteerApplicationInput,
  VolunteerApplicationRecord,
  VolunteerStatus,
} from "./types";

type JobApplicationRow = {
  cover_letter: string | null;
  created_at: string;
  email: string;
  full_name: string;
  id: string;
  internal_notes: string | null;
  job_id: string;
  linkedin_url: string | null;
  phone: string | null;
  portfolio_url: string | null;
  resume_path: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
  source: string;
  status: ApplicationStatus;
  updated_at: string;
};

type VolunteerApplicationRow = {
  availability: string | null;
  created_at: string;
  email: string;
  experience: string | null;
  full_name: string;
  id: string;
  internal_notes: string | null;
  linkedin_profile: string | null;
  motivation: string | null;
  phone: string | null;
  portfolio_website: string | null;
  resume_path: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
  skills: string | null;
  source: string;
  status: VolunteerStatus;
  updated_at: string;
};

const JOB_APPLICATION_SELECT = [
  "id",
  "job_id",
  "full_name",
  "email",
  "phone",
  "linkedin_url",
  "portfolio_url",
  "cover_letter",
  "resume_path",
  "source",
  "status",
  "reviewed_by",
  "reviewed_at",
  "internal_notes",
  "created_at",
  "updated_at",
].join(", ");

const VOLUNTEER_APPLICATION_SELECT = [
  "id",
  "full_name",
  "email",
  "phone",
  "skills",
  "experience",
  "availability",
  "motivation",
  "linkedin_profile",
  "portfolio_website",
  "resume_path",
  "source",
  "status",
  "reviewed_by",
  "reviewed_at",
  "internal_notes",
  "created_at",
  "updated_at",
].join(", ");

function mapJobApplicationRow(row: JobApplicationRow): JobApplicationRecord {
  return {
    coverLetter: row.cover_letter,
    createdAt: row.created_at,
    email: row.email,
    fullName: row.full_name,
    id: row.id,
    internalNotes: row.internal_notes,
    jobId: row.job_id,
    linkedinUrl: row.linkedin_url,
    phone: row.phone,
    portfolioUrl: row.portfolio_url,
    resumePath: row.resume_path,
    reviewedAt: row.reviewed_at,
    reviewedBy: row.reviewed_by,
    source: row.source,
    status: row.status,
    updatedAt: row.updated_at,
  };
}

function mapVolunteerApplicationRow(
  row: VolunteerApplicationRow,
): VolunteerApplicationRecord {
  return {
    availability: row.availability,
    createdAt: row.created_at,
    email: row.email,
    experience: row.experience,
    fullName: row.full_name,
    id: row.id,
    internalNotes: row.internal_notes,
    linkedinProfile: row.linkedin_profile,
    motivation: row.motivation,
    phone: row.phone,
    portfolioWebsite: row.portfolio_website,
    resumePath: row.resume_path,
    reviewedAt: row.reviewed_at,
    reviewedBy: row.reviewed_by,
    skills: row.skills,
    source: row.source,
    status: row.status,
    updatedAt: row.updated_at,
  };
}

function toJobApplicationPayload(
  input: CreateJobApplicationInput | UpdateJobApplicationInput,
) {
  return stripUndefinedFields({
    cover_letter: input.coverLetter,
    email: input.email,
    full_name: input.fullName,
    internal_notes: input.internalNotes,
    job_id: input.jobId,
    linkedin_url: input.linkedinUrl,
    phone: input.phone,
    portfolio_url: input.portfolioUrl,
    resume_path: input.resumePath,
    reviewed_at: input.reviewedAt,
    reviewed_by: input.reviewedBy,
    source: input.source,
    status: input.status,
  });
}

function toVolunteerApplicationPayload(
  input: CreateVolunteerApplicationInput | UpdateVolunteerApplicationInput,
) {
  return stripUndefinedFields({
    availability: input.availability,
    email: input.email,
    experience: input.experience,
    full_name: input.fullName,
    internal_notes: input.internalNotes,
    linkedin_profile: input.linkedinProfile,
    motivation: input.motivation,
    phone: input.phone,
    portfolio_website: input.portfolioWebsite,
    resume_path: input.resumePath,
    reviewed_at: input.reviewedAt,
    reviewed_by: input.reviewedBy,
    skills: input.skills,
    source: input.source,
    status: input.status,
  });
}

export async function createJobApplication(input: CreateJobApplicationInput) {
  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("job_applications")
    .insert(toJobApplicationPayload(input))
    .select(JOB_APPLICATION_SELECT)
    .single();

  ensureNoError(error);

  return mapJobApplicationRow(
    requireRecord(data as unknown as JobApplicationRow | null, "job application"),
  );
}

export async function updateJobApplication(
  id: string,
  input: UpdateJobApplicationInput,
) {
  const updates = toJobApplicationPayload(input);

  if (Object.keys(updates).length === 0) {
    return requireRecord(await getJobApplicationById(id), `job application ${id}`);
  }

  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("job_applications")
    .update(updates)
    .eq("id", id)
    .select(JOB_APPLICATION_SELECT)
    .single();

  ensureNoError(error);

  return mapJobApplicationRow(
    requireRecord(
      data as unknown as JobApplicationRow | null,
      `job application ${id}`,
    ),
  );
}

export async function getJobApplicationById(id: string) {
  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("job_applications")
    .select(JOB_APPLICATION_SELECT)
    .eq("id", id)
    .maybeSingle();

  ensureNoError(error);

  return data ? mapJobApplicationRow(data as unknown as JobApplicationRow) : null;
}

export async function listJobApplications(jobId?: string) {
  const supabase = createDataAdminClient();
  let query = supabase
    .from("job_applications")
    .select(JOB_APPLICATION_SELECT)
    .order("created_at", { ascending: false });

  if (jobId) {
    query = query.eq("job_id", jobId);
  }

  const { data, error } = await query;
  ensureNoError(error);

  return (data ?? []).map((row) =>
    mapJobApplicationRow(row as unknown as JobApplicationRow),
  );
}

export async function deleteJobApplication(id: string) {
  const supabase = createDataAdminClient();
  const { error } = await supabase.from("job_applications").delete().eq("id", id);
  ensureNoError(error);
}

export async function createVolunteerApplication(
  input: CreateVolunteerApplicationInput,
) {
  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("volunteer_applications")
    .insert(toVolunteerApplicationPayload(input))
    .select(VOLUNTEER_APPLICATION_SELECT)
    .single();

  ensureNoError(error);

  return mapVolunteerApplicationRow(
    requireRecord(
      data as unknown as VolunteerApplicationRow | null,
      "volunteer application",
    ),
  );
}

export async function updateVolunteerApplication(
  id: string,
  input: UpdateVolunteerApplicationInput,
) {
  const updates = toVolunteerApplicationPayload(input);

  if (Object.keys(updates).length === 0) {
    return requireRecord(
      await getVolunteerApplicationById(id),
      `volunteer application ${id}`,
    );
  }

  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("volunteer_applications")
    .update(updates)
    .eq("id", id)
    .select(VOLUNTEER_APPLICATION_SELECT)
    .single();

  ensureNoError(error);

  return mapVolunteerApplicationRow(
    requireRecord(
      data as unknown as VolunteerApplicationRow | null,
      `volunteer application ${id}`,
    ),
  );
}

export async function getVolunteerApplicationById(id: string) {
  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("volunteer_applications")
    .select(VOLUNTEER_APPLICATION_SELECT)
    .eq("id", id)
    .maybeSingle();

  ensureNoError(error);

  return data
    ? mapVolunteerApplicationRow(data as unknown as VolunteerApplicationRow)
    : null;
}

export async function listVolunteerApplications() {
  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("volunteer_applications")
    .select(VOLUNTEER_APPLICATION_SELECT)
    .order("created_at", { ascending: false });

  ensureNoError(error);

  return (data ?? []).map((row) =>
      mapVolunteerApplicationRow(row as unknown as VolunteerApplicationRow),
  );
}

export async function deleteVolunteerApplication(id: string) {
  const supabase = createDataAdminClient();
  const { error } = await supabase
    .from("volunteer_applications")
    .delete()
    .eq("id", id);
  ensureNoError(error);
}
