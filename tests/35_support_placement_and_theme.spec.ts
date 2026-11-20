import { expect, test } from '@playwright/test';

test.describe('Inline Chai support preview', () => {
  test('is in Home actions and footer, not a floating payment widget', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer #support-cybertube');
    await expect(footer.getByRole('button', { name: 'Support CyberTube ☕' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Support CyberTube ☕' })).toHaveCount(2);
    await expect(page.locator('chai-support')).toHaveCount(0);
    await expect(page.locator('header a[href="/#support-cybertube"]')).toBeVisible();

    await page.getByRole('button', { name: 'Support CyberTube ☕' }).first().click();
    const modal = page.getByRole('dialog', { name: 'Buy us a chai ☕' });
    await expect(modal).toBeVisible();
    await expect(modal.getByText('Preview only — real UPI payments are disabled')).toBeVisible();
    await expect(modal.getByRole('button', { name: 'UPI support is not activated' })).toBeDisabled();
    await modal.getByRole('button', { name: /Premium Chai/ }).click();
    await expect(modal.getByText('Selected preview amount').locator('..').getByText('₹100')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
  });

  for (const mode of ['light','dark'] as const) {
    test('matches CyberTube ' + mode + ' theme', async ({ page }) => {
      await page.addInitScript((selected) => {
        window.localStorage.setItem('theme', selected);
      }, mode);
      await page.goto('/');
      await page.getByRole('button', { name: 'Support CyberTube ☕' }).first().click();
      const dialog = page.getByRole('dialog', { name: 'Buy us a chai ☕' });
      await expect(dialog).toBeVisible();
      const colors = await dialog.evaluate((element) => {
        const style = getComputedStyle(element);
        const tokens = getComputedStyle(document.documentElement);
        return {
          modal: style.backgroundColor,
          expected: tokens.getPropertyValue('--card-bg').trim(),
          dark: document.documentElement.classList.contains('dark'),
        };
      });
      expect(colors.dark).toBe(mode === 'dark');
      expect(colors.expected.length).toBeGreaterThan(0);
      expect(colors.modal).not.toBe('rgba(0, 0, 0, 0)');
      await page.keyboard.press('Escape');
    });
  }

  test('footer support is in normal flow on other pages', async ({ page }) => {
    await page.goto('/library');
    const support = page.locator('footer #support-cybertube');
    await expect(support).toBeVisible();
    expect(await support.evaluate(element => getComputedStyle(element).position)).not.toBe('fixed');
  });
});
