'use client';

import React, { useState } from 'react';
import { LessonQuiz } from '../../types/course';
import {
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  ArrowRight,
} from 'lucide-react';
import { cloudCourseProgressService } from '../../lib/cloud-course-progress';

interface ModuleQuizViewProps {
  quiz: LessonQuiz;
  moduleId: string;
  courseId: string;
}

export const ModuleQuizView: React.FC<ModuleQuizViewProps> = ({
  quiz,
  moduleId,
  courseId,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const passingScorePercent = quiz.passingScorePercent || 70;

  const handleSelect = (qIdx: number, optIdx: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        correctCount += 1;
      }
    });
    return Math.round((correctCount / (quiz.questions.length || 1)) * 100);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const score = calculateScore();
    if (score >= passingScorePercent) {
      cloudCourseProgressService.recordQuizScore?.(courseId, moduleId, score);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const scorePercent = submitted ? calculateScore() : 0;
  const isPassed = scorePercent >= passingScorePercent;
  const isComplete = Object.keys(selectedAnswers).length === quiz.questions.length;

  return (
    <div className="p-5 sm:p-6 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e4e4ed] dark:border-[#243044] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] bg-[#0E7490]/10 dark:bg-[#22D3EE]/10 text-[#0E7490] dark:text-[#22D3EE] border border-[#0E7490]/20 dark:border-[#22D3EE]/20 text-xs font-mono">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Module Knowledge Assessment</span>
          </div>
          <h3 className="font-rajdhani font-bold text-xl text-[#0F172A] dark:text-[#E6EDF3] mt-1">
            {quiz.title || 'Module Assessment Quiz'}
          </h3>
        </div>

        <div className="font-mono text-xs text-[#64748B] dark:text-[#9BA8B7]">
          Passing score: {passingScorePercent}%
        </div>
      </div>

      <div className="space-y-6">
        {quiz.questions.map((q, qIdx) => {
          const userChoice = selectedAnswers[qIdx];
          const isCorrect = userChoice === q.correctAnswerIndex;

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
                    if (optIdx === q.correctAnswerIndex) {
                      styles = 'border-[#10B981] bg-[#10B981]/10 text-[#065F46] dark:text-[#34D399] font-medium';
                    } else if (optIdx === userChoice && !isCorrect) {
                      styles = 'border-[#EF4444] bg-[#EF4444]/10 text-[#991B1B] dark:text-[#F87171]';
                    } else {
                      styles = 'opacity-50 border-[#e4e4ed] dark:border-[#243044]';
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
                        disabled={submitted}
                        className="mt-0.5 accent-[#0E7490] dark:accent-[#22D3EE]"
                      />
                      <span className="leading-snug">{opt}</span>
                    </label>
                  );
                })}
              </div>

              {submitted && (
                <div
                  className={`p-3 rounded-[4px] text-xs leading-relaxed ${
                    isCorrect
                      ? 'bg-[#10B981]/10 border border-[#10B981]/30 text-[#065F46] dark:text-[#34D399]'
                      : 'bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#991B1B] dark:text-[#F87171]'
                  }`}
                >
                  <p className="text-[#334155] dark:text-[#CBD5E1]">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {submitted ? (
        <div
          className={`p-4 rounded-[6px] border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            isPassed
              ? 'bg-[#10B981]/10 border-[#10B981]/30 text-[#065F46] dark:text-[#34D399]'
              : 'bg-[#EF4444]/10 border-[#EF4444]/30 text-[#991B1B] dark:text-[#F87171]'
          }`}
        >
          <div>
            <div className="font-bold text-sm">
              {isPassed ? 'Quiz Passed!' : 'Quiz Incomplete'}
            </div>
            <div className="font-mono text-xs">
              Score: {scorePercent}% (Required: {passingScorePercent}%)
            </div>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-white dark:bg-[#1A2433] border border-[#e4e4ed] dark:border-[#243044] text-xs font-mono text-[#0F172A] dark:text-[#E6EDF3] transition-colors self-start sm:self-auto cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Quiz</span>
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isComplete}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-[6px] bg-[#0E7490] hover:bg-[#0891B2] disabled:opacity-50 text-white font-mono text-xs font-semibold transition-colors cursor-pointer"
        >
          <span>Submit Quiz</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

