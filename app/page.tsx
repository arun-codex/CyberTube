import React from 'react';
import Link from 'next/link';
import {
  Compass,
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
  BookOpen,
  Terminal,
  Search,
  CheckCircle,
} from 'lucide-react';
import {
  getAllResources,
  getFeaturedResources,
  getFacetCounts,
} from '../src/lib/catalog';
import { CYBERSECURITY_DOMAINS, RESOURCE_TYPES } from '../src/data/metadata';
import { ResourceCard } from '../src/components/ResourceCard';
import { Button } from '../src/components/ui/Button';

export default function HomePage() {
  const allResources = getAllResources();
  const featured = getFeaturedResources(6);
  const facetCounts = getFacetCounts(allResources);

  // Recently added based on publishedAt
  const recentlyAdded = [...allResources]
    .sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 4);

  // Curated starting points (beginner difficulty)
  const startingPoints = allResources
    .filter((r) => r.difficulty === 'beginner')
    .slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-200 dark:border-slate-800/80 bg-gradient-to-b from-slate-100/60 dark:from-[#0d1424] to-transparent">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-400 font-mono text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Discover. Learn. Practice. Secure.</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight">
            The Centralized Learning Engine for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
              Cybersecurity
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Discover verified talks, interactive labs, CTF challenges, standards,
            repositories, and research papers—structured across 11 core cybersecurity domains.
          </p>

          {/* Prominent Search Bar */}
          <div className="max-w-2xl mx-auto pt-2">
            <form
              action="/discover"
              method="GET"
              className="relative flex items-center shadow-lg shadow-black/10 dark:shadow-black/40 rounded-xl"
            >
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="search"
                name="q"
                placeholder="Search by vulnerability, tool, protocol, paper, or author..."
                className="w-full pl-12 pr-28 py-3.5 text-sm rounded-xl bg-white dark:bg-[#111827] border border-slate-300 dark:border-[#1f293d] text-slate-900 dark:text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all font-sans"
              />
              <button
                type="submit"
                className="absolute right-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs tracking-wide transition-colors"
              >
                Search
              </button>
            </form>

            {/* Quick Keyword Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-3 text-xs text-slate-500 font-mono">
              <span className="text-slate-400">Popular:</span>
              {['Burp Suite', 'Wireshark', 'Nmap', 'MITRE ATT&CK', 'x86 Assembly', 'OWASP'].map(
                (term) => (
                  <Link
                    key={term}
                    href={`/discover?q=${encodeURIComponent(term)}`}
                    className="hover:text-cyan-400 underline decoration-slate-600 hover:decoration-cyan-400 transition-colors"
                  >
                    {term}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED RESOURCES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Curated Selection</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Featured Resources
            </h2>
          </div>
          <Link
            href="/discover"
            className="text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            Explore all {allResources.length} resources →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </section>

      {/* 3. EXPLORE BY DOMAIN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-1">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Knowledge Taxonomy</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Explore by Cybersecurity Domain
            </h2>
          </div>
          <Link
            href="/domains"
            className="text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            Full domain guide →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {CYBERSECURITY_DOMAINS.map((domain) => {
            const count = facetCounts.domainCounts[domain.id] || 0;
            return (
              <Link
                key={domain.id}
                href={`/discover?domain=${domain.id}`}
                className="group p-4 rounded-xl border border-slate-200 dark:border-[#1f293d] bg-white dark:bg-[#111827] hover:border-cyan-500/50 hover:shadow-md transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-cyan-500">
                      {count} {count === 1 ? 'resource' : 'resources'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {domain.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {domain.shortDescription}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. BROWSE RESOURCE TYPES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          Browse by Learning Format
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {RESOURCE_TYPES.map((type) => {
            const count = facetCounts.typeCounts[type.id] || 0;
            return (
              <Link
                key={type.id}
                href={`/discover?type=${type.id}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-200 dark:border-[#1f293d] bg-white dark:bg-[#111827] hover:border-cyan-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-xs font-mono"
              >
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {type.pluralLabel}
                </span>
                <span className="px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px]">
                  {count}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 5. STARTING POINTS & RECENTLY ADDED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
        {/* Curated Starting Points */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              Beginner Starting Points
            </h2>
            <Link
              href="/discover?difficulty=beginner"
              className="text-xs font-mono text-cyan-500 hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {startingPoints.map((res) => (
              <Link
                key={res.id}
                href={`/resources/${res.slug}`}
                className="block p-3.5 rounded-xl border border-slate-200 dark:border-[#1f293d] bg-white dark:bg-[#111827] hover:border-cyan-500/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-cyan-500 font-bold">
                      {res.resourceType} · {res.provider}
                    </span>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 hover:text-cyan-400 transition-colors">
                      {res.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {res.description}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {res.pricingModel}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recently Added Resources */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-cyan-400" />
              Recently Verified
            </h2>
            <Link
              href="/discover?sort=recently-added"
              className="text-xs font-mono text-cyan-500 hover:underline"
            >
              Catalog index →
            </Link>
          </div>
          <div className="space-y-3">
            {recentlyAdded.map((res) => (
              <Link
                key={res.id}
                href={`/resources/${res.slug}`}
                className="block p-3.5 rounded-xl border border-slate-200 dark:border-[#1f293d] bg-white dark:bg-[#111827] hover:border-cyan-500/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-cyan-500 font-bold">
                      {res.resourceType} · {res.provider}
                    </span>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 hover:text-cyan-400 transition-colors">
                      {res.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {res.description}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs font-mono text-slate-400">
                    {res.estimatedDuration || 'Self-paced'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

