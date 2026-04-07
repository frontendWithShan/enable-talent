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

  if (!url) {
    throw new Error(
      "Missing required environment variable: NEXT_PUBLIC_SUPABASE_URL. Copy .env.example to .env.local and fill in the Supabase values.",
    );
  }

  try {
    new URL(url);
  } catch {
    throw new Error(
      "Environment variable NEXT_PUBLIC_SUPABASE_URL must be a valid URL.",
    );
  }

  const publishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!publishableKey) {
    throw new Error(
      "Missing required environment variable. Expected one of: NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  return { url, publishableKey };
}

export function getSupabaseServerEnv(): SupabaseServerEnv {
  const secretKey =
    process.env.SUPABASE_SECRET_KEY?.trim() ||
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!secretKey) {
    throw new Error(
      "Missing required environment variable. Expected one of: SUPABASE_SECRET_KEY, SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  return {
    ...getSupabasePublicEnv(),
    secretKey,
  };
}
