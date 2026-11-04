'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, BookOpen, User, CheckCircle2, Award, PlayCircle } from 'lucide-react';
import { Course } from '../../types/course';
import { Badge } from '../ui/Badge';
import { localCourseProgressService, onCourseProgressChange } from '../../lib/course-progress';
import { getCourseLessons } from '../../lib/courses';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const lessons = getCourseLessons(course);
  const firstLesson = lessons[0];

  useEffect(() => {
    setProgressPercent(localCourseProgressService.getCourseCompletionPercentage(course));

    const unsub = onCourseProgressChange((state) => {
      if (state.courseId === course.id) {
        setProgressPercent(localCourseProgressService.getCourseCompletionPercentage(course));
      }
    });

    return unsub;
  }, [course]);

  return (
    <div className="group rounded-2xl border border-slate-200 dark:border-[#1f293d] bg-white dark:bg-[#111827] hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-200 flex flex-col overflow-hidden">
      {/* Thumbnail Area */}
      <Link href={`/courses/${course.slug}`} className="block relative aspect-video w-full overflow-hidden bg-slate-900">
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur border border-emerald-500/30 text-xs font-mono font-bold text-emerald-400">
            <BookOpen className="w-3.5 h-3.5" />
            COURSE
          </span>
          <Badge variant="difficulty" difficulty={course.difficulty} size="sm">
            {course.difficulty}
          </Badge>
        </div>

        {/* Play Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-emerald-500/90 flex items-center justify-center shadow-lg shadow-emerald-950/50 group-hover:scale-110 transition-transform">
            <PlayCircle className="w-6 h-6 text-slate-950 fill-current" />
          </div>
        </div>

        {/* Footer in Thumbnail */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            {course.estimatedDuration}
          </span>
          <span>{lessons.length} {lessons.length === 1 ? 'lesson' : 'lessons'}</span>
        </div>
      </Link>

      {/* Course Info */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Instructor */}
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <User className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-medium text-slate-700 dark:text-slate-300">{course.instructor.name}</span>
            {course.instructor.organization && (
              <span className="text-slate-500">• {course.instructor.organization}</span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
            <Link href={`/courses/${course.slug}`}>{course.title}</Link>
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {course.shortDescription}
          </p>
        </div>

        {/* Progress Bar & Footer Action */}
        <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          {progressPercent > 0 ? (
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[11px] font-mono">
                <span className="text-slate-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Progress
                </span>
                <span className="text-emerald-400 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
              <Award className="w-3.5 h-3.5 text-slate-400" />
              <span>Free Structured Curriculum</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-wrap gap-1">
              {course.domains.slice(0, 2).map((dom) => (
                <span
                  key={dom}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60"
                >
                  {dom}
                </span>
              ))}
            </div>

            <Link
              href={firstLesson ? `/courses/${course.slug}?lesson=${firstLesson.slug}` : `/courses/${course.slug}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors"
            >
              {progressPercent > 0 ? 'Resume' : 'Start Course'} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
