import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { resolveProfileAvatarUrl } from '../src/lib/avatar';
import { isSafeHttpsUrl } from '../src/components/ui/UserAvatar';

test.describe('Phase 14.1 — Avatar Persistence & Cross-Component Synchronization', () => {
  const rootDir = process.cwd();

  // ---------------------------------------------------------------------------
  // 1. STATIC AUDIT & ARCHITECTURAL CONTRACTS
  // ---------------------------------------------------------------------------

  test('Database types include avatar_path in Row, Insert, and Update', () => {
    const typesPath = path.join(rootDir, 'src', 'types', 'database.ts');
    expect(fs.existsSync(typesPath)).toBe(true);

    const content = fs.readFileSync(typesPath, 'utf8');
    expect(content).toContain('avatar_path: string | null;');
    expect(content).toContain('avatar_path?: string | null;');
  });

  test('app/api/user/avatar/route.ts implements hardened persistence contracts', () => {
    const routePath = path.join(rootDir, 'app', 'api', 'user', 'avatar', 'route.ts');
    expect(fs.existsSync(routePath)).toBe(true);

    const content = fs.readFileSync(routePath, 'utf8');

    // GET handler contracts
    expect(content).toContain('Cache-Control');
    expect(content).toContain('no-store');
    expect(content).toContain('createSignedUrl(profile.avatar_path, 3600)');
    expect(content).toContain('hasCustomAvatar');

    // POST handler contracts: checks database update & cleans up on failure
    expect(content).toContain('select(\'id, avatar_path\')');
    expect(content).toContain('if (updateError || !updatedRows || updatedRows.length === 0)');
    expect(content).toContain('supabase.storage.from(\'avatars\').remove([filePath])');

    // DELETE handler contracts: verifies DB update before reporting success
    expect(content).toContain('supabase.storage.from(\'avatars\').remove([currentPath])');
  });

  test('src/components/ui/UserAvatar.tsx resets imageError on URL changes', () => {
    const avatarComponentPath = path.join(rootDir, 'src', 'components', 'ui', 'UserAvatar.tsx');
    expect(fs.existsSync(avatarComponentPath)).toBe(true);

    const content = fs.readFileSync(avatarComponentPath, 'utf8');
    // Verifies state reset when target URL changes
    expect(content).toContain('rawTargetUrl !== prevTargetUrl');
    expect(content).toContain('setImageError(false)');
    // Verifies safe URL checks
    expect(content).toContain('isSafeAvatarUrl');
    expect(content).toContain('supabase.co');
  });

  test('Server components resolve signed URLs server-side from avatar_path', () => {
    const accountPagePath = path.join(rootDir, 'app', 'account', 'page.tsx');
    const profilePagePath = path.join(rootDir, 'app', 'profile', 'page.tsx');

    const accountContent = fs.readFileSync(accountPagePath, 'utf8');
    const profileContent = fs.readFileSync(profilePagePath, 'utf8');

    expect(accountContent).toContain('resolveProfileAvatarUrl');
    expect(accountContent).toContain('resolvedAvatarUrl');
    expect(profileContent).toContain('resolveProfileAvatarUrl');
    expect(profileContent).toContain('resolvedAvatarUrl');
  });

  test('Header and UserNavDropdown synchronize with avatar events', () => {
    const headerPath = path.join(rootDir, 'src', 'components', 'Header.tsx');
    const dropdownPath = path.join(rootDir, 'src', 'components', 'navigation', 'UserNavDropdown.tsx');

    const headerContent = fs.readFileSync(headerPath, 'utf8');
    const dropdownContent = fs.readFileSync(dropdownPath, 'utf8');

    expect(headerContent).toContain('AVATAR_UPDATED_EVENT');
    expect(headerContent).toContain('/api/user/avatar');
    expect(dropdownContent).toContain('UserAvatar');
  });

  // ---------------------------------------------------------------------------
  // 2. LIVE HTTP API VERIFICATION
  // ---------------------------------------------------------------------------

  test('GET /api/user/avatar enforces authentication and returns no-store headers', async ({ request }) => {
    const res = await request.get('/api/user/avatar');
    expect(res.status()).toBe(401);

    const cacheHeader = res.headers()['cache-control'];
    expect(cacheHeader).toContain('no-store');

    const body = await res.json();
    expect(body.error).toContain('Unauthorized');
  });

  test('POST /api/user/avatar enforces authentication gate', async ({ request }) => {
    const res = await request.post('/api/user/avatar');
    expect(res.status()).toBe(401);
  });

  test('DELETE /api/user/avatar enforces authentication gate', async ({ request }) => {
    const res = await request.delete('/api/user/avatar');
    expect(res.status()).toBe(401);
  });

  // ---------------------------------------------------------------------------
  // 3. UNIT RESOLUTION LOGIC VERIFICATION
  // ---------------------------------------------------------------------------

  test('resolveProfileAvatarUrl resolves signed URL when avatar_path is present', async () => {
    const mockSupabase = {
      storage: {
        from: (bucket: string) => {
          expect(bucket).toBe('avatars');
          return {
            createSignedUrl: async (filePath: string, expiresIn: number) => {
              expect(filePath).toBe('usr-123/avatar.webp');
              expect(expiresIn).toBe(3600);
              return { data: { signedUrl: 'https://storage.supabase.co/avatars/signed-test-token' }, error: null };
            },
          };
        },
      },
    };

    const profile = {
      avatar_path: 'usr-123/avatar.webp',
      avatar_url: 'https://lh3.googleusercontent.com/oauth-fallback.jpg',
    };

    const resolved = await resolveProfileAvatarUrl(mockSupabase, profile);
    expect(resolved).toBe('https://storage.supabase.co/avatars/signed-test-token');
  });

  test('resolveProfileAvatarUrl falls back to avatar_url when avatar_path is null', async () => {
    const mockSupabase = {
      storage: {
        from: () => ({
          createSignedUrl: async () => ({ data: null, error: new Error('Should not be called') }),
        }),
      },
    };

    const profile = {
      avatar_path: null,
      avatar_url: 'https://lh3.googleusercontent.com/oauth-fallback.jpg',
    };

    const resolved = await resolveProfileAvatarUrl(mockSupabase, profile);
    expect(resolved).toBe('https://lh3.googleusercontent.com/oauth-fallback.jpg');
  });

  test('resolveProfileAvatarUrl falls back to provider avatar if signed URL creation fails', async () => {
    const mockSupabase = {
      storage: {
        from: () => ({
          createSignedUrl: async () => ({ data: null, error: { message: 'Object not found' } }),
        }),
      },
    };

    const profile = {
      avatar_path: 'missing-user/avatar.webp',
      avatar_url: 'https://avatars.githubusercontent.com/fallback.png',
    };

    const resolved = await resolveProfileAvatarUrl(mockSupabase, profile);
    expect(resolved).toBe('https://avatars.githubusercontent.com/fallback.png');
  });

  test('resolveProfileAvatarUrl returns null when profile is undefined or null', async () => {
    const resolved = await resolveProfileAvatarUrl(null, null);
    expect(resolved).toBe(null);
  });

  // ---------------------------------------------------------------------------
  // 4. PHASE 14.1.1 — STRICT AVATAR URL VALIDATION CONTRACTS
  // ---------------------------------------------------------------------------

  test('isSafeHttpsUrl accepts valid Supabase Storage signed URLs', () => {
    expect(isSafeHttpsUrl('https://iwcbuvutqhwxgovkecfa.supabase.co/storage/v1/object/sign/avatars/user/pic.webp?token=xyz')).toBe(true);
    expect(isSafeHttpsUrl('https://project-ref.supabase.co/storage/v1/object/sign/avatars/uid/test.png')).toBe(true);
  });

  test('isSafeHttpsUrl accepts valid GitHub and Google avatar hosts', () => {
    expect(isSafeHttpsUrl('https://avatars.githubusercontent.com/u/1234567?v=4')).toBe(true);
    expect(isSafeHttpsUrl('https://lh3.googleusercontent.com/a/ACg8ocK-abc123xyz')).toBe(true);
  });

  test('isSafeHttpsUrl accepts approved local development URLs', () => {
    expect(isSafeHttpsUrl('http://localhost:54321/storage/v1/object/sign/avatars/pic.png')).toBe(true);
    expect(isSafeHttpsUrl('http://127.0.0.1:54321/storage/v1/object/sign/avatars/pic.png')).toBe(true);
  });

  test('isSafeHttpsUrl rejects attacker-controlled and lookalike domains', () => {
    // Suffix / lookalike attacks
    expect(isSafeHttpsUrl('https://supabase.co.attacker.example/evil.png')).toBe(false);
    expect(isSafeHttpsUrl('https://attacker-supabase.co/evil.png')).toBe(false);
    expect(isSafeHttpsUrl('https://evil-avatars.githubusercontent.com.attacker.example/pic.png')).toBe(false);
    expect(isSafeHttpsUrl('https://vercel.app.attacker.example/pic.png')).toBe(false);

    // Removed vercel.app allowance
    expect(isSafeHttpsUrl('https://cybertube.vercel.app/avatar.png')).toBe(false);

    // Insecure HTTP on remote hosts
    expect(isSafeHttpsUrl('http://iwcbuvutqhwxgovkecfa.supabase.co/pic.png')).toBe(false);
    expect(isSafeHttpsUrl('http://avatars.githubusercontent.com/pic.png')).toBe(false);

    // Invalid or script protocols
    expect(isSafeHttpsUrl('javascript:alert(1)')).toBe(false);
    expect(isSafeHttpsUrl('data:image/png;base64,AAAA')).toBe(false);
    expect(isSafeHttpsUrl('')).toBe(false);
  });
});

