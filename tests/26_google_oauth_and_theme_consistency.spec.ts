import { test, expect } from '@playwright/test';

test.describe('Google OAuth Branding Verification & Global Theme Consistency', () => {
  const routes = ['/courses', '/discover', '/domains', '/saved'] as const;

  test.describe('Part A — Google OAuth Branding & Legal Consistency', () => {
    test('1. Public access to legal pages and absence of placeholder addresses', async ({ page }) => {
      // Check /privacy
      const resPrivacy = await page.goto('/privacy');
      expect(resPrivacy?.status()).toBe(200);
      await expect(page.getByText('privacy@cybertube.org').first()).toBeVisible();
      // Ensure no .local email is exposed on the public page
      const contentPrivacy = await page.content();
      expect(contentPrivacy).not.toContain('support@cybertube.local');

      // Check /terms
      const resTerms = await page.goto('/terms');
      expect(resTerms?.status()).toBe(200);
      await expect(page.getByText('privacy@cybertube.org').first()).toBeVisible();
      const contentTerms = await page.content();
      expect(contentTerms).not.toContain('support@cybertube.local');
    });

    test('2. Homepage provides clear brand identification, description, and legal links', async ({ page }) => {
      const res = await page.goto('/');
      expect(res?.status()).toBe(200);

      // CyberTube identification
      await expect(page.locator('header').getByText('CyberTube')).toBeVisible();

      // Clear mission statement
      await expect(
        page.getByText(/Learn Cybersecurity the Right Way\. Free, Structured & Hands-On\./i)
      ).toBeVisible();

      // Footer legal links
      const footer = page.locator('footer');
      await expect(footer.locator('a[href="/privacy"]').first()).toBeVisible();
      await expect(footer.locator('a[href="/terms"]').first()).toBeVisible();
      await expect(footer.locator('a[href="/ethics"]').first()).toBeVisible();
    });

    test('3. Google Search Console meta tag logic: omits placeholder when unconfigured', async ({ page }) => {
      await page.goto('/');
      // In development / test without GOOGLE_SITE_VERIFICATION, no placeholder tag should exist
      const meta = page.locator('meta[name="google-site-verification"]');
      const count = await meta.count();
      if (count > 0) {
        const content = await meta.getAttribute('content');
        expect(content).not.toBe('PLACEHOLDER');
        expect(content).not.toBe('undefined');
        expect(content).not.toBe('');
      } else {
        expect(count).toBe(0);
      }
    });
  });

  test.describe('Part B & C — Theme Consistency & Typography Hierarchy', () => {
    for (const route of routes) {
      test(`4. Route ${route}: renders correctly in Light Mode`, async ({ page }) => {
        await page.addInitScript(() => {
          localStorage.setItem('theme', 'light');
        });
        await page.goto(route);
        await page.waitForLoadState('domcontentloaded');

        // Verify HTML element does not have dark class
        const hasDarkClass = await page.evaluate(() => document.documentElement.classList.contains('dark'));
        expect(hasDarkClass).toBe(false);

        // Heading validation
        const h1 = page.locator('h1').first();
        await expect(h1).toBeVisible();

        // Check that H1 uses font-rajdhani
        const fontFamily = await h1.evaluate((el) => window.getComputedStyle(el).fontFamily);
        expect(fontFamily.toLowerCase()).toMatch(/rajdhani|orbitron|rubik|system-ui/);

        // Check card background is light
        if (route === '/courses' || route === '/domains') {
          const firstCard = page.locator('.rounded-\\[8px\\]').nth(1);
          if (await firstCard.isVisible()) {
            const bg = await firstCard.evaluate((el) => window.getComputedStyle(el).backgroundColor);
            // In light mode, background should be white or light subtle
            expect(['rgb(255, 255, 255)', 'rgb(244, 244, 249)', 'rgb(248, 250, 252)']).toContain(bg);
          }
        }
      });

      test(`5. Route ${route}: renders correctly in Dark Mode with NO white cards`, async ({ page }) => {
        await page.addInitScript(() => {
          localStorage.setItem('theme', 'dark');
        });
        await page.goto(route);
        await page.waitForLoadState('domcontentloaded');

        // Verify HTML element has 'dark' class
        const hasDarkClass = await page.evaluate(() => document.documentElement.classList.contains('dark'));
        expect(hasDarkClass).toBe(true);

        // Verify H1 is visible and has high contrast light text
        const h1 = page.locator('h1').first();
        await expect(h1).toBeVisible();
        const h1Color = await h1.evaluate((el) => window.getComputedStyle(el).color);
        // #E6EDF3 is rgb(230, 237, 243)
        expect(['rgb(230, 237, 243)', 'rgb(240, 240, 248)', 'rgb(255, 255, 255)']).toContain(h1Color);

        // Verify cards do NOT have pure white background in dark mode
        const cards = page.locator('.group.rounded-\\[8px\\], .rounded-\\[8px\\].bg-white, .rounded-\\[8px\\].border');
        const count = await cards.count();

        for (let i = 0; i < Math.min(count, 4); i++) {
          const card = cards.nth(i);
          if (await card.isVisible()) {
            const bg = await card.evaluate((el) => window.getComputedStyle(el).backgroundColor);
            // Must NOT be white in dark mode
            expect(bg).not.toBe('rgb(255, 255, 255)');
          }
        }
      });
    }

    test('6. Theme toggle via UI button and persistence across navigation', async ({ page }) => {
      // 1. Start at /courses
      await page.goto('/courses');
      await page.waitForLoadState('domcontentloaded');

      // Ensure initial light state
      await page.evaluate(() => {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      });

      // 2. Click ThemeToggle button in Header
      const themeToggle = page.locator('header button[aria-label^="Toggle theme"]').first();
      await expect(themeToggle).toBeVisible();
      await themeToggle.click();

      // 3. Verify dark mode is activated on html
      await expect(page.locator('html')).toHaveClass(/dark/);

      // 4. Navigate to /discover and assert dark mode persisted
      await page.goto('/discover');
      await page.waitForLoadState('domcontentloaded');
      await expect(page.locator('html')).toHaveClass(/dark/);

      // 5. Navigate to /domains and assert dark mode persisted
      await page.goto('/domains');
      await page.waitForLoadState('domcontentloaded');
      await expect(page.locator('html')).toHaveClass(/dark/);

      // 6. Navigate to /saved and assert dark mode persisted
      await page.goto('/saved');
      await page.waitForLoadState('domcontentloaded');
      await expect(page.locator('html')).toHaveClass(/dark/);
    });

    test('7. Discover page mobile drawer in dark mode', async ({ page }) => {
      // Viewport set to mobile: 375px
      await page.setViewportSize({ width: 375, height: 667 });
      await page.addInitScript(() => {
        localStorage.setItem('theme', 'dark');
      });
      await page.goto('/discover');
      await page.waitForLoadState('domcontentloaded');

      const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
      expect(isDark).toBe(true);

      // Open mobile filter drawer
      const filterButton = page.locator('button:has-text("Filters")');
      await expect(filterButton).toBeVisible();
      await filterButton.click();

      // Drawer should be open
      const drawer = page.locator('.fixed.inset-0 .relative.w-full');
      await expect(drawer).toBeVisible();

      // Verify drawer background is dark in dark mode
      const drawerBg = await drawer.evaluate((el) => window.getComputedStyle(el).backgroundColor);
      // rgb(18, 26, 38) is #121A26
      expect(drawerBg).not.toBe('rgb(255, 255, 255)');

      // Close drawer
      const closeButton = page.locator('button:has-text("Apply & Close")');
      await closeButton.click();
      await expect(drawer).not.toBeVisible();
    });

    test('8. Responsive layout stability across Mobile, Tablet, and Desktop', async ({ page }) => {
      const viewports = [
        { name: 'Mobile', width: 375, height: 667 },
        { name: 'Tablet', width: 768, height: 1024 },
        { name: 'Desktop', width: 1440, height: 900 },
      ];

      for (const vp of viewports) {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        for (const route of routes) {
          await page.goto(route);
          await page.waitForLoadState('domcontentloaded');

          const h1 = page.locator('h1').first();
          await expect(h1).toBeVisible();

          // Ensure no horizontal scrollbar overflow
          const hasHorizontalOverflow = await page.evaluate(() => {
            return document.documentElement.scrollWidth > window.innerWidth + 2;
          });
          expect(hasHorizontalOverflow, `Horizontal overflow on ${route} at ${vp.name}`).toBe(false);
        }
      }
    });

    test('9. Search and Filter input accessibility and contrast', async ({ page }) => {
      await page.addInitScript(() => {
        localStorage.setItem('theme', 'dark');
      });
      await page.goto('/discover');
      await page.waitForLoadState('domcontentloaded');

      const searchInput = page.locator('input[type="search"]');
      await expect(searchInput).toBeVisible();

      // Has accessible placeholder
      const placeholder = await searchInput.getAttribute('placeholder');
      expect(placeholder).toBeTruthy();

      // Check text color in dark mode
      const inputColor = await searchInput.evaluate((el) => window.getComputedStyle(el).color);
      expect(['rgb(230, 237, 243)', 'rgb(240, 240, 248)', 'rgb(15, 23, 42)']).toContain(inputColor);

      // Sort select has accessible label
      const sortSelect = page.locator('select[aria-label="Sort resources"]');
      await expect(sortSelect).toBeVisible();
    });
  });
});
