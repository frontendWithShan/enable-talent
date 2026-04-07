do $$
begin
  if not exists (
    select 1
    from pg_type
    where typnamespace = 'public'::regnamespace
      and typname = 'job_status'
  ) then
    create type public.job_status as enum ('draft', 'published', 'archived');
  end if;
end
$$;

alter table public.jobs
  add column if not exists status public.job_status;

update public.jobs
set status = case
  when is_active = true then 'published'::public.job_status
  when is_active = false and published_at is not null then 'archived'::public.job_status
  else 'draft'::public.job_status
end
where status is null;

alter table public.jobs
  alter column status set default 'draft'::public.job_status;

update public.jobs
set status = 'draft'::public.job_status
where status is null;

alter table public.jobs
  alter column status set not null;

create or replace function public.sync_job_lifecycle_fields()
returns trigger
language plpgsql
as $$
begin
  if new.status is null then
    if new.is_active = true then
      new.status := 'published'::public.job_status;
    elsif new.published_at is not null then
      new.status := 'archived'::public.job_status;
    else
      new.status := 'draft'::public.job_status;
    end if;
  end if;

  if new.status = 'draft'::public.job_status then
    new.is_active := false;
    new.published_at := null;
  elsif new.status = 'published'::public.job_status then
    new.is_active := true;
    new.published_at := coalesce(new.published_at, timezone('utc', now()));
  elsif new.status = 'archived'::public.job_status then
    new.is_active := false;
  end if;

  return new;
end;
$$;

drop trigger if exists sync_jobs_lifecycle_fields on public.jobs;

create trigger sync_jobs_lifecycle_fields
before insert or update on public.jobs
for each row
execute function public.sync_job_lifecycle_fields();

create index if not exists jobs_status_idx
  on public.jobs(status);
