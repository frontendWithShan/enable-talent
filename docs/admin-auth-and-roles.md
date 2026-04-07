# Admin Auth And Roles

This document covers the Admin Auth and Roles PR for the web platform modernization workstream.

## What This PR Adds

- Supabase email/password admin sign-in at `/admin/login`
- server-protected `/admin/**` routes through `proxy.ts`
- app role model backed by `public.profiles`
- shared admin role and viewer helpers under `lib/auth`
- a reusable admin shell that replaces the legacy localStorage password gate
- transitional role-aware restrictions on the existing blog and careers admin pages

This PR does not add in-app user invitation management or migrate the legacy blog and careers data stores yet.

## Source Of Truth

- authentication: Supabase Auth session cookies
- authorization: `public.profiles.role` and `public.profiles.is_active`
- supported roles:
  - `super_admin`
  - `editor`
  - `guest_writer`

## Database Setup

Apply the migration:

```sql
supabase/migrations/20260404_admin_auth_and_roles.sql
```

It creates:

- `public.admin_role`
- `public.profiles`
- profile bootstrap trigger for `auth.users`
- indexes for role and active state
- row level security for self-profile reads

## Supabase Auth Configuration

Configure the Supabase project before testing the admin flow:

1. Enable Email provider sign-in for password-based login.
2. Disable open self-signup if the project currently allows public account creation.
3. Set the Site URL for each environment.
4. Add local, preview, and production URLs to the redirect allow list.

Recommended URLs:

- local: `http://localhost:3000`
- preview: your deployment preview domain
- production: your primary production domain

Even though this PR uses direct password sign-in, the Site URL and allow list should still be configured correctly for future invitation, reset-password, and email-driven auth flows.

## Bootstrap Provisioning

This PR is bootstrap-only for admin account management.

- create or invite admin users from the Supabase dashboard
- let the auth user sign in once, or create the account in advance
- assign the application role in `public.profiles`

Example: promote an invited user to `super_admin`

```sql
update public.profiles
set role = 'super_admin',
    is_active = true
where lower(email) = lower('admin@example.com');
```

Example: assign an editor

```sql
update public.profiles
set role = 'editor',
    is_active = true
where lower(email) = lower('editor@example.com');
```

Example: assign a guest writer

```sql
update public.profiles
set role = 'guest_writer',
    is_active = true
where lower(email) = lower('writer@example.com');
```

Example: disable admin access without deleting the auth user

```sql
update public.profiles
set is_active = false
where lower(email) = lower('former-admin@example.com');
```

## Current Route Access Matrix

- `/admin` -> `super_admin`
- `/admin/blogs` -> `super_admin`, `editor`, `guest_writer`
- `/admin/careers` -> `super_admin`, `editor`
- `/admin/contact` -> `super_admin`
- `/admin/demo-requests` -> `super_admin`
- `/admin/consultation-requests` -> `super_admin`
- `/admin/job-applications` -> `super_admin`
- `/admin/newsletter` -> `super_admin`
- `/admin/volunteer-applications` -> `super_admin`

## Transitional Behavior In This PR

- `super_admin`
  - full access to the current admin area
- `editor`
  - full access to blog management in the current app logic
  - view-only access to careers
- `guest_writer`
  - access to the blog section only
  - view-only behavior on the current legacy blog page until the CMS rewrite introduces draft ownership and publish controls

The guest writer limitation is intentional. The current blog page still talks directly to the legacy data layer and does not yet have a secure draft/publish permission model.

## Accessibility Direction

New or materially changed admin/auth components in this PR are intended to follow WCAG 2.2 AAA direction:

- visible keyboard focus
- semantic headings and landmarks
- descriptive error and permission messaging
- contrast targets aligned with AAA where practical in the existing system
- reduced-motion-safe behavior

This does not retroactively certify untouched legacy admin pages. It sets the implementation bar for the routes and components changed in this PR.

## Verification Checklist

1. Confirm `.env.local` contains the Supabase URL, publishable key, and secret key.
2. Run `npm run supabase:check`.
3. Start the app with `npm run dev`.
4. Verify unauthenticated access to `/admin` redirects to `/admin/login`.
5. Verify each seeded role lands in the correct allowed section after sign-in.
6. Verify logout removes admin access immediately.
7. Verify back-button or stale local state does not restore admin access.
