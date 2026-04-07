export type JsonValue =
  | boolean
  | number
  | string
  | null
  | { [key: string]: JsonValue }
  | JsonValue[];

export type ContentType = "blog";
export type ContentSourceType = "internal_article" | "external_link";
export type ContentStatus = "draft" | "scheduled" | "published" | "archived";
export type AudienceType =
  | "all"
  | "employers"
  | "talent"
  | "educators"
  | "ngo"
  | "government";
export type RegionCode =
  | "global"
  | "canada"
  | "africa"
  | "united_states"
  | "spain"
  | "saudi_arabia"
  | "qatar";
export type EmploymentType =
  | "full_time"
  | "part_time"
  | "contract"
  | "internship"
  | "temporary"
  | "freelance";
export type WorkMode = "onsite" | "hybrid" | "remote";
export type SalaryPeriod = "hour" | "month" | "year";
export type JobStatus = "draft" | "published" | "archived";
export type ApplicationStatus =
  | "pending"
  | "reviewed"
  | "shortlisted"
  | "accepted"
  | "rejected"
  | "hired";
export type VolunteerStatus = "pending" | "reviewed" | "accepted" | "rejected";
export type InquiryStatus =
  | "new"
  | "pending"
  | "in_progress"
  | "scheduled"
  | "contacted"
  | "resolved"
  | "completed"
  | "closed"
  | "cancelled";
export type MediaKind = "blog_image" | "resume";

export type PostRecord = {
  authorName: string | null;
  audience: AudienceType;
  bodyHtml: string | null;
  bodyJson: JsonValue | null;
  canonicalUrl: string | null;
  coverImageAlt: string | null;
  coverImageUrl: string | null;
  createdAt: string;
  createdBy: string | null;
  externalUrl: string | null;
  id: string;
  isFeatured: boolean;
  publishedAt: string | null;
  readingTimeMinutes: number | null;
  region: RegionCode;
  scheduledFor: string | null;
  seoDescription: string | null;
  seoTitle: string | null;
  slug: string;
  sourceType: ContentSourceType;
  status: ContentStatus;
  summary: string;
  title: string;
  type: ContentType;
  updatedAt: string;
  updatedBy: string | null;
};

export type CreatePostInput = {
  authorName?: string | null;
  audience?: AudienceType;
  bodyHtml?: string | null;
  bodyJson?: JsonValue | null;
  canonicalUrl?: string | null;
  coverImageAlt?: string | null;
  coverImageUrl?: string | null;
  createdBy?: string | null;
  externalUrl?: string | null;
  isFeatured?: boolean;
  publishedAt?: string | null;
  readingTimeMinutes?: number | null;
  region?: RegionCode;
  scheduledFor?: string | null;
  seoDescription?: string | null;
  seoTitle?: string | null;
  slug: string;
  sourceType?: ContentSourceType;
  status?: ContentStatus;
  summary: string;
  title: string;
  type?: ContentType;
  updatedBy?: string | null;
};

export type UpdatePostInput = Partial<CreatePostInput>;

export type JobRecord = {
  applicationDeadline: string | null;
  createdAt: string;
  createdBy: string | null;
  descriptionHtml: string | null;
  employmentType: EmploymentType | null;
  experienceLevel: string | null;
  id: string;
  isActive: boolean;
  isFeatured: boolean;
  locationText: string | null;
  publishedAt: string | null;
  salaryCurrency: string | null;
  salaryMax: number | null;
  salaryMin: number | null;
  salaryPeriod: SalaryPeriod | null;
  slug: string;
  status: JobStatus;
  summary: string | null;
  title: string;
  updatedAt: string;
  updatedBy: string | null;
  workMode: WorkMode | null;
};

export type CreateJobInput = {
  applicationDeadline?: string | null;
  createdBy?: string | null;
  descriptionHtml?: string | null;
  employmentType?: EmploymentType | null;
  experienceLevel?: string | null;
  isActive?: boolean;
  isFeatured?: boolean;
  locationText?: string | null;
  publishedAt?: string | null;
  salaryCurrency?: string | null;
  salaryMax?: number | null;
  salaryMin?: number | null;
  salaryPeriod?: SalaryPeriod | null;
  slug: string;
  status?: JobStatus;
  summary?: string | null;
  title: string;
  updatedBy?: string | null;
  workMode?: WorkMode | null;
};

export type UpdateJobInput = Partial<CreateJobInput>;

export type JobApplicationRecord = {
  coverLetter: string | null;
  createdAt: string;
  email: string;
  fullName: string;
  id: string;
  internalNotes: string | null;
  jobId: string;
  linkedinUrl: string | null;
  phone: string | null;
  portfolioUrl: string | null;
  resumePath: string | null;
  reviewedAt: string | null;
  reviewedBy: string | null;
  source: string;
  status: ApplicationStatus;
  updatedAt: string;
};

export type CreateJobApplicationInput = {
  coverLetter?: string | null;
  email: string;
  fullName: string;
  internalNotes?: string | null;
  jobId: string;
  linkedinUrl?: string | null;
  phone?: string | null;
  portfolioUrl?: string | null;
  resumePath?: string | null;
  reviewedAt?: string | null;
  reviewedBy?: string | null;
  source?: string;
  status?: ApplicationStatus;
};

export type UpdateJobApplicationInput = Partial<CreateJobApplicationInput>;

export type VolunteerApplicationRecord = {
  availability: string | null;
  createdAt: string;
  email: string;
  experience: string | null;
  fullName: string;
  id: string;
  internalNotes: string | null;
  linkedinProfile: string | null;
  motivation: string | null;
  phone: string | null;
  portfolioWebsite: string | null;
  resumePath: string | null;
  reviewedAt: string | null;
  reviewedBy: string | null;
  skills: string | null;
  source: string;
  status: VolunteerStatus;
  updatedAt: string;
};

export type CreateVolunteerApplicationInput = {
  availability?: string | null;
  email: string;
  experience?: string | null;
  fullName: string;
  internalNotes?: string | null;
  linkedinProfile?: string | null;
  motivation?: string | null;
  phone?: string | null;
  portfolioWebsite?: string | null;
  resumePath?: string | null;
  reviewedAt?: string | null;
  reviewedBy?: string | null;
  skills?: string | null;
  source?: string;
  status?: VolunteerStatus;
};

export type UpdateVolunteerApplicationInput = Partial<CreateVolunteerApplicationInput>;

export type NewsletterSubscriptionRecord = {
  email: string;
  id: string;
  isActive: boolean;
  source: string;
  subscribedAt: string;
  updatedAt: string;
};

export type CreateNewsletterSubscriptionInput = {
  email: string;
  isActive?: boolean;
  source?: string;
};

export type UpdateNewsletterSubscriptionInput = {
  email?: string;
  isActive?: boolean;
  source?: string;
};

export type ContactSubmissionRecord = {
  assignedTo: string | null;
  company: string | null;
  createdAt: string;
  email: string;
  fullName: string;
  id: string;
  inquiryType: string | null;
  internalNotes: string | null;
  message: string;
  phone: string | null;
  resolvedAt: string | null;
  source: string;
  status: InquiryStatus;
  subject: string | null;
  updatedAt: string;
};

export type CreateContactSubmissionInput = {
  assignedTo?: string | null;
  company?: string | null;
  email: string;
  fullName: string;
  inquiryType?: string | null;
  internalNotes?: string | null;
  message: string;
  phone?: string | null;
  resolvedAt?: string | null;
  source?: string;
  status?: InquiryStatus;
  subject?: string | null;
};

export type UpdateContactSubmissionInput = Partial<CreateContactSubmissionInput>;

export type DemoRequestRecord = {
  assignedTo: string | null;
  companyName: string | null;
  createdAt: string;
  email: string;
  fullName: string;
  id: string;
  internalNotes: string | null;
  message: string;
  phone: string | null;
  scheduledFor: string | null;
  source: string;
  status: InquiryStatus;
  updatedAt: string;
};

export type CreateDemoRequestInput = {
  assignedTo?: string | null;
  companyName?: string | null;
  email: string;
  fullName: string;
  internalNotes?: string | null;
  message: string;
  phone?: string | null;
  scheduledFor?: string | null;
  source?: string;
  status?: InquiryStatus;
};

export type UpdateDemoRequestInput = Partial<CreateDemoRequestInput>;

export type ConsultationRequestRecord = {
  assignedTo: string | null;
  companyName: string | null;
  createdAt: string;
  email: string;
  fullName: string;
  id: string;
  internalNotes: string | null;
  message: string | null;
  phone: string | null;
  preferredDate: string | null;
  preferredTime: string | null;
  scheduledFor: string | null;
  source: string;
  status: InquiryStatus;
  updatedAt: string;
};

export type CreateConsultationRequestInput = {
  assignedTo?: string | null;
  companyName?: string | null;
  email: string;
  fullName: string;
  internalNotes?: string | null;
  message?: string | null;
  phone?: string | null;
  preferredDate?: string | null;
  preferredTime?: string | null;
  scheduledFor?: string | null;
  source?: string;
  status?: InquiryStatus;
};

export type UpdateConsultationRequestInput = Partial<CreateConsultationRequestInput>;

export type MediaAssetRecord = {
  bucketName: string;
  createdAt: string;
  fileName: string;
  id: string;
  jobApplicationId: string | null;
  kind: MediaKind;
  mimeType: string | null;
  objectPath: string;
  postId: string | null;
  publicUrl: string | null;
  sizeBytes: number | null;
  updatedAt: string;
  uploadedBy: string | null;
  volunteerApplicationId: string | null;
};

export type CreateMediaAssetInput = {
  bucketName: string;
  fileName: string;
  jobApplicationId?: string | null;
  kind: MediaKind;
  mimeType?: string | null;
  objectPath: string;
  postId?: string | null;
  publicUrl?: string | null;
  sizeBytes?: number | null;
  uploadedBy?: string | null;
  volunteerApplicationId?: string | null;
};

export type UpdateMediaAssetOwnerInput = {
  jobApplicationId?: string | null;
  postId?: string | null;
  volunteerApplicationId?: string | null;
};
