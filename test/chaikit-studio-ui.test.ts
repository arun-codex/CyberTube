import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path: string) => readFileSync(path, 'utf8');

test('Chai Studio retains the vetted ChaiKit payment implementation and consent gates', () => {
  const panel = read('src/components/support/ChaiKitPaymentPanel.tsx');
  const api = read('app/api/support/config/route.ts');
  assert.ok(panel.includes('loadChaiKitScript()'));
  assert.ok(panel.includes("fetch('/api/support/config'"));
  assert.ok(panel.includes("const EXPECTED_UPI_ID='aruninzone@ptaxis'"));
  assert.ok(panel.includes("const EXPECTED_PAYEE='Arun Kumar'"));
  assert.ok(panel.includes('livePaymentsEnabled:live'));
  assert.ok(panel.includes("demo-mode={config.livePaymentsEnabled?undefined:''}"));
  // The already-present CSS-3D hero replaces the clipped duplicate WebGL.
  // Keep the vetted vendor bundle (and its built-in 3D for standalone use).
  assert.ok(!panel.includes('enable-3d={config.enable3D?'));
  assert.ok(panel.includes('adaptChaiKitInline'));
  assert.ok(panel.includes('MutationObserver'));
  assert.ok(panel.includes('style[data-cybertube-compact]'));
  assert.ok(panel.includes("embedded.setAttribute('role', 'group')"));
  assert.ok(panel.includes('.chai-header { display: none !important; }'));
  assert.ok(panel.includes('.chai-inline-card {'));
  assert.ok(panel.includes('.chai-3d-stage { display: none !important; }'));
  assert.ok(panel.includes('default-tier="kadak"'));
  assert.ok(panel.includes('min-amount="10"'));
  assert.ok(panel.includes('max-amount="10000"'));
  assert.ok(api.includes("CYBERTUBE_SUPPORT_PAYEE_VERIFIED"));
  assert.ok(api.includes("CYBERTUBE_SUPPORT_LIVE_PAYMENTS_ENABLED"));
  assert.ok(!read('src/components/support/ChaiExperienceScene.tsx').includes('upi://'));
});

test('Animated scene supports pause and accessible reduced motion', () => {
  const scene = read('src/components/support/ChaiExperienceScene.tsx');
  const css = read('app/globals.css');
  assert.ok(scene.includes('data-testid="chai-3d-scene"'));
  assert.ok(scene.includes('aria-pressed={paused}'));
  assert.ok(scene.includes('setPaused(value => !value)'));
  assert.ok(scene.includes('chai-scene--paused'));
  assert.ok(css.includes('@media (prefers-reduced-motion: reduce)'));
  assert.ok(css.includes('.chai-scene--paused *'));
  assert.ok(css.includes('transform-style:preserve-3d'));
});

test('Modal keeps keyboard focus management and no floating launcher', () => {
  const button = read('src/components/support/SupportCyberTubeButton.tsx');
  assert.ok(button.includes('aria-modal="true"'));
  assert.ok(button.includes('aria-labelledby={titleId}'));
  assert.ok(button.includes('aria-describedby={descriptionId}'));
  assert.ok(button.includes("event.key === 'Escape'"));
  assert.ok(button.includes("event.key !== 'Tab'"));
  assert.ok(button.includes('getFocusable'));
  assert.ok(button.includes('trigger?.focus()'));
  assert.ok(button.includes('<ChaiKitPaymentPanel'));
  assert.ok(!button.includes('bottom-right'));
});

test('Design branch disables Vercel Git preview/production deployments', () => {
  const vercel = JSON.parse(read('vercel.json'));
  assert.equal(vercel.git.deploymentEnabled['feat/chaikit-cinematic-ui-no-deploy'], false);
});
