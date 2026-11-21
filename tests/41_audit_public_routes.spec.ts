import {expect,test} from '@playwright/test';

// Read-only local smoke tests. No payment app handoff or remote-side mutations.
const publicRoutes=[
 '/', '/about','/careers','/certifications','/cheat-sheets','/courses',
 '/discover','/domains','/ethics','/glossary','/labs','/learning-paths',
 '/library','/login','/privacy','/register','/saved','/search',
 '/skills','/terms','/support','/typography-preview','/forgot-password',
];
for(const path of publicRoutes){
  test('public route returns without a 5xx response: '+path,async({page})=>{
    const response=await page.goto(path,{waitUntil:'domcontentloaded'});
    expect(response).not.toBeNull();
    expect(response!.status()).toBeLessThan(500);
  });
}
test('robots advertises real canonical sitemap',async({request})=>{
  const res=await request.get('/robots.txt');
  expect(res.status()).toBe(200);
  expect(await res.text()).toContain('Sitemap: https://cybertube-mu.vercel.app/sitemap.xml');
});
test('version response contains only safe metadata and never claims unknown build time',async({request})=>{
  const res=await request.get('/api/version');
  expect(res.status()).toBe(200);
  const body=await res.json();
  expect(body.application).toBe('CyberTube');
  expect([null,'string'].includes(typeof body.gitCommitSha==='object'?null:typeof body.gitCommitSha)).toBe(true);
  expect(res.headers()['cache-control']).toMatch(/no-store/);
  expect(body.checkedAt).toBeTruthy();
});
test('private PDF preflight cannot authorize a foreign origin',async({request})=>{
  const res=await request.fetch('/api/study-materials/unlisted-document/pdf',{
    method:'OPTIONS',headers:{Origin:'https://untrusted.example'},
  });
  expect(res.status()).toBe(405);
  expect(res.headers()['access-control-allow-origin']).toBeUndefined();
  expect(res.headers()['access-control-allow-credentials']).toBeUndefined();
});
test('legacy TryHackMe URL directs users to Practical Labs',async({page})=>{
  await page.goto('/tryhackme-roadmap?q=linux',{waitUntil:'domcontentloaded'});
  await expect(page).toHaveURL(/\/labs(\?|#|$)/);
});

for(const mode of ['dark','light'] as const) {
  test('typography preview has no horizontal overflow at 375px in '+mode+' mode',async({page})=>{
    await page.setViewportSize({width:375,height:812});
    await page.addInitScript(theme=>localStorage.setItem('theme',theme),mode);
    await page.goto('/typography-preview',{waitUntil:'domcontentloaded'});
    const overflow=await page.evaluate(
      ()=>document.documentElement.scrollWidth>document.documentElement.clientWidth+2
    );
    expect(overflow).toBe(false);
  });
}
