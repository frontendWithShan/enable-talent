import { redirect } from "next/navigation";

type ContactRedirectPageProps = {
  searchParams?: Promise<{
    category?: string;
    query?: string;
    source?: string;
    status?: string;
  }>;
};

export default async function ContactRedirectPage({
  searchParams,
}: ContactRedirectPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const nextSearchParams = new URLSearchParams();
  nextSearchParams.set("type", "contact");

  for (const [key, value] of Object.entries(resolvedSearchParams)) {
    if (!value) {
      continue;
    }

    nextSearchParams.set(key, value);
  }

  redirect(`/admin/inquiries?${nextSearchParams.toString()}`);
}
