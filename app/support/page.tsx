'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
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
import { loadChaiKitScript } from '../../src/lib/chaikit/loader';
import { defaultSupportConfig } from '../../src/lib/chaikit/config';

export default function SupportPage() {
  const { theme } = useTheme();
  const [isWidgetLoaded, setIsWidgetLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Support CyberTube ☕ | Free Cybersecurity Education';
    let mounted = true;
    loadChaiKitScript()
      .then(() => {
        if (mounted) {
          setIsWidgetLoaded(true);
        }
      })
      .catch((err) => {
        if (mounted) {
          console.warn('Could not load ChaiKit bundle on /support:', err);
          setLoadError('Supporter widget bundle is currently unavailable.');
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const widgetTheme = theme === 'light' ? 'cream' : (defaultSupportConfig.theme || 'dark');

  return (
    <div className="min-h-screen bg-[var(--canvas)] text-[var(--text-primary)] transition-colors">
      {/* Background Ambience */}
      <div className="relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-b from-amber-500/5 via-transparent to-transparent py-16 sm:py-24">
        <div className="container-max relative z-10 mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs font-mono uppercase tracking-wider">
              <Coffee className="w-4 h-4 animate-bounce" />
              <span>Voluntary Creator Support</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Help Keep Cybersecurity Education Free.
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              CyberTube provides free cybersecurity courses, learning paths, hands-on labs,
              and educational resources. If the platform helps you learn, you can support its
              development with a small, optional chai contribution.
            </p>

            {/* Safe Demo Notice Banner */}
            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-left flex items-start gap-3 text-xs text-[var(--text-secondary)]">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-amber-500 font-mono uppercase tracking-wider">
                  Safe Demonstration Preview (Demo Mode Active)
                </p>
                <p>
                  Real bank payment initiation is strictly disabled until final verification.
                  The QR code displayed below demonstrates ChaiKit’s authentic interface without
                  initiating real financial transactions.
                </p>
              </div>
            </div>
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
                <span>Powered by ChaiKit 1.0</span>
              </div>

              {/* Inline Web Component Mounting Container */}
              <div
                className="chaikit-inline-wrapper flex justify-center w-full min-h-[520px] rounded-2xl bg-[var(--surface-subtle)] p-2 sm:p-4 border border-[var(--border)] shadow-xl transition-all"
                data-testid="support-page-inline-widget"
              >
                {isWidgetLoaded ? (
                  // @ts-expect-error Registered custom element
                  <chai-support
                    creator-name={defaultSupportConfig.creatorName}
                    payment-payee-name={defaultSupportConfig.paymentPayeeName}
                    upi-id={defaultSupportConfig.upiId}
                    description={defaultSupportConfig.description}
                    button-text={defaultSupportConfig.buttonText}
                    theme={widgetTheme}
                    position="inline"
                    default-tier={defaultSupportConfig.defaultTierId}
                    note={defaultSupportConfig.paymentNote}
                    tiers={JSON.stringify(defaultSupportConfig.tiers)}
                    enable-3d={defaultSupportConfig.enable3D ? '' : undefined}
                    demo-mode=""
                  />
                ) : loadError ? (
                  <div className="flex flex-col items-center justify-center p-8 text-center text-xs text-[var(--text-muted)] space-y-3">
                    <AlertTriangle className="w-8 h-8 text-amber-500" />
                    <p>{loadError}</p>
                    <button
                      type="button"
                      onClick={() => window.location.reload()}
                      className="px-3 py-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--surface)] text-[var(--text-primary)]"
                    >
                      Retry Loading
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-12 text-center text-xs text-[var(--text-muted)] space-y-4">
                    <div className="w-8 h-8 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
                    <p className="font-mono">Loading ChaiKit supporter interface...</p>
                  </div>
                )}
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
                    <strong>Payee Verification:</strong> Supporters should always check the payee name displayed in their banking app (expected: <em>{defaultSupportConfig.paymentPayeeName}</em>) before confirming.
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
