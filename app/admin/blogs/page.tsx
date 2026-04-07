import Link from "next/link";

import BlogSourceBadge from "@/components/admin/blogs/BlogSourceBadge";
import BlogStatusBadge from "@/components/admin/blogs/BlogStatusBadge";
import DeletePostButton from "@/components/admin/blogs/DeletePostButton";
import NewPostTypeModal from "@/components/admin/blogs/NewPostTypeModal";
import { requireAdminAccess } from "@/lib/auth/admin";
import { getAdminHomePath } from "@/lib/auth/roles";
import { listPostsForAdmin, type PostAdminListFilters } from "@/lib/data/posts";
import { canArchiveBlogPost, canDeleteBlogPost, canEditBlogPost, canPublishBlogPost } from "@/lib/blogs/permissions";

import { manageBlogPostAction } from "./actions";

// ── Shared button token classes ──────────────────────────────────────────────
// Primary: brand gradient — used for the most important action on screen
const BTN_PRIMARY =
  "inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[linear-gradient(90deg,#7c2d12_0%,#9a3412_100%)] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C27803] focus-visible:ring-offset-2";

// Secondary: white with subtle border — supporting actions
const BTN_SECONDARY =
  "inline-flex min-h-[44px] items-center justify-center rounded-xl border border-[#e2e8f0] bg-white px-4 py-2.5 text-sm font-semibold text-[#1e293b] hover:bg-[#f1f5f9] hover:border-[#cbd5e1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C27803] focus-visible:ring-offset-2";

// Danger: red outline — destructive action only
const BTN_DANGER =
  "inline-flex min-h-[44px] items-center justify-center rounded-xl border border-[#991b1b] bg-white px-4 py-2.5 text-sm font-semibold text-[#991b1b] hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C27803] focus-visible:ring-offset-2";
// ─────────────────────────────────────────────────────────────────────────────

type BlogAdminPageProps = {
  searchParams?: Promise<{
    kind?: string;
    notice?: string;
    sourceType?: string;
    status?: string;
  }>;
};

function normalizeFilterValue<T extends string>(
  value: string | undefined,
  allowedValues: readonly T[],
) {
  return value && allowedValues.includes(value as T) ? (value as T) : undefined;
}

export default async function BlogAdminPage({ searchParams }: BlogAdminPageProps) {
  const viewer = await requireAdminAccess("/admin/blogs");
  const resolvedSearchParams = (await searchParams) ?? {};
  const status = normalizeFilterValue(resolvedSearchParams.status, [
    "archived",
    "draft",
    "published",
  ] as const);
  const sourceType = normalizeFilterValue(resolvedSearchParams.sourceType, [
    "external_link",
    "internal_article",
  ] as const);
  const filters: PostAdminListFilters = {
    createdBy: viewer.role === "guest_writer" ? viewer.id : undefined,
    sourceType,
    status,
  };
  const posts = await listPostsForAdmin(filters);
  const homePath = getAdminHomePath(viewer.role);

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
        <div className="flex flex-col gap-6 border-b border-[#e2e8f0] px-6 py-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#1e293b]">
              Blog CMS
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#334155]">
              Create posts that live on your site or share links to other websites.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {homePath !== "/admin/blogs" ? (
              <Link href={homePath} className={BTN_SECONDARY}>
                Back to dashboard
              </Link>
            ) : null}

            <NewPostTypeModal
              buttonLabel={viewer.role === "guest_writer" ? "New draft" : "New post"}
            />
          </div>
        </div>

        <div className="space-y-6 px-6 py-6">
          {resolvedSearchParams.notice ? (
            <div
              className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
                resolvedSearchParams.kind === "error"
                  ? "border-[#991b1b] bg-red-50 text-[#991b1b]"
                  : "border-emerald-300 bg-emerald-50 text-[#064e3b]"
              }`}
              role={resolvedSearchParams.kind === "error" ? "alert" : "status"}
            >
              {resolvedSearchParams.notice}
            </div>
          ) : null}

          {viewer.role === "guest_writer" ? (
            <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-4 text-sm text-[#78350f]">
              <p className="font-semibold">Guest writer workspace</p>
              <p className="mt-1 leading-6">
                You can create and edit your own drafts here. Editors and super admins handle publishing.
              </p>
            </div>
          ) : null}

          {/* Filter form */}
          <form className="grid gap-4 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-4 md:grid-cols-[1fr_1fr_auto]">
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-semibold text-[#1e293b]"
              >
                Filter by status
              </label>
              <select
                className="mt-2 w-full rounded-xl border border-[#cbd5e1] bg-white px-4 py-3 text-[#1e293b] focus-visible:border-[#7c2d12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C27803] focus-visible:ring-offset-2"
                defaultValue={status ?? ""}
                id="status"
                name="status"
              >
                <option value="">All statuses</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="sourceType"
                className="block text-sm font-semibold text-[#1e293b]"
              >
                Filter by content type
              </label>
              <select
                className="mt-2 w-full rounded-xl border border-[#cbd5e1] bg-white px-4 py-3 text-[#1e293b] focus-visible:border-[#7c2d12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C27803] focus-visible:ring-offset-2"
                defaultValue={sourceType ?? ""}
                id="sourceType"
                name="sourceType"
              >
                <option value="">All types</option>
                <option value="internal_article">Internal article</option>
                <option value="external_link">External link</option>
              </select>
            </div>

            <div className="flex items-end gap-3">
              {/* Primary action — brand gradient */}
              <button className={BTN_PRIMARY} type="submit">
                Apply filters
              </button>
              <Link href="/admin/blogs" className={BTN_SECONDARY}>
                Reset
              </Link>
            </div>
          </form>

          {posts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#cbd5e1] bg-[#f8fafc] px-6 py-12 text-center">
              <h2 className="text-lg font-semibold text-[#1e293b]">
                No posts found
              </h2>
              <p className="mt-2 text-sm text-[#334155]">
                {viewer.role === "guest_writer"
                  ? "Your draft workspace is empty."
                  : "No blog entries match the current filters."}
              </p>
            </div>
          ) : (
            <>
              {/* Mobile card list */}
              <div className="space-y-4 lg:hidden">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="rounded-xl border border-[#e2e8f0] bg-white p-5 shadow-sm transition-all duration-150 hover:border-[#cbd5e1] hover:shadow-md"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <BlogStatusBadge status={post.status} />
                      <BlogSourceBadge sourceType={post.sourceType} />
                    </div>

                    <h2 className="mt-4 text-lg font-semibold text-[#1e293b]">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-[#334155]">
                      {post.summary}
                    </p>

                    <dl className="mt-4 space-y-2 text-sm text-[#334155]">
                      <div>
                        <dt className="font-semibold text-[#1e293b]">Slug</dt>
                        <dd>{post.slug}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-[#1e293b]">Author</dt>
                        <dd>{post.authorName ?? "Unassigned"}</dd>
                      </div>
                    </dl>

                    <div className="mt-5 flex flex-wrap gap-3">
                      {canEditBlogPost(viewer, post) ? (
                        <Link href={`/admin/blogs/${post.id}/edit`} className={BTN_SECONDARY}>
                          Edit
                        </Link>
                      ) : null}

                      {canPublishBlogPost(viewer) && post.status !== "published" ? (
                        <form action={manageBlogPostAction}>
                          <input name="intent" type="hidden" value="publish" />
                          <input name="postId" type="hidden" value={post.id} />
                          <input name="redirectTo" type="hidden" value="/admin/blogs" />
                          <button className={BTN_PRIMARY} type="submit">
                            Publish
                          </button>
                        </form>
                      ) : null}

                      {canArchiveBlogPost(viewer) && post.status !== "archived" ? (
                        <form action={manageBlogPostAction}>
                          <input name="intent" type="hidden" value="archive" />
                          <input name="postId" type="hidden" value={post.id} />
                          <input name="redirectTo" type="hidden" value="/admin/blogs" />
                          <button className={BTN_SECONDARY} type="submit">
                            Archive
                          </button>
                        </form>
                      ) : null}

                      {canDeleteBlogPost(viewer, post) ? (
                        <DeletePostButton
                          action={manageBlogPostAction}
                          className={BTN_DANGER}
                          postId={post.id}
                          postTitle={post.title}
                          redirectTo="/admin/blogs"
                        />
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>

              {/* Desktop table */}
              <div className="hidden overflow-x-auto lg:block">
                <table className="min-w-full divide-y divide-[#e2e8f0]">
                  <thead className="bg-[#f8fafc]">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#334155]">
                        Title
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#334155]">
                        Slug
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#334155]">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#334155]">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#334155]">
                        Author
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-[#334155]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e2e8f0] bg-white">
                    {posts.map((post) => (
                      <tr
                        key={post.id}
                        className="align-top transition-colors duration-100 hover:bg-[#f1f5f9]"
                      >
                        <td className="px-4 py-4">
                          <div className="max-w-md">
                            <p className="font-semibold text-[#1e293b]">{post.title}</p>
                            <p className="mt-1 text-sm leading-6 text-[#334155]">
                              {post.summary}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-[#334155]">{post.slug}</td>
                        <td className="px-4 py-4">
                          <BlogSourceBadge sourceType={post.sourceType} />
                        </td>
                        <td className="px-4 py-4">
                          <BlogStatusBadge status={post.status} />
                        </td>
                        <td className="px-4 py-4 text-sm text-[#334155]">
                          {post.authorName ?? "Unassigned"}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-wrap justify-end gap-2">
                            {canEditBlogPost(viewer, post) ? (
                              <Link
                                href={`/admin/blogs/${post.id}/edit`}
                                className={BTN_SECONDARY}
                              >
                                Edit
                              </Link>
                            ) : null}

                            {canPublishBlogPost(viewer) && post.status !== "published" ? (
                              <form action={manageBlogPostAction}>
                                <input name="intent" type="hidden" value="publish" />
                                <input name="postId" type="hidden" value={post.id} />
                                <input name="redirectTo" type="hidden" value="/admin/blogs" />
                                <button className={BTN_PRIMARY} type="submit">
                                  Publish
                                </button>
                              </form>
                            ) : null}

                            {canArchiveBlogPost(viewer) && post.status !== "archived" ? (
                              <form action={manageBlogPostAction}>
                                <input name="intent" type="hidden" value="archive" />
                                <input name="postId" type="hidden" value={post.id} />
                                <input name="redirectTo" type="hidden" value="/admin/blogs" />
                                <button className={BTN_SECONDARY} type="submit">
                                  Archive
                                </button>
                              </form>
                            ) : null}

                            {canDeleteBlogPost(viewer, post) ? (
                              <DeletePostButton
                                action={manageBlogPostAction}
                                className={BTN_DANGER}
                                postId={post.id}
                                postTitle={post.title}
                                redirectTo="/admin/blogs"
                              />
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
