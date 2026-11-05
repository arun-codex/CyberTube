import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Calendar, User, ShieldCheck, Bookmark, Youtube, Layers } from 'lucide-react';
import { getAllAuthoritativeResources, getAuthoritativeResourceById, getYouTubeEmbedInfo } from '@/lib/authoritativeCatalog';
import { ClickToLoadEmbed } from '@/components/library/ClickToLoadEmbed';

interface ResourceDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const resources = getAllAuthoritativeResources();
  return resources.map((r) => ({
    id: r.id,
  }));
}

export async function generateMetadata({ params }: ResourceDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const resource = getAuthoritativeResourceById(id);
  if (!resource) return { title: 'Resource Not Found | CyberTube' };

  return {
    title: `${resource.title} - ${resource.creator} | CyberTube`,
    description: resource.notes,
  };
}

export default async function ResourceDetailPage({ params }: ResourceDetailPageProps) {
  const { id } = await params;
  const resource = getAuthoritativeResourceById(id);

  if (!resource) {
    notFound();
  }

  const { embedUrl, type } = getYouTubeEmbedInfo(resource.url);

  return (
    <div className="container-max py-10 space-y-8">
      {/* Back to library */}
      <Link
        href="/library"
        className="inline-flex items-center gap-2 text-xs font-mono text-[#475569] dark:text-[#9BA8B7] hover:text-[#0E7490] dark:hover:text-[#22D3EE] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Course Library</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 text-xs font-mono uppercase tracking-wider rounded-md bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/30">
                {resource.level}
              </span>
              <span className="px-2.5 py-0.5 text-xs font-mono uppercase tracking-wider rounded-md bg-[#F1F5F9] dark:bg-[#1A2433] text-[#475569] dark:text-[#9BA8B7] border border-[#E2E8F0] dark:border-[#243044]">
                {resource.track}
              </span>
              <span className="px-2 py-0.5 text-xs font-mono rounded-md bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/30">
                {resource.cost === 'free' ? '100% Free' : 'Free + Paid Tiers'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-[#0F172A] dark:text-[#E6EDF3]">
              {resource.title}
            </h1>

            <p className="text-sm text-[#475569] dark:text-[#9BA8B7] flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Created by <strong className="text-[#0F172A] dark:text-[#E6EDF3]">{resource.creator}</strong></span>
            </p>
          </div>

          {/* Click to load video/lab embed */}
          <ClickToLoadEmbed
            embedUrl={embedUrl}
            directUrl={resource.url}
            title={resource.title}
            creator={resource.creator}
            type={type}
          />

          {/* Overview & Study Notes */}
          <div className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 space-y-4">
            <h3 className="text-base font-semibold text-[#0F172A] dark:text-[#E6EDF3] font-space-grotesk">
              Curriculum Overview & Practitioner Notes
            </h3>
            <p className="text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
              {resource.notes}
            </p>

            {resource.notes.includes('Channel inactive') && (
              <div className="p-3 rounded-lg bg-[#FEF3C7] dark:bg-[#2A2000] border border-[#FDE68A] dark:border-[#78350F] text-xs text-[#92400E] dark:text-[#FBBF24]">
                Notice: Channel inactive since 2025. Verify commands against current tool documentation.
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Metadata & Quick Actions */}
        <div className="space-y-6">
          <div className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-white dark:bg-[#121A26] p-6 space-y-5">
            <h3 className="text-sm font-semibold uppercase font-mono tracking-wider text-[#0F172A] dark:text-[#E6EDF3]">
              Resource Details
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between py-2 border-b border-[#E2E8F0] dark:border-[#243044]">
                <span className="text-[#475569] dark:text-[#9BA8B7]">Resource ID:</span>
                <span className="font-mono text-[#0F172A] dark:text-[#E6EDF3]">{resource.id}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#E2E8F0] dark:border-[#243044]">
                <span className="text-[#475569] dark:text-[#9BA8B7]">Format:</span>
                <span className="capitalize text-[#0F172A] dark:text-[#E6EDF3]">{resource.type}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#E2E8F0] dark:border-[#243044]">
                <span className="text-[#475569] dark:text-[#9BA8B7]">Access:</span>
                <span className="capitalize text-[#0F172A] dark:text-[#E6EDF3]">{resource.cost}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#E2E8F0] dark:border-[#243044]">
                <span className="text-[#475569] dark:text-[#9BA8B7]">Status:</span>
                <span className="text-[#34D399] font-medium uppercase font-mono">{resource.verificationStatus}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#475569] dark:text-[#9BA8B7]">Link Audited:</span>
                <span className="font-mono text-[#0F172A] dark:text-[#E6EDF3]">{resource.lastChecked}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#0E7490] dark:bg-[#22D3EE] text-white dark:text-[#0B1018] font-semibold text-xs hover:opacity-90 transition-opacity"
              >
                <span>Watch on Original Platform</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Ethics reminder card */}
          <div className="rounded-xl border border-[#E2E8F0] dark:border-[#243044] bg-[#F8FAFC] dark:bg-[#1A2433]/40 p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0F172A] dark:text-[#E6EDF3]">
              <ShieldCheck className="w-4 h-4 text-[#22D3EE]" />
              <span>Legal & Responsible Learning</span>
            </div>
            <p className="text-xs text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
              Practise commands and vulnerability exploitation solely in authorized virtual environments, home labs, or designated practice rooms.
            </p>
            <Link
              href="/ethics"
              className="text-xs text-[#0E7490] dark:text-[#22D3EE] hover:underline block font-medium"
            >
              Read Rules of Engagement →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
