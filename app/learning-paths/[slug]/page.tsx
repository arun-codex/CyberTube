import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getAllAuthoritativePaths, getAuthoritativePathBySlug } from '@/lib/authoritativeCatalog';
import { PathDetailClientView } from '@/components/paths/PathDetailClientView';

interface PathDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const paths = getAllAuthoritativePaths();
  return paths.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PathDetailPageProps): Promise<Metadata> {
  const path = getAuthoritativePathBySlug(params.slug);
  if (!path) return { title: 'Learning Path Not Found | CyberTube' };

  return {
    title: `${path.title} | CyberTube`,
    description: path.description,
  };
}

export default function PathDetailPage({ params }: PathDetailPageProps) {
  const path = getAuthoritativePathBySlug(params.slug);

  if (!path) {
    notFound();
  }

  return (
    <div className="container-max py-10 space-y-8">
      {/* Back link */}
      <Link
        href="/learning-paths"
        className="inline-flex items-center gap-2 text-xs font-mono text-[#475569] dark:text-[#9BA8B7] hover:text-[#0E7490] dark:hover:text-[#22D3EE] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Learning Paths</span>
      </Link>

      <PathDetailClientView path={path} />
    </div>
  );
}
