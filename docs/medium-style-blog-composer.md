# Medium-Style Blog Composer

Card 7 refactors the admin blog editor into two type-specific authoring experiences while keeping the existing Supabase CMS model, publish workflow, and public blog routing intact.

## What changed

- `internal_article` posts now open in a writer-first composer.
- `external_link` posts now open in a compact curated-link editor.
- draft content type switching is allowed only while the post status is `draft`.
- debounced backend autosave now persists eligible drafts after 2 seconds of idle time.
- explicit `Save Draft` and `Publish` actions remain available.
- local browser draft recovery remains in place as a fallback safety net.

## Internal article composer

The internal article flow now prioritizes writing:

- title and summary sit at the top of the canvas
- cover image handling stays integrated with the article header area
- Tiptap formatting appears contextually through selection and insertion menus
- inline images upload into `blog-images` and insert at the cursor
- secondary metadata lives in the settings panel

Settings panel fields:

- content type
- slug
- author name
- canonical URL
- SEO title
- SEO description
- featured toggle
- archive/delete actions when permitted

## External link editor

External links no longer use the full article composer. The curated-entry flow keeps only the fields needed for link-based publishing:

- title
- summary
- external URL
- source or publication label
- cover image and alt text
- settings panel for slug, canonical URL, SEO fields, and featured flag

The existing `author_name` field is reused as the source/publication label for this card.

## Autosave behavior

- autosave runs only for drafts and editable create flows
- autosave starts after title and summary are present plus:
  - non-empty article body for `internal_article`
  - non-empty `externalUrl` for `external_link`
- published and archived posts still require explicit save/publish flows
- autosave returns:
  - `ok`
  - `postId`
  - `savedAt`
  - optional `message` or `error`

Visible states in the composer:

- `Unsaved changes`
- `Saving draft...`
- `Draft saved`
- `Save failed`

## Role behavior

- `super_admin` and `editor` can autosave drafts, save manually, and publish
- `guest_writer` can autosave and save own drafts but cannot publish

## Manual QA

1. Internal article
   - Open `/admin/blogs/new`
   - Confirm the writer-first composer loads for `internal_article`
   - Enter title, summary, and article content
   - Wait 2 seconds and confirm autosave status updates
   - Upload a cover image and an inline image
   - Save draft manually, reload, and confirm content persists

2. External link
   - Switch content type to `External curated link` while still in draft
   - Confirm the compact editor replaces the full article body composer
   - Enter source/publication label and external URL
   - Wait for autosave and confirm save status updates

3. Type switching
   - Switch a draft from internal article to external link
   - Save or autosave and confirm body content no longer persists on the post
   - Publish a post and confirm content type switching becomes locked

4. Role checks
   - Verify `guest_writer` cannot publish
   - Verify `editor` and `super_admin` can publish

5. Public behavior
   - Confirm published internal articles still render on `/blogs/[slug]`
   - Confirm published external links still redirect to the source URL
