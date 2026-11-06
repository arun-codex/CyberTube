'use client';

import React, { useState, useEffect } from 'react';
import { Course } from '../../types/course';
import { onCourseProgressChange } from '../../lib/course-progress';
import { cloudCourseProgressService } from '../../lib/cloud-course-progress';
import { getCourseLessons } from '../../lib/courses';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { SyncStatusBadge } from './SyncStatusBadge';

interface CourseProgressProps {
  course: Course;
  variant?: 'default' | 'compact';
}

export const CourseProgress: React.FC<CourseProgressProps> = ({ course, variant = 'default' }) => {
  const [percent, setPercent] = useState<number>(0);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const lessons = getCourseLessons(course);

  const updateProgress = () => {
    const p = cloudCourseProgressService.getCourseCompletionPercentage(course);
    setPercent(p);
    const state = cloudCourseProgressService.getProgress(course.id);
    const count = lessons.filter((l) => state.completedLessonIds.includes(l.id)).length;
    setCompletedCount(count);
  };

  useEffect(() => {
    updateProgress();
    const unsub = onCourseProgressChange((state) => {
      if (state.courseId === course.id) {
        updateProgress();
      }
    });
    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course]);

  const handleReset = () => {
    if (confirm('Reset your progress for this course?')) {
      cloudCourseProgressService.resetCourseProgress(course.id);
      updateProgress();
    }
  };

  return (
    <div className={`rounded-[8px] border border-[#e4e4ed] bg-[#f4f4f9] p-4 space-y-2.5 ${variant === 'compact' ? 'bg-white' : ''}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-medium uppercase tracking-wider text-[#6b6b7b] flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#303055]" />
          Progress
        </span>
        <span className="text-sm font-mono font-medium text-[#303055]">{percent}%</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-[#e8e8f2] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#303055] rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs font-mono text-[#6b6b7b]">
        <span>
          {completedCount}/{lessons.length} completed
        </span>
        {completedCount > 0 && (
          <button
            onClick={handleReset}
            className="hover:text-[#984e4d] transition-colors flex items-center gap-1 text-[11px]"
            title="Reset progress"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      {/* Server sync status indicator */}
      <div className="pt-1 border-t border-[#e4e4ed]/60 flex items-center justify-between">
        <SyncStatusBadge courseId={course.id} />
      </div>
    </div>
  );
};
