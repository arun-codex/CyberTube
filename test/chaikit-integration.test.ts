import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { defaultSupportConfig, CYBERTUBE_SUPPORT_TIERS, getSupportConfig } from '../src/lib/chaikit/config';
import { CHAIKIT_SCRIPT_SRC, isChaiKitLoaded } from '../src/lib/chaikit/loader';
import { searchCatalogPage } from '../src/lib/search';

test('ChaiKit vendor bundle exists and matches verified SHA-256 integrity hash', () => {
  const bundlePath = path.join(process.cwd(), 'public', 'vendor', 'chaikit', 'chaikit.iife.js');
  assert.ok(fs.existsSync(bundlePath), 'public/vendor/chaikit/chaikit.iife.js must exist');

  const content = fs.readFileSync(bundlePath);
  const hash = crypto.createHash('sha256').update(content).digest('hex').toUpperCase();

  // Verified SHA-256 from built artifact
  assert.equal(
    hash,
    '2B7AA0E95539D39F305976894DF1A1018E9A6DCA2BCBAA5381221F7CD0A761FA',
    'ChaiKit vendor bundle hash must match verified build'
  );
  assert.ok(content.length > 50000, 'Bundle must be non-empty and complete');
});

test('ChaiKit configuration enforces CyberTube branding, tiers, and safe defaults', () => {
  const config = getSupportConfig();

  // Branding & owner details
  assert.equal(config.creatorName, 'CyberTube');
  assert.equal(config.paymentPayeeName, '');
  assert.equal(config.upiId, '');
  assert.equal(config.buttonText, 'Support CyberTube ☕');
  assert.equal(config.paymentNote, 'Support CyberTube');

  // Theme & layout
  assert.equal(config.theme, 'dark');
  assert.equal(config.position, 'inline');
  assert.equal(config.enable3D, true);
  assert.equal(config.allowCustomAmount, true);

  // Default tier
  assert.equal(config.defaultTierId, 'kadak');
});

test('ChaiKit contribution tiers strictly follow the 4-tier model with exact integer paise', () => {
  assert.equal(CYBERTUBE_SUPPORT_TIERS.length, 4);

  const [cutting, kadak, tandoori, premium] = CYBERTUBE_SUPPORT_TIERS;

  // Cutting Chai — ₹10 (1000 paise)
  assert.equal(cutting.id, 'cutting');
  assert.equal(cutting.name, 'Cutting Chai');
  assert.equal(cutting.amountPaise, 1000);

  // Kadak Chai — ₹25 (2500 paise)
  assert.equal(kadak.id, 'kadak');
  assert.equal(kadak.name, 'Kadak Chai');
  assert.equal(kadak.amountPaise, 2500);

  // Tandoori Chai — ₹50 (5000 paise)
  assert.equal(tandoori.id, 'tandoori');
  assert.equal(tandoori.name, 'Tandoori Chai');
  assert.equal(tandoori.amountPaise, 5000);

  // Premium Chai — ₹100 (10000 paise)
  assert.equal(premium.id, 'premium');
  assert.equal(premium.name, 'Premium Chai');
  assert.equal(premium.amountPaise, 10000);

  // Integer verification
  for (const tier of CYBERTUBE_SUPPORT_TIERS) {
    assert.ok(Number.isInteger(tier.amountPaise), `${tier.id} amount must be an exact integer`);
    assert.ok(tier.amountPaise > 0, `${tier.id} amount must be positive`);
  }
});

test('Client-safe defaults stay non-payable; activation is server-gated', () => {
  const config = getSupportConfig();

  // Critical safety assertions:
  assert.equal(config.livePaymentsEnabled, false, 'livePaymentsEnabled must be false');
  assert.equal(config.demoMode, true, 'demoMode must be true by default');
});

test('ChaiKit loader references public vendor asset and is SSR-safe', () => {
  assert.equal(CHAIKIT_SCRIPT_SRC, '/vendor/chaikit/chaikit.iife.js');
  // Safe execution in Node environment without window
  assert.equal(isChaiKitLoaded(), false);
});

test('Global search indexes /support destination', () => {
  const supportSearch = searchCatalogPage('support', { pageSize: 20 });
  assert.ok(
    supportSearch.results.some((r) => r.url === '/support' && r.title.includes('Support CyberTube')),
    'Global search must find /support for "support"'
  );

  const chaiSearch = searchCatalogPage('chai', { pageSize: 20 });
  assert.ok(
    chaiSearch.results.some((r) => r.url === '/support'),
    'Global search must find /support for "chai"'
  );
});
