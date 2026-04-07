# Fullstack Redesign Blueprint

## Goal

Rebuild the current marketing-heavy site into a proper fullstack platform on:

- `Next.js 16` App Router
- `Supabase` for auth, Postgres, storage, and vector search
- `OpenAI Responses API` for chatbot and content workflows
- `Tiptap` OSS core plus custom UI for Medium-style article editing
- `Multi-tenant RAG` for company-specific chatbot answers grounded in approved documents

This blueprint is derived from the current codebase, which already manages:

- blogs
- job postings
- job applications
- volunteer applications
- contact submissions
- demo requests
- consultation requests
- newsletter subscriptions

Current Firebase collection sources:

- `Blogs`
- `jobPostings`
- `jobApplications`
- `volunteerApplications`
- `contactSubmissions`
- `demoRequests`
- `consultationRequests`
- `newsletterSubscriptions`

## Platform Decision

Choose `Supabase`, not `MongoDB + Mongoose`.

Reason:

- The platform data model is relational, not document-first.
- We need auth, RBAC, storage, editorial content, and public/private access rules.
- Supabase gives Postgres, row-level security, storage, and vector support in one stack.
- This project already fits server-rendered and server-action-driven Next.js patterns well.

## Domain Model

The target system should be split into these product domains:

- `auth`
- `profiles`
- `organizations`
- `tenancy`
- `content`
- `jobs`
- `applications`
- `inquiries`
- `newsletter`
- `chat`
- `knowledge`
- `media`
- `audit`

## Database Schema

All tables should use:

- `id uuid primary key default gen_random_uuid()`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Use a trigger to maintain `updated_at`.

### Enums

```sql
create type app_role as enum ('super_admin', 'admin', 'editor', 'recruiter', 'support');
create type content_type as enum ('blog', 'case_study', 'report', 'guide', 'event', 'page');
create type content_status as enum ('draft', 'scheduled', 'published', 'archived');
create type audience_type as enum ('all', 'employers', 'talent', 'educators', 'ngo', 'government');
create type region_code as enum ('global', 'canada', 'africa', 'united_states', 'spain', 'saudi_arabia', 'qatar');
create type inquiry_status as enum ('new', 'pending', 'in_progress', 'scheduled', 'contacted', 'resolved', 'completed', 'closed', 'cancelled');
create type application_status as enum ('pending', 'reviewed', 'shortlisted', 'accepted', 'rejected', 'hired');
create type volunteer_status as enum ('pending', 'reviewed', 'accepted', 'rejected');
create type employment_type as enum ('full_time', 'part_time', 'contract', 'internship', 'temporary', 'freelance');
create type work_mode as enum ('onsite', 'hybrid', 'remote');
create type salary_period as enum ('hour', 'month', 'year');
create type message_role as enum ('user', 'assistant', 'tool', 'system');
```

### `profiles`

Backs all authenticated internal users.

```sql
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  role app_role not null default 'editor',
  job_title text,
  is_active boolean not null default true,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

Indexes:

- `create index profiles_role_idx on profiles(role);`
- `create index profiles_is_active_idx on profiles(is_active);`

### `organizations`

Needed for employers, partners, regional teams, and customer tenants whose documents
will power company-specific chatbot answers.

```sql
create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  website_url text,
  logo_url text,
  description text,
  region region_code not null default 'global',
  kind text not null default 'customer',
  is_partner boolean not null default false,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### `organization_memberships`

Links authenticated users to customer organizations for tenant-specific admin and
knowledge base access.

```sql
create table organization_memberships (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  profile_id uuid not null references profiles(id) on delete cascade,
  member_role text not null default 'member',
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, profile_id)
);
```

### `content_categories`

```sql
create table content_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

Seed examples:

- `employers`
- `talent`
- `accessibility`
- `ai`
- `policy`
- `africa`
- `case-studies`
- `reports`

### `content_tags`

```sql
create table content_tags (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### `content_posts`

This replaces the current `Blogs` collection and also gives headroom for reports,
case studies, and guides.

Article editing approach:

- Use `Tiptap` as the editor
- Save `body_json` as the source of truth
- Save `body_html` as the render cache for public pages
- Store uploaded images in Supabase Storage, not in the row body itself

Important decision:

- `slug` is the slug
- `canonical_url` is the canonical public URL
- `external_url` is only for off-site destinations

Do not overload one field the way `BlogURL` is used today.

```sql
create table content_posts (
  id uuid primary key default gen_random_uuid(),
  type content_type not null default 'blog',
  status content_status not null default 'draft',
  title text not null,
  slug text not null unique,
  summary text not null,
  editor_type text not null default 'tiptap',
  body_json jsonb,
  body_html text,
  seo_title text,
  seo_description text,
  cover_image_url text,
  canonical_url text,
  external_url text,
  author_name text,
  reading_time_minutes integer,
  audience audience_type not null default 'all',
  region region_code not null default 'global',
  is_featured boolean not null default false,
  published_at timestamptz,
  scheduled_for timestamptz,
  created_by uuid references profiles(id),
  updated_by uuid references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint content_posts_external_url_check
    check (external_url is null or external_url ~ '^https?://')
);
```

Indexes:

- `create index content_posts_status_idx on content_posts(status);`
- `create index content_posts_type_status_idx on content_posts(type, status);`
- `create index content_posts_published_at_idx on content_posts(published_at desc);`
- `create index content_posts_region_idx on content_posts(region);`
- `create index content_posts_audience_idx on content_posts(audience);`
- `create index content_posts_featured_idx on content_posts(is_featured);`

### Editorial UX

The article authoring experience should feel closer to Medium than to a plain form.

Required editorial features:

- large title field
- optional summary/subtitle
- clean writing canvas
- inline formatting toolbar
- slash menu or insert menu for rich blocks
- draft autosave
- image upload to `blog-images`
- preview and publish workflow
- SEO fields and slug management

### `content_post_categories`

```sql
create table content_post_categories (
  post_id uuid not null references content_posts(id) on delete cascade,
  category_id uuid not null references content_categories(id) on delete cascade,
  primary key (post_id, category_id)
);
```

### `content_post_tags`

```sql
create table content_post_tags (
  post_id uuid not null references content_posts(id) on delete cascade,
  tag_id uuid not null references content_tags(id) on delete cascade,
  primary key (post_id, tag_id)
);
```

### `jobs`

This replaces `jobPostings`.

```sql
create table jobs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete set null,
  source_system text not null default 'internal',
  external_job_id text,
  external_apply_url text,
  title text not null,
  slug text not null unique,
  summary text,
  description_markdown text,
  description_html text,
  location_text text,
  country_code text,
  region region_code not null default 'global',
  work_mode work_mode,
  employment_type employment_type,
  experience_level text,
  salary_min numeric(12,2),
  salary_max numeric(12,2),
  salary_currency text,
  salary_period salary_period,
  application_deadline timestamptz,
  is_active boolean not null default true,
  is_featured boolean not null default false,
  published_at timestamptz,
  created_by uuid references profiles(id),
  updated_by uuid references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

Indexes:

- `create index jobs_is_active_idx on jobs(is_active);`
- `create index jobs_published_at_idx on jobs(published_at desc);`
- `create index jobs_region_idx on jobs(region);`
- `create index jobs_org_idx on jobs(organization_id);`

### `job_applications`

This replaces `jobApplications`.

```sql
create table job_applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references jobs(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text,
  linkedin_url text,
  portfolio_url text,
  cover_letter text,
  resume_path text,
  source text not null default 'website',
  status application_status not null default 'pending',
  reviewed_by uuid references profiles(id),
  reviewed_at timestamptz,
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

Indexes:

- `create index job_applications_job_id_idx on job_applications(job_id);`
- `create index job_applications_status_idx on job_applications(status);`
- `create index job_applications_email_idx on job_applications(email);`

### `volunteer_applications`

This replaces `volunteerApplications`.

```sql
create table volunteer_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  skills text,
  experience text,
  availability text,
  motivation text,
  linkedin_profile text,
  portfolio_website text,
  source text not null default 'about-us-volunteer-section',
  status volunteer_status not null default 'pending',
  reviewed_by uuid references profiles(id),
  reviewed_at timestamptz,
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### `contact_submissions`

This replaces `contactSubmissions`.

```sql
create table contact_submissions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  company text,
  phone text,
  subject text,
  message text not null,
  inquiry_type text,
  source text not null default 'website',
  status inquiry_status not null default 'new',
  assigned_to uuid references profiles(id),
  resolved_at timestamptz,
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### `demo_requests`

This replaces `demoRequests`.

```sql
create table demo_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  company_name text,
  phone text,
  message text not null,
  source text not null default 'website',
  status inquiry_status not null default 'pending',
  assigned_to uuid references profiles(id),
  scheduled_for timestamptz,
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### `consultation_requests`

This replaces `consultationRequests`.

```sql
create table consultation_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  company_name text,
  phone text,
  message text,
  preferred_date date,
  preferred_time text,
  source text not null default 'website',
  status inquiry_status not null default 'pending',
  assigned_to uuid references profiles(id),
  scheduled_for timestamptz,
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### `newsletter_subscribers`

This replaces `newsletterSubscriptions`.

```sql
create table newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  is_active boolean not null default true,
  source text not null default 'website_footer',
  subscribed_at timestamptz not null default now(),
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### `site_pages`

Use this only if you want selected marketing pages to become CMS-driven later.

```sql
create table site_pages (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  editor_type text not null default 'tiptap',
  body_json jsonb,
  body_html text,
  seo_title text,
  seo_description text,
  status content_status not null default 'draft',
  published_at timestamptz,
  created_by uuid references profiles(id),
  updated_by uuid references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### `chat_sessions`

Anonymous and authenticated chat both need a stable session object.
For tenant-specific assistants, sessions must also carry organization context.

```sql
create table chat_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete set null,
  organization_id uuid references organizations(id) on delete cascade,
  anonymous_id text,
  source_path text,
  locale text,
  region region_code not null default 'global',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### `chat_messages`

```sql
create table chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references chat_sessions(id) on delete cascade,
  role message_role not null,
  content text not null,
  model text,
  token_count integer,
  tool_name text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
```

Indexes:

- `create index chat_messages_session_id_idx on chat_messages(session_id, created_at);`

### `knowledge_documents`

Each source document that should be used by the chatbot.
These documents are not used to fine-tune a separate model per company.
They are retrieved at runtime so the chatbot answers from the correct tenant's
approved knowledge base.

```sql
create table knowledge_documents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete cascade,
  is_global boolean not null default false,
  source_type text not null,
  source_id uuid,
  title text not null,
  canonical_url text,
  storage_path text,
  mime_type text,
  visibility text not null default 'internal',
  ingestion_status text not null default 'pending',
  region region_code not null default 'global',
  status content_status not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### `knowledge_chunks`

Use pgvector for retrieval.

```sql
create extension if not exists vector;

create table knowledge_chunks (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references knowledge_documents(id) on delete cascade,
  chunk_index integer not null,
  content text not null,
  embedding vector(1536),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
```

Indexes:

- `create index knowledge_chunks_document_id_idx on knowledge_chunks(document_id);`
- `create index knowledge_chunks_embedding_idx on knowledge_chunks using ivfflat (embedding vector_cosine_ops) with (lists = 100);`

### `knowledge_sync_jobs`

Tracks parsing, chunking, and embedding work for uploaded company documents.

```sql
create table knowledge_sync_jobs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete cascade,
  knowledge_document_id uuid references knowledge_documents(id) on delete cascade,
  status text not null default 'queued',
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### `audit_logs`

```sql
create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references profiles(id),
  entity_type text not null,
  entity_id uuid,
  action text not null,
  before_data jsonb,
  after_data jsonb,
  created_at timestamptz not null default now()
);
```

## Storage Buckets

Create these buckets:

- `public-media`
- `blog-images`
- `job-assets`
- `resumes`
- `organization-logos`
- `company-documents`

Bucket rules:

- `public-media`, `blog-images`, `organization-logos`: public read, editor/admin write
- `resumes`: private, admin/recruiter read only
- `job-assets`: private by default, public only if explicitly needed
- `company-documents`: private, tenant-scoped read/write only

## Row-Level Security

Enable RLS on all tables.

Policy model:

- Public can `select` from published content and active jobs.
- Public does not write directly to application or inquiry tables from the browser.
- All writes for public forms go through server actions or route handlers.
- Authenticated staff can read and manage admin tables based on `profiles.role`.
- `super_admin` and `admin` have full access.
- `editor` can manage content, but not applications.
- `recruiter` can manage jobs and job applications.
- `support` can manage demos, consultations, newsletter, and contact submissions.
- Company-specific knowledge documents and chat sessions must be isolated by `organization_id`.
- Global documents may be shared across all assistants only when explicitly marked `is_global = true`.

## Next.js Folder Architecture

Recommended structure:

```text
app/
  (marketing)/
    page.tsx
    about-us/page.tsx
    africa/page.tsx
    blogs/
      page.tsx
      [slug]/page.tsx
    careers/
      page.tsx
      [jobId]/page.tsx
    events/page.tsx
    faqs/page.tsx
    foremployers/page.tsx
    fortalents/page.tsx
  (admin)/
    admin/
      layout.tsx
      page.tsx
      blogs/page.tsx
      blogs/[id]/page.tsx
      jobs/page.tsx
      jobs/[id]/page.tsx
      organizations/page.tsx
      knowledge/page.tsx
      applications/page.tsx
      volunteers/page.tsx
      contact/page.tsx
      demo-requests/page.tsx
      consultation-requests/page.tsx
      newsletter/page.tsx
  api/
    chat/route.ts
    knowledge/ingest/route.ts
    webhook/
      revalidate/route.ts
      jobs-sync/route.ts
  auth/
    callback/route.ts
components/
  admin/
  africa/
  blog/
  chat/
  forms/
  jobs/
  marketing/
  shared/
  ui/
lib/
  ai/
    prompts.ts
    retrieval.ts
    tools.ts
    company-scope.ts
  auth/
    guards.ts
    roles.ts
  blog/
    queries.ts
    mutations.ts
    mapper.ts
  jobs/
    queries.ts
    mutations.ts
    mapper.ts
  inquiries/
    queries.ts
    mutations.ts
  knowledge/
    ingest.ts
    chunk.ts
    embeddings.ts
    queries.ts
  storage/
    upload.ts
  supabase/
    browser.ts
    server.ts
    middleware.ts
    types.ts
  validations/
    blog.ts
    job.ts
    application.ts
    inquiry.ts
  utils/
    dates.ts
    slugs.ts
    seo.ts
```

## Rendering Model

Use this rendering split:

- Marketing pages: server components
- Admin pages: server components with client islands for forms/tables
- Public submit flows: server actions
- Chat endpoint: route handler

Do not keep direct client-side database access for privileged operations.

## Document Ingestion Model

Company-specific docs should be handled as a knowledge ingestion pipeline:

1. upload a document into `company-documents`
2. create a `knowledge_document` row
3. parse the file into text
4. chunk the text
5. generate embeddings
6. write chunks into `knowledge_chunks`
7. mark the document as ready for retrieval

Supported sources can start with:

- PDF
- DOCX
- Markdown
- plain text
- internal policy pages exported as HTML or Markdown

## Chatbot Design

### Phase 1

Site assistant with grounded answers from:

- published blog posts
- FAQs
- policy pages
- careers pages
- Africa page content
- future case studies and reports

### Phase 2

Add tenant-aware assistants for customer organizations.

These assistants should answer from customer-specific docs such as:

- HR policies
- employee handbooks
- SOPs
- onboarding guides
- support FAQs
- internal process docs

Do not treat this as per-company model training.
Treat it as runtime retrieval over a tenant-scoped knowledge base.

Add assistant tools:

- search jobs
- recommend relevant content by audience
- capture lead intent and push to CRM later

### Chat flow

1. User opens widget
2. Create `chat_session`
3. Determine `organization_id` or use platform-global mode
4. Save each message in `chat_messages`
5. Retrieve top matching `knowledge_chunks` from:
   - the tenant's documents
   - optionally global shared documents
6. Call OpenAI Responses API with:
   - system instructions
   - retrieved context
   - current conversation
7. Return assistant message
8. Persist answer

### Chat rules

- No hallucinated jobs or policies
- Always ground answers in stored content when possible
- If confidence is low, redirect user to human contact/demo flow
- Never let one company's assistant read another company's documents
- Prefer retrieval and citations over generic model answers

## Migration Map

Map existing Firebase collections into the new schema like this:

| Current Firebase | Target table |
| --- | --- |
| `Blogs` | `content_posts` |
| `jobPostings` | `jobs` |
| `jobApplications` | `job_applications` |
| `volunteerApplications` | `volunteer_applications` |
| `contactSubmissions` | `contact_submissions` |
| `demoRequests` | `demo_requests` |
| `consultationRequests` | `consultation_requests` |
| `newsletterSubscriptions` | `newsletter_subscribers` |

Field cleanup required during migration:

- `BlogURL` becomes `slug` or `external_url`
- `Description` becomes `summary`
- `Content` becomes `body_json` plus `body_html`
- `Created_At` becomes `created_at`
- `Updated_At` becomes `updated_at`
- `ImageUrl` becomes `cover_image_url`
- `Author` becomes `author_name`

## Initial Implementation Order

1. Add Supabase to the repo and generate typed database clients.
2. Build auth and replace the current localStorage admin gate.
3. Create the schema and storage buckets.
4. Build the Tiptap-based blog CMS and migrate blogs first.
5. Rebuild jobs and inquiry CRUD on top of Supabase.
6. Rebuild public `/blogs` and `/careers` on live data.
7. Add company document upload and ingestion.
8. Add tenant-aware chatbot and retrieval layer.
9. Remove Firebase services after parity is complete.

## What Not To Do

- Do not keep hardcoded admin passwords.
- Do not store slugs and external URLs in the same field.
- Do not let the browser write directly to privileged tables.
- Do not build the tenant chatbot before the content and knowledge schema are stable.
- Do not migrate every page into CMS-managed content on day one.
- Do not fine-tune a separate model for each company as the first implementation.
- Do not mix documents from multiple companies in one retrieval scope.

## First Build Scope

The best first milestone is:

- Supabase auth
- admin users
- Tiptap-based blog CMS
- jobs CMS
- inquiries dashboard
- redesigned public blogs page
- redesigned public careers page

That gives a real platform foundation without expanding into unnecessary product surface too early.

## Phased Delivery

### Phase 1: Core Platform

- Supabase auth and admin roles
- Tiptap-powered article editing
- blog and jobs CMS
- inquiries dashboard
- public redesign for blogs and careers

### Phase 2: Knowledge Foundations

- tenant-aware organizations and memberships
- company document upload
- parsing, chunking, and embedding pipeline
- knowledge base management UI

### Phase 3: Company-Specific Chatbot

- multi-tenant retrieval
- OpenAI Responses API integration
- grounded answers with citations
- escalation to human support when confidence is low
