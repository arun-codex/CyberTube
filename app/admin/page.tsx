import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  ShieldAlert,
  Database,
  FileCheck,
  PlusCircle,
  Layers,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { isAuthorizedAdminEmail } from '@/lib/supabase/admin';
import { getAllResources } from '@/lib/catalog';
import { CYBERSECURITY_DOMAINS, RESOURCE_TYPES } from '@/data/metadata';

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 text-amber-300">
          <h2 className="text-xl font-bold mb-2">Supabase Database Unconfigured</h2>
          <p className="text-sm text-slate-300">
            The Admin Dashboard requires valid Supabase environment credentials in <code className="text-amber-200">.env.local</code>.
          </p>
        </div>
      </div>
    );
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !isAuthorizedAdminEmail(user.email)) {
    redirect('/?error=unauthorized_admin');
  }

  // Fetch metrics
  const { data: dbResources } = await supabase
    .from('resources')
    .select('id, publication_status') as { data: Array<{ id: string; publication_status: string }> | null };

  const { data: submissions } = await supabase
    .from('resource_submissions')
    .select('id, review_status') as { data: Array<{ id: string; review_status: string }> | null };

  const publishedCount = dbResources?.filter((r) => r.publication_status === 'published').length || 22;
  const draftCount = dbResources?.filter((r) => r.publication_status === 'draft').length || 0;
  const pendingSubmissions = submissions?.filter((s) => s.review_status === 'pending').length || 0;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Top Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 mb-8 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/30 mb-3">
            <ShieldAlert className="w-3.5 h-3.5" />
            Administrative Portal
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">CyberTube CMS</h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage educational catalog records, curate submissions, and oversee domain taxonomies.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/resources/new"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-950/40"
          >
            <PlusCircle className="w-4 h-4" />
            Add Resource
          </Link>
          <Link
            href="/admin/submissions"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
          >
            <FileCheck className="w-4 h-4" />
            Review Submissions ({pendingSubmissions})
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Published Resources</span>
            <Database className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">{publishedCount}</p>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Active across 11 domains
          </p>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Pending Review</span>
            <Clock className="w-5 h-5 text-amber-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">{pendingSubmissions}</p>
          <p className="text-xs text-slate-500 mt-2">Community candidate submissions</p>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Draft Resources</span>
            <FileCheck className="w-5 h-5 text-cyan-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">{draftCount}</p>
          <p className="text-xs text-slate-500 mt-2">Unpublished editorial staging</p>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Tracked Domains</span>
            <Layers className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">{CYBERSECURITY_DOMAINS.length}</p>
          <p className="text-xs text-slate-500 mt-2">Active security focus tracks</p>
        </div>
      </div>

      {/* Admin Modules Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/resources"
          className="group p-6 rounded-2xl bg-slate-900/30 border border-slate-800/70 hover:border-emerald-500/40 transition-all"
        >
          <Database className="w-8 h-8 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-bold text-white mb-1">Resource Repository</h3>
          <p className="text-xs text-slate-400 mb-4">
            View, edit, archive, or draft learning resources in the database.
          </p>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
            Manage Catalog <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          href="/admin/submissions"
          className="group p-6 rounded-2xl bg-slate-900/30 border border-slate-800/70 hover:border-cyan-500/40 transition-all"
        >
          <FileCheck className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-bold text-white mb-1">Review Submissions</h3>
          <p className="text-xs text-slate-400 mb-4">
            Evaluate, approve, or reject community submitted cybersecurity materials.
          </p>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
            Moderation Queue <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          href="/admin/domains"
          className="group p-6 rounded-2xl bg-slate-900/30 border border-slate-800/70 hover:border-purple-500/40 transition-all"
        >
          <Layers className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-bold text-white mb-1">Domain Taxonomy</h3>
          <p className="text-xs text-slate-400 mb-4">
            Inspect cybersecurity domains, track metadata, and verify resource tags.
          </p>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 group-hover:translate-x-1 transition-transform">
            View Domains <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </div>
    </div>
  );
}

