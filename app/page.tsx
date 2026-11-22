import Link from 'next/link';
import { getAllAuthoritativePaths, getAuthoritativeResourceById } from '@/lib/authoritativeCatalog';
import { SupportCyberTubeButton } from '@/components/support/SupportCyberTubeButton';

export default function HomePage() {
  const resources = ['net-01', 'lin-01'].map(id => getAuthoritativeResourceById(id)!);
  const courses = [
    ...resources.map(r => ({ title: r.title, creator: r.creator, level: r.level, detail: r.notes, href: `/library/${r.id}` })),
    { title: 'Network packet analysis', creator: 'Netsec Explained', level: 'advanced', detail: 'Open packet captures in Wireshark and trace how traffic moves through a network.', href: '/courses/network-packet-analysis-masterclass' },
  ];
  return <div className="container-max space-y-12 py-10 sm:py-16">
    <section className="max-w-3xl space-y-4 border-l-4 border-teal-600 pl-6">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Study cybersecurity</h1>
      <h2 className="text-2xl font-semibold">Start with Linux</h2>
      <p className="max-w-xl">The first lesson explains what a Linux distribution is. Then practise navigating files, reading permissions, and working in a terminal.</p>
      <div className="flex flex-wrap items-center gap-5">
        <Link className="rounded-lg bg-teal-800 px-5 py-3 font-semibold text-white" href="/courses/linux-zero-to-advanced?lesson=m01-l1-what-is-a-linux-distribution">Open the first lesson</Link>
        <Link className="underline" href="/courses">Browse courses</Link>
      </div>
    </section>
    <section><h2 className="mb-4 text-2xl font-semibold">Courses by topic</h2>
      <ul className="divide-y divide-[var(--border)]">{courses.map(c => <li key={c.href} className="grid gap-2 py-4 sm:grid-cols-2">
        <div><Link className="font-semibold underline" href={c.href}>{c.title}</Link><p className="text-sm">{c.creator} · {c.level}</p></div><p>{c.detail}</p>
      </li>)}</ul>
    </section>
    <section><div className="flex flex-wrap items-baseline justify-between gap-3"><h2 className="text-2xl font-semibold">Learning paths</h2><Link href="/learning-paths" className="underline">See all paths</Link></div>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">{getAllAuthoritativePaths().filter(p => p.steps?.length).map(p => <li key={p.id} className="border-t border-[var(--border)] py-3">
        <h3 className="font-semibold">{p.title}</h3><Link className="underline" href={`/learning-paths/${p.slug}`} aria-label={`Preview syllabus for ${p.title}`}>Preview syllabus</Link>
      </li>)}</ul>
    </section>
    <section className="flex flex-wrap gap-6 border-t border-[var(--border)] pt-6"><Link className="underline" href="/labs">Practice labs</Link><Link className="underline" href="/library">Study library</Link><SupportCyberTubeButton variant="secondary" /></section>
  </div>;
}
