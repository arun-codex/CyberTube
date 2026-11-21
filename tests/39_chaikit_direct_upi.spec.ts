import { expect, test } from '@playwright/test';

const LIVE_CONFIG={
  livePaymentsEnabled:true,
  mode:'live',
  creatorName:'CyberTube',
  buttonText:'Support CyberTube ☕',
  description:'Support free cybersecurity education. Buy us a chai!',
  paymentNote:'Support CyberTube',
  paymentPayeeName:'Arun Kumar',
  upiId:'aruninzone@ptaxis',
  tiers:[
    {id:'cutting',name:'Cutting Chai',amountPaise:1000,description:'Support free lessons',icon:'cutting'},
    {id:'kadak',name:'Kadak Chai',amountPaise:2500,description:'Support platform',icon:'kadak'},
    {id:'tandoori',name:'Tandoori Chai',amountPaise:5000,description:'Support labs',icon:'tandoori'},
    {id:'premium',name:'Premium Chai',amountPaise:10000,description:'Support learning',icon:'premium'},
  ],
  defaultTierId:'kadak',
  allowCustomAmount:true,
  minAmountRupees:10,
  maxAmountRupees:10000,
  enable3D:true,
  verificationNotice:'Owner reports verification. Check your bank app.',
};

test.describe('CyberTube direct UPI activation',()=>{
  test('default development environment remains non-payable',async({page})=>{
    await page.goto('/support');
    await expect(page.getByText('Safe Demonstration Preview (Demo Mode Active)')).toBeVisible();
    const widget=page.locator('[data-testid="support-page-inline-widget"] chai-support');
    await expect(widget).toBeVisible();
    await expect(widget).toHaveAttribute('demo-mode','');
    await expect(widget.getByText(/Demo Only/i).first()).toBeVisible();
    const config=await page.request.get('/api/support/config');
    expect(config.headers()['cache-control']).toMatch(/no-store/);
    const body=await config.json();
    expect(body.livePaymentsEnabled).toBe(false);
    expect(body.upiId).toBeUndefined();
  });

  test('live support page uses real native QR flow with expected payee and custom amount',async({page})=>{
    await page.route('**/api/support/config',async route=>{
      await route.fulfill({status:200,contentType:'application/json',headers:{'Cache-Control':'no-store'},body:JSON.stringify(LIVE_CONFIG)});
    });
    await page.goto('/support');
    await expect(page.getByText('Direct UPI Support Enabled')).toBeVisible();
    const widget=page.locator('[data-testid="chaikit-live-inline"]');
    await expect(widget).toBeVisible();
    await expect(widget).toHaveAttribute('upi-id','aruninzone@ptaxis');
    await expect(widget).toHaveAttribute('creator-name','Arun Kumar');
    await expect(widget).not.toHaveAttribute('demo-mode','');
    await expect(widget.getByText(/Buy Arun Kumar a Chai/)).toBeVisible();
    await expect(widget.getByRole('region',{name:'UPI Payment QR Code'})).toBeVisible();
    await expect(widget.getByRole('button',{name:/Copy UPI ID: aruninzone@ptaxis/})).toBeVisible();
    await expect(widget.getByRole('button',{name:'Open UPI payment in installed mobile app'})).toBeVisible();
    await expect(widget.getByText(/Demo Only/i)).toHaveCount(0);
    const custom=widget.getByRole('textbox',{name:'Custom contribution amount in rupees'});
    await expect(custom).toBeVisible();
    await custom.fill('75');
    await custom.blur();
    await expect(widget.getByText('₹75')).toBeVisible();
  });

  test('Home and footer open native headless popup, not a floating launcher',async({page})=>{
    await page.route('**/api/support/config',async route=>{
      await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(LIVE_CONFIG)});
    });
    await page.goto('/');
    const host=page.locator('chai-support[data-testid="chaikit-live-headless"]').first();
    await expect(host).toBeAttached();
    await expect(host).toHaveAttribute('headless','');
    await expect(host).toHaveAttribute('creator-name','Arun Kumar');
    await expect(page.locator('footer').getByText(/Live direct UPI enabled/)).toBeVisible();
    await page.getByRole('button',{name:'Support CyberTube ☕'}).first().click();
    await expect(host.getByText(/Buy Arun Kumar a Chai/)).toBeVisible();
    await expect(host.getByRole('region',{name:'UPI Payment QR Code'})).toBeVisible();
    await expect(host.locator('.chai-launcher-btn')).toHaveCount(0);
  });

  for(const mode of ['dark','light'] as const){
    test('theme '+mode+' and responsive live QR layout',async({page})=>{
      await page.route('**/api/support/config',async route=>{
        await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(LIVE_CONFIG)});
      });
      await page.addInitScript(value=>localStorage.setItem('theme',value),mode);
      await page.setViewportSize({width:375,height:720});
      await page.goto('/support');
      const host=page.locator('[data-testid="chaikit-live-inline"]');
      await expect(host).toBeVisible();
      await expect(host).toHaveAttribute('theme',mode==='light'?'cream':'dark');
      await expect(host.getByRole('region',{name:'UPI Payment QR Code'})).toBeVisible();
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth+2);
      expect(overflow).toBe(false);
    });
  }
});
