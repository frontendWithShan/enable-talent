import "server-only";

import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { isAdminRole, type AdminRole } from "@/lib/auth/roles";

import { ensureNoError } from "./shared";

export type TeamMemberRecord = {
  createdAt: string;
  email: string;
  fullName: string;
  id: string;
  isActive: boolean;
  role: AdminRole;
  updatedAt: string;
};

type ProfileRow = {
  created_at: string;
  email: string;
  full_name: string | null;
  id: string;
  is_active: boolean;
  role: string;
  updated_at: string;
};

function mapRow(row: ProfileRow): TeamMemberRecord {
  return {
    createdAt: row.created_at,
    email: row.email,
    fullName: row.full_name?.trim() || row.email.split("@")[0],
    id: row.id,
    isActive: row.is_active,
    role: isAdminRole(row.role) ? row.role : "guest_writer",
    updatedAt: row.updated_at,
  };
}

export async function getTeamMemberById(
  id: string,
): Promise<TeamMemberRecord | null> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, is_active, created_at, updated_at")
    .eq("id", id)
    .maybeSingle();

  ensureNoError(error);

  return data ? mapRow(data as ProfileRow) : null;
}

export async function listTeamMembers(): Promise<TeamMemberRecord[]> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, is_active, created_at, updated_at")
    .order("created_at", { ascending: true });

  ensureNoError(error);

  return (data ?? []).map((row) => mapRow(row as ProfileRow));
}

export async function updateTeamMemberRole(
  id: string,
  role: AdminRole,
): Promise<void> {
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase
    .from("profiles")
    .update({ role })
    .eq("id", id);

  ensureNoError(error);
}

export async function updateTeamMemberStatus(
  id: string,
  isActive: boolean,
): Promise<void> {
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase
    .from("profiles")
    .update({ is_active: isActive })
    .eq("id", id);

  ensureNoError(error);
}

export async function inviteTeamMember(
  email: string,
  fullName: string,
  role: AdminRole,
): Promise<{ id: string }> {
  const supabase = createAdminSupabaseClient();

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000";

  // Invite the user — this creates the auth.users record and fires the
  // handle_new_user_profile trigger which creates the profile row.
  const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
    data: { full_name: fullName },
    redirectTo: `${siteUrl}/admin/accept-invite`,
  });

  if (error) {
    throw new Error(error.message);
  }

  const userId = data.user.id;

  // Trigger already created the profile with default role 'guest_writer'.
  // Update to the desired role and full_name now.
  const { error: profileError } = await supabase
    .from("profiles")
    .update({ role, full_name: fullName || null })
    .eq("id", userId);

  if (profileError) {
    throw new Error(profileError.message);
  }

  return { id: userId };
}

/**
 * Permanently deletes the user from auth.users.
 * The profiles row is removed automatically via ON DELETE CASCADE.
 */
export async function deleteTeamMember(id: string): Promise<void> {
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase.auth.admin.deleteUser(id);

  if (error) {
    throw new Error(error.message);
  }
}
