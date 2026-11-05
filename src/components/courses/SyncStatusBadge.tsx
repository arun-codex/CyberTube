'use client';

import React, { useEffect, useState } from 'react';
import {
  cloudCourseProgressService,
  CloudSyncStatus,
  isUuid,
} from '../../lib/cloud-course-progress';
import { Cloud, Check, Loader2, HardDrive, AlertCircle } from 'lucide-react';

interface SyncStatusBadgeProps {
  courseId: string;
}

export const SyncStatusBadge: React.FC<SyncStatusBadgeProps> = ({ courseId }) => {
  const [status, setStatus] = useState<CloudSyncStatus>(() =>
    cloudCourseProgressService.getSyncStatus(courseId)
  );

  useEffect(() => {
    setStatus(cloudCourseProgressService.getSyncStatus(courseId));

    const unsub = cloudCourseProgressService.onSyncStatusChange((event) => {
      if (event.courseId === courseId) {
        setStatus(event.status);
      }
    });

    const handleCustomEvent = (e: any) => {
      if (e.detail?.courseId === courseId) {
        setStatus(e.detail.status);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('cybertube:course-sync-status-changed', handleCustomEvent);
    }

    return () => {
      unsub();
      if (typeof window !== 'undefined') {
        window.removeEventListener('cybertube:course-sync-status-changed', handleCustomEvent);
      }
    };
  }, [courseId]);

  // Visual label & icons
  if (status === 'saving') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-[#f4f4f9] border border-[#e4e4ed] text-[11px] font-mono text-[#403f53]">
        <Loader2 className="w-3 h-3 text-[#303055] animate-spin" />
        <span>Saving...</span>
      </span>
    );
  }

  if (status === 'saved') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-[#eef8f1] border border-[#c1e7cb] text-[11px] font-mono text-[#236338] font-medium">
        <Check className="w-3 h-3 text-[#236338]" />
        <span>Saved to account</span>
      </span>
    );
  }

  if (status === 'error') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-[#fbeaea] border border-[#e8b5b5] text-[11px] font-mono text-[#984e4d]">
        <AlertCircle className="w-3 h-3 text-[#984e4d]" />
        <span>Could not sync</span>
      </span>
    );
  }

  // Fallback: offline / saved on device
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-[#f4f4f9] border border-[#e4e4ed] text-[11px] font-mono text-[#6b6b7b]">
      <HardDrive className="w-3 h-3 text-[#6b6b7b]" />
      <span>Offline / saved on this device</span>
    </span>
  );
};
