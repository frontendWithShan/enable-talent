import "server-only";

import {
  createDataAdminClient,
  createDataPublicClient,
  ensureNoError,
  requireRecord,
  stripUndefinedFields,
} from "./shared";
import type {
  CreateVolunteerApplicationInput,
  UpdateVolunteerApplicationInput,
  VolunteerApplicationRecord,
} from "./types";

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
  status: string;
  updated_at: string;
};

const VOLUNTEER_SELECT = [
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

function mapRow(row: VolunteerApplicationRow): VolunteerApplicationRecord {
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
    status: row.status as VolunteerApplicationRecord["status"],
    updatedAt: row.updated_at,
  };
}

function toPayload(
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

/**
 * Insert a volunteer application using the public (anon) client so that RLS
 * INSERT policies are respected — no service-role key is exposed to the
 * browser.
 */
export async function createVolunteerApplicationPublic(
  input: CreateVolunteerApplicationInput,
) {
  const supabase = createDataPublicClient();
  const { data, error } = await supabase
    .from("volunteer_applications")
    .insert(toPayload(input))
    .select(VOLUNTEER_SELECT)
    .single();

  ensureNoError(error);

  return mapRow(
    requireRecord(
      data as unknown as VolunteerApplicationRow | null,
      "volunteer application",
    ),
  );
}

export async function listVolunteerApplications() {
  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("volunteer_applications")
    .select(VOLUNTEER_SELECT)
    .order("created_at", { ascending: false });

  ensureNoError(error);

  return (data ?? []).map((row) =>
    mapRow(row as unknown as VolunteerApplicationRow),
  );
}

export async function getVolunteerApplicationById(id: string) {
  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("volunteer_applications")
    .select(VOLUNTEER_SELECT)
    .eq("id", id)
    .maybeSingle();

  ensureNoError(error);

  return data
    ? mapRow(data as unknown as VolunteerApplicationRow)
    : null;
}

export async function updateVolunteerApplication(
  id: string,
  input: UpdateVolunteerApplicationInput,
) {
  const updates = toPayload(input);

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
    .select(VOLUNTEER_SELECT)
    .single();

  ensureNoError(error);

  return mapRow(
    requireRecord(
      data as unknown as VolunteerApplicationRow | null,
      `volunteer application ${id}`,
    ),
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
