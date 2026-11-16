begin;
do $$
declare first_reader uuid:=gen_random_uuid(); second_reader uuid:=gen_random_uuid(); test_doc uuid:=gen_random_uuid();
begin
  insert into auth.users(id,email) values(first_reader,first_reader::text||'@test.invalid'),(second_reader,second_reader::text||'@test.invalid');
  insert into public.study_documents(id,title,slug,original_filename,source_checksum,storage_key,page_count,is_published)
    values(test_doc,'RLS fixture',test_doc::text,'fixture.pdf',repeat('a',64),'fixture.pdf',2,true);
  perform public.save_study_progress(first_reader,test_doc,1);
  perform public.save_study_progress(second_reader,test_doc,2);
  perform public.toggle_study_bookmark(first_reader,test_doc,1,null);
  perform public.toggle_study_bookmark(second_reader,test_doc,2,null);
  perform set_config('request.jwt.claims',jsonb_build_object('sub',first_reader,'role','authenticated')::text,true);
end $$;
set local role authenticated;
do $$ begin
  if (select count(*) from public.user_study_progress)<>1 then raise exception 'Progress RLS isolation failed'; end if;
  if (select count(*) from public.user_study_bookmarks)<>1 then raise exception 'Bookmark RLS isolation failed'; end if;
  if (select last_page from public.user_study_progress limit 1)<>1 then raise exception 'Wrong reader state'; end if;
  if has_function_privilege('authenticated','public.save_study_progress(uuid,uuid,integer)','execute') then raise exception 'Service function exposed'; end if;
end $$;
reset role;
set local role anon;
do $$ declare denied boolean:=false; begin
  begin perform 1 from public.study_documents;
  exception when insufficient_privilege then denied:=true; end;
  if not denied then raise exception 'Anonymous document metadata access'; end if;
end $$;
reset role;
rollback;
select 'PASS: two-reader progress/bookmark RLS isolation and anonymous denial' as result;
