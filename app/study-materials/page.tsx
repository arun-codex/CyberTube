import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAuthenticatedUser, createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';
import type { Database } from '@/types/database';

export const metadata: Metadata = {
  title: 'Study Library | CyberTube',
  description: 'Browse secure Bug Bounty study materials',
};

type StudyDocument = Database['public']['Tables']['study_documents']['Row'];
type UserProgress = Database['public']['Tables']['user_study_progress']['Row'];

export default async function StudyLibraryPage() {
  const user = await getAuthenticatedUser();
  if (!user) {
    redirect('/auth/login?redirect=/study-materials');
  }

  const supabase = await createClient();
  if (!supabase) {
    return <div className="p-8 text-danger">Database connection error.</div>;
  }

  // Fetch published categories and documents
  const [{ data: documentsData }, { data: progressData }] = await Promise.all([
    supabase
      .from('study_documents')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true }),
    supabase
      .from('user_study_progress')
      .select('*')
      .eq('user_id', user.id),
  ]);

  const documents = (documentsData as unknown as StudyDocument[]) || [];
  const progressList = (progressData as unknown as UserProgress[]) || [];

  const progressMap = new Map<string, UserProgress>(progressList.map((p) => [p.document_id, p]));

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-accent" />
          <h1 className="text-3xl font-bold tracking-tight text-text-primary">
            Bug Bounty Study Materials Library
          </h1>
        </div>
        <p className="mt-2 text-text-secondary">
          Premium, interactive, secure study guides and checklists for security researchers.
        </p>
      </div>

      {documents.length === 0 ? (
        <Card className="p-12 text-center border-dashed">
          <BookOpen className="mx-auto h-12 w-12 text-text-muted mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-text-primary">No published study materials yet</h3>
          <p className="mt-1 text-sm text-text-secondary">
            Study guides are currently being prepared and verified. Check back soon!
          </p>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc) => {
            const prog = progressMap.get(doc.id);
            const isCompleted = prog?.is_completed ?? false;
            const completionPercent = prog?.completion_percent ?? 0;
            const lastPage = prog?.last_page ?? 1;

            return (
              <Link key={doc.id} href={`/study-materials/${doc.id}?page=${lastPage}`} className="group block">
                <Card className="h-full flex flex-col justify-between p-6 transition-all hover:border-accent hover:shadow-md">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant={doc.difficulty === 'advanced' ? 'danger' : 'default'}>
                        {doc.difficulty || 'Study Guide'}
                      </Badge>
                      {isCompleted ? (
                        <span className="flex items-center gap-1 text-xs font-medium text-emerald-500">
                          <CheckCircle className="h-4 w-4" /> Completed
                        </span>
                      ) : completionPercent > 0 ? (
                        <span className="flex items-center gap-1 text-xs font-medium text-accent">
                          <Clock className="h-4 w-4" /> {completionPercent}%
                        </span>
                      ) : null}
                    </div>

                    <h2 className="text-xl font-bold text-text-primary group-hover:text-accent transition-colors">
                      {doc.title}
                    </h2>
                    {doc.description && (
                      <p className="mt-2 text-sm text-text-secondary line-clamp-3">
                        {doc.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs text-text-muted">
                    <span>{doc.page_count} {doc.page_count === 1 ? 'page' : 'pages'}</span>
                    <span className="font-medium text-accent group-hover:underline">
                      {completionPercent > 0 ? 'Continue reading →' : 'Start reading →'}
                    </span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
