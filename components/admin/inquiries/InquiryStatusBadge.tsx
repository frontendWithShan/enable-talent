import type { InquiryStatus } from "@/lib/data/types";
import { formatInquiryLabel } from "@/lib/inquiries/admin";

type InquiryStatusBadgeProps = {
  status: InquiryStatus;
};

function buildStatusTone(status: InquiryStatus) {
  switch (status) {
    case "resolved":
    case "completed":
    case "closed":
      return "border-emerald-300 bg-emerald-50 text-emerald-950";
    case "in_progress":
    case "scheduled":
    case "contacted":
      return "border-blue-300 bg-blue-50 text-blue-950";
    case "cancelled":
      return "border-red-300 bg-red-50 text-red-950";
    case "pending":
      return "border-amber-300 bg-amber-50 text-amber-950";
    case "new":
    default:
      return "border-slate-300 bg-slate-50 text-slate-950";
  }
}

export default function InquiryStatusBadge({
  status,
}: InquiryStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${buildStatusTone(
        status,
      )}`}
    >
      {formatInquiryLabel(status)}
    </span>
  );
}
