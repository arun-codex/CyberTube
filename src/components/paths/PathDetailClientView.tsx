'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2, Circle, AlertTriangle, ShieldCheck, Youtube, ExternalLink, BookOpen, Layers } from 'lucide-react';
import { LearningPathDefinition, PathStep } from '@/types/catalog';
import { isItemCompleted, toggleCompletedItem } from '@/lib/progress';
import { getAuthoritativeResourceById } from '@/lib/authoritativeCatalog';

interface PathDetailClientViewProps {
  path: LearningPathDefinition;
}

export function PathDetailClientView({ path }: PathDetailClientViewProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(`cybertube_path_${path.id}_steps`);
    if (raw) {
      try {
        setCompletedSteps(JSON.parse(raw));
      } catch (e) {
        setCompletedSteps([]);
      }
    }

    const handleUpdate = () => {
      const updatedRaw = localStorage.getItem(`cybertube_path_${path.id}_steps`);
      if (updatedRaw) {
        try {
          setCompletedSteps(JSON.parse(updatedRaw));
        } catch (e) {}
      }
    };

    window.addEventListener('cybertube-progress-update', handleUpdate);
    return () => window.removeEventListener('cybertube-progress-update', handleUpdate);
  }, [path.id]);

  const toggleStep = (stepNumber: number) => {
    let next: number[];
    if (completedSteps.includes(stepNumber)) {
      next = completedSteps.filter((s) => s !== stepNumber);
    } else {
      next = [...completedSteps, stepNumber];
    }
    setCompletedSteps(next);
    localStorage.setItem(`cybertube_path_${path.id}_steps`, JSON.stringify(next));
  };

  const totalSteps = path.steps?.length || 0;
  const progressPercent = totalSteps > 0 ? Math.round((completedSteps.length / totalSteps) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Path Header */}
      <div className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 sm:p-8 space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-2.5 py-1 text-xs font-mono uppercase tracking-wider rounded-md bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/30">
            {path.level}
          </span>
          <span className="px-2.5 py-1 text-xs font-mono rounded-md bg-[#F1F5F9] dark:bg-[#1A2433] text-[#475569] dark:text-[#9BA8B7] border border-[#E2E8F0] dark:border-[#243044]">
            {path.duration}
          </span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
            {path.title}
          </h1>
          <p className="text-base text-[#0E7490] dark:text-[#22D3EE] font-medium mt-1 font-space-grotesk">
            {path.subtitle}
          </p>
        </div>

        <p className="text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed max-w-3xl">
          {path.description}
        </p>

        {/* Progress Bar */}
        {totalSteps > 0 && (
          <div className="pt-2 space-y-2">
            <div className="flex justify-between text-xs font-mono text-[#475569] dark:text-[#9BA8B7]">
              <span>Milestones Completed: {completedSteps.length} of {totalSteps}</span>
              <span className="text-[#0E7490] dark:text-[#22D3EE] font-semibold">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#E2E8F0] dark:bg-[#1A2433] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#0E7490] to-[#22D3EE] transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* CompTIA Official Exam Version Notice */}
        {path.versionNotice && (
          <div className="rounded-lg bg-[#FEF3C7] dark:bg-[#2A2000] border border-[#FDE68A] dark:border-[#78350F] p-4 flex items-start gap-3 text-xs text-[#92400E] dark:text-[#FBBF24]">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong>Official Exam Version Notice:</strong>
              <p>{path.versionNotice}</p>
              <div className="text-[11px] font-mono text-[#B45309] dark:text-[#FBBF24]/80">
                Verified against official CompTIA catalog: {path.versionNoticeVerified}
              </div>
            </div>
          </div>
        )}

        {/* Legal Reminder Notice */}
        {path.legalReminder && (
          <div className="rounded-lg bg-[#FEE2E2] dark:bg-[#341818] border border-[#FECACA] dark:border-[#7F1D1D] p-4 flex items-start gap-3 text-xs text-[#991B1B] dark:text-[#F87171]">
            <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong>Rules of Engagement & Legal Warning:</strong>
              <p>{path.legalReminder}</p>
            </div>
          </div>
        )}
      </div>

      {/* Steps List */}
      {path.steps && path.steps.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
            Curriculum Sequence & Mastery Milestones
          </h2>

          <div className="space-y-6">
            {path.steps.map((step) => {
              const isDone = completedSteps.includes(step.stepNumber);
              const labResource = step.companionLabId ? getAuthoritativeResourceById(step.companionLabId) : null;

              return (
                <div
                  key={step.stepNumber}
                  className={`rounded-xl border transition-all ${
                    isDone
                      ? 'border-[#34D399]/40 bg-[#34D399]/5 dark:bg-[#34D399]/5'
                      : 'border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26]'
                  } p-6 sm:p-7 space-y-5`}
                >
                  {/* Step Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 font-mono text-xs text-[#0E7490] dark:text-[#22D3EE]">
                        <span>STEP {step.stepNumber}</span>
                        {step.estimatedTime && (
                          <>
                            <span>•</span>
                            <span>{step.estimatedTime}</span>
                          </>
                        )}
                      </div>
                      <h3 className="text-lg font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7]">
                        <strong>Goal:</strong> {step.goal}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleStep(step.stepNumber)}
                      className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        isDone
                          ? 'bg-[#34D399] text-[#0B1018]'
                          : 'border border-[#E2E8F0] dark:border-[#243044] text-[#475569] dark:text-[#9BA8B7] hover:border-[#22D3EE]'
                      }`}
                    >
                      {isDone ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Done</span>
                        </>
                      ) : (
                        <>
                          <Circle className="w-4 h-4" />
                          <span>Mark Done</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Resource Choice note if present */}
                  {step.resourceChoice && (
                    <div className="p-3 rounded-lg bg-[#F8FAFC] dark:bg-[#1A2433] border border-[#E2E8F0] dark:border-[#243044] text-xs text-[#475569] dark:text-[#9BA8B7]">
                      <strong className="text-[#0F172A] dark:text-[#E6EDF3]">Learner Choice:</strong> {step.resourceChoice}
                    </div>
                  )}

                  {/* Linked Resources Row */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#475569] dark:text-[#9BA8B7]">
                      Curated Study Materials
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {step.resourceIds.map((resId) => {
                        const res = getAuthoritativeResourceById(resId);
                        if (!res) return null;
                        return (
                          <Link
                            key={res.id}
                            href={`/library/${res.id}`}
                            className="p-3 rounded-lg border border-[#E2E8F0] dark:border-[#243044] bg-[#F8FAFC] dark:bg-[#0B1018] hover:border-[#22D3EE]/50 transition-colors flex items-center justify-between group"
                          >
                            <div className="min-w-0 pr-2">
                              <p className="text-xs font-semibold text-[#0F172A] dark:text-[#E6EDF3] truncate group-hover:text-[#0E7490] dark:group-hover:text-[#22D3EE]">
                                {res.title}
                              </p>
                              <p className="text-[11px] text-[#475569] dark:text-[#9BA8B7]">
                                By {res.creator} • {res.level}
                              </p>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-[#9BA8B7] shrink-0" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Companion Practice Lab */}
                  {labResource && (
                    <div className="p-3 rounded-lg border border-[#E2E8F0] dark:border-[#243044] bg-[#F1F5F9]/60 dark:bg-[#1A2433]/40 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Layers className="w-4 h-4 text-[#22D3EE]" />
                        <div>
                          <p className="text-xs font-medium text-[#0F172A] dark:text-[#E6EDF3]">
                            Companion Lab: {labResource.title}
                          </p>
                          <p className="text-[11px] text-[#475569] dark:text-[#9BA8B7]">
                            {labResource.creator} • {labResource.cost === 'free' ? '100% Free' : 'Free Tier'}
                          </p>
                        </div>
                      </div>
                      <a
                        href={labResource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#0E7490] dark:text-[#22D3EE] font-medium hover:underline inline-flex items-center gap-1"
                      >
                        <span>Open Lab</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}

                  {/* Checklist */}
                  <div className="space-y-2 pt-2 border-t border-[#E2E8F0] dark:border-[#243044]">
                    <h4 className="text-xs font-semibold text-[#0F172A] dark:text-[#E6EDF3]">
                      You are done with this step when you can:
                    </h4>
                    <ul className="space-y-1.5 text-xs text-[#475569] dark:text-[#9BA8B7]">
                      {step.checklist.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#0E7490] dark:text-[#22D3EE] font-bold">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Coming Soon Tracks Grid for Path E */}
      {path.isComingSoon && path.tracks && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
            Curriculum Under Active Research
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {path.tracks.map((track, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 text-[11px] font-mono rounded bg-[#FBBF24]/10 text-[#FBBF24] border border-[#FBBF24]/30 uppercase">
                      {track.level}
                    </span>
                    <span className="text-[11px] font-mono text-[#9BA8B7]">Coming Soon</span>
                  </div>
                  <h3 className="text-base font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
                    {track.title}
                  </h3>
                  <p className="text-xs text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
                    {track.summary}
                  </p>
                  <div className="space-y-1 pt-2">
                    <span className="text-[11px] font-mono text-[#475569] dark:text-[#9BA8B7]">Core competencies:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {track.skillsCovered.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded text-[10px] bg-[#F1F5F9] dark:bg-[#1A2433] text-[#475569] dark:text-[#9BA8B7]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] dark:border-[#243044]">
                  <a
                    href={track.suggestAction}
                    className="inline-flex items-center gap-1.5 text-xs text-[#0E7490] dark:text-[#22D3EE] font-semibold hover:underline"
                  >
                    <span>Suggest a Resource for this Track</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
