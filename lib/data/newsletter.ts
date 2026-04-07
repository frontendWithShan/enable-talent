import "server-only";

import {
  createDataAdminClient,
  ensureNoError,
  requireRecord,
  stripUndefinedFields,
} from "./shared";
import type {
  CreateNewsletterSubscriptionInput,
  NewsletterSubscriptionRecord,
  UpdateNewsletterSubscriptionInput,
} from "./types";

type NewsletterSubscriptionRow = {
  email: string;
  id: string;
  is_active: boolean;
  source: string;
  subscribed_at: string;
  updated_at: string;
};

const NEWSLETTER_SELECT = [
  "id",
  "email",
  "is_active",
  "source",
  "subscribed_at",
  "updated_at",
].join(", ");

function mapRow(row: NewsletterSubscriptionRow): NewsletterSubscriptionRecord {
  return {
    email: row.email,
    id: row.id,
    isActive: row.is_active,
    source: row.source,
    subscribedAt: row.subscribed_at,
    updatedAt: row.updated_at,
  };
}

function toPayload(
  input: CreateNewsletterSubscriptionInput | UpdateNewsletterSubscriptionInput,
) {
  return stripUndefinedFields({
    email: input.email,
    is_active: input.isActive,
    source: input.source,
  });
}

export async function createNewsletterSubscription(
  input: CreateNewsletterSubscriptionInput,
) {
  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("newsletter_subscriptions")
    .insert(toPayload(input))
    .select(NEWSLETTER_SELECT)
    .single();

  ensureNoError(error);

  return mapRow(
    requireRecord(
      data as unknown as NewsletterSubscriptionRow | null,
      "newsletter subscription",
    ),
  );
}

export async function listNewsletterSubscriptions() {
  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("newsletter_subscriptions")
    .select(NEWSLETTER_SELECT)
    .order("subscribed_at", { ascending: false });

  ensureNoError(error);

  return (data ?? []).map((row) =>
    mapRow(row as unknown as NewsletterSubscriptionRow),
  );
}

export async function getNewsletterSubscriptionById(id: string) {
  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("newsletter_subscriptions")
    .select(NEWSLETTER_SELECT)
    .eq("id", id)
    .maybeSingle();

  ensureNoError(error);

  return data
    ? mapRow(data as unknown as NewsletterSubscriptionRow)
    : null;
}

export async function updateNewsletterSubscription(
  id: string,
  input: UpdateNewsletterSubscriptionInput,
) {
  const updates = toPayload(input);

  if (Object.keys(updates).length === 0) {
    return requireRecord(
      await getNewsletterSubscriptionById(id),
      `newsletter subscription ${id}`,
    );
  }

  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("newsletter_subscriptions")
    .update(updates)
    .eq("id", id)
    .select(NEWSLETTER_SELECT)
    .single();

  ensureNoError(error);

  return mapRow(
    requireRecord(
      data as unknown as NewsletterSubscriptionRow | null,
      `newsletter subscription ${id}`,
    ),
  );
}

export async function deleteNewsletterSubscription(id: string) {
  const supabase = createDataAdminClient();
  const { error } = await supabase
    .from("newsletter_subscriptions")
    .delete()
    .eq("id", id);
  ensureNoError(error);
}
