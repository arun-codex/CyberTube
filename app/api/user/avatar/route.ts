import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import crypto from 'crypto';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export async function GET() {
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

    // Fetch profile to retrieve avatar_path
    const { data: profile } = await (supabase.from('profiles') as any)
      .select('avatar_path, avatar_url')
      .eq('id', user.id)
      .single();

    if (!profile?.avatar_path) {
      return NextResponse.json({
        hasCustomAvatar: false,
        avatarUrl: profile?.avatar_url || null,
        avatarPath: null,
      });
    }

    // Generate fresh signed URL (60-minute validity)
    const { data: signedData, error: signedError } = await supabase.storage
      .from('avatars')
      .createSignedUrl(profile.avatar_path, 3600);

    if (signedError || !signedData?.signedUrl) {
      return NextResponse.json({
        hasCustomAvatar: true,
        avatarUrl: profile?.avatar_url || null,
        avatarPath: profile.avatar_path,
        signedUrlError: signedError?.message || 'Failed to refresh signed URL',
      });
    }

    return NextResponse.json({
      hasCustomAvatar: true,
      avatarUrl: signedData.signedUrl,
      avatarPath: profile.avatar_path,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Server error.' }, { status: 500 });
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

    if (!isJpeg && !isPng && !isWebp) {
      return NextResponse.json(
        { error: 'File content does not match genuine image signature.' },
        { status: 400 }
      );
    }

    // Randomized safe path: {user_id}/{random_uuid}.{ext}
    const ext = file.type === 'image/jpeg' ? 'jpg' : file.type === 'image/png' ? 'png' : 'webp';
    const randomName = crypto.randomUUID();
    const filePath = `${user.id}/${randomName}.${ext}`;

    // Attempt upload to Supabase storage 'avatars' bucket
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      // If Storage bucket is unconfigured on remote, return helpful error state
      return NextResponse.json(
        { error: `Storage configuration issue: ${uploadError.message}` },
        { status: 503 }
      );
    }

    // Generate signed URL (60-minute duration)
    const { data: signedData, error: signedError } = await supabase.storage
      .from('avatars')
      .createSignedUrl(filePath, 3600);

    if (signedError || !signedData?.signedUrl) {
      return NextResponse.json({ error: 'Failed to generate signed URL.' }, { status: 500 });
    }

    // Store permanent avatar_path in profile
    await (supabase.from('profiles') as any)
      .update({
        avatar_path: filePath,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

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

    // Reset avatar_path to null in profiles
    await (supabase.from('profiles') as any)
      .update({
        avatar_path: null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Server error.' }, { status: 500 });
  }
}
