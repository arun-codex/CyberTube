import { CourseProgressState, UserVideoProgress } from '../../types/course';
import { PendingSyncItem } from './progress-types';
import { makeVideoProgressKey } from './video-progress';

const COURSE_STORAGE_PREFIX = 'cybertube_course_progress_v1_';
const VIDEO_STORAGE_KEY = 'cybertube_video_progress_v2';
const PENDING_SYNC_KEY = 'cybertube_pending_sync_queue_v1';
const USER_SESSION_KEY = 'cybertube_active_user_id';

export const COURSE_PROGRESS_EVENT = 'cybertube:course-progress-changed';
export const VIDEO_PROGRESS_EVENT = 'cybertube:video-progress-changed';
export const SYNC_STATUS_EVENT = 'cybertube:course-sync-status-changed';

// In-memory fallback map for SSR, Node.js, and unit test environments
const inMemoryStore = new Map<string, string>();

function getStorageItem(key: string): string | null {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const val = localStorage.getItem(key);
      if (val !== null) return val;
    } catch {
      // In case localStorage is disabled or throws
    }
  }
  return inMemoryStore.get(key) || null;
}

function setStorageItem(key: string, value: string): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.setItem(key, value);
    } catch {}
  }
  inMemoryStore.set(key, value);
}

function removeStorageItem(key: string): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.removeItem(key);
    } catch {}
  }
  inMemoryStore.delete(key);
}

/**
 * Loads course progress state for a specific course ID from localStorage.
 */
export function loadCourseProgressFromStorage(courseId: string): CourseProgressState {
  try {
    const raw = getStorageItem(`${COURSE_STORAGE_PREFIX}${courseId}`);
    if (!raw) {
      return {
        courseId,
        completedLessonIds: [],
        lastAccessedAt: new Date().toISOString(),
      };
    }
    const parsed = JSON.parse(raw);
    return {
      courseId,
      completedLessonIds: Array.isArray(parsed.completedLessonIds) ? parsed.completedLessonIds : [],
      archivedLegacyLessonIds: Array.isArray(parsed.archivedLegacyLessonIds) ? parsed.archivedLegacyLessonIds : [],
      lastCompletedLessonId: parsed.lastCompletedLessonId,
      lastActiveLessonId: parsed.lastActiveLessonId,
      lastAccessedAt: parsed.lastAccessedAt || new Date().toISOString(),
      quizScores: parsed.quizScores || {},
      quizAttempts: parsed.quizAttempts || {},
      labProgress: parsed.labProgress || {},
      capstoneSubmission: parsed.capstoneSubmission,
      capstoneScore: parsed.capstoneScore,
      videoProgress: parsed.videoProgress || {},
    };
  } catch (err) {
    console.error('Failed to read course progress from storage:', err);
    return {
      courseId,
      completedLessonIds: [],
      lastAccessedAt: new Date().toISOString(),
    };
  }
}

/**
 * Saves course progress state to storage and dispatches a change event.
 */
export function saveCourseProgressToStorage(state: CourseProgressState): void {
  try {
    setStorageItem(`${COURSE_STORAGE_PREFIX}${state.courseId}`, JSON.stringify(state));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(COURSE_PROGRESS_EVENT, { detail: state }));
    }
  } catch (err) {
    console.error('Failed to save course progress to storage:', err);
  }
}

/**
 * Loads all video progress records from storage.
 */
export function loadAllVideoProgressFromStorage(): Record<string, UserVideoProgress> {
  try {
    const raw = getStorageItem(VIDEO_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.error('Failed to load video progress from storage:', err);
    return {};
  }
}

/**
 * Saves all video progress records to storage.
 */
export function saveAllVideoProgressToStorage(records: Record<string, UserVideoProgress>): void {
  try {
    setStorageItem(VIDEO_STORAGE_KEY, JSON.stringify(records));
  } catch (err) {
    console.error('Failed to save video progress to storage:', err);
  }
}

/**
 * Saves a single video progress record and dispatches a change event.
 */
export function saveVideoProgressRecord(progress: UserVideoProgress): void {
  try {
    const all = loadAllVideoProgressFromStorage();
    const key = makeVideoProgressKey(progress.courseId, progress.lessonId, progress.videoId);
    all[key] = progress;
    saveAllVideoProgressToStorage(all);

    // Keep legacy course progress videoProgress map in sync for backwards compatibility
    const courseState = loadCourseProgressFromStorage(progress.courseId);
    courseState.videoProgress = {
      ...(courseState.videoProgress || {}),
      [progress.videoId]: progress,
    };
    saveCourseProgressToStorage(courseState);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent(VIDEO_PROGRESS_EVENT, { detail: { key, progress } })
      );
    }
  } catch (err) {
    console.error('Failed to record video progress:', err);
  }
}

/**
 * Retrieves a single video progress record.
 */
export function getVideoProgressRecord(
  courseId: string,
  lessonId: string,
  videoId: string
): UserVideoProgress | undefined {
  const all = loadAllVideoProgressFromStorage();
  const key = makeVideoProgressKey(courseId, lessonId, videoId);
  if (all[key]) return all[key];

  // Fallback to legacy map inside course state if present
  const courseState = loadCourseProgressFromStorage(courseId);
  return courseState.videoProgress?.[videoId];
}

/**
 * Loads the offline pending sync queue.
 */
export function loadPendingSyncQueue(): PendingSyncItem[] {
  try {
    const raw = getStorageItem(PENDING_SYNC_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Saves the offline pending sync queue.
 */
export function savePendingSyncQueue(items: PendingSyncItem[]): void {
  try {
    setStorageItem(PENDING_SYNC_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save pending sync queue:', err);
  }
}

/**
 * Adds an item to the pending sync queue.
 */
export function enqueuePendingSync(item: Omit<PendingSyncItem, 'id' | 'createdAt' | 'retries'>): void {
  const queue = loadPendingSyncQueue();
  const newItem: PendingSyncItem = {
    ...item,
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    createdAt: Date.now(),
    retries: 0,
  };
  queue.push(newItem);
  savePendingSyncQueue(queue);
}

/**
 * Clears cached user state on sign-out to prevent data leakage between accounts.
 */
export function clearUserCacheOnSignOut(): void {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.clear();
    }
    removeStorageItem(USER_SESSION_KEY);
    removeStorageItem(PENDING_SYNC_KEY);
  } catch (err) {
    console.error('Failed to clear user cache on sign-out:', err);
  }
}

/**
 * Stores the active authenticated user ID.
 */
export function setActiveUserId(userId: string | null): void {
  if (userId) {
    setStorageItem(USER_SESSION_KEY, userId);
  } else {
    removeStorageItem(USER_SESSION_KEY);
  }
}

/**
 * Gets the active authenticated user ID.
 */
export function getActiveUserId(): string | null {
  return getStorageItem(USER_SESSION_KEY);
}
