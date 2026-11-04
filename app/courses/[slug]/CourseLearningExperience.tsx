'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Course, Lesson } from '../../../src/types/course';
import { CourseHeader } from '../../../src/components/courses/CourseHeader';
import { ModuleAccordion } from '../../../src/components/courses/ModuleAccordion';
import { LessonNavigation } from '../../../src/components/courses/LessonNavigation';
import { YouTubePlayer } from '../../../src/components/YouTubePlayer';
import { ResourceCard } from '../../../src/components/ResourceCard';
import {
  getCourseLessons,
  getAdjacentLessons,
  getRelatedResourcesForLesson,
} from '../../../src/lib/courses';
import { onCourseProgressChange } from '../../../src/lib/course-progress';
import { cloudCourseProgressService } from '../../../src/lib/cloud-course-progress';
import {
  Target,
  Award,
  BookOpen,
} from 'lucide-react';

interface CourseLearningExperienceProps {
  course: Course;
  initialLessonSlug?: string;
}

export const CourseLearningExperience: React.FC<CourseLearningExperienceProps> = ({
  course,
  initialLessonSlug,
}) => {
  const allLessons = getCourseLessons(course);
  const [activeLessonSlug, setActiveLessonSlug] = useState<string>(
    initialLessonSlug || allLessons[0]?.slug || ''
  );

  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);

  useEffect(() => {
    if (initialLessonSlug) {
      setActiveLessonSlug(initialLessonSlug);
    }
  }, [initialLessonSlug]);

  useEffect(() => {
    const state = cloudCourseProgressService.getProgress(course.id);
    setCompletedLessonIds(state.completedLessonIds);

    if (!initialLessonSlug && state.lastActiveLessonId) {
      const match = allLessons.find((l) => l.id === state.lastActiveLessonId);
      if (match) {
        setActiveLessonSlug(match.slug);
      }
    }

    const unsub = onCourseProgressChange((updatedState) => {
      if (updatedState.courseId === course.id) {
        setCompletedLessonIds(updatedState.completedLessonIds);
      }
    });

    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course.id]);

  const activeLesson: Lesson | undefined =
    allLessons.find((l) => l.slug === activeLessonSlug) || allLessons[0];

  useEffect(() => {
    if (activeLesson) {
      cloudCourseProgressService.recordLessonAccess(course.id, activeLesson.id);
    }
  }, [course.id, activeLesson]);

  if (!activeLesson) {
    return (
      <div className="container-max py-16 text-center text-[#767682] font-mono">
        No lessons available in this course curriculum.
      </div>
    );
  }

  const { prevLesson, nextLesson } = getAdjacentLessons(course, activeLesson.id);
  const isLessonCompleted = completedLessonIds.includes(activeLesson.id);

  const handleToggleComplete = (lessonId = activeLesson.id) => {
    cloudCourseProgressService.toggleLessonCompletion(course.id, lessonId);
  };

  const relatedResources = getRelatedResourcesForLesson(activeLesson, course, 3);

  return (
    <div className="container-max py-8 space-y-8">
      {/* Course Overview Header */}
      <CourseHeader course={course} />

      {/* Main Learning Hub Layout (Player + Curriculum) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (Desktop 8 / Mobile full): Video Player + Lesson Meta */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-[8px] border border-[#e4e4ed] bg-white p-4 sm:p-6 space-y-5">
            {/* Embedded YouTube Player */}
            <YouTubePlayer
              videoId={activeLesson.youtubeVideoId}
              title={activeLesson.title}
              channelName={course.instructor.name}
            />

            {/* Lesson Title & Module Breadcrumb */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2 text-xs font-mono text-[#767682]">
                <span className="px-2 py-0.5 rounded-[4px] bg-[#f4f4f9] border border-[#e4e4ed] text-[#303055] font-medium">
                  Lesson #{activeLesson.order}
                </span>
                {activeLesson.moduleTitle && (
                  <span className="truncate max-w-sm">
                    {activeLesson.moduleTitle}
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-semibold text-[#303055]">
                {activeLesson.title}
              </h2>

              <p className="text-sm text-[#403f53] leading-relaxed">
                {activeLesson.description}
              </p>
            </div>

            {/* Previous / Next Lesson Navigation & Completion Toggle */}
            <LessonNavigation
              course={course}
              currentLesson={activeLesson}
              prevLesson={prevLesson}
              nextLesson={nextLesson}
              isCompleted={isLessonCompleted}
              onToggleComplete={() => handleToggleComplete(activeLesson.id)}
            />
          </div>

          {/* Lesson Learning Objectives & Acquired Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Objectives */}
            <div className="p-5 rounded-[8px] border border-[#e4e4ed] bg-white space-y-3">
              <h3 className="text-xs font-mono font-medium uppercase tracking-wider text-[#767682] flex items-center gap-1.5">
                <Target className="w-4 h-4 text-[#303055]" />
                Lesson Objectives
              </h3>
              <ul className="space-y-2 text-xs text-[#403f53]">
                {activeLesson.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#303055] font-bold shrink-0 mt-0.5">•</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div className="p-5 rounded-[8px] border border-[#e4e4ed] bg-white space-y-3">
              <h3 className="text-xs font-mono font-medium uppercase tracking-wider text-[#767682] flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#303055]" />
                Skills Acquired
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {activeLesson.skillsTaught.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-[4px] text-xs font-mono bg-[#f4f4f9] text-[#403f53] border border-[#e4e4ed]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Course Prerequisites */}
          {course.prerequisites && course.prerequisites.length > 0 && (
            <div className="p-5 rounded-[8px] border border-[#e4e4ed] bg-white space-y-3">
              <h3 className="text-xs font-mono font-medium uppercase tracking-wider text-[#767682] flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#767682]" />
                Prerequisites
              </h3>
              <ul className="space-y-1.5 text-xs text-[#403f53]">
                {course.prerequisites.map((prereq, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#767682]">•</span>
                    <span>{prereq}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column (Desktop 4 / Mobile underneath): Curriculum Navigation */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-4 sm:p-5 rounded-[8px] border border-[#e4e4ed] bg-white">
            <ModuleAccordion
              course={course}
              activeLessonId={activeLesson.id}
              completedLessonIds={completedLessonIds}
              onToggleComplete={handleToggleComplete}
            />
          </div>
        </div>
      </div>

      {/* Connected Practice & Deep Dive */}
      {relatedResources.length > 0 && (
        <div className="pt-8 border-t border-[#e4e4ed] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-[#303055]">
                Connected Labs & Reference Documentation
              </h3>
              <p className="text-xs text-[#767682] mt-0.5">
                Extend this lesson with verified tools, packet captures, and specifications.
              </p>
            </div>
            <Link
              href="/discover"
              className="text-xs font-mono text-[#303055] hover:text-[#3b61b0]"
            >
              Discover catalog →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedResources.map((res) => (
              <ResourceCard key={res.id} resource={res} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
