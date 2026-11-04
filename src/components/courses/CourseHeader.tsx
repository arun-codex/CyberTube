'use client';

import React from 'react';
import Link from 'next/link';
import { Course } from '../../types/course';
import { ArrowLeft, Clock, User, BookOpen, Layers } from 'lucide-react';
import { CourseProgress } from './CourseProgress';
import { getCourseLessons } from '../../lib/courses';

interface CourseHeaderProps {
  course: Course;
}

export const CourseHeader: React.FC<CourseHeaderProps> = ({ course }) => {
  const lessons = getCourseLessons(course);

  return (
    <div className="space-y-4">
      {/* Back to courses */}
      <div>
        <Link
          href="/courses"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#767682] hover:text-[#303055] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Courses</span>
        </Link>
      </div>

      {/* Main Course Info Panel */}
      <div className="rounded-[8px] border border-[#e4e4ed] bg-white p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded-[4px] bg-[#f4f4f9] text-[#303055] border border-[#e4e4ed] flex items-center gap-1.5 font-medium">
                <BookOpen className="w-3.5 h-3.5 text-[#767682]" /> Course
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-[4px] bg-[#f4f4f9] text-[#403f53] border border-[#e4e4ed]">
                {course.difficulty}
              </span>
              {course.domains.map((dom) => (
                <span
                  key={dom}
                  className="text-xs font-mono px-2 py-0.5 rounded-[4px] bg-[#f4f4f9] text-[#767682] border border-[#e4e4ed]"
                >
                  {dom}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#303055] tracking-tight">
              {course.title}
            </h1>

            {/* Description */}
            <p className="text-sm text-[#403f53] leading-relaxed">
              {course.description}
            </p>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#767682] pt-1">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#767682]" />
                <span className="text-[#303055] font-medium">{course.instructor.name}</span>
                {course.instructor.organization && <span>({course.instructor.organization})</span>}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#767682]" />
                {course.estimatedDuration}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-[#767682]" />
                {course.modules.length} {course.modules.length === 1 ? 'module' : 'modules'} ({lessons.length} lessons)
              </span>
            </div>
          </div>

          {/* Quick Progress summary box on header */}
          <div className="lg:w-80 shrink-0">
            <CourseProgress course={course} variant="compact" />
          </div>
        </div>
      </div>
    </div>
  );
};
