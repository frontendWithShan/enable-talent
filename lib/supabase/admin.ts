import "server-only";

import { createClient } from "@supabase/supabase-js";

import { getSupabaseServerEnv } from "./env";

export function createAdminSupabaseClient() {
  const { url, secretKey } = getSupabaseServerEnv();

  return createClient(url, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
