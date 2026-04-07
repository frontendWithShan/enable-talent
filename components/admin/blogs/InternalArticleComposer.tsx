"use client";

import { useEffect, useRef } from "react";

import type { BlogEditorActionState } from "@/lib/blogs/form-state";

import type { BlogComposerValues } from "./composer-types";
import BlogCoverImageField from "./BlogCoverImageField";
import BlogTiptapEditor, {
  type BlogEditorImageUploadResult,
} from "./BlogTiptapEditor";
import FieldError from "./FieldError";

type InternalArticleComposerProps = {
  canUploadMedia: boolean;
  coverUploadError: string | null;
  coverUploadMessage: string | null;
  isUploadingCover: boolean;
  onBodyChange: (value: BlogComposerValues["bodyJson"]) => void;
  onCoverAltChange: (value: string) => void;
  coverInputKey: number;
  onCoverFileSelect: (file: File) => void;
  onRemoveCover?: () => void;
  onDraftBootstrap: (postId: string, document: BlogComposerValues["bodyJson"]) => void;
  onInlineImageUpload: (
    file: File,
    altText: string,
  ) => Promise<BlogEditorImageUploadResult>;
  onInlineUploadStateChange: (isUploading: boolean) => void;
  onSummaryChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  postId?: string;
  state: BlogEditorActionState;
  values: BlogComposerValues;
};

export default function InternalArticleComposer({
  canUploadMedia,
  coverUploadError,
  coverUploadMessage,
  isUploadingCover,
  coverInputKey,
  onBodyChange,
  onCoverAltChange,
  onCoverFileSelect,
  onRemoveCover,
  onDraftBootstrap,
  onInlineImageUpload,
  onInlineUploadStateChange,
  onSummaryChange,
  onTitleChange,
  postId,
  state,
  values,
}: InternalArticleComposerProps) {
  const titleRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize title textarea whenever the value changes (including on initial load).
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [values.title]);

  return (
    <div className="space-y-8">
      <section className="rounded-4xl border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-10">
        <div className="space-y-4">
          <div>
            <label className="sr-only" htmlFor="title">
              Title
            </label>
            <textarea
              aria-describedby={state.fieldErrors.title ? "title-error" : undefined}
              aria-invalid={state.fieldErrors.title ? true : undefined}
              className="w-full resize-none overflow-hidden border-0 bg-transparent p-0 text-4xl font-semibold leading-tight tracking-tight text-slate-950 placeholder:text-slate-400 focus:outline-none sm:text-5xl"
              id="title"
              name="title"
              onChange={(event) => onTitleChange(event.target.value)}
              placeholder="Title"
              ref={titleRef}
              required
              rows={1}
              value={values.title}
            />
            <FieldError error={state.fieldErrors.title} id="title-error" />
          </div>

          <div>
            <label className="sr-only" htmlFor="summary">
              Summary
            </label>
            <textarea
              aria-describedby={state.fieldErrors.summary ? "summary-error" : undefined}
              aria-invalid={state.fieldErrors.summary ? true : undefined}
              className="min-h-28 w-full resize-none border-0 bg-transparent p-0 text-lg leading-8 text-slate-700 placeholder:text-slate-400 focus:outline-none"
              id="summary"
              name="summary"
              onChange={(event) => onSummaryChange(event.target.value)}
              placeholder="Add a short subtitle or summary that appears on the blog listing."
              rows={3}
              value={values.summary}
            />
            <FieldError error={state.fieldErrors.summary} id="summary-error" />
          </div>
        </div>
      </section>

      <BlogCoverImageField
        canUploadMedia={canUploadMedia}
        coverImageAlt={values.coverImageAlt}
        coverImageAltError={state.fieldErrors.coverImageAlt}
        coverImageUrl={values.coverImageUrl}
        coverImageUrlError={state.fieldErrors.coverImageUrl}
        fileInputKey={coverInputKey}
        helperText={
          canUploadMedia
            ? "This image will appear at the top of your post."
            : "Add a title and summary before uploading a cover image."
        }
        isUploading={isUploadingCover}
        onAltChange={onCoverAltChange}
        onFileSelect={onCoverFileSelect}
        onRemoveCover={onRemoveCover}
        statusMessage={coverUploadMessage}
        uploadError={coverUploadError}
      />

      <section className="rounded-4xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5 sm:px-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-700">
            Article body
          </h2>
          <div
            id="body-help"
            className="mt-3 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-4"
          >
            <p className="text-sm font-semibold text-slate-900">
              How to use the editor
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
              <li>Click in the editor below and start typing.</li>
              <li>Use the toolbar to apply <strong>Bold</strong>, <em>Italic</em>, headings, lists, quotes, and dividers at any time.</li>
              <li>Use <strong>Insert image</strong> in the toolbar to add an image at the current cursor position.</li>
              <li>Use <strong>Link</strong> in the toolbar to turn selected text into a clickable link.</li>
            </ul>
          </div>
        </div>

        <div className="px-2 pb-4 pt-2 sm:px-4">
          <BlogTiptapEditor
            canUploadImages={canUploadMedia}
            describedBy={[
              "body-help",
              state.fieldErrors.bodyJson ? "body-error" : null,
            ]
              .filter(Boolean)
              .join(" ")}
            error={state.fieldErrors.bodyJson}
            label="Article content"
            onChange={onBodyChange}
            onDraftBootstrap={onDraftBootstrap}
            onUploadImage={onInlineImageUpload}
            onUploadStateChange={onInlineUploadStateChange}
            postId={postId}
            value={values.bodyJson}
          />
        </div>

        <div className="px-6 pb-6 sm:px-8">
          <p className="text-sm text-slate-700">
            Your post is saved as structured content and turned into HTML on the server.
          </p>
          <FieldError error={state.fieldErrors.bodyJson} id="body-error" />
        </div>
      </section>
    </div>
  );
}
