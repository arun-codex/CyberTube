import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { NextRequest } from 'next/server';

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

import {
  parseLearningSequence,
  parseIso8601Duration,
} from '../src/lib/youtube-utils';
import {
  getCourseBySlugWithDb,
  getAllCoursesWithDb,
  setPublicSupabaseClientForTesting,
} from '../src/lib/courses';
import { CloudCourseProgressService, isUuid } from '../src/lib/cloud-course-progress';

let syncAllEnabledPlaylists: any;
let cronRouteHandler: any;

test.before(async () => {
  const serverOnlyPath = require.resolve('server-only');
  require.cache[serverOnlyPath] = {
    exports: {},
    id: serverOnlyPath,
    filename: serverOnlyPath,
    loaded: true,
    children: [],
    paths: [],
  } as any;
  const syncMod = await import('../src/lib/server/youtube-sync');
  syncAllEnabledPlaylists = syncMod.syncAllEnabledPlaylists;

  const cronMod = await import('../app/api/cron/sync-youtube-playlists/route');
  cronRouteHandler = cronMod.GET;
});

test('1. Migration SQL schema consistency & safety guards', () => {
  const wiresharkMigration = fs.readFileSync(
    path.join(process.cwd(), 'supabase/migrations/20261105020000_add_wireshark_course_and_sync_improvements.sql'),
    'utf-8'
  );

  assert.ok(!wiresharkMigration.includes('instructor_organization,'), 'Should not contain instructor_organization');
  assert.ok(wiresharkMigration.includes('instructor_org,'), 'Must contain instructor_org');

  assert.ok(!wiresharkMigration.includes('published,\n    tags'), 'Should not contain published column');
  assert.ok(wiresharkMigration.includes('status,\n    tags') || wiresharkMigration.includes('status,\r\n    tags'), 'Must contain status column');
  assert.ok(wiresharkMigration.includes("'published',"), "Must seed status as 'published'");

  assert.ok(!/\bplaylist_url\b/.test(wiresharkMigration), 'Should not contain standalone playlist_url');
  assert.ok(wiresharkMigration.includes('source_playlist_url,'), 'Must contain source_playlist_url');

  const networkingMigration = fs.readFileSync(
    path.join(process.cwd(), 'supabase/migrations/20261105010000_add_playlist_sync_and_seed_networking_course.sql'),
    'utf-8'
  );

  assert.ok(networkingMigration.includes('DROP TRIGGER IF EXISTS on_playlist_source_updated'), 'Must guard on_playlist_source_updated trigger');
  assert.ok(networkingMigration.includes('DROP TRIGGER IF EXISTS on_playlist_item_updated'), 'Must guard on_playlist_item_updated trigger');
  assert.ok(networkingMigration.includes('DROP POLICY IF EXISTS "Public can view playlist sources"'), 'Must guard sources policy');
  assert.ok(networkingMigration.includes('DROP POLICY IF EXISTS "Public can view playlist items"'), 'Must guard items policy');
});

test('2. getCourseBySlugWithDb loads real database modules, lessons, and excludes inactive playlist items', async () => {
  const courseUuid = 'd6a8e001-5000-4000-a000-000000000001';
  const mod1Uuid = 'd6a8e002-5000-4000-a000-000000000001';
  const activeLessonUuid = 'd6a8e003-5000-4000-a000-000000000001';
  const inactiveLessonUuid = 'd6a8e003-5000-4000-a000-000000000002';

  const mockDbClient = {
    from: (table: string) => ({
      select: () => {
        const q: any = {
          eq: () => q,
          maybeSingle: async () => ({
            data: {
              id: courseUuid,
              slug: 'wireshark-and-ethical-hacking',
              title: 'Wireshark and Ethical Hacking Course (From DB)',
              short_description: 'Database loaded description',
              description: 'Full database description',
              difficulty: 'beginner',
              status: 'published',
              estimated_duration: '5 hours 5 mins',
              total_duration_minutes: 305,
              thumbnail_url: 'https://i.ytimg.com/vi/QXfaGOMT7MY/maxresdefault.jpg',
              instructor_name: 'David Bombal',
              instructor_title: 'Network Security Educator',
              instructor_org: 'Bombal Security Lab',
              prerequisites: ['Basic networking'],
              learning_objectives: ['Packet analysis'],
              track: 'cybersecurity',
              domains: ['network-security', 'dfir'],
              tags: ['wireshark'],
              source_platform: 'youtube',
              source_playlist_id: 'PLhfrWIlLOoKMBv50Y8NH6Dtfge_MrHYnl',
              source_playlist_url: 'https://www.youtube.com/playlist?list=PLhfrWIlLOoKMBv50Y8NH6Dtfge_MrHYnl',
            },
            error: null,
          }),
          order: () => {
            if (table === 'course_modules') {
              return Promise.resolve({
                data: [{ id: mod1Uuid, course_id: courseUuid, title: 'Module 1: Wireshark', order_index: 1 }],
                error: null,
              });
            }
            if (table === 'lessons') {
              return Promise.resolve({
                data: [
                  { id: activeLessonUuid, course_id: courseUuid, module_id: mod1Uuid, slug: 'l-1', title: 'Lesson 1', youtube_video_id: 'QXfaGOMT7MY', order_index: 1 },
                  { id: inactiveLessonUuid, course_id: courseUuid, module_id: mod1Uuid, slug: 'l-2', title: 'Lesson 2', youtube_video_id: 'deadVid1234', order_index: 2 },
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
                  { lesson_id: activeLessonUuid, is_active: true, is_embeddable: true, availability_status: 'available' },
                  { lesson_id: inactiveLessonUuid, is_active: false, is_embeddable: false, availability_status: 'unavailable' },
                ],
                error: null,
              });
            } else {
              resolve({ data: [], error: null });
            }
          },
        };
        return q;
      },
    }),
  };

  setPublicSupabaseClientForTesting(mockDbClient);
  try {
    const course = await getCourseBySlugWithDb('wireshark-and-ethical-hacking');
    assert.ok(course);
    assert.equal(course.id, courseUuid);
    assert.equal(course.instructor.organization, 'Bombal Security Lab');
    assert.equal(course.modules[0].lessons.length, 1, 'Inactive lesson must be filtered out');
    assert.equal(course.modules[0].lessons[0].id, activeLessonUuid);
  } finally {
    setPublicSupabaseClientForTesting(null);
  }
});

test('3. getCourseBySlugWithDb fails closed when playlist mapping query fails for playlist course', async () => {
  const courseUuid = 'd6a8e001-5000-4000-a000-000000000001';
  const mod1Uuid = 'd6a8e002-5000-4000-a000-000000000001';

  const mockDbClient = {
    from: (table: string) => ({
      select: () => {
        const q: any = {
          eq: () => q,
          maybeSingle: async () => ({
            data: {
              id: courseUuid,
              slug: 'wireshark-and-ethical-hacking',
              status: 'published',
              source_playlist_id: 'PLhfrWIlLOoKMBv50Y8NH6Dtfge_MrHYnl',
            },
            error: null,
          }),
          order: () => {
            if (table === 'course_modules') return Promise.resolve({ data: [{ id: mod1Uuid, order_index: 1 }], error: null });
            if (table === 'lessons') return Promise.resolve({ data: [{ id: 'l1', module_id: mod1Uuid, order_index: 1 }], error: null });
            return Promise.resolve({ data: [], error: null });
          },
          then: (resolve: any) => {
            if (table === 'course_playlist_items') {
              // Simulated mapping failure (network / table error)
              resolve({ data: null, error: { message: 'Failed to fetch playlist items' } });
            } else {
              resolve({ data: [], error: null });
            }
          },
        };
        return q;
      },
    }),
  };

  setPublicSupabaseClientForTesting(mockDbClient);
  try {
    const course = await getCourseBySlugWithDb('wireshark-and-ethical-hacking');
    assert.equal(course, undefined, 'Must fail closed and return undefined when playlist mappings cannot be loaded');
  } finally {
    setPublicSupabaseClientForTesting(null);
  }
});

test('4. getCourseBySlugWithDb strictly excludes draft and archived database courses', async () => {
  const mockDbClient = {
    from: (table: string) => ({
      select: () => ({
        eq: () => ({
          maybeSingle: async () => ({
            data: {
              id: 'c1',
              slug: 'draft-course',
              status: 'draft', // Draft status
            },
            error: null,
          }),
        }),
      }),
    }),
  };

  setPublicSupabaseClientForTesting(mockDbClient);
  try {
    const course = await getCourseBySlugWithDb('draft-course');
    assert.equal(course, undefined, 'Draft course must not be loaded');
  } finally {
    setPublicSupabaseClientForTesting(null);
  }
});

test('5. getAllCoursesWithDb includes published DB courses, excludes draft/archived DB courses, retains static-only', async () => {
  const mockDbClient = {
    from: (table: string) => ({
      select: () => {
        const q: any = {
          eq: () => q,
          maybeSingle: async () => ({
            data: {
              id: 'd6a8e001-5000-4000-a000-000000000001',
              slug: 'wireshark-and-ethical-hacking',
              status: 'published',
              title: 'Published Wireshark',
              source_playlist_id: 'PLhfrWIlLOoKMBv50Y8NH6Dtfge_MrHYnl',
            },
            error: null,
          }),
          order: () => Promise.resolve({ data: [{ id: 'm1', order_index: 1 }], error: null }),
          then: (resolve: any) => {
            if (table === 'courses') {
              resolve({
                data: [
                  { id: '1', slug: 'wireshark-and-ethical-hacking', status: 'published' },
                  { id: '2', slug: 'networking-and-cybersecurity-foundations', status: 'draft' }, // Excluded draft
                  { id: '3', slug: 'hardware-backdoors-cpu-internals', status: 'archived' }, // Excluded archived
                ],
                error: null,
              });
            } else if (table === 'course_playlist_items') {
              resolve({ data: [{ lesson_id: 'l1', is_active: true, is_embeddable: true, availability_status: 'available' }], error: null });
            } else {
              resolve({ data: [], error: null });
            }
          },
        };
        return q;
      },
    }),
  };

  setPublicSupabaseClientForTesting(mockDbClient);
  try {
    const allCourses = await getAllCoursesWithDb();
    const slugs = allCourses.map((c) => c.slug);

    // Published course must appear
    assert.ok(slugs.includes('wireshark-and-ethical-hacking'), 'Published DB course must appear');

    // Draft and archived database courses must NOT appear (and must not be appended from static)
    assert.ok(!slugs.includes('networking-and-cybersecurity-foundations'), 'Draft DB course must NOT appear');
    assert.ok(!slugs.includes('hardware-backdoors-cpu-internals'), 'Archived DB course must NOT appear');

    // Pure static course not in DB must still appear
    assert.ok(slugs.includes('mern-full-stack-course-with-ai'), 'Static-only course must still appear');
  } finally {
    setPublicSupabaseClientForTesting(null);
  }
});

test('6. getAllCoursesWithDb uses documented static fallback on Supabase query failure', async () => {
  const mockDbClient = {
    from: () => ({
      select: () => Promise.resolve({ data: null, error: { message: 'Supabase connection refused' } }),
    }),
  };

  setPublicSupabaseClientForTesting(mockDbClient);
  try {
    const courses = await getAllCoursesWithDb();
    assert.ok(Array.isArray(courses));
    assert.ok(courses.length >= 6, 'Fallback must return full static catalog');
  } finally {
    setPublicSupabaseClientForTesting(null);
  }
});

test('7. CloudCourseProgressService authenticates, handles guest mode, rejects invalid IDs, handles errors', async () => {
  const testUser = { id: '00000000-0000-0000-0000-000000000001' };
  const validCourseId = 'd6a8e001-5000-4000-a000-000000000001';
  const validLessonId = 'd6a8e003-5000-4000-a000-000000000001';

  let upsertPayload: any = null;
  let shouldFail = false;

  const mockSupabase = {
    auth: {
      getUser: async () => ({ data: { user: testUser }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    from: (table: string) => ({
      upsert: async (payload: any) => {
        if (shouldFail) {
          return { data: null, error: { message: 'Database constraint violation' } };
        }
        upsertPayload = payload;
        return { data: null, error: null };
      },
      select: () => ({
        eq: () => ({ eq: async () => ({ data: [], error: null }) }),
      }),
    }),
  };

  const service = new CloudCourseProgressService(mockSupabase);

  const statusSaved = await service.persistLessonProgressToCloud(validCourseId, validLessonId, true);
  assert.equal(statusSaved, 'saved');
  assert.equal(upsertPayload.user_id, testUser.id);
  assert.equal(upsertPayload.course_id, validCourseId);

  const guestService = new CloudCourseProgressService({ auth: { getUser: async () => ({ data: { user: null }, error: null }) } });
  const statusGuest = await guestService.persistLessonProgressToCloud(validCourseId, validLessonId, true);
  assert.equal(statusGuest, 'offline');

  const statusInvalid = await service.persistLessonProgressToCloud('static-slug', 'invalid-id', true);
  assert.equal(statusInvalid, 'offline');

  shouldFail = true;
  await assert.rejects(
    async () => { await service.persistLessonProgressToCloud(validCourseId, validLessonId, true); },
    /Database constraint violation/
  );
});

test('8. syncAllEnabledPlaylists: duplicate-safe handling skips repeated video IDs without creating extra lessons', async () => {
  const courseId = 'd6a8e001-5000-4000-a000-000000000001';
  const defaultModuleId = 'd6a8e002-5000-4000-a000-000000000005';

  const mockSources = [
    { id: 'src-1', course_id: courseId, playlist_id: 'PL_TEST_DUP', default_module_id: defaultModuleId, sync_enabled: true },
  ];

  const insertedLessons: any[] = [];
  const updatedLessons: any[] = [];

  const mockAdminClient = {
    from: (table: string) => ({
      select: () => ({
        eq: () => {
          if (table === 'course_playlist_sources') return Promise.resolve({ data: mockSources, error: null });
          if (table === 'lessons') return Promise.resolve({ data: [], error: null });
          if (table === 'course_modules') return { order: () => Promise.resolve({ data: [{ id: defaultModuleId, order_index: 5 }], error: null }) };
          if (table === 'course_playlist_items') return Promise.resolve({ data: [], error: null });
          return Promise.resolve({ data: [], error: null });
        },
      }),
      insert: (data: any) => {
        insertedLessons.push(data);
        return { select: () => ({ single: () => Promise.resolve({ data: { id: data.id }, error: null }) }) };
      },
      update: (data: any) => {
        if (table === 'lessons') updatedLessons.push(data);
        return { eq: () => Promise.resolve({ error: null }) };
      },
      upsert: () => Promise.resolve({ error: null }),
    }),
  };

  // Same video ID repeated 3 times in playlist:
  // 1. First occurrence
  // 2. Duplicate with same title, different position
  // 3. Duplicate with different title
  const mockFetchItems = async () => [
    { snippet: { position: 0, title: 'Lecture 1: Intro' }, contentDetails: { videoId: 'dupVideo111' } },
    { snippet: { position: 1, title: 'Lecture 1: Intro (Dup)' }, contentDetails: { videoId: 'dupVideo111' } },
    { snippet: { position: 2, title: 'Lecture 1: Alternate Title' }, contentDetails: { videoId: 'dupVideo111' } },
    { snippet: { position: 3, title: 'Lecture 2: Unique' }, contentDetails: { videoId: 'uniqVideo22' } },
  ];

  const mockFetchDetails = async () => new Map<string, any>([
    ['dupVideo111', { contentDetails: { duration: 'PT10M' }, status: { embeddable: true, privacyStatus: 'public' } }],
    ['uniqVideo22', { contentDetails: { duration: 'PT15M' }, status: { embeddable: true, privacyStatus: 'public' } }],
  ]);

  const result = await syncAllEnabledPlaylists({
    allowPreview: true,
    adminClient: mockAdminClient,
    fetchPlaylistItemsFn: mockFetchItems as any,
    fetchVideoDetailsFn: mockFetchDetails as any,
  });

  assert.equal(result.success, true);
  assert.equal(result.stats?.length, 1);
  const stat = result.stats![0];

  // Exactly 2 lessons inserted (one for dupVideo111, one for uniqVideo22)
  assert.equal(stat.newlyInsertedLessons, 2);
  assert.equal(insertedLessons.length, 2);

  // Exactly 2 duplicates skipped
  assert.equal(stat.duplicatesSkipped, 2, 'Must report 2 duplicates skipped');
  assert.equal(stat.failedItems, 0, 'Duplicates are not failures');
});

test('9. Environment detection: strict fail-closed rules when targeting cloud Supabase', async () => {
  const originalUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const originalVercelEnv = process.env.VERCEL_ENV;
  const originalNodeEnv = process.env.NODE_ENV;

  try {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://production-ref.supabase.co';

    // A. NODE_ENV=production, VERCEL_ENV unset -> REFUSE
    delete process.env.VERCEL_ENV;
    (process.env as any).NODE_ENV = 'production';
    const resA = await syncAllEnabledPlaylists();
    assert.equal(resA.success, false);
    assert.ok(resA.error?.includes('requires verified VERCEL_ENV === "production"'));

    // B. VERCEL_ENV=development, cloud Supabase -> REFUSE
    process.env.VERCEL_ENV = 'development';
    const resB = await syncAllEnabledPlaylists();
    assert.equal(resB.success, false);
    assert.ok(resB.error?.includes('requires verified VERCEL_ENV === "production"'));

    // C. VERCEL_ENV=preview -> REFUSE
    process.env.VERCEL_ENV = 'preview';
    const resC = await syncAllEnabledPlaylists();
    assert.equal(resC.success, false);
    assert.ok(resC.error?.includes('disabled on Vercel Preview deployments'));

    // D. Localhost Supabase -> testable without production credentials
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://127.0.0.1:54321';
    process.env.VERCEL_ENV = 'development';
    const mockAdmin = {
      from: () => ({ select: () => ({ eq: () => Promise.resolve({ data: [], error: null }) }) }),
    };
    const resD = await syncAllEnabledPlaylists({
      adminClient: mockAdmin,
      fetchPlaylistItemsFn: (async () => []) as any,
    });
    assert.equal(resD.success, true, 'Local Supabase is testable in development');
  } finally {
    process.env.NEXT_PUBLIC_SUPABASE_URL = originalUrl;
    process.env.VERCEL_ENV = originalVercelEnv;
    (process.env as any).NODE_ENV = originalNodeEnv;
  }
});

test('10. Cron route authorization & readiness check with deterministic assertions', async () => {
  const originalSecret = process.env.CRON_SECRET;
  const originalYouTube = process.env.YOUTUBE_API_KEY;

  try {
    // 1. Missing server configuration -> exact 500
    delete process.env.CRON_SECRET;
    const reqNoConfig = new NextRequest('http://localhost:3000/api/cron/sync-youtube-playlists');
    const resNoConfig = await cronRouteHandler(reqNoConfig);
    assert.equal(resNoConfig.status, 500, 'Must return exact 500 when CRON_SECRET is unconfigured');
    const bodyNoConfig = await resNoConfig.json();
    assert.equal(bodyNoConfig.error, 'CRON_SECRET is not configured on this server environment.');

    // 2. Configured secret, missing Authorization header -> exact 401
    process.env.CRON_SECRET = 'deterministic-test-cron-secret-12345';
    const reqNoAuth = new NextRequest('http://localhost:3000/api/cron/sync-youtube-playlists');
    const resNoAuth = await cronRouteHandler(reqNoAuth);
    assert.equal(resNoAuth.status, 401, 'Must return exact 401 when Authorization header is missing');
    const bodyNoAuth = await resNoAuth.json();
    assert.equal(bodyNoAuth.error, 'Unauthorized: Missing authorization credentials.');

    // 3. Configured secret, invalid bearer token -> exact 401
    const reqBadAuth = new NextRequest('http://localhost:3000/api/cron/sync-youtube-playlists', {
      headers: { authorization: 'Bearer completely-wrong-token-abc' },
    });
    const resBadAuth = await cronRouteHandler(reqBadAuth);
    assert.equal(resBadAuth.status, 401, 'Must return exact 401 when bearer token does not match');
    const bodyBadAuth = await resBadAuth.json();
    assert.equal(bodyBadAuth.error, 'Unauthorized: Invalid authorization credentials.');

    // 4. Configured secret, valid token, missing YouTube API key -> reaches sync function, safe error
    delete process.env.YOUTUBE_API_KEY;
    const reqValidAuth = new NextRequest('http://localhost:3000/api/cron/sync-youtube-playlists', {
      headers: { authorization: 'Bearer deterministic-test-cron-secret-12345' },
    });
    const resValidAuth = await cronRouteHandler(reqValidAuth);
    assert.equal(resValidAuth.status, 500);
    const bodyValidAuth = await resValidAuth.json();
    assert.ok(bodyValidAuth.error?.includes('YOUTUBE_API_KEY environment variable is not configured'));

    // 5. Readiness endpoint returns boolean flags without exposing secrets
    const reqReadiness = new NextRequest('http://localhost:3000/api/cron/sync-youtube-playlists?check=readiness');
    const resReadiness = await cronRouteHandler(reqReadiness);
    assert.equal(resReadiness.status, 200);
    const bodyReadiness = await resReadiness.json();
    assert.equal(typeof bodyReadiness.ready, 'boolean');
    assert.equal(bodyReadiness.cronConfigured, true);
    assert.equal(bodyReadiness.youtubeConfigured, false);
    assert.equal(typeof bodyReadiness.supabaseConfigured, 'boolean');
  } finally {
    process.env.CRON_SECRET = originalSecret;
    process.env.YOUTUBE_API_KEY = originalYouTube;
  }
});
