import React from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#E2E8F0] dark:border-[#243044] bg-[#F8FAFC] dark:bg-[#0B1018] text-[#475569] dark:text-[#9BA8B7] text-xs mt-auto transition-colors">
      <div className="container-max py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-1 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-[4px] bg-[#0E7490] dark:bg-[#22D3EE] flex items-center justify-center text-white dark:text-[#0B1018]">
                <Shield className="w-3.5 h-3.5 fill-current stroke-none" />
              </div>
              <span className="font-semibold text-sm text-[#0F172A] dark:text-[#E6EDF3]">
                CyberTube
              </span>
            </Link>
            <p className="text-xs text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
              Curated free cybersecurity video courses, roadmaps, and legal practice labs.
            </p>
            <p className="text-[11px] font-mono text-[#475569] dark:text-[#9BA8B7] pt-1">
              Videos belong to their creators. This site is not affiliated with them. Links last checked Nov 2026.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-mono text-[11px] font-medium uppercase tracking-wider text-[#0F172A] dark:text-[#E6EDF3] mb-3">
              Learning Paths
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/learning-paths/foundations" className="hover:text-[#0E7490] dark:hover:text-[#22D3EE] transition-colors">
                  Path A — Foundations
                </Link>
              </li>
              <li>
                <Link href="/learning-paths/security-plus" className="hover:text-[#0E7490] dark:hover:text-[#22D3EE] transition-colors">
                  Path B — Security+ Track
                </Link>
              </li>
              <li>
                <Link href="/learning-paths/ethical-hacking" className="hover:text-[#0E7490] dark:hover:text-[#22D3EE] transition-colors">
                  Path C — Ethical Hacking
                </Link>
              </li>
              <li>
                <Link href="/learning-paths/web-application-security" className="hover:text-[#0E7490] dark:hover:text-[#22D3EE] transition-colors">
                  Path D — Web App Security
                </Link>
              </li>
              <li>
                <Link href="/learning-paths/coming-soon" className="hover:text-[#0E7490] dark:hover:text-[#22D3EE] transition-colors">
                  Path E — Emerging Tracks
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Practice */}
          <div>
            <h3 className="font-mono text-[11px] font-medium uppercase tracking-wider text-[#0F172A] dark:text-[#E6EDF3] mb-3">
              Platform & Labs
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/library" className="hover:text-[#0E7490] dark:hover:text-[#22D3EE] transition-colors">
                  Course Library (21 Resources)
                </Link>
              </li>
              <li>
                <Link href="/labs" className="hover:text-[#0E7490] dark:hover:text-[#22D3EE] transition-colors">
                  Legal Practice Labs
                </Link>
              </li>
              <li>
                <Link href="/ethics" className="hover:text-[#0E7490] dark:hover:text-[#22D3EE] transition-colors">
                  Rules of Engagement & Ethics
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#0E7490] dark:hover:text-[#22D3EE] transition-colors">
                  About & Suggest a Resource
                </Link>
              </li>
            </ul>
          </div>

          {/* Skills & Reference */}
          <div>
            <h3 className="font-mono text-[11px] font-medium uppercase tracking-wider text-[#0F172A] dark:text-[#E6EDF3] mb-3">
              Skills & Reference
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/skills" className="hover:text-[#0E7490] dark:hover:text-[#22D3EE] transition-colors">
                  Skills Map & Checklist
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="hover:text-[#0E7490] dark:hover:text-[#22D3EE] transition-colors">
                  Certifications Guide
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[#0E7490] dark:hover:text-[#22D3EE] transition-colors">
                  Career Pathways & Roles
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="hover:text-[#0E7490] dark:hover:text-[#22D3EE] transition-colors">
                  Cybersecurity Glossary
                </Link>
              </li>
              <li>
                <Link href="/cheat-sheets" className="hover:text-[#0E7490] dark:hover:text-[#22D3EE] transition-colors">
                  Linux & Ports Cheat Sheets
                </Link>
              </li>
            </ul>
          </div>

          {/* Standards & Transparency */}
          <div>
            <h3 className="font-mono text-[11px] font-medium uppercase tracking-wider text-[#0F172A] dark:text-[#E6EDF3] mb-3">
              Governance & Integrity
            </h3>
            <p className="text-xs text-[#475569] dark:text-[#9BA8B7] leading-relaxed mb-3">
              Zero telemetry ads. Strict click-to-load embeds. All practice exercises must be executed within authorized boundaries.
            </p>
            <ul className="space-y-1.5 text-xs mb-3">
              <li>
                <Link href="/privacy" className="hover:text-[#0E7490] dark:hover:text-[#22D3EE] transition-colors flex items-center gap-1 font-medium">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#0E7490] dark:hover:text-[#22D3EE] transition-colors flex items-center gap-1 font-medium">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/ethics" className="hover:text-[#0E7490] dark:hover:text-[#22D3EE] transition-colors flex items-center gap-1">
                  Rules of Engagement & Ethics
                </Link>
              </li>
            </ul>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 rounded bg-white dark:bg-[#121A26] border border-[#E2E8F0] dark:border-[#243044] text-[11px] font-mono text-[#0E7490] dark:text-[#22D3EE]">
                Open Education
              </span>
              <span className="px-2 py-1 rounded bg-white dark:bg-[#121A26] border border-[#E2E8F0] dark:border-[#243044] text-[11px] font-mono text-[#0E7490] dark:text-[#22D3EE]">
                Strictly Legal
              </span>
              <span className="px-2 py-1 rounded bg-white dark:bg-[#121A26] border border-[#E2E8F0] dark:border-[#243044] text-[11px] font-mono text-[#0E7490] dark:text-[#22D3EE]">
                WCAG 2.2 AA
              </span>
              <span className="px-2 py-1 rounded bg-white dark:bg-[#121A26] border border-[#E2E8F0] dark:border-[#243044] text-[11px] font-mono text-[#047857] dark:text-[#34D399]">
                Verified 2026-11
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-[#E2E8F0] dark:border-[#243044] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#475569] dark:text-[#9BA8B7]">
          <div>
            © {new Date().getFullYear()} CyberTube. Open Practical Cybersecurity Education.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy" className="hover:text-[#0E7490] dark:hover:text-[#22D3EE] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[#0E7490] dark:hover:text-[#22D3EE] transition-colors">
              Terms
            </Link>
            <Link href="/ethics" className="hover:text-[#0E7490] dark:hover:text-[#22D3EE] transition-colors">
              Ethics
            </Link>
            <Link href="/about" className="hover:text-[#0E7490] dark:hover:text-[#22D3EE] transition-colors">
              About
            </Link>
            <Link href="/library" className="hover:text-[#0E7490] dark:hover:text-[#22D3EE] transition-colors">
              Library
            </Link>
            <Link href="/learning-paths" className="hover:text-[#0E7490] dark:hover:text-[#22D3EE] transition-colors">
              Paths
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
