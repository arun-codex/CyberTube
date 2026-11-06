import { CourseProgressState, UserVideoProgress } from '../../types/course';
import { makeVideoProgressKey } from './video-progress';

/**
 * Merges local guest lesson completion with cloud user_lesson_progress rows.
 * Deterministic rules:
 * 1. Union of completed lessons (no completed lesson is ever lost).
 * 2. Newest lastAccessedAt wins for active lesson pointer.
 * 3. Preserves all quizzes, labs, and capstone submissions.
 */
export function mergeCourseProgress(
  localState: CourseProgressState,
  cloudRows: Array<{ lesson_id: string; is_completed: boolean; last_accessed_at: string; completed_at?: string | null }>
): CourseProgressState {
  const localCompletedSet = new Set<string>(localState.completedLessonIds || []);
  const cloudCompletedSet = new Set<string>(
    cloudRows.filter((r) => r.is_completed).map((r) => String(r.lesson_id))
  );

  const mergedCompleted = Array.from(new Set([...Array.from(localCompletedSet), ...Array.from(cloudCompletedSet)]));

  let latestTimestamp = new Date(localState.lastAccessedAt || 0).getTime();
  let bestActiveLessonId = localState.lastActiveLessonId;

  cloudRows.forEach((row) => {
    const rowTime = new Date(row.last_accessed_at || 0).getTime();
    if (rowTime > latestTimestamp) {
      latestTimestamp = rowTime;
      bestActiveLessonId = String(row.lesson_id);
    }
  });

  return {
    ...localState,
    completedLessonIds: mergedCompleted,
    lastCompletedLessonId: mergedCompleted.length > 0 ? mergedCompleted[mergedCompleted.length - 1] : undefined,
    lastActiveLessonId: bestActiveLessonId,
    lastAccessedAt: new Date(latestTimestamp || Date.now()).toISOString(),
  };
}

/**
 * Merges local video progress map with remote cloud user_lesson_video_progress rows.
 * Deterministic rules:
 * 1. If either local or cloud has is_completed = true, the merged state is is_completed = true.
 * 2. Preserves the highest completion_percentage.
 * 3. For playback position, compares last_watched_at timestamps: the newer timestamp wins.
 * 4. Ensures durationSeconds is preserved if either side has it.
 */
export function mergeVideoProgressRecords(
  localVideos: Record<string, UserVideoProgress>,
  cloudRows: Array<{
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
  }>
): Record<string, UserVideoProgress> {
  const merged: Record<string, UserVideoProgress> = { ...localVideos };

  cloudRows.forEach((row) => {
    const key = makeVideoProgressKey(row.course_id, row.lesson_id, row.video_id);
    const local = localVideos[key];

    if (!local) {
      // Cloud-only record
      merged[key] = {
        courseId: row.course_id,
        moduleId: row.module_id || undefined,
        lessonId: row.lesson_id,
        videoId: row.video_id,
        lastWatchedSeconds: row.last_watched_seconds || 0,
        durationSeconds: row.duration_seconds || 0,
        completionPercentage: row.completion_percentage || 0,
        isCompleted: Boolean(row.is_completed),
        lastWatchedAt: row.last_watched_at || new Date().toISOString(),
        updatedAt: row.updated_at,
      };
      return;
    }

    // Both local and cloud exist: reconcile
    const localTime = new Date(local.lastWatchedAt || 0).getTime();
    const cloudTime = new Date(row.last_watched_at || 0).getTime();

    const isCompleted = local.isCompleted || Boolean(row.is_completed);
    const bestPercentage = Math.max(local.completionPercentage || 0, row.completion_percentage || 0);
    const bestDuration = Math.max(local.durationSeconds || 0, row.duration_seconds || 0);

    // Newest playback position
    let bestWatchedSeconds = cloudTime > localTime ? row.last_watched_seconds : local.lastWatchedSeconds;
    let bestWatchedAt = cloudTime > localTime ? row.last_watched_at : local.lastWatchedAt;

    if (bestWatchedSeconds === undefined || isNaN(bestWatchedSeconds)) {
      bestWatchedSeconds = local.lastWatchedSeconds || 0;
    }

    merged[key] = {
      courseId: row.course_id,
      moduleId: row.module_id || local.moduleId,
      lessonId: row.lesson_id,
      videoId: row.video_id,
      lastWatchedSeconds: bestWatchedSeconds,
      durationSeconds: bestDuration,
      completionPercentage: isCompleted ? Math.max(100, bestPercentage) : bestPercentage,
      isCompleted,
      lastWatchedAt: bestWatchedAt,
      updatedAt: row.updated_at || new Date().toISOString(),
    };
  });

  return merged;
}
