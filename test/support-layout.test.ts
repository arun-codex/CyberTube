import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const read=(file:string)=>readFileSync(join(process.cwd(),file),'utf8');
const support=read('src/components/support/SupportCyberTubeButton.tsx');
const panel=read('src/components/support/ChaiKitPaymentPanel.tsx');
const footer=read('src/components/Footer.tsx');
const home=read('app/page.tsx');
const header=read('src/components/Header.tsx');
const css=read('app/globals.css');

test('support remains in the Home page and footer, not a floating launcher',()=>{
  assert.match(home,/<SupportCyberTubeButton variant="secondary"/);
  assert.match(footer,/id="support-cybertube"/);
  assert.match(footer,/<SupportCyberTubeButton/);
  assert.match(header,/Support ☕.*#support-cybertube/);
  assert.doesNotMatch(home,/ChaiSupport.*bottom-right|chai-support.*bottom-right/);
  assert.ok(css.includes('chai-support[position="bottom-right"]'));
  assert.ok(css.includes('chai-support[position="bottom-left"]'));
  assert.doesNotMatch(panel,/position="bottom-right"/);
  assert.match(panel,/position="inline"/);
});
test('modal is labelled and keyboard-dismissible with a real inline payment panel',()=>{
  assert.match(support,/aria-modal="true"/);
  assert.match(support,/aria-labelledby=\{titleId\}/);
  assert.match(support,/event\.key\s*===\s*'Escape'/);
  assert.match(support,/event\.key\s*!==\s*'Tab'/);
  assert.match(support,/setOpen\(false\)/);
  assert.match(support,/<ChaiKitPaymentPanel/);
  assert.match(support,/getFocusable/);
});
test('light and dark ChaiKit use safe CyberTube semantics and warm theme overrides',()=>{
  for(const token of [
    '--surface-subtle',
    '--text-primary','--text-secondary','--border','--accent-cyan',
  ])assert.ok(panel.includes('var('+token+')'),'missing '+token);
  assert.match(panel,/resolvedTheme/);
  assert.match(panel,/theme=\{widgetTheme\}/);
  assert.match(panel,/--chai-font/);
  assert.match(panel,/--chai-accent/);
  assert.match(panel,/--chai-radius/);
});
test('bank recipient, custom tiers and honest payment status are enforced',()=>{
  assert.match(panel,/creator-name=\{config\.livePaymentsEnabled\?config\.paymentPayeeName:config\.creatorName\}/);
  assert.match(panel,/demo-mode=\{config\.livePaymentsEnabled\?undefined:''\}/);
  assert.match(panel,/min-amount="10"/);
  assert.match(panel,/max-amount="10000"/);
  assert.match(panel,/Opening a UPI app does not confirm a payment/);
  assert.doesNotMatch(panel,/Payment successful|payment verified|received donation/i);
  assert.doesNotMatch(panel,/window\.location\.href\s*=/);
  assert.match(panel,/\/api\/support\/config/);
});
