'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  BookOpen,
  FlaskConical,
  HelpCircle,
  FileCheck2,
  HardDrive,
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
  onSelectLesson: (slug: string) => void;
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
  capstone,
  pcapResources,
  prerequisites,
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'lab' | 'quiz' | 'capstone' | 'pcaps'>('content');

  const hasRichContent = !!activeLesson.richContent;
  const hasModuleLab = !!activeLesson.practicalLab;
  const hasModuleQuiz = !!activeLesson.quiz;
  const isCapstoneLesson =
    activeLesson.id === 'les-08-1-capstone-investigation' ||
    activeLesson.slug === 'operation-blackout-beacon-capstone';
  const hasCapstone = !!capstone && isCapstoneLesson;
  const hasPcaps = !!pcapResources && pcapResources.length > 0;

  useEffect(() => {
    if (isCapstoneLesson) {
      setActiveTab('capstone');
    } else {
      setActiveTab('content');
    }
  }, [activeLesson.id, isCapstoneLesson]);

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
                onClick={() => setActiveTab('content')}
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
                onClick={() => setActiveTab('lab')}
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
                onClick={() => setActiveTab('quiz')}
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
                onClick={() => setActiveTab('capstone')}
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
                onClick={() => setActiveTab('pcaps')}
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
            <ModuleQuizView
              quiz={activeLesson.quiz}
              moduleId={activeLesson.moduleId}
              courseId={courseId}
            />
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

      {/* Lesson Navigation Controls */}
      <LessonNavigation
        courseSlug={courseSlug}
        currentLesson={activeLesson}
        prevLesson={prevLesson}
        nextLesson={nextLesson}
        isCompleted={isLessonCompleted}
        onToggleComplete={onToggleComplete}
        onSelectLesson={onSelectLesson}
      />
    </div>
  );
};

