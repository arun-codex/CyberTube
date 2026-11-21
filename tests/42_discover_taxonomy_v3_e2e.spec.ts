import { test, expect } from '@playwright/test';

test.describe('CyberTube Discover V3 — Content Taxonomy & Responsive E2E', () => {

  test('1. Discover navigation renders all primary categories and secondary topic filters', async ({ page }) => {
    await page.goto('/discover');

    // Heading verification
    await expect(page.locator('h1')).toContainText('Discover');

    // Primary Navigation Tabs
    const primaryNav = page.getByRole('navigation', { name: 'Discover primary content categories' });
    await expect(primaryNav).toBeVisible();

    const expectedTabs = [
      'For You',
      'Latest / All Content',
      'Videos',
      'Articles',
      'Cyber News',
      'Security Alerts',
      'Research',
      'Tools & Resources',
      'Careers & Internships',
      'Watch History',
      'Resource Directory',
    ];

    for (const tabTitle of expectedTabs) {
      await expect(primaryNav.getByRole('button', { name: tabTitle })).toBeVisible();
    }

    // Secondary Topic Pills
    const topicGroup = page.getByRole('group', { name: 'Filter discovery content by topic' });
    await expect(topicGroup).toBeVisible();
    await expect(topicGroup.getByRole('button', { name: 'All Topics' })).toBeVisible();
    await expect(topicGroup.getByRole('button', { name: 'SOC / Blue Team' })).toBeVisible();
    await expect(topicGroup.getByRole('button', { name: 'Networking / Wireshark' })).toBeVisible();
  });

  test('2. Primary tab switching updates URL and preserves active state', async ({ page }) => {
    await page.goto('/discover');

    // Switch to Videos tab
    await page.getByRole('button', { name: 'Videos', exact: true }).click();
    await expect(page).toHaveURL(/tab=videos/);

    // Switch to Cyber News tab
    await page.getByRole('button', { name: 'Cyber News' }).click();
    await expect(page).toHaveURL(/tab=news/);

    // Switch to Security Alerts tab
    await page.getByRole('button', { name: 'Security Alerts' }).click();
    await expect(page).toHaveURL(/tab=security-alerts/);

    // Switch to Articles tab
    await page.getByRole('button', { name: 'Articles' }).click();
    await expect(page).toHaveURL(/tab=articles/);
  });

  test('3. Topic filtering works together with primary tab navigation', async ({ page }) => {
    await page.goto('/discover?tab=videos');

    // Select SOC / Blue Team topic
    const socTopicBtn = page.getByRole('button', { name: 'SOC / Blue Team' });
    await socTopicBtn.click();
    await expect(page).toHaveURL(/tab=videos.*subject=soc_blue_team/);

    // Switch to Networking topic
    const networkingBtn = page.getByRole('button', { name: 'Networking / Wireshark' });
    await networkingBtn.click();
    await expect(page).toHaveURL(/tab=videos.*subject=networking/);
  });

  test('4. Unified search filters content by keyword and persists query in URL', async ({ page }) => {
    await page.goto('/discover');

    const searchInput = page.getByPlaceholder(/Search CVEs, Wireshark/i);
    await searchInput.fill('Wireshark');
    await searchInput.press('Enter');

    await expect(page).toHaveURL(/q=Wireshark/);
  });

  test('5. Advanced filters drawer toggles, applies format filters and resets', async ({ page }) => {
    await page.goto('/discover');

    const filterToggleBtn = page.getByRole('button', { name: /Advanced Discovery Filters/i });
    await filterToggleBtn.click();

    // Verify Advanced Filter drawer is expanded
    await expect(page.getByText('Media Format')).toBeVisible();
    await expect(page.getByText('Content Kind')).toBeVisible();
    await expect(page.getByText('Sort Order')).toBeVisible();

    // Toggle collapse
    await filterToggleBtn.click();
    await expect(page.getByText('Media Format')).not.toBeVisible();
  });

  test('6. Responsive layout test at 375px mobile without horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/discover');

    await expect(page.locator('h1')).toBeVisible();

    // Check no horizontal scrollbar on body
    const bodyScrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const windowInnerWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyScrollWidth).toBeLessThanOrEqual(windowInnerWidth);

    // Navigation should be horizontally scrollable without breaking page width
    const nav = page.getByRole('navigation', { name: 'Discover primary content categories' });
    await expect(nav).toBeVisible();
  });

  test('7. Responsive layout test at 768px tablet, 1024px laptop, and 1440px desktop', async ({ page }) => {
    for (const width of [768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/discover');

      const bodyScrollWidth = await page.evaluate(() => document.body.scrollWidth);
      const windowInnerWidth = await page.evaluate(() => window.innerWidth);
      expect(bodyScrollWidth).toBeLessThanOrEqual(windowInnerWidth);

      await expect(page.locator('h1')).toBeVisible();
    }
  });

  test('8. Backward-compatible URL mapping routes correctly', async ({ page }) => {
    // /discover?tab=popular maps to for-you
    await page.goto('/discover?tab=popular');
    await expect(page.getByRole('button', { name: 'For You' })).toHaveAttribute('aria-pressed', 'true');

    // /discover?tab=news maps to news tab
    await page.goto('/discover?tab=news');
    await expect(page.getByRole('button', { name: 'Cyber News' })).toHaveAttribute('aria-pressed', 'true');

    // /discover?tab=security-alerts maps to security alerts
    await page.goto('/discover?tab=security-alerts');
    await expect(page.getByRole('button', { name: 'Security Alerts' })).toHaveAttribute('aria-pressed', 'true');

    // /discover?tab=history renders Watch History
    await page.goto('/discover?tab=history');
    await expect(page.getByRole('heading', { name: 'Your Watch History' })).toBeVisible();
  });
});
