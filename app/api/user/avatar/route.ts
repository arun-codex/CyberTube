import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { isBucketAutoInitAllowed } from '@/lib/storageEnvironmentGuard';
import crypto from 'crypto';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const NO_CACHE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  Pragma: 'no-cache',
  Expires: '0',
};

export async function GET() {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database service unconfigured.' },
        { status: 500, headers: NO_CACHE_HEADERS }
      );
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized.' },
        { status: 401, headers: NO_CACHE_HEADERS }
      );
    }

    // Fetch profile to retrieve permanent avatar_path and provider avatar_url
    const { data: profile, error: profileError } = await (supabase.from('profiles') as any)
      .select('avatar_path, avatar_url')
      .eq('id', user.id)
      .single();

    if (profileError) {
      return NextResponse.json(
        { error: `Failed to retrieve profile record: ${profileError.message}` },
        { status: 500, headers: NO_CACHE_HEADERS }
      );
    }

    if (!profile?.avatar_path) {
      return NextResponse.json(
        {
          hasCustomAvatar: false,
          avatarUrl: profile?.avatar_url || null,
          avatarPath: null,
        },
        { headers: NO_CACHE_HEADERS }
      );
    }

    // Generate fresh signed URL (60-minute validity) using user's authenticated client
    const { data: signedData, error: signedError } = await supabase.storage
      .from('avatars')
      .createSignedUrl(profile.avatar_path, 3600);

    if (signedError || !signedData?.signedUrl) {
      return NextResponse.json(
        {
          hasCustomAvatar: true,
          avatarUrl: profile?.avatar_url || null, // fallback to provider avatar
          avatarPath: profile.avatar_path,
          signedUrlError: signedError?.message || 'Failed to refresh signed URL',
        },
        { headers: NO_CACHE_HEADERS }
      );
    }

    return NextResponse.json(
      {
        hasCustomAvatar: true,
        avatarUrl: signedData.signedUrl,
        avatarPath: profile.avatar_path,
      },
      { headers: NO_CACHE_HEADERS }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Server error.' },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Database service unconfigured.' }, { status: 500 });
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('avatar') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }

    // Size validation
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File exceeds 5 MB limit.' }, { status: 400 });
    }

    // Type validation
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file format. Only JPEG, PNG, and WebP are allowed.' },
        { status: 400 }
      );
    }

    // Buffer magic number inspection for security
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Validate image signatures
    const isJpeg = buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
    const isPng =
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47;
    const isWebp =
      buffer.toString('utf8', 0, 4) === 'RIFF' &&
      buffer.toString('utf8', 8, 12) === 'WEBP';

    // Disallow GIF, SVG, HTML, XML, or unknown binaries
    const isDisallowedFormat =
      buffer.toString('utf8', 0, 3) === 'GIF' ||
      buffer.toString('utf8', 0, 100).toLowerCase().includes('<svg') ||
      buffer.toString('utf8', 0, 100).toLowerCase().includes('<?xml') ||
      buffer.toString('utf8', 0, 100).toLowerCase().includes('<html') ||
      buffer.toString('utf8', 0, 100).toLowerCase().includes('<!doctype');

    if (isDisallowedFormat || (!isJpeg && !isPng && !isWebp)) {
      return NextResponse.json(
        { error: 'File content does not match genuine image signature. SVG, GIF, HTML and raw scripts are rejected.' },
        { status: 400 }
      );
    }

    // Strict signature-to-declared-MIME matching (prevents spoofed MIME types)
    const isMimeSignatureMatch =
      (file.type === 'image/jpeg' && isJpeg) ||
      (file.type === 'image/png' && isPng) ||
      (file.type === 'image/webp' && isWebp);

    if (!isMimeSignatureMatch) {
      return NextResponse.json(
        { error: 'Spoofed MIME type detected: payload bytes do not match declared Content-Type header.' },
        { status: 400 }
      );
    }

    // Randomized safe path matching verified binary signature:
    // JPEG: .jpg, PNG: .png, WebP: .webp
    const verifiedExt = isJpeg ? 'jpg' : isPng ? 'png' : 'webp';
    const randomName = crypto.randomUUID();
    const filePath = `${user.id}/${randomName}.${verifiedExt}`;

    // Attempt upload to Supabase storage 'avatars' bucket
    let uploadResult = await supabase.storage
      .from('avatars')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    // In isolated preview or local environments where bucket was not pre-created, attempt admin auto-provisioning
    // FAIL-CLOSED ENVIRONMENT GUARD: Default is DENY. Auto-init is only permitted in explicitly approved preview/dev.
    if (
      isBucketAutoInitAllowed() &&
      uploadResult.error &&
      (uploadResult.error.message.toLowerCase().includes('not found') ||
       uploadResult.error.message.toLowerCase().includes('bucket'))
    ) {
      try {
        const admin = createAdminClient();
        if (admin) {
          await admin.storage.createBucket('avatars', {
            public: false,
            fileSizeLimit: 5242880,
            allowedMimeTypes: ALLOWED_MIME_TYPES,
          });
          // Retry upload once after bucket provisioning
          uploadResult = await supabase.storage
            .from('avatars')
            .upload(filePath, buffer, {
              contentType: file.type,
              upsert: true,
            });
        }
      } catch {
        // Fall through to error response
      }
    }

    if (uploadResult.error) {
      // Failed uploads never report success
      return NextResponse.json(
        { error: `Storage configuration issue: ${uploadResult.error.message}` },
        { status: 503 }
      );
    }

    // Generate signed URL (60-minute duration)
    const { data: signedData, error: signedError } = await supabase.storage
      .from('avatars')
      .createSignedUrl(filePath, 3600);

    if (signedError || !signedData?.signedUrl) {
      // Clean up uploaded file if URL signing fails
      try {
        await supabase.storage.from('avatars').remove([filePath]);
      } catch {
        // Best effort
      }
      return NextResponse.json({ error: 'Failed to generate signed URL.' }, { status: 500 });
    }

    // Store permanent avatar_path in profile and verify row update
    const { data: updatedRows, error: updateError } = await (supabase.from('profiles') as any)
      .update({
        avatar_path: filePath,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)
      .select('id, avatar_path');

    if (updateError || !updatedRows || updatedRows.length === 0) {
      // Database persistence failed: clean up uploaded storage object to prevent orphan storage
      try {
        await supabase.storage.from('avatars').remove([filePath]);
      } catch {
        // Best effort
      }

      return NextResponse.json(
        {
          error: updateError?.message
            ? `Failed to persist avatar in profile: ${updateError.message}`
            : 'Database update failed: authenticated profile row was not updated.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      avatarUrl: signedData.signedUrl,
      avatarPath: filePath,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Server error.' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Database unconfigured.' }, { status: 500 });
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    // Retrieve current avatar_path before clearing
    const { data: profile, error: fetchError } = await (supabase.from('profiles') as any)
      .select('avatar_path')
      .eq('id', user.id)
      .single();

    if (fetchError) {
      return NextResponse.json(
        { error: `Failed to retrieve profile: ${fetchError.message}` },
        { status: 500 }
      );
    }

    const currentPath = profile?.avatar_path;

    // Reset avatar_path to null in profiles and verify database update
    const { data: updatedRows, error: updateError } = await (supabase.from('profiles') as any)
      .update({
        avatar_path: null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)
      .select('id, avatar_path');

    if (updateError || !updatedRows || updatedRows.length === 0) {
      return NextResponse.json(
        {
          error: updateError?.message
            ? `Failed to reset profile avatar: ${updateError.message}`
            : 'Database update failed: profile row was not reset.',
        },
        { status: 500 }
      );
    }

    // If an existing avatar file belonged to this user, remove it from storage
    if (currentPath && currentPath.startsWith(`${user.id}/`)) {
      try {
        await supabase.storage.from('avatars').remove([currentPath]);
      } catch {
        // Storage cleanup best effort
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Server error.' }, { status: 500 });
  }
}
