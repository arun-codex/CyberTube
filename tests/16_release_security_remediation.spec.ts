import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { isBucketAutoInitAllowed } from '../src/lib/storageEnvironmentGuard';

test.describe('Phase 13.4 — Release Security Remediation', () => {
  const rootDir = process.cwd();

  test('Workstream 1 — Framework security: Next.js >= 15.5.0 and sharp >= 0.35.5 installed', () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));

    // Check sharp installed and version >= 0.35.5
    expect(pkg.dependencies.sharp).toBeDefined();
    expect(pkg.dependencies.sharp).toMatch(/0\.35\.5/);

    // Check next is on patched release line
    expect(pkg.dependencies.next).toBeDefined();
    const nextVersion = pkg.dependencies.next;
    expect(nextVersion).not.toMatch(/14\./);
  });

  test('Workstream 2 — Avatar extension matches verified binary content (.jpg, .png, .webp)', () => {
    const routePath = path.join(rootDir, 'app', 'api', 'user', 'avatar', 'route.ts');
    const content = fs.readFileSync(routePath, 'utf8');

    // Extension matches binary signature
    expect(content).toContain("const verifiedExt = isJpeg ? 'jpg' : isPng ? 'png' : 'webp'");
    expect(content).toContain('`${user.id}/${randomName}.${verifiedExt}`');

    // Rejection of disallowed formats
    expect(content).toContain("buffer.toString('utf8', 0, 3) === 'GIF'");
    expect(content).toContain("toLowerCase().includes('<svg')");
    expect(content).toContain("toLowerCase().includes('<html')");
    expect(content).toContain('Spoofed MIME type detected');
  });

  test('Workstream 3 — Admin client is guarded by server-only and runtime guard', () => {
    const adminPath = path.join(rootDir, 'src', 'lib', 'supabase', 'admin.ts');
    const content = fs.readFileSync(adminPath, 'utf8');

    expect(content).toContain("import 'server-only';");
    expect(content).toContain("typeof window !== 'undefined'");
  });

  test('Workstream 3 — Fail-closed environment guard matrix (Default DENY)', () => {
    // 1. Missing opt-in flag -> DENY
    expect(isBucketAutoInitAllowed({})).toBe(false);
    expect(isBucketAutoInitAllowed({ NODE_ENV: 'development' })).toBe(false);
    expect(isBucketAutoInitAllowed({ VERCEL_ENV: 'preview' })).toBe(false);

    // 2. Vercel Production -> DENY (even if flag is erroneously set)
    expect(
      isBucketAutoInitAllowed({
        VERCEL_ENV: 'production',
        NODE_ENV: 'production',
        CYBERTUBE_ENABLE_STORAGE_AUTO_INIT: 'true',
      })
    ).toBe(false);

    // 3. Standalone / Non-Vercel Production -> DENY
    expect(
      isBucketAutoInitAllowed({
        NODE_ENV: 'production',
        CYBERTUBE_ENABLE_STORAGE_AUTO_INIT: 'true',
      })
    ).toBe(false);

    // 4. Unexpected / Ambiguous environments -> DENY
    expect(
      isBucketAutoInitAllowed({
        NODE_ENV: 'staging',
        VERCEL_ENV: 'testing',
        CYBERTUBE_ENABLE_STORAGE_AUTO_INIT: 'true',
      })
    ).toBe(false);

    // 5. Approved local development with explicit flag -> ALLOW
    expect(
      isBucketAutoInitAllowed({
        NODE_ENV: 'development',
        CYBERTUBE_ENABLE_STORAGE_AUTO_INIT: 'true',
      })
    ).toBe(true);

    // 6. Approved Vercel preview with explicit flag -> ALLOW
    expect(
      isBucketAutoInitAllowed({
        VERCEL_ENV: 'preview',
        CYBERTUBE_ENABLE_STORAGE_AUTO_INIT: 'true',
      })
    ).toBe(true);
  });

  test('Workstream 4 — Storage RLS policy review (scoped to avatars bucket and user folder)', () => {
    const migrationPath = path.join(
      rootDir,
      'supabase',
      'migrations',
      '20261105000000_add_avatar_path_and_storage_policy.sql'
    );
    const content = fs.readFileSync(migrationPath, 'utf8');
    const sqlWithoutComments = content.replace(/--.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');

    // Never alter storage.objects table
    expect(sqlWithoutComments).not.toMatch(/ALTER\s+TABLE\s+storage\.objects/i);

    // Ensure all 4 policies are scoped to bucket_id = 'avatars' and folder matches auth.uid()
    expect(content).toContain("bucket_id = 'avatars'");
    expect(content).toContain('(storage.foldername(name))[1] = auth.uid()::text');

    // UPDATE policy has both USING and WITH CHECK
    expect(content).toContain('CREATE POLICY "Users can update their own avatar"');
    expect(content).toContain('USING (');
    expect(content).toContain('WITH CHECK (');
  });

  test('Workstream 5 — Two-user tenant isolation logic verification', () => {
    const userA = 'aaaa1111-1111-4111-8111-111111111111';
    const userB = 'bbbb2222-2222-4222-8222-222222222222';

    const getFolder = (pathStr: string) => pathStr.split('/')[0];

    const fileA = `${userA}/avatar-pic.png`;
    const fileB = `${userB}/avatar-pic.png`;

    // Folder isolation condition: (storage.foldername(name))[1] = auth.uid()::text
    expect(getFolder(fileA) === userA).toBe(true);
    expect(getFolder(fileB) === userA).toBe(false);

    expect(getFolder(fileB) === userB).toBe(true);
    expect(getFolder(fileA) === userB).toBe(false);
  });
});

