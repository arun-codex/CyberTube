import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FileCheck, ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { isAuthorizedAdminEmail } from '@/lib/supabase/admin';

interface ResourceSubmission {
  id: string;
  title: string;
  url: string;
  domain: string;
  review_status: string;
  created_at: string;
}

export default async function AdminSubmissionsPage() {
  const supabase = await createClient();
  if (!supabase) {
    redirect('/?error=unauthorized_admin');
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !isAuthorizedAdminEmail(user.email)) {
    redirect('/?error=unauthorized_admin');
  }

  const { data } = await supabase
    .from('resource_submissions')
    .select('id, title, url, domain, review_status, created_at')
    .order('created_at', { ascending: false });

  const submissions = (data as ResourceSubmission[] | null) || [];

  return (
    <div className="container-max py-10 space-y-6">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1 text-xs font-mono text-[#64748B] hover:text-[#0E7490] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Admin CMS
      </Link>

      <div className="bg-white dark:bg-[#121A26] border border-[#e4e4ed] dark:border-[#243044] rounded-[8px] p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#0E7490]">
          <FileCheck className="w-4 h-4" /> Community Submissions
        </div>
        <h1 className="text-xl font-bold text-[#0F172A] dark:text-[#E6EDF3]">Review Submissions</h1>
        
        {(!submissions || submissions.length === 0) ? (
          <div className="p-8 text-center border border-dashed border-[#e4e4ed] dark:border-[#243044] rounded-[6px] space-y-2">
            <p className="text-xs font-mono text-[#64748B] dark:text-[#9BA8B7]">No community submissions pending review.</p>
            <p className="text-[11px] text-[#94A3B8]">New suggestions submitted by learners will appear here for editorial audit.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#e4e4ed] dark:divide-[#243044]">
            {submissions.map((sub) => (
              <div key={sub.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#0F172A] dark:text-[#E6EDF3]">{sub.title}</p>
                  <p className="text-[11px] font-mono text-[#64748B]">{sub.url}</p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f1f5f9] dark:bg-[#1A2638] text-[#64748B]">
                  {sub.review_status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
