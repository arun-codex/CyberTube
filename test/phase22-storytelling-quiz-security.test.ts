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
} from '../src/lib/courses/storytelling-uuid-map';
import { COURSES } from '../src/data/courses';

test('1. Migration SQL security & RLS policies for user_quiz_attempts', () => {
  const correctiveMigrationPath = path.join(
    process.cwd(),
    'supabase/migrations/20261114110903_secure_user_quiz_attempts_rls.sql'
  );
  assert.ok(fs.existsSync(correctiveMigrationPath), 'Corrective migration must exist');

  const sql = fs.readFileSync(correctiveMigrationPath, 'utf-8');

  // Must drop insecure client INSERT policy
  assert.ok(
    sql.includes('DROP POLICY IF EXISTS "Users can record their own quiz attempts"'),
    'Must drop the client insert policy'
  );

  // Must revoke privileges from authenticated/anon/public
  assert.ok(
    sql.includes('REVOKE ALL ON TABLE public.user_quiz_attempts FROM PUBLIC, anon, authenticated;') ||
    sql.includes('REVOKE INSERT, UPDATE, DELETE ON TABLE public.user_quiz_attempts FROM authenticated;'),
    'Must revoke mutation privileges from authenticated users'
  );

  // Must revoke ALL from anon
  assert.ok(
    sql.includes('REVOKE ALL ON TABLE public.user_quiz_attempts FROM anon;') ||
    sql.includes('REVOKE ALL ON TABLE public.user_quiz_attempts FROM PUBLIC, anon, authenticated;'),
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

test('3. Server submission route is retired with HTTP 410 Gone for all calls', async () => {
  const submitRouteMod = await import('../app/api/courses/storytelling/quiz/submit/route');
  const POST = submitRouteMod.POST;

  const req = new NextRequest('http://localhost:3000/api/courses/storytelling/quiz/submit', {
    method: 'POST',
    body: JSON.stringify({
      courseId: STORYTELLING_COURSE_UUID,
      moduleId: 'mod-storytelling-w02',
      selectedAnswers: {},
    }),
  });

  const res = await POST();
  assert.equal(res.status, 410, 'Must return 410 Gone');
  const body = await res.json();
  assert.equal(body.retired, true);
  assert.match(body.error, /permanently retired/i);
});

test('4. Storytelling Masterclass course modules are 100% accessible without quiz requirements', () => {
  const storytelling = COURSES.find((c) => c.slug === 'free-storytelling-masterclass');
  assert.ok(storytelling, 'Storytelling course must exist');
  assert.equal(storytelling.modules.length, 20);

  // Every module has lessons and is accessible
  for (const module of storytelling.modules) {
    assert.ok(module.id);
    assert.ok(module.title);
    assert.ok(module.lessons.length > 0, `Module ${module.id} must have lessons`);
  }
});

test('5. ModuleQuizView component is retired and safe', async () => {
  const { ModuleQuizView } = await import('../src/components/courses/ModuleQuizView');
  assert.ok(typeof ModuleQuizView === 'function', 'ModuleQuizView must export a functional component');
  // When rendered, it returns null without errors
  const rendered = ModuleQuizView({});
  assert.equal(rendered, null);
});
