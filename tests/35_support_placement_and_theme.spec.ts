import { expect, test } from '@playwright/test';

test.describe('Inline Chai Support',()=>{
  test('Home/footer entry opens accessible, inline demo ChaiKit in safe default',async({page})=>{
    await page.route('**/api/support/config',async route=>route.fulfill({
      status:200,contentType:'application/json',
      body:JSON.stringify({
        enabled:true,demoMode:true,livePaymentsEnabled:false,
        creatorName:'CyberTube',upiId:'demo@upi',paymentPayeeName:'CyberTube (demo only)',
        description:'Support free cybersecurity education. Buy us a chai!',
        buttonText:'Support CyberTube ☕',paymentNote:'Support CyberTube',
        theme:'dark',position:'inline',defaultTierId:'kadak',enable3D:true,
        allowCustomAmount:true,tiers:[
          {id:'cutting',name:'Cutting Chai',amountPaise:1000,icon:'cutting'},
          {id:'kadak',name:'Kadak Chai',amountPaise:2500,icon:'kadak'},
          {id:'tandoori',name:'Tandoori Chai',amountPaise:5000,icon:'tandoori'},
          {id:'premium',name:'Premium Chai',amountPaise:10000,icon:'premium'},
        ],
      }),
    }));
    await page.goto('/');
    const supportBtn = page.locator('#support-cybertube').getByRole('button',{name:'Support CyberTube ☕'}).first();
    await expect(supportBtn).toBeVisible();
    await expect(page.locator('chai-support')).toHaveCount(0);

    await supportBtn.click();
    const modal=page.getByRole('dialog',{name:'Buy us a chai ☕'});
    await expect(modal).toBeVisible();
    await expect(modal.getByText('Preview only — real UPI payments are disabled')).toBeVisible();
    const widget=modal.locator('chai-support');
    await expect(widget).toBeVisible();
    await expect(widget).toHaveAttribute('position','inline');
    await expect(widget).toHaveAttribute('demo-mode','');
    await expect(widget).toHaveAttribute('upi-id','demo@upi');
    await expect(widget.locator('.chai-demo-status')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
  });

  for(const mode of ['light','dark'] as const){
    test('modal and ChaiKit respond to CyberTube '+mode+' theme',async({page})=>{
      await page.addInitScript(selected=>localStorage.setItem('theme',selected),mode);
      await page.goto('/');
      await page.getByRole('button',{name:'Support CyberTube ☕'}).first().click();
      const dialog=page.getByRole('dialog',{name:'Buy us a chai ☕'});
      await expect(dialog).toBeVisible();
      const widget=dialog.locator('chai-support');
      await expect(widget).toBeVisible();
      await expect(widget).toHaveAttribute('theme',mode==='light'?'cream':'dark');
      const colors=await dialog.evaluate(element=>({
        background:getComputedStyle(element).backgroundColor,
        expected:getComputedStyle(document.documentElement).getPropertyValue('--card-bg').trim(),
        dark:document.documentElement.classList.contains('dark'),
      }));
      expect(colors.dark).toBe(mode==='dark');
      expect(colors.expected.length).toBeGreaterThan(0);
      expect(colors.background).not.toBe('rgba(0, 0, 0, 0)');
      await page.keyboard.press('Escape');
    });
  }

  test('footer support is in normal document flow on library page',async({page})=>{
    await page.goto('/library');
    const support=page.locator('footer #support-cybertube');
    await expect(support).toBeVisible();
    expect(await support.evaluate(element=>getComputedStyle(element).position)).not.toBe('fixed');
  });
});
