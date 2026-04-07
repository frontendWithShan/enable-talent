import "server-only";

import {
  createDataAdminClient,
  createDataPublicClient,
  ensureNoError,
  requireRecord,
  stripUndefinedFields,
  toNullableNumber,
} from "./shared";
import type {
  AudienceType,
  ContentSourceType,
  ContentStatus,
  ContentType,
  CreatePostInput,
  JsonValue,
  PostRecord,
  RegionCode,
  UpdatePostInput,
} from "./types";

export type PostAdminListFilters = {
  createdBy?: string;
  sourceType?: ContentSourceType;
  status?: ContentStatus;
};

type PostRow = {
  author_name: string | null;
  audience: AudienceType;
  body_html: string | null;
  body_json: JsonValue | null;
  canonical_url: string | null;
  cover_image_alt: string | null;
  cover_image_url: string | null;
  created_at: string;
  created_by: string | null;
  external_url: string | null;
  id: string;
  is_featured: boolean;
  published_at: string | null;
  reading_time_minutes: number | string | null;
  region: RegionCode;
  scheduled_for: string | null;
  seo_description: string | null;
  seo_title: string | null;
  slug: string;
  source_type: ContentSourceType;
  status: ContentStatus;
  summary: string;
  title: string;
  type: ContentType;
  updated_at: string;
  updated_by: string | null;
};

const POST_SELECT = [
  "id",
  "type",
  "source_type",
  "status",
  "title",
  "slug",
  "summary",
  "body_json",
  "body_html",
  "seo_title",
  "seo_description",
  "cover_image_alt",
  "cover_image_url",
  "canonical_url",
  "external_url",
  "author_name",
  "reading_time_minutes",
  "audience",
  "region",
  "is_featured",
  "published_at",
  "scheduled_for",
  "created_by",
  "updated_by",
  "created_at",
  "updated_at",
].join(", ");

function mapPostRow(row: PostRow): PostRecord {
  return {
    authorName: row.author_name,
    audience: row.audience,
    bodyHtml: row.body_html,
    bodyJson: row.body_json,
    canonicalUrl: row.canonical_url,
    coverImageAlt: row.cover_image_alt,
    coverImageUrl: row.cover_image_url,
    createdAt: row.created_at,
    createdBy: row.created_by,
    externalUrl: row.external_url,
    id: row.id,
    isFeatured: row.is_featured,
    publishedAt: row.published_at,
    readingTimeMinutes: toNullableNumber(row.reading_time_minutes),
    region: row.region,
    scheduledFor: row.scheduled_for,
    seoDescription: row.seo_description,
    seoTitle: row.seo_title,
    slug: row.slug,
    sourceType: row.source_type,
    status: row.status,
    summary: row.summary,
    title: row.title,
    type: row.type,
    updatedAt: row.updated_at,
    updatedBy: row.updated_by,
  };
}

function toPostPayload(input: CreatePostInput | UpdatePostInput) {
  return stripUndefinedFields({
    author_name: input.authorName,
    audience: input.audience,
    body_html: input.bodyHtml,
    body_json: input.bodyJson,
    canonical_url: input.canonicalUrl,
    cover_image_alt: input.coverImageAlt,
    cover_image_url: input.coverImageUrl,
    created_by: input.createdBy,
    external_url: input.externalUrl,
    is_featured: input.isFeatured,
    published_at: input.publishedAt,
    reading_time_minutes: input.readingTimeMinutes,
    region: input.region,
    scheduled_for: input.scheduledFor,
    seo_description: input.seoDescription,
    seo_title: input.seoTitle,
    slug: input.slug,
    source_type: input.sourceType,
    status: input.status,
    summary: input.summary,
    title: input.title,
    type: input.type,
    updated_by: input.updatedBy,
  });
}

export async function createPost(input: CreatePostInput) {
  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("content_posts")
    .insert(toPostPayload(input))
    .select(POST_SELECT)
    .single();

  ensureNoError(error);

  return mapPostRow(requireRecord(data as unknown as PostRow | null, "content post"));
}

export async function updatePost(id: string, input: UpdatePostInput) {
  const updates = toPostPayload(input);

  if (Object.keys(updates).length === 0) {
    return requireRecord(await getPostById(id), `content post ${id}`);
  }

  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("content_posts")
    .update(updates)
    .eq("id", id)
    .select(POST_SELECT)
    .single();

  ensureNoError(error);

  return mapPostRow(
    requireRecord(data as unknown as PostRow | null, `content post ${id}`),
  );
}

export async function deletePost(id: string) {
  const supabase = createDataAdminClient();
  const { error } = await supabase.from("content_posts").delete().eq("id", id);
  ensureNoError(error);
}

export async function getPostById(id: string) {
  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("content_posts")
    .select(POST_SELECT)
    .eq("id", id)
    .maybeSingle();

  ensureNoError(error);

  return data ? mapPostRow(data as unknown as PostRow) : null;
}

export async function getPostBySlug(slug: string) {
  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("content_posts")
    .select(POST_SELECT)
    .eq("slug", slug)
    .maybeSingle();

  ensureNoError(error);

  return data ? mapPostRow(data as unknown as PostRow) : null;
}

export async function getPublishedPostBySlug(slug: string) {
  const supabase = createDataPublicClient();
  const { data, error } = await supabase
    .from("content_posts")
    .select(POST_SELECT)
    .eq("slug", slug)
    .eq("type", "blog")
    .eq("status", "published")
    .maybeSingle();

  ensureNoError(error);

  return data ? mapPostRow(data as unknown as PostRow) : null;
}

export async function listPublishedPosts(options?: {
  limit?: number;
}) {
  const supabase = createDataPublicClient();
  let query = supabase
    .from("content_posts")
    .select(POST_SELECT)
    .eq("type", "blog")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  ensureNoError(error);

  return (data ?? []).map((row) => mapPostRow(row as unknown as PostRow));
}

export async function listPostsForAdmin(filters?: PostAdminListFilters) {
  const supabase = createDataAdminClient();
  let query = supabase
    .from("content_posts")
    .select(POST_SELECT)
    .order("created_at", { ascending: false });

  if (filters?.status) {
    query = query.eq("status", filters.status);
  }

  if (filters?.sourceType) {
    query = query.eq("source_type", filters.sourceType);
  }

  if (filters?.createdBy) {
    query = query.eq("created_by", filters.createdBy);
  }

  const { data, error } = await query;
  ensureNoError(error);

  return (data ?? []).map((row) => mapPostRow(row as unknown as PostRow));
}

export async function publishPost(id: string, updatedBy?: string | null) {
  return updatePost(id, {
    publishedAt: new Date().toISOString(),
    status: "published",
    updatedBy,
  });
}

export async function archivePost(id: string, updatedBy?: string | null) {
  return updatePost(id, {
    status: "archived",
    updatedBy,
  });
}
