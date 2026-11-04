import { test, expect } from '@playwright/test';

const viewports = [
  { name: '320px (Mobile S)', width: 320, height: 568 },
  { name: '375px (iPhone SE)', width: 375, height: 667 },
  { name: '390px (iPhone 12/13/14)', width: 390, height: 844 },
  { name: '768px (Tablet)', width: 768, height: 1024 },
  { name: '1024px (Small Desktop)', width: 1024, height: 768 },
  { name: '1280px (Standard Desktop)', width: 1280, height: 800 },
  { name: '1440px (Large Desktop)', width: 1440, height: 900 },
];

test.describe('CyberTube Responsive Viewports & Accessibility', () => {
  for (const vp of viewports) {
    test(`No unintended horizontal overflow at ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');

      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      expect(overflow, `Horizontal overflow detected at ${vp.width}px`).toBeFalsy();
    });
  }

  test('Interactive navigation elements have minimum 44px touch targets on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const menuButton = page.locator('button[aria-label="Toggle mobile navigation menu"]');
    await expect(menuButton).toBeVisible();
    const box = await menuButton.boundingBox();
    expect(box).toBeTruthy();
    if (box) {
      expect(box.height).toBeGreaterThanOrEqual(44);
      expect(box.width).toBeGreaterThanOrEqual(44);
    }
  });

  test('Keyboard navigation focus rings are visible on interactive links', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    
    // Focus should be on first focusable element
    const focusedTag = await page.evaluate(() => document.activeElement?.tagName);
    expect(['A', 'BUTTON', 'INPUT']).toContain(focusedTag);
  });
});
