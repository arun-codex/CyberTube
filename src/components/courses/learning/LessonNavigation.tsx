'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, Circle } from 'lucide-react';
import { NormalizedLesson } from '../../../types/learning-view-model';

interface LessonNavigationProps {
  courseSlug: string;
  currentLesson: NormalizedLesson;
  prevLesson?: NormalizedLesson;
  nextLesson?: NormalizedLesson;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onSelectLesson?: (slug: string) => void;
}

export const LessonNavigation: React.FC<LessonNavigationProps> = ({
  courseSlug,
  prevLesson,
  nextLesson,
  isCompleted,
  onToggleComplete,
  onSelectLesson,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-3.5 px-4 sm:px-5 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26]">
      {/* Previous Lesson Button */}
      <div className="w-full sm:w-auto">
        {prevLesson ? (
          <Link
            href={`/courses/${courseSlug}?lesson=${prevLesson.slug}`}
            onClick={(e) => {
              if (onSelectLesson) {
                e.preventDefault();
                onSelectLesson(prevLesson.slug);
              }
            }}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-[4px] text-xs font-mono text-[#475569] dark:text-[#9BA8B7] hover:text-[#0F172A] dark:hover:text-[#E6EDF3] bg-[#f8fafc] dark:bg-[#1A2638] hover:bg-[#f1f5f9] dark:hover:bg-[#223249] border border-[#e2e8f0] dark:border-[#243044] transition-colors w-full sm:w-auto justify-center min-h-[44px] sm:min-h-[36px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="truncate max-w-[160px]">Prev: {prevLesson.title}</span>
          </Link>
        ) : (
          <div className="text-xs font-mono text-[#64748B] dark:text-[#9BA8B7] px-2 py-1 text-center sm:text-left">
            Course start
          </div>
        )}
      </div>

      {/* Completion Toggle */}
      <button
        type="button"
        onClick={onToggleComplete}
        className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[4px] text-xs font-medium transition-colors min-h-[44px] sm:min-h-[36px] w-full sm:w-auto cursor-pointer ${
          isCompleted
            ? 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-800 hover:bg-green-200 dark:hover:bg-green-900/50'
            : 'bg-[#0E7490] dark:bg-[#22D3EE] text-white dark:text-[#0B1018] hover:bg-[#0891b2] dark:hover:bg-[#06b6d4]'
        }`}
      >
        {isCompleted ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span>Completed (Undo)</span>
          </>
        ) : (
          <>
            <Circle className="w-4 h-4" />
            <span>Mark as Completed</span>
          </>
        )}
      </button>

      {/* Next Lesson Button */}
      <div className="w-full sm:w-auto">
        {nextLesson ? (
          <Link
            href={`/courses/${courseSlug}?lesson=${nextLesson.slug}`}
            onClick={(e) => {
              if (onSelectLesson) {
                e.preventDefault();
                onSelectLesson(nextLesson.slug);
              }
            }}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-[4px] text-xs font-mono text-[#475569] dark:text-[#9BA8B7] hover:text-[#0F172A] dark:hover:text-[#E6EDF3] bg-[#f8fafc] dark:bg-[#1A2638] hover:bg-[#f1f5f9] dark:hover:bg-[#223249] border border-[#e2e8f0] dark:border-[#243044] transition-colors w-full sm:w-auto justify-center min-h-[44px] sm:min-h-[36px]"
          >
            <span className="truncate max-w-[160px]">Next: {nextLesson.title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <div className="text-xs font-mono text-[#0E7490] dark:text-[#22D3EE] px-2 py-1 text-center sm:text-right font-medium">
            Course Complete
          </div>
        )}
      </div>
    </div>
  );
};

