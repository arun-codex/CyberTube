import { test,expect } from '@playwright/test';

test.describe('Universal course quizzes',()=>{
  for(const slug of ['linux-zero-to-advanced','mern-full-stack-course-with-ai']){
    test('Start Quiz opens assessment immediately for '+slug,async({page})=>{
      await page.goto('/courses/'+slug);
      const start=page.locator('[data-testid^="module-quiz-sidebar-row-"]').first();
      await expect(start).toBeVisible();
      await start.click();
      await expect(page).toHaveURL(/tab=quiz/);
      const quiz=page.locator('#course-quiz-focus');
      await expect(quiz).toBeVisible();
      await expect(page.getByTestId('active-module-quiz-title')).toBeVisible();
      const bounds=await quiz.boundingBox();
      expect(bounds).toBeTruthy();
      expect(bounds!.y).toBeLessThan(page.viewportSize()!.height);
      await expect(page.locator('[data-testid="lesson-video-resources"]')).toHaveCount(0);
    });
  }

  test('Linux answers submit without Storytelling-only course ID error',async({page})=>{
    await page.goto('/courses/linux-zero-to-advanced');
    await page.locator('[data-testid^="module-quiz-sidebar-row-"]').first().click();
    await expect(page.getByTestId('active-module-quiz-title')).toBeVisible();
    const groups=await page.locator('input[type="radio"][name^="quiz-q-"]').evaluateAll(nodes=>
      [...new Set(nodes.map(el=>(el as HTMLInputElement).name))]
    );
    expect(groups.length).toBeGreaterThan(0);
    for(const name of groups){
      await page.locator('input[type="radio"][name="'+name+'"]').first().check();
    }
    await page.getByRole('button',{name:'Submit Quiz'}).click();
    await expect(page.getByText(/Quiz Assessment Passed!|Passing Threshold Not Met/)).toBeVisible();
    await expect(page.getByTestId('quiz-submission-error')).toHaveCount(0);
  });
});
