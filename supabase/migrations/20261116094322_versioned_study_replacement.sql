alter table public.study_documents
  add column collection_slug text not null default 'bug-bounty',
  add column file_size bigint check(file_size > 0),
  add column validation_status text,
  add column retired_at timestamptz;
create index study_documents_collection_idx on public.study_documents(collection_slug);
create table public.study_import_runs (
  id text primary key, collection_slug text not null check(collection_slug='bug-bounty'),
  status text not null check(status in ('active','rolled-back')),
  manifest jsonb not null, backup jsonb not null, created_at timestamptz not null default now(), rolled_back_at timestamptz
);
alter table public.study_import_runs enable row level security;
revoke all on public.study_import_runs from public,anon,authenticated;
grant all on public.study_import_runs to service_role;
drop policy category_read_published on public.study_categories;
create policy category_read_published on public.study_categories for select to authenticated using
  (is_published or exists(select 1 from public.admin_users where user_id=(select auth.uid())));
drop policy document_read_published on public.study_documents;
create policy document_read_published on public.study_documents for select to authenticated using
  ((is_published and retired_at is null) or exists(select 1 from public.admin_users where user_id=(select auth.uid())));
revoke all on public.admin_users,public.study_categories,public.study_documents,public.user_study_progress,public.user_study_page_views,public.user_study_bookmarks from anon;
grant select on public.admin_users,public.study_categories,public.study_documents to authenticated;
grant select,insert,update,delete on public.user_study_progress,public.user_study_page_views,public.user_study_bookmarks to authenticated;
grant all on public.admin_users,public.study_categories,public.study_documents,public.user_study_progress,public.user_study_page_views,public.user_study_bookmarks to service_role;
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('original-pdfs','original-pdfs',false,104857600,array['application/pdf']) on conflict(id) do nothing;

create function public.study_collection_snapshot() returns jsonb language sql stable set search_path='' as $$
select jsonb_build_object(
  'documents',coalesce((select jsonb_agg(to_jsonb(d) order by d.id) from public.study_documents d where collection_slug='bug-bounty'),'[]'::jsonb),
  'progress',coalesce((select jsonb_agg(to_jsonb(p) order by p.id) from public.user_study_progress p join public.study_documents d on d.id=p.document_id where d.collection_slug='bug-bounty'),'[]'::jsonb),
  'bookmarks',coalesce((select jsonb_agg(to_jsonb(p) order by p.id) from public.user_study_bookmarks p join public.study_documents d on d.id=p.document_id where d.collection_slug='bug-bounty'),'[]'::jsonb),
  'page_views',coalesce((select jsonb_agg(to_jsonb(p) order by p.user_id,p.document_id,p.page_number) from public.user_study_page_views p join public.study_documents d on d.id=p.document_id where d.collection_slug='bug-bounty'),'[]'::jsonb));
$$;

create function public.replace_study_collection(run_id text,manifest jsonb,expected_documents jsonb) returns jsonb
language plpgsql set search_path='' as $$
declare item jsonb; previous public.study_documents; saved jsonb; prior public.study_import_runs;
begin
  perform pg_advisory_xact_lock(91261116);
  lock table public.study_documents in share row exclusive mode;
  lock table public.user_study_progress,public.user_study_bookmarks,public.user_study_page_views in share row exclusive mode;
  select * into prior from public.study_import_runs where id=run_id;
  if found then
    if prior.status='active' and prior.manifest=manifest then return jsonb_build_object('status','already-active'); end if;
    raise exception 'Run ID already used';
  end if;
  if jsonb_typeof(manifest) is distinct from 'array' or jsonb_array_length(manifest)=0 then raise exception 'Empty manifest'; end if;
  saved:=public.study_collection_snapshot();
  if saved->'documents' is distinct from expected_documents then raise exception 'Catalog changed; regenerate dry-run'; end if;
  if (select count(*) from jsonb_array_elements(manifest))<>(select count(distinct value->>'id') from jsonb_array_elements(manifest))
    or (select count(*) from jsonb_array_elements(manifest))<>(select count(distinct value->>'sha256') from jsonb_array_elements(manifest)) then raise exception 'Duplicate document'; end if;
  for item in select value from jsonb_array_elements(manifest) loop
    if (item->>'sha256' ~ '^[a-f0-9]{64}$') is distinct from true or item->>'id' is null
      or item->>'title' is null or item->>'slug' is null or item->>'category_id' is null
      or item->>'page_count' is null or (item->>'page_count')::integer<1
      or item->>'file_size' is null or (item->>'file_size')::bigint<1
      or item->>'original_filename' is null or item->>'validation_status' is distinct from 'verified'
      or item->>'storage_key' is distinct from ('bug-bounty/'||(item->>'sha256')||'.pdf') then raise exception 'Invalid metadata'; end if;
    select * into previous from public.study_documents where id=(item->>'id')::uuid;
    if found and previous.collection_slug<>'bug-bounty' then raise exception 'Wrong collection'; end if;
    if found and previous.source_checksum<>item->>'sha256' and not coalesce((item->>'preserve_progress')::boolean,false) then
      delete from public.user_study_progress where document_id=previous.id;
      delete from public.user_study_bookmarks where document_id=previous.id;
      delete from public.user_study_page_views where document_id=previous.id;
    end if;
    insert into public.study_documents(id,title,slug,original_filename,source_checksum,storage_key,page_count,file_size,category_id,collection_slug,validation_status,is_published,retired_at)
    values((item->>'id')::uuid,item->>'title',item->>'slug',item->>'original_filename',item->>'sha256',item->>'storage_key',
      (item->>'page_count')::integer,(item->>'file_size')::bigint,(item->>'category_id')::uuid,'bug-bounty','verified',true,null)
    on conflict(id) do update set title=excluded.title,original_filename=excluded.original_filename,source_checksum=excluded.source_checksum,
      storage_key=excluded.storage_key,page_count=excluded.page_count,file_size=excluded.file_size,category_id=excluded.category_id,
      thumbnail_key=null,validation_status='verified',is_published=true,retired_at=null,updated_at=now();
  end loop;
  update public.study_documents set is_published=false,retired_at=now(),updated_at=now() where collection_slug='bug-bounty'
    and id not in(select (value->>'id')::uuid from jsonb_array_elements(manifest));
  insert into public.study_import_runs(id,collection_slug,status,manifest,backup) values(run_id,'bug-bounty','active',manifest,saved);
  return jsonb_build_object('status','active','run_id',run_id,'documents',jsonb_array_length(manifest));
end $$;

create function public.rollback_study_collection(run_id text) returns jsonb language plpgsql set search_path='' as $$
declare saved public.study_import_runs; item jsonb;
begin
  perform pg_advisory_xact_lock(91261116);
  lock table public.study_documents in share row exclusive mode;
  lock table public.user_study_progress,public.user_study_bookmarks,public.user_study_page_views in share row exclusive mode;
  select * into saved from public.study_import_runs where id=run_id for update;
  if not found then raise exception 'Unknown import'; end if;
  if saved.status='rolled-back' then return jsonb_build_object('status','already-rolled-back'); end if;
  if exists(select 1 from public.study_import_runs where status='active' and created_at>saved.created_at) then raise exception 'Rollback newest import first'; end if;
  update public.study_import_runs set backup=backup||jsonb_build_object('before_rollback',public.study_collection_snapshot()) where id=run_id;
  update public.study_documents set is_published=false,retired_at=now() where collection_slug='bug-bounty';
  for item in select value from jsonb_array_elements(saved.backup->'documents') loop
    update public.study_documents d set title=r.title,slug=r.slug,description=r.description,original_filename=r.original_filename,source_checksum=r.source_checksum,
      storage_key=r.storage_key,page_count=r.page_count,file_size=r.file_size,category_id=r.category_id,thumbnail_key=r.thumbnail_key,
      validation_status=r.validation_status,is_published=r.is_published,retired_at=r.retired_at,updated_at=now()
    from jsonb_populate_record(null::public.study_documents,item) r where d.id=r.id;
  end loop;
  delete from public.user_study_progress where document_id in(select id from public.study_documents where collection_slug='bug-bounty');
  delete from public.user_study_bookmarks where document_id in(select id from public.study_documents where collection_slug='bug-bounty');
  delete from public.user_study_page_views where document_id in(select id from public.study_documents where collection_slug='bug-bounty');
  insert into public.user_study_progress select * from jsonb_populate_recordset(null::public.user_study_progress,saved.backup->'progress');
  insert into public.user_study_bookmarks select * from jsonb_populate_recordset(null::public.user_study_bookmarks,saved.backup->'bookmarks');
  insert into public.user_study_page_views select * from jsonb_populate_recordset(null::public.user_study_page_views,saved.backup->'page_views');
  update public.study_import_runs set status='rolled-back',rolled_back_at=now() where id=run_id;
  return jsonb_build_object('status','rolled-back');
end $$;
revoke all on function public.study_collection_snapshot(),public.replace_study_collection(text,jsonb,jsonb),public.rollback_study_collection(text) from public,anon,authenticated;
grant execute on function public.study_collection_snapshot(),public.replace_study_collection(text,jsonb,jsonb),public.rollback_study_collection(text) to service_role;
