import { test, expect } from '@playwright/test';
import { NextRequest } from 'next/server';
import { GET as authCallbackGet } from '../app/auth/callback/route';
import { GET as authConfirmGet } from '../app/auth/confirm/route';
import { getAuthCallbackUrl, CANONICAL_ORIGIN } from '../src/lib/canonicalUrl';

test.describe('Phase 20.2 — Password Recovery & Reset Flow E2E', () => {
  // ---------------------------------------------------------------------------
  // Test 1: Request recovery form on /forgot-password
  // ---------------------------------------------------------------------------
  test('Test 1 — Request recovery form on /forgot-password delivers success feedback', async ({ page }) => {
    // Intercept GoTrue recovery email request
    await page.route(/\/auth\/v1\/recover/, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({}),
      });
    });

    await page.goto('/forgot-password');
    await expect(page.getByRole('heading', { name: 'Forgot your password?' })).toBeVisible();

    await page.fill('input[name="email"]', 'analyst@cybertube.local');
    await page.click('button[type="submit"]');

    const successContainer = page.locator('[data-testid="password-reset-email-sent"]');
    await expect(successContainer).toBeVisible({ timeout: 5000 });
    await expect(successContainer).toContainText('Check your inbox');
  });

  // ---------------------------------------------------------------------------
  // Test 2: Recovery email destination uses canonical callback URL
  // ---------------------------------------------------------------------------
  test('Test 2 — Recovery email destination enforces canonical callback URL', () => {
    const originalEnv = process.env.NEXT_PUBLIC_SITE_URL;
    try {
      process.env.NEXT_PUBLIC_SITE_URL = CANONICAL_ORIGIN;
      const callbackUrl = getAuthCallbackUrl('/reset-password');
      expect(callbackUrl).toBe('https://cybertube-mu.vercel.app/auth/callback?next=%2Freset-password');
    } finally {
      process.env.NEXT_PUBLIC_SITE_URL = originalEnv;
    }
  });

  // ---------------------------------------------------------------------------
  // Test 3: Successful OTP exchange unlocks new-password fields on /reset-password
  // ---------------------------------------------------------------------------
  test('Test 3 — Legitimate recovery session unlocks new-password fields with show/hide toggles', async ({ page, context }) => {
    // Set recovery session cookie established by /auth/callback or /auth/confirm
    await context.addCookies([
      {
        name: 'cybertube_recovery_session',
        value: '1',
        domain: 'localhost',
        path: '/',
      },
    ]);

    // Mock active user session for recovery
    await page.route(/\/auth\/v1\/user/, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'user-rec-1234',
          email: 'analyst@cybertube.local',
          role: 'authenticated',
          aud: 'authenticated',
        }),
      });
    });

    await page.goto('/reset-password');

    const newPasswordInput = page.locator('input#new-password');
    const confirmPasswordInput = page.locator('input#confirm-password');
    const updateButton = page.locator('button[type="submit"]');

    await expect(newPasswordInput).toBeVisible({ timeout: 5000 });
    await expect(confirmPasswordInput).toBeVisible();
    await expect(updateButton).toBeVisible();
    await expect(updateButton).toHaveText('Update password');

    // Test Show/Hide password toggles
    const showNewPasswordBtn = page.locator('button[aria-label="Show new password"]');
    await expect(newPasswordInput).toHaveAttribute('type', 'password');
    await showNewPasswordBtn.click();
    await expect(newPasswordInput).toHaveAttribute('type', 'text');
    await page.locator('button[aria-label="Hide new password"]').click();
    await expect(newPasswordInput).toHaveAttribute('type', 'password');
  });

  // ---------------------------------------------------------------------------
  // Test 4: Actual password update calls updateUser and displays success
  // ---------------------------------------------------------------------------
  test('Test 4 — Password update calls GoTrue updateUser and transitions to success state', async ({ page, context }) => {
    await context.addCookies([
      {
        name: 'cybertube_recovery_session',
        value: '1',
        domain: 'localhost',
        path: '/',
      },
    ]);

    let userUpdated = false;
    await page.route(/\/auth\/v1\/user/, async (route) => {
      if (route.request().method() === 'PUT') {
        userUpdated = true;
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            id: 'user-rec-1234',
            email: 'analyst@cybertube.local',
          }),
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            id: 'user-rec-1234',
            email: 'analyst@cybertube.local',
            role: 'authenticated',
          }),
        });
      }
    });

    // Mock logout on password reset completion
    await page.route(/\/auth\/v1\/logout/, async (route) => {
      await route.fulfill({ status: 204 });
    });

    await page.goto('/reset-password');

    await page.fill('input#new-password', 'ValidNewPass123!');
    await page.fill('input#confirm-password', 'ValidNewPass123!');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Password updated successfully')).toBeVisible({ timeout: 5000 });
    const continueLink = page.locator('a:has-text("Continue to Sign In")');
    await expect(continueLink).toBeVisible();
    await expect(continueLink).toHaveAttribute('href', '/login');
    expect(userUpdated).toBe(true);
  });

  // ---------------------------------------------------------------------------
  // Test 5: Mismatched passwords rejected with validation without API submission
  // ---------------------------------------------------------------------------
  test('Test 5 — Mismatched passwords rejected without calling GoTrue updateUser', async ({ page, context }) => {
    await context.addCookies([
      {
        name: 'cybertube_recovery_session',
        value: '1',
        domain: 'localhost',
        path: '/',
      },
    ]);

    let updateAttempted = false;
    await page.route(/\/auth\/v1\/user/, async (route) => {
      if (route.request().method() === 'PUT') {
        updateAttempted = true;
        await route.fulfill({ status: 200, body: '{}' });
      } else {
        await route.fulfill({
          status: 200,
          body: JSON.stringify({ id: 'user-rec-1234', email: 'analyst@cybertube.local' }),
        });
      }
    });

    await page.goto('/reset-password');

    await page.fill('input#new-password', 'FirstPassword123!');
    await page.fill('input#confirm-password', 'SecondPassword456!');
    await page.click('button[type="submit"]');

    const alert = page.locator('div[role="alert"]');
    await expect(alert).toBeVisible();
    await expect(alert).toContainText('The passwords do not match');
    expect(updateAttempted).toBe(false);
  });

  // ---------------------------------------------------------------------------
  // Test 6: Weak passwords (< 8 characters) rejected without API submission
  // ---------------------------------------------------------------------------
  test('Test 6 — Weak passwords shorter than 8 characters are rejected', async ({ page, context }) => {
    await context.addCookies([
      {
        name: 'cybertube_recovery_session',
        value: '1',
        domain: 'localhost',
        path: '/',
      },
    ]);

    let updateAttempted = false;
    await page.route(/\/auth\/v1\/user/, async (route) => {
      if (route.request().method() === 'PUT') {
        updateAttempted = true;
        await route.fulfill({ status: 200, body: '{}' });
      } else {
        await route.fulfill({
          status: 200,
          body: JSON.stringify({ id: 'user-rec-1234', email: 'analyst@cybertube.local' }),
        });
      }
    });

    await page.goto('/reset-password');

    await page.fill('input#new-password', 'short');
    await page.fill('input#confirm-password', 'short');
    await page.click('button[type="submit"]');

    // Either HTML5 validation prevents submission or alert shows
    expect(updateAttempted).toBe(false);
  });

  // ---------------------------------------------------------------------------
  // Test 7: Expired OTP displays expired link message with request button
  // ---------------------------------------------------------------------------
  test('Test 7 — Expired OTP error in query params or hash displays expired message and recovery link', async ({ page }) => {
    // 7A: Query params with otp_expired
    await page.goto('/reset-password?error_code=otp_expired&error=Email+link+is+invalid+or+has+expired');

    const unavailableContainer = page.locator('[data-testid="password-reset-unavailable"]');
    await expect(unavailableContainer).toBeVisible({ timeout: 5000 });
    await expect(unavailableContainer).toContainText('expired');

    const requestAnotherLink = unavailableContainer.locator('a[href="/forgot-password"]');
    await expect(requestAnotherLink).toBeVisible();
    await expect(requestAnotherLink).toHaveText('Request another reset link');

    // 7B: Hash fragment with otp_expired
    await page.goto('/reset-password#error=access_denied&error_code=otp_expired');
    await expect(unavailableContainer).toBeVisible({ timeout: 5000 });
    await expect(unavailableContainer).toContainText('expired');
  });

  // ---------------------------------------------------------------------------
  // Test 8: Reused or invalid OTP rejected
  // ---------------------------------------------------------------------------
  test('Test 8 — Invalid or reused OTP parameters display invalid message', async ({ page }) => {
    await page.goto('/reset-password?error_code=invalid_token&error=Token+has+expired+or+is+invalid');

    const unavailableContainer = page.locator('[data-testid="password-reset-unavailable"]');
    await expect(unavailableContainer).toBeVisible({ timeout: 5000 });
    await expect(unavailableContainer).toContainText(/invalid|expired/i);

    const requestAnotherLink = unavailableContainer.locator('a[href="/forgot-password"]');
    await expect(requestAnotherLink).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Test 9: Authenticated session without recovery cannot access reset form
  // ---------------------------------------------------------------------------
  test('Test 9 — Normal authenticated session without recovery marker cannot access reset form', async ({ page }) => {
    // Mock normal user session, but DO NOT provide cybertube_recovery_session cookie or recovery event
    await page.route(/\/auth\/v1\/user/, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'user-normal-999',
          email: 'regular@cybertube.local',
          role: 'authenticated',
        }),
      });
    });

    await page.goto('/reset-password');

    // Must NOT reveal password reset fields
    await expect(page.locator('input#new-password')).not.toBeVisible();

    // Must display invalid/safe recovery state
    const unavailableContainer = page.locator('[data-testid="password-reset-unavailable"]');
    await expect(unavailableContainer).toBeVisible({ timeout: 5000 });
    await expect(unavailableContainer).toContainText('already been used');
    await expect(unavailableContainer.locator('a[href="/forgot-password"]')).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Test 10: Server callback & confirm route recovery error handling
  // ---------------------------------------------------------------------------
  test('Test 10 — Server callback and confirm routes redirect recovery errors to /reset-password', async () => {
    // 10A: Callback route with recovery error redirects to /reset-password?error_code=otp_expired
    const reqCallback = new NextRequest(
      'https://cybertube-mu.vercel.app/auth/callback?error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired&next=/reset-password'
    );
    const resCallback = await authCallbackGet(reqCallback);
    expect(resCallback.status).toBe(307);
    const locCallback = new URL(resCallback.headers.get('location')!);
    expect(locCallback.pathname).toBe('/reset-password');
    expect(locCallback.searchParams.get('error_code')).toBe('otp_expired');

    // 10B: Confirm route with recovery error redirects to /reset-password?error_code=otp_expired
    const reqConfirm = new NextRequest(
      'https://cybertube-mu.vercel.app/auth/confirm?error=access_denied&error_code=otp_expired&type=recovery&next=/reset-password'
    );
    const resConfirm = await authConfirmGet(reqConfirm);
    expect(resConfirm.status).toBe(307);
    const locConfirm = new URL(resConfirm.headers.get('location')!);
    expect(locConfirm.pathname).toBe('/reset-password');
    expect(locConfirm.searchParams.get('error_code')).toBe('otp_expired');
  });
});
