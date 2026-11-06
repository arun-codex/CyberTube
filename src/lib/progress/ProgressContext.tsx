'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { Course, CourseProgressState, UserVideoProgress } from '../../types/course';
import {
  SyncStatus,
  CourseCardProgress,
  ProgressContextValue,
} from './progress-types';
import {
  loadCourseProgressFromStorage,
  saveCourseProgressToStorage,
  loadAllVideoProgressFromStorage,
  saveAllVideoProgressToStorage,
  saveVideoProgressRecord,
  loadPendingSyncQueue,
  enqueuePendingSync,
  clearUserCacheOnSignOut,
  setActiveUserId,
  getActiveUserId,
  COURSE_PROGRESS_EVENT,
  VIDEO_PROGRESS_EVENT,
} from './progress-storage';
import {
  fetchAllCloudLessonProgress,
  fetchAllCloudVideoProgress,
  upsertCloudLessonProgress,
  upsertCloudVideoProgress,
  flushPendingSyncQueue,
} from './progress-sync';
import { mergeCourseProgress, mergeVideoProgressRecords } from './progress-merge';
import { makeVideoProgressKey, formatSecondsToTime, formatPlaybackRatio } from './video-progress';
import { calculateCourseCardProgress } from './course-progress';
import { createClient } from '../supabase/client';
import { getAllCourses } from '../courses';

const ProgressContext = createContext<ProgressContextValue | null>(null);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [supabase] = useState(() => (typeof window !== 'undefined' ? createClient() : null));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('loading');
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(0);

  const [coursesProgress, setCoursesProgress] = useState<Record<string, CourseProgressState>>({});
  const [videosProgress, setVideosProgress] = useState<Record<string, UserVideoProgress>>({});

  const isHydratedRef = useRef(false);

  // Sync count refresher
  const updatePendingCount = useCallback(() => {
    const queue = loadPendingSyncQueue();
    setPendingSyncCount(queue.length);
  }, []);

  /**
   * Hydrates progress from local storage and optionally synchronizes with Supabase.
   */
  const hydrateProgress = useCallback(async (currentUserId?: string | null) => {
    setIsLoading(true);

    // 1. Initial synchronous load from local storage
    const allCourses = getAllCourses();
    const localCourses: Record<string, CourseProgressState> = {};
    allCourses.forEach((c) => {
      localCourses[c.id] = loadCourseProgressFromStorage(c.id);
    });
    const localVideos = loadAllVideoProgressFromStorage();

    setCoursesProgress(localCourses);
    setVideosProgress(localVideos);
    updatePendingCount();

    const activeUid = currentUserId !== undefined ? currentUserId : userId;

    if (!activeUid || !supabase) {
      setIsLoading(false);
      setSyncStatus('offline');
      isHydratedRef.current = true;
      return;
    }

    try {
      setSyncStatus('loading');

      // 2. Fetch remote progress in parallel
      const [cloudLessonMap, cloudVideoRows] = await Promise.all([
        fetchAllCloudLessonProgress(supabase, activeUid),
        fetchAllCloudVideoProgress(supabase, activeUid),
      ]);

      // 3. Deterministically merge courses progress
      const mergedCourses: Record<string, CourseProgressState> = { ...localCourses };
      const localOnlyLessonsToUpload: Array<{ courseId: string; lessonId: string }> = [];

      for (const course of allCourses) {
        const local = localCourses[course.id] || {
          courseId: course.id,
          completedLessonIds: [],
          lastAccessedAt: new Date().toISOString(),
        };
        const cloudRows = cloudLessonMap[course.id] || [];
        const merged = mergeCourseProgress(local, cloudRows);
        mergedCourses[course.id] = merged;
        saveCourseProgressToStorage(merged);

        // Find local-only completed lessons to backfill to cloud
        const cloudLessonIds = new Set(cloudRows.filter((r) => r.is_completed).map((r) => String(r.lesson_id)));
        (local.completedLessonIds || []).forEach((lid) => {
          if (!cloudLessonIds.has(lid)) {
            localOnlyLessonsToUpload.push({ courseId: course.id, lessonId: lid });
          }
        });
      }

      // 4. Deterministically merge video progress
      const mergedVideos = mergeVideoProgressRecords(localVideos, cloudVideoRows);
      setVideosProgress(mergedVideos);
      saveAllVideoProgressToStorage(mergedVideos);
      setCoursesProgress(mergedCourses);

      setSyncStatus('synced');
      setIsLoading(false);
      isHydratedRef.current = true;

      // 5. Backfill local-only lessons and flush pending queue in the background
      for (const item of localOnlyLessonsToUpload) {
        await upsertCloudLessonProgress(supabase, activeUid, item.courseId, item.lessonId, true);
      }
      await flushPendingSyncQueue(supabase, activeUid);
      updatePendingCount();
    } catch (err: any) {
      console.warn('[ProgressContext] Hydration failed, using local state:', err?.message || err);
      setSyncStatus('error');
      setIsLoading(false);
      isHydratedRef.current = true;
    }
  }, [supabase, userId, updatePendingCount]);

  // Auth listener and initial bootstrap
  useEffect(() => {
    let isMounted = true;

    if (!supabase) {
      hydrateProgress(null);
      return;
    }

    supabase.auth.getUser().then(({ data, error }) => {
      if (!isMounted) return;
      if (!error && data?.user) {
        setIsAuthenticated(true);
        setUserId(data.user.id);
        setActiveUserId(data.user.id);
        hydrateProgress(data.user.id);
      } else {
        setIsAuthenticated(false);
        setUserId(null);
        setActiveUserId(null);
        hydrateProgress(null);
      }
    });

    const { data: authSub } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isMounted) return;
      if (event === 'SIGNED_IN' && session?.user) {
        setIsAuthenticated(true);
        setUserId(session.user.id);
        setActiveUserId(session.user.id);
        hydrateProgress(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setUserId(null);
        clearUserCacheOnSignOut();
        setActiveUserId(null);
        hydrateProgress(null);
      }
    });

    return () => {
      isMounted = false;
      authSub?.subscription?.unsubscribe();
    };
  }, [supabase, hydrateProgress]);

  // Listen to network online / offline events
  useEffect(() => {
    const handleOnline = () => {
      if (userId && supabase) {
        setSyncStatus('saving');
        flushPendingSyncQueue(supabase, userId).then(() => {
          setSyncStatus('synced');
          updatePendingCount();
        });
      } else {
        setSyncStatus('offline');
      }
    };

    const handleOffline = () => {
      setSyncStatus('offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [supabase, userId, updatePendingCount]);

  // Listen to local progress events from other components/tabs
  useEffect(() => {
    const handleCourseProgressChanged = (e: Event) => {
      const customEvent = e as CustomEvent<CourseProgressState>;
      if (customEvent.detail?.courseId) {
        setCoursesProgress((prev) => ({
          ...prev,
          [customEvent.detail.courseId]: customEvent.detail,
        }));
      }
    };

    const handleVideoProgressChanged = (e: Event) => {
      const customEvent = e as CustomEvent<{ key: string; progress: UserVideoProgress }>;
      if (customEvent.detail?.key && customEvent.detail?.progress) {
        setVideosProgress((prev) => ({
          ...prev,
          [customEvent.detail.key]: customEvent.detail.progress,
        }));
      }
    };

    window.addEventListener(COURSE_PROGRESS_EVENT, handleCourseProgressChanged);
    window.addEventListener(VIDEO_PROGRESS_EVENT, handleVideoProgressChanged);
    return () => {
      window.removeEventListener(COURSE_PROGRESS_EVENT, handleCourseProgressChanged);
      window.removeEventListener(VIDEO_PROGRESS_EVENT, handleVideoProgressChanged);
    };
  }, []);

  const getCourseProgress = useCallback(
    (courseId: string): CourseProgressState => {
      if (coursesProgress[courseId]) {
        return coursesProgress[courseId];
      }
      return loadCourseProgressFromStorage(courseId);
    },
    [coursesProgress]
  );

  const getCourseCardProgress = useCallback(
    (course: Course): CourseCardProgress => {
      const state = coursesProgress[course.id] || loadCourseProgressFromStorage(course.id);
      return calculateCourseCardProgress(course, state, !isAuthenticated);
    },
    [coursesProgress, isAuthenticated]
  );

  const getVideoProgress = useCallback(
    (courseId: string, lessonId: string, videoId: string): UserVideoProgress | undefined => {
      const key = makeVideoProgressKey(courseId, lessonId, videoId);
      if (videosProgress[key]) return videosProgress[key];
      const courseState = coursesProgress[courseId];
      return courseState?.videoProgress?.[videoId];
    },
    [videosProgress, coursesProgress]
  );

  const toggleLessonCompletion = useCallback(
    (courseId: string, lessonId: string): boolean => {
      const current = coursesProgress[courseId] || loadCourseProgressFromStorage(courseId);
      const isCompleted = current.completedLessonIds.includes(lessonId);
      const updatedIds = isCompleted
        ? current.completedLessonIds.filter((id) => id !== lessonId)
        : [...current.completedLessonIds, lessonId];

      const updatedState: CourseProgressState = {
        ...current,
        completedLessonIds: updatedIds,
        lastCompletedLessonId: !isCompleted ? lessonId : current.lastCompletedLessonId,
        lastAccessedAt: new Date().toISOString(),
      };

      saveCourseProgressToStorage(updatedState);
      setCoursesProgress((prev) => ({ ...prev, [courseId]: updatedState }));

      if (userId && supabase) {
        setSyncStatus('saving');
        upsertCloudLessonProgress(supabase, userId, courseId, lessonId, !isCompleted)
          .then((success) => {
            setSyncStatus(success ? 'synced' : 'error');
            if (!success) {
              enqueuePendingSync({
                type: 'lesson',
                courseId,
                lessonId,
                payload: { isCompleted: !isCompleted },
              });
              updatePendingCount();
            }
          })
          .catch(() => {
            setSyncStatus('error');
            enqueuePendingSync({
              type: 'lesson',
              courseId,
              lessonId,
              payload: { isCompleted: !isCompleted },
            });
            updatePendingCount();
          });
      } else {
        setSyncStatus('offline');
      }

      return !isCompleted;
    },
    [coursesProgress, userId, supabase, updatePendingCount]
  );

  const setLessonCompleted = useCallback(
    (courseId: string, lessonId: string, completed: boolean): void => {
      const current = coursesProgress[courseId] || loadCourseProgressFromStorage(courseId);
      const isCompleted = current.completedLessonIds.includes(lessonId);
      if (isCompleted === completed) return;

      const updatedIds = completed
        ? [...current.completedLessonIds, lessonId]
        : current.completedLessonIds.filter((id) => id !== lessonId);

      const updatedState: CourseProgressState = {
        ...current,
        completedLessonIds: updatedIds,
        lastCompletedLessonId: completed ? lessonId : current.lastCompletedLessonId,
        lastAccessedAt: new Date().toISOString(),
      };

      saveCourseProgressToStorage(updatedState);
      setCoursesProgress((prev) => ({ ...prev, [courseId]: updatedState }));

      if (userId && supabase) {
        setSyncStatus('saving');
        upsertCloudLessonProgress(supabase, userId, courseId, lessonId, completed)
          .then((success) => {
            setSyncStatus(success ? 'synced' : 'error');
            if (!success) {
              enqueuePendingSync({
                type: 'lesson',
                courseId,
                lessonId,
                payload: { isCompleted: completed },
              });
              updatePendingCount();
            }
          })
          .catch(() => {
            setSyncStatus('error');
            enqueuePendingSync({
              type: 'lesson',
              courseId,
              lessonId,
              payload: { isCompleted: completed },
            });
            updatePendingCount();
          });
      } else {
        setSyncStatus('offline');
      }
    },
    [coursesProgress, userId, supabase, updatePendingCount]
  );

  const recordLessonAccess = useCallback(
    (courseId: string, lessonId: string): void => {
      const current = coursesProgress[courseId] || loadCourseProgressFromStorage(courseId);
      if (current.lastActiveLessonId === lessonId) return;

      const updatedState: CourseProgressState = {
        ...current,
        lastActiveLessonId: lessonId,
        lastAccessedAt: new Date().toISOString(),
      };

      saveCourseProgressToStorage(updatedState);
      setCoursesProgress((prev) => ({ ...prev, [courseId]: updatedState }));
    },
    [coursesProgress]
  );

  const recordVideoProgress = useCallback(
    async (progress: UserVideoProgress): Promise<void> => {
      const key = makeVideoProgressKey(progress.courseId, progress.lessonId, progress.videoId);

      // Save locally immediately
      saveVideoProgressRecord(progress);
      setVideosProgress((prev) => ({ ...prev, [key]: progress }));

      if (userId && supabase) {
        setSyncStatus('saving');
        try {
          const success = await upsertCloudVideoProgress(supabase, userId, progress);
          if (success) {
            setSyncStatus('synced');
          } else {
            setSyncStatus('pending');
            enqueuePendingSync({
              type: 'video',
              courseId: progress.courseId,
              lessonId: progress.lessonId,
              videoId: progress.videoId,
              payload: progress,
            });
            updatePendingCount();
          }
        } catch {
          setSyncStatus('pending');
          enqueuePendingSync({
            type: 'video',
            courseId: progress.courseId,
            lessonId: progress.lessonId,
            videoId: progress.videoId,
            payload: progress,
          });
          updatePendingCount();
        }
      } else {
        setSyncStatus('offline');
      }
    },
    [userId, supabase, updatePendingCount]
  );

  const resetCourseProgress = useCallback(
    async (courseId: string): Promise<void> => {
      const resetState: CourseProgressState = {
        courseId,
        completedLessonIds: [],
        lastAccessedAt: new Date().toISOString(),
      };
      saveCourseProgressToStorage(resetState);
      setCoursesProgress((prev) => ({ ...prev, [courseId]: resetState }));

      if (userId && supabase) {
        try {
          await (supabase.from('user_lesson_progress') as any)
            .delete()
            .eq('user_id', userId)
            .eq('course_id', courseId);
          await (supabase.from('user_lesson_video_progress') as any)
            .delete()
            .eq('user_id', userId)
            .eq('course_id', courseId);
        } catch (err) {
          console.warn('[ProgressContext] Failed to reset cloud course progress:', err);
        }
      }
    },
    [userId, supabase]
  );

  const refreshProgress = useCallback(async () => {
    await hydrateProgress();
  }, [hydrateProgress]);

  const syncPendingProgress = useCallback(async () => {
    if (userId && supabase) {
      setSyncStatus('saving');
      await flushPendingSyncQueue(supabase, userId);
      setSyncStatus('synced');
      updatePendingCount();
    }
  }, [userId, supabase, updatePendingCount]);

  const contextValue: ProgressContextValue = {
    isAuthenticated,
    userId,
    isLoading,
    syncStatus,
    pendingSyncCount,
    coursesProgress,
    videosProgress,
    getCourseProgress,
    getCourseCardProgress,
    getVideoProgress,
    toggleLessonCompletion,
    setLessonCompleted,
    recordLessonAccess,
    recordVideoProgress,
    resetCourseProgress,
    refreshProgress,
    syncPendingProgress,
  };

  return <ProgressContext.Provider value={contextValue}>{children}</ProgressContext.Provider>;
};

/**
 * Hook to access authentication and progress sync status.
 */
export function useAuthProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error('useAuthProgress must be used within a ProgressProvider');
  }
  return {
    isAuthenticated: ctx.isAuthenticated,
    userId: ctx.userId,
    isLoading: ctx.isLoading,
    syncStatus: ctx.syncStatus,
    pendingSyncCount: ctx.pendingSyncCount,
    refreshProgress: ctx.refreshProgress,
    syncPendingProgress: ctx.syncPendingProgress,
  };
}

/**
 * Hook to access and update course-level progress.
 */
export function useCourseProgress(courseId: string) {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error('useCourseProgress must be used within a ProgressProvider');
  }

  const progress = ctx.getCourseProgress(courseId);
  const isLessonCompleted = useCallback(
    (lessonId: string) => progress.completedLessonIds.includes(lessonId),
    [progress.completedLessonIds]
  );

  return {
    progress,
    isLessonCompleted,
    toggleLessonCompletion: (lessonId: string) => ctx.toggleLessonCompletion(courseId, lessonId),
    setLessonCompleted: (lessonId: string, completed: boolean) =>
      ctx.setLessonCompleted(courseId, lessonId, completed),
    recordLessonAccess: (lessonId: string) => ctx.recordLessonAccess(courseId, lessonId),
    resetCourseProgress: () => ctx.resetCourseProgress(courseId),
    isLoading: ctx.isLoading,
    syncStatus: ctx.syncStatus,
  };
}

/**
 * Hook to access and track video watch position and completion.
 */
export function useVideoProgress(courseId: string, lessonId: string, videoId: string) {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error('useVideoProgress must be used within a ProgressProvider');
  }

  const progress = ctx.getVideoProgress(courseId, lessonId, videoId);
  const resumeSeconds = progress?.lastWatchedSeconds || 0;
  const isCompleted = progress?.isCompleted || false;
  const completionPercentage = progress?.completionPercentage || 0;

  const formattedTime = progress
    ? formatPlaybackRatio(progress.lastWatchedSeconds, progress.durationSeconds)
    : '00:00 / 00:00';

  const saveProgress = useCallback(
    async (currentSeconds: number, durationSeconds: number, moduleId?: string, forceCompleted = false) => {
      const safeDuration = Math.max(0, Math.floor(durationSeconds));
      const safePosition = Math.max(0, Math.floor(currentSeconds));

      let percent = 0;
      if (safeDuration > 0) {
        percent = Math.min(100, Math.round((safePosition / safeDuration) * 100));
      }

      const prevPercent = progress?.completionPercentage || 0;
      const bestPercent = Math.max(percent, prevPercent);
      const completed = forceCompleted || progress?.isCompleted || bestPercent >= 90;

      const payload: UserVideoProgress = {
        courseId,
        moduleId: moduleId || progress?.moduleId,
        lessonId,
        videoId,
        lastWatchedSeconds: safePosition,
        durationSeconds: safeDuration || progress?.durationSeconds || 0,
        completionPercentage: completed ? Math.max(100, bestPercent) : bestPercent,
        isCompleted: completed,
        lastWatchedAt: new Date().toISOString(),
      };

      await ctx.recordVideoProgress(payload);
    },
    [ctx, courseId, lessonId, videoId, progress]
  );

  const markWatched = useCallback(
    async (moduleId?: string) => {
      const duration = progress?.durationSeconds || 60;
      await saveProgress(duration, duration, moduleId, true);
    },
    [progress, saveProgress]
  );

  return {
    progress,
    resumeSeconds,
    isCompleted,
    completionPercentage,
    formattedTime,
    saveProgress,
    markWatched,
    isLoading: ctx.isLoading,
  };
}

/**
 * Hook for course directory/catalog pages.
 */
export function useAllCoursesProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error('useAllCoursesProgress must be used within a ProgressProvider');
  }

  return {
    coursesProgress: ctx.coursesProgress,
    getCourseCardProgress: ctx.getCourseCardProgress,
    isLoading: ctx.isLoading,
    syncStatus: ctx.syncStatus,
    isAuthenticated: ctx.isAuthenticated,
  };
}
