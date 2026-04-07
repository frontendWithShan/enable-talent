export type BlogFieldName =
  | "authorName"
  | "bodyJson"
  | "canonicalUrl"
  | "coverImageAlt"
  | "coverImageUrl"
  | "externalUrl"
  | "seoDescription"
  | "seoTitle"
  | "slug"
  | "summary"
  | "title";

export type BlogEditorActionState = {
  fieldErrors: Partial<Record<BlogFieldName, string>>;
  formError: string | null;
};

export type BlogAutosaveActionResult = {
  error?: string;
  message?: string;
  ok: boolean;
  postId: string | null;
  savedAt: string | null;
};

export const initialBlogEditorActionState: BlogEditorActionState = {
  fieldErrors: {},
  formError: null,
};
