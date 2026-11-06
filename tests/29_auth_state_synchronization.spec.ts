import { test, expect, Page } from '@playwright/test';

interface MockUserConfig {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string | null;
  completedLessons?: Array<{ course_id: string; lesson_id: string; is_completed: boolean }>;
}

const USER_ALPHA: MockUserConfig = {
  id: '11111111-aaaa-4000-a000-000000000001',
  email: 'analyst.alpha@cybertube.local',
  displayName: 'Analyst Alpha',
  avatarUrl: null,
  completedLessons: [
    {
      course_id: 'e7b9e001-4000-4000-a000-000000000001',
      lesson_id: 'e7b9e003-4000-4000-a000-000000000001',
      is_completed: true,
    },
    {
      course_id: 'e7b9e001-4000-4000-a000-000000000001',
      lesson_id: 'e7b9e003-4000-4000-a000-000000000002',
      is_completed: true,
    },
  ],
};

const USER_BETA: MockUserConfig = {
  id: '22222222-bbbb-4000-b000-000000000002',
  email: 'investigator.beta@cybertube.local',
  displayName: 'Investigator Beta',
  avatarUrl: null,
  completedLessons: [
    {
      course_id: 'e7b9e001-4000-4000-a000-000000000001',
      lesson_id: 'e7b9e003-4000-4000-a000-000000000003',
      is_completed: true,
    },
  ],
};

/**
 * Intercepts Supabase GoTrue auth endpoints and REST tables
 * to allow deterministic and reproducible browser testing.
 */
async function setupSupabaseMocks(page: Page, initialUser: MockUserConfig | null = null) {
  let currentUser: MockUserConfig | null = initialUser;

  // Intercept GoTrue token / password sign-in
  await page.route(/\/auth\/v1\/token/, async (route) => {
    const postData = route.request().postDataJSON() || {};
    const email = postData.email || '';

    // Route to user Alpha or Beta
    if (email.includes('beta')) {
      currentUser = USER_BETA;
    } else {
      currentUser = USER_ALPHA;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        access_token: `mock-token-${currentUser.id}`,
        token_type: 'bearer',
        expires_in: 3600,
        refresh_token: `mock-refresh-${currentUser.id}`,
        user: {
          id: currentUser.id,
          aud: 'authenticated',
          role: 'authenticated',
          email: currentUser.email,
          email_confirmed_at: '2026-01-01T00:00:00Z',
          phone: '',
          app_metadata: { provider: 'email', providers: ['email'] },
          user_metadata: { display_name: currentUser.displayName },
          identities: [],
          created_at: '2026-01-01T00:00:00Z',
          updated_at: '2026-01-01T00:00:00Z',
        },
      }),
    });
  });

  // Intercept GoTrue getUser()
  await page.route(/\/auth\/v1\/user/, async (route) => {
    if (currentUser) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: currentUser.id,
          aud: 'authenticated',
          role: 'authenticated',
          email: currentUser.email,
          email_confirmed_at: '2026-01-01T00:00:00Z',
          app_metadata: { provider: 'email', providers: ['email'] },
          user_metadata: { display_name: currentUser.displayName },
        }),
      });
    } else {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'No session' }),
      });
    }
  });

  // Intercept GoTrue logout
  await page.route(/\/auth\/v1\/logout/, async (route) => {
    currentUser = null;
    await route.fulfill({
      status: 204,
      contentType: 'application/json',
      body: '',
    });
  });

  // Intercept profiles REST query
  await page.route(/\/rest\/v1\/profiles/, async (route) => {
    if (currentUser) {
      const acceptHeader = route.request().headers()['accept'] || '';
      const isSingle = acceptHeader.includes('vnd.pgrst.object+json');
      const payload = {
        id: currentUser.id,
        display_name: currentUser.displayName,
        avatar_url: currentUser.avatarUrl || null,
      };

      await route.fulfill({
        status: 200,
        contentType: isSingle ? 'application/vnd.pgrst.object+json' : 'application/json',
        body: JSON.stringify(isSingle ? payload : [payload]),
      });
    } else {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
    }
  });

  // Intercept /api/user/avatar
  await page.route(/\/api\/user\/avatar/, async (route) => {
    if (currentUser) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          hasCustomAvatar: false,
          avatarUrl: currentUser.avatarUrl || null,
        }),
      });
    } else {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Unauthorized' }),
      });
    }
  });

  // Intercept user lesson progress
  await page.route(/\/rest\/v1\/user_lesson_progress/, async (route) => {
    if (currentUser?.completedLessons) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(currentUser.completedLessons),
      });
    } else {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
    }
  });

  // Intercept user video progress
  await page.route(/\/rest\/v1\/user_lesson_video_progress/, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  return {
    setCurrentUser: (u: MockUserConfig | null) => {
      currentUser = u;
    },
    getCurrentUser: () => currentUser,
  };
}

test.describe('Phase 20.1 — Authentication State Synchronization & Session Hydration', () => {
  test.beforeEach(async ({ page }) => {
    // Clear cookies and local storage before each test
    await page.context().clearCookies();
  });

  // ---------------------------------------------------------------------------
  // Test 1: Immediate Login Update (No Reload Required)
  // ---------------------------------------------------------------------------
  test('Test 1 — Immediate login update: header updates immediately without page refresh', async ({
    page,
  }) => {
    await setupSupabaseMocks(page);

    // Spy on window.location.reload to ensure application does NOT invoke it
    await page.addInitScript(() => {
      (window as any).__reloadCallCount = 0;
      const originalReload = window.location.reload;
      window.location.reload = function () {
        (window as any).__reloadCallCount = ((window as any).__reloadCallCount || 0) + 1;
        return originalReload.apply(this);
      };
    });

    await page.goto('/login');

    // Confirm initial guest state in header
    const signInHeaderBtn = page.locator('header a[href="/login"]');
    await expect(signInHeaderBtn).toBeVisible();

    // Fill credentials
    await page.fill('input[name="email"]', USER_ALPHA.email);
    await page.fill('input[name="password"]', 'CorrectHorseBatteryStaple123!');

    // Submit form
    await page.click('button[type="submit"]');

    // Expect navigation to homepage
    await page.waitForURL((url) => url.pathname === '/', { timeout: 10000 });

    // Assert Header immediately displays the user dropdown menu without reload
    const userMenuBtn = page.locator('button[aria-label="User profile options menu"]');
    await expect(userMenuBtn).toBeVisible({ timeout: 5000 });
    await expect(userMenuBtn).toContainText('Analyst Alpha');

    // Verify window.location.reload was never invoked
    const reloadCalls = await page.evaluate(() => (window as any).__reloadCallCount || 0);
    expect(reloadCalls).toBe(0);
  });

  // ---------------------------------------------------------------------------
  // Test 2: Progress Hydration on Login
  // ---------------------------------------------------------------------------
  test('Test 2 — Progress hydration: AuthProvider provides userId and hydrates course progress', async ({
    page,
  }) => {
    await setupSupabaseMocks(page);
    await page.goto('/login');

    await page.fill('input[name="email"]', USER_ALPHA.email);
    await page.fill('input[name="password"]', 'SecretPassword123!');
    await page.click('button[type="submit"]');

    await page.waitForURL((url) => url.pathname === '/', { timeout: 10000 });

    // Navigate to /courses to verify hydrated card progress
    await page.goto('/courses');

    // Course progress area for networking course should reflect hydrated progress (completedLessons > 0)
    const networkingSlug = 'networking-for-hackers-2027';
    const networkingArea = page.locator(`[data-testid="course-progress-area-${networkingSlug}"]`);
    await expect(networkingArea).toBeVisible({ timeout: 10000 });

    const networkingBtn = page.locator(`[data-testid="course-action-btn-${networkingSlug}"]`);
    await expect(networkingBtn).toBeVisible({ timeout: 10000 });
    await expect(networkingBtn).toContainText(/Resume|Review/);
  });

  // ---------------------------------------------------------------------------
  // Test 3: Navigation Persistence
  // ---------------------------------------------------------------------------
  test('Test 3 — Navigation persistence: user remains authenticated across client navigations', async ({
    page,
  }) => {
    await setupSupabaseMocks(page);
    await page.goto('/login');

    await page.fill('input[name="email"]', USER_ALPHA.email);
    await page.fill('input[name="password"]', 'SecretPassword123!');
    await page.click('button[type="submit"]');

    await page.waitForURL((url) => url.pathname === '/', { timeout: 10000 });

    const userMenuBtn = page.locator('button[aria-label="User profile options menu"]');
    await expect(userMenuBtn).toBeVisible();

    // Navigate to /courses
    await page.click('header a[href="/courses"]');
    await page.waitForURL((url) => url.pathname === '/courses');
    await expect(userMenuBtn).toBeVisible();

    // Navigate to /learning-paths
    await page.click('header a[href="/learning-paths"]');
    await page.waitForURL((url) => url.pathname === '/learning-paths');
    await expect(userMenuBtn).toBeVisible();

    // Return home via brand logo
    await page.click('header a[href="/"]');
    await page.waitForURL((url) => url.pathname === '/');
    await expect(userMenuBtn).toBeVisible();
    await expect(userMenuBtn).toContainText('Analyst Alpha');
  });

  // ---------------------------------------------------------------------------
  // Test 4: Refresh Persistence
  // ---------------------------------------------------------------------------
  test('Test 4 — Refresh persistence: user session survives page reload', async ({ page }) => {
    await setupSupabaseMocks(page);
    await page.goto('/login');

    await page.fill('input[name="email"]', USER_ALPHA.email);
    await page.fill('input[name="password"]', 'Password123!');
    await page.click('button[type="submit"]');

    await page.waitForURL((url) => url.pathname === '/', { timeout: 10000 });

    const userMenuBtn = page.locator('button[aria-label="User profile options menu"]');
    await expect(userMenuBtn).toBeVisible({ timeout: 5000 });
    await expect(userMenuBtn).toContainText('Analyst Alpha');

    // Reload page
    await page.reload();

    // User must remain authenticated after reload
    await expect(userMenuBtn).toBeVisible({ timeout: 5000 });
    await expect(userMenuBtn).toContainText('Analyst Alpha');
  });

  // ---------------------------------------------------------------------------
  // Test 5: Logout State Clearing
  // ---------------------------------------------------------------------------
  test('Test 5 — Logout: clicking Sign Out immediately switches to guest header without reload', async ({
    page,
  }) => {
    await setupSupabaseMocks(page);
    await page.goto('/login');

    await page.fill('input[name="email"]', USER_ALPHA.email);
    await page.fill('input[name="password"]', 'Password123!');
    await page.click('button[type="submit"]');

    await page.waitForURL((url) => url.pathname === '/', { timeout: 10000 });

    const userMenuBtn = page.locator('button[aria-label="User profile options menu"]');
    await expect(userMenuBtn).toBeVisible();

    // Open dropdown
    await userMenuBtn.click();

    // Click Sign Out
    const signOutBtn = page.locator('button:has-text("Sign Out")');
    await expect(signOutBtn).toBeVisible();
    await signOutBtn.click();

    // Immediately after sign out, header displays Sign In link
    const signInHeaderBtn = page.locator('header a[href="/login"]');
    await expect(signInHeaderBtn).toBeVisible({ timeout: 5000 });
    await expect(userMenuBtn).not.toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Test 6: Account Isolation Between Users
  // ---------------------------------------------------------------------------
  test('Test 6 — Account isolation: User A state does not leak to User B', async ({ page }) => {
    await setupSupabaseMocks(page);

    // Sign in as User A
    await page.goto('/login');
    await page.fill('input[name="email"]', USER_ALPHA.email);
    await page.fill('input[name="password"]', 'PasswordA123!');
    await page.click('button[type="submit"]');

    await page.waitForURL((url) => url.pathname === '/', { timeout: 10000 });
    const userMenuBtn = page.locator('button[aria-label="User profile options menu"]');
    await expect(userMenuBtn).toContainText('Analyst Alpha');

    // Sign out User A
    await userMenuBtn.click();
    await page.locator('button:has-text("Sign Out")').click();
    await expect(page.locator('header a[href="/login"]')).toBeVisible();

    // Sign in as User B
    await page.goto('/login');
    await page.fill('input[name="email"]', USER_BETA.email);
    await page.fill('input[name="password"]', 'PasswordB123!');
    await page.click('button[type="submit"]');

    await page.waitForURL((url) => url.pathname === '/', { timeout: 10000 });

    // Assert User B's identity is displayed, never User A's
    await expect(userMenuBtn).toBeVisible();
    await expect(userMenuBtn).toContainText('Investigator Beta');
    const headerText = await page.locator('header').textContent();
    expect(headerText).not.toContain('Analyst Alpha');
  });

  // ---------------------------------------------------------------------------
  // Test 7: Google OAuth Regression
  // ---------------------------------------------------------------------------
  test('Test 7 — Google OAuth regression: OAuth button initiates callback flow safely', async ({
    page,
  }) => {
    await page.goto('/login');

    const googleBtn = page.locator('button[aria-label="Continue with Google"]');
    await expect(googleBtn).toBeVisible();
    expect(await googleBtn.getAttribute('aria-label')).toBe('Continue with Google');

    // Test error_description handling from OAuth callback route
    await page.goto('/auth/callback?error_description=User+cancelled+Google+authorization');
    await expect(page).toHaveURL(/\/login/);
    await expect(page.locator('body')).toContainText(/User cancelled Google authorization/i);
  });

  // ---------------------------------------------------------------------------
  // Test 8: GitHub OAuth Regression & Identity Conflict Guard
  // ---------------------------------------------------------------------------
  test('Test 8 — GitHub OAuth regression: safely routes and recovers identity conflict', async ({
    page,
  }) => {
    await page.goto('/login');

    const githubBtn = page.locator('button[aria-label="Continue with GitHub"]');
    await expect(githubBtn).toBeVisible();

    // Identity link conflict handling
    await page.goto(
      '/auth/callback?error_description=multiple+accounts+with+the+same+email+address+in+the+same+linking+domain'
    );
    await expect(page).toHaveURL(/\/login\?reason=identity_link_conflict/);
    await expect(page.locator('body')).toContainText(/Connected sign-in accounts/i);
  });

  // ---------------------------------------------------------------------------
  // Test 9: No Manual Refresh Workaround
  // ---------------------------------------------------------------------------
  test('Test 9 — No manual refresh workaround: login completes without reloading or delayed polling', async ({
    page,
  }) => {
    await setupSupabaseMocks(page);

    let reloadsTriggered = 0;
    await page.exposeFunction('onBrowserReloadAttempt', () => {
      reloadsTriggered++;
    });

    await page.addInitScript(() => {
      const orig = window.location.reload;
      window.location.reload = function () {
        (window as any).onBrowserReloadAttempt();
        return orig.apply(this);
      };
    });

    await page.goto('/login');
    await page.fill('input[name="email"]', USER_ALPHA.email);
    await page.fill('input[name="password"]', 'Password123!');

    const startTime = Date.now();
    await page.click('button[type="submit"]');

    // Wait for the authenticated header to appear
    const userMenuBtn = page.locator('button[aria-label="User profile options menu"]');
    await expect(userMenuBtn).toBeVisible({ timeout: 6000 });

    const elapsed = Date.now() - startTime;

    // Must resolve quickly (well under arbitrary polling loops)
    expect(elapsed).toBeLessThan(5000);

    // Must NOT have called reload
    expect(reloadsTriggered).toBe(0);
  });
});

