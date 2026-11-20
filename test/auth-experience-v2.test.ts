import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const read=(path:string)=>readFileSync(join(process.cwd(),path),'utf8');
const login=read('app/login/page.tsx');
const register=read('app/register/page.tsx');
const shell=read('src/components/auth/AuthExperience.tsx');
const css=read('app/globals.css');
const oauth=read('src/components/auth/SocialAuthButtons.tsx');

test('sign-in continues to use existing Supabase account flow and safe redirect',()=>{
  assert.match(login,/signInWithPassword/);
  assert.match(login,/getSafeRedirectPath/);
  assert.match(login,/router\.replace\(redirectPath\)/);
  assert.match(login,/router\.refresh\(\)/);
  assert.match(login,/reason==='identity_link_conflict'/);
  assert.match(login,/href="\/forgot-password"/);
  assert.match(login,/autoComplete="current-password"/);
});
test('sign-up continues through server action, password confirmation and email callback',()=>{
  assert.match(register,/registerAction\(formData\)/);
  assert.match(register,/password!==confirm/);
  assert.match(register,/password\.length<8/);
  assert.match(register,/autoComplete="new-password"/);
  assert.match(register,/role="status"/);
  assert.match(register,/\/login\?redirect=/);
});
test('Google and GitHub OAuth buttons use the original callback helper and accessible names',()=>{
  assert.match(oauth,/getAuthCallbackUrl\(safeRedirect\)/);
  assert.match(oauth,/getSafeRedirectPath\(redirectPath/);
  assert.match(oauth,/supabase\.auth\.signInWithOAuth/);
  assert.match(oauth,/aria-label="Continue with Google"/);
  assert.match(oauth,/aria-label="Continue with GitHub"/);
  assert.match(oauth,/window\.location\.assign\(data\.url\)/);
});
test('accessible shared form fields and password visibility are implemented',()=>{
  assert.match(shell,/label htmlFor=\{id\}/);
  assert.match(shell,/aria-pressed=\{visible\}/);
  assert.match(shell,/autoComplete=\{autoComplete\}/);
  assert.match(shell,/type=\{visible\?'text':'password'\}/);
  assert.match(shell,/focus-visible:ring/);
  assert.match(login,/role="alert"/);
  assert.match(register,/role="alert"/);
  assert.doesNotMatch(shell,/analyst@cybertube\.local/);
  assert.doesNotMatch(login,/analyst@cybertube\.local/);
  assert.doesNotMatch(register,/analyst@cybertube\.local/);
});
test('professional motion is subtle, theme-aware and reduced-motion compatible',()=>{
  for(const selector of ['.auth-enter','.auth-enter-delayed','.auth-orb','.auth-stage']){
    assert.ok(css.includes(selector),selector);
  }
  assert.match(css,/@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css,/animation: none !important/);
  assert.ok(shell.includes('var(--text-primary)'));
  assert.ok(shell.includes('var(--surface-subtle)'));
  assert.ok(shell.includes('var(--accent-cyan)'));
  assert.match(shell,/lg:grid-cols/);
});
