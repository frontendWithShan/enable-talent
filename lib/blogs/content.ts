import "server-only";

import { generateHTML } from "@tiptap/html/server";

import type { ContentSourceType, ContentStatus } from "@/lib/data/types";

import {
  createBlogEditorExtensions,
  isBlogEditorDocument,
  isBlogEditorDocumentEmpty,
  type BlogEditorDocument,
} from "./editor";

export function normalizeOptionalText(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmedValue = value.trim();
  return trimmedValue.length > 0 ? trimmedValue : null;
}

export function normalizeSourceType(value: FormDataEntryValue | null): ContentSourceType {
  return value === "external_link" ? "external_link" : "internal_article";
}

export function normalizeStatus(value: string | null): ContentStatus {
  if (value === "published") {
    return "published";
  }

  if (value === "archived") {
    return "archived";
  }

  return "draft";
}

export function normalizeArticleBody(value: FormDataEntryValue | null) {
  const rawValue = normalizeOptionalText(value);

  if (!rawValue) {
    return {
      bodyHtml: null,
      bodyJson: null,
      hasContent: false,
      parseError: null,
    };
  }

  let parsedDocument: unknown;

  try {
    parsedDocument = JSON.parse(rawValue);
  } catch {
    return {
      bodyHtml: null,
      bodyJson: null,
      hasContent: false,
      parseError: "Article content could not be read. Refresh the page and try again.",
    };
  }

  if (!isBlogEditorDocument(parsedDocument)) {
    return {
      bodyHtml: null,
      bodyJson: null,
      hasContent: false,
      parseError: "Article content is not in a valid format.",
    };
  }

  const bodyJson = parsedDocument as BlogEditorDocument;

  if (isBlogEditorDocumentEmpty(bodyJson)) {
    return {
      bodyHtml: null,
      bodyJson,
      hasContent: false,
      parseError: null,
    };
  }

  return {
    bodyHtml: generateHTML(bodyJson, createBlogEditorExtensions()),
    bodyJson,
    hasContent: true,
    parseError: null,
  };
}
