import { ENGLISH_COMMUNICATION_FOR_CYBERSECURITY_COURSE } from '../src/data/english-communication-for-cybersecurity-course';
import { getCourseLessons } from '../src/lib/courses';

async function main() {
  const lessons = getCourseLessons(ENGLISH_COMMUNICATION_FOR_CYBERSECURITY_COURSE);
  const videoIds = Array.from(new Set(lessons.map((l) => l.youtubeVideoId).filter(Boolean))) as string[];
  console.log(`Total unique video IDs: ${videoIds.length}`);

  let okCount = 0;
  let failCount = 0;
  const failures: { id: string; status: number | string }[] = [];

  for (const vid of videoIds) {
    try {
      const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${vid}&format=json`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        console.log(`[OK] ${vid} | Title: "${data.title}" | Author: ${data.author_name}`);
        okCount++;
      } else {
        console.log(`[FAIL HTTP ${res.status}] ${vid}`);
        failCount++;
        failures.push({ id: vid, status: res.status });
      }
    } catch (err: any) {
      console.log(`[ERROR] ${vid}: ${err.message}`);
      failCount++;
      failures.push({ id: vid, status: err.message });
    }
  }

  console.log(`\nVerification Summary: ${okCount} playable, ${failCount} failed.`);
  if (failures.length > 0) {
    console.log('Failed IDs:', failures);
  }
}

main().catch(console.error);
