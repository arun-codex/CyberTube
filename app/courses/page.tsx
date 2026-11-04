import React from 'react';
import { getAllCourses } from '../../src/lib/courses';
import { CourseCard } from '../../src/components/courses/CourseCard';
import { BookOpen, Layers } from 'lucide-react';

export const metadata = {
  title: 'Cybersecurity Courses & Curricula | CyberTube',
  description: 'Structured video-based cybersecurity courses with module breakdowns, progress tracking, and curated hands-on labs.',
};

export default function CoursesPage() {
  const courses = getAllCourses();

  return (
    <div className="container-max py-10 space-y-10">
      {/* Header Banner */}
      <div className="rounded-[8px] border border-[#e4e4ed] bg-[#f4f4f9] p-6 sm:p-8 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-white border border-[#e4e4ed] text-xs font-mono text-[#303055]">
          <BookOpen className="w-3.5 h-3.5 text-[#303055]" />
          <span>Course Directory</span>
        </div>
        <h1 className="font-rajdhani text-3xl sm:text-4xl font-bold text-[#303055] tracking-tight">
          Cybersecurity Video Courses
        </h1>
        <p className="text-sm text-[#403f53] max-w-2xl leading-relaxed">
          Step-by-step modular curricula covering network analysis, hardware exploitation, and defensive architecture.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-[#6b6b7b]">
          <span>{courses.length} courses</span>
          <span>•</span>
          <span>Zero paywalls</span>
          <span>•</span>
          <span>Local progress persistence</span>
        </div>
      </div>

      {/* Courses Catalog Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#e4e4ed] pb-2">
          <h2 className="font-rajdhani text-xl sm:text-2xl font-bold text-[#303055] flex items-center gap-2">
            Available Curricula
          </h2>
          <span className="text-xs font-mono text-[#6b6b7b]">
            {courses.length} tracks
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}
