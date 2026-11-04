import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ExternalLink,
  Clock,
  Globe,
  Award,
  BookOpen,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';
import { getResourceBySlug, getRelatedResources, getAllResources } from '../../../src/lib/catalog';
import { Badge } from '../../../src/components/ui/Badge';
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
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Back Link */}
      <div>
        <Link
          href="/discover"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Discovery Directory</span>
        </Link>
      </div>

      {/* Main Header & Overview Card */}
      <div className="rounded-2xl border border-slate-200 dark:border-[#1f293d] bg-white dark:bg-[#111827] p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
          {/* Badge Cluster */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              {resource.resourceType}
            </span>
            <Badge variant="difficulty" difficulty={resource.difficulty} size="md">
              {resource.difficulty}
            </Badge>
            <Badge variant="pricing" pricing={resource.pricingModel} size="md">
              {resource.pricingModel}
            </Badge>
            {resource.language && (
              <span className="inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                <Globe className="w-3 h-3 text-slate-400" />
                {resource.language}
              </span>
            )}
          </div>

          {/* Interactive Bookmark Button (Client Component) */}
          <ResourceDetailBookmarkButton resourceId={resource.id} />
        </div>

        {/* Title & Description */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {resource.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
            {resource.description}
          </p>
        </div>

        {/* Key Metadata Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 font-mono text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Provider:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 block truncate">
              {resource.provider}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Creator / Author:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 block truncate">
              {resource.creator || 'Verified Institution'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Estimated Time:</span>
            <span className="font-bold text-cyan-600 dark:text-cyan-400 mt-0.5 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {resource.estimatedDuration || 'Self-paced'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Last Verified:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              {new Date(resource.lastVerifiedAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* YouTube Embedded Player (for video resources only) */}
        {resource.isVideo && resource.youtubeVideoId && (
          <div className="pt-2">
            <YouTubePlayer
              videoId={resource.youtubeVideoId}
              title={resource.title}
              channelName={resource.youtubeChannelName || resource.creator}
            />
          </div>
        )}

        {/* PRIMARY CTA: Visit Original Source */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
          <a
            href={resource.canonicalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide shadow-md shadow-cyan-500/20 transition-all"
          >
            <span>{resource.isVideo ? 'View on YouTube' : 'Visit Original Provider Resource'}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <span className="text-xs text-slate-500 font-mono text-center sm:text-left">
            Opens safely on external canonical domain ({new URL(resource.canonicalUrl).hostname})
          </span>
        </div>
      </div>

      {/* Structured Details: Outcomes, Prerequisites, Skills, Domains */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Learning Outcomes & Prerequisites */}
        <div className="lg:col-span-2 space-y-8">
          {/* Learning Outcomes */}
          <div className="p-6 rounded-xl border border-slate-200 dark:border-[#1f293d] bg-white dark:bg-[#111827] space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              What You Will Learn
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {resource.learningOutcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-cyan-400 font-bold font-mono shrink-0 mt-0.5">▸</span>
                  <span className="leading-relaxed">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Prerequisites */}
          {resource.prerequisites && resource.prerequisites.length > 0 && (
            <div className="p-6 rounded-xl border border-slate-200 dark:border-[#1f293d] bg-white dark:bg-[#111827] space-y-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                Recommended Prerequisites
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                {resource.prerequisites.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-slate-400 font-mono shrink-0">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Stated Security & Content Disclaimer */}
          <div className="p-5 rounded-xl border border-amber-500/20 bg-amber-500/5 text-xs text-amber-300/90 space-y-2">
            <div className="font-bold flex items-center gap-1.5 font-mono uppercase tracking-wider text-amber-400">
              <AlertCircle className="w-4 h-4" />
              Educational & Ethical Use Policy
            </div>
            <p className="leading-relaxed text-slate-600 dark:text-slate-400">
              All tools, labs, and exploits featured in CyberTube are curated exclusively for authorized
              educational purposes, defensive auditing, and professional skill enhancement. Never execute
              offensive techniques against targets without explicit, documented authorization.
            </p>
          </div>
        </div>

        {/* Right Column: Taxonomy & Actionable Skills */}
        <div className="space-y-6">
          {/* Domains Covered */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-[#1f293d] bg-white dark:bg-[#111827] space-y-3">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Related Domains
            </h3>
            <div className="flex flex-wrap gap-2">
              {resource.domains.map((dom) => (
                <Link
                  key={dom}
                  href={`/discover?domain=${dom}`}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 hover:text-cyan-400 transition-colors"
                >
                  {dom}
                </Link>
              ))}
            </div>
          </div>

          {/* Actionable Skills */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-[#1f293d] bg-white dark:bg-[#111827] space-y-3">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Skills Acquired
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {resource.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Freeform Search Tags */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-[#1f293d] bg-white dark:bg-[#111827] space-y-3">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Catalog Tags
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {resource.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/discover?q=${encodeURIComponent(tag)}`}
                  className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-500 hover:text-cyan-400 hover:underline"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Resources Grid */}
      {related.length > 0 && (
        <div className="pt-8 space-y-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              Related Cybersecurity Resources
            </h2>
            <Link
              href="/discover"
              className="text-xs font-mono text-cyan-500 hover:underline"
            >
              Browse entire catalog →
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
