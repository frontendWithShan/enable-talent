import { NextResponse } from "next/server";

import {
  createConsultationRequest,
  createContactSubmission,
  createDemoRequest,
} from "@/lib/data/inquiries";

type InquiryKind = "consultation" | "contact" | "demo";

function normalizeText(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function buildErrorResponse(message: string, status = 400) {
  return NextResponse.json(
    {
      error: message,
      success: false,
    },
    { status },
  );
}

function getInquiryKind(value: unknown): InquiryKind | null {
  if (
    value === "consultation" ||
    value === "contact" ||
    value === "demo"
  ) {
    return value;
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const kind = getInquiryKind(body?.kind);

    if (!kind) {
      return buildErrorResponse("A valid inquiry type is required.");
    }

    if (kind === "contact") {
      const fullName = normalizeText(body?.fullName);
      const email = normalizeText(body?.email);
      const subject = normalizeText(body?.subject);
      const message = normalizeText(body?.message);

      if (!fullName || !email || !subject || !message) {
        return buildErrorResponse("Full name, email, subject, and message are required.");
      }

      const inquiry = await createContactSubmission({
        company: normalizeText(body?.company),
        email,
        fullName,
        inquiryType: normalizeText(body?.inquiryType),
        message,
        phone: normalizeText(body?.phone),
        source: normalizeText(body?.source) ?? "website",
        status: "new",
        subject,
      });

      return NextResponse.json({
        id: inquiry.id,
        success: true,
      });
    }

    if (kind === "demo") {
      const fullName = normalizeText(body?.fullName) ?? normalizeText(body?.name);
      const email = normalizeText(body?.email);
      const companyName =
        normalizeText(body?.companyName) ?? normalizeText(body?.company);
      const message = normalizeText(body?.message);

      if (!fullName || !email || !companyName || !message) {
        return buildErrorResponse(
          "Full name, work email, company, and message are required.",
        );
      }

      const inquiry = await createDemoRequest({
        companyName,
        email,
        fullName,
        message,
        phone: normalizeText(body?.phone),
        source: normalizeText(body?.source) ?? "website",
        status: "pending",
      });

      return NextResponse.json({
        id: inquiry.id,
        success: true,
      });
    }

    const fullName = normalizeText(body?.fullName) ?? normalizeText(body?.name);
    const email = normalizeText(body?.email);

    if (!fullName || !email) {
      return buildErrorResponse("Full name and email are required.");
    }

    const inquiry = await createConsultationRequest({
      companyName:
        normalizeText(body?.companyName) ?? normalizeText(body?.company),
      email,
      fullName,
      message: normalizeText(body?.message),
      phone: normalizeText(body?.phone),
      preferredDate: normalizeText(body?.preferredDate),
      preferredTime: normalizeText(body?.preferredTime),
      source: normalizeText(body?.source) ?? "website",
      status: "pending",
    });

    return NextResponse.json({
      id: inquiry.id,
      success: true,
    });
  } catch (error) {
    console.error("Failed to submit inquiry", error);
    return buildErrorResponse("Something went wrong. Please try again.", 500);
  }
}
