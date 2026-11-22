import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Clock, Layers } from 'lucide-react';
import { getAllAuthoritativePaths } from '@/lib/authoritativeCatalog';

export const metadata: Metadata = {
  title: 'Learning Pathways A–E | CyberTube',
  description: 'Five structured, step-by-step cybersecurity learning roadmaps from complete beginner fundamentals to ethical hacking and application security.',
};

export default function LearningPathsIndexPage() {
  const paths = getAllAuthoritativePaths();

  return (
    <div className="container-max py-10 space-y-10">
      {/* Page Title */}
      <div className="space-y-3 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
          Cybersecurity Learning Paths A–E
        </h1>
        <p className="text-sm sm:text-base text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
          Choose a path to see its courses and practice labs in study order.
        </p>

        {/* Coming Soon Notice */}
        <div className="flex items-center gap-2.5 p-3.5 rounded-lg border border-amber-500/30 bg-amber-500/10 text-xs text-amber-800 dark:text-amber-300">
          <span className="font-bold uppercase tracking-wider font-mono text-[11px] px-2 py-0.5 rounded bg-amber-500/20 shrink-0">
            Coming Soon
          </span>
          <span className="leading-relaxed">
            Learning Paths A–E are currently in active curriculum development. You can preview all path milestones, companion labs, and syllabi below while interactive progress tracking is finalized.
          </span>
        </div>
      </div>

      <section className="rounded-xl border border-[#22D3EE]/30 bg-[#22D3EE]/5 p-5 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-base font-bold text-[#0F172A] dark:text-[#E6EDF3]">
            TryHackMe Free Labs (Free)
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7]">
            Available now in Practical Labs: source-listed free TryHackMe rooms, skill levels, and signed-in server-synced completion.
          </p>
        </div>
        <Link href="/labs#tryhackme" className="shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#0E7490] dark:bg-[#22D3EE] text-white dark:text-[#0B1018] text-xs font-semibold hover:opacity-90">
          Open Practical Labs <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Grid of 5 Paths */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paths.map((path) => (
          <div
            key={path.id}
            className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] overflow-hidden flex flex-col justify-between hover:border-[#22D3EE]/50 hover:shadow-md transition-all duration-200"
          >
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 text-xs font-mono uppercase tracking-wider rounded-md bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/30">
                    {path.level}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-md bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 font-semibold">
                    Coming Soon
                  </span>
                </div>
                <span className="text-xs font-mono text-[#475569] dark:text-[#9BA8B7]">
                  {path.duration}
                </span>
              </div>

              <div>
                <h2 className="text-lg font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
                  {path.title}
                </h2>
                <p className="text-xs text-[#0E7490] dark:text-[#22D3EE] font-medium mt-0.5">
                  {path.subtitle}
                </p>
              </div>

              <p className="text-xs text-[#475569] dark:text-[#9BA8B7] leading-relaxed line-clamp-3">
                {path.description}
              </p>

              {path.steps && (
                <div className="pt-2 text-xs font-mono text-[#475569] dark:text-[#9BA8B7]">
                  {path.steps.length} sequential learning milestones
                </div>
              )}

              {path.tracks && (
                <div className="pt-2 text-xs font-mono text-[#FBBF24]">
                  {path.tracks.length} specialized sub-tracks under review
                </div>
              )}
            </div>

            <div className="p-4 bg-[#F8FAFC] dark:bg-[#1A2433]/50 border-t border-[#E2E8F0] dark:border-[#243044]">
              <Link
                href={`/learning-paths/${path.slug}`}
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-[#0E7490] dark:bg-[#22D3EE] text-white dark:text-[#0B1018] font-semibold text-xs hover:opacity-90 transition-opacity"
              >
                <span>View Roadmap & Syllabus</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
