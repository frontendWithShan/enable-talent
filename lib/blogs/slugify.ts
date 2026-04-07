const DEFAULT_SLUG = "post";
const MAX_SLUG_LENGTH = 80;

function trimSlug(value: string) {
  return value.replace(/^-+|-+$/g, "");
}

export function slugifyPostTitle(value: string) {
  const normalizedValue = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

  const trimmedValue = trimSlug(normalizedValue).slice(0, MAX_SLUG_LENGTH);

  return trimSlug(trimmedValue) || DEFAULT_SLUG;
}

export function buildSlugCandidate(baseSlug: string, suffix?: number) {
  if (!suffix || suffix <= 1) {
    return baseSlug;
  }

  const suffixText = `-${suffix}`;
  const truncatedBase = baseSlug.slice(0, MAX_SLUG_LENGTH - suffixText.length);
  return `${trimSlug(truncatedBase)}${suffixText}`;
}
