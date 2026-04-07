import { slugifyPostTitle } from "@/lib/blogs/slugify";

export function slugifyJobTitle(value: string) {
  return slugifyPostTitle(value);
}
