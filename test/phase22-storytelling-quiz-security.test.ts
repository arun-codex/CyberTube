import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { NextRequest } from 'next/server';

// Pre-stub server-only in require cache
try {
  const serverOnlyPath = require.resolve('server-only');
  require.cache[serverOnlyPath] = {
    exports: {},
    id: serverOnlyPath,
    filename: serverOnlyPath,
    loaded: true,
    children: [],
    paths: [],
  } as any;
} catch {}

import {
  STORYTELLING_COURSE_UUID,
  getStorytellingModuleUuid,
} from '../src/lib/courses/storytelling-uuid-map';

test('1. Migration SQL security & RLS policies for user_quiz_attempts', () => {
  const correctiveMigrationPath = path.join(
    process.cwd(),
    'supabase/migrations/20261114010000_secure_user_quiz_attempts_rls.sql'
  );
  assert.ok(fs.existsSync(correctiveMigrationPath), 'Corrective migration must exist');

  const sql = fs.readFileSync(correctiveMigrationPath, 'utf-8');

  // Must drop insecure client INSERT policy
  assert.ok(
    sql.includes('DROP POLICY IF EXISTS "Users can record their own quiz attempts"'),
    'Must drop the client insert policy'
  );

  // Must revoke INSERT, UPDATE, DELETE from authenticated
  assert.ok(
    sql.includes('REVOKE INSERT, UPDATE, DELETE ON TABLE public.user_quiz_attempts FROM authenticated;'),
    'Must revoke INSERT, UPDATE, DELETE from authenticated'
  );

  // Must revoke ALL from anon
  assert.ok(
    sql.includes('REVOKE ALL ON TABLE public.user_quiz_attempts FROM anon;'),
    'Must revoke ALL from anon'
  );

  // Must grant SELECT to authenticated
  assert.ok(
    sql.includes('GRANT SELECT ON TABLE public.user_quiz_attempts TO authenticated;'),
    'Must grant SELECT to authenticated'
  );

  // Must grant ALL to service_role (privileged server)
  assert.ok(
    sql.includes('GRANT ALL ON TABLE public.user_quiz_attempts TO service_role;'),
    'Must grant ALL to service_role'
  );

  // Check constraint on correct_count <= total_questions
  assert.ok(
    sql.includes('chk_user_quiz_attempts_correct_count_limit'),
    'Must enforce correct_count <= total_questions constraint'
  );
});

test('2. Client-side CloudCourseProgressService no longer issues client direct INSERT for quiz attempts', async () => {
  const { CloudCourseProgressService } = await import('../src/lib/cloud-course-progress');

  let directInsertAttempted = false;
  const mockClient = {
    auth: {
      getUser: async () => ({
        data: { user: { id: '11111111-1111-4111-8111-111111111111' } },
        error: null,
      }),
    },
    from: (table: string) => {
      if (table === 'user_quiz_attempts') {
        return {
          insert: () => {
            directInsertAttempted = true;
            return Promise.resolve({ error: null });
          },
        };
      }
      return {
        select: () => ({ eq: () => ({ order: () => Promise.resolve({ data: [] }) }) }),
      };
    },
  };

  const service = new CloudCourseProgressService(mockClient as any);

  // Calling recordQuizAttempt should NOT call mockClient.from('user_quiz_attempts').insert()
  service.recordQuizAttempt('course-free-storytelling-masterclass', 'mod-storytelling-w01', {
    score: 100,
    passed: true,
  });

  assert.equal(
    directInsertAttempted,
    false,
    'recordQuizAttempt must not attempt direct client-side INSERT to user_quiz_attempts'
  );

  // Calling persistQuizAttemptToCloud should also be a safe no-op
  await service.persistQuizAttemptToCloud('course-free-storytelling-masterclass', 'mod-storytelling-w01', {
    score: 100,
    passed: true,
  });

  assert.equal(
    directInsertAttempted,
    false,
    'persistQuizAttemptToCloud must be disabled / no-op'
  );
});

test('3. Server submission route enforces fail-closed prerequisite check when unpassed or database error', async () => {
  const submitRouteMod = await import('../app/api/courses/storytelling/quiz/submit/route');
  const POST = submitRouteMod.POST;

  const adminMod = await import('../src/lib/supabase/admin');
  const serverAuthMod = await import('../src/lib/supabase/server');

  const testUserId = 'test-user-1234-uuid';
  serverAuthMod.setAuthenticatedUserForTesting({ id: testUserId, email: 'test@example.com' });

  // Case A: Missing database client -> 503 fail closed
  adminMod.setAdminClientForTesting(null);

  const reqMissingDb = new NextRequest('http://localhost:3000/api/courses/storytelling/quiz/submit', {
    method: 'POST',
    body: JSON.stringify({
      courseId: STORYTELLING_COURSE_UUID,
      moduleId: 'mod-storytelling-w02',
      selectedAnswers: {},
    }),
  });

  const resMissingDb = await POST(reqMissingDb);
  assert.equal(resMissingDb.status, 503, 'Must return 503 when admin database client is unavailable');

  // Case B: Database error when querying prerequisite -> 503 fail closed
  adminMod.setAdminClientForTesting({
    from: () => ({
      select: () => ({
        eq: () => ({
          eq: () => ({
            eq: () => ({
              eq: () => Promise.resolve({ data: null, error: { message: 'Connection timeout' } }),
            }),
          }),
        }),
      }),
    }),
  });

  const reqDbError = new NextRequest('http://localhost:3000/api/courses/storytelling/quiz/submit', {
    method: 'POST',
    body: JSON.stringify({
      courseId: STORYTELLING_COURSE_UUID,
      moduleId: 'mod-storytelling-w02',
      selectedAnswers: {},
    }),
  });

  const resDbError = await POST(reqDbError);
  assert.equal(resDbError.status, 503, 'Must return 503 when prerequisite query encounters database error');

  // Case C: No passed prerequisite record in database -> 403 Forbidden
  adminMod.setAdminClientForTesting({
    from: () => ({
      select: () => ({
        eq: () => ({
          eq: () => ({
            eq: () => ({
              eq: () => Promise.resolve({ data: [], error: null }),
            }),
          }),
        }),
      }),
    }),
  });

  const reqUnpassed = new NextRequest('http://localhost:3000/api/courses/storytelling/quiz/submit', {
    method: 'POST',
    body: JSON.stringify({
      courseId: STORYTELLING_COURSE_UUID,
      moduleId: 'mod-storytelling-w02',
      selectedAnswers: {},
    }),
  });

  const resUnpassed = await POST(reqUnpassed);
  assert.equal(resUnpassed.status, 403, 'Must return 403 when prerequisite week is not passed');
  const bodyUnpassed = await resUnpassed.json();
  assert.ok(bodyUnpassed.error.includes('Prerequisite unfulfilled'), 'Error message must specify prerequisite');

  // Restore mocks
  serverAuthMod.setAuthenticatedUserForTesting(null);
  adminMod.setAdminClientForTesting(null);
});

test('4. Server submission route persists trusted attempt and succeeds after passing prerequisite', async () => {
  const submitRouteMod = await import('../app/api/courses/storytelling/quiz/submit/route');
  const POST = submitRouteMod.POST;

  const adminMod = await import('../src/lib/supabase/admin');
  const serverAuthMod = await import('../src/lib/supabase/server');

  const testUserId = 'test-user-1234-uuid';
  serverAuthMod.setAuthenticatedUserForTesting({ id: testUserId, email: 'test@example.com' });

  let insertedRecord: any = null;

  adminMod.setAdminClientForTesting({
    from: (table: string) => {
      assert.equal(table, 'user_quiz_attempts');
      return {
        select: (cols: string) => ({
          eq: () => ({
            eq: () => ({
              eq: () => ({
                // Simulates passing attempt for Week 1
                eq: () => Promise.resolve({ data: [{ passed: true, score: 90, verified_by_server: true }], error: null }),
              }),
            }),
          }),
        }),
        insert: (payload: any) => {
          insertedRecord = payload;
          return {
            select: () => ({
              single: () => Promise.resolve({ data: { id: 'attempt-uuid-777' }, error: null }),
            }),
          };
        },
      };
    },
  });

  const reqWeek2 = new NextRequest('http://localhost:3000/api/courses/storytelling/quiz/submit', {
    method: 'POST',
    body: JSON.stringify({
      courseId: STORYTELLING_COURSE_UUID,
      moduleId: 'mod-storytelling-w02',
      selectedAnswers: {},
    }),
  });

  const resWeek2 = await POST(reqWeek2);
  assert.equal(resWeek2.status, 200, 'Must return 200 after prerequisite is verified');
  const bodyWeek2 = await resWeek2.json();
  assert.equal(bodyWeek2.success, true);
  assert.equal(bodyWeek2.attemptId, 'attempt-uuid-777');
  assert.ok(bodyWeek2.submittedAt, 'Response must include submittedAt timestamp');

  // Verify server-calculated record
  assert.ok(insertedRecord, 'Admin client must have inserted trusted record');
  assert.equal(insertedRecord.user_id, testUserId, 'Owner must be authenticated user ID');
  assert.equal(insertedRecord.module_id, getStorytellingModuleUuid(2), 'Module ID must match Week 2 UUID');
  assert.equal(insertedRecord.score, 0, 'Score must be calculated by server evaluator');
  assert.equal(insertedRecord.passed, false);

  // Restore mocks
  serverAuthMod.setAuthenticatedUserForTesting(null);
  adminMod.setAdminClientForTesting(null);
});

test('5. Idempotency mechanism deduplicates repeated quiz submissions and returns existing record', async () => {
  const submitRouteMod = await import('../app/api/courses/storytelling/quiz/submit/route');
  const POST = submitRouteMod.POST;

  const adminMod = await import('../src/lib/supabase/admin');
  const serverAuthMod = await import('../src/lib/supabase/server');

  const testUserId = 'test-user-idempotency-uuid';
  serverAuthMod.setAuthenticatedUserForTesting({ id: testUserId, email: 'test@example.com' });

  let insertCount = 0;
  const existingAttempt = {
    id: 'attempt-idempotent-111',
    user_id: testUserId,
    course_id: STORYTELLING_COURSE_UUID,
    module_id: getStorytellingModuleUuid(1),
    score: 85,
    correct_count: 8,
    total_questions: 10,
    passed: true,
    submitted_at: '2026-11-14T10:00:00.000Z',
    idempotency_key: 'idem-key-abc-123',
    verified_by_server: true,
  };

  adminMod.setAdminClientForTesting({
    from: (table: string) => {
      assert.equal(table, 'user_quiz_attempts');
      return {
        select: () => ({
          eq: (_col1: string, _val1: string) => ({
            eq: (_col2: string, keyVal: string) => ({
              maybeSingle: () => {
                if (keyVal === 'idem-key-abc-123') {
                  return Promise.resolve({ data: existingAttempt, error: null });
                }
                return Promise.resolve({ data: null, error: null });
              },
            }),
          }),
        }),
        insert: () => {
          insertCount += 1;
          return {
            select: () => ({
              single: () => Promise.resolve({ data: { id: 'new-attempt-uuid' }, error: null }),
            }),
          };
        },
      };
    },
  });

  const reqRepeated = new NextRequest('http://localhost:3000/api/courses/storytelling/quiz/submit', {
    method: 'POST',
    body: JSON.stringify({
      courseId: STORYTELLING_COURSE_UUID,
      moduleId: 'mod-storytelling-w01',
      selectedAnswers: {},
      idempotencyKey: 'idem-key-abc-123',
    }),
  });

  const resRepeated = await POST(reqRepeated);
  assert.equal(resRepeated.status, 200);
  const bodyRepeated = await resRepeated.json();

  assert.equal(bodyRepeated.success, true);
  assert.equal(bodyRepeated.isDuplicateSubmission, true, 'Must flag as duplicate submission');
  assert.equal(bodyRepeated.attemptId, 'attempt-idempotent-111', 'Must return original attempt ID');
  assert.equal(bodyRepeated.score, 85, 'Must return original score');
  assert.equal(insertCount, 0, 'Must NOT perform a second INSERT when idempotency key matches');

  // Restore mocks
  serverAuthMod.setAuthenticatedUserForTesting(null);
  adminMod.setAdminClientForTesting(null);
});

test('6. Unverified historical records (verified_by_server = false) are rejected during progression checks', async () => {
  const submitRouteMod = await import('../app/api/courses/storytelling/quiz/submit/route');
  const POST = submitRouteMod.POST;

  const adminMod = await import('../src/lib/supabase/admin');
  const serverAuthMod = await import('../src/lib/supabase/server');

  const testUserId = 'test-user-unverified-uuid';
  serverAuthMod.setAuthenticatedUserForTesting({ id: testUserId, email: 'test@example.com' });

  adminMod.setAdminClientForTesting({
    from: (table: string) => {
      assert.equal(table, 'user_quiz_attempts');
      return {
        select: () => ({
          eq: () => ({
            eq: () => ({
              eq: () => ({
                // Unverified historical attempt: passed=true, but verified_by_server=false
                eq: () => Promise.resolve({
                  data: [
                    { passed: true, score: 100, verified_by_server: false },
                    { passed: true, score: 100 }, // Missing provenance must also fail closed.
                  ],
                  error: null,
                }),
              }),
            }),
          }),
        }),
      };
    },
  });

  const reqWeek2 = new NextRequest('http://localhost:3000/api/courses/storytelling/quiz/submit', {
    method: 'POST',
    body: JSON.stringify({
      courseId: STORYTELLING_COURSE_UUID,
      moduleId: 'mod-storytelling-w02',
      selectedAnswers: {},
    }),
  });

  const resWeek2 = await POST(reqWeek2);
  assert.equal(resWeek2.status, 403, 'Must reject unverified historical record with 403');
  const bodyWeek2 = await resWeek2.json();
  assert.ok(bodyWeek2.error.includes('Prerequisite unfulfilled'));

  // Restore mocks
  serverAuthMod.setAuthenticatedUserForTesting(null);
  adminMod.setAdminClientForTesting(null);
});
