import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Mail, Github, BookOpen, ExternalLink, RefreshCw } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About CyberTube | Curated Cybersecurity Education',
  description: 'CyberTube is an open, structured learning portal for cybersecurity students, school/college learners, and career-switchers.',
};

export default function AboutPage() {
  return (
    <div className="container-max py-10 space-y-10 max-w-4xl">
      {/* Title */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#0E7490] dark:text-[#22D3EE]">
          <BookOpen className="w-4 h-4" />
          <span>About CyberTube</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
          Democratizing Practical Cybersecurity Education
        </h1>
        <p className="text-sm sm:text-base text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
          CyberTube was built to solve the single biggest problem faced by aspiring cybersecurity students: <strong>too many fragmented tutorials, no clear sequence, and no clear path to practice safely</strong>.
        </p>
      </div>

      {/* Target Audience & Approach */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 space-y-3">
          <h2 className="text-base font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
            Target Audience
          </h2>
          <p className="text-xs text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
            Designed specifically for complete beginners, high school/college students, and career-switchers targeting roles as SOC analysts, junior ethical hackers, application security specialists, or GRC associates.
          </p>
        </div>

        <div className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 space-y-3">
          <h2 className="text-base font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
            Realistic Expectations
          </h2>
          <p className="text-xs text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
            No hype and no false promises of becoming a &ldquo;hacker in 30 days&rdquo;. Real mastery requires 6–12 months of dedicated study at 1–2 hours per day combining theory and keyboard time.
          </p>
        </div>
      </div>

      {/* Creator Attribution and Integrity Policy */}
      <div className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3] flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#34D399]" />
          <span>Creator Attribution & Ethical Delivery</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
          Every video, course, and playlist curated on CyberTube remains the intellectual property of its creator. We do not download, duplicate, copy, or monetize creator media. All videos are presented with direct creator credit, links to official channels, and privacy-friendly click-to-load embeds.
        </p>
        <div className="pt-2 text-xs font-mono text-[#0E7490] dark:text-[#22D3EE]">
          Footer verification standard: &ldquo;Videos belong to their creators. This site is not affiliated with them. Links last checked Nov 2026.&rdquo;
        </div>
      </div>

      {/* Suggest a Resource Section */}
      <div className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-[#F8FAFC] dark:bg-[#1A2433] p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
          Suggest a Free Resource
        </h2>
        <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
          Have you produced or discovered an outstanding, free, publicly available cybersecurity course or practice environment? Suggest it for our curriculum committee review. We require high technical accuracy, no paywalls, and responsible learning standards.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <a
            href="https://github.com/arun-codex/CyberTube/issues/new?title=Resource+Suggestion&labels=curriculum"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0F172A] dark:bg-[#243044] text-white font-medium text-xs hover:bg-[#1E293B] transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>Open GitHub Issue</span>
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
          <a
            href="mailto:curriculum@cybertube.org?subject=Resource%20Suggestion"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0E7490] dark:bg-[#22D3EE] text-white dark:text-[#0B1018] font-semibold text-xs hover:opacity-90 transition-opacity"
          >
            <Mail className="w-4 h-4" />
            <span>Email Curriculum Team</span>
          </a>
        </div>
      </div>
    </div>
  );
}

