# Core Schema and Storage

This document covers the Phase 1/2 Supabase relational schema and storage foundation introduced for PR 3. The goal is to stand up the durable data model and storage structure before the app is cut over from Firebase-backed flows.

## Scope

Implemented in this card:
- relational tables for `content_posts`, `jobs`, `job_applications`, `volunteer_applications`, `contact_submissions`, `demo_requests`, `consultation_requests`, and `media_assets`
- profile extensions on top of the existing auth/RBAC foundation
- enum definitions for content, careers, applications, inquiries, and media workflows
- storage buckets for public blog media and private resumes
- a server-only data access layer under `lib/data/`
- a smoke script that exercises CRUD against the new schema

Intentionally not included in this card:
- Firebase backfill or migration
- newsletter migration
- tenant, knowledge, or chatbot tables
- UI cutover of current public/admin pages to the new repositories

## Migration

Apply the migration after the admin auth migration:

- `supabase/migrations/20260404_admin_auth_and_roles.sql`
- `supabase/migrations/20260404_core_schema_and_storage.sql`

Use your normal Supabase migration workflow or run the SQL directly in the Supabase SQL editor for the target project.

The core schema migration:
- extends `public.profiles` with `avatar_url`, `job_title`, and `last_login_at`
- adds a shared `public.set_updated_at()` trigger function
- creates the Phase 2 relational tables and indexes
- enables RLS with minimal safe defaults
- creates the `blog-images` and `resumes` storage buckets

## Storage buckets

- `blog-images`
  - public read
  - intended for blog cover images and article media
- `resumes`
  - private
  - intended for candidate and volunteer resume files

Writes remain server-mediated in this phase. Detailed upload policies and UI flows land in later CMS and applicant workflow cards.

## Repository layer

Server-only repositories now live under `lib/data/`:

- `posts.ts`
- `jobs.ts`
- `applications.ts`
- `inquiries.ts`
- `media.ts`

These modules use normalized field names and are intended to be the base integration point for later CMS, careers, and inquiry management work.

## Verification

1. Ensure `.env.local` contains the Supabase project values.
2. Verify base connectivity:
   - `npm run supabase:check`
3. Apply the migrations to the target Supabase project.
4. Run the CRUD smoke test:
   - `npm run supabase:smoke`

The smoke script checks:
- bucket presence for `blog-images` and `resumes`
- create, read, update, and cleanup for every new relational table in this card

## Notes

- Public read access is limited to published `content_posts` and active `jobs`.
- Protected writes and non-public reads are expected to use the service-role/admin client in this phase.
- Current UI routes are intentionally left on legacy data flows until the later CMS and public-page integration cards.
