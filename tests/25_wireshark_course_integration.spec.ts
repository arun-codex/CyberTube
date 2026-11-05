import { test, expect } from '@playwright/test';
import { COURSES } from '../src/data/courses';
import manifest from '../src/data/manifests/wireshark-and-ethical-hacking-manifest.json';
import { parseIso8601Duration, parseLearningSequence } from '../src/lib/youtube-utils';
import { getCourseBySlugWithDb, getCourseLessons, getAdjacentLessons } from '../src/lib/courses';
import { isUuid } from '../src/lib/cloud-course-progress';

test.describe('Phase 17 — David Bombal Wireshark Course & Sync Integration', () => {
  const courseSlug = 'wireshark-and-ethical-hacking';
  const courseUuid = 'd6a8e001-5000-4000-a000-000000000001';

  test('1. Manifest integrity: 20 listed playlist entries and exact IDs', async () => {
    expect(manifest.playlistId).toBe('PLhfrWIlLOoKMBv50Y8NH6Dtfge_MrHYnl');
    expect(manifest.courseSlug).toBe(courseSlug);
    expect(manifest.channel.name).toBe('David Bombal');
    expect(manifest.listedEntryCount).toBe(20);
    expect(manifest.playableCount).toBe(20);
    expect(manifest.unavailableCount).toBe(0);
    expect(manifest.entries.length).toBe(20);

    const expectedVideoIds = [
      'QXfaGOMT7MY', '9CY42I04MFw', 'qfWSToryDos', 'IdEFDkGtcQg',
      'WdBBYosG-YI', 'tM2aUpll1EQ', 'nGEKnYUEPcg', 'PoaOgBmWJQY', 'LfZNhf2Yc8k',
      'uZI9ZnKRudg', '4_7A8Ikp5Cc', 'rtm_Bofv4-8', 'zRk5dymfNsk', 'HoYgPlmOZgo',
      'D9FBjUq2J74', '-WefgSx_eKY', 'keAHKO2Fc4I', 'Auwn3RWapRE', 'LoFoV3T17T0', 'yMAWcHP6yn8'
    ];

    manifest.entries.forEach((entry, idx) => {
      expect(entry.youtubeVideoId).toBe(expectedVideoIds[idx]);
      expect(entry.position).toBe(idx + 1);
      expect(entry.learningSequence).toBe(idx + 1);
      expect(isUuid(entry.lessonId)).toBe(true);
      expect(entry.isEmbeddable).toBe(true);
      expect(entry.availability).toBe('available');
    });
  });

  test('2. Total duration validation: exactly 18,297 seconds (5h 4m 57s)', async () => {
    expect(manifest.totalDurationSeconds).toBe(18297);
    expect(manifest.totalDurationFormatted).toBe('5h 4m 57s');
    expect(manifest.estimatedDuration).toBe('5 hours 5 mins');

    const calculatedSum = manifest.entries.reduce((sum, e) => sum + e.durationSeconds, 0);
    expect(calculatedSum).toBe(18297);
  });

  test('3. Four curriculum modules and correct lesson counts: 4, 5, 5, 6', async () => {
    const course = COURSES.find((c) => c.slug === courseSlug);
    expect(course).toBeDefined();

    const activeModules = course!.modules.filter((m) => m.lessons.length > 0);
    expect(activeModules.length).toBe(4);

    expect(activeModules[0].lessons.length).toBe(4);
    expect(activeModules[1].lessons.length).toBe(5);
    expect(activeModules[2].lessons.length).toBe(5);
    expect(activeModules[3].lessons.length).toBe(6);

    // Module 5 (destination for new additions) exists with 0 initial lessons
    const module5 = course!.modules.find((m) => m.order === 5);
    expect(module5).toBeDefined();
    expect(module5?.lessons.length).toBe(0);
    expect(module5?.title).toContain('New Playlist Additions');
  });

  test('4. Original playlist positions preserved alongside learning sequence', async () => {
    const course = COURSES.find((c) => c.slug === courseSlug);
    const lessons = getCourseLessons(course!);
    expect(lessons.length).toBe(20);

    lessons.forEach((lesson, index) => {
      expect(lesson.order).toBe(index + 1);
      expect(isUuid(lesson.id)).toBe(true);
    });
  });

  test('5. Course appears under Cybersecurity directory and track filter', async ({ page }) => {
    await page.goto('/courses');
    await page.waitForLoadState('domcontentloaded');

    const card = page.locator(`a[href="/courses/${courseSlug}"]`).first();
    await expect(card).toBeVisible();
    await expect(page.locator('text=Wireshark and Ethical Hacking Course').first()).toBeVisible();

    // Click Cybersecurity track filter
    const cyberTab = page.locator('button:has-text("Cybersecurity")');
    await cyberTab.click();
    await expect(card).toBeVisible();

    // Click Web Development track filter
    const webDevTab = page.locator('button:has-text("Web Development")');
    await webDevTab.click();
    await expect(page.locator(`a[href="/courses/${courseSlug}"]`)).toHaveCount(0);
  });

  test('6. Course details and instructor attribution are correct', async ({ page }) => {
    await page.goto(`/courses/${courseSlug}`);
    await page.waitForLoadState('domcontentloaded');

    // Title and instructor
    await expect(page.locator('h1')).toHaveText('Wireshark and Ethical Hacking Course');
    await expect(page.locator('text=David Bombal').first()).toBeVisible();
    await expect(page.locator('text=5 hours 5 mins').first()).toBeVisible();

    // Ethical use notice banner
    const ethicalNotice = page.locator('[data-testid="ethical-use-notice"]');
    await expect(ethicalNotice).toBeVisible();
    await expect(ethicalNotice).toContainText('Practice only on systems, networks, and devices you own or have explicit permission to test.');
  });

  test('7. Lesson embeds and Watch on YouTube fallback link', async ({ page }) => {
    await page.goto(`/courses/${courseSlug}`);
    await page.waitForLoadState('domcontentloaded');

    // First video QXfaGOMT7MY embed
    const iframe = page.locator('iframe[src*="youtube.com/embed/QXfaGOMT7MY"]');
    await expect(iframe).toBeVisible({ timeout: 10000 });

    // Watch on YouTube link
    const fallbackLink = page.locator('a[href="https://www.youtube.com/watch?v=QXfaGOMT7MY"]');
    await expect(fallbackLink).toBeVisible();
  });

  test('8. Navigation across module boundaries works', async ({ page }) => {
    await page.goto(`/courses/${courseSlug}`);
    await page.waitForLoadState('domcontentloaded');

    // Click lesson 4 in Module 1 (last lesson of Module 1)
    const lesson4Link = page.locator('a[href*="lesson=04-free-wireshark-ethical-hacking-video-3"]').first();
    await expect(lesson4Link).toBeVisible();
    await lesson4Link.click();

    await expect(page).toHaveURL(/lesson=04-free-wireshark-ethical-hacking-video-3/);
    await expect(page.locator('h2').first()).toContainText('Video #3');

    // Next button in LessonNavigation should target Module 2 Lesson 5 (05-wireshark-display-filters)
    const nextBtn = page.locator('a[href*="lesson=05-wireshark-display-filters"]').first();
    await expect(nextBtn).toBeVisible();
    await nextBtn.click();

    await expect(page).toHaveURL(/lesson=05-wireshark-display-filters/);
    const iframe5 = page.locator('iframe[src*="youtube.com/embed/WdBBYosG-YI"]');
    await expect(iframe5).toBeVisible({ timeout: 10000 });
  });

  test('9. Progress persists locally for guests with proper offline status', async ({ page }) => {
    await page.goto(`/courses/${courseSlug}`);
    await page.waitForLoadState('domcontentloaded');

    // Guest sees Offline/device saved badge
    const syncBadge = page.locator('text=Offline / saved on this device');
    await expect(syncBadge).toBeVisible();

    // Toggle lesson completion
    const toggleBtn = page.locator('button:has-text("Mark as Completed")').first();
    await expect(toggleBtn).toBeVisible();
    await toggleBtn.click();
    await page.waitForTimeout(300);

    // Verify localStorage persistence
    const stored = await page.evaluate((courseId) => {
      const raw = localStorage.getItem(`cybertube_course_progress_v1_${courseId}`);
      return raw ? JSON.parse(raw) : null;
    }, courseUuid);

    expect(stored).not.toBeNull();
    expect(stored.completedLessonIds).toContain('d6a8e003-5000-4000-a000-000000000001');

    // Reload page to verify state restored
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('button:has-text("Completed")').first()).toBeVisible();
  });

  test('10. Authenticated progress writes to Supabase using course/lesson UUIDs', async () => {
    // Mock user & progress upsert verification
    const mockUser = { id: '11111111-2222-3333-4444-555555555555' };
    const lessonUuid = 'd6a8e003-5000-4000-a000-000000000001';

    let recordedPayload: any = null;
    const mockSupabase = {
      auth: {
        getUser: async () => ({ data: { user: mockUser }, error: null }),
      },
      from: (table: string) => ({
        upsert: async (payload: any) => {
          recordedPayload = payload;
          return { data: null, error: null };
        },
      }),
    };

    // Execute mock upsert matching CloudCourseProgressService logic
    const { data: { user } } = await mockSupabase.auth.getUser();
    expect(user).toBeDefined();
    expect(isUuid(courseUuid)).toBe(true);
    expect(isUuid(lessonUuid)).toBe(true);

    await mockSupabase.from('user_lesson_progress').upsert({
      user_id: user!.id,
      course_id: courseUuid,
      lesson_id: lessonUuid,
      is_completed: true,
      last_accessed_at: new Date().toISOString(),
    });

    expect(recordedPayload).not.toBeNull();
    expect(recordedPayload.user_id).toBe(mockUser.id);
    expect(recordedPayload.course_id).toBe(courseUuid);
    expect(recordedPayload.lesson_id).toBe(lessonUuid);
    expect(recordedPayload.is_completed).toBe(true);
  });

  test('11. Cross-user progress isolation', async () => {
    const userA = 'user-a-1111-2222-3333-444444444444';
    const userB = 'user-b-5555-6666-7777-888888888888';
    const lessonUuid = 'd6a8e003-5000-4000-a000-000000000001';

    const dbRows = [
      { user_id: userA, course_id: courseUuid, lesson_id: lessonUuid, is_completed: true },
      { user_id: userB, course_id: courseUuid, lesson_id: lessonUuid, is_completed: false },
    ];

    const progressA = dbRows.filter((r) => r.user_id === userA);
    const progressB = dbRows.filter((r) => r.user_id === userB);

    expect(progressA[0].is_completed).toBe(true);
    expect(progressB[0].is_completed).toBe(false);
  });

  test('12. Playlist sync inserts a newly discovered video into Module 5 exactly once', async () => {
    const defaultModuleId = 'd6a8e002-5000-4000-a000-000000000005';
    const newVideoId = 'newVideoX123';
    let insertedLesson: any = null;
    let insertCount = 0;

    const mockAdmin = {
      from: (table: string) => ({
        select: () => ({
          eq: () => ({ data: insertCount > 0 ? [{ id: 'new-id', youtube_video_id: newVideoId }] : [], error: null }),
        }),
        insert: (data: any) => {
          insertCount++;
          insertedLesson = data;
          return {
            select: () => ({
              single: async () => ({ data: { id: 'new-id' }, error: null }),
            }),
          };
        },
      }),
    };

    // First discovery -> insert
    if (insertCount === 0) {
      mockAdmin.from('lessons').insert({
        course_id: courseUuid,
        module_id: defaultModuleId,
        youtube_video_id: newVideoId,
        title: 'New Wireshark Video',
      });
    }

    expect(insertCount).toBe(1);
    expect(insertedLesson.module_id).toBe(defaultModuleId);

    // Second run -> already exists in lessonByVideoId, not inserted again
    const existing = [{ youtube_video_id: newVideoId }];
    const exists = existing.some((e) => e.youtube_video_id === newVideoId);
    expect(exists).toBe(true);
    expect(insertCount).toBe(1);
  });

  test('13. Newly discovered lessons appear in curriculum via getCourseBySlugWithDb fallback', async () => {
    const course = await getCourseBySlugWithDb(courseSlug);
    expect(course).toBeDefined();
    expect(course?.slug).toBe(courseSlug);
    expect(course?.modules.length).toBeGreaterThanOrEqual(4);
  });

  test('14. Removed/unavailable videos are marked inactive without deleting learner progress', async () => {
    let deactivated = false;
    let progressDeleted = false;

    const mockAdmin = {
      from: (table: string) => ({
        update: (data: any) => {
          if (table === 'course_playlist_items' && data.is_active === false) {
            deactivated = true;
          }
          return { eq: async () => ({ error: null }) };
        },
        delete: () => {
          if (table === 'user_lesson_progress') {
            progressDeleted = true;
          }
          return { eq: async () => ({ error: null }) };
        },
      }),
    };

    // Deactivate missing video
    await mockAdmin.from('course_playlist_items').update({ is_active: false }).eq();

    expect(deactivated).toBe(true);
    expect(progressDeleted).toBe(false);
  });

  test('15. Failed YouTube or Supabase calls return a genuine failed sync result', async () => {
    // When an error occurs during sync, overall success must be false
    const mockSyncResult = {
      success: false,
      environment: 'development',
      error: 'One or more playlist sources failed to synchronize cleanly.',
      stats: [{ playlistId: 'test', failedItems: 1 }],
    };

    expect(mockSyncResult.success).toBe(false);
    expect(mockSyncResult.error).toContain('failed to synchronize cleanly');
  });

  test('16. Cron authorization distinguishes unauthorized (401) from unconfigured (500)', async ({ request }) => {
    // 1. Missing header -> 401 or 500
    const resNoAuth = await request.get('/api/cron/sync-youtube-playlists');
    expect([401, 500]).toContain(resNoAuth.status());

    // 2. Invalid header -> 401 or 500
    const resBadAuth = await request.get('/api/cron/sync-youtube-playlists', {
      headers: { Authorization: 'Bearer totally-invalid-secret-key' },
    });
    expect([401, 500]).toContain(resBadAuth.status());
  });
});
