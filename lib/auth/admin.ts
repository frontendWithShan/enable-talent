import "server-only";

import { redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase/server";

import { canAccessAdminPath } from "./roles";
import { getAdminViewerWithClient } from "./viewer";

export async function getAuthenticatedAdmin() {
  const supabase = await createServerSupabaseClient();
  return getAdminViewerWithClient(supabase);
}

export async function requireAdminAccess(pathname: string) {
  const viewer = await getAuthenticatedAdmin();

  if (!viewer) {
    redirect(`/admin/login?next=${encodeURIComponent(pathname)}`);
  }

  if (!canAccessAdminPath(viewer.role, pathname)) {
    redirect("/admin/forbidden");
  }

  return viewer;
}
