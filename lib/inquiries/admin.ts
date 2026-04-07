import {
  listConsultationRequests,
  listContactSubmissions,
  listDemoRequests,
} from "@/lib/data/inquiries";
import type {
  ConsultationRequestRecord,
  ContactSubmissionRecord,
  DemoRequestRecord,
  InquiryStatus,
} from "@/lib/data/types";

export type AdminInquiryKind = "contact" | "demo" | "consultation";

export type AdminInquiryRecord = {
  assignedTo: string | null;
  category: string | null;
  companyName: string | null;
  createdAt: string;
  email: string;
  fullName: string;
  id: string;
  internalNotes: string | null;
  kind: AdminInquiryKind;
  message: string | null;
  messagePreview: string | null;
  phone: string | null;
  preferredDate: string | null;
  preferredTime: string | null;
  resolvedAt: string | null;
  scheduledFor: string | null;
  source: string;
  status: InquiryStatus;
  subject: string | null;
  updatedAt: string;
};

export type AdminInquiryFilters = {
  category?: string;
  query?: string;
  source?: string;
  status?: InquiryStatus;
  type?: AdminInquiryKind;
};

export const ADMIN_INQUIRY_KIND_OPTIONS = [
  "contact",
  "demo",
  "consultation",
] as const satisfies readonly AdminInquiryKind[];

export const CONTACT_INQUIRY_STATUS_OPTIONS = [
  "new",
  "in_progress",
  "resolved",
  "closed",
] as const satisfies readonly InquiryStatus[];

export const DEMO_INQUIRY_STATUS_OPTIONS = [
  "pending",
  "contacted",
  "completed",
  "cancelled",
] as const satisfies readonly InquiryStatus[];

export const CONSULTATION_INQUIRY_STATUS_OPTIONS = [
  "pending",
  "scheduled",
  "completed",
  "cancelled",
] as const satisfies readonly InquiryStatus[];

function buildMessagePreview(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  const normalized = value.trim().replace(/\s+/g, " ");

  if (normalized.length <= 140) {
    return normalized;
  }

  return `${normalized.slice(0, 137)}...`;
}

function mapContactInquiry(
  inquiry: ContactSubmissionRecord,
): AdminInquiryRecord {
  return {
    assignedTo: inquiry.assignedTo,
    category: inquiry.inquiryType,
    companyName: inquiry.company,
    createdAt: inquiry.createdAt,
    email: inquiry.email,
    fullName: inquiry.fullName,
    id: inquiry.id,
    internalNotes: inquiry.internalNotes,
    kind: "contact",
    message: inquiry.message,
    messagePreview: buildMessagePreview(inquiry.message),
    phone: inquiry.phone,
    preferredDate: null,
    preferredTime: null,
    resolvedAt: inquiry.resolvedAt,
    scheduledFor: null,
    source: inquiry.source,
    status: inquiry.status,
    subject: inquiry.subject,
    updatedAt: inquiry.updatedAt,
  };
}

function mapDemoInquiry(inquiry: DemoRequestRecord): AdminInquiryRecord {
  return {
    assignedTo: inquiry.assignedTo,
    category: null,
    companyName: inquiry.companyName,
    createdAt: inquiry.createdAt,
    email: inquiry.email,
    fullName: inquiry.fullName,
    id: inquiry.id,
    internalNotes: inquiry.internalNotes,
    kind: "demo",
    message: inquiry.message,
    messagePreview: buildMessagePreview(inquiry.message),
    phone: inquiry.phone,
    preferredDate: null,
    preferredTime: null,
    resolvedAt: null,
    scheduledFor: inquiry.scheduledFor,
    source: inquiry.source,
    status: inquiry.status,
    subject: null,
    updatedAt: inquiry.updatedAt,
  };
}

function mapConsultationInquiry(
  inquiry: ConsultationRequestRecord,
): AdminInquiryRecord {
  return {
    assignedTo: inquiry.assignedTo,
    category: null,
    companyName: inquiry.companyName,
    createdAt: inquiry.createdAt,
    email: inquiry.email,
    fullName: inquiry.fullName,
    id: inquiry.id,
    internalNotes: inquiry.internalNotes,
    kind: "consultation",
    message: inquiry.message,
    messagePreview: buildMessagePreview(inquiry.message),
    phone: inquiry.phone,
    preferredDate: inquiry.preferredDate,
    preferredTime: inquiry.preferredTime,
    resolvedAt: null,
    scheduledFor: inquiry.scheduledFor,
    source: inquiry.source,
    status: inquiry.status,
    subject: null,
    updatedAt: inquiry.updatedAt,
  };
}

function normalizeSearchValue(value: string | null | undefined) {
  return value?.trim().toLowerCase() ?? "";
}

function matchesQuery(inquiry: AdminInquiryRecord, query: string) {
  if (!query) {
    return true;
  }

  const searchValue = normalizeSearchValue(query);

  return [
    inquiry.fullName,
    inquiry.email,
    inquiry.companyName,
    inquiry.subject,
    inquiry.message,
    inquiry.source,
    inquiry.category,
  ].some((value) => normalizeSearchValue(value).includes(searchValue));
}

function compareDescendingByCreatedAt(
  left: AdminInquiryRecord,
  right: AdminInquiryRecord,
) {
  return (
    new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()
  );
}

export function formatInquiryLabel(value: string | null | undefined) {
  if (!value) {
    return "Not set";
  }

  return value
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function getAllowedStatusesForInquiryKind(kind: AdminInquiryKind) {
  switch (kind) {
    case "contact":
      return CONTACT_INQUIRY_STATUS_OPTIONS;
    case "demo":
      return DEMO_INQUIRY_STATUS_OPTIONS;
    case "consultation":
      return CONSULTATION_INQUIRY_STATUS_OPTIONS;
    default:
      return CONTACT_INQUIRY_STATUS_OPTIONS;
  }
}

export function isAllowedStatusForInquiryKind(
  kind: AdminInquiryKind,
  status: string | null | undefined,
): status is InquiryStatus {
  if (!status) {
    return false;
  }

  return (getAllowedStatusesForInquiryKind(kind) as readonly string[]).includes(
    status,
  );
}

export async function listAdminInquiries(filters: AdminInquiryFilters = {}) {
  const [contactInquiries, demoInquiries, consultationInquiries] =
    await Promise.all([
      listContactSubmissions(),
      listDemoRequests(),
      listConsultationRequests(),
    ]);

  const allInquiries = [
    ...contactInquiries.map(mapContactInquiry),
    ...demoInquiries.map(mapDemoInquiry),
    ...consultationInquiries.map(mapConsultationInquiry),
  ].sort(compareDescendingByCreatedAt);

  const availableSources = Array.from(
    new Set(
      allInquiries
        .map((inquiry) => inquiry.source)
        .filter((value): value is string => Boolean(value)),
    ),
  ).sort((left, right) => left.localeCompare(right));

  const availableCategories = Array.from(
    new Set(
      contactInquiries
        .map((inquiry) => inquiry.inquiryType)
        .filter((value): value is string => Boolean(value)),
    ),
  ).sort((left, right) => left.localeCompare(right));

  const filteredInquiries = allInquiries.filter((inquiry) => {
    if (filters.type && inquiry.kind !== filters.type) {
      return false;
    }

    if (filters.status && inquiry.status !== filters.status) {
      return false;
    }

    if (filters.source && inquiry.source !== filters.source) {
      return false;
    }

    if (filters.category && inquiry.category !== filters.category) {
      return false;
    }

    if (!matchesQuery(inquiry, filters.query ?? "")) {
      return false;
    }

    return true;
  });

  return {
    availableCategories,
    availableSources,
    inquiries: filteredInquiries,
  };
}
