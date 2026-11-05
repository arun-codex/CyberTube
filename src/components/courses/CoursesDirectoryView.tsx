'use client';

import React, { useState } from 'react';
import { Course, CourseTrack } from '../../types/course';
import { CourseCard } from './CourseCard';
import { BookOpen, Shield, Code, Cpu, Filter } from 'lucide-react';

interface CoursesDirectoryViewProps {
  courses: Course[];
}

type TrackFilter = 'all' | CourseTrack;

export const CoursesDirectoryView: React.FC<CoursesDirectoryViewProps> = ({ courses }) => {
  const [selectedTrack, setSelectedTrack] = useState<TrackFilter>('all');

  const cybersecurityCourses = courses.filter(
    (c) => !c.track || c.track === 'cybersecurity'
  );
  const webDevCourses = courses.filter((c) => c.track === 'web-development');
  const generalTechCourses = courses.filter((c) => c.track === 'general-technology');

  const filteredCourses = courses.filter((c) => {
    if (selectedTrack === 'all') return true;
    if (selectedTrack === 'cybersecurity') return !c.track || c.track === 'cybersecurity';
    return c.track === selectedTrack;
  });

  const tracks: { id: TrackFilter; label: string; count: number; icon: React.ReactNode }[] = [
    {
      id: 'all',
      label: 'All Tracks',
      count: courses.length,
      icon: <Filter className="w-3.5 h-3.5" />,
    },
    {
      id: 'cybersecurity',
      label: 'Cybersecurity',
      count: cybersecurityCourses.length,
      icon: <Shield className="w-3.5 h-3.5" />,
    },
    {
      id: 'web-development',
      label: 'Web Development',
      count: webDevCourses.length,
      icon: <Code className="w-3.5 h-3.5" />,
    },
    {
      id: 'general-technology',
      label: 'General Technology',
      count: generalTechCourses.length,
      icon: <Cpu className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-[#f4f4f9] dark:bg-[#121A26] p-6 sm:p-8 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-white dark:bg-[#1A2433] border border-[#e4e4ed] dark:border-[#243044] text-xs font-mono text-[#0E7490] dark:text-[#22D3EE]">
          <BookOpen className="w-3.5 h-3.5 text-[#0E7490] dark:text-[#22D3EE]" />
          <span>Course Directory</span>
        </div>
        <h1 className="font-rajdhani text-3xl sm:text-4xl font-bold text-[#0F172A] dark:text-[#E6EDF3] tracking-tight">
          Video Courses & Learning Tracks
        </h1>
        <p className="text-sm text-[#475569] dark:text-[#9BA8B7] max-w-2xl leading-relaxed">
          Step-by-step modular curricula covering cybersecurity engineering, full-stack web development, and computing technologies.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-mono text-[#64748B] dark:text-[#9BA8B7]">
          <span>{courses.length} courses</span>
          <span>•</span>
          <span>Multiple learning tracks</span>
          <span>•</span>
          <span>Zero paywalls</span>
          <span>•</span>
          <span>Progress persistence</span>
        </div>
      </div>

      {/* Track Selection Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#e4e4ed] dark:border-[#243044] pb-4">
        {tracks.map((track) => {
          const isActive = selectedTrack === track.id;
          return (
            <button
              key={track.id}
              onClick={() => setSelectedTrack(track.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-mono font-medium transition-colors ${
                isActive
                  ? 'bg-[#303055] dark:bg-[#22D3EE] text-white dark:text-[#0B1018] border border-[#303055] dark:border-[#22D3EE]'
                  : 'bg-white dark:bg-[#121A26] text-[#475569] dark:text-[#9BA8B7] border border-[#e4e4ed] dark:border-[#243044] hover:border-[#303055] dark:hover:border-[#22D3EE] hover:text-[#0F172A] dark:hover:text-[#E6EDF3]'
              }`}
            >
              {track.icon}
              <span>{track.label}</span>
              <span
                className={`ml-1 px-1.5 py-0.2 rounded-[4px] text-[10px] ${
                  isActive
                    ? 'bg-white/20 dark:bg-[#0B1018]/20 text-white dark:text-[#0B1018]'
                    : 'bg-[#f4f4f9] dark:bg-[#1A2433] text-[#64748B] dark:text-[#9BA8B7]'
                }`}
              >
                {track.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Courses Catalog Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#e4e4ed] dark:border-[#243044] pb-2">
          <h2 className="font-rajdhani text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-[#E6EDF3] flex items-center gap-2">
            Available Curricula
          </h2>
          <span className="text-xs font-mono text-[#64748B] dark:text-[#9BA8B7]">
            Showing {filteredCourses.length} of {courses.length} courses
          </span>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 rounded-[8px] border border-dashed border-[#e4e4ed] dark:border-[#243044] bg-[#fbfbfe] dark:bg-[#121A26] text-xs font-mono text-[#64748B] dark:text-[#9BA8B7]">
            No courses found in this learning track yet. Check back soon for new curriculum additions.
          </div>
        )}
      </div>
    </div>
  );
};
