do $$
begin
  create type public.content_type as enum ('blog');
exception
  when duplicate_object then null;
end
$$;

do $$
begin
  create type public.content_source_type as enum ('internal_article', 'external_link');
exception
  when duplicate_object then null;
end
$$;

do $$
begin
  create type public.content_status as enum ('draft', 'scheduled', 'published', 'archived');
exception
  when duplicate_object then null;
end
$$;

do $$
begin
  create type public.audience_type as enum (
    'all',
    'employers',
    'talent',
    'educators',
    'ngo',
    'government'
  );
exception
  when duplicate_object then null;
end
$$;

do $$
begin
  create type public.region_code as enum (
    'global',
    'canada',
    'africa',
    'united_states',
    'spain',
    'saudi_arabia',
    'qatar'
  );
exception
  when duplicate_object then null;
end
$$;

do $$
begin
  create type public.employment_type as enum (
    'full_time',
    'part_time',
    'contract',
    'internship',
    'temporary',
    'freelance'
  );
exception
  when duplicate_object then null;
end
$$;

do $$
begin
  create type public.work_mode as enum ('onsite', 'hybrid', 'remote');
exception
  when duplicate_object then null;
end
$$;

do $$
begin
  create type public.salary_period as enum ('hour', 'month', 'year');
exception
  when duplicate_object then null;
end
$$;

do $$
begin
  create type public.application_status as enum (
    'pending',
    'reviewed',
    'shortlisted',
    'accepted',
    'rejected',
    'hired'
  );
exception
  when duplicate_object then null;
end
$$;

do $$
begin
  create type public.volunteer_status as enum (
    'pending',
    'reviewed',
    'accepted',
    'rejected'
  );
exception
  when duplicate_object then null;
end
$$;

do $$
begin
  create type public.inquiry_status as enum (
    'new',
    'pending',
    'in_progress',
    'scheduled',
    'contacted',
    'resolved',
    'completed',
    'closed',
    'cancelled'
  );
exception
  when duplicate_object then null;
end
$$;

do $$
begin
  create type public.media_kind as enum ('blog_image', 'resume');
exception
  when duplicate_object then null;
end
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

alter table public.profiles
  add column if not exists avatar_url text,
  add column if not exists job_title text,
  add column if not exists last_login_at timestamptz;

drop trigger if exists set_profiles_updated_at on public.profiles;

create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

create table if not exists public.content_posts (
  id uuid primary key default gen_random_uuid(),
  type public.content_type not null default 'blog',
  source_type public.content_source_type not null default 'internal_article',
  status public.content_status not null default 'draft',
  title text not null,
  slug text not null unique,
  summary text not null,
  body_json jsonb,
  body_html text,
  seo_title text,
  seo_description text,
  cover_image_url text,
  canonical_url text,
  external_url text,
  author_name text,
  reading_time_minutes integer,
  audience public.audience_type not null default 'all',
  region public.region_code not null default 'global',
  is_featured boolean not null default false,
  published_at timestamptz,
  scheduled_for timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint content_posts_reading_time_check
    check (reading_time_minutes is null or reading_time_minutes >= 0),
  constraint content_posts_external_link_check
    check (
      (source_type = 'external_link' and external_url is not null)
      or source_type = 'internal_article'
    ),
  constraint content_posts_external_url_format_check
    check (external_url is null or external_url ~ '^https?://'),
  constraint content_posts_canonical_url_format_check
    check (canonical_url is null or canonical_url ~ '^https?://')
);

drop trigger if exists set_content_posts_updated_at on public.content_posts;

create trigger set_content_posts_updated_at
before update on public.content_posts
for each row
execute function public.set_updated_at();

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text,
  description_html text,
  location_text text,
  work_mode public.work_mode,
  employment_type public.employment_type,
  experience_level text,
  salary_min numeric(12, 2),
  salary_max numeric(12, 2),
  salary_currency text,
  salary_period public.salary_period,
  application_deadline timestamptz,
  is_active boolean not null default true,
  is_featured boolean not null default false,
  published_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint jobs_salary_range_check
    check (
      salary_min is null
      or salary_max is null
      or salary_max >= salary_min
    )
);

drop trigger if exists set_jobs_updated_at on public.jobs;

create trigger set_jobs_updated_at
before update on public.jobs
for each row
execute function public.set_updated_at();

create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text,
  linkedin_url text,
  portfolio_url text,
  cover_letter text,
  resume_path text,
  source text not null default 'website',
  status public.application_status not null default 'pending',
  reviewed_by uuid references public.profiles(id) on delete set null,
  reviewed_at timestamptz,
  internal_notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

drop trigger if exists set_job_applications_updated_at on public.job_applications;

create trigger set_job_applications_updated_at
before update on public.job_applications
for each row
execute function public.set_updated_at();

create table if not exists public.volunteer_applications (
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
  resume_path text,
  source text not null default 'about-us-volunteer-section',
  status public.volunteer_status not null default 'pending',
  reviewed_by uuid references public.profiles(id) on delete set null,
  reviewed_at timestamptz,
  internal_notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

drop trigger if exists set_volunteer_applications_updated_at on public.volunteer_applications;

create trigger set_volunteer_applications_updated_at
before update on public.volunteer_applications
for each row
execute function public.set_updated_at();

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  company text,
  phone text,
  subject text,
  message text not null,
  inquiry_type text,
  source text not null default 'website',
  status public.inquiry_status not null default 'new',
  assigned_to uuid references public.profiles(id) on delete set null,
  resolved_at timestamptz,
  internal_notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

drop trigger if exists set_contact_submissions_updated_at on public.contact_submissions;

create trigger set_contact_submissions_updated_at
before update on public.contact_submissions
for each row
execute function public.set_updated_at();

create table if not exists public.demo_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  company_name text,
  phone text,
  message text not null,
  source text not null default 'website',
  status public.inquiry_status not null default 'pending',
  assigned_to uuid references public.profiles(id) on delete set null,
  scheduled_for timestamptz,
  internal_notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

drop trigger if exists set_demo_requests_updated_at on public.demo_requests;

create trigger set_demo_requests_updated_at
before update on public.demo_requests
for each row
execute function public.set_updated_at();

create table if not exists public.consultation_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  company_name text,
  phone text,
  message text,
  preferred_date date,
  preferred_time text,
  source text not null default 'website',
  status public.inquiry_status not null default 'pending',
  assigned_to uuid references public.profiles(id) on delete set null,
  scheduled_for timestamptz,
  internal_notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

drop trigger if exists set_consultation_requests_updated_at on public.consultation_requests;

create trigger set_consultation_requests_updated_at
before update on public.consultation_requests
for each row
execute function public.set_updated_at();

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  kind public.media_kind not null,
  bucket_name text not null,
  object_path text not null,
  file_name text not null,
  mime_type text,
  size_bytes bigint,
  public_url text,
  uploaded_by uuid references public.profiles(id) on delete set null,
  post_id uuid references public.content_posts(id) on delete set null,
  job_application_id uuid references public.job_applications(id) on delete set null,
  volunteer_application_id uuid references public.volunteer_applications(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (bucket_name, object_path),
  constraint media_assets_size_bytes_check
    check (size_bytes is null or size_bytes >= 0),
  constraint media_assets_bucket_kind_check
    check (
      (kind = 'blog_image' and bucket_name = 'blog-images')
      or (kind = 'resume' and bucket_name = 'resumes')
    ),
  constraint media_assets_owner_reference_check
    check (
      (
        case when post_id is not null then 1 else 0 end
        + case when job_application_id is not null then 1 else 0 end
        + case when volunteer_application_id is not null then 1 else 0 end
      ) <= 1
    )
);

drop trigger if exists set_media_assets_updated_at on public.media_assets;

create trigger set_media_assets_updated_at
before update on public.media_assets
for each row
execute function public.set_updated_at();

create index if not exists content_posts_status_idx
  on public.content_posts(status);

create index if not exists content_posts_type_status_idx
  on public.content_posts(type, status);

create index if not exists content_posts_published_at_idx
  on public.content_posts(published_at desc);

create index if not exists content_posts_region_idx
  on public.content_posts(region);

create index if not exists content_posts_audience_idx
  on public.content_posts(audience);

create index if not exists content_posts_featured_idx
  on public.content_posts(is_featured);

create index if not exists jobs_is_active_idx
  on public.jobs(is_active);

create index if not exists jobs_published_at_idx
  on public.jobs(published_at desc);

create index if not exists job_applications_job_id_idx
  on public.job_applications(job_id);

create index if not exists job_applications_status_idx
  on public.job_applications(status);

create index if not exists job_applications_email_idx
  on public.job_applications(lower(email));

create index if not exists volunteer_applications_status_idx
  on public.volunteer_applications(status);

create index if not exists volunteer_applications_email_idx
  on public.volunteer_applications(lower(email));

create index if not exists contact_submissions_status_idx
  on public.contact_submissions(status);

create index if not exists contact_submissions_email_idx
  on public.contact_submissions(lower(email));

create index if not exists contact_submissions_source_idx
  on public.contact_submissions(source);

create index if not exists demo_requests_status_idx
  on public.demo_requests(status);

create index if not exists demo_requests_email_idx
  on public.demo_requests(lower(email));

create index if not exists consultation_requests_status_idx
  on public.consultation_requests(status);

create index if not exists consultation_requests_email_idx
  on public.consultation_requests(lower(email));

create index if not exists media_assets_kind_idx
  on public.media_assets(kind);

create index if not exists media_assets_post_id_idx
  on public.media_assets(post_id);

create index if not exists media_assets_job_application_id_idx
  on public.media_assets(job_application_id);

create index if not exists media_assets_volunteer_application_id_idx
  on public.media_assets(volunteer_application_id);

alter table public.content_posts enable row level security;
alter table public.jobs enable row level security;
alter table public.job_applications enable row level security;
alter table public.volunteer_applications enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.demo_requests enable row level security;
alter table public.consultation_requests enable row level security;
alter table public.media_assets enable row level security;

grant select on public.content_posts to anon, authenticated;
grant select on public.jobs to anon, authenticated;

drop policy if exists "public_read_published_content_posts" on public.content_posts;

create policy "public_read_published_content_posts"
on public.content_posts
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "public_read_active_jobs" on public.jobs;

create policy "public_read_active_jobs"
on public.jobs
for select
to anon, authenticated
using (is_active = true);

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values
  (
    'blog-images',
    'blog-images',
    true,
    10485760,
    array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  ),
  (
    'resumes',
    'resumes',
    false,
    15728640,
    array[
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
  )
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "public_read_blog_images" on storage.objects;

create policy "public_read_blog_images"
on storage.objects
for select
to public
using (bucket_id = 'blog-images');
