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
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[8px] p-6 text-[var(--text-primary)] font-mono text-xs">
          <h2 className="text-sm font-semibold mb-2">Supabase Database Unconfigured</h2>
          <p className="text-[var(--text-secondary)]">
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

  const publishedCount = dbResources ? dbResources.filter((r) => r.publication_status === 'published').length : null;
  const draftCount = dbResources ? dbResources.filter((r) => r.publication_status === 'draft').length : null;
  const pendingSubmissions = submissions ? submissions.filter((s) => s.review_status === 'pending').length : null;

  return (
    <div className="container-max py-10 space-y-8">
      {/* Top Banner */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[8px] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] text-xs font-mono bg-[var(--card-bg)] border border-[var(--border)] text-[var(--text-primary)] mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            Administrative Portal
          </div>
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">CyberTube CMS</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Oversee educational records, approve community submissions, and curate taxonomies.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/study-materials"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-[var(--text-primary)] bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--accent-cyan)] transition-colors min-h-[44px]"
          >
            <PlusCircle className="w-4 h-4" />
            Manage Study Materials
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-[8px] p-5 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
            <span>Published</span>
            <Database className="w-4 h-4 text-[var(--text-primary)]" />
          </div>
          <p className="text-2xl font-semibold text-[var(--text-primary)]">{publishedCount ?? '—'}</p>
          <p className="text-[11px] font-mono text-[var(--text-secondary)] flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-[var(--text-primary)]" />
            Across 11 domains
          </p>
        </div>

        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-[8px] p-5 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
            <span>Drafts</span>
            <Clock className="w-4 h-4 text-[var(--text-secondary)]" />
          </div>
          <p className="text-2xl font-semibold text-[var(--text-primary)]">{draftCount ?? '—'}</p>
          <p className="text-[11px] font-mono text-[var(--text-secondary)]">Pending review</p>
        </div>

        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-[8px] p-5 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
            <span>Submissions</span>
            <FileCheck className="w-4 h-4 text-[var(--text-secondary)]" />
          </div>
          <p className="text-2xl font-semibold text-[var(--text-primary)]">{pendingSubmissions ?? '—'}</p>
          <p className="text-[11px] font-mono text-[var(--text-secondary)]">Community contributions</p>
        </div>

        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-[8px] p-5 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
            <span>Domains</span>
            <ArrowRight className="w-4 h-4 text-[var(--text-secondary)]" />
          </div>
          <p className="text-2xl font-semibold text-[var(--text-primary)]">{CYBERSECURITY_DOMAINS.length}</p>
          <p className="text-[11px] font-mono text-[var(--text-secondary)]">Core security tracks</p>
        </div>
      </div>
    </div>
  );
}
