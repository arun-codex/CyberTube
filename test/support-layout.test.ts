import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const read = (path: string) => readFileSync(join(root, path), 'utf8');

const support = read('src/components/support/SupportCyberTubeButton.tsx');
const footer = read('src/components/Footer.tsx');
const home = read('app/page.tsx');
const header = read('src/components/Header.tsx');
const css = read('app/globals.css');

test('support is placed in the Home page and normal footer document flow', () => {
  assert.match(home, /<SupportCyberTubeButton variant="secondary"/);
  assert.match(footer, /id="support-cybertube"/);
  assert.match(footer, /<SupportCyberTubeButton/);
  assert.match(header, /Support ☕.*#support-cybertube/);
  assert.doesNotMatch(footer, /fixed bottom-|fixed right-|z-\[2147483/);
  assert.doesNotMatch(home, /chai-support.*bottom-right|ChaiSupport.*position=/);
});

test('legacy ChaiKit floating hosts are suppressed; inline hosts remain allowed', () => {
  assert.match(css, /chai-support\\[position="bottom-right"\\]/);
  assert.match(css, /chai-support\\[position="bottom-left"\\]/);
  assert.match(css, /display: none !important/);
  assert.doesNotMatch(css, /chai-support\\[position="inline"\\]\\s*\\{\\s*display:\\s*none/);
});

test('light and dark colors inherit CyberTube semantic theme tokens', () => {
  for (const token of [
    '--card-bg', '--surface-subtle', '--surface-elevated',
    '--text-primary', '--text-secondary', '--border', '--accent-cyan',
  ]) {
    assert.ok(support.includes('var(' + token + ')'), 'missing theme token ' + token);
  }
  assert.doesNotMatch(support, /prefers-color-scheme/);
  assert.doesNotMatch(support, /position="bottom-right"/);
});

test('payment preview never reveals a payee or enables payment handoff', () => {
  for (const amount of ['10', '25', '50', '100']) {
    assert.match(support, new RegExp('amount: ' + amount + '\\b'));
  }
  assert.match(support, /Preview only/);
  assert.match(support, /disabled\s*\n\s*type="button"/);
  assert.doesNotMatch(support, /upi:\/\/pay|upi:\/\/|payeeVpa|upiId:/);
  assert.doesNotMatch(support, /buildUpiUri\(|generateQrCode\(|window\.location\.href\s*=\s*['"]upi:/i);
});

test('support modal is labelled and keyboard-dismissible', () => {
  assert.match(support, /aria-modal="true"/);
  assert.match(support, /aria-labelledby=\{titleId\}/);
  assert.match(support, /event\.key === 'Escape'/);
  assert.match(support, /event\.key !== 'Tab'/);
  assert.match(support, /setOpen\(false\)/);
  assert.match(support, /focus-visible:outline-\[var\(--accent-cyan\)\]/);
});
