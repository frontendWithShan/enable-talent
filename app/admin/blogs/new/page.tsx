import BlogEditorForm from "@/components/admin/blogs/BlogEditorForm";
import NewPostTypePage from "@/components/admin/blogs/NewPostTypePage";
import { requireAdminAccess } from "@/lib/auth/admin";
import type { ContentSourceType } from "@/lib/data/types";

import { createBlogPostAction } from "../actions";

type NewBlogPostPageProps = {
  searchParams?: Promise<{
    type?: string;
  }>;
};

function normalizeSourceType(value: string | undefined): ContentSourceType | null {
  if (value === "internal_article" || value === "external_link") {
    return value;
  }

  return null;
}

export default async function NewBlogPostPage({
  searchParams,
}: NewBlogPostPageProps) {
  const viewer = await requireAdminAccess("/admin/blogs/new");
  const resolvedSearchParams = (await searchParams) ?? {};
  const initialSourceType = normalizeSourceType(resolvedSearchParams.type);

  if (!initialSourceType) {
    return <NewPostTypePage />;
  }

  return (
    <BlogEditorForm
      action={createBlogPostAction}
      initialSourceType={initialSourceType}
      mode="create"
      viewer={viewer}
    />
  );
}
