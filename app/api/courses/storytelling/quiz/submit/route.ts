import { NextRequest, NextResponse } from 'next/server';
import { gradeStorytellingQuiz } from '@/lib/courses/storytelling-quiz-evaluator';
import { getAuthenticatedUser } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import {
  STORYTELLING_COURSE_UUID,
  STORYTELLING_MODULE_ID_TO_UUID,
  getStorytellingModuleUuid,
} from '@/lib/courses/storytelling-uuid-map';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { courseId, moduleId, selectedAnswers } = body;

    if (!moduleId || typeof moduleId !== 'string') {
      return NextResponse.json(
        { error: 'Invalid payload: moduleId is required.' },
        { status: 400 }
      );
    }

    if (!selectedAnswers || typeof selectedAnswers !== 'object') {
      return NextResponse.json(
        { error: 'Invalid payload: selectedAnswers object is required.' },
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

    // Get authenticated user and privileged server admin client
    const user = await getAuthenticatedUser();
    const adminSupabase = createAdminClient();

    // FAIL-CLOSED SERVER-SIDE PROGRESSION ENFORCEMENT:
    // If the learner is authenticated and attempting Week N (N > 1):
    // 1. Fail closed: If privileged database configuration is missing, do not proceed or skip enforcement.
    // 2. Query trusted server-written quiz attempts for Week N-1.
    // 3. Require passed = true.
    // 4. If query fails with database error, return HTTP 503.
    // 5. If no passed record, return HTTP 403.
    if (user) {
      if (!adminSupabase) {
        return NextResponse.json(
          {
            error:
              'Database service unavailable: Privileged database configuration is required for authenticated progression verification.',
          },
          { status: 503 }
        );
      }

      if (currentWeekNum > 1) {
        const prevWeekNum = currentWeekNum - 1;
        const prevModuleUuid = getStorytellingModuleUuid(prevWeekNum);

        const { data: prevAttempts, error: checkError } = await (adminSupabase
          .from('user_quiz_attempts') as any)
          .select('passed, score')
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

        if (!prevAttempts || prevAttempts.length === 0) {
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
    }

    // Server-side trusted evaluation using secret answer keys
    // Only executed after prerequisite checks pass!
    const result = gradeStorytellingQuiz(moduleId, selectedAnswers);

    let savedAttemptId: string | null = null;
    const submittedAtIso = new Date().toISOString();

    // SERVER-ONLY TRUSTED PERSISTENCE:
    // Save exactly one trusted attempt per submission using the privileged admin client
    if (user && adminSupabase) {
      const attemptPayload = {
        user_id: user.id,
        course_id: STORYTELLING_COURSE_UUID,
        module_id: currentModuleUuid,
        score: result.score,
        correct_count: result.correctCount,
        total_questions: result.totalQuestions,
        passed: result.passed,
        submitted_at: submittedAtIso,
      };

      const { data: insertedData, error: insertError } = await (adminSupabase
        .from('user_quiz_attempts') as any)
        .insert(attemptPayload)
        .select('id')
        .single();

      if (insertError) {
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

