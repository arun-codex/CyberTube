'use client';

import React from 'react';
import { PracticalLabView } from '../PracticalLabView';

interface LessonLabSectionProps {
  lab?: any;
  courseId: string;
}

export const LessonLabSection: React.FC<LessonLabSectionProps> = ({ lab, courseId }) => {
  if (!lab) return null;

  return (
    <div className="space-y-4">
      <PracticalLabView lab={lab} courseId={courseId} />
    </div>
  );
};

