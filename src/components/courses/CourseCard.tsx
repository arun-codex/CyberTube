'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, BookOpen, User, CheckCircle2 } from 'lucide-react';
import { Course } from '../../types/course';
import { onCourseProgressChange } from '../../lib/course-progress';
import { cloudCourseProgressService } from '../../lib/cloud-course-progress';
import { getCourseLessons } from '../../lib/courses';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const lessons = getCourseLessons(course);
  const firstLesson = lessons[0];

  useEffect(() => {
    setProgressPercent(cloudCourseProgressService.getCourseCompletionPercentage(course));

    const unsub = onCourseProgressChange((state) => {
      if (state.courseId === course.id) {
        setProgressPercent(cloudCourseProgressService.getCourseCompletionPercentage(course));
      }
    });

    return unsub;
  }, [course]);

  const trackBadgeLabel =
    course.track === 'web-development'
      ? 'WEB DEV'
      : course.track === 'general-technology'
      ? 'TECH'
      : 'SECURITY';

  return (
    <div className="group rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] hover:border-[#303055] dark:hover:border-[#22D3EE] transition-colors duration-150 flex flex-col overflow-hidden">
      {/* Thumbnail Area */}
      <Link href={`/courses/${course.slug}`} className="block relative aspect-video w-full overflow-hidden bg-[#f4f4f9] dark:bg-[#1A2433] border-b border-[#e4e4ed] dark:border-[#243044]">
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

        {/* Progress Bar & Footer Action */}
        <div className="space-y-3 pt-3 border-t border-[#e4e4ed] dark:border-[#243044]">
          {progressPercent > 0 ? (
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[11px] font-mono">
                <span className="text-[#64748B] dark:text-[#9BA8B7] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#047857] dark:text-[#34D399]" /> Progress
                </span>
                <span className="text-[#0F172A] dark:text-[#E6EDF3] font-medium">{progressPercent}%</span>
              </div>
              <div className="w-full h-1 bg-[#e8e8f2] dark:bg-[#1E293B] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0E7490] dark:bg-[#22D3EE] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="text-[11px] font-mono text-[#64748B] dark:text-[#9BA8B7]">
              Verified syllabus
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-wrap gap-1">
              {course.track === 'web-development' ? (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-[4px] bg-[#f4f4f9] dark:bg-[#1A2433] text-[#0E7490] dark:text-[#22D3EE] border border-[#e4e4ed] dark:border-[#243044] font-medium">
                  Web Development
                </span>
              ) : null}
              {course.domains && course.domains.slice(0, 2).map((dom) => (
                <span
                  key={dom}
                  className="text-[10px] font-mono px-1.5 py-0.5 rounded-[4px] bg-[#f4f4f9] dark:bg-[#1A2433] text-[#64748B] dark:text-[#9BA8B7] border border-[#e4e4ed] dark:border-[#243044]"
                >
                  {dom}
                </span>
              ))}
            </div>

            <Link
              href={firstLesson ? `/courses/${course.slug}?lesson=${firstLesson.slug}` : `/courses/${course.slug}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-[4px] text-xs font-medium bg-[#0F172A] dark:bg-[#22D3EE] text-white dark:text-[#0B1018] hover:bg-[#1E293B] dark:hover:bg-[#06b6d4] transition-colors"
            >
              {progressPercent > 0 ? 'Resume' : 'Start'} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
