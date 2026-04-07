import {
  createSummary,
  createSupabaseAdminClient,
  extractRecords,
  loadExistingSlugMap,
  normalizeBoolean,
  normalizeText,
  parseImportArgs,
  pickFirstDefined,
  printUsage,
  readJsonInput,
  resolveImportSlug,
  stripHtml,
  textToHtmlParagraphs,
  toIsoString,
} from "./legacy-import-helpers.mjs";

const EMPLOYMENT_TYPE_ALIASES = {
  contract: "contract",
  freelance: "freelance",
  fulltime: "full_time",
  "full-time": "full_time",
  internship: "internship",
  parttime: "part_time",
  "part-time": "part_time",
  temporary: "temporary",
};

const WORK_MODE_ALIASES = {
  hybrid: "hybrid",
  onsite: "onsite",
  "on-site": "onsite",
  remote: "remote",
};

const SALARY_PERIOD_ALIASES = {
  annual: "year",
  hourly: "hour",
  month: "month",
  monthly: "month",
  year: "year",
  yearly: "year",
};

function normalizeToken(value, aliasMap) {
  const normalizedValue = normalizeText(value);

  if (!normalizedValue) {
    return null;
  }

  const key = normalizedValue.toLowerCase().replace(/[\s_]+/g, "-");
  return aliasMap[key] ?? null;
}

function formatJobDescriptionHtml(sourceValue, fallbackText, salaryText) {
  const normalizedValue = normalizeText(sourceValue);
  const baseHtml =
    (normalizedValue && /<[^>]+>/.test(normalizedValue)
      ? normalizedValue
      : textToHtmlParagraphs(normalizedValue ?? fallbackText)) ?? textToHtmlParagraphs(fallbackText);

  if (!salaryText || !baseHtml || baseHtml.includes(salaryText)) {
    return baseHtml;
  }

  return `${baseHtml}<p><strong>Compensation:</strong> ${salaryText}</p>`;
}

function parseSalary(value) {
  const normalizedValue = normalizeText(value);

  if (!normalizedValue) {
    return {
      raw: null,
      salaryCurrency: null,
      salaryMax: null,
      salaryMin: null,
      salaryPeriod: null,
      wasParsed: false,
    };
  }

  const upperValue = normalizedValue.toUpperCase();
  const currencyMatch =
    upperValue.match(/\b(CAD|USD|EUR|GBP)\b/) ||
    (normalizedValue.includes("$") ? ["$", "CAD"] : null);
  const salaryCurrency = currencyMatch ? currencyMatch[1] || "CAD" : null;

  const numberMatches = normalizedValue.match(/\d[\d,]*(?:\.\d+)?/g) ?? [];
  const numbers = numberMatches
    .map((match) => Number(match.replaceAll(",", "")))
    .filter((match) => Number.isFinite(match));
  const salaryPeriod =
    normalizeToken(
      normalizedValue.match(/\b(hourly|hour|monthly|month|annual|yearly|year)\b/i)?.[1],
      SALARY_PERIOD_ALIASES,
    ) ?? null;

  if (numbers.length === 0) {
    return {
      raw: normalizedValue,
      salaryCurrency,
      salaryMax: null,
      salaryMin: null,
      salaryPeriod,
      wasParsed: false,
    };
  }

  return {
    raw: normalizedValue,
    salaryCurrency,
    salaryMax: numbers.length > 1 ? numbers[1] : null,
    salaryMin: numbers[0] ?? null,
    salaryPeriod,
    wasParsed: true,
  };
}

function normalizeJobRecord(record) {
  const title = normalizeText(
    pickFirstDefined(record, ["title", "jobTitle", "position", "role", "name"]),
  );
  const descriptionValue = pickFirstDefined(record, [
    "description_html",
    "descriptionHtml",
    "description",
    "job_desc",
    "jobDescription",
    "content",
  ]);
  const descriptionText = stripHtml(String(descriptionValue ?? ""));
  const summary =
    normalizeText(pickFirstDefined(record, ["summary", "excerpt", "shortDescription"])) ??
    createSummary(descriptionText);

  if (!title || !summary) {
    return null;
  }

  const salary = parseSalary(
    pickFirstDefined(record, ["salaryRange", "salary", "estimated_salary", "compensation"]),
  );
  const createdAt =
    toIsoString(pickFirstDefined(record, ["createdAt", "created_at", "publishedAt"])) ??
    new Date().toISOString();
  const updatedAt =
    toIsoString(pickFirstDefined(record, ["updatedAt", "updated_at", "modifiedAt"])) ??
    createdAt;
  const isActive = normalizeBoolean(pickFirstDefined(record, ["isActive", "active"])) ?? true;

  return {
    applicationDeadline: toIsoString(
      pickFirstDefined(record, ["applicationDeadline", "application_deadline", "deadline"]),
    ),
    createdAt,
    descriptionHtml: formatJobDescriptionHtml(
      descriptionValue,
      descriptionText || summary,
      salary.wasParsed ? null : salary.raw,
    ),
    employmentType: normalizeToken(
      pickFirstDefined(record, ["employmentType", "employment_type", "jobType", "job_type_display"]),
      EMPLOYMENT_TYPE_ALIASES,
    ),
    experienceLevel: normalizeText(
      pickFirstDefined(record, ["experienceLevel", "experience_level"]),
    ),
    isActive,
    isFeatured: normalizeBoolean(pickFirstDefined(record, ["isFeatured", "featured"])) ?? false,
    legacyId: normalizeText(pickFirstDefined(record, ["id", "__legacyId", "documentId"])) ?? null,
    locationText: normalizeText(
      pickFirstDefined(record, ["location_text", "locationText", "location"]),
    ),
    publishedAt:
      toIsoString(pickFirstDefined(record, ["publishedAt", "published_at"])) ?? createdAt,
    requestedSlug:
      normalizeText(pickFirstDefined(record, ["slug", "jobSlug", "url"])) ?? title,
    salary,
    summary,
    title,
    updatedAt,
    workMode: normalizeToken(
      pickFirstDefined(record, ["workMode", "work_mode"]),
      WORK_MODE_ALIASES,
    ),
  };
}

async function main() {
  const args = parseImportArgs();

  if (args.help) {
    printUsage("import-legacy-jobs.mjs", "jobs");
    return;
  }

  const { data, resolvedPath } = readJsonInput(args.inputPath);
  const records = extractRecords(data, ["jobPostings", "jobs", "roles"]);
  const supabase = createSupabaseAdminClient();
  const existingBySlug = await loadExistingSlugMap(supabase, "jobs");
  const reservedSlugs = new Set();
  const actions = [];

  for (const record of records) {
    const normalizedRecord = normalizeJobRecord(record);

    if (!normalizedRecord) {
      actions.push({
        action: "skip",
        legacyId: normalizeText(pickFirstDefined(record, ["id", "__legacyId", "documentId"])) ?? "unknown",
        reason: "Missing required title or summary.",
      });
      continue;
    }

    const slugState = resolveImportSlug(normalizedRecord.requestedSlug, {
      existingBySlug,
      reservedSlugs,
    });

    actions.push({
      action: slugState.existingId ? "update" : "insert",
      collision: slugState.collision,
      legacyId: normalizedRecord.legacyId ?? "unknown",
      payload: {
        application_deadline: normalizedRecord.applicationDeadline,
        created_at: normalizedRecord.createdAt,
        description_html: normalizedRecord.descriptionHtml,
        employment_type: normalizedRecord.employmentType,
        experience_level: normalizedRecord.experienceLevel,
        is_active: normalizedRecord.isActive,
        is_featured: normalizedRecord.isFeatured,
        location_text: normalizedRecord.locationText,
        published_at: normalizedRecord.publishedAt,
        salary_currency: normalizedRecord.salary.salaryCurrency,
        salary_max: normalizedRecord.salary.salaryMax,
        salary_min: normalizedRecord.salary.salaryMin,
        salary_period: normalizedRecord.salary.salaryPeriod,
        slug: slugState.slug,
        status: normalizedRecord.isActive ? "published" : "archived",
        summary: normalizedRecord.summary,
        title: normalizedRecord.title,
        updated_at: normalizedRecord.updatedAt,
        work_mode: normalizedRecord.workMode,
      },
      rowId: slugState.existingId,
    });
  }

  console.log(`Loaded ${records.length} legacy job records from ${resolvedPath}.`);
  console.log(
    `Planned actions: ${actions.filter((item) => item.action === "insert").length} inserts, ` +
      `${actions.filter((item) => item.action === "update").length} updates, ` +
      `${actions.filter((item) => item.action === "skip").length} skipped.`,
  );

  actions.forEach((item) => {
    if (item.action === "skip") {
      console.log(`- SKIP  [${item.legacyId}] ${item.reason}`);
      return;
    }

    const collisionLabel = item.collision ? " (slug adjusted)" : "";
    console.log(`- ${item.action.toUpperCase()} [${item.legacyId}] ${item.payload.slug}${collisionLabel}`);
  });

  if (!args.write) {
    console.log("");
    console.log("Dry run complete. Re-run with --write to apply these job imports.");
    return;
  }

  for (const item of actions) {
    if (item.action === "skip") {
      continue;
    }

    if (item.action === "update" && item.rowId) {
      const { error } = await supabase
        .from("jobs")
        .update({
          application_deadline: item.payload.application_deadline,
          description_html: item.payload.description_html,
          employment_type: item.payload.employment_type,
          experience_level: item.payload.experience_level,
          is_active: item.payload.is_active,
          is_featured: item.payload.is_featured,
          location_text: item.payload.location_text,
          published_at: item.payload.published_at,
          salary_currency: item.payload.salary_currency,
          salary_max: item.payload.salary_max,
          salary_min: item.payload.salary_min,
          salary_period: item.payload.salary_period,
          slug: item.payload.slug,
          status: item.payload.status,
          summary: item.payload.summary,
          title: item.payload.title,
          work_mode: item.payload.work_mode,
        })
        .eq("id", item.rowId);

      if (error) {
        throw new Error(`Unable to update job ${item.payload.slug}: ${error.message}`);
      }

      continue;
    }

    const { error } = await supabase.from("jobs").insert(item.payload);

    if (error) {
      throw new Error(`Unable to insert job ${item.payload.slug}: ${error.message}`);
    }
  }

  console.log("Legacy job import completed.");
}

await main();
