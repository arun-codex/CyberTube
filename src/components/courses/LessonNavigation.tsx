'use client';

import React from 'react';
import Link from 'next/link';
import { Course, Lesson } from '../../types/course';
import { ArrowLeft, ArrowRight, CheckCircle2, Circle } from 'lucide-react';

interface LessonNavigationProps {
  course: Course;
  currentLesson: Lesson;
  prevLesson?: Lesson;
  nextLesson?: Lesson;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export const LessonNavigation: React.FC<LessonNavigationProps> = ({
  course,
  prevLesson,
  nextLesson,
  isCompleted,
  onToggleComplete,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-3.5 px-4 sm:px-5 rounded-[8px] border border-[#e4e4ed] bg-white">
      {/* Previous Lesson Button */}
      <div className="w-full sm:w-auto">
        {prevLesson ? (
          <Link
            href={`/courses/${course.slug}?lesson=${prevLesson.slug}`}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-[4px] text-xs font-mono text-[#403f53] hover:text-[#303055] bg-[#f4f4f9] hover:bg-[#e8e8f2] border border-[#e4e4ed] transition-colors w-full sm:w-auto justify-center min-h-[44px] sm:min-h-[36px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="truncate max-w-[160px]">Prev: {prevLesson.title}</span>
          </Link>
        ) : (
          <div className="text-xs font-mono text-[#767682] px-2 py-1 text-center sm:text-left">
            Course start
          </div>
        )}
      </div>

      {/* Completion Toggle */}
      <button
        type="button"
        onClick={onToggleComplete}
        className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[4px] text-xs font-medium transition-colors min-h-[44px] sm:min-h-[36px] w-full sm:w-auto ${
          isCompleted
            ? 'bg-[#e8e8f2] text-[#303055] border border-[#d2d2dc]'
            : 'bg-[#303055] text-white hover:bg-[#252542]'
        }`}
      >
        {isCompleted ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-[#303055]" />
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
            href={`/courses/${course.slug}?lesson=${nextLesson.slug}`}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-[4px] text-xs font-mono text-[#403f53] hover:text-[#303055] bg-[#f4f4f9] hover:bg-[#e8e8f2] border border-[#e4e4ed] transition-colors w-full sm:w-auto justify-center min-h-[44px] sm:min-h-[36px]"
          >
            <span className="truncate max-w-[160px]">Next: {nextLesson.title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <div className="text-xs font-mono text-[#303055] px-2 py-1 text-center sm:text-right font-medium">
            Course Complete
          </div>
        )}
      </div>
    </div>
  );
};
