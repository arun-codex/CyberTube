import { test, expect } from '@playwright/test';

test.describe('CyberTube password recovery flow', () => {
  test('login page exposes the forgot-password link', async ({ page }) => {
    const response = await page.goto('/login');
    expect(response?.status()).toBe(200);

    const recoveryLink = page.getByRole('link', { name: 'Forgot password?' });
    await expect(recoveryLink).toBeVisible();
    await expect(recoveryLink).toHaveAttribute('href', '/forgot-password');
  });

  test('forgot-password page provides an accessible email request form', async ({ page }) => {
    const response = await page.goto('/forgot-password');
    expect(response?.status()).toBe(200);

    await expect(page.getByRole('heading', { name: 'Forgot your password?' })).toBeVisible();
    await expect(page.getByLabel('Email address')).toHaveAttribute('type', 'email');
    await expect(page.getByRole('button', { name: 'Send password reset link' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Back to sign in' })).toHaveAttribute('href', '/login');
  });

  test('reset-password page gives a safe recovery path when no valid recovery session exists', async ({ page }) => {
    const response = await page.goto('/reset-password');
    expect(response?.status()).toBe(200);

    const unavailableState = page.getByTestId('password-reset-unavailable');
    await expect(unavailableState).toBeVisible({ timeout: 15000 });
    await expect(unavailableState.getByRole('link', { name: 'Request another reset link' }))
      .toHaveAttribute('href', '/forgot-password');
  });
});
