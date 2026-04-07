revoke all on public.content_posts from anon, authenticated;
revoke all on public.jobs from anon, authenticated;
revoke all on public.job_applications from anon, authenticated;
revoke all on public.volunteer_applications from anon, authenticated;
revoke all on public.contact_submissions from anon, authenticated;
revoke all on public.demo_requests from anon, authenticated;
revoke all on public.consultation_requests from anon, authenticated;
revoke all on public.media_assets from anon, authenticated;

grant select on public.content_posts to anon, authenticated;
grant select on public.jobs to anon, authenticated;

drop policy if exists "public_read_published_content_posts" on public.content_posts;

create policy "public_read_published_content_posts"
on public.content_posts
for select
to anon, authenticated
using (
  type = 'blog'
  and status = 'published'
);

drop policy if exists "public_read_active_jobs" on public.jobs;

create policy "public_read_active_jobs"
on public.jobs
for select
to anon, authenticated
using (
  status = 'published'
  and is_active = true
);

drop policy if exists "public_read_blog_images" on storage.objects;

create policy "public_read_blog_images"
on storage.objects
for select
to public
using (bucket_id = 'blog-images');

drop policy if exists "public_read_resumes" on storage.objects;
drop policy if exists "authenticated_read_resumes" on storage.objects;
