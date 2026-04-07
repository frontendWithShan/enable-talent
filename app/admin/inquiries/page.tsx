import Link from "next/link";

import InquiryStatusBadge from "@/components/admin/inquiries/InquiryStatusBadge";
import { requireAdminAccess } from "@/lib/auth/admin";
import { getAdminHomePath } from "@/lib/auth/roles";
import type { InquiryStatus } from "@/lib/data/types";
import {
  ADMIN_INQUIRY_KIND_OPTIONS,
  type AdminInquiryKind,
  type AdminInquiryRecord,
  CONTACT_INQUIRY_STATUS_OPTIONS,
  CONSULTATION_INQUIRY_STATUS_OPTIONS,
  DEMO_INQUIRY_STATUS_OPTIONS,
  formatInquiryLabel,
  getAllowedStatusesForInquiryKind,
  listAdminInquiries,
} from "@/lib/inquiries/admin";

import { deleteInquiryAction, updateInquiryAction } from "./actions";

type InquiriesAdminPageProps = {
  searchParams?: Promise<{
    category?: string;
    kind?: string;
    notice?: string;
    query?: string;
    selectedId?: string;
    selectedType?: string;
    source?: string;
    status?: string;
    type?: string;
  }>;
};

function normalizeFilterValue<T extends string>(
  value: string | undefined,
  allowedValues: readonly T[],
) {
  return value && allowedValues.includes(value as T) ? (value as T) : undefined;
}

function normalizeQuery(value: string | undefined) {
  return value?.trim() ? value.trim() : undefined;
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

function formatDateTimeLocal(value: string | null | undefined) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const offsetMilliseconds = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offsetMilliseconds).toISOString().slice(0, 16);
}

function getStatusOptions(type: AdminInquiryKind | undefined) {
  if (!type) {
    return Array.from(
      new Set<InquiryStatus>([
        ...CONTACT_INQUIRY_STATUS_OPTIONS,
        ...DEMO_INQUIRY_STATUS_OPTIONS,
        ...CONSULTATION_INQUIRY_STATUS_OPTIONS,
      ]),
    );
  }

  return getAllowedStatusesForInquiryKind(type);
}

function buildInquiryTypeTone(kind: AdminInquiryKind) {
  switch (kind) {
    case "contact":
      return "border-emerald-300 bg-emerald-50 text-emerald-950";
    case "demo":
      return "border-cyan-300 bg-cyan-50 text-cyan-950";
    case "consultation":
      return "border-pink-300 bg-pink-50 text-pink-950";
    default:
      return "border-slate-300 bg-slate-50 text-slate-950";
  }
}

function buildBaseSearchParams(
  params: Record<string, string | undefined>,
  includeSelection = false,
) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (!value) {
      continue;
    }

    if (!includeSelection && (key === "selectedId" || key === "selectedType")) {
      continue;
    }

    searchParams.set(key, value);
  }

  return searchParams;
}

function getSummaryCounts(inquiries: AdminInquiryRecord[]) {
  return inquiries.reduce(
    (accumulator, inquiry) => {
      if (inquiry.status === "new" || inquiry.status === "pending") {
        accumulator.backlog += 1;
      } else if (
        inquiry.status === "in_progress" ||
        inquiry.status === "scheduled" ||
        inquiry.status === "contacted"
      ) {
        accumulator.active += 1;
      } else {
        accumulator.closed += 1;
      }

      accumulator.total += 1;
      return accumulator;
    },
    {
      active: 0,
      backlog: 0,
      closed: 0,
      total: 0,
    },
  );
}

function getSafeSelectedInquiry(
  inquiries: AdminInquiryRecord[],
  selectedType: AdminInquiryKind | undefined,
  selectedId: string | undefined,
) {
  if (selectedType && selectedId) {
    return (
      inquiries.find(
        (inquiry) =>
          inquiry.kind === selectedType && inquiry.id === selectedId,
      ) ?? null
    );
  }

  return inquiries[0] ?? null;
}

export default async function InquiriesAdminPage({
  searchParams,
}: InquiriesAdminPageProps) {
  const viewer = await requireAdminAccess("/admin/inquiries");
  const resolvedSearchParams = (await searchParams) ?? {};
  const type = normalizeFilterValue(
    resolvedSearchParams.type,
    ADMIN_INQUIRY_KIND_OPTIONS,
  );
  const allowedStatusOptions = getStatusOptions(type);
  const status = normalizeFilterValue(
    resolvedSearchParams.status,
    allowedStatusOptions,
  );
  const source = normalizeQuery(resolvedSearchParams.source);
  const query = normalizeQuery(resolvedSearchParams.query);
  const category =
    type === "demo" || type === "consultation"
      ? undefined
      : normalizeQuery(resolvedSearchParams.category);
  const selectedType = normalizeFilterValue(
    resolvedSearchParams.selectedType,
    ADMIN_INQUIRY_KIND_OPTIONS,
  );
  const selectedId = normalizeQuery(resolvedSearchParams.selectedId);
  const { inquiries, availableCategories, availableSources } =
    await listAdminInquiries({
      category,
      query,
      source,
      status,
      type,
    });
  const selectedInquiry = getSafeSelectedInquiry(
    inquiries,
    selectedType,
    selectedId,
  );
  const summaryCounts = getSummaryCounts(inquiries);
  const homePath = getAdminHomePath(viewer.role);
  const baseSearchParams = buildBaseSearchParams({
    category,
    query,
    source,
    status,
    type,
  });
  const selectedSearchParams = buildBaseSearchParams(
    {
      category,
      query,
      selectedId: selectedInquiry?.id,
      selectedType: selectedInquiry?.kind,
      source,
      status,
      type,
    },
    true,
  );
  const redirectTo = selectedSearchParams.toString()
    ? `/admin/inquiries?${selectedSearchParams.toString()}`
    : "/admin/inquiries";
  const deleteRedirectTo = baseSearchParams.toString()
    ? `/admin/inquiries?${baseSearchParams.toString()}`
    : "/admin/inquiries";

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-6 border-b border-slate-200 px-6 py-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
              Inquiries inbox
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700">
              Review contact requests, demo inquiries, and consultation submissions in one operational queue.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
              href={homePath}
            >
              Back to dashboard
            </Link>
          </div>
        </div>

        <div className="space-y-6 px-6 py-6">
          {resolvedSearchParams.notice ? (
            <div
              className={`rounded-xl border px-4 py-3 text-sm ${
                resolvedSearchParams.kind === "error"
                  ? "border-red-300 bg-red-50 text-red-950"
                  : "border-emerald-300 bg-emerald-50 text-emerald-950"
              }`}
              role={resolvedSearchParams.kind === "error" ? "alert" : "status"}
            >
              {resolvedSearchParams.notice}
            </div>
          ) : null}

          <form className="grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto]">
            <div>
              <label
                className="block text-sm font-semibold text-slate-900"
                htmlFor="query"
              >
                Search
              </label>
              <input
                className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
                defaultValue={query ?? ""}
                id="query"
                name="query"
                placeholder="Search by person, email, company, subject, or message"
                type="search"
              />
            </div>

            <div>
              <label
                className="block text-sm font-semibold text-slate-900"
                htmlFor="type"
              >
                Inquiry type
              </label>
              <select
                className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
                defaultValue={type ?? ""}
                id="type"
                name="type"
              >
                <option value="">All inquiry types</option>
                {ADMIN_INQUIRY_KIND_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {formatInquiryLabel(option)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-semibold text-slate-900"
                htmlFor="status"
              >
                Status
              </label>
              <select
                className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
                defaultValue={status ?? ""}
                id="status"
                name="status"
              >
                <option value="">All statuses</option>
                {allowedStatusOptions.map((option) => (
                  <option key={option} value={option}>
                    {formatInquiryLabel(option)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-semibold text-slate-900"
                htmlFor="source"
              >
                Source
              </label>
              <select
                className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
                defaultValue={source ?? ""}
                id="source"
                name="source"
              >
                <option value="">All sources</option>
                {availableSources.map((option) => (
                  <option key={option} value={option}>
                    {formatInquiryLabel(option)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-semibold text-slate-900"
                htmlFor="category"
              >
                Contact category
              </label>
              <select
                className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 disabled:cursor-not-allowed disabled:bg-slate-100"
                defaultValue={category ?? ""}
                disabled={type === "demo" || type === "consultation"}
                id="category"
                name="category"
              >
                <option value="">All contact categories</option>
                {availableCategories.map((option) => (
                  <option key={option} value={option}>
                    {formatInquiryLabel(option)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end gap-3">
              <button
                className="rounded-xl border border-slate-950 bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                type="submit"
              >
                Apply filters
              </button>
              <Link
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                href="/admin/inquiries"
              >
                Reset
              </Link>
            </div>
          </form>

          <section className="grid gap-4 md:grid-cols-4">
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h2 className="text-sm font-semibold text-slate-700">Total matching</h2>
              <p className="mt-2 text-3xl font-semibold text-slate-950">
                {summaryCounts.total}
              </p>
            </article>
            <article className="rounded-xl border border-amber-300 bg-amber-50 p-4">
              <h2 className="text-sm font-semibold text-amber-900">
                New or pending
              </h2>
              <p className="mt-2 text-3xl font-semibold text-amber-950">
                {summaryCounts.backlog}
              </p>
            </article>
            <article className="rounded-xl border border-blue-300 bg-blue-50 p-4">
              <h2 className="text-sm font-semibold text-blue-900">
                In progress
              </h2>
              <p className="mt-2 text-3xl font-semibold text-blue-950">
                {summaryCounts.active}
              </p>
            </article>
            <article className="rounded-xl border border-emerald-300 bg-emerald-50 p-4">
              <h2 className="text-sm font-semibold text-emerald-900">
                Closed or completed
              </h2>
              <p className="mt-2 text-3xl font-semibold text-emerald-950">
                {summaryCounts.closed}
              </p>
            </article>
          </section>

          {inquiries.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
              <h2 className="text-lg font-semibold text-slate-950">
                No inquiries found
              </h2>
              <p className="mt-2 text-sm text-slate-700">
                Try changing the filters or wait for new submissions to arrive.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)]">
              <div className="space-y-4">
                {inquiries.map((inquiry) => {
                  const cardSearchParams = buildBaseSearchParams(
                    {
                      category,
                      query,
                      selectedId: inquiry.id,
                      selectedType: inquiry.kind,
                      source,
                      status,
                      type,
                    },
                    true,
                  );
                  const href = cardSearchParams.toString()
                    ? `/admin/inquiries?${cardSearchParams.toString()}`
                    : "/admin/inquiries";
                  const isSelected =
                    selectedInquiry?.kind === inquiry.kind &&
                    selectedInquiry?.id === inquiry.id;

                  return (
                    <article
                      className={`rounded-xl border bg-white p-5 shadow-sm transition ${
                        isSelected
                          ? "border-slate-950 ring-2 ring-slate-950 ring-offset-2"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                      key={`${inquiry.kind}-${inquiry.id}`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${buildInquiryTypeTone(
                                inquiry.kind,
                              )}`}
                            >
                              {formatInquiryLabel(inquiry.kind)}
                            </span>
                            <InquiryStatusBadge status={inquiry.status} />
                            {inquiry.category ? (
                              <span className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-900">
                                {formatInquiryLabel(inquiry.category)}
                              </span>
                            ) : null}
                          </div>
                          <div>
                            <h2 className="text-lg font-semibold text-slate-950">
                              {inquiry.fullName}
                            </h2>
                            <p className="mt-1 text-sm text-slate-700">
                              {inquiry.email}
                            </p>
                          </div>
                        </div>

                        <Link
                          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                          href={href}
                        >
                          {isSelected ? "Viewing details" : "Review"}
                        </Link>
                      </div>

                      <dl className="mt-4 grid gap-3 text-sm text-slate-700 md:grid-cols-2">
                        <div>
                          <dt className="font-semibold text-slate-900">Company</dt>
                          <dd className="mt-1">
                            {inquiry.companyName ?? "Not provided"}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-slate-900">Source</dt>
                          <dd className="mt-1">
                            {formatInquiryLabel(inquiry.source)}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-slate-900">
                            Subject
                          </dt>
                          <dd className="mt-1">
                            {inquiry.subject ?? "No subject"}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-slate-900">
                            Submitted
                          </dt>
                          <dd className="mt-1">
                            {formatTimestamp(inquiry.createdAt)}
                          </dd>
                        </div>
                      </dl>

                      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <h3 className="text-sm font-semibold text-slate-900">
                          Message preview
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-700">
                          {inquiry.messagePreview ?? "No message provided."}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
              {selectedInquiry ? (
                <aside className="h-fit rounded-xl border border-slate-200 bg-white p-5 shadow-sm xl:sticky xl:top-24">
                  <div className="space-y-5">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${buildInquiryTypeTone(
                            selectedInquiry.kind,
                          )}`}
                        >
                          {formatInquiryLabel(selectedInquiry.kind)}
                        </span>
                        <InquiryStatusBadge status={selectedInquiry.status} />
                      </div>

                      <h2 className="mt-3 text-2xl font-semibold text-slate-950">
                        {selectedInquiry.fullName}
                      </h2>
                      <p className="mt-1 break-all text-sm text-slate-700">
                        {selectedInquiry.email}
                      </p>
                    </div>

                    <dl className="grid gap-4 text-sm text-slate-700">
                      <div>
                        <dt className="font-semibold text-slate-900">Company</dt>
                        <dd className="mt-1">
                          {selectedInquiry.companyName ?? "Not provided"}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-slate-900">Phone</dt>
                        <dd className="mt-1">
                          {selectedInquiry.phone ?? "Not provided"}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-slate-900">Submitted</dt>
                        <dd className="mt-1">
                          {formatTimestamp(selectedInquiry.createdAt)}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-slate-900">Updated</dt>
                        <dd className="mt-1">
                          {formatTimestamp(selectedInquiry.updatedAt)}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-slate-900">Source</dt>
                        <dd className="mt-1">
                          {formatInquiryLabel(selectedInquiry.source)}
                        </dd>
                      </div>
                      {selectedInquiry.category ? (
                        <div>
                          <dt className="font-semibold text-slate-900">
                            Contact category
                          </dt>
                          <dd className="mt-1">
                            {formatInquiryLabel(selectedInquiry.category)}
                          </dd>
                        </div>
                      ) : null}
                      {selectedInquiry.subject ? (
                        <div>
                          <dt className="font-semibold text-slate-900">Subject</dt>
                          <dd className="mt-1">{selectedInquiry.subject}</dd>
                        </div>
                      ) : null}
                      {selectedInquiry.preferredDate ||
                      selectedInquiry.preferredTime ? (
                        <div>
                          <dt className="font-semibold text-slate-900">
                            Preferred consultation time
                          </dt>
                          <dd className="mt-1">
                            {selectedInquiry.preferredDate ?? "Date not provided"}
                            {selectedInquiry.preferredDate &&
                            selectedInquiry.preferredTime
                              ? " | "
                              : ""}
                            {selectedInquiry.preferredTime ?? ""}
                          </dd>
                        </div>
                      ) : null}
                      {selectedInquiry.resolvedAt ? (
                        <div>
                          <dt className="font-semibold text-slate-900">
                            Resolved on
                          </dt>
                          <dd className="mt-1">
                            {formatTimestamp(selectedInquiry.resolvedAt)}
                          </dd>
                        </div>
                      ) : null}
                    </dl>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <h3 className="text-sm font-semibold text-slate-900">
                        Full message
                      </h3>
                      <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                        {selectedInquiry.message ?? "No message provided."}
                      </p>
                    </div>

                    <form action={updateInquiryAction} className="space-y-4">
                      <input
                        name="inquiryId"
                        type="hidden"
                        value={selectedInquiry.id}
                      />
                      <input
                        name="inquiryKind"
                        type="hidden"
                        value={selectedInquiry.kind}
                      />
                      <input name="redirectTo" type="hidden" value={redirectTo} />

                      <div>
                        <label
                          className="block text-sm font-semibold text-slate-900"
                          htmlFor={`status-${selectedInquiry.kind}-${selectedInquiry.id}`}
                        >
                          Status
                        </label>
                        <select
                          className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
                          defaultValue={selectedInquiry.status}
                          id={`status-${selectedInquiry.kind}-${selectedInquiry.id}`}
                          name="status"
                        >
                          {getAllowedStatusesForInquiryKind(selectedInquiry.kind).map(
                            (option) => (
                              <option key={option} value={option}>
                                {formatInquiryLabel(option)}
                              </option>
                            ),
                          )}
                        </select>
                      </div>

                      <div>
                        <label
                          className="block text-sm font-semibold text-slate-900"
                          htmlFor={`assignedTo-${selectedInquiry.kind}-${selectedInquiry.id}`}
                        >
                          Assigned to
                        </label>
                        <input
                          className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
                          defaultValue={selectedInquiry.assignedTo ?? ""}
                          id={`assignedTo-${selectedInquiry.kind}-${selectedInquiry.id}`}
                          name="assignedTo"
                          placeholder="Add the owner name or email"
                          type="text"
                        />
                        <p className="mt-2 text-xs leading-5 text-slate-600">
                          Use this field to show who is responsible for the follow-up.
                        </p>
                      </div>

                      {selectedInquiry.kind !== "contact" ? (
                        <div>
                          <label
                            className="block text-sm font-semibold text-slate-900"
                            htmlFor={`scheduledFor-${selectedInquiry.kind}-${selectedInquiry.id}`}
                          >
                            Scheduled for
                          </label>
                          <input
                            className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
                            defaultValue={formatDateTimeLocal(
                              selectedInquiry.scheduledFor,
                            )}
                            id={`scheduledFor-${selectedInquiry.kind}-${selectedInquiry.id}`}
                            name="scheduledFor"
                            type="datetime-local"
                          />
                        </div>
                      ) : null}

                      <div>
                        <label
                          className="block text-sm font-semibold text-slate-900"
                          htmlFor={`internalNotes-${selectedInquiry.kind}-${selectedInquiry.id}`}
                        >
                          Internal notes
                        </label>
                        <textarea
                          className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
                          defaultValue={selectedInquiry.internalNotes ?? ""}
                          id={`internalNotes-${selectedInquiry.kind}-${selectedInquiry.id}`}
                          name="internalNotes"
                          placeholder="Add follow-up notes or next steps for the team."
                          rows={5}
                        />
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button
                          className="rounded-xl border border-slate-950 bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                          type="submit"
                        >
                          Save workflow updates
                        </button>
                      </div>
                    </form>

                    <form action={deleteInquiryAction} className="pt-2">
                      <input
                        name="inquiryId"
                        type="hidden"
                        value={selectedInquiry.id}
                      />
                      <input
                        name="inquiryKind"
                        type="hidden"
                        value={selectedInquiry.kind}
                      />
                      <input
                        name="redirectTo"
                        type="hidden"
                        value={deleteRedirectTo}
                      />
                      <button
                        className="w-full rounded-xl border border-red-300 bg-white px-4 py-3 text-sm font-semibold text-red-800 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
                        type="submit"
                      >
                        Delete inquiry
                      </button>
                    </form>
                  </div>
                </aside>
              ) : null}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
