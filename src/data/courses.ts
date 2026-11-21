import { Course } from '../types/course';
import { CYBERSECURITY_ZERO_TO_ADVANCED_COURSE } from './cybersecurity-zero-to-advanced-course';
import { ENGLISH_COMMUNICATION_FOR_CYBERSECURITY_COURSE } from './english-communication-for-cybersecurity-course';
import { INCIDENT_RESPONSE_ZERO_TO_ADVANCED_COURSE } from './incident-response-zero-to-advanced-course';
import { LINUX_ZERO_TO_ADVANCED_COURSE } from './linux-zero-to-advanced-course';
import { MITRE_ATTACK_INCIDENT_RESPONSE_COURSE } from './mitre-attack-incident-response-course';
import { NETWORK_PACKET_FORENSICS_COURSE } from './network-packet-forensics-course';
import { PYTHON_FOR_CYBERSECURITY_COURSE } from './python-for-cybersecurity-course';
import { SIEM_ZERO_TO_ADVANCED_COURSE } from './siem-zero-to-advanced-course';
import { STORYTELLING_MASTERCLASS_COURSE } from './storytelling-masterclass-course';
import { WINDOWS_SECURITY_ZERO_TO_ADVANCED_COURSE } from './windows-security-course';

export const COURSES: Course[] = [
  ENGLISH_COMMUNICATION_FOR_CYBERSECURITY_COURSE,
  PYTHON_FOR_CYBERSECURITY_COURSE,
  MITRE_ATTACK_INCIDENT_RESPONSE_COURSE,
  INCIDENT_RESPONSE_ZERO_TO_ADVANCED_COURSE,
  SIEM_ZERO_TO_ADVANCED_COURSE,
  CYBERSECURITY_ZERO_TO_ADVANCED_COURSE,
  WINDOWS_SECURITY_ZERO_TO_ADVANCED_COURSE,
  LINUX_ZERO_TO_ADVANCED_COURSE,
  STORYTELLING_MASTERCLASS_COURSE,
  NETWORK_PACKET_FORENSICS_COURSE,
  {
    id: 'course-hardware-cpu-security',
    slug: 'hardware-backdoors-cpu-internals',
    title: 'Hardware Backdoors & CPU Architecture Security',
    shortDescription: 'Explore x86 CPU privilege rings, undocumented instructions, and hardware-level exploitation.',
    description: 'A deep-level hardware reverse-engineering journey exploring microarchitectural backdoors, hidden processor instruction sets, and subversion of operating system security rings directly inside silicon.',
    domains: ['malware-reverse-engineering', 'iot-embedded-security'],
    tags: ['hardware-security', 'cpu-backdoor', 'x86-assembly', 'ring-0', 'fuzzing'],
    difficulty: 'advanced',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    estimatedDuration: '1 hour',
    totalDurationMinutes: 51,
    instructor: {
      name: 'Christopher Domas',
      title: 'Security Researcher',
      organization: 'Black Hat',
    },
    prerequisites: [
      'Solid command of x86-64 assembly instructions and processor registers',
      'Understanding of OS kernel privilege boundaries (Ring 0 vs Ring 3)',
    ],
    learningObjectives: [
      'Examine ring-minus-one hardware architectural privilege models',
      'Discover undocumented CPU instructions using automated decoder fuzzing',
      'Understand microcode updates, shadow registers, and silicon boundary enforcement',
    ],
    featured: true,
    track: 'cybersecurity',
    isComingSoon: true,
    comingSoonNotice: 'Course syllabus and silicon reverse-engineering lab environments are currently being prepared.',
    modules: [
      {
        id: 'mod-x86-internals',
        title: 'Module 1: Silicon Exploitation & Ring Subversion',
        description: 'Analysis of undocumented MSRs, shadow instruction decoders, and bypasses of OS memory protections.',
        order: 1,
        lessons: [
          {
            id: 'les-cpu-god-mode',
            slug: 'hardware-backdoors-x86',
            title: 'GOD MODE UNLOCKED: Hardware Backdoors in x86 CPUs',
            description: 'Black Hat technical briefing revealing architectural ring-minus-one hardware backdoors, x86 hidden instruction sets, and CPU-level security boundary subversions.',
            youtubeVideoId: '_eSAF_qT_FY',
            durationMinutes: 51,
            order: 1,
            moduleTitle: 'Module 1: Silicon Exploitation & Ring Subversion',
            objectives: [
              'Understand undocumented MSRs in x86 architectures',
              'Trace privilege transitions directly from Userland to hardware backdoors',
              'Evaluate silicon-level hardware mitigations',
            ],
            tags: ['x86', 'assembly', 'backdoors', 'fuzzing'],
            skillsTaught: ['Instruction fuzzing', 'Ring privilege escalation auditing'],
          },
        ],
      },
    ],
  },
  {
    id: 'course-cyber-networking-fundamentals-hi',
    slug: 'networking-and-cybersecurity-foundations',
    title: 'Cyber Security & Computer Networking Foundations (Hindi)',
    shortDescription: 'Comprehensive foundational guide covering network topologies, IP addressing, subnetting, and defensive core concepts.',
    description: 'Designed specifically for vernacular learners to establish rock-solid foundations in networking protocols, IP routing, subnet masks, DNS resolution, and security architecture.',
    domains: ['fundamentals', 'network-security'],
    tags: ['hindi', 'networking', 'ip-addressing', 'dns', 'beginner-friendly'],
    difficulty: 'beginner',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    estimatedDuration: '2 hours 15 mins',
    totalDurationMinutes: 135,
    instructor: {
      name: 'Geeky Shows',
      title: 'Technical Educator',
      organization: 'Geeky Shows Academy',
    },
    prerequisites: [
      'Basic familiarity with computers and operating system concepts',
    ],
    learningObjectives: [
      'Understand the architecture of computer networks and the OSI protocol stack in Hindi',
      'Calculate IPv4 subnets, network boundaries, and broadcast addresses',
      'Trace client-to-server connection flows over DNS, HTTP, and TCP',
    ],
    featured: false,
    track: 'cybersecurity',
    isComingSoon: true,
    comingSoonNotice: 'Vernacular Hindi curriculum modules and packet addressing lab walkthroughs are currently in production.',
    modules: [
      {
        id: 'mod-hi-net-foundations',
        title: 'Module 1: Network Fundamentals & Packet Addressing',
        description: 'Complete breakdown of local and wide-area networking protocols, routing mechanisms, and IP design.',
        order: 1,
        lessons: [
          {
            id: 'les-hi-net-complete',
            slug: 'networking-complete-foundations',
            title: 'Complete Computer Networking & Cyber Security Overview',
            description: 'Comprehensive Hindi-language foundational session covering network topologies, IP addressing, subnet masks, DNS resolution, and essential defensive posture.',
            youtubeVideoId: 'IPvYjXCsTg8',
            durationMinutes: 135,
            order: 1,
            moduleTitle: 'Module 1: Network Fundamentals & Packet Addressing',
            objectives: [
              'Learn the role of routers, switches, and firewalls in Hindi',
              'Understand IPv4 addressing, private ranges (RFC 1918), and NAT',
              'Trace DNS requests from local stub resolvers to authoritative nameservers',
            ],
            tags: ['networking', 'ipv4', 'subnetting', 'dns'],
            skillsTaught: ['Subnet calculation', 'Network topology mapping'],
          },
        ],
      },
    ],
  },
    {
    "id": "course-mern-full-stack-ai",
    "slug": "mern-full-stack-course-with-ai",
    "title": "MERN Full Stack Course - React, Node & MongoDB with AI",
    "shortDescription": "Master the complete MERN full-stack pathway: Web Foundations, Git, Responsive CSS, Modern JavaScript, React Architecture, Node.js, Express REST APIs, MongoDB, Authentication, and AI-Powered Engineering.",
    "description": "Comprehensive 34-lecture MERN full-stack and AI developer curriculum by Codex Arun. Covers architecture, web foundations, asynchronous JavaScript, state management, REST APIs, database modeling, secure authentication, and advanced AI developer workflows (RAG, MCPs, AI agents, and Text-to-SQL).",
    "domains": [],
    "tags": [
      "mern",
      "react",
      "node",
      "express",
      "mongodb",
      "ai",
      "full-stack",
      "javascript",
      "security",
      "portfolio",
      "rag",
      "mcp"
    ],
    "difficulty": "beginner",
    "thumbnailUrl": "https://i.ytimg.com/vi/fFVZ9xbyBlc/maxresdefault.jpg",
    "estimatedDuration": "63 hours 32 mins",
    "totalDurationMinutes": 3813,
    "instructor": {
      "name": "Codex Arun",
      "title": "Full-Stack Developer & Educator",
      "organization": "Codex Arun"
    },
    "prerequisites": [
      "Basic computer literacy and a code editor (VS Code recommended)",
      "Node.js LTS and Git installed locally",
      "A desire to build full-stack web applications and AI-driven tools"
    ],
    "learningObjectives": [
      "Master web basics, semantic HTML, modern CSS layouts, and Git version control",
      "Deeply understand vanilla JavaScript fundamentals, DOM manipulation, and asynchronous programming (Promises, async/await)",
      "Build robust interactive user interfaces with React, state management, routing, and performance optimizations",
      "Architect secure RESTful APIs using Node.js and Express with middleware, schema validation, and JWT authentication",
      "Model application data with MongoDB and Mongoose, preventing injection and managing relationships",
      "Integrate cutting-edge AI capabilities: Prompt Engineering, Spec-Driven Development, RAG architectures, MCP agents, and Text-to-SQL"
    ],
    "featured": false,
    "track": "web-development",
    "sourcePlatform": "youtube",
    "sourcePlaylistId": "PLQl7ZDyS2qk8",
    "sourcePlaylistUrl": "https://www.youtube.com/playlist?list=PLQl7ZDyS2qk8",
    "modules": [
      {
        "id": "mod-mern-foundations",
        "title": "Module 1: Web Foundations, Git & Responsive CSS",
        "description": "Foundational sessions on architecture, development environment setup, web basics, Git version control, CSS layouts, and responsive design with Bootstrap.",
        "order": 1,
        "lessons": [
          {
            "id": "les-mern-course-intro",
            "slug": "01-mern-course-overview",
            "title": "01 MERN Full Stack Course — React, Node, MongoDB & AI Overview",
            "description": "Comprehensive introduction to the MERN full-stack architecture, technology stack breakdown, course curriculum roadmap, and AI integration goals.",
            "youtubeVideoId": "fFVZ9xbyBlc",
            "durationMinutes": 24,
            "order": 1,
            "moduleTitle": "Module 1: Web Foundations, Git & Responsive CSS",
            "objectives": [
              "Identify the roles of MongoDB, Express, React, and Node.js in modern web architecture",
              "Trace the end-to-end data lifecycle from browser UI to database and back",
              "Understand prerequisites, project goals, and full-stack software development workflows"
            ],
            "tags": [
              "mern",
              "architecture",
              "full-stack",
              "overview"
            ],
            "skillsTaught": [
              "Full-stack architecture concepts",
              "Client-server data flow"
            ],
            "richContent": {
              "introduction": "Welcome to the complete MERN Full Stack and AI curriculum. In this foundational overview, we dissect the client, server, and persistence layers that make up modern JavaScript engineering.",
              "keyTerminology": [
                {
                  "term": "MERN",
                  "definition": "MongoDB, Express.js, React.js, and Node.js technology stack"
                },
                {
                  "term": "Client-Server Architecture",
                  "definition": "Design pattern segregating user presentation from business logic and database persistence"
                },
                {
                  "term": "Full-Stack Developer",
                  "definition": "An engineer capable of implementing both user-facing frontends and server-side backend services"
                }
              ],
              "theorySections": [
                {
                  "title": "Architecture Trust Boundaries",
                  "content": "The client (React) runs in an untrusted browser environment. The server (Express/Node.js) governs business logic and security policies. The database (MongoDB) safely stores state.",
                  "keyPoints": [
                    "Never trust client input or embed database credentials in frontend JavaScript bundles",
                    "Use HTTP/HTTPS with JSON payloads as the standardized communication protocol",
                    "Design with modularity so frontend and backend can evolve and scale independently"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Map Out System Architecture",
                  "instruction": "Diagram the user browser, API server, database, and third-party AI service trust boundaries on paper or a whiteboard.",
                  "expectedOutcome": "A clear understanding of where data validation, authentication, and persistence reside"
                }
              ],
              "practicalExercise": {
                "title": "Architecture Diagram Exercise",
                "objective": "Document the trust boundary between React and Node.js",
                "instructions": [
                  "List three operations that must strictly be performed server-side"
                ]
              },
              "commonMistakes": [
                "Assuming client-side form validation is sufficient for application security",
                "Attempting to connect directly from React to MongoDB without a backend API"
              ],
              "securityRelevance": "Establishing clear boundaries prevents credential leakage and remote code execution vulnerabilities.",
              "summary": "MERN establishes a cohesive JavaScript development ecosystem across client, server, and database."
            }
          },
          {
            "id": "les-mern-foundation-session",
            "slug": "02-fullstack-dev-foundation-session",
            "title": "02 Fullstack Dev: Foundation Session & Environment Setup",
            "description": "Essential developer environment setup: installing Node.js LTS, configuring VS Code, terminal fundamentals, and modern developer workflow.",
            "youtubeVideoId": "aqtA2zHURbg",
            "durationMinutes": 26,
            "order": 2,
            "moduleTitle": "Module 1: Web Foundations, Git & Responsive CSS",
            "objectives": [
              "Install and verify Node.js LTS and npm package manager",
              "Configure modern code editor settings and essential extensions",
              "Understand terminal commands and environment isolation"
            ],
            "tags": [
              "node",
              "developer-tools",
              "environment-setup",
              "terminal"
            ],
            "skillsTaught": [
              "Node.js installation",
              "Terminal commands",
              "Editor configuration"
            ],
            "richContent": {
              "introduction": "A clean, reproducible development environment is the cornerstone of professional software engineering.",
              "keyTerminology": [
                {
                  "term": "Node.js",
                  "definition": "V8-powered asynchronous JavaScript runtime for server-side execution"
                },
                {
                  "term": "npm",
                  "definition": "Node Package Manager for installing open-source libraries and managing dependencies"
                },
                {
                  "term": "LTS",
                  "definition": "Long Term Support release with guaranteed stability and security patches"
                }
              ],
              "theorySections": [
                {
                  "title": "Tooling and Runtime Lifecycle",
                  "content": "Node.js allows JavaScript to run directly on the operating system with filesystem, networking, and process access.",
                  "keyPoints": [
                    "Always prefer LTS versions for project stability",
                    "Use semantic versioning in package.json to manage dependencies safely",
                    "Keep secrets in local .env files and add them to .gitignore"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Verify Node.js and npm",
                  "instruction": "Open your terminal and run node -v and npm -v to ensure successful installation.",
                  "expectedOutcome": "Valid version numbers displayed without errors"
                }
              ],
              "practicalExercise": {
                "title": "Verify Setup",
                "objective": "Run a simple Node.js console script",
                "instructions": [
                  "Create a hello.js file and execute it with node hello.js"
                ]
              },
              "commonMistakes": [
                "Using outdated Node versions or running commands with administrator privileges unnecessarily"
              ],
              "securityRelevance": "Ensuring packages come from trusted npm registries avoids malicious dependency injection.",
              "summary": "Mastering developer tooling accelerates project iteration and reduces configuration defects."
            }
          },
          {
            "id": "les-mern-web-basics",
            "slug": "03-introduction-to-web-basics",
            "title": "03 Fullstack Dev: L1: Introduction to Web Basics",
            "description": "How the web works: DNS, HTTP request-response cycle, HTML5 structure, semantic markup, and browser rendering engines.",
            "youtubeVideoId": "PNQiabb5ZjY",
            "durationMinutes": 119,
            "order": 3,
            "moduleTitle": "Module 1: Web Foundations, Git & Responsive CSS",
            "objectives": [
              "Explain DNS resolution, TCP/IP handshakes, and HTTP/HTTPS transactions",
              "Structure accessible web pages using semantic HTML5 elements",
              "Inspect network headers, status codes, and browser rendering phases"
            ],
            "tags": [
              "html5",
              "http",
              "networking",
              "browser"
            ],
            "skillsTaught": [
              "Semantic HTML markup",
              "HTTP network inspection"
            ],
            "richContent": {
              "introduction": "Before building complex single-page apps, every engineer must understand how browsers fetch, parse, and render documents across the network.",
              "keyTerminology": [
                {
                  "term": "DNS",
                  "definition": "Domain Name System resolving human-readable domain names to IP addresses"
                },
                {
                  "term": "HTTP Status Codes",
                  "definition": "Standard response codes like 200 OK, 404 Not Found, and 500 Internal Server Error"
                },
                {
                  "term": "Semantic HTML",
                  "definition": "Tags like <header>, <nav>, <main>, <article>, and <footer> that convey document meaning"
                }
              ],
              "theorySections": [
                {
                  "title": "Browser Document Pipeline",
                  "content": "The browser converts raw HTML bytes into a DOM tree, parses CSS into CSSOM, calculates layout, and paints pixels to the screen.",
                  "keyPoints": [
                    "Semantic markup improves accessibility (screen readers) and search engine indexing",
                    "Use appropriate HTTP methods: GET for fetching, POST for creating, PUT/PATCH for updating",
                    "Leverage Chrome/Firefox DevTools to inspect DOM nodes and network requests"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Inspect HTTP Requests",
                  "instruction": "Open DevTools Network tab and observe request headers, query strings, and response payloads.",
                  "expectedOutcome": "Understand how headers, status codes, and MIME types correlate"
                }
              ],
              "practicalExercise": {
                "title": "Build a Semantic Page",
                "objective": "Author an accessible HTML5 document with structured sections and form elements",
                "instructions": [
                  "Include a <header>, <nav>, <main>, and <footer> with accessible labels"
                ]
              },
              "commonMistakes": [
                "Using generic <div> elements for buttons and links, breaking keyboard accessibility"
              ],
              "securityRelevance": "Understanding HTTP headers (CSP, HSTS, X-Content-Type-Options) is vital for defensive web engineering.",
              "summary": "Solid HTML and HTTP fundamentals provide the groundwork for modern frontend frameworks."
            }
          },
          {
            "id": "les-mern-git-css",
            "slug": "04-version-control-css-concepts",
            "title": "04 Fullstack Dev: L2: Version Control & CSS Concepts",
            "description": "Git version control fundamentals (init, add, commit, branch, merge) and core CSS concepts including the box model, selectors, and specificity.",
            "youtubeVideoId": "VNRecG6jBVs",
            "durationMinutes": 120,
            "order": 4,
            "moduleTitle": "Module 1: Web Foundations, Git & Responsive CSS",
            "objectives": [
              "Initialize Git repositories, create branches, and write meaningful commit messages",
              "Master the CSS Box Model: content, padding, border, and margin",
              "Calculate CSS specificity and manage cascade rules predictably"
            ],
            "tags": [
              "git",
              "version-control",
              "css",
              "box-model"
            ],
            "skillsTaught": [
              "Git workflow",
              "CSS Box Model",
              "Cascade & Specificity"
            ],
            "richContent": {
              "introduction": "Learn how Git tracks project evolution safely while mastering CSS presentation logic and selector hierarchy.",
              "keyTerminology": [
                {
                  "term": "Git Commit",
                  "definition": "A snapshot of staged project changes with cryptographic commit hash"
                },
                {
                  "term": "Box Model",
                  "definition": "The CSS calculation of an element's total space (width + padding + border + margin)"
                },
                {
                  "term": "Specificity",
                  "definition": "The algorithm determining which CSS rule wins when multiple selectors match"
                }
              ],
              "theorySections": [
                {
                  "title": "Predictable Styling & Versioning",
                  "content": "Use box-sizing: border-box globally to make layout sizing predictable, and commit small, atomic units of work to Git.",
                  "keyPoints": [
                    "Feature branching protects production code from unverified changes",
                    "Avoid inline styles and excessive !important declarations",
                    "Understand the difference between margin collapsing and padding separation"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Initialize Git and Commit Stylesheet",
                  "instruction": "Initialize git init, create a .gitignore file, and commit an initial style.css with a global reset.",
                  "expectedOutcome": "A clean Git history and predictable CSS box-sizing"
                }
              ],
              "practicalExercise": {
                "title": "Card Layout Exercise",
                "objective": "Build a responsive profile card demonstrating the CSS box model and clean Git commits",
                "instructions": [
                  "Set up margins, padding, and borders accurately and commit your progress"
                ]
              },
              "commonMistakes": [
                "Committing node_modules or secret environment files to version control"
              ],
              "securityRelevance": "Git history immutability and secret scanning prevent accidental leaks of database credentials.",
              "summary": "Version control ensures code safety while the box model establishes reliable styling fundamentals."
            }
          },
          {
            "id": "les-mern-css-layout",
            "slug": "05-css-layout-techniques",
            "title": "05 Fullstack Dev: L3: CSS Layout Techniques — Flexbox & Grid",
            "description": "Modern CSS layout mastery: Flexbox for one-dimensional dynamic layouts and CSS Grid for two-dimensional page architectures.",
            "youtubeVideoId": "oPTPvRTUZ28",
            "durationMinutes": 120,
            "order": 5,
            "moduleTitle": "Module 1: Web Foundations, Git & Responsive CSS",
            "objectives": [
              "Build dynamic one-dimensional layouts using Flexbox (flex-direction, justify-content, align-items)",
              "Create structured two-dimensional layouts using CSS Grid (grid-template-columns, gap, grid-area)",
              "Combine Flexbox and Grid to construct modern application shells"
            ],
            "tags": [
              "css",
              "flexbox",
              "grid",
              "layouts"
            ],
            "skillsTaught": [
              "Flexbox alignment",
              "CSS Grid architecture"
            ],
            "richContent": {
              "introduction": "Modern CSS provides native layout engines that render floats and table hacks obsolete. Master Flexbox and Grid.",
              "keyTerminology": [
                {
                  "term": "Flexbox",
                  "definition": "CSS Flexible Box layout module for linear distribution of space along a main axis"
                },
                {
                  "term": "CSS Grid",
                  "definition": "Two-dimensional grid-based layout system handling columns and rows simultaneously"
                },
                {
                  "term": "Gap Property",
                  "definition": "Standard CSS property defining gutters between flex items or grid tracks"
                }
              ],
              "theorySections": [
                {
                  "title": "Choosing Flexbox vs Grid",
                  "content": "Use CSS Grid for overarching page structures (headers, sidebars, content zones) and Flexbox for micro-components (navbars, card contents, action bars).",
                  "keyPoints": [
                    "Flexbox distributes elements dynamically along the main axis or cross axis",
                    "CSS Grid enables declarative column definitions with fractional (fr) units and auto-fit/repeat",
                    "Both engines handle responsive wrapping gracefully with minimal media queries"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Build a Holy Grail Layout",
                  "instruction": "Define a 3-row, 3-column CSS Grid with a fixed header, sidebar, dynamic main content, and footer.",
                  "expectedOutcome": "A responsive page shell that adapts cleanly to different window sizes"
                }
              ],
              "practicalExercise": {
                "title": "Dashboard Grid",
                "objective": "Build a responsive dashboard layout using CSS Grid with internal Flexbox widget cards",
                "instructions": [
                  "Use repeat(auto-fit, minmax(280px, 1fr)) for automatic card reflow"
                ]
              },
              "commonMistakes": [
                "Over-nesting div elements instead of using direct grid track assignments"
              ],
              "securityRelevance": "Clean CSS reduces layout shifts (CLS) and browser re-paint vulnerabilities.",
              "summary": "Combining Flexbox and Grid empowers engineers to construct complex, resilient interfaces effortlessly."
            }
          },
          {
            "id": "les-mern-bootstrap-responsive",
            "slug": "06-responsive-design-bootstrap",
            "title": "06 Fullstack Dev: L4: Responsive Design with Bootstrap",
            "description": "Responsive design principles, media queries, mobile-first workflows, and rapid UI prototyping with the Bootstrap framework.",
            "youtubeVideoId": "tS86VLQf8qk",
            "durationMinutes": 139,
            "order": 6,
            "moduleTitle": "Module 1: Web Foundations, Git & Responsive CSS",
            "objectives": [
              "Implement mobile-first responsive breakpoints using CSS media queries",
              "Utilize Bootstrap's 12-column grid system, utility classes, and components",
              "Ensure mobile touch targets, viewport meta tags, and fluid typography"
            ],
            "tags": [
              "responsive",
              "bootstrap",
              "media-queries",
              "mobile-first"
            ],
            "skillsTaught": [
              "Mobile-first design",
              "Bootstrap framework utilities"
            ],
            "richContent": {
              "introduction": "Users access web applications across diverse devices from smartphones to 4K monitors. Learn mobile-first responsive design.",
              "keyTerminology": [
                {
                  "term": "Mobile-First",
                  "definition": "Designing for the smallest viewport first and adding enhancements as screen space increases"
                },
                {
                  "term": "Media Queries",
                  "definition": "CSS rules applied conditionally based on device width, height, or orientation"
                },
                {
                  "term": "Viewport Meta Tag",
                  "definition": "HTML meta tag controlling mobile layout zoom and dimensions"
                }
              ],
              "theorySections": [
                {
                  "title": "Responsive Mechanics",
                  "content": "Designing mobile-first minimizes CSS overhead and guarantees smooth performance on constrained mobile networks.",
                  "keyPoints": [
                    "Always configure <meta name='viewport' content='width=device-width, initial-scale=1.0'>",
                    "Use relative units (rem, em, %) rather than fixed pixel dimensions for layout containers",
                    "Leverage framework utilities to rapidly scaffold prototypes without writing boilerplate CSS"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Scaffold Responsive Navigation",
                  "instruction": "Create a responsive navigation bar that collapses into a hamburger menu on mobile screens.",
                  "expectedOutcome": "A fluid navigation experience across all viewport sizes"
                }
              ],
              "practicalExercise": {
                "title": "Responsive Product Showcase",
                "objective": "Build a responsive product gallery using Bootstrap grid classes (col-12 col-md-6 col-lg-4)",
                "instructions": [
                  "Test layout behavior across mobile, tablet, and desktop viewports"
                ]
              },
              "commonMistakes": [
                "Designing desktop-first and attempting to force desktop elements into narrow mobile viewports"
              ],
              "securityRelevance": "Mobile-friendly design reduces accidental mis-clicks on sensitive actions like payment or account deletion.",
              "summary": "Mobile-first responsive design ensures seamless user experiences across the entire hardware spectrum."
            }
          }
        ],
        "quiz": {
          "title": "Module 1 Quiz: Web Foundations, Git & Responsive CSS",
          "passingScorePercent": 70,
          "questions": [
            {
              "question": "Which CSS property defines the space between columns and rows in CSS Grid and Flexbox without adjusting margins?",
              "options": [
                "gutter",
                "gap",
                "spacing",
                "border-spacing"
              ],
              "correctAnswerIndex": 1,
              "explanation": "The 'gap' property sets the gutters between grid tracks and flex items directly.",
              "difficulty": "beginner"
            },
            {
              "question": "Why is 'box-sizing: border-box' widely recommended in modern CSS resets?",
              "options": [
                "It eliminates all borders from HTML elements",
                "It includes padding and border within the element's specified width and height",
                "It forces all elements to behave as flex containers",
                "It accelerates browser JavaScript execution"
              ],
              "correctAnswerIndex": 1,
              "explanation": "Border-box makes sizing calculations intuitive by keeping total element size equal to width, absorbing padding and border inside.",
              "difficulty": "beginner"
            },
            {
              "question": "Which Git command is used to isolate development of a new feature from the main branch?",
              "options": [
                "git checkout -b <branch-name>",
                "git merge --abort",
                "git reset --hard",
                "git push --force"
              ],
              "correctAnswerIndex": 0,
              "explanation": "'git checkout -b <branch-name>' (or 'git switch -c') creates and switches to a new feature branch.",
              "difficulty": "beginner"
            }
          ]
        }
      },
      {
        "id": "mod-mern-javascript",
        "title": "Module 2: JavaScript Mastery & Asynchronous Programming",
        "description": "Deep dive into vanilla JavaScript: syntax, data types, functions, scopes, DOM manipulation, events, Promises, and modern ES6+ async/await.",
        "order": 2,
        "lessons": [
          {
            "id": "les-mern-js-fundamentals",
            "slug": "07-javascript-fundamentals",
            "title": "07 Fullstack Dev: L5: JavaScript Fundamentals",
            "description": "Core JavaScript programming concepts: variables (let, const, var), primitives, operators, expressions, and control flow structures.",
            "youtubeVideoId": "3vUKoBACjiE",
            "durationMinutes": 128,
            "order": 1,
            "moduleTitle": "Module 2: JavaScript Mastery & Asynchronous Programming",
            "objectives": [
              "Differentiate between let, const, and var variable declarations",
              "Understand primitive data types (string, number, boolean, null, undefined, symbol, bigint)",
              "Control program execution using conditionals and loops"
            ],
            "tags": [
              "javascript",
              "fundamentals",
              "variables",
              "control-flow"
            ],
            "skillsTaught": [
              "Variable scoping",
              "Conditional logic"
            ],
            "richContent": {
              "introduction": "JavaScript is the programming language that powers the entire MERN stack. Master variables, datatypes, and control flow.",
              "keyTerminology": [
                {
                  "term": "Primitive Types",
                  "definition": "Immutable values stored directly in memory (number, string, boolean, etc.)"
                },
                {
                  "term": "Block Scope",
                  "definition": "Visibility of variables declared with let and const limited to the enclosing { } block"
                },
                {
                  "term": "Strict Equality",
                  "definition": "The === operator comparing both value and type without coercive type conversion"
                }
              ],
              "theorySections": [
                {
                  "title": "Variables and Immutability",
                  "content": "Prefer const by default for immutable bindings. Use let when re-assignment is explicitly required. Avoid legacy var.",
                  "keyPoints": [
                    "Always use === to prevent unintended coercion bugs",
                    "Understand truthy and falsy values (0, '', null, undefined, NaN are falsy)",
                    "Keep functions focused on a single responsibility"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Write Conditional Evaluation Script",
                  "instruction": "Author a script evaluating grade tiers using if-else if statements and ternary operators.",
                  "expectedOutcome": "Accurate output without type coercion errors"
                }
              ],
              "practicalExercise": {
                "title": "Calculator Function",
                "objective": "Build a typed arithmetic function handling division-by-zero safely",
                "instructions": [
                  "Validate inputs before computing and return clear results"
                ]
              },
              "commonMistakes": [
                "Using == instead of ===, leading to unexpected type coercion"
              ],
              "securityRelevance": "Strict type comparison prevents authentication bypasses caused by loose truthy checks.",
              "summary": "Firm JavaScript basics prevent subtle logical errors in both frontend and backend code."
            }
          },
          {
            "id": "les-mern-js-essentials",
            "slug": "08-javascript-essentials",
            "title": "08 Fullstack Dev: L6: JavaScript Essentials — Functions & Scope",
            "description": "Function declarations, function expressions, arrow functions, closures, scope chain, and hoisting in JavaScript.",
            "youtubeVideoId": "fh-AaUvBVA8",
            "durationMinutes": 79,
            "order": 2,
            "moduleTitle": "Module 2: JavaScript Mastery & Asynchronous Programming",
            "objectives": [
              "Write clean functions using declarations, expressions, and ES6 arrow syntax",
              "Understand lexical scope, function scope, and closures",
              "Leverage higher-order functions and callbacks"
            ],
            "tags": [
              "javascript",
              "functions",
              "closures",
              "scope"
            ],
            "skillsTaught": [
              "Arrow functions",
              "Lexical closures",
              "Scope management"
            ],
            "richContent": {
              "introduction": "Functions are first-class citizens in JavaScript. Explore lexical closures and functional composition.",
              "keyTerminology": [
                {
                  "term": "Closure",
                  "definition": "A function bundled together with references to its surrounding lexical state"
                },
                {
                  "term": "Higher-Order Function",
                  "definition": "A function that accepts other functions as arguments or returns a function"
                },
                {
                  "term": "Arrow Function",
                  "definition": "Concise ES6 function syntax that does not bind its own 'this' context"
                }
              ],
              "theorySections": [
                {
                  "title": "Closures in Practice",
                  "content": "Closures allow private state encapsulation, creating data factories and maintaining state across asynchronous calls.",
                  "keyPoints": [
                    "Closures remember the variables from their outer enclosing scope even after that outer function has returned",
                    "Arrow functions inherit 'this' from the enclosing lexical scope",
                    "Avoid polluting the global window or global namespace"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Create a Counter Factory",
                  "instruction": "Author a function createCounter() that returns increment, decrement, and getValue methods using a private closure variable.",
                  "expectedOutcome": "Private state accessible only via exposed method closures"
                }
              ],
              "practicalExercise": {
                "title": "Closure Encapsulation",
                "objective": "Implement a secure token cache using a closure to hide the token from global inspection",
                "instructions": [
                  "Return get() and set() without exposing the raw token variable"
                ]
              },
              "commonMistakes": [
                "Creating memory leaks by retaining unnecessary closures with large object references"
              ],
              "securityRelevance": "Closures provide variable encapsulation, preventing tampering from external scripts.",
              "summary": "Closures and higher-order functions are essential patterns for React state and Node.js middleware."
            }
          },
          {
            "id": "les-mern-js-core",
            "slug": "09-javascript-core-programming",
            "title": "09 Fullstack Dev: L7: JavaScript Core — Objects & Arrays",
            "description": "Working with complex data structures: object literals, array manipulation, destructuring, spread/rest operators, and functional methods (map, filter, reduce).",
            "youtubeVideoId": "nMvPH1XYijE",
            "durationMinutes": 102,
            "order": 3,
            "moduleTitle": "Module 2: JavaScript Mastery & Asynchronous Programming",
            "objectives": [
              "Manipulate arrays using map, filter, reduce, find, and some/every",
              "Deeply understand object property access, computed keys, and references vs values",
              "Apply ES6 destructuring and spread/rest operators in real scenarios"
            ],
            "tags": [
              "javascript",
              "arrays",
              "objects",
              "es6",
              "destructuring"
            ],
            "skillsTaught": [
              "Array methods",
              "Object destructuring",
              "Data transformations"
            ],
            "richContent": {
              "introduction": "Full-stack apps constantly transform API data. Master array methods and immutable object updates.",
              "keyTerminology": [
                {
                  "term": "Destructuring",
                  "definition": "Syntax unpacking values from arrays or properties from objects into distinct variables"
                },
                {
                  "term": "Spread Operator",
                  "definition": "The ... syntax expanding an iterable into individual elements or shallow copying objects"
                },
                {
                  "term": "Immutability",
                  "definition": "Creating new data copies rather than mutating existing memory references directly"
                }
              ],
              "theorySections": [
                {
                  "title": "Immutable Transformations",
                  "content": "React and Redux rely on shallow comparison of object references. Knowing how to produce fresh objects and arrays without mutating source data is vital.",
                  "keyPoints": [
                    "Use array.map() to transform elements into new arrays",
                    "Use array.filter() to remove elements conditionally without modifying the original array",
                    "Use array.reduce() to aggregate lists into single values, maps, or grouped collections"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Transform an API User List",
                  "instruction": "Filter an array of users for active accounts and map them to formatted display objects using destructuring.",
                  "expectedOutcome": "Clean, immutable array transformation in 3 lines of code"
                }
              ],
              "practicalExercise": {
                "title": "Cart Total Reducer",
                "objective": "Calculate subtotal, tax, and total from an array of cart items using Array.prototype.reduce",
                "instructions": [
                  "Handle empty arrays and edge cases gracefully"
                ]
              },
              "commonMistakes": [
                "Mutating array inputs with methods like push, pop, or splice when immutable updates were intended"
              ],
              "securityRelevance": "Defensive copying prevents unintended side-effects across shared server memory.",
              "summary": "Functional array and object techniques are used constantly in React state management and MongoDB aggregation."
            }
          },
          {
            "id": "les-mern-advanced-js",
            "slug": "10-advanced-javascript-concepts",
            "title": "10 Fullstack Dev: L8: Advanced JavaScript Concepts",
            "description": "Prototypal inheritance, prototype chain, ES6 classes, 'this' keyword binding (call, apply, bind), and memory lifecycle.",
            "youtubeVideoId": "EdEU6vMjwQw",
            "durationMinutes": 114,
            "order": 4,
            "moduleTitle": "Module 2: JavaScript Mastery & Asynchronous Programming",
            "objectives": [
              "Demystify JavaScript's prototypal inheritance model and prototype chain",
              "Write and extend ES6 classes with constructors, methods, and static members",
              "Explicitly control the 'this' context using bind, call, and apply"
            ],
            "tags": [
              "javascript",
              "prototypes",
              "classes",
              "this-keyword",
              "advanced"
            ],
            "skillsTaught": [
              "Prototypal inheritance",
              "Class-based programming",
              "Execution context"
            ],
            "richContent": {
              "introduction": "Uncover how JavaScript handles object orientation under the hood via prototypes and execution contexts.",
              "keyTerminology": [
                {
                  "term": "Prototype Chain",
                  "definition": "The delegation lookup mechanism through __proto__ and prototype objects"
                },
                {
                  "term": "this",
                  "definition": "The execution context referencing the object that invoked the current function"
                },
                {
                  "term": "bind()",
                  "definition": "Method creating a new function with its 'this' keyword permanently bound to a specified value"
                }
              ],
              "theorySections": [
                {
                  "title": "Execution Context and Delegation",
                  "content": "Unlike classical languages, JavaScript uses prototype delegation. ES6 class syntax is syntactic sugar over prototypal inheritance.",
                  "keyPoints": [
                    "Methods defined on a prototype are shared across all instances, saving memory",
                    "The value of 'this' depends on how a function is called, not where it was declared (unless arrow functions are used)",
                    "Understand constructor functions and the 'new' keyword lifecycle"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Implement an ES6 Service Class",
                  "instruction": "Create an ApiClient class with base URL configuration and reusable request methods.",
                  "expectedOutcome": "Encapsulated, reusable service pattern with clean inheritance"
                }
              ],
              "practicalExercise": {
                "title": "Context Binding Challenge",
                "objective": "Fix an event callback where 'this' lost its class instance context using .bind(this)",
                "instructions": [
                  "Demonstrate both .bind() and arrow function class property solutions"
                ]
              },
              "commonMistakes": [
                "Losing 'this' binding when passing object methods as callbacks to event listeners or timers"
              ],
              "securityRelevance": "Prototype pollution vulnerabilities occur when malicious inputs overwrite Object.prototype. Master prototypes to prevent this.",
              "summary": "Deep understanding of prototypes and execution context separates junior coders from senior engineers."
            }
          },
          {
            "id": "les-mern-async-js",
            "slug": "11-asynchronous-javascript",
            "title": "11 Fullstack Dev: L9: Asynchronous JavaScript — Callbacks & Promises",
            "description": "The JavaScript Event Loop, single-threaded execution, callback queues, microtasks vs macrotasks, and Promises.",
            "youtubeVideoId": "X87VneP5h74",
            "durationMinutes": 94,
            "order": 5,
            "moduleTitle": "Module 2: JavaScript Mastery & Asynchronous Programming",
            "objectives": [
              "Explain the Event Loop, Call Stack, Web APIs, and Task/Microtask Queues",
              "Escape 'Callback Hell' using ES6 Promises (resolve, reject, .then, .catch, .finally)",
              "Combine concurrent promises using Promise.all, Promise.allSettled, and Promise.race"
            ],
            "tags": [
              "javascript",
              "async",
              "event-loop",
              "promises"
            ],
            "skillsTaught": [
              "Event Loop mechanics",
              "Promise chaining",
              "Concurrent async handling"
            ],
            "richContent": {
              "introduction": "JavaScript is single-threaded, yet handles non-blocking I/O flawlessly. Discover the Event Loop and Promises.",
              "keyTerminology": [
                {
                  "term": "Event Loop",
                  "definition": "Runtime loop that continuously checks if the call stack is empty before dispatching queued tasks"
                },
                {
                  "term": "Promise",
                  "definition": "An object representing the eventual completion or failure of an asynchronous operation"
                },
                {
                  "term": "Microtask Queue",
                  "definition": "High-priority queue for Promise callbacks executed immediately after the current script turn"
                }
              ],
              "theorySections": [
                {
                  "title": "Event Loop Mechanics",
                  "content": "Synchronous code runs first on the call stack. When async tasks (HTTP, setTimeout) finish, their callbacks enter task queues and wait for the stack to clear.",
                  "keyPoints": [
                    "Microtasks (Promises) always execute before the next macrotask (setTimeout, DOM events)",
                    "Always attach a .catch() handler to avoid unhandled promise rejection errors",
                    "Use Promise.all() for fail-fast parallel requests and Promise.allSettled() when partial success is acceptable"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Convert Callback to Promise",
                  "instruction": "Promisify a standard callback-based asynchronous timer or file reader.",
                  "expectedOutcome": "A clean Promise interface returning resolved data or rejected errors"
                }
              ],
              "practicalExercise": {
                "title": "Parallel API Fetcher",
                "objective": "Fetch data from two simulated API endpoints concurrently using Promise.all",
                "instructions": [
                  "Handle individual endpoint errors gracefully"
                ]
              },
              "commonMistakes": [
                "Forgetting to return a Promise inside a .then() chain, breaking the async sequence"
              ],
              "securityRelevance": "Unhandled promise rejections can crash Node.js backend processes or cause denial-of-service.",
              "summary": "Promises provide structured, composable handling for non-blocking asynchronous operations."
            }
          },
          {
            "id": "les-mern-dom-manipulation",
            "slug": "12-dom-manipulation",
            "title": "12 Fullstack Dev: L10: DOM Manipulation & Event Handling",
            "description": "Direct browser DOM manipulation, element selection, dynamic attribute and class mutation, event listeners, bubbling, and event delegation.",
            "youtubeVideoId": "bpwmQkzA2Aw",
            "durationMinutes": 107,
            "order": 6,
            "moduleTitle": "Module 2: JavaScript Mastery & Asynchronous Programming",
            "objectives": [
              "Query and update DOM nodes using querySelector and modern element APIs",
              "Manage event listeners, prevent default behavior, and stop propagation",
              "Implement high-performance event delegation on dynamic lists"
            ],
            "tags": [
              "dom",
              "events",
              "javascript",
              "delegation"
            ],
            "skillsTaught": [
              "DOM manipulation",
              "Event bubbling & delegation"
            ],
            "richContent": {
              "introduction": "Understand how JavaScript interacts with browser DOM nodes before learning React's Virtual DOM abstraction.",
              "keyTerminology": [
                {
                  "term": "DOM",
                  "definition": "Document Object Model tree representation of the HTML document"
                },
                {
                  "term": "Event Bubbling",
                  "definition": "The propagation of an event from the target element up through its ancestors"
                },
                {
                  "term": "Event Delegation",
                  "definition": "Pattern attaching a single event listener to a parent element to handle events from multiple children"
                }
              ],
              "theorySections": [
                {
                  "title": "Event Propagation and Performance",
                  "content": "Rather than attaching 1,000 listeners to 1,000 list items, attach one listener to the parent container using event delegation.",
                  "keyPoints": [
                    "Use e.target to identify the exact child clicked within a delegated handler",
                    "Use textContent rather than innerHTML when inserting user input to prevent XSS attacks",
                    "Clean up event listeners when elements are removed to prevent browser memory leaks"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Build a Dynamic Todo List",
                  "instruction": "Create an interactive todo list with add, toggle, and delete actions using event delegation.",
                  "expectedOutcome": "Fast, accessible user interactions with safe text rendering"
                }
              ],
              "practicalExercise": {
                "title": "Event Delegation Table",
                "objective": "Build an interactive table where row delete buttons are handled via a single parent listener",
                "instructions": [
                  "Verify that dynamically appended rows work without adding new listeners"
                ]
              },
              "commonMistakes": [
                "Using innerHTML with untrusted user input, introducing Cross-Site Scripting (XSS)"
              ],
              "securityRelevance": "Always sanitize or use textContent/createElement to prevent DOM-based XSS attacks.",
              "summary": "Mastering DOM and event mechanics gives you deep intuition for how React optimizes UI updates."
            }
          },
          {
            "id": "les-mern-async-deepdive",
            "slug": "13-async-javascript-deep-dive",
            "title": "13 Fullstack Dev: L11: Asynchronous JavaScript Deep Dive — Async/Await & Fetch",
            "description": "Modern asynchronous programming using async/await syntax, try/catch error handling, the Fetch API, HTTP headers, and JSON parsing.",
            "youtubeVideoId": "z2EkWsIDqX0",
            "durationMinutes": 101,
            "order": 7,
            "moduleTitle": "Module 2: JavaScript Mastery & Asynchronous Programming",
            "objectives": [
              "Write synchronous-looking asynchronous code using async and await",
              "Handle network and HTTP status errors cleanly with try/catch/finally blocks",
              "Send and receive JSON payloads using the native browser Fetch API"
            ],
            "tags": [
              "async-await",
              "fetch",
              "json",
              "http-requests"
            ],
            "skillsTaught": [
              "async/await patterns",
              "Fetch API integration",
              "Error handling"
            ],
            "richContent": {
              "introduction": "async/await brings elegance and clarity to asynchronous workflows. Master API communication with Fetch.",
              "keyTerminology": [
                {
                  "term": "async/await",
                  "definition": "Syntactic sugar over Promises enabling sequential-looking asynchronous code execution"
                },
                {
                  "term": "Fetch API",
                  "definition": "Native browser interface for making HTTP network requests returning Promises"
                },
                {
                  "term": "res.ok",
                  "definition": "Fetch boolean property indicating whether the HTTP status code was in the 200-299 range"
                }
              ],
              "theorySections": [
                {
                  "title": "Robust Fetch Error Handling",
                  "content": "Unlike older libraries, window.fetch() does NOT reject on HTTP 404 or 500 errors. You must explicitly verify res.ok.",
                  "keyPoints": [
                    "Always verify if (!res.ok) throw new Error(res.statusText) before calling res.json()",
                    "Wrap await calls in try/catch to handle network dropouts and parsing errors",
                    "Use AbortController to cancel inflight requests when components unmount"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Create an Authenticated Fetch Wrapper",
                  "instruction": "Write an async function requesting data with JSON headers and status validation.",
                  "expectedOutcome": "A robust network utility handling errors predictably"
                }
              ],
              "practicalExercise": {
                "title": "Live API Consumer",
                "objective": "Build a weather or user directory fetching live JSON data with loading and error states",
                "instructions": [
                  "Display spinner while loading and user-friendly error banners on failure"
                ]
              },
              "commonMistakes": [
                "Assuming fetch() rejects on HTTP 404/500 without inspecting response.ok"
              ],
              "securityRelevance": "Validate and sanitize all data received from external APIs before rendering or saving it.",
              "summary": "async/await and Fetch form the universal standard for client-server communication in modern web apps."
            }
          }
        ],
        "quiz": {
          "title": "Module 2 Quiz: JavaScript Mastery & Asynchronous Programming",
          "passingScorePercent": 70,
          "questions": [
            {
              "question": "What is the primary difference between synchronous code and code inside a Promise.then() callback?",
              "options": [
                "Promises run in a separate multi-threaded CPU core",
                "Promise callbacks are placed in the microtask queue and run after the synchronous call stack empties",
                "Promises execute before any synchronous statements in the script",
                "Promises can only be used on the server side in Node.js"
              ],
              "correctAnswerIndex": 1,
              "explanation": "Promise callbacks enter the microtask queue, which executes immediately after the current synchronous execution turn completes.",
              "difficulty": "beginner"
            },
            {
              "question": "Why does window.fetch() NOT reject its promise when the server responds with HTTP 404 or 500?",
              "options": [
                "It is a bug in the browser Fetch specification",
                "Fetch only rejects on network failures or request blocking; HTTP response codes represent successful network roundtrips",
                "Because 404 and 500 are considered successful requests",
                "Because fetch only works with GET requests"
              ],
              "correctAnswerIndex": 1,
              "explanation": "Fetch resolves as long as the server responds with headers, even if the status is an error code. Check response.ok to verify 2xx success.",
              "difficulty": "beginner"
            },
            {
              "question": "Which DOM property safely sets text without exposing the application to Cross-Site Scripting (XSS)?",
              "options": [
                "innerHTML",
                "outerHTML",
                "textContent",
                "document.write()"
              ],
              "correctAnswerIndex": 2,
              "explanation": "'textContent' treats all content as raw literal text, automatically preventing HTML parsing and XSS injection.",
              "difficulty": "beginner"
            }
          ]
        }
      },
      {
        "id": "mod-mern-react",
        "title": "Module 3: Modern React Frontend Architecture",
        "description": "Component architecture, JSX, props, state, React hooks (useState, useEffect, useMemo, useCallback), routing, performance optimization, and context state management.",
        "order": 3,
        "lessons": [
          {
            "id": "les-mern-react-fundamentals",
            "slug": "14-react-fundamentals",
            "title": "14 Fullstack Dev: L12: React Fundamentals & Component Architecture",
            "description": "Introduction to React: JSX syntax, component lifecycle, unidirectional data flow, props, and declarative UI rendering.",
            "youtubeVideoId": "yxlmLFFn5co",
            "durationMinutes": 122,
            "order": 1,
            "moduleTitle": "Module 3: Modern React Frontend Architecture",
            "objectives": [
              "Understand why React uses a Virtual DOM and declarative rendering model",
              "Compose reusable functional components using JSX and typed props",
              "Render dynamic lists with unique and stable keys"
            ],
            "tags": [
              "react",
              "jsx",
              "components",
              "props",
              "virtual-dom"
            ],
            "skillsTaught": [
              "Component composition",
              "JSX authoring",
              "Prop passing"
            ],
            "richContent": {
              "introduction": "React revolutionized frontend engineering by replacing imperative DOM mutations with declarative component composition.",
              "keyTerminology": [
                {
                  "term": "JSX",
                  "definition": "JavaScript XML extension allowing HTML-like syntax inside JavaScript files"
                },
                {
                  "term": "Virtual DOM",
                  "definition": "In-memory representation of real DOM elements used for diffing and minimal reconciliations"
                },
                {
                  "term": "Props",
                  "definition": "Read-only data passed from parent components down to child components"
                }
              ],
              "theorySections": [
                {
                  "title": "Declarative UI and Unidirectional Data Flow",
                  "content": "In React, UI is a function of state: UI = f(state). Data flows down through props, while events flow up via callbacks.",
                  "keyPoints": [
                    "Components should be pure functions with respect to their props",
                    "Always supply a stable, unique key (like an ID) when rendering lists, never array index if order can change",
                    "Keep components small and focused on single visual or logical units"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Create a Course Card Component",
                  "instruction": "Build a reusable CourseCard receiving title, instructor, and duration as props.",
                  "expectedOutcome": "A modular, reusable React component rendering clean markup"
                }
              ],
              "practicalExercise": {
                "title": "Component Tree Exercise",
                "objective": "Build a parent CourseList rendering multiple CourseCard components with props",
                "instructions": [
                  "Use unique IDs as keys and verify rendering in React DevTools"
                ]
              },
              "commonMistakes": [
                "Using array index as list key, causing rendering glitches during list re-ordering or deletion"
              ],
              "securityRelevance": "JSX escapes values embedded in { } by default, mitigating traditional HTML injection vulnerabilities.",
              "summary": "Declarative components and unidirectional data flow make UI state predictable and testable."
            }
          },
          {
            "id": "les-mern-react-async",
            "slug": "15-async-operations-react",
            "title": "15 Fullstack Dev: L13: Async Operations & Hooks in React",
            "description": "Managing component state and side effects with useState, useEffect, data fetching patterns, and dependency array rules.",
            "youtubeVideoId": "4xbKC__vx18",
            "durationMinutes": 127,
            "order": 2,
            "moduleTitle": "Module 3: Modern React Frontend Architecture",
            "objectives": [
              "Manage local component state predictably using useState",
              "Execute side effects, timers, and data fetching with useEffect",
              "Master useEffect dependency array rules and cleanup functions"
            ],
            "tags": [
              "react",
              "hooks",
              "usestate",
              "useeffect",
              "async"
            ],
            "skillsTaught": [
              "State management",
              "Side effect lifecycles",
              "API integration in React"
            ],
            "richContent": {
              "introduction": "Hooks allow functional components to own state and lifecycle behaviors. Master useState and useEffect.",
              "keyTerminology": [
                {
                  "term": "useState",
                  "definition": "React hook returning a state value and a setter function to trigger re-renders"
                },
                {
                  "term": "useEffect",
                  "definition": "React hook for coordinating side effects (data fetching, subscriptions, DOM mutations)"
                },
                {
                  "term": "Cleanup Function",
                  "definition": "Function returned by useEffect to unsubscribe or abort operations before re-running or unmounting"
                }
              ],
              "theorySections": [
                {
                  "title": "The Lifecycle of Side Effects",
                  "content": "useEffect runs after the browser paints. The dependency array tells React when to re-execute the effect based on reference changes.",
                  "keyPoints": [
                    "An empty dependency array [] runs the effect once after the initial mount",
                    "Always return a cleanup function to cancel inflight requests or clear timers",
                    "Use functional updates (setCount(prev => prev + 1)) when new state depends on previous state"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Fetch Data Inside useEffect",
                  "instruction": "Author a component that fetches data on mount with loading and error states.",
                  "expectedOutcome": "Graceful loading spinner, data presentation, or error message"
                }
              ],
              "practicalExercise": {
                "title": "Live Search Input",
                "objective": "Build a search field that fetches matching records with a 300ms debounce inside useEffect",
                "instructions": [
                  "Clean up the debounce timer on every keystroke"
                ]
              },
              "commonMistakes": [
                "Omitting dependencies from the useEffect dependency array, creating stale closures"
              ],
              "securityRelevance": "Failing to clean up asynchronous effects can lead to memory leaks and race condition data overwrites.",
              "summary": "useState and useEffect form the engine of dynamic, interactive React applications."
            }
          },
          {
            "id": "les-mern-react-optimization",
            "slug": "16-advanced-react-optimization",
            "title": "16 Fullstack Dev: L14: Advanced React & Optimization",
            "description": "Optimizing React performance: preventing unnecessary re-renders, React.memo, useMemo, useCallback, and code-splitting with React.lazy.",
            "youtubeVideoId": "3RQwna3tA74",
            "durationMinutes": 32,
            "order": 3,
            "moduleTitle": "Module 3: Modern React Frontend Architecture",
            "objectives": [
              "Profile component re-renders using React DevTools Profiler",
              "Memoize expensive computations with useMemo and function callbacks with useCallback",
              "Code-split large components using React.lazy and Suspense"
            ],
            "tags": [
              "react",
              "optimization",
              "performance",
              "usememo",
              "usecallback"
            ],
            "skillsTaught": [
              "React profiling",
              "Memoization techniques",
              "Dynamic imports"
            ],
            "richContent": {
              "introduction": "Deliver silky-smooth 60fps applications by eliminating wasteful renders and optimizing bundle sizes.",
              "keyTerminology": [
                {
                  "term": "React.memo",
                  "definition": "Higher-order component that skips re-rendering if props have not changed"
                },
                {
                  "term": "useCallback",
                  "definition": "Hook that caches a function definition between renders to maintain referential identity"
                },
                {
                  "term": "Code Splitting",
                  "definition": "Splitting JavaScript bundles into on-demand chunks loaded only when needed"
                }
              ],
              "theorySections": [
                {
                  "title": "Referential Stability and Memoization",
                  "content": "Functions and objects declared inside components get re-created on every render. If passed to memoized children, they trigger re-renders unless wrapped in useCallback/useMemo.",
                  "keyPoints": [
                    "Do not prematurely optimize every component; profile first with React DevTools",
                    "Use useMemo for genuinely expensive data transformations (e.g. filtering 10,000 items)",
                    "Wrap route pages in React.lazy to keep initial page load bundle sizes small"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Profile and Memoize a Large List",
                  "instruction": "Wrap list items in React.memo and pass stable action handlers with useCallback.",
                  "expectedOutcome": "Typing in a search box no longer re-renders unaffected list items"
                }
              ],
              "practicalExercise": {
                "title": "Suspense Boundary Setup",
                "objective": "Lazy load an analytics chart component with a fallback skeleton UI",
                "instructions": [
                  "Verify the chunk only downloads when the chart becomes visible"
                ]
              },
              "commonMistakes": [
                "Wrapping trivial inline functions in useCallback when the child component is not memoized"
              ],
              "securityRelevance": "Performance optimization protects client CPU and battery, guarding against UI-thread denial of service.",
              "summary": "Strategic memoization and code splitting maintain high-speed interactivity even in massive applications."
            }
          },
          {
            "id": "les-mern-state-mgmt-1",
            "slug": "17-state-management",
            "title": "17 Fullstack Dev: L17: State Management & Reducer Patterns",
            "description": "Lifting state up, complex state management using useReducer, and action-dispatch architecture.",
            "youtubeVideoId": "5vjCTqIXD6E",
            "durationMinutes": 122,
            "order": 4,
            "moduleTitle": "Module 3: Modern React Frontend Architecture",
            "objectives": [
              "Lift state to common parent components when multiple children need shared data",
              "Manage complex component state with useReducer and pure reducer functions",
              "Structure predictable action objects with type and payload conventions"
            ],
            "tags": [
              "react",
              "state-management",
              "usereducer",
              "actions"
            ],
            "skillsTaught": [
              "State lifting",
              "Reducer pattern",
              "Deterministic state transitions"
            ],
            "richContent": {
              "introduction": "When component state grows beyond simple primitives, useReducer provides deterministic, testable transitions.",
              "keyTerminology": [
                {
                  "term": "useReducer",
                  "definition": "React hook for managing state via a reducer function: (state, action) => newState"
                },
                {
                  "term": "Action",
                  "definition": "A plain JavaScript object describing an intent, typically { type, payload }"
                },
                {
                  "term": "Lifting State",
                  "definition": "Moving state to the closest common ancestor to synchronize multiple child components"
                }
              ],
              "theorySections": [
                {
                  "title": "Deterministic Reducers",
                  "content": "A reducer must be a pure function: given the same state and action, it must always return the exact same new state without side effects.",
                  "keyPoints": [
                    "Never mutate the existing state directly inside a reducer; return new object copies using spread syntax",
                    "Consolidate multiple related state variables into a single reducer to prevent out-of-sync states",
                    "Reducers are easily unit tested because they do not depend on the DOM or React internals"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Build a Shopping Cart Reducer",
                  "instruction": "Implement ADD_ITEM, REMOVE_ITEM, and CLEAR_CART actions in a pure reducer function.",
                  "expectedOutcome": "Predictable state transitions verified with console logs"
                }
              ],
              "practicalExercise": {
                "title": "Multi-Step Form with useReducer",
                "objective": "Build a multi-step checkout form managing steps, form data, and validation errors via useReducer",
                "instructions": [
                  "Handle NEXT_STEP, PREV_STEP, and UPDATE_FIELD actions"
                ]
              },
              "commonMistakes": [
                "Making network requests or generating random numbers inside pure reducer functions"
              ],
              "securityRelevance": "Predictable state transitions prevent unauthorized state modifications or corrupted transaction states.",
              "summary": "useReducer brings architectural rigor to complex frontend workflows."
            }
          },
          {
            "id": "les-mern-react-routing",
            "slug": "18-react-routing",
            "title": "18 Full Stack Lecture 15: React Routing & Navigation",
            "description": "Single-Page Application routing: React Router, route parameters, nested routes, protected routes, and programatic navigation.",
            "youtubeVideoId": "vjeHkb4FV7c",
            "durationMinutes": 138,
            "order": 5,
            "moduleTitle": "Module 3: Modern React Frontend Architecture",
            "objectives": [
              "Configure client-side routing without triggering browser full-page reloads",
              "Extract dynamic route parameters (e.g. /courses/:id) with useParams",
              "Implement protected routes that redirect unauthorized users to login"
            ],
            "tags": [
              "react",
              "routing",
              "react-router",
              "navigation",
              "spa"
            ],
            "skillsTaught": [
              "Client routing",
              "Protected routes",
              "Route parameters"
            ],
            "richContent": {
              "introduction": "Single Page Applications require client-side routing to deliver lightning-fast page transitions without page reloads.",
              "keyTerminology": [
                {
                  "term": "SPA",
                  "definition": "Single Page Application that rewrites the current web page rather than loading entire new pages"
                },
                {
                  "term": "useParams",
                  "definition": "Hook to access URL parameter values matched by dynamic route definitions"
                },
                {
                  "term": "Protected Route",
                  "definition": "A route component that checks authentication status before rendering protected content"
                }
              ],
              "theorySections": [
                {
                  "title": "Client-Side Route History",
                  "content": "Client routers use the HTML5 History API (pushState, replaceState) to change browser URLs without requesting new HTML documents from the server.",
                  "keyPoints": [
                    "Use <Link> components rather than raw <a> tags to prevent full page reloads",
                    "Structure layout routes using <Outlet /> to share headers and navigation across pages",
                    "Save the intended destination in redirect state so users return to their requested page after logging in"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Configure App Routes",
                  "instruction": "Set up BrowserRouter with Home, Courses, Dashboard, and Login routes.",
                  "expectedOutcome": "Instant transitions between routes without server roundtrips"
                }
              ],
              "practicalExercise": {
                "title": "Protected Admin Route",
                "objective": "Build a RequireAuth component that inspects user session and redirects guests to /login",
                "instructions": [
                  "Preserve target URL in location state for post-login redirect"
                ]
              },
              "commonMistakes": [
                "Assuming client-side route protection replaces backend API authentication"
              ],
              "securityRelevance": "Frontend route guards improve UX, but backend APIs must independently verify tokens for every single request.",
              "summary": "Client-side routing creates seamless desktop-grade web application navigation."
            }
          },
          {
            "id": "les-mern-react-performance",
            "slug": "19-react-performance-ux",
            "title": "19 Full Stack Lecture 16: React Performance & UX Architecture",
            "description": "User experience architecture: optimistic UI updates, skeleton loading screens, accessible error boundaries, and form validation.",
            "youtubeVideoId": "mQEbNF0stb4",
            "durationMinutes": 126,
            "order": 6,
            "moduleTitle": "Module 3: Modern React Frontend Architecture",
            "objectives": [
              "Implement optimistic UI updates that reflect user actions instantly",
              "Design skeleton screens to eliminate jarring layout shifts (CLS)",
              "Capture runtime rendering errors with React Error Boundaries"
            ],
            "tags": [
              "react",
              "ux",
              "performance",
              "error-boundaries",
              "optimistic-ui"
            ],
            "skillsTaught": [
              "Optimistic updates",
              "Error boundaries",
              "Skeleton loading"
            ],
            "richContent": {
              "introduction": "Exceptional applications feel instantaneous. Master optimistic UI, skeleton loaders, and resilient error boundaries.",
              "keyTerminology": [
                {
                  "term": "Optimistic UI",
                  "definition": "Updating the UI immediately on user action before server confirmation, with automatic rollback on error"
                },
                {
                  "term": "Error Boundary",
                  "definition": "React component that catches JavaScript errors in child component trees and renders a fallback UI"
                },
                {
                  "term": "Cumulative Layout Shift (CLS)",
                  "definition": "Core Web Vital measuring unexpected layout movement during page load"
                }
              ],
              "theorySections": [
                {
                  "title": "Resilient UI Patterns",
                  "content": "Rather than blocking users with full-screen spinners, update the UI immediately and handle rare network errors with gentle rollback and notifications.",
                  "keyPoints": [
                    "Error boundaries prevent a single component crash from breaking the entire web application",
                    "Skeleton loaders provide visual continuity and improve perceived performance",
                    "Provide clear retry mechanisms when asynchronous operations fail"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Build an Error Boundary",
                  "instruction": "Create an ErrorBoundary class component implementing getDerivedStateFromError and componentDidCatch.",
                  "expectedOutcome": "A resilient fallback card rendering with a 'Try Again' button when a child throws"
                }
              ],
              "practicalExercise": {
                "title": "Optimistic Like Button",
                "objective": "Build a bookmark or like button that increments immediately and reverts if the API call fails",
                "instructions": [
                  "Simulate a network timeout and demonstrate the clean rollback"
                ]
              },
              "commonMistakes": [
                "Leaving users stranded with blank screens when unhandled errors occur"
              ],
              "securityRelevance": "Catching errors gracefully prevents exposing raw stack traces containing server endpoints or credentials.",
              "summary": "Optimistic UI and error boundaries elevate web apps to commercial-grade reliability."
            }
          },
          {
            "id": "les-mern-state-mgmt-2",
            "slug": "20-advanced-state-management",
            "title": "20 Full Stack Lecture 17: Advanced State Management & Context API",
            "description": "Global application state management using the React Context API, custom hooks, and scalable state architecture.",
            "youtubeVideoId": "bPEc9P1likA",
            "durationMinutes": 132,
            "order": 7,
            "moduleTitle": "Module 3: Modern React Frontend Architecture",
            "objectives": [
              "Eliminate 'prop drilling' by sharing global state with createContext and useContext",
              "Combine Context with useReducer for powerful lightweight global state",
              "Author custom hooks to encapsulate reusable stateful business logic"
            ],
            "tags": [
              "react",
              "context-api",
              "custom-hooks",
              "global-state"
            ],
            "skillsTaught": [
              "Context API",
              "Custom hook authoring",
              "Global state architecture"
            ],
            "richContent": {
              "introduction": "When props must pass through dozens of nested layers, the React Context API provides clean, centralized global state.",
              "keyTerminology": [
                {
                  "term": "Prop Drilling",
                  "definition": "The tedious process of passing props through intermediary components that do not need them"
                },
                {
                  "term": "Context API",
                  "definition": "React mechanism for broadcasting state values to any deeply nested descendant component"
                },
                {
                  "term": "Custom Hook",
                  "definition": "A JavaScript function starting with 'use' that composes standard React hooks for reuse"
                }
              ],
              "theorySections": [
                {
                  "title": "Context Architecture and Performance",
                  "content": "Split global contexts by domain (e.g. AuthContext, ThemeContext, CartContext) so updates to theme do not cause all auth consumers to re-render.",
                  "keyPoints": [
                    "Always pair a Context with a custom hook (e.g. useAuth) that throws a descriptive error if used outside its Provider",
                    "Separate state context from dispatch context to optimize re-render cycles",
                    "Use Context for low-frequency global updates (auth, theme, preferences)"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Build an AuthProvider and useAuth Hook",
                  "instruction": "Create an AuthContext with login, logout, user, and isAuthenticated state.",
                  "expectedOutcome": "Any component in the tree can consume auth state with const { user } = useAuth()"
                }
              ],
              "practicalExercise": {
                "title": "Theme Context with LocalStorage",
                "objective": "Build a ThemeProvider supporting light/dark toggle and persisting selection to localStorage",
                "instructions": [
                  "Create a useTheme hook and toggle button"
                ]
              },
              "commonMistakes": [
                "Placing all application state into a single gigantic Context, causing the entire app to re-render on any change"
              ],
              "securityRelevance": "Centralizing auth tokens in Context prevents fragmentation and simplifies global logout cleanup.",
              "summary": "Context API and custom hooks provide a clean, native global state solution without heavy external libraries."
            }
          }
        ],
        "quiz": {
          "title": "Module 3 Quiz: Modern React Frontend Architecture",
          "passingScorePercent": 70,
          "questions": [
            {
              "question": "What is the primary danger of using an array index as the 'key' prop when rendering a dynamic list in React?",
              "options": [
                "It crashes the Node.js development server",
                "It causes rendering bugs, corrupted input states, and suboptimal reconciliation when items are reordered, inserted, or removed",
                "It converts the React component to a server component",
                "It exposes the component's internal state to the global window"
              ],
              "correctAnswerIndex": 1,
              "explanation": "Keys must identify items uniquely across renders. Using index causes React to mistake which item changed when items shift order.",
              "difficulty": "beginner"
            },
            {
              "question": "When should you return a cleanup function from inside a useEffect hook?",
              "options": [
                "Only when the component throws a JavaScript error",
                "Whenever the effect creates subscriptions, timers, event listeners, or inflight network requests that must be cancelled on unmount",
                "Cleanup functions are only required in class components",
                "Every useEffect must return a boolean"
              ],
              "correctAnswerIndex": 1,
              "explanation": "Returning a cleanup function prevents memory leaks, dangling listeners, and state updates on unmounted components.",
              "difficulty": "beginner"
            },
            {
              "question": "Why is client-side route protection (e.g. RequireAuth component in React Router) not sufficient on its own for security?",
              "options": [
                "Because client-side code can be modified or bypassed in the browser; the backend API must verify tokens for every request",
                "Because React Router does not support cookies",
                "Because browsers disable JavaScript on protected routes",
                "Because client routes cannot render forms"
              ],
              "correctAnswerIndex": 0,
              "explanation": "The browser is an untrusted environment. Real security is enforced server-side by validating tokens on every API request.",
              "difficulty": "beginner"
            }
          ]
        }
      },
      {
        "id": "mod-mern-backend",
        "title": "Module 4: Backend Engineering with Node.js, Express, MongoDB & Security",
        "description": "Server-side development: Node.js runtime, Express.js architecture, middleware, RESTful API design, MongoDB data modeling with Mongoose, JWT authentication, and security hardening.",
        "order": 4,
        "lessons": [
          {
            "id": "les-mern-node-fundamentals",
            "slug": "21-nodejs-fundamentals",
            "title": "21 Full Stack Lecture 18: Node.js Fundamentals & Architecture",
            "description": "Node.js architecture under the hood: V8 engine, libuv, non-blocking I/O, core modules (fs, path, http, events), and the module system (CommonJS vs ESM).",
            "youtubeVideoId": "wdAGSMZQ2U8",
            "durationMinutes": 124,
            "order": 1,
            "moduleTitle": "Module 4: Backend Engineering with Node.js, Express, MongoDB & Security",
            "objectives": [
              "Explain libuv thread pool, non-blocking I/O, and asynchronous event-driven architecture",
              "Work with Node.js core modules: fs, path, and EventEmitter",
              "Configure modern ECMAScript Modules (ESM) in Node.js applications"
            ],
            "tags": [
              "node",
              "backend",
              "libuv",
              "filesystem",
              "esm"
            ],
            "skillsTaught": [
              "Node.js internals",
              "Filesystem I/O",
              "Module management"
            ],
            "richContent": {
              "introduction": "Node.js enables fast, scalable network applications by executing JavaScript on Google Chrome's V8 engine via libuv.",
              "keyTerminology": [
                {
                  "term": "libuv",
                  "definition": "C library providing the asynchronous event loop and thread pool in Node.js"
                },
                {
                  "term": "Non-Blocking I/O",
                  "definition": "Input/output operations that return immediately, notifying the runtime via callbacks when finished"
                },
                {
                  "term": "EventEmitter",
                  "definition": "Core Node.js class facilitating event-driven publish-subscribe architectures"
                }
              ],
              "theorySections": [
                {
                  "title": "Thread Pool and Non-Blocking Operations",
                  "content": "While your JavaScript runs on a single main thread, libuv offloads expensive filesystem and cryptographic tasks to a background thread pool.",
                  "keyPoints": [
                    "Never run heavy CPU-blocking calculations on the main Node.js thread; use Worker Threads if necessary",
                    "Use fs.promises rather than blocking synchronous fs.*Sync methods in production servers",
                    "Always use path.join() or path.resolve() to ensure cross-platform operating system path compatibility"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Create an Asynchronous File Reader",
                  "instruction": "Read and parse a JSON configuration file asynchronously using fs/promises and path.join.",
                  "expectedOutcome": "Safe non-blocking file processing"
                }
              ],
              "practicalExercise": {
                "title": "Custom Event Logger",
                "objective": "Build a custom Logger class extending EventEmitter that logs timestamped events to disk",
                "instructions": [
                  "Handle error events cleanly without crashing the process"
                ]
              },
              "commonMistakes": [
                "Using synchronous methods like fs.readFileSync inside HTTP request handlers, blocking all other incoming connections"
              ],
              "securityRelevance": "Path traversal attacks occur when user inputs are joined directly to filesystem paths without validation. Sanitize paths rigorously.",
              "summary": "Mastering Node.js asynchronous architecture allows you to build backends supporting thousands of concurrent users."
            }
          },
          {
            "id": "les-mern-express-basics",
            "slug": "22-expressjs-basics",
            "title": "22 Full Stack Lecture 19: Express.js Basics & Routing",
            "description": "Building HTTP servers with Express: app configuration, routing methods (GET, POST, PUT, DELETE), request and response objects, and URL parameters.",
            "youtubeVideoId": "L-RCs6IGeIY",
            "durationMinutes": 130,
            "order": 2,
            "moduleTitle": "Module 4: Backend Engineering with Node.js, Express, MongoDB & Security",
            "objectives": [
              "Initialize an Express server listening on configurable environment ports",
              "Define RESTful endpoint handlers for standard HTTP verbs",
              "Parse URL parameters (req.params), query strings (req.query), and JSON bodies (req.body)"
            ],
            "tags": [
              "express",
              "node",
              "routing",
              "http-methods",
              "backend"
            ],
            "skillsTaught": [
              "Express server initialization",
              "REST routing",
              "Request inspection"
            ],
            "richContent": {
              "introduction": "Express.js is the minimalist, flexible web framework that powers majority of Node.js backends worldwide.",
              "keyTerminology": [
                {
                  "term": "Express.js",
                  "definition": "Fast, unopinionated, minimalist web framework for Node.js"
                },
                {
                  "term": "req.params",
                  "definition": "Object containing properties mapped to named route parameters like /api/users/:id"
                },
                {
                  "term": "res.status()",
                  "definition": "Method setting the HTTP response status code before sending data"
                }
              ],
              "theorySections": [
                {
                  "title": "Request and Response Flow",
                  "content": "Express channels incoming HTTP requests through a chain of routing handlers, ending with a response sent back to the client.",
                  "keyPoints": [
                    "Always configure express.json() middleware to enable parsing of JSON request bodies",
                    "Return standard HTTP status codes: 200 for OK, 201 for Created, 400 for Bad Request, 404 for Not Found",
                    "Always ensure every code path calls a response method (res.json, res.send, res.end) to prevent request hanging"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Create a Minimal REST API",
                  "instruction": "Set up an Express application with GET /api/courses and POST /api/courses.",
                  "expectedOutcome": "Server responding to curl or Postman requests with JSON payloads"
                }
              ],
              "practicalExercise": {
                "title": "CRUD Route Map",
                "objective": "Build an in-memory item manager with full GET, POST, PUT, and DELETE endpoints",
                "instructions": [
                  "Return 404 when requested IDs do not exist"
                ]
              },
              "commonMistakes": [
                "Forgetting to call res.json() or return from an error check, causing multiple responses or hanging sockets"
              ],
              "securityRelevance": "Validate the shape and types of req.body data before processing to prevent crashes and injection attacks.",
              "summary": "Express transforms raw Node.js HTTP streams into an intuitive, productive routing framework."
            }
          },
          {
            "id": "les-mern-express-middleware",
            "slug": "23-express-middleware-architecture",
            "title": "23 Full Stack Lecture 20: Express Middleware & Architecture",
            "description": "The middleware pattern in Express: application-level, router-level, error-handling middleware, third-party middleware (cors, morgan, helmet), and next().",
            "youtubeVideoId": "2ljrdOcopFg",
            "durationMinutes": 116,
            "order": 3,
            "moduleTitle": "Module 4: Backend Engineering with Node.js, Express, MongoDB & Security",
            "objectives": [
              "Understand the middleware pipeline and the role of the next() function",
              "Author custom logging, timing, and authorization middleware",
              "Implement centralized global error-handling middleware (err, req, res, next)"
            ],
            "tags": [
              "express",
              "middleware",
              "cors",
              "helmet",
              "error-handling"
            ],
            "skillsTaught": [
              "Middleware pipeline",
              "Centralized error handling",
              "Security middleware"
            ],
            "richContent": {
              "introduction": "Middleware is the heart of Express. Every request flows through a pipeline of functions that inspect, transform, or reject it.",
              "keyTerminology": [
                {
                  "term": "Middleware",
                  "definition": "Functions that have access to the request object (req), response object (res), and the next middleware function"
                },
                {
                  "term": "next()",
                  "definition": "Callback passing control to the next middleware function in the execution stack"
                },
                {
                  "term": "Error Middleware",
                  "definition": "Special 4-argument middleware (err, req, res, next) for catching and formatting application errors"
                }
              ],
              "theorySections": [
                {
                  "title": "The Middleware Chain",
                  "content": "Middleware executes sequentially. If a function does not end the request-response cycle, it MUST call next() to pass control forward.",
                  "keyPoints": [
                    "Global error-handling middleware must always accept four parameters: (err, req, res, next)",
                    "Use 'cors' to configure allowed origins and prevent cross-origin issues",
                    "Use 'helmet' to automatically set secure HTTP response headers (Content-Security-Policy, X-Frame-Options)"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Author Custom Request Logger",
                  "instruction": "Write middleware logging HTTP method, URL, and execution time for every incoming request.",
                  "expectedOutcome": "Timestamped console logs for all traffic flowing through the server"
                }
              ],
              "practicalExercise": {
                "title": "Centralized Error Handler",
                "objective": "Build custom AppError class and global error-handling middleware formatting JSON responses",
                "instructions": [
                  "Hide internal error stack traces in production environment"
                ]
              },
              "commonMistakes": [
                "Forgetting to call next() in custom middleware, causing client requests to freeze indefinitely"
              ],
              "securityRelevance": "Helmet and CORS middleware protect your server against cross-site scripting and unauthorized domain access.",
              "summary": "Mastering the middleware pipeline enables modular authentication, validation, logging, and security."
            }
          },
          {
            "id": "les-mern-rest-api",
            "slug": "24-rest-api-development",
            "title": "24 Full Stack Lecture 21: REST API Development & Best Practices",
            "description": "Designing clean, scalable REST APIs: URI naming conventions, HTTP status codes, filtering, sorting, pagination, and controller-service architecture.",
            "youtubeVideoId": "KmGDjuYx_Ng",
            "durationMinutes": 136,
            "order": 4,
            "moduleTitle": "Module 4: Backend Engineering with Node.js, Express, MongoDB & Security",
            "objectives": [
              "Design consistent, intuitive RESTful URIs following resource-oriented standards",
              "Implement robust server-side pagination (limit, page), filtering, and sorting",
              "Organize backend code using Controller-Service-Repository architecture"
            ],
            "tags": [
              "rest",
              "api",
              "backend-architecture",
              "pagination"
            ],
            "skillsTaught": [
              "RESTful design",
              "Pagination and filtering",
              "Controller-service pattern"
            ],
            "richContent": {
              "introduction": "Professional backends follow predictable RESTful standards. Learn how to design robust, scalable APIs.",
              "keyTerminology": [
                {
                  "term": "REST",
                  "definition": "Representational State Transfer: architectural style for distributed hypermedia systems"
                },
                {
                  "term": "Idempotent",
                  "definition": "An HTTP method (GET, PUT, DELETE) where multiple identical requests produce the same side effect as a single request"
                },
                {
                  "term": "Pagination",
                  "definition": "Technique slicing large datasets into smaller pages to prevent server and network exhaustion"
                }
              ],
              "theorySections": [
                {
                  "title": "Clean API Architecture",
                  "content": "Separate routing (URLs) from controllers (HTTP handling) and services (business logic). This decouples code and simplifies automated testing.",
                  "keyPoints": [
                    "Use nouns for endpoints: /api/courses, not /api/getAllCourses",
                    "Always enforce maximum pagination limits (e.g. limit=100) to protect database memory",
                    "Return standard response envelopes with meta pagination data: { data, total, page, totalPages }"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Implement Server-Side Pagination",
                  "instruction": "Build GET /api/items?page=1&limit=10 calculating skip offsets and total record counts.",
                  "expectedOutcome": "Scalable, paginated API response"
                }
              ],
              "practicalExercise": {
                "title": "REST API Controller Refactoring",
                "objective": "Refactor a monolithic route file into separated routes, controllers, and services directories",
                "instructions": [
                  "Verify that all endpoint contracts remain identical"
                ]
              },
              "commonMistakes": [
                "Returning entire unpaginated database collections to the client, leading to server out-of-memory crashes"
              ],
              "securityRelevance": "Strict pagination and input sanitization prevent Denial of Service (DoS) and memory exhaustion.",
              "summary": "Clean REST conventions ensure your backend remains maintainable and pleasant for frontend teams to consume."
            }
          },
          {
            "id": "les-mern-mongodb-mongoose",
            "slug": "25-mongodb-mongoose",
            "title": "25 Full Stack Lecture 22: MongoDB & Mongoose Modeling",
            "description": "NoSQL document database fundamentals: MongoDB collections, BSON, Mongoose schemas, models, validation, indexing, and relationships.",
            "youtubeVideoId": "WhLe6hCXfGM",
            "durationMinutes": 144,
            "order": 5,
            "moduleTitle": "Module 4: Backend Engineering with Node.js, Express, MongoDB & Security",
            "objectives": [
              "Connect Express to MongoDB securely via Mongoose connection strings",
              "Define strongly-typed Mongoose Schemas with built-in and custom validators",
              "Perform CRUD operations and model document relationships using populate and embedded subdocuments"
            ],
            "tags": [
              "mongodb",
              "mongoose",
              "database",
              "nosql",
              "data-modeling"
            ],
            "skillsTaught": [
              "MongoDB queries",
              "Mongoose schema modeling",
              "Database validation"
            ],
            "richContent": {
              "introduction": "MongoDB stores data as flexible, JSON-like BSON documents. Mongoose adds schema validation and business logic modeling.",
              "keyTerminology": [
                {
                  "term": "NoSQL",
                  "definition": "Non-relational database providing flexible schema modeling and horizontal scalability"
                },
                {
                  "term": "Mongoose",
                  "definition": "Object Data Modeling (ODM) library for MongoDB and Node.js providing schemas and validation"
                },
                {
                  "term": "ObjectId",
                  "definition": "12-byte unique identifier generated for each MongoDB document containing timestamp and machine info"
                }
              ],
              "theorySections": [
                {
                  "title": "Embedding vs Referencing",
                  "content": "In document databases, embed related data when it is accessed together and bounded in size. Use references (ObjectId) when relationships are unbounded.",
                  "keyPoints": [
                    "Enforce required fields, string trimming, and unique indexes at the Mongoose schema layer",
                    "Always store MongoDB connection URIs in server environment variables (never in source code)",
                    "Use compound indexes on frequently queried fields to maintain fast query execution times"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Define User and Course Models",
                  "instruction": "Create Mongoose schemas for User and Course with timestamps and validation rules.",
                  "expectedOutcome": "Validated database models that reject malformed documents before insertion"
                }
              ],
              "practicalExercise": {
                "title": "CRUD with Mongoose",
                "objective": "Wire your Express controllers to perform real find(), findById(), create(), and findByIdAndUpdate() calls",
                "instructions": [
                  "Handle validation and cast errors gracefully"
                ]
              },
              "commonMistakes": [
                "Storing database credentials in git repositories or failing to index queried fields"
              ],
              "securityRelevance": "Mongoose schema enforcement and parameter casting prevent NoSQL injection vulnerabilities.",
              "summary": "Mongoose provides developer productivity and strict schema governance on top of flexible MongoDB persistence."
            }
          },
          {
            "id": "les-mern-auth-security",
            "slug": "26-authentication-security",
            "title": "26 Full Stack Lecture 23: Authentication & Security (JWT & Bcrypt)",
            "description": "Securing web applications: password hashing with bcrypt, JSON Web Tokens (JWT), auth middleware, role-based access control, and OWASP defenses.",
            "youtubeVideoId": "-mrlKY2DreU",
            "durationMinutes": 132,
            "order": 6,
            "moduleTitle": "Module 4: Backend Engineering with Node.js, Express, MongoDB & Security",
            "objectives": [
              "Hash and salt user passwords securely using bcrypt before database persistence",
              "Generate, sign, and verify JSON Web Tokens (JWT) for stateless authentication",
              "Build authentication and Role-Based Access Control (RBAC) middleware protecting sensitive routes"
            ],
            "tags": [
              "authentication",
              "security",
              "jwt",
              "bcrypt",
              "rbac",
              "owasp"
            ],
            "skillsTaught": [
              "Password hashing",
              "JWT generation & verification",
              "Auth middleware"
            ],
            "richContent": {
              "introduction": "Security is not an afterthought. Master password salting/hashing and stateless JWT authentication.",
              "keyTerminology": [
                {
                  "term": "bcrypt",
                  "definition": "Adaptive password hashing function incorporating cryptographic salts to defeat rainbow tables"
                },
                {
                  "term": "JWT",
                  "definition": "JSON Web Token: compact, URL-safe means of representing claims securely between two parties"
                },
                {
                  "term": "RBAC",
                  "definition": "Role-Based Access Control: restricting system access to authorized users based on roles (user, admin)"
                }
              ],
              "theorySections": [
                {
                  "title": "Stateless Token Authentication",
                  "content": "A JWT consists of Header.Payload.Signature. The server signs the token using a secret key. When requests arrive, the server verifies the signature without database lookups.",
                  "keyPoints": [
                    "NEVER store passwords in plaintext or using outdated algorithms like MD5 or SHA1; always use bcrypt or argon2",
                    "Store tokens in HTTP-only, secure, SameSite cookies to protect them from client-side XSS extraction",
                    "Keep token expiration times short and implement refresh token strategies for long-lived sessions"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Implement User Registration and Login",
                  "instruction": "Hash passwords on registration with bcrypt.hash() and verify on login with bcrypt.compare().",
                  "expectedOutcome": "Safe authentication generating a signed JWT on success"
                }
              ],
              "practicalExercise": {
                "title": "Auth Middleware",
                "objective": "Build a verifyToken middleware extracting Bearer tokens and attaching the decoded user to req.user",
                "instructions": [
                  "Return 401 Unauthorized if token is missing or invalid"
                ]
              },
              "commonMistakes": [
                "Storing sensitive user data (passwords, credit cards) inside JWT payload, which is only base64-encoded, not encrypted"
              ],
              "securityRelevance": "Proper password hashing and token validation defend against credential theft and unauthorized data access.",
              "summary": "Bcrypt and JWT provide the industry standard foundation for secure, scalable authentication."
            }
          },
          {
            "id": "les-mern-capstone-project",
            "slug": "27-capstone-project-implementation",
            "title": "27 Full Stack Lecture 24: Capstone Project — Advanced Implementation",
            "description": "Connecting the full stack: integrating React frontend with authenticated Express backend, protected API consumption, state synchronization, and real-time feedback.",
            "youtubeVideoId": "xU-oIQMj2pY",
            "durationMinutes": 120,
            "order": 7,
            "moduleTitle": "Module 4: Backend Engineering with Node.js, Express, MongoDB & Security",
            "objectives": [
              "Connect the React client to Express REST endpoints with authenticated headers",
              "Manage full-stack loading, error, and success notifications",
              "Build an end-to-end full-stack portfolio application with real database persistence"
            ],
            "tags": [
              "capstone",
              "full-stack",
              "react",
              "express",
              "integration"
            ],
            "skillsTaught": [
              "Full-stack integration",
              "End-to-end data flow",
              "Portfolio development"
            ],
            "richContent": {
              "introduction": "Bring all the pieces together: frontend React components communicating with an authenticated backend and database.",
              "keyTerminology": [
                {
                  "term": "End-to-End Integration",
                  "definition": "Coordinating user input in the browser, HTTP transport, server validation, database mutation, and UI feedback"
                },
                {
                  "term": "Bearer Token",
                  "definition": "Authorization header format (Authorization: Bearer <token>) used to authenticate API requests"
                },
                {
                  "term": "CORS Preflight",
                  "definition": "OPTIONS HTTP request sent by browsers to verify permissions before sending complex requests"
                }
              ],
              "theorySections": [
                {
                  "title": "Cohesive Full-Stack Delivery",
                  "content": "Verify that every layer enforces trust boundaries: frontend provides great UX, while the backend guarantees data validation and access control.",
                  "keyPoints": [
                    "Configure environment variables on both client (VITE_API_URL or NEXT_PUBLIC_API_URL) and server (PORT, MONGO_URI, JWT_SECRET)",
                    "Handle session expiration gracefully by redirecting to login when 401 responses occur",
                    "Write comprehensive integration tests covering end-to-end user workflows"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Wire Frontend API Client to Backend",
                  "instruction": "Set up an Axios or Fetch instance with an interceptor automatically attaching the JWT Bearer token.",
                  "expectedOutcome": "Seamless authenticated requests across the entire application"
                }
              ],
              "practicalExercise": {
                "title": "Complete Capstone Flow",
                "objective": "Build and verify an end-to-end resource sharing app: register, login, create resource, list resources, and delete",
                "instructions": [
                  "Ensure only the resource author can delete their own item"
                ]
              },
              "commonMistakes": [
                "Hardcoding localhost URLs in frontend code, causing production deployment failures"
              ],
              "securityRelevance": "Strict authorization on delete and update endpoints prevents Insecure Direct Object References (IDOR).",
              "summary": "Completing an end-to-end full-stack capstone proves your readiness for professional engineering roles."
            }
          },
          {
            "id": "les-mern-extra-session",
            "slug": "28-extra-session-architecture-review",
            "title": "28 Full Stack Lecture 25: Extra Session & Architecture Review",
            "description": "Comprehensive review of full-stack patterns, debugging production issues, code review practices, and preparing projects for deployment.",
            "youtubeVideoId": "Xbgz2qpyD8I",
            "durationMinutes": 86,
            "order": 8,
            "moduleTitle": "Module 4: Backend Engineering with Node.js, Express, MongoDB & Security",
            "objectives": [
              "Audit full-stack applications for security vulnerabilities and performance bottlenecks",
              "Debug common production issues: CORS errors, connection timeouts, and memory leaks",
              "Prepare applications for production deployment on platforms like Vercel and Railway"
            ],
            "tags": [
              "code-review",
              "architecture",
              "debugging",
              "deployment",
              "production"
            ],
            "skillsTaught": [
              "Production debugging",
              "Security auditing",
              "Deployment readiness"
            ],
            "richContent": {
              "introduction": "Review essential full-stack patterns, common production gotchas, and deployment checklists.",
              "keyTerminology": [
                {
                  "term": "Production Readiness",
                  "definition": "Verifying logging, error tracking, security headers, and environment configs before going live"
                },
                {
                  "term": "Health Check",
                  "definition": "A lightweight endpoint (/health) used by hosting platforms to monitor server status"
                },
                {
                  "term": "Environment Parity",
                  "definition": "Keeping development, staging, and production environments as similar as possible"
                }
              ],
              "theorySections": [
                {
                  "title": "Pre-Deployment Checklist",
                  "content": "Before deploying, ensure debug logging is disabled, database indexes are built, CORS is locked to production domains, and secrets are configured.",
                  "keyPoints": [
                    "Never commit .env files; configure environment variables directly in your hosting dashboard",
                    "Implement rate limiting on authentication endpoints to prevent brute-force attacks",
                    "Use structured logging to facilitate production monitoring and debugging"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Conduct Security Audit",
                  "instruction": "Review code for plaintext secrets, missing auth checks, and unvalidated inputs.",
                  "expectedOutcome": "A hardened application ready for public deployment"
                }
              ],
              "practicalExercise": {
                "title": "Deployment Readiness Audit",
                "objective": "Complete a 15-point checklist verifying security, performance, and reliability",
                "instructions": [
                  "Document test results and deployment instructions in README"
                ]
              },
              "commonMistakes": [
                "Deploying with permissive CORS settings (origin: '*') on authenticated APIs"
              ],
              "securityRelevance": "Auditing applications before release prevents high-severity data breaches in production.",
              "summary": "Disciplined architecture and deployment practices ensure your applications stay fast, secure, and reliable."
            }
          }
        ],
        "quiz": {
          "title": "Module 4 Quiz: Backend Engineering with Node.js, Express, MongoDB & Security",
          "passingScorePercent": 70,
          "questions": [
            {
              "question": "What is the critical distinction between password encryption and password hashing with bcrypt?",
              "options": [
                "Encryption is two-way (can be decrypted with a key), while hashing is a one-way mathematical function designed to never be reversed",
                "Hashing can be decrypted using the server's public key",
                "Bcrypt is faster than encryption",
                "Encryption is only used for frontend data"
              ],
              "correctAnswerIndex": 0,
              "explanation": "Passwords should never be reversible. Bcrypt is a one-way hashing algorithm with unique salts that cannot be decrypted.",
              "difficulty": "beginner"
            },
            {
              "question": "Why should JWT tokens ideally be stored in HTTP-only cookies rather than localStorage in browser applications?",
              "options": [
                "HTTP-only cookies cannot be accessed or stolen by malicious client-side JavaScript executing in an XSS attack",
                "localStorage has a 100-byte storage limit",
                "Cookies automatically encrypt all backend database tables",
                "localStorage cannot be sent over HTTPS"
              ],
              "correctAnswerIndex": 0,
              "explanation": "HTTP-only cookies are inaccessible to document.cookie in JavaScript, providing strong defense-in-depth against token theft via XSS.",
              "difficulty": "beginner"
            },
            {
              "question": "In Express error-handling middleware, what parameter signature must the function have for Express to recognize it as an error handler?",
              "options": [
                "(req, res)",
                "(err, req, res, next)",
                "(err, res)",
                "(req, res, next)"
              ],
              "correctAnswerIndex": 1,
              "explanation": "Express specifically checks function.length === 4. Error-handling middleware must explicitly take (err, req, res, next).",
              "difficulty": "beginner"
            }
          ]
        }
      },
      {
        "id": "mod-mern-ai",
        "title": "Module 5: AI-Powered Full-Stack Engineering (AI Agents, RAG & MCPs)",
        "description": "Cutting-edge AI engineering for full-stack developers: developer AI toolkits, Prompt Engineering, Vibe Coding, Spec-Driven Development, RAG architectures, Model Context Protocol (MCP), and building a Text-to-SQL project.",
        "order": 5,
        "lessons": [
          {
            "id": "les-mern-ai-toolkit",
            "slug": "29-ai-toolkit-developer-setup",
            "title": "29 AI For Developers Lecture 1: The AI Toolkit & Developer Setup",
            "description": "Modern AI developer ecosystem: LLM capabilities, API keys, AI coding assistants (Cursor, Copilot, Antigravity), model selection, and developer workstation setup.",
            "youtubeVideoId": "cx7bEi8OTaw",
            "durationMinutes": 138,
            "order": 1,
            "moduleTitle": "Module 5: AI-Powered Full-Stack Engineering (AI Agents, RAG & MCPs)",
            "objectives": [
              "Understand the landscape of Frontier LLMs, context windows, and token economics",
              "Configure modern AI-assisted coding tools and IDE extensions securely",
              "Manage AI provider credentials safely using server-side proxies and budget limits"
            ],
            "tags": [
              "ai",
              "developer-tools",
              "llm",
              "ai-toolkit",
              "setup"
            ],
            "skillsTaught": [
              "AI developer setup",
              "Token economics",
              "Provider credential safety"
            ],
            "richContent": {
              "introduction": "AI is transforming software engineering. Learn how to augment your full-stack workflow with cutting-edge AI developer tools.",
              "keyTerminology": [
                {
                  "term": "LLM",
                  "definition": "Large Language Model trained on massive text corpora to predict tokens and generate code"
                },
                {
                  "term": "Context Window",
                  "definition": "The maximum number of tokens an AI model can process in a single conversation turn"
                },
                {
                  "term": "Token",
                  "definition": "The basic atomic unit of text (approx. 4 characters or 0.75 words) processed by language models"
                }
              ],
              "theorySections": [
                {
                  "title": "Safe AI Integration Architecture",
                  "content": "Never call AI APIs directly from client-side React code with private API keys. Always route requests through a server proxy that validates users and enforces rate limits.",
                  "keyPoints": [
                    "Keep proprietary AI API keys on your backend server in environment variables",
                    "Set hard spend limits and budget alerts in your AI provider consoles",
                    "Understand the trade-offs between reasoning-heavy models and fast lightweight models"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Configure Secure AI Gateway Proxy",
                  "instruction": "Build a simple Express endpoint POST /api/ai/chat that calls an AI provider using server-stored API keys.",
                  "expectedOutcome": "Safe AI inference without exposing credentials to the browser"
                }
              ],
              "practicalExercise": {
                "title": "AI Assistant Workstation Setup",
                "objective": "Configure an AI-powered coding assistant and establish project rules in .cursorrules or AGENTS.md",
                "instructions": [
                  "Define guidelines for coding conventions, test coverage, and documentation"
                ]
              },
              "commonMistakes": [
                "Embedding paid AI API keys in client-side React code or committing them to public GitHub repos"
              ],
              "securityRelevance": "API key leaks lead to massive unauthorized billing and service disruption within minutes of public exposure.",
              "summary": "Mastering modern AI tools amplifies developer productivity while disciplined security keeps projects safe."
            }
          },
          {
            "id": "les-mern-prompt-engineering",
            "slug": "30-prompt-engineering-vibe-coding",
            "title": "30 AI For Developers Lecture 2: Prompt Engineering & Vibe Coding",
            "description": "Techniques for effective AI prompting: Few-shot prompting, Chain-of-Thought, system instructions, structured output schemas, and rapid prototyping workflows.",
            "youtubeVideoId": "HCI3HHycNwk",
            "durationMinutes": 134,
            "order": 2,
            "moduleTitle": "Module 5: AI-Powered Full-Stack Engineering (AI Agents, RAG & MCPs)",
            "objectives": [
              "Master structured prompt architectures: Role, Context, Constraints, and Output Format",
              "Utilize Few-Shot examples and Chain-of-Thought reasoning to produce deterministic code",
              "Enforce structured JSON output schemas from LLMs for reliable application parsing"
            ],
            "tags": [
              "prompt-engineering",
              "vibe-coding",
              "chain-of-thought",
              "structured-outputs"
            ],
            "skillsTaught": [
              "Prompt design",
              "Structured outputs",
              "Iterative prototyping"
            ],
            "richContent": {
              "introduction": "Prompting is the art of steering probabilistic models toward deterministic, production-grade results.",
              "keyTerminology": [
                {
                  "term": "System Prompt",
                  "definition": "Top-level instructions establishing the model's persona, constraints, and operating boundaries"
                },
                {
                  "term": "Few-Shot Prompting",
                  "definition": "Providing input-output demonstration pairs within the prompt to guide output structure"
                },
                {
                  "term": "Structured Outputs",
                  "definition": "Enforcing valid JSON schemas on model responses for guaranteed programmatic parsing"
                }
              ],
              "theorySections": [
                {
                  "title": "Deterministic Prompt Architecture",
                  "content": "Ambiguous prompts yield unpredictable code. Clearly specify language version, libraries, error handling rules, and exact output formats.",
                  "keyPoints": [
                    "Define negative constraints (e.g. 'Do not use deprecated libraries or external UI packages')",
                    "Ask the model to 'think step-by-step' before generating final implementation code",
                    "Always validate AI-generated JSON against a Zod or Joi schema on your backend"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Author a System Prompt with Zod Validation",
                  "instruction": "Design a prompt instructing the model to output a strictly formatted JSON quiz question.",
                  "expectedOutcome": "Valid JSON parseable directly into your application data layer"
                }
              ],
              "practicalExercise": {
                "title": "Code Generation Prompt Template",
                "objective": "Build a reusable prompt template for generating Express controller endpoints with full validation",
                "instructions": [
                  "Include few-shot examples and strict error handling guidelines"
                ]
              },
              "commonMistakes": [
                "Blindly copying and pasting AI-generated code without reviewing security, dependencies, and correctness"
              ],
              "securityRelevance": "AI models can hallucinate insecure coding patterns (e.g. SQL injection or disabled CORS). Review every line.",
              "summary": "Structured prompt engineering turns AI from a novelty into a dependable engineering multiplier."
            }
          },
          {
            "id": "les-mern-spec-driven-dev",
            "slug": "31-spec-driven-development-ai",
            "title": "31 AI For Developers Lecture 3: Spec-Driven Development with AI",
            "description": "Building software with specification-driven rigor: writing technical PRDs, architecture specifications, API contracts, and guiding AI to implement testable systems.",
            "youtubeVideoId": "WYb4X8zEYmA",
            "durationMinutes": 133,
            "order": 3,
            "moduleTitle": "Module 5: AI-Powered Full-Stack Engineering (AI Agents, RAG & MCPs)",
            "objectives": [
              "Write comprehensive technical specifications (PRDs) that remove ambiguity",
              "Use OpenAPI/Swagger specifications to generate client and server boilerplate",
              "Drive AI code generation through test-driven development (TDD) specifications"
            ],
            "tags": [
              "spec-driven-dev",
              "architecture",
              "tdd",
              "openapi",
              "software-engineering"
            ],
            "skillsTaught": [
              "Specification writing",
              "API contracts",
              "Spec-driven AI coding"
            ],
            "richContent": {
              "introduction": "The most effective way to code with AI is not freestyle prompting, but spec-driven development based on clear architecture documents.",
              "keyTerminology": [
                {
                  "term": "Spec-Driven Development",
                  "definition": "Authoring technical specifications first, then using AI to implement each verified module"
                },
                {
                  "term": "OpenAPI / Swagger",
                  "definition": "Standardized machine-readable interface description for REST APIs"
                },
                {
                  "term": "Test-Driven Development (TDD)",
                  "definition": "Writing automated test assertions before implementing code"
                }
              ],
              "theorySections": [
                {
                  "title": "Architecture Over Guesswork",
                  "content": "AI succeeds when provided with precise constraints: data models, endpoint signatures, status codes, and test cases.",
                  "keyPoints": [
                    "A specification acts as the source of truth for both human engineers and AI coding assistants",
                    "Write unit tests first; then ask AI to write code that passes the test suite",
                    "Review implementations against the specification checklist before merging"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Write an API Endpoint Specification",
                  "instruction": "Draft a Markdown specification detailing endpoint URI, request payload schema, and all response codes.",
                  "expectedOutcome": "An unambiguous contract ready for implementation and automated testing"
                }
              ],
              "practicalExercise": {
                "title": "Spec-Driven Module Implementation",
                "objective": "Provide an AI assistant with an authentication spec and guide it to produce fully tested code",
                "instructions": [
                  "Run test suites to verify 100% adherence to the spec"
                ]
              },
              "commonMistakes": [
                "Asking AI to build large systems without specifying data schemas and error boundaries up front"
              ],
              "securityRelevance": "Strict specifications guarantee that security controls (authentication, rate limits) are never omitted.",
              "summary": "Spec-driven development combines human architectural judgment with AI implementation speed."
            }
          },
          {
            "id": "les-mern-rag-systems",
            "slug": "32-rag-systems-context-aware-ai",
            "title": "32 AI For Developers Lecture 4: RAG Systems & Context-Aware AI",
            "description": "Retrieval-Augmented Generation (RAG): vector embeddings, vector databases, chunking strategies, semantic search, and context grounding.",
            "youtubeVideoId": "xPByEpzqzl4",
            "durationMinutes": 132,
            "order": 4,
            "moduleTitle": "Module 5: AI-Powered Full-Stack Engineering (AI Agents, RAG & MCPs)",
            "objectives": [
              "Explain the architecture of Retrieval-Augmented Generation (RAG)",
              "Generate vector embeddings and perform cosine similarity search",
              "Store and query document vectors using vector databases (Pinecone, Chroma, or pgvector)"
            ],
            "tags": [
              "rag",
              "vector-database",
              "embeddings",
              "semantic-search",
              "ai"
            ],
            "skillsTaught": [
              "RAG pipeline design",
              "Vector embeddings",
              "Semantic retrieval"
            ],
            "richContent": {
              "introduction": "LLMs hallucinate on private data. RAG grounds AI in your real documents and database records via semantic search.",
              "keyTerminology": [
                {
                  "term": "RAG",
                  "definition": "Retrieval-Augmented Generation: retrieving relevant external knowledge to augment prompt context"
                },
                {
                  "term": "Embedding",
                  "definition": "Dense vector representation of text in high-dimensional space capturing semantic meaning"
                },
                {
                  "term": "Cosine Similarity",
                  "definition": "Metric measuring the angle between two vectors to determine semantic closeness"
                }
              ],
              "theorySections": [
                {
                  "title": "The RAG Pipeline",
                  "content": "1. Ingest documents and split into chunks. 2. Embed chunks into vector database. 3. On user query, embed query and retrieve top-K matching chunks. 4. Pass retrieved chunks to LLM as grounded context.",
                  "keyPoints": [
                    "Chunk size and overlap significantly impact retrieval quality",
                    "Always cite source documents in RAG responses to provide verifiability",
                    "Use hybrid search (keyword search + vector search) for maximum accuracy on technical keywords"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Implement an Embedding Generator",
                  "instruction": "Call an embedding model (text-embedding-3-small) on document chunks and compute similarity.",
                  "expectedOutcome": "Semantic matching based on conceptual meaning rather than exact keywords"
                }
              ],
              "practicalExercise": {
                "title": "Course Documentation Q&A Bot",
                "objective": "Build a RAG pipeline allowing users to ask questions against the CyberTube curriculum documents",
                "instructions": [
                  "Ground the model response strictly in the retrieved curriculum chunks"
                ]
              },
              "commonMistakes": [
                "Passing gigantic unchunked documents into context, exceeding window limits and degrading response quality"
              ],
              "securityRelevance": "Enforce document access control during vector retrieval so users cannot query documents they lack permission to view.",
              "summary": "RAG empowers full-stack developers to build domain-specific, accurate AI systems without fine-tuning."
            }
          },
          {
            "id": "les-mern-ai-agents-mcp",
            "slug": "33-ai-agents-mcps-skills",
            "title": "33 AI For Developers Lecture 5: AI Agents, MCPs & Skills",
            "description": "Autonomous AI agents: Model Context Protocol (MCP), tool calling, function execution, agentic loops, and building custom MCP servers.",
            "youtubeVideoId": "0JskvyS6ZJk",
            "durationMinutes": 108,
            "order": 5,
            "moduleTitle": "Module 5: AI-Powered Full-Stack Engineering (AI Agents, RAG & MCPs)",
            "objectives": [
              "Understand the Model Context Protocol (MCP) open standard for AI-to-tool connectivity",
              "Implement function/tool calling allowing LLMs to interact with databases and APIs",
              "Build and connect custom MCP servers exposing specialized tools and resources"
            ],
            "tags": [
              "ai-agents",
              "mcp",
              "tool-calling",
              "agentic-ai",
              "automation"
            ],
            "skillsTaught": [
              "MCP server development",
              "Tool calling schemas",
              "Agentic loop architecture"
            ],
            "richContent": {
              "introduction": "AI is evolving from passive text generation to active agency. Learn Model Context Protocol (MCP) and tool calling.",
              "keyTerminology": [
                {
                  "term": "MCP",
                  "definition": "Model Context Protocol: open standard protocol connecting AI models to tools, data, and environments"
                },
                {
                  "term": "Tool Calling",
                  "definition": "LLM outputting structured arguments instructing the host application to run an external function"
                },
                {
                  "term": "Agentic Loop",
                  "definition": "Iterative cycle of Thought -> Action (Tool Call) -> Observation (Tool Result) -> Answer"
                }
              ],
              "theorySections": [
                {
                  "title": "Model Context Protocol Architecture",
                  "content": "MCP standardizes how coding agents inspect databases, run commands, query APIs, and read files across tools like Cursor, Claude, and Antigravity.",
                  "keyPoints": [
                    "Tools must have precise JSON schema parameter descriptions so the model knows when and how to call them",
                    "Always validate arguments server-side before executing sensitive tool actions",
                    "Provide clear, concise tool return strings to help the model reason toward goal completion"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Create a Custom MCP Server",
                  "instruction": "Author a lightweight Node.js MCP server exposing a weather or database query tool.",
                  "expectedOutcome": "An AI assistant invoking your tool and synthesizing real-time answers"
                }
              ],
              "practicalExercise": {
                "title": "Database Tool for AI Agent",
                "objective": "Build a secure tool allowing an agent to fetch read-only user metrics from your MongoDB database",
                "instructions": [
                  "Sanitize queries to prevent write operations"
                ]
              },
              "commonMistakes": [
                "Giving autonomous agents unrestricted write or execute permissions without human confirmation"
              ],
              "securityRelevance": "Sandbox agent execution and enforce least-privilege permissions on all exposed tools.",
              "summary": "MCP and tool calling transform language models into powerful, autonomous development agents."
            }
          },
          {
            "id": "les-mern-text-to-sql",
            "slug": "34-build-learn-project-text-to-sql",
            "title": "34 AI For Developers Lecture 6: Build & Learn Project 1 Text to SQL",
            "description": "Full capstone project: building an end-to-end Text-to-SQL system. Natural language querying, schema injection, query validation, and interactive execution.",
            "youtubeVideoId": "HJgNlw0tFl4",
            "durationMinutes": 105,
            "order": 6,
            "moduleTitle": "Module 5: AI-Powered Full-Stack Engineering (AI Agents, RAG & MCPs)",
            "objectives": [
              "Build a production-grade Text-to-SQL application translating natural language into database queries",
              "Inject database schema DDL into LLM context safely with few-shot query examples",
              "Validate and sandbox generated queries against SQL injection and destructive statements"
            ],
            "tags": [
              "text-to-sql",
              "capstone",
              "ai-project",
              "sql",
              "full-stack"
            ],
            "skillsTaught": [
              "Natural language querying",
              "Query validation",
              "AI-database integration"
            ],
            "richContent": {
              "introduction": "Synthesize your full-stack and AI knowledge by building a real-world Text-to-SQL data assistant.",
              "keyTerminology": [
                {
                  "term": "Text-to-SQL",
                  "definition": "Converting natural language user questions into syntactically valid SQL queries"
                },
                {
                  "term": "Schema Grounding",
                  "definition": "Providing table structures, columns, and foreign keys in the prompt so the LLM queries valid fields"
                },
                {
                  "term": "Read-Only Replica",
                  "definition": "Database instance restricted strictly to SELECT operations, preventing data loss"
                }
              ],
              "theorySections": [
                {
                  "title": "Defensive Text-to-SQL Architecture",
                  "content": "Never execute raw AI-generated SQL directly against a primary database. Run queries against a read-only replica with query timeouts and strict AST validation.",
                  "keyPoints": [
                    "Use SQL parsers to reject DROP, ALTER, INSERT, UPDATE, or DELETE statements before execution",
                    "Ground the model with accurate schema definitions and table relationships",
                    "Present generated SQL and execution plans transparently to the user before displaying results"
                  ]
                }
              ],
              "stepByStepProcedures": [
                {
                  "step": 1,
                  "title": "Build the Text-to-SQL Pipeline",
                  "instruction": "Accept natural language input, format prompt with schema DDL, generate SQL, validate AST, and execute on database.",
                  "expectedOutcome": "Clean tabular results returned for natural language questions"
                }
              ],
              "practicalExercise": {
                "title": "Complete AI Data Assistant",
                "objective": "Build a React dashboard displaying a query input, generated SQL badge, execution time, and data table",
                "instructions": [
                  "Handle syntax errors and invalid queries with user-friendly remediation"
                ]
              },
              "commonMistakes": [
                "Executing AI-generated SQL without verifying that write and drop operations are blocked"
              ],
              "securityRelevance": "Always execute AI queries with read-only database credentials and strict query timeouts.",
              "summary": "Congratulations! You have mastered full-stack MERN architecture and cutting-edge AI engineering."
            }
          }
        ],
        "quiz": {
          "title": "Module 5 Quiz: AI-Powered Full-Stack Engineering",
          "passingScorePercent": 70,
          "questions": [
            {
              "question": "What is the primary function of the Model Context Protocol (MCP) in modern AI engineering?",
              "options": [
                "It is an alternative programming language to JavaScript",
                "It is an open standard protocol that connects AI models to external tools, databases, and environments",
                "It compresses image files for faster web loading",
                "It replaces the need for backend servers in MERN apps"
              ],
              "correctAnswerIndex": 1,
              "explanation": "MCP standardizes how AI agents discover and execute tools, read resources, and interact with external systems.",
              "difficulty": "beginner"
            },
            {
              "question": "In a Retrieval-Augmented Generation (RAG) system, why are document embeddings stored in a vector database?",
              "options": [
                "To enable semantic similarity search based on conceptual meaning rather than exact keyword matches",
                "Because vector databases compress text by 99%",
                "To automatically translate documents into foreign languages",
                "To compile JavaScript code faster"
              ],
              "correctAnswerIndex": 0,
              "explanation": "Vector databases index high-dimensional embeddings, allowing fast nearest-neighbor search to retrieve semantically relevant context.",
              "difficulty": "beginner"
            },
            {
              "question": "When building an AI-powered Text-to-SQL application, what is the most critical security control before executing generated queries?",
              "options": [
                "Increasing the LLM temperature parameter",
                "Validating that the query is strictly a read-only SELECT statement and executing on a read-only database user/connection",
                "Disabling CORS on the backend API",
                "Rendering the raw SQL query in client-side HTML"
              ],
              "correctAnswerIndex": 1,
              "explanation": "AI queries must be verified as strictly read-only and run with least-privilege credentials to prevent accidental or malicious data modification.",
              "difficulty": "beginner"
            }
          ]
        }
      }
    ]
  },
  {
    id: 'e7b9e001-4000-4000-a000-000000000001',
    slug: 'networking-for-hackers-2027',
    title: 'Networking for Hackers 2027',
    shortDescription: 'Master computer networking fundamentals, TCP/IP, OSI layers, hardware topologies, and defensive packet mechanics.',
    description: 'A comprehensive foundational networking series by Bitten Tech designed specifically for cybersecurity professionals and ethical hackers. Learn how data travels across the Internet, analyze routers and switches, understand bandwidth delays, and master packet encapsulation across the OSI and TCP/IP protocol stacks.',
    domains: ['network-security', 'fundamentals'],
    tags: ['networking', 'tcp-ip', 'osi-model', 'packet-analysis', 'hardware-topologies', 'bitten-tech'],
    difficulty: 'beginner',
    thumbnailUrl: 'https://i.ytimg.com/vi/4hLax8DmQHY/maxresdefault.jpg',
    estimatedDuration: '8 hours 15 mins',
    totalDurationMinutes: 495,
    instructor: {
      name: 'Bitten Tech',
      title: 'Cybersecurity & Networking Educator',
      organization: 'Bitten Tech',
    },
    prerequisites: [
      'Curiosity about computer networking and cybersecurity fundamentals',
      'Basic familiarity with operating systems and web browsers',
    ],
    learningObjectives: [
      'Understand how client devices exchange data across the Internet and local networks',
      'Analyze network hardware devices, topologies, and firewall boundary rules',
      'Understand latency, throughput, bandwidth constraints, and transit delays',
      'Deconstruct the 7-layer OSI model and TCP/IP protocol suite with packet encapsulation',
      'Master Layer 2 Ethernet frames, MAC addresses, and switches with Wireshark analysis',
      'Understand IPv4 addressing, ARP resolution mechanics, and ARP poisoning attacks',
      'Perform subnetting calculations, CIDR notation analysis, and network segmentation',
    ],
    featured: false,
    track: 'cybersecurity',
    sourcePlatform: 'youtube',
    sourcePlaylistId: 'PLITTDLtD8szA',
    sourcePlaylistUrl: 'https://www.youtube.com/playlist?list=PLITTDLtD8szA',
    modules: [
      {
        id: 'e7b9e002-4000-4000-a000-000000000001',
        title: 'Networking Fundamentals — Playlist Sequence',
        description: 'Core concepts of modern computer networks, physical and logical topologies, and protocol stack dissection.',
        order: 1,
        lessons: [
          {
            id: 'e7b9e003-4000-4000-a000-000000000001',
            slug: '01-networking-for-hackers-introduction',
            title: 'Networking for Hackers #1 | Introduction',
            description: 'Foundational overview establishing why networking mastery is the single most critical prerequisite for offensive security and ethical hacking.',
            youtubeVideoId: '4hLax8DmQHY',
            durationMinutes: 36,
            order: 1,
            moduleTitle: 'Networking Fundamentals — Playlist Sequence',
            objectives: [
              'Understand the hacker mindset regarding networking',
              'Learn the course structure and core learning objectives',
            ],
            tags: ['networking', 'introduction', 'basics', 'cybersecurity'],
            skillsTaught: ['Networking fundamentals', 'Security mindset'],
          },
          {
            id: 'e7b9e003-4000-4000-a000-000000000002',
            slug: '02-history-of-your-internet',
            title: 'Networking for Hackers #2 | History of your Internet',
            description: 'Explore the evolutionary history of ARPANET, decentralization, protocol standards, and how the modern Internet backbone operates.',
            youtubeVideoId: '4-Ea5EI6LrM',
            durationMinutes: 58,
            order: 2,
            moduleTitle: 'Networking Fundamentals — Playlist Sequence',
            objectives: [
              'Explore ARPANET and early networking standards',
              'Understand DNS evolution and IP address allocation history',
            ],
            tags: ['internet-history', 'arpanet', 'protocols', 'standards'],
            skillsTaught: ['Internet architecture history', 'Protocol evolution'],
          },
          {
            id: 'e7b9e003-4000-4000-a000-000000000003',
            slug: '03-how-data-travels-and-who-can-see-it',
            title: 'Networking for Hackers #3 | How Data Travels & Who Can See It',
            description: 'Step-by-step trace of packets traversing routers, ISPs, and submarine cables, highlighting eavesdropping risks and data visibility.',
            youtubeVideoId: 'A31izTClLqs',
            durationMinutes: 54,
            order: 3,
            moduleTitle: 'Networking Fundamentals — Playlist Sequence',
            objectives: [
              'Trace packet transit paths across intermediate routers',
              'Analyze intermediate visibility and ISP telemetry points',
            ],
            tags: ['packet-routing', 'isp', 'surveillance', 'data-transit'],
            skillsTaught: ['Packet transit analysis', 'Network eavesdropping threat modeling'],
          },
          {
            id: 'e7b9e003-4000-4000-a000-000000000004',
            slug: '04-devices-topologies-security-rules',
            title: 'Networking for Hackers #4 | Devices, Topologies & Security Rules',
            description: 'Deconstruct network hardware (hubs, switches, routers, firewalls), physical vs logical topologies, and network segmentation rules.',
            youtubeVideoId: 'Yb48nfFBT0I',
            durationMinutes: 68,
            order: 4,
            moduleTitle: 'Networking Fundamentals — Playlist Sequence',
            objectives: [
              'Compare Layer 2 switching vs Layer 3 routing',
              'Understand Star, Mesh, and Bus topologies with security implications',
            ],
            tags: ['hardware', 'switches', 'routers', 'topologies', 'firewalls'],
            skillsTaught: ['Network hardware classification', 'Topology mapping'],
          },
          {
            id: 'e7b9e003-4000-4000-a000-000000000005',
            slug: '05-bandwidth-speed-and-delays',
            title: 'Networking for Hackers #5 | Bandwidth, Speed & Delays',
            description: 'Master the physics and math of networking: bandwidth, throughput, propagation delay, queuing latency, and packet loss bottlenecks.',
            youtubeVideoId: 'e6tMigLffZc',
            durationMinutes: 56,
            order: 5,
            moduleTitle: 'Networking Fundamentals — Playlist Sequence',
            objectives: [
              'Distinguish bandwidth capacity from real throughput',
              'Calculate latency, round-trip time (RTT), and jitter',
            ],
            tags: ['bandwidth', 'latency', 'jitter', 'throughput', 'metrics'],
            skillsTaught: ['Network latency diagnosis', 'Throughput calculation'],
          },
          {
            id: 'e7b9e003-4000-4000-a000-000000000006',
            slug: '06-tcp-ip-osi-and-encapsulation',
            title: 'Networking for Hackers #6 | TCP/IP, OSI & Encapsulation',
            description: 'Deep dive into the 7-Layer OSI model vs 4-Layer TCP/IP stack, payload encapsulation, protocol headers, and packet decapsulation mechanics.',
            youtubeVideoId: 'J_fUOMgl4CE',
            durationMinutes: 46,
            order: 6,
            moduleTitle: 'Networking Fundamentals — Playlist Sequence',
            objectives: [
              'Deconstruct OSI layer boundaries from Physical to Application',
              'Trace encapsulation of data into segments, packets, and frames',
            ],
            tags: ['osi-model', 'tcp-ip', 'encapsulation', 'headers', 'protocols'],
            skillsTaught: ['OSI model dissection', 'Packet encapsulation tracing'],
          },
          {
            id: 'e7b9e003-4000-4000-a000-000000000007',
            slug: '07-mac-addresses-ethernet-and-switches',
            title: 'Networking for Hackers #7 | MAC Addresses, Ethernet & Switches (Wireshark Lab)',
            description: 'Examine Layer 2 data link addressing, Ethernet frame structures, CAM tables, switch forwarding, and Wireshark frame dissection.',
            youtubeVideoId: 'BkB4Vtvwyc0',
            durationMinutes: 71,
            order: 7,
            moduleTitle: 'Networking Fundamentals — Playlist Sequence',
            objectives: [
              'Analyze Ethernet II frame headers, preamble, and CRC/FCS validation',
              'Understand MAC table learning and Layer 2 broadcast domains',
              'Perform live Ethernet frame inspection using Wireshark',
            ],
            tags: ['mac-addresses', 'ethernet', 'switches', 'wireshark', 'layer-2'],
            skillsTaught: ['Layer 2 frame dissection', 'Switch CAM table analysis', 'Wireshark Ethernet capture'],
          },
          {
            id: 'e7b9e003-4000-4000-a000-000000000008',
            slug: '08-ip-addresses-arp-and-arp-poisoning',
            title: 'Networking for Hackers #8 | IP Addresses, ARP & ARP Poisoning',
            description: 'Understand IPv4 addressing, Address Resolution Protocol (ARP) mechanics, gratuitous ARP, and hands-on ARP cache poisoning attacks.',
            youtubeVideoId: 'aQCqgKIEpHA',
            durationMinutes: 46,
            order: 8,
            moduleTitle: 'Networking Fundamentals — Playlist Sequence',
            objectives: [
              'Understand logical IP to physical MAC mapping via ARP request/reply cycles',
              'Analyze ARP packet headers and gratuitous ARP broadcasts',
              'Deconstruct ARP cache poisoning and Man-in-the-Middle (MitM) mechanics',
            ],
            tags: ['ip-addresses', 'arp', 'arp-poisoning', 'mitm', 'layer-3'],
            skillsTaught: ['ARP protocol analysis', 'ARP poisoning detection', 'MitM attack defense'],
          },
          {
            id: 'e7b9e003-4000-4000-a000-000000000009',
            slug: '09-subnetting-cidr-and-network-segmentation',
            title: 'Networking for Hackers #9 | Subnetting, CIDR & Network Segmentation',
            description: 'Master binary subnetting, CIDR prefix calculations, subnet masks, network vs host bits, and offensive network segmentation analysis.',
            youtubeVideoId: '7ethLpR3mMY',
            durationMinutes: 61,
            order: 9,
            moduleTitle: 'Networking Fundamentals — Playlist Sequence',
            objectives: [
              'Perform decimal-to-binary conversions and bitwise ANDing for network IDs',
              'Calculate usable host ranges, broadcast addresses, and CIDR prefix masks',
              'Design network segmentation architectures and identify pivoting paths',
            ],
            tags: ['subnetting', 'cidr', 'network-segmentation', 'ipv4', 'binary-math'],
            skillsTaught: ['Subnet calculation', 'CIDR mask analysis', 'Network segmentation security'],
          },
        ],
      },
    ],
  },
  {
    id: 'd6a8e001-5000-4000-a000-000000000001',
    slug: 'wireshark-and-ethical-hacking',
    title: 'Wireshark and Ethical Hacking Course',
    shortDescription: 'Master Wireshark packet capture, display filters, protocol analysis, and ethical hacking workflows.',
    description: 'A complete, hands-on Wireshark and ethical hacking masterclass curated by David Bombal. Dissect live traffic, build custom display filters, uncover credentials in cleartext legacy protocols (Telnet, FTP, HTTP), inspect VoIP call streams, run tshark/termshark in the console, and investigate real-world network attacks.',
    domains: ['network-security', 'fundamentals', 'dfir'],
    tags: ['wireshark', 'packet-analysis', 'ethical-hacking', 'display-filters', 'tshark', 'network-forensics', 'david-bombal'],
    difficulty: 'beginner',
    thumbnailUrl: 'https://i.ytimg.com/vi/QXfaGOMT7MY/maxresdefault.jpg',
    estimatedDuration: '5 hours 5 mins',
    totalDurationMinutes: 305,
    instructor: {
      name: 'David Bombal',
      title: 'Network Engineer & Cybersecurity Educator',
      organization: 'David Bombal',
    },
    prerequisites: ['Curiosity about computer networking, protocols, and ethical hacking', 'Basic familiarity with operating systems (Windows, Linux, or macOS)'],
    learningObjectives: ['Capture and dissect live network traffic using Wireshark and command-line tools', 'Construct advanced display filters to isolate targeted security incidents and protocol anomalies', 'Identify plaintext credentials and security risks in legacy protocols like Telnet, FTP, and HTTP', 'Capture, analyze, and replay VoIP phone calls and investigate CCTV camera streams', 'Execute headless network captures and packet inspections with tshark and termshark'],
    track: 'cybersecurity',
    sourcePlatform: 'youtube',
    sourcePlaylistId: 'PLhfrWIlLOoKMBv50Y8NH6Dtfge_MrHYnl',
    sourcePlaylistUrl: 'https://www.youtube.com/playlist?list=PLhfrWIlLOoKMBv50Y8NH6Dtfge_MrHYnl',
    modules: [
      {
        id: 'd6a8e002-5000-4000-a000-000000000001',
        title: 'Module 1: Wireshark Foundations & Getting Started',
        description: 'Get started with Wireshark packet capture foundations, interface selection, live captures, and ethical hacking workflows.',
        order: 1,
        lessons: [
          {
            id: 'd6a8e003-5000-4000-a000-000000000001',
            slug: '01-free-wireshark-ethical-hacking-video-0',
            title: 'Free Wireshark and Ethical Hacking Course: Video #0',
            description: 'Welcome to David Bombal\'s Wireshark and Ethical Hacking Course (Video #0). Overview of course objectives, lab environment recommendations, and ethical hacking scope.',
            youtubeVideoId: 'QXfaGOMT7MY',
            durationMinutes: 12,
            order: 1,
            moduleTitle: 'Module 1: Wireshark Foundations & Getting Started',
            objectives: ['Analyze network traffic for Free Wireshark and Ethical Hacking Course: Video #0', 'Practice Wireshark inspection workflows in an isolated test lab', 'Understand protocol mechanics and defense strategies'],
            tags: ['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
            skillsTaught: ['Wireshark Inspection', 'Network Forensics'],
          },
          {
            id: 'd6a8e003-5000-4000-a000-000000000002',
            slug: '02-free-wireshark-ethical-hacking-video-1',
            title: 'Free Wireshark and Ethical Hacking Course: Video #1',
            description: 'Lesson 2 of David Bombal\'s Wireshark and Ethical Hacking course: Free Wireshark and Ethical Hacking Course: Video #1. Dissect packet captures and analyze network behavior.',
            youtubeVideoId: '9CY42I04MFw',
            durationMinutes: 17,
            order: 2,
            moduleTitle: 'Module 1: Wireshark Foundations & Getting Started',
            objectives: ['Analyze network traffic for Free Wireshark and Ethical Hacking Course: Video #1', 'Practice Wireshark inspection workflows in an isolated test lab', 'Understand protocol mechanics and defense strategies'],
            tags: ['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
            skillsTaught: ['Wireshark Inspection', 'Network Forensics'],
          },
          {
            id: 'd6a8e003-5000-4000-a000-000000000003',
            slug: '03-free-wireshark-ethical-hacking-video-2',
            title: 'Free Wireshark and Ethical Hacking Course: Video #2',
            description: 'Lesson 3 of David Bombal\'s Wireshark and Ethical Hacking course: Free Wireshark and Ethical Hacking Course: Video #2. Dissect packet captures and analyze network behavior.',
            youtubeVideoId: 'qfWSToryDos',
            durationMinutes: 10,
            order: 3,
            moduleTitle: 'Module 1: Wireshark Foundations & Getting Started',
            objectives: ['Analyze network traffic for Free Wireshark and Ethical Hacking Course: Video #2', 'Practice Wireshark inspection workflows in an isolated test lab', 'Understand protocol mechanics and defense strategies'],
            tags: ['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
            skillsTaught: ['Wireshark Inspection', 'Network Forensics'],
          },
          {
            id: 'd6a8e003-5000-4000-a000-000000000004',
            slug: '04-free-wireshark-ethical-hacking-video-3',
            title: 'Free Wireshark and Ethical Hacking Course: Video #3',
            description: 'Lesson 4 of David Bombal\'s Wireshark and Ethical Hacking course: Free Wireshark and Ethical Hacking Course: Video #3. Dissect packet captures and analyze network behavior.',
            youtubeVideoId: 'IdEFDkGtcQg',
            durationMinutes: 7,
            order: 4,
            moduleTitle: 'Module 1: Wireshark Foundations & Getting Started',
            objectives: ['Analyze network traffic for Free Wireshark and Ethical Hacking Course: Video #3', 'Practice Wireshark inspection workflows in an isolated test lab', 'Understand protocol mechanics and defense strategies'],
            tags: ['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
            skillsTaught: ['Wireshark Inspection', 'Network Forensics'],
          },
        ],
      },
      {
        id: 'd6a8e002-5000-4000-a000-000000000002',
        title: 'Module 2: Display Filters & Network Protocol Security',
        description: 'Master Wireshark display filter syntax and dissect unencrypted legacy protocols including Telnet, TFTP, FTP, and HTTP.',
        order: 2,
        lessons: [
          {
            id: 'd6a8e003-5000-4000-a000-000000000005',
            slug: '05-wireshark-display-filters',
            title: 'Wireshark Display Filters | Free Wireshark and Ethical Hacking Course: Video #4',
            description: 'Master Wireshark display filters to isolate traffic quickly. Learn filter expressions, logical operators, and protocol-specific queries.',
            youtubeVideoId: 'WdBBYosG-YI',
            durationMinutes: 15,
            order: 5,
            moduleTitle: 'Module 2: Display Filters & Network Protocol Security',
            objectives: ['Analyze network traffic for Wireshark Display Filters | Free Wireshark and Ethical Hacking Course: Video #4', 'Practice Wireshark inspection workflows in an isolated test lab', 'Understand protocol mechanics and defense strategies'],
            tags: ['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
            skillsTaught: ['Wireshark Inspection', 'Network Forensics'],
          },
          {
            id: 'd6a8e003-5000-4000-a000-000000000006',
            slug: '06-too-much-wireshark',
            title: 'Too much Wireshark?! | Free Wireshark and Ethical Hacking Course: Video #5',
            description: 'Lesson 6 of David Bombal\'s Wireshark and Ethical Hacking course: Too much Wireshark?! | Free Wireshark and Ethical Hacking Course: Video #5. Dissect packet captures and analyze network behavior.',
            youtubeVideoId: 'tM2aUpll1EQ',
            durationMinutes: 6,
            order: 6,
            moduleTitle: 'Module 2: Display Filters & Network Protocol Security',
            objectives: ['Analyze network traffic for Too much Wireshark?! | Free Wireshark and Ethical Hacking Course: Video #5', 'Practice Wireshark inspection workflows in an isolated test lab', 'Understand protocol mechanics and defense strategies'],
            tags: ['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
            skillsTaught: ['Wireshark Inspection', 'Network Forensics'],
          },
          {
            id: 'd6a8e003-5000-4000-a000-000000000007',
            slug: '07-never-use-telnet',
            title: 'Never use Telnet',
            description: 'Demonstration of why Telnet is insecure. Observe cleartext username and password transmission in Wireshark packet captures.',
            youtubeVideoId: 'nGEKnYUEPcg',
            durationMinutes: 9,
            order: 7,
            moduleTitle: 'Module 2: Display Filters & Network Protocol Security',
            objectives: ['Analyze network traffic for Never use Telnet', 'Practice Wireshark inspection workflows in an isolated test lab', 'Understand protocol mechanics and defense strategies'],
            tags: ['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
            skillsTaught: ['Wireshark Inspection', 'Network Forensics'],
          },
          {
            id: 'd6a8e003-5000-4000-a000-000000000008',
            slug: '08-never-use-tftp-or-ftp',
            title: 'Never use TFTP or FTP!',
            description: 'Inspect TFTP and FTP traffic in Wireshark. Understand plaintext file transfer mechanics and the security imperative to use SFTP or SCP.',
            youtubeVideoId: 'PoaOgBmWJQY',
            durationMinutes: 6,
            order: 8,
            moduleTitle: 'Module 2: Display Filters & Network Protocol Security',
            objectives: ['Analyze network traffic for Never use TFTP or FTP!', 'Practice Wireshark inspection workflows in an isolated test lab', 'Understand protocol mechanics and defense strategies'],
            tags: ['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
            skillsTaught: ['Wireshark Inspection', 'Network Forensics'],
          },
          {
            id: 'd6a8e003-5000-4000-a000-000000000009',
            slug: '09-why-are-you-still-using-http',
            title: 'Why are you still using HTTP?',
            description: 'Why are you still using HTTP? Analyze cleartext web traffic, credentials, and cookies in Wireshark to understand the need for HTTPS/TLS.',
            youtubeVideoId: 'LfZNhf2Yc8k',
            durationMinutes: 6,
            order: 9,
            moduleTitle: 'Module 2: Display Filters & Network Protocol Security',
            objectives: ['Analyze network traffic for Why are you still using HTTP?', 'Practice Wireshark inspection workflows in an isolated test lab', 'Understand protocol mechanics and defense strategies'],
            tags: ['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
            skillsTaught: ['Wireshark Inspection', 'Network Forensics'],
          },
        ],
      },
      {
        id: 'd6a8e002-5000-4000-a000-000000000003',
        title: 'Module 3: Capture Workflows, Profiles & Command-Line Tools',
        description: 'Capture VoIP audio, create custom Wireshark inspection profiles, install on Linux, and analyze PCAPs headlessly with tshark and termshark.',
        order: 3,
        lessons: [
          {
            id: 'd6a8e003-5000-4000-a000-000000000010',
            slug: '10-wireshark-voip-call-capture-and-replay',
            title: 'Wireshark VoIP call capture and replay',
            description: 'Capture VoIP SIP signaling and RTP audio streams in Wireshark, analyze call quality, and replay telephone conversations from packet data.',
            youtubeVideoId: 'uZI9ZnKRudg',
            durationMinutes: 23,
            order: 10,
            moduleTitle: 'Module 3: Capture Workflows, Profiles & Command-Line Tools',
            objectives: ['Analyze network traffic for Wireshark VoIP call capture and replay', 'Practice Wireshark inspection workflows in an isolated test lab', 'Understand protocol mechanics and defense strategies'],
            tags: ['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
            skillsTaught: ['Wireshark Inspection', 'Network Forensics'],
          },
          {
            id: 'd6a8e003-5000-4000-a000-000000000011',
            slug: '11-wireshark-tutorial-installation-password-sniffing',
            title: 'Wireshark Tutorial - Installation and Password sniffing',
            description: 'Step-by-step Wireshark installation walkthrough and credential interception demonstration in an authorized lab environment.',
            youtubeVideoId: '4_7A8Ikp5Cc',
            durationMinutes: 11,
            order: 11,
            moduleTitle: 'Module 3: Capture Workflows, Profiles & Command-Line Tools',
            objectives: ['Analyze network traffic for Wireshark Tutorial - Installation and Password sniffing', 'Practice Wireshark inspection workflows in an isolated test lab', 'Understand protocol mechanics and defense strategies'],
            tags: ['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
            skillsTaught: ['Wireshark Inspection', 'Network Forensics'],
          },
          {
            id: 'd6a8e003-5000-4000-a000-000000000012',
            slug: '12-wireshark-install-ubuntu-20-04',
            title: 'Wireshark Install Ubuntu 20.04',
            description: 'Install and configure Wireshark on Ubuntu Linux 20.04 with non-root packet capture privileges using dumpcap.',
            youtubeVideoId: 'rtm_Bofv4-8',
            durationMinutes: 10,
            order: 12,
            moduleTitle: 'Module 3: Capture Workflows, Profiles & Command-Line Tools',
            objectives: ['Analyze network traffic for Wireshark Install Ubuntu 20.04', 'Practice Wireshark inspection workflows in an isolated test lab', 'Understand protocol mechanics and defense strategies'],
            tags: ['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
            skillsTaught: ['Wireshark Inspection', 'Network Forensics'],
          },
          {
            id: 'd6a8e003-5000-4000-a000-000000000013',
            slug: '13-wireshark-tutorial-profiles-password-captures',
            title: 'Wireshark Tutorial - Profiles and Password captures',
            description: 'Create customized Wireshark profiles, color rules, and layout preferences tailored for security analysis and password audits.',
            youtubeVideoId: 'zRk5dymfNsk',
            durationMinutes: 9,
            order: 13,
            moduleTitle: 'Module 3: Capture Workflows, Profiles & Command-Line Tools',
            objectives: ['Analyze network traffic for Wireshark Tutorial - Profiles and Password captures', 'Practice Wireshark inspection workflows in an isolated test lab', 'Understand protocol mechanics and defense strategies'],
            tags: ['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
            skillsTaught: ['Wireshark Inspection', 'Network Forensics'],
          },
          {
            id: 'd6a8e003-5000-4000-a000-000000000014',
            slug: '14-tshark-termshark-console-captures',
            title: 'tshark and Termshark tutorial: Capture and view wireshark captures in a console',
            description: 'Use tshark and termshark terminal tools to capture, filter, and inspect network traffic directly in a console without a GUI.',
            youtubeVideoId: 'HoYgPlmOZgo',
            durationMinutes: 13,
            order: 14,
            moduleTitle: 'Module 3: Capture Workflows, Profiles & Command-Line Tools',
            objectives: ['Analyze network traffic for tshark and Termshark tutorial: Capture and view wireshark captures in a console', 'Practice Wireshark inspection workflows in an isolated test lab', 'Understand protocol mechanics and defense strategies'],
            tags: ['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
            skillsTaught: ['Wireshark Inspection', 'Network Forensics'],
          },
        ],
      },
      {
        id: 'd6a8e002-5000-4000-a000-000000000004',
        title: 'Module 4: Hands-on Practice & Real-World Security Case Studies',
        description: 'Apply packet analysis skills to CCNA challenges, keylogger traffic, TCP handshakes/flags, VoIP MITM replays, and CCTV camera security.',
        order: 4,
        lessons: [
          {
            id: 'd6a8e003-5000-4000-a000-000000000015',
            slug: '15-ccna-quiz-packet-analysis',
            title: 'Can you answer this CCNA Quiz?',
            description: 'Test your packet analysis and networking knowledge with a CCNA-focused quiz on IP addressing, routing, and protocol headers.',
            youtubeVideoId: 'D9FBjUq2J74',
            durationMinutes: 10,
            order: 15,
            moduleTitle: 'Module 4: Hands-on Practice & Real-World Security Case Studies',
            objectives: ['Analyze network traffic for Can you answer this CCNA Quiz?', 'Practice Wireshark inspection workflows in an isolated test lab', 'Understand protocol mechanics and defense strategies'],
            tags: ['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
            skillsTaught: ['Wireshark Inspection', 'Network Forensics'],
          },
          {
            id: 'd6a8e003-5000-4000-a000-000000000016',
            slug: '16-learn-capture-repeat',
            title: 'Learn. Capture. Repeat.',
            description: 'Actionable strategies for effective packet analysis practice: Learn. Capture. Repeat. Build muscle memory analyzing real-world PCAPs.',
            youtubeVideoId: '-WefgSx_eKY',
            durationMinutes: 17,
            order: 16,
            moduleTitle: 'Module 4: Hands-on Practice & Real-World Security Case Studies',
            objectives: ['Analyze network traffic for Learn. Capture. Repeat.', 'Practice Wireshark inspection workflows in an isolated test lab', 'Understand protocol mechanics and defense strategies'],
            tags: ['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
            skillsTaught: ['Wireshark Inspection', 'Network Forensics'],
          },
          {
            id: 'd6a8e003-5000-4000-a000-000000000017',
            slug: '17-keylogger-vs-wireshark',
            title: 'Keylogger vs Wireshark',
            description: 'Investigate keylogger data exfiltration in Wireshark. Trace unauthorized keystroke transmissions across the network.',
            youtubeVideoId: 'keAHKO2Fc4I',
            durationMinutes: 33,
            order: 17,
            moduleTitle: 'Module 4: Hands-on Practice & Real-World Security Case Studies',
            objectives: ['Analyze network traffic for Keylogger vs Wireshark', 'Practice Wireshark inspection workflows in an isolated test lab', 'Understand protocol mechanics and defense strategies'],
            tags: ['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
            skillsTaught: ['Wireshark Inspection', 'Network Forensics'],
          },
          {
            id: 'd6a8e003-5000-4000-a000-000000000018',
            slug: '18-how-tcp-really-works',
            title: 'How TCP really works: Top 3 things you need to know!',
            description: 'Deep dive into how TCP really works: three-way handshakes, sequence/acknowledgement numbers, window sizing, and flag analysis.',
            youtubeVideoId: 'Auwn3RWapRE',
            durationMinutes: 30,
            order: 18,
            moduleTitle: 'Module 4: Hands-on Practice & Real-World Security Case Studies',
            objectives: ['Analyze network traffic for How TCP really works: Top 3 things you need to know!', 'Practice Wireshark inspection workflows in an isolated test lab', 'Understand protocol mechanics and defense strategies'],
            tags: ['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
            skillsTaught: ['Wireshark Inspection', 'Network Forensics'],
          },
          {
            id: 'd6a8e003-5000-4000-a000-000000000019',
            slug: '19-capture-replay-phone-calls-kali-wireshark',
            title: 'Capture and Replay Phone Calls with Kali Linux and Wireshark (MITM / VoIP replay)',
            description: 'VoIP man-in-the-middle (MITM) and call replay demonstration using Kali Linux, ARP spoofing, and Wireshark in an isolated test lab.',
            youtubeVideoId: 'LoFoV3T17T0',
            durationMinutes: 18,
            order: 19,
            moduleTitle: 'Module 4: Hands-on Practice & Real-World Security Case Studies',
            objectives: ['Analyze network traffic for Capture and Replay Phone Calls with Kali Linux and Wireshark (MITM / VoIP replay)', 'Practice Wireshark inspection workflows in an isolated test lab', 'Understand protocol mechanics and defense strategies'],
            tags: ['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
            skillsTaught: ['Wireshark Inspection', 'Network Forensics'],
          },
          {
            id: 'd6a8e003-5000-4000-a000-000000000020',
            slug: '20-hacking-ip-cameras-cctv-demos',
            title: 'Hacking IP Cameras (CCTV) with Demos and Real World Examples',
            description: 'Analyze IP camera (CCTV) security risks, default credentials, RTSP streaming vulnerabilities, and network hardening strategies.',
            youtubeVideoId: 'yMAWcHP6yn8',
            durationMinutes: 43,
            order: 20,
            moduleTitle: 'Module 4: Hands-on Practice & Real-World Security Case Studies',
            objectives: ['Analyze network traffic for Hacking IP Cameras (CCTV) with Demos and Real World Examples', 'Practice Wireshark inspection workflows in an isolated test lab', 'Understand protocol mechanics and defense strategies'],
            tags: ['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
            skillsTaught: ['Wireshark Inspection', 'Network Forensics'],
          },
        ],
      },
      {
        id: 'd6a8e002-5000-4000-a000-000000000005',
        title: 'Module 5: New Playlist Additions (Planned)',
        description: 'Automatically synchronized lessons added to David Bombal\'s Wireshark playlist over time.',
        order: 5,
        lessons: [],
      },
    ],
  },
  {
    id: 'course-ccna-200-301-networkchuck',
    slug: 'free-ccna-200-301-networkchuck',
    title: 'FREE CCNA 200-301 Complete Course (NetworkChuck 2025)',
    shortDescription: 'Comprehensive, high-energy CCNA 200-301 preparation covering networking models, architecture, cabling, IP addressing, and subnetting.',
    description: 'Master Cisco Certified Network Associate (CCNA 200-301) fundamentals with NetworkChuck. This complete structured video course covers computer networking from the ground up: switches, routers, the OSI and TCP/IP models, physical cabling (Ethernet, PoE, fiber), network topology design, data centers, WANs, network security basics, and extensive hands-on IPv4 subnetting mastery.',
    domains: ['network-security', 'fundamentals'],
    tags: ['ccna', 'cisco', 'networking', 'subnetting', 'tcp-ip', 'osi-model', 'networkchuck', 'routing-switching'],
    difficulty: 'beginner',
    thumbnailUrl: 'https://i.ytimg.com/vi/S7MNX_UD7vY/hqdefault.jpg',
    estimatedDuration: '7 hours 27 mins',
    totalDurationMinutes: 448,
    instructor: {
      name: 'NetworkChuck',
      title: 'Network Engineer & Educator',
      organization: 'NetworkChuck',
    },
    prerequisites: [
      'Basic computer literacy and enthusiasm to learn networking',
      'No prior networking or Cisco experience required',
    ],
    learningObjectives: [
      'Master the roles and operations of routers, switches, and network endpoint devices',
      'Compare TCP/IP and OSI layer models with real-world protocol packet flows',
      'Understand physical layer infrastructure including Ethernet, PoE, and fiber optics',
      'Confidently calculate IPv4 subnets, network masks, and IP allocations',
    ],
    featured: false,
    track: 'cybersecurity',
    sourcePlatform: 'youtube',
    sourcePlaylistId: 'PLIhvC56v63IJVXv0GJcl9vO5Z6znCVb1P',
    sourcePlaylistUrl: 'https://www.youtube.com/playlist?list=PLIhvC56v63IJVXv0GJcl9vO5Z6znCVb1P',
    modules: [
      {
        id: 'mod-ccna-nc-foundations',
        title: 'Module 1: Network Fundamentals & Models',
        description: 'Understand what a network is, the role of switches and routers, and how the TCP/IP and OSI model layers operate.',
        order: 1,
        lessons: [
          {
            id: 'les-ccna-nc-S7MNX_UD7vY',
            slug: '01-S7MNX_UD7vY',
            title: 'FREE CCNA // What is a Network? // Day 0',
            description: 'FREE CCNA // What is a Network? // Day 0. CCNA 200-301 training with NetworkChuck.',
            youtubeVideoId: 'S7MNX_UD7vY',
            durationMinutes: 10,
            order: 1,
            moduleTitle: 'Module 1: Network Fundamentals & Models',
            objectives: [
              'Understand key concepts presented in FREE CCNA // What is a Network? // Day 0',
              'Review practical CCNA 200-301 configuration and theory principles',
              'Apply networking foundations to security and architecture scenarios',
            ],
            tags: ['ccna', 'networking', 'networkchuck', 'cisco'],
            skillsTaught: ['CCNA 200-301 Preparation', 'Network Architecture'],
          },
          {
            id: 'les-ccna-nc-9eH16Fxeb9o',
            slug: '02-9eH16Fxeb9o',
            title: 'What is a SWITCH? // FREE CCNA // Day 1',
            description: 'What is a SWITCH? // FREE CCNA // Day 1. CCNA 200-301 training with NetworkChuck.',
            youtubeVideoId: '9eH16Fxeb9o',
            durationMinutes: 23,
            order: 2,
            moduleTitle: 'Module 1: Network Fundamentals & Models',
            objectives: [
              'Understand key concepts presented in What is a SWITCH? // FREE CCNA // Day 1',
              'Review practical CCNA 200-301 configuration and theory principles',
              'Apply networking foundations to security and architecture scenarios',
            ],
            tags: ['ccna', 'networking', 'networkchuck', 'cisco'],
            skillsTaught: ['CCNA 200-301 Preparation', 'Network Architecture'],
          },
          {
            id: 'les-ccna-nc-p9ScLm9S3B4',
            slug: '03-p9ScLm9S3B4',
            title: 'What is a ROUTER? // FREE CCNA // EP 2',
            description: 'What is a ROUTER? // FREE CCNA // EP 2. CCNA 200-301 training with NetworkChuck.',
            youtubeVideoId: 'p9ScLm9S3B4',
            durationMinutes: 22,
            order: 3,
            moduleTitle: 'Module 1: Network Fundamentals & Models',
            objectives: [
              'Understand key concepts presented in What is a ROUTER? // FREE CCNA // EP 2',
              'Review practical CCNA 200-301 configuration and theory principles',
              'Apply networking foundations to security and architecture scenarios',
            ],
            tags: ['ccna', 'networking', 'networkchuck', 'cisco'],
            skillsTaught: ['CCNA 200-301 Preparation', 'Network Architecture'],
          },
          {
            id: 'les-ccna-nc-CRdL1PcherM',
            slug: '04-CRdL1PcherM',
            title: 'what is TCP/IP and OSI? // FREE CCNA // EP 3',
            description: 'what is TCP/IP and OSI? // FREE CCNA // EP 3. CCNA 200-301 training with NetworkChuck.',
            youtubeVideoId: 'CRdL1PcherM',
            durationMinutes: 12,
            order: 4,
            moduleTitle: 'Module 1: Network Fundamentals & Models',
            objectives: [
              'Understand key concepts presented in what is TCP/IP and OSI? // FREE CCNA // EP 3',
              'Review practical CCNA 200-301 configuration and theory principles',
              'Apply networking foundations to security and architecture scenarios',
            ],
            tags: ['ccna', 'networking', 'networkchuck', 'cisco'],
            skillsTaught: ['CCNA 200-301 Preparation', 'Network Architecture'],
          },
          {
            id: 'les-ccna-nc-3kfO61Mensg',
            slug: '05-3kfO61Mensg',
            title: 'REAL LIFE example!! (TCP/IP and OSI layers) // FREE CCNA // EP 4',
            description: 'REAL LIFE example!! (TCP/IP and OSI layers) // FREE CCNA // EP 4. CCNA 200-301 training with NetworkChuck.',
            youtubeVideoId: '3kfO61Mensg',
            durationMinutes: 17,
            order: 5,
            moduleTitle: 'Module 1: Network Fundamentals & Models',
            objectives: [
              'Understand key concepts presented in REAL LIFE example!! (TCP/IP and OSI layers) // FREE CCNA // EP 4',
              'Review practical CCNA 200-301 configuration and theory principles',
              'Apply networking foundations to security and architecture scenarios',
            ],
            tags: ['ccna', 'networking', 'networkchuck', 'cisco'],
            skillsTaught: ['CCNA 200-301 Preparation', 'Network Architecture'],
          },
          {
            id: 'les-ccna-nc-oIRkXulqJA4',
            slug: '06-oIRkXulqJA4',
            title: 'how the OSI model works on YouTube (Application and Transport Layers) // FREE CCNA // EP 5',
            description: 'how the OSI model works on YouTube (Application and Transport Layers) // FREE CCNA // EP 5. CCNA 200-301 training with NetworkChuck.',
            youtubeVideoId: 'oIRkXulqJA4',
            durationMinutes: 22,
            order: 6,
            moduleTitle: 'Module 1: Network Fundamentals & Models',
            objectives: [
              'Understand key concepts presented in how the OSI model works on YouTube (Application and Transport Layers) // FREE CCNA // EP 5',
              'Review practical CCNA 200-301 configuration and theory principles',
              'Apply networking foundations to security and architecture scenarios',
            ],
            tags: ['ccna', 'networking', 'networkchuck', 'cisco'],
            skillsTaught: ['CCNA 200-301 Preparation', 'Network Architecture'],
          }
        ],
      },
      {
        id: 'mod-ccna-nc-architecture-cabling',
        title: 'Module 2: Network Architecture, Cabling & Physical Infrastructure',
        description: 'Explore network topology design, data centers, WANs, Ethernet cables, Power over Ethernet (PoE), and fiber optics.',
        order: 2,
        lessons: [
          {
            id: 'les-ccna-nc-wwwAXlE4OtU',
            slug: '07-wwwAXlE4OtU',
            title: 'DO NOT design your network like this!! // FREE CCNA // EP 6',
            description: 'DO NOT design your network like this!! // FREE CCNA // EP 6. CCNA 200-301 training with NetworkChuck.',
            youtubeVideoId: 'wwwAXlE4OtU',
            durationMinutes: 20,
            order: 7,
            moduleTitle: 'Module 2: Network Architecture, Cabling & Physical Infrastructure',
            objectives: [
              'Understand key concepts presented in DO NOT design your network like this!! // FREE CCNA // EP 6',
              'Review practical CCNA 200-301 configuration and theory principles',
              'Apply networking foundations to security and architecture scenarios',
            ],
            tags: ['ccna', 'networking', 'networkchuck', 'cisco'],
            skillsTaught: ['CCNA 200-301 Preparation', 'Network Architecture'],
          },
          {
            id: 'les-ccna-nc-6-66D9J5PkY',
            slug: '08-6-66D9J5PkY',
            title: 'Data Center NETWORKS (what do they look like??) // FREE CCNA // EP 7',
            description: 'Data Center NETWORKS (what do they look like??) // FREE CCNA // EP 7. CCNA 200-301 training with NetworkChuck.',
            youtubeVideoId: '6-66D9J5PkY',
            durationMinutes: 20,
            order: 8,
            moduleTitle: 'Module 2: Network Architecture, Cabling & Physical Infrastructure',
            objectives: [
              'Understand key concepts presented in Data Center NETWORKS (what do they look like??) // FREE CCNA // EP 7',
              'Review practical CCNA 200-301 configuration and theory principles',
              'Apply networking foundations to security and architecture scenarios',
            ],
            tags: ['ccna', 'networking', 'networkchuck', 'cisco'],
            skillsTaught: ['CCNA 200-301 Preparation', 'Network Architecture'],
          },
          {
            id: 'les-ccna-nc-xPi4uZu4uF0',
            slug: '09-xPi4uZu4uF0',
            title: 'WAN....it\'s not the internet!! (sometimes) // FREE CCNA // EP 8',
            description: 'WAN....it\'s not the internet!! (sometimes) // FREE CCNA // EP 8. CCNA 200-301 training with NetworkChuck.',
            youtubeVideoId: 'xPi4uZu4uF0',
            durationMinutes: 26,
            order: 9,
            moduleTitle: 'Module 2: Network Architecture, Cabling & Physical Infrastructure',
            objectives: [
              'Understand key concepts presented in WAN....it\'s not the internet!! (sometimes) // FREE CCNA // EP 8',
              'Review practical CCNA 200-301 configuration and theory principles',
              'Apply networking foundations to security and architecture scenarios',
            ],
            tags: ['ccna', 'networking', 'networkchuck', 'cisco'],
            skillsTaught: ['CCNA 200-301 Preparation', 'Network Architecture'],
          },
          {
            id: 'les-ccna-nc-80vIin4xGp8',
            slug: '10-80vIin4xGp8',
            title: 'let\'s hack your home network // FREE CCNA // EP 9',
            description: 'let\'s hack your home network // FREE CCNA // EP 9. CCNA 200-301 training with NetworkChuck.',
            youtubeVideoId: '80vIin4xGp8',
            durationMinutes: 30,
            order: 10,
            moduleTitle: 'Module 2: Network Architecture, Cabling & Physical Infrastructure',
            objectives: [
              'Understand key concepts presented in let\'s hack your home network // FREE CCNA // EP 9',
              'Review practical CCNA 200-301 configuration and theory principles',
              'Apply networking foundations to security and architecture scenarios',
            ],
            tags: ['ccna', 'networking', 'networkchuck', 'cisco'],
            skillsTaught: ['CCNA 200-301 Preparation', 'Network Architecture'],
          },
          {
            id: 'les-ccna-nc-37tyxaQbtN4',
            slug: '11-37tyxaQbtN4',
            title: 'you need to learn Hybrid-Cloud RIGHT NOW!! // FREE CCNA // EP 10',
            description: 'you need to learn Hybrid-Cloud RIGHT NOW!! // FREE CCNA // EP 10. CCNA 200-301 training with NetworkChuck.',
            youtubeVideoId: '37tyxaQbtN4',
            durationMinutes: 16,
            order: 11,
            moduleTitle: 'Module 2: Network Architecture, Cabling & Physical Infrastructure',
            objectives: [
              'Understand key concepts presented in you need to learn Hybrid-Cloud RIGHT NOW!! // FREE CCNA // EP 10',
              'Review practical CCNA 200-301 configuration and theory principles',
              'Apply networking foundations to security and architecture scenarios',
            ],
            tags: ['ccna', 'networking', 'networkchuck', 'cisco'],
            skillsTaught: ['CCNA 200-301 Preparation', 'Network Architecture'],
          },
          {
            id: 'les-ccna-nc-y8h5qY3zwic',
            slug: '12-y8h5qY3zwic',
            title: 'forcing my kids to make Ethernet cables // FREE CCNA // EP 11',
            description: 'forcing my kids to make Ethernet cables // FREE CCNA // EP 11. CCNA 200-301 training with NetworkChuck.',
            youtubeVideoId: 'y8h5qY3zwic',
            durationMinutes: 44,
            order: 12,
            moduleTitle: 'Module 2: Network Architecture, Cabling & Physical Infrastructure',
            objectives: [
              'Understand key concepts presented in forcing my kids to make Ethernet cables // FREE CCNA // EP 11',
              'Review practical CCNA 200-301 configuration and theory principles',
              'Apply networking foundations to security and architecture scenarios',
            ],
            tags: ['ccna', 'networking', 'networkchuck', 'cisco'],
            skillsTaught: ['CCNA 200-301 Preparation', 'Network Architecture'],
          },
          {
            id: 'les-ccna-nc-MLxgmkRzgIQ',
            slug: '13-MLxgmkRzgIQ',
            title: 'why Power over Ethernet (PoE) is amazing!! // FREE CCNA // EP 12',
            description: 'why Power over Ethernet (PoE) is amazing!! // FREE CCNA // EP 12. CCNA 200-301 training with NetworkChuck.',
            youtubeVideoId: 'MLxgmkRzgIQ',
            durationMinutes: 20,
            order: 13,
            moduleTitle: 'Module 2: Network Architecture, Cabling & Physical Infrastructure',
            objectives: [
              'Understand key concepts presented in why Power over Ethernet (PoE) is amazing!! // FREE CCNA // EP 12',
              'Review practical CCNA 200-301 configuration and theory principles',
              'Apply networking foundations to security and architecture scenarios',
            ],
            tags: ['ccna', 'networking', 'networkchuck', 'cisco'],
            skillsTaught: ['CCNA 200-301 Preparation', 'Network Architecture'],
          },
          {
            id: 'les-ccna-nc-E3DEJ7odWq0',
            slug: '14-E3DEJ7odWq0',
            title: 'fiber optic cables (what you NEED to know) // FREE CCNA // EP 13',
            description: 'fiber optic cables (what you NEED to know) // FREE CCNA // EP 13. CCNA 200-301 training with NetworkChuck.',
            youtubeVideoId: 'E3DEJ7odWq0',
            durationMinutes: 19,
            order: 14,
            moduleTitle: 'Module 2: Network Architecture, Cabling & Physical Infrastructure',
            objectives: [
              'Understand key concepts presented in fiber optic cables (what you NEED to know) // FREE CCNA // EP 13',
              'Review practical CCNA 200-301 configuration and theory principles',
              'Apply networking foundations to security and architecture scenarios',
            ],
            tags: ['ccna', 'networking', 'networkchuck', 'cisco'],
            skillsTaught: ['CCNA 200-301 Preparation', 'Network Architecture'],
          },
          {
            id: 'les-ccna-nc-0W4JZIWtjLQ',
            slug: '15-0W4JZIWtjLQ',
            title: 'you NEED to learn Port Security…….RIGHT NOW!! // FREE CCNA // EP 14',
            description: 'you NEED to learn Port Security…….RIGHT NOW!! // FREE CCNA // EP 14. CCNA 200-301 training with NetworkChuck.',
            youtubeVideoId: '0W4JZIWtjLQ',
            durationMinutes: 23,
            order: 15,
            moduleTitle: 'Module 2: Network Architecture, Cabling & Physical Infrastructure',
            objectives: [
              'Understand key concepts presented in you NEED to learn Port Security…….RIGHT NOW!! // FREE CCNA // EP 14',
              'Review practical CCNA 200-301 configuration and theory principles',
              'Apply networking foundations to security and architecture scenarios',
            ],
            tags: ['ccna', 'networking', 'networkchuck', 'cisco'],
            skillsTaught: ['CCNA 200-301 Preparation', 'Network Architecture'],
          }
        ],
      },
      {
        id: 'mod-ccna-nc-ip-subnetting',
        title: 'Module 3: IP Addressing & Subnetting Mastery',
        description: 'Master IPv4 addressing, private addressing, subnet masks, and hands-on subnetting calculations for real-world networks.',
        order: 3,
        lessons: [
          {
            id: 'les-ccna-nc-5WfiTHiU4x8',
            slug: '16-5WfiTHiU4x8',
            title: 'what is an IP Address? // You SUCK at Subnetting // EP 1',
            description: 'what is an IP Address? // You SUCK at Subnetting // EP 1. CCNA 200-301 training with NetworkChuck.',
            youtubeVideoId: '5WfiTHiU4x8',
            durationMinutes: 19,
            order: 16,
            moduleTitle: 'Module 3: IP Addressing & Subnetting Mastery',
            objectives: [
              'Understand key concepts presented in what is an IP Address? // You SUCK at Subnetting // EP 1',
              'Review practical CCNA 200-301 configuration and theory principles',
              'Apply networking foundations to security and architecture scenarios',
            ],
            tags: ['ccna', 'networking', 'networkchuck', 'cisco'],
            skillsTaught: ['CCNA 200-301 Preparation', 'Network Architecture'],
          },
          {
            id: 'les-ccna-nc-tcae4TSSMo8',
            slug: '17-tcae4TSSMo8',
            title: 'we ran OUT of IP Addresses!!',
            description: 'we ran OUT of IP Addresses!!. CCNA 200-301 training with NetworkChuck.',
            youtubeVideoId: 'tcae4TSSMo8',
            durationMinutes: 17,
            order: 17,
            moduleTitle: 'Module 3: IP Addressing & Subnetting Mastery',
            objectives: [
              'Understand key concepts presented in we ran OUT of IP Addresses!!',
              'Review practical CCNA 200-301 configuration and theory principles',
              'Apply networking foundations to security and architecture scenarios',
            ],
            tags: ['ccna', 'networking', 'networkchuck', 'cisco'],
            skillsTaught: ['CCNA 200-301 Preparation', 'Network Architecture'],
          },
          {
            id: 'les-ccna-nc-8bhvn9tQk8o',
            slug: '18-8bhvn9tQk8o',
            title: 'we’re out of IP Addresses….but this saved us (Private IP Addresses)',
            description: 'we’re out of IP Addresses….but this saved us (Private IP Addresses). CCNA 200-301 training with NetworkChuck.',
            youtubeVideoId: '8bhvn9tQk8o',
            durationMinutes: 15,
            order: 18,
            moduleTitle: 'Module 3: IP Addressing & Subnetting Mastery',
            objectives: [
              'Understand key concepts presented in we’re out of IP Addresses….but this saved us (Private IP Addresses)',
              'Review practical CCNA 200-301 configuration and theory principles',
              'Apply networking foundations to security and architecture scenarios',
            ],
            tags: ['ccna', 'networking', 'networkchuck', 'cisco'],
            skillsTaught: ['CCNA 200-301 Preparation', 'Network Architecture'],
          },
          {
            id: 'les-ccna-nc-2-i5x8KCfII',
            slug: '19-2-i5x8KCfII',
            title: 'i bet you can\'t do this (because you still suck at subnetting)',
            description: 'i bet you can\'t do this (because you still suck at subnetting). CCNA 200-301 training with NetworkChuck.',
            youtubeVideoId: '2-i5x8KCfII',
            durationMinutes: 19,
            order: 19,
            moduleTitle: 'Module 3: IP Addressing & Subnetting Mastery',
            objectives: [
              'Understand key concepts presented in i bet you can\'t do this (because you still suck at subnetting)',
              'Review practical CCNA 200-301 configuration and theory principles',
              'Apply networking foundations to security and architecture scenarios',
            ],
            tags: ['ccna', 'networking', 'networkchuck', 'cisco'],
            skillsTaught: ['CCNA 200-301 Preparation', 'Network Architecture'],
          },
          {
            id: 'les-ccna-nc-oZGZRtaGyG8',
            slug: '20-oZGZRtaGyG8',
            title: 'What is a Subnet Mask??? (you NEED to know it!!)',
            description: 'What is a Subnet Mask??? (you NEED to know it!!). CCNA 200-301 training with NetworkChuck.',
            youtubeVideoId: 'oZGZRtaGyG8',
            durationMinutes: 13,
            order: 20,
            moduleTitle: 'Module 3: IP Addressing & Subnetting Mastery',
            objectives: [
              'Understand key concepts presented in What is a Subnet Mask??? (you NEED to know it!!)',
              'Review practical CCNA 200-301 configuration and theory principles',
              'Apply networking foundations to security and architecture scenarios',
            ],
            tags: ['ccna', 'networking', 'networkchuck', 'cisco'],
            skillsTaught: ['CCNA 200-301 Preparation', 'Network Architecture'],
          },
          {
            id: 'les-ccna-nc-mJ_5qeqGOaI',
            slug: '21-mJ_5qeqGOaI',
            title: 'let’s subnet your home network // You SUCK at subnetting // EP 6',
            description: 'let’s subnet your home network // You SUCK at subnetting // EP 6. CCNA 200-301 training with NetworkChuck.',
            youtubeVideoId: 'mJ_5qeqGOaI',
            durationMinutes: 10,
            order: 21,
            moduleTitle: 'Module 3: IP Addressing & Subnetting Mastery',
            objectives: [
              'Understand key concepts presented in let’s subnet your home network // You SUCK at subnetting // EP 6',
              'Review practical CCNA 200-301 configuration and theory principles',
              'Apply networking foundations to security and architecture scenarios',
            ],
            tags: ['ccna', 'networking', 'networkchuck', 'cisco'],
            skillsTaught: ['CCNA 200-301 Preparation', 'Network Architecture'],
          },
          {
            id: 'les-ccna-nc-B1vqKQIPxr0',
            slug: '22-B1vqKQIPxr0',
            title: 'subnetting my coffee shop',
            description: 'subnetting my coffee shop. CCNA 200-301 training with NetworkChuck.',
            youtubeVideoId: 'B1vqKQIPxr0',
            durationMinutes: 14,
            order: 22,
            moduleTitle: 'Module 3: IP Addressing & Subnetting Mastery',
            objectives: [
              'Understand key concepts presented in subnetting my coffee shop',
              'Review practical CCNA 200-301 configuration and theory principles',
              'Apply networking foundations to security and architecture scenarios',
            ],
            tags: ['ccna', 'networking', 'networkchuck', 'cisco'],
            skillsTaught: ['CCNA 200-301 Preparation', 'Network Architecture'],
          },
          {
            id: 'les-ccna-nc-6zopTcQFhqM',
            slug: '23-6zopTcQFhqM',
            title: 'Subnetting…..but in reverse',
            description: 'Subnetting…..but in reverse. CCNA 200-301 training with NetworkChuck.',
            youtubeVideoId: '6zopTcQFhqM',
            durationMinutes: 8,
            order: 23,
            moduleTitle: 'Module 3: IP Addressing & Subnetting Mastery',
            objectives: [
              'Understand key concepts presented in Subnetting…..but in reverse',
              'Review practical CCNA 200-301 configuration and theory principles',
              'Apply networking foundations to security and architecture scenarios',
            ],
            tags: ['ccna', 'networking', 'networkchuck', 'cisco'],
            skillsTaught: ['CCNA 200-301 Preparation', 'Network Architecture'],
          },
          {
            id: 'les-ccna-nc-OD2vG5st4zI',
            slug: '24-OD2vG5st4zI',
            title: 'Do you STILL suck at subnetting?? (THE FINAL TEST) // EP 9',
            description: 'Do you STILL suck at subnetting?? (THE FINAL TEST) // EP 9. CCNA 200-301 training with NetworkChuck.',
            youtubeVideoId: 'OD2vG5st4zI',
            durationMinutes: 8,
            order: 24,
            moduleTitle: 'Module 3: IP Addressing & Subnetting Mastery',
            objectives: [
              'Understand key concepts presented in Do you STILL suck at subnetting?? (THE FINAL TEST) // EP 9',
              'Review practical CCNA 200-301 configuration and theory principles',
              'Apply networking foundations to security and architecture scenarios',
            ],
            tags: ['ccna', 'networking', 'networkchuck', 'cisco'],
            skillsTaught: ['CCNA 200-301 Preparation', 'Network Architecture'],
          }
        ],
      }
    ],
  },
];
