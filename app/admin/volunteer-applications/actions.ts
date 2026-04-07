"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import {
  createVolunteerApplicationPublic,
  deleteVolunteerApplication,
  updateVolunteerApplication,
} from "@/lib/data/volunteers";
import type { VolunteerStatus } from "@/lib/data/types";

const VOLUNTEER_STATUSES: VolunteerStatus[] = [
  "pending",
  "reviewed",
  "accepted",
  "rejected",
];

function revalidateVolunteerPaths() {
  revalidatePath("/admin");
  revalidatePath("/admin/volunteer-applications");
}

async function requireSuperAdmin() {
  const viewer = await getAuthenticatedAdmin();

  if (!viewer) {
    redirect("/admin/login?next=%2Fadmin%2Fvolunteer-applications");
  }

  if (viewer.role !== "super_admin") {
    redirect("/admin/forbidden");
  }

  return viewer;
}

/**
 * Public action — called from the volunteer form on the About page.
 * No authentication required.
 */
export async function submitVolunteerApplicationAction(formData: FormData) {
  const fullName = (formData.get("fullName") as string | null)?.trim();
  const email = (formData.get("email") as string | null)?.trim();
  const phone = (formData.get("phone") as string | null)?.trim() || null;
  const skills = (formData.get("skills") as string | null)?.trim() || null;
  const experience =
    (formData.get("experience") as string | null)?.trim() || null;
  const availability =
    (formData.get("availability") as string | null)?.trim() || null;
  const motivation =
    (formData.get("motivation") as string | null)?.trim() || null;
  const linkedinProfile =
    (formData.get("linkedinProfile") as string | null)?.trim() || null;
  const portfolioWebsite =
    (formData.get("portfolioWebsite") as string | null)?.trim() || null;

  if (!fullName || !email) {
    return { error: "Full name and email are required.", success: false };
  }

  try {
    const record = await createVolunteerApplicationPublic({
      availability,
      email,
      experience,
      fullName,
      linkedinProfile,
      motivation,
      phone,
      portfolioWebsite,
      skills,
      source: "about-us-volunteer-section",
    });

    return { id: record.id, success: true };
  } catch (error) {
    console.error("Error submitting volunteer application:", error);
    return {
      error:
        error instanceof Error
          ? error.message
          : "The application could not be submitted.",
      success: false,
    };
  }
}

export async function updateVolunteerStatusAction(formData: FormData) {
  await requireSuperAdmin();

  const id = formData.get("id") as string | null;
  const status = formData.get("status") as string | null;

  if (!id || !status || !VOLUNTEER_STATUSES.includes(status as VolunteerStatus)) {
    return;
  }

  await updateVolunteerApplication(id, {
    status: status as VolunteerStatus,
  });

  revalidateVolunteerPaths();
}

export async function deleteVolunteerApplicationAction(formData: FormData) {
  await requireSuperAdmin();

  const id = formData.get("id") as string | null;

  if (!id) {
    return;
  }

  await deleteVolunteerApplication(id);
  revalidateVolunteerPaths();
}
