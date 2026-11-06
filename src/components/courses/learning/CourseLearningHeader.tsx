'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, User, BookOpen, Layers, ExternalLink } from 'lucide-react';
import { CourseLearningViewModel } from '../../../types/learning-view-model';

interface CourseLearningHeaderProps {
  course: CourseLearningViewModel;
}

export const CourseLearningHeader: React.FC<CourseLearningHeaderProps> = ({ course }) => {
  return (
    <div className="space-y-4">
      {/* Breadcrumb Navigation */}
      <div>
        <Link
          href="/courses"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#64748B] dark:text-[#9BA8B7] hover:text-[#0F172A] dark:hover:text-[#E6EDF3] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Courses</span>
          <span>/</span>
          <span className="text-[#0F172A] dark:text-[#E6EDF3] font-medium truncate max-w-xs sm:max-w-md">
            {course.title}
          </span>
        </Link>
      </div>

      {/* Course Overview Card */}
      <div className="rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 sm:p-8 space-y-4">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono px-2.5 py-0.5 rounded-[4px] bg-[#f4f4f9] dark:bg-[#1A2638] text-[#0E7490] dark:text-[#22D3EE] border border-[#e4e4ed] dark:border-[#243044] flex items-center gap-1.5 font-medium">
            <BookOpen className="w-3.5 h-3.5 text-[#0E7490] dark:text-[#22D3EE]" />
            {course.category}
          </span>
          <span className="text-xs font-mono px-2 py-0.5 rounded-[4px] bg-[#f4f4f9] dark:bg-[#1A2638] text-[#475569] dark:text-[#9BA8B7] border border-[#e4e4ed] dark:border-[#243044] capitalize">
            {course.difficulty}
          </span>
          {course.domains &&
            course.domains.map((dom) => (
              <span
                key={dom}
                className="text-xs font-mono px-2 py-0.5 rounded-[4px] bg-[#f4f4f9] dark:bg-[#1A2638] text-[#64748B] dark:text-[#9BA8B7] border border-[#e4e4ed] dark:border-[#243044]"
              >
                {dom}
              </span>
            ))}
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#0F172A] dark:text-[#E6EDF3] tracking-tight">
          {course.title}
        </h1>

        {/* Description */}
        <p className="text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed max-w-4xl">
          {course.description}
        </p>

        {/* Metadata Row */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#64748B] dark:text-[#9BA8B7] pt-2 border-t border-[#f1f5f9] dark:border-[#1E293B]">
          <span className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#0E7490] dark:text-[#22D3EE]" />
            <span className="text-[#0F172A] dark:text-[#E6EDF3] font-medium">{course.instructor.name}</span>
            {course.instructor.organization && (
              <span>({course.instructor.organization})</span>
            )}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#64748B] dark:text-[#9BA8B7]" />
            {course.estimatedDuration}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-[#64748B] dark:text-[#9BA8B7]" />
            {course.totalModules} {course.totalModules === 1 ? 'module' : 'modules'} ({course.totalLessons} lessons)
          </span>

          {course.sourcePlaylistUrl && (
            <>
              <span>•</span>
              <a
                href={course.sourcePlaylistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#0E7490] dark:text-[#22D3EE] hover:underline"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Original Playlist ({course.sourcePlaylistId})</span>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
