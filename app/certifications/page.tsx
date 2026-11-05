import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllAuthoritativeCertifications, getAllAuthoritativeResources } from '@/lib/authoritativeCatalog';

export const metadata: Metadata = {
  title: 'Cybersecurity Certifications Guide | CyberTube',
  description:
    'Authoritative, vendor-neutral guide to key industry certifications including CompTIA Security+ (SY0-701), Network+, CCNA, and OSCP with domain breakdowns and exam formats.',
};

export default function CertificationsPage() {
  const certs = getAllAuthoritativeCertifications();
  const resources = getAllAuthoritativeResources();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0F17] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">
            <span>[ CREDENTIAL ROADMAP ]</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Industry Certifications Guide
          </h1>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400 max-w-3xl">
            Objective breakdowns of high-value industry credentials. Understand syllabus domains, exam formats, and version updates without vendor marketing spin or outdated syllabus material.
          </p>
        </div>

        {/* Pricing & Neutrality Notice */}
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-5 text-sm text-amber-900 dark:text-amber-200 flex items-start gap-3">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <span className="font-bold">Vendor-Neutral Policy:</span> CyberTube does not sell exam vouchers, publish volatile pricing, or partner commercially with certification bodies. Always verify official registration fees, testing center policies, and exam blueprints directly on the official vendor websites linked on each card.
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="space-y-8">
          {certs.map((cert) => {
            const recommended = resources.filter((r) => cert.recommendedResourceIds.includes(r.id));

            return (
              <div
                key={cert.id}
                id={cert.id}
                className="bg-white dark:bg-[#121A26] rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                        {cert.code}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {cert.issuer} • {cert.level}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {cert.title}
                    </h2>
                  </div>

                  <a
                    href={cert.officialVendorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
                  >
                    <span>Official Vendor Page</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                {/* Overview & Version Notice */}
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                  {cert.overview}
                </p>

                {cert.versionNotice && (
                  <div className="p-4 rounded-lg bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 text-xs text-sky-900 dark:text-sky-200">
                    <span className="font-bold">Version Notice: </span>
                    {cert.versionNotice}
                  </div>
                )}

                {/* Two Columns: Domains and Exam Format */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Domains */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Exam Domains & Weighting
                    </h3>
                    <div className="rounded-lg border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden text-sm">
                      {cert.domains.map((dom, idx) => (
                        <div key={idx} className="flex justify-between items-center px-3.5 py-2.5 bg-slate-50/50 dark:bg-slate-900/30">
                          <span className="text-slate-800 dark:text-slate-200">{dom.name}</span>
                          <span className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400">
                            {dom.weight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Format Card */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Format & Passing Criteria
                    </h3>
                    <div className="bg-slate-50 dark:bg-slate-900/40 rounded-lg p-4 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Duration:</span>
                        <span className="font-semibold text-slate-900 dark:text-white">{cert.examFormat.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Max Questions:</span>
                        <span className="font-semibold text-slate-900 dark:text-white">{cert.examFormat.maxQuestions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Passing Score:</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">{cert.examFormat.passingScore}</span>
                      </div>
                      <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                        <span className="text-slate-500 dark:text-slate-400">Question Types: </span>
                        <span className="text-slate-700 dark:text-slate-300">{cert.examFormat.questionTypes}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preparation Tips */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Preparation Strategy
                  </h3>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {cert.preparationTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Resources */}
                {recommended.length > 0 && (
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                      Free Study Playlists on CyberTube
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {recommended.map((r) => (
                        <Link
                          key={r.id}
                          href={`/library/${r.id}`}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800"
                        >
                          <span>{r.title}</span>
                          <span className="text-[10px] text-slate-500">by {r.creator}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

