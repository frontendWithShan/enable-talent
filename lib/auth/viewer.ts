import type { SupabaseClient, User } from "@supabase/supabase-js";

import { isAdminRole, type AdminViewer } from "./roles";

type AdminProfileRecord = {
  full_name: string | null;
  is_active: boolean;
  role: string;
};

type AdminCapableSupabaseClient = Pick<SupabaseClient, "auth" | "from">;

export async function getAdminProfileByUserId(
  supabase: AdminCapableSupabaseClient,
  userId: string,
) {
  const { data, error } = await supabase
    .from("profiles")
    .select("full_name, is_active, role")
    .eq("id", userId)
    .maybeSingle<AdminProfileRecord>();

  if (error) {
    throw error;
  }

  return data;
}

export function toAdminViewer(user: User, profile: AdminProfileRecord | null) {
  if (!profile || !profile.is_active || !isAdminRole(profile.role)) {
    return null;
  }

  return {
    email: user.email ?? "",
    fullName:
      profile.full_name?.trim() ||
      (typeof user.user_metadata?.full_name === "string"
        ? user.user_metadata.full_name
        : "") ||
      user.email?.split("@")[0] ||
      "Admin User",
    id: user.id,
    isActive: profile.is_active,
    role: profile.role,
  } satisfies AdminViewer;
}

export async function getAdminViewerWithClient(
  supabase: AdminCapableSupabaseClient,
) {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    // AuthSessionMissingError is expected after sign-out — treat as no session
    if (error.name === "AuthSessionMissingError") {
      return null;
    }
    throw error;
  }

  if (!user) {
    return null;
  }

  const profile = await getAdminProfileByUserId(supabase, user.id);

  return toAdminViewer(user, profile);
}
