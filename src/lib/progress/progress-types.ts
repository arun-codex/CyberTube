import {
  Course,
  CourseProgressState,
  UserVideoProgress,
  ComprehensiveCourseCompletion,
  QuizAttempt,
  PracticalLabProgress,
  CapstoneSubmissionState,
} from '../../types/course';

export type SyncStatus = 'synced' | 'saving' | 'offline' | 'pending' | 'error' | 'loading';

export interface SyncStatusEvent {
  courseId?: string;
  status: SyncStatus;
  message?: string;
}

export interface CourseCardProgress {
  courseId: string;
  courseSlug: string;
  percentage: number;
  completedLessons: number;
  totalLessons: number;
  status: 'not_started' | 'in_progress' | 'completed';
  lastActiveLessonId?: string;
  lastActiveLessonSlug?: string;
  isGuestLocal: boolean;
}

export interface PendingSyncItem {
  id: string;
  type: 'lesson' | 'video';
  courseId: string;
  lessonId?: string;
  videoId?: string;
  payload: any;
  createdAt: number;
  retries: number;
}

export interface ProgressStateMap {
  courses: Record<string, CourseProgressState>;
  videos: Record<string, UserVideoProgress>; // Key: `${courseId}:${lessonId}:${videoId}`
}

export interface ProgressContextValue {
  isAuthenticated: boolean;
  userId: string | null;
  isLoading: boolean;
  syncStatus: SyncStatus;
  pendingSyncCount: number;
  coursesProgress: Record<string, CourseProgressState>;
  videosProgress: Record<string, UserVideoProgress>;
  getCourseProgress: (courseId: string) => CourseProgressState;
  getCourseCardProgress: (course: Course) => CourseCardProgress;
  getVideoProgress: (courseId: string, lessonId: string, videoId: string) => UserVideoProgress | undefined;
  toggleLessonCompletion: (courseId: string, lessonId: string) => boolean;
  setLessonCompleted: (courseId: string, lessonId: string, completed: boolean) => void;
  recordLessonAccess: (courseId: string, lessonId: string) => void;
  recordVideoProgress: (progress: UserVideoProgress) => Promise<void>;
  resetCourseProgress: (courseId: string) => Promise<void>;
  refreshProgress: () => Promise<void>;
  syncPendingProgress: () => Promise<void>;
}

