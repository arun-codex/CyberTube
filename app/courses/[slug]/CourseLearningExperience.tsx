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
import {
  localCourseProgressService,
  onCourseProgressChange,
} from '../../../src/lib/course-progress';
import {
  Target,
  Award,
  BookOpen,
  Sparkles,
  CheckCircle2,
  ListOrdered,
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

  // Update active lesson if URL search params change
  useEffect(() => {
    if (initialLessonSlug) {
      setActiveLessonSlug(initialLessonSlug);
    }
  }, [initialLessonSlug]);

  // Load progress
  useEffect(() => {
    const state = localCourseProgressService.getProgress(course.id);
    setCompletedLessonIds(state.completedLessonIds);

    // If user has a last active lesson and no initialLessonSlug was passed in URL, resume it
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

  // Record lesson access on active lesson change
  useEffect(() => {
    if (activeLesson) {
      localCourseProgressService.recordLessonAccess(course.id, activeLesson.id);
    }
  }, [course.id, activeLesson]);

  if (!activeLesson) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-400">
        No lessons available in this course curriculum.
      </div>
    );
  }

  const { prevLesson, nextLesson } = getAdjacentLessons(course, activeLesson.id);
  const isLessonCompleted = completedLessonIds.includes(activeLesson.id);

  const handleToggleComplete = (lessonId = activeLesson.id) => {
    const updated = localCourseProgressService.toggleLessonCompletion(course.id, lessonId);
    if (updated && nextLesson && lessonId === activeLesson.id) {
      // Optional subtle auto-advance or just update completed list
    }
  };

  const relatedResources = getRelatedResourcesForLesson(activeLesson, course, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Course Overview Header */}
      <CourseHeader course={course} />

      {/* Main Learning Hub Layout (Player + Curriculum) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (Desktop 8 / Mobile full): Video Player + Lesson Meta */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Focused Player Card */}
          <div className="rounded-2xl border border-slate-200 dark:border-[#1f293d] bg-white dark:bg-[#111827] p-4 sm:p-6 shadow-sm space-y-6">
            {/* Embedded YouTube Player */}
            <div className="rounded-xl overflow-hidden shadow-lg border border-slate-800 bg-black">
              <YouTubePlayer
                videoId={activeLesson.youtubeVideoId}
                title={activeLesson.title}
                channelName={course.instructor.name}
              />
            </div>

            {/* Lesson Title & Module Breadcrumb */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                  Lesson #{activeLesson.order}
                </span>
                {activeLesson.moduleTitle && (
                  <span className="text-slate-500 truncate max-w-sm">
                    {activeLesson.moduleTitle}
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {activeLesson.title}
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Objectives */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-[#1f293d] bg-white dark:bg-[#111827] space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-emerald-400" />
                Lesson Objectives
              </h3>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {activeLesson.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold shrink-0 mt-0.5">▸</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-[#1f293d] bg-white dark:bg-[#111827] space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-cyan-400" />
                Skills Acquired
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {activeLesson.skillsTaught.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Course Prerequisites & Syllabus Overview */}
          {course.prerequisites && course.prerequisites.length > 0 && (
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-[#1f293d] bg-white dark:bg-[#111827] space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-slate-400" />
                Course Prerequisites
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {course.prerequisites.map((prereq, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-slate-500">•</span>
                    <span>{prereq}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column (Desktop 4 / Mobile underneath): Curriculum Navigation */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-20 space-y-6">
            <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-[#1f293d] bg-white dark:bg-[#111827] shadow-sm">
              <ModuleAccordion
                course={course}
                activeLessonId={activeLesson.id}
                completedLessonIds={completedLessonIds}
                onToggleComplete={handleToggleComplete}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Connected Practice & Deep Dive: Related CyberTube Resources */}
      {relatedResources.length > 0 && (
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                Connected Hands-on Labs & Documentation
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Practice what you just watched with connected CyberTube catalog resources.
              </p>
            </div>
            <Link
              href="/discover"
              className="text-xs font-mono text-emerald-400 hover:underline"
            >
              Explore Discover →
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
