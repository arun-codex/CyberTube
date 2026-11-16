import { getAuthenticatedUser } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function GET(
  request: Request,
  context: { params: Promise<{ docId: string; page: string }> }
) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const admin = createAdminClient();
  if (!admin) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }

  const params = await context.params;
  const docId = params.docId;
  const pageNumber = parseInt(params.page, 10);
  if (isNaN(pageNumber) || pageNumber < 1) {
    return new NextResponse('Invalid page', { status: 400 });
  }

  // Verify document exists and is published (or user is admin)
  const { data: docMeta, error: docErr } = await admin
    .from('study_documents')
    .select('is_published')
    .eq('id', docId)
    .single();

  if (docErr || !docMeta) {
    return new NextResponse('Document not found', { status: 404 });
  }

  if (!docMeta.is_published) {
    // Check if user is admin
    const { data: adminRow } = await admin
      .from('admin_users')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!adminRow) {
      return new NextResponse('Document not published', { status: 403 });
    }
  }

  // Fetch page asset metadata
  const { data: pageMeta, error: pageErr } = await admin
    .from('study_document_pages')
    .select('private_asset_key')
    .eq('document_id', docId)
    .eq('page_number', pageNumber)
    .single();

  if (pageErr || !pageMeta) {
    return new NextResponse('Page not found', { status: 404 });
  }

  // Download page asset directly from private bucket via admin client
  const { data: assetData, error: assetErr } = await admin.storage
    .from('page-assets')
    .download(pageMeta.private_asset_key);

  if (assetErr || !assetData) {
    return new NextResponse('Failed to access asset', { status: 500 });
  }

  const imageBuffer = Buffer.from(await assetData.arrayBuffer());

  // Metadata of the image for watermark bounds
  const meta = await sharp(imageBuffer).metadata();
  const width = meta.width || 800;
  const height = meta.height || 1100;

  // Apply repeated 15% alpha opacity server-rendered watermark containing CyberTube branding and user identifier
  const userIdentifier = user.email ? user.email.replace(/(.{2})(.*)(?=@)/, (_g1: string, a: string, b: string) => a + '*'.repeat(b.length)) : user.id.slice(0, 8);
  const watermarkText = `CyberTube • ${userIdentifier}`;

  const svgWatermark = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="wmPattern" width="400" height="200" patternTransform="rotate(-30 0 0)" patternUnits="userSpaceOnUse">
          <text x="20" y="80" font-size="18" font-family="system-ui, -apple-system, sans-serif" font-weight="600" fill="rgba(255, 255, 255, 0.15)">
            ${watermarkText}
          </text>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#wmPattern)" />
    </svg>
  `;

  const watermarked = await sharp(imageBuffer)
    .composite([
      {
        input: Buffer.from(svgWatermark),
        top: 0,
        left: 0,
      },
    ])
    .png()
    .toBuffer();

  return new NextResponse(watermarked, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'private, no-store, no-cache, must-revalidate',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
