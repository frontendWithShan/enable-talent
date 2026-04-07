import { NextResponse } from "next/server";

import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import { normalizeOptionalText, normalizeSourceType } from "@/lib/blogs/content";
import {
  assertCanCreateBlogPost,
  assertCanEditBlogPost,
} from "@/lib/blogs/permissions";
import { resolveUniquePostSlug } from "@/lib/blogs/slug";
import {
  BLOG_IMAGE_BUCKET,
  BLOG_IMAGE_MIME_TYPES,
  BLOG_IMAGE_MAX_BYTES,
  buildBlogImageObjectPath,
  deriveImageAltText,
  type BlogImageUploadKind,
} from "@/lib/blogs/uploads";
import { createMediaAsset } from "@/lib/data/media";
import { createPost, getPostById, updatePost } from "@/lib/data/posts";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

function jsonError(message: string, status: number) {
  return NextResponse.json(
    {
      error: message,
    },
    {
      status,
    },
  );
}

function normalizeUploadKind(value: FormDataEntryValue | null): BlogImageUploadKind | null {
  if (value === "cover" || value === "inline") {
    return value;
  }

  return null;
}

const ALLOWED_URL_PROTOCOLS = ["http:", "https:", "mailto:"];

function normalizeOptionalUrl(value: FormDataEntryValue | null) {
  const normalizedValue = normalizeOptionalText(value);

  if (!normalizedValue) {
    return null;
  }

  let parsed: URL;

  try {
    parsed = new URL(normalizedValue);
  } catch {
    throw new Error("Enter a valid URL before uploading media.");
  }

  if (!ALLOWED_URL_PROTOCOLS.includes(parsed.protocol)) {
    throw new Error("Only http, https, and mailto URLs are allowed.");
  }

  return normalizedValue;
}

async function createDraftForUpload(formData: FormData, viewer: Awaited<ReturnType<typeof getAuthenticatedAdmin>>) {
  if (!viewer) {
    throw new Error("Authentication is required.");
  }

  assertCanCreateBlogPost(viewer);

  const title = normalizeOptionalText(formData.get("title"));
  const summary = normalizeOptionalText(formData.get("summary"));

  if (!title || !summary) {
    throw new Error("Add a title and summary before uploading media.");
  }

  const sourceType = normalizeSourceType(formData.get("sourceType"));
  const externalUrl = sourceType === "external_link"
    ? normalizeOptionalUrl(formData.get("externalUrl"))
    : null;

  if (sourceType === "external_link" && !externalUrl) {
    throw new Error("Enter the external URL before uploading a cover image.");
  }

  const requestedSlug = normalizeOptionalText(formData.get("slug")) ?? title;
  const slug = await resolveUniquePostSlug(requestedSlug);

  return createPost({
    authorName: normalizeOptionalText(formData.get("authorName")) ?? viewer.fullName,
    bodyHtml: null,
    bodyJson: null,
    canonicalUrl: normalizeOptionalUrl(formData.get("canonicalUrl")),
    coverImageAlt: null,
    coverImageUrl: null,
    createdBy: viewer.id,
    externalUrl,
    isFeatured: formData.get("isFeatured") === "on",
    publishedAt: null,
    seoDescription: normalizeOptionalText(formData.get("seoDescription")),
    seoTitle: normalizeOptionalText(formData.get("seoTitle")),
    slug,
    sourceType,
    status: "draft",
    summary,
    title,
    type: "blog",
    updatedBy: viewer.id,
  });
}

export async function POST(request: Request) {
  const viewer = await getAuthenticatedAdmin();

  if (!viewer) {
    return jsonError("You must sign in before uploading blog media.", 401);
  }

  const formData = await request.formData();
  const uploadKind = normalizeUploadKind(formData.get("uploadKind"));

  if (!uploadKind) {
    return jsonError("Choose whether this upload is for a cover image or inline image.", 400);
  }

  const fileEntry = formData.get("file");

  if (!(fileEntry instanceof File)) {
    return jsonError("Choose an image file to upload.", 400);
  }

  if (!BLOG_IMAGE_MIME_TYPES.includes(fileEntry.type as (typeof BLOG_IMAGE_MIME_TYPES)[number])) {
    return jsonError("Only image uploads are supported for blog media.", 400);
  }

  if (fileEntry.size > BLOG_IMAGE_MAX_BYTES) {
    return jsonError("Uploaded images must be 5 MB or smaller.", 400);
  }

  const requestedAltText = normalizeOptionalText(formData.get("altText"));

  let post = null;
  const requestedPostId = normalizeOptionalText(formData.get("postId"));

  try {
    if (requestedPostId) {
      post = await getPostById(requestedPostId);

      if (!post) {
        return jsonError("This blog post no longer exists.", 404);
      }

      assertCanEditBlogPost(viewer, post);
    } else {
      post = await createDraftForUpload(formData, viewer);
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "The upload draft could not be prepared.";

    return jsonError(message, 400);
  }

  if (uploadKind === "inline" && post.sourceType !== "internal_article") {
    return jsonError("Inline images are only supported for internal articles.", 400);
  }

  const objectPath = buildBlogImageObjectPath({
    fileName: fileEntry.name,
    postId: post.id,
    uploadKind,
  });
  const supabase = createAdminSupabaseClient();
  const { error: uploadError } = await supabase.storage
    .from(BLOG_IMAGE_BUCKET)
    .upload(objectPath, fileEntry, {
      cacheControl: "3600",
      contentType: fileEntry.type,
      upsert: false,
    });

  if (uploadError) {
    return jsonError(uploadError.message, 500);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(BLOG_IMAGE_BUCKET).getPublicUrl(objectPath);

  const altText = requestedAltText ?? deriveImageAltText(fileEntry.name);

  try {
    const mediaAsset = await createMediaAsset({
      bucketName: BLOG_IMAGE_BUCKET,
      fileName: fileEntry.name,
      kind: "blog_image",
      mimeType: fileEntry.type,
      objectPath,
      postId: post.id,
      publicUrl,
      sizeBytes: fileEntry.size,
      uploadedBy: viewer.id,
    });

    if (uploadKind === "cover") {
      await updatePost(post.id, {
        coverImageAlt: altText,
        coverImageUrl: publicUrl,
        updatedBy: viewer.id,
      });
    }

    return NextResponse.json({
      altText,
      assetId: mediaAsset.id,
      fileName: fileEntry.name,
      postId: post.id,
      url: publicUrl,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "The upload completed but could not be recorded.";

    return jsonError(message, 500);
  }
}
