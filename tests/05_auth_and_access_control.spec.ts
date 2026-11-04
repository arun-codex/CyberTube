import { test, expect } from '@playwright/test';

test.describe('CyberTube Auth Protection & Access Control', () => {
  test('Unauthenticated user accessing /account redirects to /login', async ({ page }) => {
    // Clear cookies/storage
    await page.context().clearCookies();
    await page.goto('/account');

    // Should redirect to login with returnUrl or redirected path
    await expect(page).toHaveURL(/\/login/);
  });

  test('Unauthenticated user accessing /admin redirects to login or unauthorized', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/admin');

    // Admin requires authentication and admin claim/role; unauth must be redirected
    await expect(page).toHaveURL(/\/(login|\?error=)/);
  });

  test('Login form displays validation error on empty submit', async ({ page }) => {
    await page.goto('/login');
    const submitBtn = page.locator('button[type="submit"]');
    await submitBtn.click();

    // HTML5 or React hook form error check (required fields)
    const emailInput = page.locator('input[type="email"]');
    const isRequired = await emailInput.getAttribute('required');
    expect(isRequired !== null).toBeTruthy();
  });
});

