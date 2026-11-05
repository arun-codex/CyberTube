import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Shield, BookOpen, Clock, CheckCircle2, ArrowRight, ExternalLink, Terminal, AlertTriangle } from 'lucide-react';
import { getLearningPathBySlug, getAllLearningPaths } from '@/lib/learning-paths';

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const paths = getAllLearningPaths();
  return paths.map((path) => ({
    slug: path.slug,
  }));
}

export default function LearningPathDetailPage({ params }: PageProps) {
  const path = getLearningPathBySlug(params.slug);

  if (!path) {
    notFound();
  }

  return (
    <div className="container-max py-10 space-y-10">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-mono text-[#6b6b7b] dark:text-[#94A3B8]">
        <Link href="/learning-paths" className="hover:underline">
          Learning Paths
        </Link>
        <span>/</span>
        <span className="text-[#303055] dark:text-[#E6EDF3]">{path.title}</span>
      </div>

      {/* Header Overview */}
      <div className="rounded-[8px] border border-[#e4e4ed] dark:border-[#1E293B] bg-white dark:bg-[#121A26] p-6 sm:p-8 space-y-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-[4px] bg-[#f4f4f9] dark:bg-[#1E293B] border border-[#e4e4ed] dark:border-[#334155] text-[#303055] dark:text-[#22D3EE] font-medium">
              {path.difficulty}
            </span>
            <span className="text-xs font-mono text-[#6b6b7b] dark:text-[#94A3B8] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              ~{path.estimatedTotalHours} hours total
            </span>
          </div>

          <h1 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#303055] dark:text-[#E6EDF3]">
            {path.title}
          </h1>

          <p className="text-sm sm:text-base text-[#403f53] dark:text-[#94A3B8] max-w-3xl leading-relaxed">
            {path.description}
          </p>
        </div>

        {/* Prerequisites & Certification Meta */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#e4e4ed] dark:border-[#1E293B]">
          <div className="space-y-1.5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#6b6b7b] dark:text-[#94A3B8]">
              Prerequisites
            </h3>
            <ul className="text-xs text-[#403f53] dark:text-[#94A3B8] list-disc list-inside space-y-1">
              {path.prerequisites.map((prereq, index) => (
                <li key={index}>{prereq}</li>
              ))}
            </ul>
          </div>

          {path.certificationTarget && (
            <div className="space-y-1.5">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#6b6b7b] dark:text-[#94A3B8]">
                Certification Alignment
              </h3>
              <p className="text-xs text-[#303055] dark:text-[#E6EDF3]">
                {path.certificationTarget.name} ({path.certificationTarget.examCode})
              </p>
              <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-[#6b6b7b] dark:text-[#94A3B8]">
                <span>Status: {path.certificationTarget.status.toUpperCase()}</span>
                <span>•</span>
                <a
                  href={path.certificationTarget.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3b61b0] dark:text-[#22D3EE] hover:underline inline-flex items-center gap-1"
                >
                  <span>Official Guide</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ordered Stages Container */}
      <div className="space-y-8">
        <div className="space-y-1">
          <h2 className="font-rajdhani text-2xl font-bold text-[#303055] dark:text-[#E6EDF3]">
            Curriculum Breakdown
          </h2>
          <p className="text-xs text-[#6b6b7b] dark:text-[#94A3B8]">
            Follow the sequential modules below. Each stage incorporates verified playlist lectures and hands-on exercises.
          </p>
        </div>

        <div className="space-y-6">
          {path.stages.map((stage) => (
            <div
              key={stage.id}
              className="rounded-[8px] border border-[#e4e4ed] dark:border-[#1E293B] bg-white dark:bg-[#121A26] p-6 space-y-6 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e4e4ed] dark:border-[#1E293B] pb-4">
                <div>
                  <span className="text-xs font-mono text-[#6b6b7b] dark:text-[#22D3EE] font-semibold uppercase tracking-wider">
                    Stage 0{stage.stageNumber}
                  </span>
                  <h3 className="font-rajdhani text-xl font-bold text-[#303055] dark:text-[#E6EDF3]">
                    {stage.title}
                  </h3>
                </div>
                <div className="text-xs font-mono text-[#6b6b7b] dark:text-[#94A3B8]">
                  ~{stage.estimatedHours} hours
                </div>
              </div>

              {/* Topics */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#6b6b7b] dark:text-[#94A3B8]">
                  Core Concepts & Theory
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-[#403f53] dark:text-[#94A3B8]">
                  {stage.topics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#3b61b0] dark:text-[#22D3EE] shrink-0 font-mono">•</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Verified Lectures / Playlists */}
              {stage.recommendedPlaylists.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#6b6b7b] dark:text-[#94A3B8]">
                    Verified YouTube Playlist & Video Materials
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {stage.recommendedPlaylists.map((res, i) => (
                      <a
                        key={i}
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-[4px] border border-[#e4e4ed] dark:border-[#1E293B] bg-[#f4f4f9] dark:bg-[#1E293B] hover:border-[#303055] dark:hover:border-[#22D3EE] transition-colors flex items-center justify-between"
                      >
                        <div className="space-y-0.5">
                          <p className="text-xs font-semibold text-[#303055] dark:text-[#E6EDF3] line-clamp-1">
                            {res.title}
                          </p>
                          <p className="text-[11px] font-mono text-[#6b6b7b] dark:text-[#94A3B8]">
                            Channel: {res.channelName}
                          </p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-[#6b6b7b] shrink-0 ml-2" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Practical Hands-On Exercises */}
              {stage.exercises.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#6b6b7b] dark:text-[#94A3B8]">
                    Practical Exercises & Hands-On Labs
                  </h4>
                  <div className="space-y-3">
                    {stage.exercises.map((exercise) => (
                      <div
                        key={exercise.id}
                        className="p-4 rounded-[6px] border border-[#e4e4ed] dark:border-[#334155] bg-white dark:bg-[#0B1018] space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <div className="flex items-center gap-2">
                            <Terminal className="w-4 h-4 text-[#303055] dark:text-[#22D3EE]" />
                            <h5 className="text-xs font-semibold text-[#303055] dark:text-[#E6EDF3]">
                              {exercise.title}
                            </h5>
                          </div>
                          <span className="text-[11px] font-mono text-[#6b6b7b] dark:text-[#94A3B8]">
                            Env: {exercise.targetEnvironment}
                          </span>
                        </div>

                        <p className="text-xs text-[#403f53] dark:text-[#94A3B8]">
                          {exercise.description}
                        </p>

                        <div className="space-y-1">
                          <span className="text-[11px] font-mono font-semibold uppercase text-[#6b6b7b] dark:text-[#94A3B8]">
                            Instructions:
                          </span>
                          <ol className="list-decimal list-inside text-xs text-[#403f53] dark:text-[#94A3B8] space-y-1">
                            {exercise.instructions.map((inst, idx) => (
                              <li key={idx}>{inst}</li>
                            ))}
                          </ol>
                        </div>

                        <div className="p-2.5 rounded-[4px] bg-[#f4f4f9] dark:bg-[#1E293B] border border-[#e4e4ed] dark:border-[#334155] text-[11px] font-mono text-[#303055] dark:text-[#E6EDF3]">
                          <span className="font-semibold text-[#6b6b7b] dark:text-[#94A3B8]">Criteria: </span>
                          <span>{exercise.verificationCriteria}</span>
                        </div>

                        {exercise.externalLabUrl && (
                          <div className="pt-1">
                            <a
                              href={exercise.externalLabUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#3b61b0] dark:text-[#22D3EE] hover:underline"
                            >
                              <span>Open Official Academy Lab</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

