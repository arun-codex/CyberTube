import { Course, CourseProgressState } from '../types/course';

/**
 * CyberTube — Provisional Local Course Progress Adapter
 *
 * Implements a clean client-side interface for tracking course & lesson completion
 * in browser localStorage. Dispatches custom events for reactive UI state.
 *
 * NOTE: This is a PROVISIONAL local storage adapter for the prototype.
 * It follows the same contract as the planned Supabase cloud persistence layer
 * so it can be swapped out transparently in future phases.
 */

const STORAGE_KEY_PREFIX = 'cybertube_course_progress_v1_';
const PROGRESS_EVENT_NAME = 'cybertube:course-progress-changed';

export interface CourseProgressService {
  getProgress(courseId: string): CourseProgressState;
  isLessonCompleted(courseId: string, lessonId: string): boolean;
  toggleLessonCompletion(courseId: string, lessonId: string): boolean;
  setLessonCompleted(courseId: string, lessonId: string, completed: boolean): void;
  recordLessonAccess(courseId: string, lessonId: string): void;
  getCourseCompletionPercentage(course: Course): number;
  resetCourseProgress(courseId: string): void;
}

function getStorageKey(courseId: string): string {
  return `${STORAGE_KEY_PREFIX}${courseId}`;
}

function loadState(courseId: string): CourseProgressState {
  if (typeof window === 'undefined') {
    return {
      courseId,
      completedLessonIds: [],
      lastAccessedAt: new Date().toISOString(),
    };
  }

  try {
    const raw = localStorage.getItem(getStorageKey(courseId));
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
      lastCompletedLessonId: parsed.lastCompletedLessonId,
      lastActiveLessonId: parsed.lastActiveLessonId,
      lastAccessedAt: parsed.lastAccessedAt || new Date().toISOString(),
    };
  } catch (err) {
    console.error('Failed to read course progress from localStorage:', err);
    return {
      courseId,
      completedLessonIds: [],
      lastAccessedAt: new Date().toISOString(),
    };
  }
}

function saveState(state: CourseProgressState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(getStorageKey(state.courseId), JSON.stringify(state));
    window.dispatchEvent(new CustomEvent(PROGRESS_EVENT_NAME, { detail: state }));
  } catch (err) {
    console.error('Failed to persist course progress to localStorage:', err);
  }
}

export const localCourseProgressService: CourseProgressService = {
  getProgress(courseId: string): CourseProgressState {
    return loadState(courseId);
  },

  isLessonCompleted(courseId: string, lessonId: string): boolean {
    const state = loadState(courseId);
    return state.completedLessonIds.includes(lessonId);
  },

  toggleLessonCompletion(courseId: string, lessonId: string): boolean {
    const state = loadState(courseId);
    const isCompleted = state.completedLessonIds.includes(lessonId);
    let nextCompletedIds: string[];

    if (isCompleted) {
      nextCompletedIds = state.completedLessonIds.filter((id) => id !== lessonId);
    } else {
      nextCompletedIds = [...state.completedLessonIds, lessonId];
    }

    const nextState: CourseProgressState = {
      ...state,
      completedLessonIds: nextCompletedIds,
      lastCompletedLessonId: !isCompleted ? lessonId : state.lastCompletedLessonId,
      lastActiveLessonId: lessonId,
      lastAccessedAt: new Date().toISOString(),
    };

    saveState(nextState);
    return !isCompleted;
  },

  setLessonCompleted(courseId: string, lessonId: string, completed: boolean): void {
    const state = loadState(courseId);
    const isCompleted = state.completedLessonIds.includes(lessonId);
    if (isCompleted === completed) return;

    const nextCompletedIds = completed
      ? [...state.completedLessonIds, lessonId]
      : state.completedLessonIds.filter((id) => id !== lessonId);

    saveState({
      ...state,
      completedLessonIds: nextCompletedIds,
      lastCompletedLessonId: completed ? lessonId : state.lastCompletedLessonId,
      lastActiveLessonId: lessonId,
      lastAccessedAt: new Date().toISOString(),
    });
  },

  recordLessonAccess(courseId: string, lessonId: string): void {
    const state = loadState(courseId);
    saveState({
      ...state,
      lastActiveLessonId: lessonId,
      lastAccessedAt: new Date().toISOString(),
    });
  },

  getCourseCompletionPercentage(course: Course): number {
    const state = loadState(course.id);
    const allLessonIds = course.modules.flatMap((m) => m.lessons.map((l) => l.id));
    if (allLessonIds.length === 0) return 0;

    const completedCount = allLessonIds.filter((id) => state.completedLessonIds.includes(id)).length;
    return Math.round((completedCount / allLessonIds.length) * 100);
  },

  resetCourseProgress(courseId: string): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(getStorageKey(courseId));
      window.dispatchEvent(
        new CustomEvent(PROGRESS_EVENT_NAME, {
          detail: { courseId, completedLessonIds: [], lastAccessedAt: new Date().toISOString() },
        })
      );
    } catch (err) {
      console.error('Failed to clear course progress from localStorage:', err);
    }
  },
};

/**
 * React hook listener for course progress changes
 */
export function onCourseProgressChange(callback: (state: CourseProgressState) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = (e: Event) => {
    const customEvent = e as CustomEvent<CourseProgressState>;
    if (customEvent.detail) {
      callback(customEvent.detail);
    }
  };
  window.addEventListener(PROGRESS_EVENT_NAME, handler);
  return () => {
    window.removeEventListener(PROGRESS_EVENT_NAME, handler);
  };
}

