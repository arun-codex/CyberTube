import { test, expect } from '@playwright/test';
import { COURSES } from '../src/data/courses';
import manifest from '../src/data/manifests/networknchuck-ccna-manifest.json';
import { getCourseBySlug, getCourseLessons } from '../src/lib/courses';

const YT_ID_REGEX = /^[a-zA-Z0-9_-]{11}$/;

test.describe('CCNA Course Integration — Free CCNA 200-301 Complete Course (NetworkChuck)', () => {
  const courseSlug = 'free-ccna-200-301-networkchuck';

  test('1. Manifest video count matches the lessons in the course and IDs are valid & unique', async () => {
    expect(manifest.playlistId).toBe('PLIhvC56v63IJVXv0GJcl9vO5Z6znCVb1P');
    expect(manifest.courseSlug).toBe(courseSlug);
    expect(manifest.totalItems).toBe(24);
    expect(manifest.availableCount).toBe(24);
    expect(manifest.unavailableCount).toBe(0);
    expect(manifest.entries.length).toBe(24);

    const course = getCourseBySlug(courseSlug);
    expect(course).toBeDefined();

    const courseLessons = getCourseLessons(course!);
    expect(courseLessons.length).toBe(manifest.availableCount);

    const seenVideoIds = new Set<string>();
    const seenLessonIds = new Set<string>();

    manifest.entries.forEach((entry, idx) => {
      // 11-char regex check
      expect(entry.videoId).toMatch(YT_ID_REGEX);
      expect(entry.position).toBe(idx + 1);
      expect(entry.available).toBe(true);
      expect(entry.embeddable).toBe(true);

      // Uniqueness
      expect(seenVideoIds.has(entry.videoId)).toBe(false);
      seenVideoIds.add(entry.videoId);

      const lesson = courseLessons[idx];
      expect(lesson).toBeDefined();
      expect(lesson.youtubeVideoId).toBe(entry.videoId);
      expect(lesson.title).toBe(entry.title);
      expect(lesson.order).toBe(entry.position);

      expect(seenLessonIds.has(lesson.id)).toBe(false);
      seenLessonIds.add(lesson.id);
    });

    expect(seenVideoIds.size).toBe(24);
    expect(seenLessonIds.size).toBe(24);
  });

  test('2. /courses renders the course card exactly once', async ({ page }) => {
    await page.goto('/courses');
    await page.waitForLoadState('domcontentloaded');

    // The course card container has data-testid="course-card-free-ccna-200-301-networkchuck"
    const courseCard = page.locator(`[data-testid="course-card-${courseSlug}"]`);
    await expect(courseCard).toHaveCount(1);
    await expect(courseCard).toBeVisible();

    const courseTitle = courseCard.getByRole('heading', { name: 'FREE CCNA 200-301 Complete Course (NetworkChuck 2025)' });
    await expect(courseTitle).toBeVisible();
  });

  test('3. /courses/free-ccna-200-301-networkchuck loads and shows modules and lessons in original playlist order', async ({ page }) => {
    await page.goto(`/courses/${courseSlug}`);
    await page.waitForLoadState('domcontentloaded');

    // Verify course header info
    await expect(page.locator('h1')).toHaveText('FREE CCNA 200-301 Complete Course (NetworkChuck 2025)');
    await expect(page.locator('text=NetworkChuck').first()).toBeVisible();

    // Verify modules exist in curriculum accordion
    await expect(page.locator('text=Module 1: Network Fundamentals & Models').first()).toBeVisible();
    await expect(page.locator('text=Module 2: Network Architecture, Cabling & Physical Infrastructure').first()).toBeVisible();
    await expect(page.locator('text=Module 3: IP Addressing & Subnetting Mastery').first()).toBeVisible();

    // Verify first lesson title is active
    await expect(page.locator('h2').first()).toContainText('FREE CCNA // What is a Network? // Day 0');
  });

  test('4. Library net-02 page links to the course and back', async ({ page }) => {
    // Navigate to /library/net-02
    await page.goto('/library/net-02');
    await page.waitForLoadState('domcontentloaded');

    // Verify Open as full course button exists and links to course
    const openCourseBtn = page.getByTestId('open-as-full-course-btn');
    await expect(openCourseBtn).toBeVisible();
    await expect(openCourseBtn).toHaveAttribute('href', `/courses/${courseSlug}`);

    // Verify lesson count and duration badges derived from manifest
    await expect(page.locator('text=24 lessons').first()).toBeVisible();
    await expect(page.locator('text=7 hours 27 mins').first()).toBeVisible();

    // Verify Watch on Original Platform exists as secondary
    const externalLink = page.getByRole('link', { name: /Watch on Original Platform/ });
    await expect(externalLink).toBeVisible();
    await expect(externalLink).toHaveAttribute('target', '_blank');

    // Click to course
    await openCourseBtn.click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(`/courses/${courseSlug}`);

    // Verify link back to library
    const viewInLibraryLink = page.getByTestId('view-in-library-btn');
    await expect(viewInLibraryLink).toBeVisible();
    await expect(viewInLibraryLink).toHaveAttribute('href', '/library/net-02');

    // Click back to library
    await viewInLibraryLink.click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL('/library/net-02');
  });

  test('5. Lesson navigation (previous and next) works across module boundaries', async ({ page }) => {
    const course = getCourseBySlug(courseSlug)!;
    const lessons = getCourseLessons(course);

    // Module 1 ends at lesson 6 (pos 6), Module 2 starts at lesson 7 (pos 7)
    const m1LastLesson = lessons[5]; // index 5 -> 6th lesson
    const m2FirstLesson = lessons[6]; // index 6 -> 7th lesson

    expect(m1LastLesson.order).toBe(6);
    expect(m2FirstLesson.order).toBe(7);

    // Navigate to the 6th lesson (last lesson of Module 1)
    await page.goto(`/courses/${courseSlug}?lesson=${m1LastLesson.slug}`);
    await page.waitForLoadState('domcontentloaded');

    // Verify next lesson button points to m2FirstLesson
    const nextBtn = page.locator('a:has-text("Next:"), button:has-text("Next:")').first();
    await expect(nextBtn).toBeVisible();
    await nextBtn.click();

    // Verify active lesson changed to m2FirstLesson across module boundary
    await expect(page).toHaveURL(new RegExp(`lesson=${m2FirstLesson.slug}`));
    await expect(page.locator('h2').first()).toContainText('DO NOT design your network like this!!');

    // Now test previous navigation back to m1LastLesson
    const prevBtn = page.locator('a:has-text("Prev:"), button:has-text("Prev:")').first();
    await expect(prevBtn).toBeVisible();
    await prevBtn.click();

    // Verify back on m1LastLesson
    await expect(page).toHaveURL(new RegExp(`lesson=${m1LastLesson.slug}`));
    await expect(page.locator('h2').first()).toContainText('how the OSI model works on YouTube');
  });

  test('6. YouTube player iframe loads the correct video ID for selected lessons', async ({ page }) => {
    // First lesson (S7MNX_UD7vY)
    await page.goto(`/courses/${courseSlug}`);
    await page.waitForLoadState('domcontentloaded');

    const iframe1 = page.locator('iframe[src*="youtube.com/embed/S7MNX_UD7vY"]');
    await expect(iframe1).toBeVisible({ timeout: 10000 });

    // Navigate to second lesson
    const nextBtn = page.locator('a:has-text("Next:"), button:has-text("Next:")').first();
    await expect(nextBtn).toBeVisible();
    await nextBtn.click();

    // Second lesson (9eH16Fxeb9o)
    const iframe2 = page.locator('iframe[src*="youtube.com/embed/9eH16Fxeb9o"]');
    await expect(iframe2).toBeVisible({ timeout: 10000 });
  });

  test('7. Lesson completion persists after a page refresh', async ({ page }) => {
    await page.goto(`/courses/${courseSlug}`);
    await page.waitForLoadState('domcontentloaded');

    // Find the complete lesson button
    const completeBtn = page.locator('button:has-text("Mark as Completed")').first();
    await expect(completeBtn).toBeVisible();

    // Click to toggle complete
    await completeBtn.click();
    await page.waitForTimeout(300);

    // Verify completed button text
    await expect(page.locator('button:has-text("Completed")').first()).toBeVisible();

    // Refresh page
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    // Verify state persisted
    await expect(page.locator('button:has-text("Completed")').first()).toBeVisible();
  });

  test('8. Existing courses (MERN, Networking for Hackers, Wireshark, Packet Forensics) still load', async ({ page }) => {
    const existingSlugs = [
      'mern-full-stack-course-with-ai',
      'networking-for-hackers-2027',
      'wireshark-and-ethical-hacking',
      'network-packet-analysis-masterclass',
    ];

    for (const slug of existingSlugs) {
      await page.goto(`/courses/${slug}`);
      await page.waitForLoadState('domcontentloaded');
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
      expect(await h1.innerText()).toBeTruthy();
    }
  });
});
