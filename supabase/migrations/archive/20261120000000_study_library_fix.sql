-- Migration: Fix study library policies and indexes (new timestamp after existing migrations)
-- Ensure admins have full CRUD, service role can read for background jobs

-- Admin policies for study_documents
CREATE POLICY "admin_documents_full" ON public.study_documents
  FOR ALL
  USING (auth.role() = 'admin')
  WITH CHECK (auth.role() = 'admin');

-- Admin policies for study_document_pages
CREATE POLICY "admin_pages_full" ON public.study_document_pages
  FOR ALL
  USING (auth.role() = 'admin')
  WITH CHECK (auth.role() = 'admin');

-- Service role read access (used by server‑side jobs)
CREATE POLICY "service_role_read_documents" ON public.study_documents
  FOR SELECT
  USING (auth.role() = 'service_role');

CREATE POLICY "service_role_read_pages" ON public.study_document_pages
  FOR SELECT
  USING (auth.role() = 'service_role');

-- Ensure non‑admin users can only read published docs
ALTER POLICY "allow read published" ON public.study_documents
  USING (is_published = true);

ALTER POLICY "allow read published" ON public.study_categories
  USING (is_published = true);

-- Add missing indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_page_doc_number ON public.study_document_pages (document_id, page_number);
CREATE INDEX IF NOT EXISTS idx_progress_user_doc ON public.user_study_progress (user_id, document_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_doc ON public.user_study_bookmarks (user_id, document_id);

-- Constrain processing_status values
ALTER TABLE public.study_document_pages
  ADD CONSTRAINT chk_processing_status CHECK (processing_status IN ('pending','ready','failed'));
