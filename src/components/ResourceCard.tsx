'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bookmark,
  Clock,
  Shield,
  PlayCircle,
  GraduationCap,
  FileText,
  BookOpen,
  Github,
  Terminal,
  Flag,
  Headphones,
  FileSearch,
  Award,
  CheckSquare,
} from 'lucide-react';
import { Resource, ResourceType } from '../types/resource';
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
    <div className="group relative rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] hover:border-[#303055] dark:hover:border-[#22D3EE] transition-colors duration-150 flex flex-col overflow-hidden">
      {/* Thumbnail Area */}
      <Link href={`/resources/${resource.slug}`} className="block relative aspect-video w-full overflow-hidden bg-[#f4f4f9] dark:bg-[#1A2433] border-b border-[#e4e4ed] dark:border-[#243044]">
        {resource.thumbnailUrl ? (
          <img
            src={resource.thumbnailUrl}
            alt={resource.title}
            width={640}
            height={360}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#f4f4f9] dark:bg-[#1A2433]">
            <TypeIcon className="w-8 h-8 text-[#64748B] dark:text-[#9BA8B7]" />
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-white/95 dark:bg-[#0B1018]/90 border border-[#e4e4ed] dark:border-[#243044] text-[11px] font-mono text-[#0F172A] dark:text-[#E6EDF3] font-medium backdrop-blur-xs">
            <TypeIcon className="w-3 h-3 text-[#0E7490] dark:text-[#22D3EE]" />
            {resource.resourceType}
          </span>

          {/* Bookmark Button (44x44 touch area minimum) */}
          <button
            onClick={handleToggleSave}
            title={isSaved ? 'Remove from saved' : 'Save for later'}
            aria-label={isSaved ? 'Remove bookmark' : 'Bookmark resource'}
            className={`min-w-[32px] min-h-[32px] flex items-center justify-center rounded-[4px] border transition-colors ${
              isSaved
                ? 'bg-[#0E7490] dark:bg-[#22D3EE] text-white dark:text-[#0B1018] border-[#0E7490] dark:border-[#22D3EE]'
                : 'bg-white/95 dark:bg-[#0B1018]/90 text-[#475569] dark:text-[#9BA8B7] border-[#e4e4ed] dark:border-[#243044] hover:border-[#0E7490] dark:hover:border-[#22D3EE]'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom Metadata */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono pointer-events-none">
          <span className="px-1.5 py-0.5 rounded-[4px] bg-white/95 dark:bg-[#0B1018]/90 border border-[#e4e4ed] dark:border-[#243044] text-[#475569] dark:text-[#9BA8B7] backdrop-blur-xs capitalize">
            {resource.difficulty}
          </span>
          {resource.estimatedDuration && (
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-[4px] bg-white/95 dark:bg-[#0B1018]/90 border border-[#e4e4ed] dark:border-[#243044] text-[#475569] dark:text-[#9BA8B7] backdrop-blur-xs">
              <Clock className="w-3 h-3 text-[#64748B] dark:text-[#9BA8B7]" />
              {resource.estimatedDuration}
            </span>
          )}
        </div>
      </Link>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-[#64748B] dark:text-[#9BA8B7] font-mono">
            <span className="truncate max-w-[180px] text-[#475569] dark:text-[#9BA8B7]">
              {resource.provider}
            </span>
            <span className="uppercase text-[10px]">
              {resource.pricingModel}
            </span>
          </div>

          <h3 className="font-rajdhani font-bold text-base sm:text-lg text-[#0F172A] dark:text-[#E6EDF3] group-hover:text-[#0E7490] dark:group-hover:text-[#22D3EE] transition-colors line-clamp-2 leading-snug">
            <Link href={`/resources/${resource.slug}`}>{resource.title}</Link>
          </h3>

          <p className="text-xs text-[#475569] dark:text-[#9BA8B7] line-clamp-2 leading-relaxed">
            {resource.description}
          </p>
        </div>

        {/* Domain Tags Footer */}
        <div className="pt-2.5 border-t border-[#e4e4ed] dark:border-[#243044] flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1 overflow-hidden max-h-6">
            {resource.domains.slice(0, 2).map((dom) => (
              <span
                key={dom}
                className="text-[10px] font-mono px-1.5 py-0.5 rounded-[4px] bg-[#f4f4f9] dark:bg-[#1A2433] text-[#64748B] dark:text-[#9BA8B7] border border-[#e4e4ed] dark:border-[#243044]"
              >
                {dom}
              </span>
            ))}
            {resource.domains.length > 2 && (
              <span className="text-[10px] font-mono text-[#64748B] dark:text-[#9BA8B7]">
                +{resource.domains.length - 2}
              </span>
            )}
          </div>

          <Link
            href={`/resources/${resource.slug}`}
            className="text-xs font-mono text-[#0E7490] dark:text-[#22D3EE] hover:underline flex items-center gap-0.5 shrink-0"
          >
            Open →
          </Link>
        </div>
      </div>
    </div>
  );
};
