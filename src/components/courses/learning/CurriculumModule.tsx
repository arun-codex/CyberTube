'use client';

import React from 'react';
import { ChevronDown, ChevronRight, Lock, CheckCircle2, HelpCircle, ArrowRight } from 'lucide-react';
import { NormalizedModule } from '../../../types/learning-view-model';
import { CurriculumLesson } from './CurriculumLesson';

interface CurriculumModuleProps {
  module: NormalizedModule;
  moduleIndex: number;
  isOpen: boolean;
  onToggle: () => void;
  activeLessonId?: string;
  completedLessonIds: string[];
  courseSlug: string;
  onSelectLesson: (slug: string, tab?: 'content' | 'lab' | 'quiz' | 'capstone' | 'pcaps') => void;
  onToggleComplete: (lessonId: string) => void;
  isLocked?: boolean;
  unlockRequirement?: string;
  quizScore?: number;
  onGoToRequiredQuiz?: () => void;
}

export const CurriculumModule: React.FC<CurriculumModuleProps> = ({
  module,
  moduleIndex,
  isOpen,
  onToggle,
  activeLessonId,
  completedLessonIds,
  courseSlug,
  onSelectLesson,
  onToggleComplete,
  isLocked = false,
  unlockRequirement,
  quizScore,
  onGoToRequiredQuiz,
}) => {
  const completedCount = module.lessons.filter((l) =>
    completedLessonIds.includes(l.id)
  ).length;
  const percent =
    module.lessons.length > 0
      ? Math.round((completedCount / module.lessons.length) * 100)
      : 0;

  const paddedIndex = String(moduleIndex + 1).padStart(2, '0');
  // An empty published DB module is a planned placeholder, not completed learning.
  const isPlanned = module.lessons.length === 0 && !module.quiz;

  return (
    <div className={`rounded-[8px] border overflow-hidden transition-colors ${
      isLocked
        ? 'border-[#e2e8f0] dark:border-[#1E293B] bg-[#f8fafc]/50 dark:bg-[#0B111A]/50 opacity-80'
        : 'border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26]'
    }`}>
      {/* Module Header Accordion Toggle */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center justify-between text-left bg-[#f8fafc] dark:bg-[#162234] hover:bg-[#f1f5f9] dark:hover:bg-[#1A2638] transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          {isOpen ? (
            <ChevronDown className="w-4 h-4 text-[#0F172A] dark:text-[#E6EDF3] shrink-0" />
          ) : (
            <ChevronRight className="w-4 h-4 text-[#64748B] dark:text-[#9BA8B7] shrink-0" />
          )}

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-mono uppercase font-bold ${
                isLocked ? 'text-[#94A3B8] dark:text-[#64748B]' : 'text-[#0E7490] dark:text-[#22D3EE]'
              }`}>
                Module {paddedIndex}
              </span>
              {isLocked ? (
                <span className="flex items-center gap-1 text-[10px] font-mono text-amber-600 dark:text-amber-400">
                  <Lock className="w-3 h-3" /> Locked
                </span>
              ) : isPlanned ? (
                <span className="text-[11px] font-mono text-amber-700 dark:text-amber-300">
                  Planned · No lessons yet
                </span>
              ) : (
                <span className="text-[11px] font-mono text-[#64748B] dark:text-[#9BA8B7]">
                  {completedCount}/{module.lessons.length}
                </span>
              )}
            </div>
            <h4 className="text-xs font-semibold text-[#0F172A] dark:text-[#E6EDF3] line-clamp-1">
              {module.title}
            </h4>
          </div>
        </div>

        <span
          className={`text-[11px] font-mono px-2 py-0.5 rounded-[4px] shrink-0 font-medium ${
            isLocked
              ? 'bg-[#f1f5f9] dark:bg-[#1E293B] text-[#94A3B8] dark:text-[#64748B]'
              : percent === 100
              ? 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
              : 'bg-[#e2e8f0] dark:bg-[#1A2638] text-[#334155] dark:text-[#CBD5E1]'
          }`}
        >
          {isLocked ? 'Locked' : isPlanned ? 'Planned' : `${percent}%`}
        </span>
      </button>

      {/* Module Lessons List or Lock Notice */}
      {isOpen && (
        <div>
          {isLocked ? (
            <div className="p-4 bg-amber-50/50 dark:bg-amber-950/20 border-t border-[#e2e8f0] dark:border-[#1E293B] space-y-3">
              <div className="flex items-start gap-2.5 text-xs text-amber-800 dark:text-amber-300">
                <Lock className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                <div>
                  <p className="font-semibold">Module Locked</p>
                  <p className="text-[11px] font-mono text-amber-700 dark:text-amber-400 mt-0.5 leading-relaxed">
                    {unlockRequirement || 'Pass the previous module quiz with ≥ 70% to unlock this week.'}
                  </p>
                </div>
              </div>

              {onGoToRequiredQuiz && (
                <button
                  type="button"
                  onClick={onGoToRequiredQuiz}
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-[6px] bg-[#0E7490] hover:bg-[#0891B2] text-white font-mono text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Go to Required Quiz</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          ) : isPlanned ? (
            <p className="border-t border-[var(--border)] p-4 text-xs text-[var(--text-secondary)]" role="status">
              This module is reserved for future playlist additions. No lessons are available yet.
            </p>
          ) : (
            <div className="divide-y divide-[#e4e4ed] dark:divide-[#243044]">
              {module.lessons.length === 0 && !module.quiz && (
                <div className="p-4 text-center text-xs text-[#64748B] dark:text-[#9BA8B7] font-mono bg-[#f8fafc]/50 dark:bg-[#121A26]/50">
                  Planned — upcoming lessons will sync here automatically.
                </div>
              )}
              {module.lessons.map((lesson) => (
                <CurriculumLesson
                  key={lesson.id}
                  lesson={lesson}
                  courseSlug={courseSlug}
                  isActive={lesson.id === activeLessonId}
                  isCompleted={completedLessonIds.includes(lesson.id)}
                  onSelectLesson={onSelectLesson}
                  onToggleComplete={onToggleComplete}
                />
              ))}

              {/* Assessment Quiz Entry Row */}
              {module.quiz && (
                <button
                  type="button"
                  aria-label={`Start quiz: ${module.title}`}
                  data-testid={`module-quiz-sidebar-row-${module.id}`}
                  onClick={() => {
                    const targetLesson = module.lessons[module.lessons.length - 1] || module.lessons[0];
                    if (targetLesson) {
                      onSelectLesson(targetLesson.slug, 'quiz');
                    }
                  }}
                  className="flex w-full items-center justify-between text-left p-3 gap-2.5 bg-[#f8fafc]/80 dark:bg-[#141E2B]/80 hover:bg-[#f1f5f9] dark:hover:bg-[#1A2638] transition-colors cursor-pointer border-t border-dashed border-[#cbd5e1] dark:border-[#334155]"
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div className="w-6 h-6 rounded-full bg-[#0E7490]/10 dark:bg-[#22D3EE]/10 flex items-center justify-center text-[#0E7490] dark:text-[#22D3EE] shrink-0">
                      <HelpCircle className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#0F172A] dark:text-[#E6EDF3] truncate">
                          {module.quiz.title ? `${module.quiz.title} • Quiz` : `Week ${paddedIndex} Assessment Quiz`}
                        </span>
                      </div>
                      <p className="text-[10px] font-mono text-[#64748B] dark:text-[#9BA8B7]">
                        {module.quiz.questions?.length || 10} Questions • Pass threshold: {module.quiz.passingScorePercent || 70}%
                      </p>
                    </div>
                  </div>

                  <div>
                    {typeof quizScore === 'number' && quizScore >= (module.quiz.passingScorePercent || 70) ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-950/40 px-2 py-0.5 rounded-[4px] border border-green-200 dark:border-green-800">
                        <CheckCircle2 className="w-3 h-3" /> {quizScore}%
                      </span>
                    ) : typeof quizScore === 'number' && quizScore > 0 ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-[4px] border border-amber-200 dark:border-amber-800">
                        {quizScore}%
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-[#0E7490] dark:text-[#22D3EE] bg-[#0E7490]/10 dark:bg-[#22D3EE]/10 px-2 py-0.5 rounded-[4px] font-semibold">
                        Start Quiz →
                      </span>
                    )}
                  </div>
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
