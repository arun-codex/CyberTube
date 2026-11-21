import test from 'node:test';
import assert from 'node:assert/strict';
import { GET } from '../app/api/support/config/route';
import { defaultSupportConfig } from '../src/lib/chaikit/config';

const KEYS=[
  'CYBERTUBE_SUPPORT_LIVE_PAYMENTS_ENABLED',
  'CYBERTUBE_SUPPORT_PAYEE_VERIFIED',
  'CYBERTUBE_SUPPORT_UPI_ID',
  'CYBERTUBE_SUPPORT_EXPECTED_PAYEE',
] as const;

async function configWith(env:Record<string,string|undefined>){
  const previous=Object.fromEntries(KEYS.map(k=>[k,process.env[k]])) as Record<string,string|undefined>;
  try{
    for(const key of KEYS){
      if(env[key]===undefined)delete process.env[key];
      else process.env[key]=env[key]!;
    }
    const response=await GET();
    assert.equal(response.headers.get('Cache-Control')?.includes('no-store'),true);
    return response.json();
  }finally{
    for(const key of KEYS){
      if(previous[key]===undefined)delete process.env[key];
      else process.env[key]=previous[key]!;
    }
  }
}

const approved={
  CYBERTUBE_SUPPORT_LIVE_PAYMENTS_ENABLED:'true',
  CYBERTUBE_SUPPORT_PAYEE_VERIFIED:'true',
  CYBERTUBE_SUPPORT_UPI_ID:'aruninzone@ptaxis',
  CYBERTUBE_SUPPORT_EXPECTED_PAYEE:'Arun Kumar',
};

test('client-side default is always non-payable',()=>{
  assert.equal(defaultSupportConfig.livePaymentsEnabled,false);
  assert.equal(defaultSupportConfig.demoMode,true);
  assert.equal(defaultSupportConfig.position,'inline');
  assert.equal(defaultSupportConfig.upiId,'demo@upi');
});

test('two owner approval gates and matching recipient enable live QR',async()=>{
  const value=await configWith(approved);
  assert.equal(value.livePaymentsEnabled,true);
  assert.equal(value.demoMode,false);
  assert.equal(value.upiId,'aruninzone@ptaxis');
  assert.equal(value.paymentPayeeName,'Arun Kumar');
  assert.equal(value.position,'inline');
  assert.equal(value.defaultTierId,'kadak');
  assert.equal(value.allowCustomAmount,true);
  assert.deepEqual(value.tiers.map((t:{amountPaise:number})=>t.amountPaise),[1000,2500,5000,10000]);
});

test('missing consent or payee verification never exposes a payable UPI QR',async()=>{
  for(const changes of [
    {CYBERTUBE_SUPPORT_LIVE_PAYMENTS_ENABLED:'false'},
    {CYBERTUBE_SUPPORT_PAYEE_VERIFIED:'false'},
    {CYBERTUBE_SUPPORT_UPI_ID:'other@upi'},
    {CYBERTUBE_SUPPORT_EXPECTED_PAYEE:'Someone Else'},
    {CYBERTUBE_SUPPORT_UPI_ID:undefined},
    {CYBERTUBE_SUPPORT_EXPECTED_PAYEE:undefined},
  ]){
    const response=await configWith({...approved,...changes});
    assert.equal(response.livePaymentsEnabled,false,JSON.stringify(changes));
    assert.equal(response.demoMode,true);
    assert.equal(response.upiId,'demo@upi');
    assert.notEqual(response.paymentPayeeName,'Arun Kumar');
  }
});
