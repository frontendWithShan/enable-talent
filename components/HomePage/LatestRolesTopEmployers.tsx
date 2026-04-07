"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FancyButtonNoIcon from "@/components/FancyButtonNoIcon";
import { ChevronLeft, ChevronRight } from "lucide-react";
import peopleIcons from "@/public/images/latest-roles-top-employers/3 people icons together.svg";
import googleIcon from "@/public/images/latest-roles-top-employers/google-icon.svg";
import accentureIcon from "@/public/images/latest-roles-top-employers/accenture-icon.svg";
import tdIcon from "@/public/images/latest-roles-top-employers/td-icon.svg";
import bellIcon from "@/public/images/latest-roles-top-employers/bell-icon.svg";
import shopifyIcon from "@/public/images/latest-roles-top-employers/shopify-icon.svg";
import rbcIcon from "@/public/images/latest-roles-top-employers/rbc-icon.svg";
import type { JobPosting } from "@/components/careers/types";

interface LatestRolesTopEmployersProps {
  initialJobPostings?: JobPosting[];
}

export default function LatestRolesTopEmployers({
  initialJobPostings = [],
}: LatestRolesTopEmployersProps) {
  const [activeTab, setActiveTab] = useState<"latest-roles" | "top-employers">(
    "latest-roles",
  );
  const [startIndex, setStartIndex] = useState(0);
  const latestRoles = useMemo(() => {
    const total = initialJobPostings.length;
    if (total === 0) return [];
    const visibleCount = Math.min(6, total);

    return Array.from({ length: visibleCount }, (_, index) => {
      const job = initialJobPostings[(startIndex + index) % total];
      return {
        id: job.id,
        title: job.title,
        salary: job.salaryRange,
        employer: job.employer,
        location: job.location,
      };
    });
  }, [initialJobPostings, startIndex]);
  const topEmployers = useMemo(
    () => [
      {
        company: "Google Inc.",
        location: "Toronto, ON",
        openings: "15 Current Job Openings",
        icon: googleIcon,
      },
      {
        company: "Accenture",
        location: "Toronto, ON",
        openings: "15 Current Job Openings",
        icon: accentureIcon,
      },
      {
        company: "TD",
        location: "Toronto, ON",
        openings: "15 Current Job Openings",
        icon: tdIcon,
      },
      {
        company: "Bell",
        location: "Toronto, ON",
        openings: "15 Current Job Openings",
        icon: bellIcon,
      },
      {
        company: "Shopify",
        location: "Toronto, ON",
        openings: "15 Current Job Openings",
        icon: shopifyIcon,
      },
      {
        company: "RBC",
        location: "Toronto, ON",
        openings: "15 Current Job Openings",
        icon: rbcIcon,
      },
    ],
    [],
  );
  const isLatestRoles = activeTab === "latest-roles";
  const hasLoaded = true;
  const hasLatestRoles = initialJobPostings.length > 0;
  const showLatestRolesSkeleton = false;
  const formatSalaryDisplay = (salary: string) =>
    salary.replace(/\b\d{4,}(?:\.\d+)?\b/g, (value) => {
      const parsed = Number(value);
      if (!Number.isFinite(parsed)) return value;
      return parsed.toLocaleString("en-CA");
    });

  const handlePrev = () => {
    if (!isLatestRoles || !hasLatestRoles) return;
    setStartIndex((prev) => {
      const total = initialJobPostings.length;
      return (prev - 6 + total) % total;
    });
  };

  const handleNext = () => {
    if (!isLatestRoles || !hasLatestRoles) return;
    setStartIndex((prev) => {
      const total = initialJobPostings.length;
      return (prev + 6) % total;
    });
  };

  return (
    <section
      aria-labelledby="latest-roles-heading"
      className="bg-white py-10 sm:py-12 lg:py-14"
      suppressHydrationWarning
    >
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        {/* Semantic section heading for screen readers; kept visually hidden to preserve design. */}
        <h2 id="latest-roles-heading" className="sr-only">
          Latest roles and top employers
        </h2>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white p-1 shadow-sm">
            <button
              type="button"
              aria-pressed={isLatestRoles}
              className="group inline-block"
              onClick={() => setActiveTab("latest-roles")}
            >
              <FancyButtonNoIcon
                label="Latest Roles"
                color="orange"
                borderRadius="full"
                className={
                  isLatestRoles
                    ? "px-5 py-2 text-xs sm:text-sm shadow-[0_6px_16px_rgba(0,0,0,0.15)] ring-2 ring-slate-900 ring-offset-1"
                    : "bg-white px-5 py-2 text-xs text-slate-900 shadow-none sm:text-sm from-white to-white"
                }
              />
            </button>

            <button
              type="button"
              aria-pressed={!isLatestRoles}
              className="group inline-block"
              onClick={() => setActiveTab("top-employers")}
            >
              <FancyButtonNoIcon
                label="Top Employers"
                color="orange"
                borderRadius="full"
                className={
                  isLatestRoles
                    ? "bg-white px-5 py-2 text-xs text-slate-900 shadow-none sm:text-sm from-white to-white"
                    : "px-5 py-2 text-xs sm:text-sm shadow-[0_6px_16px_rgba(0,0,0,0.15)] ring-2 ring-slate-900 ring-offset-1"
                }
              />
            </button>
          </div>

          <div className="flex items-center gap-2 mr-2">
            <button
              type="button"
              aria-label="Previous roles"
              onClick={handlePrev}
              disabled={!hasLoaded || !hasLatestRoles}
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-slate-100 disabled:hover:text-slate-600"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              aria-label="Next roles"
              onClick={handleNext}
              disabled={!hasLoaded || !hasLatestRoles}
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-slate-100 disabled:hover:text-slate-600"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-busy={showLatestRolesSkeleton}>
          {showLatestRolesSkeleton
            ? Array.from({ length: 6 }).map((_, index) => (
                <article
                  key={`latest-roles-skeleton-${index}`}
                  aria-hidden="true"
                  className="flex min-h-[220px] flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)]"
                >
                  <div className="h-6 w-4/5 rounded-md bg-slate-200/80 animate-pulse" />
                  <div className="mt-3 h-4 w-1/2 rounded-md bg-slate-200/70 animate-pulse" />
                  <div className="mt-2 h-4 w-2/5 rounded-md bg-slate-200/60 animate-pulse" />
                  <div className="mt-2 h-4 w-1/3 rounded-md bg-slate-200/60 animate-pulse" />

                  <div className="mt-auto">
                    <div className="my-6 h-px w-full bg-slate-100/80" />
                    <div className="flex items-center justify-between gap-3">
                      <div className="h-7 w-[72px] rounded-full bg-slate-200/70 animate-pulse" />
                      <div className="h-4 w-20 rounded-md bg-slate-200/70 animate-pulse" />
                    </div>
                  </div>
                </article>
              ))
            : isLatestRoles
            ? hasLatestRoles
              ? latestRoles.map((role) => (
                <article
                  key={role.id}
                  className="flex min-h-[220px] flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
                >
                  <h3 className="text-lg font-bold text-slate-800">
                    {role.title}
                  </h3>
                  {role.employer && (
                    <p className="mt-1 text-sm font-semibold text-slate-600">
                      {role.employer}
                    </p>
                  )}
                  {role.location && (
                    <p className="mt-0.5 text-sm font-medium text-slate-400">
                      {role.location}
                    </p>
                  )}
                  {role.salary && (
                    <p className="mt-1 text-sm font-medium text-slate-400">
                      {formatSalaryDisplay(role.salary)}
                    </p>
                  )}

                  <div className="mt-auto">
                    <div className="my-6 h-px w-full bg-slate-100/80" />

                    <div className="flex items-center justify-between gap-3">
                      <Image
                        src={peopleIcons}
                        alt="Recently hired candidates"
                        width={72}
                        height={28}
                        className="h-7 w-auto select-none opacity-90"
                        draggable={false}
                      />
                      <Link
                        href="https://app.enabledtalent.com/login-talent"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whitespace-nowrap text-sm font-bold text-[#8C4A0E] transition hover:text-[#6F390B]"
                      >
                        View details
                      </Link>
                    </div>
                  </div>
                </article>
                ))
              : (
                <article className="flex min-h-[220px] flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)] md:col-span-2 lg:col-span-3">
                  <h3 className="text-lg font-bold text-slate-800">
                    No live roles yet
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                    Published roles from the careers CMS will appear here automatically. Check the
                    public careers page for future openings.
                  </p>
                  <div className="mt-6">
                    <Link
                      href="/careers"
                      className="inline-flex items-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      View careers
                    </Link>
                  </div>
                </article>
              )
            : topEmployers.map((employer) => (
                <article
                  key={employer.company}
                  className="flex min-h-[220px] flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={employer.icon}
                      alt={`${employer.company} logo`}
                      width={44}
                      height={44}
                      className="h-11 w-11 shrink-0"
                      draggable={false}
                    />
                    <h3 className="text-lg font-bold text-slate-800">
                      {employer.company}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm font-medium text-slate-700">
                    {employer.location}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-400">
                    {employer.openings}
                  </p>

                  <div className="mt-auto">
                    <div className="my-6 h-px w-full bg-slate-100/80" />

                    <div className="flex items-center justify-between gap-3">
                      <span
                        aria-hidden="true"
                        className="text-xs text-transparent"
                      >
                        Spacer
                      </span>
                      <Link
                        href="https://app.enabledtalent.com/login-talent"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whitespace-nowrap text-sm font-bold text-[#8C4A0E] transition hover:text-[#6F390B]"
                      >
                        See more
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
        </div>
      </div>
    </section>
  );
}
