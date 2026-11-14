import React from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] text-xs mt-auto transition-colors">
      <div className="container-max py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[var(--accent-cyan)] flex items-center justify-center text-[#090D14]">
                <Shield className="w-3.5 h-3.5 fill-current stroke-none" />
              </div>
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
                  Legal Practice Labs
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
              Strictly non-commercial education. All offensive skills must be tested strictly within authorized lab environments.
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
            </ul>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded bg-[var(--surface-subtle)] border border-[var(--border)] text-[10px] font-mono text-[var(--accent-cyan)]">
                Zero Ads
              </span>
              <span className="px-2 py-0.5 rounded bg-[var(--surface-subtle)] border border-[var(--border)] text-[10px] font-mono text-[var(--accent-cyan)]">
                WCAG 2.2 AA
              </span>
              <span className="px-2 py-0.5 rounded bg-[var(--surface-subtle)] border border-[var(--border)] text-[10px] font-mono text-[var(--accent-emerald)]">
                100% Free
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--border)] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[var(--text-muted)]">
          <div>
            © {new Date().getFullYear()} CyberTube. Open Practical Cybersecurity Education.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy" className="hover:text-[var(--accent-cyan)] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[var(--accent-cyan)] transition-colors">Terms</Link>
            <Link href="/ethics" className="hover:text-[var(--accent-cyan)] transition-colors">Ethics</Link>
            <Link href="/about" className="hover:text-[var(--accent-cyan)] transition-colors">About</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
