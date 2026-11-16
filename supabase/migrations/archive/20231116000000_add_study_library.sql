-- Migration: Add study library tables
-- Table: study_categories
create table public.study_categories (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  description text,
  sort_order integer default 0,
  is_published boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Table: study_documents
create table public.study_documents (
  id uuid primary key default uuid_generate_v4(),
  category_id uuid references public.study_categories(id) on delete cascade,
  title text not null,
  slug text unique not null,
  description text,
  original_filename text not null,
  source_checksum text not null,
  storage_key text not null,
  page_count integer not null,
  thumbnail_key text,
  difficulty text,
  tags jsonb,
  sort_order integer default 0,
  is_published boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Table: study_document_pages
create table public.study_document_pages (
  id uuid primary key default uuid_generate_v4(),
  document_id uuid references public.study_documents(id) on delete cascade,
  page_number integer not null,
  private_asset_key text not null,
  width integer,
  height integer,
  processing_status text default 'pending',
  created_at timestamp with time zone default now()
);

-- Table: user_study_progress
create table public.user_study_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  document_id uuid references public.study_documents(id) on delete cascade,
  last_page integer not null,
  highest_page integer not null,
  completion_percent numeric(5,2) not null default 0,
  is_completed boolean default false,
  started_at timestamp with time zone default now(),
  last_read_at timestamp with time zone default now(),
  completed_at timestamp with time zone,
  updated_at timestamp with time zone default now(),
  revision bigint default 0
);

-- Table: user_study_page_views
create table public.user_study_page_views (
  user_id uuid references auth.users(id) on delete cascade,
  document_id uuid references public.study_documents(id) on delete cascade,
  page_number integer not null,
  viewed_at timestamp with time zone default now(),
  primary key (user_id, document_id, page_number)
);

-- Table: user_study_bookmarks
create table public.user_study_bookmarks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  document_id uuid references public.study_documents(id) on delete cascade,
  page_number integer,
  created_at timestamp with time zone default now()
);

-- RLS policies (basic placeholders)
alter table public.study_categories enable row level security;
create policy "allow read published" on public.study_categories for select using (is_published = true);
create policy "admin full access" on public.study_categories for all using (auth.role() = 'admin');

alter table public.study_documents enable row level security;
create policy "allow read published" on public.study_documents for select using (is_published = true);
create policy "admin full access" on public.study_documents for all using (auth.role() = 'admin');

alter table public.user_study_progress enable row level security;
create policy "user own" on public.user_study_progress for all using (auth.uid() = user_id);

alter table public.user_study_page_views enable row level security;
create policy "user own" on public.user_study_page_views for all using (auth.uid() = user_id);

alter table public.user_study_bookmarks enable row level security;
create policy "user own" on public.user_study_bookmarks for all using (auth.uid() = user_id);

-- Indexes for performance
create index idx_doc_category on public.study_documents(category_id);
create index idx_page_doc on public.study_document_pages(document_id);
create index idx_progress_user_doc on public.user_study_progress(user_id, document_id);
