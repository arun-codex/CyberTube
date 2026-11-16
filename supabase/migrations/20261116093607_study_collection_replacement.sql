-- Migration: 20261116093607_study_collection_replacement.sql
-- Safely synchronizes all 34 repaired searchable bug bounty study materials

DO $$
BEGIN
  -- 1. Ensure categories exist
  INSERT INTO public.study_categories (id, slug, title, description, sort_order, is_published)
  VALUES (gen_random_uuid(), 'authentication-session-security', 'Authentication & Session Security', 'Authentication & Session Security study guides and checklists', 1, true)
  ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, sort_order = EXCLUDED.sort_order, is_published = EXCLUDED.is_published;

  INSERT INTO public.study_categories (id, slug, title, description, sort_order, is_published)
  VALUES (gen_random_uuid(), 'authorization-idor', 'Authorization & IDOR', 'Authorization & IDOR study guides and checklists', 2, true)
  ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, sort_order = EXCLUDED.sort_order, is_published = EXCLUDED.is_published;

  INSERT INTO public.study_categories (id, slug, title, description, sort_order, is_published)
  VALUES (gen_random_uuid(), 'business-logic-api-security', 'Business Logic & API Security', 'Business Logic & API Security study guides and checklists', 3, true)
  ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, sort_order = EXCLUDED.sort_order, is_published = EXCLUDED.is_published;

  INSERT INTO public.study_categories (id, slug, title, description, sort_order, is_published)
  VALUES (gen_random_uuid(), 'xss-client-side-security', 'XSS & Client-Side Security', 'XSS & Client-Side Security study guides and checklists', 4, true)
  ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, sort_order = EXCLUDED.sort_order, is_published = EXCLUDED.is_published;

  INSERT INTO public.study_categories (id, slug, title, description, sort_order, is_published)
  VALUES (gen_random_uuid(), 'file-upload-ssrf', 'File Upload & SSRF', 'File Upload & SSRF study guides and checklists', 5, true)
  ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, sort_order = EXCLUDED.sort_order, is_published = EXCLUDED.is_published;

  INSERT INTO public.study_categories (id, slug, title, description, sort_order, is_published)
  VALUES (gen_random_uuid(), 'other-materials', 'Other Materials', 'Other Materials study guides and checklists', 6, true)
  ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, sort_order = EXCLUDED.sort_order, is_published = EXCLUDED.is_published;

  INSERT INTO public.study_categories (id, slug, title, description, sort_order, is_published)
  VALUES (gen_random_uuid(), 'reconnaissance-methodology', 'Reconnaissance & Methodology', 'Reconnaissance & Methodology study guides and checklists', 7, true)
  ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, sort_order = EXCLUDED.sort_order, is_published = EXCLUDED.is_published;

  INSERT INTO public.study_categories (id, slug, title, description, sort_order, is_published)
  VALUES (gen_random_uuid(), 'bug-bounty-fundamentals', 'Bug Bounty Fundamentals', 'Bug Bounty Fundamentals study guides and checklists', 8, true)
  ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, sort_order = EXCLUDED.sort_order, is_published = EXCLUDED.is_published;

  -- 2. Insert or update documents with new SHA-256 checksums and storage keys
  -- Existing user_study_progress and user_study_bookmarks are strictly preserved
  -- Document: 2FA_BYPASS_SECURED.pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'authentication-session-security' LIMIT 1),
    '2FA BYPASS',
    '2fa-bypass-secured-pdf',
    'Comprehensive bug bounty study guide covering 2FA BYPASS with practical testing checklists.',
    '2FA_BYPASS_SECURED.pdf',
    '025e6c870a21bd16893fa59d9877328bf13f3cbf57081f25e8e78e2f57e14525',
    'study-materials/025e6c870a21bd16893fa59d9877328bf13f3cbf57081f25e8e78e2f57e14525.pdf',
    5,
    1,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Document: 403_BYPASS_SECURED.pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'authorization-idor' LIMIT 1),
    '403 BYPASS',
    '403-bypass-secured-pdf',
    'Comprehensive bug bounty study guide covering 403 BYPASS with practical testing checklists.',
    '403_BYPASS_SECURED.pdf',
    '556f41ba3bac512d920416cf3dd4adfe9557d54cf72260fb2dae65547a961347',
    'study-materials/556f41ba3bac512d920416cf3dd4adfe9557d54cf72260fb2dae65547a961347.pdf',
    11,
    2,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Document: adminpanal_secured.pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'authorization-idor' LIMIT 1),
    'Adminpanal',
    'adminpanal-secured-pdf',
    'Comprehensive bug bounty study guide covering Adminpanal with practical testing checklists.',
    'adminpanal_secured.pdf',
    '01f2f27bc4a62313969de214848204e5aac5e4c20f4741d0161af2143f3508ef',
    'study-materials/01f2f27bc4a62313969de214848204e5aac5e4c20f4741d0161af2143f3508ef.pdf',
    2,
    3,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Document: ATO_secured.pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'authentication-session-security' LIMIT 1),
    'ATO',
    'ato-secured-pdf',
    'Comprehensive bug bounty study guide covering ATO with practical testing checklists.',
    'ATO_secured.pdf',
    '1f4b754635939d04335663dc187779e31a900d3f13f6c1ad4d2c4726beb5ed04',
    'study-materials/1f4b754635939d04335663dc187779e31a900d3f13f6c1ad4d2c4726beb5ed04.pdf',
    3,
    4,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Document: AUTHENTICATION_(1)_SECURED.pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'authentication-session-security' LIMIT 1),
    'AUTHENTICATION (1)',
    'authentication-1-secured-pdf',
    'Comprehensive bug bounty study guide covering AUTHENTICATION (1) with practical testing checklists.',
    'AUTHENTICATION_(1)_SECURED.pdf',
    '33c46388c912edb4bcbbcb48fbe77856cf2491334e438e01323144c3a4ac8019',
    'study-materials/33c46388c912edb4bcbbcb48fbe77856cf2491334e438e01323144c3a4ac8019.pdf',
    2,
    5,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Document: AUTHENTICATION_SECURED.pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'authentication-session-security' LIMIT 1),
    'AUTHENTICATION',
    'authentication-secured-pdf',
    'Comprehensive bug bounty study guide covering AUTHENTICATION with practical testing checklists.',
    'AUTHENTICATION_SECURED.pdf',
    'e3952147b739d0be284edb100fc2f0a11b07f9cd17afd7d29afbe659f0c661a7',
    'study-materials/e3952147b739d0be284edb100fc2f0a11b07f9cd17afd7d29afbe659f0c661a7.pdf',
    17,
    6,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Document: AUTHORIZATION_SECURED.pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'authorization-idor' LIMIT 1),
    'AUTHORIZATION',
    'authorization-secured-pdf',
    'Comprehensive bug bounty study guide covering AUTHORIZATION with practical testing checklists.',
    'AUTHORIZATION_SECURED.pdf',
    '916326017df5951ee662b468223b55c48d32afefd06ded91fced3f0df73bb4a8',
    'study-materials/916326017df5951ee662b468223b55c48d32afefd06ded91fced3f0df73bb4a8.pdf',
    5,
    7,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Document: BUSINESS_LOGIC_SECURED.pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'business-logic-api-security' LIMIT 1),
    'BUSINESS LOGIC',
    'business-logic-secured-pdf',
    'Comprehensive bug bounty study guide covering BUSINESS LOGIC with practical testing checklists.',
    'BUSINESS_LOGIC_SECURED.pdf',
    '3f1fcb7d0f183fb492e1bf3ebe40ccd35607befa3ea0aaaecb574935c82a18e5',
    'study-materials/3f1fcb7d0f183fb492e1bf3ebe40ccd35607befa3ea0aaaecb574935c82a18e5.pdf',
    3,
    8,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Document: BYPASS_RATE_LIMIT_SECURED.pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'authentication-session-security' LIMIT 1),
    'BYPASS RATE LIMIT',
    'bypass-rate-limit-secured-pdf',
    'Comprehensive bug bounty study guide covering BYPASS RATE LIMIT with practical testing checklists.',
    'BYPASS_RATE_LIMIT_SECURED.pdf',
    'a0cf53fba6bfbb7c58459938899bdf3f5fc1449521a3d78f440220ff1fd75be2',
    'study-materials/a0cf53fba6bfbb7c58459938899bdf3f5fc1449521a3d78f440220ff1fd75be2.pdf',
    2,
    9,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Document: cookie_secured.pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'authentication-session-security' LIMIT 1),
    'Cookie',
    'cookie-secured-pdf',
    'Comprehensive bug bounty study guide covering Cookie with practical testing checklists.',
    'cookie_secured.pdf',
    'bf8516266641d72c8ef74df033eb558458fe869c5538ffb5462e7130a0226697',
    'study-materials/bf8516266641d72c8ef74df033eb558458fe869c5538ffb5462e7130a0226697.pdf',
    3,
    10,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Document: CRLF_INJECTION.pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'xss-client-side-security' LIMIT 1),
    'CRLF INJECTION',
    'crlf-injection-pdf',
    'Comprehensive bug bounty study guide covering CRLF INJECTION with practical testing checklists.',
    'CRLF_INJECTION.pdf',
    '398161194915470c0d8c5d0d9c9a0e1852b5aa1532a7547e085d7bbe4568fd5d',
    'study-materials/398161194915470c0d8c5d0d9c9a0e1852b5aa1532a7547e085d7bbe4568fd5d.pdf',
    1,
    11,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Document: Cross Site Request Forgery (CSRF).pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'xss-client-side-security' LIMIT 1),
    'Cross Site Request Forgery (CSRF)',
    'cross-site-request-forgery-csrf-pdf',
    'Comprehensive bug bounty study guide covering Cross Site Request Forgery (CSRF) with practical testing checklists.',
    'Cross Site Request Forgery (CSRF).pdf',
    'a887c725e5b40615aef2191b47a534e72765d59f048451d1591d14c95f3c4308',
    'study-materials/a887c725e5b40615aef2191b47a534e72765d59f048451d1591d14c95f3c4308.pdf',
    4,
    12,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Document: CROSS SITE SCRIPTING.pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'xss-client-side-security' LIMIT 1),
    'CROSS SITE SCRIPTING',
    'cross-site-scripting-pdf',
    'Comprehensive bug bounty study guide covering CROSS SITE SCRIPTING with practical testing checklists.',
    'CROSS SITE SCRIPTING.pdf',
    '6bec3f96ee4f13377808a7c9330dfa9fd9f81109b48a449f45cff9b5be243787',
    'study-materials/6bec3f96ee4f13377808a7c9330dfa9fd9f81109b48a449f45cff9b5be243787.pdf',
    7,
    13,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Document: CSRF SECURED.pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'xss-client-side-security' LIMIT 1),
    'CSRF SECURED',
    'csrf-secured-pdf',
    'Comprehensive bug bounty study guide covering CSRF SECURED with practical testing checklists.',
    'CSRF SECURED.pdf',
    '36a88f5b7e69553ac2e4b5139a259da80b135ca58af283a7ac04102f26d57e86',
    'study-materials/36a88f5b7e69553ac2e4b5139a259da80b135ca58af283a7ac04102f26d57e86.pdf',
    3,
    14,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Document: Denial_of_services_secured.pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'file-upload-ssrf' LIMIT 1),
    'Denial Of Services',
    'denial-of-services-secured-pdf',
    'Comprehensive bug bounty study guide covering Denial Of Services with practical testing checklists.',
    'Denial_of_services_secured.pdf',
    'd68eca09f1b98844458bd1d77811be4343e3449a4a7d38bdebe99944a011aad6',
    'study-materials/d68eca09f1b98844458bd1d77811be4343e3449a4a7d38bdebe99944a011aad6.pdf',
    3,
    15,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Document: DJANGO_SECURED.pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'other-materials' LIMIT 1),
    'DJANGO',
    'django-secured-pdf',
    'Comprehensive bug bounty study guide covering DJANGO with practical testing checklists.',
    'DJANGO_SECURED.pdf',
    '4b69836dc7d3e24a816a5c869e732e7561e4a7303fa4cf1813b4be20f7195172',
    'study-materials/4b69836dc7d3e24a816a5c869e732e7561e4a7303fa4cf1813b4be20f7195172.pdf',
    1,
    16,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Document: EXPOSED_SOURCE CODE.pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'file-upload-ssrf' LIMIT 1),
    'EXPOSED SOURCE CODE',
    'exposed-source-code-pdf',
    'Comprehensive bug bounty study guide covering EXPOSED SOURCE CODE with practical testing checklists.',
    'EXPOSED_SOURCE CODE.pdf',
    '4bfa87819ca5ecd86af572148f2a19992475e3b7d1459b53867caa1aebf8ffca',
    'study-materials/4bfa87819ca5ecd86af572148f2a19992475e3b7d1459b53867caa1aebf8ffca.pdf',
    3,
    17,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Document: File_upload_secured.pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'file-upload-ssrf' LIMIT 1),
    'File Upload',
    'file-upload-secured-pdf',
    'Comprehensive bug bounty study guide covering File Upload with practical testing checklists.',
    'File_upload_secured.pdf',
    'a2e8d6f3a4f9566f5dba78e41bc9bb98de47f4264df6f95317091ab156fe05e2',
    'study-materials/a2e8d6f3a4f9566f5dba78e41bc9bb98de47f4264df6f95317091ab156fe05e2.pdf',
    4,
    18,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Document: Host_Header_injection.pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'reconnaissance-methodology' LIMIT 1),
    'Host Header Injection',
    'host-header-injection-pdf',
    'Comprehensive bug bounty study guide covering Host Header Injection with practical testing checklists.',
    'Host_Header_injection.pdf',
    'c72aae25c31b2fbb5d01d78e83a07fab6e6171d7ef3327a35a00422ad9a85c2b',
    'study-materials/c72aae25c31b2fbb5d01d78e83a07fab6e6171d7ef3327a35a00422ad9a85c2b.pdf',
    2,
    19,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Document: ICC COMMAND INJECTION.pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'file-upload-ssrf' LIMIT 1),
    'ICC COMMAND INJECTION',
    'icc-command-injection-pdf',
    'Comprehensive bug bounty study guide covering ICC COMMAND INJECTION with practical testing checklists.',
    'ICC COMMAND INJECTION.pdf',
    'c41c212037d1345d826cece3bafec394ec3689e80279f259ff920c8873f2c0ac',
    'study-materials/c41c212037d1345d826cece3bafec394ec3689e80279f259ff920c8873f2c0ac.pdf',
    5,
    20,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Document: IDOR (Insecure_Direct_Object_reference.pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'authorization-idor' LIMIT 1),
    'IDOR (Insecure Direct Object Reference',
    'idor-insecure-direct-object-reference-pdf',
    'Comprehensive bug bounty study guide covering IDOR (Insecure Direct Object Reference with practical testing checklists.',
    'IDOR (Insecure_Direct_Object_reference.pdf',
    '173ac99d35178bdead79abac0a9b93a9f6fb1759f4b65547e2766b6bf8d2df7b',
    'study-materials/173ac99d35178bdead79abac0a9b93a9f6fb1759f4b65547e2766b6bf8d2df7b.pdf',
    6,
    21,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Document: IDOR SECURED.pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'authorization-idor' LIMIT 1),
    'IDOR SECURED',
    'idor-secured-pdf',
    'Comprehensive bug bounty study guide covering IDOR SECURED with practical testing checklists.',
    'IDOR SECURED.pdf',
    '49b3b6994324c6da56596a88399755952574f0abdccca3b61180fbb6b79ce95a',
    'study-materials/49b3b6994324c6da56596a88399755952574f0abdccca3b61180fbb6b79ce95a.pdf',
    2,
    22,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Document: JIRE SECURED.pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'business-logic-api-security' LIMIT 1),
    'JIRE SECURED',
    'jire-secured-pdf',
    'Comprehensive bug bounty study guide covering JIRE SECURED with practical testing checklists.',
    'JIRE SECURED.pdf',
    'de5985c66cfbe0561a0bb007b38eade83428fc53f3b0fe19dc07517de388ea52',
    'study-materials/de5985c66cfbe0561a0bb007b38eade83428fc53f3b0fe19dc07517de388ea52.pdf',
    4,
    23,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Document: JSON SECURED.pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'business-logic-api-security' LIMIT 1),
    'JSON SECURED',
    'json-secured-pdf',
    'Comprehensive bug bounty study guide covering JSON SECURED with practical testing checklists.',
    'JSON SECURED.pdf',
    '231aa25283ab717ba626de5c0876a2c960405546807e2ef6d564558225adbb70',
    'study-materials/231aa25283ab717ba626de5c0876a2c960405546807e2ef6d564558225adbb70.pdf',
    17,
    24,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Document: MASS_SECURED.pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'business-logic-api-security' LIMIT 1),
    'MASS',
    'mass-secured-pdf',
    'Comprehensive bug bounty study guide covering MASS with practical testing checklists.',
    'MASS_SECURED.pdf',
    'f4742e4049106934ef0317987cce203d04ba95bf9f66f1fdde29c348c152453c',
    'study-materials/f4742e4049106934ef0317987cce203d04ba95bf9f66f1fdde29c348c152453c.pdf',
    3,
    25,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Document: META_DATA_NOT_EXTRACTED.pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'other-materials' LIMIT 1),
    'META DATA NOT EXTRACTED',
    'meta-data-not-extracted-pdf',
    'Comprehensive bug bounty study guide covering META DATA NOT EXTRACTED with practical testing checklists.',
    'META_DATA_NOT_EXTRACTED.pdf',
    'fd09deb47b1e311951110598fbd5603a2eef804acf79015a5c900630bbc7873b',
    'study-materials/fd09deb47b1e311951110598fbd5603a2eef804acf79015a5c900630bbc7873b.pdf',
    1,
    26,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Document: RCE_SECURED.pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'file-upload-ssrf' LIMIT 1),
    'RCE',
    'rce-secured-pdf',
    'Comprehensive bug bounty study guide covering RCE with practical testing checklists.',
    'RCE_SECURED.pdf',
    'dd8a4257ba7739c941d417fe05a5aced37953a426c0be0e26399cd46ab8679e5',
    'study-materials/dd8a4257ba7739c941d417fe05a5aced37953a426c0be0e26399cd46ab8679e5.pdf',
    2,
    27,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Document: REGISTER_SECURED.pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'bug-bounty-fundamentals' LIMIT 1),
    'REGISTER',
    'register-secured-pdf',
    'Comprehensive bug bounty study guide covering REGISTER with practical testing checklists.',
    'REGISTER_SECURED.pdf',
    '65c054329eb44173f5b900ad32de741d7943ee536a3aa0a50cb2b9665e36fac8',
    'study-materials/65c054329eb44173f5b900ad32de741d7943ee536a3aa0a50cb2b9665e36fac8.pdf',
    1,
    28,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Document: RESET_PASSWORD_CHECKLIST.pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'authentication-session-security' LIMIT 1),
    'RESET PASSWORD CHECKLIST',
    'reset-password-checklist-pdf',
    'Comprehensive bug bounty study guide covering RESET PASSWORD CHECKLIST with practical testing checklists.',
    'RESET_PASSWORD_CHECKLIST.pdf',
    'd7a0126e7920b99b6b49141c6be92e580a5065b53713096e9b66af7284732d89',
    'study-materials/d7a0126e7920b99b6b49141c6be92e580a5065b53713096e9b66af7284732d89.pdf',
    2,
    29,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Document: SYMFONY_SECURED.pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'other-materials' LIMIT 1),
    'SYMFONY',
    'symfony-secured-pdf',
    'Comprehensive bug bounty study guide covering SYMFONY with practical testing checklists.',
    'SYMFONY_SECURED.pdf',
    'be0dab78616a9ab15679ff9ddb169f8182d5172e4e405bdbfb2f7221409e2ccf',
    'study-materials/be0dab78616a9ab15679ff9ddb169f8182d5172e4e405bdbfb2f7221409e2ccf.pdf',
    1,
    30,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Document: TIPS_TIWTTER_P2_SECURED.pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'bug-bounty-fundamentals' LIMIT 1),
    'TIPS TIWTTER P2',
    'tips-tiwtter-p2-secured-pdf',
    'Comprehensive bug bounty study guide covering TIPS TIWTTER P2 with practical testing checklists.',
    'TIPS_TIWTTER_P2_SECURED.pdf',
    '79516059e1ac26e5db130b9c1ba43d6920fc04d745879d1accc4ada36176ae88',
    'study-materials/79516059e1ac26e5db130b9c1ba43d6920fc04d745879d1accc4ada36176ae88.pdf',
    3,
    31,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Document: TIPS_TWITTER_SECURED.pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'reconnaissance-methodology' LIMIT 1),
    'TIPS TWITTER',
    'tips-twitter-secured-pdf',
    'Comprehensive bug bounty study guide covering TIPS TWITTER with practical testing checklists.',
    'TIPS_TWITTER_SECURED.pdf',
    '8be4e70b4d7ad686f58937d269a9605182562f5f19729c05e07342d539932ccc',
    'study-materials/8be4e70b4d7ad686f58937d269a9605182562f5f19729c05e07342d539932ccc.pdf',
    5,
    32,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Document: VLNERABILITY_CHECKLIST.pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'other-materials' LIMIT 1),
    'VLNERABILITY CHECKLIST',
    'vlnerability-checklist-pdf',
    'Comprehensive bug bounty study guide covering VLNERABILITY CHECKLIST with practical testing checklists.',
    'VLNERABILITY_CHECKLIST.pdf',
    'ec0f3d451359a00d23f6f3ac013ee4e0e0735e83ce8fb9267fcbed62da48a105',
    'study-materials/ec0f3d451359a00d23f6f3ac013ee4e0e0735e83ce8fb9267fcbed62da48a105.pdf',
    2,
    33,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Document: XSS_SECURED.pdf
  INSERT INTO public.study_documents (
    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM public.study_categories WHERE slug = 'xss-client-side-security' LIMIT 1),
    'XSS',
    'xss-secured-pdf',
    'Comprehensive bug bounty study guide covering XSS with practical testing checklists.',
    'XSS_SECURED.pdf',
    '359221e51602811f13347a3d71ba0b8d5daba2da1bf4b6fb1f322a12a4aa04e2',
    'study-materials/359221e51602811f13347a3d71ba0b8d5daba2da1bf4b6fb1f322a12a4aa04e2.pdf',
    3,
    34,
    false -- default unpublish on initial insertion per security requirement
  )
  ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    original_filename = EXCLUDED.original_filename,
    source_checksum = EXCLUDED.source_checksum,
    storage_key = EXCLUDED.storage_key,
    page_count = EXCLUDED.page_count,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

END $$;
