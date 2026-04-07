import { redirect } from "next/navigation";

import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import { listNewsletterSubscriptions } from "@/lib/data/newsletter";

import {
  addNewsletterSubscriptionAction,
  deleteNewsletterSubscriptionAction,
  toggleNewsletterActiveAction,
  updateNewsletterSubscriptionAction,
} from "./actions";
import NewsletterAdminClient from "./NewsletterAdminClient";

export const dynamic = "force-dynamic";

export default async function NewsletterAdminPage() {
  const viewer = await getAuthenticatedAdmin();

  if (!viewer) {
    redirect("/admin/login?next=%2Fadmin%2Fnewsletter");
  }

  if (viewer.role !== "super_admin") {
    redirect("/admin/forbidden");
  }

  const subscriptions = await listNewsletterSubscriptions();

  return (
    <NewsletterAdminClient
      subscriptions={subscriptions}
      addAction={addNewsletterSubscriptionAction}
      deleteAction={deleteNewsletterSubscriptionAction}
      toggleActiveAction={toggleNewsletterActiveAction}
      updateAction={updateNewsletterSubscriptionAction}
    />
  );
}
