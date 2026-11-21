import { test,expect } from '@playwright/test';

test('approved direct UPI displays exact verified payee, a scannable QR and custom amounts without pretending payment succeeded',async({page})=>{
  await page.route('**/api/support/config',async route=>route.fulfill({
    status:200,contentType:'application/json',
    headers:{'Cache-Control':'no-store'},
    body:JSON.stringify({
      enabled:true,demoMode:false,livePaymentsEnabled:true,
      creatorName:'CyberTube',paymentPayeeName:'Arun Kumar',upiId:'aruninzone@ptaxis',
      description:'Support free cybersecurity education. Buy us a chai!',
      buttonText:'Support CyberTube ☕',paymentNote:'Support CyberTube',
      theme:'dark',position:'inline',defaultTierId:'kadak',allowCustomAmount:true,
      enable3D:true,tiers:[
        {id:'cutting',name:'Cutting Chai',amountPaise:1000,icon:'cutting'},
        {id:'kadak',name:'Kadak Chai',amountPaise:2500,icon:'kadak'},
        {id:'tandoori',name:'Tandoori Chai',amountPaise:5000,icon:'tandoori'},
        {id:'premium',name:'Premium Chai',amountPaise:10000,icon:'premium'},
      ],
    }),
  }));
  await page.goto('/support');
  const panel=page.getByTestId('chaikit-payment-panel');
  await expect(panel).toBeVisible();
  await expect(panel.getByText('Direct UPI contribution to CyberTube')).toBeVisible();
  await expect(panel.getByText(/Bank recipient:/)).toContainText('Arun Kumar');
  await expect(panel.locator('[role="note"]').first()).toContainText('aruninzone@ptaxis');

  const widget=panel.locator('chai-support');
  await expect(widget).toBeVisible();
  await expect(widget).toHaveAttribute('position','inline');
  await expect(widget).toHaveAttribute('creator-name','Arun Kumar');
  await expect(widget).toHaveAttribute('upi-id','aruninzone@ptaxis');
  await expect(widget).not.toHaveAttribute('demo-mode');
  await expect(widget.locator('.chai-qr-frame svg')).toBeVisible();
  await expect(widget.locator('.chai-demo-status')).toHaveCount(0);
  await expect(widget.locator('.chai-upi-value')).toContainText(['₹25', 'aruninzone@ptaxis']);

  // Exercise ChaiKit custom-amount calculation without opening any UPI app.
  const amount=widget.locator('input[aria-label="Custom contribution amount in rupees"]');
  await amount.fill('42');
  await expect(widget.locator('.chai-payment-amount')).toContainText('42');
  await expect(widget.locator('.chai-qr-frame svg')).toBeVisible();
  await expect(page.getByText(/Opening a UPI app does not confirm a payment/)).toBeVisible();
  await expect(page.getByText(/Payment successful/i)).toHaveCount(0);
});

test('an invalid recipient response cannot activate payments even if live flag is true',async({page})=>{
  await page.route('**/api/support/config',async route=>route.fulfill({
    status:200,contentType:'application/json',
    body:JSON.stringify({
      livePaymentsEnabled:true,demoMode:false,
      paymentPayeeName:'Not approved',upiId:'notapproved@upi',
    }),
  }));
  await page.goto('/support');
  const panel=page.getByTestId('chaikit-payment-panel');
  await expect(panel.getByText(/Preview only — real UPI payments are disabled/)).toBeVisible();
  const widget=panel.locator('chai-support');
  await expect(widget).toHaveAttribute('demo-mode','');
  await expect(widget).toHaveAttribute('upi-id','demo@upi');
});
