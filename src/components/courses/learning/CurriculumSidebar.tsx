'use client';

import React, { useState, useEffect } from 'react';
import { Layers } from 'lucide-react';
import { NormalizedModule } from '../../../types/learning-view-model';
import { CurriculumModule } from './CurriculumModule';

interface CurriculumSidebarProps {
  modules: NormalizedModule[];
  activeLessonId?: string;
  completedLessonIds: string[];
  courseSlug: string;
  totalLessons: number;
  onSelectLesson: (slug: string) => void;
  onToggleComplete: (lessonId: string) => void;
}

export const CurriculumSidebar: React.FC<CurriculumSidebarProps> = ({
  modules,
  activeLessonId,
  completedLessonIds,
  courseSlug,
  totalLessons,
  onSelectLesson,
  onToggleComplete,
}) => {
  // Initialize with open modules; automatically ensure active lesson's module is open
  const [openModuleIds, setOpenModuleIds] = useState<string[]>(() => {
    return modules.map((m) => m.id);
  });

  useEffect(() => {
    if (activeLessonId) {
      const activeModule = modules.find((m) =>
        m.lessons.some((l) => l.id === activeLessonId)
      );
      if (activeModule && !openModuleIds.includes(activeModule.id)) {
        setOpenModuleIds((prev) => [...prev, activeModule.id]);
      }
    }
  }, [activeLessonId, modules, openModuleIds]);

  const toggleModule = (id: string) => {
    setOpenModuleIds((prev) =>
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
    );
  };

  const completedCount = completedLessonIds.length;
  const coursePercent =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <aside
      aria-label="Course curriculum"
      className="rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] p-4 sm:p-5 space-y-4 max-h-[calc(100vh-8rem)] overflow-y-auto"
    >
      {/* Sidebar Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#e4e4ed] dark:border-[#243044]">
        <div>
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#0E7490] dark:text-[#22D3EE]" />
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#0F172A] dark:text-[#E6EDF3] font-bold">
              CURRICULUM
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[#64748B] dark:text-[#9BA8B7]">
            {modules.length} {modules.length === 1 ? 'Module' : 'Modules'} • {totalLessons} Lessons
          </span>
        </div>

        <span className="text-xs font-mono font-semibold text-[#0E7490] dark:text-[#22D3EE] bg-[#f0fdfa] dark:bg-[#134e4a]/30 px-2 py-0.5 rounded-[4px] border border-[#99f6e4] dark:border-[#115e59]">
          {coursePercent}% Done
        </span>
      </div>

      {/* Modules List */}
      <div className="space-y-2.5">
        {modules.map((module, idx) => (
          <CurriculumModule
            key={module.id}
            module={module}
            moduleIndex={idx}
            isOpen={openModuleIds.includes(module.id)}
            onToggle={() => toggleModule(module.id)}
            activeLessonId={activeLessonId}
            completedLessonIds={completedLessonIds}
            courseSlug={courseSlug}
            onSelectLesson={onSelectLesson}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </div>
    </aside>
  );
};
