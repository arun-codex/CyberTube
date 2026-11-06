'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Course, Lesson } from '../../../src/types/course';
import { CourseHeader } from '../../../src/components/courses/CourseHeader';
import { ModuleAccordion } from '../../../src/components/courses/ModuleAccordion';
import { LessonNavigation } from '../../../src/components/courses/LessonNavigation';
import { YouTubePlayer } from '../../../src/components/YouTubePlayer';
import { ResourceCard } from '../../../src/components/ResourceCard';
import { LessonContentRenderer } from '../../../src/components/courses/LessonContentRenderer';
import { PracticalLabView } from '../../../src/components/courses/PracticalLabView';
import { ModuleQuizView } from '../../../src/components/courses/ModuleQuizView';
import { CapstoneAssessmentView } from '../../../src/components/courses/CapstoneAssessmentView';
import { PCAPResourceList } from '../../../src/components/courses/PCAPResourceList';
import {
  getCourseLessons,
  getAdjacentLessons,
  getRelatedResourcesForLesson,
} from '../../../src/lib/courses';
import { onCourseProgressChange, getComprehensiveCourseCompletion } from '../../../src/lib/course-progress';
import { cloudCourseProgressService } from '../../../src/lib/cloud-course-progress';
import { LessonVideoResources } from '../../../src/components/courses/LessonVideoResources';
import { getLessonVideoResources } from '../../../src/lib/video-manifest';
import {
  Target,
  Award,
  BookOpen,
  ShieldAlert,
  ExternalLink,
  FlaskConical,
  HelpCircle,
  HardDrive,
  FileCheck2,
  CheckCircle2,
  ListChecks,
} from 'lucide-react';

interface CourseLearningExperienceProps {
  course: Course;
  initialLessonSlug?: string;
}


export const CourseLearningExperience: React.FC<CourseLearningExperienceProps> = ({
  course,
  initialLessonSlug,
}) => {
  const allLessons = getCourseLessons(course);
  const [activeLessonSlug, setActiveLessonSlug] = useState<string>(
    initialLessonSlug || allLessons[0]?.slug || ''
  );

  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [archivedLegacyLessonIds, setArchivedLegacyLessonIds] = useState<string[]>([]);
  const [completionStats, setCompletionStats] = useState(() =>
    getComprehensiveCourseCompletion(course)
  );
  const [activeTab, setActiveTab] = useState<'content' | 'lab' | 'quiz' | 'capstone' | 'pcaps'>('content');

  useEffect(() => {
    if (initialLessonSlug) {
      setActiveLessonSlug(initialLessonSlug);
    }
  }, [initialLessonSlug]);

  useEffect(() => {
    const state = cloudCourseProgressService.getProgress(course.id);
    setCompletedLessonIds(state.completedLessonIds);
    setArchivedLegacyLessonIds(state.archivedLegacyLessonIds || []);
    setCompletionStats(getComprehensiveCourseCompletion(course));

    if (!initialLessonSlug && state.lastActiveLessonId) {
      const match = allLessons.find((l) => l.id === state.lastActiveLessonId);
      if (match) {
        setActiveLessonSlug(match.slug);
      }
    }

    const unsub = onCourseProgressChange((updatedState) => {
      if (updatedState.courseId === course.id) {
        setCompletedLessonIds(updatedState.completedLessonIds);
        setArchivedLegacyLessonIds(updatedState.archivedLegacyLessonIds || []);
        setCompletionStats(getComprehensiveCourseCompletion(course));
      }
    });

    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course.id]);

  const activeLesson: Lesson | undefined =
    allLessons.find((l) => l.slug === activeLessonSlug) || allLessons[0];

  const activeModule = activeLesson
    ? course.modules.find((m) => m.lessons.some((l) => l.id === activeLesson.id))
    : undefined;

  useEffect(() => {
    if (activeLesson) {
      cloudCourseProgressService.recordLessonAccess(course.id, activeLesson.id);
      if (activeLesson.id === 'les-08-1-capstone-investigation' || activeLesson.slug === 'operation-blackout-beacon-capstone') {
        setActiveTab('capstone');
      } else {
        setActiveTab('content');
      }
    }
  }, [course.id, activeLesson]);

  if (!activeLesson) {
    return (
      <div className="container-max py-16 text-center text-[#6b6b7b] font-mono">
        No lessons available in this course curriculum.
      </div>
    );
  }

  const { prevLesson, nextLesson } = getAdjacentLessons(course, activeLesson.id);
  const isLessonCompleted = completedLessonIds.includes(activeLesson.id);

  const handleToggleComplete = (lessonId = activeLesson.id) => {
    cloudCourseProgressService.toggleLessonCompletion(course.id, lessonId);
  };

  const handleSelectLesson = (slug: string) => {
    setActiveLessonSlug(slug);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `/courses/${course.slug}?lesson=${slug}`);
    }
  };

  const relatedResources = getRelatedResourcesForLesson(activeLesson, course, 3);

  const hasRichContent = !!activeLesson.richContent;
  const hasModuleLab = !!activeModule?.practicalLab;
  const hasModuleQuiz = !!activeModule?.quiz;
  const hasCapstone = !!course.capstone && (activeLesson.id === 'les-08-1-capstone-investigation' || activeLesson.slug === 'operation-blackout-beacon-capstone' || activeModule?.id === 'mod-08-soc-forensics-capstone');
  const hasPcaps = !!course.pcapResources && course.pcapResources.length > 0;

  return (
    <div className="container-max py-8 space-y-8">
      {/* Course Overview Header */}
      <CourseHeader course={course} />

      {/* Legacy Progress Banner */}
      {archivedLegacyLessonIds.length > 0 && (
        <div
          data-testid="legacy-progress-banner"
          className="p-4 rounded-[8px] bg-[#f0f9ff] dark:bg-[#0c4a6e]/20 border border-[#bae6fd] dark:border-[#0284c7]/40 text-[#0369a1] dark:text-[#38bdf8] flex items-start gap-3 text-xs leading-relaxed"
        >
          <ShieldAlert className="w-5 h-5 shrink-0 text-[#0284c7] mt-0.5" />
          <div className="space-y-1">
            <div className="font-semibold text-[#0c4a6e] dark:text-[#e0f2fe]">
              Legacy Course Progress Archived
            </div>
            <div>
              You previously completed {archivedLegacyLessonIds.length} lesson{archivedLegacyLessonIds.length > 1 ? 's' : ''} in the prototype curriculum. Your historical progress has been safely archived, and the comprehensive 37-lesson Network Packet Forensics Masterclass is now active.
            </div>
          </div>
        </div>
      )}

      {/* Assessment and Multi-Dimension Progress Overview */}
      {(course.id === 'course-packet-analysis-wireshark' || course.capstone || completionStats.totalQuizzes > 0) && (
        <div
          data-testid="masterclass-assessment-progress"
          className="p-5 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e4e4ed] dark:border-[#243044] pb-3">
            <div className="flex items-center gap-2">
              <ListChecks className="w-5 h-5 text-[#0E7490] dark:text-[#22D3EE]" />
              <h3 className="text-sm font-semibold text-[#303055] dark:text-[#E6EDF3]">
                Comprehensive Assessment & Certification Gates
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-[#6b6b7b] dark:text-[#9BA8B7]">Overall Completion:</span>
              <span className="font-semibold text-[#0E7490] dark:text-[#22D3EE]">{completionStats.overallProgressPercent}%</span>
              <span className={`px-2 py-0.5 rounded-[4px] text-[11px] font-medium ${
                completionStats.isFullyCompleted
                  ? 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                  : 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
              }`}>
                {completionStats.isFullyCompleted ? 'Fully Completed' : 'In Progress'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            {/* Dimension 1: Lessons */}
            <div className="p-3 rounded-[6px] bg-[#f8fafc] dark:bg-[#1A2638] border border-[#e2e8f0] dark:border-[#243044] space-y-1">
              <div className="text-[11px] text-[#6b6b7b] dark:text-[#9BA8B7] uppercase tracking-wider">
                1. Curriculum Lessons
              </div>
              <div className="text-sm font-bold text-[#303055] dark:text-[#E6EDF3]">
                {completionStats.lessonsCompleted} / {completionStats.totalLessons}
              </div>
              <div className="text-[11px] text-[#6b6b7b] dark:text-[#9BA8B7]">
                {completionStats.lessonsCompleted === completionStats.totalLessons ? '✓ Complete' : `${completionStats.lessonCompletionPercent}% completed`}
              </div>
            </div>

            {/* Dimension 2: Quizzes */}
            <div className="p-3 rounded-[6px] bg-[#f8fafc] dark:bg-[#1A2638] border border-[#e2e8f0] dark:border-[#243044] space-y-1">
              <div className="text-[11px] text-[#6b6b7b] dark:text-[#9BA8B7] uppercase tracking-wider">
                2. Module Quizzes (≥70%)
              </div>
              <div className="text-sm font-bold text-[#303055] dark:text-[#E6EDF3]">
                {completionStats.quizzesPassed} / {completionStats.totalQuizzes} passed
              </div>
              <div className="text-[11px] text-[#6b6b7b] dark:text-[#9BA8B7]">
                {completionStats.quizzesPassed === completionStats.totalQuizzes ? '✓ All Quizzes Passed' : `${completionStats.quizzesPassed} of ${completionStats.totalQuizzes} passing`}
              </div>
            </div>

            {/* Dimension 3: Practical Labs */}
            <div className="p-3 rounded-[6px] bg-[#f8fafc] dark:bg-[#1A2638] border border-[#e2e8f0] dark:border-[#243044] space-y-1">
              <div className="text-[11px] text-[#6b6b7b] dark:text-[#9BA8B7] uppercase tracking-wider">
                3. Hands-On Labs
              </div>
              <div className="text-sm font-bold text-[#303055] dark:text-[#E6EDF3]">
                {completionStats.labsCompleted} / {completionStats.totalLabs} completed
              </div>
              <div className="text-[11px] text-[#6b6b7b] dark:text-[#9BA8B7]">
                {completionStats.labsCompleted === completionStats.totalLabs ? '✓ All Labs Verified' : `${completionStats.labsCompleted} of ${completionStats.totalLabs} done`}
              </div>
            </div>

            {/* Dimension 4: SOC Capstone */}
            <div className="p-3 rounded-[6px] bg-[#f8fafc] dark:bg-[#1A2638] border border-[#e2e8f0] dark:border-[#243044] space-y-1">
              <div className="text-[11px] text-[#6b6b7b] dark:text-[#9BA8B7] uppercase tracking-wider">
                4. SOC Capstone
              </div>
              <div className="text-sm font-bold text-[#303055] dark:text-[#E6EDF3]">
                {completionStats.capstonePassed
                  ? 'Passed (≥75)'
                  : completionStats.capstoneSubmitted
                  ? 'Submitted (Review)'
                  : 'Pending'}
              </div>
              <div className="text-[11px] text-[#6b6b7b] dark:text-[#9BA8B7]">
                {completionStats.capstonePassed ? '✓ Threshold Met (≥75)' : 'Req: ≥75/100 self-assessment'}
              </div>
            </div>
          </div>

          {!completionStats.isFullyCompleted && completionStats.remainingRequirements && completionStats.remainingRequirements.length > 0 && (
            <div className="p-3 rounded-[6px] bg-[#fffbeb] dark:bg-[#78350f]/10 border border-[#fef3c7] dark:border-[#78350f]/30 text-xs text-[#92400e] dark:text-[#fde68a]">
              <span className="font-semibold">Remaining certification gates: </span>
              {completionStats.remainingRequirements.join(' • ')}
            </div>
          )}
        </div>
      )}

      {/* Main Learning Hub Layout (Player + Curriculum) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (Desktop 8 / Mobile full): Video/Theory Header + Content */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] p-4 sm:p-6 space-y-5">
            {/* Embedded lesson video library + theory/lab guide */}
            <div className="space-y-4">
              {course.id === 'course-packet-analysis-wireshark' ? (
                <LessonVideoResources
                  courseId={course.id}
                  moduleId={activeModule?.id}
                  lessonId={activeLesson.id}
                  lessonTitle={activeLesson.title}
                  moduleTitle={activeModule?.title}
                  estimatedDurationMinutes={activeLesson.durationMinutes}
                  availableResources={getLessonVideoResources(course.id, activeLesson.id)}
                  nextLessonTitle={nextLesson?.title}
                  onSelectNextLesson={nextLesson ? () => handleSelectLesson(nextLesson.slug) : undefined}
                />
              ) : activeLesson.youtubeVideoId ? (
                <YouTubePlayer
                  videoId={activeLesson.youtubeVideoId}
                  title={activeLesson.title}
                  channelName={course.instructor.name}
                  courseId={course.id}
                  moduleId={activeModule?.id}
                  lessonId={activeLesson.id}
                />
              ) : (
                <div
                  data-testid="theory-lesson-banner"
                  className="rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] dark:from-[#0b1320] dark:to-[#162234] p-5 sm:p-6 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e2e8f0] dark:border-[#243044] pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-[6px] bg-[#0E7490]/10 dark:bg-[#22D3EE]/10 text-[#0E7490] dark:text-[#22D3EE]">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="font-mono text-xs uppercase tracking-wider text-[#0E7490] dark:text-[#22D3EE] font-semibold">
                          Curriculum & Practical Lab Guide
                        </span>
                        <div className="text-xs text-[#64748B] dark:text-[#94A3B8]">
                          Estimated Duration: {activeLesson.durationMinutes} mins
                        </div>
                      </div>
                    </div>
                    <span className="rounded-[4px] border border-[#bae6fd] dark:border-[#155e75] bg-[#e0f2fe] dark:bg-[#0c3445] px-2 py-1 text-[10px] font-mono text-[#075985] dark:text-[#67e8f9]">
                      Theory + practical lesson
                    </span>
                  </div>
                  <div className="text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
                    This lesson is built around original protocol theory, packet disassembly, and practical exercises. Follow the curriculum guide below.
                  </div>
                </div>
              )}
            </div>

            {/* Ethical and Safety Lab Notice */}
            {(course.slug === 'wireshark-and-ethical-hacking' || course.domains.includes('network-security')) && (
              <div
                data-testid="ethical-use-notice"
                className="flex items-start gap-2.5 p-3 rounded-[6px] bg-[#fffbeb] dark:bg-[#78350f]/20 border border-[#fde68a] dark:border-[#b45309]/30 text-[#92400e] dark:text-[#fbbf24] text-xs leading-relaxed"
              >
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-[#b45309] dark:text-[#f59e0b]" />
                <div>
                  <span className="font-semibold text-[#78350f] dark:text-[#fde68a]">Ethical Lab Environment Notice: </span>
                  Practice only on systems, networks, and devices you own or have explicit permission to test. Use isolated lab environments for traffic capture, credential analysis, and security demonstrations.
                </div>
              </div>
            )}

            {/* Lesson Title & Module Breadcrumb */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2 text-xs font-mono text-[#6b6b7b] dark:text-[#9BA8B7]">
                <span className="px-2 py-0.5 rounded-[4px] bg-[#f4f4f9] dark:bg-[#1A2638] border border-[#e4e4ed] dark:border-[#243044] text-[#303055] dark:text-[#E6EDF3] font-medium">
                  Lesson #{activeLesson.order}
                </span>
                {activeLesson.moduleTitle && (
                  <span className="truncate max-w-sm">
                    {activeLesson.moduleTitle}
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-semibold text-[#303055] dark:text-[#E6EDF3]">
                {activeLesson.title}
              </h2>

              <p className="text-sm text-[#403f53] dark:text-[#9BA8B7] leading-relaxed">
                {activeLesson.description}
              </p>
            </div>

            {/* Previous / Next Lesson Navigation & Completion Toggle */}
            <LessonNavigation
              course={course}
              currentLesson={activeLesson}
              prevLesson={prevLesson}
              nextLesson={nextLesson}
              isCompleted={isLessonCompleted}
              onToggleComplete={() => handleToggleComplete(activeLesson.id)}
              onSelectLesson={handleSelectLesson}
            />
          </div>

          {/* Lesson Learning Objectives & Acquired Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Objectives */}
            <div className="p-5 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] space-y-3">
              <h3 className="text-xs font-mono font-medium uppercase tracking-wider text-[#6b6b7b] dark:text-[#9BA8B7] flex items-center gap-1.5">
                <Target className="w-4 h-4 text-[#303055] dark:text-[#22D3EE]" />
                Lesson Objectives
              </h3>
              <ul className="space-y-2 text-xs text-[#403f53] dark:text-[#CBD5E1]">
                {activeLesson.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#303055] dark:text-[#22D3EE] font-bold shrink-0 mt-0.5">•</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div className="p-5 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] space-y-3">
              <h3 className="text-xs font-mono font-medium uppercase tracking-wider text-[#6b6b7b] dark:text-[#9BA8B7] flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#303055] dark:text-[#22D3EE]" />
                Skills Acquired
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {activeLesson.skillsTaught.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-[4px] text-xs font-mono bg-[#f4f4f9] dark:bg-[#1A2638] text-[#403f53] dark:text-[#9BA8B7] border border-[#e4e4ed] dark:border-[#243044]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Lesson & Module Workspace Tabs */}
          {(hasRichContent || hasModuleLab || hasModuleQuiz || hasCapstone || hasPcaps) && (
            <div className="space-y-6">
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

                {hasModuleLab && activeModule?.practicalLab && (
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
                    <span>Module Lab ({activeModule.practicalLab.tasks.length} tasks)</span>
                  </button>
                )}

                {hasModuleQuiz && activeModule?.quiz && (
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
                    <span>Module Quiz ({activeModule.quiz.questions.length} Qs)</span>
                  </button>
                )}

                {hasCapstone && course.capstone && (
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

                {hasPcaps && course.pcapResources && (
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
                    <span>PCAP Library ({course.pcapResources.length})</span>
                  </button>
                )}
              </div>

              {/* Tab Panels */}
              {activeTab === 'content' && (
                <LessonContentRenderer
                  content={activeLesson.richContent}
                  pcapResources={course.pcapResources}
                />
              )}

              {activeTab === 'lab' && activeModule?.practicalLab && (
                <PracticalLabView
                  lab={activeModule.practicalLab}
                  courseId={course.id}
                />
              )}

              {activeTab === 'quiz' && activeModule?.quiz && (
                <ModuleQuizView
                  quiz={activeModule.quiz}
                  moduleId={activeModule.id}
                  courseId={course.id}
                />
              )}

              {activeTab === 'capstone' && course.capstone && (
                <CapstoneAssessmentView
                  capstone={course.capstone}
                  courseId={course.id}
                />
              )}

              {activeTab === 'pcaps' && course.pcapResources && (
                <PCAPResourceList resources={course.pcapResources} />
              )}
            </div>
          )}

          {/* Course Prerequisites */}
          {course.prerequisites && course.prerequisites.length > 0 && (
            <div className="p-5 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] space-y-3">
              <h3 className="text-xs font-mono font-medium uppercase tracking-wider text-[#6b6b7b] dark:text-[#9BA8B7] flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#6b6b7b] dark:text-[#22D3EE]" />
                Prerequisites
              </h3>
              <ul className="space-y-1.5 text-xs text-[#403f53] dark:text-[#CBD5E1]">
                {course.prerequisites.map((prereq, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#6b6b7b] dark:text-[#22D3EE]">•</span>
                    <span>{prereq}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column (Desktop 4 / Mobile underneath): Curriculum Navigation */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-4 sm:p-5 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26]">
            <ModuleAccordion
              course={course}
              activeLessonId={activeLesson.id}
              completedLessonIds={completedLessonIds}
              onToggleComplete={handleToggleComplete}
              onSelectLesson={handleSelectLesson}
            />
          </div>
        </div>
      </div>

      {/* Connected Practice & Deep Dive */}
      {relatedResources.length > 0 && (
        <div className="pt-8 border-t border-[#e4e4ed] dark:border-[#243044] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-[#303055] dark:text-[#E6EDF3]">
                Connected Labs & Reference Documentation
              </h3>
              <p className="text-xs text-[#6b6b7b] dark:text-[#9BA8B7] mt-0.5">
                Extend this lesson with verified tools, packet captures, and specifications.
              </p>
            </div>
            <Link
              href="/discover"
              className="text-xs font-mono text-[#303055] dark:text-[#22D3EE] hover:underline"
            >
              Discover catalog →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedResources.map((res) => (
              <ResourceCard key={res.id} resource={res} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
