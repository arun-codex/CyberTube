import { test, expect } from '@playwright/test';

/**
 * Read-Only Production Verification for Storytelling Masterclass.
 *
 * CRITICAL SECURITY & DATA INTEGRITY RULES:
 * 1. Zero Quiz Answers: NEVER contain, import, or log quiz answer keys or correct indices.
 * 2. Zero State Mutation: This smoke test does NOT submit quiz attempts or mutate live learner data.
 * 3. Safe Entry Point Checks: Validates that Module 1 exposes its lessons, curriculum sidebar
 *    quiz item, and lesson assessment entry card without submitting state-changing POST requests.
 */

const PROD_URL = process.env.CYBERTUBE_PROD_URL || 'https://cybertube-mu.vercel.app';
const COURSE_URL = `${PROD_URL}/courses/free-storytelling-masterclass`;

test.describe('Production Read-Only Smoke Verification', () => {
  test('1. Production Desktop Verification: Lessons, sidebar quiz row, and assessment section are visible', async ({ page }) => {
    await page.goto(`${COURSE_URL}?lesson=w01-l5-first-analysis`, { waitUntil: 'domcontentloaded' });

    // 1. Module 1 displays all five lessons in the sidebar
    const sidebar = page.locator('aside, [role="complementary"]');
    await expect(sidebar.getByRole('link', { name: 'Week 01 • Lesson 1: Story versus information', exact: true })).toBeVisible();
    await expect(sidebar.getByRole('link', { name: 'Week 01 • Lesson 2: The audience', exact: true })).toBeVisible();
    await expect(sidebar.getByRole('link', { name: 'Week 01 • Lesson 3: Change', exact: true })).toBeVisible();
    await expect(sidebar.getByRole('link', { name: 'Week 01 • Lesson 4: Tell a real moment', exact: true })).toBeVisible();
    await expect(sidebar.getByRole('link', { name: 'Week 01 • Lesson 5: First analysis', exact: true })).toBeVisible();

    // 2. Week 1 Assessment Quiz appears in sidebar
    const sidebarQuizRow = page.locator('[data-testid^="module-quiz-sidebar-row"]').first();
    await expect(sidebarQuizRow).toBeVisible();
    await expect(sidebarQuizRow).toContainText('Knowledge Check • Quiz');
    await expect(sidebarQuizRow).toContainText('10 Questions');
    await expect(sidebarQuizRow).toContainText('Pass threshold: 70%');

    // 3. Assessment Quiz section card appears on Lesson 5
    const assessmentSection = page.locator('[data-testid="module-quiz-assessment-section"]');
    await expect(assessmentSection).toBeVisible();
    await expect(assessmentSection).toContainText('Questions: 10');
    await expect(assessmentSection).toContainText('Passing threshold: 70%');

    // 4. Click sidebar quiz row to verify quiz container opens
    await sidebarQuizRow.click();
    const quizTitle = page.locator('text=Module Knowledge Assessment (10 Questions)');
    await expect(quizTitle).toBeVisible();
    const thresholdText = page.locator('text=Passing threshold: 70% (Requires 7/10)');
    await expect(thresholdText).toBeVisible();

    // Verify questions 1..10 render their question prompts without answering or submitting
    for (let q = 1; q <= 10; q++) {
      const qHeading = page.locator(`role=heading[name^="${q}. "]`);
      await expect(qHeading).toBeVisible();
    }
  });

  test('2. Production Mobile Verification: Viewport 375x667', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 667 },
      isMobile: true,
      hasTouch: true,
    });
    const page = await context.newPage();

    await page.goto(`${COURSE_URL}?lesson=w01-l5-first-analysis`, { waitUntil: 'domcontentloaded' });

    // Assessment card visible on mobile
    const assessmentSection = page.locator('[data-testid="module-quiz-assessment-section"]');
    await expect(assessmentSection).toBeVisible();
    await expect(assessmentSection).toContainText('Assessment Quiz');

    // "Take Module Quiz →" forward navigation button visible on mobile
    const takeQuizBtn = page.getByRole('button', { name: /Take Module Quiz/i });
    await expect(takeQuizBtn).toBeVisible();
    await takeQuizBtn.click();

    // Quiz container rendered on mobile
    const quizTitle = page.locator('text=Module Knowledge Assessment (10 Questions)');
    await expect(quizTitle).toBeVisible();

    await context.close();
  });
});
