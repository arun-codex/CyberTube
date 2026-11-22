import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, ExternalLink, Layers, Shield, Youtube } from 'lucide-react';
import { getAllAuthoritativeResources, getAllAuthoritativePaths } from '@/lib/authoritativeCatalog';
import { SupportCyberTubeButton } from '@/components/support/SupportCyberTubeButton';

export default function HomePage() {
  const resources = getAllAuthoritativeResources();
  const paths = getAllAuthoritativePaths().slice(0, 4); // Paths A-D preview
  const featuredCourses = resources.filter((r) => r.type === 'playlist').slice(0, 3);
  const featuredLabs = resources.filter((r) => r.type === 'lab').slice(0, 4);

  return (
    <div className="space-y-16 py-8">
      <section className="container-max grid gap-8 border-b border-slate-300 pb-10 dark:border-slate-700 lg:grid-cols-[2fr_1fr] lg:items-end">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Study cybersecurity</h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            Follow a course, work through a practice lab, or keep a field guide open while you study.
          </p>
          <Link href="/courses" className="mt-6 inline-flex rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white dark:bg-slate-100 dark:text-slate-900">
            Browse courses
          </Link>
        </div>
        <aside className="border-l-2 border-teal-600 pl-5">
          <h2 className="text-xl font-semibold">Study library</h2>
          <p className="my-2 text-slate-600 dark:text-slate-300">Find reference guides and bookmark pages for your next session.</p>
          <Link href="/library" className="font-medium underline underline-offset-4">Open the library</Link>
        </aside>
      </section>

      {/* 4. Learning Paths Preview (Marked Coming Soon) */}
      <section className="container-max space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#0E7490] dark:text-[#22D3EE] mb-1">
              <Compass className="w-4 h-4" />
              <span>Step-by-Step Tracks</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
              Curated Learning Roadmaps (A–E)
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
              className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-5 space-y-3 hover:border-[#22D3EE]/50 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#0E7490] dark:text-[#22D3EE] uppercase">{p.level}</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-mono uppercase bg-amber-500/15 text-amber-600 dark:text-amber-400 font-semibold border border-amber-500/30">
                    Coming Soon
                  </span>
                </div>
                <h3 className="text-base font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3] group-hover:text-[#0E7490] dark:group-hover:text-[#22D3EE] transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-[#475569] dark:text-[#9BA8B7] line-clamp-3">
                  {p.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] dark:border-[#243044] flex items-center justify-between text-xs text-[#0E7490] dark:text-[#22D3EE] font-medium">
                <span>View Syllabus</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Featured YouTube Courses */}
      <section className="container-max space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#0E7490] dark:text-[#22D3EE] mb-1">
              <Youtube className="w-4 h-4 text-[#F87171]" />
              <span>Free Video Series</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
              Featured Video Courses
            </h2>
          </div>
          <Link
            href="/courses"
            className="text-xs sm:text-sm font-semibold text-[#0E7490] dark:text-[#22D3EE] hover:underline flex items-center gap-1"
          >
            <span>View All Courses</span>
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
                  Watch Course &rarr;
                </Link>
                <span className="text-[10px] font-mono text-[#475569] dark:text-[#9BA8B7]">
                  Audited: {c.lastChecked}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Ethics Banner */}
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

      {/* 7. Legal Practice Platform Preview */}
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
            <span>View All Labs</span>
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
      <div className="container-max"><SupportCyberTubeButton variant="secondary" className="text-xs" /></div>
    </div>
  );
}
