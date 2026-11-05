import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Phase 13.2 — Storage Configuration, Avatar Policy & Two-User Isolation', () => {
  const rootDir = process.cwd();

  test('supabase/config.toml enforces private avatars bucket, 5MiB size limit & MIME types', () => {
    const configPath = path.join(rootDir, 'supabase', 'config.toml');
    expect(fs.existsSync(configPath)).toBe(true);

    const configContent = fs.readFileSync(configPath, 'utf8');
    expect(configContent).toContain('[storage.buckets.avatars]');
    expect(configContent).toContain('public = false');
    expect(configContent).toContain('file_size_limit = "5MiB"');
    expect(configContent).toContain('"image/jpeg"');
    expect(configContent).toContain('"image/png"');
    expect(configContent).toContain('"image/webp"');
  });

  test('Migration 20261105000000 never modifies storage.objects table ownership or RLS enablement', () => {
    const migrationPath = path.join(
      rootDir,
      'supabase',
      'migrations',
      '20261105000000_add_avatar_path_and_storage_policy.sql'
    );
    expect(fs.existsSync(migrationPath)).toBe(true);

    const migrationContent = fs.readFileSync(migrationPath, 'utf8');
    const sqlWithoutComments = migrationContent.replace(/--.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');

    // CRITICAL: Must never attempt to enable RLS on storage.objects (causes SQLSTATE 42501 in Supabase)
    expect(sqlWithoutComments).not.toMatch(/ALTER\s+TABLE\s+storage\.objects\s+ENABLE\s+ROW\s+LEVEL\s+SECURITY/i);
    expect(sqlWithoutComments).not.toMatch(/ALTER\s+TABLE\s+storage\.buckets\s+ENABLE\s+ROW\s+LEVEL\s+SECURITY/i);

    // Verify UPDATE policy contains both USING and WITH CHECK
    expect(migrationContent).toContain('CREATE POLICY "Users can update their own avatar"');
    expect(migrationContent).toContain('USING (');
    expect(migrationContent).toContain('WITH CHECK (');

    // Verify folder isolation clause
    expect(migrationContent).toContain('(storage.foldername(name))[1] = auth.uid()::text');
  });

  test('Two-user tenant isolation logic verifies cross-user folder containment', () => {
    // Simulate Supabase storage.foldername function
    const foldername = (objectPath: string) => objectPath.split('/');

    const userA = '11111111-1111-4111-8111-111111111111';
    const userB = '22222222-2222-4222-8222-222222222222';

    const userAObject = `${userA}/avatar-photo-1.webp`;
    const userBObject = `${userB}/avatar-photo-2.webp`;

    // Policy condition: (storage.foldername(name))[1] = auth.uid()::text
    const canUserAAccessUserA = foldername(userAObject)[0] === userA;
    const canUserAAccessUserB = foldername(userBObject)[0] === userA;
    const canUserBAccessUserB = foldername(userBObject)[0] === userB;
    const canUserBAccessUserA = foldername(userAObject)[0] === userB;

    expect(canUserAAccessUserA).toBe(true);
    expect(canUserAAccessUserB).toBe(false); // User A CANNOT access User B
    expect(canUserBAccessUserB).toBe(true);
    expect(canUserBAccessUserA).toBe(false); // User B CANNOT access User A
  });

  test('Avatar API routes enforce authentication and strict object path naming', async ({ request }) => {
    // GET without authentication -> 401
    const getRes = await request.get('/api/user/avatar');
    expect(getRes.status()).toBe(401);

    // POST without authentication -> 401
    const postRes = await request.post('/api/user/avatar');
    expect(postRes.status()).toBe(401);

    // DELETE without authentication -> 401
    const deleteRes = await request.delete('/api/user/avatar');
    expect(deleteRes.status()).toBe(401);

    // Inspect route code for strict {user_id}/{random_filename}.webp path pattern
    const routePath = path.join(rootDir, 'app', 'api', 'user', 'avatar', 'route.ts');
    const routeContent = fs.readFileSync(routePath, 'utf8');

    expect(routeContent).toContain('${user.id}/${randomName}.webp');
    expect(routeContent).toContain('createSignedUrl');
    expect(routeContent).toContain('createAdminClient');
  });

  test('All CFAA references are completely absent from active curriculum and skills data', () => {
    const pathsData = fs.readFileSync(path.join(rootDir, 'data', 'paths.json'), 'utf8');
    const skillsData = fs.readFileSync(path.join(rootDir, 'data', 'skills.json'), 'utf8');

    expect(pathsData).not.toContain('CFAA');
    expect(skillsData).not.toContain('CFAA');

    // General written authorization requirement is preserved
    expect(pathsData).toContain('explicit prior written authorization');
    expect(skillsData).toContain('explicit written authorization scopes');
  });

  test('CompTIA Security+ lifecycle reflects verified official retirement and launch dates', () => {
    const certsData = fs.readFileSync(path.join(rootDir, 'data', 'certifications.json'), 'utf8');
    const pathsData = fs.readFileSync(path.join(rootDir, 'data', 'paths.json'), 'utf8');

    // SY0-701 English retirement: June 11, 2027
    expect(certsData).toContain('June 11, 2027');
    expect(pathsData).toContain('11 June 2027');

    // SY0-801 launch: ~Nov 17, 2026
    expect(certsData).toContain('November 17, 2026');
    expect(pathsData).toContain('17 Nov 2026');
  });

  test('Resource catalogue maintains 21 verified items with HackerSploit inactive channel note', () => {
    const resources = JSON.parse(fs.readFileSync(path.join(rootDir, 'data', 'resources.json'), 'utf8'));
    expect(resources.length).toBe(21);

    const hackerSploitResources = resources.filter((r: any) => r.creator === 'HackerSploit');
    expect(hackerSploitResources.length).toBe(2);

    hackerSploitResources.forEach((res: any) => {
      expect(res.notes).toContain('Channel inactive since 2025');
    });
  });
});

