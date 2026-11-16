import { test, expect } from '@playwright/test';

const PROD_URL = 'https://cybertube-mu.vercel.app';
const COURSE_URL = `${PROD_URL}/courses/free-storytelling-masterclass`;

test.describe('Production Verification: Week 1 Quiz & Module 2 Unlock', () => {
  test.setTimeout(90000);

  test('1. Production Desktop Verification: Entry points, 10 Qs, 70% threshold, failing lock, passing unlock, and refresh persistence', async ({ page }) => {
    // Navigate to course
    await page.goto(`${COURSE_URL}?lesson=w01-l5-first-analysis`, { waitUntil: 'domcontentloaded' });

    // 1. Module 1 displays all five lessons
    const module1Header = page.getByRole('button', { name: /Week 01 — What is a story\?/i });
    await expect(module1Header).toBeVisible();

    // Verify 5 lessons are linked in the curriculum sidebar
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

    // Also verify Assessment Quiz card at bottom of Lesson 5
    const assessmentSection = page.locator('[data-testid="module-quiz-assessment-section"]');
    await expect(assessmentSection).toBeVisible();
    await expect(assessmentSection).toContainText('Questions: 10');
    await expect(assessmentSection).toContainText('Passing threshold: 70%');

    // Take screenshot of desktop entry points
    await page.screenshot({ path: 'prod_desktop_entry_points.png', fullPage: false });

    // 3. Click sidebar quiz row to open quiz
    await sidebarQuizRow.click();

    // Check quiz tab is active and all 10 questions appear
    const quizTitle = page.locator('text=Module Knowledge Assessment (10 Questions)');
    await expect(quizTitle).toBeVisible();
    const thresholdText = page.locator('text=Passing threshold: 70% (Requires 7/10)');
    await expect(thresholdText).toBeVisible();

    // Verify 10 questions exist (headings formatted as "1. ...", "2. ...", etc.)
    for (let q = 1; q <= 10; q++) {
      const qHeading = page.locator(`role=heading[name^="${q}. "]`);
      await expect(qHeading).toBeVisible();
    }

    // Screenshot quiz view
    await page.screenshot({ path: 'prod_desktop_quiz_open.png', fullPage: false });

    // 4. Failing attempt (select option 0 for all questions: only questions 4 and 6 are option 0, so score = 20%)
    for (let q = 0; q < 10; q++) {
      const radio = page.locator(`input[name="quiz-q-${q}"]`).first();
      await radio.check({ force: true });
    }

    const submitBtn = page.getByRole('button', { name: /Submit Quiz/i });
    await expect(submitBtn).toBeEnabled();
    await submitBtn.click();

    // Wait for failure result
    const failScoreText = page.locator('text=Passing Threshold Not Met');
    await expect(failScoreText).toBeVisible({ timeout: 10000 });
    const retakeBtn = page.getByRole('button', { name: /Retake Quiz/i });
    await expect(retakeBtn).toBeVisible();

    // Verify Module 2 remains locked with current best score
    const week2Header = page.getByRole('button', { name: /Week 02 — Observation, memory and idea generation Locked/i });
    await expect(week2Header).toBeVisible();
    const week2LockMsg = page.locator('text=Pass Week 1 Quiz (≥ 70%) to unlock Week 2. Current best: 20%.');
    await expect(week2LockMsg).toBeVisible();

    await page.screenshot({ path: 'prod_desktop_failing_attempt.png', fullPage: false });

    // 5. Passing attempt (answer all 10 correctly)
    // Correct indices: [1, 1, 1, 1, 0, 1, 0, 1, 1, 1]
    const correctIndices = [1, 1, 1, 1, 0, 1, 0, 1, 1, 1];
    await retakeBtn.click();

    for (let q = 0; q < 10; q++) {
      const radio = page.locator(`input[name="quiz-q-${q}"]`).nth(correctIndices[q]);
      await radio.check({ force: true });
    }

    const submitBtnPass = page.getByRole('button', { name: /Submit Quiz/i });
    await expect(submitBtnPass).toBeEnabled();
    await submitBtnPass.click();

    // Verify passing score
    const passResult = page.locator('text=Quiz Assessment Passed!');
    await expect(passResult).toBeVisible({ timeout: 10000 });

    // Verify Week 2 is immediately UNLOCKED reactively!
    // When unlocked, the lock overlay is gone and its lessons become visible
    await expect(page.getByRole('link', { name: 'Week 02 • Lesson 1: Collect observations', exact: true })).toBeVisible();
    // Verify week 2 lock message is gone
    await expect(week2LockMsg).not.toBeVisible();

    await page.screenshot({ path: 'prod_desktop_passing_unlocked.png', fullPage: false });

    // 6. Persistence across reload / refresh
    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('link', { name: 'Week 02 • Lesson 1: Collect observations', exact: true })).toBeVisible();

    // Check Week 1 quiz score indicator in sidebar
    await expect(sidebarQuizRow).toContainText('100%');
    await page.screenshot({ path: 'prod_desktop_persisted_after_refresh.png', fullPage: false });
  });

  test('2. Production Mobile Verification: Viewport 375x667', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 667 },
      isMobile: true,
      hasTouch: true,
    });
    const page = await context.newPage();

    await page.goto(`${COURSE_URL}?lesson=w01-l5-first-analysis`, { waitUntil: 'domcontentloaded' });

    // Check Assessment Quiz card visible on mobile
    const assessmentSection = page.locator('[data-testid="module-quiz-assessment-section"]');
    await expect(assessmentSection).toBeVisible();
    await expect(assessmentSection).toContainText('Assessment Quiz');

    await page.screenshot({ path: 'prod_mobile_assessment_card.png', fullPage: false });

    // Click "Take Module Quiz →" navigation button on mobile
    const takeQuizBtn = page.getByRole('button', { name: /Take Module Quiz/i });
    await expect(takeQuizBtn).toBeVisible();
    await takeQuizBtn.click();

    // Verify quiz container loaded on mobile with 10 questions
    const quizTitle = page.locator('text=Module Knowledge Assessment (10 Questions)');
    await expect(quizTitle).toBeVisible();

    await page.screenshot({ path: 'prod_mobile_quiz_view.png', fullPage: false });
    await context.close();
  });
});
