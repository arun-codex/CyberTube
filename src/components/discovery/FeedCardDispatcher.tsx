'use client';

import React from 'react';
import type { ClassifiedItem } from '@/lib/discovery/live-feed';
import type { VideoWatchProgress } from './DiscoverVideoPlayer';
import { VideoCard } from './VideoCard';
import { ArticleCard } from './ArticleCard';
import { AdvisoryCard } from './AdvisoryCard';
import { ResourceToolCard } from './ResourceToolCard';
import { JobCard } from './JobCard';

interface FeedCardDispatcherProps {
  item: ClassifiedItem;
  progress?: VideoWatchProgress;
  onPlay: (item: ClassifiedItem) => void;
}

export function FeedCardDispatcher({ item, progress, onPlay }: FeedCardDispatcherProps) {
  // 1. If it's a video or has a video_id, use VideoCard
  if (item.media_format === 'video' || item.content_type === 'video' || Boolean(item.video_id)) {
    return <VideoCard item={item} progress={progress} onPlay={onPlay} />;
  }

  // 2. Security Advisory
  if (item.editorial_kind === 'security_advisory' || item.ghsa_id || item.cve_id) {
    return <AdvisoryCard item={item} />;
  }

  // 3. Career Guide / Internship Portal / Job
  if (
    item.editorial_kind === 'career_guide' ||
    item.editorial_kind === 'internship' ||
    item.media_format === 'job'
  ) {
    return <JobCard item={item} />;
  }

  // 4. Tools & Documentation & Raw Resources
  if (
    item.editorial_kind === 'tool' ||
    item.editorial_kind === 'documentation' ||
    (item.media_format === 'resource' && !item.published_at)
  ) {
    return <ResourceToolCard item={item} />;
  }

  // 5. Default to ArticleCard (News, Tutorials, Research, Articles)
  return <ArticleCard item={item} />;
}
