import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

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
});

test('1. Migration SQL schema consistency & safety guards', () => {
  const wiresharkMigration = fs.readFileSync(
    path.join(process.cwd(), 'supabase/migrations/20261105020000_add_wireshark_course_and_sync_improvements.sql'),
    'utf-8'
  );

  // Must reference instructor_org, not instructor_organization
  assert.ok(!wiresharkMigration.includes('instructor_organization,'), 'Should not contain instructor_organization');
  assert.ok(wiresharkMigration.includes('instructor_org,'), 'Must contain instructor_org');

  // Must reference status = 'published', not boolean published
  assert.ok(!wiresharkMigration.includes('published,\n    tags'), 'Should not contain published column');
  assert.ok(wiresharkMigration.includes('status,\n    tags') || wiresharkMigration.includes('status,\r\n    tags'), 'Must contain status column');
  assert.ok(wiresharkMigration.includes("'published',"), "Must seed status as 'published'");

  // Must reference source_playlist_url, not standalone playlist_url
  assert.ok(!/\bplaylist_url\b/.test(wiresharkMigration), 'Should not contain standalone playlist_url');
  assert.ok(wiresharkMigration.includes('source_playlist_url,'), 'Must contain source_playlist_url');

  const networkingMigration = fs.readFileSync(
    path.join(process.cwd(), 'supabase/migrations/20261105010000_add_playlist_sync_and_seed_networking_course.sql'),
    'utf-8'
  );

  // Must guard triggers and policies
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
      select: (cols: string) => ({
        eq: (col: string, val: any) => ({
          eq: (col2: string, val2: any) => ({
            maybeSingle: async () => {
              if (table === 'courses' && col === 'slug' && val === 'wireshark-and-ethical-hacking' && col2 === 'status' && val2 === 'published') {
                return {
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
                };
              }
              return { data: null, error: null };
            },
          }),
          order: (orderCol: string) => {
            if (table === 'course_modules') {
              return Promise.resolve({
                data: [
                  {
                    id: mod1Uuid,
                    course_id: courseUuid,
                    title: 'Module 1: Wireshark Packet Analysis',
                    description: 'Foundations from DB',
                    order_index: 1,
                  },
                ],
                error: null,
              });
            }
            if (table === 'lessons') {
              return Promise.resolve({
                data: [
                  {
                    id: activeLessonUuid,
                    course_id: courseUuid,
                    module_id: mod1Uuid,
                    slug: 'lesson-1-wireshark-intro',
                    title: 'Lesson 1: Intro',
                    description: 'Intro description',
                    youtube_video_id: 'QXfaGOMT7MY',
                    duration_minutes: 12,
                    order_index: 1,
                    objectives: ['Learn Wireshark basics'],
                    tags: ['wireshark'],
                    skills_taught: ['Packet capturing'],
                  },
                  {
                    id: inactiveLessonUuid,
                    course_id: courseUuid,
                    module_id: mod1Uuid,
                    slug: 'lesson-2-removed-video',
                    title: 'Lesson 2: Removed',
                    description: 'Unavailable description',
                    youtube_video_id: 'removed12345',
                    duration_minutes: 15,
                    order_index: 2,
                    objectives: ['Removed'],
                    tags: ['wireshark'],
                    skills_taught: ['None'],
                  },
                ],
                error: null,
              });
            }
            return Promise.resolve({ data: [], error: null });
          },
          // for course_playlist_items query
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
        }),
      }),
    }),
  };

  setPublicSupabaseClientForTesting(mockDbClient);

  try {
    const course = await getCourseBySlugWithDb('wireshark-and-ethical-hacking');
    assert.ok(course, 'Course should be returned');
    assert.equal(course.id, courseUuid);
    assert.equal(course.title, 'Wireshark and Ethical Hacking Course (From DB)');
    assert.equal(course.instructor.organization, 'Bombal Security Lab');

    // Modules loaded from DB
    assert.equal(course.modules.length, 1);
    assert.equal(course.modules[0].title, 'Module 1: Wireshark Packet Analysis');

    // Inactive lesson should be filtered out
    assert.equal(course.modules[0].lessons.length, 1);
    assert.equal(course.modules[0].lessons[0].id, activeLessonUuid);
    assert.equal(course.modules[0].lessons[0].title, 'Lesson 1: Intro');
  } finally {
    setPublicSupabaseClientForTesting(null);
  }
});

test('3. getAllCoursesWithDb delivers dynamic catalog and static fallbacks', async () => {
  const mockDbClient = {
    from: (table: string) => ({
      select: () => {
        const queryBuilder: any = {
          eq: () => queryBuilder,
          maybeSingle: () => Promise.resolve({ data: null, error: null }),
          order: () => Promise.resolve({ data: [], error: null }),
          then: (resolve: any) => resolve({
            data: [{ slug: 'wireshark-and-ethical-hacking' }],
            error: null,
          }),
        };
        return queryBuilder;
      },
    }),
  };

  setPublicSupabaseClientForTesting(mockDbClient);
  try {
    const allCourses = await getAllCoursesWithDb();
    assert.ok(Array.isArray(allCourses));
    assert.ok(allCourses.length >= 6, 'Must contain all courses in catalog');
    const wireshark = allCourses.find((c) => c.slug === 'wireshark-and-ethical-hacking');
    assert.ok(wireshark);
  } finally {
    setPublicSupabaseClientForTesting(null);
  }
});

test('4. CloudCourseProgressService authenticates, handles guest mode, rejects invalid IDs, handles errors', async () => {
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
        eq: () => ({
          eq: async () => ({ data: [], error: null }),
        }),
      }),
    }),
  };

  const service = new CloudCourseProgressService(mockSupabase);

  // A. Successful persistence
  const statusSaved = await service.persistLessonProgressToCloud(validCourseId, validLessonId, true);
  assert.equal(statusSaved, 'saved');
  assert.equal(upsertPayload.user_id, testUser.id);
  assert.equal(upsertPayload.course_id, validCourseId);
  assert.equal(upsertPayload.lesson_id, validLessonId);
  assert.equal(upsertPayload.is_completed, true);

  // B. Guest mode (no authenticated user)
  const guestSupabase = {
    auth: { getUser: async () => ({ data: { user: null }, error: null }) },
  };
  const guestService = new CloudCourseProgressService(guestSupabase);
  const statusGuest = await guestService.persistLessonProgressToCloud(validCourseId, validLessonId, true);
  assert.equal(statusGuest, 'offline');

  // C. Invalid non-UUID inputs stay offline
  const statusInvalid = await service.persistLessonProgressToCloud('static-course-id', 'non-uuid-lesson', true);
  assert.equal(statusInvalid, 'offline');

  // D. Database error throws
  shouldFail = true;
  await assert.rejects(
    async () => {
      await service.persistLessonProgressToCloud(validCourseId, validLessonId, true);
    },
    /Database constraint violation/
  );
});

test('5. syncAllEnabledPlaylists: successful sync, duplicate items, order stability', async () => {
  const courseId = 'd6a8e001-5000-4000-a000-000000000001';
  const defaultModuleId = 'd6a8e002-5000-4000-a000-000000000005';

  const mockSources = [
    {
      id: 'src-1',
      course_id: courseId,
      playlist_id: 'PL_TEST_1',
      default_module_id: defaultModuleId,
      sync_enabled: true,
    },
  ];

  const mockExistingLessons = [
    {
      id: 'lesson-existing-1',
      slug: 'lesson-1-intro',
      youtube_video_id: 'vidExist111',
      order_index: 1, // Curated order
      module_id: 'd6a8e002-5000-4000-a000-000000000001',
      duration_minutes: 10,
    },
  ];

  const mockModules = [
    { id: 'd6a8e002-5000-4000-a000-000000000001', title: 'Module 1', order_index: 1 },
    { id: defaultModuleId, title: 'Module 5: New Playlist Additions', order_index: 5 },
  ];

  const insertedLessons: any[] = [];
  const updatedLessons: any[] = [];
  const upsertedItems: any[] = [];
  let sourceUpdatedStatus: string | null = null;

  const mockAdminClient = {
    from: (table: string) => ({
      select: (cols: string) => ({
        eq: (col: string, val: any) => {
          if (table === 'course_playlist_sources') {
            return Promise.resolve({ data: mockSources, error: null });
          }
          if (table === 'lessons') {
            return Promise.resolve({ data: mockExistingLessons, error: null });
          }
          if (table === 'course_modules') {
            return {
              order: () => Promise.resolve({ data: mockModules, error: null }),
            };
          }
          if (table === 'course_playlist_items') {
            return Promise.resolve({ data: [], error: null });
          }
          return Promise.resolve({ data: [], error: null });
        },
      }),
      insert: (data: any) => {
        insertedLessons.push(data);
        return {
          select: () => ({
            single: () => Promise.resolve({ data: { id: data.id }, error: null }),
          }),
        };
      },
      update: (data: any) => ({
        eq: (col: string, val: any) => {
          if (table === 'lessons') {
            updatedLessons.push(data);
          }
          if (table === 'course_playlist_sources') {
            sourceUpdatedStatus = data.last_sync_status;
          }
          return Promise.resolve({ error: null });
        },
      }),
      upsert: (data: any) => {
        upsertedItems.push(data);
        return Promise.resolve({ error: null });
      },
    }),
  };

  const mockFetchItems = async () => [
    {
      snippet: { position: 0, title: 'Wireshark Course: Video #0' }, // Video #0 parsing test
      contentDetails: { videoId: 'vidExist111' },
    },
    {
      snippet: { position: 1, title: 'New Wireshark Lecture #2' },
      contentDetails: { videoId: 'vidNewPla11' },
    },
  ];

  const mockFetchDetails = async () => new Map<string, any>([
    ['vidExist111', { contentDetails: { duration: 'PT15M' }, status: { embeddable: true, privacyStatus: 'public' } }],
    ['vidNewPla11', { contentDetails: { duration: 'PT20M' }, status: { embeddable: true, privacyStatus: 'public' } }],
  ]);

  const result = await syncAllEnabledPlaylists({
    allowPreview: true,
    adminClient: mockAdminClient,
    fetchPlaylistItemsFn: mockFetchItems as any,
    fetchVideoDetailsFn: mockFetchDetails as any,
  });

  assert.equal(result.success, true);
  assert.equal(result.stats?.length, 1);
  assert.equal(result.stats![0].newlyInsertedLessons, 1);
  assert.equal(result.stats![0].updatedLessons, 1);
  assert.equal(result.stats![0].failedItems, 0);

  // Existing lesson order_index must NOT be updated or changed to 0
  assert.equal(updatedLessons.length, 1);
  assert.equal(updatedLessons[0].order_index, undefined, 'order_index must NOT be mutated on existing lessons');

  // New lesson order_index must be strictly positive (>= 1)
  assert.equal(insertedLessons.length, 1);
  assert.ok(insertedLessons[0].order_index >= 1, 'New lesson order_index must be >= 1');
  assert.equal(insertedLessons[0].module_id, defaultModuleId);
  assert.equal(sourceUpdatedStatus, 'success');
});

test('6. syncAllEnabledPlaylists handles malformed video ID without deactivating items', async () => {
  const courseId = 'd6a8e001-5000-4000-a000-000000000001';
  let deactivationAttempted = false;
  let sourceSyncStatus = '';

  const mockAdminClient = {
    from: (table: string) => ({
      select: () => ({
        eq: () => {
          if (table === 'course_playlist_sources') {
            return Promise.resolve({
              data: [{ id: 'src-1', course_id: courseId, playlist_id: 'PL_TEST', sync_enabled: true }],
              error: null,
            });
          }
          if (table === 'lessons') return Promise.resolve({ data: [], error: null });
          if (table === 'course_modules') return { order: () => Promise.resolve({ data: [{ id: 'm1', order_index: 1 }], error: null }) };
          if (table === 'course_playlist_items') {
            return Promise.resolve({
              data: [{ id: 'item-1', youtube_video_id: 'validVid123', is_active: true }],
              error: null,
            });
          }
          return Promise.resolve({ data: [], error: null });
        },
      }),
      insert: () => ({ select: () => ({ single: () => Promise.resolve({ data: { id: 'new' }, error: null }) }) }),
      update: (data: any) => {
        if (table === 'course_playlist_items' && data.is_active === false) {
          deactivationAttempted = true;
        }
        if (table === 'course_playlist_sources') {
          sourceSyncStatus = data.last_sync_status;
        }
        return { eq: () => Promise.resolve({ error: null }) };
      },
      upsert: () => Promise.resolve({ error: null }),
    }),
  };

  // One valid video and one malformed video without a valid 11-char ID
  const mockFetchItems = async () => [
    { snippet: { title: 'Valid Video' }, contentDetails: { videoId: 'validVid123' } },
    { snippet: { title: 'Malformed Video' }, contentDetails: { videoId: '' } }, // Missing video ID
  ];

  const mockFetchDetails = async () => new Map<string, any>([
    ['validVid123', { contentDetails: { duration: 'PT10M' }, status: { embeddable: true, privacyStatus: 'public' } }],
  ]);

  const result = await syncAllEnabledPlaylists({
    allowPreview: true,
    adminClient: mockAdminClient,
    fetchPlaylistItemsFn: mockFetchItems as any,
    fetchVideoDetailsFn: mockFetchDetails as any,
  });

  assert.equal(result.success, false, 'Sync must fail if items are malformed');
  assert.equal(result.stats![0].failedItems, 1);
  assert.equal(deactivationAttempted, false, 'Must NOT deactivate valid items during an incomplete or malformed fetch');
  assert.equal(sourceSyncStatus, 'error');
});

test('7. syncAllEnabledPlaylists deactivates removed items without deleting lessons or user progress', async () => {
  const courseId = 'd6a8e001-5000-4000-a000-000000000001';
  let deactivatedItemId: string | null = null;
  let deleteCalledOnTable: string | null = null;

  const mockAdminClient = {
    from: (table: string) => ({
      select: () => ({
        eq: () => {
          if (table === 'course_playlist_sources') {
            return Promise.resolve({
              data: [{ id: 'src-1', course_id: courseId, playlist_id: 'PL_TEST', sync_enabled: true }],
              error: null,
            });
          }
          if (table === 'lessons') return Promise.resolve({ data: [], error: null });
          if (table === 'course_modules') return { order: () => Promise.resolve({ data: [{ id: 'm1', order_index: 1 }], error: null }) };
          if (table === 'course_playlist_items') {
            return Promise.resolve({
              data: [
                { id: 'item-current', youtube_video_id: 'currentVid1', is_active: true },
                { id: 'item-removed', youtube_video_id: 'removedVid99', is_active: true }, // Not in YouTube response
              ],
              error: null,
            });
          }
          return Promise.resolve({ data: [], error: null });
        },
      }),
      insert: () => ({ select: () => ({ single: () => Promise.resolve({ data: { id: 'new' }, error: null }) }) }),
      update: (data: any) => ({
        eq: (col: string, val: any) => {
          if (table === 'course_playlist_items' && data.is_active === false) {
            deactivatedItemId = val;
          }
          return Promise.resolve({ error: null });
        },
      }),
      delete: () => {
        deleteCalledOnTable = table;
        return { eq: () => Promise.resolve({ error: null }) };
      },
      upsert: () => Promise.resolve({ error: null }),
    }),
  };

  const mockFetchItems = async () => [
    { snippet: { title: 'Current Video' }, contentDetails: { videoId: 'currentVid1' } },
  ];

  const mockFetchDetails = async () => new Map<string, any>([
    ['currentVid1', { contentDetails: { duration: 'PT10M' }, status: { embeddable: true, privacyStatus: 'public' } }],
  ]);

  const result = await syncAllEnabledPlaylists({
    allowPreview: true,
    adminClient: mockAdminClient,
    fetchPlaylistItemsFn: mockFetchItems as any,
    fetchVideoDetailsFn: mockFetchDetails as any,
  });

  assert.equal(result.success, true);
  assert.equal(deactivatedItemId, 'item-removed', 'Removed item must be marked is_active = false');
  assert.equal(deleteCalledOnTable, null, 'Never call DELETE on lessons or progress tables');
});

test('8. parseLearningSequence prevents zero or negative indexes', () => {
  assert.equal(parseLearningSequence('Video #0'), 1);
  assert.equal(parseLearningSequence('Episode #1: Intro'), 1);
  assert.equal(parseLearningSequence('Tutorial #12: Deep dive'), 12);
  assert.equal(parseLearningSequence('No numbers here'), null);
});

test('9. Local environment targeting cloud Supabase fails closed without explicit opt-in', async () => {
  const originalUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const originalEnv = process.env.VERCEL_ENV;
  try {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://fake-project-ref.supabase.co';
    process.env.VERCEL_ENV = 'development';

    const result = await syncAllEnabledPlaylists();
    assert.equal(result.success, false);
    assert.ok(result.error?.includes('Refusing to execute playlist sync: non-production environment targeting cloud Supabase'));
  } finally {
    process.env.NEXT_PUBLIC_SUPABASE_URL = originalUrl;
    process.env.VERCEL_ENV = originalEnv;
  }
});
