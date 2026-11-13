'use client';

import React from 'react';
import { Award } from 'lucide-react';

interface LessonSkillsSectionProps {
  skills: string[];
}

export const LessonSkillsSection: React.FC<LessonSkillsSectionProps> = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

  return (
    <div className="p-5 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] space-y-3">
      <h3 className="text-xs font-mono font-medium uppercase tracking-wider text-[#64748B] dark:text-[#9BA8B7] flex items-center gap-1.5">
        <Award className="w-4 h-4 text-[#0E7490] dark:text-[#22D3EE]" />
        <span>Skills Acquired</span>
      </h3>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="px-2 py-0.5 rounded-[4px] text-xs font-mono bg-[#f4f4f9] dark:bg-[#1A2638] text-[#334155] dark:text-[#CBD5E1] border border-[#e4e4ed] dark:border-[#243044]"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

