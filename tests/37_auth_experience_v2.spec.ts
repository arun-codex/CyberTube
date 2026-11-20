import { test, expect } from '@playwright/test';

test.describe('Professional sign-in and sign-up experience',()=>{
  test('sign-in has accessible providers, fields and password visibility',async({page})=>{
    await page.goto('/login?redirect=%2Fskills');
    await expect(page.getByRole('heading',{name:'Sign in to CyberTube'})).toBeVisible();
    await expect(page.getByRole('button',{name:'Continue with Google'})).toBeVisible();
    await expect(page.getByRole('button',{name:'Continue with GitHub'})).toBeVisible();
    await expect(page.locator('#login-email')).toHaveAttribute('autocomplete','email');
    const input=page.locator('#login-password');
    await expect(input).toHaveAttribute('type','password');
    await page.getByRole('button',{name:'Show password'}).click();
    await expect(input).toHaveAttribute('type','text');
    await page.getByRole('button',{name:'Hide password'}).click();
    await expect(input).toHaveAttribute('type','password');
    await expect(page.getByRole('link',{name:'Create an account'})).toHaveAttribute('href','/register?redirect=%2Fskills');
    await expect(page.getByRole('link',{name:'Forgot password?'})).toBeVisible();
  });

  test('registration gives password guidance and preserves redirect in sign-in link',async({page})=>{
    await page.goto('/register?redirect=%2Fcourses');
    await expect(page.getByRole('heading',{name:'Join CyberTube'})).toBeVisible();
    await expect(page.getByRole('button',{name:'Continue with Google'})).toBeVisible();
    await expect(page.getByRole('button',{name:'Continue with GitHub'})).toBeVisible();
    await page.locator('#register-password').fill('Correct-Horse-28!');
    await expect(page.locator('#password-guidance')).toContainText('Stronger password');
    await page.locator('#register-confirm').fill('Mismatch-password');
    await expect(page.locator('#confirm-password-hint')).toContainText('do not match');
    await page.locator('#register-confirm').fill('Correct-Horse-28!');
    await expect(page.locator('#confirm-password-hint')).toContainText('Passwords match');
    await expect(page.getByRole('link',{name:'Sign in',exact:true}).last()).toHaveAttribute('href','/login?redirect=%2Fcourses');
  });

  for(const theme of ['light','dark'] as const){
    test('both auth pages follow '+theme+' theme and remain responsive',async({page})=>{
      await page.setViewportSize({width:390,height:844});
      await page.addInitScript(mode=>localStorage.setItem('theme',mode),theme);
      for(const route of ['/login','/register']){
        await page.goto(route);
        const rootIsDark=await page.evaluate(()=>document.documentElement.classList.contains('dark'));
        expect(rootIsDark).toBe(theme==='dark');
        await expect(page.locator('h1')).toBeVisible();
        const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
        expect(overflow).toBe(false);
      }
    });
  }

  test('reduced-motion users see forms without reveal animation',async({page})=>{
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.goto('/login');
    const animation=await page.locator('.auth-enter-delayed').evaluate(el=>getComputedStyle(el).animationName);
    expect(animation).toBe('none');
    await expect(page.getByRole('button',{name:'Sign in',exact:true})).toBeVisible();
  });
});
