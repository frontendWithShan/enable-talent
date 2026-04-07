import Link from "next/link";

import { BlogImage } from "@/components/BlogImage";
import {
  formatBlogPublishedDate,
  getBlogPostHref,
  getBlogPostImage,
  getBlogPostImageAlt,
  isExternalBlogPost,
} from "@/lib/blogs/public";
import { listPublishedPosts } from "@/lib/data/posts";
import type { PostRecord } from "@/lib/data/types";
import placeholder from "@/public/images/placeholder-blog.jpg";

export const revalidate = 300;

export default async function BlogsPage() {
  let blogs: PostRecord[] = [];

  try {
    blogs = await listPublishedPosts();
  } catch (error) {
    console.error("Error fetching published blogs:", error);
  }

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto flex min-h-screen max-w-360 flex-col bg-white"
    >
      <section className="px-4 py-20 text-center">
        <h1 className="mb-4 text-3xl font-bold text-black sm:text-4xl md:text-5xl">
          News & Insights
        </h1>
        <p className="mx-auto max-w-2xl text-gray-600">
          Stay informed with cutting-edge AI insights, wellness innovation, and
          inclusive tech-driven hiring, connecting diverse talent with
          forward-thinking employers.
        </p>
      </section>

      <section aria-labelledby="blog-list-heading" className="px-4 pb-16">
        <div className="mx-auto max-w-7xl">
          <h2 id="blog-list-heading" className="sr-only">
            Published blog posts
          </h2>

          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => {
                const external = isExternalBlogPost(blog);
                const href = getBlogPostHref(blog);
                const publishedDate = formatBlogPublishedDate(blog.publishedAt);
                const card = (
                  <>
                    <div className="relative h-56 overflow-hidden rounded-t-xl">
                      <div className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
                        <BlogImage
                          alt={getBlogPostImageAlt(blog)}
                          placeholderSrc={placeholder.src}
                          src={getBlogPostImage(blog) ?? undefined}
                          unoptimized={Boolean(blog.coverImageUrl?.startsWith("http"))}
                        />
                      </div>
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-black/10 to-transparent opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100" />
                    </div>

                    <div className="p-5">
                      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-900">
                          {external ? "External source" : "Article"}
                        </span>
                        {publishedDate ? <span>{publishedDate}</span> : null}
                      </div>

                      <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-800">
                        {blog.title}
                      </h3>

                      <p className="text-sm text-gray-600 line-clamp-3">
                        {blog.summary}
                      </p>

                      {external ? (
                        <p className="mt-4 text-sm font-semibold text-[#0D3541]">
                          Open original source
                        </p>
                      ) : (
                        <p className="mt-4 text-sm font-semibold text-[#0D3541]">
                          Read article
                        </p>
                      )}
                    </div>
                  </>
                );

                const cardClassName =
                  "group block overflow-hidden rounded-xl bg-yellow-50 text-left shadow-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:bg-white hover:shadow-xl focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#005fcc] focus-visible:outline-offset-[3px] motion-reduce:transform-none motion-reduce:hover:transform-none motion-reduce:transition-none";

                return external ? (
                  <a
                    key={blog.id}
                    className={cardClassName}
                    href={href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {card}
                  </a>
                ) : (
                  <Link
                    key={blog.id}
                    className={cardClassName}
                    href={href}
                  >
                    {card}
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-10 text-center text-gray-700">
              No published blog posts are available right now.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
