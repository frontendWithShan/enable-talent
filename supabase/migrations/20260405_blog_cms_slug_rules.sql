create unique index if not exists content_posts_slug_lower_unique_idx
  on public.content_posts (lower(slug));

do $$
begin
  alter table public.content_posts
    add constraint content_posts_slug_format_check
    check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$');
exception
  when duplicate_object then null;
end
$$;
