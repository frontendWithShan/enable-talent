import { redirect } from "next/navigation";

import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import { listVolunteerApplications } from "@/lib/data/volunteers";

import {
  deleteVolunteerApplicationAction,
  updateVolunteerStatusAction,
} from "./actions";
import VolunteerApplicationsClient from "./VolunteerApplicationsClient";

export const dynamic = "force-dynamic";

export default async function VolunteerApplicationsAdminPage() {
  const viewer = await getAuthenticatedAdmin();

  if (!viewer) {
    redirect("/admin/login?next=%2Fadmin%2Fvolunteer-applications");
  }

  if (viewer.role !== "super_admin") {
    redirect("/admin/forbidden");
  }

  const applications = await listVolunteerApplications();

  return (
    <VolunteerApplicationsClient
      applications={applications}
      deleteAction={deleteVolunteerApplicationAction}
      updateStatusAction={updateVolunteerStatusAction}
    />
  );
}
