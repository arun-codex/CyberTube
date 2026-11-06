-- Grant Data API table privileges while retaining RLS as the row-level boundary.
-- Playlist tables are publicly readable; only service_role can write them.
GRANT SELECT ON TABLE public.course_playlist_sources, public.course_playlist_items
  TO anon, authenticated;
GRANT ALL PRIVILEGES ON TABLE public.course_playlist_sources, public.course_playlist_items
  TO service_role;

-- Per-user video progress is accessible only to authenticated users; RLS policies
-- restrict every operation to rows where user_id = auth.uid().
GRANT SELECT, INSERT, UPDATE, DELETE
  ON TABLE public.user_lesson_video_progress
  TO authenticated;
GRANT ALL PRIVILEGES ON TABLE public.user_lesson_video_progress
  TO service_role;
