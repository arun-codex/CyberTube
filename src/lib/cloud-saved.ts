import { localSavedService, syncSavedWithCloud, getStudySavedItems } from './saved';

export interface StudyBookmarkItem {
  id: string;
  documentId: string;
  pageNumber: number;
  title: string | null;
  createdAt: string;
}

export class CloudBookmarkService {
  async getSavedIds(): Promise<string[]> {
    return (await syncSavedWithCloud()).savedIds;
  }
  async getStudyBookmarks(): Promise<StudyBookmarkItem[]> {
    if (typeof window === 'undefined') return [];
    const response = await fetch('/api/user/saved', { cache: 'no-store' });
    if (!response.ok) throw new Error('Unable to load PDF bookmarks. Please retry.');
    const data = await response.json();
    const rows = Array.isArray(data.studyBookmarks) ? data.studyBookmarks : [];
    // The local view includes pending saves and hides pending removals.
    return getStudySavedItems().map(item => {
      const row = rows.find((b: any) => b.document_id === item.documentId && b.page_number === item.pageNumber);
      return { id: row?.id || `study:${item.documentId}:${item.pageNumber}`, ...item,
        title: row?.title || null, createdAt: row?.created_at || '' };
    });
  }
  async toggleBookmark(resourceId: string): Promise<boolean> {
    return localSavedService.toggle(resourceId);
  }
  async syncLocalBookmarksToCloud() {
    const result = await syncSavedWithCloud();
    return { synced: result.syncedCount, total: result.savedIds.length,
      authenticated: result.authenticated, complete: result.synced, error: result.error };
  }
}
export const cloudSavedService = new CloudBookmarkService();
