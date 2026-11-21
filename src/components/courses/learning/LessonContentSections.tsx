'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldAlert,
  BookOpen,
  FlaskConical,
  HelpCircle,
  FileCheck2,
  HardDrive,
  CheckCircle2,
  Lock,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { NormalizedLesson } from '../../../types/learning-view-model';
import { LessonObjectives } from './LessonObjectives';
import { LessonSkillsSection } from './LessonSkillsSection';
import { LessonNavigation } from './LessonNavigation';
import { LessonContentRenderer } from '../LessonContentRenderer';
import { PracticalLabView } from '../PracticalLabView';
import { ModuleQuizView } from '../ModuleQuizView';
import { CapstoneAssessmentView } from '../CapstoneAssessmentView';
import { PCAPResourceList } from '../PCAPResourceList';

interface LessonContentSectionsProps {
  courseId: string;
  courseSlug: string;
  domains: string[];
  activeLesson: NormalizedLesson;
  prevLesson?: NormalizedLesson;
  nextLesson?: NormalizedLesson;
  isLessonCompleted: boolean;
  onToggleComplete: () => void;
  onSelectLesson: (slug: string, tab?: 'content' | 'lab' | 'quiz' | 'capstone' | 'pcaps') => void;
  activeTabOverride?: 'content' | 'lab' | 'quiz' | 'capstone' | 'pcaps';
  onTabChange?: (tab: 'content' | 'lab' | 'quiz' | 'capstone' | 'pcaps') => void;
  completedLessonIds?: string[];
  quizScores?: Record<string, number>;
  currentModuleLessons?: NormalizedLesson[];
  capstone?: any;
  pcapResources?: any[];
  prerequisites?: string[];
}

export const LessonContentSections: React.FC<LessonContentSectionsProps> = ({
  courseId,
  courseSlug,
  domains,
  activeLesson,
  prevLesson,
  nextLesson,
  isLessonCompleted,
  onToggleComplete,
  onSelectLesson,
  activeTabOverride,
  onTabChange,
  completedLessonIds = [],
  quizScores = {},
  currentModuleLessons = [],
  capstone,
  pcapResources,
  prerequisites,
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'lab' | 'quiz' | 'capstone' | 'pcaps'>('content');
  const quizAnchorRef = useRef<HTMLDivElement>(null);

  const hasRichContent = !!activeLesson.richContent;
  const hasModuleLab = !!activeLesson.practicalLab;
  const hasModuleQuiz = !!activeLesson.quiz;
  const isCapstoneLesson =
    activeLesson.id === 'les-08-1-capstone-investigation' ||
    activeLesson.slug === 'operation-blackout-beacon-capstone';
  const hasCapstone = !!capstone && isCapstoneLesson;
  const hasPcaps = !!pcapResources && pcapResources.length > 0;

  useEffect(() => {
    if (activeTabOverride) {
      setActiveTab(activeTabOverride);
    } else if (isCapstoneLesson) {
      setActiveTab('capstone');
    } else {
      setActiveTab('content');
    }
  }, [activeLesson.id, isCapstoneLesson, activeTabOverride]);

  const handleTabClick = (tab: 'content' | 'lab' | 'quiz' | 'capstone' | 'pcaps') => {
    if (tab === 'quiz' && activeTab === 'quiz') {
      quizAnchorRef.current?.scrollIntoView({block:'start',behavior:'smooth'});
    }
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  useEffect(() => {
    if (activeTab !== 'quiz' || !hasModuleQuiz) return;
    // Wait until the conditional assessment panel is mounted before scrolling.
    const frame=requestAnimationFrame(() => {
      const target=quizAnchorRef.current;
      if (!target) return;
      target.scrollIntoView({
        block: 'start',
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      });
      target.focus({preventScroll:true});
    });
    return () => cancelAnimationFrame(frame);
  }, [activeTab, activeLesson.id, hasModuleQuiz]);

  const showEthicalNotice =
    courseSlug === 'wireshark-and-ethical-hacking' ||
    domains.includes('network-security') ||
    domains.includes('malware-reverse-engineering');

  const hasInteractiveTabs =
    hasRichContent || hasModuleLab || hasModuleQuiz || hasCapstone || hasPcaps;

  return (
    <div className="space-y-6">
      {/* Lesson Header Banner */}
      <div className="rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] p-5 sm:p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-[#64748B] dark:text-[#9BA8B7]">
          <span className="px-2 py-0.5 rounded-[4px] bg-[#f4f4f9] dark:bg-[#1A2638] border border-[#e4e4ed] dark:border-[#243044] text-[#0F172A] dark:text-[#E6EDF3] font-medium">
            Lesson #{activeLesson.order}
          </span>
          {activeLesson.moduleTitle && (
            <span className="truncate max-w-sm">{activeLesson.moduleTitle}</span>
          )}
        </div>

        <h2 className="text-xl sm:text-2xl font-semibold text-[#0F172A] dark:text-[#E6EDF3]">
          {activeLesson.title}
        </h2>

        {activeLesson.description && (
          <p className="text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
            {activeLesson.description}
          </p>
        )}
      </div>

      {/* Ethical and Safety Lab Notice */}
      {showEthicalNotice && (
        <div
          data-testid="ethical-use-notice"
          className="flex items-start gap-2.5 p-3.5 rounded-[6px] bg-[#fffbeb] dark:bg-[#78350f]/20 border border-[#fde68a] dark:border-[#b45309]/30 text-[#92400e] dark:text-[#fbbf24] text-xs leading-relaxed"
        >
          <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-[#b45309] dark:text-[#f59e0b]" />
          <div>
            <span className="font-semibold text-[#78350f] dark:text-[#fde68a]">
              Ethical Lab Environment Notice:{' '}
            </span>
            Practice only on systems, networks, and devices you own or have explicit permission to test. Use isolated lab environments for traffic capture, credential analysis, and security demonstrations.
          </div>
        </div>
      )}

      {/* Lesson Learning Objectives & Acquired Skills */}
      {(activeLesson.objectives.length > 0 || activeLesson.skillsTaught.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LessonObjectives objectives={activeLesson.objectives} />
          <LessonSkillsSection skills={activeLesson.skillsTaught} />
        </div>
      )}

      {/* Interactive Tabs (Guide, Practical Lab, Quiz, Capstone, PCAP Library) */}
      {hasInteractiveTabs && (
        <div className="space-y-4">
          {/* Tab Selector Bar */}
          <div className="flex items-center gap-2 border-b border-[#e4e4ed] dark:border-[#243044] pb-2 overflow-x-auto">
            {hasRichContent && (
              <button
                type="button"
                onClick={() => handleTabClick('content')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-mono font-medium transition-colors cursor-pointer ${
                  activeTab === 'content'
                    ? 'bg-[#0E7490] text-white shadow-sm'
                    : 'text-[#64748B] dark:text-[#9BA8B7] hover:bg-[#f4f4f9] dark:hover:bg-[#1A2638]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Lesson Guide</span>
              </button>
            )}

            {hasModuleLab && activeLesson.practicalLab && (
              <button
                type="button"
                onClick={() => handleTabClick('lab')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-mono font-medium transition-colors cursor-pointer ${
                  activeTab === 'lab'
                    ? 'bg-[#0E7490] text-white shadow-sm'
                    : 'text-[#64748B] dark:text-[#9BA8B7] hover:bg-[#f4f4f9] dark:hover:bg-[#1A2638]'
                }`}
              >
                <FlaskConical className="w-3.5 h-3.5" />
                <span>Module Lab ({activeLesson.practicalLab.tasks?.length || 0} tasks)</span>
              </button>
            )}

            {hasModuleQuiz && activeLesson.quiz && (
              <button
                type="button"
                onClick={() => handleTabClick('quiz')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-mono font-medium transition-colors cursor-pointer ${
                  activeTab === 'quiz'
                    ? 'bg-[#0E7490] text-white shadow-sm'
                    : 'text-[#64748B] dark:text-[#9BA8B7] hover:bg-[#f4f4f9] dark:hover:bg-[#1A2638]'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Module Quiz ({activeLesson.quiz.questions?.length || 0} Qs)</span>
              </button>
            )}

            {hasCapstone && capstone && (
              <button
                type="button"
                onClick={() => handleTabClick('capstone')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-mono font-medium transition-colors cursor-pointer ${
                  activeTab === 'capstone'
                    ? 'bg-[#0E7490] text-white shadow-sm'
                    : 'text-[#64748B] dark:text-[#9BA8B7] hover:bg-[#f4f4f9] dark:hover:bg-[#1A2638]'
                }`}
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>SOC Capstone (100 Marks)</span>
              </button>
            )}

            {hasPcaps && pcapResources && (
              <button
                type="button"
                onClick={() => handleTabClick('pcaps')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-mono font-medium transition-colors cursor-pointer ${
                  activeTab === 'pcaps'
                    ? 'bg-[#0E7490] text-white shadow-sm'
                    : 'text-[#64748B] dark:text-[#9BA8B7] hover:bg-[#f4f4f9] dark:hover:bg-[#1A2638]'
                }`}
              >
                <HardDrive className="w-3.5 h-3.5" />
                <span>PCAP Library ({pcapResources.length})</span>
              </button>
            )}
          </div>

          {/* Tab Panels */}
          {activeTab === 'content' && activeLesson.richContent && (
            <LessonContentRenderer
              content={activeLesson.richContent}
              pcapResources={pcapResources}
            />
          )}

          {activeTab === 'lab' && activeLesson.practicalLab && (
            <PracticalLabView lab={activeLesson.practicalLab} courseId={courseId} />
          )}

          {activeTab === 'quiz' && activeLesson.quiz && (
            <div id="course-quiz-focus" ref={quizAnchorRef} tabIndex={-1}
              className="scroll-mt-24 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]">
              <ModuleQuizView
                key={courseId+'-'+activeLesson.moduleId}
                quiz={activeLesson.quiz}
                moduleId={activeLesson.moduleId}
                courseId={courseId}
                courseSlug={courseSlug}
              />
            </div>
          )}

          {activeTab === 'capstone' && capstone && (
            <CapstoneAssessmentView capstone={capstone} courseId={courseId} />
          )}

          {activeTab === 'pcaps' && pcapResources && (
            <PCAPResourceList resources={pcapResources} />
          )}
        </div>
      )}

      {/* Course Prerequisites */}
      {prerequisites && prerequisites.length > 0 && (
        <div className="p-5 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] space-y-3">
          <h3 className="text-xs font-mono font-medium uppercase tracking-wider text-[#64748B] dark:text-[#9BA8B7] flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-[#0E7490] dark:text-[#22D3EE]" />
            <span>Prerequisites</span>
          </h3>
          <ul className="space-y-1.5 text-xs text-[#334155] dark:text-[#CBD5E1]">
            {prerequisites.map((prereq, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#0E7490] dark:text-[#22D3EE]">•</span>
                <span>{prereq}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Prominent Module Assessment Quiz Section Banner */}
      {hasModuleQuiz && activeLesson.quiz && (() => {
        const totalModLessons = currentModuleLessons.length || 5;
        const completedModLessons = currentModuleLessons.filter((l) =>
          completedLessonIds.includes(l.id)
        ).length;
        const allLessonsFinished = completedModLessons >= totalModLessons && totalModLessons > 0;
        const passingThreshold = activeLesson.quiz.passingScorePercent || 70;
        const currentBestScore = quizScores[activeLesson.moduleId] ?? 0;
        const hasPassed = currentBestScore >= passingThreshold;
        const questionCount = activeLesson.quiz.questions?.length || 10;
        const quizTitle = activeLesson.quiz.title || `${activeLesson.moduleTitle || 'Module'} Assessment Quiz`;
        const isLastLesson =
          currentModuleLessons.length > 0 &&
          currentModuleLessons[currentModuleLessons.length - 1].id === activeLesson.id;

        return (
          <div
            data-testid="module-quiz-assessment-section"
            className="rounded-[8px] border border-[#0E7490]/30 dark:border-[#22D3EE]/30 bg-[#f0fdfa]/60 dark:bg-[#042f2e]/20 p-5 sm:p-6 space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-[4px] bg-[#0E7490] text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                    Assessment Quiz
                  </span>
                  {hasPassed ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-950/40 px-2 py-0.5 rounded-[4px] border border-green-200 dark:border-green-800">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Passed ({currentBestScore}%)
                    </span>
                  ) : currentBestScore > 0 ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/40 px-2 py-0.5 rounded-[4px] border border-amber-200 dark:border-amber-800">
                      Best Score: {currentBestScore}% (Need ≥ {passingThreshold}%)
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono text-[#64748B] dark:text-[#9BA8B7]">
                      Passing threshold: {passingThreshold}%
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#E6EDF3]">
                  {quizTitle}
                </h3>

                <p className="text-xs text-[#475569] dark:text-[#9BA8B7] leading-relaxed max-w-xl">
                  {questionCount} comprehensive questions covering all key concepts from this module. Score at least {passingThreshold}% to pass. Only courses with enforced sequential prerequisites require a passing score to unlock later modules.
                </p>

                <div className="flex items-center gap-3 pt-1 text-[11px] font-mono text-[#64748B] dark:text-[#9BA8B7]">
                  <span>
                    Lessons completed: {completedModLessons}/{totalModLessons}
                  </span>
                  <span>•</span>
                  <span>
                    Passing threshold: {passingThreshold}%
                  </span>
                  <span>•</span>
                  <span>
                    Questions: {questionCount}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-2 shrink-0">
                {activeTab === 'quiz' ? (
                  <button
                    type="button"
                    onClick={() => handleTabClick('content')}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[6px] bg-slate-200 hover:bg-slate-300 dark:bg-[#1E293B] dark:hover:bg-[#334155] text-slate-800 dark:text-slate-200 font-mono text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Return to Lesson Guide</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleTabClick('quiz')}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[6px] bg-[#0E7490] hover:bg-[#0891b2] text-white font-mono text-xs font-bold transition-all shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>
                      {hasPassed ? 'Retake Assessment Quiz' : 'Start Assessment Quiz'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {!allLessonsFinished && !hasPassed && (
                  <p className="text-[10px] font-mono text-amber-600 dark:text-amber-400">
                    Tip: Complete remaining {totalModLessons - completedModLessons} lesson(s) first for optimal preparation.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Lesson Navigation Controls */}
      <LessonNavigation
        courseSlug={courseSlug}
        currentLesson={activeLesson}
        prevLesson={prevLesson}
        nextLesson={nextLesson}
        isCompleted={isLessonCompleted}
        onToggleComplete={onToggleComplete}
        onSelectLesson={onSelectLesson}
        onOpenQuiz={() => handleTabClick('quiz')}
        hasQuiz={hasModuleQuiz}
        isLastLessonInModule={
          currentModuleLessons.length > 0 &&
          currentModuleLessons[currentModuleLessons.length - 1].id === activeLesson.id
        }
      />
    </div>
  );
};

