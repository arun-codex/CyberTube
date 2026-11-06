'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { NormalizedLesson } from '../../../types/learning-view-model';

interface CurriculumLessonProps {
  lesson: NormalizedLesson;
  courseSlug: string;
  isActive: boolean;
  isCompleted: boolean;
  onSelectLesson: (slug: string) => void;
  onToggleComplete: (lessonId: string) => void;
}

export const CurriculumLesson: React.FC<CurriculumLessonProps> = ({
  lesson,
  courseSlug,
  isActive,
  isCompleted,
  onSelectLesson,
  onToggleComplete,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  // Auto-scroll active lesson into view within the sidebar
  useEffect(() => {
    if (isActive && itemRef.current) {
      itemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [isActive]);

  return (
    <div
      ref={itemRef}
      className={`flex items-start justify-between p-3 gap-2.5 transition-colors ${
        isActive
          ? 'bg-[#f1f5f9] dark:bg-[#1A2638] border-l-2 border-l-[#0E7490] dark:border-l-[#22D3EE]'
          : 'hover:bg-[#f8fafc] dark:hover:bg-[#15202E]'
      }`}
    >
      {/* Completion Toggle Button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggleComplete(lesson.id);
        }}
        className="mt-0.5 p-0.5 rounded-[4px] text-[#64748B] hover:text-[#0F172A] dark:text-[#9BA8B7] dark:hover:text-[#E6EDF3] shrink-0 cursor-pointer"
        title={isCompleted ? 'Mark uncompleted' : 'Mark completed'}
        aria-label={isCompleted ? 'Mark uncompleted' : 'Mark completed'}
      >
        {isCompleted ? (
          <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
        ) : (
          <Circle className="w-4 h-4" />
        )}
      </button>

      {/* Lesson Title Link & Status */}
      <div className="flex-1 min-w-0">
        <Link
          href={`/courses/${courseSlug}?lesson=${lesson.slug}`}
          onClick={(e) => {
            e.preventDefault();
            onSelectLesson(lesson.slug);
          }}
          className={`text-xs block line-clamp-2 transition-colors ${
            isActive
              ? 'font-semibold text-[#0E7490] dark:text-[#22D3EE]'
              : isCompleted
              ? 'text-[#64748B] dark:text-[#9BA8B7]'
              : 'text-[#334155] dark:text-[#CBD5E1] hover:text-[#0F172A] dark:hover:text-[#E6EDF3]'
          }`}
        >
          {lesson.title}
        </Link>

        <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-[#64748B] dark:text-[#9BA8B7]">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#64748B] dark:text-[#9BA8B7]" />
            {lesson.durationMinutes}m
          </span>

          {isActive && (
            <span className="px-1.5 py-0.2 rounded-[3px] text-[9px] uppercase font-bold bg-[#0E7490] dark:bg-[#22D3EE] text-white dark:text-[#0B1018]">
              PLAYING
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
