import type { JSONContent } from "@tiptap/core";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";

export type BlogEditorDocument = JSONContent;

export function createEmptyBlogEditorDocument(): BlogEditorDocument {
  return {
    content: [
      {
        type: "paragraph",
      },
    ],
    type: "doc",
  };
}

export function createBlogEditorDocumentFromText(value: string | null | undefined) {
  const normalizedValue = value?.trim();

  if (!normalizedValue) {
    return createEmptyBlogEditorDocument();
  }

  const paragraphs = normalizedValue
    .split(/\r?\n\r?\n/g)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  return {
    content: paragraphs.map((paragraph) => ({
      content: [
        {
          text: paragraph,
          type: "text",
        },
      ],
      type: "paragraph",
    })),
    type: "doc",
  } satisfies BlogEditorDocument;
}

export function createBlogEditorExtensions() {
  return [
    StarterKit.configure({
      code: false,
      codeBlock: false,
      heading: {
        levels: [2, 3],
      },
      link: {
        openOnClick: false,
        validate: (href) => /^https?:\/\/|^mailto:/i.test(href),
      },
      strike: false,
    }),
    Image.configure({
      allowBase64: false,
      inline: false,
    }),
  ];
}

export function isBlogEditorDocument(value: unknown): value is BlogEditorDocument {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  return "type" in value && value.type === "doc";
}

function hasMeaningfulContent(node: JSONContent | null | undefined): boolean {
  if (!node) {
    return false;
  }

  if (node.type === "text") {
    return typeof node.text === "string" && node.text.trim().length > 0;
  }

  if (node.type === "image") {
    const src = typeof node.attrs?.src === "string" ? node.attrs.src : null;
    return Boolean(src && src.trim().length > 0);
  }

  if (node.type === "horizontalRule") {
    return true;
  }

  return Array.isArray(node.content) && node.content.some((child) => hasMeaningfulContent(child));
}

export function isBlogEditorDocumentEmpty(document: BlogEditorDocument | null | undefined) {
  if (!document) {
    return true;
  }

  return !Array.isArray(document.content) || !document.content.some((node) => hasMeaningfulContent(node));
}
