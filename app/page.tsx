import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Shield,
  Layers,
  BookOpen,
  Terminal,
  Search,
} from 'lucide-react';
import {
  getAllResources,
  getFeaturedResources,
  getFacetCounts,
} from '../src/lib/catalog';
import { getAllCourses } from '../src/lib/courses';
import { CYBERSECURITY_DOMAINS, RESOURCE_TYPES } from '../src/data/metadata';
import { ResourceCard } from '../src/components/ResourceCard';
import { CourseCard } from '../src/components/courses/CourseCard';

export default function HomePage() {
  const allResources = getAllResources();
  const featured = getFeaturedResources(6);
  const facetCounts = getFacetCounts(allResources);
  const courses = getAllCourses().slice(0, 3);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. TERMINAL-INSPIRED SST HERO SECTION */}
      <section className="border-b border-[#e4e4ed] bg-[#f4f4f9] pt-12 pb-16 md:pt-16 md:pb-20">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading, Prose & Actions */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-white border border-[#e4e4ed] text-xs font-mono text-[#303055]">
                <Shield className="w-3.5 h-3.5 text-[#303055]" />
                <span>Verified technical curriculum</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#303055] leading-[1.15]">
                Cybersecurity education, deconstructed and structured.
              </h1>

              <p className="text-sm sm:text-base text-[#403f53] max-w-xl leading-relaxed">
                CyberTube organizes verified YouTube talks, Wireshark packet investigations,
                x86 hardware reverse-engineering, and protocol blueprints into structured courses.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[4px] bg-[#303055] text-white hover:bg-[#252542] text-sm font-medium min-h-[44px] transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  Explore Courses
                </Link>
                <Link
                  href="/discover"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[4px] bg-white text-[#303055] border border-[#e4e4ed] hover:border-[#303055] text-sm font-medium min-h-[44px] transition-colors"
                >
                  <Search className="w-4 h-4 text-[#767682]" />
                  Search Catalog
                </Link>
              </div>

              {/* Quick Metadata */}
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono text-[#767682]">
                <div>
                  <strong className="text-[#303055] font-semibold">11</strong> Domains
                </div>
                <div>•</div>
                <div>
                  <strong className="text-[#303055] font-semibold">{courses.length}</strong> Structured Tracks
                </div>
                <div>•</div>
                <div>
                  <strong className="text-[#303055] font-semibold">{allResources.length}</strong> Verified Labs & Talks
                </div>
              </div>
            </div>

            {/* Right Column: Clean Terminal Code Block with strictly scoped syntax colors */}
            <div className="lg:col-span-5">
              <div className="rounded-[8px] border border-[#e4e4ed] bg-[#ffffff] overflow-hidden shadow-sm">
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#f4f4f9] border-b border-[#e4e4ed]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#d2d2dc]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#d2d2dc]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#d2d2dc]" />
                  </div>
                  <span className="text-[11px] font-mono text-[#767682]">
                    packet-triage.pcap
                  </span>
                </div>

                {/* Terminal Body with strict syntax colors */}
                <pre className="p-4 sm:p-5 text-xs font-mono leading-relaxed overflow-x-auto text-[#403f53] bg-white">
                  <code>
                    <span className="text-[#767682]">// 1. Capture stream metadata</span>{'\n'}
                    <span className="text-[#8844ae]">tshark</span> -r session.pcap \<br />
                    {'  '}-Y <span className="text-[#096e72]">&quot;tcp.flags.syn == 1 &amp;&amp; tcp.flags.ack == 0&quot;</span> \<br />
                    {'  '}-T fields -e ip.src -e ip.dst -e tcp.dstport{'\n\n'}
                    <span className="text-[#767682]">// 2. Anomaly detected in handshake</span>{'\n'}
                    <span className="text-[#3b61b0]">SYN_SENT</span>: 192.168.1.45 -&gt; 10.0.0.1:443{'\n'}
                    <span className="text-[#984e4d]">DELTA_TIME</span>: 0.000142s [Window: 65535]{'\n'}
                    <span className="text-[#3b61b0]">STATUS</span>: Handshake Verified (TLS 1.3)
                  </code>
                </pre>

                {/* Terminal Footer */}
                <div className="px-4 py-2 bg-[#f4f4f9] border-t border-[#e4e4ed] flex items-center justify-between text-[11px] font-mono text-[#767682]">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-[#767682]" />
                    Wireshark Forensics Masterclass
                  </span>
                  <Link href="/courses/network-packet-analysis-masterclass" className="hover:text-[#303055] underline">
                    inspect →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STRUCTURED COURSES HIGHLIGHT */}
      <section className="container-max space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="font-mono text-xs text-[#767682] uppercase tracking-wider mb-1">
              Curriculum
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#303055]">
              Structured Video Courses
            </h2>
          </div>
          <Link
            href="/courses"
            className="text-xs font-mono text-[#303055] hover:text-[#3b61b0] flex items-center gap-1"
          >
            All Courses →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* 3. FEATURED RESOURCES SECTION */}
      <section className="container-max space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="font-mono text-xs text-[#767682] uppercase tracking-wider mb-1">
              Catalog Selection
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#303055]">
              Featured Resources
            </h2>
          </div>
          <Link
            href="/discover"
            className="text-xs font-mono text-[#303055] hover:text-[#3b61b0] flex items-center gap-1"
          >
            Explore all {allResources.length} resources →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </section>

      {/* 4. EXPLORE BY DOMAIN */}
      <section className="container-max space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="font-mono text-xs text-[#767682] uppercase tracking-wider mb-1">
              Taxonomy
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#303055]">
              Core Knowledge Domains
            </h2>
          </div>
          <Link
            href="/domains"
            className="text-xs font-mono text-[#303055] hover:text-[#3b61b0] flex items-center gap-1"
          >
            Domain index →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {CYBERSECURITY_DOMAINS.map((domain) => {
            const count = facetCounts.domainCounts[domain.id] || 0;
            return (
              <Link
                key={domain.id}
                href={`/discover?domain=${domain.id}`}
                className="group p-4 rounded-[8px] border border-[#e4e4ed] bg-white hover:border-[#303055] transition-colors flex flex-col justify-between space-y-2"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs text-[#767682]">
                      {count} items
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#767682] group-hover:text-[#303055] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <h3 className="font-semibold text-sm text-[#303055] group-hover:text-[#3b61b0] transition-colors">
                    {domain.name}
                  </h3>
                  <p className="text-xs text-[#403f53] line-clamp-2 mt-1 leading-relaxed">
                    {domain.shortDescription}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
