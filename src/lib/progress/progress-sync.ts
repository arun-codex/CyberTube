import { UserVideoProgress } from '../../types/course';
import { isUuid } from '../cloud-course-progress';
import { loadPendingSyncQueue, savePendingSyncQueue } from './progress-storage';
import { PendingSyncItem } from './progress-types';

/**
 * Fetches all cloud lesson progress for a user across all courses in one single query.
 */
export async function fetchAllCloudLessonProgress(
  supabase: any,
  userId: string
): Promise<Record<string, Array<{ lesson_id: string; is_completed: boolean; last_accessed_at: string; completed_at?: string | null }>>> {
  if (!supabase || !userId) return {};

  try {
    const { data, error } = await (supabase
      .from('user_lesson_progress') as any)
      .select('course_id, lesson_id, is_completed, last_accessed_at, completed_at')
      .eq('user_id', userId);

    if (error) {
      console.warn('[progress-sync] Failed to fetch cloud lesson progress:', error.message);
      return {};
    }

    if (!Array.isArray(data)) return {};

    const grouped: Record<string, Array<any>> = {};
    data.forEach((row) => {
      const courseId = String(row.course_id);
      if (!grouped[courseId]) {
        grouped[courseId] = [];
      }
      grouped[courseId].push(row);
    });

    return grouped;
  } catch (err: any) {
    console.warn('[progress-sync] Exception fetching cloud lesson progress:', err?.message || err);
    return {};
  }
}

/**
 * Fetches all cloud video progress for a user across all courses in one single query.
 */
export async function fetchAllCloudVideoProgress(
  supabase: any,
  userId: string
): Promise<Array<{
  course_id: string;
  module_id?: string | null;
  lesson_id: string;
  video_id: string;
  last_watched_seconds: number;
  duration_seconds: number;
  completion_percentage: number;
  is_completed: boolean;
  last_watched_at: string;
  updated_at?: string;
}>> {
  if (!supabase || !userId) return [];

  try {
    const { data, error } = await (supabase
      .from('user_lesson_video_progress') as any)
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.warn('[progress-sync] Failed to fetch cloud video progress:', error.message);
      return [];
    }

    return Array.isArray(data) ? data : [];
  } catch (err: any) {
    console.warn('[progress-sync] Exception fetching cloud video progress:', err?.message || err);
    return [];
  }
}

/**
 * Upserts a single lesson completion record to Supabase.
 */
export async function upsertCloudLessonProgress(
  supabase: any,
  userId: string,
  courseId: string,
  lessonId: string,
  completed: boolean
): Promise<boolean> {
  if (!supabase || !userId) return false;
  if (!isUuid(courseId) || !isUuid(lessonId)) {
    // Non-UUID courses/lessons stay in local storage
    return true;
  }

  try {
    const payload = {
      user_id: userId,
      course_id: courseId,
      lesson_id: lessonId,
      is_completed: completed,
      completed_at: completed ? new Date().toISOString() : null,
      last_accessed_at: new Date().toISOString(),
    };

    const { error } = await (supabase
      .from('user_lesson_progress') as any)
      .upsert(payload, { onConflict: 'user_id,lesson_id' });

    if (error) {
      console.warn('[progress-sync] Lesson progress upsert error:', error.message);
      return false;
    }
    return true;
  } catch (err: any) {
    console.warn('[progress-sync] Lesson progress upsert exception:', err?.message || err);
    return false;
  }
}

/**
 * Upserts a single video progress record to Supabase.
 */
export async function upsertCloudVideoProgress(
  supabase: any,
  userId: string,
  progress: UserVideoProgress
): Promise<boolean> {
  if (!supabase || !userId) return false;

  try {
    const payload = {
      user_id: userId,
      course_id: progress.courseId,
      module_id: progress.moduleId || null,
      lesson_id: progress.lessonId,
      video_id: progress.videoId,
      last_watched_seconds: Math.max(0, Math.floor(progress.lastWatchedSeconds || 0)),
      duration_seconds: Math.max(0, Math.floor(progress.durationSeconds || 0)),
      completion_percentage: Math.min(100, Math.max(0, Math.round(progress.completionPercentage || 0))),
      is_completed: Boolean(progress.isCompleted),
      last_watched_at: progress.lastWatchedAt || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { error } = await (supabase
      .from('user_lesson_video_progress') as any)
      .upsert(payload, { onConflict: 'user_id,course_id,lesson_id,video_id' });

    if (error) {
      console.warn('[progress-sync] Video progress upsert error:', error.message);
      return false;
    }
    return true;
  } catch (err: any) {
    console.warn('[progress-sync] Video progress upsert exception:', err?.message || err);
    return false;
  }
}

/**
 * Flushes all pending offline changes to Supabase.
 */
export async function flushPendingSyncQueue(supabase: any, userId: string): Promise<number> {
  if (!supabase || !userId) return 0;
  const queue = loadPendingSyncQueue();
  if (queue.length === 0) return 0;

  const remaining: PendingSyncItem[] = [];
  let successful = 0;

  for (const item of queue) {
    let success = false;
    if (item.type === 'lesson') {
      success = await upsertCloudLessonProgress(
        supabase,
        userId,
        item.courseId,
        item.lessonId!,
        item.payload.isCompleted
      );
    } else if (item.type === 'video') {
      success = await upsertCloudVideoProgress(supabase, userId, item.payload);
    }

    if (success) {
      successful++;
    } else {
      item.retries = (item.retries || 0) + 1;
      if (item.retries < 5) {
        remaining.push(item);
      }
    }
  }

  savePendingSyncQueue(remaining);
  return successful;
}
