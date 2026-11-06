import { Course, CourseProgressState, UserVideoProgress } from '../types/course';
import { CourseProgressService, localCourseProgressService } from './course-progress';
import { createClient } from './supabase/client';

export type CloudSyncStatus = 'saved' | 'saving' | 'offline' | 'error';

export interface SyncStatusEvent {
  courseId: string;
  status: CloudSyncStatus;
  message?: string;
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuid(id: string): boolean {
  return UUID_REGEX.test(id);
}

/**
 * CloudCourseProgressService
 *
 * Implements the CourseProgressService interface backed by Supabase PostgreSQL
 * with transparent local guest fallback and automatic session synchronization.
 *
 * Key behaviors:
 * 1. Synchronous UI reads are served immediately from cached/localStorage state to avoid layout shift.
 * 2. When authenticated with Supabase, completion changes and lesson access are persisted to `user_lesson_progress`.
 * 3. On user sign-in or initialization, unauthenticated local guest progress is seamlessly merged
 *    with cloud progress so completed lessons are never lost.
 * 4. In offline/unauthenticated mode or for static string IDs, local localStorage is used with zero interruption.
 * 5. Emits distinct sync states ('saved', 'saving', 'offline', 'error') for user transparency.
 */
export class CloudCourseProgressService implements CourseProgressService {
  private supabase: any;
  private syncAttempted = new Set<string>();
  private syncStatuses = new Map<string, CloudSyncStatus>();
  private statusListeners = new Set<(event: SyncStatusEvent) => void>();

  constructor(customClient?: any) {
    this.supabase = customClient !== undefined ? customClient : createClient();
    if (typeof window !== 'undefined' && this.supabase && typeof this.supabase.auth?.onAuthStateChange === 'function') {
      // Listen to auth state changes to trigger guest progress merge on login
      this.supabase.auth.onAuthStateChange((event: any, session: any) => {
        if (event === 'SIGNED_IN' && session?.user) {
          this.syncAttempted.clear();
        } else if (event === 'SIGNED_OUT') {
          this.syncStatuses.clear();
        }
      });
    }
  }

  /**
   * Subscribes to real-time cloud sync status changes.
   */
  onSyncStatusChange(callback: (event: SyncStatusEvent) => void): () => void {
    this.statusListeners.add(callback);
    return () => {
      this.statusListeners.delete(callback);
    };
  }

  private setSyncStatus(courseId: string, status: CloudSyncStatus, message?: string) {
    this.syncStatuses.set(courseId, status);
    const event: SyncStatusEvent = { courseId, status, message };
    this.statusListeners.forEach((listener) => {
      try {
        listener(event);
      } catch (err) {
        console.error('Error in sync status listener:', err);
      }
    });

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('cybertube:course-sync-status-changed', { detail: event })
      );
    }
  }

  getSyncStatus(courseId: string): CloudSyncStatus {
    return this.syncStatuses.get(courseId) || 'offline';
  }

  /**
   * Retrieves progress synchronously from local cache/storage, while initiating
   * a background cloud sync if authenticated and not yet fetched for this course.
   */
  getProgress(courseId: string): CourseProgressState {
    const localState = localCourseProgressService.getProgress(courseId);

    // Trigger background sync if signed in, not yet synced, and courseId is UUID
    if (typeof window !== 'undefined' && this.supabase && !this.syncAttempted.has(courseId)) {
      this.syncAttempted.add(courseId);
      this.syncCourseProgress(courseId).catch((err) => {
        console.warn('Background course progress sync failed, using local state:', err);
        this.setSyncStatus(courseId, 'error', err?.message);
      });
    }

    return localState;
  }

  isLessonCompleted(courseId: string, lessonId: string): boolean {
    return localCourseProgressService.isLessonCompleted(courseId, lessonId);
  }

  toggleLessonCompletion(courseId: string, lessonId: string): boolean {
    // 1. Update local storage immediately for fast reactive UI update
    const isNowCompleted = localCourseProgressService.toggleLessonCompletion(courseId, lessonId);

    // 2. Persist to Supabase if authenticated and UUID valid
    if (this.supabase) {
      this.setSyncStatus(courseId, 'saving');
      this.persistLessonProgressToCloud(courseId, lessonId, isNowCompleted)
        .then((status) => {
          this.setSyncStatus(courseId, status);
        })
        .catch((err) => {
          console.warn('Failed to persist lesson completion to cloud:', err);
          this.setSyncStatus(courseId, 'error', err?.message);
        });
    } else {
      this.setSyncStatus(courseId, 'offline');
    }

    return isNowCompleted;
  }

  setLessonCompleted(courseId: string, lessonId: string, completed: boolean): void {
    localCourseProgressService.setLessonCompleted(courseId, lessonId, completed);

    if (this.supabase) {
      this.setSyncStatus(courseId, 'saving');
      this.persistLessonProgressToCloud(courseId, lessonId, completed)
        .then((status) => {
          this.setSyncStatus(courseId, status);
        })
        .catch((err) => {
          console.warn('Failed to persist lesson completion to cloud:', err);
          this.setSyncStatus(courseId, 'error', err?.message);
        });
    } else {
      this.setSyncStatus(courseId, 'offline');
    }
  }

  recordLessonAccess(courseId: string, lessonId: string): void {
    localCourseProgressService.recordLessonAccess(courseId, lessonId);

    if (this.supabase && isUuid(courseId) && isUuid(lessonId)) {
      this.persistLessonAccessToCloud(courseId, lessonId).catch((err) => {
        console.warn('Failed to persist lesson access to cloud:', err);
      });
    }
  }

  getCourseCompletionPercentage(course: Course): number {
    return localCourseProgressService.getCourseCompletionPercentage(course);
  }

  resetCourseProgress(courseId: string): void {
    localCourseProgressService.resetCourseProgress(courseId);

    if (this.supabase && isUuid(courseId)) {
      this.deleteCourseProgressFromCloud(courseId).catch((err) => {
        console.warn('Failed to clear course progress from cloud:', err);
      });
    }
  }

  recordQuizScore(courseId: string, quizId: string, scorePercent: number): void {
    if (typeof localCourseProgressService.recordQuizScore === 'function') {
      localCourseProgressService.recordQuizScore(courseId, quizId, scorePercent);
    }
  }

  recordQuizAttempt(courseId: string, moduleId: string, attempt: any): void {
    if (typeof localCourseProgressService.recordQuizAttempt === 'function') {
      localCourseProgressService.recordQuizAttempt(courseId, moduleId, attempt);
    }
  }

  recordLabProgress(courseId: string, labId: string, progress: any): void {
    if (typeof localCourseProgressService.recordLabProgress === 'function') {
      localCourseProgressService.recordLabProgress(courseId, labId, progress);
    }
  }

  recordCapstoneSubmission(courseId: string, submission: any): void {
    if (typeof localCourseProgressService.recordCapstoneSubmission === 'function') {
      localCourseProgressService.recordCapstoneSubmission(courseId, submission);
    }
  }

  recordCapstoneScore(courseId: string, score: number): void {
    if (typeof localCourseProgressService.recordCapstoneScore === 'function') {
      localCourseProgressService.recordCapstoneScore(courseId, score);
    }
  }

  getComprehensiveCourseCompletion(course: Course): any {
    if (typeof localCourseProgressService.getComprehensiveCourseCompletion === 'function') {
      return localCourseProgressService.getComprehensiveCourseCompletion(course);
    }
    return null;
  }

  /**
   * Merges local guest progress with cloud user_lesson_progress rows.
   */
  async syncCourseProgress(courseId: string): Promise<void> {
    if (!this.supabase) {
      this.setSyncStatus(courseId, 'offline');
      return;
    }

    const { data: { user } } = await this.supabase.auth.getUser();
    if (!user) {
      this.setSyncStatus(courseId, 'offline');
      return;
    }

    // Only query cloud table if courseId matches a valid UUID
    if (!isUuid(courseId)) {
      this.setSyncStatus(courseId, 'offline');
      return;
    }

    // Fetch cloud progress records for this user and course
    const { data: cloudRows, error } = await (this.supabase
      .from('user_lesson_progress') as any)
      .select('lesson_id, is_completed, last_accessed_at, completed_at')
      .eq('user_id', user.id)
      .eq('course_id', courseId);

    if (error) {
      this.setSyncStatus(courseId, 'error', error.message);
      return;
    }

    if (!cloudRows) {
      this.setSyncStatus(courseId, 'saved');
      return;
    }

    const localState = localCourseProgressService.getProgress(courseId);
    const localCompletedSet = new Set<string>(localState.completedLessonIds);
    const cloudCompletedSet = new Set<string>(
      cloudRows.filter((r: any) => r.is_completed).map((r: any) => String(r.lesson_id))
    );

    // Union of completed lessons (never lose completed records)
    const mergedCompleted: string[] = Array.from(new Set<string>([...Array.from(localCompletedSet), ...Array.from(cloudCompletedSet)]));

    // Determine latest accessed lesson between cloud and local
    let latestAccessDate = new Date(localState.lastAccessedAt || 0).getTime();
    let bestActiveLessonId = localState.lastActiveLessonId;

    cloudRows.forEach((r: any) => {
      const rowAccessDate = new Date(r.last_accessed_at).getTime();
      if (rowAccessDate > latestAccessDate) {
        latestAccessDate = rowAccessDate;
        bestActiveLessonId = r.lesson_id;
      }
    });

    // Save merged state locally
    const mergedState: CourseProgressState = {
      courseId,
      completedLessonIds: mergedCompleted,
      lastCompletedLessonId: localState.lastCompletedLessonId,
      lastActiveLessonId: bestActiveLessonId,
      lastAccessedAt: new Date(latestAccessDate || Date.now()).toISOString(),
    };

    // Update local cache
    if (typeof window !== 'undefined') {
      localStorage.setItem(`cybertube_course_progress_v1_${courseId}`, JSON.stringify(mergedState));
      window.dispatchEvent(
        new CustomEvent('cybertube:course-progress-changed', { detail: mergedState })
      );
    }

    this.setSyncStatus(courseId, 'saved');

    // Push local-only completed lessons up to the cloud so cloud matches union
    const localOnlyCompleted = Array.from(localCompletedSet).filter((id) => !cloudCompletedSet.has(id));
    for (const lessonId of localOnlyCompleted) {
      if (isUuid(lessonId)) {
        await this.persistLessonProgressToCloud(courseId, lessonId, true);
      }
    }
  }

  async persistLessonProgressToCloud(
    courseId: string,
    lessonId: string,
    completed: boolean
  ): Promise<CloudSyncStatus> {
    if (!this.supabase) return 'offline';
    const { data: { user } } = await this.supabase.auth.getUser();
    if (!user) {
      return 'offline';
    }

    if (!isUuid(courseId) || !isUuid(lessonId)) {
      // Non-UUID courses/lessons stay in local storage
      return 'offline';
    }

    const payload = {
      user_id: user.id,
      course_id: courseId,
      lesson_id: lessonId,
      is_completed: completed,
      completed_at: completed ? new Date().toISOString() : null,
      last_accessed_at: new Date().toISOString(),
    };

    const { error } = await (this.supabase
      .from('user_lesson_progress') as any)
      .upsert(payload, { onConflict: 'user_id,lesson_id' });

    if (error) {
      throw new Error(`Supabase progress upsert failed: ${error.message}`);
    }

    return 'saved';
  }

  async persistLessonAccessToCloud(courseId: string, lessonId: string): Promise<void> {
    if (!this.supabase) return;
    const { data: { user } } = await this.supabase.auth.getUser();
    if (!user) return;

    if (!isUuid(courseId) || !isUuid(lessonId)) return;

    await (this.supabase
      .from('user_lesson_progress') as any)
      .upsert(
        {
          user_id: user.id,
          course_id: courseId,
          lesson_id: lessonId,
          last_accessed_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,lesson_id' }
      );
  }

  async deleteCourseProgressFromCloud(courseId: string): Promise<void> {
    if (!this.supabase) return;
    const { data: { user } } = await this.supabase.auth.getUser();
    if (!user) return;

    if (!isUuid(courseId)) return;

    await (this.supabase
      .from('user_lesson_progress') as any)
      .delete()
      .eq('user_id', user.id)
      .eq('course_id', courseId);
  }

  recordVideoProgress(progress: UserVideoProgress): void {
    localCourseProgressService.recordVideoProgress?.(progress);

    if (this.supabase) {
      this.persistVideoProgressToCloud(progress).catch((err) => {
        console.warn('Failed to sync video progress to cloud:', err);
      });
    }
  }

  getVideoProgress(courseId: string, videoId: string): UserVideoProgress | undefined {
    return localCourseProgressService.getVideoProgress?.(courseId, videoId);
  }

  getAllVideoProgress(courseId: string): Record<string, UserVideoProgress> {
    return localCourseProgressService.getAllVideoProgress?.(courseId) || {};
  }

  async persistVideoProgressToCloud(progress: UserVideoProgress): Promise<void> {
    if (!this.supabase) return;
    try {
      const { data: { user } } = await this.supabase.auth.getUser();
      if (!user) return;

      const payload = {
        user_id: user.id,
        course_id: progress.courseId,
        module_id: progress.moduleId || null,
        lesson_id: progress.lessonId,
        video_id: progress.videoId,
        last_watched_seconds: progress.lastWatchedSeconds,
        duration_seconds: progress.durationSeconds,
        completion_percentage: progress.completionPercentage,
        is_completed: progress.isCompleted,
        last_watched_at: progress.lastWatchedAt || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await (this.supabase
        .from('user_lesson_video_progress') as any)
        .upsert(payload, { onConflict: 'user_id,course_id,lesson_id,video_id' });
    } catch (err) {
      console.warn('Could not persist video progress to Supabase:', err);
    }
  }
}

/**
 * Singleton instance of the CloudCourseProgressService
 */
export const cloudCourseProgressService = new CloudCourseProgressService();
