'use client';

function generateIdempotencyKey(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `quiz-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

import React, { useState, useEffect } from 'react';
import { LessonQuiz, QuizAttempt } from '../../types/course';
import {
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  ArrowRight,
  History,
  Loader2,
} from 'lucide-react';
import { cloudCourseProgressService } from '../../lib/cloud-course-progress';

interface ModuleQuizViewProps {
  quiz: LessonQuiz;
  moduleId: string;
  courseId: string;
}

interface ServerEvaluationResult {
  score: number;
  passed: boolean;
  questionResults: {
    index: number;
    userChoice: number;
    correctAnswerIndex: number;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export const ModuleQuizView: React.FC<ModuleQuizViewProps> = ({
  quiz,
  moduleId,
  courseId,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [activeScore, setActiveScore] = useState<number>(0);
  const [serverEvaluation, setServerEvaluation] = useState<ServerEvaluationResult | null>(null);
  const [submissionError, setSubmissionError] = useState<{
    type: 'prerequisite' | 'service_unavailable' | 'server_error' | 'network_error';
    message: string;
  } | null>(null);
  const [currentIdempotencyKey, setCurrentIdempotencyKey] = useState<string>(() => generateIdempotencyKey());

  const passingScorePercent = quiz.passingScorePercent || 70;

  // Restore saved attempts on mount
  useEffect(() => {
    // A reused quiz component must not carry an idempotency key into another
    // course/module. Retries within this module retain the same key.
    setCurrentIdempotencyKey(generateIdempotencyKey());

    const progress = cloudCourseProgressService.getProgress(courseId);
    const existingAttempts = progress.quizAttempts?.[moduleId] || [];
    setAttempts(existingAttempts);

    if (existingAttempts.length > 0) {
      const latest = existingAttempts[existingAttempts.length - 1];
      setSelectedAnswers(latest.selectedAnswers || {});
      setActiveScore(latest.score);
      setSubmitted(true);
    }
  }, [courseId, moduleId]);

  const handleSelect = (qIdx: number, optIdx: number) => {
    if (submitted || submitting) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const calculateFallbackScore = () => {
    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (typeof q.correctAnswerIndex === 'number' && selectedAnswers[idx] === q.correctAnswerIndex) {
        correctCount += 1;
      }
    });
    return Math.round((correctCount / (quiz.questions.length || 1)) * 100);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmissionError(null);
    let finalScore = 0;
    let finalPassed = false;
    let evalData: ServerEvaluationResult | null = null;
    let serverAttemptId: string | null = null;
    let serverSubmittedAt: string | null = null;

    const isStorytellingCourse =
      courseId === 'c0000000-0000-4000-8000-000000000001' ||
      courseId === 'course-free-storytelling-masterclass' ||
      courseId.includes('storytelling');

    try {
      // 1. Attempt secure server-side evaluation via API
      const res = await fetch('/api/courses/storytelling/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId,
          moduleId,
          selectedAnswers,
          idempotencyKey: currentIdempotencyKey,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          finalScore = data.score;
          finalPassed = data.passed;
          evalData = {
            score: data.score,
            passed: data.passed,
            questionResults: data.questionResults,
          };
          setServerEvaluation(evalData);
          if (data.attemptId) {
            serverAttemptId = data.attemptId;
          }
          if (data.submittedAt) {
            serverSubmittedAt = data.submittedAt;
          }
        } else {
          throw new Error(data.error || 'Server evaluation rejected');
        }
      } else {
        const errJson = await res.json().catch(() => null);
        const errMsg = errJson?.error || `Server responded with status ${res.status}`;

        if (res.status === 403) {
          setSubmissionError({
            type: 'prerequisite',
            message: errMsg || 'Prerequisite unfulfilled: You must complete and pass the previous module quiz first.',
          });
          setSubmitting(false);
          return;
        } else if (res.status === 503) {
          setSubmissionError({
            type: 'service_unavailable',
            message: 'Database service is temporarily unavailable. Your answers have been preserved—please try submitting again shortly.',
          });
          setSubmitting(false);
          return;
        } else if (res.status >= 500) {
          setSubmissionError({
            type: 'server_error',
            message: 'Quiz submission failed due to a server error. Please retry submission.',
          });
          setSubmitting(false);
          return;
        } else {
          setSubmissionError({
            type: 'server_error',
            message: errMsg,
          });
          setSubmitting(false);
          return;
        }
      }
    } catch (err: any) {
      console.warn('Server quiz evaluation failed or network error occurred:', err);

      // For Storytelling, NEVER fall back to local grading or fabricate scores
      if (isStorytellingCourse) {
        setSubmissionError({
          type: 'network_error',
          message: 'Network connection issue or offline status. Your selected answers have been saved. Please check your connection and retry.',
        });
        setSubmitting(false);
        return;
      }

      // For non-storytelling legacy courses with embedded answers:
      finalScore = calculateFallbackScore();
      finalPassed = finalScore >= passingScorePercent;
    } finally {
      setSubmitting(false);
    }

    const attemptNumber = attempts.length + 1;
    const newAttempt: QuizAttempt = {
      attemptNumber,
      selectedAnswers,
      score: finalScore,
      passed: finalPassed,
      submittedAt: serverSubmittedAt || new Date().toISOString(),
    };

    const nextAttempts = [...attempts, newAttempt];
    setAttempts(nextAttempts);
    setActiveScore(finalScore);
    setSubmitted(true);

    if (cloudCourseProgressService.recordQuizAttempt) {
      cloudCourseProgressService.recordQuizAttempt(courseId, moduleId, newAttempt);
    }
    if (finalPassed && cloudCourseProgressService.recordQuizScore) {
      cloudCourseProgressService.recordQuizScore(courseId, moduleId, finalScore);
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setServerEvaluation(null);
    setSubmissionError(null);
    // Intentional retake generates fresh idempotency key
    setCurrentIdempotencyKey(generateIdempotencyKey());
  };

  const isPassed = activeScore >= passingScorePercent;
  const isComplete = Object.keys(selectedAnswers).length === quiz.questions.length;
  const hasPreviousPass = attempts.some((a) => a.passed);

  return (
    <div className="p-5 sm:p-6 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e4e4ed] dark:border-[#243044] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] bg-[#0E7490]/10 dark:bg-[#22D3EE]/10 text-[#0E7490] dark:text-[#22D3EE] border border-[#0E7490]/20 dark:border-[#22D3EE]/20 text-xs font-mono">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Module Knowledge Assessment ({quiz.questions.length} Questions)</span>
          </div>
          <h3 className="font-rajdhani font-bold text-xl text-[#0F172A] dark:text-[#E6EDF3] mt-1">
            {quiz.title || 'Module Assessment Quiz'}
          </h3>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-[#64748B] dark:text-[#9BA8B7]">
            Passing threshold: <strong className="text-[#0F172A] dark:text-[#E6EDF3]">{passingScorePercent}%</strong> (Requires {Math.ceil((passingScorePercent / 100) * quiz.questions.length)}/{quiz.questions.length})
          </span>
          {hasPreviousPass && (
            <span className="px-2 py-0.5 rounded-[4px] bg-[#10B981]/10 text-[#065F46] dark:text-[#34D399] border border-[#10B981]/20 font-semibold">
              ✓ Passed
            </span>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {quiz.questions.map((q, qIdx) => {
          const userChoice = selectedAnswers[qIdx];
          const serverQResult = serverEvaluation?.questionResults?.find((r) => r.index === qIdx);

          const isKnownCorrect = serverQResult
            ? serverQResult.isCorrect
            : typeof q.correctAnswerIndex === 'number'
            ? userChoice === q.correctAnswerIndex
            : false;

          const correctOptIndex = serverQResult
            ? serverQResult.correctAnswerIndex
            : q.correctAnswerIndex;

          const explanationText = serverQResult
            ? serverQResult.explanation
            : q.explanation;

          return (
            <div
              key={qIdx}
              className="p-4 rounded-[6px] border border-[#e4e4ed] dark:border-[#243044] bg-[#fbfbfe] dark:bg-[#121A26] space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-semibold text-xs sm:text-sm text-[#0F172A] dark:text-[#E6EDF3] leading-snug">
                  {qIdx + 1}. {q.question}
                </h4>
                {q.difficulty && (
                  <span className="text-[10px] font-mono text-[#64748B] dark:text-[#9BA8B7] capitalize">
                    {q.difficulty}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  let styles = 'border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#1A2433] text-[#0F172A] dark:text-[#E6EDF3]';
                  if (submitted) {
                    if (typeof correctOptIndex === 'number' && optIdx === correctOptIndex) {
                      styles = 'border-[#10B981] bg-[#10B981]/10 text-[#065F46] dark:text-[#34D399] font-medium';
                    } else if (userChoice === optIdx && !isKnownCorrect) {
                      styles = 'border-[#EF4444] bg-[#EF4444]/10 text-[#991B1B] dark:text-[#F87171] line-through';
                    }
                  } else if (userChoice === optIdx) {
                    styles = 'border-[#0E7490] dark:border-[#22D3EE] bg-[#0E7490]/10 dark:bg-[#22D3EE]/10 text-[#0E7490] dark:text-[#22D3EE] font-medium';
                  }

                  return (
                    <label
                      key={optIdx}
                      className={`flex items-start gap-3 p-2.5 rounded-[4px] border text-xs cursor-pointer transition-colors ${styles}`}
                    >
                      <input
                        type="radio"
                        name={`quiz-q-${qIdx}`}
                        checked={userChoice === optIdx}
                        onChange={() => handleSelect(qIdx, optIdx)}
                        disabled={submitted || submitting}
                        className="mt-0.5 accent-[#0E7490] dark:accent-[#22D3EE]"
                      />
                      <span className="leading-snug">{opt}</span>
                    </label>
                  );
                })}
              </div>

              {submitted && explanationText && (
                <div
                  className={`p-3 rounded-[4px] text-xs leading-relaxed ${
                    isKnownCorrect
                      ? 'bg-[#10B981]/10 border border-[#10B981]/30 text-[#065F46] dark:text-[#34D399]'
                      : 'bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#991B1B] dark:text-[#F87171]'
                  }`}
                >
                  <p className="text-[#334155] dark:text-[#CBD5E1]">{explanationText}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submission Error Banner */}
      {submissionError && (
        <div
          data-testid="quiz-submission-error"
          className="p-4 rounded-[6px] border border-[#EF4444]/40 bg-[#EF4444]/10 text-[#991B1B] dark:text-[#F87171] space-y-2"
        >
          <div className="flex items-center gap-2 font-bold text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>
              {submissionError.type === 'prerequisite' && 'Prerequisite Requirement Not Fulfilled'}
              {submissionError.type === 'service_unavailable' && 'Service Temporarily Unavailable'}
              {submissionError.type === 'network_error' && 'Network Connection Issue'}
              {submissionError.type === 'server_error' && 'Submission Failed'}
            </span>
          </div>
          <p className="text-xs leading-relaxed">{submissionError.message}</p>
          {submissionError.type !== 'prerequisite' && (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-[#EF4444] text-white text-xs font-mono font-semibold hover:bg-[#DC2626] transition-colors cursor-pointer mt-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Submission</span>
            </button>
          )}
        </div>
      )}

      {submitted ? (
        <div className="space-y-4">
          <div
            className={`p-4 rounded-[6px] border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              isPassed
                ? 'bg-[#10B981]/10 border-[#10B981]/30 text-[#065F46] dark:text-[#34D399]'
                : 'bg-[#EF4444]/10 border-[#EF4444]/30 text-[#991B1B] dark:text-[#F87171]'
            }`}
          >
            <div>
              <div className="font-bold text-sm">
                {isPassed ? 'Quiz Assessment Passed!' : 'Passing Threshold Not Met'}
              </div>
              <div className="font-mono text-xs">
                Score: {activeScore}% ({Math.round((activeScore / 100) * quiz.questions.length)}/{quiz.questions.length} Correct) — Required: {passingScorePercent}%
              </div>
            </div>
            <button
              type="button"
              onClick={handleRetake}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-white dark:bg-[#1A2433] border border-[#e4e4ed] dark:border-[#243044] text-xs font-mono text-[#0F172A] dark:text-[#E6EDF3] transition-colors self-start sm:self-auto cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>
          </div>

          {/* Attempt History List */}
          {attempts.length > 0 && (
            <div className="p-4 rounded-[6px] bg-[#fbfbfe] dark:bg-[#1A2433]/30 border border-[#e4e4ed] dark:border-[#243044] space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#64748B] dark:text-[#9BA8B7] font-semibold uppercase tracking-wider">
                <History className="w-3.5 h-3.5" />
                <span>Recorded Attempt History ({attempts.length})</span>
              </div>
              <div className="space-y-1">
                {attempts.map((att) => (
                  <div
                    key={att.attemptNumber}
                    className="flex items-center justify-between text-xs font-mono py-1 border-b border-[#e4e4ed]/40 dark:border-[#243044]/40 last:border-0"
                  >
                    <span>Attempt #{att.attemptNumber}</span>
                    <span className={att.passed ? 'text-[#10B981] font-semibold' : 'text-[#EF4444]'}>
                      {att.score}% — {att.passed ? 'Passed' : 'Failed'}
                    </span>
                    <span className="text-[#64748B] dark:text-[#9BA8B7] text-[11px]">
                      {new Date(att.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isComplete || submitting}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-[6px] bg-[#0E7490] hover:bg-[#0891B2] disabled:opacity-50 text-white font-mono text-xs font-semibold transition-colors cursor-pointer"
        >
          {submitting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Evaluating Quiz...</span>
            </>
          ) : (
            <>
              <span>Submit Quiz</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      )}
    </div>
  );
};
