import type { AdminViewer } from "@/lib/auth/roles";
import type { PostRecord } from "@/lib/data/types";

export function canCreateBlogPost(viewer: AdminViewer) {
  return viewer.role === "super_admin" || viewer.role === "editor" || viewer.role === "guest_writer";
}

export function canPublishBlogPost(viewer: AdminViewer) {
  return viewer.role === "super_admin" || viewer.role === "editor";
}

export function canArchiveBlogPost(viewer: AdminViewer) {
  return viewer.role === "super_admin" || viewer.role === "editor";
}

export function canDeleteBlogPost(viewer: AdminViewer, post: PostRecord) {
  if (viewer.role === "super_admin") {
    return true;
  }

  if (viewer.role === "editor") {
    return post.createdBy === viewer.id;
  }

  return false;
}

export function canEditBlogPost(viewer: AdminViewer, post: PostRecord) {
  if (viewer.role === "super_admin" || viewer.role === "editor") {
    return true;
  }

  return (
    viewer.role === "guest_writer" &&
    post.createdBy === viewer.id &&
    post.status === "draft"
  );
}

export function canViewBlogPostInAdmin(viewer: AdminViewer, post: PostRecord) {
  if (viewer.role === "guest_writer") {
    return post.createdBy === viewer.id;
  }

  return true;
}

export function assertCanCreateBlogPost(viewer: AdminViewer) {
  if (!canCreateBlogPost(viewer)) {
    throw new Error("You do not have permission to create blog posts.");
  }
}

export function assertCanEditBlogPost(viewer: AdminViewer, post: PostRecord) {
  if (!canEditBlogPost(viewer, post)) {
    throw new Error("You do not have permission to edit this blog post.");
  }
}

export function assertCanPublishBlogPost(viewer: AdminViewer) {
  if (!canPublishBlogPost(viewer)) {
    throw new Error("You do not have permission to publish blog posts.");
  }
}

export function assertCanArchiveBlogPost(viewer: AdminViewer) {
  if (!canArchiveBlogPost(viewer)) {
    throw new Error("You do not have permission to archive blog posts.");
  }
}

export function assertCanDeleteBlogPost(viewer: AdminViewer, post: PostRecord) {
  if (!canDeleteBlogPost(viewer, post)) {
    throw new Error("You do not have permission to delete this blog post.");
  }
}
