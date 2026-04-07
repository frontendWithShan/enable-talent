# Public Blog Pages on Live Data

This document covers the public blog cutover introduced in Card 6.

## Scope

Implemented in this card:
- the public `/blogs` index now reads live published blog posts from Supabase
- the public `/blogs/[slug]` detail route now reads published internal articles by slug
- stored article HTML is rendered from `content_posts.body_html`
- external-link entries appear in the public blog listing and open the source URL
- homepage blog highlights now use the same published Supabase source
- the sitemap includes internal published blog detail URLs
- public blog routes now use an explicit revalidation strategy

Not included in this card:
- public `/blogs` search, filtering, or pagination
- redirect history for published slug changes
- migration of the legacy admin dashboard blog count widget

## Live data source

Public blog routes now read from `public.content_posts` through:
- `lib/data/posts.ts`
- `lib/blogs/public.ts`

Only records that meet all of the following are included:
- `type = 'blog'`
- `status = 'published'`

Internal article detail pages also require:
- `source_type = 'internal_article'`

## Route behavior

### `/blogs`

- renders all published blog posts from Supabase
- supports both internal articles and external curated links
- external entries are clearly labeled and open in a new tab
- internal articles link to `/blogs/[slug]`

### `/blogs/[slug]`

- resolves the post by slug from published Supabase content
- renders internal article content from `body_html`
- returns `notFound()` when the slug does not map to a published post
- redirects to the source URL if an external-link post is resolved directly

### Homepage blog section

- the homepage blog teaser uses the three newest published Supabase blog posts
- if no live published posts exist yet, it falls back to the existing static cards

## Rendering

Article detail pages render:
- title
- summary
- published date
- author name when present
- cover image
- stored article HTML from `body_html`

The rendered article body includes styling for:
- headings
- paragraphs
- lists
- blockquotes
- links
- images

## External links

For `source_type = 'external_link'` posts:
- the blog listing card opens `external_url`
- the card is labeled as an external source
- direct slug resolution redirects to the source URL instead of rendering an internal article shell

## Caching and revalidation

The public blog routes use:
- `revalidate = 300`

This applies to:
- `/blogs`
- `/blogs/[slug]`

The sitemap also builds blog entries from the same published Supabase source.

## Notes

- the old Firebase-backed `utils/blogService.ts` is no longer used by the public blog index, article detail route, homepage blog highlights, or sitemap generation
- the legacy admin dashboard still uses the old blog service for counts; that is outside Card 6
- published article content must already exist in `content_posts.body_html` for the detail page to render the full article body
