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

  return (
    <div className="group rounded-[8px] border border-[#e4e4ed] bg-white hover:border-[#303055] transition-colors duration-150 flex flex-col overflow-hidden">
      {/* Thumbnail Area */}
      <Link href={`/courses/${course.slug}`} className="block relative aspect-video w-full overflow-hidden bg-[#f4f4f9] border-b border-[#e4e4ed]">
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-white/95 border border-[#e4e4ed] text-[11px] font-mono text-[#303055] font-medium">
            <BookOpen className="w-3 h-3 text-[#767682]" />
            COURSE
          </span>
          <span className="px-1.5 py-0.5 rounded-[4px] bg-white/95 border border-[#e4e4ed] text-[11px] font-mono text-[#403f53]">
            {course.difficulty}
          </span>
        </div>

        {/* Footer in Thumbnail */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono pointer-events-none">
          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-[4px] bg-white/95 border border-[#e4e4ed] text-[#767682]">
            <Clock className="w-3 h-3 text-[#767682]" />
            {course.estimatedDuration}
          </span>
          <span className="px-1.5 py-0.5 rounded-[4px] bg-white/95 border border-[#e4e4ed] text-[#767682]">
            {lessons.length} {lessons.length === 1 ? 'lesson' : 'lessons'}
          </span>
        </div>
      </Link>

      {/* Course Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Instructor */}
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#767682]">
            <User className="w-3 h-3 text-[#767682]" />
            <span className="text-[#403f53] truncate">{course.instructor.name}</span>
            {course.instructor.organization && (
              <span className="text-[#767682] truncate">• {course.instructor.organization}</span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-base text-[#303055] group-hover:text-[#3b61b0] transition-colors line-clamp-2 leading-snug">
            <Link href={`/courses/${course.slug}`}>{course.title}</Link>
          </h3>

          {/* Description */}
          <p className="text-xs text-[#403f53] line-clamp-2 leading-relaxed">
            {course.shortDescription}
          </p>
        </div>

        {/* Progress Bar & Footer Action */}
        <div className="space-y-3 pt-3 border-t border-[#e4e4ed]">
          {progressPercent > 0 ? (
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[11px] font-mono">
                <span className="text-[#767682] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#303055]" /> Progress
                </span>
                <span className="text-[#303055] font-medium">{progressPercent}%</span>
              </div>
              <div className="w-full h-1 bg-[#e8e8f2] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#303055] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="text-[11px] font-mono text-[#767682]">
              Verified syllabus
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-wrap gap-1">
              {course.domains.slice(0, 2).map((dom) => (
                <span
                  key={dom}
                  className="text-[10px] font-mono px-1.5 py-0.5 rounded-[4px] bg-[#f4f4f9] text-[#767682] border border-[#e4e4ed]"
                >
                  {dom}
                </span>
              ))}
            </div>

            <Link
              href={firstLesson ? `/courses/${course.slug}?lesson=${firstLesson.slug}` : `/courses/${course.slug}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-[4px] text-xs font-medium bg-[#303055] text-white hover:bg-[#252542] transition-colors"
            >
              {progressPercent > 0 ? 'Resume' : 'Start'} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
