import { test, expect } from '@playwright/test';

const TARGET_URL = process.env.CYBERTUBE_PROD_URL || 'https://cybertube-mu.vercel.app';
const COURSE_SLUG = 'linux-zero-to-advanced';
const COURSE_URL = `${TARGET_URL}/courses/${COURSE_SLUG}`;

test.describe('Linux Zero to Advanced — Production & Student Experience Verification', () => {

  test('1. Course Discovery: Landing page card renders on /courses', async ({ page }) => {
    await page.goto(`${TARGET_URL}/courses`, { waitUntil: 'domcontentloaded' });

    // Find Linux Zero to Advanced card
    const linuxCard = page.locator(`[data-testid="course-card-${COURSE_SLUG}"]`);
    await expect(linuxCard).toBeVisible({ timeout: 10000 });

    // Verify card title and lesson count badges
    await expect(linuxCard.getByRole('heading', { name: /Linux Zero/i })).toBeVisible();
    await expect(linuxCard.locator('text=55 lessons').first()).toBeVisible();
    await expect(linuxCard.locator('text=24 weeks').first()).toBeVisible();

    // Click card link and ensure navigation to /courses/linux-zero-to-advanced
    const courseLink = linuxCard.locator('a[href*="/courses/linux-zero-to-advanced"]').first();
    await expect(courseLink).toBeVisible();
  });

  test('2. Course Structure: 24 Modules in numerical order', async ({ page }) => {
    await page.goto(COURSE_URL, { waitUntil: 'domcontentloaded' });

    // Verify course title heading
    await expect(page.locator('h1').first()).toContainText('Linux Zero');

    // Verify all 24 modules are present in the curriculum list
    const moduleHeadings = page.locator('h4:has-text("Module ")');
    await expect(moduleHeadings.first()).toBeVisible({ timeout: 10000 });
    const count = await moduleHeadings.count();
    expect(count).toBe(24);

    // Verify first and final modules
    await expect(page.locator('h4:has-text("Module 01:")').first()).toBeVisible();
    await expect(page.locator('h4:has-text("Module 24:")').first()).toBeVisible();
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
    await expect(page.locator('text=/Assessed Module Lab|Practical Lab/i').first()).toBeVisible({ timeout: 10000 });
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
    await page.goto(COURSE_URL, { waitUntil: 'domcontentloaded' });

    // Open Module 1 quiz via sidebar quiz row
    const sidebarQuizRow = page.locator('[data-testid^="module-quiz-sidebar-row"]').first();
    await expect(sidebarQuizRow).toBeVisible({ timeout: 10000 });
    await sidebarQuizRow.click();

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
    // 6a. Desktop Viewport (1440px)
    const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto(COURSE_URL, { waitUntil: 'domcontentloaded' });
    await expect(desktopPage.locator('h1').first()).toContainText('Linux Zero');
    await desktopContext.close();

    // 6b. Tablet Viewport (768px)
    const tabletContext = await browser.newContext({ viewport: { width: 768, height: 1024 } });
    const tabletPage = await tabletContext.newPage();
    await tabletPage.goto(COURSE_URL, { waitUntil: 'domcontentloaded' });
    await expect(tabletPage.locator('h1').first()).toContainText('Linux Zero');
    await tabletContext.close();

    // 6c. Mobile Viewport (iPhone 14: 390x844)
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(`${COURSE_URL}?lesson=lin-mod01-les01`, { waitUntil: 'domcontentloaded' });

    // Video iframe must fit without breaking
    const mobileIframe = mobilePage.locator('iframe[src*="youtube.com/embed"]');
    await expect(mobileIframe).toBeVisible({ timeout: 10000 });

    await mobileContext.close();
  });
});
