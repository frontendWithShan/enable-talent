import type { ContentSourceType, PostRecord } from "@/lib/data/types";
import type { BlogEditorDocument } from "@/lib/blogs/editor";

export type BlogComposerValues = {
  authorName: string;
  bodyJson: BlogEditorDocument;
  canonicalUrl: string;
  coverImageAlt: string;
  coverImageUrl: string;
  externalUrl: string;
  isFeatured: boolean;
  seoDescription: string;
  seoTitle: string;
  slug: string;
  sourceType: ContentSourceType;
  summary: string;
  title: string;
};

export type BlogComposerPost = Pick<
  PostRecord,
  "id" | "publishedAt" | "sourceType" | "status"
>;

export type BlogAutosaveStatus =
  | {
      kind: "idle" | "dirty" | "saving";
      message: string;
      savedAt?: null;
    }
  | {
      kind: "error" | "saved";
      message: string;
      savedAt: string | null;
    };
