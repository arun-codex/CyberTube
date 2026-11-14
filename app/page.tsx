import React from 'react';
import Link from 'next/link';
import { Terminal, Shield, ArrowRight, BookOpen, Compass, Layers, CheckCircle2, Youtube, ExternalLink } from 'lucide-react';
import { getAllAuthoritativeResources, getAllAuthoritativePaths } from '@/lib/authoritativeCatalog';

export default function HomePage() {
  const resources = getAllAuthoritativeResources();
  const paths = getAllAuthoritativePaths().slice(0, 4); // Paths A-D preview
  const featuredCourses = resources.filter((r) => r.type === 'playlist').slice(0, 3);
  const featuredLabs = resources.filter((r) => r.type === 'lab').slice(0, 4);

  return (
    <div className="space-y-16 py-8">
      {/* 1. Terminal-Style Hero */}
      <section className="container-max dark:bg-[#121A26] rounded-2xl">
        <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 sm:p-12 shadow-sm relative overflow-hidden">
          {/* Subtle background grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-50 dark:opacity-20" />

                    <div className="relative z-10 max-w-3xl space-y-6">
            {/* System Status Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[var(--surface-subtle)] border border-[var(--border)] font-mono text-xs text-[var(--accent-cyan)] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-emerald)] inline-block" />
              <span>Free, Structured & Hands-On Cyber Education</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.15]">
              Learn Cybersecurity the Right Way. Free, Structured & Hands-On.
            </h1>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              CyberTube organizes verified YouTube courses, certified syllabi, and legal practice labs into transparent, progressive roadmaps. No paywalls, no false hype—pure practical skills development.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/learning-paths"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--accent-cyan)] hover:bg-[var(--accent-cyan-hover)] text-[#090D14] font-semibold text-sm transition-all shadow-sm"
              >
                <span>Start Your Path</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/library"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[var(--border)] bg-[var(--surface-subtle)] text-[var(--text-primary)] font-medium text-sm hover:border-[var(--accent-cyan)] transition-colors"
              >
                <BookOpen className="w-4 h-4 text-[var(--accent-cyan)]" />
                <span>Browse {resources.length} Verified Resources</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Three Value Cards */}
      <section className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#34D399]/10 text-[#34D399] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
              1. Free-First Education
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
              Every course and video playlist is 100% free on YouTube from industry leaders like Jeremy&apos;s IT Lab, Professor Messer, and TCM Security. No hidden subscription traps.
            </p>
          </div>

          <div className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#22D3EE]/10 text-[#22D3EE] flex items-center justify-center">
              <Terminal className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
              2. Lab-First Practice
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
              Theory is paired step-by-step with free wargames and legal targets like OverTheWire, PortSwigger Academy, TryHackMe, and OWASP Juice Shop.
            </p>
          </div>

          <div className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#FBBF24]/10 text-[#FBBF24] flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
              3. Legal & Ethical Focus
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
              Strict rules of engagement. Learn defensive postures and responsible vulnerability disclosure without ever compromising real-world systems.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Learning Paths Preview */}
      <section className="container-max space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#0E7490] dark:text-[#22D3EE] mb-1">
              <Compass className="w-4 h-4" />
              <span>Step-by-Step Tracks</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
              Curated Learning Roadmaps
            </h2>
          </div>
          <Link
            href="/learning-paths"
            className="text-xs sm:text-sm font-semibold text-[#0E7490] dark:text-[#22D3EE] hover:underline flex items-center gap-1"
          >
            <span>Explore All 5 Paths</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {paths.map((p) => (
            <Link
              key={p.id}
              href={`/learning-paths/${p.slug}`}
              className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-5 space-y-3 hover:border-[#22D3EE]/50 hover:shadow-sm transition-all group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#0E7490] dark:text-[#22D3EE] uppercase">{p.level}</span>
                  <span className="text-[#475569] dark:text-[#9BA8B7]">{p.duration}</span>
                </div>
                <h3 className="text-base font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3] group-hover:text-[#0E7490] dark:group-hover:text-[#22D3EE] transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-[#475569] dark:text-[#9BA8B7] line-clamp-3">
                  {p.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] dark:border-[#243044] flex items-center justify-between text-xs text-[#0E7490] dark:text-[#22D3EE] font-medium">
                <span>View Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Featured Playlists */}
      <section className="container-max space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#0E7490] dark:text-[#22D3EE] mb-1">
              <Youtube className="w-4 h-4 text-[#F87171]" />
              <span>Free Video Series</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
              Featured YouTube Courses
            </h2>
          </div>
          <Link
            href="/library"
            className="text-xs sm:text-sm font-semibold text-[#0E7490] dark:text-[#22D3EE] hover:underline flex items-center gap-1"
          >
            <span>View All in Library</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCourses.map((c) => (
            <div
              key={c.id}
              className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-5 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded bg-[#0E7490]/10 dark:bg-[#22D3EE]/10 text-[#0E7490] dark:text-[#22D3EE] border border-[#0E7490]/30 dark:border-[#22D3EE]/30">
                  {c.track}
                </span>
                <Link
                  href={`/library/${c.id}`}
                  className="block text-base font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3] hover:text-[#0E7490] dark:hover:text-[#22D3EE] transition-colors"
                >
                  {c.title}
                </Link>
                <p className="text-xs text-[#475569] dark:text-[#9BA8B7]">
                  By <strong className="text-[#0F172A] dark:text-[#E6EDF3]">{c.creator}</strong>
                </p>
                <p className="text-xs text-[#475569] dark:text-[#9BA8B7] line-clamp-2">
                  {c.notes}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] dark:border-[#243044] flex items-center justify-between text-xs">
                <Link
                  href={`/library/${c.id}`}
                  className="text-[#0E7490] dark:text-[#22D3EE] font-semibold hover:underline"
                >
                  Watch Course â†’
                </Link>
                <span className="text-[10px] font-mono text-[#475569] dark:text-[#9BA8B7]">
                  Audited: {c.lastChecked}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Ethics Banner */}
      <section className="container-max">
        <div className="rounded-xl border border-[#34D399]/30 bg-[#34D399]/5 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#065F46] dark:text-[#34D399] tracking-wider font-semibold">
              <Shield className="w-4 h-4" />
              <span>Ethical Code of Conduct</span>
            </div>
            <h2 className="text-xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
              Practice Only in Authorized Lab Environments
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
              We never condone attacking real websites, networks, or individuals without written authorization. All offensive skills taught must be tested strictly within legal labs.
            </p>
          </div>
          <Link
            href="/ethics"
            className="px-5 py-2.5 rounded-lg bg-[#34D399] text-[#0B1018] font-bold text-xs hover:bg-[#6ee7b7] transition-colors whitespace-nowrap shrink-0"
          >
            Review Ethics Policy
          </Link>
        </div>
      </section>

      {/* 6. Legal Practice Platform Preview */}
      <section className="container-max space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#0E7490] dark:text-[#22D3EE] mb-1">
              <Layers className="w-4 h-4" />
              <span>Safe Practice Targets</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
              Curated Legal Practice Platforms
            </h2>
          </div>
          <Link
            href="/labs"
            className="text-xs sm:text-sm font-semibold text-[#0E7490] dark:text-[#22D3EE] hover:underline flex items-center gap-1"
          >
            <span>View All 7 Labs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredLabs.map((lab) => (
            <div
              key={lab.id}
              className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-5 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-[#047857] dark:text-[#34D399] uppercase font-semibold">
                  {lab.cost === 'free' ? '100% Free' : 'Free Tier'}
                </span>
                <h3 className="text-base font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
                  {lab.title}
                </h3>
                <p className="text-xs text-[#475569] dark:text-[#9BA8B7] line-clamp-2">
                  {lab.notes}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] dark:border-[#243044]">
                <a
                  href={lab.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#0E7490] dark:text-[#22D3EE] font-semibold hover:underline"
                >
                  <span>Launch Lab</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

