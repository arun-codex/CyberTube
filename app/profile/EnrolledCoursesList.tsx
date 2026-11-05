'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { COURSES as courses } from '@/data/courses';

interface EnrolledCoursesProps {
  userId: string;
}

export function EnrolledCoursesList({ userId }: EnrolledCoursesProps) {
  const [progressMap, setProgressMap] = useState<Record<string, { completedCount: number; totalCount: number; percentage: number }>>({});

  useEffect(() => {
    // Read local progress keys
    const map: Record<string, { completedCount: number; totalCount: number; percentage: number }> = {};

    for (const course of courses) {
      const storageKey = `cybertube_course_progress_v1_${course.slug}`;
      const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

      try {
        const raw = localStorage.getItem(storageKey);
        const completedIds: string[] = raw ? JSON.parse(raw) : [];
        const completedCount = completedIds.length;
        const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
        map[course.slug] = { completedCount, totalCount: totalLessons, percentage };
      } catch {
        map[course.slug] = { completedCount: 0, totalCount: totalLessons, percentage: 0 };
      }
    }

    setProgressMap(map);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {courses.map((course) => {
        const stats = progressMap[course.slug] || { completedCount: 0, totalCount: course.modules.reduce((acc, m) => acc + m.lessons.length, 0), percentage: 0 };
        return (
          <div
            key={course.id}
            className="flex flex-col justify-between p-5 rounded-[8px] border border-[#e4e4ed] dark:border-[#26263b] bg-white dark:bg-[#141422] transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-[#f4f4f9] dark:bg-[#1e1e30] border border-[#e4e4ed] dark:border-[#26263b] text-[11px] font-mono text-[#303055] dark:text-[#a0a0c0]">
                  <BookOpen className="w-3 h-3" />
                  {course.track === 'web-development' ? 'WEB DEV' : (course.domains?.[0]?.toUpperCase() || "TRACK")}
                </span>
                <span className="text-xs font-mono font-medium text-[#303055] dark:text-[#f0f0f8]">
                  {stats.percentage}%
                </span>
              </div>

              <h3 className="font-semibold text-sm text-[#303055] dark:text-[#f0f0f8] line-clamp-1">
                {course.title}
              </h3>
              <p className="text-xs text-[#6b6b7b] dark:text-[#8c8ca6] line-clamp-2 mt-1">
                {course.shortDescription}
              </p>

              {/* Progress bar */}
              <div className="w-full bg-[#f4f4f9] dark:bg-[#1e1e30] h-1.5 rounded-full overflow-hidden mt-4">
                <div
                  className="bg-[#303055] dark:bg-[#6366f1] h-full transition-all duration-300"
                  style={{ width: `${stats.percentage}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#e4e4ed] dark:border-[#26263b] text-xs font-mono text-[#6b6b7b] dark:text-[#8c8ca6]">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {stats.completedCount}/{stats.totalCount} lessons
              </span>
              <Link
                href={`/courses/${course.slug}`}
                className="inline-flex items-center gap-1 text-[#303055] dark:text-[#f0f0f8] font-medium hover:underline"
              >
                Continue <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
