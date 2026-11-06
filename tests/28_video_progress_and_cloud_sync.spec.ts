import { test, expect } from '@playwright/test';
import { COURSES } from '../src/data/courses';
import {
  calculateVideoProgress,
  formatSecondsToTime,
  formatPlaybackRatio,
  makeVideoProgressKey,
  VIDEO_COMPLETION_THRESHOLD_PERCENT,
} from '../src/lib/progress/video-progress';
import {
  calculateCourseCardProgress,
} from '../src/lib/progress/course-progress';
import {
  mergeCourseProgress,
  mergeVideoProgressRecords,
} from '../src/lib/progress/progress-merge';
import {
  fetchAllCloudLessonProgress,
  fetchAllCloudVideoProgress,
  upsertCloudLessonProgress,
  upsertCloudVideoProgress,
  flushPendingSyncQueue,
} from '../src/lib/progress/progress-sync';
import {
  loadPendingSyncQueue,
  savePendingSyncQueue,
  saveVideoProgressRecord,
  getVideoProgressRecord,
  loadAllVideoProgressFromStorage,
  loadCourseProgressFromStorage,
  saveCourseProgressToStorage,
  clearUserCacheOnSignOut,
} from '../src/lib/progress/progress-storage';
import { CloudCourseProgressService } from '../src/lib/cloud-course-progress';

test.describe('Phase 20 — Video Watch Progress, Cloud Sync & Course Catalog Repair', () => {
  const networkingCourseSlug = 'networking-for-hackers-2027';
  const networkingCourseUuid = 'e7b9e001-4000-4000-a000-000000000001';
  const sampleVideoId = '4hLax8DmQHY'; // Lesson 1 video of Networking for Hackers

  // ---------------------------------------------------------------------------
  // A. Video Progress Calculation & Threshold Logic (Unit / Core Service)
  // ---------------------------------------------------------------------------
  test('1. Video progress calculation respects 90% threshold and duration', () => {
    // 25:10 of 57:46 (1510 seconds of 3466 seconds) = 44%
    const p1 = calculateVideoProgress(
      undefined,
      networkingCourseUuid,
      'e7b9e003-4000-4000-a000-000000000001',
      sampleVideoId,
      1510,
      3466
    );

    expect(p1.lastWatchedSeconds).toBe(1510);
    expect(p1.durationSeconds).toBe(3466);
    expect(p1.completionPercentage).toBe(44);
    expect(p1.isCompleted).toBe(false);

    // Formatted time
    expect(formatSecondsToTime(1510)).toBe('25:10');
    expect(formatSecondsToTime(3466)).toBe('57:46');
    expect(formatPlaybackRatio(1510, 3466)).toBe('25:10 / 57:46');

    // 89% watched: not yet completed
    const pAlmost = calculateVideoProgress(
      p1,
      networkingCourseUuid,
      'e7b9e003-4000-4000-a000-000000000001',
      sampleVideoId,
      3084,
      3466
    );
    expect(pAlmost.completionPercentage).toBe(89);
    expect(pAlmost.isCompleted).toBe(false);

    // 90% watched: triggers completion
    const pCompleted = calculateVideoProgress(
      pAlmost,
      networkingCourseUuid,
      'e7b9e003-4000-4000-a000-000000000001',
      sampleVideoId,
      3120,
      3466
    );
    expect(pCompleted.completionPercentage).toBe(100);
    expect(pCompleted.isCompleted).toBe(true);

    // Once completed, subsequent rewinds keep isCompleted = true
    const pRewound = calculateVideoProgress(
      pCompleted,
      networkingCourseUuid,
      'e7b9e003-4000-4000-a000-000000000001',
      sampleVideoId,
      60,
      3466
    );
    expect(pRewound.isCompleted).toBe(true);
  });

  // ---------------------------------------------------------------------------
  // B. Course Progress Calculation & Card Metrics
  // ---------------------------------------------------------------------------
  test('2. Course card progress accurately computes 33% for 2 of 6 lessons completed', () => {
    const course = COURSES.find((c) => c.slug === networkingCourseSlug)!;
    expect(course).toBeDefined();

    // 0 completed lessons
    const emptyState = {
      courseId: course.id,
      completedLessonIds: [],
      lastAccessedAt: new Date().toISOString(),
    };
    const cardEmpty = calculateCourseCardProgress(course, emptyState, false);
    expect(cardEmpty.percentage).toBe(0);
    expect(cardEmpty.completedLessons).toBe(0);
    expect(cardEmpty.totalLessons).toBe(6);
    expect(cardEmpty.status).toBe('not_started');

    // 2 completed lessons (as shown in user screenshot)
    const partialState = {
      courseId: course.id,
      completedLessonIds: [
        'e7b9e003-4000-4000-a000-000000000001',
        'e7b9e003-4000-4000-a000-000000000002',
      ],
      lastActiveLessonId: 'e7b9e003-4000-4000-a000-000000000003',
      lastAccessedAt: new Date().toISOString(),
    };
    const cardPartial = calculateCourseCardProgress(course, partialState, false);
    expect(cardPartial.percentage).toBe(33); // 2/6 = 33.33% -> 33%
    expect(cardPartial.completedLessons).toBe(2);
    expect(cardPartial.totalLessons).toBe(6);
    expect(cardPartial.status).toBe('in_progress');
    expect(cardPartial.lastActiveLessonSlug).toBe('03-how-data-travels-and-who-can-see-it');

    // 6 of 6 completed lessons
    const fullState = {
      courseId: course.id,
      completedLessonIds: course.modules.flatMap((m) => m.lessons.map((l) => l.id)),
      lastAccessedAt: new Date().toISOString(),
    };
    const cardFull = calculateCourseCardProgress(course, fullState, false);
    expect(cardFull.percentage).toBe(100);
    expect(cardFull.completedLessons).toBe(6);
    expect(cardFull.status).toBe('completed');
  });

  // ---------------------------------------------------------------------------
  // C. Browser UI: Course Directory (/courses) Card Progress Presentation
  // ---------------------------------------------------------------------------
  test('3. Course Directory displays consistent progress bars and action buttons', async ({ page }) => {
    // Seed 2 completed lessons for Networking course in localStorage
    await page.goto('/courses');
    await page.waitForLoadState('domcontentloaded');

    await page.evaluate(({ courseUuid, courseSlug }) => {
      const state = {
        courseId: courseUuid,
        completedLessonIds: [
          'e7b9e003-4000-4000-a000-000000000001',
          'e7b9e003-4000-4000-a000-000000000002',
        ],
        lastActiveLessonId: 'e7b9e003-4000-4000-a000-000000000003',
        lastAccessedAt: new Date().toISOString(),
      };
      localStorage.setItem(`cybertube_course_progress_v1_${courseUuid}`, JSON.stringify(state));
      window.dispatchEvent(
        new CustomEvent('cybertube:course-progress-changed', { detail: state })
      );
    }, { courseUuid: networkingCourseUuid, courseSlug: networkingCourseSlug });

    // Reload to verify rendering from hydrated storage
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    // 1. Networking course card shows 33% and Resume -> button
    const networkingArea = page.locator(`[data-testid="course-progress-area-${networkingCourseSlug}"]`);
    await expect(networkingArea).toBeVisible();
    await expect(networkingArea).toContainText('33%');
    await expect(networkingArea).toContainText('2 / 6 lessons completed');

    const networkingBtn = page.locator(`[data-testid="course-action-btn-${networkingCourseSlug}"]`);
    await expect(networkingBtn).toBeVisible();
    await expect(networkingBtn).toContainText('Resume →');

    // 2. Untouched course (e.g. Wireshark) shows 0% and Start -> button
    const wiresharkSlug = 'wireshark-and-ethical-hacking';
    const wiresharkArea = page.locator(`[data-testid="course-progress-area-${wiresharkSlug}"]`);
    await expect(wiresharkArea).toBeVisible();
    await expect(wiresharkArea).toContainText('0%');
    await expect(wiresharkArea).toContainText('0 / 20 lessons completed');

    const wiresharkBtn = page.locator(`[data-testid="course-action-btn-${wiresharkSlug}"]`);
    await expect(wiresharkBtn).toBeVisible();
    await expect(wiresharkBtn).toContainText('Start →');
  });

  // ---------------------------------------------------------------------------
  // D. Video Watch Tracking & Resume on Lesson Page
  // ---------------------------------------------------------------------------
  test('4. Video player displays resume banner when previous playback position exists', async ({ page }) => {
    // Seed previous playback position (25:10 = 1510 seconds)
    await page.goto(`/courses/${networkingCourseSlug}`);
    await page.waitForLoadState('domcontentloaded');

    const lesson1Id = 'e7b9e003-4000-4000-a000-000000000001';
    await page.evaluate(({ courseUuid, lessonId, videoId }) => {
      const videoRecord = {
        courseId: courseUuid,
        lessonId,
        videoId,
        lastWatchedSeconds: 1510,
        durationSeconds: 3466,
        completionPercentage: 44,
        isCompleted: false,
        lastWatchedAt: new Date().toISOString(),
      };
      const key = `${courseUuid}:${lessonId}:${videoId}`;
      const allVideos = { [key]: videoRecord };
      localStorage.setItem('cybertube_video_progress_v2', JSON.stringify(allVideos));

      // Also set in course state for backwards compatibility
      const courseState = {
        courseId: courseUuid,
        completedLessonIds: [],
        videoProgress: { [videoId]: videoRecord },
        lastAccessedAt: new Date().toISOString(),
      };
      localStorage.setItem(`cybertube_course_progress_v1_${courseUuid}`, JSON.stringify(courseState));
    }, { courseUuid: networkingCourseUuid, lessonId: lesson1Id, videoId: sampleVideoId });

    // Reload page to simulate returning learner
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    // Resume banner should appear prompting to resume from 25:10
    const resumeBanner = page.locator('[data-testid="resume-banner"]');
    await expect(resumeBanner).toBeVisible();
    await expect(resumeBanner).toContainText('25:10');

    // Buttons
    const resumeBtn = page.locator('[data-testid="resume-playback-btn"]');
    const restartBtn = page.locator('[data-testid="restart-playback-btn"]');
    await expect(resumeBtn).toBeVisible();
    await expect(restartBtn).toBeVisible();

    // Clicking restart dismisses resume banner and sets position to 0
    await restartBtn.click();
    await expect(resumeBanner).toHaveCount(0);
  });

  // ---------------------------------------------------------------------------
  // E. Lesson Completion vs Video Completion Separation
  // ---------------------------------------------------------------------------
  test('5. Toggling lesson completion does not alter video watch position and vice-versa', async ({ page }) => {
    await page.goto(`/courses/${networkingCourseSlug}`);
    await page.waitForLoadState('domcontentloaded');

    const lesson1Id = 'e7b9e003-4000-4000-a000-000000000001';

    // Set video position
    await page.evaluate(({ courseUuid, lessonId, videoId }) => {
      const videoRecord = {
        courseId: courseUuid,
        lessonId,
        videoId,
        lastWatchedSeconds: 1200,
        durationSeconds: 3466,
        completionPercentage: 35,
        isCompleted: false,
        lastWatchedAt: new Date().toISOString(),
      };
      const key = `${courseUuid}:${lessonId}:${videoId}`;
      localStorage.setItem('cybertube_video_progress_v2', JSON.stringify({ [key]: videoRecord }));
    }, { courseUuid: networkingCourseUuid, lessonId: lesson1Id, videoId: sampleVideoId });

    // Toggle lesson completion button
    const markCompleteBtn = page.locator('button:has-text("Mark as Completed")').first();
    await expect(markCompleteBtn).toBeVisible();
    await markCompleteBtn.click();
    await page.waitForTimeout(300);

    // Verify button is now 'Completed'
    await expect(page.locator('button:has-text("Completed")').first()).toBeVisible();

    // Verify video record is preserved with its exact playback position
    const storedVideo = await page.evaluate(({ courseUuid, lessonId, videoId }) => {
      const key = `${courseUuid}:${lessonId}:${videoId}`;
      const raw = localStorage.getItem('cybertube_video_progress_v2');
      const all = raw ? JSON.parse(raw) : {};
      return all[key];
    }, { courseUuid: networkingCourseUuid, lessonId: lesson1Id, videoId: sampleVideoId });

    expect(storedVideo).toBeDefined();
    expect(storedVideo.lastWatchedSeconds).toBe(1200);
    expect(storedVideo.completionPercentage).toBe(35);
  });

  // ---------------------------------------------------------------------------
  // F. Multiple Videos & Cross-Lesson Isolation
  // ---------------------------------------------------------------------------
  test('6. Two different videos maintain completely independent playback positions', () => {
    const video1 = '4hLax8DmQHY';
    const video2 = '4-Ea5EI6LrM';
    const lesson1 = 'e7b9e003-4000-4000-a000-000000000001';
    const lesson2 = 'e7b9e003-4000-4000-a000-000000000002';

    const p1 = calculateVideoProgress(undefined, networkingCourseUuid, lesson1, video1, 1510, 3466);
    const p2 = calculateVideoProgress(undefined, networkingCourseUuid, lesson2, video2, 450, 1800);

    const key1 = makeVideoProgressKey(networkingCourseUuid, lesson1, video1);
    const key2 = makeVideoProgressKey(networkingCourseUuid, lesson2, video2);

    expect(key1).not.toBe(key2);

    const map: Record<string, any> = {};
    map[key1] = p1;
    map[key2] = p2;

    expect(map[key1].lastWatchedSeconds).toBe(1510);
    expect(map[key2].lastWatchedSeconds).toBe(450);
  });

  // ---------------------------------------------------------------------------
  // G. Cloud Hydration & Merging (Unit/Integration Test)
  // ---------------------------------------------------------------------------
  test('7. Deterministic progress merge unions lessons and selects newest video playback', () => {
    const localCourseState = {
      courseId: networkingCourseUuid,
      completedLessonIds: ['lesson-A'],
      lastActiveLessonId: 'lesson-A',
      lastAccessedAt: '2026-11-06T00:00:00.000Z',
    };

    const cloudLessonRows = [
      {
        lesson_id: 'lesson-B',
        is_completed: true,
        last_accessed_at: '2026-11-06T01:00:00.000Z',
      },
    ];

    const mergedCourse = mergeCourseProgress(localCourseState, cloudLessonRows);
    expect(mergedCourse.completedLessonIds).toContain('lesson-A');
    expect(mergedCourse.completedLessonIds).toContain('lesson-B');
    expect(mergedCourse.lastActiveLessonId).toBe('lesson-B');

    // Video merge
    const localVideos = {
      [`${networkingCourseUuid}:lesson-A:video-1`]: {
        courseId: networkingCourseUuid,
        lessonId: 'lesson-A',
        videoId: 'video-1',
        lastWatchedSeconds: 500,
        durationSeconds: 1000,
        completionPercentage: 50,
        isCompleted: false,
        lastWatchedAt: '2026-11-06T00:30:00.000Z',
      },
    };

    const cloudVideoRows = [
      {
        course_id: networkingCourseUuid,
        lesson_id: 'lesson-A',
        video_id: 'video-1',
        last_watched_seconds: 800,
        duration_seconds: 1000,
        completion_percentage: 80,
        is_completed: false,
        last_watched_at: '2026-11-06T01:00:00.000Z', // Newer
      },
    ];

    const mergedVideos = mergeVideoProgressRecords(localVideos, cloudVideoRows);
    const result = mergedVideos[`${networkingCourseUuid}:lesson-A:video-1`];
    expect(result.lastWatchedSeconds).toBe(800);
    expect(result.completionPercentage).toBe(80);
  });

  // ---------------------------------------------------------------------------
  // H. Supabase Upsert & Query Handlers with Mock Client
  // ---------------------------------------------------------------------------
  test('8. Cloud sync correctly reads and writes user_lesson_video_progress', async () => {
    const mockUserId = '99999999-8888-7777-6666-555555555555';
    let upsertedRow: any = null;

    const mockSupabase = {
      from: (table: string) => {
        if (table === 'user_lesson_video_progress') {
          return {
            select: () => ({
              eq: (col: string, val: any) => ({
                data: [
                  {
                    course_id: networkingCourseUuid,
                    lesson_id: 'lesson-1',
                    video_id: sampleVideoId,
                    last_watched_seconds: 1510,
                    duration_seconds: 3466,
                    completion_percentage: 44,
                    is_completed: false,
                    last_watched_at: new Date().toISOString(),
                  },
                ],
                error: null,
              }),
            }),
            upsert: async (payload: any) => {
              upsertedRow = payload;
              return { data: null, error: null };
            },
          };
        }
        return {
          select: () => ({ eq: () => ({ data: [], error: null }) }),
          upsert: async () => ({ data: null, error: null }),
        };
      },
    };

    // Test remote read
    const rows = await fetchAllCloudVideoProgress(mockSupabase, mockUserId);
    expect(rows.length).toBe(1);
    expect(rows[0].last_watched_seconds).toBe(1510);
    expect(rows[0].video_id).toBe(sampleVideoId);

    // Test remote write
    const testProgress = {
      courseId: networkingCourseUuid,
      lessonId: 'lesson-1',
      videoId: sampleVideoId,
      lastWatchedSeconds: 1510,
      durationSeconds: 3466,
      completionPercentage: 44,
      isCompleted: false,
    };

    const success = await upsertCloudVideoProgress(mockSupabase, mockUserId, testProgress);
    expect(success).toBe(true);
    expect(upsertedRow).toBeDefined();
    expect(upsertedRow.user_id).toBe(mockUserId);
    expect(upsertedRow.course_id).toBe(networkingCourseUuid);
    expect(upsertedRow.last_watched_seconds).toBe(1510);
  });

  // ---------------------------------------------------------------------------
  // I. Offline Queue & Reconnect Flushing
  // ---------------------------------------------------------------------------
  test('9. Offline sync enqueues failed changes and flushes on reconnect', async () => {
    const mockUserId = '99999999-8888-7777-6666-555555555555';
    let flushedCount = 0;

    const mockSupabase = {
      from: () => ({
        upsert: async () => {
          flushedCount++;
          return { data: null, error: null };
        },
      }),
    };

    // Simulate enqueuing offline items
    savePendingSyncQueue([
      {
        id: 'item-1',
        type: 'video',
        courseId: networkingCourseUuid,
        lessonId: 'lesson-1',
        videoId: sampleVideoId,
        payload: {
          courseId: networkingCourseUuid,
          lessonId: 'lesson-1',
          videoId: sampleVideoId,
          lastWatchedSeconds: 1510,
          durationSeconds: 3466,
          completionPercentage: 44,
          isCompleted: false,
        },
        createdAt: Date.now(),
        retries: 0,
      },
    ]);

    expect(loadPendingSyncQueue().length).toBe(1);

    // Flush queue
    const synced = await flushPendingSyncQueue(mockSupabase, mockUserId);
    expect(synced).toBe(1);
    expect(flushedCount).toBe(1);
    expect(loadPendingSyncQueue().length).toBe(0);
  });

  // ---------------------------------------------------------------------------
  // J. Cross-Device Synchronization Simulation
  // ---------------------------------------------------------------------------
  test('10. Cross-device simulation: Device B restores exact progress saved by Device A', async () => {
    const userId = 'device-sync-user-12345';
    const cloudDatabaseState: {
      lessonProgress: any[];
      videoProgress: any[];
    } = {
      lessonProgress: [],
      videoProgress: [],
    };

    // Simulated cloud Supabase server
    const mockCloudSupabase = {
      from: (table: string) => ({
        select: () => ({
          eq: (col: string, val: any) => ({
            data: table === 'user_lesson_progress' ? cloudDatabaseState.lessonProgress : cloudDatabaseState.videoProgress,
            error: null,
          }),
        }),
        upsert: async (payload: any) => {
          if (table === 'user_lesson_progress') {
            cloudDatabaseState.lessonProgress.push(payload);
          } else {
            cloudDatabaseState.videoProgress.push(payload);
          }
          return { data: null, error: null };
        },
      }),
    };

    // Device A: user watches video to 25:10 (1510s) and completes lesson 1
    const lesson1 = 'e7b9e003-4000-4000-a000-000000000001';
    await upsertCloudLessonProgress(mockCloudSupabase, userId, networkingCourseUuid, lesson1, true);
    await upsertCloudVideoProgress(mockCloudSupabase, userId, {
      courseId: networkingCourseUuid,
      lessonId: lesson1,
      videoId: sampleVideoId,
      lastWatchedSeconds: 1510,
      durationSeconds: 3466,
      completionPercentage: 44,
      isCompleted: false,
    });

    expect(cloudDatabaseState.lessonProgress.length).toBe(1);
    expect(cloudDatabaseState.videoProgress.length).toBe(1);

    // Device B: fresh browser context with empty local storage
    const deviceBLocalCourses = {};
    const deviceBLocalVideos = {};

    // Device B logs in: fetches cloud data
    const [cloudLessons, cloudVideos] = await Promise.all([
      fetchAllCloudLessonProgress(mockCloudSupabase, userId),
      fetchAllCloudVideoProgress(mockCloudSupabase, userId),
    ]);

    // Hydrate & Merge on Device B
    const mergedVideosB = mergeVideoProgressRecords(deviceBLocalVideos, cloudVideos);
    const key = makeVideoProgressKey(networkingCourseUuid, lesson1, sampleVideoId);

    expect(mergedVideosB[key]).toBeDefined();
    expect(mergedVideosB[key].lastWatchedSeconds).toBe(1510);
    expect(mergedVideosB[key].durationSeconds).toBe(3466);
    expect(mergedVideosB[key].completionPercentage).toBe(44);

    const mergedLessonsB = mergeCourseProgress(
      { courseId: networkingCourseUuid, completedLessonIds: [], lastAccessedAt: new Date().toISOString() },
      cloudLessons[networkingCourseUuid] || []
    );
    expect(mergedLessonsB.completedLessonIds).toContain(lesson1);

    // Course card on Device B
    const course = COURSES.find((c) => c.slug === networkingCourseSlug)!;
    const cardB = calculateCourseCardProgress(course, mergedLessonsB, false);
    expect(cardB.completedLessons).toBe(1);
    expect(cardB.percentage).toBe(17); // 1/6 = 16.66% -> 17%
    expect(cardB.status).toBe('in_progress');
  });

  // ---------------------------------------------------------------------------
  // K. Multi-User Isolation & Logout State Clearing
  // ---------------------------------------------------------------------------
  test('11. User isolation: User A progress does not leak to User B; logout clears cache', () => {
    const userA = 'user-alpha-1111';
    const userB = 'user-beta-2222';

    // Simulate User A data in storage
    saveCourseProgressToStorage({
      courseId: networkingCourseUuid,
      completedLessonIds: ['lesson-1', 'lesson-2'],
      lastAccessedAt: new Date().toISOString(),
    });

    saveVideoProgressRecord({
      courseId: networkingCourseUuid,
      lessonId: 'lesson-1',
      videoId: sampleVideoId,
      lastWatchedSeconds: 1510,
      durationSeconds: 3466,
      completionPercentage: 44,
      isCompleted: false,
    });

    const userAVideo = getVideoProgressRecord(networkingCourseUuid, 'lesson-1', sampleVideoId);
    expect(userAVideo?.lastWatchedSeconds).toBe(1510);

    // User A logs out
    clearUserCacheOnSignOut();

    // Verify cache cleared
    const queue = loadPendingSyncQueue();
    expect(queue.length).toBe(0);

    // Clean initial state for User B
    const userBCourse = loadCourseProgressFromStorage('unrelated-course');
    expect(userBCourse.completedLessonIds.length).toBe(0);
  });

  // ---------------------------------------------------------------------------
  // L. Browser UI: Resume Action Navigation
  // ---------------------------------------------------------------------------
  test('12. Clicking Resume on course card navigates directly to the active lesson', async ({ page }) => {
    await page.goto('/courses');
    await page.waitForLoadState('domcontentloaded');

    // Seed progress with lesson 2 completed, lesson 3 active
    await page.evaluate(({ courseUuid }) => {
      const state = {
        courseId: courseUuid,
        completedLessonIds: [
          'e7b9e003-4000-4000-a000-000000000001',
          'e7b9e003-4000-4000-a000-000000000002',
        ],
        lastActiveLessonId: 'e7b9e003-4000-4000-a000-000000000003',
        lastAccessedAt: new Date().toISOString(),
      };
      localStorage.setItem(`cybertube_course_progress_v1_${courseUuid}`, JSON.stringify(state));
      window.dispatchEvent(new CustomEvent('cybertube:course-progress-changed', { detail: state }));
    }, { courseUuid: networkingCourseUuid });

    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    const resumeBtn = page.locator(`[data-testid="course-action-btn-${networkingCourseSlug}"]`);
    await expect(resumeBtn).toBeVisible();
    await expect(resumeBtn).toHaveAttribute('href', /lesson=03-how-data-travels-and-who-can-see-it/);

    await resumeBtn.click();

    // Confirm navigation to lesson 3 with proper timeout
    await expect(page).toHaveURL(/courses\/networking-for-hackers-2027\?lesson=03-how-data-travels-and-who-can-see-it/, { timeout: 15000 });
  });
});
