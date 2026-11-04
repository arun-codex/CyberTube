import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  ShieldAlert,
  Database,
  FileCheck,
  PlusCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { isAuthorizedAdminEmail } from '@/lib/supabase/admin';
import { getAllResources } from '@/lib/catalog';
import { CYBERSECURITY_DOMAINS } from '@/data/metadata';

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="container-max py-12">
        <div className="bg-[#fbeaea] border border-[#e8b5b5] rounded-[8px] p-6 text-[#984e4d] font-mono text-xs">
          <h2 className="text-sm font-semibold mb-2">Supabase Database Unconfigured</h2>
          <p className="text-[#403f53]">
            The Admin Dashboard requires valid Supabase environment credentials in <code>.env.local</code>.
          </p>
        </div>
      </div>
    );
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !isAuthorizedAdminEmail(user.email)) {
    redirect('/?error=unauthorized_admin');
  }

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
    <div className="container-max py-10 space-y-8">
      {/* Top Banner */}
      <div className="bg-[#f4f4f9] border border-[#e4e4ed] rounded-[8px] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] text-xs font-mono bg-white border border-[#e8b5b5] text-[#984e4d] mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            Administrative Portal
          </div>
          <h1 className="text-2xl font-semibold text-[#303055]">CyberTube CMS</h1>
          <p className="text-xs text-[#6b6b7b] mt-0.5">
            Oversee educational records, approve community submissions, and curate taxonomies.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/resources/new"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-[4px] text-xs font-medium text-white bg-[#303055] hover:bg-[#252542] transition-colors min-h-[38px]"
          >
            <PlusCircle className="w-4 h-4" />
            Add Resource
          </Link>
          <Link
            href="/admin/submissions"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-[4px] text-xs font-medium text-[#403f53] bg-white hover:bg-[#e8e8f2] border border-[#e4e4ed] transition-colors min-h-[38px]"
          >
            <FileCheck className="w-4 h-4" />
            Review Submissions ({pendingSubmissions})
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#e4e4ed] rounded-[8px] p-5 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-[#6b6b7b]">
            <span>Published</span>
            <Database className="w-4 h-4 text-[#303055]" />
          </div>
          <p className="text-2xl font-semibold text-[#303055]">{publishedCount}</p>
          <p className="text-[11px] font-mono text-[#6b6b7b] flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-[#303055]" />
            Across 11 domains
          </p>
        </div>

        <div className="bg-white border border-[#e4e4ed] rounded-[8px] p-5 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-[#6b6b7b]">
            <span>Drafts</span>
            <Clock className="w-4 h-4 text-[#6b6b7b]" />
          </div>
          <p className="text-2xl font-semibold text-[#303055]">{draftCount}</p>
          <p className="text-[11px] font-mono text-[#6b6b7b]">Pending review</p>
        </div>

        <div className="bg-white border border-[#e4e4ed] rounded-[8px] p-5 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-[#6b6b7b]">
            <span>Submissions</span>
            <FileCheck className="w-4 h-4 text-[#6b6b7b]" />
          </div>
          <p className="text-2xl font-semibold text-[#303055]">{pendingSubmissions}</p>
          <p className="text-[11px] font-mono text-[#6b6b7b]">Community contributions</p>
        </div>

        <div className="bg-white border border-[#e4e4ed] rounded-[8px] p-5 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-[#6b6b7b]">
            <span>Domains</span>
            <ArrowRight className="w-4 h-4 text-[#6b6b7b]" />
          </div>
          <p className="text-2xl font-semibold text-[#303055]">{CYBERSECURITY_DOMAINS.length}</p>
          <p className="text-[11px] font-mono text-[#6b6b7b]">Core security tracks</p>
        </div>
      </div>
    </div>
  );
}
