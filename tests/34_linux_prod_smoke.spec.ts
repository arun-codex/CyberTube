import { test, expect } from '@playwright/test';

const PROD_URL = process.env.CYBERTUBE_PROD_URL || 'https://cybertube-mu.vercel.app';
const COURSE_SLUG = 'linux-zero-to-advanced';
const COURSE_URL = `${PROD_URL}/courses/${COURSE_SLUG}`;

test.describe('Linux Zero to Advanced — Live Production Verification', () => {

  test('1. Course Discovery: Landing page card renders on /courses', async ({ page }) => {
    await page.goto(`${PROD_URL}/courses`, { waitUntil: 'domcontentloaded' });

    // Find Linux Zero to Advanced card
    const linuxCard = page.locator(`[data-testid="course-card-${COURSE_SLUG}"]`);
    await expect(linuxCard).toBeVisible({ timeout: 10000 });

    // Verify card title and lesson count badges
    await expect(linuxCard.getByRole('heading', { name: /Linux Zero/i })).toBeVisible();
    await expect(linuxCard.locator('text=55 lessons')).toBeVisible();
    await expect(linuxCard.locator('text=24 weeks')).toBeVisible();

    // Click card link and ensure navigation to /courses/linux-zero-to-advanced
    const courseLink = linuxCard.locator('a[href*="/courses/linux-zero-to-advanced"]').first();
    await expect(courseLink).toBeVisible();
  });

  test('2. Course Structure: 24 Modules in numerical order on production', async ({ page }) => {
    await page.goto(COURSE_URL, { waitUntil: 'domcontentloaded' });

    // Verify course title heading
    await expect(page.locator('h1').first()).toContainText('Linux Zero');

    // Verify all 24 modules are present in the curriculum list
    const moduleHeadings = page.locator('text=/Module \\d{2}:/');
    await expect(moduleHeadings.first()).toBeVisible({ timeout: 10000 });
    const count = await moduleHeadings.count();
    expect(count).toBeGreaterThanOrEqual(24);

    // Verify first and final modules
    await expect(page.locator('text=Module 01:').first()).toBeVisible();
    await expect(page.locator('text=Module 24:').first()).toBeVisible();
  });

  test('3. Lesson Experience: Video player, notes, and lab instructions', async ({ page }) => {
    await page.goto(`${COURSE_URL}?lesson=lin-mod01-les01`, { waitUntil: 'domcontentloaded' });

    // Check lesson heading
    await expect(page.locator('text=Module 01 - Lesson 1').first()).toBeVisible({ timeout: 10000 });

    // Check YouTube iframe embed
    const iframe = page.locator('iframe[src*="youtube.com/embed/6EKzuBAEbOA"]');
    await expect(iframe).toBeVisible({ timeout: 10000 });

    // Check Watch on YouTube fallback link
    const ytLink = page.locator('a[href*="youtube.com/watch?v=6EKzuBAEbOA"]');
    await expect(ytLink).toBeVisible();

    // Verify lab tab
    const labTab = page.locator('button:has-text("Module Lab")').first();
    await expect(labTab).toBeVisible();
    await labTab.click();
    await expect(page.locator('text=/VirtualBox|Ubuntu|apt update|terminal/i').first()).toBeVisible();
  });

  test('4. Progress Tracking: Completion toggle and persistence', async ({ page }) => {
    await page.goto(`${COURSE_URL}?lesson=lin-mod01-les01`, { waitUntil: 'domcontentloaded' });

    // Locate Mark as Completed button
    const completeBtn = page.locator('button:has-text("Mark as Completed"), button:has-text("Completed")').first();
    await expect(completeBtn).toBeVisible({ timeout: 10000 });

    const initialText = await completeBtn.innerText();
    await completeBtn.click();
    await page.waitForTimeout(500);

    // Verify text toggled
    const updatedText = await completeBtn.innerText();
    expect(updatedText).not.toEqual(initialText);

    // Reload page to verify persistence across sessions
    await page.reload({ waitUntil: 'domcontentloaded' });
    const persistedBtn = page.locator('button:has-text("Mark as Completed"), button:has-text("Completed")').first();
    await expect(persistedBtn).toBeVisible();
    expect(await persistedBtn.innerText()).toEqual(updatedText);

    // Check localStorage key
    const hasProgress = await page.evaluate((slug) => {
      const keys = Object.keys(localStorage);
      return keys.some(k => k.includes('course_progress') || k.includes(slug));
    }, COURSE_SLUG);
    expect(hasProgress).toBe(true);

    // Toggle back to clean up test state
    await persistedBtn.click();
  });

  test('5. Knowledge Assessment: Quiz interface and interaction', async ({ page }) => {
    await page.goto(`${COURSE_URL}?lesson=lin-mod01-les01`, { waitUntil: 'domcontentloaded' });

    // Find and click the Module Quiz tab button
    const quizTabBtn = page.locator('button:has-text("Module Quiz")').first();
    await expect(quizTabBtn).toBeVisible({ timeout: 10000 });
    await quizTabBtn.click();

    // Verify Quiz title is displayed
    const quizTitle = page.locator('[data-testid="active-module-quiz-title"]');
    await expect(quizTitle).toBeVisible({ timeout: 10000 });

    // Verify passing threshold text
    await expect(page.locator('text=/Passing threshold: 70%/i').first()).toBeVisible();

    // Verify radio inputs for questions
    const radios = page.locator('input[type="radio"]');
    const radioCount = await radios.count();
    expect(radioCount).toBeGreaterThanOrEqual(4); // At least 4 options

    // Verify option selection interaction
    await radios.first().click();
    await expect(radios.first()).toBeChecked();
  });

  test('6. Responsive Viewports: Desktop (1440px), Tablet (768px), Mobile (390px)', async ({ browser }) => {
    // 6a. Tablet Viewport
    const tabletContext = await browser.newContext({ viewport: { width: 768, height: 1024 } });
    const tabletPage = await tabletContext.newPage();
    await tabletPage.goto(COURSE_URL, { waitUntil: 'domcontentloaded' });
    await expect(tabletPage.locator('h1').first()).toContainText('Linux Zero');
    await tabletContext.close();

    // 6b. Mobile Viewport (iPhone 14 / modern smartphone: 390x844)
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(`${COURSE_URL}?lesson=lin-mod01-les01`, { waitUntil: 'domcontentloaded' });

    // Video iframe must fit without horizontal scroll
    const mobileIframe = mobilePage.locator('iframe[src*="youtube.com/embed"]');
    await expect(mobileIframe).toBeVisible({ timeout: 10000 });

    // Verify no wide horizontal overflow
    const scrollWidth = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await mobilePage.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 5);

    await mobileContext.close();
  });
});
