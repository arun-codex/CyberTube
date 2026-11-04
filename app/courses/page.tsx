import React from 'react';
import Link from 'next/link';
import { getAllCourses } from '../../src/lib/courses';
import { CourseCard } from '../../src/components/courses/CourseCard';
import { GraduationCap, Sparkles, BookOpen, Layers } from 'lucide-react';

export const metadata = {
  title: 'Cybersecurity Courses & Curricula | CyberTube',
  description: 'Structured video-based cybersecurity courses with module breakdowns, progress tracking, and curated hands-on labs.',
};

export default function CoursesPage() {
  const courses = getAllCourses();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="rounded-3xl border border-slate-200 dark:border-[#1f293d] bg-gradient-to-br from-slate-900 via-[#111827] to-slate-950 p-8 sm:p-12 relative overflow-hidden shadow-sm">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            Structured Video Learning
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Cybersecurity Courses & Learning Paths
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Progress through curated, ordered video modules taught by industry experts.
            Complete lessons, track progress locally, and connect video theory with hands-on labs.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-300">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              {courses.length} Structured Courses
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Layers className="w-4 h-4 text-emerald-400" />
              Verified YouTube Sources
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              100% Free & Open Access
            </span>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-emerald-500/5 to-transparent pointer-events-none" />
      </div>

      {/* Courses Catalog Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            Available Curricula
          </h2>
          <span className="text-xs font-mono text-slate-500">
            Showing all {courses.length} courses
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
