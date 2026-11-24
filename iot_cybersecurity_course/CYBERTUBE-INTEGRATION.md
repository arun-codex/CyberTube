# CyberTube Integration Plan (No Existing Course Changes)

**Scope:** Add a *new* `IoT Cybersecurity & Ethical Hacking: Zero to Advanced` course; do not modify any existing course's module order, lesson video mapping, routes, data or progress state.

## Structured metadata
- Course slug proposal: `iot-cybersecurity-zero-to-advanced`
- Course title: `IoT Cybersecurity & Ethical Hacking: Zero to Advanced`
- Category: `IoT Security` / `Cybersecurity` / `Blue Team + Ethical Testing`
- Module count: 30; lesson count: 120.
- Language: English (individual YouTube creators may differ; verify).
- Delivery: free linked YouTube video plus original text and safe lab instructions.
- Audience: absolute beginner to advanced, with optional SOC/DFIR track.
- Assessments: **no quizzes, no quiz-related locks**; optional evidence-based portfolio.

## Mapping
- Course → exactly 30 ordered modules from README.md.
- Each module → exactly four ordered lesson headings `Mxx.Lyy` from its Markdown.
- Lesson → title, original description and objective; group selected videos as shared `module_resources` when platform supports it. **Do not claim a new distinct video for every lesson.**
- Every video record → full canonical YouTube URL, creator attribution, last-checked date, topical fit, status flags. Do not guess video duration from estimated learning time.
- Lab → original instructions and acceptance criteria with explicit isolated-only safety.
- Progress → video watched + reading + lab complete (user-driven), not quiz-gated.

## Engineering migration checklist
1. Create a new course definition in the same data contract the live project uses; avoid assumptions about schema/API shape.
2. Map stable ids `iot-cybersecurity-m01` ... `m30` and `-l01` ... `-l04`.
3. Import one newly scoped course only; use a transaction and uniqueness constraints; do not overwrite legacy courses.
4. Validate 30 modules, 120 distinct lesson keys and the intended order.
5. Ensure every module references >=1 actual `youtube.com/watch?v=` link or a clearly labeled publisher-linked playlist.
6. Confirm the intended video opens in browser; test unsupported, removed, private and embed-disabled fallback behavior.
7. Ensure no quizzes, quiz tables, quiz-gated progress, lock UI or unlock dependencies are created for this course. Do not delete or alter quizzes for other courses during this import.
8. Run TypeScript checks, existing tests, live page navigation, accessibility review, mobile review and regressions on existing courses.
9. Preview and approve before production deploy; preserve ability to roll back only this new course.

## Data integrity checks
- No duplicate module numbers or titles; no duplicate stable lesson ids.
- Title and URL attribution correspond to actual creator.
- Null/unknown runtimes remain null; never fabricate minutes.
- All markdown files are UTF-8; internal links resolve.
- No source media files are copied into repository without explicit rights.

## Cluelabs use
Connected draft Content Studio project: `IoT Cybersecurity & Ethical Hacking — Zero to Advanced (30 Modules)`, project ID `2493`. The project is a **draft authoring space**, not a source of rights to YouTube material and not an agentic course redesign approval. A storyboard can mirror the modules and produce optional notes/narration, but external YouTube videos remain linked, not imported as generated media.
