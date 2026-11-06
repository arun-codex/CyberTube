'use client';

import React from 'react';
import { Course } from '../../../src/types/course';
import { toCourseLearningViewModel } from '../../../src/lib/course-learning-adapter';
import { UniversalCourseLearningLayout } from '../../../src/components/courses/learning/UniversalCourseLearningLayout';
import { getComprehensiveCourseCompletion } from '../../../src/lib/course-progress';
import { getCourseLessons, getRelatedResourcesForLesson } from '../../../src/lib/courses';

interface CourseLearningExperienceProps {
  course: Course;
  initialLessonSlug?: string;
}

/**
 * Universal Course Learning Experience.
 * Bridges any Course definition into the standardized UniversalCourseLearningLayout.
 */
export const CourseLearningExperience: React.FC<CourseLearningExperienceProps> = ({
  course,
  initialLessonSlug,
}) => {
  const viewModel = toCourseLearningViewModel(course);
  const completionStats = getComprehensiveCourseCompletion(course);

  const allLessons = getCourseLessons(course);
  const activeLesson =
    allLessons.find((l) => l.slug === initialLessonSlug || l.id === initialLessonSlug) || allLessons[0];
  const relatedResources = activeLesson
    ? getRelatedResourcesForLesson(activeLesson, course, 3)
    : [];

  return (
    <UniversalCourseLearningLayout
      course={viewModel}
      initialLessonSlug={initialLessonSlug}
      completionStats={completionStats}
      relatedResources={relatedResources}
    />
  );
};
