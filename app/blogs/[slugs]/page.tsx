import DOMPurify from "isomorphic-dompurify";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import {
  formatBlogPublishedDate,
  getBlogPostImage,
  getBlogPostImageAlt,
  isExternalBlogPost,
} from "@/lib/blogs/public";
import { getPublishedPostBySlug, listPublishedPosts } from "@/lib/data/posts";

export const revalidate = 300;

function resolveSlug(slugs?: string | string[]) {
  return Array.isArray(slugs) ? slugs[0] : slugs;
}

export async function generateStaticParams() {
  try {
    const posts = await listPublishedPosts();

    return posts
      .filter((post) => !isExternalBlogPost(post))
      .map((post) => ({
        slugs: post.slug,
      }));
  } catch (error) {
    console.error("Error generating blog static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slugs?: string | string[] }>;
}): Promise<Metadata> {
  const { slugs } = await params;
  const slug = resolveSlug(slugs);

  if (!slug) {
    return {
      title: "Blog post",
    };
  }

  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog post not found",
    };
  }

  return {
    description: post.seoDescription ?? post.summary,
    title: post.seoTitle ?? post.title,
  };
}

type BlogPostPageProps = {
  params: Promise<{ slugs?: string | string[] }>;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slugs } = await params;
  const slug = resolveSlug(slugs);

  if (!slug) {
    return notFound();
  }

  let post = null;

  try {
    post = await getPublishedPostBySlug(slug);
  } catch (error) {
    console.error("Error fetching published blog post:", error);
  }

  if (!post) {
    return notFound();
  }

  if (isExternalBlogPost(post) && post.externalUrl) {
    redirect(post.externalUrl);
  }

  const imageUrl = getBlogPostImage(post) ?? "/images/placeholder-blog.jpg";
  const publishedDate = formatBlogPublishedDate(post.publishedAt);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-h-screen flex-col bg-white px-4 py-16"
    >
      <article className="mx-auto max-w-4xl overflow-hidden rounded-[20px] bg-white shadow-md">
        <div className="relative h-80 overflow-hidden sm:h-96">
          <Image
            alt={getBlogPostImageAlt(post)}
            className="object-cover"
            fill
            src={imageUrl}
            unoptimized={imageUrl.startsWith("http")}
          />
        </div>

        <div className="space-y-6 p-8">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-700">
              {publishedDate ? <span>{publishedDate}</span> : null}
              {post.authorName ? <span>By {post.authorName}</span> : null}
            </div>
            <h1 className="text-3xl font-bold text-[#111111] sm:text-4xl">
              {post.title}
            </h1>
            <p className="text-lg leading-8 text-slate-700">{post.summary}</p>
          </div>

          {post.bodyHtml ? (
            <div
              className="space-y-6 text-lg leading-8 text-slate-800 [&_a]:font-semibold [&_a]:text-[#0D3541] [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-slate-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_h2]:mt-10 [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h3]:mt-8 [&_h3]:text-2xl [&_h3]:font-semibold [&_img]:my-8 [&_img]:rounded-2xl [&_img]:shadow-sm [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:text-lg [&_p]:leading-8 [&_ul]:list-disc [&_ul]:pl-6"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.bodyHtml) }}
            />
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-8 text-slate-700">
              This article does not have additional body content yet.
            </div>
          )}

          <div className="pt-4">
            <Link
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 font-semibold text-[#0D3541] transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#0D3541] focus:ring-offset-2"
              href="/blogs"
            >
              Back to blogs
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
