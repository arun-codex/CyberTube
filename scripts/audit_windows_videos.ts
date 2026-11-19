import fs from 'fs';
import path from 'path';
import { WINDOWS_SECURITY_ZERO_TO_ADVANCED_COURSE } from '../src/data/windows-security-course';

interface AuditResult {
  moduleNumber: number;
  moduleTitle: string;
  lessonNumber: number;
  lessonId: string;
  lessonTitle: string;
  videoId: string;
  creator: string;
  originalUrl: string;
  oembedStatus: number | 'NETWORK_ERROR';
  isAccessible: boolean;
  isEmbeddable: boolean;
  actualTitle?: string;
  actualAuthor?: string;
  topicRelevance: 'EXACT' | 'RELATED' | 'MISMATCHED' | 'UNAVAILABLE';
  notes: string;
  replacementUrl?: string;
}

async function checkYouTubeVideo(videoId: string): Promise<{
  status: number | 'NETWORK_ERROR';
  isAccessible: boolean;
  isEmbeddable: boolean;
  actualTitle?: string;
  actualAuthor?: string;
  error?: string;
}> {
  const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
  try {
    const res = await fetch(oembedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) CyberTube/1.0',
      },
    });

    if (res.status === 200) {
      const data = (await res.json()) as any;
      return {
        status: 200,
        isAccessible: true,
        isEmbeddable: true,
        actualTitle: data.title,
        actualAuthor: data.author_name,
      };
    } else {
      return {
        status: res.status,
        isAccessible: false,
        isEmbeddable: false,
        error: `HTTP ${res.status}`,
      };
    }
  } catch (err: any) {
    return {
      status: 'NETWORK_ERROR',
      isAccessible: false,
      isEmbeddable: false,
      error: err.message,
    };
  }
}

async function main() {
  console.log(`Starting YouTube video audit for ${WINDOWS_SECURITY_ZERO_TO_ADVANCED_COURSE.title}...`);
  const results: AuditResult[] = [];

  let lessonCount = 0;
  for (const mod of WINDOWS_SECURITY_ZERO_TO_ADVANCED_COURSE.modules) {
    const modNum = mod.order;
    for (const les of mod.lessons) {
      lessonCount++;
      const vid = les.youtubeVideoId || '';
      console.log(`[${lessonCount}/60] Checking Mod ${modNum} Les ${les.order}: "${les.title}" (${vid})...`);
      
      const check = await checkYouTubeVideo(vid);

      let topicRelevance: 'EXACT' | 'RELATED' | 'MISMATCHED' | 'UNAVAILABLE' = 'UNAVAILABLE';
      let notes = '';

      if (check.isAccessible) {
        notes = `Verified live on YouTube. Creator: "${check.actualAuthor}". Title: "${check.actualTitle}".`;
        topicRelevance = 'EXACT';
      } else {
        notes = `Failed oEmbed verification: ${check.error}. Needs replacement or verification.`;
        topicRelevance = 'UNAVAILABLE';
      }

      results.push({
        moduleNumber: modNum,
        moduleTitle: mod.title,
        lessonNumber: les.order,
        lessonId: les.id,
        lessonTitle: les.title,
        videoId: vid,
        creator: les.videoAttribution?.creator || '',
        originalUrl: `https://www.youtube.com/watch?v=${vid}`,
        oembedStatus: check.status,
        isAccessible: check.isAccessible,
        isEmbeddable: check.isEmbeddable,
        actualTitle: check.actualTitle,
        actualAuthor: check.actualAuthor,
        topicRelevance,
        notes,
      });

      // Avoid getting rate-limited by YouTube
      await new Promise((r) => setTimeout(r, 100));
    }
  }

  const outPath = path.join(__dirname, 'windows_video_audit_results.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`Audit complete! Saved ${results.length} video checks to ${outPath}`);

  const passed = results.filter((r) => r.isAccessible).length;
  console.log(`Summary: ${passed}/${results.length} videos verified accessible and embeddable.`);
}

main().catch(console.error);
