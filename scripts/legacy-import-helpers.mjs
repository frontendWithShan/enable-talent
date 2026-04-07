import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

import { createClient } from "@supabase/supabase-js";

const DEFAULT_ENV_FILE = ".env.local";
const DEFAULT_SUMMARY_LENGTH = 180;
const DEFAULT_READING_SPEED = 200;
const MAX_SLUG_LENGTH = 80;

function trimSlug(value) {
  return value.replace(/^-+|-+$/g, "");
}

function loadEnvFile(filePath) {
  const resolvedPath = path.resolve(process.cwd(), filePath);

  if (!existsSync(resolvedPath)) {
    return false;
  }

  const fileContents = readFileSync(resolvedPath, "utf8");

  for (const line of fileContents.split(/\r?\n/u)) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();

    if (!key || process.env[key]) {
      continue;
    }

    let value = trimmedLine.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }

  return true;
}

function requireEnv(primaryName, fallbackName) {
  const value =
    process.env[primaryName]?.trim() ||
    (fallbackName ? process.env[fallbackName]?.trim() : "");

  if (!value) {
    const acceptedNames = fallbackName ? `${primaryName} or ${fallbackName}` : primaryName;
    throw new Error(`Missing required environment variable: ${acceptedNames}.`);
  }

  return value;
}

export function createSupabaseAdminClient() {
  const envFile = process.env.SUPABASE_ENV_FILE || DEFAULT_ENV_FILE;
  loadEnvFile(envFile);
  const supabaseUrl = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
  const secretKey = requireEnv("SUPABASE_SECRET_KEY", "SUPABASE_SERVICE_ROLE_KEY");

  return createClient(supabaseUrl, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export function parseImportArgs(argv = process.argv.slice(2)) {
  const args = {
    help: false,
    inputPath: "",
    write: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];

    if (value === "--help" || value === "-h") {
      args.help = true;
      continue;
    }

    if (value === "--write") {
      args.write = true;
      continue;
    }

    if (value === "--input") {
      args.inputPath = argv[index + 1] ?? "";
      index += 1;
      continue;
    }
  }

  if (!args.help && !args.inputPath) {
    throw new Error("Missing required argument: --input <path-to-export.json>");
  }

  return args;
}

export function readJsonInput(inputPath) {
  const resolvedPath = path.resolve(process.cwd(), inputPath);

  if (!existsSync(resolvedPath)) {
    throw new Error(`Input file does not exist: ${resolvedPath}`);
  }

  return {
    data: JSON.parse(readFileSync(resolvedPath, "utf8")),
    resolvedPath,
  };
}

function unwrapFieldMap(fields) {
  return Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [key, unwrapFirestoreValue(value)]),
  );
}

export function unwrapFirestoreValue(value) {
  if (Array.isArray(value)) {
    return value.map(unwrapFirestoreValue);
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  if ("nullValue" in value) return null;
  if ("stringValue" in value) return value.stringValue;
  if ("booleanValue" in value) return Boolean(value.booleanValue);
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return Number(value.doubleValue);
  if ("timestampValue" in value) return value.timestampValue;
  if ("referenceValue" in value) return value.referenceValue;
  if ("geoPointValue" in value) return value.geoPointValue;
  if ("arrayValue" in value) {
    return (value.arrayValue?.values ?? []).map(unwrapFirestoreValue);
  }
  if ("mapValue" in value) {
    return unwrapFieldMap(value.mapValue?.fields ?? {});
  }
  if ("fields" in value && value.fields && typeof value.fields === "object") {
    return unwrapFieldMap(value.fields);
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, entryValue]) => [key, unwrapFirestoreValue(entryValue)]),
  );
}

function normalizeObjectRecord(id, value) {
  const normalizedValue = unwrapFirestoreValue(value);

  if (!normalizedValue || typeof normalizedValue !== "object" || Array.isArray(normalizedValue)) {
    return {
      __legacyId: id,
      value: normalizedValue,
    };
  }

  return {
    __legacyId: id,
    ...normalizedValue,
  };
}

export function extractRecords(payload, preferredKeys = []) {
  const keyCandidates = [...preferredKeys, "items", "records", "data", "documents"];

  if (Array.isArray(payload)) {
    return payload.map((value, index) => normalizeObjectRecord(String(index), value));
  }

  if (!payload || typeof payload !== "object") {
    throw new Error("Expected the import file to contain a JSON array or object.");
  }

  for (const key of keyCandidates) {
    const candidate = payload[key];

    if (Array.isArray(candidate)) {
      return candidate.map((value, index) => normalizeObjectRecord(String(index), value));
    }

    if (candidate && typeof candidate === "object") {
      return Object.entries(candidate).map(([id, value]) => normalizeObjectRecord(id, value));
    }
  }

  return Object.entries(payload).map(([id, value]) => normalizeObjectRecord(id, value));
}

export function pickFirstDefined(record, keys) {
  for (const key of keys) {
    if (record[key] !== undefined && record[key] !== null) {
      return record[key];
    }
  }

  return null;
}

export function normalizeText(value) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export function normalizeBoolean(value) {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    const normalizedValue = value.trim().toLowerCase();
    if (["true", "1", "yes"].includes(normalizedValue)) return true;
    if (["false", "0", "no"].includes(normalizedValue)) return false;
  }

  if (typeof value === "number") {
    return value !== 0;
  }

  return null;
}

export function toIsoString(value) {
  if (!value) {
    return null;
  }

  if (typeof value === "string") {
    const parsedValue = new Date(value);
    return Number.isNaN(parsedValue.getTime()) ? null : parsedValue.toISOString();
  }

  if (typeof value === "number") {
    const parsedValue = new Date(value);
    return Number.isNaN(parsedValue.getTime()) ? null : parsedValue.toISOString();
  }

  if (typeof value === "object") {
    if (typeof value.toDate === "function") {
      const dateValue = value.toDate();
      return dateValue instanceof Date && !Number.isNaN(dateValue.getTime())
        ? dateValue.toISOString()
        : null;
    }

    if (typeof value.seconds === "number") {
      return new Date(value.seconds * 1000).toISOString();
    }

    if (typeof value._seconds === "number") {
      return new Date(value._seconds * 1000).toISOString();
    }
  }

  return null;
}

export function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function stripHtml(value) {
  if (!value) return "";

  return value
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#39;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

export function textToHtmlParagraphs(value) {
  const paragraphs = (value ?? "")
    .split(/\r?\n\r?\n/g)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) {
    return null;
  }

  return paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
}

export function createTextBodyDocument(value) {
  const normalizedValue = value?.trim();

  if (!normalizedValue) {
    return {
      content: [
        {
          type: "paragraph",
        },
      ],
      type: "doc",
    };
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
  };
}

export function estimateReadingTimeMinutes(value) {
  const wordCount = stripHtml(value).split(/\s+/u).filter(Boolean).length;
  if (wordCount === 0) return null;
  return Math.max(1, Math.ceil(wordCount / DEFAULT_READING_SPEED));
}

export function createSummary(value, maxLength = DEFAULT_SUMMARY_LENGTH) {
  const normalizedValue = stripHtml(value);

  if (!normalizedValue) {
    return null;
  }

  if (normalizedValue.length <= maxLength) {
    return normalizedValue;
  }

  return `${normalizedValue.slice(0, maxLength - 1).trim()}…`;
}

export function slugify(value) {
  const normalizedValue = String(value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

  const trimmedValue = trimSlug(normalizedValue).slice(0, MAX_SLUG_LENGTH);
  return trimSlug(trimmedValue) || "post";
}

export function buildSlugCandidate(baseSlug, suffix) {
  if (!suffix || suffix <= 1) {
    return baseSlug;
  }

  const suffixText = `-${suffix}`;
  const truncatedBase = baseSlug.slice(0, MAX_SLUG_LENGTH - suffixText.length);
  return `${trimSlug(truncatedBase)}${suffixText}`;
}

export function extractSlugValue(value) {
  const normalizedValue = normalizeText(value);

  if (!normalizedValue) {
    return null;
  }

  try {
    const parsedUrl = new URL(normalizedValue);
    const pathname = parsedUrl.pathname.replace(/\/+$/g, "");
    const finalSegment = pathname.split("/").filter(Boolean).at(-1);
    return finalSegment ? slugify(finalSegment) : slugify(normalizedValue);
  } catch {
    return slugify(normalizedValue);
  }
}

export function resolveImportSlug(baseValue, state) {
  const baseSlug = extractSlugValue(baseValue) ?? slugify(baseValue);
  const normalizedBase = baseSlug.toLowerCase();

  if (
    state.existingBySlug.has(normalizedBase) &&
    !state.reservedSlugs.has(normalizedBase)
  ) {
    state.reservedSlugs.add(normalizedBase);
    return {
      collision: false,
      existingId: state.existingBySlug.get(normalizedBase) ?? null,
      slug: baseSlug,
    };
  }

  if (
    !state.existingBySlug.has(normalizedBase) &&
    !state.reservedSlugs.has(normalizedBase)
  ) {
    state.reservedSlugs.add(normalizedBase);
    return {
      collision: false,
      existingId: null,
      slug: baseSlug,
    };
  }

  let suffix = 2;
  let candidate = buildSlugCandidate(baseSlug, suffix);

  while (
    state.existingBySlug.has(candidate.toLowerCase()) ||
    state.reservedSlugs.has(candidate.toLowerCase())
  ) {
    suffix += 1;
    candidate = buildSlugCandidate(baseSlug, suffix);
  }

  state.reservedSlugs.add(candidate.toLowerCase());

  return {
    collision: true,
    existingId: null,
    slug: candidate,
  };
}

export async function loadExistingSlugMap(supabase, table) {
  const { data, error } = await supabase.from(table).select("id, slug");

  if (error) {
    throw new Error(`Unable to read existing slugs from ${table}: ${error.message}`);
  }

  return new Map((data ?? []).map((row) => [String(row.slug).toLowerCase(), String(row.id)]));
}

export function printUsage(scriptName, entityName) {
  console.log(`Usage: node scripts/${scriptName} --input <path-to-${entityName}-export.json> [--write]`);
  console.log("");
  console.log("Without --write, the script runs in dry-run mode and prints the planned inserts/updates.");
}
