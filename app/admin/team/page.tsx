import { redirect } from "next/navigation";

import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import { listTeamMembers } from "@/lib/data/team";

import {
  deleteTeamMemberAction,
  inviteTeamMemberAction,
  updateTeamMemberRoleAction,
  updateTeamMemberStatusAction,
} from "./actions";
import TeamManagementClient from "./TeamManagementClient";

export const dynamic = "force-dynamic";

export default async function TeamManagementPage() {
  const viewer = await getAuthenticatedAdmin();

  if (!viewer) {
    redirect("/admin/login?next=%2Fadmin%2Fteam");
  }

  if (viewer.role !== "super_admin") {
    redirect("/admin/forbidden");
  }

  const members = await listTeamMembers();

  return (
    <TeamManagementClient
      currentUserId={viewer.id}
      deleteAction={deleteTeamMemberAction}
      inviteAction={inviteTeamMemberAction}
      members={members}
      updateRoleAction={updateTeamMemberRoleAction}
      updateStatusAction={updateTeamMemberStatusAction}
    />
  );
}
