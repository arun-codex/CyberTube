import 'server-only';
import { createAdminClient } from '@/lib/supabase/admin';
import {
  YouTubePlaylistItem,
  YouTubeVideoItem,
  SyncStats,
  SyncResult,
  parseIso8601Duration,
  parseLearningSequence,
} from '@/lib/youtube-utils';

export type {
  YouTubePlaylistItemSnippet,
  YouTubePlaylistItem,
  YouTubeVideoItem,
  SyncStats,
  SyncResult,
} from '@/lib/youtube-utils';

export { parseIso8601Duration, parseLearningSequence } from '@/lib/youtube-utils';

/**
 * Fetches all items from a YouTube playlist following pagination tokens.
 */
export async function fetchPlaylistItemsFromYouTube(
  playlistId: string,
  apiKey: string
): Promise<YouTubePlaylistItem[]> {
  const items: YouTubePlaylistItem[] = [];
  let nextPageToken: string | undefined = undefined;

  do {
    const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
    url.searchParams.set('part', 'snippet,contentDetails,status');
    url.searchParams.set('maxResults', '50');
    url.searchParams.set('playlistId', playlistId);
    url.searchParams.set('key', apiKey);
    if (nextPageToken) {
      url.searchParams.set('pageToken', nextPageToken);
    }

    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`YouTube playlistItems.list failed (${res.status}): ${errText}`);
    }

    const data = await res.json();
    if (Array.isArray(data.items)) {
      items.push(...data.items);
    }
    nextPageToken = data.nextPageToken;
  } while (nextPageToken);

  return items;
}

/**
 * Fetches video details for a list of video IDs in batches of up to 50.
 */
export async function fetchVideoDetailsFromYouTube(
  videoIds: string[],
  apiKey: string
): Promise<Map<string, YouTubeVideoItem>> {
  const results = new Map<string, YouTubeVideoItem>();
  if (videoIds.length === 0) return results;

  // Batch in chunks of 50
  for (let i = 0; i < videoIds.length; i += 50) {
    const chunk = videoIds.slice(i, i + 50);
    const url = new URL('https://www.googleapis.com/youtube/v3/videos');
    url.searchParams.set('part', 'snippet,contentDetails,status');
    url.searchParams.set('id', chunk.join(','));
    url.searchParams.set('key', apiKey);

    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`YouTube videos.list failed (${res.status}): ${errText}`);
    }

    const data = await res.json();
    if (Array.isArray(data.items)) {
      for (const item of data.items) {
        results.set(item.id, item);
      }
    }
  }

  return results;
}

/**
 * Executes idempotent synchronization of enabled YouTube playlists.
 */
export async function syncAllEnabledPlaylists(options?: {
  allowPreview?: boolean;
}): Promise<SyncResult> {
  const vercelEnv = process.env.VERCEL_ENV || process.env.NODE_ENV || 'development';

  // Guard against non-production preview deployments writing to production Supabase
  if (vercelEnv === 'preview' && !options?.allowPreview) {
    return {
      success: false,
      environment: vercelEnv,
      error: 'Playlist sync is disabled on Vercel Preview deployments to prevent modifying production database state.',
    };
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      environment: vercelEnv,
      error: 'YOUTUBE_API_KEY environment variable is not configured. Please set YOUTUBE_API_KEY in Vercel project settings.',
    };
  }

  const adminClient = createAdminClient();
  if (!adminClient) {
    return {
      success: false,
      environment: vercelEnv,
      error: 'Supabase admin client could not be initialized. Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL.',
    };
  }

  // 1. Fetch enabled playlist sources
  const { data: sources, error: sourcesError } = await (adminClient as any)
    .from('course_playlist_sources')
    .select('*')
    .eq('sync_enabled', true);

  if (sourcesError) {
    return {
      success: false,
      environment: vercelEnv,
      error: `Failed to query course_playlist_sources: ${sourcesError.message}`,
    };
  }

  if (!sources || sources.length === 0) {
    return {
      success: true,
      environment: vercelEnv,
      stats: [],
    };
  }

  const allStats: SyncStats[] = [];
  let hasFailure = false;

  for (const source of sources) {
    const stats: SyncStats = {
      playlistId: source.playlist_id,
      courseId: source.course_id,
      totalPlaylistItems: 0,
      availableVideos: 0,
      newlyInsertedLessons: 0,
      updatedLessons: 0,
      unavailableVideos: 0,
      removedVideos: 0,
      failedItems: 0,
      syncedAt: new Date().toISOString(),
    };

    try {
      // 2. Fetch raw playlist items from YouTube
      const playlistItems = await fetchPlaylistItemsFromYouTube(source.playlist_id, apiKey);
      stats.totalPlaylistItems = playlistItems.length;

      const videoIds = playlistItems
        .map((p) => p.contentDetails?.videoId || p.snippet?.resourceId?.videoId)
        .filter((id): id is string => Boolean(id && /^[a-zA-Z0-9_-]{11}$/.test(id)));

      // 3. Fetch verified video details
      const videoDetails = await fetchVideoDetailsFromYouTube(videoIds, apiKey);

      // 4. Fetch existing lessons and modules for this course with strict error checking
      const { data: existingLessons, error: lessonsError } = await (adminClient as any)
        .from('lessons')
        .select('id, slug, youtube_video_id, order_index, module_id')
        .eq('course_id', source.course_id);

      if (lessonsError) {
        throw new Error(`Failed to query lessons: ${lessonsError.message}`);
      }

      const lessonByVideoId = new Map<string, any>();
      (existingLessons || []).forEach((l: any) => {
        lessonByVideoId.set(l.youtube_video_id, l);
      });

      // Find or verify default module destination
      const { data: modules, error: modulesError } = await (adminClient as any)
        .from('course_modules')
        .select('id, title, order_index')
        .eq('course_id', source.course_id)
        .order('order_index', { ascending: true });

      if (modulesError) {
        throw new Error(`Failed to query course_modules: ${modulesError.message}`);
      }

      // Priority for default module:
      // 1. Explicitly configured source.default_module_id
      // 2. Module named "New Playlist Additions"
      // 3. Fallback to first module
      let defaultModuleId: string | undefined = source.default_module_id;
      if (!defaultModuleId && modules && modules.length > 0) {
        const additionsModule = modules.find((m: any) =>
          m.title && /new playlist additions/i.test(m.title)
        );
        defaultModuleId = additionsModule?.id || modules[0]?.id;
      }

      // 5. Process each playlist item
      const seenVideoIdsInThisRun = new Set<string>();

      for (let i = 0; i < playlistItems.length; i++) {
        const item = playlistItems[i];
        const vid = item.contentDetails?.videoId || item.snippet?.resourceId?.videoId;
        if (!vid) {
          stats.failedItems++;
          continue;
        }

        seenVideoIdsInThisRun.add(vid);
        const video = videoDetails.get(vid);
        const isEmbeddable = video ? video.status?.embeddable !== false : false;
        const isAvailable = Boolean(
          video &&
          video.status?.privacyStatus !== 'private' &&
          (!video.status?.uploadStatus || video.status.uploadStatus === 'processed')
        );
        const isActive = isAvailable && isEmbeddable;

        if (!isActive) {
          stats.unavailableVideos++;
        } else {
          stats.availableVideos++;
        }

        const position = item.snippet?.position ?? i + 1;
        const title = video?.snippet?.title || item.snippet?.title || `Lesson ${position}`;
        const seq = parseLearningSequence(title) ?? (position + 1);
        const { totalSeconds, minutes } = parseIso8601Duration(video?.contentDetails?.duration || '');

        let assignedLessonId: string | null = null;
        const existingLesson = lessonByVideoId.get(vid);

        if (existingLesson) {
          assignedLessonId = existingLesson.id;
          // Update lesson metadata idempotently, preserving its existing module assignment
          const { error: updateLessonError } = await (adminClient as any)
            .from('lessons')
            .update({
              title,
              duration_minutes: minutes || existingLesson.duration_minutes,
              order_index: seq,
            })
            .eq('id', existingLesson.id);

          if (updateLessonError) {
            throw new Error(`Failed to update lesson ${existingLesson.id}: ${updateLessonError.message}`);
          }
          stats.updatedLessons++;
        } else if (isActive && defaultModuleId) {
          // Newly discovered playable lesson! Insert into configured default module
          const slug = `lesson-${seq}-${vid}`;
          const newLessonId = crypto.randomUUID();
          const { data: newLesson, error: insertLessonError } = await (adminClient as any)
            .from('lessons')
            .insert({
              id: newLessonId,
              course_id: source.course_id,
              module_id: defaultModuleId,
              slug,
              title,
              description: video?.snippet?.description || `Playable lesson from playlist ${source.playlist_id}.`,
              youtube_video_id: vid,
              duration_minutes: minutes || 30,
              order_index: seq,
              objectives: ['Complete lesson viewing and practice exercises'],
              tags: ['cybersecurity', 'networking'],
              skills_taught: ['Network analysis & security'],
            })
            .select('id')
            .single();

          if (insertLessonError) {
            throw new Error(`Failed to insert new lesson for video ${vid}: ${insertLessonError.message}`);
          }

          if (newLesson) {
            assignedLessonId = newLesson.id;
            stats.newlyInsertedLessons++;
          }
        }

        // Upsert into course_playlist_items mapping
        const { error: upsertItemError } = await (adminClient as any)
          .from('course_playlist_items')
          .upsert(
            {
              playlist_source_id: source.id,
              course_id: source.course_id,
              lesson_id: assignedLessonId,
              youtube_video_id: vid,
              playlist_position: position,
              learning_sequence: seq,
              video_title: title,
              duration_seconds: totalSeconds,
              is_embeddable: isEmbeddable,
              availability_status: isAvailable ? 'available' : 'unavailable',
              is_active: isActive,
              last_seen_at: new Date().toISOString(),
            },
            { onConflict: 'course_id,youtube_video_id' }
          );

        if (upsertItemError) {
          throw new Error(`Failed to upsert playlist item ${vid}: ${upsertItemError.message}`);
        }
      }

      // Mark removed videos as is_active = FALSE without deleting lessons/progress
      const { data: allMappedItems, error: queryMappedError } = await (adminClient as any)
        .from('course_playlist_items')
        .select('id, youtube_video_id, is_active')
        .eq('course_id', source.course_id);

      if (queryMappedError) {
        throw new Error(`Failed to query mapped playlist items: ${queryMappedError.message}`);
      }

      if (allMappedItems) {
        for (const item of allMappedItems) {
          if (!seenVideoIdsInThisRun.has(item.youtube_video_id) && item.is_active) {
            const { error: deactivateError } = await (adminClient as any)
              .from('course_playlist_items')
              .update({ is_active: false })
              .eq('id', item.id);

            if (deactivateError) {
              throw new Error(`Failed to deactivate removed item ${item.youtube_video_id}: ${deactivateError.message}`);
            }
            stats.removedVideos++;
          }
        }
      }

      // Update source status to success ONLY when all operations succeed
      const { error: updateSourceError } = await (adminClient as any)
        .from('course_playlist_sources')
        .update({
          last_synced_at: stats.syncedAt,
          last_success_at: stats.syncedAt,
          last_sync_status: 'success',
          last_sync_error: null,
        })
        .eq('id', source.id);

      if (updateSourceError) {
        throw new Error(`Failed to update source success state: ${updateSourceError.message}`);
      }

      allStats.push(stats);
    } catch (err: any) {
      hasFailure = true;
      // Record failure without deleting course or updating last_success_at
      await (adminClient as any)
        .from('course_playlist_sources')
        .update({
          last_synced_at: new Date().toISOString(),
          last_sync_status: 'error',
          last_sync_error: err?.message || String(err),
        })
        .eq('id', source.id);

      allStats.push({
        ...stats,
        failedItems: stats.failedItems + 1,
      });
    }
  }

  return {
    success: !hasFailure,
    environment: vercelEnv,
    stats: allStats,
    error: hasFailure ? 'One or more playlist sources failed to synchronize cleanly.' : undefined,
  };
}
