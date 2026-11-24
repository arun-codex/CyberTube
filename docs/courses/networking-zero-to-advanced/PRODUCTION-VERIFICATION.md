# Production Verification Plan & Checklist

## Deployment Target
- **URL**: https://cybertube-mu.vercel.app/courses/networking-for-cybersecurity-zero-to-advanced
- **Target Lesson**: `?lesson=m03-l2-ethernet-headers`

## Verification Checkpoints
- [x] `m03-l2` renders YouTube embed `7vzjIv2l6wY` with duration 23 minutes.
- [x] React YouTubePlayer key includes both lesson ID and video ID, preventing stale iframe retention on lesson navigation.
- [x] Browser Back and Forward buttons correctly trigger lesson navigation via `popstate` event listener.
- [x] Module 30 Capstone tab renders the full interactive Enterprise Network Security Investigation with 6 submission sections and rubrics.
- [x] Zero quiz locks or mandatory quiz gates exist on any lesson.
- [x] All 120 lessons can be navigated without console errors or player state desynchronization.
