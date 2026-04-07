import "server-only";

import type { JobRecord } from "@/lib/data/types";

import { extractCareerDescriptionText } from "./content";
import { formatCareerTokenLabel } from "./options";

function formatCurrencyAmount(value: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-CA", {
      currency,
      maximumFractionDigits: 0,
      style: "currency",
    }).format(value);
  } catch {
    return `${currency} ${value.toLocaleString("en-CA")}`;
  }
}

export function formatPublicCareerSalary(job: JobRecord) {
  const { salaryCurrency, salaryMax, salaryMin, salaryPeriod } = job;

  if (salaryMin === null && salaryMax === null) {
    return null;
  }

  const currency = salaryCurrency ?? "CAD";
  const period = salaryPeriod ? ` / ${formatCareerTokenLabel(salaryPeriod).toLowerCase()}` : "";

  if (salaryMin !== null && salaryMax !== null) {
    if (salaryMin === salaryMax) {
      return `${formatCurrencyAmount(salaryMin, currency)}${period}`;
    }

    return `${formatCurrencyAmount(salaryMin, currency)} - ${formatCurrencyAmount(salaryMax, currency)}${period}`;
  }

  if (salaryMin !== null) {
    return `${formatCurrencyAmount(salaryMin, currency)}+${period}`;
  }

  return `Up to ${formatCurrencyAmount(salaryMax as number, currency)}${period}`;
}

export function mapJobRecordToPublicPosting(job: JobRecord) {
  return {
    applicationDeadline: job.applicationDeadline,
    createdAt: job.createdAt,
    description: extractCareerDescriptionText(job.descriptionHtml),
    descriptionHtml: job.descriptionHtml,
    employer: "EnabledTalent",
    experienceLevel: job.experienceLevel,
    id: job.id,
    isFeatured: job.isFeatured,
    jobType: job.employmentType,
    location: job.locationText,
    publishedAt: job.publishedAt,
    salaryRange: formatPublicCareerSalary(job),
    slug: job.slug,
    summary: job.summary,
    title: job.title,
    workMode: job.workMode,
  };
}
