import React from 'react';
import type { Metadata } from 'next';
import { getAllAuthoritativeSkills, getAllAuthoritativeResources } from '@/lib/authoritativeCatalog';
import SkillsClientView from '@/components/skills/SkillsClientView';

export const metadata: Metadata = {
  title: 'Cybersecurity Skills Map & Career Readiness | CyberTube',
  description: 'Track 29 hands-on cybersecurity competencies, identify SOC and other career skill gaps, build practical evidence, and sync your self-assessment to your CyberTube account.',
};

export default function SkillsPage(){
  const skills=getAllAuthoritativeSkills();
  const resources=getAllAuthoritativeResources();
  return <div className="min-h-screen bg-[var(--canvas)] py-8 sm:py-12">
    <div className="container-max max-w-7xl space-y-8">
      <header className="space-y-3">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--accent-cyan)]">
          [ Skills Matrix · Career Development ]
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
          Cybersecurity Skills Map
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
          Build your cybersecurity competency portfolio. Choose a career direction, assess your real practice,
          identify gaps, and follow targeted learning resources — from fundamental networking to SOC investigations,
          forensics, AppSec, and cloud security.
        </p>
      </header>
      <SkillsClientView skills={skills} resources={resources}/>
    </div>
  </div>;
}
