"use client";

import { useState } from "react";

import type { BlogEditorActionState } from "@/lib/blogs/form-state";

import type { BlogComposerPost, BlogComposerValues } from "./composer-types";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import FieldError from "./FieldError";

type BlogPostSettingsPanelProps = {
  archiveAction?: () => void | Promise<void>;
  canArchive: boolean;
  canDelete: boolean;
  deleteAction?: () => void | Promise<void>;
  isOpen: boolean;
  onAuthorNameChange: (value: string) => void;
  onCanonicalUrlChange: (value: string) => void;
  onFeaturedChange: (checked: boolean) => void;
  onSlugChange: (value: string) => void;
  onSeoDescriptionChange: (value: string) => void;
  onSeoTitleChange: (value: string) => void;
  onSourceTypeChange: (value: BlogComposerValues["sourceType"]) => void;
  post?: BlogComposerPost;
  slugLocked: boolean;
  sourceTypeLocked: boolean;
  state: BlogEditorActionState;
  values: BlogComposerValues;
};

export default function BlogPostSettingsPanel({
  archiveAction,
  canArchive,
  canDelete,
  deleteAction,
  isOpen,
  onAuthorNameChange,
  onCanonicalUrlChange,
  onFeaturedChange,
  onSlugChange,
  onSeoDescriptionChange,
  onSeoTitleChange,
  onSourceTypeChange,
  post,
  slugLocked,
  sourceTypeLocked,
  state,
  values,
}: BlogPostSettingsPanelProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  return (
    <aside className="xl:col-start-2 xl:row-start-1 xl:sticky xl:top-24">
      <section
        id="blog-settings-panel"
        className={`rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm ${isOpen ? "block" : "hidden xl:block"}`}
      >
        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-700">
              Post settings
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Use these settings if you need to change the post type, link, or search details.
            </p>
          </div>

          <div>
            <span className="block text-sm font-semibold text-slate-900">
              Content type
            </span>
            {sourceTypeLocked ? (
              <div className="mt-2 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900">
                {values.sourceType === "internal_article"
                  ? "Write on this site"
                  : "Share a link"}
                <p className="mt-2 text-slate-700">
                  You can only change this while the post is still a draft.
                </p>
              </div>
            ) : (
              <div className="mt-3 grid gap-3">
                <label className="rounded-2xl border border-slate-300 bg-white p-4 text-sm text-slate-900">
                  <div className="flex items-start gap-3">
                    <input
                      checked={values.sourceType === "internal_article"}
                      className="mt-1 h-4 w-4 border-slate-400 text-slate-950 focus:ring-slate-950"
                      onChange={() => onSourceTypeChange("internal_article")}
                      type="radio"
                      value="internal_article"
                    />
                    <div>
                      <p className="font-semibold">Write on this site</p>
                      <p className="mt-1 text-slate-700">
                        Create a full post that lives on your website.
                      </p>
                    </div>
                  </div>
                </label>

                <label className="rounded-2xl border border-slate-300 bg-white p-4 text-sm text-slate-900">
                  <div className="flex items-start gap-3">
                    <input
                      checked={values.sourceType === "external_link"}
                      className="mt-1 h-4 w-4 border-slate-400 text-slate-950 focus:ring-slate-950"
                      onChange={() => onSourceTypeChange("external_link")}
                      type="radio"
                      value="external_link"
                    />
                    <div>
                      <p className="font-semibold">Share a link</p>
                      <p className="mt-1 text-slate-700">
                        Add a short summary and send readers to another website.
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-semibold text-slate-900">
              Slug
            </label>
            <input
              aria-describedby={[
                "slug-help",
                state.fieldErrors.slug ? "slug-error" : null,
              ]
                .filter(Boolean)
                .join(" ")}
              aria-invalid={state.fieldErrors.slug ? true : undefined}
              className="mt-2 w-full rounded-2xl border border-slate-400 bg-white px-4 py-3 text-slate-950 shadow-sm focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 disabled:bg-slate-100"
              id="slug"
              name="slug"
              onChange={(event) => onSlugChange(event.target.value)}
              readOnly={slugLocked}
              type="text"
              value={values.slug}
            />
            <p id="slug-help" className="mt-2 text-sm text-slate-700">
              {slugLocked
                ? "Published links stay locked so people can keep using them."
                : "You can change this before publishing. The app will clean it up and keep it unique."}
            </p>
            <FieldError error={state.fieldErrors.slug} id="slug-error" />
          </div>

          {values.sourceType === "internal_article" ? (
            <div>
              <label
                htmlFor="authorName"
                className="block text-sm font-semibold text-slate-900"
              >
                Author name
              </label>
              <input
                aria-describedby={state.fieldErrors.authorName ? "author-name-error" : undefined}
                aria-invalid={state.fieldErrors.authorName ? true : undefined}
                className="mt-2 w-full rounded-2xl border border-slate-400 bg-white px-4 py-3 text-slate-950 shadow-sm focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
                id="authorName"
                name="authorName"
                onChange={(event) => onAuthorNameChange(event.target.value)}
                type="text"
                value={values.authorName}
              />
              <p className="mt-2 text-sm text-slate-700">
                This name appears with the post.
              </p>
              <FieldError error={state.fieldErrors.authorName} id="author-name-error" />
            </div>
          ) : null}

          <div>
            <label
              htmlFor="canonicalUrl"
              className="block text-sm font-semibold text-slate-900"
            >
              Canonical URL
            </label>
            <input
              aria-describedby={state.fieldErrors.canonicalUrl ? "canonical-url-error" : undefined}
              aria-invalid={state.fieldErrors.canonicalUrl ? true : undefined}
              className="mt-2 w-full rounded-2xl border border-slate-400 bg-white px-4 py-3 text-slate-950 shadow-sm focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
              id="canonicalUrl"
              name="canonicalUrl"
              onChange={(event) => onCanonicalUrlChange(event.target.value)}
              type="url"
              value={values.canonicalUrl}
            />
            <p className="mt-2 text-sm text-slate-700">
              Use this only if another page should be treated as the main source.
            </p>
            <FieldError error={state.fieldErrors.canonicalUrl} id="canonical-url-error" />
          </div>

          <div>
            <label htmlFor="seoTitle" className="block text-sm font-semibold text-slate-900">
              SEO title
            </label>
            <input
              aria-describedby={state.fieldErrors.seoTitle ? "seo-title-error" : undefined}
              aria-invalid={state.fieldErrors.seoTitle ? true : undefined}
              className="mt-2 w-full rounded-2xl border border-slate-400 bg-white px-4 py-3 text-slate-950 shadow-sm focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
              id="seoTitle"
              name="seoTitle"
              onChange={(event) => onSeoTitleChange(event.target.value)}
              type="text"
              value={values.seoTitle}
            />
            <p className="mt-2 text-sm text-slate-700">
              This can help search engines show a clearer title.
            </p>
            <FieldError error={state.fieldErrors.seoTitle} id="seo-title-error" />
          </div>

          <div>
            <label
              htmlFor="seoDescription"
              className="block text-sm font-semibold text-slate-900"
            >
              SEO description
            </label>
            <textarea
              aria-describedby={state.fieldErrors.seoDescription ? "seo-description-error" : undefined}
              aria-invalid={state.fieldErrors.seoDescription ? true : undefined}
              className="mt-2 min-h-24 w-full rounded-2xl border border-slate-400 bg-white px-4 py-3 text-slate-950 shadow-sm focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
              id="seoDescription"
              name="seoDescription"
              onChange={(event) => onSeoDescriptionChange(event.target.value)}
              rows={3}
              value={values.seoDescription}
            />
            <p className="mt-2 text-sm text-slate-700">
              This can help search engines show a clearer summary.
            </p>
            <FieldError error={state.fieldErrors.seoDescription} id="seo-description-error" />
          </div>

          <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900">
            <input
              checked={values.isFeatured}
              className="mt-1 h-4 w-4 border-slate-400 text-slate-950 focus:ring-slate-950"
              name="isFeatured"
              onChange={(event) => onFeaturedChange(event.target.checked)}
              type="checkbox"
            />
            <span>
              <span className="font-semibold">Feature this post</span>
              <span className="mt-1 block text-slate-700">
                Featured posts can be highlighted later on the public site.
              </span>
            </span>
          </label>

          {post?.id && (archiveAction || deleteAction) && (canArchive || canDelete) ? (
            <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-700">
                Post actions
              </h3>
              <div className="flex flex-wrap gap-3">
                {canArchive && archiveAction && post.status !== "archived" ? (
                  <button
                    className="rounded-2xl border border-slate-400 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                    formAction={archiveAction}
                    type="submit"
                  >
                    Archive
                  </button>
                ) : null}

                {canDelete && deleteAction ? (
                  <button
                    className="rounded-2xl border border-red-700 bg-white px-4 py-3 text-sm font-semibold text-red-800 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2"
                    onClick={() => setShowDeleteConfirm(true)}
                    type="button"
                  >
                    Delete
                  </button>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {showDeleteConfirm && deleteAction ? (
        <ConfirmDeleteModal
          onCancel={() => setShowDeleteConfirm(false)}
          onConfirm={async () => {
            setIsDeleting(true);
            try {
              await deleteAction();
            } finally {
              setIsDeleting(false);
              setShowDeleteConfirm(false);
            }
          }}
          pending={isDeleting}
          postTitle={values.title || "Untitled post"}
        />
      ) : null}
    </aside>
  );
}
