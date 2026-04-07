import { redirect } from "next/navigation";

import CareerEditorForm from "@/components/admin/careers/CareerEditorForm";
import { requireAdminAccess } from "@/lib/auth/admin";
import { canCreateCareerPosting } from "@/lib/careers/permissions";

import { createCareerPostingAction } from "../actions";

export default async function NewCareerPostingPage() {
  const viewer = await requireAdminAccess("/admin/careers/new");

  if (!canCreateCareerPosting(viewer)) {
    redirect("/admin/forbidden");
  }

  return (
    <CareerEditorForm
      action={createCareerPostingAction}
      mode="create"
      viewer={viewer}
    />
  );
}
