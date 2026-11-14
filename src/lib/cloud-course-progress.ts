import { Course, CourseProgressState, UserVideoProgress } from '../types/course';
import { CourseProgressService, localCourseProgressService } from './course-progress';
import { createClient } from './supabase/client';
import {
  STORYTELLING_COURSE_ID,
  STORYTELLING_COURSE_UUID,
  resolveStorytellingLessonUuid,
  STORYTELLING_MODULE_ID_TO_UUID,
  STORYTELLING_LESSON_UUID_TO_ID,
  STORYTELLING_MODULE_UUID_TO_ID,
} from './courses/storytelling-uuid-map';

export type CloudSyncStatus = 'saved' | 'saving' | 'offline' | 'error';

export interface SyncStatusEvent {
  courseId: string;
  status: CloudSyncStatus;
  message?: string;
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Deterministic UUID mappings for text course IDs
export const COURSE_UUID_MAPPING: Record<string, string> = {
  [STORYTELLING_COURSE_ID]: STORYTELLING_COURSE_UUID,
  'free-storytelling-masterclass': STORYTELLING_COURSE_UUID,
};

export function resolveCourseUuid(courseId: string): string | null {
  if (UUID_REGEX.test(courseId)) return courseId;
  return COURSE_UUID_MAPPING[courseId] || null;
}

export function resolveLessonUuid(courseId: string, lessonId: string): string | null {
  if (UUID_REGEX.test(lessonId)) return lessonId;
  if (
    courseId === STORYTELLING_COURSE_ID ||
    courseId === 'free-storytelling-masterclass' ||
    courseId === STORYTELLING_COURSE_UUID
  ) {
    return resolveStorytellingLessonUuid(lessonId);
  }
  return null;
}

export function resolveModuleUuid(courseId: string, moduleId: string): string | null {
  if (UUID_REGEX.test(moduleId)) return moduleId;
  if (
    courseId === STORYTELLING_COURSE_ID ||
    courseId === 'free-storytelling-masterclass' ||
    courseId === STORYTELLING_COURSE_UUID
  ) {
    return STORYTELLING_MODULE_ID_TO_UUID[moduleId] || null;
  }
  return null;
}

export function isUuid(id: string): boolean {
  return UUID_REGEX.test(id) || Boolean(COURSE_UUID_MAPPING[id]);
}

/**
 * CloudCourseProgressService
 *
 * Implements the CourseProgressService interface backed by Supabase PostgreSQL
 * with transparent local guest fallback and automatic session synchronization.
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

    // Trigger background sync if signed in, not yet synced, and courseId can be resolved to UUID
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

    // 2. Persist to Supabase if authenticated and course UUID valid
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

    if (this.supabase && isUuid(courseId)) {
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
    // 1. Maintain local/guest progress cache in localStorage
    if (typeof localCourseProgressService.recordQuizAttempt === 'function') {
      localCourseProgressService.recordQuizAttempt(courseId, moduleId, attempt);
    }

    // 2. Client-side direct INSERT to public.user_quiz_attempts is strictly prohibited.
    // Server-side privileged client (createAdminClient) alone is authorized to write
    // trusted, server-evaluated quiz attempts in the submission API.
    // Client-side persistence here is intentionally a no-op to eliminate duplicate
    // writes and prevent forged client attempt records.
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
   * Merges local guest progress with cloud user_lesson_progress & user_quiz_attempts rows.
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

    const dbCourseId = resolveCourseUuid(courseId);
    if (!dbCourseId) {
      this.setSyncStatus(courseId, 'offline');
      return;
    }

    // Fetch cloud progress records for this user and course
    const { data: cloudRows, error } = await (this.supabase
      .from('user_lesson_progress') as any)
      .select('lesson_id, is_completed, last_accessed_at, completed_at')
      .eq('user_id', user.id)
      .eq('course_id', dbCourseId);

    if (error) {
      this.setSyncStatus(courseId, 'error', error.message);
      return;
    }

    const localState = localCourseProgressService.getProgress(courseId);
    const localCompletedSet = new Set<string>(localState.completedLessonIds);

    // Map cloud UUIDs back to application lesson IDs if needed
    const cloudCompletedSet = new Set<string>();
    if (cloudRows) {
      cloudRows.filter((r: any) => r.is_completed).forEach((r: any) => {
        const rawId = String(r.lesson_id);
        const appId = STORYTELLING_LESSON_UUID_TO_ID[rawId] || rawId;
        cloudCompletedSet.add(appId);
        cloudCompletedSet.add(rawId);
      });
    }

    // Union of completed lessons (never lose completed records)
    const mergedCompleted: string[] = Array.from(
      new Set<string>([...Array.from(localCompletedSet), ...Array.from(cloudCompletedSet)])
    );

    // Determine latest accessed lesson between cloud and local
    let latestAccessDate = new Date(localState.lastAccessedAt || 0).getTime();
    let bestActiveLessonId = localState.lastActiveLessonId;

    if (cloudRows) {
      cloudRows.forEach((r: any) => {
        const rowAccessDate = new Date(r.last_accessed_at).getTime();
        if (rowAccessDate > latestAccessDate) {
          latestAccessDate = rowAccessDate;
          const rawId = String(r.lesson_id);
          bestActiveLessonId = STORYTELLING_LESSON_UUID_TO_ID[rawId] || rawId;
        }
      });
    }

    // Also fetch remote quiz attempts for this course
    let mergedQuizScores = { ...(localState.quizScores || {}) };
    let mergedQuizAttempts = { ...(localState.quizAttempts || {}) };
    try {
      const { data: quizRows } = await (this.supabase
        .from('user_quiz_attempts') as any)
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', dbCourseId)
        .order('submitted_at', { ascending: true });

      if (Array.isArray(quizRows) && quizRows.length > 0) {
        quizRows.forEach((qr: any) => {
          const rawModId = String(qr.module_id);
          const appModId = STORYTELLING_MODULE_UUID_TO_ID[rawModId] || rawModId;

          // Update best score
          const currentBest = mergedQuizScores[appModId] ?? 0;
          if (qr.score > currentBest) {
            mergedQuizScores[appModId] = qr.score;
          }

          if (!mergedQuizAttempts[appModId]) {
            mergedQuizAttempts[appModId] = [];
          }

          // Avoid duplicating attempts if already stored locally
          const alreadyExists = mergedQuizAttempts[appModId].some(
            (a: any) => a.submittedAt === qr.submitted_at || (a.score === qr.score && a.attemptNumber === qr.id)
          );
          if (!alreadyExists) {
            mergedQuizAttempts[appModId].push({
              attemptNumber: mergedQuizAttempts[appModId].length + 1,
              selectedAnswers: {},
              score: qr.score,
              passed: qr.passed,
              submittedAt: qr.submitted_at,
            });
          }
        });
      }
    } catch (qErr) {
      console.warn('Could not sync quiz attempts for course:', qErr);
    }

    // Also fetch remote video progress for this course
    let mergedVideoProgress = { ...(localState.videoProgress || {}) };
    try {
      const { data: videoRows } = await (this.supabase
        .from('user_lesson_video_progress') as any)
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', dbCourseId);

      if (Array.isArray(videoRows) && videoRows.length > 0) {
        videoRows.forEach((vr: any) => {
          const vKey = vr.video_id;
          const existing = mergedVideoProgress[vKey];
          const vrTime = new Date(vr.last_watched_at || 0).getTime();
          const exTime = new Date(existing?.lastWatchedAt || 0).getTime();

          const isCompleted = existing?.isCompleted || Boolean(vr.is_completed);
          const bestPercent = Math.max(existing?.completionPercentage || 0, vr.completion_percentage || 0);
          const bestSeconds = vrTime > exTime ? vr.last_watched_seconds : (existing?.lastWatchedSeconds || vr.last_watched_seconds);

          mergedVideoProgress[vKey] = {
            courseId: vr.course_id,
            moduleId: vr.module_id || existing?.moduleId,
            lessonId: vr.lesson_id,
            videoId: vr.video_id,
            lastWatchedSeconds: bestSeconds || 0,
            durationSeconds: vr.duration_seconds || existing?.durationSeconds || 0,
            completionPercentage: isCompleted ? Math.max(100, bestPercent) : bestPercent,
            isCompleted,
            lastWatchedAt: vrTime > exTime ? vr.last_watched_at : (existing?.lastWatchedAt || vr.last_watched_at),
          };
        });
      }
    } catch (vErr) {
      console.warn('Could not sync video progress for course:', vErr);
    }

    // Save merged state locally
    const mergedState: CourseProgressState = {
      courseId,
      completedLessonIds: mergedCompleted,
      archivedLegacyLessonIds: localState.archivedLegacyLessonIds,
      lastCompletedLessonId: localState.lastCompletedLessonId,
      lastActiveLessonId: bestActiveLessonId,
      lastAccessedAt: new Date(latestAccessDate || Date.now()).toISOString(),
      quizScores: mergedQuizScores,
      quizAttempts: mergedQuizAttempts,
      labProgress: localState.labProgress,
      capstoneSubmission: localState.capstoneSubmission,
      capstoneScore: localState.capstoneScore,
      videoProgress: mergedVideoProgress,
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
      const resolvedUuid = resolveLessonUuid(courseId, lessonId);
      if (resolvedUuid) {
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

    const dbCourseId = resolveCourseUuid(courseId);
    const dbLessonId = resolveLessonUuid(courseId, lessonId);

    if (!dbCourseId || !dbLessonId) {
      // Non-UUID courses/lessons stay in local storage
      return 'offline';
    }

    const payload = {
      user_id: user.id,
      course_id: dbCourseId,
      lesson_id: dbLessonId,
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

    const dbCourseId = resolveCourseUuid(courseId);
    const dbLessonId = resolveLessonUuid(courseId, lessonId);

    if (!dbCourseId || !dbLessonId) return;

    await (this.supabase
      .from('user_lesson_progress') as any)
      .upsert(
        {
          user_id: user.id,
          course_id: dbCourseId,
          lesson_id: dbLessonId,
          last_accessed_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,lesson_id' }
      );
  }

  async persistQuizAttemptToCloud(
    _courseId: string,
    _moduleId: string,
    _attempt: any
  ): Promise<void> {
    // Deprecated and intentionally disabled:
    // Client-side direct INSERTs are disallowed by RLS policy.
    // The server submission route (/api/courses/storytelling/quiz/submit) records trusted attempts.
    return;
  }

  async deleteCourseProgressFromCloud(courseId: string): Promise<void> {
    if (!this.supabase) return;
    const { data: { user } } = await this.supabase.auth.getUser();
    if (!user) return;

    const dbCourseId = resolveCourseUuid(courseId);
    if (!dbCourseId) return;

    await (this.supabase
      .from('user_lesson_progress') as any)
      .delete()
      .eq('user_id', user.id)
      .eq('course_id', dbCourseId);

    try {
      await (this.supabase
        .from('user_quiz_attempts') as any)
        .delete()
        .eq('user_id', user.id)
        .eq('course_id', dbCourseId);
    } catch (qErr) {
      console.warn('Could not clear user_quiz_attempts from cloud:', qErr);
    }
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

      const dbCourseId = resolveCourseUuid(progress.courseId) || progress.courseId;
      const dbLessonId = resolveLessonUuid(progress.courseId, progress.lessonId) || progress.lessonId;
      const dbModuleId = progress.moduleId ? (resolveModuleUuid(progress.courseId, progress.moduleId) || progress.moduleId) : null;

      const payload = {
        user_id: user.id,
        course_id: dbCourseId,
        module_id: dbModuleId,
        lesson_id: dbLessonId,
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
