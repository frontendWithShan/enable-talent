import type { MetadataRoute } from "next";

import { isExternalBlogPost } from "@/lib/blogs/public";
import { listPublishedPosts } from "@/lib/data/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.enabledtalent.com";
  let blogEntries: MetadataRoute.Sitemap = [];

  try {
    const posts = await listPublishedPosts();

    blogEntries = posts
      .filter((post) => !isExternalBlogPost(post))
      .map((post) => ({
        lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
        priority: 0.6,
        url: `${baseUrl}/blogs/${post.slug}`,
      }));
  } catch (error) {
    console.error("Error building blog sitemap entries:", error);
  }

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/about-us`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/foremployers`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/fortalents`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/careers`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/blogs`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/events`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/mission`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/students`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/enableacademy`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/africa`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/programs-awards`, lastModified: new Date(), priority: 0.6 },
    { url: `${baseUrl}/faqs`, lastModified: new Date(), priority: 0.5 },
    { url: `${baseUrl}/foremployers/agent`, lastModified: new Date(), priority: 0.6 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), priority: 0.3 },
    { url: `${baseUrl}/terms-of-use`, lastModified: new Date(), priority: 0.3 },
    { url: `${baseUrl}/accessibility-policy`, lastModified: new Date(), priority: 0.3 },
    { url: `${baseUrl}/responsible-ai`, lastModified: new Date(), priority: 0.3 },
    ...blogEntries,
  ];
}
