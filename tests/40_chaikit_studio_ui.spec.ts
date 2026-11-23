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
  await expect(widget).not.toHaveAttribute('enable-3d');
  await expect(widget.locator('.chai-3d-stage')).toHaveCount(0);
  await expect(widget.locator('.chai-header')).toBeHidden();
  await expect(widget.locator('.chai-modal-inline')).toHaveAttribute('role', 'group');
  await expect(widget.locator('.chai-inline-card')).toHaveCSS('margin-top', '0px');
  await expect(widget.locator('.chai-inline-card')).toHaveCSS('border-top-width', '0px');
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

test('Inline ChaiKit shows one compact accessible menu instead of duplicate frames', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 760 });
  await page.goto('/support');
  const widget = page.getByTestId('chaikit-payment-panel').locator('chai-support');
  const tiers = widget.locator('.chai-tier-card');
  await expect(tiers).toHaveCount(4);
  await expect(widget.locator('.chai-header')).toBeHidden();
  await expect(widget.locator('.chai-3d-stage')).toHaveCount(0);
  await expect(widget.locator('.chai-modal-inline')).toHaveAttribute('role', 'group');

  const geometry = await widget.evaluate(element => {
    const root = element.shadowRoot!;
    const card = root.querySelector<HTMLElement>('.chai-inline-card')!;
    const body = root.querySelector<HTMLElement>('.chai-body')!;
    const firstTier = root.querySelector<HTMLElement>('.chai-tier-card')!;
    const hostBounds = element.getBoundingClientRect();
    return {
      hostWidth: hostBounds.width,
      cardWidth: card.getBoundingClientRect().width,
      margin: getComputedStyle(card).marginTop,
      border: getComputedStyle(card).borderTopWidth,
      bodyPadding: getComputedStyle(body).paddingTop,
      tierHeight: firstTier.getBoundingClientRect().height,
    };
  });

  expect(geometry.cardWidth).toBeLessThanOrEqual(geometry.hostWidth + 2);
  expect(geometry.margin).toBe('0px');
  expect(geometry.border).toBe('0px');
  expect(geometry.bodyPadding).toBe('0px');
  expect(geometry.tierHeight).toBeLessThan(150);
  const horizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(horizontalOverflow).toBeLessThanOrEqual(2);
});

test('Chai cup animates by default, has no motion toggle, and respects reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/support');
  const scene = page.getByTestId('chai-3d-scene');
  await expect(scene).toBeVisible();
  await expect(scene.getByRole('button')).toHaveCount(0);
  const cupAnimation = await scene.locator('.chai-scene__cup-wrap')
    .evaluate(el => getComputedStyle(el).animationName);
  expect(cupAnimation).toContain('chai-cup-float');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  const reducedAnimation = await scene.locator('.chai-scene__cup-wrap')
    .evaluate(el => getComputedStyle(el).animationName);
  expect(reducedAnimation).toBe('none');
});

for (const viewport of [{ width: 375, height: 667 }, { width: 1366, height: 650 }]) {
  test(`Support modal scrolls to bottom at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/');
    await page.getByRole('button', { name: 'Support CyberTube ☕' }).first().click();
    const dialog = page.getByTestId('chai-studio-dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('button', { name: 'Close support dialog' })).toBeVisible();
    const metrics = await dialog.evaluate(el => ({
      content: el.scrollHeight,
      viewport: el.clientHeight,
      cssOverflow: getComputedStyle(el).overflowY,
      maxHeight: getComputedStyle(el).maxHeight,
    }));
    expect(metrics.content).toBeGreaterThan(metrics.viewport + 100);
    expect(metrics.cssOverflow).toBe('auto');
    expect(parseFloat(metrics.maxHeight)).toBeLessThan(viewport.height);

    // Simulate the actual user action; don't mistake a clipped, non-scrollable
    // document for a successful programmatic scroll.
    await dialog.hover();
    await page.mouse.wheel(0, 1600);
    await expect.poll(() => dialog.evaluate(el => el.scrollTop)).toBeGreaterThan(100);
    await expect(dialog.locator('.chai-dialog__footer')).toBeInViewport();

    // The visible close button remains usable after scrolling back to the top.
    await dialog.evaluate(el => { el.scrollTop = 0; });
    await dialog.getByRole('button', { name: 'Close support dialog' }).click();
    await expect(dialog).not.toBeVisible();
  });
}

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
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Support CyberTube|Help Keep Cybersecurity Education Free/);
});
