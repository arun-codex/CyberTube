'use client';

import React from 'react';
import { LessonContentRenderer } from '../LessonContentRenderer';

interface LessonTheorySectionProps {
  content?: any;
  pcapResources?: any[];
}

export const LessonTheorySection: React.FC<LessonTheorySectionProps> = ({
  content,
  pcapResources,
}) => {
  if (!content) return null;

  return (
    <div className="space-y-4">
      <LessonContentRenderer content={content} pcapResources={pcapResources} />
    </div>
  );
};

