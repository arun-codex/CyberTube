-- Serialize page-state mutations with document replacement and concurrent readers.
create function public.save_study_progress(reader_id uuid,doc_id uuid,page integer) returns jsonb
language plpgsql set search_path='' as $$
declare doc public.study_documents; result public.user_study_progress;
begin
  select * into doc from public.study_documents where id=doc_id and is_published and retired_at is null for share;
  if not found then raise exception 'Document unavailable' using errcode='P0002'; end if;
  if page<1 or page>doc.page_count then raise exception 'Invalid page' using errcode='22023'; end if;
  insert into public.user_study_page_views(user_id,document_id,page_number) values(reader_id,doc_id,page) on conflict do nothing;
  insert into public.user_study_progress(user_id,document_id,last_page,highest_page,completion_percent,is_completed)
  values(reader_id,doc_id,page,page,round(page*100.0/doc.page_count,2),page>=doc.page_count)
  on conflict(user_id,document_id) do update set last_page=page,
    highest_page=greatest(public.user_study_progress.highest_page,page),
    completion_percent=round(greatest(public.user_study_progress.highest_page,page)*100.0/doc.page_count,2),
    is_completed=greatest(public.user_study_progress.highest_page,page)>=doc.page_count,
    revision=public.user_study_progress.revision+1,last_read_at=now(),updated_at=now()
  returning * into result;
  return to_jsonb(result);
end $$;

create function public.toggle_study_bookmark(reader_id uuid,doc_id uuid,page integer,bookmark_title text default null) returns boolean
language plpgsql set search_path='' as $$
declare doc public.study_documents; removed uuid;
begin
  select * into doc from public.study_documents where id=doc_id and is_published and retired_at is null for share;
  if not found then raise exception 'Document unavailable' using errcode='P0002'; end if;
  if page<1 or page>doc.page_count then raise exception 'Invalid page' using errcode='22023'; end if;
  perform pg_advisory_xact_lock(hashtextextended(reader_id::text||doc_id::text||page::text,0));
  delete from public.user_study_bookmarks where user_id=reader_id and document_id=doc_id and page_number=page returning id into removed;
  if removed is not null then return false; end if;
  insert into public.user_study_bookmarks(user_id,document_id,page_number,title) values(reader_id,doc_id,page,coalesce(bookmark_title,'Page '||page));
  return true;
end $$;
revoke all on function public.save_study_progress(uuid,uuid,integer),public.toggle_study_bookmark(uuid,uuid,integer,text) from public,anon,authenticated;
grant execute on function public.save_study_progress(uuid,uuid,integer),public.toggle_study_bookmark(uuid,uuid,integer,text) to service_role;
