import "server-only";

import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export const RESUME_BUCKET = "resumes";
export const RESUME_MAX_BYTES = 15 * 1024 * 1024;
export const RESUME_MIME_TYPES = [
  "application/msword",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;
export const RESUME_ACCEPT_ATTRIBUTE = ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const RESUME_EXTENSION_FALLBACKS = [".pdf", ".doc", ".docx"] as const;

function sanitizeFileName(value: string) {
  const trimmedValue = value.trim().toLowerCase();
  const normalizedValue = trimmedValue.replace(/[^a-z0-9._-]+/g, "-");
  return normalizedValue.replace(/-+/g, "-").replace(/^-|-$/g, "") || "resume";
}

function getFileExtension(fileName: string) {
  const match = /\.[a-z0-9]+$/i.exec(fileName);
  return match ? match[0].toLowerCase() : "";
}

export function isSupportedResumeFile(file: File) {
  const extension = getFileExtension(file.name);
  const hasAllowedMimeType = RESUME_MIME_TYPES.includes(
    file.type as (typeof RESUME_MIME_TYPES)[number],
  );
  const hasAllowedExtension = RESUME_EXTENSION_FALLBACKS.includes(
    extension as (typeof RESUME_EXTENSION_FALLBACKS)[number],
  );

  return hasAllowedMimeType || hasAllowedExtension;
}

export function buildResumeObjectPath(input: {
  fileName: string;
  jobId: string;
}) {
  const extension = getFileExtension(input.fileName);
  const safeFileName = sanitizeFileName(input.fileName.replace(/\.[^.]+$/, ""));
  const datePrefix = new Date().toISOString().slice(0, 10);
  return `job-applications/${input.jobId}/${datePrefix}/${crypto.randomUUID()}-${safeFileName}${extension}`;
}

export async function deleteStoredResume(objectPath: string) {
  const supabase = createAdminSupabaseClient();
  await supabase.storage.from(RESUME_BUCKET).remove([objectPath]);
}
