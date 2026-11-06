import React from 'react';
import { getAllCoursesWithDb } from '../../src/lib/courses';
import { CoursesDirectoryView } from '../../src/components/courses/CoursesDirectoryView';

export const metadata = {
  title: 'Video Courses & Learning Tracks | CyberTube',
  description: 'Structured video-based modular curricula across cybersecurity and modern software engineering tracks with progress tracking.',
};

export default async function CoursesPage() {
  const courses = await getAllCoursesWithDb();

  return (
    <div className="container-max py-10">
      <CoursesDirectoryView courses={courses} />
    </div>
  );
}
