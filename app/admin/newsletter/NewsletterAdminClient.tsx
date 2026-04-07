"use client";

import { useState } from "react";

import type { NewsletterSubscriptionRecord } from "@/lib/data/types";

type Props = {
  addAction: (formData: FormData) => Promise<{ error?: string; success: boolean }>;
  deleteAction: (formData: FormData) => Promise<void>;
  subscriptions: NewsletterSubscriptionRecord[];
  toggleActiveAction: (formData: FormData) => Promise<void>;
  updateAction: (formData: FormData) => Promise<void>;
};

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

export default function NewsletterAdminClient({
  addAction,
  deleteAction,
  subscriptions,
  toggleActiveAction,
  updateAction,
}: Props) {
  const [activeTab, setActiveTab] = useState<"list" | "form">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formEmail, setFormEmail] = useState("");
  const [formIsActive, setFormIsActive] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesSearch = sub.email
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterActive === "all" ||
      (filterActive === "active" && sub.isActive) ||
      (filterActive === "inactive" && !sub.isActive);
    return matchesSearch && matchesFilter;
  });

  const thisMonthCount = subscriptions.filter((sub) => {
    const date = new Date(sub.subscribedAt);
    return date > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  }).length;

  function resetForm() {
    setFormEmail("");
    setFormIsActive(true);
    setEditingId(null);
  }

  function handleEdit(sub: NewsletterSubscriptionRecord) {
    setEditingId(sub.id);
    setFormEmail(sub.email);
    setFormIsActive(sub.isActive);
    setActiveTab("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    try {
      const payload = new FormData();
      payload.set("email", formEmail);
      payload.set("isActive", formIsActive ? "true" : "false");

      if (editingId) {
        payload.set("id", editingId);
        await updateAction(payload);
        setMessage({
          text: "Subscription updated successfully!",
          type: "success",
        });
      } else {
        const result = await addAction(payload);
        if (!result.success) {
          setMessage({
            text: result.error ?? "Failed to add subscription.",
            type: "error",
          });
          return;
        }
        setMessage({
          text: "Subscription added successfully!",
          type: "success",
        });
      }

      resetForm();
      setActiveTab("list");
    } catch (error) {
      setMessage({
        text: `Error: ${(error as Error).message}`,
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function exportSubscriptions() {
    const activeEmails = subscriptions
      .filter((sub) => sub.isActive)
      .map((sub) => sub.email)
      .join("\n");

    const blob = new Blob([activeEmails], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-subscriptions-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      {/* Page header */}
      <div className="bg-white shadow">
        <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-7xl lg:px-8">
          <div className="py-6 md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
                Newsletter Management
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage newsletter subscriptions and export email lists
              </p>
            </div>
            <div className="mt-4 flex space-x-3 md:ml-4 md:mt-0">
              <button
                onClick={exportSubscriptions}
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                type="button"
              >
                <svg
                  className="-ml-1 mr-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Export Active
              </button>
              <button
                onClick={() => setActiveTab("list")}
                className={`inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  activeTab === "list"
                    ? "border-transparent bg-blue-600 text-white hover:bg-blue-700"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
                type="button"
              >
                View List
              </button>
              <button
                onClick={() => {
                  resetForm();
                  setActiveTab("form");
                }}
                className={`inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  activeTab === "form"
                    ? "border-transparent bg-blue-600 text-white hover:bg-blue-700"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
                type="button"
              >
                Add New
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-6">
          <a
            href="/admin"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-blue-600 shadow-sm hover:text-blue-800"
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Dashboard
          </a>
        </div>

        {/* Message Display */}
        {message.text && (
          <div
            className={`mb-6 rounded-md border p-4 ${
              message.type === "success"
                ? "border-green-200 bg-green-50 text-green-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Content */}
        {activeTab === "list" ? (
          <div>
            {/* Stats and Filters */}
            <div className="mb-6 rounded-lg bg-white p-6 shadow">
              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {subscriptions.length}
                  </div>
                  <div className="text-sm text-gray-500">
                    Total Subscriptions
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {subscriptions.filter((sub) => sub.isActive).length}
                  </div>
                  <div className="text-sm text-gray-500">Active</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {subscriptions.filter((sub) => !sub.isActive).length}
                  </div>
                  <div className="text-sm text-gray-500">Inactive</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {thisMonthCount}
                  </div>
                  <div className="text-sm text-gray-500">This Month</div>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search by email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={filterActive}
                  onChange={(e) => setFilterActive(e.target.value)}
                  className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Subscriptions</option>
                  <option value="active">Active Only</option>
                  <option value="inactive">Inactive Only</option>
                </select>
              </div>
            </div>

            {/* Subscriptions List */}
            <div className="overflow-hidden bg-white shadow sm:rounded-md">
              {filteredSubscriptions.length === 0 ? (
                <div className="py-12 text-center">
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No subscriptions found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchTerm || filterActive !== "all"
                      ? "Try adjusting your search or filter criteria."
                      : "Get started by adding a new subscription."}
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {filteredSubscriptions.map((subscription) => (
                    <li
                      key={subscription.id}
                      className="p-6 hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div
                              className={`h-3 w-3 rounded-full ${subscription.isActive ? "bg-green-500" : "bg-red-500"}`}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {subscription.email}
                            </div>
                            <div className="text-sm text-gray-500">
                              Subscribed: {formatDate(subscription.subscribedAt)}
                            </div>
                            <div className="text-xs text-gray-400">
                              Source: {subscription.source || "Unknown"} -
                              Status:{" "}
                              {subscription.isActive ? "Active" : "Inactive"}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <form action={toggleActiveAction}>
                            <input
                              type="hidden"
                              name="id"
                              value={subscription.id}
                            />
                            <input
                              type="hidden"
                              name="currentlyActive"
                              value={String(subscription.isActive)}
                            />
                            <button
                              type="submit"
                              className={`rounded-full px-3 py-1 text-xs font-medium ${
                                subscription.isActive
                                  ? "bg-red-100 text-red-800 hover:bg-red-200"
                                  : "bg-green-100 text-green-800 hover:bg-green-200"
                              }`}
                            >
                              {subscription.isActive
                                ? "Deactivate"
                                : "Activate"}
                            </button>
                          </form>
                          <button
                            onClick={() => handleEdit(subscription)}
                            className="p-2 text-blue-600 hover:text-blue-800"
                            type="button"
                          >
                            <svg
                              className="h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <form
                            action={deleteAction}
                            className="inline"
                            onSubmit={(e) => {
                              if (
                                !window.confirm(
                                  "Are you sure you want to delete this subscription?",
                                )
                              ) {
                                e.preventDefault();
                              }
                            }}
                          >
                            <input
                              type="hidden"
                              name="id"
                              value={subscription.id}
                            />
                            <button
                              type="submit"
                              className="p-2 text-red-600 hover:text-red-800"
                            >
                              <svg
                                className="h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </form>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : (
          /* Form Tab */
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="mb-4 text-lg font-medium leading-6 text-gray-900">
                {editingId ? "Edit Subscription" : "Add New Subscription"}
              </h3>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="emailAddress"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="emailAddress"
                    id="emailAddress"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    id="isActive"
                    checked={formIsActive}
                    onChange={(e) => setFormIsActive(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="isActive"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Active subscription
                  </label>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setActiveTab("list");
                    }}
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {isSubmitting
                      ? "Saving..."
                      : editingId
                        ? "Update Subscription"
                        : "Add Subscription"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
