"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

type DashboardStatsResponse = {
  activeJobs: number;
  activeSubscriptions: number;
  newConnectWithUsSubmissions: number;
  newContactSubmissions: number;
  pendingConsultationRequests: number;
  pendingDemoRequests: number;
  pendingJobApplications: number;
  pendingVolunteerApplications: number;
  totalBlogs: number;
  totalConnectWithUsSubmissions: number;
  totalConsultationRequests: number;
  totalContactSubmissions: number;
  totalDemoRequests: number;
  totalJobApplications: number;
  totalJobs: number;
  totalSubscriptions: number;
  totalVolunteerApplications: number;
};

const LINK_CLASSES =
  "inline-flex items-center gap-1 text-sm font-semibold text-[#7c2d12] underline decoration-2 underline-offset-2 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C27803] focus-visible:ring-offset-2 rounded-sm";

interface StatCardProps {
  label: string;
  value: number;
  subText: string;
  href: string;
  linkLabel: string;
  icon: React.ReactNode;
}

function StatCard({ label, value, subText, href, linkLabel, icon }: StatCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#e2e8f0] bg-white shadow-sm transition-all duration-150 hover:border-[#cbd5e1] hover:shadow-md">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center gap-4">
          <div
            aria-hidden="true"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-100"
          >
            {icon}
          </div>
          <dl className="min-w-0 flex-1">
            <dt className="truncate text-sm font-semibold text-[#334155]">{label}</dt>
            <dd>
              <span className="text-2xl font-bold text-[#1e293b]">{value}</span>
              <span className="ml-2 text-sm text-[#334155]">{subText}</span>
            </dd>
          </dl>
        </div>
      </div>
      <div className="border-t border-slate-200 bg-slate-50 px-4 py-3 sm:px-6">
        <Link
          href={href}
          className={LINK_CLASSES}
          aria-label={linkLabel}
        >
          {linkLabel}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalSubscriptions: 0,
    activeSubscriptions: 0,
    totalJobs: 0,
    activeJobs: 0,
    totalContactSubmissions: 0,
    newContactSubmissions: 0,
    totalConnectWithUsSubmissions: 0,
    newConnectWithUsSubmissions: 0,
    totalDemoRequests: 0,
    pendingDemoRequests: 0,
    totalConsultationRequests: 0,
    pendingConsultationRequests: 0,
    totalJobApplications: 0,
    pendingJobApplications: 0,
    totalVolunteerApplications: 0,
    pendingVolunteerApplications: 0,
  });
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/dashboard', { credentials: 'same-origin' });
        if (!res.ok) throw new Error('Unable to load dashboard metrics.');
        const data = (await res.json()) as DashboardStatsResponse;
        setStats({
          totalBlogs: data.totalBlogs,
          totalSubscriptions: data.totalSubscriptions,
          activeSubscriptions: data.activeSubscriptions,
          totalJobs: data.totalJobs,
          activeJobs: data.activeJobs,
          totalContactSubmissions: data.totalContactSubmissions,
          newContactSubmissions: data.newContactSubmissions,
          totalConnectWithUsSubmissions: data.totalConnectWithUsSubmissions,
          newConnectWithUsSubmissions: data.newConnectWithUsSubmissions,
          totalDemoRequests: data.totalDemoRequests,
          pendingDemoRequests: data.pendingDemoRequests,
          totalConsultationRequests: data.totalConsultationRequests,
          pendingConsultationRequests: data.pendingConsultationRequests,
          totalJobApplications: data.totalJobApplications,
          pendingJobApplications: data.pendingJobApplications,
          totalVolunteerApplications: data.totalVolunteerApplications,
          pendingVolunteerApplications: data.pendingVolunteerApplications,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        setFetchError("Could not load dashboard data. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const activePercent =
    stats.totalSubscriptions > 0
      ? `${Math.round((stats.activeSubscriptions / stats.totalSubscriptions) * 100)}% active`
      : 'No subscriptions yet';

  return (
    <div>
      {/* Page header */}
      <header className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-2xl font-bold text-[#1e293b] sm:text-3xl">Dashboard</h1>
        <p className="mt-1 text-sm text-[#334155]">
          Welcome to your administrative dashboard
        </p>
      </header>

      {/* Loading state — announced to screen readers */}
      {loading && (
        <div role="status" aria-live="polite" className="py-12 text-center">
          <div
            aria-hidden="true"
            className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900"
          />
          <p className="mt-4 text-sm font-semibold text-[#334155]">Loading dashboard data...</p>
        </div>
      )}

      {/* Error state */}
      {!loading && fetchError && (
        <div
          role="alert"
          className="rounded-lg border border-[#991b1b] bg-red-50 p-4 text-sm font-semibold text-[#991b1b]"
        >
          {fetchError}
        </div>
      )}

      {/* Dashboard content */}
      {!loading && !fetchError && (
        <>
          {/* Overview */}
          <section aria-labelledby="overview-heading" className="mb-10">
            <h2
              id="overview-heading"
              className="mb-6 border-b border-slate-200 pb-2 text-lg font-bold text-[#1e293b]"
            >
              Overview
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <StatCard
                label="Job Openings"
                value={stats.totalJobs}
                subText={`${stats.activeJobs} active`}
                href="/admin/careers"
                linkLabel="Manage careers"
                icon={
                  <svg className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V6a2 2 0 012 2v6" />
                  </svg>
                }
              />

              <StatCard
                label="Newsletter Subscribers"
                value={stats.totalSubscriptions}
                subText={activePercent}
                href="/admin/newsletter"
                linkLabel="Manage subscribers"
                icon={
                  <svg className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
              />

              <StatCard
                label="Contact Submissions"
                value={stats.totalContactSubmissions}
                subText={`${stats.newContactSubmissions} new`}
                href="/admin/inquiries?type=contact"
                linkLabel="Manage contact submissions"
                icon={
                  <svg className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                }
              />

              <StatCard
                label="Connect With Us"
                value={stats.totalConnectWithUsSubmissions}
                subText={`${stats.newConnectWithUsSubmissions} new`}
                href="/admin/inquiries?type=contact&source=footer-connect-with-us"
                linkLabel="View connect submissions"
                icon={
                  <svg className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
              />

              <StatCard
                label="Demo Requests"
                value={stats.totalDemoRequests}
                subText={`${stats.pendingDemoRequests} pending`}
                href="/admin/inquiries?type=demo"
                linkLabel="Manage demo requests"
                icon={
                  <svg className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                }
              />

              <StatCard
                label="Consultation Requests"
                value={stats.totalConsultationRequests}
                subText={`${stats.pendingConsultationRequests} pending`}
                href="/admin/inquiries?type=consultation"
                linkLabel="Manage consultation requests"
                icon={
                  <svg className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4h6m-6 4h6m-6 4h6" />
                  </svg>
                }
              />

              <StatCard
                label="Job Applications"
                value={stats.totalJobApplications}
                subText={`${stats.pendingJobApplications} pending review`}
                href="/admin/job-applications"
                linkLabel="Manage job applications"
                icon={
                  <svg className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
              />

              <StatCard
                label="Volunteer Applications"
                value={stats.totalVolunteerApplications}
                subText={`${stats.pendingVolunteerApplications} pending review`}
                href="/admin/volunteer-applications"
                linkLabel="Manage volunteer applications"
                icon={
                  <svg className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                }
              />
            </div>
          </section>

          {/* Content Management */}
          <section aria-labelledby="content-heading" className="mb-10">
            <h2
              id="content-heading"
              className="mb-6 border-b border-slate-200 pb-2 text-lg font-bold text-[#1e293b]"
            >
              Content Management
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <StatCard
                label="Blog Posts"
                value={stats.totalBlogs}
                subText="published articles"
                href="/admin/blogs"
                linkLabel="Manage blog posts"
                icon={
                  <svg className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                }
              />

              {/* Quick Actions */}
              <div className="overflow-hidden rounded-lg border border-[#e2e8f0] bg-white shadow-sm transition-all duration-150 hover:border-[#cbd5e1] hover:shadow-md">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="mb-4 text-base font-bold text-[#1e293b]">Quick Actions</h3>
                  <nav aria-label="Quick actions">
                    <ul className="divide-y divide-slate-100">
                      {[
                        {
                          href: "/admin/blogs/new",
                          label: "Create new blog post",
                          icon: (
                            <svg aria-hidden="true" className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          ),
                        },
                        {
                          href: "/admin/careers",
                          label: "Post new job opening",
                          icon: (
                            <svg aria-hidden="true" className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                            </svg>
                          ),
                        },
                        {
                          href: "/admin/newsletter",
                          label: "Manage newsletter",
                          icon: (
                            <svg aria-hidden="true" className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          ),
                        },
                        {
                          href: "/admin/inquiries?type=contact",
                          label: "Review contact submissions",
                          icon: (
                            <svg aria-hidden="true" className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                          ),
                        },
                        {
                          href: "/admin/inquiries?type=demo",
                          label: "Manage demo requests",
                          icon: (
                            <svg aria-hidden="true" className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          ),
                        },
                        {
                          href: "/admin/job-applications",
                          label: "Review job applications",
                          icon: (
                            <svg aria-hidden="true" className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          ),
                        },
                        {
                          href: "/",
                          label: "View website",
                          icon: (
                            <svg aria-hidden="true" className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          ),
                        },
                      ].map(({ href, label, icon }) => (
                        <li key={href} className="py-2.5">
                          <Link
                            href={href}
                            className="flex items-center gap-3 rounded-sm text-sm font-semibold text-[#7c2d12] underline decoration-2 underline-offset-2 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C27803] focus-visible:ring-offset-2"
                          >
                            {icon}
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section aria-labelledby="activity-heading" className="mb-6">
            <h2
              id="activity-heading"
              className="mb-6 border-b border-slate-200 pb-2 text-lg font-bold text-[#1e293b]"
            >
              Recent Activity
            </h2>
            <div className="overflow-hidden rounded-lg border border-[#e2e8f0] bg-white shadow-sm transition-all duration-150 hover:border-[#cbd5e1] hover:shadow-md">
              <div className="px-4 py-10 text-center sm:p-6">
                <svg
                  aria-hidden="true"
                  className="mx-auto h-10 w-10 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="mt-3 text-sm font-semibold text-[#1e293b]">No recent activity</p>
                <p className="mt-1 text-sm text-[#334155]">
                  Activity will appear here as you manage the website.
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
