type InquirySubmissionResult = {
  error?: string;
  id?: string;
  success: boolean;
};

type ContactSubmissionInput = {
  company?: string | null;
  email: string;
  fullName: string;
  inquiryType?: string | null;
  message: string;
  phone?: string | null;
  source?: string;
  subject: string;
};

type DemoRequestInput = {
  company: string;
  email: string;
  fullName?: string;
  message: string;
  name?: string;
  phone?: string | null;
  source?: string;
};

type ConsultationRequestInput = {
  company?: string | null;
  companyName?: string | null;
  email: string;
  fullName?: string;
  message?: string | null;
  name?: string;
  phone?: string | null;
  preferredDate?: string | null;
  preferredTime?: string | null;
  source?: string;
};

async function submitInquiry(payload: Record<string, unknown>) {
  const response = await fetch("/api/inquiries", {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const result = (await response.json()) as InquirySubmissionResult;

  if (!response.ok) {
    return {
      error: result?.error || "Something went wrong. Please try again.",
      success: false,
    } satisfies InquirySubmissionResult;
  }

  return {
    id: result?.id,
    success: true,
  } satisfies InquirySubmissionResult;
}

export function submitContactForm(input: ContactSubmissionInput) {
  return submitInquiry({
    company: input.company ?? null,
    email: input.email,
    fullName: input.fullName,
    inquiryType: input.inquiryType ?? null,
    kind: "contact",
    message: input.message,
    phone: input.phone ?? null,
    source: input.source || "website",
    subject: input.subject,
  });
}

export function submitDemoRequest(input: DemoRequestInput) {
  return submitInquiry({
    company: input.company,
    email: input.email,
    fullName: input.fullName ?? input.name,
    kind: "demo",
    message: input.message,
    phone: input.phone ?? null,
    source: input.source || "website",
  });
}

export function submitConsultationRequest(input: ConsultationRequestInput) {
  return submitInquiry({
    company: input.company ?? input.companyName ?? null,
    email: input.email,
    fullName: input.fullName ?? input.name,
    kind: "consultation",
    message: input.message ?? null,
    phone: input.phone ?? null,
    preferredDate: input.preferredDate ?? null,
    preferredTime: input.preferredTime ?? null,
    source: input.source || "website",
  });
}
