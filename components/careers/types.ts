export type JobPosting = {
  id: string;
  slug?: string;
  title: string;
  summary?: string | null;
  location?: string | null;
  jobType?: string | null;
  workMode?: string | null;
  experienceLevel?: string | null;
  createdAt?: string | { seconds?: number } | number;
  publishedAt?: string | null;
  description?: string;
  descriptionHtml?: string | null;
  salaryRange?: string | null;
  applicationDeadline?: string | null;
  applicationsCount?: number;
  employer?: string | null;
  isFeatured?: boolean;
};

export type ApplicationData = {
  fullName: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  portfolioUrl: string;
  coverLetter: string;
  resumeUrl?: string;
  resumeFile?: File | null;
  resumeFileName?: string;
  jobId: string;
  jobSlug?: string;
  jobTitle: string;
};
