import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  isTestAuthSimulationAllowed,
  signTestUserPayload,
  verifyAndParseTestUserCookie,
} from '../src/lib/testAuthGuard';
import { NextRequest } from 'next/server';
import { middleware } from '../middleware';
import { createClient } from '@supabase/supabase-js';

const EXPLICIT_TEST_SECRET = 'unit-test-secret-explicit-abc123-secure';

test('Security Hardening — isTestAuthSimulationAllowed fail-closed rules & mandatory secret', () => {
  // 1. Default without env is strictly DENIED
  assert.equal(isTestAuthSimulationAllowed({}), false, 'Empty env must fail closed');

  // 2. Denied when CYBERTUBE_ENABLE_TEST_AUTH is not 'true'
  assert.equal(
    isTestAuthSimulationAllowed({
      CYBERTUBE_ENABLE_TEST_AUTH: 'false',
      CYBERTUBE_TEST_AUTH_SECRET: EXPLICIT_TEST_SECRET,
    }),
    false,
    'Must deny when CYBERTUBE_ENABLE_TEST_AUTH is false'
  );

  // 3. Denied when CYBERTUBE_TEST_AUTH_SECRET is MISSING (fail closed, no fallback)
  assert.equal(
    isTestAuthSimulationAllowed({
      CYBERTUBE_ENABLE_TEST_AUTH: 'true',
    }),
    false,
    'Must deny when CYBERTUBE_TEST_AUTH_SECRET is missing'
  );

  // 4. Denied when CYBERTUBE_TEST_AUTH_SECRET is empty string
  assert.equal(
    isTestAuthSimulationAllowed({
      CYBERTUBE_ENABLE_TEST_AUTH: 'true',
      CYBERTUBE_TEST_AUTH_SECRET: '   ',
    }),
    false,
    'Must deny when CYBERTUBE_TEST_AUTH_SECRET is whitespace'
  );

  // 5. Strictly DENIED on Vercel Production
  assert.equal(
    isTestAuthSimulationAllowed({
      CYBERTUBE_ENABLE_TEST_AUTH: 'true',
      CYBERTUBE_TEST_AUTH_SECRET: EXPLICIT_TEST_SECRET,
      VERCEL_ENV: 'production',
    }),
    false,
    'Must strictly deny on Vercel Production even if opt-in and secret are provided'
  );

  // 6. Strictly DENIED on Vercel Preview
  assert.equal(
    isTestAuthSimulationAllowed({
      CYBERTUBE_ENABLE_TEST_AUTH: 'true',
      CYBERTUBE_TEST_AUTH_SECRET: EXPLICIT_TEST_SECRET,
      VERCEL_ENV: 'preview',
    }),
    false,
    'Must strictly deny on Vercel Preview even if opt-in and secret are provided'
  );

  // 7. Strictly DENIED on any Vercel deployment (VERCEL === '1')
  assert.equal(
    isTestAuthSimulationAllowed({
      CYBERTUBE_ENABLE_TEST_AUTH: 'true',
      CYBERTUBE_TEST_AUTH_SECRET: EXPLICIT_TEST_SECRET,
      VERCEL: '1',
    }),
    false,
    'Must strictly deny whenever VERCEL === 1'
  );

  // 8. Strictly DENIED on Vercel dev deployment
  assert.equal(
    isTestAuthSimulationAllowed({
      CYBERTUBE_ENABLE_TEST_AUTH: 'true',
      CYBERTUBE_TEST_AUTH_SECRET: EXPLICIT_TEST_SECRET,
      VERCEL_ENV: 'development',
    }),
    false,
    'Must strictly deny on Vercel dev deployment'
  );

  // 9. Allowed ONLY in explicit local test environment with explicit secret
  assert.equal(
    isTestAuthSimulationAllowed({
      CYBERTUBE_ENABLE_TEST_AUTH: 'true',
      CYBERTUBE_TEST_AUTH_SECRET: EXPLICIT_TEST_SECRET,
    }),
    true,
    'Must allow only when explicitly enabled with secret in local test environment'
  );
});

test('Security Hardening — signTestUserPayload throws when secret is missing', async () => {
  const user = { id: 'test-user', email: 'test@local' };
  await assert.rejects(
    async () => {
      await signTestUserPayload(user, '');
    },
    /CYBERTUBE_TEST_AUTH_SECRET must be explicitly provided/,
    'Must throw when secret is missing'
  );
});

test('Security Hardening — verifyAndParseTestUserCookie HMAC integrity and anti-forgery', async () => {
  const localTestEnv = {
    CYBERTUBE_ENABLE_TEST_AUTH: 'true',
    CYBERTUBE_TEST_AUTH_SECRET: EXPLICIT_TEST_SECRET,
  };
  const previewEnv = {
    CYBERTUBE_ENABLE_TEST_AUTH: 'true',
    CYBERTUBE_TEST_AUTH_SECRET: EXPLICIT_TEST_SECRET,
    VERCEL_ENV: 'preview',
  };
  const prodEnv = {
    CYBERTUBE_ENABLE_TEST_AUTH: 'true',
    CYBERTUBE_TEST_AUTH_SECRET: EXPLICIT_TEST_SECRET,
    VERCEL_ENV: 'production',
  };
  const missingSecretEnv = {
    CYBERTUBE_ENABLE_TEST_AUTH: 'true',
  };

  const validUser = {
    id: 'test-user-id-1234',
    email: 'analyst@cybertube.local',
    role: 'authenticated',
  };

  // Valid signature in local test environment parses successfully
  const signedCookie = await signTestUserPayload(validUser, EXPLICIT_TEST_SECRET);
  const parsed = await verifyAndParseTestUserCookie(signedCookie, localTestEnv);
  assert.deepEqual(parsed, validUser, 'Valid signed cookie must parse in local test environment');

  // Forgery Attempt 1: Raw unsigned JSON
  const forgedRawJson = JSON.stringify(validUser);
  assert.equal(
    await verifyAndParseTestUserCookie(forgedRawJson, localTestEnv),
    null,
    'Raw unsigned JSON must be strictly rejected'
  );

  // Forgery Attempt 2: Modified payload after signing (signature mismatch)
  const tamperedCookie = JSON.stringify({
    payload: { ...validUser, id: 'attacker-admin-id' },
    signature: 'badc0ffee1234567890abcdef',
  });
  assert.equal(
    await verifyAndParseTestUserCookie(tamperedCookie, localTestEnv),
    null,
    'Tampered payload with invalid signature must be strictly rejected'
  );

  // Forgery Attempt 3: Valid signed cookie sent to Vercel Preview
  assert.equal(
    await verifyAndParseTestUserCookie(signedCookie, previewEnv),
    null,
    'Signed test cookie must be rejected in Preview'
  );

  // Forgery Attempt 4: Valid signed cookie sent to Vercel Production
  assert.equal(
    await verifyAndParseTestUserCookie(signedCookie, prodEnv),
    null,
    'Signed test cookie must be rejected in Production'
  );

  // Forgery Attempt 5: Missing secret environment
  assert.equal(
    await verifyAndParseTestUserCookie(signedCookie, missingSecretEnv),
    null,
    'Signed test cookie must be rejected when secret is missing'
  );
});

test('Security Hardening — middleware rejects forged test cookies on Preview and Production', async () => {
  const originalVercelEnv = process.env.VERCEL_ENV;
  const originalTestAuth = process.env.CYBERTUBE_ENABLE_TEST_AUTH;
  const originalSecret = process.env.CYBERTUBE_TEST_AUTH_SECRET;

  try {
    const forgedUser = {
      id: 'attacker-root',
      email: 'attacker@evil.com',
      role: 'authenticated',
    };
    const signedCookie = await signTestUserPayload(forgedUser, EXPLICIT_TEST_SECRET);

    // 1. Preview environment test targeting /account
    process.env.VERCEL_ENV = 'preview';
    process.env.CYBERTUBE_ENABLE_TEST_AUTH = 'true';
    process.env.CYBERTUBE_TEST_AUTH_SECRET = EXPLICIT_TEST_SECRET;

    const previewAccountReq = new NextRequest('https://cybertube-preview.vercel.app/account', {
      headers: {
        host: 'cybertube-preview.vercel.app',
        cookie: `cybertube_test_user=${encodeURIComponent(signedCookie)}`,
      },
    });

    const previewAccountRes = await middleware(previewAccountReq);
    assert.equal(previewAccountRes.status, 307, 'Must redirect unauthenticated user to login');
    const previewAccountLocation = previewAccountRes.headers.get('location') || '';
    assert.match(
      previewAccountLocation,
      /\/login\?redirect=%2Faccount/,
      'Preview must reject test cookie for /account'
    );

    // 2. Production environment test targeting /account
    process.env.VERCEL_ENV = 'production';
    delete process.env.CYBERTUBE_ENABLE_TEST_AUTH;

    const prodAccountReq = new NextRequest('https://cybertube-mu.vercel.app/account', {
      headers: {
        host: 'cybertube-mu.vercel.app',
        cookie: `cybertube_test_user=${encodeURIComponent(signedCookie)}`,
      },
    });

    const prodAccountRes = await middleware(prodAccountReq);
    assert.equal(prodAccountRes.status, 307, 'Must redirect unauthenticated user to login');
    const prodAccountLocation = prodAccountRes.headers.get('location') || '';
    assert.match(
      prodAccountLocation,
      /\/login\?redirect=%2Faccount/,
      'Production must reject test cookie for /account'
    );

    // 3. Preview environment test targeting /admin
    process.env.VERCEL_ENV = 'preview';
    const previewAdminReq = new NextRequest('https://cybertube-preview.vercel.app/admin', {
      headers: {
        host: 'cybertube-preview.vercel.app',
        cookie: `cybertube_test_user=${encodeURIComponent(signedCookie)}`,
      },
    });

    const previewAdminRes = await middleware(previewAdminReq);
    assert.equal(previewAdminRes.status, 307, 'Must redirect unauthenticated user to login');
    const previewAdminLocation = previewAdminRes.headers.get('location') || '';
    assert.match(
      previewAdminLocation,
      /\/login\?redirect=%2Fadmin/,
      'Preview must reject test cookie for /admin'
    );

    // 4. Production environment test targeting /admin
    process.env.VERCEL_ENV = 'production';
    const prodAdminReq = new NextRequest('https://cybertube-mu.vercel.app/admin', {
      headers: {
        host: 'cybertube-mu.vercel.app',
        cookie: `cybertube_test_user=${encodeURIComponent(signedCookie)}`,
      },
    });

    const prodAdminRes = await middleware(prodAdminReq);
    assert.equal(prodAdminRes.status, 307, 'Must redirect unauthenticated user to login');
    const prodAdminLocation = prodAdminRes.headers.get('location') || '';
    assert.match(
      prodAdminLocation,
      /\/login\?redirect=%2Fadmin/,
      'Production must reject test cookie for /admin'
    );
  } finally {
    process.env.VERCEL_ENV = originalVercelEnv;
    process.env.CYBERTUBE_ENABLE_TEST_AUTH = originalTestAuth;
    process.env.CYBERTUBE_TEST_AUTH_SECRET = originalSecret;
  }
});

function createMockJwt(userId: string = 'test-user-id', expiresInSec: number = 3600): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(
    JSON.stringify({
      sub: userId,
      role: 'authenticated',
      aud: 'authenticated',
      exp: Math.floor(Date.now() / 1000) + expiresInSec,
    })
  ).toString('base64url');
  return `${header}.${payload}.mock-sig`;
}

test('Security Hardening — Supabase JS SDK current-password enforcement & payload verification', async () => {
  let interceptedPayload: any = null;
  const mockFetch: typeof fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const urlStr = String(input);
    if (urlStr.includes('/auth/v1/user') && init?.method === 'GET') {
      return new Response(
        JSON.stringify({
          id: 'test-user-id',
          email: 'analyst@cybertube.local',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
    if (urlStr.includes('/auth/v1/user') && init?.method === 'PUT') {
      interceptedPayload = JSON.parse(String(init.body));
      if (interceptedPayload.current_password === 'WrongCurrentPass!') {
        return new Response(
          JSON.stringify({
            code: 'invalid_credentials',
            message: 'Invalid current password',
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
      return new Response(
        JSON.stringify({
          id: 'test-user-id',
          email: 'analyst@cybertube.local',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
    return new Response('Not Found', { status: 404 });
  };

  const client = createClient('https://mock-proj.supabase.co', 'mock-anon-key', {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      fetch: mockFetch,
    },
  });

  // Populate active authenticated session with valid JWT structure
  await client.auth.setSession({
    access_token: createMockJwt('test-user-id', 3600),
    refresh_token: 'valid-refresh-token',
  });

  // 1. Verify invalid current_password is rejected by GoTrue
  const { data: failData, error: failError } = await client.auth.updateUser({
    password: 'NewSecurePassword123!',
    current_password: 'WrongCurrentPass!',
  });
  assert.equal(failData.user, null);
  assert.ok(failError);
  assert.equal(failError?.message, 'Invalid current password');
  assert.equal(interceptedPayload.current_password, 'WrongCurrentPass!');

  // 2. Verify valid current_password passes correct payload
  const { data: okData, error: okError } = await client.auth.updateUser({
    password: 'NewSecurePassword123!',
    current_password: 'ValidCurrentPass123!',
    data: { password_changed_at: '2026-11-06T12:00:00Z' },
  });
  assert.equal(okError, null);
  assert.ok(okData.user);
  assert.equal(interceptedPayload.current_password, 'ValidCurrentPass123!');
  assert.equal(interceptedPayload.data.password_changed_at, '2026-11-06T12:00:00Z');
});

test('Security Hardening — OAuth reauthentication: stale session (>24h) and incorrect OTP reject password update', async () => {
  let interceptedNonce: string | null = null;
  const mockFetch: typeof fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const urlStr = String(input);

    if (urlStr.includes('/auth/v1/user') && init?.method === 'GET') {
      return new Response(
        JSON.stringify({
          id: 'test-oauth-user',
          email: 'oauth.practitioner@cybertube.local',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Expired reauthentication check
    if (urlStr.includes('/auth/v1/reauthenticate')) {
      const authHeader = (init?.headers as any)?.Authorization || '';
      if (authHeader.includes('stale-token-24h')) {
        return new Response(
          JSON.stringify({
            code: 'session_expired',
            message: 'Auth session missing!',
          }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }
      return new Response(JSON.stringify({}), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Password update with OTP nonce check
    if (urlStr.includes('/auth/v1/user') && init?.method === 'PUT') {
      const body = JSON.parse(String(init.body));
      interceptedNonce = body.nonce || null;

      if (body.nonce === '000000' || body.nonce === 'wrong-otp') {
        return new Response(
          JSON.stringify({
            code: 'invalid_otp',
            message: 'Invalid or expired OTP',
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
      return new Response(
        JSON.stringify({
          id: 'test-oauth-user',
          email: 'oauth.practitioner@cybertube.local',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
    return new Response('Not Found', { status: 404 });
  };

  const client = createClient('https://mock-proj.supabase.co', 'mock-anon-key', {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      fetch: mockFetch,
    },
  });

  // Populate active authenticated session with valid JWT structure
  await client.auth.setSession({
    access_token: createMockJwt('test-oauth-user', 3600),
    refresh_token: 'valid-oauth-refresh',
  });

  // 1. Stale session (>24h) attempting reauthenticate
  const staleClient = createClient('https://mock-proj.supabase.co', 'mock-anon-key', {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: { Authorization: 'Bearer stale-token-24h' },
      fetch: mockFetch,
    },
  });

  const { error: staleReauthError } = await staleClient.auth.reauthenticate();
  assert.ok(staleReauthError);
  assert.equal(staleReauthError.message, 'Auth session missing!');

  // 2. Incorrect OTP nonce cannot update password
  const { data: wrongOtpData, error: wrongOtpError } = await client.auth.updateUser({
    password: 'NewStrongOAuthPass999!',
    nonce: '000000',
  });
  assert.equal(wrongOtpData.user, null, 'User must be null when OTP is invalid');
  assert.ok(wrongOtpError, 'Error must be returned for invalid OTP');
  assert.equal(wrongOtpError.message, 'Invalid or expired OTP');
  assert.equal(interceptedNonce, '000000');

  // 3. Valid OTP nonce succeeds
  const { data: okOtpData, error: okOtpError } = await client.auth.updateUser({
    password: 'NewStrongOAuthPass999!',
    nonce: '123456',
  });
  assert.equal(okOtpError, null);
  assert.ok(okOtpData.user);
  assert.equal(interceptedNonce, '123456');
});
