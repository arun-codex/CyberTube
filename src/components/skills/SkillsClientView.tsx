'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SkillItem, Resource } from '@/types/catalog';

interface SkillsClientViewProps {
  skills: SkillItem[];
  resources: Resource[];
}

export default function SkillsClientView({ skills, resources }: SkillsClientViewProps) {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'all',
    'Foundations',
    'Security basics',
    'Scripting',
    'Defensive',
    'Offensive',
    'Cloud & AI security',
    'Soft skills',
  ];

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cybertube_skills_completed');
      if (stored) {
        setCompletedIds(JSON.parse(stored));
      }
    } catch {
      // LocalStorage access fail-safe
    }
  }, []);

  const toggleSkill = (id: string) => {
    setCompletedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('cybertube_skills_completed', JSON.stringify(next));
      } catch {
        // LocalStorage access fail-safe
      }
      return next;
    });
  };

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    const matchesSearch =
      skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.beginnerExplanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalSkills = skills.length;
  const completedCount = completedIds.length;
  const percentComplete = totalSkills > 0 ? Math.round((completedCount / totalSkills) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Progress Card */}
      <div className="bg-white dark:bg-[#121A26] rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your Skills Progress</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Track mastery of core competencies across cybersecurity domains. Progress saved locally.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              {percentComplete}%
            </span>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              ({completedCount} of {totalSkills} skills mastered)
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
          <div
            className="bg-emerald-500 h-3 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${percentComplete}%` }}
          />
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="w-full md:w-72">
          <input
            type="text"
            placeholder="Search skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSkills.map((skill) => {
          const isDone = completedIds.includes(skill.id);
          const relatedRes = resources.filter((r) => skill.linkedResourceIds.includes(r.id));

          return (
            <div
              key={skill.id}
              className={`rounded-xl border transition-all p-6 ${
                isDone
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                  : 'bg-white dark:bg-[#121A26] border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="space-y-1">
                  <span className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {skill.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {skill.title}
                  </h3>
                </div>

                {/* Completion Checkbox */}
                <button
                  type="button"
                  onClick={() => toggleSkill(skill.id)}
                  aria-label={`Mark ${skill.title} as ${isDone ? 'incomplete' : 'completed'}`}
                  className={`flex-shrink-0 w-7 h-7 rounded-lg border flex items-center justify-center transition-colors ${
                    isDone
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-300 dark:border-slate-600 hover:border-emerald-500 text-transparent'
                  }`}
                >
                  <svg className="w-4 h-4 fill-current stroke-current" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {/* Beginner Explanation */}
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                {skill.beginnerExplanation}
              </p>

              {/* What Good Looks Like */}
              <div className="mb-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  What Good Looks Like
                </h4>
                <ul className="space-y-1.5">
                  {skill.whatGoodLooksLike.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <span className="text-emerald-500 font-bold mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Linked Study Materials */}
              {relatedRes.length > 0 && (
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                    Recommended Study Resources
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {relatedRes.map((r) => (
                      <Link
                        key={r.id}
                        href={`/library/${r.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded"
                      >
                        <span>{r.title}</span>
                        <span className="text-[10px] text-slate-500">({r.creator})</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-[#121A26] rounded-xl border border-slate-200 dark:border-slate-800">
          <p className="text-slate-600 dark:text-slate-400">No skills match your active filters.</p>
        </div>
      )}
    </div>
  );
}

