import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { normalizeOptionalText } from "@/lib/blogs/content";
import { createMediaAsset } from "@/lib/data/media";
import { createJobApplication, deleteJobApplication } from "@/lib/data/applications";
import { getActiveJobBySlug, getJobById } from "@/lib/data/jobs";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import {
  buildResumeObjectPath,
  deleteStoredResume,
  isSupportedResumeFile,
  RESUME_BUCKET,
  RESUME_MAX_BYTES,
} from "@/lib/careers/resumes";

function jsonError(
  error: string,
  status: number,
  fieldErrors?: Record<string, string>,
) {
  return NextResponse.json(
    {
      error,
      fieldErrors,
      ok: false,
    },
    {
      status,
    },
  );
}

function normalizeOptionalUrl(value: FormDataEntryValue | null) {
  const normalizedValue = normalizeOptionalText(value);

  if (!normalizedValue) {
    return null;
  }

  try {
    const parsed = new URL(normalizedValue);

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      throw new Error("Only http and https URLs are supported.");
    }

    return normalizedValue;
  } catch {
    throw new Error("Enter a valid URL.");
  }
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const fullName = normalizeOptionalText(formData.get("fullName"));
  const email = normalizeOptionalText(formData.get("email"));
  const phone = normalizeOptionalText(formData.get("phone"));
  const coverLetter = normalizeOptionalText(formData.get("coverLetter"));
  const jobId = normalizeOptionalText(formData.get("jobId"));
  const jobSlug = normalizeOptionalText(formData.get("jobSlug"));
  const resumeEntry = formData.get("resume");
  const resumeFile = resumeEntry instanceof File ? resumeEntry : null;
  const fieldErrors: Record<string, string> = {};

  if (!fullName) {
    fieldErrors.fullName = "Enter your full name.";
  }

  if (!email) {
    fieldErrors.email = "Enter your email address.";
  } else if (!isValidEmail(email)) {
    fieldErrors.email = "Enter a valid email address.";
  }

  if (!coverLetter) {
    fieldErrors.coverLetter = "Tell us why you are interested in this role.";
  }

  if (!resumeFile) {
    fieldErrors.resumeFile = "Choose a resume file before submitting.";
  } else {
    if (resumeFile.size > RESUME_MAX_BYTES) {
      fieldErrors.resumeFile = "Resume files must be 15 MB or smaller.";
    } else if (!isSupportedResumeFile(resumeFile)) {
      fieldErrors.resumeFile = "Upload a PDF, DOC, or DOCX file.";
    }
  }

  let linkedinUrl: string | null = null;
  let portfolioUrl: string | null = null;

  try {
    linkedinUrl = normalizeOptionalUrl(formData.get("linkedinUrl"));
  } catch (error) {
    fieldErrors.linkedinUrl =
      error instanceof Error ? error.message : "Enter a valid URL.";
  }

  try {
    portfolioUrl = normalizeOptionalUrl(formData.get("portfolioUrl"));
  } catch (error) {
    fieldErrors.portfolioUrl =
      error instanceof Error ? error.message : "Enter a valid URL.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return jsonError(
      "Please fix the highlighted fields before you submit your application.",
      400,
      fieldErrors,
    );
  }

  if (!fullName || !email || !coverLetter || !resumeFile) {
    return jsonError(
      "Please fix the highlighted fields before you submit your application.",
      400,
      fieldErrors,
    );
  }

  const jobFromSlug = jobSlug ? await getActiveJobBySlug(jobSlug) : null;
  const jobFromId = jobId ? await getJobById(jobId) : null;
  const job =
    jobFromSlug ??
    (jobFromId?.status === "published" && jobFromId.isActive ? jobFromId : null);

  if (!job) {
    return jsonError(
      "This role is no longer available for applications.",
      404,
    );
  }

  if (jobId && job.id !== jobId) {
    return jsonError("The selected role did not match the application request.", 400);
  }

  const objectPath = buildResumeObjectPath({
    fileName: resumeFile.name,
    jobId: job.id,
  });
  const supabase = createAdminSupabaseClient();
  const { error: uploadError } = await supabase.storage
    .from(RESUME_BUCKET)
    .upload(objectPath, resumeFile, {
      contentType: resumeFile.type || undefined,
      upsert: false,
    });

  if (uploadError) {
    return jsonError(
      "We could not upload your resume right now. Please try again.",
      500,
    );
  }

  let applicationId: string | null = null;

  try {
    const application = await createJobApplication({
      coverLetter,
      email,
      fullName,
      jobId: job.id,
      linkedinUrl,
      phone,
      portfolioUrl,
      resumePath: objectPath,
      source: "public_careers",
      status: "pending",
    });
    applicationId = application.id;

    await createMediaAsset({
      bucketName: RESUME_BUCKET,
      fileName: resumeFile.name,
      jobApplicationId: application.id,
      kind: "resume",
      mimeType: resumeFile.type || null,
      objectPath,
      publicUrl: null,
      sizeBytes: resumeFile.size,
      uploadedBy: null,
    });
  } catch {
    if (applicationId) {
      try {
        await deleteJobApplication(applicationId);
      } catch {}
    }

    await deleteStoredResume(objectPath);

    return jsonError(
      "We could not save your application right now. Please try again.",
      500,
    );
  }

  revalidatePath("/admin/job-applications");

  return NextResponse.json(
    {
      message:
        "Your application has been submitted. Our team will review it and contact you if there is a match.",
      ok: true,
    },
    {
      status: 201,
    },
  );
}
