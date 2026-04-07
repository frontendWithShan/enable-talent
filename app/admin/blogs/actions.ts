"use server";

import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import type { AdminViewer } from "@/lib/auth/roles";
import {
  createPost,
  deletePost,
  getPostById,
  updatePost,
} from "@/lib/data/posts";
import type { ContentStatus } from "@/lib/data/types";
import { normalizeArticleBody, normalizeOptionalText, normalizeSourceType } from "@/lib/blogs/content";
import type {
  BlogAutosaveActionResult,
  BlogEditorActionState,
  BlogFieldName,
} from "@/lib/blogs/form-state";
import {
  assertCanArchiveBlogPost,
  assertCanCreateBlogPost,
  assertCanDeleteBlogPost,
  assertCanEditBlogPost,
  assertCanPublishBlogPost,
} from "@/lib/blogs/permissions";
import { resolveUniquePostSlug } from "@/lib/blogs/slug";

function getSafeRedirectTarget(value: FormDataEntryValue | null) {
  if (typeof value === "string" && value.startsWith("/admin/blogs")) {
    return value;
  }

  return "/admin/blogs";
}

function buildRedirectWithNotice(pathname: string, notice: string, kind: "error" | "success" = "success") {
  const searchParams = new URLSearchParams();
  searchParams.set("notice", notice);
  searchParams.set("kind", kind);
  return `${pathname}?${searchParams.toString()}`;
}

function requireViewerOrRedirect() {
  return getAuthenticatedAdmin().then((viewer) => {
    if (!viewer) {
      redirect("/admin/login?next=%2Fadmin%2Fblogs");
    }

    return viewer;
  });
}

async function requireViewerForAutosave() {
  const viewer = await getAuthenticatedAdmin();

  if (!viewer) {
    return null;
  }

  return viewer;
}

const ALLOWED_URL_PROTOCOLS = ["http:", "https:", "mailto:"];

function normalizeOptionalUrl(
  value: FormDataEntryValue | null,
  fieldErrors: Partial<Record<BlogFieldName, string>>,
  fieldName: Extract<BlogFieldName, "canonicalUrl" | "coverImageUrl" | "externalUrl">,
) {
  const normalizedValue = normalizeOptionalText(value);

  if (!normalizedValue) {
    return null;
  }

  try {
    const parsed = new URL(normalizedValue);

    if (!ALLOWED_URL_PROTOCOLS.includes(parsed.protocol)) {
      fieldErrors[fieldName] = "Only http, https, and mailto URLs are allowed.";
      return normalizedValue;
    }

    return normalizedValue;
  } catch {
    fieldErrors[fieldName] = "Enter a valid URL.";
    return normalizedValue;
  }
}

async function buildValidatedPostPayload(
  viewer: AdminViewer,
  formData: FormData,
  options: {
    existingPostId?: string;
    lockSlug?: boolean;
  },
) {
  const fieldErrors: Partial<Record<BlogFieldName, string>> = {};
  const title = normalizeOptionalText(formData.get("title"));
  const summary = normalizeOptionalText(formData.get("summary"));
  const sourceType = normalizeSourceType(formData.get("sourceType"));
  const authorName = normalizeOptionalText(formData.get("authorName")) ?? viewer.fullName;
  const seoTitle = normalizeOptionalText(formData.get("seoTitle"));
  const seoDescription = normalizeOptionalText(formData.get("seoDescription"));
  const canonicalUrl = normalizeOptionalUrl(formData.get("canonicalUrl"), fieldErrors, "canonicalUrl");
  const coverImageAlt = normalizeOptionalText(formData.get("coverImageAlt"));
  const coverImageUrl = normalizeOptionalUrl(formData.get("coverImageUrl"), fieldErrors, "coverImageUrl");
  const externalUrl = normalizeOptionalUrl(formData.get("externalUrl"), fieldErrors, "externalUrl");
  const articleBody = normalizeArticleBody(formData.get("bodyJson"));
  const isFeatured = formData.get("isFeatured") === "on";

  if (!title) {
    fieldErrors.title = "Enter a title.";
  }

  if (!summary) {
    fieldErrors.summary = "Enter a short summary.";
  }

  if (sourceType === "internal_article" && articleBody.parseError) {
    fieldErrors.bodyJson = articleBody.parseError;
  }

  if (sourceType === "internal_article" && !articleBody.hasContent) {
    fieldErrors.bodyJson = "Article content is required for an internal article.";
  }

  if (sourceType === "external_link" && !externalUrl) {
    fieldErrors.externalUrl = "External link entries require a destination URL.";
  }

  if (coverImageUrl && !coverImageAlt) {
    fieldErrors.coverImageAlt = "Add a short description for the cover image.";
  }

  const requestedSlug = normalizeOptionalText(formData.get("slug")) ?? title ?? "";
  const resolvedSlug = options.lockSlug
    ? normalizeOptionalText(formData.get("existingSlug"))
    : await resolveUniquePostSlug(requestedSlug, {
        excludePostId: options.existingPostId,
      });

  if (!resolvedSlug) {
    return {
      fieldErrors: {
        ...fieldErrors,
        slug: "A valid slug is required.",
      },
      formError: "Fix the highlighted fields and try again.",
      payload: null,
      viewer,
    };
  }

  if (!title || !summary) {
    return {
      fieldErrors,
      formError: "Fix the highlighted fields and try again.",
      payload: null,
      viewer,
    };
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      fieldErrors,
      formError: "Fix the highlighted fields and try again.",
      payload: null,
      viewer,
    };
  }

  return {
    fieldErrors,
    formError: null,
    payload: {
      authorName,
      bodyHtml: sourceType === "internal_article" ? articleBody.bodyHtml : null,
      bodyJson: sourceType === "internal_article" ? articleBody.bodyJson : null,
      canonicalUrl,
      coverImageAlt,
      coverImageUrl,
      externalUrl: sourceType === "external_link" ? externalUrl : null,
      isFeatured,
      seoDescription,
      seoTitle,
      slug: resolvedSlug,
      sourceType,
      summary,
      title,
      type: "blog" as const,
      updatedBy: viewer.id,
    },
    viewer,
  };
}

function getSaveStatus(existingStatus?: ContentStatus): ContentStatus {
  if (existingStatus === "published") {
    return "published";
  }

  if (existingStatus === "archived") {
    return "archived";
  }

  return "draft";
}

function revalidateBlogPaths(postId?: string, slug?: string) {
  revalidatePath("/admin/blogs");
  revalidatePath("/admin/blogs/new");
  revalidatePath("/blogs");

  if (postId) {
    revalidatePath(`/admin/blogs/${postId}/edit`);
  }

  if (slug) {
    revalidatePath(`/blogs/${slug}`);
  }
}

export async function createBlogPostAction(
  _previousState: BlogEditorActionState,
  formData: FormData,
) {
  const viewer = await requireViewerOrRedirect();
  assertCanCreateBlogPost(viewer);

  const intent = formData.get("intent") === "publish" ? "publish" : "save";
  const validation = await buildValidatedPostPayload(viewer, formData, {});

  if (!validation.payload) {
    return {
      fieldErrors: validation.fieldErrors,
      formError: validation.formError,
    };
  }

  if (intent === "publish") {
    assertCanPublishBlogPost(viewer);
  }

  const nextStatus: ContentStatus = intent === "publish" ? "published" : "draft";
  const publishedAt = intent === "publish" ? new Date().toISOString() : null;
  const post = await createPost({
    ...validation.payload,
    createdBy: viewer.id,
    publishedAt,
    status: nextStatus,
  });

  revalidateBlogPaths(post.id, post.slug);

  if (intent === "publish") {
    redirect(buildRedirectWithNotice("/admin/blogs", "Post published."));
  }

  redirect(
    buildRedirectWithNotice(`/admin/blogs/${post.id}/edit`, "Draft created."),
  );
}

export async function updateBlogPostAction(
  postId: string,
  _previousState: BlogEditorActionState,
  formData: FormData,
) {
  const viewer = await requireViewerOrRedirect();
  const existingPost = await getPostById(postId);

  if (!existingPost) {
    return {
      fieldErrors: {},
      formError: "This post no longer exists.",
    };
  }

  assertCanEditBlogPost(viewer, existingPost);

  const intent = formData.get("intent") === "publish" ? "publish" : "save";
  const validation = await buildValidatedPostPayload(viewer, formData, {
    existingPostId: postId,
    lockSlug: Boolean(existingPost.publishedAt),
  });

  if (!validation.payload) {
    return {
      fieldErrors: validation.fieldErrors,
      formError: validation.formError,
    };
  }

  if (intent === "publish") {
    assertCanPublishBlogPost(viewer);
  }

  const nextStatus = intent === "publish" ? "published" : getSaveStatus(existingPost.status);
  const publishedAt =
    intent === "publish"
      ? existingPost.publishedAt ?? new Date().toISOString()
      : existingPost.publishedAt;

  const updatedPost = await updatePost(postId, {
    ...validation.payload,
    publishedAt,
    status: nextStatus,
  });

  revalidateBlogPaths(postId, updatedPost.slug);

  if (intent === "publish") {
    redirect(buildRedirectWithNotice("/admin/blogs", "Post published."));
  }

  redirect(
    buildRedirectWithNotice(
      `/admin/blogs/${postId}/edit`,
      "Changes saved.",
    ),
  );
}

export async function autosaveBlogPostAction(
  existingPostId: string | null,
  formData: FormData,
): Promise<BlogAutosaveActionResult> {
  const viewer = await requireViewerForAutosave();

  if (!viewer) {
    return {
      error: "Your session expired. Refresh the page and sign in again.",
      ok: false,
      postId: existingPostId,
      savedAt: null,
    };
  }

  try {
    if (!existingPostId) {
      assertCanCreateBlogPost(viewer);

      const validation = await buildValidatedPostPayload(viewer, formData, {});

      if (!validation.payload) {
        return {
          error: validation.formError ?? "Draft autosave is waiting for required fields.",
          ok: false,
          postId: null,
          savedAt: null,
        };
      }

      const post = await createPost({
        ...validation.payload,
        createdBy: viewer.id,
        publishedAt: null,
        status: "draft",
      });

      revalidateBlogPaths(post.id);

      return {
        message: "Draft saved.",
        ok: true,
        postId: post.id,
        savedAt: post.updatedAt,
      };
    }

    const existingPost = await getPostById(existingPostId);

    if (!existingPost) {
      return {
        error: "This post no longer exists.",
        ok: false,
        postId: existingPostId,
        savedAt: null,
      };
    }

    if (existingPost.status !== "draft") {
      return {
        error: "Autosave is only available for draft posts.",
        ok: false,
        postId: existingPostId,
        savedAt: null,
      };
    }

    assertCanEditBlogPost(viewer, existingPost);

    const validation = await buildValidatedPostPayload(viewer, formData, {
      existingPostId,
      lockSlug: Boolean(existingPost.publishedAt),
    });

    if (!validation.payload) {
      return {
        error: validation.formError ?? "Draft autosave is waiting for required fields.",
        ok: false,
        postId: existingPostId,
        savedAt: null,
      };
    }

    const post = await updatePost(existingPostId, {
      ...validation.payload,
      publishedAt: existingPost.publishedAt,
      status: "draft",
    });

    revalidateBlogPaths(existingPostId);

    return {
      message: "Draft saved.",
      ok: true,
      postId: post.id,
      savedAt: post.updatedAt,
    };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Draft autosave could not be completed.",
      ok: false,
      postId: existingPostId,
      savedAt: null,
    };
  }
}

export async function manageBlogPostAction(formData: FormData) {
  const viewer = await requireViewerOrRedirect();
  const postId = normalizeOptionalText(formData.get("postId"));
  const intent = normalizeOptionalText(formData.get("intent"));
  const redirectTo = getSafeRedirectTarget(formData.get("redirectTo"));

  if (!postId || !intent) {
    redirect(buildRedirectWithNotice(redirectTo, "Missing post action.", "error"));
  }

  const post = await getPostById(postId);

  if (!post) {
    redirect(buildRedirectWithNotice(redirectTo, "This post no longer exists.", "error"));
  }

  try {
    if (intent === "publish") {
      assertCanPublishBlogPost(viewer);
      await updatePost(post.id, {
        publishedAt: post.publishedAt ?? new Date().toISOString(),
        status: "published",
        updatedBy: viewer.id,
      });
      revalidateBlogPaths(post.id, post.slug);
      redirect(buildRedirectWithNotice("/admin/blogs", "Post published."));
    }

    if (intent === "archive") {
      assertCanArchiveBlogPost(viewer);
      await updatePost(post.id, {
        status: "archived",
        updatedBy: viewer.id,
      });
      revalidateBlogPaths(post.id, post.slug);
      redirect(buildRedirectWithNotice(redirectTo, "Post archived."));
    }

    if (intent === "delete") {
      assertCanDeleteBlogPost(viewer, post);
      await deletePost(post.id);
      revalidateBlogPaths(undefined, post.slug);
      redirect(buildRedirectWithNotice("/admin/blogs", "Post deleted."));
    }

    redirect(buildRedirectWithNotice(redirectTo, "Unknown post action.", "error"));
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    const message =
      error instanceof Error ? error.message : "The requested action could not be completed.";

    redirect(buildRedirectWithNotice(redirectTo, message, "error"));
  }
}

export async function archiveBlogPostAction(
  postId: string,
  redirectTo: string,
) {
  const viewer = await requireViewerOrRedirect();
  const safeRedirectTo = getSafeRedirectTarget(redirectTo);
  const post = await getPostById(postId);

  if (!post) {
    redirect(
      buildRedirectWithNotice(safeRedirectTo, "This post no longer exists.", "error"),
    );
  }

  try {
    assertCanArchiveBlogPost(viewer);
    await updatePost(post.id, {
      status: "archived",
      updatedBy: viewer.id,
    });
    revalidateBlogPaths(post.id, post.slug);
    redirect(buildRedirectWithNotice(safeRedirectTo, "Post archived."));
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    const message =
      error instanceof Error ? error.message : "The requested action could not be completed.";

    redirect(buildRedirectWithNotice(safeRedirectTo, message, "error"));
  }
}

export async function deleteBlogPostAction(
  postId: string,
  redirectTo: string,
) {
  const viewer = await requireViewerOrRedirect();
  const safeRedirectTo = getSafeRedirectTarget(redirectTo);
  const post = await getPostById(postId);

  if (!post) {
    redirect(
      buildRedirectWithNotice(safeRedirectTo, "This post no longer exists.", "error"),
    );
  }

  try {
    assertCanDeleteBlogPost(viewer, post);
    await deletePost(post.id);
    revalidateBlogPaths(undefined, post.slug);
    redirect(buildRedirectWithNotice("/admin/blogs", "Post deleted."));
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    const message =
      error instanceof Error ? error.message : "The requested action could not be completed.";

    redirect(buildRedirectWithNotice(safeRedirectTo, message, "error"));
  }
}
