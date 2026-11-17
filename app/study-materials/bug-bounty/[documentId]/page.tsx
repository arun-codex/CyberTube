import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getAuthenticatedUser, createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { PdfReader } from '@/components/library/PdfReader';

interface PageProps {
  params: Promise<{ documentId: string }>;
  searchParams: Promise<{ page?: string; q?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { documentId } = await params;
  const admin = createAdminClient();
  const { data: doc } = admin
    ? await admin.from('study_documents').select('title').eq('is_published', true).eq('id', documentId).maybeSingle()
    : { data: null };

  return {
    title: doc?.title ? `${doc.title} | CyberTube Study Library` : 'Study Material Reader | CyberTube',
    description: 'Read and learn with secure, authenticated bug bounty study materials.',
  };
}

export default async function StudyDocumentReaderPage({ params, searchParams }: PageProps) {
  const user = await getAuthenticatedUser();
  const { documentId } = await params;
  const { page, q } = (await searchParams) || {};

  if (!user) {
    redirect(`/login?redirect=/study-materials/bug-bounty/${documentId}`);
  }

  const supabase = await createClient();
  if (!supabase) {
    return <div className="p-8 text-danger">Database client unavailable.</div>;
  }

  // Fetch document
  let docData: any = null;

  const { data: doc, error } = await supabase
    .from('study_documents')
    .select('id, title, page_count, is_published, description, category_id, study_categories(title)')
    .eq('id', documentId)
    .is('retired_at', null)
    .maybeSingle();

  if (doc && !error) {
    docData = doc;
  } else {
    // If not found by ID, try searching by slug
    const { data: slugDoc } = await supabase
      .from('study_documents')
      .select('id, title, page_count, is_published, description, category_id, study_categories(title)')
      .eq('slug', documentId)
      .is('retired_at', null)
      .maybeSingle();

    if (slugDoc) {
      docData = slugDoc;
    }
  }

  if (!docData) {
    notFound();
  }

  if (!docData.is_published) {
    // Verify admin
    const admin = createAdminClient();
    const { data: adminRow } = admin
      ? await admin.from('admin_users').select('id').eq('user_id', user.id).maybeSingle()
      : { data: null };

    if (!adminRow) {
      return (
        <div className="max-w-md mx-auto my-16 p-8 border border-amber-500/30 bg-amber-500/10 rounded-xl text-center space-y-3">
          <h2 className="text-xl font-bold text-amber-400">Material Under Review</h2>
          <p className="text-sm text-text-secondary">
            This study guide is currently in review and has not yet been published for learners.
          </p>
        </div>
      );
    }
  }

  const initialPage = page ? parseInt(page, 10) : 1;

  return (
    <div className="py-2">
      <PdfReader
        documentId={docData.id}
        initialTitle={docData.title}
        initialPage={isNaN(initialPage) ? 1 : initialPage}
        initialSearchQuery={q}
      />
    </div>
  );
}
