const DEFAULT_IMAGE_BASENAME = "image";

export const BLOG_IMAGE_BUCKET = "blog-images";
export const BLOG_IMAGE_MAX_BYTES = 5 * 1024 * 1024;
export const BLOG_IMAGE_MIME_TYPES = [
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;
export const BLOG_IMAGE_ACCEPT = BLOG_IMAGE_MIME_TYPES.join(",");

export type BlogImageUploadKind = "cover" | "inline";

function sanitizeBasename(value: string) {
  const normalizedValue = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalizedValue || DEFAULT_IMAGE_BASENAME;
}

function getExtension(fileName: string) {
  const match = fileName.toLowerCase().match(/\.[a-z0-9]+$/);
  return match?.[0] ?? ".bin";
}

export function deriveImageAltText(fileName: string) {
  const stem = fileName.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").trim();
  return stem || "Uploaded image";
}

export function buildBlogImageObjectPath({
  fileName,
  postId,
  uploadKind,
}: {
  fileName: string;
  postId: string;
  uploadKind: BlogImageUploadKind;
}) {
  const extension = getExtension(fileName);
  const stem = sanitizeBasename(fileName.replace(/\.[^.]+$/, ""));
  const uniqueSuffix = typeof crypto !== "undefined" ? crypto.randomUUID() : `${Date.now()}`;

  return `posts/${postId}/${uploadKind}/${uniqueSuffix}-${stem}${extension}`;
}
