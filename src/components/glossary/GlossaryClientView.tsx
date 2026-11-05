'use client';

import React, { useState } from 'react';
import { GlossaryTerm } from '@/types/catalog';

interface GlossaryClientViewProps {
  terms: GlossaryTerm[];
}

export default function GlossaryClientView({ terms }: GlossaryClientViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'all',
    'Fundamentals',
    'Networking',
    'Threats & Attacks',
    'Defense & Monitoring',
    'Cryptography',
    'Cloud & Architecture',
  ];

  const filteredTerms = terms.filter((term) => {
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      term.term.toLowerCase().includes(q) ||
      term.plainEnglishExplanation.toLowerCase().includes(q) ||
      term.definition.toLowerCase().includes(q) ||
      term.exampleOrAnalogy.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Search and Category Filter */}
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

        {/* Search Input */}
        <div className="w-full md:w-80">
          <input
            type="text"
            placeholder="Search terms, definitions, analogies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
        Showing {filteredTerms.length} of {terms.length} cybersecurity terms
      </div>

      {/* Glossary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTerms.map((item) => (
          <div
            key={item.id}
            id={item.id}
            className="bg-white dark:bg-[#121A26] rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {item.term}
              </h2>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex-shrink-0">
                {item.category}
              </span>
            </div>

            {/* Plain English */}
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                In Plain English:
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {item.plainEnglishExplanation}
              </p>
            </div>

            {/* Analogy */}
            <div className="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 text-xs text-slate-700 dark:text-slate-300">
              <span className="font-bold text-emerald-700 dark:text-emerald-400">Analogy / Real World: </span>
              {item.exampleOrAnalogy}
            </div>

            {/* Formal Definition */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-600 dark:text-slate-400">Formal Definition: </span>
              {item.definition}
            </div>
          </div>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-[#121A26] rounded-xl border border-slate-200 dark:border-slate-800">
          <p className="text-slate-600 dark:text-slate-400">
            No terms found matching &quot;{searchQuery}&quot;. Try a different search term.
          </p>
        </div>
      )}
    </div>
  );
}

