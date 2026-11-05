import React from 'react';
import type { Metadata } from 'next';
import { getAllAuthoritativeSkills, getAllAuthoritativeResources } from '@/lib/authoritativeCatalog';
import SkillsClientView from '@/components/skills/SkillsClientView';

export const metadata: Metadata = {
  title: 'Skills Map & Core Competencies | CyberTube',
  description:
    'Comprehensive cybersecurity skills matrix covering foundations, defensive operations, offensive techniques, scripting, and cloud security with progress tracking.',
};

export default function SkillsPage() {
  const skills = getAllAuthoritativeSkills();
  const resources = getAllAuthoritativeResources();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0F17] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">
            <span>[ SKILLS MATRIX ]</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Cybersecurity Skills Map
          </h1>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400 max-w-3xl">
            A practical inventory of what competent security practitioners actually know and do. Check off skills as you study to identify strengths and fill knowledge gaps.
          </p>
        </div>

        <SkillsClientView skills={skills} resources={resources} />
      </div>
    </div>
  );
}

