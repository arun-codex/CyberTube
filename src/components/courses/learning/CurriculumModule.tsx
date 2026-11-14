'use client';

import React from 'react';
import { ChevronDown, ChevronRight, Lock, CheckCircle2 } from 'lucide-react';
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
  onSelectLesson: (slug: string) => void;
  onToggleComplete: (lessonId: string) => void;
  isLocked?: boolean;
  unlockRequirement?: string;
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
}) => {
  const completedCount = module.lessons.filter((l) =>
    completedLessonIds.includes(l.id)
  ).length;
  const percent =
    module.lessons.length > 0
      ? Math.round((completedCount / module.lessons.length) * 100)
      : 0;

  const paddedIndex = String(moduleIndex + 1).padStart(2, '0');

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
          {isLocked ? 'Locked' : `${percent}%`}
        </span>
      </button>

      {/* Module Lessons List or Lock Notice */}
      {isOpen && (
        <div>
          {isLocked ? (
            <div className="p-4 bg-amber-50/50 dark:bg-amber-950/20 border-t border-[#e2e8f0] dark:border-[#1E293B] flex items-start gap-2.5 text-xs text-amber-800 dark:text-amber-300">
              <Lock className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
              <div>
                <p className="font-semibold">Module Locked</p>
                <p className="text-[11px] font-mono text-amber-700 dark:text-amber-400 mt-0.5">
                  {unlockRequirement || 'Pass the previous module quiz with ≥ 70% to unlock this week.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-[#e4e4ed] dark:divide-[#243044]">
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
            </div>
          )}
        </div>
      )}
    </div>
  );
};
