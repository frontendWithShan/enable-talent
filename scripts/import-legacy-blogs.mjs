import {
  createSummary,
  createSupabaseAdminClient,
  createTextBodyDocument,
  estimateReadingTimeMinutes,
  extractRecords,
  loadExistingSlugMap,
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

function normalizeBlogHtml(value, fallbackText) {
  const normalizedValue = normalizeText(value);

  if (normalizedValue && /<[^>]+>/.test(normalizedValue)) {
    return normalizedValue;
  }

  return textToHtmlParagraphs(normalizedValue ?? fallbackText);
}

function normalizeBlogRecord(record) {
  const title = normalizeText(
    pickFirstDefined(record, ["BlogTitle", "title", "Title", "headline"]),
  );
  const contentValue = pickFirstDefined(record, [
    "BlogContent",
    "content",
    "body",
    "Body",
    "html",
    "description",
  ]);
  const fallbackText = stripHtml(String(contentValue ?? ""));
  const summary =
    normalizeText(pickFirstDefined(record, ["BlogDescription", "summary", "excerpt"])) ??
    createSummary(fallbackText) ??
    (title ? createSummary(title) : null);

  if (!title || !summary) {
    return null;
  }

  const bodyHtml =
    normalizeBlogHtml(contentValue, fallbackText || summary) ??
    textToHtmlParagraphs(summary);
  const bodyText = stripHtml(bodyHtml ?? fallbackText ?? summary);
  const createdAt =
    toIsoString(pickFirstDefined(record, ["Created_At", "createdAt", "publishedAt"])) ??
    new Date().toISOString();
  const updatedAt =
    toIsoString(pickFirstDefined(record, ["Updated_At", "updatedAt", "modifiedAt"])) ??
    createdAt;

  return {
    authorName:
      normalizeText(pickFirstDefined(record, ["Author", "author", "authorName"])) ?? null,
    bodyHtml,
    bodyJson: createTextBodyDocument(bodyText || summary),
    coverImageAlt: normalizeText(pickFirstDefined(record, ["coverImageAlt", "CoverImageAlt"])) ??
      (pickFirstDefined(record, ["CoverImage", "coverImage", "image"]) ? `${title} cover image` : null),
    coverImageUrl:
      normalizeText(pickFirstDefined(record, ["CoverImage", "coverImage", "image"])) ?? null,
    createdAt,
    legacyId: normalizeText(pickFirstDefined(record, ["id", "__legacyId", "documentId"])) ?? null,
    publishedAt:
      toIsoString(pickFirstDefined(record, ["Published_At", "publishedAt"])) ?? createdAt,
    readingTimeMinutes: estimateReadingTimeMinutes(bodyText || summary),
    requestedSlug:
      normalizeText(pickFirstDefined(record, ["BlogURL", "slug", "url"])) ?? title,
    seoDescription: summary,
    seoTitle: title,
    summary,
    title,
    updatedAt,
  };
}

async function main() {
  const args = parseImportArgs();

  if (args.help) {
    printUsage("import-legacy-blogs.mjs", "blog");
    return;
  }

  const { data, resolvedPath } = readJsonInput(args.inputPath);
  const records = extractRecords(data, ["blogs", "posts", "contentPosts"]);
  const supabase = createSupabaseAdminClient();
  const existingBySlug = await loadExistingSlugMap(supabase, "content_posts");
  const reservedSlugs = new Set();
  const actions = [];

  for (const record of records) {
    const normalizedRecord = normalizeBlogRecord(record);

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
        audience: "all",
        author_name: normalizedRecord.authorName,
        body_html: normalizedRecord.bodyHtml,
        body_json: normalizedRecord.bodyJson,
        canonical_url: null,
        cover_image_alt: normalizedRecord.coverImageAlt,
        cover_image_url: normalizedRecord.coverImageUrl,
        created_at: normalizedRecord.createdAt,
        external_url: null,
        is_featured: false,
        published_at: normalizedRecord.publishedAt,
        reading_time_minutes: normalizedRecord.readingTimeMinutes,
        region: "global",
        seo_description: normalizedRecord.seoDescription,
        seo_title: normalizedRecord.seoTitle,
        slug: slugState.slug,
        source_type: "internal_article",
        status: "published",
        summary: normalizedRecord.summary,
        title: normalizedRecord.title,
        type: "blog",
        updated_at: normalizedRecord.updatedAt,
      },
      rowId: slugState.existingId,
    });
  }

  console.log(`Loaded ${records.length} legacy blog records from ${resolvedPath}.`);
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
    console.log("Dry run complete. Re-run with --write to apply these blog imports.");
    return;
  }

  for (const item of actions) {
    if (item.action === "skip") {
      continue;
    }

    if (item.action === "update" && item.rowId) {
      const { error } = await supabase
        .from("content_posts")
        .update({
          audience: item.payload.audience,
          author_name: item.payload.author_name,
          body_html: item.payload.body_html,
          body_json: item.payload.body_json,
          canonical_url: item.payload.canonical_url,
          cover_image_alt: item.payload.cover_image_alt,
          cover_image_url: item.payload.cover_image_url,
          external_url: item.payload.external_url,
          is_featured: item.payload.is_featured,
          published_at: item.payload.published_at,
          reading_time_minutes: item.payload.reading_time_minutes,
          region: item.payload.region,
          seo_description: item.payload.seo_description,
          seo_title: item.payload.seo_title,
          slug: item.payload.slug,
          source_type: item.payload.source_type,
          status: item.payload.status,
          summary: item.payload.summary,
          title: item.payload.title,
          type: item.payload.type,
        })
        .eq("id", item.rowId);

      if (error) {
        throw new Error(`Unable to update blog ${item.payload.slug}: ${error.message}`);
      }

      continue;
    }

    const { error } = await supabase.from("content_posts").insert(item.payload);

    if (error) {
      throw new Error(`Unable to insert blog ${item.payload.slug}: ${error.message}`);
    }
  }

  console.log("Legacy blog import completed.");
}

await main();
