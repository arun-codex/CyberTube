import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import crypto from 'crypto';

/**
 * Admin PDF upload endpoint.
 * Expects multipart/form-data with field `file` (single PDF).
 * Validates that the requester is a registered admin via `admin_users` table.
 * Stores the original PDF in the private `original-pdfs` bucket, records metadata,
 * and enqueues/triggers page processing.
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

  // Verify admin membership in admin_users table
  const { data: adminRow } = await admin
    .from('admin_users')
    .select('id')
    .eq('user_id', user.id)
    .single();

  if (!adminRow) {
    return NextResponse.json({ error: 'Forbidden: not an admin' }, { status: 403 });
  }

  const form = await req.formData();
  const file = form.get('file') as File | null;
  if (!file) {
    return NextResponse.json({ error: 'Missing file' }, { status: 400 });
  }

  // 30 MiB size limit
  const MAX_SIZE = 30 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File too large' }, { status: 413 });
  }

  // Read file buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Compute SHA-256 checksum
  const checksum = crypto.createHash('sha256').update(buffer).digest('hex');

  // Duplicate check - reject exact SHA-256 duplicate
  const { data: existing } = await admin
    .from('study_documents')
    .select('id')
    .eq('source_checksum', checksum)
    .single();

  if (existing) {
    return NextResponse.json({ error: 'Duplicate PDF detected' }, { status: 409 });
  }

  // Generate storage key
  const storageKey = `original-${crypto.randomUUID()}.pdf`;

  // Upload to private bucket using service-role client
  const { error: uploadError } = await admin.storage
    .from('original-pdfs')
    .upload(storageKey, buffer, { upsert: false, contentType: file.type || 'application/pdf' });

  if (uploadError) {
    return NextResponse.json({ error: 'Storage upload failed', details: uploadError.message }, { status: 500 });
  }

  // Insert document row
  const slug = file.name
    .replace(/\.pdf$/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const { data: doc, error: insertError } = await admin
    .from('study_documents')
    .insert({
      title: file.name.replace(/\.pdf$/i, '').replace(/_/g, ' '),
      slug: `${slug}-${crypto.randomUUID().slice(0, 8)}`,
      original_filename: file.name,
      source_checksum: checksum,
      storage_key: storageKey,
      page_count: 0,
      is_published: false,
    })
    .select()
    .single();

  if (insertError || !doc) {
    return NextResponse.json({ error: 'DB insert failed', details: insertError?.message }, { status: 500 });
  }

  // Enqueue background processing or trigger directly
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  fetch(`${baseUrl}/api/admin/study-materials/process/${doc.id}`, { method: 'POST' }).catch(() => {});

  return NextResponse.json({ message: 'Upload accepted', documentId: doc.id });
}
