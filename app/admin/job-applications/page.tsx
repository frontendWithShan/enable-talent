import Link from "next/link";

import { requireAdminAccess } from "@/lib/auth/admin";
import { getAdminHomePath } from "@/lib/auth/roles";
import {
  APPLICATION_STATUS_OPTIONS,
  formatCareerTokenLabel,
} from "@/lib/careers/options";
import { listJobApplications } from "@/lib/data/applications";
import { listJobsForAdmin } from "@/lib/data/jobs";
import type { ApplicationStatus } from "@/lib/data/types";

import {
  deleteJobApplicationAction,
  updateJobApplicationStatusAction,
} from "./actions";

type JobApplicationsAdminPageProps = {
  searchParams?: Promise<{
    jobId?: string;
    kind?: string;
    notice?: string;
    status?: string;
  }>;
};

function formatTimestamp(value: string | null | undefined) {
  if (!value) {
    return "Not set";
  }

  return new Date(value).toLocaleString("en-CA", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function getSafeStatusFilter(value: string | undefined) {
  return value && APPLICATION_STATUS_OPTIONS.includes(value as ApplicationStatus)
    ? (value as ApplicationStatus)
    : undefined;
}

function buildStatusTone(status: ApplicationStatus) {
  switch (status) {
    case "accepted":
    case "hired":
      return "border-emerald-300 bg-emerald-50 text-emerald-950";
    case "reviewed":
      return "border-blue-300 bg-blue-50 text-blue-950";
    case "shortlisted":
      return "border-purple-300 bg-purple-50 text-purple-950";
    case "rejected":
      return "border-red-300 bg-red-50 text-red-950";
    case "pending":
    default:
      return "border-amber-300 bg-amber-50 text-amber-950";
  }
}

export default async function JobApplicationsAdminPage({
  searchParams,
}: JobApplicationsAdminPageProps) {
  const viewer = await requireAdminAccess("/admin/job-applications");
  const resolvedSearchParams = (await searchParams) ?? {};
  const statusFilter = getSafeStatusFilter(resolvedSearchParams.status);
  const jobs = await listJobsForAdmin();
  const applications = await listJobApplications();
  const jobIdFilter =
    resolvedSearchParams.jobId &&
    jobs.some((job) => job.id === resolvedSearchParams.jobId)
      ? resolvedSearchParams.jobId
      : undefined;
  const filteredApplications = applications.filter((application) => {
    if (statusFilter && application.status !== statusFilter) {
      return false;
    }

    if (jobIdFilter && application.jobId !== jobIdFilter) {
      return false;
    }

    return true;
  });
  const jobTitleById = new Map(jobs.map((job) => [job.id, job.title]));
  const homePath = getAdminHomePath(viewer.role);
  const redirectSearchParams = new URLSearchParams();

  if (jobIdFilter) {
    redirectSearchParams.set("jobId", jobIdFilter);
  }

  if (statusFilter) {
    redirectSearchParams.set("status", statusFilter);
  }

  const redirectTo = redirectSearchParams.toString()
    ? `/admin/job-applications?${redirectSearchParams.toString()}`
    : "/admin/job-applications";

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-6 border-b border-slate-200 px-6 py-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
              Job applications
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700">
              Review incoming applications, update their status, and open stored resumes through the private storage flow.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
              href={homePath}
            >
              Back to dashboard
            </Link>
            <Link
              className="rounded-xl border border-slate-950 bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
              href="/admin/careers"
            >
              View careers CMS
            </Link>
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

          <form className="grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_1fr_auto]">
            <div>
              <label
                className="block text-sm font-semibold text-slate-900"
                htmlFor="jobId"
              >
                Job
              </label>
              <select
                className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
                defaultValue={jobIdFilter ?? ""}
                id="jobId"
                name="jobId"
              >
                <option value="">All jobs</option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-semibold text-slate-900"
                htmlFor="status"
              >
                Status
              </label>
              <select
                className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
                defaultValue={statusFilter ?? ""}
                id="status"
                name="status"
              >
                <option value="">All statuses</option>
                {APPLICATION_STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {formatCareerTokenLabel(status)}
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
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                href="/admin/job-applications"
              >
                Reset
              </Link>
            </div>
          </form>

          <p className="text-sm text-slate-700">
            Showing <span className="font-semibold">{filteredApplications.length}</span>{" "}
            application{filteredApplications.length === 1 ? "" : "s"}.
          </p>

          {filteredApplications.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
              <h2 className="text-lg font-semibold text-slate-950">
                No applications found
              </h2>
              <p className="mt-2 text-sm text-slate-700">
                Try changing the filters or wait for new applications to arrive.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredApplications.map((application) => {
                const jobTitle =
                  jobTitleById.get(application.jobId) ?? "Unknown role";

                return (
                  <article
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                    key={application.id}
                  >
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0 flex-1 space-y-5">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <h2 className="text-xl font-semibold text-slate-950">
                              {application.fullName}
                            </h2>
                            <p className="mt-1 text-sm font-medium text-slate-700">
                              {jobTitle}
                            </p>
                          </div>
                          <span
                            className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold ${buildStatusTone(
                              application.status,
                            )}`}
                          >
                            {formatCareerTokenLabel(application.status)}
                          </span>
                        </div>

                        <dl className="grid gap-4 text-sm text-slate-700 md:grid-cols-2">
                          <div>
                            <dt className="font-semibold text-slate-900">Email</dt>
                            <dd className="mt-1 break-all">{application.email}</dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-slate-900">Phone</dt>
                            <dd className="mt-1">
                              {application.phone ?? "Not provided"}
                            </dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-slate-900">Submitted</dt>
                            <dd className="mt-1">
                              {formatTimestamp(application.createdAt)}
                            </dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-slate-900">Reviewed</dt>
                            <dd className="mt-1">
                              {formatTimestamp(application.reviewedAt)}
                            </dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-slate-900">LinkedIn</dt>
                            <dd className="mt-1 break-all">
                              {application.linkedinUrl ? (
                                <a
                                  className="font-medium text-blue-700 underline underline-offset-2 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
                                  href={application.linkedinUrl}
                                  rel="noreferrer"
                                  target="_blank"
                                >
                                  Open LinkedIn profile
                                </a>
                              ) : (
                                "Not provided"
                              )}
                            </dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-slate-900">Portfolio</dt>
                            <dd className="mt-1 break-all">
                              {application.portfolioUrl ? (
                                <a
                                  className="font-medium text-blue-700 underline underline-offset-2 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
                                  href={application.portfolioUrl}
                                  rel="noreferrer"
                                  target="_blank"
                                >
                                  Open portfolio
                                </a>
                              ) : (
                                "Not provided"
                              )}
                            </dd>
                          </div>
                        </dl>

                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                          <h3 className="text-sm font-semibold text-slate-900">
                            Cover letter
                          </h3>
                          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                            {application.coverLetter ?? "No cover letter provided."}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          {application.resumePath ? (
                            <a
                              className="inline-flex items-center rounded-xl border border-slate-950 bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                              href={`/api/admin/job-applications/${application.id}/resume`}
                              rel="noreferrer"
                              target="_blank"
                            >
                              Open stored resume
                            </a>
                          ) : (
                            <span className="inline-flex items-center rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
                              No resume uploaded
                            </span>
                          )}
                          <span className="text-sm text-slate-600">
                            Source: {formatCareerTokenLabel(application.source)}
                          </span>
                        </div>
                      </div>

                      <div className="w-full space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4 lg:w-80">
                        <h3 className="text-sm font-semibold text-slate-950">
                          Review actions
                        </h3>

                        <form
                          action={updateJobApplicationStatusAction}
                          className="space-y-3"
                        >
                          <input
                            name="applicationId"
                            type="hidden"
                            value={application.id}
                          />
                          <input
                            name="redirectTo"
                            type="hidden"
                            value={redirectTo}
                          />
                          <div>
                            <label
                              className="block text-sm font-semibold text-slate-900"
                              htmlFor={`status-${application.id}`}
                            >
                              Status
                            </label>
                            <select
                              className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
                              defaultValue={application.status}
                              id={`status-${application.id}`}
                              name="status"
                            >
                              {APPLICATION_STATUS_OPTIONS.map((status) => (
                                <option key={status} value={status}>
                                  {formatCareerTokenLabel(status)}
                                </option>
                              ))}
                            </select>
                          </div>

                          <button
                            className="w-full rounded-xl border border-slate-950 bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                            type="submit"
                          >
                            Save status
                          </button>
                        </form>

                        <form
                          action={deleteJobApplicationAction}
                          className="pt-2"
                        >
                          <input
                            name="applicationId"
                            type="hidden"
                            value={application.id}
                          />
                          <input
                            name="redirectTo"
                            type="hidden"
                            value={redirectTo}
                          />
                          <button
                            className="w-full rounded-xl border border-red-300 bg-white px-4 py-3 text-sm font-semibold text-red-800 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
                            type="submit"
                          >
                            Delete application
                          </button>
                        </form>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
