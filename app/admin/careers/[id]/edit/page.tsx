import { notFound, redirect } from "next/navigation";

import CareerEditorForm from "@/components/admin/careers/CareerEditorForm";
import { requireAdminAccess } from "@/lib/auth/admin";
import { canEditCareerPosting, canViewCareerPostingInAdmin } from "@/lib/careers/permissions";
import { getEditableJobById } from "@/lib/data/jobs";

import {
  archiveCareerPostingAction,
  updateCareerPostingAction,
} from "../../actions";

type EditCareerPostingPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{
    kind?: string;
    notice?: string;
  }>;
};

export default async function EditCareerPostingPage({
  params,
  searchParams,
}: EditCareerPostingPageProps) {
  const viewer = await requireAdminAccess("/admin/careers");
  const { id } = await params;
  const resolvedSearchParams = (await searchParams) ?? {};
  const job = await getEditableJobById(id);

  if (!job) {
    notFound();
  }

  if (!canViewCareerPostingInAdmin(viewer)) {
    redirect("/admin/forbidden");
  }

  const readOnly = !canEditCareerPosting(viewer, job);

  return (
    <CareerEditorForm
      action={updateCareerPostingAction.bind(null, job.id)}
      archiveAction={archiveCareerPostingAction.bind(
        null,
        job.id,
        `/admin/careers/${job.id}/edit`,
      )}
      job={job}
      mode="edit"
      notice={resolvedSearchParams.notice}
      noticeKind={resolvedSearchParams.kind}
      readOnly={readOnly}
      viewer={viewer}
    />
  );
}
