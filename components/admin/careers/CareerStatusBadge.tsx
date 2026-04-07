import type { JobStatus } from "@/lib/data/types";

const STATUS_STYLES: Record<JobStatus, string> = {
  archived: "border-slate-300 bg-slate-100 text-slate-900",
  draft: "border-amber-300 bg-amber-50 text-amber-950",
  published: "border-emerald-300 bg-emerald-50 text-emerald-950",
};

const STATUS_LABELS: Record<JobStatus, string> = {
  archived: "Archived",
  draft: "Draft",
  published: "Published",
};

export default function CareerStatusBadge({ status }: { status: JobStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
