'use client';

import React from 'react';
import { Course } from '../../types/course';
import { getCourseLessons } from '../../lib/courses';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { SyncStatusBadge } from './SyncStatusBadge';
import { useCourseProgress } from '../../lib/progress';

interface CourseProgressProps {
  course: Course;
  variant?: 'default' | 'compact';
}

export const CourseProgress: React.FC<CourseProgressProps> = ({ course, variant = 'default' }) => {
  const { progress, resetCourseProgress } = useCourseProgress(course.id);
  const lessons = getCourseLessons(course);
  const totalLessons = lessons.length;
  const completedCount = lessons.filter((l) => progress.completedLessonIds.includes(l.id)).length;
  const percent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const handleReset = async () => {
    if (confirm('Reset your progress for this course?')) {
      await resetCourseProgress();
    }
  };

  return (
    <div
      className={`rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-[#f4f4f9] dark:bg-[#121A26] p-4 space-y-2.5 ${
        variant === 'compact' ? 'bg-white dark:bg-[#1A2433]' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-medium uppercase tracking-wider text-[#6b6b7b] dark:text-[#9BA8B7] flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#0E7490] dark:text-[#22D3EE]" />
          Progress
        </span>
        <span className="text-sm font-mono font-medium text-[#303055] dark:text-[#E6EDF3]">{percent}%</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-[#e8e8f2] dark:bg-[#1E293B] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#0E7490] dark:bg-[#22D3EE] rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs font-mono text-[#6b6b7b] dark:text-[#9BA8B7]">
        <span>
          {completedCount}/{totalLessons} completed
        </span>
        {completedCount > 0 && (
          <button
            onClick={handleReset}
            className="hover:text-[#984e4d] dark:hover:text-[#f87171] transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
            title="Reset progress"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      {/* Server sync status indicator */}
      <div className="pt-1 border-t border-[#e4e4ed]/60 dark:border-[#243044]/60 flex items-center justify-between">
        <SyncStatusBadge courseId={course.id} />
      </div>
    </div>
  );
};
