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
    await syncSavedWithCloud();
    return getStudySavedItems().map(item => ({
      ...item, id: `study:${item.documentId}:${item.pageNumber}`,
    }));
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
