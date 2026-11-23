import { test, expect } from '@playwright/test';

test.describe('Universal course quizzes - confirmed removed per site-wide quiz policy', () => {
  for (const slug of ['linux-zero-to-advanced', 'mern-full-stack-course-with-ai']) {
    test('Quiz sidebar row is confirmed removed for ' + slug, async ({ page }) => {
      await page.goto('/courses/' + slug);
      const start = page.locator('[data-testid^="module-quiz-sidebar-row-"]');
      await expect(start).toHaveCount(0);
    });
  }

  test('Module quizzes confirmed removed from course layout', async ({ page }) => {
    await page.goto('/courses/linux-zero-to-advanced');
    const quizTitle = page.getByTestId('active-module-quiz-title');
    await expect(quizTitle).toHaveCount(0);
  });
});
