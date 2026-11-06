import { test, expect } from '@playwright/test';

// Pre-stub server-only in require cache
try {
  const serverOnlyPath = require.resolve('server-only');
  require.cache[serverOnlyPath] = {
    exports: {},
    id: serverOnlyPath,
    filename: serverOnlyPath,
    loaded: true,
    children: [],
    paths: [],
  } as any;
} catch {}

import { COURSES } from '../src/data/courses';
import manifest from '../src/data/manifests/wireshark-and-ethical-hacking-manifest.json';
import { parseIso8601Duration, parseLearningSequence } from '../src/lib/youtube-utils';
import {
  getCourseBySlugWithDb,
  getCourseLessons,
  getAdjacentLessons,
  setPublicSupabaseClientForTesting,
} from '../src/lib/courses';
import { CloudCourseProgressService, isUuid } from '../src/lib/cloud-course-progress';

let syncAllEnabledPlaylists: any;

test.describe('Phase 17 — David Bombal Wireshark Course & Sync Integration', () => {
  const courseSlug = 'wireshark-and-ethical-hacking';
  const courseUuid = 'd6a8e001-5000-4000-a000-000000000001';

  test.beforeAll(async () => {
    const syncMod = await import('../src/lib/server/youtube-sync');
    syncAllEnabledPlaylists = syncMod.syncAllEnabledPlaylists;
  });

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

  test('10. CloudCourseProgressService: authenticates and persists progress via real service method', async () => {
    const mockUser = { id: '11111111-2222-3333-4444-555555555555' };
    const lessonUuid = 'd6a8e003-5000-4000-a000-000000000001';

    let recordedPayload: any = null;
    const mockSupabase = {
      auth: {
        getUser: async () => ({ data: { user: mockUser }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      from: (table: string) => ({
        upsert: async (payload: any) => {
          recordedPayload = payload;
          return { data: null, error: null };
        },
      }),
    };

    const service = new CloudCourseProgressService(mockSupabase);
    const resultStatus = await service.persistLessonProgressToCloud(courseUuid, lessonUuid, true);

    expect(resultStatus).toBe('saved');
    expect(recordedPayload).not.toBeNull();
    expect(recordedPayload.user_id).toBe(mockUser.id);
    expect(recordedPayload.course_id).toBe(courseUuid);
    expect(recordedPayload.lesson_id).toBe(lessonUuid);
    expect(recordedPayload.is_completed).toBe(true);
  });

  test('11. CloudCourseProgressService: guest mode and invalid non-UUID inputs stay offline', async () => {
    const guestSupabase = {
      auth: { getUser: async () => ({ data: { user: null }, error: null }) },
    };
    const guestService = new CloudCourseProgressService(guestSupabase);
    const guestResult = await guestService.persistLessonProgressToCloud(courseUuid, 'd6a8e003-5000-4000-a000-000000000001', true);
    expect(guestResult).toBe('offline');

    // Invalid non-UUID
    const invalidResult = await guestService.persistLessonProgressToCloud('static-course-slug', 'invalid-lesson-id', true);
    expect(invalidResult).toBe('offline');
  });

  test('12. Playlist sync: real service invocation inserts newly discovered video into Module 5 with positive order_index', async () => {
    const defaultModuleId = 'd6a8e002-5000-4000-a000-000000000005';
    const newVideoId = 'newVidPlay1'; // 11-char YouTube ID

    let insertedLesson: any = null;
    const mockSources = [
      { id: 'src-1', course_id: courseUuid, playlist_id: 'PL_TEST', default_module_id: defaultModuleId, sync_enabled: true },
    ];
    const mockModules = [
      { id: 'd6a8e002-5000-4000-a000-000000000001', title: 'Module 1', order_index: 1 },
      { id: defaultModuleId, title: 'Module 5: New Playlist Additions', order_index: 5 },
    ];

    const mockAdmin = {
      from: (table: string) => ({
        select: () => ({
          eq: () => {
            if (table === 'course_playlist_sources') return Promise.resolve({ data: mockSources, error: null });
            if (table === 'lessons') return Promise.resolve({ data: [], error: null });
            if (table === 'course_modules') return { order: () => Promise.resolve({ data: mockModules, error: null }) };
            if (table === 'course_playlist_items') return Promise.resolve({ data: [], error: null });
            return Promise.resolve({ data: [], error: null });
          },
        }),
        insert: (data: any) => {
          insertedLesson = data;
          return { select: () => ({ single: () => Promise.resolve({ data: { id: data.id }, error: null }) }) };
        },
        update: () => ({ eq: () => Promise.resolve({ error: null }) }),
        upsert: () => Promise.resolve({ error: null }),
      }),
    };

    const mockFetchItems = async () => [
      { snippet: { position: 0, title: 'New Wireshark Packet Inspection #1' }, contentDetails: { videoId: newVideoId } },
    ];
    const mockFetchDetails = async () => new Map<string, any>([
      [newVideoId, { contentDetails: { duration: 'PT25M' }, status: { embeddable: true, privacyStatus: 'public' } }],
    ]);

    const result = await syncAllEnabledPlaylists({
      allowPreview: true,
      adminClient: mockAdmin,
      fetchPlaylistItemsFn: mockFetchItems as any,
      fetchVideoDetailsFn: mockFetchDetails as any,
    });

    expect(result.success).toBe(true);
    expect(result.stats?.[0].newlyInsertedLessons).toBe(1);
    expect(insertedLesson).not.toBeNull();
    expect(insertedLesson.module_id).toBe(defaultModuleId);
    expect(insertedLesson.order_index).toBeGreaterThanOrEqual(1);
  });

  test('13. Course loader: getCourseBySlugWithDb hydrates real database modules and filters inactive items', async () => {
    const mod1Id = 'd6a8e002-5000-4000-a000-000000000001';
    const activeLessonId = 'd6a8e003-5000-4000-a000-000000000001';
    const inactiveLessonId = 'd6a8e003-5000-4000-a000-000000000002';

    const mockDb = {
      from: (table: string) => ({
        select: () => {
          const handler: any = {
            eq: () => handler,
            maybeSingle: async () => ({
              data: {
                id: courseUuid,
                slug: courseSlug,
                title: 'Wireshark and Ethical Hacking Course',
                status: 'published',
                instructor_org: 'David Bombal',
                difficulty: 'beginner',
                track: 'cybersecurity',
                domains: ['network-security'],
                source_playlist_id: 'PLhfrWIlLOoKMBv50Y8NH6Dtfge_MrHYnl',
              },
              error: null,
            }),
            order: () => {
              if (table === 'course_modules') {
                return Promise.resolve({
                  data: [{ id: mod1Id, course_id: courseUuid, title: 'Module 1: Wireshark', order_index: 1 }],
                  error: null,
                });
              }
              if (table === 'lessons') {
                return Promise.resolve({
                  data: [
                    { id: activeLessonId, module_id: mod1Id, course_id: courseUuid, title: 'Active Lesson', youtube_video_id: 'QXfaGOMT7MY', order_index: 1 },
                    { id: inactiveLessonId, module_id: mod1Id, course_id: courseUuid, title: 'Inactive Lesson', youtube_video_id: 'deadVid1234', order_index: 2 },
                  ],
                  error: null,
                });
              }
              return Promise.resolve({ data: [], error: null });
            },
            then: (resolve: any) => {
              if (table === 'course_playlist_items') {
                resolve({
                  data: [
                    { lesson_id: activeLessonId, is_active: true, is_embeddable: true, availability_status: 'available' },
                    { lesson_id: inactiveLessonId, is_active: false, is_embeddable: false, availability_status: 'unavailable' },
                  ],
                  error: null,
                });
              } else {
                resolve({ data: [], error: null });
              }
            },
          };
          return handler;
        },
      }),
    };

    setPublicSupabaseClientForTesting(mockDb);
    try {
      const course = await getCourseBySlugWithDb(courseSlug);
      expect(course).toBeDefined();
      expect(course?.modules[0].lessons.length).toBe(1);
      expect(course?.modules[0].lessons[0].id).toBe(activeLessonId);
      expect(course?.instructor.organization).toBe('David Bombal');
    } finally {
      setPublicSupabaseClientForTesting(null);
    }
  });

  test('14. Playlist sync: deactivating removed video marks is_active = false without deleting lessons or progress', async () => {
    let deactivatedItemId: string | null = null;
    let tableDeleteCalled: string | null = null;

    const mockAdmin = {
      from: (table: string) => ({
        select: () => ({
          eq: () => {
            if (table === 'course_playlist_sources') return Promise.resolve({ data: [{ id: 's1', course_id: courseUuid, playlist_id: 'p1', sync_enabled: true }], error: null });
            if (table === 'lessons') return Promise.resolve({ data: [], error: null });
            if (table === 'course_modules') return { order: () => Promise.resolve({ data: [{ id: 'm1', order_index: 1 }], error: null }) };
            if (table === 'course_playlist_items') {
              return Promise.resolve({
                data: [
                  { id: 'item-present', youtube_video_id: 'present1111', is_active: true },
                  { id: 'item-removed', youtube_video_id: 'removed9999', is_active: true },
                ],
                error: null,
              });
            }
            return Promise.resolve({ data: [], error: null });
          },
        }),
        insert: () => ({ select: () => ({ single: () => Promise.resolve({ data: { id: 'n1' }, error: null }) }) }),
        update: (data: any) => ({
          eq: (col: string, val: any) => {
            if (table === 'course_playlist_items' && data.is_active === false) {
              deactivatedItemId = val;
            }
            return Promise.resolve({ error: null });
          },
        }),
        delete: () => {
          tableDeleteCalled = table;
          return { eq: () => Promise.resolve({ error: null }) };
        },
        upsert: () => Promise.resolve({ error: null }),
      }),
    };

    const mockFetch = async () => [
      { snippet: { title: 'Present Video' }, contentDetails: { videoId: 'present1111' } },
    ];
    const mockDetails = async () => new Map([
      ['present1111', { contentDetails: { duration: 'PT10M' }, status: { embeddable: true, privacyStatus: 'public' } }],
    ]);

    const result = await syncAllEnabledPlaylists({
      allowPreview: true,
      adminClient: mockAdmin,
      fetchPlaylistItemsFn: mockFetch as any,
      fetchVideoDetailsFn: mockDetails as any,
    });

    expect(result.success).toBe(true);
    expect(deactivatedItemId).toBe('item-removed');
    expect(tableDeleteCalled).toBeNull();
  });

  test('15. Playlist sync: malformed playlist entry records failedItems, aborts deactivation, reports failure', async () => {
    let deactivationExecuted = false;

    const mockAdmin = {
      from: (table: string) => ({
        select: () => ({
          eq: () => {
            if (table === 'course_playlist_sources') return Promise.resolve({ data: [{ id: 's1', course_id: courseUuid, playlist_id: 'p1', sync_enabled: true }], error: null });
            if (table === 'lessons') return Promise.resolve({ data: [], error: null });
            if (table === 'course_modules') return { order: () => Promise.resolve({ data: [{ id: 'm1', order_index: 1 }], error: null }) };
            if (table === 'course_playlist_items') return Promise.resolve({ data: [{ id: 'i1', youtube_video_id: 'validVid123', is_active: true }], error: null });
            return Promise.resolve({ data: [], error: null });
          },
        }),
        insert: () => ({ select: () => ({ single: () => Promise.resolve({ data: { id: 'n1' }, error: null }) }) }),
        update: (data: any) => {
          if (table === 'course_playlist_items' && data.is_active === false) {
            deactivationExecuted = true;
          }
          return { eq: () => Promise.resolve({ error: null }) };
        },
        upsert: () => Promise.resolve({ error: null }),
      }),
    };

    // Include one malformed video without a valid 11-char ID
    const mockFetch = async () => [
      { snippet: { title: 'Valid' }, contentDetails: { videoId: 'valid11char' } },
      { snippet: { title: 'Malformed' }, contentDetails: { videoId: '' } },
    ];
    const mockDetails = async () => new Map([
      ['valid11char', { contentDetails: { duration: 'PT10M' }, status: { embeddable: true, privacyStatus: 'public' } }],
    ]);

    const result = await syncAllEnabledPlaylists({
      allowPreview: true,
      adminClient: mockAdmin,
      fetchPlaylistItemsFn: mockFetch as any,
      fetchVideoDetailsFn: mockDetails as any,
    });

    expect(result.success).toBe(false);
    expect(result.stats?.[0].failedItems).toBe(1);
    expect(deactivationExecuted).toBe(false);
  });

  test('16. Cron endpoint readiness check and authorization enforcement', async ({ request }) => {
    // 1. Safe readiness inspection via live server
    const resReadiness = await request.get('/api/cron/sync-youtube-playlists?check=readiness');
    expect(resReadiness.status()).toBe(200);
    const readyBody = await resReadiness.json();
    expect(typeof readyBody.ready).toBe('boolean');
    expect(typeof readyBody.cronConfigured).toBe('boolean');
    expect(typeof readyBody.youtubeConfigured).toBe('boolean');
    expect(typeof readyBody.supabaseConfigured).toBe('boolean');

    // 2. Deterministic live endpoint assertions (no [401, 500] tolerance)
    if (!readyBody.cronConfigured) {
      // When CRON_SECRET is not configured on the server, endpoint must return exact 500
      const resNoConfig = await request.get('/api/cron/sync-youtube-playlists');
      expect(resNoConfig.status()).toBe(500);
      const noConfigBody = await resNoConfig.json();
      expect(noConfigBody.success).toBe(false);
      expect(noConfigBody.error).toBe('CRON_SECRET is not configured on this server environment.');
    } else {
      // When CRON_SECRET is configured, missing Authorization header must return exact 401
      const resNoAuth = await request.get('/api/cron/sync-youtube-playlists');
      expect(resNoAuth.status()).toBe(401);
      const noAuthBody = await resNoAuth.json();
      expect(noAuthBody.success).toBe(false);
      expect(noAuthBody.error).toBe('Unauthorized: Missing authorization credentials.');

      // When CRON_SECRET is configured, invalid Bearer credentials must return exact 401
      const resBadAuth = await request.get('/api/cron/sync-youtube-playlists', {
        headers: { Authorization: 'Bearer totally-invalid-secret-key' },
      });
      expect(resBadAuth.status()).toBe(401);
      const badAuthBody = await resBadAuth.json();
      expect(badAuthBody.error).toBe('Unauthorized: Invalid authorization credentials.');
    }

    // 3. Direct route handler security matrix verification
    // Deterministically verifies exact 500, exact 401s, and valid-token sync dispatch
    const { GET: cronRouteHandler } = await import('../app/api/cron/sync-youtube-playlists/route');
    const { NextRequest } = require('next/server');
    const origCronSecret = process.env.CRON_SECRET;
    const origYouTube = process.env.YOUTUBE_API_KEY;

    try {
      // Exact 500: missing CRON_SECRET configuration
      delete process.env.CRON_SECRET;
      const reqNoConf = new NextRequest('http://localhost:3000/api/cron/sync-youtube-playlists');
      const resNoConf = await cronRouteHandler(reqNoConf);
      expect(resNoConf.status).toBe(500);
      const jsonNoConf = await resNoConf.json();
      expect(jsonNoConf.error).toBe('CRON_SECRET is not configured on this server environment.');

      // Exact 401: configured secret, missing authorization header
      process.env.CRON_SECRET = 'test-cron-secret-exact-verification';
      const reqMissingAuth = new NextRequest('http://localhost:3000/api/cron/sync-youtube-playlists');
      const resMissingAuth = await cronRouteHandler(reqMissingAuth);
      expect(resMissingAuth.status).toBe(401);
      const jsonMissingAuth = await resMissingAuth.json();
      expect(jsonMissingAuth.error).toBe('Unauthorized: Missing authorization credentials.');

      // Exact 401: configured secret, invalid bearer token
      const reqInvalidAuth = new NextRequest('http://localhost:3000/api/cron/sync-youtube-playlists', {
        headers: { authorization: 'Bearer invalid-token-xyz' },
      });
      const resInvalidAuth = await cronRouteHandler(reqInvalidAuth);
      expect(resInvalidAuth.status).toBe(401);
      const jsonInvalidAuth = await resInvalidAuth.json();
      expect(jsonInvalidAuth.error).toBe('Unauthorized: Invalid authorization credentials.');

      // Valid token reaches sync execution (without YOUTUBE_API_KEY, safely returns 500 from syncAllEnabledPlaylists)
      delete process.env.YOUTUBE_API_KEY;
      const reqValidAuth = new NextRequest('http://localhost:3000/api/cron/sync-youtube-playlists', {
        headers: { authorization: 'Bearer test-cron-secret-exact-verification' },
      });
      const resValidAuth = await cronRouteHandler(reqValidAuth);
      expect(resValidAuth.status).toBe(500);
      const jsonValidAuth = await resValidAuth.json();
      expect(jsonValidAuth.error).toContain('YOUTUBE_API_KEY environment variable is not configured');
    } finally {
      process.env.CRON_SECRET = origCronSecret;
      process.env.YOUTUBE_API_KEY = origYouTube;
    }
  });
});
