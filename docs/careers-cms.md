# Careers CMS

This card replaces the legacy `/admin/careers` admin page with a Supabase-backed careers CMS for internal job postings.

## Scope

- Admin list view at `/admin/careers`
- Create flow at `/admin/careers/new`
- Edit and review flow at `/admin/careers/[id]/edit`
- Structured job lifecycle using `draft`, `published`, and `archived`
- Admin search and filters for title, slug, location, employment type, and work mode

Public careers pages remain on the legacy fetching flow in this card, and job applications stay on `/admin/job-applications`.

## Roles

- `super_admin`
  - Can create, edit, publish, and archive career postings
- `editor`
  - Can access `/admin/careers`
  - Can search, filter, and review postings in a read-only view

## Data model

The migration [`20260407_careers_cms_status.sql`](../supabase/migrations/20260407_careers_cms_status.sql) adds:

- enum `public.job_status`
- column `public.jobs.status`
- lifecycle sync trigger for `status`, `is_active`, and `published_at`

Backfill rules:

- `is_active = true` -> `published`
- `is_active = false` and `published_at is not null` -> `archived`
- `is_active = false` and `published_at is null` -> `draft`

## Admin fields

Career postings use these structured inputs:

- role title
- summary
- description
- location
- work mode
- employment type
- experience level
- salary minimum / maximum / currency / period
- application deadline
- featured toggle
- slug in secondary settings

Description authoring is plain text in this card and is normalized into `description_html` on save.

## Operational notes

- Create always starts as draft.
- Publish sets `status = published` and makes the compatibility lifecycle fields live.
- Archive sets `status = archived`.
- Published slugs remain stable.
- Archive replaces delete in this card.

## Verification

Recommended checks:

- `npx tsc --noEmit`
- `npx eslint app/admin/careers app/admin/careers/actions.ts components/admin/careers lib/careers lib/data/jobs.ts scripts/smoke-supabase-core-schema.mjs`
- `npm run build`

## Manual test checklist

1. Sign in as `super_admin`.
2. Open `/admin/careers`.
3. Create a draft posting.
4. Edit the posting and publish it.
5. Archive the posting.
6. Verify filters for status, employment type, and work mode.
7. Sign in as `editor`.
8. Verify `/admin/careers` is accessible but create/edit/publish/archive controls are not.
