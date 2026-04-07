# Blog CMS Backend

This document covers the admin blog CMS workflow introduced in Card 4.

## Scope

Implemented in this card:
- Supabase-backed admin list view for blog entries
- create flow for internal articles and external links
- edit flow for existing entries
- archive and delete actions
- draft, published, and archived states
- server-side slug generation and uniqueness handling
- guest writer ownership enforcement for drafts

Not included in this card:
- public `/blogs` cutover to Supabase content
- rich Tiptap editing
- media upload UI
- redirect management for post-publish slug changes

Follow-on rich authoring and upload behavior is documented in `docs/tiptap-article-editor.md`.

## Data model

Blog entries use `public.content_posts` with:
- `type = 'blog'`
- `source_type = 'internal_article'` or `source_type = 'external_link'`
- `status = 'draft'`, `status = 'published'`, or `status = 'archived'`

Relevant migrations:
- `supabase/migrations/20260404_core_schema_and_storage.sql`
- `supabase/migrations/20260405_blog_cms_slug_rules.sql`

The slug rules migration adds:
- case-insensitive unique index on `lower(slug)`
- slug format constraint using lowercase kebab-case

## Role behavior

- `super_admin`
  - full create, edit, publish, archive, and delete access
- `editor`
  - full create, edit, publish, archive, and delete access
- `guest_writer`
  - can create drafts
  - can edit only own draft entries
  - cannot publish
  - cannot archive
  - cannot delete

## Content types

### Internal article

Requires:
- title
- summary
- article body

Stores:
- `body_html`
- `body_json`

### External link

Requires:
- title
- summary
- `external_url`

Stores:
- summary and metadata in the CMS
- destination URL in `external_url`
- no internal article body

## Slug behavior

- slug is normalized server-side from the provided slug or title
- slugs use lowercase kebab-case
- uniqueness is enforced case-insensitively
- collisions are resolved with numeric suffixes such as `post-title-2`
- once a post has been published, its slug is treated as locked

## Admin routes

- `/admin/blogs`
  - list and filter blog entries
- `/admin/blogs/new`
  - create flow
- `/admin/blogs/[id]/edit`
  - edit flow

## Notes

- The old Firebase-backed `utils/blogService.ts` is no longer used by the admin blog route.
- Public blog routes are documented separately in `docs/public-blog-live-data.md`.
- Apply the Supabase migrations before trying to use the new admin blog workspace against the target project.
