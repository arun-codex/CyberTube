import React from 'react';
import { notFound } from 'next/navigation';
import { getAllCourses, getCourseBySlug, getCourseLessons } from '../../../src/lib/courses';
import { CourseLearningExperience } from './CourseLearningExperience';

interface CourseDetailPageProps {
  params: {
    slug: string;
  };
  searchParams?: {
    lesson?: string;
  };
}

export function generateStaticParams() {
  return getAllCourses().map((course) => ({
    slug: course.slug,
  }));
}

export default function CourseDetailPage({ params, searchParams }: CourseDetailPageProps) {
  const course = getCourseBySlug(params.slug);

  if (!course) {
    notFound();
  }

  const allLessons = getCourseLessons(course);
  const activeLessonSlug = searchParams?.lesson || allLessons[0]?.slug;
  const activeLesson = allLessons.find((l) => l.slug === activeLessonSlug) || allLessons[0];

  return (
    <CourseLearningExperience
      course={course}
      initialLessonSlug={activeLesson?.slug}
    />
  );
}

