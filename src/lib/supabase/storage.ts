import { createAdminClient } from './admin';

/**
 * Generate a short-lived signed URL for a private storage asset.
 * Used by server-side routes that need to fetch the file or generate an authenticated access URL.
 */
export async function getSignedUrl(bucket: string, path: string, expiresIn = 60): Promise<string> {
  const admin = createAdminClient();
  if (!admin) {
    throw new Error('Supabase admin client unavailable.');
  }

  const { data, error } = await admin.storage
    .from(bucket)
    .createSignedUrl(path, expiresIn);

  if (error || !data?.signedUrl) {
    throw new Error(`Signed URL generation failed: ${error?.message || 'Unknown error'}`);
  }

  return data.signedUrl;
}
