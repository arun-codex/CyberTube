'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bookmark,
  Clock,
  ExternalLink,
  Shield,
  Layers,
  Terminal,
  PlayCircle,
  GraduationCap,
  FileText,
  BookOpen,
  Github,
  Flag,
  Headphones,
  FileSearch,
  Award,
  CheckSquare,
} from 'lucide-react';
import { Resource, ResourceType } from '../types/resource';
import { Badge } from './ui/Badge';
import { localSavedService, onSavedChange } from '../lib/saved';

interface ResourceCardProps {
  resource: Resource;
}

const TYPE_ICONS: Record<ResourceType, React.ElementType> = {
  video: PlayCircle,
  course: GraduationCap,
  article: FileText,
  documentation: BookOpen,
  github: Github,
  lab: Terminal,
  ctf: Flag,
  podcast: Headphones,
  research: FileSearch,
  certification: Award,
  'exam-prep': CheckSquare,
};

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    setIsSaved(localSavedService.isSaved(resource.id));
    const unsub = onSavedChange((ids) => setIsSaved(ids.includes(resource.id)));
    return unsub;
  }, [resource.id]);

  const handleToggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextSaved = localSavedService.toggle(resource.id);
    setIsSaved(nextSaved);
  };

  const TypeIcon = TYPE_ICONS[resource.resourceType] || Shield;

  return (
    <div className="group relative rounded-xl border border-slate-200 dark:border-[#1f293d] bg-white dark:bg-[#111827] hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-200 flex flex-col overflow-hidden">
      {/* Thumbnail Area */}
      <Link href={`/resources/${resource.slug}`} className="block relative aspect-video w-full overflow-hidden bg-slate-900">
        {resource.thumbnailUrl ? (
          <img
            src={resource.thumbnailUrl}
            alt={resource.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
            <TypeIcon className="w-12 h-12 text-slate-700 dark:text-slate-600" />
          </div>
        )}

        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

        {/* Video Play Overlay (only for video resources) */}
        {resource.isVideo && resource.youtubeVideoId && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-14 h-14 rounded-full bg-red-600/90 flex items-center justify-center shadow-lg shadow-red-900/40 group-hover:scale-110 transition-transform duration-300">
              <PlayCircle className="w-7 h-7 text-white fill-current" />
            </div>
          </div>
        )}

        {/* Top Floating Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur border border-white/10 text-[11px] font-mono text-cyan-300 uppercase tracking-wider font-semibold">
            <TypeIcon className="w-3.5 h-3.5 text-cyan-400" />
            {resource.resourceType}
          </span>

          {/* Bookmark Button */}
          <button
            onClick={handleToggleSave}
            title={isSaved ? 'Remove from saved' : 'Save for later'}
            aria-label={isSaved ? 'Remove bookmark' : 'Bookmark resource'}
            className={`p-1.5 rounded-md backdrop-blur border transition-all ${
              isSaved
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/30'
                : 'bg-black/60 text-white border-white/20 hover:bg-black/90 hover:text-cyan-400'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom Floating Info (Duration / Difficulty) */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono text-slate-300 pointer-events-none">
          <Badge variant="difficulty" difficulty={resource.difficulty} size="sm">
            {resource.difficulty}
          </Badge>
          {resource.estimatedDuration && (
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur border border-white/10 text-[11px]">
              <Clock className="w-3 h-3 text-slate-400" />
              {resource.estimatedDuration}
            </span>
          )}
        </div>
      </Link>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Provider & Creator */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[180px]">
              {resource.provider}
            </span>
            <Badge variant="pricing" pricing={resource.pricingModel} size="sm">
              {resource.pricingModel}
            </Badge>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
            <Link href={`/resources/${resource.slug}`}>{resource.title}</Link>
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {resource.description}
          </p>
        </div>

        {/* Domain Tags Footer */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1 overflow-hidden max-h-6">
            {resource.domains.slice(0, 2).map((dom) => (
              <span
                key={dom}
                className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800/70 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60"
              >
                {dom}
              </span>
            ))}
            {resource.domains.length > 2 && (
              <span className="text-[10px] font-mono text-slate-400">
                +{resource.domains.length - 2}
              </span>
            )}
          </div>

          <Link
            href={`/resources/${resource.slug}`}
            className="text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-0.5 shrink-0"
          >
            Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

