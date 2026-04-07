import Image from "next/image";
import Link from "next/link";

import {
  getBlogPostHref,
  getBlogPostImage,
  getBlogPostImageAlt,
  isExternalBlogPost,
} from "@/lib/blogs/public";
import { listPublishedPosts } from "@/lib/data/posts";
import type { PostRecord } from "@/lib/data/types";

import FancyButton from "../FancyButton";

type FallbackBlog = {
  id: string;
  image: string;
  summary: string;
  title: string;
};

type SectionBlogCard = {
  external: boolean;
  href: string;
  id: string;
  image: string;
  imageAlt: string;
  imageUnoptimized: boolean;
  summary: string;
  title: string;
};

const fallbackBlogs: FallbackBlog[] = [
  {
    id: "1",
    image:
      "/images/SectionBlog/collaborating-modern-inclusive-office-environment.png",
    summary:
      "Job seekers with disabilities often face barriers that go beyond qualifications, from inaccessible applic...",
    title:
      "AI-powered hiring platform connects job seekers with disabilities to inclusive employers",
  },
  {
    id: "2",
    image:
      "/images/SectionBlog/close-up-picture-of-beautiful-charming-female-in-pale-pink-silk-shirt.png",
    summary:
      "Job seekers with disabilities often face barriers that go beyond qualifications, from inaccessible applic...",
    title:
      "AI-powered hiring platform connects job seekers with disabilities to inclusive employers",
  },
  {
    id: "3",
    image:
      "/images/SectionBlog/closeup-diverse-people-joining-their-hands.png",
    summary:
      "Job seekers with disabilities often face barriers that go beyond qualifications, from inaccessible applic...",
    title:
      "AI-powered hiring platform connects job seekers with disabilities to inclusive employers",
  },
];

export default async function SectionBlog() {
  let blogs: PostRecord[] = [];

  try {
    blogs = await listPublishedPosts({ limit: 3 });
  } catch (error) {
    console.error("Error fetching published blogs:", error);
  }

  const hasLiveBlogs = blogs.length > 0;
  const displayBlogs: SectionBlogCard[] = hasLiveBlogs
    ? blogs.map((blog) => ({
        external: isExternalBlogPost(blog),
        href: getBlogPostHref(blog),
        id: blog.id,
        image: getBlogPostImage(blog) ?? "/images/placeholder-blog.jpg",
        imageAlt: getBlogPostImageAlt(blog),
        imageUnoptimized: Boolean(blog.coverImageUrl?.startsWith("http")),
        summary: blog.summary.trim(),
        title: blog.title.trim(),
      }))
    : fallbackBlogs.map((blog) => ({
        external: false,
        href: `/blogs/${blog.id}`,
        id: blog.id,
        image: blog.image,
        imageAlt: blog.title
          ? `${blog.title} - blog post cover image`
          : "Enabled Talent blog post cover image",
        imageUnoptimized: false,
        summary: blog.summary.trim(),
        title: blog.title.trim(),
      }));

  return (
    <section className="bg-[#FFFDF5] px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-360">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#111111] sm:text-4xl md:text-[2.5rem]">
            News & Insights
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#666669]">
            Stay informed with cutting-edge AI insights, wellness innovation, and
            inclusive tech-driven hiring - connecting diverse talent with
            forward-thinking employers
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {displayBlogs.map((blog) => {
            const content = (
              <>
                <div className="relative h-64 overflow-hidden">
                  <Image
                    alt={blog.imageAlt}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    fill
                    src={blog.image}
                    unoptimized={blog.imageUnoptimized}
                  />
                </div>

                <div className="flex grow flex-col items-center justify-center p-6">
                  <h3 className="line-clamp-2 text-center text-base font-semibold text-[#111111] sm:text-lg">
                    {blog.title || "Enabled Talent blog post"}
                  </h3>
                  {blog.summary ? (
                    <p className="mt-2 line-clamp-2 text-center text-sm text-[#666669]">
                      {blog.summary}
                    </p>
                  ) : null}
                </div>
              </>
            );

            return (
              <article
                key={blog.id}
                className="group flex flex-col overflow-hidden rounded-[20px] bg-white shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl focus-within:outline focus-within:outline-[3px] focus-within:outline-[#005fcc] focus-within:outline-offset-[3px]"
              >
                {blog.external ? (
                  <a
                    className="flex h-full flex-col cursor-pointer focus-visible:outline-none"
                    href={blog.href}
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                    target="_blank"
                  >
                    {content}
                  </a>
                ) : (
                  <Link
                    className="flex h-full flex-col cursor-pointer focus-visible:outline-none"
                    href={blog.href}
                    style={{ textDecoration: "none" }}
                  >
                    {content}
                  </Link>
                )}
              </article>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Link className="inline-flex" href="/blogs">
            <FancyButton label="Read more" as="span" />
          </Link>
        </div>
      </div>
    </section>
  );
}
