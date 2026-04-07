import type { ContentStatus } from "@/lib/data/types";

const STATUS_STYLES: Record<ContentStatus, string> = {
  archived:  "border-slate-300  bg-slate-100  text-slate-900",
  draft:     "border-amber-300  bg-amber-50   text-amber-950",
  published: "border-emerald-300 bg-emerald-50 text-emerald-950",
  scheduled: "border-sky-300    bg-sky-50     text-sky-950",
};

const STATUS_LABELS: Record<ContentStatus, string> = {
  archived:  "Archived",
  draft:     "Draft",
  published: "Published",
  scheduled: "Scheduled",
};

// Inline icons — aria-hidden, purely decorative cue alongside the text label
function PublishedIcon() {
  return (
    <svg aria-hidden="true" className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );
}
function DraftIcon() {
  return (
    <svg aria-hidden="true" className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
    </svg>
  );
}
function ArchivedIcon() {
  return (
    <svg aria-hidden="true" className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
      <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
      <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
  );
}
function ScheduledIcon() {
  return (
    <svg aria-hidden="true" className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
    </svg>
  );
}

const STATUS_ICONS: Record<ContentStatus, React.ReactNode> = {
  archived:  <ArchivedIcon />,
  draft:     <DraftIcon />,
  published: <PublishedIcon />,
  scheduled: <ScheduledIcon />,
};

export default function BlogStatusBadge({ status }: { status: ContentStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[status]}`}
    >
      {STATUS_ICONS[status]}
      {STATUS_LABELS[status]}
    </span>
  );
}
