-- newsletter_subscriptions table
create table if not exists public.newsletter_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  is_active boolean not null default true,
  source text not null default 'website_footer',
  subscribed_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint newsletter_subscriptions_email_unique unique (email)
);

drop trigger if exists set_newsletter_subscriptions_updated_at on public.newsletter_subscriptions;

create trigger set_newsletter_subscriptions_updated_at
before update on public.newsletter_subscriptions
for each row
execute function public.set_updated_at();

create index if not exists newsletter_subscriptions_email_idx
  on public.newsletter_subscriptions(lower(email));

create index if not exists newsletter_subscriptions_is_active_idx
  on public.newsletter_subscriptions(is_active);

alter table public.newsletter_subscriptions enable row level security;

-- Public INSERT policies so anonymous visitors can submit volunteer
-- applications and newsletter subscriptions without authentication.

grant insert on public.volunteer_applications to anon, authenticated;
grant insert on public.newsletter_subscriptions to anon, authenticated;

drop policy if exists "public_insert_volunteer_applications" on public.volunteer_applications;

create policy "public_insert_volunteer_applications"
on public.volunteer_applications
for insert
to anon, authenticated
with check (true);

drop policy if exists "public_insert_newsletter_subscriptions" on public.newsletter_subscriptions;

create policy "public_insert_newsletter_subscriptions"
on public.newsletter_subscriptions
for insert
to anon, authenticated
with check (true);
