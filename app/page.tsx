import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Terminal, Network, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { getAllAuthoritativePaths, getAuthoritativeResourceById } from '@/lib/authoritativeCatalog';
import { SupportCyberTubeButton } from '@/components/support/SupportCyberTubeButton';

export default function HomePage() {
  const jeremyCcna = getAuthoritativeResourceById('net-01');
  const linuxFoundations = getAuthoritativeResourceById('lin-01');
  const paths = getAllAuthoritativePaths().filter((p) => p.steps && p.steps.length > 0);

  const featuredGoals = [
    {
      title: 'Networking Fundamentals & CCNA',
      creator: "Jeremy's IT Lab",
      level: 'Beginner',
      duration: 'Complete Track',
      detail: 'Build a solid foundation in TCP/IP, subnetting, and switching with included Packet Tracer labs and spaced-repetition Anki flashcards.',
      href: '/library/net-01',
      actionLabel: 'View course',
      icon: Network,
    },
    {
      title: 'Linux Systems Administration & Security',
      creator: 'Learn Linux TV & Open Community',
      level: 'Beginner to Intermediate',
      duration: '24 Weeks',
      detail: 'Master bash navigation, file permissions, systemd daemons, and server hardening audits leading to an end-to-end capstone.',
      href: '/courses/linux-zero-to-advanced?lesson=m01-l1-what-is-a-linux-distribution',
      actionLabel: 'Open first lesson',
      icon: Terminal,
    },
    {
      title: 'Packet Analysis with Wireshark',
      creator: 'Netsec Explained',
      level: 'Intermediate to Advanced',
      duration: 'Masterclass',
      detail: 'Open real-world PCAP packet captures in Wireshark and trace protocol negotiations, handshakes, and forensic anomalies.',
      href: '/courses/network-packet-analysis-masterclass',
      actionLabel: 'Start masterclass',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="container-max py-10 sm:py-16 space-y-16">
      {/* Editorial Starter Hero */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 sm:p-10 lg:p-12 shadow-sm space-y-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-subtle)] border border-[var(--border)] text-xs font-mono text-[var(--accent-cyan)] font-medium">
            <span>Free & Open Curriculum</span>
            <span aria-hidden="true">•</span>
            <span>No Account Required to Start</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)]">
            Study cybersecurity
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            Curated video courses and hands-on practice labs arranged in clear study order. Start with foundational networking and Linux, or advance toward SOC analyst roles with packet analysis and incident response.
          </p>
        </div>

        {/* Editor's Recommended Starter Card */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] p-6 sm:p-7 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--accent-cyan)]">
                Recommended for beginners
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mt-1">
                New to cybersecurity? Start here.
              </h2>
            </div>
            <span className="text-xs font-mono text-[var(--text-muted)] self-start sm:self-auto">
              CCNA 200-301 · Free Video Course
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)]">
              {jeremyCcna?.title || "Complete CCNA 200-301 Course"} — {jeremyCcna?.creator || "Jeremy's IT Lab"}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              Understanding how data moves across a network is the bedrock of all cybersecurity work. This course pairs structured lessons with guided Packet Tracer configuration labs and Anki flashcards so you retain every concept.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/library/net-01"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[var(--accent-cyan)] text-[#090D14] text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm"
            >
              <span>Start with Networking</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/courses/linux-zero-to-advanced?lesson=m01-l1-what-is-a-linux-distribution"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] text-xs font-medium text-[var(--text-primary)] hover:border-[var(--accent-cyan)] transition-colors"
            >
              <span>Or Start with Linux</span>
            </Link>
            <Link
              href="/courses"
              className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline underline-offset-4 ml-1"
            >
              Browse all courses
            </Link>
          </div>
        </div>
      </section>

      {/* Courses by Topic / Learner Goal */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[var(--border)] pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
              Courses by topic
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
              Focused curricula across core security disciplines with lab exercises and verified instructors.
            </p>
          </div>
          <Link
            href="/courses"
            className="text-xs font-semibold text-[var(--accent-cyan)] hover:underline inline-flex items-center gap-1 shrink-0"
          >
            <span>Browse all courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredGoals.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.href}
                className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-6 flex flex-col justify-between hover:border-[var(--accent-cyan)] transition-all duration-150 shadow-xs group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="p-2 rounded-lg bg-[var(--surface-subtle)] border border-[var(--border)] text-[var(--accent-cyan)]">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="text-[11px] font-mono text-[var(--text-muted)]">
                      {c.level}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-semibold text-base text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
                      <Link href={c.href}>{c.title}</Link>
                    </h3>
                    <p className="text-xs font-mono text-[var(--text-muted)]">
                      {c.creator}
                    </p>
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {c.detail}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-[var(--border)] flex items-center justify-between">
                  <span className="text-xs font-mono text-[var(--text-muted)]">{c.duration}</span>
                  <Link
                    href={c.href}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent-cyan)] hover:underline"
                  >
                    <span>{c.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Learning Paths */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[var(--border)] pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
              Learning paths
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
              Multi-month roadmaps with sequenced study milestones from foundations to advanced specializations.
            </p>
          </div>
          <Link
            href="/learning-paths"
            className="text-xs font-semibold text-[var(--accent-cyan)] hover:underline inline-flex items-center gap-1 shrink-0"
          >
            <span>See all paths</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paths.map((p) => (
            <div
              key={p.id}
              className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-6 flex flex-col justify-between hover:border-[var(--accent-cyan)] transition-all shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-semibold uppercase px-2 py-0.5 rounded bg-[var(--surface-subtle)] border border-[var(--border)] text-[var(--accent-cyan)]">
                    {p.level}
                  </span>
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    {p.duration}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[var(--accent-cyan)] font-medium mt-0.5">
                    {p.subtitle}
                  </p>
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                  {p.description}
                </p>

                <div className="pt-2 text-xs font-mono text-[var(--text-muted)]">
                  {p.steps?.length || 0} sequential learning milestones
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[var(--border)] flex items-center justify-between">
                <span className="text-xs text-[var(--text-muted)]">Syllabus ready</span>
                <Link
                  href={`/learning-paths/${p.slug}`}
                  aria-label={`Preview syllabus for ${p.title}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-subtle)] text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent-cyan)] transition-colors"
                >
                  <span>Preview syllabus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Practice Labs & Study References */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
            Hands-on practice & study references
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
            Complement your video studies with authorized practical environments and instant reference materials.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/labs"
            className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] hover:border-[var(--accent-cyan)] transition-colors group space-y-2"
          >
            <div className="text-xs font-mono font-semibold uppercase text-[var(--accent-cyan)]">Practical Labs</div>
            <h3 className="font-semibold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
              TryHackMe Free Rooms
            </h3>
            <p className="text-xs text-[var(--text-secondary)] line-clamp-2">
              Source-listed, zero-cost practical rooms and target challenges.
            </p>
          </Link>

          <Link
            href="/library"
            className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] hover:border-[var(--accent-cyan)] transition-colors group space-y-2"
          >
            <div className="text-xs font-mono font-semibold uppercase text-[var(--accent-cyan)]">Reference Library</div>
            <h3 className="font-semibold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
              Bug Bounty Study Library
            </h3>
            <p className="text-xs text-[var(--text-secondary)] line-clamp-2">
              Searchable technical guides and vulnerability writeups.
            </p>
          </Link>

          <Link
            href="/cheat-sheets"
            className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] hover:border-[var(--accent-cyan)] transition-colors group space-y-2"
          >
            <div className="text-xs font-mono font-semibold uppercase text-[var(--accent-cyan)]">Quick Lookup</div>
            <h3 className="font-semibold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
              Security Cheat Sheets
            </h3>
            <p className="text-xs text-[var(--text-secondary)] line-clamp-2">
              Essential Linux command-line triage, ports, and protocols.
            </p>
          </Link>

          <Link
            href="/glossary"
            className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] hover:border-[var(--accent-cyan)] transition-colors group space-y-2"
          >
            <div className="text-xs font-mono font-semibold uppercase text-[var(--accent-cyan)]">Terminology</div>
            <h3 className="font-semibold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
              Cybersecurity Glossary
            </h3>
            <p className="text-xs text-[var(--text-secondary)] line-clamp-2">
              Plain-English definitions and analogies for core terms.
            </p>
          </Link>
        </div>

        {/* Support Callout */}
        <div className="pt-4 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-secondary)]">
            CyberTube is maintained as an open educational resource with no ads and no tracking paywalls.
          </p>
          <SupportCyberTubeButton variant="secondary" />
        </div>
      </section>
    </div>
  );
}
