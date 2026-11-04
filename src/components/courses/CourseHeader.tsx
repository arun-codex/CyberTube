'use client';

import React from 'react';
import Link from 'next/link';
import { Course } from '../../types/course';
import { Badge } from '../ui/Badge';
import { ArrowLeft, Clock, User, BookOpen, Layers } from 'lucide-react';
import { CourseProgress } from './CourseProgress';
import { getCourseLessons } from '../../lib/courses';

interface CourseHeaderProps {
  course: Course;
}

export const CourseHeader: React.FC<CourseHeaderProps> = ({ course }) => {
  const lessons = getCourseLessons(course);

  return (
    <div className="space-y-6">
      {/* Back to courses */}
      <div>
        <Link
          href="/courses"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Courses</span>
        </Link>
      </div>

      {/* Main Course Info Panel */}
      <div className="rounded-2xl border border-slate-200 dark:border-[#1f293d] bg-white dark:bg-[#111827] p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            {/* Badges Cluster */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" /> Structured Course
              </span>
              <Badge variant="difficulty" difficulty={course.difficulty} size="md">
                {course.difficulty}
              </Badge>
              {course.domains.map((dom) => (
                <span
                  key={dom}
                  className="text-xs font-mono px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  {dom}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {course.title}
            </h1>

            {/* Description */}
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {course.description}
            </p>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 pt-2">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-700 dark:text-slate-300 font-semibold">{course.instructor.name}</span>
                {course.instructor.organization && <span>({course.instructor.organization})</span>}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                {course.estimatedDuration}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                {course.modules.length} {course.modules.length === 1 ? 'module' : 'modules'} ({lessons.length} lessons)
              </span>
            </div>
          </div>

          {/* Progress Widget */}
          <div className="w-full lg:w-72 shrink-0">
            <CourseProgress course={course} />
          </div>
        </div>
      </div>
    </div>
  );
};
