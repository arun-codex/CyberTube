'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Course, CourseModule, Lesson } from '../../types/course';
import { ChevronDown, ChevronRight, CheckCircle2, Circle, Clock } from 'lucide-react';

interface ModuleAccordionProps {
  course: Course;
  activeLessonId?: string;
  completedLessonIds: string[];
  onToggleComplete?: (lessonId: string) => void;
  onSelectLesson?: (slug: string) => void;
}

export const ModuleAccordion: React.FC<ModuleAccordionProps> = ({
  course,
  activeLessonId,
  completedLessonIds,
  onToggleComplete,
  onSelectLesson,
}) => {
  const [openModuleIds, setOpenModuleIds] = useState<string[]>(() => {
    return course.modules.map((m) => m.id);
  });

  const toggleModule = (id: string) => {
    setOpenModuleIds((prev) =>
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-[#e4e4ed]">
        <h3 className="font-mono text-xs uppercase tracking-wider text-[#303055] font-semibold">
          Curriculum
        </h3>
        <span className="text-xs font-mono text-[#6b6b7b]">
          {course.modules.length} {course.modules.length === 1 ? 'Module' : 'Modules'}
        </span>
      </div>

      <div className="space-y-2">
        {course.modules.map((module: CourseModule) => {
          const isOpen = openModuleIds.includes(module.id);
          const moduleCompletedCount = module.lessons.filter((l) =>
            completedLessonIds.includes(l.id)
          ).length;

          return (
            <div
              key={module.id}
              className="rounded-[8px] border border-[#e4e4ed] bg-white overflow-hidden"
            >
              {/* Module Header Toggle */}
              <button
                type="button"
                onClick={() => toggleModule(module.id)}
                className="w-full px-4 py-3 flex items-center justify-between text-left bg-[#f4f4f9] hover:bg-[#e8e8f2] transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  {isOpen ? (
                    <ChevronDown className="w-4 h-4 text-[#303055] shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[#6b6b7b] shrink-0" />
                  )}
                  <div>
                    <h4 className="text-xs font-semibold text-[#303055] line-clamp-1">
                      {module.title}
                    </h4>
                    <span className="text-[11px] font-mono text-[#6b6b7b]">
                      {moduleCompletedCount}/{module.lessons.length} completed
                    </span>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-[#303055] shrink-0">
                  {Math.round((moduleCompletedCount / (module.lessons.length || 1)) * 100)}%
                </div>
              </button>

              {/* Module Lessons List */}
              {isOpen && (
                <div className="divide-y divide-[#e4e4ed]">
                  {module.lessons.map((lesson: Lesson) => {
                    const isActive = lesson.id === activeLessonId;
                    const isDone = completedLessonIds.includes(lesson.id);

                    return (
                      <div
                        key={lesson.id}
                        className={`flex items-start justify-between p-3 gap-2.5 transition-colors ${
                          isActive
                            ? 'bg-[#e8e8f2] border-l-2 border-l-[#303055]'
                            : 'hover:bg-[#f4f4f9]'
                        }`}
                      >
                        {/* Completion Checkbox Button (accessible min-size) */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (onToggleComplete) onToggleComplete(lesson.id);
                          }}
                          className="mt-0.5 p-1 rounded-[4px] text-[#6b6b7b] hover:text-[#303055] shrink-0"
                          title={isDone ? 'Mark uncompleted' : 'Mark completed'}
                          aria-label={isDone ? 'Mark uncompleted' : 'Mark completed'}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-[#303055]" />
                          ) : (
                            <Circle className="w-4 h-4" />
                          )}
                        </button>

                        {/* Title link */}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/courses/${course.slug}?lesson=${lesson.slug}`}
                            onClick={() => onSelectLesson?.(lesson.slug)}
                            className={`text-xs block line-clamp-2 ${
                              isActive
                                ? 'font-semibold text-[#303055]'
                                : isDone
                                ? 'text-[#6b6b7b]'
                                : 'text-[#403f53] hover:text-[#303055]'
                            }`}
                          >
                            {lesson.title}
                          </Link>

                          <div className={`flex items-center gap-2 mt-1 text-[11px] font-mono ${isActive ? "text-[#403f53]" : "text-[#6b6b7b]"}`}>

                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-[#6b6b7b]" />
                              {lesson.durationMinutes}m
                            </span>
                            {isActive && (
                              <span className="text-[10px] uppercase font-semibold text-[#303055]">
                                Playing
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
