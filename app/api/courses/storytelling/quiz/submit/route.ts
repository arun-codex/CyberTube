import { NextRequest, NextResponse } from 'next/server';
import { gradeStorytellingQuiz } from '@/lib/courses/storytelling-quiz-evaluator';
import { createClient, getAuthenticatedUser } from '@/lib/supabase/server';
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

    // Get authenticated user and server supabase client
    const user = await getAuthenticatedUser();
    const supabase = await createClient();

    // SERVER-SIDE PROGRESSION ENFORCEMENT:
    // If week > 1 and user is authenticated with cloud database,
    // verify that the previous module was passed (>= 70%) in trusted database records.
    if (currentWeekNum > 1 && user && supabase) {
      const prevWeekNum = currentWeekNum - 1;
      const prevModuleUuid = getStorytellingModuleUuid(prevWeekNum);

      const { data: prevAttempts, error: checkError } = await (supabase
        .from('user_quiz_attempts') as any)
        .select('passed, score')
        .eq('user_id', user.id)
        .eq('course_id', STORYTELLING_COURSE_UUID)
        .eq('module_id', prevModuleUuid)
        .eq('passed', true);

      if (checkError) {
        console.warn('Could not verify prerequisite attempts from Supabase:', checkError);
      } else if (!prevAttempts || prevAttempts.length === 0) {
        // Prerequisite not completed in trusted database
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
    const result = gradeStorytellingQuiz(moduleId, selectedAnswers);

    // If authenticated, persist the attempt server-side to public.user_quiz_attempts
    if (user && supabase) {
      const dbModuleUuid =
        STORYTELLING_MODULE_ID_TO_UUID[moduleId] || getStorytellingModuleUuid(currentWeekNum);

      const attemptPayload = {
        user_id: user.id,
        course_id: STORYTELLING_COURSE_UUID,
        module_id: dbModuleUuid,
        score: result.score,
        correct_count: result.correctCount,
        total_questions: result.totalQuestions,
        passed: result.passed,
        submitted_at: new Date().toISOString(),
      };

      const { error: insertError } = await (supabase
        .from('user_quiz_attempts') as any)
        .insert(attemptPayload);

      if (insertError) {
        console.warn('Failed to persist quiz attempt to Supabase:', insertError);
      }
    }

    return NextResponse.json({
      success: true,
      courseId: courseId || 'course-free-storytelling-masterclass',
      ...result,
      evaluatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error evaluating storytelling quiz submission:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server error while evaluating quiz' },
      { status: 500 }
    );
  }
}
