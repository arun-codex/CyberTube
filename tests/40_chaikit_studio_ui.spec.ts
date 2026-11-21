import { expect, test } from '@playwright/test';

const DEMO_CONFIG = {
  enabled: true,
  demoMode: true,
  livePaymentsEnabled: false,
  creatorName: 'CyberTube',
  paymentPayeeName: 'CyberTube (demo only)',
  upiId: 'demo@upi',
  description: 'Support free cybersecurity education. Buy us a chai!',
  buttonText: 'Support CyberTube ☕',
  paymentNote: 'Support CyberTube',
  theme: 'dark',
  position: 'inline',
  defaultTierId: 'kadak',
  allowCustomAmount: true,
  enable3D: true,
  tiers: [
    { id: 'cutting', name: 'Cutting Chai', amountPaise: 1000, icon: 'cutting' },
    { id: 'kadak', name: 'Kadak Chai', amountPaise: 2500, icon: 'kadak' },
    { id: 'tandoori', name: 'Tandoori Chai', amountPaise: 5000, icon: 'tandoori' },
    { id: 'premium', name: 'Premium Chai', amountPaise: 10000, icon: 'premium' },
  ],
};

test.beforeEach(async ({ page }) => {
  await page.route('**/api/support/config', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: { 'Cache-Control': 'no-store' },
      body: JSON.stringify(DEMO_CONFIG),
    });
  });
});

test('Chai Studio mounts genuine ChaiKit and never creates payable demo QR', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Support CyberTube ☕' }).first().click();
  const dialog = page.getByRole('dialog', { name: 'Buy us a chai ☕' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByTestId('chai-3d-scene')).toBeVisible();
  const widget = dialog.locator('chai-support');
  await expect(widget).toHaveAttribute('position', 'inline');
  await expect(widget).toHaveAttribute('enable-3d', '');
  await expect(widget).toHaveAttribute('upi-id', 'demo@upi');
  await expect(widget).toHaveAttribute('demo-mode', '');
  await expect(dialog.getByText(/Preview only — real UPI payments are disabled/)).toBeVisible();
  await expect(widget.locator('.chai-payment-amount')).toContainText('25');
  await expect(widget.locator('.chai-qr-frame')).toHaveCount(1);
  await expect(widget.locator('.chai-demo-qr-overlay')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Support CyberTube ☕' }).first()).toBeFocused();
});

test('Motion can be paused manually and OS reduced-motion disables scene animation', async ({ page }) => {
  await page.goto('/support');
  const scene = page.getByTestId('chai-3d-scene');
  await expect(scene).toBeVisible();
  const pause = scene.getByRole('button', { name: 'Pause decorative chai animations' });
  await pause.click();
  await expect(scene).toHaveClass(/chai-scene--paused/);
  await expect(scene.getByRole('button', { name: 'Resume decorative chai animations' })).toHaveAttribute('aria-pressed', 'true');
  await scene.getByRole('button', { name: 'Resume decorative chai animations' }).click();
  await expect(scene).not.toHaveClass(/chai-scene--paused/);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  const animation = await scene.locator('.chai-scene__cup-wrap').evaluate(el => getComputedStyle(el).animationName);
  expect(animation).toBe('none');
});

for (const width of [375, 768, 1440]) {
  test(`Support dialog stays within viewport width ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 760 });
    await page.goto('/');
    await page.getByRole('button', { name: 'Support CyberTube ☕' }).first().click();
    const dialog = page.getByTestId('chai-studio-dialog');
    await expect(dialog).toBeVisible();
    const bounds = await dialog.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.x).toBeGreaterThanOrEqual(-2);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width + 2);
    await page.keyboard.press('Escape');
  });
}

test('Dark theme still styles vendor and menu without changing config', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('theme', 'dark'));
  await page.goto('/support');
  const panel = page.getByTestId('chaikit-payment-panel');
  const widget = panel.locator('chai-support');
  await expect(widget).toHaveAttribute('theme', 'dark');
  await expect(widget).toHaveAttribute('upi-id', 'demo@upi');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Help Keep Cybersecurity Education Free');
});
