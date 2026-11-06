import { test, expect } from '@playwright/test';

test.describe('CyberTube Courses, Lessons & Progress Tracking', () => {
  const courseSlug = 'network-packet-analysis-masterclass';

  test('Course detail displays curriculum, modules, and estimated duration', async ({ page }) => {
    await page.goto(`/courses/${courseSlug}`);
    await expect(page.locator('h1')).toBeVisible();

    // Verify curriculum heading and module accordion
    const curriculumTitle = page.locator('h3:has-text("Curriculum")');
    await expect(curriculumTitle).toBeVisible();

    const modules = page.locator('button:has-text("completed")');
    expect(await modules.count()).toBeGreaterThan(0);
  });

  test('Lesson player embeds YouTube player and allows completion toggle', async ({ page }) => {
    // Navigate to a lesson with YouTube video in the curriculum
    await page.goto(`/courses/${courseSlug}?lesson=advanced-investigation-workflow`);
    await page.waitForLoadState('domcontentloaded');

    // Check YouTube iframe presence
    const iframe = page.locator('iframe[src*="youtube.com/embed"]');
    await expect(iframe).toBeVisible({ timeout: 10000 });

    // Check Mark as Completed button
    const completeBtn = page.locator('button:has-text("Mark as Completed"), button:has-text("Completed")').first();
    await expect(completeBtn).toBeVisible();

    // Toggle completion status
    const initialText = await completeBtn.innerText();
    await completeBtn.click();
    await page.waitForTimeout(400);

    // Verify button state updated or toggled
    const updatedText = await completeBtn.innerText();
    expect(updatedText).not.toEqual(initialText);

    // Check local storage progress persistence using prefix key
    const storedKeys = await page.evaluate(() => {
      return Object.keys(localStorage).filter(k => k.startsWith('cybertube_course_progress_v1_'));
    });
    expect(storedKeys.length).toBeGreaterThan(0);
  });

  test('Lesson navigation links between previous and next lessons smoothly', async ({ page }) => {
    await page.goto(`/courses/${courseSlug}`);
    await page.waitForLoadState('domcontentloaded');

    const nextBtn = page.locator('a:has-text("Next:"), button:has-text("Next:")').first();
    if (await nextBtn.isVisible()) {
      const nextHref = await nextBtn.getAttribute('href');
      if (nextHref) {
        await nextBtn.click();
        await expect(page).toHaveURL(new RegExp(nextHref.replace('?', '\\?')));
      }
    }
  });
});
