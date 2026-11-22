import React, { Suspense } from 'react';
import { TryHackMeRoadmapExplorer } from '@/components/tryhackme/TryHackMeRoadmapExplorer';
import Link from 'next/link';
import { Metadata } from 'next';
import { ExternalLink, Shield, CheckCircle2, AlertCircle } from 'lucide-react';
import { getAllAuthoritativeResources } from '@/lib/authoritativeCatalog';

export const metadata: Metadata = {
  title: 'Practical Labs & TryHackMe Free Rooms | CyberTube',
  description: 'Explore source-listed free TryHackMe rooms and authorized cybersecurity practical labs, grouped by topic and difficulty.',
};

export default function LabsPage() {
  const labResources = getAllAuthoritativeResources().filter((r) => r.type === 'lab');

  return (
    <div className="container-max py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
          Practical Labs & Wargames
        </h1>
        <p className="text-sm sm:text-base text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
          Choose a TryHackMe room by topic and difficulty, or browse the other practice platforms below.
        </p>
      </div>

      {/* Rules of engagement card */}
      <div className="rounded-xl border border-[#34D399]/30 bg-[#34D399]/5 p-6 flex items-start gap-4">
        <Shield className="w-6 h-6 text-[#34D399] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h2 className="text-base font-bold text-[#0F172A] dark:text-[#E6EDF3] font-space-grotesk">
            Rule Number One of Cybersecurity Practice
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
            Only test systems you own or have explicit written permission to test. Never run tools against public websites, campus networks, or companies without formal authorization. These labs provide legal permission to break things.
          </p>
        </div>
      </div>

      {/* The free TryHackMe room explorer is part of Practical Labs, not a separate coming-soon feature. */}
      <section id="tryhackme" className="scroll-mt-24 space-y-5" aria-label="TryHackMe free practical labs">
        <Suspense fallback={<div className="rounded-xl border border-[var(--border)] p-8 text-sm text-[var(--text-secondary)]">Loading TryHackMe free labs…</div>}>
          <TryHackMeRoadmapExplorer />
        </Suspense>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">More Practical Lab Platforms</h2>
        <p className="text-sm text-[var(--text-secondary)]">Additional authorized training environments and wargames.</p>
      </section>

      {/* Grid of Labs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {labResources.map((lab) => (
          <div
            key={lab.id}
            className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 space-y-4 flex flex-col justify-between hover:border-[#22D3EE]/50 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 text-xs font-mono uppercase tracking-wider rounded-md bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/30">
                  {lab.level}
                </span>
                <span className="text-xs font-mono text-[#34D399]">
                  {lab.cost === 'free' ? '100% Free' : 'Free Tier Available'}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
                  {lab.title}
                </h3>
                <p className="text-xs text-[#475569] dark:text-[#9BA8B7]">
                  Provided by <strong className="text-[#0F172A] dark:text-[#E6EDF3]">{lab.creator}</strong>
                </p>
              </div>

              <p className="text-xs text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
                {lab.notes}
              </p>
            </div>

            <div className="pt-4 border-t border-[#E2E8F0] dark:border-[#243044] flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#9BA8B7]">
                ID: {lab.id}
              </span>
              <a
                href={lab.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0E7490] dark:bg-[#22D3EE] text-white dark:text-[#0B1018] font-semibold text-xs hover:opacity-90 transition-opacity"
              >
                <span>Launch Platform</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
