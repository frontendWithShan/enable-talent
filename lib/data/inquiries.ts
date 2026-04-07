import "server-only";

import {
  createDataAdminClient,
  ensureNoError,
  requireRecord,
  stripUndefinedFields,
} from "./shared";
import type {
  ConsultationRequestRecord,
  ContactSubmissionRecord,
  CreateConsultationRequestInput,
  CreateContactSubmissionInput,
  CreateDemoRequestInput,
  DemoRequestRecord,
  InquiryStatus,
  UpdateConsultationRequestInput,
  UpdateContactSubmissionInput,
  UpdateDemoRequestInput,
} from "./types";

type ContactSubmissionRow = {
  assigned_to: string | null;
  company: string | null;
  created_at: string;
  email: string;
  full_name: string;
  id: string;
  inquiry_type: string | null;
  internal_notes: string | null;
  message: string;
  phone: string | null;
  resolved_at: string | null;
  source: string;
  status: InquiryStatus;
  subject: string | null;
  updated_at: string;
};

type DemoRequestRow = {
  assigned_to: string | null;
  company_name: string | null;
  created_at: string;
  email: string;
  full_name: string;
  id: string;
  internal_notes: string | null;
  message: string;
  phone: string | null;
  scheduled_for: string | null;
  source: string;
  status: InquiryStatus;
  updated_at: string;
};

type ConsultationRequestRow = {
  assigned_to: string | null;
  company_name: string | null;
  created_at: string;
  email: string;
  full_name: string;
  id: string;
  internal_notes: string | null;
  message: string | null;
  phone: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  scheduled_for: string | null;
  source: string;
  status: InquiryStatus;
  updated_at: string;
};

const CONTACT_SELECT = [
  "id",
  "full_name",
  "email",
  "company",
  "phone",
  "subject",
  "message",
  "inquiry_type",
  "source",
  "status",
  "assigned_to",
  "resolved_at",
  "internal_notes",
  "created_at",
  "updated_at",
].join(", ");

const DEMO_SELECT = [
  "id",
  "full_name",
  "email",
  "company_name",
  "phone",
  "message",
  "source",
  "status",
  "assigned_to",
  "scheduled_for",
  "internal_notes",
  "created_at",
  "updated_at",
].join(", ");

const CONSULTATION_SELECT = [
  "id",
  "full_name",
  "email",
  "company_name",
  "phone",
  "message",
  "preferred_date",
  "preferred_time",
  "source",
  "status",
  "assigned_to",
  "scheduled_for",
  "internal_notes",
  "created_at",
  "updated_at",
].join(", ");

function mapContactRow(row: ContactSubmissionRow): ContactSubmissionRecord {
  return {
    assignedTo: row.assigned_to,
    company: row.company,
    createdAt: row.created_at,
    email: row.email,
    fullName: row.full_name,
    id: row.id,
    inquiryType: row.inquiry_type,
    internalNotes: row.internal_notes,
    message: row.message,
    phone: row.phone,
    resolvedAt: row.resolved_at,
    source: row.source,
    status: row.status,
    subject: row.subject,
    updatedAt: row.updated_at,
  };
}

function mapDemoRow(row: DemoRequestRow): DemoRequestRecord {
  return {
    assignedTo: row.assigned_to,
    companyName: row.company_name,
    createdAt: row.created_at,
    email: row.email,
    fullName: row.full_name,
    id: row.id,
    internalNotes: row.internal_notes,
    message: row.message,
    phone: row.phone,
    scheduledFor: row.scheduled_for,
    source: row.source,
    status: row.status,
    updatedAt: row.updated_at,
  };
}

function mapConsultationRow(
  row: ConsultationRequestRow,
): ConsultationRequestRecord {
  return {
    assignedTo: row.assigned_to,
    companyName: row.company_name,
    createdAt: row.created_at,
    email: row.email,
    fullName: row.full_name,
    id: row.id,
    internalNotes: row.internal_notes,
    message: row.message,
    phone: row.phone,
    preferredDate: row.preferred_date,
    preferredTime: row.preferred_time,
    scheduledFor: row.scheduled_for,
    source: row.source,
    status: row.status,
    updatedAt: row.updated_at,
  };
}

function toContactPayload(
  input: CreateContactSubmissionInput | UpdateContactSubmissionInput,
) {
  return stripUndefinedFields({
    assigned_to: input.assignedTo,
    company: input.company,
    email: input.email,
    full_name: input.fullName,
    inquiry_type: input.inquiryType,
    internal_notes: input.internalNotes,
    message: input.message,
    phone: input.phone,
    resolved_at: input.resolvedAt,
    source: input.source,
    status: input.status,
    subject: input.subject,
  });
}

function toDemoPayload(input: CreateDemoRequestInput | UpdateDemoRequestInput) {
  return stripUndefinedFields({
    assigned_to: input.assignedTo,
    company_name: input.companyName,
    email: input.email,
    full_name: input.fullName,
    internal_notes: input.internalNotes,
    message: input.message,
    phone: input.phone,
    scheduled_for: input.scheduledFor,
    source: input.source,
    status: input.status,
  });
}

function toConsultationPayload(
  input: CreateConsultationRequestInput | UpdateConsultationRequestInput,
) {
  return stripUndefinedFields({
    assigned_to: input.assignedTo,
    company_name: input.companyName,
    email: input.email,
    full_name: input.fullName,
    internal_notes: input.internalNotes,
    message: input.message,
    phone: input.phone,
    preferred_date: input.preferredDate,
    preferred_time: input.preferredTime,
    scheduled_for: input.scheduledFor,
    source: input.source,
    status: input.status,
  });
}

export async function createContactSubmission(
  input: CreateContactSubmissionInput,
) {
  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("contact_submissions")
    .insert(toContactPayload(input))
    .select(CONTACT_SELECT)
    .single();

  ensureNoError(error);

  return mapContactRow(
    requireRecord(
      data as unknown as ContactSubmissionRow | null,
      "contact submission",
    ),
  );
}

export async function updateContactSubmission(
  id: string,
  input: UpdateContactSubmissionInput,
) {
  const updates = toContactPayload(input);

  if (Object.keys(updates).length === 0) {
    return requireRecord(await getContactSubmissionById(id), `contact submission ${id}`);
  }

  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("contact_submissions")
    .update(updates)
    .eq("id", id)
    .select(CONTACT_SELECT)
    .single();

  ensureNoError(error);

  return mapContactRow(
    requireRecord(
      data as unknown as ContactSubmissionRow | null,
      `contact submission ${id}`,
    ),
  );
}

export async function getContactSubmissionById(id: string) {
  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("contact_submissions")
    .select(CONTACT_SELECT)
    .eq("id", id)
    .maybeSingle();

  ensureNoError(error);

  return data ? mapContactRow(data as unknown as ContactSubmissionRow) : null;
}

export async function listContactSubmissions() {
  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("contact_submissions")
    .select(CONTACT_SELECT)
    .order("created_at", { ascending: false });

  ensureNoError(error);

  return (data ?? []).map((row) =>
    mapContactRow(row as unknown as ContactSubmissionRow),
  );
}

export async function deleteContactSubmission(id: string) {
  const supabase = createDataAdminClient();
  const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
  ensureNoError(error);
}

export async function createDemoRequest(input: CreateDemoRequestInput) {
  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("demo_requests")
    .insert(toDemoPayload(input))
    .select(DEMO_SELECT)
    .single();

  ensureNoError(error);

  return mapDemoRow(
    requireRecord(data as unknown as DemoRequestRow | null, "demo request"),
  );
}

export async function updateDemoRequest(id: string, input: UpdateDemoRequestInput) {
  const updates = toDemoPayload(input);

  if (Object.keys(updates).length === 0) {
    return requireRecord(await getDemoRequestById(id), `demo request ${id}`);
  }

  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("demo_requests")
    .update(updates)
    .eq("id", id)
    .select(DEMO_SELECT)
    .single();

  ensureNoError(error);

  return mapDemoRow(
    requireRecord(data as unknown as DemoRequestRow | null, `demo request ${id}`),
  );
}

export async function getDemoRequestById(id: string) {
  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("demo_requests")
    .select(DEMO_SELECT)
    .eq("id", id)
    .maybeSingle();

  ensureNoError(error);

  return data ? mapDemoRow(data as unknown as DemoRequestRow) : null;
}

export async function listDemoRequests() {
  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("demo_requests")
    .select(DEMO_SELECT)
    .order("created_at", { ascending: false });

  ensureNoError(error);

  return (data ?? []).map((row) => mapDemoRow(row as unknown as DemoRequestRow));
}

export async function deleteDemoRequest(id: string) {
  const supabase = createDataAdminClient();
  const { error } = await supabase.from("demo_requests").delete().eq("id", id);
  ensureNoError(error);
}

export async function createConsultationRequest(
  input: CreateConsultationRequestInput,
) {
  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("consultation_requests")
    .insert(toConsultationPayload(input))
    .select(CONSULTATION_SELECT)
    .single();

  ensureNoError(error);

  return mapConsultationRow(
    requireRecord(
      data as unknown as ConsultationRequestRow | null,
      "consultation request",
    ),
  );
}

export async function updateConsultationRequest(
  id: string,
  input: UpdateConsultationRequestInput,
) {
  const updates = toConsultationPayload(input);

  if (Object.keys(updates).length === 0) {
    return requireRecord(
      await getConsultationRequestById(id),
      `consultation request ${id}`,
    );
  }

  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("consultation_requests")
    .update(updates)
    .eq("id", id)
    .select(CONSULTATION_SELECT)
    .single();

  ensureNoError(error);

  return mapConsultationRow(
    requireRecord(
      data as unknown as ConsultationRequestRow | null,
      `consultation request ${id}`,
    ),
  );
}

export async function getConsultationRequestById(id: string) {
  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("consultation_requests")
    .select(CONSULTATION_SELECT)
    .eq("id", id)
    .maybeSingle();

  ensureNoError(error);

  return data
    ? mapConsultationRow(data as unknown as ConsultationRequestRow)
    : null;
}

export async function listConsultationRequests() {
  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("consultation_requests")
    .select(CONSULTATION_SELECT)
    .order("created_at", { ascending: false });

  ensureNoError(error);

  return (data ?? []).map((row) =>
    mapConsultationRow(row as unknown as ConsultationRequestRow),
  );
}

export async function deleteConsultationRequest(id: string) {
  const supabase = createDataAdminClient();
  const { error } = await supabase
    .from("consultation_requests")
    .delete()
    .eq("id", id);
  ensureNoError(error);
}
