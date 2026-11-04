import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ExternalLink,
  Clock,
  Globe,
  BookOpen,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Calendar,
} from 'lucide-react';
import { getResourceBySlug, getRelatedResources, getAllResources } from '../../../src/lib/catalog';
import { ResourceCard } from '../../../src/components/ResourceCard';
import { ResourceDetailBookmarkButton } from './BookmarkButton';
import { YouTubePlayer } from '../../../src/components/YouTubePlayer';

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return getAllResources().map((resource) => ({
    slug: resource.slug,
  }));
}

export default function ResourceDetailPage({ params }: PageProps) {
  const resource = getResourceBySlug(params.slug);

  if (!resource) {
    notFound();
  }

  const related = getRelatedResources(resource, 3);

  return (
    <div className="container-max py-8 space-y-8">
      {/* Back Link */}
      <div>
        <Link
          href="/discover"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#6b6b7b] hover:text-[#303055] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Discovery Directory</span>
        </Link>
      </div>

      {/* Main Header & Overview Card */}
      <div className="rounded-[8px] border border-[#e4e4ed] bg-white p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
          {/* Badge Cluster */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded-[4px] bg-[#f4f4f9] text-[#303055] border border-[#e4e4ed] uppercase font-medium">
              {resource.resourceType}
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-[4px] bg-[#f4f4f9] text-[#403f53] border border-[#e4e4ed] capitalize">
              {resource.difficulty}
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-[4px] bg-[#f4f4f9] text-[#6b6b7b] border border-[#e4e4ed] uppercase">
              {resource.pricingModel}
            </span>
            {resource.language && (
              <span className="inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded-[4px] bg-[#f4f4f9] text-[#6b6b7b] border border-[#e4e4ed]">
                <Globe className="w-3 h-3 text-[#6b6b7b]" />
                {resource.language}
              </span>
            )}
          </div>

          {/* Interactive Bookmark Button */}
          <ResourceDetailBookmarkButton resourceId={resource.id} />
        </div>

        {/* Title & Description */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#303055] tracking-tight leading-tight">
            {resource.title}
          </h1>
          <p className="text-sm text-[#403f53] leading-relaxed max-w-4xl">
            {resource.description}
          </p>
        </div>

        {/* Key Metadata Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-[8px] bg-[#f4f4f9] border border-[#e4e4ed] font-mono text-xs">
          <div>
            <span className="text-[#6b6b7b] block text-[11px]">Provider:</span>
            <span className="font-medium text-[#303055] mt-0.5 block truncate">
              {resource.provider}
            </span>
          </div>
          <div>
            <span className="text-[#6b6b7b] block text-[11px]">Author / Source:</span>
            <span className="font-medium text-[#303055] mt-0.5 block truncate">
              {resource.creator || 'Verified Contributor'}
            </span>
          </div>
          <div>
            <span className="text-[#6b6b7b] block text-[11px]">Duration:</span>
            <span className="font-medium text-[#303055] mt-0.5 flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#6b6b7b]" />
              {resource.estimatedDuration || 'Self-paced'}
            </span>
          </div>
          <div>
            <span className="text-[#6b6b7b] block text-[11px]">Verified:</span>
            <span className="font-medium text-[#303055] mt-0.5 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#6b6b7b]" />
              {new Date(resource.lastVerifiedAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* YouTube Embedded Player */}
        {resource.isVideo && resource.youtubeVideoId && (
          <div className="pt-2">
            <YouTubePlayer
              videoId={resource.youtubeVideoId}
              title={resource.title}
              channelName={resource.youtubeChannelName || resource.creator}
            />
          </div>
        )}

        {/* PRIMARY CTA */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
          <a
            href={resource.canonicalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[4px] bg-[#303055] text-white hover:bg-[#252542] text-sm font-medium transition-colors min-h-[44px]"
          >
            <span>{resource.isVideo ? 'Watch on YouTube' : 'Visit Original Source'}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <span className="text-xs text-[#6b6b7b] font-mono text-center sm:text-left">
            Canonical domain: {new URL(resource.canonicalUrl).hostname}
          </span>
        </div>
      </div>

      {/* Structured Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Learning Outcomes & Prerequisites */}
        <div className="lg:col-span-2 space-y-6">
          {/* Learning Outcomes */}
          <div className="p-5 sm:p-6 rounded-[8px] border border-[#e4e4ed] bg-white space-y-3">
            <h2 className="text-sm font-semibold text-[#303055] flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#303055]" />
              Key Learning Points
            </h2>
            <ul className="space-y-2 text-xs text-[#403f53]">
              {resource.learningOutcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#303055] font-bold font-mono shrink-0 mt-0.5">•</span>
                  <span className="leading-relaxed">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Prerequisites */}
          {resource.prerequisites && resource.prerequisites.length > 0 && (
            <div className="p-5 sm:p-6 rounded-[8px] border border-[#e4e4ed] bg-white space-y-3">
              <h2 className="text-sm font-semibold text-[#303055] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#6b6b7b]" />
                Recommended Prerequisites
              </h2>
              <ul className="space-y-1.5 text-xs text-[#403f53]">
                {resource.prerequisites.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#6b6b7b] font-mono shrink-0">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Content Disclaimer */}
          <div className="p-4 rounded-[8px] border border-[#e4e4ed] bg-[#f4f4f9] text-xs text-[#403f53] space-y-1.5">
            <div className="font-semibold flex items-center gap-1.5 font-mono uppercase tracking-wider text-[#303055] text-[11px]">
              <AlertCircle className="w-3.5 h-3.5" />
              Educational & Ethical Use Notice
            </div>
            <p className="leading-relaxed text-[#6b6b7b]">
              All tools, labs, and configurations featured in CyberTube are curated exclusively for authorized
              educational purposes and defensive auditing.
            </p>
          </div>
        </div>

        {/* Right Column: Taxonomy, Skills & Tags */}
        <div className="space-y-6">
          <div className="p-5 sm:p-6 rounded-[8px] border border-[#e4e4ed] bg-white space-y-4">
            <div>
              <h3 className="text-xs font-mono font-medium uppercase tracking-wider text-[#6b6b7b] mb-2">
                Domains
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {resource.domains.map((dom) => (
                  <Link
                    key={dom}
                    href={`/discover?domain=${dom}`}
                    className="text-xs font-mono px-2 py-0.5 rounded-[4px] bg-[#f4f4f9] text-[#303055] border border-[#e4e4ed] hover:border-[#303055] transition-colors"
                  >
                    {dom}
                  </Link>
                ))}
              </div>
            </div>

            {resource.skills && resource.skills.length > 0 && (
              <div className="pt-3 border-t border-[#e4e4ed]">
                <h3 className="text-xs font-mono font-medium uppercase tracking-wider text-[#6b6b7b] mb-2">
                  Skills Covered
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {resource.skills.map((skill: string) => (
                    <span
                      key={skill}
                      className="text-xs font-mono px-2 py-0.5 rounded-[4px] bg-[#f4f4f9] text-[#403f53] border border-[#e4e4ed]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Connected Resources */}
      {related.length > 0 && (
        <div className="pt-8 border-t border-[#e4e4ed] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-[#303055]">
                Related Resources
              </h3>
              <p className="text-xs text-[#6b6b7b] mt-0.5">
                More content in {resource.domains[0]} and related topics.
              </p>
            </div>
            <Link
              href="/discover"
              className="text-xs font-mono text-[#303055] hover:text-[#3b61b0]"
            >
              All resources →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((item) => (
              <ResourceCard key={item.id} resource={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
