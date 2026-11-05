import { test, expect } from '@playwright/test';
import { COURSES } from '../src/data/courses';
import manifest from '../src/data/manifests/networking-for-hackers-playlist-manifest.json';
import { parseIso8601Duration, parseLearningSequence } from '../src/lib/youtube-utils';

test.describe('Phase 16 — Database-Backed Networking Course & Playlist Sync', () => {
  const courseSlug = 'networking-for-hackers-2027';
  const courseUuid = 'e7b9e001-4000-4000-a000-000000000001';

  test('1. Manifest & Course Metadata Integrity', async () => {
    // Verify Manifest
    expect(manifest.playlistId).toBe('PLITTDLtD8szA');
    expect(manifest.title).toBe('Networking for Hackers 2027');
    expect(manifest.channel).toBe('Bitten Tech');
    expect(manifest.totalPlaylistEntries).toBe(7);
    expect(manifest.playableLessonsCount).toBe(6);
    expect(manifest.unavailableEntriesCount).toBe(1);
    expect(manifest.totalPlayableDurationSeconds).toBe(19015);
    expect(manifest.totalPlayableDurationMinutes).toBe(317);

    // Verify unavailable entry qHkemPeWD3w
    const unavailable = manifest.entries.find((e) => e.videoId === 'qHkemPeWD3w');
    expect(unavailable).toBeDefined();
    expect(unavailable?.status).toBe('unavailable_removed');
    expect(unavailable?.embeddable).toBe(false);

    // Verify Course in COURSES array
    const course = COURSES.find((c) => c.slug === courseSlug);
    expect(course).toBeDefined();
    expect(course?.id).toBe(courseUuid);
    expect(course?.track).toBe('cybersecurity');
    expect(course?.domains).toContain('network-security');
    expect(course?.domains).toContain('fundamentals');
    expect(course?.instructor.name).toBe('Bitten Tech');
    expect(course?.sourcePlaylistId).toBe('PLITTDLtD8szA');
    expect(course?.sourcePlaylistUrl).toBe('https://www.youtube.com/playlist?list=PLITTDLtD8szA');

    // Verify 6 playable lessons in learning order #1 -> #6
    const lessons = course!.modules.flatMap((m) => m.lessons);
    expect(lessons.length).toBe(6);

    const expectedVideos = [
      '4hLax8DmQHY',
      '4-Ea5EI6LrM',
      'A31izTClLqs',
      'Yb48nfFBT0I',
      'e6tMigLffZc',
      'J_fUOMgl4CE',
    ];

    for (let i = 0; i < 6; i++) {
      expect(lessons[i].youtubeVideoId).toBe(expectedVideos[i]);
      expect(lessons[i].order).toBe(i + 1);
      // Validate UUID format for lesson id
      expect(lessons[i].id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
    }
  });

  test('2. Course Directory (/courses) displays course under Cybersecurity', async ({ page }) => {
    await page.goto('/courses');
    await page.waitForLoadState('domcontentloaded');

    // Title and banner
    await expect(page.locator('h1')).toContainText('Video Courses & Learning Tracks');

    // Card exists and has Bitten Tech attribution
    const card = page.locator(`a[href="/courses/${courseSlug}"]`).first();
    await expect(card).toBeVisible();
    await expect(page.locator('text=Networking for Hackers 2027').first()).toBeVisible();
    await expect(page.locator('text=Bitten Tech').first()).toBeVisible();

    // Track filter check: click Cybersecurity tab
    const cyberTab = page.locator('button:has-text("Cybersecurity")');
    await cyberTab.click();
    await expect(card).toBeVisible();

    // Click Web Dev tab -> Networking course should not be shown
    const webDevTab = page.locator('button:has-text("Web Development")');
    await webDevTab.click();
    await expect(page.locator(`a[href="/courses/${courseSlug}"]`)).toHaveCount(0);
  });

  test('3. Course Detail Page loads lessons, modules, and playlist attribution', async ({ page }) => {
    await page.goto(`/courses/${courseSlug}`);
    await page.waitForLoadState('domcontentloaded');

    // Header info
    await expect(page.locator('h1')).toHaveText('Networking for Hackers 2027');
    await expect(page.locator('text=Bitten Tech').first()).toBeVisible();
    await expect(page.locator('text=5 hours 17 mins').first()).toBeVisible();

    // Playlist link
    const playlistLink = page.locator('a[href="https://www.youtube.com/playlist?list=PLITTDLtD8szA"]');
    await expect(playlistLink).toBeVisible();

    // Module title
    await expect(page.locator('text=Networking Fundamentals — Playlist Sequence').first()).toBeVisible();

    // Lesson 1 title
    await expect(page.locator('h2').first()).toContainText('Networking for Hackers #1 | Introduction');
  });

  test('4. YouTube Player embeds official player with Watch on YouTube fallback', async ({ page }) => {
    await page.goto(`/courses/${courseSlug}`);
    await page.waitForLoadState('domcontentloaded');

    // YouTube iframe
    const iframe = page.locator('iframe[src*="youtube.com/embed/4hLax8DmQHY"]');
    await expect(iframe).toBeVisible({ timeout: 10000 });

    // Watch on YouTube fallback link
    const fallbackLink = page.locator('a[href="https://www.youtube.com/watch?v=4hLax8DmQHY"]');
    await expect(fallbackLink).toBeVisible();
  });

  test('5. Lesson Navigation (Next / Prev)', async ({ page }) => {
    await page.goto(`/courses/${courseSlug}`);
    await page.waitForLoadState('domcontentloaded');

    // Click Next lesson
    const nextBtn = page.locator('a:has-text("Next:"), button:has-text("Next:")').first();
    await expect(nextBtn).toBeVisible();
    await nextBtn.click();

    // URL updates to lesson 2
    await expect(page).toHaveURL(/lesson=02-history-of-your-internet/);
    const iframe2 = page.locator('iframe[src*="youtube.com/embed/4-Ea5EI6LrM"]');
    await expect(iframe2).toBeVisible({ timeout: 10000 });

    // Click Prev lesson
    const prevBtn = page.locator('a:has-text("Prev:"), button:has-text("Prev:")').first();
    await expect(prevBtn).toBeVisible();
    await prevBtn.click();

    // URL updates back to lesson 1
    await expect(page).toHaveURL(/lesson=01-networking-for-hackers-introduction/);
    const iframe1 = page.locator('iframe[src*="youtube.com/embed/4hLax8DmQHY"]');
    await expect(iframe1).toBeVisible({ timeout: 10000 });
  });

  test('6. Progress tracking & Sync status badge', async ({ page }) => {
    await page.goto(`/courses/${courseSlug}`);
    await page.waitForLoadState('domcontentloaded');

    // Check Sync status indicator is present in compact header
    const syncBadge = page.locator('text=Offline / saved on this device').or(page.locator('text=Saved to account')).or(page.locator('text=Saving...')).first();
    await expect(syncBadge).toBeVisible();

    // Mark lesson 1 as completed
    const toggleBtn = page.locator('button:has-text("Mark as Completed")').first();
    await expect(toggleBtn).toBeVisible();
    await toggleBtn.click();
    await page.waitForTimeout(300);

    // Completed state
    await expect(page.locator('button:has-text("Completed")').first()).toBeVisible();

    // Local storage has persisted the progress using course UUID
    const stored = await page.evaluate((courseId) => {
      const raw = localStorage.getItem(`cybertube_course_progress_v1_${courseId}`);
      return raw ? JSON.parse(raw) : null;
    }, courseUuid);

    expect(stored).not.toBeNull();
    expect(stored.completedLessonIds).toContain('e7b9e003-4000-4000-a000-000000000001');

    // Refresh page and confirm progress persists
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('button:has-text("Completed")').first()).toBeVisible();
    // 1 of 6 completed = 17%
    await expect(page.locator('text=17%').first()).toBeVisible();
  });

  test('7. YouTube Sync Helper Functions (Unit Tests)', async () => {
    // ISO 8601 duration parser
    expect(parseIso8601Duration('PT36M2S')).toEqual({ totalSeconds: 2162, minutes: 36 });
    expect(parseIso8601Duration('PT57M46S')).toEqual({ totalSeconds: 3466, minutes: 58 });
    expect(parseIso8601Duration('PT1H7M36S')).toEqual({ totalSeconds: 4056, minutes: 68 });
    expect(parseIso8601Duration('')).toEqual({ totalSeconds: 0, minutes: 0 });

    // Learning sequence parser
    expect(parseLearningSequence('Networking for Hackers #1 | Introduction')).toBe(1);
    expect(parseLearningSequence('Networking for Hackers #2 | History of your Internet')).toBe(2);
    expect(parseLearningSequence('Networking for Hackers #6 | TCP/IP, OSI & Encapsulation')).toBe(6);
    expect(parseLearningSequence('Random Title Without Sequence')).toBeNull();
  });

  test('8. Daily Cron Endpoint Security & Auth Guard', async ({ request }) => {
    // Unauthorized request without Bearer token
    const resUnauthorized = await request.get('/api/cron/sync-youtube-playlists');
    // Either 401 Unauthorized or 500 (if CRON_SECRET not configured locally)
    expect([401, 500]).toContain(resUnauthorized.status());

    // Request with invalid Bearer token
    const resInvalid = await request.get('/api/cron/sync-youtube-playlists', {
      headers: {
        Authorization: 'Bearer invalid-token-xyz-123',
      },
    });
    expect([401, 500]).toContain(resInvalid.status());
  });
});
