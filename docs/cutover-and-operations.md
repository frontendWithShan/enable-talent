# Cutover And Operations

This runbook describes the current Enable Talent platform cutover state, required setup order, and the day-to-day operating model for the Supabase-backed system.

## Current source of truth

Supabase-backed domains:
- Blogs and public blog pages
- Careers CMS and public careers pages
- Public career applications and admin job-application review
- Contact, demo, and consultation inquiries
- Admin dashboard metrics for the migrated domains

Legacy-only domains for now:
- Newsletter subscriptions
- Volunteer applications

Legacy domains remain isolated under:
- `utils/legacy/newsletterService.ts`
- `utils/legacy/volunteerService.ts`

Do not reintroduce `utils/services.ts`, `utils/blogService.ts`, or `utils/careersService.ts` into active flows.

## Required setup order

Apply Supabase migrations in filename order:
1. `supabase/migrations/20260404_admin_auth_and_roles.sql`
2. `supabase/migrations/20260404_core_schema_and_storage.sql`
3. `supabase/migrations/20260405_blog_cms_slug_rules.sql`
4. `supabase/migrations/20260405_tiptap_article_editor.sql`
5. `supabase/migrations/20260407_careers_cms_status.sql`
6. `supabase/migrations/20260408_rls_hardening.sql`

Then verify the environment:
1. Copy `.env.example` to `.env.local`
2. Set:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SECRET_KEY`
3. Run `npm run supabase:check`
4. Run `npm run supabase:smoke`

## One-time legacy imports

Use JSON exports as the import source. The scripts are dry-run by default.

Blog import:
```bash
node scripts/import-legacy-blogs.mjs --input path/to/blogs.json
node scripts/import-legacy-blogs.mjs --input path/to/blogs.json --write
```

Careers import:
```bash
node scripts/import-legacy-jobs.mjs --input path/to/jobs.json
node scripts/import-legacy-jobs.mjs --input path/to/jobs.json --write
```

Import rules:
- Dry-run first. Review inserts, updates, skips, and slug adjustments.
- Use `--write` only after validating the dry-run report.
- The scripts upsert by slug and are safe to re-run.
- Imported blog `body_html` is preserved for public rendering.
- Imported blog `body_json` is a plain-text editor fallback when no structured source exists.

## Role matrix

- `super_admin`
  - Full access to dashboard, blogs, careers, inquiries, job applications, newsletter, volunteers
- `editor`
  - Blogs: create/edit/publish/archive
  - Careers: read-only admin access
- `guest_writer`
  - Blogs: own draft creation/editing only, no publish

Operationally restricted areas:
- `/admin`
- `/admin/inquiries`
- `/admin/job-applications`
- `/admin/newsletter`
- `/admin/volunteer-applications`

These remain `super_admin` only.

## Daily operating workflows

### Blogs
1. Go to `/admin/blogs`
2. Create or edit a post
3. Save draft, review, then publish
4. Confirm the post appears on `/blogs`

### Careers
1. Go to `/admin/careers`
2. Create or edit a role
3. Save as draft, then publish
4. Confirm the role appears on `/careers`

### Job applications
1. Review submissions at `/admin/job-applications`
2. Update status and internal notes
3. Use the admin resume route to open the stored resume securely

### Inquiries
1. Review inbound requests at `/admin/inquiries`
2. Filter by type, status, source, or category
3. Assign, update status, add notes, and schedule where relevant

## Setup verification

After deploy or environment setup:
1. Confirm admin login works for a seeded `super_admin`
2. Confirm `/admin/blogs` loads
3. Confirm `/admin/careers` loads
4. Confirm `/admin/inquiries` loads
5. Confirm `/admin/job-applications` loads
6. Confirm `/blogs` shows published content
7. Confirm `/careers` shows published active roles
8. Confirm public career application submission works with resume upload

## Security notes

- Public reads are restricted to published blog content and published active jobs.
- Resumes stay in the private `resumes` bucket.
- Inquiries, job applications, volunteer applications, and media records are not exposed directly to anon or broad authenticated clients.
- Admin writes continue to rely on server-side role checks using the service-role-backed repositories.

## Troubleshooting

- `column jobs.status does not exist`
  - The careers status migration has not been applied. Run `20260407_careers_cms_status.sql`.

- Public/admin pages show stale route behavior in development
  - Remove `.next` and restart `npm run dev`.

- Import script fails immediately
  - Verify `.env.local` points to the intended Supabase project and the input file is valid JSON.
