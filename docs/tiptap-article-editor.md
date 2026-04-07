# Tiptap Article Editor

This document covers the internal article authoring workflow introduced in Card 5.

## Scope

Implemented in this card:
- Medium-style Tiptap editor for internal blog articles
- `body_json` as the canonical stored article document
- server-generated `body_html` derived from `body_json`
- cover image upload flow backed by the `blog-images` Supabase bucket
- inline image upload flow backed by the `blog-images` Supabase bucket
- media asset records written to `public.media_assets`
- upload-first draft bootstrap for `/admin/blogs/new`
- guest writer draft save support with publish restrictions preserved

Not included in this card:
- public `/blogs` cutover to Supabase-rendered article content
- advanced editor blocks beyond the MVP toolset
- remote URL image embeds
- orphaned media reconciliation beyond normal post deletion

## Relevant files

- `supabase/migrations/20260405_tiptap_article_editor.sql`
- `app/admin/blogs/actions.ts`
- `app/api/admin/blogs/upload/route.ts`
- `components/admin/blogs/BlogEditorForm.tsx`
- `components/admin/blogs/BlogTiptapEditor.tsx`
- `lib/blogs/content.ts`
- `lib/blogs/editor.ts`
- `lib/blogs/uploads.ts`

## Migration

Apply the following migrations before using the editor against the target Supabase project:
- `supabase/migrations/20260404_core_schema_and_storage.sql`
- `supabase/migrations/20260405_blog_cms_slug_rules.sql`
- `supabase/migrations/20260405_tiptap_article_editor.sql`

The Card 5 migration adds:
- `public.content_posts.cover_image_alt`

## Supported editor features

Internal article authoring supports:
- paragraphs
- heading level 2
- heading level 3
- bold
- italic
- bullet lists
- ordered lists
- blockquotes
- horizontal rules
- links
- inline images

External curated links still use the metadata-only form and do not use Tiptap for body content.

## Content storage

For `source_type = 'internal_article'`:
- `body_json` stores the Tiptap JSON document and is the source of truth
- `body_html` is generated on the server from `body_json` when the post is saved or published

For `source_type = 'external_link'`:
- `body_json` and `body_html` are cleared on save
- `external_url` remains required

## Media handling

### Cover images

- cover images are uploaded to the `blog-images` bucket
- the uploaded public URL is stored in `content_posts.cover_image_url`
- the accessible description is stored in `content_posts.cover_image_alt`
- cover upload is file-based only in this card
- JPEG and PNG cover images are resized client-side before upload when they exceed the editor limits

### Inline images

- inline images are uploaded to the `blog-images` bucket
- a `media_assets` row is created for each upload with `kind = 'blog_image'`
- the image is inserted into the Tiptap document with `src` and `alt`
- inline uploads are available only for internal articles
- JPEG and PNG inline images are resized client-side before upload when they exceed the editor limits

### Upload-first draft bootstrap

When an author uploads a cover or inline image from `/admin/blogs/new`:
- title and summary must already be present
- the server auto-creates a draft `content_posts` row
- the upload is attached to that draft
- the admin UI redirects into `/admin/blogs/[id]/edit`
- pending editor/form state is transferred into the edit view so the author can continue without retyping

## Validation and permissions

- internal articles require non-empty Tiptap content on save/publish
- external links require `external_url`
- cover uploads require alt text
- only raster image uploads are accepted: PNG, JPEG, WEBP, GIF, AVIF
- uploads are limited to 5 MB per file

Role behavior remains:
- `super_admin`
  - can save drafts and publish
- `editor`
  - can save drafts and publish
- `guest_writer`
  - can save drafts and upload media to own drafts
  - cannot publish

## Notes

- apply the migrations before testing uploads or Tiptap persistence against Supabase
- public blog rendering from published Supabase content is documented in `docs/public-blog-live-data.md`
- the admin route now depends on the Supabase `blog-images` bucket created in Card 3
