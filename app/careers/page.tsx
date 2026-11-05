import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllAuthoritativeCareers } from '@/lib/authoritativeCatalog';

export const metadata: Metadata = {
  title: 'Cybersecurity Career Pathways & Roles | CyberTube',
  description:
    'Comprehensive career guide detailing daily responsibilities, required skills, certifications, and progression ladders for SOC Analysts, Pentesters, AppSec, and Cloud Security engineers.',
};

export default function CareersPage() {
  const careers = getAllAuthoritativeCareers();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0F17] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">
            <span>[ CAREER DISCOVERY ]</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Cybersecurity Career Pathways
          </h1>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400 max-w-3xl">
            Cybersecurity is not a monolithic field. Explore real-world day-to-day responsibilities, essential technical competencies, and step-by-step career progression ladders across core security disciplines.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {careers.map((career) => (
            <div
              key={career.id}
              className="bg-white dark:bg-[#121A26] rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 mb-2">
                      {career.category}
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      {career.title}
                    </h2>
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {career.summary}
                </p>

                {/* Daily Responsibilities */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Day-to-Day Responsibilities
                  </h3>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    {career.dailyResponsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Skills */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Key Technical Competencies
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {career.keySkills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Entry Certifications */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Relevant Industry Certifications
                  </h3>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    {career.entryCertifications.map((cert, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-sky-500 font-bold">✓</span>
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Progression Ladder */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Career Progression Ladder
                  </h3>
                  <div className="space-y-1.5 border-l-2 border-emerald-500/40 pl-3">
                    {career.progression.map((step, idx) => (
                      <div key={idx} className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
                        <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                          0{idx + 1}.
                        </span>
                        <span className={idx === 0 ? 'font-medium text-slate-900 dark:text-white' : ''}>
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommended Learning Paths */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-2">
                  Recommended CyberTube Tracks:
                </span>
                <div className="flex flex-wrap gap-2">
                  {career.recommendedPaths.map((pathName, idx) => (
                    <Link
                      key={idx}
                      href="/learning-paths"
                      className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded"
                    >
                      {pathName} →
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

