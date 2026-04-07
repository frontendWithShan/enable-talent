import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

import { createClient } from "@supabase/supabase-js";

const DEFAULT_ENV_FILE = ".env.local";

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

function assertNoError(error, context) {
  if (error) {
    throw new Error(`${context}: ${error.message}`);
  }
}

function assertRecord(data, context) {
  if (!data) {
    throw new Error(`Expected ${context} to exist.`);
  }

  return data;
}

const envFile = process.env.SUPABASE_ENV_FILE || DEFAULT_ENV_FILE;
const loadedFromFile = loadEnvFile(envFile);
const supabaseUrl = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
const secretKey = requireEnv("SUPABASE_SECRET_KEY", "SUPABASE_SERVICE_ROLE_KEY");
const supabase = createClient(supabaseUrl, secretKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const runSuffix = `${Date.now()}`;
const nowIso = new Date().toISOString();
const cleanupTasks = [];
const cleanupFailures = [];

function registerCleanup(label, handler) {
  cleanupTasks.unshift(async () => {
    try {
      await handler();
      console.log(`Cleaned up ${label}.`);
    } catch (error) {
      cleanupFailures.push(label);
      console.error(`Cleanup failed for ${label}:`, error instanceof Error ? error.message : error);
    }
  });
}

async function deleteRow(table, id) {
  const { error } = await supabase.from(table).delete().eq("id", id);
  assertNoError(error, `Delete from ${table}`);
}

try {
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
  assertNoError(bucketsError, "List storage buckets");

  const bucketNames = new Set((buckets ?? []).map((bucket) => bucket.name));

  if (!bucketNames.has("blog-images") || !bucketNames.has("resumes")) {
    throw new Error("Expected blog-images and resumes buckets to exist. Apply the core schema migration first.");
  }

  console.log(`Verified storage buckets using values loaded from ${loadedFromFile ? envFile : "process environment"}.`);

  const { data: postData, error: postError } = await supabase
    .from("content_posts")
    .insert({
      author_name: "Smoke Test",
      body_html: "<p>Smoke test content</p>",
      reading_time_minutes: 5,
      slug: `smoke-post-${runSuffix}`,
      status: "draft",
      summary: "Temporary smoke test post.",
      title: `Smoke Post ${runSuffix}`,
    })
    .select("id, slug, status")
    .single();
  assertNoError(postError, "Create content post");
  const post = assertRecord(postData, "content post");
  registerCleanup(`content post ${post.id}`, () => deleteRow("content_posts", post.id));

  const { data: jobData, error: jobError } = await supabase
    .from("jobs")
    .insert({
      description_html: "<p>Temporary smoke test job</p>",
      is_active: false,
      slug: `smoke-job-${runSuffix}`,
      status: "draft",
      summary: "Temporary smoke test job.",
      title: `Smoke Job ${runSuffix}`,
    })
    .select("id, slug, status")
    .single();
  assertNoError(jobError, "Create job");
  const job = assertRecord(jobData, "job");
  registerCleanup(`job ${job.id}`, () => deleteRow("jobs", job.id));

  const { data: jobApplicationData, error: jobApplicationError } = await supabase
    .from("job_applications")
    .insert({
      cover_letter: "Smoke test cover letter.",
      email: `job-app-${runSuffix}@example.com`,
      full_name: "Smoke Test Applicant",
      job_id: job.id,
      status: "pending",
    })
    .select("id, status")
    .single();
  assertNoError(jobApplicationError, "Create job application");
  const jobApplication = assertRecord(jobApplicationData, "job application");
  registerCleanup(`job application ${jobApplication.id}`, () =>
    deleteRow("job_applications", jobApplication.id),
  );

  const { data: volunteerData, error: volunteerError } = await supabase
    .from("volunteer_applications")
    .insert({
      email: `volunteer-${runSuffix}@example.com`,
      full_name: "Smoke Volunteer",
      motivation: "Smoke test motivation.",
      status: "pending",
    })
    .select("id, status")
    .single();
  assertNoError(volunteerError, "Create volunteer application");
  const volunteerApplication = assertRecord(volunteerData, "volunteer application");
  registerCleanup(`volunteer application ${volunteerApplication.id}`, () =>
    deleteRow("volunteer_applications", volunteerApplication.id),
  );

  const { data: contactData, error: contactError } = await supabase
    .from("contact_submissions")
    .insert({
      email: `contact-${runSuffix}@example.com`,
      full_name: "Smoke Contact",
      message: "Smoke test contact message.",
      status: "new",
    })
    .select("id, status")
    .single();
  assertNoError(contactError, "Create contact submission");
  const contactSubmission = assertRecord(contactData, "contact submission");
  registerCleanup(`contact submission ${contactSubmission.id}`, () =>
    deleteRow("contact_submissions", contactSubmission.id),
  );

  const { data: demoData, error: demoError } = await supabase
    .from("demo_requests")
    .insert({
      email: `demo-${runSuffix}@example.com`,
      full_name: "Smoke Demo",
      message: "Smoke test demo request.",
      status: "pending",
    })
    .select("id, status")
    .single();
  assertNoError(demoError, "Create demo request");
  const demoRequest = assertRecord(demoData, "demo request");
  registerCleanup(`demo request ${demoRequest.id}`, () =>
    deleteRow("demo_requests", demoRequest.id),
  );

  const { data: consultationData, error: consultationError } = await supabase
    .from("consultation_requests")
    .insert({
      email: `consult-${runSuffix}@example.com`,
      full_name: "Smoke Consultation",
      preferred_date: "2026-04-30",
      preferred_time: "13:00",
      status: "pending",
    })
    .select("id, status")
    .single();
  assertNoError(consultationError, "Create consultation request");
  const consultationRequest = assertRecord(consultationData, "consultation request");
  registerCleanup(`consultation request ${consultationRequest.id}`, () =>
    deleteRow("consultation_requests", consultationRequest.id),
  );

  const { data: mediaData, error: mediaError } = await supabase
    .from("media_assets")
    .insert({
      bucket_name: "blog-images",
      file_name: `smoke-${runSuffix}.png`,
      kind: "blog_image",
      object_path: `smoke/${runSuffix}.png`,
      post_id: post.id,
      public_url: `https://example.com/smoke/${runSuffix}.png`,
      size_bytes: 2048,
    })
    .select("id, object_path")
    .single();
  assertNoError(mediaError, "Create media asset");
  const mediaAsset = assertRecord(mediaData, "media asset");
  registerCleanup(`media asset ${mediaAsset.id}`, () => deleteRow("media_assets", mediaAsset.id));

  await Promise.all([
    supabase.from("content_posts").select("id, slug, status").eq("id", post.id).single(),
    supabase.from("jobs").select("id, slug, is_active, status").eq("id", job.id).single(),
    supabase
      .from("job_applications")
      .select("id, status, job_id")
      .eq("id", jobApplication.id)
      .single(),
    supabase
      .from("volunteer_applications")
      .select("id, status")
      .eq("id", volunteerApplication.id)
      .single(),
    supabase
      .from("contact_submissions")
      .select("id, status")
      .eq("id", contactSubmission.id)
      .single(),
    supabase.from("demo_requests").select("id, status").eq("id", demoRequest.id).single(),
    supabase
      .from("consultation_requests")
      .select("id, status")
      .eq("id", consultationRequest.id)
      .single(),
    supabase.from("media_assets").select("id, object_path").eq("id", mediaAsset.id).single(),
  ]).then((results) => {
    const contexts = [
      "Read content post",
      "Read job",
      "Read job application",
      "Read volunteer application",
      "Read contact submission",
      "Read demo request",
      "Read consultation request",
      "Read media asset",
    ];

    results.forEach((result, index) => {
      assertNoError(result.error, contexts[index]);
      assertRecord(result.data, contexts[index]);
    });
  });

  const updates = await Promise.all([
    supabase
      .from("content_posts")
      .update({
        published_at: nowIso,
        status: "published",
      })
      .eq("id", post.id)
      .select("id, status")
      .single(),
    supabase
      .from("jobs")
      .update({
        is_featured: true,
        published_at: nowIso,
        status: "published",
      })
      .eq("id", job.id)
      .select("id, is_featured, status")
      .single(),
    supabase
      .from("job_applications")
      .update({
        internal_notes: "Reviewed in smoke test.",
        reviewed_at: nowIso,
        status: "reviewed",
      })
      .eq("id", jobApplication.id)
      .select("id, status")
      .single(),
    supabase
      .from("volunteer_applications")
      .update({
        internal_notes: "Volunteer reviewed in smoke test.",
        reviewed_at: nowIso,
        status: "reviewed",
      })
      .eq("id", volunteerApplication.id)
      .select("id, status")
      .single(),
    supabase
      .from("contact_submissions")
      .update({
        internal_notes: "Contact resolved in smoke test.",
        resolved_at: nowIso,
        status: "resolved",
      })
      .eq("id", contactSubmission.id)
      .select("id, status")
      .single(),
    supabase
      .from("demo_requests")
      .update({
        scheduled_for: nowIso,
        status: "scheduled",
      })
      .eq("id", demoRequest.id)
      .select("id, status")
      .single(),
    supabase
      .from("consultation_requests")
      .update({
        scheduled_for: nowIso,
        status: "contacted",
      })
      .eq("id", consultationRequest.id)
      .select("id, status")
      .single(),
    supabase
      .from("media_assets")
      .update({
        public_url: `https://example.com/smoke/${runSuffix}-updated.png`,
      })
      .eq("id", mediaAsset.id)
      .select("id, public_url")
      .single(),
  ]);

  const updateContexts = [
    "Update content post",
    "Update job",
    "Update job application",
    "Update volunteer application",
    "Update contact submission",
    "Update demo request",
    "Update consultation request",
    "Update media asset",
  ];

  updates.forEach((result, index) => {
    assertNoError(result.error, updateContexts[index]);
    assertRecord(result.data, updateContexts[index]);
  });

  for (const cleanupTask of cleanupTasks) {
    await cleanupTask();
  }

  if (cleanupFailures.length > 0) {
    throw new Error(`Smoke test completed with cleanup failures: ${cleanupFailures.join(", ")}`);
  }

  console.log("Supabase core schema smoke test passed.");
} catch (error) {
  console.error(
    "Supabase core schema smoke test failed:",
    error instanceof Error ? error.message : error,
  );
  process.exitCode = 1;
}
