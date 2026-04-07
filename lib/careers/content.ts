function normalizeOptionalText(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmedValue = value.trim();
  return trimmedValue.length > 0 ? trimmedValue : null;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function decodeHtml(value: string) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&amp;/g, "&");
}

export function normalizeCareerDescription(value: FormDataEntryValue | null) {
  const text = normalizeOptionalText(value);

  if (!text) {
    return {
      descriptionHtml: null,
      descriptionText: null,
    };
  }

  const paragraphs = text
    .replace(/\r\n?/g, "\n")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return {
    descriptionHtml: paragraphs
      .map((paragraph) => {
        const htmlLines = paragraph
          .split("\n")
          .map((line) => escapeHtml(line.trim()))
          .join("<br />");

        return `<p>${htmlLines}</p>`;
      })
      .join("\n"),
    descriptionText: text,
  };
}

export function extractCareerDescriptionText(value: string | null | undefined) {
  if (!value) {
    return "";
  }

  return decodeHtml(
    value
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n\n")
      .replace(/<[^>]+>/g, "")
      .trim(),
  );
}
