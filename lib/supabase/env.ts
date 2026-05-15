export type SupabasePublicEnv = {
  publishableKey: string;
  url: string;
};

export type SupabaseServerEnv = SupabasePublicEnv & {
  secretKey: string;
};

// Next.js only inlines NEXT_PUBLIC_* env vars into the browser bundle when
// accessed as static string literals (e.g. process.env.NEXT_PUBLIC_FOO).
// Dynamic access like process.env[name] is NOT replaced and will be undefined
// in client code. Therefore getSupabasePublicEnv must use literal references.

export function getSupabasePublicEnv(): SupabasePublicEnv {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const publishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url || !publishableKey) {
    console.warn(
      "⚠️ Supabase public environment variables are missing. Using demo placeholders.",
    );
  }

  return {
    url: url || "https://placeholder-project.supabase.co",
    publishableKey: publishableKey || "placeholder-anon-key",
  };
}

export function getSupabaseServerEnv(): SupabaseServerEnv {
  const secretKey =
    process.env.SUPABASE_SECRET_KEY?.trim() ||
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!secretKey) {
    console.warn(
      "⚠️ Supabase server environment variables are missing. Using demo placeholders.",
    );
  }

  return {
    ...getSupabasePublicEnv(),
    secretKey: secretKey || "placeholder-secret-key",
  };
}


