'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  Coffee,
  ShieldCheck,
  Server,
  BookOpen,
  Terminal,
  Heart,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { ChaiKitPaymentPanel } from '../../src/components/support/ChaiKitPaymentPanel';
import { ChaiExperienceScene } from '../../src/components/support/ChaiExperienceScene';

export default function SupportPage() {
  useEffect(() => {
    document.title = 'Support CyberTube ☕ | Free Cybersecurity Education';
  }, []);

  return (
    <div className="min-h-screen bg-[var(--canvas)] text-[var(--text-primary)] transition-colors">
      {/* Chai Studio hero: a deliberately lightweight CSS-3D cup, not a payment state. */}
      <section className="chai-support-hero border-b border-[var(--border)]">
        <div className="container-max relative z-10 mx-auto grid items-center gap-4 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 space-y-6">
            <h1 className="chai-support-hero__title text-white">Support CyberTube</h1>
            <p className="text-lg text-[#dccfcb]">If a lesson helped you, buy us a chai to support free cybersecurity education.</p>
          </div>
          <div className="relative mx-auto flex w-full max-w-[360px] justify-center">
            <ChaiExperienceScene size="hero" />
          </div>
        </div>
      </section>

      <div className="container-max mx-auto px-4 pt-7 sm:px-6">
        {/* Always-true handoff notice, irrespective of current server payment mode. */}
        <div className="mx-auto flex max-w-6xl items-start gap-3 rounded-2xl border border-amber-500/25 bg-amber-500/10 p-4 text-sm leading-relaxed text-[var(--text-secondary)]">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" aria-hidden="true" />
          <div>
            <p className="font-semibold text-[var(--text-primary)]">Direct UPI • Verify before paying</p>
            <p className="mt-1 text-xs leading-6">
              If the widget offers Direct UPI, check the recipient and amount in your banking app.
              Opening a payment app never proves a transfer succeeded. In Preview Only mode,
              no payable QR or bank instructions are generated.
            </p>
          </div>
        </div>
      </div>

      {/* Main Support Interaction Area */}
      <div className="container-max mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          {/* Left Column: Genuine ChaiKit Widget (Inline Mode) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="w-full max-w-[480px]">
              <div className="mb-4 flex items-center justify-between text-xs text-[var(--text-muted)] font-mono">
                <span className="flex items-center gap-1.5 text-amber-500 font-semibold">
                  <Coffee className="w-4 h-4" /> ChaiKit Interactive Widget
                </span>
                <span>Powered by ChaiKit</span>
              </div>

              {/* Inline Web Component Mounting Container */}
              <div
                className="chaikit-inline-wrapper chai-support-surface w-full min-w-0 p-3 sm:p-5"
                data-testid="support-page-inline-widget"
              >
                <div className="mb-4 flex items-start justify-between gap-3 border-b border-[var(--border)] pb-4">
                  <div>
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[.16em] text-amber-600 dark:text-amber-300">The chai menu</p>
                    <h2 className="mt-1 text-lg font-bold text-[var(--text-primary)]">Choose your support</h2>
                  </div>
                  <span className="rounded-full bg-amber-500/10 px-2.5 py-1.5 text-[10px] font-semibold text-[var(--text-secondary)]">₹25 recommended</span>
                </div>
                <ChaiKitPaymentPanel />
              </div>

              <div className="mt-3 text-center text-[11px] font-mono text-[var(--text-muted)]">
                Selected default: ₹25 (Kadak Chai) &bull; Custom amounts supported
              </div>
            </div>
          </div>

          {/* Right Column: Transparency, Trust, and What It Supports */}
          <div className="lg:col-span-6 space-y-8">
            {/* What contributions support */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight text-[var(--text-primary)] flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500" /> What Your Contribution Supports
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                CyberTube operates as a community-first educational platform. All lessons,
                labs, tools, and courses remain 100% free with zero paywalls. Voluntary contributions
                help offset:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)]">
                    <Server className="w-4 h-4 text-[var(--accent-cyan)]" />
                    <span>Cloud & Edge Infrastructure</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] leading-normal">
                    Hosting datasets, search indexes, and high-performance video delivery worldwide.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)]">
                    <Terminal className="w-4 h-4 text-[var(--accent-emerald)]" />
                    <span>Practical Labs & Roadmaps</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] leading-normal">
                    Ongoing curriculum updates, TryHackMe free room validations, and packet forensics exercises.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)]">
                    <BookOpen className="w-4 h-4 text-amber-500" />
                    <span>Study Library & PDF Tooling</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] leading-normal">
                    Curated reference manuals, cheat sheets, and accessible reading tools.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)]">
                    <ShieldCheck className="w-4 h-4 text-[var(--accent-rose)]" />
                    <span>Accessibility & Standards</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] leading-normal">
                    WCAG 2.2 AA conformance audits, screen reader optimization, and zero ad trackers.
                  </p>
                </div>
              </div>
            </div>

            {/* Payment & Banking Transparency */}
            <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] space-y-3.5">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Payment Transparency & Safety
              </h3>

              <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Direct Bank Routing:</strong> All live contributions route directly via standard NPCI UPI without third-party platform cuts.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Payee Verification:</strong> Supporters should always check the payee name displayed in their banking app (expected: <em>Arun Kumar</em>) before confirming.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Completely Voluntary:</strong> No educational features, badges, or certificates require payment. CyberTube remains 100% free for everyone.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Sensitive Data:</strong> CyberTube never collects UPI PINs, banking passwords, or payment cards.
                  </span>
                </li>
              </ul>
            </div>

            {/* Quick Navigation Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/courses"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border border-[var(--border)] bg-[var(--surface-subtle)] hover:bg-[var(--surface)] text-[var(--text-primary)] transition-colors"
              >
                <span>Explore Free Courses</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/labs"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border border-[var(--border)] bg-[var(--surface-subtle)] hover:bg-[var(--surface)] text-[var(--text-primary)] transition-colors"
              >
                <span>Practical Labs</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/ethics"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <span>Ethics & Rules of Engagement</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
