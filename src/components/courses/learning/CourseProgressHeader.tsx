'use client';

import React from 'react';
import { CheckCircle2, RotateCcw, ShieldAlert, ListChecks } from 'lucide-react';
import { SyncStatusBadge } from '../SyncStatusBadge';
import { ComprehensiveCourseCompletion } from '../../../types/course';

interface CourseProgressHeaderProps {
  courseId: string;
  totalLessons: number;
  completedLessonIds: string[];
  onResetProgress: () => Promise<void>;
  completionStats?: ComprehensiveCourseCompletion;
  archivedLegacyLessonIds?: string[];
}

export const CourseProgressHeader: React.FC<CourseProgressHeaderProps> = ({
  courseId,
  totalLessons,
  completedLessonIds,
  onResetProgress,
  completionStats,
  archivedLegacyLessonIds = [],
}) => {
  const completedCount = completedLessonIds.length;
  const percent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const handleReset = async () => {
    if (confirm('Reset your progress for this course?')) {
      await onResetProgress();
    }
  };

  const hasMultiDimensionStats =
    completionStats &&
    (completionStats.totalQuizzes > 0 ||
      completionStats.totalLabs > 0 ||
      completionStats.capstoneSubmitted ||
      completionStats.capstonePassed);

  return (
    <div className="space-y-4">
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
              You previously completed {archivedLegacyLessonIds.length} lesson
              {archivedLegacyLessonIds.length > 1 ? 's' : ''} in the prototype curriculum. Your historical progress has been safely archived, and the comprehensive curriculum is now active.
            </div>
          </div>
        </div>
      )}

      {/* Primary Course Progress Card */}
      <div className="rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] p-5 sm:p-6 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0E7490] dark:text-[#22D3EE]" />
            <span className="font-mono text-xs uppercase tracking-wider font-semibold text-[#0E7490] dark:text-[#22D3EE]">
              Course Progress: {percent}%
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-[#64748B] dark:text-[#9BA8B7]">
              {completedCount} / {totalLessons} lessons completed
            </span>
            {completedCount > 0 && (
              <button
                type="button"
                onClick={handleReset}
                className="hover:text-[#dc2626] dark:hover:text-[#f87171] text-[#64748B] dark:text-[#9BA8B7] transition-colors flex items-center gap-1 cursor-pointer"
                title="Reset progress"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Full-width Progress Bar */}
        <div className="w-full h-2 bg-[#e8e8f2] dark:bg-[#1E293B] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0E7490] dark:bg-[#22D3EE] rounded-full transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Sync Status Footer */}
        <div className="pt-2 border-t border-[#f1f5f9] dark:border-[#1E293B] flex items-center justify-between">
          <SyncStatusBadge courseId={courseId} />
        </div>
      </div>

      {/* Multi-Dimension Assessment Progress (when applicable) */}
      {hasMultiDimensionStats && (
        <div
          data-testid="masterclass-assessment-progress"
          className="p-5 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e4e4ed] dark:border-[#243044] pb-3">
            <div className="flex items-center gap-2">
              <ListChecks className="w-5 h-5 text-[#0E7490] dark:text-[#22D3EE]" />
              <h3 className="text-sm font-semibold text-[#0F172A] dark:text-[#E6EDF3]">
                Comprehensive Assessment & Certification Gates
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-[#64748B] dark:text-[#9BA8B7]">Overall Completion:</span>
              <span className="font-semibold text-[#0E7490] dark:text-[#22D3EE]">
                {completionStats.overallProgressPercent}%
              </span>
              <span
                className={`px-2 py-0.5 rounded-[4px] text-[11px] font-medium ${
                  completionStats.isFullyCompleted
                    ? 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                    : 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                }`}
              >
                {completionStats.isFullyCompleted ? 'Fully Completed' : 'In Progress'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            {/* Dimension 1: Lessons */}
            <div className="p-3 rounded-[6px] bg-[#f8fafc] dark:bg-[#1A2638] border border-[#e2e8f0] dark:border-[#243044] space-y-1">
              <div className="text-[11px] text-[#64748B] dark:text-[#9BA8B7] uppercase tracking-wider">
                1. Curriculum Lessons
              </div>
              <div className="text-sm font-bold text-[#0F172A] dark:text-[#E6EDF3]">
                {completionStats.lessonsCompleted} / {completionStats.totalLessons}
              </div>
              <div className="text-[11px] text-[#64748B] dark:text-[#9BA8B7]">
                {completionStats.lessonsCompleted === completionStats.totalLessons
                  ? '✓ Complete'
                  : `${completionStats.lessonCompletionPercent}% completed`}
              </div>
            </div>

            {/* Dimension 2: Quizzes */}
            <div className="p-3 rounded-[6px] bg-[#f8fafc] dark:bg-[#1A2638] border border-[#e2e8f0] dark:border-[#243044] space-y-1">
              <div className="text-[11px] text-[#64748B] dark:text-[#9BA8B7] uppercase tracking-wider">
                2. Module Quizzes (≥70%)
              </div>
              <div className="text-sm font-bold text-[#0F172A] dark:text-[#E6EDF3]">
                {completionStats.quizzesPassed} / {completionStats.totalQuizzes} passed
              </div>
              <div className="text-[11px] text-[#64748B] dark:text-[#9BA8B7]">
                {completionStats.quizzesPassed === completionStats.totalQuizzes
                  ? '✓ All Quizzes Passed'
                  : `${completionStats.quizzesPassed} of ${completionStats.totalQuizzes} passing`}
              </div>
            </div>

            {/* Dimension 3: Practical Labs */}
            <div className="p-3 rounded-[6px] bg-[#f8fafc] dark:bg-[#1A2638] border border-[#e2e8f0] dark:border-[#243044] space-y-1">
              <div className="text-[11px] text-[#64748B] dark:text-[#9BA8B7] uppercase tracking-wider">
                3. Hands-On Labs
              </div>
              <div className="text-sm font-bold text-[#0F172A] dark:text-[#E6EDF3]">
                {completionStats.labsCompleted} / {completionStats.totalLabs} completed
              </div>
              <div className="text-[11px] text-[#64748B] dark:text-[#9BA8B7]">
                {completionStats.labsCompleted === completionStats.totalLabs
                  ? '✓ All Labs Verified'
                  : `${completionStats.labsCompleted} of ${completionStats.totalLabs} done`}
              </div>
            </div>

            {/* Dimension 4: SOC Capstone */}
            <div className="p-3 rounded-[6px] bg-[#f8fafc] dark:bg-[#1A2638] border border-[#e2e8f0] dark:border-[#243044] space-y-1">
              <div className="text-[11px] text-[#64748B] dark:text-[#9BA8B7] uppercase tracking-wider">
                4. SOC Capstone
              </div>
              <div className="text-sm font-bold text-[#0F172A] dark:text-[#E6EDF3]">
                {completionStats.capstonePassed
                  ? 'Passed (≥75)'
                  : completionStats.capstoneSubmitted
                  ? 'Submitted (Review)'
                  : 'Pending'}
              </div>
              <div className="text-[11px] text-[#64748B] dark:text-[#9BA8B7]">
                {completionStats.capstonePassed
                  ? '✓ Threshold Met (≥75)'
                  : 'Req: ≥75/100 self-assessment'}
              </div>
            </div>
          </div>

          {!completionStats.isFullyCompleted &&
            completionStats.remainingRequirements &&
            completionStats.remainingRequirements.length > 0 && (
              <div className="p-3 rounded-[6px] bg-[#fffbeb] dark:bg-[#78350f]/10 border border-[#fef3c7] dark:border-[#78350f]/30 text-xs text-[#92400e] dark:text-[#fde68a]">
                <span className="font-semibold">Remaining certification gates: </span>
                {completionStats.remainingRequirements.join(' • ')}
              </div>
            )}
        </div>
      )}
    </div>
  );
};
