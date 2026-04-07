import Link from "next/link";

import CareerStatusBadge from "@/components/admin/careers/CareerStatusBadge";
import { requireAdminAccess } from "@/lib/auth/admin";
import { getAdminHomePath } from "@/lib/auth/roles";
import {
  EMPLOYMENT_TYPE_OPTIONS,
  WORK_MODE_OPTIONS,
  formatCareerTokenLabel,
} from "@/lib/careers/options";
import {
  canCreateCareerPosting,
  canPublishCareerPosting,
} from "@/lib/careers/permissions";
import { listJobsForAdmin, type JobAdminListFilters } from "@/lib/data/jobs";
import type { JobStatus } from "@/lib/data/types";

import { manageCareerPostingAction } from "./actions";

type CareersAdminPageProps = {
  searchParams?: Promise<{
    employmentType?: string;
    kind?: string;
    notice?: string;
    query?: string;
    status?: string;
    workMode?: string;
  }>;
};

function normalizeFilterValue<T extends string>(
  value: string | undefined,
  allowedValues: readonly T[],
) {
  return value && allowedValues.includes(value as T) ? (value as T) : undefined;
}

function normalizeQuery(value: string | undefined) {
  return value?.trim() ? value.trim() : undefined;
}

function formatTimestamp(value: string | null | undefined) {
  if (!value) {
    return "Not set";
  }

  return new Date(value).toLocaleString("en-CA", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function CareersAdminPage({
  searchParams,
}: CareersAdminPageProps) {
  const viewer = await requireAdminAccess("/admin/careers");
  const resolvedSearchParams = (await searchParams) ?? {};
  const query = normalizeQuery(resolvedSearchParams.query);
  const status = normalizeFilterValue(resolvedSearchParams.status, [
    "archived",
    "draft",
    "published",
  ] as const satisfies readonly JobStatus[]);
  const employmentType = normalizeFilterValue(
    resolvedSearchParams.employmentType,
    EMPLOYMENT_TYPE_OPTIONS,
  );
  const workMode = normalizeFilterValue(
    resolvedSearchParams.workMode,
    WORK_MODE_OPTIONS,
  );
  const filters: JobAdminListFilters = {
    employmentType,
    query,
    status,
    workMode,
  };
  const jobs = await listJobsForAdmin(filters);
  const homePath = getAdminHomePath(viewer.role);
  const canManage = canCreateCareerPosting(viewer);

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-6 border-b border-slate-200 px-6 py-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
              Careers CMS
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700">
              Manage internal career postings with structured job details, publishing states, and operational filters.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={homePath}
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
            >
              Back to dashboard
            </Link>

            {canManage ? (
              <Link
                href="/admin/careers/new"
                className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
              >
                New career posting
              </Link>
            ) : null}
          </div>
        </div>

        <div className="space-y-6 px-6 py-6">
          {resolvedSearchParams.notice ? (
            <div
              className={`rounded-xl border px-4 py-3 text-sm ${
                resolvedSearchParams.kind === "error"
                  ? "border-red-300 bg-red-50 text-red-950"
                  : "border-emerald-300 bg-emerald-50 text-emerald-950"
              }`}
              role={resolvedSearchParams.kind === "error" ? "alert" : "status"}
            >
              {resolvedSearchParams.notice}
            </div>
          ) : null}

          {!canManage ? (
            <section className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-4 text-sm text-amber-950">
              <p className="font-semibold">Read-only careers access</p>
              <p className="mt-1 leading-6">
                Editors can search and review career postings here. Creating, editing, publishing, and archiving are limited to super admins.
              </p>
            </section>
          ) : null}

          <form className="grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[2fr_1fr_1fr_1fr_auto]">
            <div>
              <label
                htmlFor="query"
                className="block text-sm font-semibold text-slate-900"
              >
                Search
              </label>
              <input
                className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
                defaultValue={query ?? ""}
                id="query"
                name="query"
                placeholder="Search by role title, slug, or location"
                type="search"
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-semibold text-slate-900"
              >
                Status
              </label>
              <select
                className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
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
                htmlFor="employmentType"
                className="block text-sm font-semibold text-slate-900"
              >
                Employment type
              </label>
              <select
                className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
                defaultValue={employmentType ?? ""}
                id="employmentType"
                name="employmentType"
              >
                <option value="">All types</option>
                {EMPLOYMENT_TYPE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {formatCareerTokenLabel(option)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="workMode"
                className="block text-sm font-semibold text-slate-900"
              >
                Work mode
              </label>
              <select
                className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
                defaultValue={workMode ?? ""}
                id="workMode"
                name="workMode"
              >
                <option value="">All modes</option>
                {WORK_MODE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {formatCareerTokenLabel(option)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end gap-3">
              <button
                className="rounded-xl border border-slate-950 bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                type="submit"
              >
                Apply filters
              </button>
              <Link
                href="/admin/careers"
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
              >
                Reset
              </Link>
            </div>
          </form>

          {jobs.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
              <h2 className="text-lg font-semibold text-slate-950">
                No career postings found
              </h2>
              <p className="mt-2 text-sm text-slate-700">
                {query || status || employmentType || workMode
                  ? "Try changing the filters or search words."
                  : "Create a draft posting to start the careers workflow."}
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4 lg:hidden">
                {jobs.map((job) => (
                  <article
                    key={job.id}
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <CareerStatusBadge status={job.status} />
                      {job.employmentType ? (
                        <span className="inline-flex items-center rounded-full border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-900">
                          {formatCareerTokenLabel(job.employmentType)}
                        </span>
                      ) : null}
                      {job.workMode ? (
                        <span className="inline-flex items-center rounded-full border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-900">
                          {formatCareerTokenLabel(job.workMode)}
                        </span>
                      ) : null}
                    </div>

                    <h2 className="mt-4 text-lg font-semibold text-slate-950">
                      {job.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      {job.summary ?? "No summary added yet."}
                    </p>

                    <dl className="mt-4 space-y-2 text-sm text-slate-700">
                      <div>
                        <dt className="font-semibold text-slate-900">Location</dt>
                        <dd>{job.locationText ?? "Not set"}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-slate-900">Slug</dt>
                        <dd>{job.slug}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-slate-900">Updated</dt>
                        <dd>{formatTimestamp(job.updatedAt)}</dd>
                      </div>
                    </dl>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link
                        href={`/admin/careers/${job.id}/edit`}
                        className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                      >
                        {canManage ? "Edit" : "View"}
                      </Link>

                      {canPublishCareerPosting(viewer) && job.status !== "published" ? (
                        <form action={manageCareerPostingAction}>
                          <input name="intent" type="hidden" value="publish" />
                          <input name="jobId" type="hidden" value={job.id} />
                          <input name="redirectTo" type="hidden" value="/admin/careers" />
                          <button
                            className="rounded-xl border border-emerald-700 bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:ring-offset-2"
                            type="submit"
                          >
                            Publish
                          </button>
                        </form>
                      ) : null}

                      {canManage && job.status !== "archived" ? (
                        <form action={manageCareerPostingAction}>
                          <input name="intent" type="hidden" value="archive" />
                          <input name="jobId" type="hidden" value={job.id} />
                          <input name="redirectTo" type="hidden" value="/admin/careers" />
                          <button
                            className="rounded-xl border border-slate-400 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                            type="submit"
                          >
                            Archive
                          </button>
                        </form>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>

              <div className="hidden overflow-x-auto lg:block">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-700">
                        Role
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-700">
                        Location
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-700">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-700">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-700">
                        Updated
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {jobs.map((job) => (
                      <tr key={job.id} className="align-top hover:bg-slate-50">
                        <td className="px-4 py-4">
                          <div className="max-w-md">
                            <p className="font-semibold text-slate-950">{job.title}</p>
                            <p className="mt-1 text-sm leading-6 text-slate-700">
                              {job.summary ?? "No summary added yet."}
                            </p>
                            <p className="mt-2 text-xs text-slate-500">
                              Slug: {job.slug}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-700">
                          {job.locationText ?? "Not set"}
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-700">
                          <div className="flex flex-col gap-1">
                            <span>{formatCareerTokenLabel(job.employmentType)}</span>
                            <span>{formatCareerTokenLabel(job.workMode)}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <CareerStatusBadge status={job.status} />
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-700">
                          {formatTimestamp(job.updatedAt)}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-wrap justify-end gap-2">
                            <Link
                              href={`/admin/careers/${job.id}/edit`}
                              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                            >
                              {canManage ? "Edit" : "View"}
                            </Link>

                            {canPublishCareerPosting(viewer) && job.status !== "published" ? (
                              <form action={manageCareerPostingAction}>
                                <input name="intent" type="hidden" value="publish" />
                                <input name="jobId" type="hidden" value={job.id} />
                                <input name="redirectTo" type="hidden" value="/admin/careers" />
                                <button
                                  className="rounded-xl border border-emerald-700 bg-emerald-700 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:ring-offset-2"
                                  type="submit"
                                >
                                  Publish
                                </button>
                              </form>
                            ) : null}

                            {canManage && job.status !== "archived" ? (
                              <form action={manageCareerPostingAction}>
                                <input name="intent" type="hidden" value="archive" />
                                <input name="jobId" type="hidden" value={job.id} />
                                <input name="redirectTo" type="hidden" value="/admin/careers" />
                                <button
                                  className="rounded-xl border border-slate-400 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                                  type="submit"
                                >
                                  Archive
                                </button>
                              </form>
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
