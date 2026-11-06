import { test, expect, Page } from '@playwright/test';
import { signTestUserPayload } from '../src/lib/testAuthGuard';

interface MockAuthUser {
  id: string;
  email: string;
  displayName: string;
  isOAuthOnly?: boolean;
}

const TEST_USER: MockAuthUser = {
  id: 'user-change-pwd-1234',
  email: 'analyst@cybertube.local',
  displayName: 'Analyst Security',
};

const OAUTH_USER: MockAuthUser = {
  id: 'user-oauth-github-5678',
  email: 'github.coder@cybertube.local',
  displayName: 'GitHub Practitioner',
  isOAuthOnly: true,
};

const PLAYWRIGHT_TEST_AUTH_SECRET = 'playwright-local-ephemeral-secret-9b2f8c7e1a3d';

async function setupAccountMocks(page: Page, targetUser: MockAuthUser = TEST_USER) {
  // Set test user cookie for Server Components & Middleware in test environment
  const mockUserPayload = {
    id: targetUser.id,
    aud: 'authenticated',
    role: 'authenticated',
    email: targetUser.email,
    email_confirmed_at: '2026-01-01T00:00:00Z',
    app_metadata: {
      provider: targetUser.isOAuthOnly ? 'github' : 'email',
      providers: targetUser.isOAuthOnly ? ['github'] : ['email'],
    },
    user_metadata: { display_name: targetUser.displayName },
    identities: [
      {
        id: 'ident-1',
        provider: targetUser.isOAuthOnly ? 'github' : 'email',
        identity_data: { user_name: targetUser.displayName },
      },
    ],
    updated_at: '2026-11-01T12:00:00Z',
  };

  await page.context().addCookies([
    {
      name: 'cybertube_test_user',
      value: await signTestUserPayload(mockUserPayload, PLAYWRIGHT_TEST_AUTH_SECRET),
      path: '/',
      domain: 'localhost',
    },
  ]);

  // 1. Intercept Token Sign-in
  await page.route(/\/auth\/v1\/token/, async (route) => {
    const postData = route.request().postDataJSON() || {};
    const password = postData.password || '';

    if (password === 'WrongInitialPassword!') {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'invalid_grant',
          error_description: 'Invalid login credentials',
          message: 'Invalid login credentials',
        }),
      });
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        access_token: `mock-token-${targetUser.id}`,
        token_type: 'bearer',
        expires_in: 3600,
        refresh_token: `mock-refresh-${targetUser.id}`,
        user: {
          id: targetUser.id,
          aud: 'authenticated',
          role: 'authenticated',
          email: targetUser.email,
          email_confirmed_at: '2026-01-01T00:00:00Z',
          app_metadata: {
            provider: targetUser.isOAuthOnly ? 'github' : 'email',
            providers: targetUser.isOAuthOnly ? ['github'] : ['email'],
          },
          user_metadata: { display_name: targetUser.displayName },
          identities: [
            {
              id: 'ident-1',
              provider: targetUser.isOAuthOnly ? 'github' : 'email',
              identity_data: { user_name: targetUser.displayName },
            },
          ],
          updated_at: '2026-11-01T12:00:00Z',
        },
      }),
    });
  });

  // 2. Intercept getUser
  await page.route(/\/auth\/v1\/user/, async (route) => {
    if (route.request().method() === 'PUT') {
      const postData = route.request().postDataJSON() || {};
      (page as any).__lastUpdatePayload = postData;

      if (postData.current_password === 'WrongCurrentPass!') {
        await route.fulfill({
          status: 400,
          contentType: 'application/json',
          body: JSON.stringify({
            message: 'Invalid current password',
          }),
        });
        return;
      }

      if (postData.nonce === 'WrongOtp123' || postData.nonce === '000000') {
        await route.fulfill({
          status: 400,
          contentType: 'application/json',
          body: JSON.stringify({
            message: 'Invalid or expired OTP',
          }),
        });
        return;
      }

      if (postData.password === 'SimulateServerError!') {
        await route.fulfill({
          status: 401,
          contentType: 'application/json',
          body: JSON.stringify({
            message: 'Session has expired',
          }),
        });
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: targetUser.id,
          aud: 'authenticated',
          role: 'authenticated',
          email: targetUser.email,
          updated_at: new Date().toISOString(),
        }),
      });
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id: targetUser.id,
        aud: 'authenticated',
        role: 'authenticated',
        email: targetUser.email,
        email_confirmed_at: '2026-01-01T00:00:00Z',
        app_metadata: {
          provider: targetUser.isOAuthOnly ? 'github' : 'email',
          providers: targetUser.isOAuthOnly ? ['github'] : ['email'],
        },
        user_metadata: { display_name: targetUser.displayName },
        identities: [
          {
            id: 'ident-1',
            provider: targetUser.isOAuthOnly ? 'github' : 'email',
            identity_data: { user_name: targetUser.displayName },
          },
        ],
        updated_at: '2026-11-01T12:00:00Z',
      }),
    });
  });

  // 3. Intercept Reauthenticate
  await page.route(/\/auth\/v1\/reauthenticate/, async (route) => {
    (page as any).__reauthenticateCalled = true;
    if ((page as any).__simulateExpiredReauth) {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({
          message: 'Auth session missing!',
        }),
      });
      return;
    }
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });

  // 4. Intercept Profiles
  await page.route(/\/rest\/v1\/profiles/, async (route) => {
    const isSingle = (route.request().headers()['accept'] || '').includes('vnd.pgrst.object+json');
    const profileData = {
      id: targetUser.id,
      display_name: targetUser.displayName,
      avatar_url: null,
      experience_level: 'practitioner',
    };
    await route.fulfill({
      status: 200,
      contentType: isSingle ? 'application/vnd.pgrst.object+json' : 'application/json',
      body: JSON.stringify(isSingle ? profileData : [profileData]),
    });
  });

  // 5. Intercept Avatar
  await page.route(/\/api\/user\/avatar/, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ avatarUrl: null }),
    });
  });

  // 6. Intercept Progress
  await page.route(/\/rest\/v1\/user_lesson_progress/, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          course_id: 'c1a2b3c4-0001-4000-a000-000000000001',
          lesson_id: 'e7b9e003-4000-4000-a000-000000000001',
          is_completed: true,
        },
      ]),
    });
  });

  await page.route(/\/rest\/v1\/user_lesson_video_progress/, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });
}

async function loginUser(page: Page, user: MockAuthUser = TEST_USER) {
  await page.goto('/login');
  await page.fill('input[name="email"]', user.email);
  await page.fill('input[name="password"]', 'CurrentPassword123!');
  await page.click('button[type="submit"]');
  await page.waitForURL((url) => url.pathname === '/', { timeout: 10000 });
}

test.describe('Phase 20.3 — Secure Change Password Settings Flow', () => {
  // ---------------------------------------------------------------------------
  // Test 1: Account Security section is visible for authenticated users
  // ---------------------------------------------------------------------------
  test('Test 1 — Account Security section is visible on /account for authenticated users', async ({ page }) => {
    await setupAccountMocks(page);
    await loginUser(page);

    await page.goto('/account');
    const securitySection = page.locator('[data-testid="account-security-section"]');
    await expect(securitySection).toBeVisible({ timeout: 10000 });
    await expect(securitySection).toContainText('Password & Security');
    await expect(securitySection).toContainText('Keep your account secure by regularly updating your password');
    await expect(securitySection).not.toContainText('Last password updated:');
    await expect(securitySection).toContainText('Account profile last updated:');
    await expect(page.locator('[data-testid="change-password-btn"]')).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Test 2: Change Password button opens the verification workflow
  // ---------------------------------------------------------------------------
  test('Test 2 — Change Password button opens the verification workflow modal', async ({ page }) => {
    await setupAccountMocks(page);
    await loginUser(page);

    await page.goto('/account');
    await page.click('[data-testid="change-password-btn"]');

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Verify Your Identity');
    await expect(page.locator('input#current-password')).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Test 3: Unauthenticated users cannot access the workflow
  // ---------------------------------------------------------------------------
  test('Test 3 — Unauthenticated users cannot access /account or the workflow', async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('/account');
    await expect(page).toHaveURL(/\/login/);
  });

  // ---------------------------------------------------------------------------
  // Test 4: Incorrect current password is rejected
  // ---------------------------------------------------------------------------
  test('Test 4 — Incorrect current password is rejected during verification', async ({ page }) => {
    await setupAccountMocks(page);
    await loginUser(page);

    await page.goto('/account');
    await page.click('[data-testid="change-password-btn"]');

    await page.fill('input#current-password', 'WrongInitialPassword!');
    await page.click('button:has-text("Verify & Continue")');

    const modal = page.locator('[role="dialog"]');
    const alert = modal.locator('div[role="alert"]');
    await expect(alert).toBeVisible();
    await expect(alert).toContainText('Your current password is incorrect. Please try again.');
  });

  // ---------------------------------------------------------------------------
  // Test 5: Successful verification allows the password update
  // ---------------------------------------------------------------------------
  test('Test 5 — Successful identity verification unlocks Stage 2 (Set Your New Password)', async ({ page }) => {
    await setupAccountMocks(page);
    await loginUser(page);

    await page.goto('/account');
    await page.click('[data-testid="change-password-btn"]');

    await page.fill('input#current-password', 'CurrentPassword123!');
    await page.click('button:has-text("Verify & Continue")');

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toContainText('Set Your New Password');
    await expect(page.locator('input#new-password')).toBeVisible();
    await expect(page.locator('input#confirm-new-password')).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Test 6: New password validation works with show/hide controls and strength meter
  // ---------------------------------------------------------------------------
  test('Test 6 — Password strength meter and show/hide controls function properly', async ({ page }) => {
    await setupAccountMocks(page);
    await loginUser(page);

    await page.goto('/account');
    await page.click('[data-testid="change-password-btn"]');
    await page.fill('input#current-password', 'CurrentPassword123!');
    await page.click('button:has-text("Verify & Continue")');

    const modal = page.locator('[role="dialog"]');
    const newPasswordInput = page.locator('input#new-password');
    await newPasswordInput.fill('CyberSec2026!');

    // Check strength indicator
    await expect(modal.getByText('Strong', { exact: true })).toBeVisible();

    // Check toggle
    await expect(newPasswordInput).toHaveAttribute('type', 'password');
    await page.locator('button[aria-label="Show new password"]').click();
    await expect(newPasswordInput).toHaveAttribute('type', 'text');
    await page.locator('button[aria-label="Hide new password"]').click();
    await expect(newPasswordInput).toHaveAttribute('type', 'password');
  });

  // ---------------------------------------------------------------------------
  // Test 7: Confirm-password mismatch is rejected
  // ---------------------------------------------------------------------------
  test('Test 7 — Mismatched confirmation password displays error without API call', async ({ page }) => {
    await setupAccountMocks(page);
    await loginUser(page);

    await page.goto('/account');
    await page.click('[data-testid="change-password-btn"]');
    await page.fill('input#current-password', 'CurrentPassword123!');
    await page.click('button:has-text("Verify & Continue")');

    await page.fill('input#new-password', 'NewSuperPass123!');
    await page.fill('input#confirm-new-password', 'DifferentPass456!');
    await page.click('button:has-text("Update Password")');

    const modal = page.locator('[role="dialog"]');
    const alert = modal.locator('div[role="alert"]');
    await expect(alert).toBeVisible();
    await expect(alert).toContainText('Your new passwords do not match');
  });

  // ---------------------------------------------------------------------------
  // Test 8: Weak passwords are rejected
  // ---------------------------------------------------------------------------
  test('Test 8 — Weak passwords under 8 characters are rejected', async ({ page }) => {
    await setupAccountMocks(page);
    await loginUser(page);

    await page.goto('/account');
    await page.click('[data-testid="change-password-btn"]');
    await page.fill('input#current-password', 'CurrentPassword123!');
    await page.click('button:has-text("Verify & Continue")');

    await page.fill('input#new-password', 'short');
    await page.fill('input#confirm-new-password', 'short');
    await page.click('button:has-text("Update Password")');

    const modal = page.locator('[role="dialog"]');
    const alert = modal.locator('div[role="alert"]');
    await expect(alert).toBeVisible();
    await expect(alert).toContainText('Choose a stronger password with at least 8 characters');
  });

  // ---------------------------------------------------------------------------
  // Test 9: Same-password changes are rejected
  // ---------------------------------------------------------------------------
  test('Test 9 — Submitting the same password as current password is rejected', async ({ page }) => {
    await setupAccountMocks(page);
    await loginUser(page);

    await page.goto('/account');
    await page.click('[data-testid="change-password-btn"]');
    await page.fill('input#current-password', 'CurrentPassword123!');
    await page.click('button:has-text("Verify & Continue")');

    await page.fill('input#new-password', 'CurrentPassword123!');
    await page.fill('input#confirm-new-password', 'CurrentPassword123!');
    await page.click('button:has-text("Update Password")');

    const modal = page.locator('[role="dialog"]');
    const alert = modal.locator('div[role="alert"]');
    await expect(alert).toBeVisible();
    await expect(alert).toContainText('Your new password must be different from your current password');
  });

  // ---------------------------------------------------------------------------
  // Test 10: Successful password change displays confirmation
  // ---------------------------------------------------------------------------
  test('Test 10 — Successful password change sends verified update and displays confirmation', async ({ page }) => {
    await setupAccountMocks(page);
    await loginUser(page);

    await page.goto('/account');
    await page.click('[data-testid="change-password-btn"]');
    await page.fill('input#current-password', 'CurrentPassword123!');
    await page.click('button:has-text("Verify & Continue")');

    await page.fill('input#new-password', 'BrandNewPass2026!');
    await page.fill('input#confirm-new-password', 'BrandNewPass2026!');
    await page.click('button:has-text("Update Password")');

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toContainText('Password Changed Successfully');
    await expect(modal).toContainText('Your CyberTube account password has been updated');

    await page.click('button:has-text("Done")');
    await expect(modal).not.toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Test 11: Supabase errors are handled gracefully
  // ---------------------------------------------------------------------------
  test('Test 11 — Upstream Supabase errors are caught and surfaced cleanly', async ({ page }) => {
    await setupAccountMocks(page);
    await loginUser(page);

    await page.goto('/account');
    await page.click('[data-testid="change-password-btn"]');
    await page.fill('input#current-password', 'CurrentPassword123!');
    await page.click('button:has-text("Verify & Continue")');

    await page.fill('input#new-password', 'SimulateServerError!');
    await page.fill('input#confirm-new-password', 'SimulateServerError!');
    await page.click('button:has-text("Update Password")');

    const modal = page.locator('[role="dialog"]');
    const alert = modal.locator('div[role="alert"]');
    await expect(alert).toBeVisible();
    await expect(alert).toContainText('Your session has expired. Sign in again to continue.');
  });

  // ---------------------------------------------------------------------------
  // Test 12: OAuth-only account reauthentication is supported
  // ---------------------------------------------------------------------------
  test('Test 12 — OAuth-only account verifies via email reauthentication challenge', async ({ page }) => {
    await setupAccountMocks(page, OAUTH_USER);
    await loginUser(page, OAUTH_USER);

    await page.goto('/account');
    await page.click('[data-testid="change-password-btn"]');

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toContainText('Verify through email');

    // Click send verification code
    await page.click('button:has-text("Send Verification Code")');
    await expect(page.locator('input#otp-code')).toBeVisible({ timeout: 5000 });

    await page.fill('input#otp-code', '654321');
    await page.click('button:has-text("Verify & Continue")');

    await expect(modal).toContainText('Set Your New Password');
  });

  // ---------------------------------------------------------------------------
  // Test 13: Password recovery route remains unaffected
  // ---------------------------------------------------------------------------
  test('Test 13 — Existing password recovery routes remain fully intact', async ({ page }) => {
    const resForgot = await page.goto('/forgot-password');
    expect(resForgot?.status()).toBe(200);
    await expect(page.getByRole('heading', { name: 'Forgot your password?' })).toBeVisible();

    const resReset = await page.goto('/reset-password');
    expect(resReset?.status()).toBe(200);
    await expect(page.locator('[data-testid="password-reset-unavailable"]')).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Test 14: Existing authentication session remains valid when appropriate
  // ---------------------------------------------------------------------------
  test('Test 14 — User remains logged in with valid session after password change', async ({ page }) => {
    await setupAccountMocks(page);
    await loginUser(page);

    await page.goto('/account');
    await page.click('[data-testid="change-password-btn"]');
    await page.fill('input#current-password', 'CurrentPassword123!');
    await page.click('button:has-text("Verify & Continue")');

    await page.fill('input#new-password', 'NextGenPassword999!');
    await page.fill('input#confirm-new-password', 'NextGenPassword999!');
    await page.click('button:has-text("Update Password")');
    await page.click('button:has-text("Done")');

    // User menu button in header remains present and authenticated
    const userMenuBtn = page.locator('button[aria-label="User profile options menu"]');
    await expect(userMenuBtn).toBeVisible();
    await expect(userMenuBtn).toContainText('Analyst Security');
  });

  // ---------------------------------------------------------------------------
  // Test 15: Another user's account cannot be modified
  // ---------------------------------------------------------------------------
  test('Test 15 — Password update request is strictly scoped to authenticated caller', async ({ page }) => {
    await setupAccountMocks(page);
    await loginUser(page);

    await page.goto('/account');
    await page.click('[data-testid="change-password-btn"]');
    await page.fill('input#current-password', 'CurrentPassword123!');
    await page.click('button:has-text("Verify & Continue")');

    await page.fill('input#new-password', 'SecuredAuth999!');
    await page.fill('input#confirm-new-password', 'SecuredAuth999!');
    await page.click('button:has-text("Update Password")');

    const lastPayload = (page as any).__lastUpdatePayload;
    // Payload must NOT contain an arbitrary user_id parameter; it operates strictly on context session
    expect(lastPayload).toBeDefined();
    expect(lastPayload.user_id).toBeUndefined();
    expect(lastPayload.id).toBeUndefined();
  });

  // ---------------------------------------------------------------------------
  // Test 16: Course and video progress remain intact
  // ---------------------------------------------------------------------------
  test('Test 16 — Course and lesson progress remain intact following password update', async ({ page }) => {
    await setupAccountMocks(page);
    await loginUser(page);

    // Verify progress is active on /courses
    await page.goto('/courses');
    const courseCard = page.locator('[data-testid^="course-card-"]').first();
    await expect(courseCard).toBeVisible();
    await expect(courseCard.locator('text=Progress')).toBeVisible();

    // Change password
    await page.goto('/account');
    await page.click('[data-testid="change-password-btn"]');
    await page.fill('input#current-password', 'CurrentPassword123!');
    await page.click('button:has-text("Verify & Continue")');
    await page.fill('input#new-password', 'PersistentProgress999!');
    await page.fill('input#confirm-new-password', 'PersistentProgress999!');
    await page.click('button:has-text("Update Password")');
    await page.click('button:has-text("Done")');

    // Return to /courses and confirm progress is intact
    await page.goto('/courses');
    await expect(courseCard).toBeVisible();
    await expect(courseCard.locator('text=Progress')).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Test 17: Security Guard — Forged unsigned or tampered test cookie is rejected
  // ---------------------------------------------------------------------------
  test('Test 17 — Forged unsigned or tampered test cookie is rejected on /account', async ({ page, context }) => {
    // Inject forged raw unsigned JSON cookie without HMAC signature
    await context.addCookies([
      {
        name: 'cybertube_test_user',
        value: JSON.stringify({
          id: 'forged-attacker-id',
          email: 'attacker@evil.com',
          role: 'authenticated',
        }),
        path: '/',
        domain: 'localhost',
      },
    ]);

    await page.goto('/account');
    await expect(page).toHaveURL(/\/login/);
  });

  // ---------------------------------------------------------------------------
  // Test 18: Security Guard — OAuth reauthentication with expired session
  // ---------------------------------------------------------------------------
  test('Test 18 — OAuth reauthentication with expired session displays session expired error', async ({ page }) => {
    await setupAccountMocks(page, OAUTH_USER);
    await loginUser(page, OAUTH_USER);

    // Flag reauthenticate to return 401 (expired session)
    (page as any).__simulateExpiredReauth = true;

    await page.goto('/account');
    await page.click('[data-testid="change-password-btn"]');

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toContainText('Verify through email');

    await page.click('button:has-text("Send Verification Code")');

    const alert = modal.locator('div[role="alert"]');
    await expect(alert).toBeVisible();
    await expect(alert).toContainText('Your session has expired. Sign in again to continue.');
  });

  // ---------------------------------------------------------------------------
  // Test 19: Security Guard — OAuth reauthentication with incorrect OTP nonce
  // ---------------------------------------------------------------------------
  test('Test 19 — OAuth reauthentication with incorrect OTP nonce displays verification error', async ({ page }) => {
    await setupAccountMocks(page, OAUTH_USER);
    await loginUser(page, OAUTH_USER);

    await page.goto('/account');
    await page.click('[data-testid="change-password-btn"]');

    const modal = page.locator('[role="dialog"]');
    await page.click('button:has-text("Send Verification Code")');
    await expect(page.locator('input#otp-code')).toBeVisible({ timeout: 5000 });

    // Enter invalid 6-digit OTP code to advance and verify API rejection
    await page.fill('input#otp-code', '000000');
    await page.click('button:has-text("Verify & Continue")');

    await page.fill('input#new-password', 'BrandNewSecurePass999!');
    await page.fill('input#confirm-new-password', 'BrandNewSecurePass999!');
    await page.click('button:has-text("Update Password")');

    const alert = modal.locator('div[role="alert"]');
    await expect(alert).toBeVisible();
    await expect(alert).toContainText('The verification code is incorrect or expired.');
  });
});

