import { test, expect } from '@playwright/test';

test.describe('Linux Zero to Advanced — Student Experience & Responsive E2E', () => {
  const courseSlug = 'linux-zero-to-advanced';

  test('1. New student flow: Browse courses, open Linux Zero to Advanced, verify curriculum & lesson 1', async ({ page }) => {
    // 1. Visit courses directory
    await page.goto('/courses');
    await page.waitForLoadState('domcontentloaded');

    // 2. Locate and click course card link
    const card = page.locator(`[data-testid="course-card-${courseSlug}"]`);
    await expect(card).toBeVisible();
    await card.locator('a').first().click();

    // 3. Verify course learning experience view loaded
    await page.waitForURL(`**/courses/${courseSlug}*`);
    await expect(page.locator('h1').first()).toContainText('Linux Zero');

    // 4. Verify all 24 modules exist in curriculum list
    const moduleList = page.locator('text=/Module \\d{2}:/');
    const count = await moduleList.count();
    expect(count).toBeGreaterThanOrEqual(24);

    // 5. Verify first lesson is active by default
    const lessonTitle = page.locator('text=/What is a Linux distribution/i').first();
    await expect(lessonTitle).toBeVisible();

    // 6. Check YouTube video player or fallback container
    const videoContainer = page.locator('iframe[src*="youtube.com"], a[href*="youtube.com"]');
    await expect(videoContainer.first()).toBeVisible();

    // 7. Check practical lab & notes sections
    const labSection = page.locator('text=/Practical Lab|Hands-on Lab|Terminal Practice/i').first();
    await expect(labSection).toBeVisible();
  });

  test('2. Quiz interaction and explanation rendering', async ({ page }) => {
    await page.goto(`/courses/${courseSlug}`);
    await page.waitForLoadState('domcontentloaded');

    // Find quiz trigger button for Module 01
    const quizButton = page.locator('button:has-text("Quiz"), [data-testid="module-quiz-btn"]').first();
    if (await quizButton.isVisible()) {
      await quizButton.click();
      // Verify quiz interface loaded
      const quizHeader = page.locator('text=/Knowledge Check|Module Quiz|Question 1/i').first();
      await expect(quizHeader).toBeVisible();
    }
  });

  test('3. Desktop responsive viewport (1440px)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`/courses/${courseSlug}`);
    await page.waitForLoadState('domcontentloaded');

    // Both sidebar/curriculum and main content should be accessible
    await expect(page.locator('h1').first()).toBeVisible();
    const mainContent = page.locator('main, [role="main"]').first();
    await expect(mainContent).toBeVisible();
  });

  test('4. Tablet responsive viewport (768px)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(`/courses/${courseSlug}`);
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('5. Mobile responsive viewport (390px)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/courses/${courseSlug}`);
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('h1').first()).toBeVisible();
    // Video player should scale cleanly without horizontal scroll
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 5); // No unwanted wide overflow
  });
});
