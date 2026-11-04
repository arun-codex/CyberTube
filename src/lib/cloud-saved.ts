import { createClient } from './supabase/client';
import { localSavedService } from './saved';
import { Resource } from '@/types/resource';

/**
 * CloudBookmarkService
 * Integrates client-side Supabase bookmark operations while falling back gracefully
 * to localSavedService if the user is unauthenticated or Supabase is unconfigured.
 */
export class CloudBookmarkService {
  private supabase = createClient();

  /**
   * Retrieves user's bookmarks from Supabase if logged in, otherwise from localStorage.
   */
  async getSavedIds(): Promise<string[]> {
    if (!this.supabase) {
      return localSavedService.getSavedIds();
    }

    try {
      const { data: { user } } = await this.supabase.auth.getUser();
      if (!user) {
        return localSavedService.getSavedIds();
      }

      const { data, error } = await this.supabase
        .from('bookmarks')
        .select('resource_id')
        .eq('user_id', user.id) as { data: Array<{ resource_id: string }> | null; error: any };

      if (error || !data) {
        return localSavedService.getSavedIds();
      }

      return data.map((b) => b.resource_id);
    } catch {
      return localSavedService.getSavedIds();
    }
  }

  /**
   * Toggles bookmark state (cloud if logged in, local if guest).
   */
  async toggleBookmark(resourceId: string): Promise<boolean> {
    if (!this.supabase) {
      return localSavedService.toggle(resourceId);
    }

    try {
      const { data: { user } } = await this.supabase.auth.getUser();
      if (!user) {
        return localSavedService.toggle(resourceId);
      }

      // Check if already bookmarked
      const { data: existing } = await this.supabase
        .from('bookmarks')
        .select('id')
        .eq('user_id', user.id)
        .eq('resource_id', resourceId)
        .single() as { data: any };

      if (existing) {
        // Remove
        await this.supabase
          .from('bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('resource_id', resourceId);

        // Also update local for offline redundancy
        localSavedService.remove(resourceId);
        return false;
      } else {
        // Add
        await (this.supabase.from('bookmarks') as any)
          .insert({ user_id: user.id, resource_id: resourceId });

        localSavedService.save(resourceId);
        return true;
      }
    } catch {
      return localSavedService.toggle(resourceId);
    }
  }

  /**
   * Synchronizes existing localStorage bookmarks into the authenticated user's cloud account.
   * Keeps local records safe until cloud confirmation.
   */
  async syncLocalBookmarksToCloud(): Promise<{ synced: number; total: number }> {
    if (!this.supabase) return { synced: 0, total: 0 };

    const { data: { user } } = await this.supabase.auth.getUser();
    if (!user) return { synced: 0, total: 0 };

    const localIds = localSavedService.getSavedIds();
    if (localIds.length === 0) return { synced: 0, total: 0 };

    // Fetch existing cloud bookmark IDs
    const { data: cloudBookmarks } = await this.supabase
      .from('bookmarks')
      .select('resource_id')
      .eq('user_id', user.id) as { data: Array<{ resource_id: string }> | null };

    const existingCloudIds = new Set((cloudBookmarks || []).map((b) => b.resource_id));
    const toInsert = localIds.filter((id) => !existingCloudIds.has(id));

    if (toInsert.length > 0) {
      const rows = toInsert.map((id) => ({
        user_id: user.id,
        resource_id: id,
      }));

      const { error } = await (this.supabase.from('bookmarks') as any).insert(rows);
      if (!error) {
        return { synced: toInsert.length, total: localIds.length };
      }
    }

    return { synced: 0, total: localIds.length };
  }
}

export const cloudSavedService = new CloudBookmarkService();

