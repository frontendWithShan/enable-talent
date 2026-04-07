# Supabase Foundation

This document covers the base Supabase integration added for the web platform modernization foundation PR.

## What This PR Adds

- declared Supabase dependencies for the Next.js app
- shared browser, server, and server-only admin client helpers
- a documented environment contract for local, preview, and production
- a lightweight connectivity check script for local verification

This PR does not switch the live site over to Supabase yet. Existing public pages keep their current data flows until later auth, CMS, and careers PRs land.

Follow-up auth and role setup guidance lives in `docs/admin-auth-and-roles.md`.

## Files Added For Foundation

- `lib/supabase/env.ts`
- `lib/supabase/browser.ts`
- `lib/supabase/server.ts`
- `lib/supabase/admin.ts`
- `scripts/verify-supabase-connection.mjs`
- `.env.example`

## Environment Contract

Primary variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SECRET_KEY`

Temporary legacy fallbacks supported by the helpers:

- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Rules:

- only `NEXT_PUBLIC_*` values may be used in browser code
- never expose `SUPABASE_SECRET_KEY` to the client
- keep local secrets in `.env.local`; do not commit them

## Local Setup

1. Copy `.env.example` to `.env.local`.
2. Fill in the project URL, publishable key, and secret key from the Supabase project connect dialog.
3. Install dependencies with `npm install`.
4. Run `npm run supabase:check` to verify the public auth endpoint and the server-side Data API endpoint are both reachable.
5. Start the app with `npm run dev`.

The current marketing pages do not yet depend on Supabase at render time. The new helpers validate environment variables only when they are called, so this PR does not force the public site to change behavior before auth and CMS work begins.

## Preview And Production Setup

Use the same three primary variables in each environment:

- local: `.env.local`
- preview: deployment platform preview environment variables
- production: deployment platform production environment variables

Deployment guidance:

- use the publishable key for browser and cookie-based SSR clients
- reserve the secret key for server-only actions, route handlers, and background jobs
- keep preview and production keys separate if they point at different Supabase projects
- rotate the secret key if it is ever exposed outside the server environment

## Helper Usage

Client components:

```ts
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

const supabase = createBrowserSupabaseClient();
```

Server components, server actions, and route handlers:

```ts
import { createServerSupabaseClient } from "@/lib/supabase/server";

const supabase = await createServerSupabaseClient();
```

Server-only privileged operations:

```ts
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

const supabase = createAdminSupabaseClient();
```

The cookie-based server client is foundation-only for now. When the auth PR starts, add the dedicated Supabase auth middleware/proxy before relying on it for session refresh.

## Verification

Use the connectivity script:

```bash
npm run supabase:check
```

Successful output confirms:

- the env file can be read
- the Supabase URL is valid
- the public auth endpoint responds with the configured publishable key
- the Data API responds with the configured secret key
