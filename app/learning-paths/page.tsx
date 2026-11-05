import React from 'react';
import Link from 'next/link';
import { Shield, CheckCircle2, ArrowRight, BookOpen, Clock, AlertTriangle, ExternalLink } from 'lucide-react';
import { getAllLearningPaths } from '@/lib/learning-paths';

export const metadata = {
  title: 'Cybersecurity Learning Paths | CyberTube',
  description: 'Structured, hands-on cybersecurity learning pathways from networking fundamentals to advanced offensive operations.',
};

export default function LearningPathsIndexPage() {
  const paths = getAllLearningPaths();

  return (
    <div className="container-max py-10 space-y-10">
      {/* Header Banner */}
      <div className="rounded-[8px] border border-[#e4e4ed] dark:border-[#1E293B] bg-white dark:bg-[#121A26] p-6 sm:p-8 space-y-4">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-[#f4f4f9] dark:bg-[#1E293B] border border-[#e4e4ed] dark:border-[#334155] text-xs font-mono text-[#303055] dark:text-[#22D3EE]">
          <Shield className="w-3.5 h-3.5 text-[#303055] dark:text-[#22D3EE]" />
          <span>Structured Technical Education</span>
        </div>
        <h1 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#303055] dark:text-[#E6EDF3]">
          Cybersecurity Learning Pathways
        </h1>
        <p className="text-sm sm:text-base text-[#403f53] dark:text-[#94A3B8] max-w-2xl leading-relaxed">
          Follow ordered technical curriculum paths designed by practitioners. Each stage incorporates verified playlist lectures, hands-on lab exercises, and practical verification.
        </p>
      </div>

      {/* Pathways Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paths.map((path) => (
          <div
            key={path.id}
            className="rounded-[8px] border border-[#e4e4ed] dark:border-[#1E293B] bg-white dark:bg-[#121A26] p-6 flex flex-col justify-between space-y-6 hover:border-[#303055] dark:hover:border-[#22D3EE] transition-colors"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded-[4px] bg-[#f4f4f9] dark:bg-[#1E293B] border border-[#e4e4ed] dark:border-[#334155] text-[#303055] dark:text-[#22D3EE]">
                  {path.stages.length} Stages
                </span>
                <span className="text-xs font-mono text-[#6b6b7b] dark:text-[#64748B] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  ~{path.estimatedTotalHours} hours
                </span>
              </div>

              <h2 className="font-rajdhani text-xl font-bold text-[#303055] dark:text-[#E6EDF3]">
                {path.title}
              </h2>

              <p className="text-xs text-[#403f53] dark:text-[#94A3B8] leading-relaxed line-clamp-3">
                {path.description}
              </p>

              {path.certificationTarget && (
                <div className="pt-2 border-t border-[#e4e4ed] dark:border-[#1E293B] text-[11px] font-mono text-[#6b6b7b] dark:text-[#94A3B8] flex items-center justify-between">
                  <span>Target Exam:</span>
                  <span className="font-semibold text-[#303055] dark:text-[#22D3EE]">
                    {path.certificationTarget.name} ({path.certificationTarget.examCode})
                  </span>
                </div>
              )}
            </div>

            <Link
              href={`/learning-paths/${path.slug}`}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-[4px] bg-[#303055] dark:bg-[#22D3EE] text-white dark:text-[#0B1018] hover:bg-[#252542] dark:hover:bg-[#67e8f9] text-xs font-mono font-medium transition-colors min-h-[44px]"
            >
              <span>Explore Curriculum</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>

      {/* Ethics & Legal Boundaries Callout */}
      <div className="p-6 rounded-[8px] border border-[#a5d6a7] dark:border-[#2e7d32] bg-[#e8f5e9]/40 dark:bg-[#132d18]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#2e7d32] dark:text-[#a5d6a7] shrink-0" />
          <div className="space-y-0.5">
            <h4 className="text-xs font-mono font-semibold text-[#2e7d32] dark:text-[#a5d6a7] uppercase tracking-wider">
              Legal & Responsible Learning Policy
            </h4>
            <p className="text-xs text-[#403f53] dark:text-[#94A3B8]">
              All practical exercises must be carried out strictly against systems you own or have explicit authorization to test.
            </p>
          </div>
        </div>
        <Link
          href="/ethics"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-white dark:bg-[#1E293B] border border-[#a5d6a7] dark:border-[#2e7d32] text-xs font-mono text-[#2e7d32] dark:text-[#a5d6a7] hover:underline shrink-0"
        >
          <span>Read Ethics Guidelines</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

