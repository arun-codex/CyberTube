import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Phase 4.4 - Automated Accessibility Audit (Axe-Core)', () => {
  const routesToAudit = [
    { name: 'Home Page', path: '/' },
    { name: 'Courses Index', path: '/courses' },
    { name: 'Course Detail', path: '/courses/network-packet-analysis-masterclass' },
    { name: 'Discover Page', path: '/discover' },
    { name: 'Resource Detail', path: '/resources/portswigger-sql-injection-lab' },
    { name: 'Login Page', path: '/login' },
  ];

  for (const route of routesToAudit) {
    test(`Axe-core scan on ${route.name} (${route.path}) passes with no critical or serious violations`, async ({ page }) => {
      await page.goto(route.path);
      await page.waitForLoadState('networkidle');

      const builder = new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
        .exclude('iframe'); // Exclude 3rd-party YouTube player internal DOM

      const accessibilityScanResults = await builder.analyze();

      // Filter critical and serious violations
      const severeViolations = accessibilityScanResults.violations.filter(
        v => v.impact === 'critical' || v.impact === 'serious'
      );

      if (severeViolations.length > 0) {
        console.error(`A11y Violations on ${route.path}:`, JSON.stringify(severeViolations, null, 2));
      }

      expect(severeViolations).toEqual([]);
    });
  }

  test('Account page (unauthenticated redirect or landing) has no critical/serious violations', async ({ page }) => {
    await page.goto('/account');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .exclude('iframe')
      .analyze();

    const severeViolations = accessibilityScanResults.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious'
    );

    expect(severeViolations).toEqual([]);
  });
});
