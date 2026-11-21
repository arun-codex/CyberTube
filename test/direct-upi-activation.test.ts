import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { getPublicChaiConfig } from '../src/lib/chaikit/server-config';
import { GET } from '../app/api/support/config/route';

const read=(p:string)=>readFileSync(join(process.cwd(),p),'utf8');
const approved={
  CYBERTUBE_SUPPORT_LIVE_PAYMENTS_ENABLED:'true',
  CYBERTUBE_SUPPORT_PAYEE_VERIFIED:'true',
  CYBERTUBE_SUPPORT_UPI_ID:'aruninzone@ptaxis',
  CYBERTUBE_SUPPORT_EXPECTED_PAYEE:'Arun Kumar',
};

test('Direct UPI cannot activate without all four exact approval/recipient checks',()=>{
  assert.equal(getPublicChaiConfig({}).livePaymentsEnabled,false);
  for(const key of Object.keys(approved)){
    const missing={...approved};
    delete missing[key as keyof typeof missing];
    const cfg=getPublicChaiConfig(missing);
    assert.equal(cfg.livePaymentsEnabled,false,key+' missing must disable payments');
    assert.equal(cfg.upiId,undefined,'Do not disclose recipient while disabled');
    assert.equal(cfg.paymentPayeeName,undefined);
  }
  assert.equal(getPublicChaiConfig({...approved,CYBERTUBE_SUPPORT_UPI_ID:'different@upi'}).mode,'preview');
  assert.equal(getPublicChaiConfig({...approved,CYBERTUBE_SUPPORT_EXPECTED_PAYEE:'CyberTube'}).mode,'preview');
  assert.equal(getPublicChaiConfig({...approved,CYBERTUBE_SUPPORT_PAYEE_VERIFIED:'false'}).mode,'preview');
  assert.equal(getPublicChaiConfig({...approved,CYBERTUBE_SUPPORT_LIVE_PAYMENTS_ENABLED:'TRUE'}).mode,'preview');
});

test('Owner-authorized account activates correct payee, tiers and custom amount limits',()=>{
  const c=getPublicChaiConfig(approved);
  assert.equal(c.mode,'live');
  assert.equal(c.creatorName,'CyberTube');
  assert.equal(c.upiId,'aruninzone@ptaxis');
  assert.equal(c.paymentPayeeName,'Arun Kumar');
  assert.equal(c.allowCustomAmount,true);
  assert.equal(c.minAmountRupees,10);
  assert.equal(c.maxAmountRupees,10000);
  assert.equal(c.defaultTierId,'kadak');
  assert.deepEqual(c.tiers.map(t=>t.amountPaise),[1000,2500,5000,10000]);
});

test('Public runtime API includes no cacheable payment configuration',async()=>{
  const res=await GET();
  assert.equal(res.status,200);
  assert.match(res.headers.get('Cache-Control')||'',/no-store/);
  const cfg=await res.json();
  assert.ok(['preview','live'].includes(cfg.mode));
  if(cfg.mode==='preview'){
    assert.equal(cfg.upiId,undefined);
    assert.equal(cfg.paymentPayeeName,undefined);
  }
});

test('ChaiKit native payee must be the verified bank recipient, not site branding',()=>{
  const s=read('src/components/support/ChaiKitPaymentElement.tsx');
  const preview=read('src/components/support/SupportCyberTubeButton.tsx');
  const page=read('app/support/page.tsx');
  const css=read('app/globals.css');
  assert.match(s,/'creator-name': config\.paymentPayeeName/);
  assert.match(s,/'upi-id': config\.upiId/);
  assert.match(s,/mode!=='live'/);
  assert.match(s,/allowCustomAmount|tiers:JSON\.stringify\(config\.tiers\)/);
  assert.ok(!s.includes("'demo-mode':"));
  assert.match(preview,/paymentWidgetRef\.current\.open\(\)/);
  assert.match(page,/ChaiKitPaymentElement config=\{runtime\} display="inline"/);
  assert.match(css,/chai-support\[position="bottom-right"\]:not\(\[headless\]\)/);
});

test('No misleading payment success or receipts are asserted by the website',()=>{
  const page=read('app/support/page.tsx');
  const footer=read('src/components/support/SupportStatusMessage.tsx');
  assert.match(page,/cannot verify payment completion/);
  assert.match(footer,/cannot be confirmed by CyberTube/);
});
