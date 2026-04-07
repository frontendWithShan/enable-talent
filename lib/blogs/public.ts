import type { PostRecord } from "@/lib/data/types";

export function formatBlogPublishedDate(value: string | null) {
  if (!value) {
    return "";
  }

  return new Date(value).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function isExternalBlogPost(post: PostRecord) {
  return post.sourceType === "external_link" && Boolean(post.externalUrl);
}

export function getBlogPostHref(post: PostRecord) {
  return isExternalBlogPost(post) ? (post.externalUrl as string) : `/blogs/${post.slug}`;
}

export function getBlogPostImage(post: PostRecord) {
  return post.coverImageUrl ?? null;
}

export function getBlogPostImageAlt(post: PostRecord) {
  return post.coverImageAlt?.trim() || post.title;
}
