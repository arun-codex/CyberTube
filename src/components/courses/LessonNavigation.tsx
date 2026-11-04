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
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-sm">
      {/* Previous Lesson Button */}
      <div className="w-full sm:w-auto">
        {prevLesson ? (
          <Link
            href={`/courses/${course.slug}?lesson=${prevLesson.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors w-full sm:w-auto justify-center"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="truncate max-w-[150px]">Previous: {prevLesson.title}</span>
          </Link>
        ) : (
          <div className="text-xs font-mono text-slate-400 px-2 py-1 text-center sm:text-left">
            Start of Course
          </div>
        )}
      </div>

      {/* Completion Toggle */}
      <button
        type="button"
        onClick={onToggleComplete}
        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-sm ${
          isCompleted
            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/25'
            : 'bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold'
        }`}
      >
        {isCompleted ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Completed (Click to Undo)</span>
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors w-full sm:w-auto justify-center"
          >
            <span className="truncate max-w-[150px]">Next: {nextLesson.title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <div className="text-xs font-mono text-emerald-400 px-2 py-1 text-center sm:text-right font-bold">
            🎉 Final Lesson
          </div>
        )}
      </div>
    </div>
  );
};
