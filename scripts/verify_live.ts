async function verifyLessonsOnLive() {
  const slugs = [
    'm01-l1-recognise-common-english-sounds',
    'm05-l2-confirm-understanding-with-readback',
    'm10-l4-explain-multi-factor-authentication',
    'm15-l1-format-a-clear-subject-line',
    'm20-l1-summarise-the-initial-alert',
    'm25-l1-open-meetings-with-a-purpose',
    'm30-l4-conduct-handover-and-self-review',
  ];

  console.log('Testing live course endpoints...');
  let allOk = true;
  for (const slug of slugs) {
    const url = `https://cybertube-mu.vercel.app/courses/english-communication-for-cybersecurity-zero-to-advanced?lesson=${slug}`;
    const res = await fetch(url);
    if (res.ok) {
      console.log(`[PASS ${res.status}] ${slug}`);
    } else {
      console.log(`[FAIL ${res.status}] ${slug}`);
      allOk = false;
    }
  }

  // Also verify that the course page does not contain any quiz markers
  const coursePageRes = await fetch('https://cybertube-mu.vercel.app/courses/english-communication-for-cybersecurity-zero-to-advanced');
  const courseHtml = await coursePageRes.text();
  const containsQuiz = courseHtml.includes('Module Quiz') || courseHtml.includes('Start Assessment Quiz') || courseHtml.includes('Take Module Quiz');
  console.log(`Quiz markers present on live course page: ${containsQuiz}`);

  console.log(`\nLive Verification Result: ${allOk && !containsQuiz ? 'ALL PASSED' : 'SOME CHECKS FAILED'}`);
}

verifyLessonsOnLive().catch(console.error);
