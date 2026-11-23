import { RetryLibrary } from "@/components/library/RetryLibrary";
import Loading from './loading';
import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getAllAuthoritativeResources, getAllAuthoritativePaths } from '@/lib/authoritativeCatalog';
import { getAuthenticatedUser, createClient } from '@/lib/supabase/server';
import { UnifiedLibraryHubClient } from '@/components/library/UnifiedLibraryHubClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Library Hub | CyberTube',
  description: 'Find study guides, cheat sheets, video courses and practice labs.',
};

export default async function LibraryPage() {
  const courseResources = getAllAuthoritativeResources();
  const user = await getAuthenticatedUser();
  const supabase = await createClient();

  let documents: any[] = [];
  let categories: any[] = [];
  let progressList: any[] = [];
  let bookmarks: any[] = [];

  let failed = false;
  if (supabase) {
    try {
      const [
        { data: categoriesData, error: categoryError },
        { data: documentsData, error: documentError },
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
          .eq('collection_slug', 'bug-bounty')
          .is('retired_at', null)
          .order('sort_order', { ascending: true }),
      ]);

      failed = Boolean(categoryError || documentError);
      documents = (documentsData as any[]) || [];
      const usedCategories = new Set(documents.map((d) => d.category_id));
      categories = ((categoriesData as any[]) || []).filter((c) => usedCategories.has(c.id));

      if (user) {
        const [
          { data: progressData },
          { data: bookmarksData },
        ] = await Promise.all([
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

        const activeIds = new Set(documents.map((d) => d.id));
        progressList = ((progressData as any[]) || []).filter((p: any) => activeIds.has(p.document_id));
        bookmarks = ((bookmarksData as any[]) || []).filter((b: any) => activeIds.has(b.document_id));
      }
    } catch (err) {
      failed = true;
      console.warn('Could not fetch database study materials for library hub:', err);
    }
  }

  return (
    <Suspense
      fallback={<Loading />}
    >
      {failed && <p role="alert" className="container-max py-4">Some study materials could not load. <RetryLibrary /></p>}
      <UnifiedLibraryHubClient
        documents={documents}
        categories={categories}
        progressList={progressList}
        bookmarks={bookmarks}
        courseResources={courseResources}
        learningPaths={getAllAuthoritativePaths()}
        isUserLoggedIn={Boolean(user)}
      />
    </Suspense>
  );
}
