import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAuthenticatedUser, createClient } from '@/lib/supabase/server';
import { StudyDashboardClient } from '@/components/library/StudyDashboardClient';

export const metadata: Metadata = {
  title: 'Bug Bounty Study Library | CyberTube',
  description: 'Access login-protected Bug Bounty study materials, cheat sheets, and checklists.',
};

export default async function StudyLibraryPage() {
  const user = await getAuthenticatedUser();
  if (!user) {
    redirect('/auth/login?redirect=/study-materials');
  }

  const supabase = await createClient();
  if (!supabase) {
    return <div className="p-8 text-danger">Database connection error.</div>;
  }

  // Fetch published categories, published documents, user's progress, and user's bookmarks
  const [
    { data: categoriesData },
    { data: documentsData },
    { data: progressData },
    { data: bookmarksData },
  ] = await Promise.all([
    supabase
      .from('study_categories')
      .select('id, title, slug, description')
      .eq('is_published', true)
      .order('sort_order', { ascending: true }),
    supabase
      .from('study_documents')
      .select('id, title, slug, description, category_id, difficulty, page_count, is_published, study_categories(title, slug)')
      .eq('is_published', true)
      .order('sort_order', { ascending: true }),
    supabase
      .from('user_study_progress')
      .select('document_id, last_page, highest_page, completion_percent, is_completed, last_read_at')
      .eq('user_id', user.id),
    supabase
      .from('user_study_bookmarks')
      .select('document_id, page_number, title, created_at, study_documents(title)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false }),
  ]);

  const categories = categoriesData || [];
  const documents = (documentsData as any[]) || [];
  const progressList = progressData || [];
  const bookmarks = (bookmarksData as any[]) || [];

  return (
    <StudyDashboardClient
      categories={categories}
      documents={documents}
      progressList={progressList}
      bookmarks={bookmarks}
    />
  );
}
