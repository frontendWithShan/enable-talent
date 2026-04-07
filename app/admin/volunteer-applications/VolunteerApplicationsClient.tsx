"use client";

import { Fragment, useState } from "react";

import type { VolunteerApplicationRecord } from "@/lib/data/types";

type Props = {
  applications: VolunteerApplicationRecord[];
  deleteAction: (formData: FormData) => Promise<void>;
  updateStatusAction: (formData: FormData) => Promise<void>;
};

const STATUS_OPTIONS = ["pending", "reviewed", "accepted", "rejected"] as const;

function getStatusColor(status: string) {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "reviewed":
      return "bg-blue-100 text-blue-800";
    case "accepted":
      return "bg-green-100 text-green-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function formatDate(isoDate: string | null) {
  if (!isoDate) return "N/A";
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatPhoneNumber(phone: string | null) {
  if (!phone) return "N/A";
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone;
}

export default function VolunteerApplicationsClient({
  applications,
  deleteAction,
  updateStatusAction,
}: Props) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedApplication, setExpandedApplication] = useState<string | null>(
    null,
  );

  const filteredApplications = applications.filter(
    (app) => statusFilter === "all" || app.status === statusFilter,
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Volunteer Applications
        </h1>
        <p className="mt-2 text-gray-600">
          Manage and track volunteer applications from potential contributors
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="reviewed">Reviewed</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>

        <div className="flex items-center text-sm text-gray-500">
          Total Applications: {filteredApplications.length}
        </div>
      </div>

      {/* Applications Table */}
      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Skills
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Applied
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredApplications.map((application) => (
                <Fragment key={application.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {application.fullName}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {application.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatPhoneNumber(application.phone)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs truncate text-sm text-gray-900">
                        {application.skills}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <form action={updateStatusAction}>
                        <input type="hidden" name="id" value={application.id} />
                        <select
                          name="status"
                          defaultValue={application.status}
                          onChange={(e) => {
                            const form = e.currentTarget.form;
                            if (form) form.requestSubmit();
                          }}
                          className={`rounded-full border-0 px-2 py-1 text-xs font-medium focus:ring-2 focus:ring-blue-500 ${getStatusColor(application.status)}`}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </option>
                          ))}
                        </select>
                      </form>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {formatDate(application.createdAt)}
                    </td>
                    <td className="space-x-2 whitespace-nowrap px-6 py-4 text-sm font-medium">
                      <button
                        onClick={() =>
                          setExpandedApplication(
                            expandedApplication === application.id
                              ? null
                              : application.id,
                          )
                        }
                        className="text-blue-600 hover:text-blue-900"
                        type="button"
                      >
                        {expandedApplication === application.id
                          ? "Hide"
                          : "View"}
                      </button>
                      <form
                        action={deleteAction}
                        className="inline"
                        onSubmit={(e) => {
                          if (
                            !window.confirm(
                              "Are you sure you want to delete this volunteer application?",
                            )
                          ) {
                            e.preventDefault();
                          }
                        }}
                      >
                        <input type="hidden" name="id" value={application.id} />
                        <button
                          type="submit"
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                  {expandedApplication === application.id && (
                    <tr>
                      <td colSpan={6} className="bg-gray-50 px-6 py-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                              <h4 className="mb-2 text-sm font-medium text-gray-900">
                                Experience
                              </h4>
                              <p className="whitespace-pre-wrap text-sm text-gray-700">
                                {application.experience}
                              </p>
                            </div>
                            <div>
                              <h4 className="mb-2 text-sm font-medium text-gray-900">
                                Availability
                              </h4>
                              <p className="whitespace-pre-wrap text-sm text-gray-700">
                                {application.availability}
                              </p>
                            </div>
                          </div>
                          <div>
                            <h4 className="mb-2 text-sm font-medium text-gray-900">
                              Motivation
                            </h4>
                            <p className="whitespace-pre-wrap text-sm text-gray-700">
                              {application.motivation}
                            </p>
                          </div>
                          {(application.linkedinProfile ||
                            application.portfolioWebsite) && (
                            <div>
                              <h4 className="mb-2 text-sm font-medium text-gray-900">
                                Links
                              </h4>
                              <div className="space-y-1">
                                {application.linkedinProfile && (
                                  <div>
                                    <span className="text-sm text-gray-600">
                                      LinkedIn:{" "}
                                    </span>
                                    <a
                                      href={application.linkedinProfile}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-sm text-blue-600 hover:text-blue-800"
                                    >
                                      {application.linkedinProfile}
                                    </a>
                                  </div>
                                )}
                                {application.portfolioWebsite && (
                                  <div>
                                    <span className="text-sm text-gray-600">
                                      Portfolio:{" "}
                                    </span>
                                    <a
                                      href={application.portfolioWebsite}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-sm text-blue-600 hover:text-blue-800"
                                    >
                                      {application.portfolioWebsite}
                                    </a>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
        {filteredApplications.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            No volunteer applications found.
          </div>
        )}
      </div>
    </div>
  );
}
