import type { AdminViewer } from "@/lib/auth/roles";
import type { JobRecord } from "@/lib/data/types";

export function canCreateCareerPosting(viewer: AdminViewer) {
  return viewer.role === "super_admin";
}

export function canEditCareerPosting(viewer: AdminViewer, job?: JobRecord) {
  void job;
  return viewer.role === "super_admin";
}

export function canPublishCareerPosting(viewer: AdminViewer) {
  return viewer.role === "super_admin";
}

export function canArchiveCareerPosting(viewer: AdminViewer) {
  return viewer.role === "super_admin";
}

export function canViewCareerPostingInAdmin(viewer: AdminViewer) {
  return viewer.role === "super_admin" || viewer.role === "editor";
}

export function assertCanCreateCareerPosting(viewer: AdminViewer) {
  if (!canCreateCareerPosting(viewer)) {
    throw new Error("You do not have permission to create career postings.");
  }
}

export function assertCanEditCareerPosting(viewer: AdminViewer, job?: JobRecord) {
  if (!canEditCareerPosting(viewer, job)) {
    throw new Error("You do not have permission to edit this career posting.");
  }
}

export function assertCanPublishCareerPosting(viewer: AdminViewer) {
  if (!canPublishCareerPosting(viewer)) {
    throw new Error("You do not have permission to publish career postings.");
  }
}

export function assertCanArchiveCareerPosting(viewer: AdminViewer) {
  if (!canArchiveCareerPosting(viewer)) {
    throw new Error("You do not have permission to archive career postings.");
  }
}
