import { describe, it, before } from 'node:test';
import assert from 'node:assert';
import type { YouTubePlaylistItem, YouTubeVideoItem } from '../src/lib/youtube-utils';

let syncAllEnabledPlaylists: any;

before(async () => {
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

// Mock in-memory database simulation for testing self-maintaining sync
class MockDatabase {
  public sources: any[];
  public items: any[];
  public lessons: any[];
  public courses: any[];
  public modules: any[];

  constructor() {
    this.courses = [
      {
        id: 'e7b9e001-4000-4000-a000-000000000001',
        slug: 'networking-for-hackers-2027',
        title: 'Networking for Hackers 2027',
        estimated_duration: '5 hours 17 mins',
        total_duration_minutes: 317,
      },
    ];

    this.modules = [
      {
        id: 'mod-1',
        course_id: 'e7b9e001-4000-4000-a000-000000000001',
        title: 'Module 01: Core Networking Foundations',
        order_index: 1,
      },
      {
        id: 'mod-2',
        course_id: 'e7b9e001-4000-4000-a000-000000000001',
        title: 'New Playlist Additions',
        order_index: 2,
      },
    ];

    this.sources = [
      {
        id: 'e7b9e004-4000-4000-a000-000000000001',
        course_id: 'e7b9e001-4000-4000-a000-000000000001',
        playlist_id: 'PLITTDLtD8szA',
        default_module_id: 'mod-2',
        sync_enabled: true,
        last_sync_status: 'idle',
      },
    ];

    // Initial state: 6 verified lessons
    this.lessons = [
      { id: 'uuid-1', course_id: 'e7b9e001-4000-4000-a000-000000000001', module_id: 'mod-1', slug: '01-intro', youtube_video_id: 'TEST_VID_01', order_index: 1, duration_minutes: 36 },
      { id: 'uuid-2', course_id: 'e7b9e001-4000-4000-a000-000000000001', module_id: 'mod-1', slug: '02-history', youtube_video_id: 'TEST_VID_02', order_index: 2, duration_minutes: 58 },
      { id: 'uuid-3', course_id: 'e7b9e001-4000-4000-a000-000000000001', module_id: 'mod-1', slug: '03-travels', youtube_video_id: 'TEST_VID_03', order_index: 3, duration_minutes: 54 },
      { id: 'uuid-4', course_id: 'e7b9e001-4000-4000-a000-000000000001', module_id: 'mod-1', slug: '04-devices', youtube_video_id: 'TEST_VID_04', order_index: 4, duration_minutes: 68 },
      { id: 'uuid-5', course_id: 'e7b9e001-4000-4000-a000-000000000001', module_id: 'mod-1', slug: '05-bandwidth', youtube_video_id: 'TEST_VID_05', order_index: 5, duration_minutes: 56 },
      { id: 'uuid-6', course_id: 'e7b9e001-4000-4000-a000-000000000001', module_id: 'mod-1', slug: '06-tcp-ip', youtube_video_id: 'TEST_VID_06', order_index: 6, duration_minutes: 46 },
    ];

    this.items = this.lessons.map((l, idx) => ({
      id: `item-${idx + 1}`,
      playlist_source_id: 'e7b9e004-4000-4000-a000-000000000001',
      course_id: 'e7b9e001-4000-4000-a000-000000000001',
      lesson_id: l.id,
      youtube_video_id: l.youtube_video_id,
      playlist_position: 6 - idx,
      learning_sequence: idx + 1,
      video_title: `Lesson #${idx + 1}`,
      duration_seconds: l.duration_minutes * 60,
      is_active: true,
    }));
  }

  createClient() {
    const self = this;
    return {
      from(table: string) {
        return {
          select(fields?: string) {
            const builder: any = {
              eq(col: string, val: any) {
                let rows: any[] = [];
                if (table === 'course_playlist_sources') rows = self.sources.filter((s) => s[col] === val);
                if (table === 'course_playlist_items') rows = self.items.filter((s) => s[col] === val);
                if (table === 'lessons') rows = self.lessons.filter((s) => s[col] === val);
                if (table === 'courses') rows = self.courses.filter((s) => s[col] === val);
                if (table === 'course_modules') rows = self.modules.filter((m) => m[col] === val);

                const subBuilder: any = {
                  order(orderCol?: string, orderOpts?: any) {
                    return Promise.resolve({ data: [...rows], error: null });
                  },
                  then(resolve: any, reject: any) {
                    return Promise.resolve({ data: [...rows], error: null }).then(resolve, reject);
                  }
                };
                return subBuilder;
              },
              order(orderCol?: string, orderOpts?: any) {
                let rows: any[] = [];
                if (table === 'course_playlist_items') rows = self.items;
                if (table === 'course_modules') rows = self.modules;
                return Promise.resolve({ data: [...rows], error: null });
              },
              then(resolve: any, reject: any) {
                let rows: any[] = [];
                if (table === 'course_playlist_sources') rows = self.sources;
                if (table === 'course_playlist_items') rows = self.items;
                if (table === 'lessons') rows = self.lessons;
                if (table === 'courses') rows = self.courses;
                if (table === 'course_modules') rows = self.modules;
                return Promise.resolve({ data: [...rows], error: null }).then(resolve, reject);
              }
            };
            return builder;
          },
          insert(payload: any) {
            const row = { ...payload };
            if (table === 'lessons') {
              self.lessons.push(row);
            }
            return {
              select(field?: string) {
                return {
                  single() {
                    return Promise.resolve({ data: row, error: null });
                  },
                  then(resolve: any, reject: any) {
                    return Promise.resolve({ data: [row], error: null }).then(resolve, reject);
                  }
                };
              },
              then(resolve: any, reject: any) {
                return Promise.resolve({ data: [row], error: null }).then(resolve, reject);
              }
            };
          },
          upsert(payload: any) {
            const arr = Array.isArray(payload) ? payload : [payload];
            for (const row of arr) {
              if (table === 'course_playlist_items') {
                const idx = self.items.findIndex(
                  (i) => i.course_id === row.course_id && i.youtube_video_id === row.youtube_video_id
                );
                if (idx >= 0) {
                  self.items[idx] = { ...self.items[idx], ...row };
                } else {
                  self.items.push({ id: `item-${Date.now()}-${Math.random()}`, ...row });
                }
              }
            }
            return Promise.resolve({ data: payload, error: null });
          },
          update(fields: any) {
            return {
              eq(col: string, val: any) {
                if (table === 'course_playlist_sources') {
                  const s = self.sources.find((src) => src[col] === val);
                  if (s) Object.assign(s, fields);
                }
                if (table === 'courses') {
                  const c = self.courses.find((crs) => crs[col] === val);
                  if (c) Object.assign(c, fields);
                }
                if (table === 'lessons') {
                  const l = self.lessons.find((lsn) => lsn[col] === val);
                  if (l) Object.assign(l, fields);
                }
                if (table === 'course_playlist_items') {
                  const itm = self.items.find((i) => i[col] === val);
                  if (itm) Object.assign(itm, fields);
                }
                return Promise.resolve({ data: null, error: null });
              },
            };
          },
        };
      },
    };
  }
}

describe('Automated YouTube Playlist Synchronization Suite', () => {
  it('1. Sync from initial 6 lessons to 9 lessons detects 3 new lessons without changing existing UUIDs', async () => {
    const db = new MockDatabase();
    assert.strictEqual(db.lessons.length, 6);

    // Mock YouTube API response with 9 videos (including reverse playlist order)
    const mockPlaylistItems: any[] = [
      {
        id: 'pi-9',
        snippet: {
          title: 'Networking for Hackers #9 | Subnetting, CIDR & Network Segmentation',
          position: 1,
          resourceId: { kind: 'youtube#video', videoId: 'TEST_VID_09' },
        },
        status: { privacyStatus: 'public' },
      },
      {
        id: 'pi-8',
        snippet: {
          title: 'Networking for Hackers #8 | IP Addresses, ARP & ARP Poisoning',
          position: 2,
          resourceId: { kind: 'youtube#video', videoId: 'TEST_VID_08' },
        },
        status: { privacyStatus: 'public' },
      },
      {
        id: 'pi-7',
        snippet: {
          title: 'Networking for Hackers #7 | MAC Addresses, Ethernet & Switches (Wireshark Lab)',
          position: 3,
          resourceId: { kind: 'youtube#video', videoId: 'TEST_VID_07' },
        },
        status: { privacyStatus: 'public' },
      },
      { id: 'pi-6', snippet: { title: 'Networking for Hackers #6 | TCP/IP', position: 4, resourceId: { kind: 'youtube#video', videoId: 'TEST_VID_06' } }, status: { privacyStatus: 'public' } },
      { id: 'pi-5', snippet: { title: 'Networking for Hackers #5 | Bandwidth', position: 5, resourceId: { kind: 'youtube#video', videoId: 'TEST_VID_05' } }, status: { privacyStatus: 'public' } },
      { id: 'pi-4', snippet: { title: 'Networking for Hackers #4 | Devices', position: 6, resourceId: { kind: 'youtube#video', videoId: 'TEST_VID_04' } }, status: { privacyStatus: 'public' } },
      { id: 'pi-3', snippet: { title: 'Networking for Hackers #3 | How Data Travels', position: 7, resourceId: { kind: 'youtube#video', videoId: 'TEST_VID_03' } }, status: { privacyStatus: 'public' } },
      { id: 'pi-2', snippet: { title: 'Networking for Hackers #2 | History', position: 8, resourceId: { kind: 'youtube#video', videoId: 'TEST_VID_02' } }, status: { privacyStatus: 'public' } },
      { id: 'pi-1', snippet: { title: 'Networking for Hackers #1 | Intro', position: 9, resourceId: { kind: 'youtube#video', videoId: 'TEST_VID_01' } }, status: { privacyStatus: 'public' } },
    ];

    const mockVideoMap = new Map<string, any>([
      ['TEST_VID_01', { id: 'TEST_VID_01', snippet: { title: 'Networking for Hackers #1' }, contentDetails: { duration: 'PT36M' }, status: { embeddable: true, privacyStatus: 'public' } }],
      ['TEST_VID_02', { id: 'TEST_VID_02', snippet: { title: 'Networking for Hackers #2' }, contentDetails: { duration: 'PT58M' }, status: { embeddable: true, privacyStatus: 'public' } }],
      ['TEST_VID_03', { id: 'TEST_VID_03', snippet: { title: 'Networking for Hackers #3' }, contentDetails: { duration: 'PT54M' }, status: { embeddable: true, privacyStatus: 'public' } }],
      ['TEST_VID_04', { id: 'TEST_VID_04', snippet: { title: 'Networking for Hackers #4' }, contentDetails: { duration: 'PT68M' }, status: { embeddable: true, privacyStatus: 'public' } }],
      ['TEST_VID_05', { id: 'TEST_VID_05', snippet: { title: 'Networking for Hackers #5' }, contentDetails: { duration: 'PT56M' }, status: { embeddable: true, privacyStatus: 'public' } }],
      ['TEST_VID_06', { id: 'TEST_VID_06', snippet: { title: 'Networking for Hackers #6' }, contentDetails: { duration: 'PT46M' }, status: { embeddable: true, privacyStatus: 'public' } }],
      ['TEST_VID_07', { id: 'TEST_VID_07', snippet: { title: 'Networking for Hackers #7' }, contentDetails: { duration: 'PT71M' }, status: { embeddable: true, privacyStatus: 'public' } }],
      ['TEST_VID_08', { id: 'TEST_VID_08', snippet: { title: 'Networking for Hackers #8' }, contentDetails: { duration: 'PT46M' }, status: { embeddable: true, privacyStatus: 'public' } }],
      ['TEST_VID_09', { id: 'TEST_VID_09', snippet: { title: 'Networking for Hackers #9' }, contentDetails: { duration: 'PT61M' }, status: { embeddable: true, privacyStatus: 'public' } }],
    ]);

    const result = await syncAllEnabledPlaylists({
      allowPreview: true,
      allowProductionWrite: true,
      adminClient: db.createClient(),
      fetchPlaylistItemsFn: async () => mockPlaylistItems,
      fetchVideoDetailsFn: async () => mockVideoMap,
    });

    assert.strictEqual(result.success, true);
    assert.strictEqual(result.stats?.length, 1);
    assert.strictEqual(result.stats?.[0]?.newlyInsertedLessons, 3);
    assert.strictEqual(result.stats?.[0]?.totalPlaylistItems, 9);

    // Verify existing 6 items preserved original lesson IDs
    assert.strictEqual(db.items.find((i) => i.youtube_video_id === 'TEST_VID_01')?.lesson_id, 'uuid-1');
    assert.strictEqual(db.items.find((i) => i.youtube_video_id === 'TEST_VID_06')?.lesson_id, 'uuid-6');

    // Verify new items exist and have correct sequence (prioritizing title #7, #8, #9 regardless of reverse playlist position)
    const item7 = db.items.find((i) => i.youtube_video_id === 'TEST_VID_07');
    const item8 = db.items.find((i) => i.youtube_video_id === 'TEST_VID_08');
    const item9 = db.items.find((i) => i.youtube_video_id === 'TEST_VID_09');
    assert.ok(item7);
    assert.ok(item8);
    assert.ok(item9);
    assert.strictEqual(item7?.learning_sequence, 7);
    assert.strictEqual(item8?.learning_sequence, 8);
    assert.strictEqual(item9?.learning_sequence, 9);
  });

  it('2. Repeated sync with same 9 videos is idempotent: 0 new lessons, 0 duplicate items', async () => {
    const db = new MockDatabase();

    // Populate db with 9 existing lessons and items
    db.lessons = [];
    db.items = [];
    for (let s = 1; s <= 9; s++) {
      const vid = `TEST_VID_0${s}`;
      const lId = `uuid-${s}`;
      db.lessons.push({
        id: lId,
        course_id: 'e7b9e001-4000-4000-a000-000000000001',
        module_id: 'mod-1',
        slug: `lesson-${s}`,
        youtube_video_id: vid,
        order_index: s,
        duration_minutes: 50,
      });
      db.items.push({
        id: `item-${s}`,
        playlist_source_id: 'e7b9e004-4000-4000-a000-000000000001',
        course_id: 'e7b9e001-4000-4000-a000-000000000001',
        lesson_id: lId,
        youtube_video_id: vid,
        playlist_position: 10 - s,
        learning_sequence: s,
        video_title: `Networking for Hackers #${s}`,
        duration_seconds: 3000,
        is_active: true,
      });
    }

    const mockPlaylistItems: any[] = [];
    const mockVideoMap = new Map<string, any>();
    for (let s = 1; s <= 9; s++) {
      const vid = `TEST_VID_0${s}`;
      mockPlaylistItems.push({
        id: `pi-${s}`,
        snippet: {
          title: `Networking for Hackers #${s} | Topic ${s}`,
          position: 10 - s,
          resourceId: { kind: 'youtube#video', videoId: vid },
        },
        status: { privacyStatus: 'public' },
      });
      mockVideoMap.set(vid, {
        id: vid,
        snippet: { title: `Networking for Hackers #${s}` },
        contentDetails: { duration: 'PT50M' },
        status: { embeddable: true, privacyStatus: 'public', uploadStatus: 'processed' },
      });
    }

    const initialItemCount = db.items.length;

    const result = await syncAllEnabledPlaylists({
      allowPreview: true,
      allowProductionWrite: true,
      adminClient: db.createClient(),
      fetchPlaylistItemsFn: async () => mockPlaylistItems,
      fetchVideoDetailsFn: async () => mockVideoMap,
    });

    assert.strictEqual(result.success, true);
    assert.strictEqual(result.stats?.[0]?.newlyInsertedLessons, 0);
    assert.strictEqual(result.stats?.[0]?.duplicatesSkipped, 0);
    assert.strictEqual(result.stats?.[0]?.updatedLessons, 9);
    assert.strictEqual(db.items.length, initialItemCount);
  });

  it('3. Future Lesson #10 added by Bitten Tech is detected and imported automatically without code change', async () => {
    const db = new MockDatabase();

    // Populate db with 9 existing lessons and items
    db.lessons = [];
    db.items = [];
    for (let s = 1; s <= 9; s++) {
      const vid = `TEST_VID_0${s}`;
      const lId = `uuid-${s}`;
      db.lessons.push({
        id: lId,
        course_id: 'e7b9e001-4000-4000-a000-000000000001',
        module_id: 'mod-1',
        slug: `lesson-${s}`,
        youtube_video_id: vid,
        order_index: s,
        duration_minutes: 50,
      });
      db.items.push({
        id: `item-${s}`,
        playlist_source_id: 'e7b9e004-4000-4000-a000-000000000001',
        course_id: 'e7b9e001-4000-4000-a000-000000000001',
        lesson_id: lId,
        youtube_video_id: vid,
        playlist_position: 10 - s,
        learning_sequence: s,
        video_title: `Networking for Hackers #${s}`,
        duration_seconds: 3000,
        is_active: true,
      });
    }

    // Now YouTube has 10 items (Lesson #10 released)
    const mockPlaylistItems: any[] = [];
    const mockVideoMap = new Map<string, any>();
    for (let s = 1; s <= 10; s++) {
      const vid = s === 10 ? 'TEST_VID_10' : `TEST_VID_0${s}`;
      mockPlaylistItems.push({
        id: `pi-${s}`,
        snippet: {
          title: `Networking for Hackers #${s} | Next Topic ${s}`,
          position: 11 - s,
          resourceId: { kind: 'youtube#video', videoId: vid },
        },
        status: { privacyStatus: 'public' },
      });
      mockVideoMap.set(vid, {
        id: vid,
        snippet: { title: `Networking for Hackers #${s}` },
        contentDetails: { duration: 'PT55M' },
        status: { embeddable: true, privacyStatus: 'public', uploadStatus: 'processed' },
      });
    }

    const result = await syncAllEnabledPlaylists({
      allowPreview: true,
      allowProductionWrite: true,
      adminClient: db.createClient(),
      fetchPlaylistItemsFn: async () => mockPlaylistItems,
      fetchVideoDetailsFn: async () => mockVideoMap,
    });

    assert.strictEqual(result.success, true);
    assert.strictEqual(result.stats?.[0]?.newlyInsertedLessons, 1);
    assert.strictEqual(result.stats?.[0]?.totalPlaylistItems, 10);

    const item10 = db.items.find((i) => i.youtube_video_id === 'TEST_VID_10');
    assert.ok(item10, 'Lesson 10 must be inserted into playlist items');
    assert.strictEqual(item10?.learning_sequence, 10);
  });
});
