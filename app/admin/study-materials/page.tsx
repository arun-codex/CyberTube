import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '@/lib/supabase/server';
import { createAdminClient, verifyAdminStatus } from '@/lib/supabase/admin';
import { AdminStudyMaterialsClient } from '@/components/library/AdminStudyMaterialsClient';
import { ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Study Materials Administration | CyberTube',
  description: 'Manage and review Bug Bounty study materials.',
};

export default async function AdminStudyMaterialsPage() {
  const user = await getAuthenticatedUser();
  if (!user) {
    redirect('/auth/login?redirect=/admin/study-materials');
  }

  const admin = createAdminClient();
  if (!admin) {
    return <div className="p-8 text-danger">Database connection error.</div>;
  }

  // Verify Admin Access
  const isAllowlisted = await verifyAdminStatus(user.email);
  let isAdmin = isAllowlisted;

  if (!isAdmin) {
    const { data: adminRow } = await admin
      .from('admin_users')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (adminRow) {
      isAdmin = true;
    }
  }

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 border border-red-500/30 bg-red-950/20 rounded-2xl text-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="text-xl font-bold text-red-400">Access Restricted</h2>
        <p className="text-sm text-text-secondary">
          Administrator privileges are required to access the study materials management portal.
        </p>
        <Link
          href="/study-materials"
          className="inline-block px-4 py-2 rounded-lg bg-[var(--surface-subtle)] hover:bg-[var(--surface)] text-xs font-semibold text-[var(--text-primary)] border border-[var(--border)] transition-colors"
        >
          Return to Study Library
        </Link>
      </div>
    );
  }

  // Fetch all documents (including unpublished) and categories
  const [{ data: docsData }, { data: categoriesData }] = await Promise.all([
    admin
      .from('study_documents')
      .select('*, study_categories(title, slug)')
      .order('created_at', { ascending: false }),
    admin
      .from('study_categories')
      .select('id, title, slug')
      .order('sort_order', { ascending: true }),
  ]);

  const documents = docsData || [];
  const categories = categoriesData || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <AdminStudyMaterialsClient initialDocuments={documents} categories={categories} />
    </div>
  );
}
