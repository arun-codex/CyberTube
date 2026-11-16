import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/supabase/server';
import { createAdminClient, verifyAdminStatus } from '@/lib/supabase/admin';
import { getPdfPageCount } from '@/lib/pdf/metadata';
import crypto from 'crypto';

/**
 * Simplified Admin PDF upload endpoint.
 * Direct upload: validates file, stores in `original-pdfs`, extracts page count in pure JS,
 * and creates document record with `is_published: false`.
 */
export async function POST(req: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ error: 'Supabase admin client unavailable' }, { status: 500 });
  }

  // Verify admin status via admin_users table or server admin allowlist
  const isAllowlisted = await verifyAdminStatus(user.email);
  let isAdmin = isAllowlisted;

  if (!isAdmin) {
    const { data: adminRow } = await admin
      .from('admin_users')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (adminRow) {
      isAdmin = true;
    }
  }

  if (!isAdmin) {
    return NextResponse.json({ error: 'Forbidden: Administrator privileges required.' }, { status: 403 });
  }

  const form = await req.formData();
  const file = form.get('file') as File | null;
  const categoryId = form.get('categoryId') as string | null;
  const customTitle = form.get('title') as string | null;
  const difficulty = form.get('difficulty') as string | null;
  const description = form.get('description') as string | null;

  if (!file) {
    return NextResponse.json({ error: 'Missing file' }, { status: 400 });
  }

  if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
    return NextResponse.json({ error: 'Invalid file format: Only PDF documents are allowed.' }, { status: 400 });
  }

  // 30 MiB size limit
  const MAX_SIZE = 30 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File size exceeds 30 MB limit.' }, { status: 413 });
  }

  // Read file buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Compute SHA-256 checksum to prevent duplicates
  const checksum = crypto.createHash('sha256').update(buffer).digest('hex');

  const { data: existing } = await admin
    .from('study_documents')
    .select('id, title')
    .eq('source_checksum', checksum)
    .maybeSingle();

  if (existing) {
    return NextResponse.json(
      { error: `Duplicate PDF: This exact document already exists ("${existing.title}").`, existingId: existing.id },
      { status: 409 }
    );
  }

  // Extract page count in pure JS
  let pageCount = 1;
  try {
    pageCount = await getPdfPageCount(buffer);
  } catch (err) {
    return NextResponse.json({ error: 'PDF could not be parsed' }, { status: 400 });
  }

  // Generate unique storage key
  const storageKey = `original-${crypto.randomUUID()}.pdf`;

  // Upload to private bucket `original-pdfs`
  const { error: uploadError } = await admin.storage
    .from('original-pdfs')
    .upload(storageKey, buffer, {
      upsert: false,
      contentType: 'application/pdf',
    });

  if (uploadError) {
    return NextResponse.json({ error: 'Storage upload failed', details: uploadError.message }, { status: 500 });
  }

  // Prepare slug
  const title = (customTitle || file.name.replace(/\.pdf$/i, '')).trim();
  const slugBase = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'study-doc';
  const uniqueSlug = `${slugBase}-${crypto.randomUUID().slice(0, 6)}`;

  // Insert document record (unpublished by default for review)
  const { data: doc, error: insertError } = await admin
    .from('study_documents')
    .insert({
      title,
      slug: uniqueSlug,
      description: description || null,
      category_id: categoryId || null,
      difficulty: difficulty || 'intermediate',
      original_filename: file.name,
      source_checksum: checksum,
      storage_key: storageKey,
      page_count: pageCount,
      is_published: false,
    })
    .select()
    .single();

  if (insertError || !doc) {
    return NextResponse.json({ error: 'Database record creation failed', details: insertError?.message }, { status: 500 });
  }

  return NextResponse.json({
    message: 'Upload successful. Document created in pending/unpublished state.',
    document: doc,
  });
}
