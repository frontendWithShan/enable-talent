"use client";

import { useEffect, useId, useRef, useState } from "react";

import { BLOG_IMAGE_ACCEPT } from "@/lib/blogs/uploads";

import FieldError from "./FieldError";

type BlogCoverImageFieldProps = {
  canUploadMedia: boolean;
  coverImageAlt: string;
  coverImageAltError?: string;
  coverImageUrl: string;
  coverImageUrlError?: string;
  fileInputKey?: number;
  helperText: string;
  isUploading: boolean;
  onAltChange: (value: string) => void;
  onFileSelect: (file: File) => void;
  onRemoveCover?: () => void;
  statusMessage?: string | null;
  uploadError?: string | null;
};

export default function BlogCoverImageField({
  canUploadMedia,
  coverImageAlt,
  coverImageAltError,
  coverImageUrl,
  coverImageUrlError,
  fileInputKey,
  helperText,
  isUploading,
  onAltChange,
  onFileSelect,
  onRemoveCover,
  statusMessage,
  uploadError,
}: BlogCoverImageFieldProps) {
  const altInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const prevCoverUrlRef = useRef(coverImageUrl);
  const [isDragOver, setIsDragOver] = useState(false);
  const altDescId = useId();

  // Auto-focus alt text input when cover image is first set
  useEffect(() => {
    if (!prevCoverUrlRef.current && coverImageUrl) {
      altInputRef.current?.focus();
    }
    prevCoverUrlRef.current = coverImageUrl;
  }, [coverImageUrl]);

  const isInteractive = canUploadMedia && !isUploading;

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function handleDropZoneKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openFilePicker();
    }
  }

  function handleDrop(event: React.DragEvent) {
    event.preventDefault();
    setIsDragOver(false);
    if (!isInteractive) return;
    const file = event.dataTransfer.files[0];
    if (file) onFileSelect(file);
  }

  function handleDragOver(event: React.DragEvent) {
    event.preventDefault();
    if (isInteractive) setIsDragOver(true);
  }

  function handleDragLeave() {
    setIsDragOver(false);
  }

  function handleFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) onFileSelect(file);
  }

  // Live region message for screen readers
  const liveMessage = isUploading
    ? "Uploading cover image, please wait."
    : statusMessage
      ? statusMessage
      : uploadError
        ? `Upload failed: ${uploadError}`
        : "";

  return (
    <section
      aria-labelledby="cover-image-heading"
      className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm"
    >
      <h2
        id="cover-image-heading"
        className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-700"
      >
        Cover image
      </h2>

      {/* Screen-reader live region */}
      <div aria-live="polite" className="sr-only">
        {liveMessage}
      </div>

      {/* Hidden real file input */}
      <input
        key={fileInputKey}
        accept={BLOG_IMAGE_ACCEPT}
        aria-hidden="true"
        className="sr-only"
        disabled={!isInteractive}
        onChange={handleFileInputChange}
        ref={fileInputRef}
        tabIndex={-1}
        type="file"
      />

      <div className="mt-6 space-y-6">
        {coverImageUrl ? (
          /* ── Image preview ── */
          <div className="relative overflow-hidden rounded-[20px]">
            {/* Remote Supabase previews use project-specific hosts — plain img is intentional here. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={coverImageAlt || "Current cover image preview"}
              className="aspect-video w-full object-cover"
              src={coverImageUrl}
            />
            <div className="absolute inset-0 flex items-end justify-end gap-3 bg-linear-to-t from-black/50 to-transparent p-4">
              <button
                className="rounded-xl border border-white/30 bg-black/40 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-black/40 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!isInteractive}
                onClick={openFilePicker}
                type="button"
              >
                Change cover
              </button>
              {onRemoveCover ? (
                <button
                  className="rounded-xl border border-white/30 bg-black/40 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm hover:bg-red-600/80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-black/40 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!isInteractive}
                  onClick={onRemoveCover}
                  type="button"
                >
                  Remove cover
                </button>
              ) : null}
            </div>
          </div>
        ) : (
          /* ── Drop zone ── */
          <div
            aria-disabled={!isInteractive}
            aria-label={
              isUploading
                ? "Uploading cover image"
                : canUploadMedia
                  ? "Cover image upload area. Drop an image here, or press Enter or Space to open the file browser."
                  : helperText
            }
            className={`flex min-h-50 flex-col items-center justify-center gap-3 rounded-[20px] border-2 border-dashed p-8 text-center transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 ${
              isUploading
                ? "cursor-wait border-slate-300 bg-slate-50"
                : isDragOver
                  ? "border-slate-950 bg-slate-100"
                  : isInteractive
                    ? "cursor-pointer border-slate-300 bg-white hover:border-slate-500 hover:bg-slate-50"
                    : "cursor-not-allowed border-slate-200 bg-slate-50"
            }`}
            id="coverImageDropZone"
            onClick={isInteractive ? openFilePicker : undefined}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onKeyDown={isInteractive ? handleDropZoneKeyDown : undefined}
            role="button"
            tabIndex={isInteractive ? 0 : -1}
          >
            {isUploading ? (
              <>
                <svg
                  aria-hidden="true"
                  className="h-8 w-8 animate-spin text-slate-500"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    fill="currentColor"
                  />
                </svg>
                <p className="text-sm font-medium text-slate-700">
                  Uploading your image, please wait…
                </p>
              </>
            ) : canUploadMedia ? (
              <>
                <svg
                  aria-hidden="true"
                  className={`h-10 w-10 transition-colors ${isDragOver ? "text-slate-950" : "text-slate-400"}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <p
                    className={`text-sm font-semibold ${isDragOver ? "text-slate-950" : "text-slate-700"}`}
                  >
                    {isDragOver ? "Drop to upload" : "Drop an image here"}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    or{" "}
                    <span className="font-semibold text-slate-700 underline underline-offset-2">
                      click to browse
                    </span>
                  </p>
                  <p className="mt-2 text-xs text-slate-400">
                    JPEG, PNG, WebP or GIF · max 5 MB
                  </p>
                </div>
              </>
            ) : (
              <>
                <svg
                  aria-hidden="true"
                  className="h-10 w-10 text-slate-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-sm font-medium text-red-800">{helperText}</p>
              </>
            )}
          </div>
        )}

        {uploadError ? (
          <p className="text-sm font-medium text-red-800" role="alert">
            {uploadError}
          </p>
        ) : null}

        {statusMessage ? (
          <p className="text-sm font-medium text-emerald-900" role="status">
            {statusMessage}
          </p>
        ) : null}

        <FieldError error={coverImageUrlError} id="cover-image-url-error" />

        {/* Alt text */}
        <div>
          <label
            className="block text-sm font-semibold text-slate-900"
            htmlFor="coverImageAlt"
          >
            Cover image description
            {!coverImageUrl ? (
              <span className="ml-2 text-xs font-normal text-slate-500">
                (fill in after uploading)
              </span>
            ) : null}
          </label>
          <input
            aria-describedby={[
              altDescId,
              coverImageAltError ? "cover-image-alt-error" : null,
            ]
              .filter(Boolean)
              .join(" ")}
            aria-invalid={coverImageAltError ? true : undefined}
            className={`mt-2 w-full rounded-2xl border px-4 py-3 text-slate-950 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-950 ${
              coverImageAltError
                ? "border-red-500 bg-white focus:border-red-500"
                : "border-slate-400 bg-white focus:border-slate-950"
            }`}
            id="coverImageAlt"
            name="coverImageAlt"
            onChange={(event) => onAltChange(event.target.value)}
            placeholder="Describe the cover image for readers using assistive technology"
            ref={altInputRef}
            type="text"
            value={coverImageAlt}
          />
          <p className="mt-2 text-sm text-slate-700" id={altDescId}>
            {coverImageUrl
              ? "The filename was used as a placeholder — edit this to describe what's in the image for screen reader users."
              : "After uploading, describe what's in the image for screen reader users. You can edit this any time before publishing."}
          </p>
          <FieldError error={coverImageAltError} id="cover-image-alt-error" />
        </div>
      </div>
    </section>
  );
}
