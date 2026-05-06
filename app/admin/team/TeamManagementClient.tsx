"use client";

import { useState } from "react";

import { ADMIN_ROLES, formatAdminRoleLabel, type AdminRole } from "@/lib/auth/roles";
import type { TeamMemberRecord } from "@/lib/data/team";

type Props = {
  currentUserId: string;
  deleteAction: (formData: FormData) => Promise<{ error?: string; success: boolean }>;
  inviteAction: (
    formData: FormData,
  ) => Promise<{ error?: string; success: boolean }>;
  members: TeamMemberRecord[];
  updateRoleAction: (formData: FormData) => Promise<void>;
  updateStatusAction: (formData: FormData) => Promise<void>;
};

const ROLE_COLORS: Record<AdminRole, string> = {
  super_admin: "bg-purple-100 text-purple-800",
  editor: "bg-blue-100 text-blue-800",
  guest_writer: "bg-slate-100 text-slate-700",
};

function formatDate(isoDate: string) {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function TeamManagementClient({
  currentUserId,
  deleteAction,
  inviteAction,
  members,
  updateRoleAction,
  updateStatusAction,
}: Props) {
  const [confirmDeactivate, setConfirmDeactivate] =
    useState<TeamMemberRecord | null>(null);
  const [confirmDelete, setConfirmDelete] =
    useState<TeamMemberRecord | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [confirmRoleChange, setConfirmRoleChange] = useState<{
    member: TeamMemberRecord;
    newRole: AdminRole;
  } | null>(null);
  const [optimisticRoles, setOptimisticRoles] = useState<
    Record<string, AdminRole>
  >({});
  const [isChangingRole, setIsChangingRole] = useState(false);

  const [showInvitePanel, setShowInvitePanel] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteFullName, setInviteFullName] = useState("");
  const [inviteRole, setInviteRole] = useState<AdminRole>("guest_writer");
  const [inviteError, setInviteError] = useState<string | null>(null);
  const [inviteSuccess, setInviteSuccess] = useState(false);
  const [isInviting, setIsInviting] = useState(false);

  async function handleConfirmRoleChange() {
    if (!confirmRoleChange) return;
    const { member, newRole } = confirmRoleChange;

    setIsChangingRole(true);
    setOptimisticRoles((prev) => ({ ...prev, [member.id]: newRole }));

    const payload = new FormData();
    payload.set("id", member.id);
    payload.set("role", newRole);

    try {
      await updateRoleAction(payload);
    } catch {
      setOptimisticRoles((prev) => {
        const next = { ...prev };
        delete next[member.id];
        return next;
      });
    }

    setIsChangingRole(false);
    setConfirmRoleChange(null);
  }

  async function handleDelete() {
    if (!confirmDelete) return;
    setIsDeleting(true);
    setDeleteError(null);

    const payload = new FormData();
    payload.set("id", confirmDelete.id);
    const result = await deleteAction(payload);

    if (result.success) {
      setConfirmDelete(null);
    } else {
      setDeleteError(result.error ?? "Failed to delete user.");
    }
    setIsDeleting(false);
  }

  async function handleInviteSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsInviting(true);
    setInviteError(null);
    setInviteSuccess(false);

    const payload = new FormData();
    payload.set("email", inviteEmail);
    payload.set("fullName", inviteFullName);
    payload.set("role", inviteRole);

    const result = await inviteAction(payload);

    if (result.success) {
      setInviteSuccess(true);
      setInviteEmail("");
      setInviteFullName("");
      setInviteRole("guest_writer");
      setTimeout(() => {
        setShowInvitePanel(false);
        setInviteSuccess(false);
      }, 2000);
    } else {
      setInviteError(result.error ?? "Failed to send invitation.");
    }

    setIsInviting(false);
  }

  const activeCount = members.filter((m) => m.isActive).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Team Management</h1>
          <p className="mt-1 text-sm text-slate-600">
            Manage admin roles and access for your team members.
          </p>
        </div>
        <button
          onClick={() => {
            setShowInvitePanel((v) => !v);
            setInviteError(null);
            setInviteSuccess(false);
          }}
          type="button"
          className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
        >
          {showInvitePanel ? "Cancel" : "Invite team member"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-2xl font-bold text-slate-900">{members.length}</div>
          <div className="text-sm text-slate-500">Total members</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-2xl font-bold text-green-600">{activeCount}</div>
          <div className="text-sm text-slate-500">Active</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-2xl font-bold text-purple-600">
            {members.filter((m) => m.role === "super_admin").length}
          </div>
          <div className="text-sm text-slate-500">Super admins</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-2xl font-bold text-blue-600">
            {members.filter((m) => m.role === "editor").length}
          </div>
          <div className="text-sm text-slate-500">Editors</div>
        </div>
      </div>

      {/* Invite Panel */}
      {showInvitePanel && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-base font-semibold text-slate-900">
            Invite a new team member
          </h2>
          <p className="mb-5 text-sm text-slate-600">
            They will receive an email with a link to set their password and
            access the admin portal.
          </p>

          {inviteSuccess && (
            <div className="mb-4 rounded-xl bg-green-50 p-4 text-sm font-medium text-green-800">
              Invitation sent successfully!
            </div>
          )}
          {inviteError && (
            <div className="mb-4 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-800">
              {inviteError}
            </div>
          )}

          <form onSubmit={handleInviteSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="inviteEmail"
                  className="block text-sm font-medium text-slate-700"
                >
                  Email address <span aria-hidden="true">*</span>
                </label>
                <input
                  id="inviteEmail"
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
                />
              </div>
              <div>
                <label
                  htmlFor="inviteFullName"
                  className="block text-sm font-medium text-slate-700"
                >
                  Full name
                </label>
                <input
                  id="inviteFullName"
                  type="text"
                  value={inviteFullName}
                  onChange={(e) => setInviteFullName(e.target.value)}
                  placeholder="Jane Smith"
                  className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="inviteRole"
                className="block text-sm font-medium text-slate-700"
              >
                Role <span aria-hidden="true">*</span>
              </label>
              <select
                id="inviteRole"
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as AdminRole)}
                className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 sm:w-64"
              >
                {ADMIN_ROLES.map((r) => (
                  <option key={r} value={r}>
                    {formatAdminRoleLabel(r)}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-slate-500">
                {inviteRole === "super_admin" &&
                  "Full access to all admin areas including team management."}
                {inviteRole === "editor" &&
                  "Can create and edit blogs and careers content."}
                {inviteRole === "guest_writer" && "Can create and edit blog posts only."}
              </p>
            </div>

            <div className="flex gap-3 pt-1">
              <button
                type="submit"
                disabled={isInviting}
                className="rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isInviting ? "Sending..." : "Send invitation"}
              </button>
              <button
                type="button"
                onClick={() => setShowInvitePanel(false)}
                className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Members Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Member
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Role
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Joined
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {members.map((member) => {
                const isSelf = member.id === currentUserId;
                const displayedRole =
                  optimisticRoles[member.id] ?? member.role;

                return (
                  <tr key={member.id} className="hover:bg-slate-50">
                    {/* Member */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          aria-hidden="true"
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700"
                        >
                          {getInitials(member.fullName)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                            {member.fullName}
                            {isSelf && (
                              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                                You
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500">
                            {member.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      {isSelf ? (
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${ROLE_COLORS[member.role]}`}
                        >
                          {formatAdminRoleLabel(member.role)}
                        </span>
                      ) : (
                        <div
                          className={`group relative inline-flex items-center rounded-full ${ROLE_COLORS[displayedRole]}`}
                        >
                          <select
                            aria-label={`Change role for ${member.fullName}`}
                            value={displayedRole}
                            disabled={isChangingRole}
                            onChange={(e) => {
                              const newRole = e.target.value as AdminRole;
                              if (newRole !== displayedRole) {
                                setConfirmRoleChange({ member, newRole });
                              }
                            }}
                            className="cursor-pointer appearance-none rounded-full bg-transparent py-1 pl-2.5 pr-7 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {ADMIN_ROLES.map((r) => (
                              <option
                                key={r}
                                value={r}
                                className="bg-white text-slate-900"
                              >
                                {formatAdminRoleLabel(r)}
                              </option>
                            ))}
                          </select>
                          <svg
                            aria-hidden="true"
                            className="pointer-events-none absolute right-2 h-3 w-3 opacity-50 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                          member.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`h-1.5 w-1.5 rounded-full ${member.isActive ? "bg-green-500" : "bg-red-500"}`}
                        />
                        {member.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* Joined */}
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                      {formatDate(member.createdAt)}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      {isSelf ? (
                        <span className="text-xs text-slate-400">
                          Cannot modify yourself
                        </span>
                      ) : (
                        <div className="flex items-center gap-2">
                          {member.isActive ? (
                            <button
                              type="button"
                              onClick={() => setConfirmDeactivate(member)}
                              className="cursor-pointer rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                            >
                              Deactivate
                            </button>
                          ) : (
                            <form action={updateStatusAction}>
                              <input type="hidden" name="id" value={member.id} />
                              <input type="hidden" name="currentlyActive" value="false" />
                              <button
                                type="submit"
                                className="rounded-lg bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
                              >
                                Activate
                              </button>
                            </form>
                          )}
                          {member.role !== "super_admin" && (
                            <button
                              type="button"
                              onClick={() => {
                                setDeleteError(null);
                                setConfirmDelete(member);
                              }}
                              className="cursor-pointer rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-1"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {members.length === 0 && (
          <div className="py-12 text-center text-slate-500">
            No team members found.
          </div>
        )}
      </div>

      {/* Role change confirmation modal */}
      {confirmRoleChange && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="role-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2
              id="role-modal-title"
              className="text-base font-semibold text-slate-900"
            >
              Change role?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              <span className="font-medium text-slate-900">
                {confirmRoleChange.member.fullName}
              </span>{" "}
              ({confirmRoleChange.member.email}) will be changed from{" "}
              <span
                className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${ROLE_COLORS[confirmRoleChange.member.role]}`}
              >
                {formatAdminRoleLabel(confirmRoleChange.member.role)}
              </span>{" "}
              to{" "}
              <span
                className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${ROLE_COLORS[confirmRoleChange.newRole]}`}
              >
                {formatAdminRoleLabel(confirmRoleChange.newRole)}
              </span>
              .
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                disabled={isChangingRole}
                onClick={() => setConfirmRoleChange(null)}
                className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isChangingRole}
                onClick={handleConfirmRoleChange}
                className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isChangingRole ? "Updating..." : "Yes, change role"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deactivate confirmation modal */}
      {confirmDeactivate && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="deactivate-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2
              id="deactivate-modal-title"
              className="text-base font-semibold text-slate-900"
            >
              Deactivate team member?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              <span className="font-medium text-slate-900">
                {confirmDeactivate.fullName}
              </span>{" "}
              ({confirmDeactivate.email}) will lose access to the admin portal
              immediately. You can reactivate them at any time.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmDeactivate(null)}
                className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
              >
                Cancel
              </button>
              <form
                action={updateStatusAction}
                onSubmit={() => setConfirmDeactivate(null)}
              >
                <input type="hidden" name="id" value={confirmDeactivate.id} />
                <input type="hidden" name="currentlyActive" value="true" />
                <button
                  type="submit"
                  className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                >
                  Yes, deactivate
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {confirmDelete && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2
              id="delete-modal-title"
              className="text-base font-semibold text-slate-900"
            >
              Permanently delete user?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              <span className="font-medium text-slate-900">
                {confirmDelete.fullName}
              </span>{" "}
              ({confirmDelete.email}) will be permanently removed. This cannot
              be undone.
            </p>

            {deleteError && (
              <p role="alert" className="mt-3 text-sm font-medium text-red-700">
                {deleteError}
              </p>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setConfirmDelete(null)}
                className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDelete}
                className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeleting ? "Deleting..." : "Yes, delete permanently"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Role reference */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-sm font-semibold text-slate-900">
          Role permissions
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {(
            [
              {
                role: "super_admin" as AdminRole,
                desc: "Full access — dashboard, blogs, careers, inquiries, newsletter, volunteers, job applications, and team management.",
              },
              {
                role: "editor" as AdminRole,
                desc: "Can create and edit blog posts and careers (jobs) content.",
              },
              {
                role: "guest_writer" as AdminRole,
                desc: "Can create and edit blog posts only. No access to other admin areas.",
              },
            ] as const
          ).map(({ role, desc }) => (
            <div key={role} className="rounded-xl bg-slate-50 p-4">
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${ROLE_COLORS[role]}`}
              >
                {formatAdminRoleLabel(role)}
              </span>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
