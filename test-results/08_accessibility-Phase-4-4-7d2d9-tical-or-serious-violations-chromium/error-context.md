# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 08_accessibility.spec.ts >> Phase 4.4 - Automated Accessibility Audit (Axe-Core) >> Axe-core scan on Discover Page (/discover) passes with no critical or serious violations
- Location: tests\08_accessibility.spec.ts:15:9

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 87

- Array []
+ Array [
+   Object {
+     "description": "Ensure select element has an accessible name",
+     "help": "Select element must have an accessible name",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.14/select-name?application=playwright",
+     "id": "select-name",
+     "impact": "critical",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "implicit-label",
+             "impact": "critical",
+             "message": "Element does not have an implicit (wrapped) <label>",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "explicit-label",
+             "impact": "critical",
+             "message": "Element does not have an explicit <label>",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "aria-label",
+             "impact": "critical",
+             "message": "aria-label attribute does not exist or is empty",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "aria-labelledby",
+             "impact": "critical",
+             "message": "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": Object {
+               "messageKey": "noAttr",
+             },
+             "id": "non-empty-title",
+             "impact": "critical",
+             "message": "Element has no title attribute",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "presentational-role",
+             "impact": "critical",
+             "message": "Element's default semantics were not overridden with role=\"none\" or role=\"presentation\"",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element does not have an implicit (wrapped) <label>
+   Element does not have an explicit <label>
+   aria-label attribute does not exist or is empty
+   aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
+   Element has no title attribute
+   Element's default semantics were not overridden with role=\"none\" or role=\"presentation\"",
+         "html": "<select class=\"px-3 py-2 text-xs font-mono rounded-[4px] bg-white border border-[#e4e4ed] text-[#403f53] focus:outline-none focus:border-[#303055] min-h-[38px]\">",
+         "impact": "critical",
+         "none": Array [],
+         "target": Array [
+           "select",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.forms",
+       "wcag2a",
+       "wcag412",
+       "section508",
+       "section508.22.n",
+       "TTv5",
+       "TT5.c",
+       "EN-301-549",
+       "EN-9.4.1.2",
+       "ACT",
+       "RGAAv4",
+       "RGAA-11.1.1",
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
        - generic [ref=e32]:
          - generic [ref=e33]:
            - heading "Resource Directory" [level=1] [ref=e34]
            - paragraph [ref=e35]: Filter through verified technical cybersecurity publications and labs.
          - generic [ref=e36]: 22 / 22 items
        - generic [ref=e37]:
          - searchbox "Search by vulnerability, tool, protocol, or provider..." [ref=e39]
          - combobox [ref=e41]:
            - 'option "Sort: Relevance" [selected]'
            - 'option "Sort: Newest"'
            - 'option "Sort: Popular"'
      - generic [ref=e42]:
        - complementary [ref=e45]:
          - heading "Filters" [level=2] [ref=e47]
          - generic [ref=e48]:
            - heading "Difficulty" [level=3] [ref=e49]
            - generic [ref=e50]:
              - generic [ref=e51] [cursor=pointer]:
                - generic [ref=e52]:
                  - checkbox "beginner 11" [ref=e53]
                  - generic [ref=e54]: beginner
                - generic [ref=e55]: "11"
              - generic [ref=e56] [cursor=pointer]:
                - generic [ref=e57]:
                  - checkbox "intermediate 6" [ref=e58]
                  - generic [ref=e59]: intermediate
                - generic [ref=e60]: "6"
              - generic [ref=e61] [cursor=pointer]:
                - generic [ref=e62]:
                  - checkbox "advanced 5" [ref=e63]
                  - generic [ref=e64]: advanced
                - generic [ref=e65]: "5"
          - generic [ref=e66]:
            - heading "Format" [level=3] [ref=e67]
            - generic [ref=e68]:
              - generic [ref=e69] [cursor=pointer]:
                - generic [ref=e70]:
                  - checkbox "Video 3" [ref=e71]
                  - generic [ref=e72]: Video
                - generic [ref=e73]: "3"
              - generic [ref=e74] [cursor=pointer]:
                - generic [ref=e75]:
                  - checkbox "Course 2" [ref=e76]
                  - generic [ref=e77]: Course
                - generic [ref=e78]: "2"
              - generic [ref=e79] [cursor=pointer]:
                - generic [ref=e80]:
                  - checkbox "Article 2" [ref=e81]
                  - generic [ref=e82]: Article
                - generic [ref=e83]: "2"
              - generic [ref=e84] [cursor=pointer]:
                - generic [ref=e85]:
                  - checkbox "Documentation 2" [ref=e86]
                  - generic [ref=e87]: Documentation
                - generic [ref=e88]: "2"
              - generic [ref=e89] [cursor=pointer]:
                - generic [ref=e90]:
                  - checkbox "GitHub Repo 2" [ref=e91]
                  - generic [ref=e92]: GitHub Repo
                - generic [ref=e93]: "2"
              - generic [ref=e94] [cursor=pointer]:
                - generic [ref=e95]:
                  - checkbox "Hands-on Lab 2" [ref=e96]
                  - generic [ref=e97]: Hands-on Lab
                - generic [ref=e98]: "2"
              - generic [ref=e99] [cursor=pointer]:
                - generic [ref=e100]:
                  - checkbox "CTF Challenge 2" [ref=e101]
                  - generic [ref=e102]: CTF Challenge
                - generic [ref=e103]: "2"
              - generic [ref=e104] [cursor=pointer]:
                - generic [ref=e105]:
                  - checkbox "Podcast 2" [ref=e106]
                  - generic [ref=e107]: Podcast
                - generic [ref=e108]: "2"
              - generic [ref=e109] [cursor=pointer]:
                - generic [ref=e110]:
                  - checkbox "Research Paper 2" [ref=e111]
                  - generic [ref=e112]: Research Paper
                - generic [ref=e113]: "2"
              - generic [ref=e114] [cursor=pointer]:
                - generic [ref=e115]:
                  - checkbox "Certification 2" [ref=e116]
                  - generic [ref=e117]: Certification
                - generic [ref=e118]: "2"
              - generic [ref=e119] [cursor=pointer]:
                - generic [ref=e120]:
                  - checkbox "Exam Prep 1" [ref=e121]
                  - generic [ref=e122]: Exam Prep
                - generic [ref=e123]: "1"
          - generic [ref=e124]:
            - heading "Domain" [level=3] [ref=e125]
            - generic [ref=e126]:
              - generic [ref=e127] [cursor=pointer]:
                - generic [ref=e128]:
                  - checkbox "Cybersecurity Fundamentals 12" [ref=e129]
                  - generic [ref=e130]: Cybersecurity Fundamentals
                - generic [ref=e131]: "12"
              - generic [ref=e132] [cursor=pointer]:
                - generic [ref=e133]:
                  - checkbox "Networking & Network Security 7" [ref=e134]
                  - generic [ref=e135]: Networking & Network Security
                - generic [ref=e136]: "7"
              - generic [ref=e137] [cursor=pointer]:
                - generic [ref=e138]:
                  - checkbox "SOC & Blue Team Operations 5" [ref=e139]
                  - generic [ref=e140]: SOC & Blue Team Operations
                - generic [ref=e141]: "5"
              - generic [ref=e142] [cursor=pointer]:
                - generic [ref=e143]:
                  - checkbox "Red Team & Penetration Testing 6" [ref=e144]
                  - generic [ref=e145]: Red Team & Penetration Testing
                - generic [ref=e146]: "6"
              - generic [ref=e147] [cursor=pointer]:
                - generic [ref=e148]:
                  - checkbox "Web & Application Security 4" [ref=e149]
                  - generic [ref=e150]: Web & Application Security
                - generic [ref=e151]: "4"
              - generic [ref=e152] [cursor=pointer]:
                - generic [ref=e153]:
                  - checkbox "Digital Forensics & Incident Response 4" [ref=e154]
                  - generic [ref=e155]: Digital Forensics & Incident Response
                - generic [ref=e156]: "4"
              - generic [ref=e157] [cursor=pointer]:
                - generic [ref=e158]:
                  - checkbox "Malware Analysis & Reverse Engineering 5" [ref=e159]
                  - generic [ref=e160]: Malware Analysis & Reverse Engineering
                - generic [ref=e161]: "5"
              - generic [ref=e162] [cursor=pointer]:
                - generic [ref=e163]:
                  - checkbox "Cloud Security 2" [ref=e164]
                  - generic [ref=e165]: Cloud Security
                - generic [ref=e166]: "2"
              - generic [ref=e167] [cursor=pointer]:
                - generic [ref=e168]:
                  - checkbox "OSINT & Threat Intelligence 2" [ref=e169]
                  - generic [ref=e170]: OSINT & Threat Intelligence
                - generic [ref=e171]: "2"
              - generic [ref=e172] [cursor=pointer]:
                - generic [ref=e173]:
                  - checkbox "IoT & Embedded Security 2" [ref=e174]
                  - generic [ref=e175]: IoT & Embedded Security
                - generic [ref=e176]: "2"
              - generic [ref=e177] [cursor=pointer]:
                - generic [ref=e178]:
                  - checkbox "Cryptography 2" [ref=e179]
                  - generic [ref=e180]: Cryptography
                - generic [ref=e181]: "2"
          - generic [ref=e182]:
            - heading "Pricing" [level=3] [ref=e183]
            - generic [ref=e184]:
              - generic [ref=e185] [cursor=pointer]:
                - generic [ref=e186]:
                  - checkbox "free 18" [ref=e187]
                  - generic [ref=e188]: free
                - generic [ref=e189]: "18"
              - generic [ref=e190] [cursor=pointer]:
                - generic [ref=e191]:
                  - checkbox "freemium 2" [ref=e192]
                  - generic [ref=e193]: freemium
                - generic [ref=e194]: "2"
              - generic [ref=e195] [cursor=pointer]:
                - generic [ref=e196]:
                  - checkbox "paid 2" [ref=e197]
                  - generic [ref=e198]: paid
                - generic [ref=e199]: "2"
        - generic [ref=e201]:
          - generic [ref=e202]:
            - link [ref=e203] [cursor=pointer]:
              - /url: /resources/nist-post-quantum-cryptography-fips
              - img "NIST Releases Initial Post-Quantum Cryptography Standards (FIPS 203, 204, 205)" [ref=e204]
              - generic [ref=e205]:
                - generic [ref=e206]: research
                - button "Bookmark resource" [ref=e212]
              - generic:
                - generic: advanced
                - generic: 60 mins
            - generic [ref=e215]:
              - generic [ref=e216]:
                - generic [ref=e217]:
                  - generic [ref=e218]: NIST
                  - generic [ref=e219]: free
                - heading [level=3] [ref=e220]:
                  - link "NIST Releases Initial Post-Quantum Cryptography Standards (FIPS 203, 204, 205)" [ref=e221] [cursor=pointer]:
                    - /url: /resources/nist-post-quantum-cryptography-fips
                - paragraph [ref=e222]: "Official National Institute of Standards and Technology publications establishing quantum-resistant algorithms: ML-KEM for general encryption, and ML-DSA / SLH-DSA for digital signatures."
              - generic [ref=e223]:
                - generic [ref=e224]:
                  - generic [ref=e225]: cryptography
                  - generic [ref=e226]: fundamentals
                - link "Open →" [ref=e227] [cursor=pointer]:
                  - /url: /resources/nist-post-quantum-cryptography-fips
          - generic [ref=e228]:
            - link [ref=e229] [cursor=pointer]:
              - /url: /resources/mitre-attack-enterprise-matrix
              - img "MITRE ATT&CK Enterprise Matrix Documentation" [ref=e230]
              - generic [ref=e231]:
                - generic [ref=e232]: documentation
                - button "Bookmark resource" [ref=e235]
              - generic:
                - generic: beginner
                - generic: Reference documentation
            - generic [ref=e238]:
              - generic [ref=e239]:
                - generic [ref=e240]:
                  - generic [ref=e241]: MITRE Corporation
                  - generic [ref=e242]: free
                - heading [level=3] [ref=e243]:
                  - link "MITRE ATT&CK Enterprise Matrix Documentation" [ref=e244] [cursor=pointer]:
                    - /url: /resources/mitre-attack-enterprise-matrix
                - paragraph [ref=e245]: The definitive globally accessible knowledge base of adversary tactics and techniques based on real-world threat observations, used as a foundation for threat modeling and defense.
              - generic [ref=e246]:
                - generic [ref=e247]:
                  - generic [ref=e248]: fundamentals
                  - generic [ref=e249]: soc-blue-team
                  - generic [ref=e250]: "+1"
                - link "Open →" [ref=e251] [cursor=pointer]:
                  - /url: /resources/mitre-attack-enterprise-matrix
          - generic [ref=e252]:
            - link [ref=e253] [cursor=pointer]:
              - /url: /resources/darknet-diaries-podcast
              - 'img "Darknet Diaries: True Stories from the Dark Side of the Internet" [ref=e254]'
              - generic [ref=e255]:
                - generic [ref=e256]: podcast
                - button "Bookmark resource" [ref=e259]
              - generic:
                - generic: beginner
                - generic: 50 mins per episode
            - generic [ref=e262]:
              - generic [ref=e263]:
                - generic [ref=e264]:
                  - generic [ref=e265]: Jack Rhysider
                  - generic [ref=e266]: free
                - heading [level=3] [ref=e267]:
                  - 'link "Darknet Diaries: True Stories from the Dark Side of the Internet" [ref=e268] [cursor=pointer]':
                    - /url: /resources/darknet-diaries-podcast
                - paragraph [ref=e269]: Investigative audio podcast exploring real-world cybersecurity breaches, government hackings, cyber espionage operations, penetration testing physical drops, and criminal underworlds.
              - generic [ref=e270]:
                - generic [ref=e271]:
                  - generic [ref=e272]: osint-threat-intel
                  - generic [ref=e273]: fundamentals
                  - generic [ref=e274]: "+1"
                - link "Open →" [ref=e275] [cursor=pointer]:
                  - /url: /resources/darknet-diaries-podcast
          - generic [ref=e276]:
            - link [ref=e277] [cursor=pointer]:
              - /url: /resources/professor-messer-security-plus-training
              - img "Professor Messer's CompTIA SY0-701 Training Course & Exam Prep" [ref=e278]
              - generic [ref=e279]:
                - generic [ref=e280]: exam-prep
                - button "Bookmark resource" [ref=e284]
              - generic:
                - generic: beginner
                - generic: 22 hours
            - generic [ref=e287]:
              - generic [ref=e288]:
                - generic [ref=e289]:
                  - generic [ref=e290]: Professor Messer
                  - generic [ref=e291]: free
                - heading [level=3] [ref=e292]:
                  - link "Professor Messer's CompTIA SY0-701 Training Course & Exam Prep" [ref=e293] [cursor=pointer]:
                    - /url: /resources/professor-messer-security-plus-training
                - paragraph [ref=e294]: Complete, structured, video training series and exam preparation study notes covering every objective of the CompTIA Security+ examination with zero paywall.
              - generic [ref=e295]:
                - generic [ref=e296]:
                  - generic [ref=e297]: fundamentals
                  - generic [ref=e298]: cloud-security
                  - generic [ref=e299]: "+1"
                - link "Open →" [ref=e300] [cursor=pointer]:
                  - /url: /resources/professor-messer-security-plus-training
          - generic [ref=e301]:
            - link [ref=e302] [cursor=pointer]:
              - /url: /resources/hindi-cybersecurity-networking-fundamentals
              - img "Cyber Security & Computer Networking Complete Course (Hindi)" [ref=e303]
              - generic [ref=e304]:
                - generic [ref=e305]: video
                - button "Bookmark resource" [ref=e309]
              - generic:
                - generic: beginner
                - generic: 2 hours 15 mins
            - generic [ref=e312]:
              - generic [ref=e313]:
                - generic [ref=e314]:
                  - generic [ref=e315]: Geeky Shows
                  - generic [ref=e316]: free
                - heading [level=3] [ref=e317]:
                  - link "Cyber Security & Computer Networking Complete Course (Hindi)" [ref=e318] [cursor=pointer]:
                    - /url: /resources/hindi-cybersecurity-networking-fundamentals
                - paragraph [ref=e319]: Comprehensive Hindi-language foundational guide covering network topologies, IP addressing, subnet masks, DNS resolution, and core defensive concepts for vernacular learners.
              - generic [ref=e320]:
                - generic [ref=e321]:
                  - generic [ref=e322]: fundamentals
                  - generic [ref=e323]: network-security
                - link "Open →" [ref=e324] [cursor=pointer]:
                  - /url: /resources/hindi-cybersecurity-networking-fundamentals
          - generic [ref=e325]:
            - link [ref=e326] [cursor=pointer]:
              - /url: /resources/picoctf-educational-security-competition
              - 'img "picoCTF: Free Computer Security Education & Competition Platform" [ref=e327]'
              - generic [ref=e328]:
                - generic [ref=e329]: ctf
                - button "Bookmark resource" [ref=e332]
              - generic:
                - generic: beginner
                - generic: Self-paced
            - generic [ref=e335]:
              - generic [ref=e336]:
                - generic [ref=e337]:
                  - generic [ref=e338]: Carnegie Mellon University CyLab
                  - generic [ref=e339]: free
                - heading [level=3] [ref=e340]:
                  - 'link "picoCTF: Free Computer Security Education & Competition Platform" [ref=e341] [cursor=pointer]':
                    - /url: /resources/picoctf-educational-security-competition
                - paragraph [ref=e342]: Designed by Carnegie Mellon University CyLab, picoCTF delivers hundreds of gamified security challenges spanning reverse engineering, web exploitation, binary exploitation, and forensics.
              - generic [ref=e343]:
                - generic [ref=e344]:
                  - generic [ref=e345]: fundamentals
                  - generic [ref=e346]: web-app-security
                  - generic [ref=e347]: "+2"
                - link "Open →" [ref=e348] [cursor=pointer]:
                  - /url: /resources/picoctf-educational-security-competition
          - generic [ref=e349]:
            - link [ref=e350] [cursor=pointer]:
              - /url: /resources/hackthebox-starting-point-track
              - 'img "Hack The Box: Starting Point Penetration Testing Labs" [ref=e351]'
              - generic [ref=e352]:
                - generic [ref=e353]: lab
                - button "Bookmark resource" [ref=e356]
              - generic:
                - generic: beginner
                - generic: 10 hours
            - generic [ref=e359]:
              - generic [ref=e360]:
                - generic [ref=e361]:
                  - generic [ref=e362]: Hack The Box
                  - generic [ref=e363]: freemium
                - heading [level=3] [ref=e364]:
                  - 'link "Hack The Box: Starting Point Penetration Testing Labs" [ref=e365] [cursor=pointer]':
                    - /url: /resources/hackthebox-starting-point-track
                - paragraph [ref=e366]: "Guided hands-on laboratory machines introducing fundamental penetration testing concepts: SMB enumeration, Telnet vulnerabilities, Redis unauthenticated access, and privilege escalation."
              - generic [ref=e367]:
                - generic [ref=e368]:
                  - generic [ref=e369]: red-team-pentest
                  - generic [ref=e370]: network-security
                - link "Open →" [ref=e371] [cursor=pointer]:
                  - /url: /resources/hackthebox-starting-point-track
          - generic [ref=e372]:
            - link [ref=e373] [cursor=pointer]:
              - /url: /resources/portswigger-sql-injection-lab
              - 'img "PortSwigger Web Security Academy: SQL Injection Labs" [ref=e374]'
              - generic [ref=e375]:
                - generic [ref=e376]: lab
                - button "Bookmark resource" [ref=e379]
              - generic:
                - generic: intermediate
                - generic: 4 hours
            - generic [ref=e382]:
              - generic [ref=e383]:
                - generic [ref=e384]:
                  - generic [ref=e385]: PortSwigger
                  - generic [ref=e386]: free
                - heading [level=3] [ref=e387]:
                  - 'link "PortSwigger Web Security Academy: SQL Injection Labs" [ref=e388] [cursor=pointer]':
                    - /url: /resources/portswigger-sql-injection-lab
                - paragraph [ref=e389]: Interactive, real-world vulnerable web applications designed to teach SQL injection discovery, UNION exploitation, and blind SQLi data exfiltration techniques.
              - generic [ref=e390]:
                - generic [ref=e391]:
                  - generic [ref=e392]: web-app-security
                  - generic [ref=e393]: red-team-pentest
                - link "Open →" [ref=e394] [cursor=pointer]:
                  - /url: /resources/portswigger-sql-injection-lab
          - generic [ref=e395]:
            - link [ref=e396] [cursor=pointer]:
              - /url: /resources/overthewire-bandit-wargame
              - 'img "OverTheWire: Bandit Linux Security Wargame" [ref=e397]'
              - generic [ref=e398]:
                - generic [ref=e399]: ctf
                - button "Bookmark resource" [ref=e402]
              - generic:
                - generic: beginner
                - generic: 8 hours
            - generic [ref=e405]:
              - generic [ref=e406]:
                - generic [ref=e407]:
                  - generic [ref=e408]: OverTheWire
                  - generic [ref=e409]: free
                - heading [level=3] [ref=e410]:
                  - 'link "OverTheWire: Bandit Linux Security Wargame" [ref=e411] [cursor=pointer]':
                    - /url: /resources/overthewire-bandit-wargame
                - paragraph [ref=e412]: The premier hands-on wargame geared towards absolute beginners to learn Linux command-line security, file permissions, SSH keys, network sockets, and shell privilege separation.
              - generic [ref=e413]:
                - generic [ref=e414]:
                  - generic [ref=e415]: fundamentals
                  - generic [ref=e416]: red-team-pentest
                - link "Open →" [ref=e417] [cursor=pointer]:
                  - /url: /resources/overthewire-bandit-wargame
          - generic [ref=e418]:
            - link [ref=e419] [cursor=pointer]:
              - /url: /resources/wireshark-masterclass-packet-analysis
              - 'img "Wireshark Packet Analysis: Deep Dive into TCP/IP Streams" [ref=e420]'
              - generic [ref=e421]:
                - generic [ref=e422]: video
                - button "Bookmark resource" [ref=e426]
              - generic:
                - generic: intermediate
                - generic: 45 mins
            - generic [ref=e429]:
              - generic [ref=e430]:
                - generic [ref=e431]:
                  - generic [ref=e432]: Wireshark Foundation
                  - generic [ref=e433]: free
                - heading [level=3] [ref=e434]:
                  - 'link "Wireshark Packet Analysis: Deep Dive into TCP/IP Streams" [ref=e435] [cursor=pointer]':
                    - /url: /resources/wireshark-masterclass-packet-analysis
                - paragraph [ref=e436]: Comprehensive network troubleshooting and packet inspection masterclass demonstrating TCP stream reassembly, TLS handshake verification, and anomalous beacon detection.
              - generic [ref=e437]:
                - generic [ref=e438]:
                  - generic [ref=e439]: network-security
                  - generic [ref=e440]: soc-blue-team
                  - generic [ref=e441]: "+1"
                - link "Open →" [ref=e442] [cursor=pointer]:
                  - /url: /resources/wireshark-masterclass-packet-analysis
          - generic [ref=e443]:
            - link [ref=e444] [cursor=pointer]:
              - /url: /resources/blackhat-hardware-backdoors-x86
              - 'img "GOD MODE UNLOCKED: Hardware Backdoors in x86 CPUs" [ref=e445]'
              - generic [ref=e446]:
                - generic [ref=e447]: video
                - button "Bookmark resource" [ref=e451]
              - generic:
                - generic: advanced
                - generic: 51 mins
            - generic [ref=e454]:
              - generic [ref=e455]:
                - generic [ref=e456]:
                  - generic [ref=e457]: Black Hat
                  - generic [ref=e458]: free
                - heading [level=3] [ref=e459]:
                  - 'link "GOD MODE UNLOCKED: Hardware Backdoors in x86 CPUs" [ref=e460] [cursor=pointer]':
                    - /url: /resources/blackhat-hardware-backdoors-x86
                - paragraph [ref=e461]: Black Hat technical briefing revealing architectural ring-minus-one hardware backdoors, x86 hidden instruction sets, and CPU-level security boundary subversions.
              - generic [ref=e462]:
                - generic [ref=e463]:
                  - generic [ref=e464]: malware-reverse-engineering
                  - generic [ref=e465]: iot-embedded-security
                - link "Open →" [ref=e466] [cursor=pointer]:
                  - /url: /resources/blackhat-hardware-backdoors-x86
          - generic [ref=e467]:
            - link [ref=e468] [cursor=pointer]:
              - /url: /resources/smashing-security-podcast
              - 'img "Smashing Security: Helpful and Entertaining Cybersecurity Discussion" [ref=e469]'
              - generic [ref=e470]:
                - generic [ref=e471]: podcast
                - button "Bookmark resource" [ref=e474]
              - generic:
                - generic: beginner
                - generic: 45 mins per episode
            - generic [ref=e477]:
              - generic [ref=e478]:
                - generic [ref=e479]:
                  - generic [ref=e480]: Smashing Security
                  - generic [ref=e481]: free
                - heading [level=3] [ref=e482]:
                  - 'link "Smashing Security: Helpful and Entertaining Cybersecurity Discussion" [ref=e483] [cursor=pointer]':
                    - /url: /resources/smashing-security-podcast
                - paragraph [ref=e484]: Award-winning weekly podcast hosted by cybersecurity veterans Graham Cluley and Carole Theriault, offering engaging, insightful, and accessible analysis of the week's top cyber stories.
              - generic [ref=e485]:
                - generic [ref=e486]:
                  - generic [ref=e487]: fundamentals
                  - generic [ref=e488]: web-app-security
                - link "Open →" [ref=e489] [cursor=pointer]:
                  - /url: /resources/smashing-security-podcast
          - generic [ref=e490]:
            - link [ref=e491] [cursor=pointer]:
              - /url: /resources/embedded-hardware-hacking-uart-jtag
              - 'img "Hardware Hacking 101: Interfacing with UART and JTAG on Embedded Devices" [ref=e492]'
              - generic [ref=e493]:
                - generic [ref=e494]: article
                - button "Bookmark resource" [ref=e498]
              - generic:
                - generic: intermediate
                - generic: 25 mins
            - generic [ref=e501]:
              - generic [ref=e502]:
                - generic [ref=e503]:
                  - generic [ref=e504]: CyberTube Research
                  - generic [ref=e505]: free
                - heading [level=3] [ref=e506]:
                  - 'link "Hardware Hacking 101: Interfacing with UART and JTAG on Embedded Devices" [ref=e507] [cursor=pointer]':
                    - /url: /resources/embedded-hardware-hacking-uart-jtag
                - paragraph [ref=e508]: Practical guide to identifying hardware test pads on circuit boards, utilizing logic analyzers, baud rate calculation, and gaining root interactive shell access over UART serial pins.
              - generic [ref=e509]:
                - generic [ref=e510]:
                  - generic [ref=e511]: iot-embedded-security
                  - generic [ref=e512]: malware-reverse-engineering
                - link "Open →" [ref=e513] [cursor=pointer]:
                  - /url: /resources/embedded-hardware-hacking-uart-jtag
          - generic [ref=e514]:
            - link [ref=e515] [cursor=pointer]:
              - /url: /resources/comptia-security-plus-certification
              - img "CompTIA Security+ (SY0-701) Certification Guide" [ref=e516]
              - generic [ref=e517]:
                - generic [ref=e518]: certification
                - button "Bookmark resource" [ref=e522]
              - generic:
                - generic: beginner
                - generic: 80 hours study
            - generic [ref=e525]:
              - generic [ref=e526]:
                - generic [ref=e527]:
                  - generic [ref=e528]: CompTIA
                  - generic [ref=e529]: paid
                - heading [level=3] [ref=e530]:
                  - link "CompTIA Security+ (SY0-701) Certification Guide" [ref=e531] [cursor=pointer]:
                    - /url: /resources/comptia-security-plus-certification
                - paragraph [ref=e532]: The globally recognized foundational security credential verifying baseline knowledge across security controls, network architecture, risk management, and incident response.
              - generic [ref=e533]:
                - generic [ref=e534]:
                  - generic [ref=e535]: fundamentals
                  - generic [ref=e536]: soc-blue-team
                  - generic [ref=e537]: "+1"
                - link "Open →" [ref=e538] [cursor=pointer]:
                  - /url: /resources/comptia-security-plus-certification
          - generic [ref=e539]:
            - link [ref=e540] [cursor=pointer]:
              - /url: /resources/volatility-framework-memory-analysis
              - 'img "Volatility 3: Advanced Memory Forensics Framework" [ref=e541]'
              - generic [ref=e542]:
                - generic [ref=e543]: github
                - button "Bookmark resource" [ref=e547]
              - generic:
                - generic: advanced
                - generic: Self-paced
            - generic [ref=e550]:
              - generic [ref=e551]:
                - generic [ref=e552]:
                  - generic [ref=e553]: Volatility Foundation
                  - generic [ref=e554]: free
                - heading [level=3] [ref=e555]:
                  - 'link "Volatility 3: Advanced Memory Forensics Framework" [ref=e556] [cursor=pointer]':
                    - /url: /resources/volatility-framework-memory-analysis
                - paragraph [ref=e557]: The world's most widely used open-source memory forensics framework for extracting volatile runtime memory artifacts, injected DLLs, unlinked processes, and kernel rootkits.
              - generic [ref=e558]:
                - generic [ref=e559]:
                  - generic [ref=e560]: dfir
                  - generic [ref=e561]: malware-reverse-engineering
                - link "Open →" [ref=e562] [cursor=pointer]:
                  - /url: /resources/volatility-framework-memory-analysis
          - generic [ref=e563]:
            - link [ref=e564] [cursor=pointer]:
              - /url: /resources/nmap-network-scanner-source
              - img "Nmap (Network Mapper) Official Repository & Documentation" [ref=e565]
              - generic [ref=e566]:
                - generic [ref=e567]: github
                - button "Bookmark resource" [ref=e571]
              - generic:
                - generic: intermediate
                - generic: Self-paced
            - generic [ref=e574]:
              - generic [ref=e575]:
                - generic [ref=e576]:
                  - generic [ref=e577]: Nmap Project
                  - generic [ref=e578]: free
                - heading [level=3] [ref=e579]:
                  - link "Nmap (Network Mapper) Official Repository & Documentation" [ref=e580] [cursor=pointer]:
                    - /url: /resources/nmap-network-scanner-source
                - paragraph [ref=e581]: The standard open-source utility for network discovery, port auditing, OS fingerprinting, and automated vulnerability scanning using the Nmap Scripting Engine (NSE).
              - generic [ref=e582]:
                - generic [ref=e583]:
                  - generic [ref=e584]: network-security
                  - generic [ref=e585]: fundamentals
                - link "Open →" [ref=e586] [cursor=pointer]:
                  - /url: /resources/nmap-network-scanner-source
          - generic [ref=e587]:
            - link [ref=e588] [cursor=pointer]:
              - /url: /resources/aws-cloud-security-essentials
              - 'img "AWS Security Essentials: Cloud Identity, Encryption & Governance" [ref=e589]'
              - generic [ref=e590]:
                - generic [ref=e591]: course
                - button "Bookmark resource" [ref=e595]
              - generic:
                - generic: beginner
                - generic: 6 hours
            - generic [ref=e598]:
              - generic [ref=e599]:
                - generic [ref=e600]:
                  - generic [ref=e601]: Amazon Web Services
                  - generic [ref=e602]: free
                - heading [level=3] [ref=e603]:
                  - 'link "AWS Security Essentials: Cloud Identity, Encryption & Governance" [ref=e604] [cursor=pointer]':
                    - /url: /resources/aws-cloud-security-essentials
                - paragraph [ref=e605]: Official Amazon Web Services training covering the Shared Responsibility Model, AWS IAM least-privilege policies, KMS key hierarchies, and Amazon GuardDuty threat detection.
              - generic [ref=e606]:
                - generic [ref=e607]:
                  - generic [ref=e608]: cloud-security
                  - generic [ref=e609]: fundamentals
                - link "Open →" [ref=e610] [cursor=pointer]:
                  - /url: /resources/aws-cloud-security-essentials
          - generic [ref=e611]:
            - link [ref=e612] [cursor=pointer]:
              - /url: /resources/letsdefend-soc-analyst-path
              - 'img "LetsDefend: Certified SOC Analyst Practical Path" [ref=e613]'
              - generic [ref=e614]:
                - generic [ref=e615]: course
                - button "Bookmark resource" [ref=e619]
              - generic:
                - generic: intermediate
                - generic: 40 hours
            - generic [ref=e622]:
              - generic [ref=e623]:
                - generic [ref=e624]:
                  - generic [ref=e625]: LetsDefend
                  - generic [ref=e626]: freemium
                - heading [level=3] [ref=e627]:
                  - 'link "LetsDefend: Certified SOC Analyst Practical Path" [ref=e628] [cursor=pointer]':
                    - /url: /resources/letsdefend-soc-analyst-path
                - paragraph [ref=e629]: Hands-on blue team training simulating real enterprise SOC environments with live alert queues, SIEM dashboards, malware triage, and incident remediation workflows.
              - generic [ref=e630]:
                - generic [ref=e631]:
                  - generic [ref=e632]: soc-blue-team
                  - generic [ref=e633]: dfir
                - link "Open →" [ref=e634] [cursor=pointer]:
                  - /url: /resources/letsdefend-soc-analyst-path
          - generic [ref=e635]:
            - link [ref=e636] [cursor=pointer]:
              - /url: /resources/offsec-certified-professional-oscp
              - img "OffSec Certified Professional (OSCP) & PEN-200 Blueprint" [ref=e637]
              - generic [ref=e638]:
                - generic [ref=e639]: certification
                - button "Bookmark resource" [ref=e643]
              - generic:
                - generic: advanced
                - generic: 200 hours study
            - generic [ref=e646]:
              - generic [ref=e647]:
                - generic [ref=e648]:
                  - generic [ref=e649]: OffSec
                  - generic [ref=e650]: paid
                - heading [level=3] [ref=e651]:
                  - link "OffSec Certified Professional (OSCP) & PEN-200 Blueprint" [ref=e652] [cursor=pointer]:
                    - /url: /resources/offsec-certified-professional-oscp
                - paragraph [ref=e653]: The premier hands-on penetration testing certification demanding 24 hours of real-time target machine exploitation, privilege escalation, and professional reporting.
              - generic [ref=e654]:
                - generic [ref=e655]:
                  - generic [ref=e656]: red-team-pentest
                  - generic [ref=e657]: network-security
                - link "Open →" [ref=e658] [cursor=pointer]:
                  - /url: /resources/offsec-certified-professional-oscp
          - generic [ref=e659]:
            - link [ref=e660] [cursor=pointer]:
              - /url: /resources/phrack-advanced-heap-exploitation
              - 'img "Phrack Magazine: The Art of Exploitation & Heap Meta-Analysis" [ref=e661]'
              - generic [ref=e662]:
                - generic [ref=e663]: research
                - button "Bookmark resource" [ref=e669]
              - generic:
                - generic: advanced
                - generic: 90 mins
            - generic [ref=e672]:
              - generic [ref=e673]:
                - generic [ref=e674]:
                  - generic [ref=e675]: Phrack Magazine
                  - generic [ref=e676]: free
                - heading [level=3] [ref=e677]:
                  - 'link "Phrack Magazine: The Art of Exploitation & Heap Meta-Analysis" [ref=e678] [cursor=pointer]':
                    - /url: /resources/phrack-advanced-heap-exploitation
                - paragraph [ref=e679]: Historic and groundbreaking subterranean hacker research magazine publishing seminal papers on glibc malloc internals, unlink heap corruption, and return-to-libc control hijacking.
              - generic [ref=e680]:
                - generic [ref=e681]:
                  - generic [ref=e682]: malware-reverse-engineering
                  - generic [ref=e683]: red-team-pentest
                - link "Open →" [ref=e684] [cursor=pointer]:
                  - /url: /resources/phrack-advanced-heap-exploitation
          - generic [ref=e685]:
            - link [ref=e686] [cursor=pointer]:
              - /url: /resources/sans-incident-handlers-handbook
              - 'img "SANS Institute: The Incident Handler''s Handbook" [ref=e687]'
              - generic [ref=e688]:
                - generic [ref=e689]: article
                - button "Bookmark resource" [ref=e693]
              - generic:
                - generic: beginner
                - generic: 30 mins
            - generic [ref=e696]:
              - generic [ref=e697]:
                - generic [ref=e698]:
                  - generic [ref=e699]: SANS Institute
                  - generic [ref=e700]: free
                - heading [level=3] [ref=e701]:
                  - 'link "SANS Institute: The Incident Handler''s Handbook" [ref=e702] [cursor=pointer]':
                    - /url: /resources/sans-incident-handlers-handbook
                - paragraph [ref=e703]: "The industry-standard architectural paper detailing the six phases of cyber incident response: Preparation, Identification, Containment, Eradication, Recovery, and Lessons Learned."
              - generic [ref=e704]:
                - generic [ref=e705]:
                  - generic [ref=e706]: dfir
                  - generic [ref=e707]: soc-blue-team
                - link "Open →" [ref=e708] [cursor=pointer]:
                  - /url: /resources/sans-incident-handlers-handbook
          - generic [ref=e709]:
            - link [ref=e710] [cursor=pointer]:
              - /url: /resources/owasp-top-10-standard
              - img "OWASP Top 10 Web Application Security Risks Standard" [ref=e711]
              - generic [ref=e712]:
                - generic [ref=e713]: documentation
                - button "Bookmark resource" [ref=e716]
              - generic:
                - generic: intermediate
                - generic: Reference documentation
            - generic [ref=e719]:
              - generic [ref=e720]:
                - generic [ref=e721]:
                  - generic [ref=e722]: OWASP Foundation
                  - generic [ref=e723]: free
                - heading [level=3] [ref=e724]:
                  - link "OWASP Top 10 Web Application Security Risks Standard" [ref=e725] [cursor=pointer]:
                    - /url: /resources/owasp-top-10-standard
                - paragraph [ref=e726]: The standard awareness document for web developers and security professionals representing a broad consensus about the most critical security vulnerabilities affecting modern web applications.
              - generic [ref=e727]:
                - generic [ref=e728]:
                  - generic [ref=e729]: web-app-security
                  - generic [ref=e730]: fundamentals
                - link "Open →" [ref=e731] [cursor=pointer]:
                  - /url: /resources/owasp-top-10-standard
  - contentinfo [ref=e732]:
    - generic [ref=e733]:
      - generic [ref=e734]:
        - generic [ref=e735]:
          - link "CyberTube" [ref=e736] [cursor=pointer]:
            - /url: /
          - paragraph [ref=e741]: Curated cybersecurity video courses, packet inspection, and hardware security education.
          - paragraph [ref=e742]: Synchronized with verified technical channels.
        - generic [ref=e743]:
          - heading "Core Tracks" [level=3] [ref=e744]
          - list [ref=e745]:
            - listitem [ref=e746]:
              - link "Cybersecurity Fundamentals" [ref=e747] [cursor=pointer]:
                - /url: /discover?domain=fundamentals
            - listitem [ref=e748]:
              - link "Networking & Network Security" [ref=e749] [cursor=pointer]:
                - /url: /discover?domain=network-security
            - listitem [ref=e750]:
              - link "SOC & Blue Team Operations" [ref=e751] [cursor=pointer]:
                - /url: /discover?domain=soc-blue-team
            - listitem [ref=e752]:
              - link "Red Team & Penetration Testing" [ref=e753] [cursor=pointer]:
                - /url: /discover?domain=red-team-pentest
            - listitem [ref=e754]:
              - link "Web & Application Security" [ref=e755] [cursor=pointer]:
                - /url: /discover?domain=web-app-security
        - generic [ref=e756]:
          - heading "Specialized Labs" [level=3] [ref=e757]
          - list [ref=e758]:
            - listitem [ref=e759]:
              - link "Digital Forensics & Incident Response" [ref=e760] [cursor=pointer]:
                - /url: /discover?domain=dfir
            - listitem [ref=e761]:
              - link "Malware Analysis & Reverse Engineering" [ref=e762] [cursor=pointer]:
                - /url: /discover?domain=malware-reverse-engineering
            - listitem [ref=e763]:
              - link "Cloud Security" [ref=e764] [cursor=pointer]:
                - /url: /discover?domain=cloud-security
            - listitem [ref=e765]:
              - link "OSINT & Threat Intelligence" [ref=e766] [cursor=pointer]:
                - /url: /discover?domain=osint-threat-intel
            - listitem [ref=e767]:
              - link "IoT & Embedded Security" [ref=e768] [cursor=pointer]:
                - /url: /discover?domain=iot-embedded-security
        - generic [ref=e769]:
          - heading "Formats" [level=3] [ref=e770]
          - generic [ref=e771]:
            - link "Video" [ref=e772] [cursor=pointer]:
              - /url: /discover?type=video
            - link "Course" [ref=e773] [cursor=pointer]:
              - /url: /discover?type=course
            - link "Article" [ref=e774] [cursor=pointer]:
              - /url: /discover?type=article
            - link "Documentation" [ref=e775] [cursor=pointer]:
              - /url: /discover?type=documentation
            - link "GitHub Repo" [ref=e776] [cursor=pointer]:
              - /url: /discover?type=github
            - link "Hands-on Lab" [ref=e777] [cursor=pointer]:
              - /url: /discover?type=lab
            - link "CTF Challenge" [ref=e778] [cursor=pointer]:
              - /url: /discover?type=ctf
            - link "Podcast" [ref=e779] [cursor=pointer]:
              - /url: /discover?type=podcast
      - generic [ref=e780]:
        - generic [ref=e781]: © 2026 CyberTube. Open Developer & Security Education.
        - generic [ref=e782]:
          - link "Courses" [ref=e783] [cursor=pointer]:
            - /url: /courses
          - link "Domains" [ref=e784] [cursor=pointer]:
            - /url: /domains
          - link "Discover" [ref=e785] [cursor=pointer]:
            - /url: /discover
  - alert [ref=e786]
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