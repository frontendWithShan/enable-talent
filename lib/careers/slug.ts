import "server-only";

import { createDataAdminClient, ensureNoError } from "@/lib/data/shared";
import { buildSlugCandidate } from "@/lib/blogs/slugify";

import { slugifyJobTitle } from "./slugify";

export async function resolveUniqueJobSlug(
  value: string,
  options?: {
    excludeJobId?: string;
  },
) {
  const baseSlug = slugifyJobTitle(value);
  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("jobs")
    .select("id, slug")
    .ilike("slug", `${baseSlug}%`);

  ensureNoError(error);

  const matchingSlugs = new Set(
    (data ?? [])
      .filter((row) => row.id !== options?.excludeJobId)
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
