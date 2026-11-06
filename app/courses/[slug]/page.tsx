import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { getAllCourses, getCourseBySlugWithDb, getCourseLessons } from '../../../src/lib/courses';
import { CourseLearningExperience } from './CourseLearningExperience';

interface CourseDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{
    lesson?: string;
  }>;
}

export function generateStaticParams() {
  return getAllCourses().map((course) => ({
    slug: course.slug,
  }));
}

export default async function CourseDetailPage({ params, searchParams }: CourseDetailPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  // Backward-compatible redirect alias for proposed masterclass slug
  if (slug === 'network-packet-analysis-forensics-masterclass') {
    const lessonQuery = resolvedSearchParams?.lesson ? `?lesson=${encodeURIComponent(resolvedSearchParams.lesson)}` : '';
    redirect(`/courses/network-packet-analysis-masterclass${lessonQuery}`);
  }

  const course = await getCourseBySlugWithDb(slug);

  if (!course) {
    notFound();
  }

  const allLessons = getCourseLessons(course);
  const activeLessonSlug = resolvedSearchParams?.lesson || allLessons[0]?.slug;
  const activeLesson = allLessons.find((l) => l.slug === activeLessonSlug || l.id === activeLessonSlug) || allLessons[0];

  return (
    <CourseLearningExperience
      course={course}
      initialLessonSlug={activeLesson?.slug}
    />
  );
}

