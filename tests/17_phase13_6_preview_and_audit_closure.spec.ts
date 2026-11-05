import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { isBucketAutoInitAllowed } from '../src/lib/storageEnvironmentGuard';

test.describe('Phase 13.6 — Preview Integration & Dependency Closure', () => {
  const rootDir = process.cwd();

  test('Workstream 2 — PostCSS override is configured in package.json and deduped to >=8.5.23', () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf-8'));
    expect(pkg.overrides).toBeDefined();
    expect(pkg.overrides.postcss).toBeDefined();

    const lockfile = JSON.parse(fs.readFileSync(path.join(rootDir, 'package-lock.json'), 'utf-8'));
    const packages = lockfile.packages || {};
    
    // Check all postcss packages in package-lock
    for (const [pkgPath, pkgInfo] of Object.entries<any>(packages)) {
      if (pkgPath.endsWith('/postcss') || pkgPath === 'node_modules/postcss') {
        const version = pkgInfo.version;
        const [major, minor, patch] = version.split('.').map(Number);
        expect(major).toBe(8);
        expect(minor).toBe(5);
        expect(patch).toBeGreaterThanOrEqual(23);
      }
    }
  });

  test('Workstream 3 — Next.js 15.5.29 security release addresses Nov 3, 2026 advisories', () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf-8'));
    expect(pkg.dependencies.next).toBe('^15.5.29');

    const lockfile = JSON.parse(fs.readFileSync(path.join(rootDir, 'package-lock.json'), 'utf-8'));
    const nextPkg = lockfile.packages?.['node_modules/next'];
    expect(nextPkg).toBeDefined();
    expect(nextPkg.version).toBe('15.5.29');
  });

  test('Workstream 4 & 5 — Supabase preview integration configuration guard and fail-closed isolation', () => {
    // Verify server-only admin client guard
    const adminPath = path.join(rootDir, 'src/lib/supabase/admin.ts');
    const adminContent = fs.readFileSync(adminPath, 'utf-8');
    expect(adminContent).toContain("import 'server-only'");

    // Verify fail-closed storage environment guard
    expect(isBucketAutoInitAllowed({})).toBe(false);
    expect(isBucketAutoInitAllowed({ NODE_ENV: 'production' })).toBe(false);
    expect(isBucketAutoInitAllowed({ VERCEL_ENV: 'production', SUPABASE_STORAGE_AUTO_INIT: 'true' })).toBe(false);

    // Verify avatar upload endpoint strictly enforces isolated tenant path
    const avatarApiPath = path.join(rootDir, 'app/api/user/avatar/route.ts');
    const avatarApiContent = fs.readFileSync(avatarApiPath, 'utf-8');
    expect(avatarApiContent).toContain('user.id');
    expect(avatarApiContent).toContain('avatars');
    expect(avatarApiContent).toContain('Spoofed MIME type detected');
  });

  test('Workstream 6 — Avatar MIME validation and anti-spoofing logic', () => {
    const avatarApiPath = path.join(rootDir, 'app/api/user/avatar/route.ts');
    const avatarApiContent = fs.readFileSync(avatarApiPath, 'utf-8');

    // Accepts only JPEG, PNG, WebP
    expect(avatarApiContent).toContain("'image/jpeg'");
    expect(avatarApiContent).toContain("'image/png'");
    expect(avatarApiContent).toContain("'image/webp'");

    // Extension matches binary signature
    expect(avatarApiContent).toContain("const verifiedExt = isJpeg ? 'jpg' : isPng ? 'png' : 'webp'");
    expect(avatarApiContent).toContain('`${user.id}/${randomName}.${verifiedExt}`');

    // 5 MiB ceiling
    expect(avatarApiContent).toContain('5 * 1024 * 1024');
  });
});
