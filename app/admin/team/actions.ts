"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import { isAdminRole, type AdminRole } from "@/lib/auth/roles";
import {
  deleteTeamMember,
  getTeamMemberById,
  inviteTeamMember,
  updateTeamMemberRole,
  updateTeamMemberStatus,
} from "@/lib/data/team";

async function requireSuperAdmin() {
  const viewer = await getAuthenticatedAdmin();

  if (!viewer) {
    redirect("/admin/login?next=%2Fadmin%2Fteam");
  }

  if (viewer.role !== "super_admin") {
    redirect("/admin/forbidden");
  }

  return viewer;
}

export async function updateTeamMemberRoleAction(formData: FormData) {
  const viewer = await requireSuperAdmin();

  const id = formData.get("id") as string | null;
  const role = formData.get("role") as string | null;

  if (!id || !role || !isAdminRole(role)) return;

  // Prevent super admin from demoting themselves
  if (id === viewer.id) {
    return;
  }

  await updateTeamMemberRole(id, role as AdminRole);
  revalidatePath("/admin/team");
}

export async function updateTeamMemberStatusAction(formData: FormData) {
  const viewer = await requireSuperAdmin();

  const id = formData.get("id") as string | null;
  const currentlyActive = formData.get("currentlyActive") === "true";

  if (!id) return;

  // Prevent super admin from deactivating themselves
  if (id === viewer.id) return;

  await updateTeamMemberStatus(id, !currentlyActive);
  revalidatePath("/admin/team");
}

export async function deleteTeamMemberAction(formData: FormData): Promise<{
  error?: string;
  success: boolean;
}> {
  const viewer = await requireSuperAdmin();

  const id = formData.get("id") as string | null;

  if (!id) return { error: "No user ID provided.", success: false };

  // Prevent super admin from deleting themselves
  if (id === viewer.id) {
    return { error: "You cannot delete your own account.", success: false };
  }

  // Prevent deleting another super admin
  const target = await getTeamMemberById(id);
  if (target?.role === "super_admin") {
    return { error: "Super admin accounts cannot be deleted.", success: false };
  }

  try {
    await deleteTeamMember(id);
    revalidatePath("/admin/team");
    return { success: true };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "The user could not be deleted.",
      success: false,
    };
  }
}

export async function inviteTeamMemberAction(formData: FormData): Promise<{
  error?: string;
  success: boolean;
}> {
  await requireSuperAdmin();

  const email = (formData.get("email") as string | null)?.trim();
  const fullName = (formData.get("fullName") as string | null)?.trim() ?? "";
  const role = formData.get("role") as string | null;

  if (!email) {
    return { error: "Email is required.", success: false };
  }

  if (!role || !isAdminRole(role)) {
    return { error: "A valid role is required.", success: false };
  }

  try {
    await inviteTeamMember(email, fullName, role as AdminRole);
    revalidatePath("/admin/team");
    return { success: true };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "The invitation could not be sent.",
      success: false,
    };
  }
}
