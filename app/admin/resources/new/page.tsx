import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ShieldAlert, ArrowLeft, PlusCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { isAuthorizedAdminEmail } from '@/lib/supabase/admin';

export default async function AdminNewResourcePage() {
  const supabase = await createClient();
  if (!supabase) {
    redirect('/?error=unauthorized_admin');
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !isAuthorizedAdminEmail(user.email)) {
    redirect('/?error=unauthorized_admin');
  }

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
          <PlusCircle className="w-4 h-4" /> Add Curated Resource
        </div>
        <h1 className="text-xl font-bold text-[#0F172A] dark:text-[#E6EDF3]">Resource Publisher</h1>
        <p className="text-xs text-[#64748B] dark:text-[#9BA8B7] leading-relaxed max-w-2xl">
          Curated learning resources and video courses are currently version-controlled in the repository curriculum configuration or managed via Supabase study materials.
        </p>
        <div className="pt-2">
          <Link
            href="/admin/study-materials"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[6px] bg-[#0E7490] hover:bg-[#0891B2] text-white text-xs font-medium transition-colors"
          >
            Manage Study Materials & Upload PDFs →
          </Link>
        </div>
      </div>
    </div>
  );
}
