import "server-only";

import { createClient, type PostgrestError } from "@supabase/supabase-js";

import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { getSupabasePublicEnv } from "@/lib/supabase/env";

export function createDataAdminClient() {
  return createAdminSupabaseClient();
}

export function createDataPublicClient() {
  const { publishableKey, url } = getSupabasePublicEnv();

  return createClient(url, publishableKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export function ensureNoError(error: PostgrestError | null) {
  if (error) {
    throw new Error(error.message || "A database error occurred.");
  }
}

export function requireRecord<T>(value: T | null, context: string) {
  if (!value) {
    throw new Error(`Expected ${context} to exist.`);
  }

  return value;
}

export function stripUndefinedFields<T extends Record<string, unknown>>(value: T): T {
  return Object.fromEntries(
    Object.entries(value).filter(([, entryValue]) => entryValue !== undefined),
  ) as T;
}

export function toNullableNumber(value: number | string | null | undefined) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const parsedValue = typeof value === "number" ? value : Number(value);

  return Number.isFinite(parsedValue) ? parsedValue : null;
}
