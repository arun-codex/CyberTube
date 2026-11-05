import { test, expect } from '@playwright/test';
import { COURSES } from '../src/data/courses';
import manifest from '../src/data/manifests/mern-playlist-manifest.json';

test.describe('Phase 15 — MERN Full Stack Course Integration', () => {
  const mernSlug = 'mern-full-stack-course-with-ai';
  const mernCourseId = 'course-mern-full-stack-ai';

  test('1. Manifest & Course Data Integrity', async () => {
    // Verify manifest metadata
    expect(manifest.playlistId).toBe('PLQl7ZDyS2qk8');
    expect(manifest.title).toBe('MERN Full Stack Course - React, Node & MongoDB with AI');
    expect(manifest.totalEntriesFound).toBe(4);
    expect(manifest.playableLessonsCount).toBe(3);
    expect(manifest.unavailableEntriesCount).toBe(1);
    expect(manifest.totalPlayableDurationMinutes).toBe(169);
    expect(manifest.totalPlayableDurationSeconds).toBe(10177);

    // Verify unavailable entry reported accurately
    const unavailableEntry = manifest.entries.find((e) => e.videoId === 'G9ONQ8XosN8');
    expect(unavailableEntry).toBeDefined();
    expect(unavailableEntry?.status).toBe('unavailable_processing');
    expect(unavailableEntry?.embeddable).toBe(false);

    // Verify course in catalog
    const course = COURSES.find((c) => c.slug === mernSlug);
    expect(course).toBeDefined();
    expect(course?.id).toBe(mernCourseId);
    expect(course?.track).toBe('web-development');
    expect(course?.sourcePlaylistId).toBe('PLQl7ZDyS2qk8');
    expect(course?.sourcePlaylistUrl).toBe('https://www.youtube.com/playlist?list=PLQl7ZDyS2qk8');
    expect(course?.sourcePlatform).toBe('youtube');
    expect(course?.instructor.name).toBe('Codex Arun');
    expect(course?.totalDurationMinutes).toBe(169);
    expect(course?.estimatedDuration).toBe('2 hours 49 mins');

    // Verify all playable lessons in course
    const allLessons = course!.modules.flatMap((m) => m.lessons);
    expect(allLessons.length).toBe(3);

    // Check YouTube ID validity (11 chars) and uniqueness
    const videoIds = allLessons.map((l) => l.youtubeVideoId);
    expect(new Set(videoIds).size).toBe(3);
    for (const vid of videoIds) {
      expect(vid).toMatch(/^[a-zA-Z0-9_-]{11}$/);
    }

    // Check lesson order preserves original playlist positions 1, 2, 3
    expect(allLessons[0].youtubeVideoId).toBe('fFVZ9xbyBlc');
    expect(allLessons[1].youtubeVideoId).toBe('aqtA2zHURbg');
    expect(allLessons[2].youtubeVideoId).toBe('PNQiabb5ZjY');
  });

  test('2. Course Directory (/courses) displays updated heading and tracks', async ({ page }) => {
    await page.goto('/courses');
    await expect(page).toHaveTitle(/Video Courses & Learning Tracks/);

    // Header updates
    await expect(page.locator('h1')).toContainText('Video Courses & Learning Tracks');

    // Track filter tabs exist
    const allTab = page.locator('button:has-text("All Tracks")');
    const cyberTab = page.locator('button:has-text("Cybersecurity")');
    const webDevTab = page.locator('button:has-text("Web Development")');
    await expect(allTab).toBeVisible();
    await expect(cyberTab).toBeVisible();
    await expect(webDevTab).toBeVisible();

    // MERN Course Card is visible in All Tracks
    const mernCard = page.locator(`a[href="/courses/${mernSlug}"]`).first();
    await expect(mernCard).toBeVisible();
    await expect(page.locator('text=MERN Full Stack Course - React, Node & MongoDB with AI').first()).toBeVisible();

    // Web Dev badge is rendered on card
    await expect(page.locator('text=WEB DEV').first()).toBeVisible();

    // Filter by Web Development track
    await webDevTab.click();
    await expect(page.locator(`a[href="/courses/${mernSlug}"]`).first()).toBeVisible();
    // In Web Development track, only 1 course is shown
    await expect(page.locator('text=Showing 1 of 4 courses')).toBeVisible();

    // Filter by Cybersecurity track
    await cyberTab.click();
    await expect(page.locator('text=Showing 3 of 4 courses')).toBeVisible();
    await expect(page.locator(`a[href="/courses/${mernSlug}"]`)).toHaveCount(0);
    // Existing cybersecurity course is visible
    await expect(page.locator('a[href="/courses/network-packet-analysis-masterclass"]').first()).toBeVisible();
  });

  test('3. Course Detail (/courses/[slug]) loads MERN curriculum and metadata', async ({ page }) => {
    await page.goto(`/courses/${mernSlug}`);
    await page.waitForLoadState('domcontentloaded');

    // Heading and metadata
    await expect(page.locator('h1')).toHaveText('MERN Full Stack Course - React, Node & MongoDB with AI');
    await expect(page.locator('text=Web Development').first()).toBeVisible();
    await expect(page.locator('text=Codex Arun').first()).toBeVisible();
    await expect(page.locator('text=2 hours 49 mins').first()).toBeVisible();

    // Original YouTube playlist link
    const playlistLink = page.locator('a[href="https://www.youtube.com/playlist?list=PLQl7ZDyS2qk8"]');
    await expect(playlistLink).toBeVisible();
    await expect(playlistLink).toContainText('PLQl7ZDyS2qk8');

    // Unlisted playlist notice
    await expect(page.locator('text=Unlisted Playlist')).toBeVisible();

    // Modules and lessons in curriculum
    await expect(page.locator('text=Module 1: Course Overview & Full-Stack Foundations').first()).toBeVisible();
    await expect(page.locator('text=Module 2: Web Basics & Core Technologies').first()).toBeVisible();

    // Check first lesson title
    await expect(page.locator('h2').first()).toContainText('01 MERN Full Stack Course');
  });

  test('4. Embedded YouTube Player and Watch on YouTube fallback', async ({ page }) => {
    await page.goto(`/courses/${mernSlug}`);
    await page.waitForLoadState('domcontentloaded');

    // YouTube iframe embed
    const iframe = page.locator('iframe[src*="youtube.com/embed/fFVZ9xbyBlc"]');
    await expect(iframe).toBeVisible({ timeout: 10000 });

    // Watch on YouTube fallback link
    const watchOnYt = page.locator('a[href="https://www.youtube.com/watch?v=fFVZ9xbyBlc"]');
    await expect(watchOnYt).toBeVisible();
    await expect(watchOnYt).toHaveText('Watch on YouTube');
  });

  test('5. Lesson Navigation (Next / Previous)', async ({ page }) => {
    await page.goto(`/courses/${mernSlug}`);
    await page.waitForLoadState('domcontentloaded');

    // Click Next lesson
    const nextBtn = page.locator('a:has-text("Next:"), button:has-text("Next:")').first();
    await expect(nextBtn).toBeVisible();
    await nextBtn.click();

    // URL updates to lesson 2
    await expect(page).toHaveURL(/lesson=02-fullstack-dev-foundation-session/);

    // Player updates to video 2
    const iframe2 = page.locator('iframe[src*="youtube.com/embed/aqtA2zHURbg"]');
    await expect(iframe2).toBeVisible({ timeout: 10000 });

    // Click Prev lesson
    const prevBtn = page.locator('a:has-text("Prev:"), button:has-text("Prev:")').first();
    await expect(prevBtn).toBeVisible();
    await prevBtn.click();

    // URL updates back to lesson 1
    await expect(page).toHaveURL(/lesson=01-mern-course-overview/);
    const iframe1 = page.locator('iframe[src*="youtube.com/embed/fFVZ9xbyBlc"]');
    await expect(iframe1).toBeVisible({ timeout: 10000 });
  });

  test('6. Lesson Completion & Local Progress Persistence', async ({ page }) => {
    await page.goto(`/courses/${mernSlug}`);
    await page.waitForLoadState('domcontentloaded');

    // Check initial completion button
    const toggleBtn = page.locator('button:has-text("Mark as Completed")').first();
    await expect(toggleBtn).toBeVisible();

    // Click toggle completion
    await toggleBtn.click();
    await page.waitForTimeout(300);

    // Button updates to Completed
    await expect(page.locator('button:has-text("Completed")').first()).toBeVisible();

    // Local storage has persisted the progress
    const stored = await page.evaluate((courseId) => {
      const raw = localStorage.getItem(`cybertube_course_progress_v1_${courseId}`);
      return raw ? JSON.parse(raw) : null;
    }, mernCourseId);

    expect(stored).not.toBeNull();
    expect(stored.completedLessonIds).toContain('les-mern-course-intro');

    // Refresh page and confirm progress persists
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('button:has-text("Completed")').first()).toBeVisible();

    // Overall progress in compact header shows 33% (1 of 3 completed)
    await expect(page.locator('text=33%').first()).toBeVisible();
  });

  test('7. Existing Cybersecurity Courses Remain Unbroken', async ({ page }) => {
    await page.goto('/courses/network-packet-analysis-masterclass');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('h1')).toHaveText('Network Packet Analysis & Forensics Masterclass');
    await expect(page.locator('text=Cybersecurity').first()).toBeVisible();
    await expect(page.locator('iframe[src*="youtube.com/embed/lb1Dw0elw0Q"]')).toBeVisible({ timeout: 10000 });
  });
});
