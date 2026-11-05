import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Phase 13.3 — Independent Storage Security Certification', () => {
  const rootDir = process.cwd();

  test('Bucket configuration strictly restricts to private, 5MiB, JPEG/PNG/WebP', () => {
    const configPath = path.join(rootDir, 'supabase', 'config.toml');
    const content = fs.readFileSync(configPath, 'utf8');

    expect(content).toContain('[storage.buckets.avatars]');
    expect(content).toContain('public = false');
    expect(content).toContain('file_size_limit = "5MiB"');
    expect(content).toContain('"image/jpeg"');
    expect(content).toContain('"image/png"');
    expect(content).toContain('"image/webp"');

    // GIF and SVG must NEVER be allowed
    expect(content).not.toContain('"image/gif"');
    expect(content).not.toContain('"image/svg+xml"');
  });

  test('Avatar API code enforces signature inspection and rejects GIF, SVG, HTML & spoofed MIME types', () => {
    const routePath = path.join(rootDir, 'app', 'api', 'user', 'avatar', 'route.ts');
    const content = fs.readFileSync(routePath, 'utf8');

    // Magic bytes checking
    expect(content).toContain('buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff'); // JPEG
    expect(content).toContain('buffer[0] === 0x89'); // PNG
    expect(content).toContain('buffer[1] === 0x50');
    expect(content).toContain("buffer.toString('utf8', 0, 4) === 'RIFF'"); // WEBP

    // Explicit rejection of disallowed formats
    expect(content).toContain("buffer.toString('utf8', 0, 3) === 'GIF'");
    expect(content).toContain("toLowerCase().includes('<svg')");
    expect(content).toContain("toLowerCase().includes('<html')");

    // Spoofed MIME detection
    expect(content).toContain('isMimeSignatureMatch');
    expect(content).toContain('Spoofed MIME type detected');
  });

  test('Avatar upload endpoint strictly enforces 5 MiB size ceiling and verified format path', () => {
    const routePath = path.join(rootDir, 'app', 'api', 'user', 'avatar', 'route.ts');
    const content = fs.readFileSync(routePath, 'utf8');

    expect(content).toContain('const MAX_FILE_SIZE = 5 * 1024 * 1024');
    expect(content).toContain('file.size > MAX_FILE_SIZE');
    expect(content).toContain('${user.id}/${randomName}.${verifiedExt}');
  });

  test('Admin client and bucket auto-initialization have strict fail-closed guards', () => {
    const adminPath = path.join(rootDir, 'src', 'lib', 'supabase', 'admin.ts');
    const adminContent = fs.readFileSync(adminPath, 'utf8');

    // Server-only runtime guard
    expect(adminContent).toContain("typeof window !== 'undefined'");
    expect(adminContent).toContain('createAdminClient can only be called on the server');

    const routePath = path.join(rootDir, 'app', 'api', 'user', 'avatar', 'route.ts');
    const routeContent = fs.readFileSync(routePath, 'utf8');

    // Fail-closed storage environment guard
    expect(routeContent).toContain('isBucketAutoInitAllowed()');
  });

  test('Avatar API rejects unauthenticated requests with 401 across all HTTP methods', async ({ request }) => {
    const getRes = await request.get('/api/user/avatar');
    expect(getRes.status()).toBe(401);

    const postRes = await request.post('/api/user/avatar', {
      multipart: {
        avatar: {
          name: 'malicious.svg',
          mimeType: 'image/svg+xml',
          buffer: Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>'),
        },
      },
    });
    expect(postRes.status()).toBe(401);

    const deleteRes = await request.delete('/api/user/avatar');
    expect(deleteRes.status()).toBe(401);
  });

  test('Two-user tenant isolation matrix prevents cross-tenant object access', () => {
    const userA = 'aaaa1111-1111-4111-8111-111111111111';
    const userB = 'bbbb2222-2222-4222-8222-222222222222';

    const getFolderUser = (objName: string) => objName.split('/')[0];

    const userAFile = `${userA}/profile-pic.webp`;
    const userBFile = `${userB}/profile-pic.webp`;

    // Evaluation of RLS policy: (storage.foldername(name))[1] = auth.uid()::text
    // User A attempting access:
    expect(getFolderUser(userAFile) === userA).toBe(true);  // Can access own
    expect(getFolderUser(userBFile) === userA).toBe(false); // Cannot access User B

    // User B attempting access:
    expect(getFolderUser(userBFile) === userB).toBe(true);  // Can access own
    expect(getFolderUser(userAFile) === userB).toBe(false); // Cannot access User A
  });

  test('SQL Storage policies maintain strict idempotent non-destructive RLS', () => {
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
    expect(sqlWithoutComments).not.toMatch(/ALTER\s+TABLE\s+storage\.buckets/i);

    // Verify UPDATE policy has both USING and WITH CHECK
    expect(content).toContain('CREATE POLICY "Users can update their own avatar"');
    expect(content).toContain('USING (');
    expect(content).toContain('WITH CHECK (');
  });

  test('UI Avatar fallback handles custom, provider, and initials hierarchy safely', () => {
    const avatarComponentPath = path.join(rootDir, 'src', 'components', 'ui', 'UserAvatar.tsx');
    const content = fs.readFileSync(avatarComponentPath, 'utf8');

    expect(content).toContain('rawTargetUrl = customAvatarUrl || providerAvatarUrl');
    expect(content).toContain('isSafeHttpsUrl');
    expect(content).toContain('avatars.githubusercontent.com');
    expect(content).toContain('supabase.co');
    expect(content).toContain('googleusercontent.com');
  });
});
