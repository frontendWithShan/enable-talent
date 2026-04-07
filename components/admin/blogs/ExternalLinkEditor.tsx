"use client";

import { useEffect, useRef } from "react";

import type { BlogEditorActionState } from "@/lib/blogs/form-state";

import type { BlogComposerValues } from "./composer-types";
import BlogCoverImageField from "./BlogCoverImageField";
import FieldError from "./FieldError";

type ExternalLinkEditorProps = {
  canUploadMedia: boolean;
  coverInputKey: number;
  coverUploadError: string | null;
  coverUploadMessage: string | null;
  isUploadingCover: boolean;
  onAuthorNameChange: (value: string) => void;
  onCoverAltChange: (value: string) => void;
  onCoverFileSelect: (file: File) => void;
  onRemoveCover?: () => void;
  onExternalUrlChange: (value: string) => void;
  onSummaryChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  state: BlogEditorActionState;
  values: BlogComposerValues;
};

export default function ExternalLinkEditor({
  canUploadMedia,
  coverInputKey,
  coverUploadError,
  coverUploadMessage,
  isUploadingCover,
  onAuthorNameChange,
  onCoverAltChange,
  onCoverFileSelect,
  onRemoveCover,
  onExternalUrlChange,
  onSummaryChange,
  onTitleChange,
  state,
  values,
}: ExternalLinkEditorProps) {
  const titleRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [values.title]);

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-10">
        <div className="space-y-6">
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
              placeholder="Write the short summary that appears in the blog list."
              rows={3}
              value={values.summary}
            />
            <FieldError error={state.fieldErrors.summary} id="summary-error" />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <label
                className="block text-sm font-semibold text-slate-900"
                htmlFor="authorName"
              >
                Source or publication
              </label>
              <input
                aria-describedby={state.fieldErrors.authorName ? "source-name-error" : undefined}
                aria-invalid={state.fieldErrors.authorName ? true : undefined}
                className="mt-2 w-full rounded-2xl border border-slate-400 bg-white px-4 py-3 text-slate-950 shadow-sm focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
                id="authorName"
                name="authorName"
                onChange={(event) => onAuthorNameChange(event.target.value)}
                placeholder="e.g. Medium, Harvard Business Review, Fast Company"
                type="text"
                value={values.authorName}
              />
              <FieldError error={state.fieldErrors.authorName} id="source-name-error" />
            </div>

            <div>
              <label
                className="block text-sm font-semibold text-slate-900"
                htmlFor="externalUrl"
              >
                External URL
              </label>
              <input
                aria-describedby={state.fieldErrors.externalUrl ? "external-url-error" : "external-url-help"}
                aria-invalid={state.fieldErrors.externalUrl ? true : undefined}
                className="mt-2 w-full rounded-2xl border border-slate-400 bg-white px-4 py-3 text-slate-950 shadow-sm focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
                id="externalUrl"
                name="externalUrl"
                onChange={(event) => onExternalUrlChange(event.target.value)}
                placeholder="https://example.com/original-article"
                required
                type="url"
                value={values.externalUrl}
              />
              <p id="external-url-help" className="mt-2 text-sm text-slate-700">
                When people click this post, they will go to this website.
              </p>
              <FieldError error={state.fieldErrors.externalUrl} id="external-url-error" />
            </div>
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
            ? "This image will appear with the shared link."
            : "Add a title, summary, and external URL before uploading a cover image."
        }
        isUploading={isUploadingCover}
        onAltChange={onCoverAltChange}
        onFileSelect={onCoverFileSelect}
        onRemoveCover={onRemoveCover}
        statusMessage={coverUploadMessage}
        uploadError={coverUploadError}
      />
    </div>
  );
}
