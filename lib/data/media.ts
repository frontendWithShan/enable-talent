import "server-only";

import {
  createDataAdminClient,
  ensureNoError,
  requireRecord,
  stripUndefinedFields,
  toNullableNumber,
} from "./shared";
import type {
  CreateMediaAssetInput,
  MediaAssetRecord,
  MediaKind,
  UpdateMediaAssetOwnerInput,
} from "./types";

type MediaAssetRow = {
  bucket_name: string;
  created_at: string;
  file_name: string;
  id: string;
  job_application_id: string | null;
  kind: MediaKind;
  mime_type: string | null;
  object_path: string;
  post_id: string | null;
  public_url: string | null;
  size_bytes: number | string | null;
  updated_at: string;
  uploaded_by: string | null;
  volunteer_application_id: string | null;
};

const MEDIA_SELECT = [
  "id",
  "kind",
  "bucket_name",
  "object_path",
  "file_name",
  "mime_type",
  "size_bytes",
  "public_url",
  "uploaded_by",
  "post_id",
  "job_application_id",
  "volunteer_application_id",
  "created_at",
  "updated_at",
].join(", ");

function mapMediaRow(row: MediaAssetRow): MediaAssetRecord {
  return {
    bucketName: row.bucket_name,
    createdAt: row.created_at,
    fileName: row.file_name,
    id: row.id,
    jobApplicationId: row.job_application_id,
    kind: row.kind,
    mimeType: row.mime_type,
    objectPath: row.object_path,
    postId: row.post_id,
    publicUrl: row.public_url,
    sizeBytes: toNullableNumber(row.size_bytes),
    updatedAt: row.updated_at,
    uploadedBy: row.uploaded_by,
    volunteerApplicationId: row.volunteer_application_id,
  };
}

function toMediaPayload(input: CreateMediaAssetInput | UpdateMediaAssetOwnerInput) {
  return stripUndefinedFields({
    bucket_name: "bucketName" in input ? input.bucketName : undefined,
    file_name: "fileName" in input ? input.fileName : undefined,
    job_application_id: input.jobApplicationId,
    kind: "kind" in input ? input.kind : undefined,
    mime_type: "mimeType" in input ? input.mimeType : undefined,
    object_path: "objectPath" in input ? input.objectPath : undefined,
    post_id: input.postId,
    public_url: "publicUrl" in input ? input.publicUrl : undefined,
    size_bytes: "sizeBytes" in input ? input.sizeBytes : undefined,
    uploaded_by: "uploadedBy" in input ? input.uploadedBy : undefined,
    volunteer_application_id: input.volunteerApplicationId,
  });
}

export async function createMediaAsset(input: CreateMediaAssetInput) {
  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("media_assets")
    .insert(toMediaPayload(input))
    .select(MEDIA_SELECT)
    .single();

  ensureNoError(error);

  return mapMediaRow(
    requireRecord(data as unknown as MediaAssetRow | null, "media asset"),
  );
}

export async function getMediaAssetById(id: string) {
  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("media_assets")
    .select(MEDIA_SELECT)
    .eq("id", id)
    .maybeSingle();

  ensureNoError(error);

  return data ? mapMediaRow(data as unknown as MediaAssetRow) : null;
}

export async function getMediaAssetByPath(bucketName: string, objectPath: string) {
  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("media_assets")
    .select(MEDIA_SELECT)
    .eq("bucket_name", bucketName)
    .eq("object_path", objectPath)
    .maybeSingle();

  ensureNoError(error);

  return data ? mapMediaRow(data as unknown as MediaAssetRow) : null;
}

export async function attachMediaAssetOwner(
  id: string,
  owner: UpdateMediaAssetOwnerInput,
) {
  const updates = toMediaPayload(owner);

  if (Object.keys(updates).length === 0) {
    return requireRecord(await getMediaAssetById(id), `media asset ${id}`);
  }

  const supabase = createDataAdminClient();
  const { data, error } = await supabase
    .from("media_assets")
    .update(updates)
    .eq("id", id)
    .select(MEDIA_SELECT)
    .single();

  ensureNoError(error);

  return mapMediaRow(
    requireRecord(data as unknown as MediaAssetRow | null, `media asset ${id}`),
  );
}

export async function detachMediaAssetOwner(id: string) {
  return attachMediaAssetOwner(id, {
    jobApplicationId: null,
    postId: null,
    volunteerApplicationId: null,
  });
}

export async function listMediaAssets(kind?: MediaKind) {
  const supabase = createDataAdminClient();
  let query = supabase
    .from("media_assets")
    .select(MEDIA_SELECT)
    .order("created_at", { ascending: false });

  if (kind) {
    query = query.eq("kind", kind);
  }

  const { data, error } = await query;
  ensureNoError(error);

  return (data ?? []).map((row) => mapMediaRow(row as unknown as MediaAssetRow));
}

export async function deleteMediaAsset(id: string) {
  const supabase = createDataAdminClient();
  const { error } = await supabase.from("media_assets").delete().eq("id", id);
  ensureNoError(error);
}
