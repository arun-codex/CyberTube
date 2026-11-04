# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 08_accessibility.spec.ts >> Phase 4.4 - Automated Accessibility Audit (Axe-Core) >> Axe-core scan on Course Detail (/courses/network-packet-analysis-masterclass) passes with no critical or serious violations
- Location: tests\08_accessibility.spec.ts:15:9

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -   1
+ Received  + 148

- Array []
+ Array [
+   Object {
+     "description": "Ensure an element's role supports its ARIA attributes",
+     "help": "Elements must only use supported ARIA attributes",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.14/aria-allowed-attr?application=playwright",
+     "id": "aria-allowed-attr",
+     "impact": "critical",
+     "nodes": Array [
+       Object {
+         "all": Array [
+           Object {
+             "data": Object {
+               "messageKey": "singular",
+               "values": Array [
+                 "aria-level=\"2\"",
+               ],
+             },
+             "id": "aria-allowed-attr",
+             "impact": "critical",
+             "message": "ARIA attribute is not allowed: aria-level=\"2\"",
+             "relatedNodes": Array [],
+           },
+         ],
+         "any": Array [],
+         "failureSummary": "Fix all of the following:
+   ARIA attribute is not allowed: aria-level=\"2\"",
+         "html": "<a class=\"ytmVideoInfoVideoTitle\" aria-level=\"2\" href=\"https://www.youtube.com/watch?v=lb1Dw0elw0Q\"><span class=\"ytAttributedStringHost ytmVideoInfoLink ytAttributedStringWhiteSpaceNoWrap\" style=\"\">Learn Wireshark in 10 minutes - Wireshark Tutorial for Beginners</span></a>",
+         "impact": "critical",
+         "none": Array [],
+         "target": Array [
+           "iframe",
+           ".ytmVideoInfoVideoTitle",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.aria",
+       "wcag2a",
+       "wcag412",
+       "EN-301-549",
+       "EN-9.4.1.2",
+       "RGAAv4",
+       "RGAA-7.1.1",
+     ],
+   },
+   Object {
+     "description": "Ensure ARIA attributes are not prohibited for an element's role",
+     "help": "Elements must only use permitted ARIA attributes",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.14/aria-prohibited-attr?application=playwright",
+     "id": "aria-prohibited-attr",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [],
+         "failureSummary": "Fix all of the following:
+   aria-label attribute cannot be used on \"div\" elements with no valid role attribute.",
+         "html": "<div class=\"html5-video-player ytp-hide-controls ytp-exp-bottom-control-flexbox ytp-modern-caption ytp-livebadge-color unstarted-mode ytp-large-width-mode\" tabindex=\"\" id=\"movie_player\" data-version=\"/s/player/ef321720/player_embed_es6.vflset/en_US/base.js\" aria-label=\"YouTube Video Player\">",
+         "impact": "serious",
+         "none": Array [
+           Object {
+             "data": Object {
+               "messageKey": "noRoleSingular",
+               "nodeName": "div",
+               "prohibited": Array [
+                 "aria-label",
+               ],
+               "role": null,
+             },
+             "id": "aria-prohibited-attr",
+             "impact": "serious",
+             "message": "aria-label attribute cannot be used on \"div\" elements with no valid role attribute.",
+             "relatedNodes": Array [],
+           },
+         ],
+         "target": Array [
+           "iframe",
+           "#movie_player",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.aria",
+       "wcag2a",
+       "wcag412",
+       "EN-301-549",
+       "EN-9.4.1.2",
+       "RGAAv4",
+       "RGAA-7.1.1",
+     ],
+   },
+   Object {
+     "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.14/color-contrast?application=playwright",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#e8e8f2",
+               "contrastRatio": 4.29,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#6b6b7b",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 4.29 (foreground color: #6b6b7b, background color: #e8e8f2, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"flex items-start justify-between p-3 gap-2.5 transition-colors bg-[#e8e8f2] border-l-2 border-l-[#303055]\">",
+                 "target": Array [
+                   ".border-l-2",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 4.29 (foreground color: #6b6b7b, background color: #e8e8f2, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"flex items-center gap-1\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".border-l-2 > .min-w-0.flex-1 > .mt-1.gap-2.text-\\[11px\\] > .gap-1",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.color",
+       "wcag2aa",
+       "wcag143",
+       "TTv5",
+       "TT13.c",
+       "EN-301-549",
+       "EN-9.1.4.3",
+       "ACT",
+       "RGAAv4",
+       "RGAA-3.2.1",
+     ],
+   },
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - link "CyberTube edu" [ref=e6] [cursor=pointer]:
          - /url: /
          - generic [ref=e10]:
            - generic [ref=e11]: CyberTube
            - generic [ref=e12]: edu
        - navigation [ref=e13]:
          - link "Discover" [ref=e14] [cursor=pointer]:
            - /url: /discover
          - link "Courses" [ref=e15] [cursor=pointer]:
            - /url: /courses
          - link "Domains" [ref=e16] [cursor=pointer]:
            - /url: /domains
          - link "Saved" [ref=e17] [cursor=pointer]:
            - /url: /saved
      - generic [ref=e18]:
        - link "Search resources... /" [ref=e19] [cursor=pointer]:
          - /url: /discover
          - generic [ref=e23]: Search resources...
          - generic [ref=e24]: /
        - link "Sign In" [ref=e25] [cursor=pointer]:
          - /url: /login
  - main [ref=e29]:
    - generic [ref=e30]:
      - generic [ref=e31]:
        - link "Back to All Courses" [ref=e33] [cursor=pointer]:
          - /url: /courses
        - generic [ref=e38]:
          - generic [ref=e39]:
            - generic [ref=e40]:
              - generic [ref=e41]: Course
              - generic [ref=e44]: intermediate
              - generic [ref=e45]: network-security
              - generic [ref=e46]: soc-blue-team
              - generic [ref=e47]: dfir
            - heading "Network Packet Analysis & Forensics Masterclass" [level=1] [ref=e48]
            - paragraph [ref=e49]: An intensive, hands-on video curriculum designed for SOC analysts, incident responders, and network security engineers. Learn to deconstruct network conversations, detect TCP anomalies, analyze TLS session handshakes, and conduct triage on compromised endpoints using live PCAP artifacts.
            - generic [ref=e50]:
              - generic [ref=e51]:
                - generic [ref=e55]: Chris Greer
                - generic [ref=e56]: (Wireshark Foundation / Packet Pioneer)
              - generic [ref=e57]: •
              - generic [ref=e58]: 1.5 hours
              - generic [ref=e62]: •
              - generic [ref=e63]: 2 modules (2 lessons)
          - generic [ref=e69]:
            - generic [ref=e70]:
              - generic [ref=e71]: Progress
              - generic [ref=e75]: 0%
            - generic [ref=e77]: 0/2 completed
      - generic [ref=e79]:
        - generic [ref=e80]:
          - generic [ref=e81]:
            - generic [ref=e82]:
              - iframe [ref=e84]:
                - generic [ref=f1e1]:
                  - generic "YouTube Video Player" [ref=f1e3]
                  - generic [ref=f1e5]:
                    - generic:
                      - generic:
                        - generic [ref=f1e6] [cursor=pointer]
                        - button "Play video" [ref=f1e10] [cursor=pointer]
                        - button "Hide player controls" [ref=f1e14] [cursor=pointer]
                        - generic [ref=f1e16]:
                          - generic [ref=f1e23]:
                            - generic [ref=f1e24]:
                              - link "Learn Wireshark in 10 minutes - Wireshark Tutorial for Beginners" [ref=f1e25] [cursor=pointer]:
                                - /url: https://www.youtube.com/watch?v=lb1Dw0elw0Q
                              - link "Vinsloev Academy" [ref=f1e26] [cursor=pointer]:
                                - /url: /channel/UC-OKxBgjKLBGHbueyIOWptw
                            - generic [ref=f1e28]:
                              - button [ref=f1e29] [cursor=pointer]:
                                - img "thumbnail-image" [ref=f1e30]
                              - generic [ref=f1e32]:
                                - generic: Vinsloev Academy
                                - generic: 36.6K subscribers
                          - generic [ref=f1e33]:
                            - button "Share" [ref=f1e36] [cursor=pointer]
                            - link "Watch on YouTube" [ref=f1e47] [cursor=pointer]:
                              - /url: https://www.youtube.com/watch?v=lb1Dw0elw0Q
                              - generic [ref=f1e48]: Watch on
              - generic [ref=e85]:
                - generic [ref=e86]:
                  - text: "Source:"
                  - strong [ref=e87]: Chris Greer
                - link "Watch on YouTube" [ref=e88] [cursor=pointer]:
                  - /url: https://www.youtube.com/watch?v=lb1Dw0elw0Q
            - generic [ref=e89]:
              - generic [ref=e90]:
                - generic [ref=e91]: "Lesson #1"
                - generic [ref=e92]: "Module 1: Wireshark Core Fundamentals & TCP Streams"
              - heading "Deep Dive into TCP/IP Streams and Packet Analysis" [level=2] [ref=e93]
              - paragraph [ref=e94]: Comprehensive network troubleshooting and packet inspection masterclass demonstrating TCP stream reassembly, SYN-ACK verification, and anomalous beacon detection.
            - generic [ref=e95]:
              - generic [ref=e96]: Course start
              - button "Mark as Completed" [ref=e98] [cursor=pointer]
              - 'link "Next: Diagnosing Latency & Packet Loss with Wireshark" [ref=e103] [cursor=pointer]':
                - /url: /courses/network-packet-analysis-masterclass?lesson=troubleshooting-slow-networks
          - generic [ref=e107]:
            - generic [ref=e108]:
              - heading "Lesson Objectives" [level=3] [ref=e109]
              - list [ref=e114]:
                - listitem [ref=e115]:
                  - generic [ref=e116]: •
                  - generic [ref=e117]: Navigate the Wireshark packet list, tree, and byte views
                - listitem [ref=e118]:
                  - generic [ref=e119]: •
                  - generic [ref=e120]: Follow TCP streams and calculate round-trip delta timings
                - listitem [ref=e121]:
                  - generic [ref=e122]: •
                  - generic [ref=e123]: Identify window size exhaustion and retransmission events
            - generic [ref=e124]:
              - heading "Skills Acquired" [level=3] [ref=e125]
              - generic [ref=e129]:
                - generic [ref=e130]: TCP stream following
                - generic [ref=e131]: Delta time analysis
                - generic [ref=e132]: Display filter filtering
          - generic [ref=e133]:
            - heading "Prerequisites" [level=3] [ref=e134]
            - list [ref=e137]:
              - listitem [ref=e138]:
                - generic [ref=e139]: •
                - generic [ref=e140]: Basic understanding of IPv4 addressing and subnet masks
              - listitem [ref=e141]:
                - generic [ref=e142]: •
                - generic [ref=e143]: Familiarity with the OSI 7-Layer model and TCP/UDP port concepts
        - generic [ref=e146]:
          - generic [ref=e147]:
            - heading "Curriculum" [level=3] [ref=e148]
            - generic [ref=e149]: 2 Modules
          - generic [ref=e150]:
            - generic [ref=e151]:
              - 'button "Module 1: Wireshark Core Fundamentals & TCP Streams 0/1 completed 0%" [ref=e152] [cursor=pointer]':
                - generic [ref=e156]:
                  - 'heading "Module 1: Wireshark Core Fundamentals & TCP Streams" [level=4] [ref=e157]'
                  - generic [ref=e158]: 0/1 completed
                - generic [ref=e159]: 0%
              - generic [ref=e161]:
                - button "Mark completed" [ref=e162] [cursor=pointer]
                - generic [ref=e165]:
                  - link "Deep Dive into TCP/IP Streams and Packet Analysis" [ref=e166] [cursor=pointer]:
                    - /url: /courses/network-packet-analysis-masterclass?lesson=tcp-stream-analysis
                  - generic [ref=e167]:
                    - generic [ref=e168]: 45m
                    - generic [ref=e172]: Playing
            - generic [ref=e173]:
              - 'button "Module 2: Network Forensics & Anomaly Triage 0/1 completed 0%" [ref=e174] [cursor=pointer]':
                - generic [ref=e178]:
                  - 'heading "Module 2: Network Forensics & Anomaly Triage" [level=4] [ref=e179]'
                  - generic [ref=e180]: 0/1 completed
                - generic [ref=e181]: 0%
              - generic [ref=e183]:
                - button "Mark completed" [ref=e184] [cursor=pointer]
                - generic [ref=e187]:
                  - link "Diagnosing Latency & Packet Loss with Wireshark" [ref=e188] [cursor=pointer]:
                    - /url: /courses/network-packet-analysis-masterclass?lesson=troubleshooting-slow-networks
                  - generic [ref=e189]: 45m
      - generic [ref=e194]:
        - generic [ref=e195]:
          - generic [ref=e196]:
            - heading "Connected Labs & Reference Documentation" [level=3] [ref=e197]
            - paragraph [ref=e198]: Extend this lesson with verified tools, packet captures, and specifications.
          - link "Discover catalog →" [ref=e199] [cursor=pointer]:
            - /url: /discover
        - generic [ref=e200]:
          - generic [ref=e201]:
            - link [ref=e202] [cursor=pointer]:
              - /url: /resources/wireshark-masterclass-packet-analysis
              - 'img "Wireshark Packet Analysis: Deep Dive into TCP/IP Streams" [ref=e203]'
              - generic [ref=e204]:
                - generic [ref=e205]: video
                - button "Bookmark resource" [ref=e209]
              - generic:
                - generic: intermediate
                - generic: 45 mins
            - generic [ref=e212]:
              - generic [ref=e213]:
                - generic [ref=e214]:
                  - generic [ref=e215]: Wireshark Foundation
                  - generic [ref=e216]: free
                - heading [level=3] [ref=e217]:
                  - 'link "Wireshark Packet Analysis: Deep Dive into TCP/IP Streams" [ref=e218] [cursor=pointer]':
                    - /url: /resources/wireshark-masterclass-packet-analysis
                - paragraph [ref=e219]: Comprehensive network troubleshooting and packet inspection masterclass demonstrating TCP stream reassembly, TLS handshake verification, and anomalous beacon detection.
              - generic [ref=e220]:
                - generic [ref=e221]:
                  - generic [ref=e222]: network-security
                  - generic [ref=e223]: soc-blue-team
                  - generic [ref=e224]: "+1"
                - link "Open →" [ref=e225] [cursor=pointer]:
                  - /url: /resources/wireshark-masterclass-packet-analysis
          - generic [ref=e226]:
            - link [ref=e227] [cursor=pointer]:
              - /url: /resources/letsdefend-soc-analyst-path
              - 'img "LetsDefend: Certified SOC Analyst Practical Path" [ref=e228]'
              - generic [ref=e229]:
                - generic [ref=e230]: course
                - button "Bookmark resource" [ref=e234]
              - generic:
                - generic: intermediate
                - generic: 40 hours
            - generic [ref=e237]:
              - generic [ref=e238]:
                - generic [ref=e239]:
                  - generic [ref=e240]: LetsDefend
                  - generic [ref=e241]: freemium
                - heading [level=3] [ref=e242]:
                  - 'link "LetsDefend: Certified SOC Analyst Practical Path" [ref=e243] [cursor=pointer]':
                    - /url: /resources/letsdefend-soc-analyst-path
                - paragraph [ref=e244]: Hands-on blue team training simulating real enterprise SOC environments with live alert queues, SIEM dashboards, malware triage, and incident remediation workflows.
              - generic [ref=e245]:
                - generic [ref=e246]:
                  - generic [ref=e247]: soc-blue-team
                  - generic [ref=e248]: dfir
                - link "Open →" [ref=e249] [cursor=pointer]:
                  - /url: /resources/letsdefend-soc-analyst-path
          - generic [ref=e250]:
            - link [ref=e251] [cursor=pointer]:
              - /url: /resources/sans-incident-handlers-handbook
              - 'img "SANS Institute: The Incident Handler''s Handbook" [ref=e252]'
              - generic [ref=e253]:
                - generic [ref=e254]: article
                - button "Bookmark resource" [ref=e258]
              - generic:
                - generic: beginner
                - generic: 30 mins
            - generic [ref=e261]:
              - generic [ref=e262]:
                - generic [ref=e263]:
                  - generic [ref=e264]: SANS Institute
                  - generic [ref=e265]: free
                - heading [level=3] [ref=e266]:
                  - 'link "SANS Institute: The Incident Handler''s Handbook" [ref=e267] [cursor=pointer]':
                    - /url: /resources/sans-incident-handlers-handbook
                - paragraph [ref=e268]: "The industry-standard architectural paper detailing the six phases of cyber incident response: Preparation, Identification, Containment, Eradication, Recovery, and Lessons Learned."
              - generic [ref=e269]:
                - generic [ref=e270]:
                  - generic [ref=e271]: dfir
                  - generic [ref=e272]: soc-blue-team
                - link "Open →" [ref=e273] [cursor=pointer]:
                  - /url: /resources/sans-incident-handlers-handbook
  - contentinfo [ref=e274]:
    - generic [ref=e275]:
      - generic [ref=e276]:
        - generic [ref=e277]:
          - link "CyberTube" [ref=e278] [cursor=pointer]:
            - /url: /
          - paragraph [ref=e283]: Curated cybersecurity video courses, packet inspection, and hardware security education.
          - paragraph [ref=e284]: Synchronized with verified technical channels.
        - generic [ref=e285]:
          - heading "Core Tracks" [level=3] [ref=e286]
          - list [ref=e287]:
            - listitem [ref=e288]:
              - link "Cybersecurity Fundamentals" [ref=e289] [cursor=pointer]:
                - /url: /discover?domain=fundamentals
            - listitem [ref=e290]:
              - link "Networking & Network Security" [ref=e291] [cursor=pointer]:
                - /url: /discover?domain=network-security
            - listitem [ref=e292]:
              - link "SOC & Blue Team Operations" [ref=e293] [cursor=pointer]:
                - /url: /discover?domain=soc-blue-team
            - listitem [ref=e294]:
              - link "Red Team & Penetration Testing" [ref=e295] [cursor=pointer]:
                - /url: /discover?domain=red-team-pentest
            - listitem [ref=e296]:
              - link "Web & Application Security" [ref=e297] [cursor=pointer]:
                - /url: /discover?domain=web-app-security
        - generic [ref=e298]:
          - heading "Specialized Labs" [level=3] [ref=e299]
          - list [ref=e300]:
            - listitem [ref=e301]:
              - link "Digital Forensics & Incident Response" [ref=e302] [cursor=pointer]:
                - /url: /discover?domain=dfir
            - listitem [ref=e303]:
              - link "Malware Analysis & Reverse Engineering" [ref=e304] [cursor=pointer]:
                - /url: /discover?domain=malware-reverse-engineering
            - listitem [ref=e305]:
              - link "Cloud Security" [ref=e306] [cursor=pointer]:
                - /url: /discover?domain=cloud-security
            - listitem [ref=e307]:
              - link "OSINT & Threat Intelligence" [ref=e308] [cursor=pointer]:
                - /url: /discover?domain=osint-threat-intel
            - listitem [ref=e309]:
              - link "IoT & Embedded Security" [ref=e310] [cursor=pointer]:
                - /url: /discover?domain=iot-embedded-security
        - generic [ref=e311]:
          - heading "Formats" [level=3] [ref=e312]
          - generic [ref=e313]:
            - link "Video" [ref=e314] [cursor=pointer]:
              - /url: /discover?type=video
            - link "Course" [ref=e315] [cursor=pointer]:
              - /url: /discover?type=course
            - link "Article" [ref=e316] [cursor=pointer]:
              - /url: /discover?type=article
            - link "Documentation" [ref=e317] [cursor=pointer]:
              - /url: /discover?type=documentation
            - link "GitHub Repo" [ref=e318] [cursor=pointer]:
              - /url: /discover?type=github
            - link "Hands-on Lab" [ref=e319] [cursor=pointer]:
              - /url: /discover?type=lab
            - link "CTF Challenge" [ref=e320] [cursor=pointer]:
              - /url: /discover?type=ctf
            - link "Podcast" [ref=e321] [cursor=pointer]:
              - /url: /discover?type=podcast
      - generic [ref=e322]:
        - generic [ref=e323]: © 2026 CyberTube. Open Developer & Security Education.
        - generic [ref=e324]:
          - link "Courses" [ref=e325] [cursor=pointer]:
            - /url: /courses
          - link "Domains" [ref=e326] [cursor=pointer]:
            - /url: /domains
          - link "Discover" [ref=e327] [cursor=pointer]:
            - /url: /discover
  - alert [ref=e328]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import AxeBuilder from '@axe-core/playwright';
  3  | 
  4  | test.describe('Phase 4.4 - Automated Accessibility Audit (Axe-Core)', () => {
  5  |   const routesToAudit = [
  6  |     { name: 'Home Page', path: '/' },
  7  |     { name: 'Courses Index', path: '/courses' },
  8  |     { name: 'Course Detail', path: '/courses/network-packet-analysis-masterclass' },
  9  |     { name: 'Discover Page', path: '/discover' },
  10 |     { name: 'Resource Detail', path: '/resources/portswigger-sql-injection-lab' },
  11 |     { name: 'Login Page', path: '/login' },
  12 |   ];
  13 | 
  14 |   for (const route of routesToAudit) {
  15 |     test(`Axe-core scan on ${route.name} (${route.path}) passes with no critical or serious violations`, async ({ page }) => {
  16 |       await page.goto(route.path);
  17 |       await page.waitForLoadState('networkidle');
  18 | 
  19 |       const accessibilityScanResults = await new AxeBuilder({ page })
  20 |         .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
  21 |         .analyze();
  22 | 
  23 |       // Filter critical and serious violations
  24 |       const severeViolations = accessibilityScanResults.violations.filter(
  25 |         v => v.impact === 'critical' || v.impact === 'serious'
  26 |       );
  27 | 
  28 |       if (severeViolations.length > 0) {
  29 |         console.error(`A11y Violations on ${route.path}:`, JSON.stringify(severeViolations, null, 2));
  30 |       }
  31 | 
> 32 |       expect(severeViolations).toEqual([]);
     |                                ^ Error: expect(received).toEqual(expected) // deep equality
  33 |     });
  34 |   }
  35 | 
  36 |   test('Account page (unauthenticated redirect or landing) has no critical/serious violations', async ({ page }) => {
  37 |     await page.goto('/account');
  38 |     await page.waitForLoadState('networkidle');
  39 | 
  40 |     const accessibilityScanResults = await new AxeBuilder({ page })
  41 |       .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
  42 |       .analyze();
  43 | 
  44 |     const severeViolations = accessibilityScanResults.violations.filter(
  45 |       v => v.impact === 'critical' || v.impact === 'serious'
  46 |     );
  47 | 
  48 |     expect(severeViolations).toEqual([]);
  49 |   });
  50 | });
  51 | 
  52 | 
```