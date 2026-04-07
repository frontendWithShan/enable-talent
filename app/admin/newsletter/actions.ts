"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import {
  createNewsletterSubscription,
  deleteNewsletterSubscription,
  updateNewsletterSubscription,
} from "@/lib/data/newsletter";

function revalidateNewsletterPaths() {
  revalidatePath("/admin");
  revalidatePath("/admin/newsletter");
}

async function requireSuperAdmin() {
  const viewer = await getAuthenticatedAdmin();

  if (!viewer) {
    redirect("/admin/login?next=%2Fadmin%2Fnewsletter");
  }

  if (viewer.role !== "super_admin") {
    redirect("/admin/forbidden");
  }

  return viewer;
}

export async function addNewsletterSubscriptionAction(formData: FormData) {
  await requireSuperAdmin();

  const email = (formData.get("email") as string | null)?.trim();
  const isActive = formData.get("isActive") === "on" || formData.get("isActive") === "true";

  if (!email) {
    return { error: "Email is required.", success: false };
  }

  try {
    await createNewsletterSubscription({ email, isActive });
    revalidateNewsletterPaths();
    return { success: true };
  } catch (error) {
    console.error("Error adding newsletter subscription:", error);
    return {
      error:
        error instanceof Error
          ? error.message
          : "The subscription could not be added.",
      success: false,
    };
  }
}

export async function updateNewsletterSubscriptionAction(formData: FormData) {
  await requireSuperAdmin();

  const id = formData.get("id") as string | null;
  const email = (formData.get("email") as string | null)?.trim();
  const isActive = formData.get("isActive") === "on" || formData.get("isActive") === "true";

  if (!id) {
    return;
  }

  await updateNewsletterSubscription(id, {
    ...(email ? { email } : {}),
    isActive,
  });

  revalidateNewsletterPaths();
}

export async function toggleNewsletterActiveAction(formData: FormData) {
  await requireSuperAdmin();

  const id = formData.get("id") as string | null;
  const currentlyActive = formData.get("currentlyActive") === "true";

  if (!id) {
    return;
  }

  await updateNewsletterSubscription(id, { isActive: !currentlyActive });
  revalidateNewsletterPaths();
}

export async function deleteNewsletterSubscriptionAction(formData: FormData) {
  await requireSuperAdmin();

  const id = formData.get("id") as string | null;

  if (!id) {
    return;
  }

  await deleteNewsletterSubscription(id);
  revalidateNewsletterPaths();
}
