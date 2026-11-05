/**
 * Avatar Resolution and Synchronization Helpers
 * Provides unified avatar signed-URL resolution and cross-component updates.
 */

export const AVATAR_UPDATED_EVENT = 'cybertube:avatar-updated';

export interface AvatarUpdatedDetail {
  avatarUrl: string | null;
}

/**
 * Dispatches an event in the browser when the user's avatar is changed or reset.
 * All listening components (Header, Dropdown, Settings) update their view without a page reload.
 */
export function dispatchAvatarUpdated(avatarUrl: string | null) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent<AvatarUpdatedDetail>(AVATAR_UPDATED_EVENT, {
        detail: { avatarUrl },
      })
    );
  }
}

/**
 * Resolves a fresh signed URL for a profile's private avatar_path from Supabase Storage.
 * Falls back to profile.avatar_url (provider avatar) if no custom avatar_path exists
 * or if signed URL creation fails.
 */
export async function resolveProfileAvatarUrl(
  supabase: any,
  profile: { avatar_path?: string | null; avatar_url?: string | null } | null | undefined,
  expiresInSeconds: number = 3600
): Promise<string | null> {
  if (!supabase || !profile) return null;

  if (profile.avatar_path) {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .createSignedUrl(profile.avatar_path, expiresInSeconds);

      if (!error && data?.signedUrl) {
        return data.signedUrl;
      }
    } catch {
      // Fall through to provider avatar on storage errors
    }
  }

  return profile.avatar_url || null;
}

