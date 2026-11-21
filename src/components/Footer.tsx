import React from 'react';
import Link from 'next/link';
import { CyberTubeLogo } from './ui/CyberTubeLogo';
import { SupportCyberTubeButton } from './support/SupportCyberTubeButton';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] text-xs mt-auto transition-colors">
      <div className="container-max py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <CyberTubeLogo size={24} showText={false} className="shrink-0" />
              <span className="font-semibold text-sm text-[var(--text-primary)]">
                CyberTube
              </span>
            </Link>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Curated free cybersecurity video courses, roadmaps, and legal practice labs.
            </p>
            <p className="text-[11px] font-mono text-[var(--text-muted)] pt-1">
              Videos belong to their creators. Content verified November 2026.
            </p>
          </div>

          {/* Learn & Paths */}
          <div>
            <h2 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-3">
              Curriculum & Paths
            </h2>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/learning-paths" className="hover:text-[var(--accent-cyan)] transition-colors">
                  All Learning Paths
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-[var(--accent-cyan)] transition-colors">
                  Course Catalog
                </Link>
              </li>
              <li>
                <Link href="/discover" className="hover:text-[var(--accent-cyan)] transition-colors">
                  Topic Explorer
                </Link>
              </li>
              <li>
                <Link href="/library" className="hover:text-[var(--accent-cyan)] transition-colors">
                  Resource Library
                </Link>
              </li>
            </ul>
          </div>

          {/* Practice & Reference */}
          <div>
            <h2 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-3">
              Practice & Reference
            </h2>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/labs" className="hover:text-[var(--accent-cyan)] transition-colors">
                  Practical Labs
                </Link>
              </li>
              <li>
                <Link href="/skills" className="hover:text-[var(--accent-cyan)] transition-colors">
                  Skills Map & Checklist
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="hover:text-[var(--accent-cyan)] transition-colors">
                  Certifications Guide
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[var(--accent-cyan)] transition-colors">
                  Career Pathways
                </Link>
              </li>
              <li>
                <Link href="/cheat-sheets" className="hover:text-[var(--accent-cyan)] transition-colors">
                  Linux & Ports Cheat Sheets
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="hover:text-[var(--accent-cyan)] transition-colors">
                  Cybersecurity Glossary
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance & Trust */}
          <div>
            <h2 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-3">
              Governance & Integrity
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">
              Free-first education. Support is optional and never required for learning. Only practise security skills in authorized lab environments.
            </p>
            <ul className="space-y-1.5 text-xs mb-3">
              <li>
                <Link href="/ethics" className="hover:text-[var(--accent-cyan)] transition-colors font-medium">
                  Rules of Engagement & Ethics
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[var(--accent-cyan)] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[var(--accent-cyan)] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[var(--accent-cyan)] transition-colors">
                  About CyberTube
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-[var(--accent-cyan)] transition-colors">
                  Support CyberTube ☕
                </Link>
              </li>
            </ul>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded bg-[var(--surface-subtle)] border border-[var(--border)] text-[10px] font-mono text-[var(--accent-cyan)]">
                Zero Ads
              </span>
              <span className="px-2 py-0.5 rounded bg-[var(--surface-subtle)] border border-[var(--border)] text-[10px] font-mono text-[var(--accent-cyan)]">
                Accessibility improvements ongoing
              </span>
              <span className="px-2 py-0.5 rounded bg-[var(--surface-subtle)] border border-[var(--border)] text-[10px] font-mono text-[var(--accent-emerald)]">
                100% Free
              </span>
            </div>
          </div>
        </div>

        {/* In normal document flow on every page, never fixed or floating. */}
        <section
          id="support-cybertube"
          aria-labelledby="support-cybertube-title"
          className="scroll-mt-24 mt-10 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] px-5 py-6 sm:px-7 sm:py-7"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl space-y-2">
              <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--accent-cyan)]">
                Support free education
              </p>
              <h2 id="support-cybertube-title" className="text-xl font-bold text-[var(--text-primary)]">
                Help CyberTube keep learning free ☕
              </h2>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                Support free cybersecurity education. Buy us a chai!
                Every contribution is optional, and courses and labs remain free.
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                Direct UPI support is optional. Confirm the payee and amount in your banking app before paying.
              </p>
            </div>
            <SupportCyberTubeButton className="w-full sm:w-auto sm:shrink-0" />
          </div>
        </section>

        <div className="border-t border-[var(--border)] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[var(--text-muted)]">
          <div>
            © {new Date().getFullYear()} CyberTube. Open Practical Cybersecurity Education.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy" className="hover:text-[var(--accent-cyan)] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[var(--accent-cyan)] transition-colors">Terms</Link>
            <Link href="/ethics" className="hover:text-[var(--accent-cyan)] transition-colors">Ethics</Link>
            <Link href="/support" className="hover:text-[var(--accent-cyan)] transition-colors">Support ☕</Link>
            <Link href="/about" className="hover:text-[var(--accent-cyan)] transition-colors">About</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
