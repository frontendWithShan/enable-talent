import { redirect } from "next/navigation";

type ConsultationRedirectPageProps = {
  searchParams?: Promise<{
    query?: string;
    source?: string;
    status?: string;
  }>;
};

export default async function ConsultationRedirectPage({
  searchParams,
}: ConsultationRedirectPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const nextSearchParams = new URLSearchParams();
  nextSearchParams.set("type", "consultation");

  for (const [key, value] of Object.entries(resolvedSearchParams)) {
    if (!value) {
      continue;
    }

    nextSearchParams.set(key, value);
  }

  redirect(`/admin/inquiries?${nextSearchParams.toString()}`);
}
