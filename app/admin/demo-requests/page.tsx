import { redirect } from "next/navigation";

type DemoRedirectPageProps = {
  searchParams?: Promise<{
    query?: string;
    source?: string;
    status?: string;
  }>;
};

export default async function DemoRedirectPage({
  searchParams,
}: DemoRedirectPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const nextSearchParams = new URLSearchParams();
  nextSearchParams.set("type", "demo");

  for (const [key, value] of Object.entries(resolvedSearchParams)) {
    if (!value) {
      continue;
    }

    nextSearchParams.set(key, value);
  }

  redirect(`/admin/inquiries?${nextSearchParams.toString()}`);
}
