"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { normalizeOptionalText } from "@/lib/blogs/content";
import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import {
  deleteConsultationRequest,
  deleteContactSubmission,
  deleteDemoRequest,
  getConsultationRequestById,
  getContactSubmissionById,
  getDemoRequestById,
  updateConsultationRequest,
  updateContactSubmission,
  updateDemoRequest,
} from "@/lib/data/inquiries";
import { type InquiryStatus } from "@/lib/data/types";
import {
  ADMIN_INQUIRY_KIND_OPTIONS,
  type AdminInquiryKind,
  formatInquiryLabel,
  isAllowedStatusForInquiryKind,
} from "@/lib/inquiries/admin";

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
  if (typeof value === "string" && value.startsWith("/admin/inquiries")) {
    return value;
  }

  return "/admin/inquiries";
}

async function requireSuperAdminOrRedirect() {
  const viewer = await getAuthenticatedAdmin();

  if (!viewer) {
    redirect("/admin/login?next=%2Fadmin%2Finquiries");
  }

  if (viewer.role !== "super_admin") {
    redirect("/admin/forbidden");
  }

  return viewer;
}

function revalidateInquiryPaths() {
  revalidatePath("/admin");
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin/contact");
  revalidatePath("/admin/demo-requests");
  revalidatePath("/admin/consultation-requests");
}

function getSafeInquiryKind(
  value: FormDataEntryValue | null,
): AdminInquiryKind | null {
  const normalized = normalizeOptionalText(value);

  if (
    normalized &&
    ADMIN_INQUIRY_KIND_OPTIONS.includes(normalized as AdminInquiryKind)
  ) {
    return normalized as AdminInquiryKind;
  }

  return null;
}

function parseScheduledFor(value: FormDataEntryValue | null) {
  const normalized = normalizeOptionalText(value);

  if (!normalized) {
    return null;
  }

  const parsedValue = new Date(normalized);

  if (Number.isNaN(parsedValue.getTime())) {
    return undefined;
  }

  return parsedValue.toISOString();
}

function shouldSetResolvedAt(status: InquiryStatus) {
  return status === "resolved" || status === "closed";
}

export async function updateInquiryAction(formData: FormData) {
  const viewer = await requireSuperAdminOrRedirect();
  const redirectTo = getSafeRedirectTarget(formData.get("redirectTo"));
  const inquiryId = normalizeOptionalText(formData.get("inquiryId"));
  const inquiryKind = getSafeInquiryKind(formData.get("inquiryKind"));
  const nextStatus = normalizeOptionalText(formData.get("status"));
  const assignedTo = normalizeOptionalText(formData.get("assignedTo"));
  const internalNotes = normalizeOptionalText(formData.get("internalNotes"));
  const scheduledFor = parseScheduledFor(formData.get("scheduledFor"));

  if (!inquiryId || !inquiryKind || !nextStatus) {
    redirect(
      buildRedirectWithNotice(
        redirectTo,
        "The inquiry could not be updated.",
        "error",
      ),
    );
  }

  if (!isAllowedStatusForInquiryKind(inquiryKind, nextStatus)) {
    redirect(
      buildRedirectWithNotice(
        redirectTo,
        `Choose a valid ${formatInquiryLabel(inquiryKind)} status.`,
        "error",
      ),
    );
  }

  if (scheduledFor === undefined) {
    redirect(
      buildRedirectWithNotice(
        redirectTo,
        "Enter a valid scheduled date and time.",
        "error",
      ),
    );
  }

  if (inquiryKind === "contact") {
    const inquiry = await getContactSubmissionById(inquiryId);

    if (!inquiry) {
      redirect(
        buildRedirectWithNotice(
          redirectTo,
          "This contact inquiry no longer exists.",
          "error",
        ),
      );
    }

    await updateContactSubmission(inquiryId, {
      assignedTo,
      internalNotes,
      resolvedAt: shouldSetResolvedAt(nextStatus)
        ? inquiry.resolvedAt ?? new Date().toISOString()
        : null,
      status: nextStatus,
    });
  }

  if (inquiryKind === "demo") {
    const inquiry = await getDemoRequestById(inquiryId);

    if (!inquiry) {
      redirect(
        buildRedirectWithNotice(
          redirectTo,
          "This demo request no longer exists.",
          "error",
        ),
      );
    }

    await updateDemoRequest(inquiryId, {
      assignedTo,
      internalNotes,
      scheduledFor,
      status: nextStatus,
    });
  }

  if (inquiryKind === "consultation") {
    const inquiry = await getConsultationRequestById(inquiryId);

    if (!inquiry) {
      redirect(
        buildRedirectWithNotice(
          redirectTo,
          "This consultation request no longer exists.",
          "error",
        ),
      );
    }

    await updateConsultationRequest(inquiryId, {
      assignedTo,
      internalNotes,
      scheduledFor,
      status: nextStatus,
    });
  }

  revalidateInquiryPaths();
  redirect(
    buildRedirectWithNotice(
      redirectTo,
      `${formatInquiryLabel(inquiryKind)} inquiry updated by ${viewer.fullName}.`,
    ),
  );
}

export async function deleteInquiryAction(formData: FormData) {
  await requireSuperAdminOrRedirect();
  const redirectTo = getSafeRedirectTarget(formData.get("redirectTo"));
  const inquiryId = normalizeOptionalText(formData.get("inquiryId"));
  const inquiryKind = getSafeInquiryKind(formData.get("inquiryKind"));

  if (!inquiryId || !inquiryKind) {
    redirect(
      buildRedirectWithNotice(
        redirectTo,
        "The inquiry could not be deleted.",
        "error",
      ),
    );
  }

  if (inquiryKind === "contact") {
    await deleteContactSubmission(inquiryId);
  }

  if (inquiryKind === "demo") {
    await deleteDemoRequest(inquiryId);
  }

  if (inquiryKind === "consultation") {
    await deleteConsultationRequest(inquiryId);
  }

  revalidateInquiryPaths();
  redirect(
    buildRedirectWithNotice(
      redirectTo,
      `${formatInquiryLabel(inquiryKind)} inquiry deleted.`,
    ),
  );
}
