import quizKeysJson from './storytelling-quiz-keys.json';

export interface QuizQuestionKey {
  index: number;
  correctAnswerIndex: number;
  explanation: string;
}

export interface ModuleQuizKey {
  moduleId: string;
  title: string;
  passingScorePercent: number;
  questions: QuizQuestionKey[];
}

export const STORYTELLING_QUIZ_KEYS: Record<string, ModuleQuizKey> = quizKeysJson as Record<string, ModuleQuizKey>;

export interface QuizSubmissionPayload {
  courseId: string;
  moduleId: string;
  selectedAnswers: Record<number, number>; // questionIndex -> selectedOptionIndex
}

export interface QuizGradingResult {
  moduleId: string;
  score: number;
  passed: boolean;
  passingScorePercent: number;
  totalQuestions: number;
  correctCount: number;
  questionResults: {
    index: number;
    userChoice: number;
    correctAnswerIndex: number;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export function gradeStorytellingQuiz(
  moduleId: string,
  selectedAnswers: Record<number, number>
): QuizGradingResult {
  const quizKey = STORYTELLING_QUIZ_KEYS[moduleId];
  if (!quizKey) {
    throw new Error(`Quiz module not found: ${moduleId}`);
  }

  const passingScorePercent = quizKey.passingScorePercent || 70;
  let correctCount = 0;
  const questionResults = quizKey.questions.map((q) => {
    const userChoice = selectedAnswers[q.index];
    const isCorrect = userChoice === q.correctAnswerIndex;
    if (isCorrect) correctCount += 1;
    return {
      index: q.index,
      userChoice,
      correctAnswerIndex: q.correctAnswerIndex,
      isCorrect,
      explanation: q.explanation
    };
  });

  const totalQuestions = quizKey.questions.length;
  const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const passed = score >= passingScorePercent;

  return {
    moduleId,
    score,
    passed,
    passingScorePercent,
    totalQuestions,
    correctCount,
    questionResults
  };
}
