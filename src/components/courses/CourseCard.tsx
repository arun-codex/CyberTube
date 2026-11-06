'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, BookOpen, User, CheckCircle2, Play, ArrowRight } from 'lucide-react';
import { Course } from '../../types/course';
import { getCourseLessons } from '../../lib/courses';
import { useCourseProgress, useAuthProgress } from '../../lib/progress';
import { calculateCourseCardProgress } from '../../lib/progress/course-progress';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { progress, isLoading: isCourseProgressLoading } = useCourseProgress(course.id);
  const { isAuthenticated, isLoading: isAuthLoading } = useAuthProgress();

  const lessons = getCourseLessons(course);
  const firstLesson = lessons[0];

  const cardProgress = calculateCourseCardProgress(course, progress, !isAuthenticated);
  const { percentage, completedLessons, totalLessons, status, lastActiveLessonSlug, isGuestLocal } = cardProgress;

  const isLoading = isAuthLoading && isCourseProgressLoading;

  const trackBadgeLabel =
    course.track === 'web-development'
      ? 'WEB DEV'
      : course.track === 'general-technology'
      ? 'TECH'
      : 'SECURITY';

  // Action button destination
  let actionHref = `/courses/${course.slug}`;
  if (status === 'in_progress' && lastActiveLessonSlug) {
    actionHref = `/courses/${course.slug}?lesson=${lastActiveLessonSlug}`;
  } else if (firstLesson) {
    actionHref = `/courses/${course.slug}?lesson=${firstLesson.slug}`;
  }

  // Button label
  let buttonLabel = 'Start →';
  if (status === 'completed') {
    buttonLabel = 'Review Course →';
  } else if (status === 'in_progress' || percentage > 0) {
    buttonLabel = 'Resume →';
  }

  return (
    <div
      data-testid={`course-card-${course.slug}`}
      className="group rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] hover:border-[#303055] dark:hover:border-[#22D3EE] transition-colors duration-150 flex flex-col overflow-hidden"
    >
      {/* Thumbnail Area */}
      <Link
        href={`/courses/${course.slug}`}
        className="block relative aspect-video w-full overflow-hidden bg-[#f4f4f9] dark:bg-[#1A2433] border-b border-[#e4e4ed] dark:border-[#243044]"
      >
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          width={640}
          height={360}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-white/95 dark:bg-[#0B1018]/90 border border-[#e4e4ed] dark:border-[#243044] text-[11px] font-mono text-[#0F172A] dark:text-[#E6EDF3] font-medium backdrop-blur-xs">
            <BookOpen className="w-3 h-3 text-[#0E7490] dark:text-[#22D3EE]" />
            {trackBadgeLabel}
          </span>
          <span className="px-1.5 py-0.5 rounded-[4px] bg-white/95 dark:bg-[#0B1018]/90 border border-[#e4e4ed] dark:border-[#243044] text-[11px] font-mono text-[#475569] dark:text-[#9BA8B7] capitalize backdrop-blur-xs">
            {course.difficulty}
          </span>
        </div>

        {/* Footer in Thumbnail */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono pointer-events-none">
          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-[4px] bg-white/95 dark:bg-[#0B1018]/90 border border-[#e4e4ed] dark:border-[#243044] text-[#475569] dark:text-[#9BA8B7] backdrop-blur-xs">
            <Clock className="w-3 h-3 text-[#64748B] dark:text-[#9BA8B7]" />
            {course.estimatedDuration}
          </span>
          <span className="px-1.5 py-0.5 rounded-[4px] bg-white/95 dark:bg-[#0B1018]/90 border border-[#e4e4ed] dark:border-[#243044] text-[#475569] dark:text-[#9BA8B7] backdrop-blur-xs">
            {lessons.length} {lessons.length === 1 ? 'lesson' : 'lessons'}
          </span>
        </div>
      </Link>

      {/* Course Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Instructor */}
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#64748B] dark:text-[#9BA8B7]">
            <User className="w-3 h-3 text-[#0E7490] dark:text-[#22D3EE]" />
            <span className="text-[#475569] dark:text-[#9BA8B7] truncate">{course.instructor.name}</span>
            {course.instructor.organization && (
              <span className="text-[#64748B] dark:text-[#64748B] truncate">• {course.instructor.organization}</span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-rajdhani font-bold text-lg text-[#0F172A] dark:text-[#E6EDF3] group-hover:text-[#0E7490] dark:group-hover:text-[#22D3EE] transition-colors line-clamp-2 leading-snug">
            <Link href={`/courses/${course.slug}`}>{course.title}</Link>
          </h3>

          {/* Description */}
          <p className="text-xs text-[#475569] dark:text-[#9BA8B7] line-clamp-2 leading-relaxed">
            {course.shortDescription}
          </p>
        </div>

        {/* Progress Section */}
        <div className="space-y-3 pt-3 border-t border-[#e4e4ed] dark:border-[#243044]">
          {isLoading ? (
            <div className="space-y-1.5 animate-pulse" data-testid="course-progress-skeleton">
              <div className="flex justify-between items-center text-[11px] font-mono text-[#64748B] dark:text-[#9BA8B7]">
                <span className="h-3 w-16 bg-[#e4e4ed] dark:bg-[#1E293B] rounded" />
                <span className="h-3 w-8 bg-[#e4e4ed] dark:bg-[#1E293B] rounded" />
              </div>
              <div className="w-full h-1.5 bg-[#e8e8f2] dark:bg-[#1E293B] rounded-full overflow-hidden">
                <div className="h-full bg-[#cbd5e1] dark:bg-[#334155] w-1/3" />
              </div>
              <div className="h-2.5 w-24 bg-[#e4e4ed] dark:bg-[#1E293B] rounded" />
            </div>
          ) : (
            <div className="space-y-1.5" data-testid={`course-progress-area-${course.slug}`}>
              <div className="flex justify-between items-center text-[11px] font-mono">
                <span className="text-[#64748B] dark:text-[#9BA8B7] flex items-center gap-1.5">
                  {status === 'completed' ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] dark:text-[#34D399]" />
                  ) : percentage > 0 ? (
                    <span className="w-2 h-2 rounded-full bg-[#0E7490] dark:bg-[#22D3EE]" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-[#94a3b8] dark:bg-[#475569]" />
                  )}
                  <span>Progress</span>
                </span>
                <span className="text-[#0F172A] dark:text-[#E6EDF3] font-bold font-mono">
                  {percentage}%
                </span>
              </div>

              {/* Progress bar line */}
              <div className="w-full h-1.5 bg-[#e8e8f2] dark:bg-[#1E293B] rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    status === 'completed'
                      ? 'bg-[#059669] dark:bg-[#34D399]'
                      : 'bg-[#0E7490] dark:bg-[#22D3EE]'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#64748B] dark:text-[#9BA8B7]">
                <span>
                  {completedLessons} / {totalLessons} {totalLessons === 1 ? 'lesson' : 'lessons'} completed
                </span>
                {isGuestLocal && (
                  <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-[#f1f5f9] dark:bg-[#1e293b] text-[#64748b] dark:text-[#94a3b8]">
                    Local
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Footer Action & Track Badges */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-wrap gap-1">
              {course.track === 'web-development' ? (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-[4px] bg-[#f4f4f9] dark:bg-[#1A2433] text-[#0E7490] dark:text-[#22D3EE] border border-[#e4e4ed] dark:border-[#243044] font-medium">
                  Web Development
                </span>
              ) : null}
              {course.domains &&
                course.domains.slice(0, 2).map((dom) => (
                  <span
                    key={dom}
                    className="text-[10px] font-mono px-1.5 py-0.5 rounded-[4px] bg-[#f4f4f9] dark:bg-[#1A2433] text-[#64748B] dark:text-[#9BA8B7] border border-[#e4e4ed] dark:border-[#243044]"
                  >
                    {dom}
                  </span>
                ))}
            </div>

            <Link
              href={actionHref}
              data-testid={`course-action-btn-${course.slug}`}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-[4px] text-xs font-medium transition-colors ${
                status === 'completed'
                  ? 'bg-[#059669] dark:bg-[#10b981] text-white hover:bg-[#047857]'
                  : percentage > 0
                  ? 'bg-[#0E7490] dark:bg-[#22D3EE] text-white dark:text-[#0B1018] hover:bg-[#0891b2] dark:hover:bg-[#06b6d4]'
                  : 'bg-[#0F172A] dark:bg-[#22D3EE] text-white dark:text-[#0B1018] hover:bg-[#1E293B] dark:hover:bg-[#06b6d4]'
              }`}
            >
              {buttonLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
