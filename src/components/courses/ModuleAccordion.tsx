'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Course, CourseModule, Lesson } from '../../types/course';
import { ChevronDown, ChevronRight, CheckCircle2, Circle, PlayCircle, Clock } from 'lucide-react';

interface ModuleAccordionProps {
  course: Course;
  activeLessonId?: string;
  completedLessonIds: string[];
  onToggleComplete?: (lessonId: string) => void;
}

export const ModuleAccordion: React.FC<ModuleAccordionProps> = ({
  course,
  activeLessonId,
  completedLessonIds,
  onToggleComplete,
}) => {
  // Default open modules: open the module that contains the active lesson, or all modules
  const [openModuleIds, setOpenModuleIds] = useState<string[]>(() => {
    return course.modules.map((m) => m.id);
  });

  const toggleModule = (id: string) => {
    setOpenModuleIds((prev) =>
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <h3 className="font-bold text-sm uppercase tracking-wider text-slate-800 dark:text-slate-200 font-mono">
          Course Curriculum
        </h3>
        <span className="text-xs font-mono text-slate-500">
          {course.modules.length} {course.modules.length === 1 ? 'Module' : 'Modules'}
        </span>
      </div>

      <div className="space-y-3">
        {course.modules.map((module: CourseModule) => {
          const isOpen = openModuleIds.includes(module.id);
          const moduleCompletedCount = module.lessons.filter((l) =>
            completedLessonIds.includes(l.id)
          ).length;

          return (
            <div
              key={module.id}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] overflow-hidden"
            >
              {/* Module Header Toggle */}
              <button
                type="button"
                onClick={() => toggleModule(module.id)}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  {isOpen ? (
                    <ChevronDown className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                      {module.title}
                    </h4>
                    <span className="text-[11px] font-mono text-slate-500">
                      {moduleCompletedCount}/{module.lessons.length} completed
                    </span>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-emerald-400 shrink-0">
                  {Math.round((moduleCompletedCount / (module.lessons.length || 1)) * 100)}%
                </div>
              </button>

              {/* Module Lessons List */}
              {isOpen && (
                <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {module.lessons.map((lesson: Lesson) => {
                    const isActive = lesson.id === activeLessonId;
                    const isDone = completedLessonIds.includes(lesson.id);

                    return (
                      <div
                        key={lesson.id}
                        className={`flex items-start justify-between p-3.5 gap-3 transition-colors ${
                          isActive
                            ? 'bg-emerald-500/10 border-l-4 border-l-emerald-500'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-900/40'
                        }`}
                      >
                        {/* Completion Checkbox Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onToggleComplete?.(lesson.id);
                          }}
                          className="mt-0.5 text-slate-400 hover:text-emerald-400 transition-colors shrink-0"
                          title={isDone ? 'Mark uncompleted' : 'Mark completed'}
                          aria-label={isDone ? 'Mark uncompleted' : 'Mark completed'}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-400" />
                          )}
                        </button>

                        {/* Lesson Link */}
                        <Link
                          href={`/courses/${course.slug}?lesson=${lesson.slug}`}
                          className="flex-1 min-w-0"
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-mono text-slate-400">
                              #{lesson.order}
                            </span>
                            <span
                              className={`text-xs font-medium leading-snug line-clamp-2 ${
                                isActive
                                  ? 'text-emerald-400 font-bold'
                                  : isDone
                                  ? 'text-slate-500 line-through'
                                  : 'text-slate-800 dark:text-slate-200'
                              }`}
                            >
                              {lesson.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 mt-1.5 text-[11px] font-mono text-slate-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {lesson.durationMinutes}m
                            </span>
                            {isActive && (
                              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                                <PlayCircle className="w-3 h-3" /> Now Playing
                              </span>
                            )}
                          </div>
                        </Link>
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

