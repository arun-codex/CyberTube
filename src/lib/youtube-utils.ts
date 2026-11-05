/**
 * Universal utility functions and types for YouTube metadata parsing.
 * Can be safely imported across client, server, and test runtimes.
 */

export interface YouTubePlaylistItemSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails?: Record<string, { url: string; width: number; height: number }>;
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: {
    kind: string;
    videoId: string;
  };
  videoOwnerChannelTitle?: string;
  videoOwnerChannelId?: string;
}

export interface YouTubePlaylistItem {
  kind: string;
  etag: string;
  id: string;
  snippet: YouTubePlaylistItemSnippet;
  contentDetails?: {
    videoId: string;
    videoPublishedAt?: string;
  };
  status?: {
    privacyStatus: string;
  };
}

export interface YouTubeVideoItem {
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    channelTitle: string;
    tags?: string[];
    thumbnails?: Record<string, { url: string }>;
  };
  contentDetails: {
    duration: string; // ISO 8601, e.g. PT36M2S
    dimension?: string;
    definition?: string;
    caption?: string;
  };
  status: {
    uploadStatus: string;
    privacyStatus: string;
    embeddable: boolean;
    license?: string;
    publicStatsViewable?: boolean;
  };
}

export interface SyncStats {
  playlistId: string;
  courseId: string;
  totalPlaylistItems: number;
  availableVideos: number;
  newlyInsertedLessons: number;
  updatedLessons: number;
  unavailableVideos: number;
  removedVideos: number;
  failedItems: number;
  syncedAt: string;
}

export interface SyncResult {
  success: boolean;
  environment: string;
  stats?: SyncStats[];
  error?: string;
}

/**
 * Parses ISO 8601 duration string into seconds and rounded minutes.
 * E.g., 'PT36M2S' -> { totalSeconds: 2162, minutes: 36 }
 */
export function parseIso8601Duration(duration: string): { totalSeconds: number; minutes: number } {
  if (!duration) return { totalSeconds: 0, minutes: 0 };
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return { totalSeconds: 0, minutes: 0 };
  const hours = parseInt(match[1] || '0', 10);
  const mins = parseInt(match[2] || '0', 10);
  const secs = parseInt(match[3] || '0', 10);
  const totalSeconds = hours * 3600 + mins * 60 + secs;
  const minutes = Math.round(totalSeconds / 60);
  return { totalSeconds, minutes };
}

/**
 * Parses learning sequence number from video title if present.
 * E.g., 'Networking for Hackers #1 | Introduction' -> 1
 */
export function parseLearningSequence(title: string): number | null {
  if (!title) return null;
  const match = title.match(/#(\d+)/);
  if (match) {
    return parseInt(match[1], 10);
  }
  return null;
}
