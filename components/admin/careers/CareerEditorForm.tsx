"use client";

import Link from "next/link";
import { useActionState, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";

import FieldError from "@/components/admin/blogs/FieldError";
import { extractCareerDescriptionText } from "@/lib/careers/content";
import { canArchiveCareerPosting, canPublishCareerPosting } from "@/lib/careers/permissions";
import {
  EMPLOYMENT_TYPE_OPTIONS,
  EXPERIENCE_LEVEL_OPTIONS,
  WORK_MODE_OPTIONS,
  formatCareerTokenLabel,
} from "@/lib/careers/options";
import { slugifyJobTitle } from "@/lib/careers/slugify";
import type { CareerEditorActionState } from "@/lib/careers/form-state";
import { initialCareerEditorActionState } from "@/lib/careers/form-state";
import type { AdminViewer } from "@/lib/auth/roles";
import type { JobRecord, SalaryPeriod } from "@/lib/data/types";

import CareerStatusBadge from "./CareerStatusBadge";

const SALARY_PERIOD_OPTIONS: readonly SalaryPeriod[] = ["hour", "month", "year"];

type CareerEditorValues = {
  applicationDeadline: string;
  descriptionText: string;
  employmentType: string;
  experienceLevel: string;
  isFeatured: boolean;
  locationText: string;
  salaryCurrency: string;
  salaryMax: string;
  salaryMin: string;
  salaryPeriod: string;
  slug: string;
  summary: string;
  title: string;
  workMode: string;
};

type CareerEditorFormProps = {
  action: (
    state: CareerEditorActionState,
    formData: FormData,
  ) => Promise<CareerEditorActionState>;
  archiveAction?: () => void | Promise<void>;
  job?: JobRecord;
  notice?: string;
  noticeKind?: string;
  mode: "create" | "edit";
  readOnly?: boolean;
  viewer: AdminViewer;
};

function formatDateInput(value: string | null | undefined) {
  if (!value) {
    return "";
  }

  return new Date(value).toISOString().slice(0, 10);
}

function createInitialValues(job?: JobRecord): CareerEditorValues {
  return {
    applicationDeadline: formatDateInput(job?.applicationDeadline),
    descriptionText: extractCareerDescriptionText(job?.descriptionHtml),
    employmentType: job?.employmentType ?? "",
    experienceLevel: job?.experienceLevel ?? "",
    isFeatured: job?.isFeatured ?? false,
    locationText: job?.locationText ?? "",
    salaryCurrency: job?.salaryCurrency ?? "",
    salaryMax: job?.salaryMax?.toString() ?? "",
    salaryMin: job?.salaryMin?.toString() ?? "",
    salaryPeriod: job?.salaryPeriod ?? "",
    slug: job?.slug ?? "",
    summary: job?.summary ?? "",
    title: job?.title ?? "",
    workMode: job?.workMode ?? "",
  };
}

function isCustomSlug(title: string, slug: string) {
  return slug !== slugifyJobTitle(title);
}

function formatTimestamp(value: string | null | undefined) {
  if (!value) {
    return "Not set";
  }

  return new Date(value).toLocaleString("en-CA", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function SubmitButton({
  className,
  disabled,
  intent,
  label,
  pendingLabel,
}: {
  className: string;
  disabled?: boolean;
  intent: "publish" | "save";
  label: string;
  pendingLabel: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      className={className}
      disabled={disabled || pending}
      name="intent"
      type="submit"
      value={intent}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}

export default function CareerEditorForm({
  action,
  archiveAction,
  job,
  mode,
  notice,
  noticeKind,
  readOnly = false,
  viewer,
}: CareerEditorFormProps) {
  const [state, formAction] = useActionState(action, initialCareerEditorActionState);
  const initialValues = useMemo(() => createInitialValues(job), [job]);
  const [values, setValues] = useState<CareerEditorValues>(initialValues);
  const [hasCustomSlug, setHasCustomSlug] = useState(() =>
    isCustomSlug(initialValues.title, initialValues.slug),
  );
  const slugLocked = job?.status === "published";
  const canPublish = !readOnly && mode === "edit" && canPublishCareerPosting(viewer);
  const canArchive = !readOnly && Boolean(job) && canArchiveCareerPosting(viewer);

  function updateField<K extends keyof CareerEditorValues>(
    field: K,
    nextValue: CareerEditorValues[K],
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: nextValue,
    }));
  }

  function handleTitleChange(nextTitle: string) {
    setValues((currentValues) => ({
      ...currentValues,
      slug: slugLocked || hasCustomSlug ? currentValues.slug : slugifyJobTitle(nextTitle),
      title: nextTitle,
    }));
  }

  function handleSlugChange(nextSlug: string) {
    setHasCustomSlug(nextSlug.trim().length > 0);
    updateField("slug", nextSlug);
  }

  const saveLabel =
    mode === "create"
      ? "Save draft"
      : job?.status === "draft"
        ? "Save draft"
        : "Save changes";
  const showPublishButton = canPublish && job?.status !== "published";

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {job ? <input name="existingSlug" type="hidden" value={job.slug} /> : null}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            {job ? <CareerStatusBadge status={job.status} /> : null}
            {job?.workMode ? (
              <span className="inline-flex items-center rounded-full border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-900">
                {formatCareerTokenLabel(job.workMode)}
              </span>
            ) : null}
            {job?.employmentType ? (
              <span className="inline-flex items-center rounded-full border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-900">
                {formatCareerTokenLabel(job.employmentType)}
              </span>
            ) : null}
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
            {mode === "create"
              ? "New career posting"
              : readOnly
                ? "Career posting details"
                : "Edit career posting"}
          </h1>
          <p className="max-w-3xl text-sm leading-6 text-slate-700">
            {readOnly
              ? "This view is read only. Editors can review postings here but cannot change them."
              : "Use this form to manage the role title, summary, job details, and publishing state."}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/careers"
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
          >
            Back to careers
          </Link>
          {!readOnly ? (
            <SubmitButton
              className="rounded-xl border border-slate-950 bg-white px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
              intent="save"
              label={saveLabel}
              pendingLabel="Saving..."
            />
          ) : null}
          {showPublishButton ? (
            <SubmitButton
              className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
              intent="publish"
              label="Publish"
              pendingLabel="Publishing..."
            />
          ) : null}
          {canArchive && job?.status !== "archived" && archiveAction ? (
            <button
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
              formAction={archiveAction}
              type="submit"
            >
              Archive
            </button>
          ) : null}
        </div>
      </div>

      {notice ? (
        <div
          className={`rounded-xl border px-4 py-3 text-sm ${
            noticeKind === "error"
              ? "border-red-300 bg-red-50 text-red-950"
              : "border-emerald-300 bg-emerald-50 text-emerald-950"
          }`}
          role={noticeKind === "error" ? "alert" : "status"}
        >
          {notice}
        </div>
      ) : null}

      {readOnly ? (
        <section className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-4 text-sm text-amber-950">
          <p className="font-semibold">Read-only access</p>
          <p className="mt-1 leading-6">
            Super admins can create, edit, publish, and archive career postings. Editors can review them here.
          </p>
        </section>
      ) : null}

      {state.formError ? (
        <div
          className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-950"
          role="alert"
        >
          {state.formError}
        </div>
      ) : null}

      <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white px-6 py-6 shadow-sm sm:px-8">
            <div className="grid gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-slate-900">
                  Role title
                </label>
                <input
                  aria-describedby={state.fieldErrors.title ? "title-error" : undefined}
                  aria-invalid={state.fieldErrors.title ? true : undefined}
                  className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 disabled:cursor-not-allowed disabled:bg-slate-100"
                  disabled={readOnly}
                  id="title"
                  name="title"
                  onChange={(event) => handleTitleChange(event.target.value)}
                  placeholder="Example: Accessible Marketing Coordinator"
                  type="text"
                  value={values.title}
                />
                <FieldError error={state.fieldErrors.title} id="title-error" />
              </div>

              <div>
                <label htmlFor="summary" className="block text-sm font-semibold text-slate-900">
                  Summary
                </label>
                <textarea
                  aria-describedby={state.fieldErrors.summary ? "summary-error" : "summary-help"}
                  aria-invalid={state.fieldErrors.summary ? true : undefined}
                  className="mt-2 min-h-28 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 disabled:cursor-not-allowed disabled:bg-slate-100"
                  disabled={readOnly}
                  id="summary"
                  name="summary"
                  onChange={(event) => updateField("summary", event.target.value)}
                  placeholder="Write a short summary that helps staff and applicants understand the role quickly."
                  value={values.summary}
                />
                <p id="summary-help" className="mt-2 text-sm text-slate-700">
                  This short text appears in admin lists and will support the public careers experience later.
                </p>
                <FieldError error={state.fieldErrors.summary} id="summary-error" />
              </div>

              <div>
                <label htmlFor="descriptionText" className="block text-sm font-semibold text-slate-900">
                  Description
                </label>
                <textarea
                  aria-describedby={state.fieldErrors.descriptionText ? "description-error" : "description-help"}
                  aria-invalid={state.fieldErrors.descriptionText ? true : undefined}
                  className="mt-2 min-h-64 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 disabled:cursor-not-allowed disabled:bg-slate-100"
                  disabled={readOnly}
                  id="descriptionText"
                  name="descriptionText"
                  onChange={(event) => updateField("descriptionText", event.target.value)}
                  placeholder="Explain the role, responsibilities, qualifications, and how the team supports success."
                  value={values.descriptionText}
                />
                <p id="description-help" className="mt-2 text-sm text-slate-700">
                  Write in plain language. Press Enter for a new line and leave a blank line between paragraphs.
                </p>
                <FieldError error={state.fieldErrors.descriptionText} id="description-error" />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white px-6 py-6 shadow-sm sm:px-8">
            <h2 className="text-lg font-semibold text-slate-950">Role details</h2>
            <div className="mt-5 grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="locationText" className="block text-sm font-semibold text-slate-900">
                  Location
                </label>
                <input
                  aria-describedby={state.fieldErrors.locationText ? "location-error" : undefined}
                  aria-invalid={state.fieldErrors.locationText ? true : undefined}
                  className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 disabled:cursor-not-allowed disabled:bg-slate-100"
                  disabled={readOnly}
                  id="locationText"
                  name="locationText"
                  onChange={(event) => updateField("locationText", event.target.value)}
                  placeholder="Example: Toronto, Ontario, Canada"
                  type="text"
                  value={values.locationText}
                />
                <FieldError error={state.fieldErrors.locationText} id="location-error" />
              </div>

              <div>
                <label htmlFor="workMode" className="block text-sm font-semibold text-slate-900">
                  Work mode
                </label>
                <select
                  aria-describedby={state.fieldErrors.workMode ? "work-mode-error" : undefined}
                  aria-invalid={state.fieldErrors.workMode ? true : undefined}
                  className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 disabled:cursor-not-allowed disabled:bg-slate-100"
                  disabled={readOnly}
                  id="workMode"
                  name="workMode"
                  onChange={(event) => updateField("workMode", event.target.value)}
                  value={values.workMode}
                >
                  <option value="">Choose work mode</option>
                  {WORK_MODE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {formatCareerTokenLabel(option)}
                    </option>
                  ))}
                </select>
                <FieldError error={state.fieldErrors.workMode} id="work-mode-error" />
              </div>

              <div>
                <label htmlFor="employmentType" className="block text-sm font-semibold text-slate-900">
                  Employment type
                </label>
                <select
                  aria-describedby={state.fieldErrors.employmentType ? "employment-type-error" : undefined}
                  aria-invalid={state.fieldErrors.employmentType ? true : undefined}
                  className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 disabled:cursor-not-allowed disabled:bg-slate-100"
                  disabled={readOnly}
                  id="employmentType"
                  name="employmentType"
                  onChange={(event) => updateField("employmentType", event.target.value)}
                  value={values.employmentType}
                >
                  <option value="">Choose employment type</option>
                  {EMPLOYMENT_TYPE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {formatCareerTokenLabel(option)}
                    </option>
                  ))}
                </select>
                <FieldError error={state.fieldErrors.employmentType} id="employment-type-error" />
              </div>

              <div>
                <label htmlFor="experienceLevel" className="block text-sm font-semibold text-slate-900">
                  Experience level
                </label>
                <select
                  aria-describedby={state.fieldErrors.experienceLevel ? "experience-level-error" : undefined}
                  aria-invalid={state.fieldErrors.experienceLevel ? true : undefined}
                  className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 disabled:cursor-not-allowed disabled:bg-slate-100"
                  disabled={readOnly}
                  id="experienceLevel"
                  name="experienceLevel"
                  onChange={(event) => updateField("experienceLevel", event.target.value)}
                  value={values.experienceLevel}
                >
                  <option value="">Choose experience level</option>
                  {EXPERIENCE_LEVEL_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {formatCareerTokenLabel(option)}
                    </option>
                  ))}
                </select>
                <FieldError error={state.fieldErrors.experienceLevel} id="experience-level-error" />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white px-6 py-6 shadow-sm sm:px-8">
            <h2 className="text-lg font-semibold text-slate-950">Compensation and timing</h2>
            <div className="mt-5 grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="salaryMin" className="block text-sm font-semibold text-slate-900">
                  Minimum salary
                </label>
                <input
                  aria-describedby={state.fieldErrors.salaryMin ? "salary-min-error" : undefined}
                  aria-invalid={state.fieldErrors.salaryMin ? true : undefined}
                  className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 disabled:cursor-not-allowed disabled:bg-slate-100"
                  disabled={readOnly}
                  id="salaryMin"
                  inputMode="decimal"
                  name="salaryMin"
                  onChange={(event) => updateField("salaryMin", event.target.value)}
                  placeholder="Example: 55000"
                  type="text"
                  value={values.salaryMin}
                />
                <FieldError error={state.fieldErrors.salaryMin} id="salary-min-error" />
              </div>

              <div>
                <label htmlFor="salaryMax" className="block text-sm font-semibold text-slate-900">
                  Maximum salary
                </label>
                <input
                  aria-describedby={state.fieldErrors.salaryMax ? "salary-max-error" : undefined}
                  aria-invalid={state.fieldErrors.salaryMax ? true : undefined}
                  className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 disabled:cursor-not-allowed disabled:bg-slate-100"
                  disabled={readOnly}
                  id="salaryMax"
                  inputMode="decimal"
                  name="salaryMax"
                  onChange={(event) => updateField("salaryMax", event.target.value)}
                  placeholder="Example: 70000"
                  type="text"
                  value={values.salaryMax}
                />
                <FieldError error={state.fieldErrors.salaryMax} id="salary-max-error" />
              </div>

              <div>
                <label htmlFor="salaryCurrency" className="block text-sm font-semibold text-slate-900">
                  Salary currency
                </label>
                <input
                  aria-describedby={state.fieldErrors.salaryCurrency ? "salary-currency-error" : "salary-currency-help"}
                  aria-invalid={state.fieldErrors.salaryCurrency ? true : undefined}
                  className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 disabled:cursor-not-allowed disabled:bg-slate-100"
                  disabled={readOnly}
                  id="salaryCurrency"
                  maxLength={8}
                  name="salaryCurrency"
                  onChange={(event) => updateField("salaryCurrency", event.target.value.toUpperCase())}
                  placeholder="Example: CAD"
                  type="text"
                  value={values.salaryCurrency}
                />
                <p id="salary-currency-help" className="mt-2 text-sm text-slate-700">
                  Add a currency code like CAD or USD only when salary details are available.
                </p>
                <FieldError error={state.fieldErrors.salaryCurrency} id="salary-currency-error" />
              </div>

              <div>
                <label htmlFor="salaryPeriod" className="block text-sm font-semibold text-slate-900">
                  Salary period
                </label>
                <select
                  aria-describedby={state.fieldErrors.salaryPeriod ? "salary-period-error" : undefined}
                  aria-invalid={state.fieldErrors.salaryPeriod ? true : undefined}
                  className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 disabled:cursor-not-allowed disabled:bg-slate-100"
                  disabled={readOnly}
                  id="salaryPeriod"
                  name="salaryPeriod"
                  onChange={(event) => updateField("salaryPeriod", event.target.value)}
                  value={values.salaryPeriod}
                >
                  <option value="">Choose salary period</option>
                  {SALARY_PERIOD_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {formatCareerTokenLabel(option)}
                    </option>
                  ))}
                </select>
                <FieldError error={state.fieldErrors.salaryPeriod} id="salary-period-error" />
              </div>

              <div>
                <label htmlFor="applicationDeadline" className="block text-sm font-semibold text-slate-900">
                  Application deadline
                </label>
                <input
                  aria-describedby={state.fieldErrors.applicationDeadline ? "application-deadline-error" : "application-deadline-help"}
                  aria-invalid={state.fieldErrors.applicationDeadline ? true : undefined}
                  className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 disabled:cursor-not-allowed disabled:bg-slate-100"
                  disabled={readOnly}
                  id="applicationDeadline"
                  name="applicationDeadline"
                  onChange={(event) => updateField("applicationDeadline", event.target.value)}
                  type="date"
                  value={values.applicationDeadline}
                />
                <p id="application-deadline-help" className="mt-2 text-sm text-slate-700">
                  The deadline stays open until the end of the selected date.
                </p>
                <FieldError error={state.fieldErrors.applicationDeadline} id="application-deadline-error" />
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white px-6 py-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">Post settings</h2>
            <div className="mt-5 space-y-5">
              <div>
                <label htmlFor="slug" className="block text-sm font-semibold text-slate-900">
                  Slug
                </label>
                <input
                  aria-describedby={state.fieldErrors.slug ? "slug-error" : "slug-help"}
                  aria-invalid={state.fieldErrors.slug ? true : undefined}
                  className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 disabled:cursor-not-allowed disabled:bg-slate-100"
                  disabled={readOnly || slugLocked}
                  id="slug"
                  name="slug"
                  onChange={(event) => handleSlugChange(event.target.value)}
                  type="text"
                  value={values.slug}
                />
                <p id="slug-help" className="mt-2 text-sm text-slate-700">
                  {slugLocked
                    ? "Published postings keep a stable slug."
                    : "If you leave this close to the title, it will update automatically while the posting stays in draft."}
                </p>
                <FieldError error={state.fieldErrors.slug} id="slug-error" />
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
                <p className="text-sm font-semibold text-slate-900">Current status</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <CareerStatusBadge status={job?.status ?? "draft"} />
                </div>
                <dl className="mt-4 space-y-3 text-sm text-slate-700">
                  <div>
                    <dt className="font-semibold text-slate-900">Last updated</dt>
                    <dd>{formatTimestamp(job?.updatedAt)}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-900">Published</dt>
                    <dd>{formatTimestamp(job?.publishedAt)}</dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
                <label className="flex items-start gap-3">
                  <input
                    checked={values.isFeatured}
                    className="mt-1 h-4 w-4 rounded border-slate-400 text-slate-950 focus:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={readOnly}
                    name="isFeatured"
                    onChange={(event) => updateField("isFeatured", event.target.checked)}
                    type="checkbox"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-slate-900">
                      Featured posting
                    </span>
                    <span className="mt-1 block text-sm text-slate-700">
                      Mark this role as featured so it can be highlighted in future careers views.
                    </span>
                  </span>
                </label>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </form>
  );
}
