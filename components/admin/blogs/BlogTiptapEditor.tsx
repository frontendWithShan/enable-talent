"use client";

import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

import {
  createBlogEditorExtensions,
  type BlogEditorDocument,
} from "@/lib/blogs/editor";
import { BLOG_IMAGE_ACCEPT, deriveImageAltText } from "@/lib/blogs/uploads";

export type BlogEditorImageUploadResult = {
  altText: string;
  assetId: string;
  fileName: string;
  postId: string;
  url: string;
};

type BlogTiptapEditorProps = {
  canUploadImages: boolean;
  describedBy?: string;
  error?: string;
  label: string;
  onChange: (value: BlogEditorDocument) => void;
  onDraftBootstrap?: (postId: string, document: BlogEditorDocument) => void;
  onUploadImage: (
    file: File,
    altText: string,
  ) => Promise<BlogEditorImageUploadResult>;
  onUploadStateChange?: (isUploading: boolean) => void;
  postId?: string;
  value: BlogEditorDocument;
};

function preventFocusSteal(event: React.MouseEvent) {
  event.preventDefault();
}

function ToolbarSep() {
  return <span aria-hidden="true" className="mx-0.5 h-5 w-px shrink-0 bg-slate-200" />;
}

function ToolbarButton({
  active,
  children,
  disabled,
  label,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={label}
      aria-pressed={active}
      className={`rounded-lg px-2.5 py-1.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-1 ${
        active
          ? "bg-slate-950 text-white"
          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
      } disabled:cursor-not-allowed disabled:opacity-40`}
      disabled={disabled}
      onClick={onClick}
      onMouseDown={preventFocusSteal}
      type="button"
    >
      {children}
    </button>
  );
}


export default function BlogTiptapEditor({
  canUploadImages,
  describedBy,
  error,
  label,
  onChange,
  onDraftBootstrap,
  onUploadImage,
  onUploadStateChange,
  postId,
  value,
}: BlogTiptapEditorProps) {
  const imagePanelId = useId();
  const inlineAltId = useId();
  const inlineUploadId = useId();
  const linkFieldId = useId();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [linkValue, setLinkValue] = useState("");
  const [selectedInlineFile, setSelectedInlineFile] = useState<File | null>(null);
  const [inlineAltText, setInlineAltText] = useState("");
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [showLinkControls, setShowLinkControls] = useState(false);
  const [showImageInsertPanel, setShowImageInsertPanel] = useState(false);
  const [insertPosition, setInsertPosition] = useState<number | null>(null);
  // Incrementing this forces a re-render so toolbar active states stay in sync with
  // the editor's selection/content without exposing Tiptap's internal state to React.
  const [, setEditorTick] = useState(0);
  const { pending } = useFormStatus();

  const editorAttributes: Record<string, string> = {
    "aria-invalid": error ? "true" : "false",
    "aria-label": label,
    class:
      "min-h-[420px] px-6 py-8 text-lg leading-8 text-slate-950 focus:outline-none",
  };

  if (describedBy) {
    editorAttributes["aria-describedby"] = describedBy;
  }

  const extensions = useMemo(
    () => [
      ...createBlogEditorExtensions(),
      Placeholder.configure({
        placeholder: "Start writing your article...",
      }),
    ],
    [],
  );

  // Notify parent when inline upload starts or finishes so it can block form submit.
  useEffect(() => {
    onUploadStateChange?.(isUploadingImage);
  }, [isUploadingImage, onUploadStateChange]);

  const editor = useEditor({
    content: value,
    editorProps: {
      attributes: editorAttributes,
    },
    extensions,
    immediatelyRender: false,
    onSelectionUpdate({ editor: nextEditor }) {
      const currentLink = nextEditor.getAttributes("link").href;
      setLinkValue(typeof currentLink === "string" ? currentLink : "");
      if (!nextEditor.state.selection.empty) {
        setShowImageInsertPanel(false);
      } else {
        // Keep insertPosition current so the panel always reflects the latest cursor spot.
        setInsertPosition(nextEditor.state.selection.from);
      }
      setEditorTick((t) => t + 1);
    },
    onFocus() {
      setEditorTick((t) => t + 1);
    },
    onUpdate({ editor: nextEditor }) {
      onChange(nextEditor.getJSON());
      setEditorTick((t) => t + 1);
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    const currentValue = JSON.stringify(editor.getJSON());
    const nextValue = JSON.stringify(value);

    if (currentValue !== nextValue) {
      editor.commands.setContent(value, {
        emitUpdate: false,
      });
    }
  }, [editor, value]);

  useEffect(() => {
    if (!showImageInsertPanel) {
      setSelectedInlineFile(null);
      setInlineAltText("");
      setUploadError(null);
    }
  }, [showImageInsertPanel]);

  useEffect(() => {
    if (!pending) {
      return;
    }

    setShowImageInsertPanel(false);
    setShowLinkControls(false);
  }, [pending]);

  async function handleInlineUpload() {
    if (!editor || !selectedInlineFile) {
      return;
    }

    setUploadError(null);
    setUploadMessage(null);
    setIsUploadingImage(true);

    try {
      const normalizedAltText =
        inlineAltText.trim() || deriveImageAltText(selectedInlineFile.name);
      const result = await onUploadImage(selectedInlineFile, normalizedAltText);
      const chain = editor.chain().focus();

      if (insertPosition !== null) {
        chain.setTextSelection(insertPosition);
      }

      chain
        .setImage({
          alt: result.altText,
          src: result.url,
        })
        .run();

      const nextDocument = editor.getJSON();
      onChange(nextDocument);

      if (!postId) {
        onDraftBootstrap?.(result.postId, nextDocument);
      }

      setInlineAltText("");
      setSelectedInlineFile(null);
      setShowImageInsertPanel(false);
      setInsertPosition(null);
      setUploadMessage("Image uploaded and inserted into the article.");
    } catch (uploadException) {
      setUploadError(
        uploadException instanceof Error
          ? uploadException.message
          : "The image could not be uploaded.",
      );
    } finally {
      setIsUploadingImage(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
        {/* ── Permanent formatting toolbar ── */}
        {editor && !pending ? (
          <div
            aria-label="Article formatting toolbar"
            className="border-b border-slate-200 bg-slate-50 px-4 py-3"
            role="toolbar"
          >
            <div className="flex flex-wrap items-center gap-1">
              {/* Text style */}
              <ToolbarButton
                active={editor.isActive("bold")}
                label="Bold"
                onClick={() => editor.chain().focus().toggleBold().run()}
              >
                <span className="font-bold">B</span>
              </ToolbarButton>
              <ToolbarButton
                active={editor.isActive("italic")}
                label="Italic"
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                <span className="italic">I</span>
              </ToolbarButton>

              <ToolbarSep />

              {/* Headings */}
              <ToolbarButton
                active={editor.isActive("heading", { level: 2 })}
                label="Heading 2"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
              >
                H2
              </ToolbarButton>
              <ToolbarButton
                active={editor.isActive("heading", { level: 3 })}
                label="Heading 3"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
              >
                H3
              </ToolbarButton>

              <ToolbarSep />

              {/* Lists & blocks */}
              <ToolbarButton
                active={editor.isActive("bulletList")}
                label="Bullet list"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                Bullets
              </ToolbarButton>
              <ToolbarButton
                active={editor.isActive("orderedList")}
                label="Numbered list"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                Numbers
              </ToolbarButton>
              <ToolbarButton
                active={editor.isActive("blockquote")}
                label="Block quote"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
              >
                Quote
              </ToolbarButton>
              <ToolbarButton
                label="Insert horizontal divider"
                onClick={() =>
                  editor.chain().focus().setHorizontalRule().run()
                }
              >
                Divider
              </ToolbarButton>

              <ToolbarSep />

              {/* Media & links */}
              <ToolbarButton
                active={showImageInsertPanel}
                disabled={!canUploadImages}
                label={
                  canUploadImages
                    ? "Insert image"
                    : "Add a title and summary before inserting images"
                }
                onClick={() => {
                  if (showImageInsertPanel) {
                    setShowImageInsertPanel(false);
                  } else {
                    setInsertPosition(editor.state.selection.from);
                    setShowImageInsertPanel(true);
                  }
                }}
              >
                Insert image
              </ToolbarButton>
              <ToolbarButton
                active={editor.isActive("link") || showLinkControls}
                label="Insert or edit link"
                onClick={() => setShowLinkControls((v) => !v)}
              >
                Link
              </ToolbarButton>
            </div>

            {/* Link input row — shown inline below toolbar buttons */}
            {showLinkControls ? (
              <div className="mt-2 flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2">
                <label className="sr-only" htmlFor={linkFieldId}>
                  Link URL
                </label>
                <input
                  autoFocus
                  className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
                  id={linkFieldId}
                  onChange={(event) => setLinkValue(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      if (linkValue.trim()) {
                        editor
                          .chain()
                          .focus()
                          .extendMarkRange("link")
                          .setLink({ href: linkValue.trim() })
                          .run();
                        setShowLinkControls(false);
                      }
                    }
                    if (event.key === "Escape") {
                      setShowLinkControls(false);
                      editor.chain().focus().run();
                    }
                  }}
                  placeholder="https://example.com/article"
                  type="url"
                  value={linkValue}
                />
                <button
                  className="rounded-xl bg-slate-950 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={!linkValue.trim()}
                  onClick={() => {
                    editor
                      .chain()
                      .focus()
                      .extendMarkRange("link")
                      .setLink({ href: linkValue.trim() })
                      .run();
                    setShowLinkControls(false);
                  }}
                  onMouseDown={preventFocusSteal}
                  type="button"
                >
                  Apply
                </button>
                {editor.isActive("link") ? (
                  <button
                    className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                    onClick={() => {
                      editor.chain().focus().unsetLink().run();
                      setLinkValue("");
                      setShowLinkControls(false);
                    }}
                    onMouseDown={preventFocusSteal}
                    type="button"
                  >
                    Remove link
                  </button>
                ) : null}
                <button
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                  onClick={() => {
                    setShowLinkControls(false);
                    editor.chain().focus().run();
                  }}
                  onMouseDown={preventFocusSteal}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            ) : null}
          </div>
        ) : null}

        {/* ── Image insert panel — inside container so cursor stays visible below ── */}
        {showImageInsertPanel ? (
          <div
            aria-labelledby={imagePanelId}
            className="border-b border-sky-200 bg-sky-50 px-5 py-5"
            role="region"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3
                  className="text-sm font-semibold text-slate-900"
                  id={imagePanelId}
                >
                  Insert image into article
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Click back into the article to change where the image will be inserted.
                </p>
              </div>
              <button
                className="shrink-0 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                onClick={() => setShowImageInsertPanel(false)}
                type="button"
              >
                Cancel
              </button>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {/* Step 1 */}
              <div>
                <label
                  className="block text-sm font-semibold text-slate-900"
                  htmlFor={inlineAltId}
                >
                  1. Describe the image
                  <span className="ml-1 text-xs font-normal text-slate-500">
                    (for screen readers)
                  </span>
                </label>
                <input
                  autoFocus
                  className="mt-2 w-full rounded-2xl border border-slate-400 bg-white px-4 py-3 text-slate-950 shadow-sm focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
                  id={inlineAltId}
                  onChange={(event) => setInlineAltText(event.target.value)}
                  placeholder='e.g. "A person using a laptop at a bright desk"'
                  type="text"
                  value={inlineAltText}
                />
              </div>

              {/* Step 2 */}
              <div>
                <label
                  className="block text-sm font-semibold text-slate-900"
                  htmlFor={inlineUploadId}
                >
                  2. Choose image file
                </label>
                {/* Hidden real input */}
                <input
                  accept={BLOG_IMAGE_ACCEPT}
                  className="sr-only"
                  disabled={!canUploadImages || isUploadingImage}
                  id={inlineUploadId}
                  onChange={(event) => {
                    const nextFile = event.target.files?.[0] ?? null;
                    setSelectedInlineFile(nextFile);
                    if (nextFile && !inlineAltText.trim()) {
                      setInlineAltText(deriveImageAltText(nextFile.name));
                    }
                  }}
                  ref={fileInputRef}
                  type="file"
                />
                {/* Styled trigger */}
                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-300 bg-white px-4 py-3 shadow-sm">
                  <button
                    className="shrink-0 rounded-xl bg-slate-950 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={!canUploadImages || isUploadingImage}
                    onClick={() => fileInputRef.current?.click()}
                    type="button"
                  >
                    Browse...
                  </button>
                  <span className="min-w-0 truncate text-sm text-slate-600">
                    {selectedInlineFile
                      ? selectedInlineFile.name
                      : "No file chosen"}
                  </span>
                  {selectedInlineFile ? (
                    <button
                      aria-label="Remove selected file"
                      className="ml-auto shrink-0 rounded-lg px-2 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-950"
                      onClick={() => setSelectedInlineFile(null)}
                      type="button"
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Upload action */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {isUploadingImage ? (
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4 animate-spin"
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
                  Uploading and inserting image...
                </div>
              ) : (
                <button
                  className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={!canUploadImages || !selectedInlineFile}
                  onClick={handleInlineUpload}
                  type="button"
                >
                  Insert image
                </button>
              )}
              {uploadError ? (
                <p className="text-sm font-medium text-red-800" role="alert">
                  {uploadError}
                </p>
              ) : null}
            </div>
          </div>
        ) : null}

        <EditorContent editor={editor} />
      </div>

      {uploadMessage ? (
        <p className="text-sm font-medium text-emerald-900" role="status">
          {uploadMessage}
        </p>
      ) : null}
    </div>
  );
}
