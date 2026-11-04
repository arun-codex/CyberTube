'use client';

import React, { useState, useEffect } from 'react';
import { Course } from '../../types/course';
import { localCourseProgressService, onCourseProgressChange } from '../../lib/course-progress';
import { getCourseLessons } from '../../lib/courses';
import { CheckCircle2, RotateCcw } from 'lucide-react';

interface CourseProgressProps {
  course: Course;
}

export const CourseProgress: React.FC<CourseProgressProps> = ({ course }) => {
  const [percent, setPercent] = useState<number>(0);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const lessons = getCourseLessons(course);

  const updateProgress = () => {
    const p = localCourseProgressService.getCourseCompletionPercentage(course);
    setPercent(p);
    const state = localCourseProgressService.getProgress(course.id);
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
      localCourseProgressService.resetCourseProgress(course.id);
      updateProgress();
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 p-5 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          Course Progress
        </span>
        <span className="text-sm font-mono font-bold text-emerald-400">{percent}%</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs font-mono text-slate-500">
        <span>
          {completedCount} of {lessons.length} lessons completed
        </span>
        {completedCount > 0 && (
          <button
            onClick={handleReset}
            className="hover:text-red-400 transition-colors flex items-center gap-1"
            title="Reset progress"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight">
        * Provisional local progress saved on this device.
      </p>
    </div>
  );
};
