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
    <div className="group relative rounded-[8px] border border-[#e4e4ed] bg-white hover:border-[#303055] transition-colors duration-150 flex flex-col overflow-hidden">
      {/* Thumbnail Area */}
      <Link href={`/resources/${resource.slug}`} className="block relative aspect-video w-full overflow-hidden bg-[#f4f4f9] border-b border-[#e4e4ed]">
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
          <div className="w-full h-full flex items-center justify-center bg-[#f4f4f9]">
            <TypeIcon className="w-8 h-8 text-[#6b6b7b]" />
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-white/95 border border-[#e4e4ed] text-[11px] font-mono text-[#303055] font-medium">
            <TypeIcon className="w-3 h-3 text-[#6b6b7b]" />
            {resource.resourceType}
          </span>

          {/* Bookmark Button (44x44 touch area minimum) */}
          <button
            onClick={handleToggleSave}
            title={isSaved ? 'Remove from saved' : 'Save for later'}
            aria-label={isSaved ? 'Remove bookmark' : 'Bookmark resource'}
            className={`min-w-[32px] min-h-[32px] flex items-center justify-center rounded-[4px] border transition-colors ${
              isSaved
                ? 'bg-[#303055] text-white border-[#303055]'
                : 'bg-white/95 text-[#403f53] border-[#e4e4ed] hover:border-[#303055]'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom Metadata */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono pointer-events-none">
          <span className="px-1.5 py-0.5 rounded-[4px] bg-white/95 border border-[#e4e4ed] text-[#403f53]">
            {resource.difficulty}
          </span>
          {resource.estimatedDuration && (
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-[4px] bg-white/95 border border-[#e4e4ed] text-[#6b6b7b]">
              <Clock className="w-3 h-3 text-[#6b6b7b]" />
              {resource.estimatedDuration}
            </span>
          )}
        </div>
      </Link>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-[#6b6b7b] font-mono">
            <span className="truncate max-w-[180px] text-[#403f53]">
              {resource.provider}
            </span>
            <span className="uppercase text-[10px]">
              {resource.pricingModel}
            </span>
          </div>

          <h3 className="font-semibold text-sm text-[#303055] group-hover:text-[#3b61b0] transition-colors line-clamp-2 leading-snug">
            <Link href={`/resources/${resource.slug}`}>{resource.title}</Link>
          </h3>

          <p className="text-xs text-[#403f53] line-clamp-2 leading-relaxed">
            {resource.description}
          </p>
        </div>

        {/* Domain Tags Footer */}
        <div className="pt-2.5 border-t border-[#e4e4ed] flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1 overflow-hidden max-h-6">
            {resource.domains.slice(0, 2).map((dom) => (
              <span
                key={dom}
                className="text-[10px] font-mono px-1.5 py-0.5 rounded-[4px] bg-[#f4f4f9] text-[#6b6b7b] border border-[#e4e4ed]"
              >
                {dom}
              </span>
            ))}
            {resource.domains.length > 2 && (
              <span className="text-[10px] font-mono text-[#6b6b7b]">
                +{resource.domains.length - 2}
              </span>
            )}
          </div>

          <Link
            href={`/resources/${resource.slug}`}
            className="text-xs font-mono text-[#303055] hover:text-[#3b61b0] flex items-center gap-0.5 shrink-0"
          >
            Open →
          </Link>
        </div>
      </div>
    </div>
  );
};
