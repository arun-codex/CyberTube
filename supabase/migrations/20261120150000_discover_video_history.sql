-- Discover playback history: per-user, cloud-synced, least-privilege.
-- Kept separate from course videos so existing learning progress is unaffected.
CREATE TABLE IF NOT EXISTS public.user_discover_video_progress (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  video_id text NOT NULL CHECK (video_id ~ '^[A-Za-z0-9_-]{11}$'),
  title text NOT NULL DEFAULT '',
  channel_name text NOT NULL DEFAULT 'YouTube',
  category text NOT NULL DEFAULT 'cybersecurity',
  last_position_seconds integer NOT NULL DEFAULT 0 CHECK (last_position_seconds >= 0),
  max_position_seconds integer NOT NULL DEFAULT 0 CHECK (max_position_seconds >= 0),
  duration_seconds integer NOT NULL DEFAULT 0 CHECK (duration_seconds >= 0),
  progress_percent integer NOT NULL DEFAULT 0 CHECK (progress_percent BETWEEN 0 AND 100),
  is_completed boolean NOT NULL DEFAULT false,
  first_watched_at timestamptz NOT NULL DEFAULT now(),
  last_watched_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, video_id)
);
CREATE INDEX IF NOT EXISTS idx_user_discover_history_latest
  ON public.user_discover_video_progress(user_id, last_watched_at DESC);
ALTER TABLE public.user_discover_video_progress ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.user_discover_video_progress FROM PUBLIC, anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_discover_video_progress TO authenticated;

CREATE POLICY "discover_history_select_own" ON public.user_discover_video_progress
  FOR SELECT TO authenticated USING (user_id = (SELECT auth.uid()));
CREATE POLICY "discover_history_insert_own" ON public.user_discover_video_progress
  FOR INSERT TO authenticated WITH CHECK (user_id = (SELECT auth.uid()));
CREATE POLICY "discover_history_update_own" ON public.user_discover_video_progress
  FOR UPDATE TO authenticated
  USING (user_id = (SELECT auth.uid()))
  WITH CHECK (user_id = (SELECT auth.uid()));
CREATE POLICY "discover_history_delete_own" ON public.user_discover_video_progress
  FOR DELETE TO authenticated USING (user_id = (SELECT auth.uid()));

-- Invoker rights and RLS remain in force. Atomic writes prevent progress regression.
CREATE OR REPLACE FUNCTION public.save_discover_video_progress(
  p_video_id text, p_title text, p_channel text, p_category text,
  p_position_seconds integer, p_duration_seconds integer, p_completed boolean DEFAULT false
)
RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid := (SELECT auth.uid());
  v_position integer;
  v_duration integer;
  v_percent integer;
  v_result jsonb;
BEGIN
  IF v_user_id IS NULL THEN RAISE EXCEPTION 'Sign in required' USING ERRCODE='28000'; END IF;
  IF p_video_id IS NULL OR p_video_id !~ '^[A-Za-z0-9_-]{11}$' THEN
    RAISE EXCEPTION 'Invalid video ID' USING ERRCODE='22023';
  END IF;
  v_duration := LEAST(172800, GREATEST(0, COALESCE(p_duration_seconds, 0)));
  v_position := LEAST(v_duration, GREATEST(0, COALESCE(p_position_seconds, 0)));
  IF v_duration = 0 THEN
    RAISE EXCEPTION 'Video duration is required' USING ERRCODE='22023';
  END IF;
  v_percent := LEAST(100, ROUND(100.0 * v_position / v_duration)::integer);
  INSERT INTO public.user_discover_video_progress AS progress (
    user_id, video_id, title, channel_name, category,
    last_position_seconds, max_position_seconds, duration_seconds,
    progress_percent, is_completed, last_watched_at
  ) VALUES (
    v_user_id, p_video_id, LEFT(COALESCE(p_title,''), 220),
    LEFT(COALESCE(p_channel,'YouTube'), 110), LEFT(COALESCE(p_category,'cybersecurity'), 60),
    v_position, v_position, v_duration,
    CASE WHEN p_completed THEN 100 ELSE v_percent END,
    COALESCE(p_completed,false), now()
  )
  ON CONFLICT (user_id, video_id) DO UPDATE SET
    title = EXCLUDED.title,
    channel_name = EXCLUDED.channel_name,
    category = EXCLUDED.category,
    last_position_seconds = EXCLUDED.last_position_seconds,
    max_position_seconds = GREATEST(progress.max_position_seconds, EXCLUDED.max_position_seconds),
    duration_seconds = EXCLUDED.duration_seconds,
    progress_percent = GREATEST(progress.progress_percent, EXCLUDED.progress_percent),
    is_completed = progress.is_completed OR EXCLUDED.is_completed,
    last_watched_at = now()
  RETURNING to_jsonb(progress.*) INTO v_result;
  RETURN v_result;
END;
$$;
REVOKE ALL ON FUNCTION public.save_discover_video_progress(text,text,text,text,integer,integer,boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.save_discover_video_progress(text,text,text,text,integer,integer,boolean) TO authenticated;


-- Extend the discover interest taxonomy beyond technical disciplines.
INSERT INTO public.discovery_categories (slug,name,description,icon,enabled)
VALUES
  ('career-development','Career & Internships','Interview preparation, cybersecurity roles, internships and job searches.','briefcase',true),
  ('professional-growth','Communication & Personal Growth','Workplace communication, leadership and lifelong learning.','graduation-cap',true)
ON CONFLICT (slug) DO UPDATE SET
  name=EXCLUDED.name,description=EXCLUDED.description,enabled=true;

INSERT INTO public.discovery_topics (category_id,slug,name,description,keywords,enabled)
SELECT category.id,topic.slug,topic.name,topic.description,topic.keywords,true
FROM (VALUES
  ('career-development','soc-careers','SOC Analyst Careers','Entry-level security operations roles, career progress and interviews',ARRAY['soc analyst','jobs','interview','security operations']::text[]),
  ('career-development','cyber-internships','Cybersecurity Internships','Find internships, build a portfolio and prepare applications',ARRAY['internship','freshers','students','experience','applications']::text[]),
  ('career-development','interview-preparation','Interview Preparation','Technical and behavioral interview practice',ARRAY['interview','resume','recruiter','career']::text[]),
  ('career-development','cyber-certifications','Certifications & Job Skills','Build practical skills and plan professional certification goals',ARRAY['certification','compTIA','CCNA','OSCP','skills']::text[]),
  ('professional-growth','communication-skills','Workplace Communication','Clarity, public speaking, teamwork and explaining technical concepts',ARRAY['communication','public speaking','presentations','confidence']::text[]),
  ('professional-growth','personal-development','Personal Growth & Productivity','Habits, productivity, confidence, time management and leadership',ARRAY['growth','productivity','habits','leadership','confidence']::text[])
) topic(category_slug,slug,name,description,keywords)
JOIN public.discovery_categories category ON category.slug=topic.category_slug
ON CONFLICT (slug) DO UPDATE SET
  name=EXCLUDED.name,description=EXCLUDED.description,keywords=EXCLUDED.keywords,enabled=true;
