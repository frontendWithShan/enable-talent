import "server-only";

import { createDataAdminClient, ensureNoError } from "@/lib/data/shared";
import { buildSlugCandidate, slugifyPostTitle } from "./slugify";

export async function resolveUniquePostSlug(
  value: string,
  options?: {
    excludePostId?: string;
  },
) {
  const baseSlug = slugifyPostTitle(value);
  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("content_posts")
    .select("id, slug")
    .ilike("slug", `${baseSlug}%`);

  ensureNoError(error);

  const matchingSlugs = new Set(
    (data ?? [])
      .filter((row) => row.id !== options?.excludePostId)
      .map((row) => String(row.slug).toLowerCase())
      .filter((slug) =>
        new RegExp(`^${baseSlug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:-(\\d+))?$`, "i").test(
          slug,
        ),
      ),
  );

  if (!matchingSlugs.has(baseSlug.toLowerCase())) {
    return baseSlug;
  }

  let suffix = 2;

  while (matchingSlugs.has(buildSlugCandidate(baseSlug, suffix).toLowerCase())) {
    suffix += 1;
  }

  return buildSlugCandidate(baseSlug, suffix);
}
