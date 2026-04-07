import { NextResponse } from "next/server";

import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import { getJobApplicationById } from "@/lib/data/applications";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { RESUME_BUCKET } from "@/lib/careers/resumes";

type ResumeDownloadRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: Request,
  { params }: ResumeDownloadRouteProps,
) {
  const viewer = await getAuthenticatedAdmin();

  if (!viewer) {
    return NextResponse.json(
      {
        error: "Authentication is required.",
      },
      {
        status: 401,
      },
    );
  }

  if (viewer.role !== "super_admin") {
    return NextResponse.json(
      {
        error: "You do not have permission to access resumes.",
      },
      {
        status: 403,
      },
    );
  }

  const { id } = await params;
  const application = await getJobApplicationById(id);

  if (!application?.resumePath) {
    return NextResponse.json(
      {
        error: "This application does not have a stored resume.",
      },
      {
        status: 404,
      },
    );
  }

  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase.storage
    .from(RESUME_BUCKET)
    .createSignedUrl(application.resumePath, 60);

  if (error || !data?.signedUrl) {
    return NextResponse.json(
      {
        error: "The resume could not be opened right now.",
      },
      {
        status: 500,
      },
    );
  }

  return NextResponse.redirect(new URL(data.signedUrl, request.url));
}
