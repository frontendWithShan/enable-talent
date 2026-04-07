"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useFormStatus } from "react-dom";

import type { AdminViewer } from "@/lib/auth/roles";
import type { ContentSourceType, PostRecord } from "@/lib/data/types";
import { optimizeBlogImageForUpload } from "@/lib/blogs/client-image";
import {
  createBlogEditorDocumentFromText,
  createEmptyBlogEditorDocument,
  isBlogEditorDocument,
} from "@/lib/blogs/editor";
import type { BlogEditorActionState } from "@/lib/blogs/form-state";
import { initialBlogEditorActionState } from "@/lib/blogs/form-state";
import {
  canArchiveBlogPost,
  canDeleteBlogPost,
  canPublishBlogPost,
} from "@/lib/blogs/permissions";
import { slugifyPostTitle } from "@/lib/blogs/slugify";

import BlogPostSettingsPanel from "./BlogPostSettingsPanel";
import NoCoverImageWarningModal from "./NoCoverImageWarningModal";
import BlogSourceBadge from "./BlogSourceBadge";
import BlogStatusBadge from "./BlogStatusBadge";
import type { BlogAutosaveStatus, BlogComposerValues } from "./composer-types";
import ExternalLinkEditor from "./ExternalLinkEditor";
import InternalArticleComposer from "./InternalArticleComposer";

const DRAFT_TRANSFER_KEY = "admin.blogs.pending-upload-draft";
const LOCAL_DRAFT_KEY_PREFIX = "admin.blogs.local-draft";

type BlogEditorFormProps = {
  action: (
    state: BlogEditorActionState,
    formData: FormData,
  ) => Promise<BlogEditorActionState>;
  archiveAction?: () => void | Promise<void>;
  deleteAction?: () => void | Promise<void>;
  initialSourceType?: ContentSourceType;
  mode: "create" | "edit";
  post?: PostRecord;
  viewer: AdminViewer;
};

type DraftTransferPayload = {
  postId: string;
  values: BlogComposerValues;
};

type PersistedLocalDraft = {
  updatedAt: string;
  values: BlogComposerValues;
};

type BlogImageUploadSuccessResult = {
  altText: string;
  assetId: string;
  fileName: string;
  postId: string;
  url: string;
};

type BlogImageUploadResponse =
  | {
      error?: string;
    }
  | BlogImageUploadSuccessResult;

function isBlogImageUploadSuccess(
  payload: BlogImageUploadResponse,
): payload is BlogImageUploadSuccessResult {
  return (
    "altText" in payload &&
    "assetId" in payload &&
    "fileName" in payload &&
    "postId" in payload &&
    "url" in payload
  );
}

function stripHtml(value: string) {
  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function extractBodyDocument(post?: PostRecord) {
  if (!post) {
    return createEmptyBlogEditorDocument();
  }

  if (isBlogEditorDocument(post.bodyJson)) {
    return post.bodyJson;
  }

  if (
    post.bodyJson &&
    typeof post.bodyJson === "object" &&
    !Array.isArray(post.bodyJson) &&
    "content" in post.bodyJson &&
    typeof post.bodyJson.content === "string"
  ) {
    return createBlogEditorDocumentFromText(post.bodyJson.content);
  }

  if (post.bodyHtml) {
    return createBlogEditorDocumentFromText(stripHtml(post.bodyHtml));
  }

  return createEmptyBlogEditorDocument();
}

function createInitialValues(
  post: PostRecord | undefined,
  viewer: AdminViewer,
  initialSourceType?: ContentSourceType,
): BlogComposerValues {
  return {
    authorName: post?.authorName ?? viewer.fullName,
    bodyJson: extractBodyDocument(post),
    canonicalUrl: post?.canonicalUrl ?? "",
    coverImageAlt: post?.coverImageAlt ?? "",
    coverImageUrl: post?.coverImageUrl ?? "",
    externalUrl: post?.externalUrl ?? "",
    isFeatured: post?.isFeatured ?? false,
    seoDescription: post?.seoDescription ?? "",
    seoTitle: post?.seoTitle ?? "",
    slug: post?.slug ?? "",
    sourceType: post?.sourceType ?? initialSourceType ?? "internal_article",
    summary: post?.summary ?? "",
    title: post?.title ?? "",
  };
}

function readDraftTransfer() {
  if (typeof window === "undefined") {
    return null;
  }

  const storedValue = window.sessionStorage.getItem(DRAFT_TRANSFER_KEY);

  if (!storedValue) {
    return null;
  }

  try {
    return JSON.parse(storedValue) as DraftTransferPayload;
  } catch {
    window.sessionStorage.removeItem(DRAFT_TRANSFER_KEY);
    return null;
  }
}

function writeDraftTransfer(postId: string, values: BlogComposerValues) {
  if (typeof window === "undefined") {
    return;
  }

  const payload: DraftTransferPayload = {
    postId,
    values,
  };

  window.sessionStorage.setItem(DRAFT_TRANSFER_KEY, JSON.stringify(payload));
}

function clearDraftTransfer() {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.removeItem(DRAFT_TRANSFER_KEY);
}

function getLocalDraftStorageKey(
  mode: "create" | "edit",
  postId?: string,
  sourceType?: ContentSourceType,
) {
  if (mode === "edit" && postId) {
    return `${LOCAL_DRAFT_KEY_PREFIX}.${postId}`;
  }

  return `${LOCAL_DRAFT_KEY_PREFIX}.new.${sourceType ?? "internal_article"}`;
}

function readLocalDraft(storageKey: string) {
  if (typeof window === "undefined") {
    return null;
  }

  let storedValue: string | null = null;

  try {
    storedValue = window.localStorage.getItem(storageKey);
  } catch {
    return null;
  }

  if (!storedValue) {
    return null;
  }

  try {
    return JSON.parse(storedValue) as PersistedLocalDraft;
  } catch {
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      return null;
    }

    return null;
  }
}

function writeLocalDraft(storageKey: string, values: BlogComposerValues) {
  if (typeof window === "undefined") {
    return null;
  }

  const payload: PersistedLocalDraft = {
    updatedAt: new Date().toISOString(),
    values,
  };

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(payload));
    return payload.updatedAt;
  } catch {
    return null;
  }
}

function clearLocalDraft(storageKey: string) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(storageKey);
  } catch {
    return;
  }
}

function formatAutosaveTimestamp(value: string | null) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function getInitialAutosaveStatus(): BlogAutosaveStatus {
  return {
    kind: "idle",
    message: "",
    savedAt: null,
  };
}

function isCustomSlug(title: string, slug: string) {
  if (!slug.trim()) {
    return false;
  }

  return slug !== slugifyPostTitle(title);
}

function SubmitButton({
  className,
  disabled: disabledProp,
  intent,
  label,
  pendingLabel,
}: {
  className: string;
  disabled?: boolean;
  intent: "publish" | "save";
  label: string;
  pendingLabel: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      className={className}
      disabled={pending || disabledProp}
      name="intent"
      type="submit"
      value={intent}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}

export default function BlogEditorForm({
  action,
  archiveAction,
  deleteAction,
  initialSourceType,
  mode,
  post,
  viewer,
}: BlogEditorFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialValues = useMemo(
    () => createInitialValues(post, viewer, initialSourceType),
    [initialSourceType, post, viewer],
  );
  const initialValuesSerialized = useMemo(
    () => JSON.stringify(initialValues),
    [initialValues],
  );
  const createDraftStorageKey = useMemo(
    () => getLocalDraftStorageKey("create", undefined, initialSourceType),
    [initialSourceType],
  );
  const localDraftStorageKey = useMemo(
    () => getLocalDraftStorageKey(mode, post?.id, initialSourceType),
    [initialSourceType, mode, post?.id],
  );
  const [values, setValues] = useState<BlogComposerValues>(() => initialValues);
  const valuesSerialized = useMemo(() => JSON.stringify(values), [values]);
  const [state, formAction] = useActionState(action, initialBlogEditorActionState);
  const formRef = useRef<HTMLFormElement>(null);
  const pendingPublishButtonRef = useRef<HTMLButtonElement | null>(null);
  const [showNoCoverWarning, setShowNoCoverWarning] = useState(false);
  const [coverInputKey, setCoverInputKey] = useState(0);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingInlineImage, setIsUploadingInlineImage] = useState(false);
  const [submitBlockedByUpload, setSubmitBlockedByUpload] = useState(false);
  const [coverUploadError, setCoverUploadError] = useState<string | null>(null);
  const [coverUploadMessage, setCoverUploadMessage] = useState<string | null>(null);
  const [hasAttemptedDraftRestore, setHasAttemptedDraftRestore] = useState(false);
  const [draftRestoreMessage, setDraftRestoreMessage] = useState<string | null>(null);
  const [autosaveStatus, setAutosaveStatus] = useState<BlogAutosaveStatus>(() =>
    getInitialAutosaveStatus(),
  );
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [hasCustomSlug, setHasCustomSlug] = useState(() =>
    isCustomSlug(initialValues.title, initialValues.slug),
  );
  const notice = searchParams.get("notice");
  const noticeKind = searchParams.get("kind");
  const canPublish = canPublishBlogPost(viewer);
  const canArchive = Boolean(post && canArchiveBlogPost(viewer));
  const canDelete = Boolean(post && canDeleteBlogPost(viewer, post));
  const slugLocked = Boolean(post?.publishedAt);
  const sourceTypeLocked = Boolean(post && post.status !== "draft");
  const canUploadMedia = Boolean(
    post?.id ||
    (values.title.trim() &&
      values.summary.trim() &&
      (values.sourceType !== "external_link" || values.externalUrl.trim())),
  );
  const hasChanges = valuesSerialized !== initialValuesSerialized;
  const publishDisabled = post?.status === "published" && !hasChanges;
  const isMediaUploadInProgress = isUploadingCover || isUploadingInlineImage;
  const saveLabel =
    mode === "create"
      ? "Save Draft"
      : post?.status === "draft"
        ? "Save Draft"
        : "Save Changes";

  useEffect(() => {
    setAutosaveStatus(getInitialAutosaveStatus());
    setHasCustomSlug(isCustomSlug(initialValues.title, initialValues.slug));
    if (mode === "create") {
      setValues(initialValues);
    }
  }, [initialValues, initialValuesSerialized, mode, post]);

  useEffect(() => {
    setHasAttemptedDraftRestore(false);
    setDraftRestoreMessage(null);
  }, [localDraftStorageKey]);

  useEffect(() => {
    if (mode !== "edit" || !post?.id) {
      const persistedDraft = readLocalDraft(localDraftStorageKey);

      if (persistedDraft) {
        setValues(persistedDraft.values);
        setHasCustomSlug(
          isCustomSlug(persistedDraft.values.title, persistedDraft.values.slug),
        );
        setDraftRestoreMessage("Unsaved changes from this browser were restored.");
        setAutosaveStatus({
          kind: "dirty",
          message: "Changes not saved to the website yet",
          savedAt: null,
        });
      }

      setHasAttemptedDraftRestore(true);
      return;
    }

    const pendingTransfer = readDraftTransfer();

    if (!pendingTransfer || pendingTransfer.postId !== post.id) {
      if (notice && noticeKind !== "error") {
        clearLocalDraft(localDraftStorageKey);
        clearLocalDraft(createDraftStorageKey);
        setHasAttemptedDraftRestore(true);
        return;
      }

        const persistedDraft = readLocalDraft(localDraftStorageKey);

        if (persistedDraft) {
          setValues(persistedDraft.values);
          setHasCustomSlug(
            isCustomSlug(persistedDraft.values.title, persistedDraft.values.slug),
          );
          setDraftRestoreMessage("Unsaved changes from this browser were restored.");
          setAutosaveStatus({
            kind: "dirty",
            message: "Changes not saved to the website yet",
            savedAt: null,
          });
        }

      setHasAttemptedDraftRestore(true);
      return;
    }

    setValues(pendingTransfer.values);
    setHasCustomSlug(isCustomSlug(pendingTransfer.values.title, pendingTransfer.values.slug));
    clearDraftTransfer();
    clearLocalDraft(createDraftStorageKey);
    setDraftRestoreMessage(
      "Your in-progress draft was restored after the automatic draft creation.",
    );
    setAutosaveStatus({
      kind: "dirty",
      message: "Changes not saved to the website yet",
      savedAt: null,
    });
    setHasAttemptedDraftRestore(true);
  }, [
    createDraftStorageKey,
    localDraftStorageKey,
    mode,
    notice,
    noticeKind,
    post?.id,
  ]);

  useEffect(() => {
    if (!hasAttemptedDraftRestore) {
      return;
    }

    if (valuesSerialized === initialValuesSerialized) {
      clearLocalDraft(localDraftStorageKey);
      setAutosaveStatus(getInitialAutosaveStatus());
      return;
    }

    setAutosaveStatus({
      kind: "dirty",
      message: "Changes not saved to the website yet",
      savedAt: null,
    });

    const persistTimer = window.setTimeout(() => {
      const savedAt = writeLocalDraft(localDraftStorageKey, values);

      if (!savedAt) {
        setAutosaveStatus({
          kind: "error",
          message: "This browser could not save your local draft.",
          savedAt: null,
        });
        return;
      }

      setAutosaveStatus({
        kind: "saved",
        message: "Changes saved in this browser",
        savedAt,
      });
    }, 500);

    return () => window.clearTimeout(persistTimer);
  }, [
    hasAttemptedDraftRestore,
    initialValuesSerialized,
    localDraftStorageKey,
    values,
    valuesSerialized,
  ]);

  useEffect(() => {
    if (!isMediaUploadInProgress) {
      setSubmitBlockedByUpload(false);
    }
  }, [isMediaUploadInProgress]);

  function updateField<K extends keyof BlogComposerValues>(
    field: K,
    nextValue: BlogComposerValues[K],
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: nextValue,
    }));
  }

  function handleSourceTypeChange(nextSourceType: BlogComposerValues["sourceType"]) {
    setValues((currentValues) => ({
      ...currentValues,
      bodyJson:
        nextSourceType === "external_link"
          ? createEmptyBlogEditorDocument()
          : currentValues.bodyJson,
      sourceType: nextSourceType,
    }));
  }

  function handleTitleChange(nextTitle: string) {
    setValues((currentValues) => ({
      ...currentValues,
      slug: slugLocked || hasCustomSlug ? currentValues.slug : slugifyPostTitle(nextTitle),
      title: nextTitle,
    }));
  }

  function handleSlugChange(nextSlug: string) {
    setHasCustomSlug(nextSlug.trim().length > 0);
    updateField("slug", nextSlug);
  }

  async function uploadBlogImage(
    uploadKind: "cover" | "inline",
    file: File,
    altText: string,
  ): Promise<BlogImageUploadSuccessResult> {
    const optimizedFile = await optimizeBlogImageForUpload(file, uploadKind);
    const formData = new FormData();
    formData.set("uploadKind", uploadKind);
    formData.set("file", optimizedFile);

    if (altText.trim()) {
      formData.set("altText", altText.trim());
    }

    if (post?.id) {
      formData.set("postId", post.id);
    }

    formData.set("title", values.title);
    formData.set("summary", values.summary);
    formData.set("sourceType", values.sourceType);

    if (values.slug.trim()) {
      formData.set("slug", values.slug);
    }

    if (values.authorName.trim()) {
      formData.set("authorName", values.authorName);
    }

    if (values.canonicalUrl.trim()) {
      formData.set("canonicalUrl", values.canonicalUrl);
    }

    if (values.externalUrl.trim()) {
      formData.set("externalUrl", values.externalUrl);
    }

    if (values.seoTitle.trim()) {
      formData.set("seoTitle", values.seoTitle);
    }

    if (values.seoDescription.trim()) {
      formData.set("seoDescription", values.seoDescription);
    }

    if (values.isFeatured) {
      formData.set("isFeatured", "on");
    }

    const response = await fetch("/api/admin/blogs/upload", {
      body: formData,
      method: "POST",
    });

    const payload = (await response.json()) as BlogImageUploadResponse;

    if (!response.ok) {
      const errorMessage = "error" in payload ? payload.error : null;
      throw new Error(errorMessage ?? "The image upload failed.");
    }

    if (!isBlogImageUploadSuccess(payload)) {
      throw new Error(payload.error ?? "The image upload failed.");
    }

    return payload;
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (isMediaUploadInProgress) {
      event.preventDefault();
      setSubmitBlockedByUpload(true);
      return;
    }
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    if (submitter?.value === "publish" && !values.coverImageUrl) {
      event.preventDefault();
      pendingPublishButtonRef.current = submitter;
      setShowNoCoverWarning(true);
    }
  }

  function handlePublishAnyway() {
    setShowNoCoverWarning(false);
    const button = pendingPublishButtonRef.current;
    pendingPublishButtonRef.current = null;
    if (button && formRef.current) {
      formRef.current.requestSubmit(button);
    }
  }

  function handleAddCover() {
    setShowNoCoverWarning(false);
    setTimeout(() => {
      document.getElementById("coverImageDropZone")?.focus();
    }, 50);
  }

  function handleRemoveCover() {
    setValues((currentValues) => ({
      ...currentValues,
      coverImageAlt: "",
      coverImageUrl: "",
    }));
    setCoverUploadMessage(null);
    setCoverUploadError(null);
    setCoverInputKey((k) => k + 1);
  }

  async function handleCoverFileSelect(file: File) {
    setCoverUploadError(null);
    setCoverUploadMessage(null);
    setIsUploadingCover(true);

    try {
      const uploadResult = await uploadBlogImage("cover", file, values.coverImageAlt);
      const nextValues = {
        ...values,
        coverImageAlt: uploadResult.altText,
        coverImageUrl: uploadResult.url,
      };

      setValues(nextValues);
      setCoverInputKey((k) => k + 1);

      if (!post?.id) {
        clearLocalDraft(createDraftStorageKey);
        writeDraftTransfer(uploadResult.postId, nextValues);
        router.replace(`/admin/blogs/${uploadResult.postId}/edit`);
        return;
      }

      setCoverUploadMessage("Cover image uploaded.");
    } catch (uploadException) {
      setCoverUploadError(
        uploadException instanceof Error
          ? uploadException.message
          : "The cover image could not be uploaded.",
      );
    } finally {
      setIsUploadingCover(false);
    }
  }

  const autosaveTimestamp = formatAutosaveTimestamp(
    autosaveStatus.kind === "saved" ? autosaveStatus.savedAt : null,
  );
  const statusToneClassName =
    autosaveStatus.kind === "error"
      ? "text-red-900"
      : autosaveStatus.kind === "saving"
        ? "text-slate-700"
        : "text-emerald-900";

  return (
    <>
    <form action={formAction} className="space-y-6" noValidate onSubmit={handleFormSubmit} ref={formRef}>
      <input name="bodyJson" type="hidden" value={JSON.stringify(values.bodyJson)} />
      <input name="coverImageUrl" type="hidden" value={values.coverImageUrl} />
      <input name="sourceType" type="hidden" value={values.sourceType} />
      <input name="existingSlug" type="hidden" value={post?.slug ?? ""} />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            {post ? <BlogStatusBadge status={post.status} /> : null}
            <BlogSourceBadge sourceType={values.sourceType} />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
            {values.sourceType === "internal_article"
              ? mode === "create"
                ? "Write a post"
                : "Edit post"
              : mode === "create"
                ? "Share a link"
                : "Edit shared link"}
          </h1>
          <p className="text-sm leading-6 text-slate-700">
            {values.sourceType === "internal_article"
              ? "Write your post here. Open post settings only if you need them."
              : "Add a short summary and a link to another website."}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3">
          <Link
            href="/admin/blogs"
            className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
          >
            Back to posts
          </Link>
          <button
            aria-controls="blog-settings-panel"
            aria-expanded={settingsOpen}
            className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 xl:hidden"
            onClick={() => setSettingsOpen((currentValue) => !currentValue)}
            type="button"
          >
            {settingsOpen ? "Hide settings" : "Show settings"}
          </button>
          <SubmitButton
            className="rounded-2xl border border-slate-950 bg-white px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isMediaUploadInProgress}
            intent="save"
            label={saveLabel}
            pendingLabel="Saving..."
          />
          {canPublish ? (
            <SubmitButton
              className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isMediaUploadInProgress || publishDisabled}
              intent="publish"
              label={post?.status === "published" ? "Publish updates" : "Publish"}
              pendingLabel="Publishing..."
            />
          ) : null}
        </div>
      </div>

      {notice ? (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm ${
            noticeKind === "error"
              ? "border-red-300 bg-red-50 text-red-950"
              : "border-emerald-300 bg-emerald-50 text-emerald-950"
          }`}
          role={noticeKind === "error" ? "alert" : "status"}
        >
          {notice}
        </div>
      ) : null}

      {state.formError ? (
        <div
          className="rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-950"
          role="alert"
        >
          {state.formError}
        </div>
      ) : null}

      {isMediaUploadInProgress ? (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm ${
            submitBlockedByUpload
              ? "border-amber-300 bg-amber-50 text-amber-950"
              : "border-sky-300 bg-sky-50 text-slate-900"
          }`}
          role={submitBlockedByUpload ? "alert" : "status"}
        >
          {submitBlockedByUpload
            ? "Wait for the image upload to finish before saving or publishing."
            : "Image upload in progress. Save and publish will be available when the upload finishes."}
        </div>
      ) : null}

      {draftRestoreMessage ? (
        <div
          className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-sky-300 bg-sky-50 px-4 py-3 text-sm text-slate-900"
          role="status"
        >
          <span>{draftRestoreMessage}</span>
          <button
            className="shrink-0 rounded-xl border border-sky-400 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
            onClick={() => {
              clearLocalDraft(localDraftStorageKey);
              setValues(initialValues);
              setHasCustomSlug(isCustomSlug(initialValues.title, initialValues.slug));
              setDraftRestoreMessage(null);
              setAutosaveStatus(getInitialAutosaveStatus());
            }}
            type="button"
          >
            Start fresh
          </button>
        </div>
      ) : null}

        <div
          aria-live="polite"
          className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm"
        >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {autosaveStatus.kind === "idle" ? "Draft workflow" : autosaveStatus.message}
            </p>
            <p className={`text-sm ${statusToneClassName}`}>
              {autosaveStatus.kind === "saved" && autosaveTimestamp
                ? `Last saved at ${autosaveTimestamp}`
                : autosaveStatus.kind === "idle"
                  ? "Changes you type are kept in this browser until you use Save Draft."
                  : autosaveStatus.kind === "dirty"
                    ? "Use Save Draft to save these changes to the website."
                    : autosaveStatus.kind === "saving"
                      ? "Saving your changes in this browser."
                      : autosaveStatus.kind === "error"
                        ? "Keep editing, then use Save Draft to store changes on the website."
                        : ""}
            </p>
          </div>
        </div>
      </div>

      <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
        <BlogPostSettingsPanel
          archiveAction={archiveAction}
          canArchive={canArchive}
          canDelete={canDelete}
          deleteAction={deleteAction}
          isOpen={settingsOpen}
          onAuthorNameChange={(nextValue) => updateField("authorName", nextValue)}
          onCanonicalUrlChange={(nextValue) => updateField("canonicalUrl", nextValue)}
          onFeaturedChange={(nextValue) => updateField("isFeatured", nextValue)}
          onSeoDescriptionChange={(nextValue) =>
            updateField("seoDescription", nextValue)
          }
          onSeoTitleChange={(nextValue) => updateField("seoTitle", nextValue)}
          onSlugChange={handleSlugChange}
          onSourceTypeChange={handleSourceTypeChange}
          post={post}
          slugLocked={slugLocked}
          sourceTypeLocked={sourceTypeLocked}
          state={state}
          values={values}
        />

        <div className="space-y-8 xl:col-start-1 xl:row-start-1">
          {values.sourceType === "internal_article" ? (
            <>
              <InternalArticleComposer
                canUploadMedia={canUploadMedia}
                coverInputKey={coverInputKey}
                coverUploadError={coverUploadError}
                coverUploadMessage={coverUploadMessage}
                isUploadingCover={isUploadingCover}
                onBodyChange={(nextValue) => updateField("bodyJson", nextValue)}
                onCoverAltChange={(nextValue) => updateField("coverImageAlt", nextValue)}
                onCoverFileSelect={handleCoverFileSelect}
                onRemoveCover={handleRemoveCover}
                onDraftBootstrap={(postId, document) => {
                  clearLocalDraft(createDraftStorageKey);
                  writeDraftTransfer(postId, {
                    ...values,
                    bodyJson: document,
                  });
                  router.replace(`/admin/blogs/${postId}/edit`);
                }}
                onInlineImageUpload={(file, altText) =>
                  uploadBlogImage("inline", file, altText)
                }
                onInlineUploadStateChange={setIsUploadingInlineImage}
                onSummaryChange={(nextValue) => updateField("summary", nextValue)}
                onTitleChange={handleTitleChange}
                postId={post?.id}
                state={state}
                values={values}
              />

              <section
                aria-labelledby="blog-bottom-actions-heading"
                className="rounded-[28px] border border-slate-200 bg-white px-6 py-5 shadow-sm sm:px-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2
                      id="blog-bottom-actions-heading"
                      className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-700"
                    >
                      Finish here
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      Save your draft or publish this post after reviewing the article.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <SubmitButton
                      className="rounded-2xl border border-slate-950 bg-white px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                      disabled={isMediaUploadInProgress}
                      intent="save"
                      label={saveLabel}
                      pendingLabel="Saving..."
                    />
                    {canPublish ? (
                      <SubmitButton
                        className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                        disabled={isMediaUploadInProgress || publishDisabled}
                        intent="publish"
                        label={post?.status === "published" ? "Publish updates" : "Publish"}
                        pendingLabel="Publishing..."
                      />
                    ) : null}
                  </div>
                </div>
              </section>
            </>
          ) : (
            <>
              <ExternalLinkEditor
                canUploadMedia={canUploadMedia}
                coverInputKey={coverInputKey}
                coverUploadError={coverUploadError}
                coverUploadMessage={coverUploadMessage}
                isUploadingCover={isUploadingCover}
                onAuthorNameChange={(nextValue) => updateField("authorName", nextValue)}
                onCoverAltChange={(nextValue) => updateField("coverImageAlt", nextValue)}
                onCoverFileSelect={handleCoverFileSelect}
                onRemoveCover={handleRemoveCover}
                onExternalUrlChange={(nextValue) => updateField("externalUrl", nextValue)}
                onSummaryChange={(nextValue) => updateField("summary", nextValue)}
                onTitleChange={handleTitleChange}
                state={state}
                values={values}
              />

              <section
                aria-labelledby="blog-bottom-actions-heading"
                className="rounded-[28px] border border-slate-200 bg-white px-6 py-5 shadow-sm sm:px-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2
                      id="blog-bottom-actions-heading"
                      className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-700"
                    >
                      Finish here
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      Save your draft or publish this link after reviewing the details.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <SubmitButton
                      className="rounded-2xl border border-slate-950 bg-white px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                      disabled={isMediaUploadInProgress}
                      intent="save"
                      label={saveLabel}
                      pendingLabel="Saving..."
                    />
                    {canPublish ? (
                      <SubmitButton
                        className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                        disabled={isMediaUploadInProgress || publishDisabled}
                        intent="publish"
                        label={post?.status === "published" ? "Publish updates" : "Publish"}
                        pendingLabel="Publishing..."
                      />
                    ) : null}
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </form>

      {showNoCoverWarning ? (
        <NoCoverImageWarningModal
          onAddCover={handleAddCover}
          onPublishAnyway={handlePublishAnyway}
        />
      ) : null}
    </>
  );
}
