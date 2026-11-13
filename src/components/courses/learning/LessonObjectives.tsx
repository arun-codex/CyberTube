'use client';

import React from 'react';
import { Target } from 'lucide-react';

interface LessonObjectivesProps {
  objectives: string[];
}

export const LessonObjectives: React.FC<LessonObjectivesProps> = ({ objectives }) => {
  if (!objectives || objectives.length === 0) return null;

  return (
    <div className="p-5 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] space-y-3">
      <h3 className="text-xs font-mono font-medium uppercase tracking-wider text-[#64748B] dark:text-[#9BA8B7] flex items-center gap-1.5">
        <Target className="w-4 h-4 text-[#0E7490] dark:text-[#22D3EE]" />
        <span>Lesson Objectives</span>
      </h3>
      <ul className="space-y-2 text-xs text-[#334155] dark:text-[#CBD5E1]">
        {objectives.map((obj, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-[#0E7490] dark:text-[#22D3EE] font-bold shrink-0 mt-0.5">•</span>
            <span>{obj}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

