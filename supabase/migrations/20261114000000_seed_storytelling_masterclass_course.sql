-- =============================================================================
-- CYBERTUBE: SEED FREE STORYTELLING MASTERCLASS COURSE, MODULES, AND LESSONS
-- =============================================================================
-- Description:
-- 1. Creates public.user_quiz_attempts table for persistent quiz attempt storage with RLS.
-- 2. Idempotently seeds the 20-week Storytelling Masterclass course (c0000000-0000-4000-8000-000000000001).
-- 3. Idempotently seeds all 20 modules with deterministic UUIDs.
-- 4. Idempotently seeds all 100 lessons with deterministic UUIDs and video mappings.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. USER QUIZ ATTEMPTS TABLE & RLS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES public.course_modules(id) ON DELETE CASCADE,
  score INT NOT NULL CHECK (score >= 0 AND score <= 100),
  correct_count INT NOT NULL DEFAULT 0 CHECK (correct_count >= 0),
  total_questions INT NOT NULL DEFAULT 10 CHECK (total_questions > 0),
  passed BOOLEAN NOT NULL DEFAULT FALSE,
  submitted_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_user_quiz_attempts_user_course ON public.user_quiz_attempts(user_id, course_id);
CREATE INDEX IF NOT EXISTS idx_user_quiz_attempts_module ON public.user_quiz_attempts(module_id);
CREATE INDEX IF NOT EXISTS idx_user_quiz_attempts_passed ON public.user_quiz_attempts(user_id, module_id, passed);

ALTER TABLE public.user_quiz_attempts ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'user_quiz_attempts' AND policyname = 'Users can view their own quiz attempts'
  ) THEN
    CREATE POLICY "Users can view their own quiz attempts"
      ON public.user_quiz_attempts FOR SELECT
      TO authenticated
      USING ((SELECT auth.uid()) = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'user_quiz_attempts' AND policyname = 'Users can record their own quiz attempts'
  ) THEN
    CREATE POLICY "Users can record their own quiz attempts"
      ON public.user_quiz_attempts FOR INSERT
      TO authenticated
      WITH CHECK ((SELECT auth.uid()) = user_id);
  END IF;
END $$;

GRANT SELECT, INSERT ON TABLE public.user_quiz_attempts TO authenticated;

-- -----------------------------------------------------------------------------
-- 2. SEED COURSE, MODULES, AND LESSONS
-- -----------------------------------------------------------------------------
DO $$
DECLARE
  v_course_id CONSTANT UUID := 'c0000000-0000-4000-8000-000000000001';
BEGIN
  -- A. Course Record
  INSERT INTO public.courses (
    id,
    slug,
    title,
    short_description,
    description,
    difficulty,
    estimated_duration,
    total_duration_minutes,
    thumbnail_url,
    instructor_name,
    instructor_title,
    instructor_org,
    status,
    tags,
    prerequisites,
    learning_objectives,
    track,
    domains
  ) VALUES (
    v_course_id,
    'free-storytelling-masterclass',
    'Free Storytelling Masterclass (20-Week Comprehensive Plan)',
    'A comprehensive 20-week, 100-hour masterclass from complete beginner to advanced practice across written, oral, visual, and persuasive storytelling with embedded video lessons and weekly assessments.',
    'A complete, self-study storytelling curriculum designed to take you from beginner to all-round storyteller over 20 weeks (5 hours/week, 100 guided hours). Covers the four core dimensions of storytelling: written fiction and non-fiction, oral delivery and performance, visual and video framing, and persuasive explanatory communication. Includes embedded video lectures for all 100 lessons, 20 weekly module assessments (200 total questions with a 70% passing unlock gate), bilingual English–Hindi practice, and a 5-piece portfolio capstone.',
    'beginner',
    '100 hours',
    6000,
    'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80',
    'Open Storytelling Curriculum',
    'All-Round Storytelling Masterclass',
    'Khan Academy, Pixar, TED-Ed, StudioBinder & OpenLearn',
    'published',
    ARRAY['storytelling', 'creative-writing', 'public-speaking', 'visual-storytelling', 'hindi-english', 'communication', 'masterclass'],
    ARRAY['Curiosity to observe everyday life and share stories', 'Willingness to write, speak aloud, and reflect for 5 hours each week', 'No prior creative writing or filmmaking experience required'],
    ARRAY['Turn everyday observations, memories, and questions into compelling story premises', 'Build multi-dimensional characters with clear motivations, contradictions, and arcs', 'Master narrative structures including the story spine, causality, and three-act architecture', 'Deliver engaging stories across four formats: written, oral/spoken, visual video, and persuasive', 'Practise a bilingual English–Hindi storytelling workflow to adapt narratives across cultural contexts', 'Complete 20 weekly module quizzes (≥70% passing threshold) and assemble a 5-piece professional portfolio'],
    'general-technology',
    ARRAY['fundamentals']
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    difficulty = EXCLUDED.difficulty,
    estimated_duration = EXCLUDED.estimated_duration,
    total_duration_minutes = EXCLUDED.total_duration_minutes,
    thumbnail_url = EXCLUDED.thumbnail_url,
    instructor_name = EXCLUDED.instructor_name,
    instructor_title = EXCLUDED.instructor_title,
    instructor_org = EXCLUDED.instructor_org,
    status = EXCLUDED.status,
    tags = EXCLUDED.tags,
    prerequisites = EXCLUDED.prerequisites,
    learning_objectives = EXCLUDED.learning_objectives,
    track = EXCLUDED.track,
    domains = EXCLUDED.domains;

  -- Module 1: Level 1: Foundations (Weeks 1–4): Week 01 — What is a story?
  INSERT INTO public.course_modules (
    id,
    course_id,
    title,
    description,
    order_index
  ) VALUES (
    'c0000000-0000-4000-8000-000000000101',
    v_course_id,
    'Level 1: Foundations (Weeks 1–4): Week 01 — What is a story?',
    'Complete all 5 lessons and pass the weekly assessment (≥70%) to unlock the subsequent module.',
    1
  )
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000101',
    v_course_id,
    'c0000000-0000-4000-8000-000000000101',
    'w01-l1-story-versus-information',
    'Week 01 • Lesson 1: Story versus information',
    'Watch the TED-Ed lesson. Write your own definition of a story in English and Hindi. Give one example of a story and one example of plain information.',
    '1rMnzNZkIX0',
    12,
    1,
    ARRAY['Master and apply core concepts in: Story versus information', 'Connect theory from undefined (Khan Academy Labs) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 01 — What is a story?'],
    ARRAY['storytelling', 'creative-writing', 'week-1', 'level-1'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000102',
    v_course_id,
    'c0000000-0000-4000-8000-000000000101',
    'w01-l2-the-audience',
    'Week 01 • Lesson 2: The audience',
    'Choose a familiar story and identify who it is for, what the audience knows and what the audience wants to know next.',
    'NL0KQu9JiDQ',
    12,
    2,
    ARRAY['Master and apply core concepts in: The audience', 'Connect theory from undefined (Khan Academy Labs) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 01 — What is a story?'],
    ARRAY['storytelling', 'creative-writing', 'week-1', 'level-1'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000103',
    v_course_id,
    'c0000000-0000-4000-8000-000000000101',
    'w01-l3-change',
    'Week 01 • Lesson 3: Change',
    'Write three tiny narratives: a person wants something, something changes, and the result is different from the start.',
    'tREPH6hJsYg',
    12,
    3,
    ARRAY['Master and apply core concepts in: Change', 'Connect theory from undefined (Khan Academy Labs) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 01 — What is a story?'],
    ARRAY['storytelling', 'creative-writing', 'week-1', 'level-1'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000104',
    v_course_id,
    'c0000000-0000-4000-8000-000000000101',
    'w01-l4-tell-a-real-moment',
    'Week 01 • Lesson 4: Tell a real moment',
    'Tell a real event from your life in 60 seconds. Record it on your phone. Do not worry about performance yet.',
    'm5AW93Ya0UE',
    12,
    4,
    ARRAY['Master and apply core concepts in: Tell a real moment', 'Connect theory from undefined (Khan Academy Labs) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 01 — What is a story?'],
    ARRAY['storytelling', 'creative-writing', 'week-1', 'level-1'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000105',
    v_course_id,
    'c0000000-0000-4000-8000-000000000101',
    'w01-l5-first-analysis',
    'Week 01 • Lesson 5: First analysis',
    'Analyse a short film scene, story or personal anecdote. Mark its opening, important change and ending. Write three strengths and one weakness.',
    '1mTO_ax-M3Q',
    12,
    5,
    ARRAY['Master and apply core concepts in: First analysis', 'Connect theory from undefined (Khan Academy Labs) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 01 — What is a story?'],
    ARRAY['storytelling', 'creative-writing', 'week-1', 'level-1'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Module 2: Level 1: Foundations (Weeks 1–4): Week 02 — Observation, memory and idea generation
  INSERT INTO public.course_modules (
    id,
    course_id,
    title,
    description,
    order_index
  ) VALUES (
    'c0000000-0000-4000-8000-000000000102',
    v_course_id,
    'Level 1: Foundations (Weeks 1–4): Week 02 — Observation, memory and idea generation',
    'Complete all 5 lessons and pass the weekly assessment (≥70%) to unlock the subsequent module.',
    2
  )
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000201',
    v_course_id,
    'c0000000-0000-4000-8000-000000000102',
    'w02-l1-collect-observations',
    'Week 02 • Lesson 1: Collect observations',
    'Record ten details from a real place: sounds, objects, behaviour, mood and small contradictions.',
    'SgGARYH2vRg',
    12,
    6,
    ARRAY['Master and apply core concepts in: Collect observations', 'Connect theory from undefined (Khan Academy Labs) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 02 — Observation, memory and idea generation'],
    ARRAY['storytelling', 'creative-writing', 'week-2', 'level-1'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000202',
    v_course_id,
    'c0000000-0000-4000-8000-000000000102',
    'w02-l2-memory-as-material',
    'Week 02 • Lesson 2: Memory as material',
    'Write one memory using concrete details. Separate what you remember clearly from what you are guessing.',
    'ngZQUebMSEg',
    12,
    7,
    ARRAY['Master and apply core concepts in: Memory as material', 'Connect theory from undefined (Khan Academy Labs) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 02 — Observation, memory and idea generation'],
    ARRAY['storytelling', 'creative-writing', 'week-2', 'level-1'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000203',
    v_course_id,
    'c0000000-0000-4000-8000-000000000102',
    'w02-l3-what-if',
    'Week 02 • Lesson 3: What if?',
    'Turn five ordinary observations into “What if?” story ideas. Make the situation unusual but understandable.',
    'bgLSgFDMF1k',
    12,
    8,
    ARRAY['Master and apply core concepts in: What if?', 'Connect theory from undefined (Lessons from the Screenplay) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 02 — Observation, memory and idea generation'],
    ARRAY['storytelling', 'creative-writing', 'week-2', 'level-1'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000204',
    v_course_id,
    'c0000000-0000-4000-8000-000000000102',
    'w02-l4-premise-practice',
    'Week 02 • Lesson 4: Premise practice',
    'Reduce three ideas to one sentence each: main character + situation + central problem.',
    'hjEO3ijVwSU',
    12,
    9,
    ARRAY['Master and apply core concepts in: Premise practice', 'Connect theory from undefined (StudioBinder) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 02 — Observation, memory and idea generation'],
    ARRAY['storytelling', 'creative-writing', 'week-2', 'level-1'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000205',
    v_course_id,
    'c0000000-0000-4000-8000-000000000102',
    'w02-l5-select-the-strongest-idea',
    'Week 02 • Lesson 5: Select the strongest idea',
    'Score each idea for clarity, conflict, emotional potential and your own interest. Choose one to develop.',
    'CS1QkWSnP_o',
    12,
    10,
    ARRAY['Master and apply core concepts in: Select the strongest idea', 'Connect theory from undefined (StudioBinder) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 02 — Observation, memory and idea generation'],
    ARRAY['storytelling', 'creative-writing', 'week-2', 'level-1'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Module 3: Level 1: Foundations (Weeks 1–4): Week 03 — Story spine, hook and promise
  INSERT INTO public.course_modules (
    id,
    course_id,
    title,
    description,
    order_index
  ) VALUES (
    'c0000000-0000-4000-8000-000000000103',
    v_course_id,
    'Level 1: Foundations (Weeks 1–4): Week 03 — Story spine, hook and promise',
    'Complete all 5 lessons and pass the weekly assessment (≥70%) to unlock the subsequent module.',
    3
  )
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000301',
    v_course_id,
    'c0000000-0000-4000-8000-000000000103',
    'w03-l1-story-spine',
    'Week 03 • Lesson 1: Story spine',
    'Use this starter structure: Once upon a time… Every day… Until one day… Because of that… Until finally… And ever since then…',
    'RgRfbvLkvnI',
    12,
    11,
    ARRAY['Master and apply core concepts in: Story spine', 'Connect theory from undefined (Khan Academy Labs) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 03 — Story spine, hook and promise'],
    ARRAY['storytelling', 'creative-writing', 'week-3', 'level-1'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000302',
    v_course_id,
    'c0000000-0000-4000-8000-000000000103',
    'w03-l2-hooks',
    'Week 03 • Lesson 2: Hooks',
    'Write five different openings for the same story: a surprising fact, a decision, a question, an image and a moment of action.',
    'CF3lFPW4E1o',
    12,
    12,
    ARRAY['Master and apply core concepts in: Hooks', 'Connect theory from undefined (Lessons from the Screenplay) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 03 — Story spine, hook and promise'],
    ARRAY['storytelling', 'creative-writing', 'week-3', 'level-1'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000303',
    v_course_id,
    'c0000000-0000-4000-8000-000000000103',
    'w03-l3-the-story-promise',
    'Week 03 • Lesson 3: The story promise',
    'Decide what type of experience the audience expects: funny, suspenseful, moving, informative, frightening or inspiring.',
    'EXeTwQWrcwY',
    12,
    13,
    ARRAY['Master and apply core concepts in: The story promise', 'Connect theory from undefined (Rotten Tomatoes Classic Trailers) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 03 — Story spine, hook and promise'],
    ARRAY['storytelling', 'creative-writing', 'week-3', 'level-1'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000304',
    v_course_id,
    'c0000000-0000-4000-8000-000000000103',
    'w03-l4-causality',
    'Week 03 • Lesson 4: Causality',
    'Replace “and then” chains with “because”, “but” and “therefore”. Check whether each major event causes or changes the next one.',
    'ba-CB6wVuvQ',
    12,
    14,
    ARRAY['Master and apply core concepts in: Causality', 'Connect theory from undefined (Lessons from the Screenplay) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 03 — Story spine, hook and promise'],
    ARRAY['storytelling', 'creative-writing', 'week-3', 'level-1'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000305',
    v_course_id,
    'c0000000-0000-4000-8000-000000000103',
    'w03-l5-pitch-aloud',
    'Week 03 • Lesson 5: Pitch aloud',
    'Explain the story in 30 seconds. Ask a listener what they think the story is about and what they want to know.',
    '0txdzPfC-Ow',
    12,
    15,
    ARRAY['Master and apply core concepts in: Pitch aloud', 'Connect theory from undefined (StudioBinder) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 03 — Story spine, hook and promise'],
    ARRAY['storytelling', 'creative-writing', 'week-3', 'level-1'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Module 4: Level 1: Foundations (Weeks 1–4): Week 04 — Plot and three-act structure
  INSERT INTO public.course_modules (
    id,
    course_id,
    title,
    description,
    order_index
  ) VALUES (
    'c0000000-0000-4000-8000-000000000104',
    v_course_id,
    'Level 1: Foundations (Weeks 1–4): Week 04 — Plot and three-act structure',
    'Complete all 5 lessons and pass the weekly assessment (≥70%) to unlock the subsequent module.',
    4
  )
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000401',
    v_course_id,
    'c0000000-0000-4000-8000-000000000104',
    'w04-l1-three-acts',
    'Week 04 • Lesson 1: Three acts',
    'Learn the job of setup, confrontation and resolution. Do not treat the acts as fixed percentages.',
    'ZyNvgFmBQTs',
    12,
    16,
    ARRAY['Master and apply core concepts in: Three acts', 'Connect theory from undefined (Khan Academy Labs) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 04 — Plot and three-act structure'],
    ARRAY['storytelling', 'creative-writing', 'week-4', 'level-1'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000402',
    v_course_id,
    'c0000000-0000-4000-8000-000000000104',
    'w04-l2-turning-points',
    'Week 04 • Lesson 2: Turning points',
    'Identify the event that makes the story''s original situation impossible to continue.',
    'WJ_iNkkgdCA',
    12,
    17,
    ARRAY['Master and apply core concepts in: Turning points', 'Connect theory from undefined (Khan Academy Labs) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 04 — Plot and three-act structure'],
    ARRAY['storytelling', 'creative-writing', 'week-4', 'level-1'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000403',
    v_course_id,
    'c0000000-0000-4000-8000-000000000104',
    'w04-l3-midpoint-and-escalation',
    'Week 04 • Lesson 3: Midpoint and escalation',
    'Give the protagonist a new understanding, setback or change of plan halfway through.',
    'AJLHsXw-LFI',
    12,
    18,
    ARRAY['Master and apply core concepts in: Midpoint and escalation', 'Connect theory from undefined (Lessons from the Screenplay) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 04 — Plot and three-act structure'],
    ARRAY['storytelling', 'creative-writing', 'week-4', 'level-1'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000404',
    v_course_id,
    'c0000000-0000-4000-8000-000000000104',
    'w04-l4-climax-and-resolution',
    'Week 04 • Lesson 4: Climax and resolution',
    'Design a final choice or confrontation that tests the central goal and character.',
    'S0QMxzEVuDI',
    12,
    19,
    ARRAY['Master and apply core concepts in: Climax and resolution', 'Connect theory from undefined (Lessons from the Screenplay) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 04 — Plot and three-act structure'],
    ARRAY['storytelling', 'creative-writing', 'week-4', 'level-1'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000405',
    v_course_id,
    'c0000000-0000-4000-8000-000000000104',
    'w04-l5-reverse-outline',
    'Week 04 • Lesson 5: Reverse outline',
    'Analyse a favourite film or short story. Write its major beats without retelling every scene.',
    'gsIQa7sH5_Y',
    12,
    20,
    ARRAY['Master and apply core concepts in: Reverse outline', 'Connect theory from undefined (Lessons from the Screenplay) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 04 — Plot and three-act structure'],
    ARRAY['storytelling', 'creative-writing', 'week-4', 'level-1'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Module 5: Level 2: Character and narrative development (Weeks 5–8): Week 05 — Creating believable characters
  INSERT INTO public.course_modules (
    id,
    course_id,
    title,
    description,
    order_index
  ) VALUES (
    'c0000000-0000-4000-8000-000000000105',
    v_course_id,
    'Level 2: Character and narrative development (Weeks 5–8): Week 05 — Creating believable characters',
    'Complete all 5 lessons and pass the weekly assessment (≥70%) to unlock the subsequent module.',
    5
  )
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000501',
    v_course_id,
    'c0000000-0000-4000-8000-000000000105',
    'w05-l1-specificity',
    'Week 05 • Lesson 1: Specificity',
    'Build one character using five concrete details: habit, object, skill, fear and contradiction.',
    'eCxo5PqI2bU',
    12,
    21,
    ARRAY['Master and apply core concepts in: Specificity', 'Connect theory from undefined (Khan Academy Labs) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 05 — Creating believable characters'],
    ARRAY['storytelling', 'creative-writing', 'week-5', 'level-2'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000502',
    v_course_id,
    'c0000000-0000-4000-8000-000000000105',
    'w05-l2-internal-versus-external',
    'Week 05 • Lesson 2: Internal versus external',
    'Separate appearance and public behaviour from beliefs, private motives and emotional patterns.',
    'bKrCKg9ggVI',
    12,
    22,
    ARRAY['Master and apply core concepts in: Internal versus external', 'Connect theory from undefined (Khan Academy Labs) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 05 — Creating believable characters'],
    ARRAY['storytelling', 'creative-writing', 'week-5', 'level-2'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000503',
    v_course_id,
    'c0000000-0000-4000-8000-000000000105',
    'w05-l3-backstory',
    'Week 05 • Lesson 3: Backstory',
    'Write only the past details that influence the character''s present choices. Avoid biography that does not affect the plot.',
    '9BusKC3kcb8',
    12,
    23,
    ARRAY['Master and apply core concepts in: Backstory', 'Connect theory from undefined (Khan Academy Labs) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 05 — Creating believable characters'],
    ARRAY['storytelling', 'creative-writing', 'week-5', 'level-2'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000504',
    v_course_id,
    'c0000000-0000-4000-8000-000000000105',
    'w05-l4-character-voice',
    'Week 05 • Lesson 4: Character voice',
    'Write the same sentence as three different people. Change word choice, rhythm, confidence and what each person avoids saying.',
    'tvqjp1CxxD8',
    12,
    24,
    ARRAY['Master and apply core concepts in: Character voice', 'Connect theory from undefined (StudioBinder) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 05 — Creating believable characters'],
    ARRAY['storytelling', 'creative-writing', 'week-5', 'level-2'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000505',
    v_course_id,
    'c0000000-0000-4000-8000-000000000105',
    'w05-l5-character-interview',
    'Week 05 • Lesson 5: Character interview',
    'Answer ten questions as the character. Then write a short scene where the character makes a decision.',
    'j56WPBaiPYQ',
    12,
    25,
    ARRAY['Master and apply core concepts in: Character interview', 'Connect theory from undefined (Lessons from the Screenplay) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 05 — Creating believable characters'],
    ARRAY['storytelling', 'creative-writing', 'week-5', 'level-2'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Module 6: Level 2: Character and narrative development (Weeks 5–8): Week 06 — Goals, needs, obstacles, stakes and arcs
  INSERT INTO public.course_modules (
    id,
    course_id,
    title,
    description,
    order_index
  ) VALUES (
    'c0000000-0000-4000-8000-000000000106',
    v_course_id,
    'Level 2: Character and narrative development (Weeks 5–8): Week 06 — Goals, needs, obstacles, stakes and arcs',
    'Complete all 5 lessons and pass the weekly assessment (≥70%) to unlock the subsequent module.',
    6
  )
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000601',
    v_course_id,
    'c0000000-0000-4000-8000-000000000106',
    'w06-l1-want-versus-need',
    'Week 06 • Lesson 1: Want versus need',
    'Identify what a character consciously wants and what they may need to understand or change.',
    'ilDsFrcHsuI',
    12,
    26,
    ARRAY['Master and apply core concepts in: Want versus need', 'Connect theory from undefined (Khan Academy Labs) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 06 — Goals, needs, obstacles, stakes and arcs'],
    ARRAY['storytelling', 'creative-writing', 'week-6', 'level-2'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000602',
    v_course_id,
    'c0000000-0000-4000-8000-000000000106',
    'w06-l2-motivation',
    'Week 06 • Lesson 2: Motivation',
    'Give the goal a believable reason. Ask why it matters now.',
    '8IAGH6k17nw',
    12,
    27,
    ARRAY['Master and apply core concepts in: Motivation', 'Connect theory from undefined (Lessons from the Screenplay) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 06 — Goals, needs, obstacles, stakes and arcs'],
    ARRAY['storytelling', 'creative-writing', 'week-6', 'level-2'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000603',
    v_course_id,
    'c0000000-0000-4000-8000-000000000106',
    'w06-l3-obstacles',
    'Week 06 • Lesson 3: Obstacles',
    'Create three increasingly difficult obstacles: practical, social and internal.',
    '6PLSJBTzaGw',
    12,
    28,
    ARRAY['Master and apply core concepts in: Obstacles', 'Connect theory from undefined (StudioBinder) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 06 — Goals, needs, obstacles, stakes and arcs'],
    ARRAY['storytelling', 'creative-writing', 'week-6', 'level-2'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000604',
    v_course_id,
    'c0000000-0000-4000-8000-000000000106',
    'w06-l4-stakes',
    'Week 06 • Lesson 4: Stakes',
    'Define what the character can lose, what others can lose and what happens if they do nothing.',
    'LxtPRqiFpe0',
    12,
    29,
    ARRAY['Master and apply core concepts in: Stakes', 'Connect theory from undefined (StudioBinder) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 06 — Goals, needs, obstacles, stakes and arcs'],
    ARRAY['storytelling', 'creative-writing', 'week-6', 'level-2'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000605',
    v_course_id,
    'c0000000-0000-4000-8000-000000000106',
    'w06-l5-arc',
    'Week 06 • Lesson 5: Arc',
    'Describe the character''s starting belief, the pressure that challenges it and the final choice that reveals change.',
    '17Gxgo9kPAQ',
    12,
    30,
    ARRAY['Master and apply core concepts in: Arc', 'Connect theory from undefined (StudioBinder Academy) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 06 — Goals, needs, obstacles, stakes and arcs'],
    ARRAY['storytelling', 'creative-writing', 'week-6', 'level-2'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Module 7: Level 2: Character and narrative development (Weeks 5–8): Week 07 — Point of view, narration and dialogue
  INSERT INTO public.course_modules (
    id,
    course_id,
    title,
    description,
    order_index
  ) VALUES (
    'c0000000-0000-4000-8000-000000000107',
    v_course_id,
    'Level 2: Character and narrative development (Weeks 5–8): Week 07 — Point of view, narration and dialogue',
    'Complete all 5 lessons and pass the weekly assessment (≥70%) to unlock the subsequent module.',
    7
  )
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000701',
    v_course_id,
    'c0000000-0000-4000-8000-000000000107',
    'w07-l1-point-of-view',
    'Week 07 • Lesson 1: Point of view',
    'Retell one event from first person and third person. Notice what information changes.',
    'g1p3WmulKbs',
    12,
    31,
    ARRAY['Master and apply core concepts in: Point of view', 'Connect theory from undefined (Khan Academy Labs) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 07 — Point of view, narration and dialogue'],
    ARRAY['storytelling', 'creative-writing', 'week-7', 'level-2'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000702',
    v_course_id,
    'c0000000-0000-4000-8000-000000000107',
    'w07-l2-narrator-knowledge',
    'Week 07 • Lesson 2: Narrator knowledge',
    'Decide what the narrator knows, misunderstands, hides or cannot know.',
    'Uty6buQ61ZA',
    12,
    32,
    ARRAY['Master and apply core concepts in: Narrator knowledge', 'Connect theory from undefined (Khan Academy Labs) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 07 — Point of view, narration and dialogue'],
    ARRAY['storytelling', 'creative-writing', 'week-7', 'level-2'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000703',
    v_course_id,
    'c0000000-0000-4000-8000-000000000107',
    'w07-l3-dialogue',
    'Week 07 • Lesson 3: Dialogue',
    'Write a conversation where each speaker wants something different.',
    'ZNRQQi42CZA',
    12,
    33,
    ARRAY['Master and apply core concepts in: Dialogue', 'Connect theory from undefined (StudioBinder Academy) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 07 — Point of view, narration and dialogue'],
    ARRAY['storytelling', 'creative-writing', 'week-7', 'level-2'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000704',
    v_course_id,
    'c0000000-0000-4000-8000-000000000107',
    'w07-l4-subtext',
    'Week 07 • Lesson 4: Subtext',
    'Write a scene where the characters discuss an ordinary subject while avoiding the real issue.',
    'qQNiqzuXjoM',
    12,
    34,
    ARRAY['Master and apply core concepts in: Subtext', 'Connect theory from undefined (StudioBinder) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 07 — Point of view, narration and dialogue'],
    ARRAY['storytelling', 'creative-writing', 'week-7', 'level-2'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000705',
    v_course_id,
    'c0000000-0000-4000-8000-000000000107',
    'w07-l5-exposition-edit',
    'Week 07 • Lesson 5: Exposition edit',
    'Remove dialogue that only explains information both characters already know. Replace it with conflict, action or implication.',
    'AyML8xuKfoc',
    12,
    35,
    ARRAY['Master and apply core concepts in: Exposition edit', 'Connect theory from undefined (StudioBinder) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 07 — Point of view, narration and dialogue'],
    ARRAY['storytelling', 'creative-writing', 'week-7', 'level-2'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Module 8: Level 2: Character and narrative development (Weeks 5–8): Week 08 — Setting, worldbuilding and genre
  INSERT INTO public.course_modules (
    id,
    course_id,
    title,
    description,
    order_index
  ) VALUES (
    'c0000000-0000-4000-8000-000000000108',
    v_course_id,
    'Level 2: Character and narrative development (Weeks 5–8): Week 08 — Setting, worldbuilding and genre',
    'Complete all 5 lessons and pass the weekly assessment (≥70%) to unlock the subsequent module.',
    8
  )
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000801',
    v_course_id,
    'c0000000-0000-4000-8000-000000000108',
    'w08-l1-setting-as-pressure',
    'Week 08 • Lesson 1: Setting as pressure',
    'Choose a place that makes the character''s goal easier or harder.',
    'wrR8ggeD4h4',
    12,
    36,
    ARRAY['Master and apply core concepts in: Setting as pressure', 'Connect theory from undefined (StudioBinder) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 08 — Setting, worldbuilding and genre'],
    ARRAY['storytelling', 'creative-writing', 'week-8', 'level-2'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000802',
    v_course_id,
    'c0000000-0000-4000-8000-000000000108',
    'w08-l2-sensory-detail',
    'Week 08 • Lesson 2: Sensory detail',
    'Describe a place through sound, temperature, texture, smell and light without listing every sense mechanically.',
    'A0edKgL9EgM',
    12,
    37,
    ARRAY['Master and apply core concepts in: Sensory detail', 'Connect theory from undefined (TED-Ed) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 08 — Setting, worldbuilding and genre'],
    ARRAY['storytelling', 'creative-writing', 'week-8', 'level-2'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000803',
    v_course_id,
    'c0000000-0000-4000-8000-000000000108',
    'w08-l3-world-rules',
    'Week 08 • Lesson 3: World rules',
    'Define three rules of the story world. Show how breaking one rule causes a problem.',
    'RSoRzTtwgP4',
    12,
    38,
    ARRAY['Master and apply core concepts in: World rules', 'Connect theory from undefined (TED-Ed) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 08 — Setting, worldbuilding and genre'],
    ARRAY['storytelling', 'creative-writing', 'week-8', 'level-2'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000804',
    v_course_id,
    'c0000000-0000-4000-8000-000000000108',
    'w08-l4-genre',
    'Week 08 • Lesson 4: Genre',
    'Retell the same premise as a mystery, comedy and drama. Note how audience expectations change.',
    'B5vEfuLS2Qc',
    12,
    39,
    ARRAY['Master and apply core concepts in: Genre', 'Connect theory from undefined (TED-Ed) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 08 — Setting, worldbuilding and genre'],
    ARRAY['storytelling', 'creative-writing', 'week-8', 'level-2'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000805',
    v_course_id,
    'c0000000-0000-4000-8000-000000000108',
    'w08-l5-research-and-authenticity',
    'Week 08 • Lesson 5: Research and authenticity',
    'Identify what needs factual research. Mark uncertain details and avoid pretending to know what you have not verified.',
    'flthk8SNiiE',
    12,
    40,
    ARRAY['Master and apply core concepts in: Research and authenticity', 'Connect theory from undefined (TED-Ed) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 08 — Setting, worldbuilding and genre'],
    ARRAY['storytelling', 'creative-writing', 'week-8', 'level-2'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Module 9: Level 3: Emotion, tension and narrative control (Weeks 9–12): Week 09 — Conflict, tension and suspense
  INSERT INTO public.course_modules (
    id,
    course_id,
    title,
    description,
    order_index
  ) VALUES (
    'c0000000-0000-4000-8000-000000000109',
    v_course_id,
    'Level 3: Emotion, tension and narrative control (Weeks 9–12): Week 09 — Conflict, tension and suspense',
    'Complete all 5 lessons and pass the weekly assessment (≥70%) to unlock the subsequent module.',
    9
  )
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000901',
    v_course_id,
    'c0000000-0000-4000-8000-000000000109',
    'w09-l1-conflict-types',
    'Week 09 • Lesson 1: Conflict types',
    'Build an external conflict, interpersonal conflict and internal conflict for one protagonist.',
    'SBEm2r0VXc4',
    12,
    41,
    ARRAY['Master and apply core concepts in: Conflict types', 'Connect theory from undefined (THNKR) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 09 — Conflict, tension and suspense'],
    ARRAY['storytelling', 'creative-writing', 'week-9', 'level-3'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000902',
    v_course_id,
    'c0000000-0000-4000-8000-000000000109',
    'w09-l2-scene-objective',
    'Week 09 • Lesson 2: Scene objective',
    'Give every scene a character who wants something and an obstacle that prevents an easy result.',
    'xqfZaXHl4qg',
    12,
    42,
    ARRAY['Master and apply core concepts in: Scene objective', 'Connect theory from undefined (Kevin McGeehan) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 09 — Conflict, tension and suspense'],
    ARRAY['storytelling', 'creative-writing', 'week-9', 'level-3'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000903',
    v_course_id,
    'c0000000-0000-4000-8000-000000000109',
    'w09-l3-escalation',
    'Week 09 • Lesson 3: Escalation',
    'Make each attempt change the situation. Do not repeat the same obstacle at the same intensity.',
    'r8jCcv2QIwM',
    12,
    43,
    ARRAY['Master and apply core concepts in: Escalation', 'Connect theory from undefined (Matthew Dicks) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 09 — Conflict, tension and suspense'],
    ARRAY['storytelling', 'creative-writing', 'week-9', 'level-3'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000904',
    v_course_id,
    'c0000000-0000-4000-8000-000000000109',
    'w09-l4-suspense-versus-surprise',
    'Week 09 • Lesson 4: Suspense versus surprise',
    'Write one scene where the audience knows danger is coming and one where the audience learns it at the same time as the character.',
    'qvkIiUJsF68',
    12,
    44,
    ARRAY['Master and apply core concepts in: Suspense versus surprise', 'Connect theory from undefined (Digiday) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 09 — Conflict, tension and suspense'],
    ARRAY['storytelling', 'creative-writing', 'week-9', 'level-3'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000905',
    v_course_id,
    'c0000000-0000-4000-8000-000000000109',
    'w09-l5-scene-test',
    'Week 09 • Lesson 5: Scene test',
    'Mark where tension rises, falls or disappears. Remove or rewrite a scene that changes nothing.',
    'qdBJ1X33rXM',
    12,
    45,
    ARRAY['Master and apply core concepts in: Scene test', 'Connect theory from undefined (The Moth) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 09 — Conflict, tension and suspense'],
    ARRAY['storytelling', 'creative-writing', 'week-9', 'level-3'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Module 10: Level 3: Emotion, tension and narrative control (Weeks 9–12): Week 10 — Emotion, pacing and audience engagement
  INSERT INTO public.course_modules (
    id,
    course_id,
    title,
    description,
    order_index
  ) VALUES (
    'c0000000-0000-4000-8000-00000000010a',
    v_course_id,
    'Level 3: Emotion, tension and narrative control (Weeks 9–12): Week 10 — Emotion, pacing and audience engagement',
    'Complete all 5 lessons and pass the weekly assessment (≥70%) to unlock the subsequent module.',
    10
  )
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000a01',
    v_course_id,
    'c0000000-0000-4000-8000-00000000010a',
    'w10-l1-emotional-investment',
    'Week 10 • Lesson 1: Emotional investment',
    'Identify what the audience needs to understand about a character before a difficult moment matters.',
    'nzOdAVgyi0U',
    12,
    46,
    ARRAY['Master and apply core concepts in: Emotional investment', 'Connect theory from undefined (TED-Ed) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 10 — Emotion, pacing and audience engagement'],
    ARRAY['storytelling', 'creative-writing', 'week-10', 'level-3'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000a02',
    v_course_id,
    'c0000000-0000-4000-8000-00000000010a',
    'w10-l2-show-versus-tell',
    'Week 10 • Lesson 2: Show versus tell',
    'Rewrite abstract emotion as behaviour, choice, sensory detail or dialogue.',
    'Z7bfPaTfU0c',
    12,
    47,
    ARRAY['Master and apply core concepts in: Show versus tell', 'Connect theory from undefined (TED-Ed) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 10 — Emotion, pacing and audience engagement'],
    ARRAY['storytelling', 'creative-writing', 'week-10', 'level-3'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000a03',
    v_course_id,
    'c0000000-0000-4000-8000-00000000010a',
    'w10-l3-pacing',
    'Week 10 • Lesson 3: Pacing',
    'Shorten a slow passage and expand a key moment. Compare how the timing changes the experience.',
    'btWlBHE0pe4',
    12,
    48,
    ARRAY['Master and apply core concepts in: Pacing', 'Connect theory from undefined (TED-Ed) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 10 — Emotion, pacing and audience engagement'],
    ARRAY['storytelling', 'creative-writing', 'week-10', 'level-3'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000a04',
    v_course_id,
    'c0000000-0000-4000-8000-00000000010a',
    'w10-l4-contrast',
    'Week 10 • Lesson 4: Contrast',
    'Place calm before tension, humour before seriousness or relief before a new problem, only when it supports the story.',
    '1sOgYNgq88E',
    12,
    49,
    ARRAY['Master and apply core concepts in: Contrast', 'Connect theory from undefined (TED-Ed) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 10 — Emotion, pacing and audience engagement'],
    ARRAY['storytelling', 'creative-writing', 'week-10', 'level-3'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000a05',
    v_course_id,
    'c0000000-0000-4000-8000-00000000010a',
    'w10-l5-emotional-audit',
    'Week 10 • Lesson 5: Emotional audit',
    'Ask what emotion each major beat is intended to create and whether the scene earns it.',
    'PJKeLD-vMvo',
    12,
    50,
    ARRAY['Master and apply core concepts in: Emotional audit', 'Connect theory from undefined (TED-Ed) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 10 — Emotion, pacing and audience engagement'],
    ARRAY['storytelling', 'creative-writing', 'week-10', 'level-3'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Module 11: Level 3: Emotion, tension and narrative control (Weeks 9–12): Week 11 — Theme, symbolism, metaphor and subtext
  INSERT INTO public.course_modules (
    id,
    course_id,
    title,
    description,
    order_index
  ) VALUES (
    'c0000000-0000-4000-8000-00000000010b',
    v_course_id,
    'Level 3: Emotion, tension and narrative control (Weeks 9–12): Week 11 — Theme, symbolism, metaphor and subtext',
    'Complete all 5 lessons and pass the weekly assessment (≥70%) to unlock the subsequent module.',
    11
  )
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000b01',
    v_course_id,
    'c0000000-0000-4000-8000-00000000010b',
    'w11-l1-theme-as-a-question',
    'Week 11 • Lesson 1: Theme as a question',
    'Turn a broad topic such as trust, ambition or belonging into a question a character must face.',
    '1uTRlM6MbMo',
    12,
    51,
    ARRAY['Master and apply core concepts in: Theme as a question', 'Connect theory from undefined (TED-Ed) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 11 — Theme, symbolism, metaphor and subtext'],
    ARRAY['storytelling', 'creative-writing', 'week-11', 'level-3'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000b02',
    v_course_id,
    'c0000000-0000-4000-8000-00000000010b',
    'w11-l2-theme-through-choice',
    'Week 11 • Lesson 2: Theme through choice',
    'Make the protagonist''s decision reveal the story''s central question. Avoid adding a speech that explains the moral.',
    'EMbZ72cCAzI',
    12,
    52,
    ARRAY['Master and apply core concepts in: Theme through choice', 'Connect theory from undefined (TED-Ed) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 11 — Theme, symbolism, metaphor and subtext'],
    ARRAY['storytelling', 'creative-writing', 'week-11', 'level-3'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000b03',
    v_course_id,
    'c0000000-0000-4000-8000-00000000010b',
    'w11-l3-motif',
    'Week 11 • Lesson 3: Motif',
    'Select an object, image, sound or repeated action that changes meaning as the story progresses.',
    'JOs-q7rXqdk',
    12,
    53,
    ARRAY['Master and apply core concepts in: Motif', 'Connect theory from undefined (TED-Ed) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 11 — Theme, symbolism, metaphor and subtext'],
    ARRAY['storytelling', 'creative-writing', 'week-11', 'level-3'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000b04',
    v_course_id,
    'c0000000-0000-4000-8000-00000000010b',
    'w11-l4-metaphor',
    'Week 11 • Lesson 4: Metaphor',
    'Use one meaningful comparison to clarify an emotional or abstract experience. Remove decorative metaphors that confuse the scene.',
    'G3hXvByzLHs',
    12,
    54,
    ARRAY['Master and apply core concepts in: Metaphor', 'Connect theory from undefined (TED-Ed) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 11 — Theme, symbolism, metaphor and subtext'],
    ARRAY['storytelling', 'creative-writing', 'week-11', 'level-3'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000b05',
    v_course_id,
    'c0000000-0000-4000-8000-00000000010b',
    'w11-l5-subtext-analysis',
    'Week 11 • Lesson 5: Subtext analysis',
    'Analyse a scene where characters do not say exactly what they mean. Write what is spoken and what is implied.',
    'mGugp5qs6Vg',
    12,
    55,
    ARRAY['Master and apply core concepts in: Subtext analysis', 'Connect theory from undefined (TED-Ed) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 11 — Theme, symbolism, metaphor and subtext'],
    ARRAY['storytelling', 'creative-writing', 'week-11', 'level-3'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Module 12: Level 3: Emotion, tension and narrative control (Weeks 9–12): Week 12 — Foreshadowing, twists and multiple timelines
  INSERT INTO public.course_modules (
    id,
    course_id,
    title,
    description,
    order_index
  ) VALUES (
    'c0000000-0000-4000-8000-00000000010c',
    v_course_id,
    'Level 3: Emotion, tension and narrative control (Weeks 9–12): Week 12 — Foreshadowing, twists and multiple timelines',
    'Complete all 5 lessons and pass the weekly assessment (≥70%) to unlock the subsequent module.',
    12
  )
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000c01',
    v_course_id,
    'c0000000-0000-4000-8000-00000000010c',
    'w12-l1-foreshadowing',
    'Week 12 • Lesson 1: Foreshadowing',
    'Plant one clue early that becomes meaningful later. It should be visible in hindsight but not announce the answer.',
    'bw5tzcoEG88',
    12,
    56,
    ARRAY['Master and apply core concepts in: Foreshadowing', 'Connect theory from undefined (TED-Ed) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 12 — Foreshadowing, twists and multiple timelines'],
    ARRAY['storytelling', 'creative-writing', 'week-12', 'level-3'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000c02',
    v_course_id,
    'c0000000-0000-4000-8000-00000000010c',
    'w12-l2-payoff',
    'Week 12 • Lesson 2: Payoff',
    'Connect a detail introduced earlier to a later action, decision or revelation.',
    '1nYFpuc2Umk',
    12,
    57,
    ARRAY['Master and apply core concepts in: Payoff', 'Connect theory from undefined (TEDx Talks) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 12 — Foreshadowing, twists and multiple timelines'],
    ARRAY['storytelling', 'creative-writing', 'week-12', 'level-3'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000c03',
    v_course_id,
    'c0000000-0000-4000-8000-00000000010c',
    'w12-l3-fair-twists',
    'Week 12 • Lesson 3: Fair twists',
    'Create a twist that changes interpretation without contradicting established facts.',
    'Nj-hdQMa3uA',
    12,
    58,
    ARRAY['Master and apply core concepts in: Fair twists', 'Connect theory from undefined (TEDx Talks) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 12 — Foreshadowing, twists and multiple timelines'],
    ARRAY['storytelling', 'creative-writing', 'week-12', 'level-3'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000c04',
    v_course_id,
    'c0000000-0000-4000-8000-00000000010c',
    'w12-l4-timeline',
    'Week 12 • Lesson 4: Timeline',
    'Write a short story in chronological order, then rearrange it using a flashback or delayed reveal. Compare both versions.',
    'Iwpi1Lm6dFo',
    12,
    59,
    ARRAY['Master and apply core concepts in: Timeline', 'Connect theory from undefined (TEDx Talks) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 12 — Foreshadowing, twists and multiple timelines'],
    ARRAY['storytelling', 'creative-writing', 'week-12', 'level-3'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000c05',
    v_course_id,
    'c0000000-0000-4000-8000-00000000010c',
    'w12-l5-reader-fairness',
    'Week 12 • Lesson 5: Reader fairness',
    'Check whether the narrator hid information unfairly, whether clues were available and whether the ending feels earned.',
    'Oo2upU6ny-I',
    12,
    60,
    ARRAY['Master and apply core concepts in: Reader fairness', 'Connect theory from undefined (TED) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 12 — Foreshadowing, twists and multiple timelines'],
    ARRAY['storytelling', 'creative-writing', 'week-12', 'level-3'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Module 13: Level 4: Real-life, oral, visual and persuasive formats (Weeks 13–16): Week 13 — Personal and true storytelling
  INSERT INTO public.course_modules (
    id,
    course_id,
    title,
    description,
    order_index
  ) VALUES (
    'c0000000-0000-4000-8000-00000000010d',
    v_course_id,
    'Level 4: Real-life, oral, visual and persuasive formats (Weeks 13–16): Week 13 — Personal and true storytelling',
    'Complete all 5 lessons and pass the weekly assessment (≥70%) to unlock the subsequent module.',
    13
  )
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000d01',
    v_course_id,
    'c0000000-0000-4000-8000-00000000010d',
    'w13-l1-life-map',
    'Week 13 • Lesson 1: Life map',
    'List meaningful moments, decisions, failures, discoveries and changes. Choose a story that is yours to tell.',
    'ZQTQSbjecLg',
    12,
    61,
    ARRAY['Master and apply core concepts in: Life map', 'Connect theory from undefined (TED-Ed) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 13 — Personal and true storytelling'],
    ARRAY['storytelling', 'creative-writing', 'week-13', 'level-4'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000d02',
    v_course_id,
    'c0000000-0000-4000-8000-00000000010d',
    'w13-l2-the-central-moment',
    'Week 13 • Lesson 2: The central moment',
    'Select one moment rather than summarising your entire life. Identify what you wanted and what was at risk.',
    'MEUh_y1IFZY',
    12,
    62,
    ARRAY['Master and apply core concepts in: The central moment', 'Connect theory from undefined (Brandon Sanderson) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 13 — Personal and true storytelling'],
    ARRAY['storytelling', 'creative-writing', 'week-13', 'level-4'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000d03',
    v_course_id,
    'c0000000-0000-4000-8000-00000000010d',
    'w13-l3-scene-and-reflection',
    'Week 13 • Lesson 3: Scene and reflection',
    'Rebuild the event with concrete details, then add only the reflection needed to help the audience understand its meaning.',
    'W1afbpM80b0',
    12,
    63,
    ARRAY['Master and apply core concepts in: Scene and reflection', 'Connect theory from undefined (Brandon Sanderson) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 13 — Personal and true storytelling'],
    ARRAY['storytelling', 'creative-writing', 'week-13', 'level-4'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000d04',
    v_course_id,
    'c0000000-0000-4000-8000-00000000010d',
    'w13-l4-truth-and-boundaries',
    'Week 13 • Lesson 4: Truth and boundaries',
    'Separate memory from certainty. Change or omit identifying details when appropriate. Do not fabricate dialogue or events and present them as fact.',
    'ATNvOk5rIJA',
    12,
    64,
    ARRAY['Master and apply core concepts in: Truth and boundaries', 'Connect theory from undefined (Brandon Sanderson) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 13 — Personal and true storytelling'],
    ARRAY['storytelling', 'creative-writing', 'week-13', 'level-4'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000d05',
    v_course_id,
    'c0000000-0000-4000-8000-00000000010d',
    'w13-l5-first-person-performance',
    'Week 13 • Lesson 5: First-person performance',
    'Tell the story in three minutes. Ask a listener what moment stayed with them and what they did not understand.',
    'V2KpWOLTXx8',
    12,
    65,
    ARRAY['Master and apply core concepts in: First-person performance', 'Connect theory from undefined (Brandon Sanderson) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 13 — Personal and true storytelling'],
    ARRAY['storytelling', 'creative-writing', 'week-13', 'level-4'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Module 14: Level 4: Real-life, oral, visual and persuasive formats (Weeks 13–16): Week 14 — Oral storytelling and delivery
  INSERT INTO public.course_modules (
    id,
    course_id,
    title,
    description,
    order_index
  ) VALUES (
    'c0000000-0000-4000-8000-00000000010e',
    v_course_id,
    'Level 4: Real-life, oral, visual and persuasive formats (Weeks 13–16): Week 14 — Oral storytelling and delivery',
    'Complete all 5 lessons and pass the weekly assessment (≥70%) to unlock the subsequent module.',
    14
  )
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000e01',
    v_course_id,
    'c0000000-0000-4000-8000-00000000010e',
    'w14-l1-voice-baseline',
    'Week 14 • Lesson 1: Voice baseline',
    'Record a one-minute story. Listen for pace, clarity, filler words, volume and sentence endings.',
    'MEjgDeSnBMs',
    12,
    66,
    ARRAY['Master and apply core concepts in: Voice baseline', 'Connect theory from undefined (TED-Ed) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 14 — Oral storytelling and delivery'],
    ARRAY['storytelling', 'creative-writing', 'week-14', 'level-4'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000e02',
    v_course_id,
    'c0000000-0000-4000-8000-00000000010e',
    'w14-l2-vocal-choices',
    'Week 14 • Lesson 2: Vocal choices',
    'Repeat the same paragraph with three different intentions. Use pauses and emphasis, not theatrical shouting.',
    'Hhk4N9A0oCA',
    12,
    67,
    ARRAY['Master and apply core concepts in: Vocal choices', 'Connect theory from undefined (TED-Ed) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 14 — Oral storytelling and delivery'],
    ARRAY['storytelling', 'creative-writing', 'week-14', 'level-4'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000e03',
    v_course_id,
    'c0000000-0000-4000-8000-00000000010e',
    'w14-l3-physical-delivery',
    'Week 14 • Lesson 3: Physical delivery',
    'Practise standing or sitting naturally. Use gestures to clarify action, not to decorate every sentence.',
    'Qgbsz7Gnrd8',
    12,
    68,
    ARRAY['Master and apply core concepts in: Physical delivery', 'Connect theory from undefined (Brandon Sanderson) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 14 — Oral storytelling and delivery'],
    ARRAY['storytelling', 'creative-writing', 'week-14', 'level-4'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000e04',
    v_course_id,
    'c0000000-0000-4000-8000-00000000010e',
    'w14-l4-memory-structure',
    'Week 14 • Lesson 4: Memory structure',
    'Reduce your script to five cue words or beats. Tell the story from the beats instead of memorising every line.',
    '0cf-qdZ7GbA',
    12,
    69,
    ARRAY['Master and apply core concepts in: Memory structure', 'Connect theory from undefined (Brandon Sanderson) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 14 — Oral storytelling and delivery'],
    ARRAY['storytelling', 'creative-writing', 'week-14', 'level-4'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000e05',
    v_course_id,
    'c0000000-0000-4000-8000-00000000010e',
    'w14-l5-audience-test',
    'Week 14 • Lesson 5: Audience test',
    'Deliver a three-minute version to a person or camera. Ask them to summarise the story and identify its turning point.',
    'jrIogch5DBU',
    12,
    70,
    ARRAY['Master and apply core concepts in: Audience test', 'Connect theory from undefined (Brandon Sanderson) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 14 — Oral storytelling and delivery'],
    ARRAY['storytelling', 'creative-writing', 'week-14', 'level-4'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Module 15: Level 4: Real-life, oral, visual and persuasive formats (Weeks 13–16): Week 15 — Visual and video storytelling
  INSERT INTO public.course_modules (
    id,
    course_id,
    title,
    description,
    order_index
  ) VALUES (
    'c0000000-0000-4000-8000-00000000010f',
    v_course_id,
    'Level 4: Real-life, oral, visual and persuasive formats (Weeks 13–16): Week 15 — Visual and video storytelling',
    'Complete all 5 lessons and pass the weekly assessment (≥70%) to unlock the subsequent module.',
    15
  )
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000f01',
    v_course_id,
    'c0000000-0000-4000-8000-00000000010f',
    'w15-l1-show-without-words',
    'Week 15 • Lesson 1: Show without words',
    'Describe a character''s emotion using only action and visual detail. Do not use explanatory narration.',
    'AvtOY0YrF-g',
    12,
    71,
    ARRAY['Master and apply core concepts in: Show without words', 'Connect theory from undefined (Lessons from the Screenplay) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 15 — Visual and video storytelling'],
    ARRAY['storytelling', 'creative-writing', 'week-15', 'level-4'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000f02',
    v_course_id,
    'c0000000-0000-4000-8000-00000000010f',
    'w15-l2-shot-sizes',
    'Week 15 • Lesson 2: Shot sizes',
    'Learn wide, medium and close-up shots. Decide what information each shot gives the audience.',
    'NdSGZ-RNdTw',
    12,
    72,
    ARRAY['Master and apply core concepts in: Shot sizes', 'Connect theory from undefined (Lessons from the Screenplay) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 15 — Visual and video storytelling'],
    ARRAY['storytelling', 'creative-writing', 'week-15', 'level-4'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000f03',
    v_course_id,
    'c0000000-0000-4000-8000-00000000010f',
    'w15-l3-storyboard',
    'Week 15 • Lesson 3: Storyboard',
    'Draw or write six frames showing a character''s goal, obstacle and change. Simple stick figures are enough.',
    'xjKruwAfZWk',
    12,
    73,
    ARRAY['Master and apply core concepts in: Storyboard', 'Connect theory from undefined (TED-Ed) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 15 — Visual and video storytelling'],
    ARRAY['storytelling', 'creative-writing', 'week-15', 'level-4'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000f04',
    v_course_id,
    'c0000000-0000-4000-8000-00000000010f',
    'w15-l4-edit-and-sound',
    'Week 15 • Lesson 4: Edit and sound',
    'Record a sequence on your phone. Notice how order, pause, ambient sound and cut length change meaning.',
    '1NCiuI6F5O0',
    12,
    74,
    ARRAY['Master and apply core concepts in: Edit and sound', 'Connect theory from undefined (Brandon Sanderson) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 15 — Visual and video storytelling'],
    ARRAY['storytelling', 'creative-writing', 'week-15', 'level-4'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000000f05',
    v_course_id,
    'c0000000-0000-4000-8000-00000000010f',
    'w15-l5-rough-cut-review',
    'Week 15 • Lesson 5: Rough cut review',
    'Make a 30–60 second visual story. Show it without explaining it and ask what the viewer understood.',
    'zVXFNw-xz3Y',
    12,
    75,
    ARRAY['Master and apply core concepts in: Rough cut review', 'Connect theory from undefined (Brandon Sanderson) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 15 — Visual and video storytelling'],
    ARRAY['storytelling', 'creative-writing', 'week-15', 'level-4'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Module 16: Level 4: Real-life, oral, visual and persuasive formats (Weeks 13–16): Week 16 — Explanatory, business and persuasive storytelling
  INSERT INTO public.course_modules (
    id,
    course_id,
    title,
    description,
    order_index
  ) VALUES (
    'c0000000-0000-4000-8000-000000000110',
    v_course_id,
    'Level 4: Real-life, oral, visual and persuasive formats (Weeks 13–16): Week 16 — Explanatory, business and persuasive storytelling',
    'Complete all 5 lessons and pass the weekly assessment (≥70%) to unlock the subsequent module.',
    16
  )
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000001001',
    v_course_id,
    'c0000000-0000-4000-8000-000000000110',
    'w16-l1-audience-first',
    'Week 16 • Lesson 1: Audience first',
    'Identify what the audience already knows, what they need and what decision or understanding you want to support.',
    'he3x5flTFPg',
    12,
    76,
    ARRAY['Master and apply core concepts in: Audience first', 'Connect theory from undefined (Lessons from the Screenplay) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 16 — Explanatory, business and persuasive storytelling'],
    ARRAY['storytelling', 'creative-writing', 'week-16', 'level-4'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000001002',
    v_course_id,
    'c0000000-0000-4000-8000-000000000110',
    'w16-l2-explain-a-complex-idea',
    'Week 16 • Lesson 2: Explain a complex idea',
    'Choose a concept from study, technology or everyday life. Explain it using a person, problem and consequence.',
    'RZFYuX84n1U',
    12,
    77,
    ARRAY['Master and apply core concepts in: Explain a complex idea', 'Connect theory from undefined (TED-Ed) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 16 — Explanatory, business and persuasive storytelling'],
    ARRAY['storytelling', 'creative-writing', 'week-16', 'level-4'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000001003',
    v_course_id,
    'c0000000-0000-4000-8000-000000000110',
    'w16-l3-evidence-and-story',
    'Week 16 • Lesson 3: Evidence and story',
    'Pair an illustrative story with accurate facts. Make clear which details are examples and which are verified claims.',
    'NSL55lOwznU',
    12,
    78,
    ARRAY['Master and apply core concepts in: Evidence and story', 'Connect theory from undefined (TED-Ed) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 16 — Explanatory, business and persuasive storytelling'],
    ARRAY['storytelling', 'creative-writing', 'week-16', 'level-4'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000001004',
    v_course_id,
    'c0000000-0000-4000-8000-000000000110',
    'w16-l4-persuasive-structure',
    'Week 16 • Lesson 4: Persuasive structure',
    'Build a short talk: problem, why it matters, evidence/example, proposed action and consequence.',
    'IiR-bnCHIYo',
    12,
    79,
    ARRAY['Master and apply core concepts in: Persuasive structure', 'Connect theory from undefined (TED-Ed) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 16 — Explanatory, business and persuasive storytelling'],
    ARRAY['storytelling', 'creative-writing', 'week-16', 'level-4'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000001005',
    v_course_id,
    'c0000000-0000-4000-8000-000000000110',
    'w16-l5-delivery-and-critique',
    'Week 16 • Lesson 5: Delivery and critique',
    'Give a three-minute presentation. Ask whether the evidence supports the conclusion and whether the requested action is clear.',
    'tqg6RO8c_W0',
    12,
    80,
    ARRAY['Master and apply core concepts in: Delivery and critique', 'Connect theory from undefined (TED-Ed) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 16 — Explanatory, business and persuasive storytelling'],
    ARRAY['storytelling', 'creative-writing', 'week-16', 'level-4'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Module 17: Level 5: Advanced narrative craft and capstone (Weeks 17–20): Week 17 — Nonlinear narratives and multiple perspectives
  INSERT INTO public.course_modules (
    id,
    course_id,
    title,
    description,
    order_index
  ) VALUES (
    'c0000000-0000-4000-8000-000000000111',
    v_course_id,
    'Level 5: Advanced narrative craft and capstone (Weeks 17–20): Week 17 — Nonlinear narratives and multiple perspectives',
    'Complete all 5 lessons and pass the weekly assessment (≥70%) to unlock the subsequent module.',
    17
  )
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000001101',
    v_course_id,
    'c0000000-0000-4000-8000-000000000111',
    'w17-l1-multiple-perspectives',
    'Week 17 • Lesson 1: Multiple perspectives',
    'Retell one conflict from two characters'' points of view. Give each a coherent, incomplete understanding.',
    '74snIJ2eu7A',
    12,
    81,
    ARRAY['Master and apply core concepts in: Multiple perspectives', 'Connect theory from undefined (Khan Academy Labs) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 17 — Nonlinear narratives and multiple perspectives'],
    ARRAY['storytelling', 'creative-writing', 'week-17', 'level-5'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000001102',
    v_course_id,
    'c0000000-0000-4000-8000-000000000111',
    'w17-l2-unreliable-narrator',
    'Week 17 • Lesson 2: Unreliable narrator',
    'Write a narrator who misinterprets an event. Plant fair evidence that allows the audience to notice the gap.',
    'a3Lx9zlzCQk',
    12,
    82,
    ARRAY['Master and apply core concepts in: Unreliable narrator', 'Connect theory from undefined (StudioBinder Academy) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 17 — Nonlinear narratives and multiple perspectives'],
    ARRAY['storytelling', 'creative-writing', 'week-17', 'level-5'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000001103',
    v_course_id,
    'c0000000-0000-4000-8000-000000000111',
    'w17-l3-nonlinear-order',
    'Week 17 • Lesson 3: Nonlinear order',
    'Write a short event chronologically, then reorder scenes to create a purposeful question or reveal.',
    'lINVnA3rVIE',
    12,
    83,
    ARRAY['Master and apply core concepts in: Nonlinear order', 'Connect theory from undefined (StudioBinder) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 17 — Nonlinear narratives and multiple perspectives'],
    ARRAY['storytelling', 'creative-writing', 'week-17', 'level-5'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000001104',
    v_course_id,
    'c0000000-0000-4000-8000-000000000111',
    'w17-l4-frame-narrative',
    'Week 17 • Lesson 4: Frame narrative',
    'Place a smaller story inside a larger one. Define why the outer narrator is telling it.',
    'fJfE-HMfSkk',
    12,
    84,
    ARRAY['Master and apply core concepts in: Frame narrative', 'Connect theory from undefined (Brandon Sanderson) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 17 — Nonlinear narratives and multiple perspectives'],
    ARRAY['storytelling', 'creative-writing', 'week-17', 'level-5'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000001105',
    v_course_id,
    'c0000000-0000-4000-8000-000000000111',
    'w17-l5-clarity-check',
    'Week 17 • Lesson 5: Clarity check',
    'Ask a reader to map who knows what and when. Fix confusion that does not create intended mystery.',
    '-f0biNdwifI',
    12,
    85,
    ARRAY['Master and apply core concepts in: Clarity check', 'Connect theory from undefined (Brandon Sanderson) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 17 — Nonlinear narratives and multiple perspectives'],
    ARRAY['storytelling', 'creative-writing', 'week-17', 'level-5'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Module 18: Level 5: Advanced narrative craft and capstone (Weeks 17–20): Week 18 — Narrative psychology, culture and ethical storytelling
  INSERT INTO public.course_modules (
    id,
    course_id,
    title,
    description,
    order_index
  ) VALUES (
    'c0000000-0000-4000-8000-000000000112',
    v_course_id,
    'Level 5: Advanced narrative craft and capstone (Weeks 17–20): Week 18 — Narrative psychology, culture and ethical storytelling',
    'Complete all 5 lessons and pass the weekly assessment (≥70%) to unlock the subsequent module.',
    18
  )
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000001201',
    v_course_id,
    'c0000000-0000-4000-8000-000000000112',
    'w18-l1-audience-expectations',
    'Week 18 • Lesson 1: Audience expectations',
    'Identify what an audience may assume based on genre, setting, character role or opening image.',
    'D9Ihs241zeg',
    12,
    86,
    ARRAY['Master and apply core concepts in: Audience expectations', 'Connect theory from undefined (TED) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 18 — Narrative psychology, culture and ethical storytelling'],
    ARRAY['storytelling', 'creative-writing', 'week-18', 'level-5'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000001202',
    v_course_id,
    'c0000000-0000-4000-8000-000000000112',
    'w18-l2-empathy-without-simplification',
    'Week 18 • Lesson 2: Empathy without simplification',
    'Give a character understandable motives without excusing harmful actions or flattening other people.',
    'iCvmsMzlF7o',
    12,
    87,
    ARRAY['Master and apply core concepts in: Empathy without simplification', 'Connect theory from undefined (TED) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 18 — Narrative psychology, culture and ethical storytelling'],
    ARRAY['storytelling', 'creative-writing', 'week-18', 'level-5'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000001203',
    v_course_id,
    'c0000000-0000-4000-8000-000000000112',
    'w18-l3-cultural-specificity',
    'Week 18 • Lesson 3: Cultural specificity',
    'Use culturally specific detail accurately. Avoid making one character or community represent an entire group.',
    'hg3umXU_qWc',
    12,
    88,
    ARRAY['Master and apply core concepts in: Cultural specificity', 'Connect theory from undefined (TEDx Talks) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 18 — Narrative psychology, culture and ethical storytelling'],
    ARRAY['storytelling', 'creative-writing', 'week-18', 'level-5'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000001204',
    v_course_id,
    'c0000000-0000-4000-8000-000000000112',
    'w18-l4-ethical-true-stories',
    'Week 18 • Lesson 4: Ethical true stories',
    'Check consent, privacy, power differences, accuracy and possible harm when telling stories involving real people.',
    'yg16u_bzjPE',
    12,
    89,
    ARRAY['Master and apply core concepts in: Ethical true stories', 'Connect theory from undefined (TED-Ed) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 18 — Narrative psychology, culture and ethical storytelling'],
    ARRAY['storytelling', 'creative-writing', 'week-18', 'level-5'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000001205',
    v_course_id,
    'c0000000-0000-4000-8000-000000000112',
    'w18-l5-persuasion-audit',
    'Week 18 • Lesson 5: Persuasion audit',
    'Review a persuasive story. Identify any missing context, emotional pressure or unsupported claim.',
    'TfVmW6sNux8',
    12,
    90,
    ARRAY['Master and apply core concepts in: Persuasion audit', 'Connect theory from undefined (TED-Ed) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 18 — Narrative psychology, culture and ethical storytelling'],
    ARRAY['storytelling', 'creative-writing', 'week-18', 'level-5'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Module 19: Level 5: Advanced narrative craft and capstone (Weeks 17–20): Week 19 — Revision, adaptation and professional craft
  INSERT INTO public.course_modules (
    id,
    course_id,
    title,
    description,
    order_index
  ) VALUES (
    'c0000000-0000-4000-8000-000000000113',
    v_course_id,
    'Level 5: Advanced narrative craft and capstone (Weeks 17–20): Week 19 — Revision, adaptation and professional craft',
    'Complete all 5 lessons and pass the weekly assessment (≥70%) to unlock the subsequent module.',
    19
  )
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000001301',
    v_course_id,
    'c0000000-0000-4000-8000-000000000113',
    'w19-l1-structural-revision',
    'Week 19 • Lesson 1: Structural revision',
    'Read an old draft and identify the real protagonist, goal, conflict, stakes and change. Fix structure before polishing sentences.',
    '0snNB1yS3IE',
    12,
    91,
    ARRAY['Master and apply core concepts in: Structural revision', 'Connect theory from undefined (TED) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 19 — Revision, adaptation and professional craft'],
    ARRAY['storytelling', 'creative-writing', 'week-19', 'level-5'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000001302',
    v_course_id,
    'c0000000-0000-4000-8000-000000000113',
    'w19-l2-scene-revision',
    'Week 19 • Lesson 2: Scene revision',
    'Remove repetitive scenes, strengthen cause and effect, and ensure each scene changes the situation.',
    'Us70DN2XSfM',
    12,
    92,
    ARRAY['Master and apply core concepts in: Scene revision', 'Connect theory from undefined (TED) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 19 — Revision, adaptation and professional craft'],
    ARRAY['storytelling', 'creative-writing', 'week-19', 'level-5'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000001303',
    v_course_id,
    'c0000000-0000-4000-8000-000000000113',
    'w19-l3-line-editing',
    'Week 19 • Lesson 3: Line editing',
    'Improve clarity, rhythm, specific verbs, dialogue and unnecessary explanation. Preserve your natural voice.',
    'QTxvzkwVsQE',
    12,
    93,
    ARRAY['Master and apply core concepts in: Line editing', 'Connect theory from undefined (Lessons from the Screenplay) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 19 — Revision, adaptation and professional craft'],
    ARRAY['storytelling', 'creative-writing', 'week-19', 'level-5'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000001304',
    v_course_id,
    'c0000000-0000-4000-8000-000000000113',
    'w19-l4-adaptation',
    'Week 19 • Lesson 4: Adaptation',
    'Adapt one story into a 300-word written version, a 90-second spoken version and a six-frame storyboard. Preserve the central meaning, not every sentence.',
    'iSAzw6zOyfo',
    12,
    94,
    ARRAY['Master and apply core concepts in: Adaptation', 'Connect theory from undefined (Louisiana Channel) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 19 — Revision, adaptation and professional craft'],
    ARRAY['storytelling', 'creative-writing', 'week-19', 'level-5'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000001305',
    v_course_id,
    'c0000000-0000-4000-8000-000000000113',
    'w19-l5-feedback-and-pitch',
    'Week 19 • Lesson 5: Feedback and pitch',
    'Ask a reviewer what they understood, where they lost interest and what felt most meaningful. Deliver a two-minute pitch and record feedback.',
    'XEvuTQArdUA',
    12,
    95,
    ARRAY['Master and apply core concepts in: Feedback and pitch', 'Connect theory from undefined (Emory University) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 19 — Revision, adaptation and professional craft'],
    ARRAY['storytelling', 'creative-writing', 'week-19', 'level-5'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Module 20: Level 5: Advanced narrative craft and capstone (Weeks 17–20): Week 20 — Capstone, portfolio and final assessment
  INSERT INTO public.course_modules (
    id,
    course_id,
    title,
    description,
    order_index
  ) VALUES (
    'c0000000-0000-4000-8000-000000000114',
    v_course_id,
    'Level 5: Advanced narrative craft and capstone (Weeks 17–20): Week 20 — Capstone, portfolio and final assessment',
    'Complete all 5 lessons and pass the weekly assessment (≥70%) to unlock the subsequent module.',
    20
  )
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000001401',
    v_course_id,
    'c0000000-0000-4000-8000-000000000114',
    'w20-l1-select-and-plan',
    'Week 20 • Lesson 1: Select and plan',
    'Choose one original story or central idea. Write the premise, audience, intended effect and format plan.',
    'KxDwieKpawg',
    12,
    96,
    ARRAY['Master and apply core concepts in: Select and plan', 'Connect theory from undefined (TED) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 20 — Capstone, portfolio and final assessment'],
    ARRAY['storytelling', 'creative-writing', 'week-20', 'level-5'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000001402',
    v_course_id,
    'c0000000-0000-4000-8000-000000000114',
    'w20-l2-create-the-written-piece',
    'Week 20 • Lesson 2: Create the written piece',
    'Produce a polished 1,000–1,500 word story or equivalent script. Focus on a clear character, conflict, stakes and change.',
    'eIho2S0ZahI',
    12,
    97,
    ARRAY['Master and apply core concepts in: Create the written piece', 'Connect theory from undefined (TED) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 20 — Capstone, portfolio and final assessment'],
    ARRAY['storytelling', 'creative-writing', 'week-20', 'level-5'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000001403',
    v_course_id,
    'c0000000-0000-4000-8000-000000000114',
    'w20-l3-create-the-oral-version',
    'Week 20 • Lesson 3: Create the oral version',
    'Adapt the work into a three-to-five-minute performance. Practise from beats, not a memorised paragraph-by-paragraph script.',
    '-FOCpMAww28',
    12,
    98,
    ARRAY['Master and apply core concepts in: Create the oral version', 'Connect theory from undefined (TED) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 20 — Capstone, portfolio and final assessment'],
    ARRAY['storytelling', 'creative-writing', 'week-20', 'level-5'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000001404',
    v_course_id,
    'c0000000-0000-4000-8000-000000000114',
    'w20-l4-create-the-visual-version',
    'Week 20 • Lesson 4: Create the visual version',
    'Make a storyboard or a two-to-three-minute simple video. Use original, licensed or permission-cleared material.',
    '4_RUgnC1lm8',
    12,
    99,
    ARRAY['Master and apply core concepts in: Create the visual version', 'Connect theory from undefined (Case Western Reserve University) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 20 — Capstone, portfolio and final assessment'],
    ARRAY['storytelling', 'creative-writing', 'week-20', 'level-5'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'c0000000-0000-4000-8000-000000001405',
    v_course_id,
    'c0000000-0000-4000-8000-000000000114',
    'w20-l5-present-and-review',
    'Week 20 • Lesson 5: Present and review',
    'Share the written, spoken and visual pieces with a reviewer. Score yourself and write a final reflection identifying the next three skills to improve.',
    'plWexCID-kA',
    12,
    100,
    ARRAY['Master and apply core concepts in: Present and review', 'Connect theory from undefined (Lennie Ann) directly to narrative practice', 'Fulfill weekly assignment milestones for Week 20 — Capstone, portfolio and final assessment'],
    ARRAY['storytelling', 'creative-writing', 'week-20', 'level-5'],
    ARRAY['Narrative Architecture', 'Character Psychology', 'Bilingual English–Hindi Storytelling', 'Scene Execution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

END $$;
