'use client';

import React from 'react';

interface CourseLearningWorkspaceProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export const CourseLearningWorkspace: React.FC<CourseLearningWorkspaceProps> = ({
  children,
  sidebar,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_380px] gap-8 items-start">
      {/* Main Learning Column (approx 70%) */}
      <div className="min-w-0 space-y-6">
        {children}
      </div>

      {/* Curriculum Sidebar Column (approx 30%) */}
      <div className="w-full lg:sticky lg:top-24">
        {sidebar}
      </div>
    </div>
  );
};
