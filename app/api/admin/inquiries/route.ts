import { NextResponse } from "next/server";

import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import {
  listConsultationRequests,
  listContactSubmissions,
  listDemoRequests,
} from "@/lib/data/inquiries";

export async function GET(request: Request) {
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
        error: "Only super admins can access inquiries.",
      },
      { status: 403 },
    );
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  if (type === "contact") {
    return NextResponse.json(await listContactSubmissions());
  }

  if (type === "demo") {
    return NextResponse.json(await listDemoRequests());
  }

  if (type === "consultation") {
    return NextResponse.json(await listConsultationRequests());
  }

  return NextResponse.json(
    {
      error: "Choose a valid inquiry type.",
    },
    { status: 400 },
  );
}
