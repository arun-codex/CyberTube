import { NextRequest, NextResponse } from 'next/server';
import { gradeStorytellingQuiz } from '@/lib/courses/storytelling-quiz-evaluator';
import { getAuthenticatedUser } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import {
  STORYTELLING_COURSE_UUID,
  STORYTELLING_COURSE_ID,
  STORYTELLING_COURSE_SLUG,
  STORYTELLING_MODULE_ID_TO_UUID,
  getStorytellingModuleUuid,
} from '@/lib/courses/storytelling-uuid-map';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { courseId, moduleId, selectedAnswers, idempotencyKey } = body;

    const acceptedCourseIds = new Set([
      STORYTELLING_COURSE_UUID,
      STORYTELLING_COURSE_ID,
      STORYTELLING_COURSE_SLUG,
    ]);
    if (
      courseId !== undefined &&
      (typeof courseId !== 'string' || !acceptedCourseIds.has(courseId))
    ) {
      return NextResponse.json(
        { error: 'Invalid courseId: this endpoint only accepts the Storytelling Masterclass course.' },
        { status: 400 }
      );
    }

    if (!moduleId || typeof moduleId !== 'string') {
      return NextResponse.json(
        { error: 'Invalid payload: moduleId is required.' },
        { status: 400 }
      );
    }

    if (
      !selectedAnswers ||
      typeof selectedAnswers !== 'object' ||
      Array.isArray(selectedAnswers)
    ) {
      return NextResponse.json(
        { error: 'Invalid payload: selectedAnswers must be a JSON object.' },
        { status: 400 }
      );
    }

    // Idempotency keys are opaque client-generated identifiers. Never truncate:
    // truncation can collapse two distinct requests into the same database key.
    if (
      idempotencyKey !== undefined &&
      (typeof idempotencyKey !== 'string' ||
        idempotencyKey.trim().length === 0 ||
        idempotencyKey.length > 128)
    ) {
      return NextResponse.json(
        { error: 'Invalid idempotencyKey: provide a non-empty string of at most 128 characters.' },
        { status: 400 }
      );
    }

    // Determine week number from module ID (e.g. mod-storytelling-w02 -> 2)
    const weekMatch = moduleId.match(/w(\d{2})$/);
    if (!weekMatch) {
      return NextResponse.json(
        { error: `Unrecognized module format: ${moduleId}` },
        { status: 400 }
      );
    }
    const currentWeekNum = parseInt(weekMatch[1], 10);
    if (currentWeekNum < 1 || currentWeekNum > 20) {
      return NextResponse.json(
        { error: `Invalid week number: ${currentWeekNum}. Must be between 1 and 20.` },
        { status: 400 }
      );
    }

    // Resolve current module database UUID
    const currentModuleUuid =
      STORYTELLING_MODULE_ID_TO_UUID[moduleId] || getStorytellingModuleUuid(currentWeekNum);
    if (!currentModuleUuid) {
      return NextResponse.json(
        { error: `Unknown course module: ${moduleId}` },
        { status: 400 }
      );
    }

    // Get authenticated user and privileged server admin client.
    const user = await getAuthenticatedUser();
    const adminSupabase = createAdminClient();

    if (user && !adminSupabase) {
      return NextResponse.json(
        {
          error:
            'Database service unavailable: Privileged database configuration is required for authenticated quiz submissions.',
        },
        { status: 503 }
      );
    }

    // Idempotency lookup is scoped and validated before progression checks. A key
    // reused for another course/module is a conflict, never a successful replay.
    if (user && adminSupabase && idempotencyKey !== undefined) {
      const { data: existingIdempotent, error: idempotencyLookupError } = await (adminSupabase
        .from('user_quiz_attempts') as any)
        .select('*')
        .eq('user_id', user.id)
        .eq('idempotency_key', idempotencyKey)
        .maybeSingle();

      if (idempotencyLookupError) {
        console.error('Failed to check quiz idempotency key:', idempotencyLookupError);
        return NextResponse.json(
          { error: 'Database service error: Unable to verify quiz submission retry.' },
          { status: 503 }
        );
      }

      if (existingIdempotent) {
        if (
          existingIdempotent.course_id !== STORYTELLING_COURSE_UUID ||
          existingIdempotent.module_id !== currentModuleUuid
        ) {
          return NextResponse.json(
            { error: 'Idempotency key was already used for a different course or module.' },
            { status: 409 }
          );
        }

        if (existingIdempotent.verified_by_server !== true) {
          return NextResponse.json(
            { error: 'The existing attempt is not a verified server submission.' },
            { status: 409 }
          );
        }

        return NextResponse.json({
          success: true,
          courseId: courseId || 'course-free-storytelling-masterclass',
          week: currentWeekNum,
          moduleId,
          attemptId: existingIdempotent.id,
          submittedAt: existingIdempotent.submitted_at,
          score: existingIdempotent.score,
          correctCount: existingIdempotent.correct_count,
          totalQuestions: existingIdempotent.total_questions,
          passed: existingIdempotent.passed,
          isDuplicateSubmission: true,
          evaluatedAt: existingIdempotent.submitted_at,
        });
      }
    }

    // FAIL-CLOSED SERVER-SIDE PROGRESSION ENFORCEMENT.
    // Missing provenance columns, query failures, and unverified records must
    // never be interpreted as successful prerequisites.
    if (user && adminSupabase && currentWeekNum > 1) {
      const prevWeekNum = currentWeekNum - 1;
      const prevModuleUuid = getStorytellingModuleUuid(prevWeekNum);

      const { data: prevAttempts, error: checkError } = await (adminSupabase
        .from('user_quiz_attempts') as any)
        .select('passed, score, verified_by_server')
        .eq('user_id', user.id)
        .eq('course_id', STORYTELLING_COURSE_UUID)
        .eq('module_id', prevModuleUuid)
        .eq('passed', true);

      if (checkError) {
        console.error('Failed to query prerequisite attempts from database:', checkError);
        return NextResponse.json(
          { error: 'Database service error: Unable to verify prerequisite completion.' },
          { status: 503 }
        );
      }

      const hasVerifiedPassingAttempt = (prevAttempts || []).some(
        (attempt: any) =>
          attempt.passed === true && attempt.verified_by_server === true
      );

      if (!hasVerifiedPassingAttempt) {
        return NextResponse.json(
          {
            error: `Prerequisite unfulfilled: You must complete and pass the Week ${prevWeekNum} quiz assessment (≥ 70%) before attempting Week ${currentWeekNum}.`,
            prerequisiteRequired: true,
            requiredWeek: prevWeekNum,
          },
          { status: 403 }
        );
      }
    }

    // Server-side trusted evaluation using secret answer keys
    // Only executed after prerequisite checks pass!
    const result = gradeStorytellingQuiz(moduleId, selectedAnswers);

    let savedAttemptId: string | null = null;
    const submittedAtIso = new Date().toISOString();

    // SERVER-ONLY TRUSTED PERSISTENCE:
    // Save exactly one trusted attempt per submission using the privileged admin client
    if (user && adminSupabase) {
      const attemptPayload: Record<string, any> = {
        user_id: user.id,
        course_id: STORYTELLING_COURSE_UUID,
        module_id: currentModuleUuid,
        score: result.score,
        correct_count: result.correctCount,
        total_questions: result.totalQuestions,
        passed: result.passed,
        verified_by_server: true,
        submitted_at: submittedAtIso,
      };

      if (idempotencyKey !== undefined) {
        attemptPayload.idempotency_key = idempotencyKey;
      }

      const { data: insertedData, error: insertError } = await (adminSupabase
        .from('user_quiz_attempts') as any)
        .insert(attemptPayload)
        .select('id')
        .single();

      if (insertError) {
        // If concurrent requests race on the unique key, return the original
        // attempt only when its course/module/provenance exactly match this request.
        if (insertError.code === '23505' && idempotencyKey !== undefined) {
          const { data: duplicate, error: duplicateLookupError } = await (adminSupabase
            .from('user_quiz_attempts') as any)
            .select('id, course_id, module_id, score, correct_count, total_questions, passed, submitted_at, verified_by_server')
            .eq('user_id', user.id)
            .eq('idempotency_key', idempotencyKey)
            .maybeSingle();

          if (duplicateLookupError) {
            console.error('Failed to resolve concurrent quiz submission:', duplicateLookupError);
            return NextResponse.json(
              { error: 'Database service error: Unable to verify concurrent quiz submission.' },
              { status: 503 }
            );
          }

          if (
            duplicate &&
            duplicate.course_id === STORYTELLING_COURSE_UUID &&
            duplicate.module_id === currentModuleUuid &&
            duplicate.verified_by_server === true
          ) {
            return NextResponse.json({
              success: true,
              courseId: courseId || 'course-free-storytelling-masterclass',
              week: currentWeekNum,
              moduleId,
              attemptId: duplicate.id,
              submittedAt: duplicate.submitted_at,
              score: duplicate.score,
              correctCount: duplicate.correct_count,
              totalQuestions: duplicate.total_questions,
              passed: duplicate.passed,
              isDuplicateSubmission: true,
              evaluatedAt: duplicate.submitted_at,
            });
          }

          if (duplicate) {
            return NextResponse.json(
              { error: 'Idempotency key was already used for a different course or module.' },
              { status: 409 }
            );
          }
        }

        console.error('Failed to persist trusted quiz attempt to database:', insertError);
        return NextResponse.json(
          {
            error:
              'Persistence error: Could not record trusted quiz attempt in the database.',
          },
          { status: 500 }
        );
      }

      savedAttemptId = insertedData?.id || null;
    }

    return NextResponse.json({
      success: true,
      courseId: courseId || 'course-free-storytelling-masterclass',
      week: currentWeekNum,
      attemptId: savedAttemptId,
      submittedAt: submittedAtIso,
      ...result,
      evaluatedAt: submittedAtIso,
    });
  } catch (error: any) {
    console.error('Error evaluating storytelling quiz submission:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server error while evaluating quiz' },
      { status: 500 }
    );
  }
}

