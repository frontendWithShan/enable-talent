"use client";

import { useState } from "react";
import Link from "next/link";

import Container from "@/components/layout/Container";
import { formatCareerTokenLabel } from "@/lib/careers/options";

import type { JobPosting } from "./types";

type CareersListingsSectionProps = {
  jobPostings: JobPosting[];
};

function formatPostedDate(value?: string | { seconds?: number } | number) {
  if (!value) {
    return "Recently posted";
  }

  const date =
    typeof value === "number"
      ? new Date(value)
      : typeof value === "string"
        ? new Date(value)
        : new Date((value.seconds ?? 0) * 1000);

  return date.toLocaleDateString("en-CA", {
    dateStyle: "medium",
  });
}

function truncateText(text?: string, maxLength = 280) {
  if (!text) {
    return "";
  }

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trim()}...`;
}

export default function CareersListingsSection({
  jobPostings,
}: CareersListingsSectionProps) {
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [hoveredJobId, setHoveredJobId] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    text: string;
    type: "error" | "success" | "";
  }>({
    text: "",
    type: "",
  });

  async function handleShareJob(job: JobPosting) {
    const slug = job.slug ?? job.id;
    const jobUrl = `${window.location.origin}/careers/${slug}`;

    try {
      if (navigator.share) {
        await navigator.share({
          text: `Check out this role at EnabledTalent: ${job.title}`,
          title: job.title,
          url: jobUrl,
        });
        return;
      }

      await navigator.clipboard.writeText(jobUrl);
      setMessage({
        text: "The job link has been copied to your clipboard.",
        type: "success",
      });
      window.setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 3000);
    } catch {
      setMessage({
        text: "We could not share this job right now. You can copy the page address from your browser.",
        type: "error",
      });
    }
  }

  return (
    <Container>
      <section className="py-20 md:py-24">
        {message.text ? (
          <div
            aria-live={message.type === "success" ? "polite" : "assertive"}
            className={`mb-8 rounded-lg border p-4 ${
              message.type === "success"
                ? "border-green-200 bg-green-50 text-green-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
            role={message.type === "success" ? "status" : "alert"}
          >
            {message.text}
          </div>
        ) : null}

        {jobPostings.length === 0 ? (
          <div className="rounded-lg bg-white py-16 text-center shadow-sm">
            <svg
              aria-hidden="true"
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V6a2 2 0 012 2v6.14l-2.403-.816a6.056 6.056 0 01-1.112-.362 13.96 13.96 0 01-.475-.148z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            <h2 className="mt-2 text-xl font-medium text-gray-900">
              No open roles right now
            </h2>
            <p className="mt-1 text-gray-500">
              We do not have any published positions at the moment.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              Please check back later for future opportunities.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {jobPostings.map((job) => {
              const detailHref = `/careers/${job.slug ?? job.id}`;
              const isExpanded = expandedJobId === job.id;
              const isHovered = hoveredJobId === job.id;

              return (
                <article
                  className={`overflow-hidden rounded-xl border bg-white transition-all duration-300 ${
                    isHovered
                      ? "border-blue-200 shadow-lg"
                      : "hover:border-gray-300 hover:shadow-md"
                  }`}
                  key={job.id}
                  onMouseEnter={() => setHoveredJobId(job.id)}
                  onMouseLeave={() => setHoveredJobId(null)}
                >
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
                      <div className="min-w-0 flex-1">
                        <div className="mb-4 flex items-start justify-between">
                          <div className="flex-1">
                            <h2 className="mb-2 text-xl font-bold text-gray-900 md:text-2xl">
                              <Link
                                className="rounded-sm focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                                href={detailHref}
                              >
                                {job.title}
                              </Link>
                            </h2>
                            <div className="mb-2 flex flex-wrap items-center gap-3">
                              <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                                Open role
                              </span>
                              {job.workMode ? (
                                <span className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-900">
                                  {formatCareerTokenLabel(job.workMode)}
                                </span>
                              ) : null}
                              <button
                                className="inline-flex cursor-pointer items-center rounded-full bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] px-3 py-1 text-[11px] font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
                                onClick={() => void handleShareJob(job)}
                                type="button"
                              >
                                <svg
                                  aria-hidden="true"
                                  className="mr-1 h-3 w-3"
                                  fill="none"
                                  stroke="white"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                  />
                                </svg>
                                Share
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <svg
                              aria-hidden="true"
                              className="mr-2 h-4 w-4 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                              />
                              <path
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                              />
                            </svg>
                            <span className="font-medium">
                              {job.location ?? "Location will be shared during hiring"}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <svg
                              aria-hidden="true"
                              className="mr-2 h-4 w-4 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                              />
                            </svg>
                            <span className="font-medium capitalize">
                              {job.jobType ? formatCareerTokenLabel(job.jobType) : "Not set"}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <svg
                              aria-hidden="true"
                              className="mr-2 h-4 w-4 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                              />
                            </svg>
                            <span className="font-medium capitalize">
                              {job.experienceLevel
                                ? formatCareerTokenLabel(job.experienceLevel)
                                : "Experience level not set"}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <svg
                              aria-hidden="true"
                              className="mr-2 h-4 w-4 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8 7V3a4 4 0 118 0v4m-4 12v-6m0 0V7m0 6h.01M12 17h.01"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                              />
                            </svg>
                            <span className="text-gray-500">
                              {formatPostedDate(job.publishedAt ?? job.createdAt)}
                            </span>
                          </div>
                        </div>

                        {job.salaryRange ? (
                          <div className="mb-6">
                            <div className="inline-flex items-center rounded-lg border border-green-200 bg-green-50 px-4 py-2">
                              <svg
                                aria-hidden="true"
                                className="mr-2 h-5 w-5 text-green-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                />
                              </svg>
                              <span className="font-semibold text-green-700">
                                {job.salaryRange}
                              </span>
                            </div>
                          </div>
                        ) : null}

                        {!isExpanded ? (
                          <div className="mb-2">
                            <p className="text-gray-700 leading-relaxed">
                              {truncateText(job.summary ?? job.description, 300)}
                            </p>
                            {job.description && job.description.length > 200 ? (
                              <button
                                className="mt-2 inline-flex items-start text-sm font-medium text-blue-600 transition-colors hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
                                onClick={() =>
                                  setExpandedJobId((currentValue) =>
                                    currentValue === job.id ? null : job.id,
                                  )
                                }
                                type="button"
                              >
                                Read more
                                <svg
                                  aria-hidden="true"
                                  className="ml-1 h-4 w-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    d="M19 9l-7 7-7-7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                  />
                                </svg>
                              </button>
                            ) : null}
                          </div>
                        ) : null}

                        {isHovered && !isExpanded ? (
                          <div className="mt-6 border-t border-gray-200 pt-6">
                            <h3 className="mb-4 text-sm font-semibold text-gray-900">
                              Quick details
                            </h3>
                            <div className="rounded-lg p-4">
                              <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                                <div className="flex items-center justify-between border-b border-gray-200 py-2">
                                  <span className="font-bold text-black">
                                    Position type:
                                  </span>
                                  <span className="font-semibold text-gray-600">
                                    {job.jobType
                                      ? formatCareerTokenLabel(job.jobType)
                                      : "Not set"}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between border-b border-gray-200 py-2 md:ml-24">
                                  <span className="font-bold text-black">
                                    Work mode:
                                  </span>
                                  <span className="font-semibold text-gray-600">
                                    {job.workMode
                                      ? formatCareerTokenLabel(job.workMode)
                                      : "Not set"}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between border-b border-gray-200 py-2">
                                  <span className="font-bold text-black">
                                    Experience:
                                  </span>
                                  <span className="font-semibold text-gray-600">
                                    {job.experienceLevel
                                      ? formatCareerTokenLabel(job.experienceLevel)
                                      : "Not set"}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between border-b border-gray-200 py-2 md:ml-24">
                                  <span className="font-bold text-black">
                                    Location:
                                  </span>
                                  <span className="font-semibold text-gray-600">
                                    {job.location ?? "Not set"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>

                      <div className="flex flex-shrink-0 flex-col gap-3 lg:w-52">
                        <Link
                          className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#183457] to-[#0D3541] px-6 py-3 text-base font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                          href={detailHref}
                        >
                          <svg
                            aria-hidden="true"
                            className="mr-2 h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                            />
                            <path
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                            />
                          </svg>
                          View role
                        </Link>
                        <button
                          aria-expanded={isExpanded}
                          className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-[#183457] to-[#0D3541] px-6 py-3 text-base font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                          onClick={() =>
                            setExpandedJobId((currentValue) =>
                              currentValue === job.id ? null : job.id,
                            )
                          }
                          type="button"
                        >
                          <svg
                            aria-hidden="true"
                            className={`mr-2 h-5 w-5 transition-transform duration-300 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M19 9l-7 7-7-7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                            />
                          </svg>
                          {isExpanded ? "Show less" : "Preview"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {isExpanded ? (
                    <div className="border-t border-gray-100 bg-gray-50">
                      <div className="p-6 md:p-8">
                        <div className="max-w-none">
                          <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900">
                              Role preview
                            </h3>
                            <span className="text-sm text-gray-500">
                              Role ID: {job.id}
                            </span>
                          </div>

                          <div className="prose prose-gray max-w-none">
                            <div className="rounded-lg border bg-white p-6 text-gray-700 leading-relaxed whitespace-pre-wrap">
                              {job.description}
                            </div>
                          </div>

                          <div className="mt-8 border-t border-gray-200 pt-6">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                              <div className="space-y-1 text-sm text-gray-600">
                                <p>
                                  <span className="font-medium">Posted:</span>{" "}
                                  {formatPostedDate(job.publishedAt ?? job.createdAt)}
                                </p>
                                {job.salaryRange ? (
                                  <p>
                                    <span className="font-medium">Salary:</span>{" "}
                                    <span className="font-semibold text-green-600">
                                      {job.salaryRange}
                                    </span>
                                  </p>
                                ) : null}
                              </div>
                              <Link
                                className="inline-flex items-center rounded-full bg-gradient-to-r from-[#FFD071] to-[#EFB745] px-8 py-3 text-base font-bold text-black shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#EFB745] focus:ring-offset-2"
                                href={detailHref}
                              >
                                View details and apply
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </Container>
  );
}
