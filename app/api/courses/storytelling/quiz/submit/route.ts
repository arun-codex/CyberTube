import { NextRequest, NextResponse } from 'next/server';
import { gradeStorytellingQuiz } from '@/lib/courses/storytelling-quiz-evaluator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { courseId, moduleId, selectedAnswers } = body;

    if (!moduleId || !selectedAnswers || typeof selectedAnswers !== 'object') {
      return NextResponse.json(
        { error: 'Invalid payload: moduleId and selectedAnswers are required.' },
        { status: 400 }
      );
    }

    const result = gradeStorytellingQuiz(moduleId, selectedAnswers);

    return NextResponse.json({
      success: true,
      courseId: courseId || 'course-free-storytelling-masterclass',
      ...result,
      evaluatedAt: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Error evaluating storytelling quiz submission:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server error while evaluating quiz' },
      { status: 500 }
    );
  }
}
