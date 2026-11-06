import { UserVideoProgress } from '../../types/course';

export const VIDEO_COMPLETION_THRESHOLD_PERCENT = 90;

/**
 * Creates a unique composite key for scoping video progress.
 * Prevents identical video IDs across different courses or lessons from colliding.
 */
export function makeVideoProgressKey(courseId: string, lessonId: string, videoId: string): string {
  return `${courseId}:${lessonId}:${videoId}`;
}

/**
 * Parses a composite video progress key back into its components.
 */
export function parseVideoProgressKey(key: string): { courseId: string; lessonId: string; videoId: string } | null {
  const parts = key.split(':');
  if (parts.length < 3) return null;
  return {
    courseId: parts[0],
    lessonId: parts[1],
    videoId: parts.slice(2).join(':'),
  };
}

/**
 * Formats raw seconds into human-readable MM:SS or HH:MM:SS.
 */
export function formatSecondsToTime(seconds: number): string {
  if (!seconds || isNaN(seconds) || seconds < 0) return '00:00';
  const totalSecs = Math.floor(seconds);
  const hours = Math.floor(totalSecs / 3600);
  const mins = Math.floor((totalSecs % 3600) / 60);
  const secs = totalSecs % 60;

  const paddedMins = mins.toString().padStart(2, '0');
  const paddedSecs = secs.toString().padStart(2, '0');

  if (hours > 0) {
    return `${hours}:${paddedMins}:${paddedSecs}`;
  }
  return `${paddedMins}:${paddedSecs}`;
}

/**
 * Formats a playback position comparison string: "25:10 / 57:46"
 */
export function formatPlaybackRatio(currentSeconds: number, durationSeconds: number): string {
  return `${formatSecondsToTime(currentSeconds)} / ${formatSecondsToTime(durationSeconds)}`;
}

/**
 * Calculates updated video progress with the 90% completion threshold rule.
 */
export function calculateVideoProgress(
  existingProgress: UserVideoProgress | undefined,
  courseId: string,
  lessonId: string,
  videoId: string,
  currentSeconds: number,
  durationSeconds: number,
  moduleId?: string,
  forceCompleted = false
): UserVideoProgress {
  const safeDuration = Math.max(0, Math.floor(durationSeconds));
  const safePosition = Math.max(0, Math.floor(currentSeconds));

  let percent = 0;
  if (safeDuration > 0) {
    percent = Math.min(100, Math.round((safePosition / safeDuration) * 100));
  }

  // Preserve highest percentage already achieved
  const prevPercent = existingProgress?.completionPercentage || 0;
  const bestPercent = Math.max(percent, prevPercent);

  // 90% threshold or explicit ended / toggle
  const isNowCompleted =
    forceCompleted ||
    existingProgress?.isCompleted === true ||
    bestPercent >= VIDEO_COMPLETION_THRESHOLD_PERCENT;

  return {
    courseId,
    moduleId: moduleId || existingProgress?.moduleId,
    lessonId,
    videoId,
    lastWatchedSeconds: safePosition,
    durationSeconds: safeDuration || existingProgress?.durationSeconds || 0,
    completionPercentage: isNowCompleted ? Math.max(bestPercent, 100) : bestPercent,
    isCompleted: isNowCompleted,
    lastWatchedAt: new Date().toISOString(),
  };
}

