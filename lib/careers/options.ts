import type {
  ApplicationStatus,
  EmploymentType,
  JobStatus,
  WorkMode,
} from "@/lib/data/types";

export const CAREER_STATUS_OPTIONS = [
  "draft",
  "published",
  "archived",
] as const satisfies readonly JobStatus[];

export const EMPLOYMENT_TYPE_OPTIONS = [
  "full_time",
  "part_time",
  "contract",
  "internship",
  "temporary",
  "freelance",
] as const satisfies readonly EmploymentType[];

export const WORK_MODE_OPTIONS = [
  "onsite",
  "hybrid",
  "remote",
] as const satisfies readonly WorkMode[];

export const EXPERIENCE_LEVEL_OPTIONS = [
  "entry-level",
  "mid-level",
  "senior-level",
  "executive",
] as const;

export const APPLICATION_STATUS_OPTIONS = [
  "pending",
  "reviewed",
  "shortlisted",
  "accepted",
  "rejected",
  "hired",
] as const satisfies readonly ApplicationStatus[];

export function formatCareerTokenLabel(value: string | null | undefined) {
  if (!value) {
    return "Not set";
  }

  return value
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}
