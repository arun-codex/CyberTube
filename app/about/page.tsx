import Link from 'next/link';

export const metadata = { title: 'About CyberTube and editorial corrections | CyberTube' };

export default function AboutPage() {
  return (
    <article className="container-max max-w-3xl space-y-8 py-12">
      <header><h1 className="text-4xl font-bold">About CyberTube</h1>
        <p className="mt-4 text-lg leading-relaxed">CyberTube helps people learning cybersecurity decide what to study next. The project pairs free lessons with practice and gives each resource a place in a learning path.</p>
      </header>
      <section className="space-y-2"><h2 className="text-2xl font-semibold">Who maintains it</h2>
        <p>The CyberTube Open Education Project maintains the site and its catalog. You can follow changes or reach the project maintainer through the public repository.</p>
        <a className="underline underline-offset-4" href="https://github.com/arun-codex/CyberTube">CyberTube on GitHub</a>
      </section>
      <section className="space-y-2"><h2 className="text-2xl font-semibold">How resources are selected</h2>
        <p>We look for a named creator, a free way to start, and a specific skill a learner can practice. CyberTube adds the study order, notes, and learning tools. The original creators publish the videos and run the external labs.</p>
        <p>Library entries include the source and a last-checked date where available. A platform marked “free tier” may charge for other material.</p>
        <Link className="underline underline-offset-4" href="/ethics">Read the practice guidelines</Link>
      </section>
      <section className="space-y-2"><h2 className="text-2xl font-semibold">Report a correction or suggest a resource</h2>
        <p>Include the CyberTube page, the link or statement in question, and what you expected to find. For a new resource, include its creator and the skill it teaches.</p>
        <div className="flex flex-wrap gap-5">
          <a className="underline underline-offset-4" href="https://github.com/arun-codex/CyberTube/issues/new">Report an issue on GitHub</a>
          <a className="underline underline-offset-4" href="mailto:curriculum@cybertube.org">Email the curriculum team</a>
        </div>
      </section>
    </article>
  );
}
