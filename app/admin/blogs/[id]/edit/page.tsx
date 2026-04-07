import { notFound, redirect } from "next/navigation";

import BlogEditorForm from "@/components/admin/blogs/BlogEditorForm";
import { requireAdminAccess } from "@/lib/auth/admin";
import { getPostById } from "@/lib/data/posts";
import { canEditBlogPost } from "@/lib/blogs/permissions";

import {
  archiveBlogPostAction,
  deleteBlogPostAction,
  updateBlogPostAction,
} from "../../actions";

type EditBlogPostPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditBlogPostPage({
  params,
}: EditBlogPostPageProps) {
  const viewer = await requireAdminAccess("/admin/blogs");
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  if (!canEditBlogPost(viewer, post)) {
    redirect("/admin/forbidden");
  }

  return (
    <BlogEditorForm
      action={updateBlogPostAction.bind(null, post.id)}
      archiveAction={archiveBlogPostAction.bind(
        null,
        post.id,
        `/admin/blogs/${post.id}/edit`,
      )}
      deleteAction={deleteBlogPostAction.bind(
        null,
        post.id,
        `/admin/blogs/${post.id}/edit`,
      )}
      mode="edit"
      post={post}
      viewer={viewer}
    />
  );
}
