-- Run against staging/local only. Every fixture and mutation rolls back.
begin;
do $$
declare
  test_doc_id uuid:=gen_random_uuid(); unrelated_id uuid:=gen_random_uuid(); test_user_id uuid:=gen_random_uuid();
  test_category_id uuid; saved jsonb; manifest jsonb; result jsonb; failed boolean:=false;
begin
  if has_function_privilege('anon','public.replace_study_collection(text,jsonb,jsonb)','execute')
    or has_function_privilege('authenticated','public.study_collection_snapshot()','execute') then raise exception 'Import privilege leak'; end if;
  if exists(select 1 from storage.buckets where id='original-pdfs' and public) then raise exception 'Public PDF bucket'; end if;
  select id into test_category_id from public.study_categories limit 1;
  insert into auth.users(id,email) values(test_user_id,test_user_id::text||'@study-test.invalid');
  insert into public.study_documents(id,title,slug,original_filename,source_checksum,storage_key,page_count,is_published,category_id)
    values(test_doc_id,'Old document',test_doc_id::text,'Old.pdf',repeat('a',64),'old.pdf',2,true,test_category_id);
  insert into public.study_documents(id,title,slug,original_filename,source_checksum,storage_key,page_count,is_published,collection_slug)
    values(unrelated_id,'Unrelated',unrelated_id::text,'Unrelated.pdf',repeat('c',64),'unrelated.pdf',1,true,'unrelated');
  insert into public.user_study_progress(user_id,document_id,last_page,highest_page) values(test_user_id,test_doc_id,2,2);
  insert into public.user_study_bookmarks(user_id,document_id,page_number) values(test_user_id,test_doc_id,2);
  perform public.save_study_progress(test_user_id,test_doc_id,2);
  perform public.save_study_progress(test_user_id,test_doc_id,1);
  if not exists(select 1 from public.user_study_progress p where p.document_id=test_doc_id and last_page=1 and highest_page=2) then raise exception 'Progress regressed'; end if;
  perform public.save_study_progress(test_user_id,test_doc_id,2);
  if public.toggle_study_bookmark(test_user_id,test_doc_id,2,null) then raise exception 'Existing bookmark not removed'; end if;
  if not public.toggle_study_bookmark(test_user_id,test_doc_id,2,null) then raise exception 'Bookmark not restored'; end if;
  failed:=false;
  begin
    perform public.save_study_progress(test_user_id,test_doc_id,3);
  exception when invalid_parameter_value then failed:=true; end;
  if not failed then raise exception 'Out of bounds page accepted'; end if;
  failed:=false;
  saved:=public.study_collection_snapshot();
  manifest:=jsonb_build_array(jsonb_build_object('id',test_doc_id,'title','New document','slug',test_doc_id,
    'original_filename','New.pdf','sha256',repeat('b',64),'storage_key','bug-bounty/'||repeat('b',64)||'.pdf',
    'page_count',1,'file_size',100,'category_id',test_category_id,'validation_status','verified','preserve_progress',false));
  begin
    perform public.replace_study_collection('test-invalid',manifest||manifest,saved->'documents');
  exception when others then failed:=true; end;
  if not failed then raise exception 'Duplicate manifest accepted'; end if;
  if (select source_checksum from public.study_documents where id=test_doc_id)<>repeat('a',64) then raise exception 'Failed import changed catalog'; end if;
  result:=public.replace_study_collection('test-import',manifest,saved->'documents');
  if result->>'status'<>'active' then raise exception 'Activation failed'; end if;
  if exists(select 1 from public.user_study_progress p where p.document_id=test_doc_id) then raise exception 'Unmapped progress was retained'; end if;
  if exists(select 1 from public.user_study_bookmarks p where p.document_id=test_doc_id) then raise exception 'Unmapped bookmark was retained'; end if;
  if not exists(select 1 from public.study_documents where id=unrelated_id and is_published) then raise exception 'Unrelated document changed'; end if;
  if public.replace_study_collection('test-import',manifest,saved->'documents')->>'status'<>'already-active' then raise exception 'Retry failed'; end if;
  perform public.rollback_study_collection('test-import');
  if not exists(select 1 from public.user_study_progress p where p.document_id=test_doc_id and last_page=2) then raise exception 'Progress not restored'; end if;
  if not exists(select 1 from public.user_study_bookmarks p where p.document_id=test_doc_id and page_number=2) then raise exception 'Bookmark not restored'; end if;
  if (select source_checksum from public.study_documents where id=test_doc_id)<>repeat('a',64) then raise exception 'Original reference not restored'; end if;
end $$;
rollback;
select 'PASS: activation, duplicate rejection, failure atomicity, retry, collection isolation, history reset and rollback, private access' as result;
