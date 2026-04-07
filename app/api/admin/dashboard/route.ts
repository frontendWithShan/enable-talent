import { NextResponse } from "next/server";

import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import { listJobApplications } from "@/lib/data/applications";
import { listContactSubmissions, listConsultationRequests, listDemoRequests } from "@/lib/data/inquiries";
import { listJobsForAdmin } from "@/lib/data/jobs";
import { listNewsletterSubscriptions } from "@/lib/data/newsletter";
import { listPostsForAdmin } from "@/lib/data/posts";
import { listVolunteerApplications } from "@/lib/data/volunteers";

export const dynamic = "force-dynamic";

export async function GET() {
  const viewer = await getAuthenticatedAdmin();

  if (!viewer) {
    return NextResponse.json(
      {
        error: "Authentication is required.",
      },
      { status: 401 },
    );
  }

  if (viewer.role !== "super_admin") {
    return NextResponse.json(
      {
        error: "Only super admins can access dashboard metrics.",
      },
      { status: 403 },
    );
  }

  const [blogs, jobs, contactSubmissions, demoRequests, consultationRequests, jobApplications, newsletterSubscriptions, volunteerApplications] =
    await Promise.all([
      listPostsForAdmin(),
      listJobsForAdmin(),
      listContactSubmissions(),
      listDemoRequests(),
      listConsultationRequests(),
      listJobApplications(),
      listNewsletterSubscriptions(),
      listVolunteerApplications(),
    ]);

  const connectWithUsSubmissions = contactSubmissions.filter(
    (submission) => submission.source === "footer-connect-with-us",
  );

  return NextResponse.json(
    {
      activeJobs: jobs.filter((job) => job.isActive && job.status === "published").length,
      activeSubscriptions: newsletterSubscriptions.filter((sub) => sub.isActive).length,
      newConnectWithUsSubmissions: connectWithUsSubmissions.filter(
        (submission) => submission.status === "new",
      ).length,
      newContactSubmissions: contactSubmissions.filter(
        (submission) => submission.status === "new",
      ).length,
      pendingConsultationRequests: consultationRequests.filter(
        (request) => request.status === "pending",
      ).length,
      pendingDemoRequests: demoRequests.filter(
        (request) => request.status === "pending",
      ).length,
      pendingJobApplications: jobApplications.filter(
        (application) => application.status === "pending",
      ).length,
      pendingVolunteerApplications: volunteerApplications.filter(
        (app) => app.status === "pending",
      ).length,
      totalBlogs: blogs.length,
      totalConnectWithUsSubmissions: connectWithUsSubmissions.length,
      totalConsultationRequests: consultationRequests.length,
      totalContactSubmissions: contactSubmissions.length,
      totalDemoRequests: demoRequests.length,
      totalJobApplications: jobApplications.length,
      totalJobs: jobs.length,
      totalSubscriptions: newsletterSubscriptions.length,
      totalVolunteerApplications: volunteerApplications.length,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
