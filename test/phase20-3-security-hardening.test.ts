import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  isTestAuthSimulationAllowed,
  signTestUserPayload,
  verifyAndParseTestUserCookie,
  DEFAULT_LOCAL_TEST_SECRET,
} from '../src/lib/testAuthGuard';
import { NextRequest } from 'next/server';
import { middleware } from '../middleware';

test('Security Hardening — isTestAuthSimulationAllowed fail-closed rules', () => {
  // 1. Default without env is strictly DENIED
  assert.equal(isTestAuthSimulationAllowed({}), false, 'Empty env must fail closed');

  // 2. Denied when CYBERTUBE_ENABLE_TEST_AUTH is not 'true'
  assert.equal(
    isTestAuthSimulationAllowed({ CYBERTUBE_ENABLE_TEST_AUTH: 'false' }),
    false,
    'Must deny when CYBERTUBE_ENABLE_TEST_AUTH is false'
  );

  // 3. Strictly DENIED on Vercel Production
  assert.equal(
    isTestAuthSimulationAllowed({
      CYBERTUBE_ENABLE_TEST_AUTH: 'true',
      VERCEL_ENV: 'production',
    }),
    false,
    'Must strictly deny on Vercel Production even if opt-in is passed'
  );

  // 4. Strictly DENIED on Vercel Preview
  assert.equal(
    isTestAuthSimulationAllowed({
      CYBERTUBE_ENABLE_TEST_AUTH: 'true',
      VERCEL_ENV: 'preview',
    }),
    false,
    'Must strictly deny on Vercel Preview even if opt-in is passed'
  );

  // 5. Strictly DENIED on any Vercel deployment (VERCEL === '1')
  assert.equal(
    isTestAuthSimulationAllowed({
      CYBERTUBE_ENABLE_TEST_AUTH: 'true',
      VERCEL: '1',
    }),
    false,
    'Must strictly deny whenever VERCEL === 1'
  );

  // 6. Strictly DENIED on Vercel dev deployment
  assert.equal(
    isTestAuthSimulationAllowed({
      CYBERTUBE_ENABLE_TEST_AUTH: 'true',
      VERCEL_ENV: 'development',
    }),
    false,
    'Must strictly deny on Vercel dev deployment'
  );

  // 7. Allowed ONLY in explicit local test environment
  assert.equal(
    isTestAuthSimulationAllowed({
      CYBERTUBE_ENABLE_TEST_AUTH: 'true',
    }),
    true,
    'Must allow only when explicitly enabled in local test environment'
  );
});

test('Security Hardening — verifyAndParseTestUserCookie HMAC integrity and anti-forgery', async () => {
  const localTestEnv = { CYBERTUBE_ENABLE_TEST_AUTH: 'true' };
  const previewEnv = { CYBERTUBE_ENABLE_TEST_AUTH: 'true', VERCEL_ENV: 'preview' };
  const prodEnv = { CYBERTUBE_ENABLE_TEST_AUTH: 'true', VERCEL_ENV: 'production' };

  const validUser = {
    id: 'test-user-id-1234',
    email: 'analyst@cybertube.local',
    role: 'authenticated',
  };

  // Valid signature in local test environment parses successfully
  const signedCookie = await signTestUserPayload(validUser);
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
});

test('Security Hardening — middleware rejects forged test cookies on Preview and Production', async () => {
  const originalVercelEnv = process.env.VERCEL_ENV;
  const originalTestAuth = process.env.CYBERTUBE_ENABLE_TEST_AUTH;

  try {
    const forgedUser = {
      id: 'attacker-root',
      email: 'attacker@evil.com',
      role: 'authenticated',
    };
    const signedCookie = await signTestUserPayload(forgedUser);

    // 1. Preview environment test targeting /account
    process.env.VERCEL_ENV = 'preview';
    process.env.CYBERTUBE_ENABLE_TEST_AUTH = 'true'; // Attacker attempts to spoof env flag

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
  }
});

