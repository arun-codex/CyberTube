import { Course } from '../types/course';

export const PYTHON_FOR_CYBERSECURITY_COURSE: Course = {
  "id": "course-python-for-cybersecurity-zero-to-advanced",
  "slug": "python-for-cybersecurity-zero-to-advanced",
  "title": "Python for Cybersecurity \u2014 Zero to Advanced",
  "shortDescription": "Master defensive Python scripting, log forensics, IOC extraction, PCAP analysis, and automated SOC pipelines with 30 hands-on modules and 120 video-guided lessons (70 hours structured video + 130\u2013150 hours guided labs & coding).",
  "description": "A comprehensive, defense-first 30-module curriculum designed for aspiring and practicing cybersecurity defenders, junior SOC analysts, and security engineers. Features 70 hours of structured video lessons across 30 modules, paired with 130\u2013150 hours of guided hands-on coding, log forensics labs, and capstone engineering (200\u2013220 total study hours). Learn to automate incident investigation workflows, parse EVTX and auth logs, dissect PCAPs with Scapy, enrich IOCs, correlate telemetry against MITRE ATT&CK, test Sigma rules, query SIEM APIs, and build production-grade SOC automation tools in Python.",
  "domains": [
    "soc-blue-team",
    "fundamentals",
    "dfir"
  ],
  "tags": [
    "python",
    "cybersecurity",
    "soc-automation",
    "scripting",
    "blue-team",
    "scapy",
    "log-analysis",
    "mitre-attack",
    "incident-response"
  ],
  "difficulty": "intermediate",
  "thumbnailUrl": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
  "estimatedDuration": "70 hours video \u2022 200\u2013220 study hours (with coding, reading & labs)",
  "totalDurationMinutes": 4200,
  "instructor": {
    "name": "CyberTube Open Cybersecurity & Python Faculty",
    "title": "Security Automation & Defensive Engineering Instructors",
    "organization": "CyberTube Academy & Open Security Community"
  },
  "prerequisites": [
    "Basic computer literacy and understanding of cybersecurity core concepts",
    "Python 3 installed with a code editor (VS Code, PyCharm, or similar)",
    "An isolated lab workspace (virtual machine or dedicated test directory)"
  ],
  "learningObjectives": [
    "Write clean, safe, auditable Python 3 scripts for defensive security automation",
    "Parse, normalize, and extract IOCs from Linux auth logs, Windows EVTX, CSV, and JSON feeds",
    "Conduct offline packet forensics and dissect protocol handshakes using Scapy",
    "Enrich synthetic alerts with threat intelligence feeds, CVE/NVD data, and MITRE ATT&CK techniques",
    "Build, test, and package robust CLI incident response tools and automated SOC playbooks",
    "Design and deploy an end-to-end modular SOC automation pipeline in the comprehensive capstone assessment"
  ],
  "featured": true,
  "track": "cybersecurity",
  "modules": [
    {
      "id": "mod-pysec-m01",
      "title": "Module 01: Safety, Python Setup & Security Lab",
      "description": "Foundation phase. Security scripts must run in an isolated, authorized environment. 4 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: None.",
      "order": 1,
      "lessons": [
        {
          "id": "les-pysec-m01-l01",
          "slug": "m01-l1-course-orientation-and-ethics",
          "title": "Module 01 - Lesson 1: Course orientation and ethics",
          "description": "Direct topic demonstration. Write a scope statement: localhost, synthetic files, and owned machines only. Verification: Scope statement excludes public targets.",
          "youtubeVideoId": "Fxh9X3-hO4Y",
          "videoAttribution": {
            "creator": "CyberFlow",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 01: Safety, Python Setup & Security Lab",
          "objectives": [
            "Write a scope statement: localhost, synthetic files, and owned machines only.",
            "Verify implementation: Scope statement excludes public targets.",
            "Topic alignment: Direct topic demonstration",
            "Install Python and VS Code or another editor.",
            "Explain authorization and scope."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-01",
            "foundation"
          ],
          "skillsTaught": [
            "Course orientation and ethics",
            "Security Python Scripting (Mod 01)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Course orientation and ethics), learn defensive programming with video instruction by CyberFlow. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (None)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Course orientation and ethics",
                "content": "Security scripts must run in an isolated, authorized environment.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Write a scope statement: localhost, synthetic files, and owned machines only.",
                  "Verification rule: Scope statement excludes public targets.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'CyberFlow \u2014 Best Way to Learn Python for Hacking (chapter starts 01:32)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Write a scope statement: localhost, synthetic files, and owned machines only.",
                "expectedOutcome": "Scope statement excludes public targets."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Scope statement excludes public targets.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Security scripts must run in an isolated, authorized environment.",
            "furtherReading": [
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              },
              {
                "title": "venv: official/reference documentation",
                "url": "https://docs.python.org/3/library/venv.html"
              },
              {
                "title": "security: official/reference documentation",
                "url": "https://owasp.org/www-project-top-ten/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m01-l02",
          "slug": "m01-l2-install-python-and-editor",
          "title": "Module 01 - Lesson 2: Install Python and editor",
          "description": "Direct topic demonstration. Install Python 3, choose an editor, record interpreter version. Verification: python --version or python3 --version works.",
          "youtubeVideoId": "oDOw5tB3Udw",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 01: Safety, Python Setup & Security Lab",
          "objectives": [
            "Install Python 3, choose an editor, record interpreter version.",
            "Verify implementation: python --version or python3 --version works.",
            "Topic alignment: Direct topic demonstration",
            "Install Python and VS Code or another editor.",
            "Explain authorization and scope."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-01",
            "foundation"
          ],
          "skillsTaught": [
            "Install Python and editor",
            "Security Python Scripting (Mod 01)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Install Python and editor), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (None)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Install Python and editor",
                "content": "Security scripts must run in an isolated, authorized environment.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Install Python 3, choose an editor, record interpreter version.",
                  "Verification rule: python --version or python3 --version works.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Python for Beginners with Hands-On Projects (chapter starts 00:05:03)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Install Python 3, choose an editor, record interpreter version.",
                "expectedOutcome": "python --version or python3 --version works."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "python --version or python3 --version works.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Security scripts must run in an isolated, authorized environment.",
            "furtherReading": [
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              },
              {
                "title": "venv: official/reference documentation",
                "url": "https://docs.python.org/3/library/venv.html"
              },
              {
                "title": "security: official/reference documentation",
                "url": "https://owasp.org/www-project-top-ten/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m01-l03",
          "slug": "m01-l3-run-a-python-file",
          "title": "Module 01 - Lesson 3: Run a Python file",
          "description": "Technique bridge to this module\u2019s security lab. Create hello_soc.py that prints a mock incident ticket. Verification: Program executes with no dependency.",
          "youtubeVideoId": "oDOw5tB3Udw",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 01: Safety, Python Setup & Security Lab",
          "objectives": [
            "Create hello_soc.py that prints a mock incident ticket.",
            "Verify implementation: Program executes with no dependency.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Install Python and VS Code or another editor.",
            "Explain authorization and scope."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-01",
            "foundation"
          ],
          "skillsTaught": [
            "Run a Python file",
            "Security Python Scripting (Mod 01)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Run a Python file), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (None)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Run a Python file",
                "content": "Security scripts must run in an isolated, authorized environment.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Create hello_soc.py that prints a mock incident ticket.",
                  "Verification rule: Program executes with no dependency.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Python for Beginners with Hands-On Projects (chapter starts 00:21:20)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Create hello_soc.py that prints a mock incident ticket.",
                "expectedOutcome": "Program executes with no dependency."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Program executes with no dependency.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Security scripts must run in an isolated, authorized environment.",
            "furtherReading": [
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              },
              {
                "title": "venv: official/reference documentation",
                "url": "https://docs.python.org/3/library/venv.html"
              },
              {
                "title": "security: official/reference documentation",
                "url": "https://owasp.org/www-project-top-ten/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m01-l04",
          "slug": "m01-l4-vs-code-debugging",
          "title": "Module 01 - Lesson 4: VS Code debugging",
          "description": "Technique bridge to this module\u2019s security lab. Place a breakpoint on a status variable; step over and inspect. Verification: Screenshot of debug variables.",
          "youtubeVideoId": "D2cwvpJSBX4",
          "videoAttribution": {
            "creator": "Microsoft",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 01: Safety, Python Setup & Security Lab",
          "objectives": [
            "Place a breakpoint on a status variable; step over and inspect.",
            "Verify implementation: Screenshot of debug variables.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Install Python and VS Code or another editor.",
            "Explain authorization and scope."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-01",
            "foundation"
          ],
          "skillsTaught": [
            "VS Code debugging",
            "Security Python Scripting (Mod 01)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (VS Code debugging), learn defensive programming with video instruction by Microsoft. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (None)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: VS Code debugging",
                "content": "Security scripts must run in an isolated, authorized environment.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Place a breakpoint on a status variable; step over and inspect.",
                  "Verification rule: Screenshot of debug variables.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Microsoft \u2014 Getting Started with Python in VS Code (chapter starts 00:00)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Place a breakpoint on a status variable; step over and inspect.",
                "expectedOutcome": "Screenshot of debug variables."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Screenshot of debug variables.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Security scripts must run in an isolated, authorized environment.",
            "furtherReading": [
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              },
              {
                "title": "venv: official/reference documentation",
                "url": "https://docs.python.org/3/library/venv.html"
              },
              {
                "title": "security: official/reference documentation",
                "url": "https://owasp.org/www-project-top-ten/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-pysec-m01",
        "title": "Lab 01: Safety, Python Setup & Security Lab Hands-on Implementation",
        "objective": "Security scripts must run in an isolated, authorized environment. Security scripts must run in an isolated, authorized environment. Work only with synthetic data from [LAB_DATASETS.md](../04-LAB-DATASETS.md) or an authorized personal VM.",
        "toolsRequired": [
          "Python 3.10+",
          "VS Code / Preferred Editor",
          "Safe Isolated Lab Directory"
        ],
        "pcapSource": {
          "fileName": "synthetic_m01_dataset.json",
          "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/data/synthetic_labs.json"
        },
        "difficulty": "beginner",
        "estimatedMinutes": 60,
        "instructions": [
          "Create a new directory for this course; never use company production logs.",
          "Create a virtual environment and save a README describing lab boundaries.",
          "Write hello_soc.py that prints a synthetic security event ID, host, severity, and UTC timestamp.",
          "Run the script twice and capture the output."
        ],
        "tasks": [
          {
            "id": "task-m01-1",
            "description": "Create a new directory for this course; never use company production logs."
          },
          {
            "id": "task-m01-2",
            "description": "Create a virtual environment and save a README describing lab boundaries."
          },
          {
            "id": "task-m01-3",
            "description": "Write hello_soc.py that prints a synthetic security event ID, host, severity, and UTC timestamp."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "environment_provenance",
            "prompt": "Document your Python version, OS environment, and isolated directory path.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "execution_output",
            "prompt": "Provide terminal output demonstrating successful execution and edge-case handling.",
            "expectedEvidenceType": "Terminal output log"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Interpreter runs in isolated workspace.",
          "No genuine credentials or private identifiers.",
          "Outputs are repeatable."
        ]
      }
    },
    {
      "id": "mod-pysec-m02",
      "title": "Module 02: Core Syntax, Variables & Data Types",
      "description": "Foundation phase. Represent alerts and investigation facts reliably. 4 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.",
      "order": 2,
      "lessons": [
        {
          "id": "les-pysec-m02-l01",
          "slug": "m02-l1-variables-and-assignment",
          "title": "Module 02 - Lesson 1: Variables and assignment",
          "description": "Direct topic demonstration. Assign source_ip, alert_score and is_blocked in a sample incident. Verification: Print each variable and its type.",
          "youtubeVideoId": "KVmbRdwWohY",
          "videoAttribution": {
            "creator": "Hank Hackerson",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 02: Core Syntax, Variables & Data Types",
          "objectives": [
            "Assign source_ip, alert_score and is_blocked in a sample incident.",
            "Verify implementation: Print each variable and its type.",
            "Topic alignment: Direct topic demonstration",
            "Explain strings, integers, booleans, None and comparison.",
            "Create typed-looking event records."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-02",
            "foundation"
          ],
          "skillsTaught": [
            "Variables and assignment",
            "Security Python Scripting (Mod 02)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Variables and assignment), learn defensive programming with video instruction by Hank Hackerson. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Variables and assignment",
                "content": "Represent alerts and investigation facts reliably.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Assign source_ip, alert_score and is_blocked in a sample incident.",
                  "Verification rule: Print each variable and its type.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Hank Hackerson \u2014 Build Python Algorithms for Cybersecurity (chapter starts 00:49:53)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Assign source_ip, alert_score and is_blocked in a sample incident.",
                "expectedOutcome": "Print each variable and its type."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Print each variable and its type.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Represent alerts and investigation facts reliably.",
            "furtherReading": [
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              },
              {
                "title": "library: official/reference documentation",
                "url": "https://docs.python.org/3/library/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m02-l02",
          "slug": "m02-l2-data-types",
          "title": "Module 02 - Lesson 2: Data types",
          "description": "Direct topic demonstration. Build one login attempt with string, integer and boolean fields. Verification: Values keep correct types.",
          "youtubeVideoId": "KVmbRdwWohY",
          "videoAttribution": {
            "creator": "Hank Hackerson",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 02: Core Syntax, Variables & Data Types",
          "objectives": [
            "Build one login attempt with string, integer and boolean fields.",
            "Verify implementation: Values keep correct types.",
            "Topic alignment: Direct topic demonstration",
            "Explain strings, integers, booleans, None and comparison.",
            "Create typed-looking event records."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-02",
            "foundation"
          ],
          "skillsTaught": [
            "Data types",
            "Security Python Scripting (Mod 02)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Data types), learn defensive programming with video instruction by Hank Hackerson. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Data types",
                "content": "Represent alerts and investigation facts reliably.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Build one login attempt with string, integer and boolean fields.",
                  "Verification rule: Values keep correct types.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Hank Hackerson \u2014 Build Python Algorithms for Cybersecurity (chapter starts 00:32:59)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Build one login attempt with string, integer and boolean fields.",
                "expectedOutcome": "Values keep correct types."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Values keep correct types.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Represent alerts and investigation facts reliably.",
            "furtherReading": [
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              },
              {
                "title": "library: official/reference documentation",
                "url": "https://docs.python.org/3/library/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m02-l03",
          "slug": "m02-l3-strings-and-safe-formatting",
          "title": "Module 02 - Lesson 3: Strings and safe formatting",
          "description": "Technique bridge to this module\u2019s security lab. Format an alert summary without inserting untrusted input into shell commands. Verification: Summary uses clear labels.",
          "youtubeVideoId": "oDOw5tB3Udw",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 02: Core Syntax, Variables & Data Types",
          "objectives": [
            "Format an alert summary without inserting untrusted input into shell commands.",
            "Verify implementation: Summary uses clear labels.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Explain strings, integers, booleans, None and comparison.",
            "Create typed-looking event records."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-02",
            "foundation"
          ],
          "skillsTaught": [
            "Strings and safe formatting",
            "Security Python Scripting (Mod 02)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Strings and safe formatting), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Strings and safe formatting",
                "content": "Represent alerts and investigation facts reliably.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Format an alert summary without inserting untrusted input into shell commands.",
                  "Verification rule: Summary uses clear labels.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Python for Beginners with Hands-On Projects (chapter starts 01:13:10)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Format an alert summary without inserting untrusted input into shell commands.",
                "expectedOutcome": "Summary uses clear labels."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Summary uses clear labels.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Represent alerts and investigation facts reliably.",
            "furtherReading": [
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              },
              {
                "title": "library: official/reference documentation",
                "url": "https://docs.python.org/3/library/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m02-l04",
          "slug": "m02-l4-operators-and-comparisons",
          "title": "Module 02 - Lesson 4: Operators and comparisons",
          "description": "Technique bridge to this module\u2019s security lab. Evaluate whether score >= 70 and account is privileged. Verification: Test both true and false examples.",
          "youtubeVideoId": "eWRfhZUzrAc",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 02: Core Syntax, Variables & Data Types",
          "objectives": [
            "Evaluate whether score >= 70 and account is privileged.",
            "Verify implementation: Test both true and false examples.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Explain strings, integers, booleans, None and comparison.",
            "Create typed-looking event records."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-02",
            "foundation"
          ],
          "skillsTaught": [
            "Operators and comparisons",
            "Security Python Scripting (Mod 02)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Operators and comparisons), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Operators and comparisons",
                "content": "Represent alerts and investigation facts reliably.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Evaluate whether score >= 70 and account is privileged.",
                  "Verification rule: Test both true and false examples.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Python for Beginners (Beau Carnes) (chapter starts 01:00:16)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Evaluate whether score >= 70 and account is privileged.",
                "expectedOutcome": "Test both true and false examples."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Test both true and false examples.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Represent alerts and investigation facts reliably.",
            "furtherReading": [
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              },
              {
                "title": "library: official/reference documentation",
                "url": "https://docs.python.org/3/library/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-pysec-m02",
        "title": "Lab 02: Core Syntax, Variables & Data Types Hands-on Implementation",
        "objective": "Represent alerts and investigation facts reliably. Represent alerts and investigation facts reliably. Work only with synthetic data from [LAB_DATASETS.md](../04-LAB-DATASETS.md) or an authorized personal VM.",
        "toolsRequired": [
          "Python 3.10+",
          "VS Code / Preferred Editor",
          "Safe Isolated Lab Directory"
        ],
        "pcapSource": {
          "fileName": "synthetic_m02_dataset.json",
          "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/data/synthetic_labs.json"
        },
        "difficulty": "beginner",
        "estimatedMinutes": 60,
        "instructions": [
          "Create 8 synthetic event records with realistic but non-routable sample IPs.",
          "Normalize hostname to lowercase; store UTC as ISO string.",
          "Classify events by a documented threshold, avoiding a claim of actual compromise.",
          "Print exactly three fields as a mini incident note."
        ],
        "tasks": [
          {
            "id": "task-m02-1",
            "description": "Create 8 synthetic event records with realistic but non-routable sample IPs."
          },
          {
            "id": "task-m02-2",
            "description": "Normalize hostname to lowercase; store UTC as ISO string."
          },
          {
            "id": "task-m02-3",
            "description": "Classify events by a documented threshold, avoiding a claim of actual compromise."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "environment_provenance",
            "prompt": "Document your Python version, OS environment, and isolated directory path.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "execution_output",
            "prompt": "Provide terminal output demonstrating successful execution and edge-case handling.",
            "expectedEvidenceType": "Terminal output log"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Classify expected threshold cases.",
          "No data lost in conversion.",
          "No actual user data."
        ]
      }
    },
    {
      "id": "mod-pysec-m03",
      "title": "Module 03: Conditionals, Loops & Detection Logic",
      "description": "Foundation phase. SOC triage rules require explainable conditions and iteration. 5 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.",
      "order": 3,
      "lessons": [
        {
          "id": "les-pysec-m03-l01",
          "slug": "m03-l1-if-and-else",
          "title": "Module 03 - Lesson 1: If and else",
          "description": "Direct topic demonstration. Classify simulated authentication alerts as low, medium or high. Verification: Boundary inputs produce expected labels.",
          "youtubeVideoId": "KVmbRdwWohY",
          "videoAttribution": {
            "creator": "Hank Hackerson",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 03: Conditionals, Loops & Detection Logic",
          "objectives": [
            "Classify simulated authentication alerts as low, medium or high.",
            "Verify implementation: Boundary inputs produce expected labels.",
            "Topic alignment: Direct topic demonstration",
            "Write if/elif/else rules.",
            "Iterate bounded event collections."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-03",
            "foundation"
          ],
          "skillsTaught": [
            "If and else",
            "Security Python Scripting (Mod 03)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (If and else), learn defensive programming with video instruction by Hank Hackerson. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: If and else",
                "content": "SOC triage rules require explainable conditions and iteration.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Classify simulated authentication alerts as low, medium or high.",
                  "Verification rule: Boundary inputs produce expected labels.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Hank Hackerson \u2014 Build Python Algorithms for Cybersecurity (chapter starts 01:00:48)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Classify simulated authentication alerts as low, medium or high.",
                "expectedOutcome": "Boundary inputs produce expected labels."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Boundary inputs produce expected labels.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. SOC triage rules require explainable conditions and iteration.",
            "furtherReading": [
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              },
              {
                "title": "library: official/reference documentation",
                "url": "https://docs.python.org/3/library/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m03-l02",
          "slug": "m03-l2-comparison-and-boolean-expressions",
          "title": "Module 03 - Lesson 2: Comparison and Boolean expressions",
          "description": "Direct topic demonstration. Combine username risk flag with failed-login count. Verification: Truth table shows four cases.",
          "youtubeVideoId": "KVmbRdwWohY",
          "videoAttribution": {
            "creator": "Hank Hackerson",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 03: Conditionals, Loops & Detection Logic",
          "objectives": [
            "Combine username risk flag with failed-login count.",
            "Verify implementation: Truth table shows four cases.",
            "Topic alignment: Direct topic demonstration",
            "Write if/elif/else rules.",
            "Iterate bounded event collections."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-03",
            "foundation"
          ],
          "skillsTaught": [
            "Comparison and Boolean expressions",
            "Security Python Scripting (Mod 03)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Comparison and Boolean expressions), learn defensive programming with video instruction by Hank Hackerson. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Comparison and Boolean expressions",
                "content": "SOC triage rules require explainable conditions and iteration.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Combine username risk flag with failed-login count.",
                  "Verification rule: Truth table shows four cases.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Hank Hackerson \u2014 Build Python Algorithms for Cybersecurity (chapter starts 01:15:04)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Combine username risk flag with failed-login count.",
                "expectedOutcome": "Truth table shows four cases."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Truth table shows four cases.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. SOC triage rules require explainable conditions and iteration.",
            "furtherReading": [
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              },
              {
                "title": "library: official/reference documentation",
                "url": "https://docs.python.org/3/library/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m03-l03",
          "slug": "m03-l3-for-loops",
          "title": "Module 03 - Lesson 3: For loops",
          "description": "Technique bridge to this module\u2019s security lab. Loop through a fixed list of 20 synthetic events. Verification: Each event processed once.",
          "youtubeVideoId": "KVmbRdwWohY",
          "videoAttribution": {
            "creator": "Hank Hackerson",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 03: Conditionals, Loops & Detection Logic",
          "objectives": [
            "Loop through a fixed list of 20 synthetic events.",
            "Verify implementation: Each event processed once.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Write if/elif/else rules.",
            "Iterate bounded event collections."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-03",
            "foundation"
          ],
          "skillsTaught": [
            "For loops",
            "Security Python Scripting (Mod 03)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (For loops), learn defensive programming with video instruction by Hank Hackerson. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: For loops",
                "content": "SOC triage rules require explainable conditions and iteration.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Loop through a fixed list of 20 synthetic events.",
                  "Verification rule: Each event processed once.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Hank Hackerson \u2014 Build Python Algorithms for Cybersecurity (chapter starts 01:28:14)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Loop through a fixed list of 20 synthetic events.",
                "expectedOutcome": "Each event processed once."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Each event processed once.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. SOC triage rules require explainable conditions and iteration.",
            "furtherReading": [
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              },
              {
                "title": "library: official/reference documentation",
                "url": "https://docs.python.org/3/library/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m03-l04",
          "slug": "m03-l4-while-loops-and-stopping-conditions",
          "title": "Module 03 - Lesson 4: While loops and stopping conditions",
          "description": "Technique bridge to this module\u2019s security lab. Create a bounded retry/backoff demonstration with max 3 attempts. Verification: Loop always terminates.",
          "youtubeVideoId": "KVmbRdwWohY",
          "videoAttribution": {
            "creator": "Hank Hackerson",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 03: Conditionals, Loops & Detection Logic",
          "objectives": [
            "Create a bounded retry/backoff demonstration with max 3 attempts.",
            "Verify implementation: Loop always terminates.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Write if/elif/else rules.",
            "Iterate bounded event collections."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-03",
            "foundation"
          ],
          "skillsTaught": [
            "While loops and stopping conditions",
            "Security Python Scripting (Mod 03)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (While loops and stopping conditions), learn defensive programming with video instruction by Hank Hackerson. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: While loops and stopping conditions",
                "content": "SOC triage rules require explainable conditions and iteration.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Create a bounded retry/backoff demonstration with max 3 attempts.",
                  "Verification rule: Loop always terminates.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Hank Hackerson \u2014 Build Python Algorithms for Cybersecurity (chapter starts 01:46:17)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Create a bounded retry/backoff demonstration with max 3 attempts.",
                "expectedOutcome": "Loop always terminates."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Loop always terminates.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. SOC triage rules require explainable conditions and iteration.",
            "furtherReading": [
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              },
              {
                "title": "library: official/reference documentation",
                "url": "https://docs.python.org/3/library/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-pysec-m03",
        "title": "Lab 03: Conditionals, Loops & Detection Logic Hands-on Implementation",
        "objective": "SOC triage rules require explainable conditions and iteration. SOC triage rules require explainable conditions and iteration. Work only with synthetic data from [LAB_DATASETS.md](../04-LAB-DATASETS.md) or an authorized personal VM.",
        "toolsRequired": [
          "Python 3.10+",
          "VS Code / Preferred Editor",
          "Safe Isolated Lab Directory"
        ],
        "pcapSource": {
          "fileName": "synthetic_m03_dataset.json",
          "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/data/synthetic_labs.json"
        },
        "difficulty": "beginner",
        "estimatedMinutes": 60,
        "instructions": [
          "Create 12 failed and 8 successful mock logins.",
          "Count failed attempts by account.",
          "Alert on >= 5 failures within the sample window; note this is just a toy threshold.",
          "Compare one high-volume benign account with a suspicious mock case."
        ],
        "tasks": [
          {
            "id": "task-m03-1",
            "description": "Create 12 failed and 8 successful mock logins."
          },
          {
            "id": "task-m03-2",
            "description": "Count failed attempts by account."
          },
          {
            "id": "task-m03-3",
            "description": "Alert on >= 5 failures within the sample window; note this is just a toy threshold."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "environment_provenance",
            "prompt": "Document your Python version, OS environment, and isolated directory path.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "execution_output",
            "prompt": "Provide terminal output demonstrating successful execution and edge-case handling.",
            "expectedEvidenceType": "Terminal output log"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Threshold matches specification.",
          "No unbounded loop.",
          "Case distinctions explained."
        ]
      }
    },
    {
      "id": "mod-pysec-m04",
      "title": "Module 04: Lists, Dictionaries, Sets & Collections",
      "description": "Foundation phase. Security events and IOCs often arrive as nested collections. 5 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.",
      "order": 4,
      "lessons": [
        {
          "id": "les-pysec-m04-l01",
          "slug": "m04-l1-lists",
          "title": "Module 04 - Lesson 1: Lists",
          "description": "Direct topic demonstration. Store event IDs in a list and filter invalid ones. Verification: Retains original sequence.",
          "youtubeVideoId": "HGOBQPFzWKo",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 04: Lists, Dictionaries, Sets & Collections",
          "objectives": [
            "Store event IDs in a list and filter invalid ones.",
            "Verify implementation: Retains original sequence.",
            "Topic alignment: Direct topic demonstration",
            "Use dictionaries and nested fields.",
            "De-duplicate indicators with sets."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-04",
            "foundation"
          ],
          "skillsTaught": [
            "Lists",
            "Security Python Scripting (Mod 04)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Lists), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Lists",
                "content": "Security events and IOCs often arrive as nested collections.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Store event IDs in a list and filter invalid ones.",
                  "Verification rule: Retains original sequence.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Intermediate Python Programming (chapter starts 00:00:56)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Store event IDs in a list and filter invalid ones.",
                "expectedOutcome": "Retains original sequence."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Retains original sequence.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Security events and IOCs often arrive as nested collections.",
            "furtherReading": [
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              },
              {
                "title": "library: official/reference documentation",
                "url": "https://docs.python.org/3/library/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m04-l02",
          "slug": "m04-l2-dictionaries",
          "title": "Module 04 - Lesson 2: Dictionaries",
          "description": "Direct topic demonstration. Represent one alert with keys time, user, ip and host. Verification: Missing key gets a safe default.",
          "youtubeVideoId": "HGOBQPFzWKo",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 04: Lists, Dictionaries, Sets & Collections",
          "objectives": [
            "Represent one alert with keys time, user, ip and host.",
            "Verify implementation: Missing key gets a safe default.",
            "Topic alignment: Direct topic demonstration",
            "Use dictionaries and nested fields.",
            "De-duplicate indicators with sets."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-04",
            "foundation"
          ],
          "skillsTaught": [
            "Dictionaries",
            "Security Python Scripting (Mod 04)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Dictionaries), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Dictionaries",
                "content": "Security events and IOCs often arrive as nested collections.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Represent one alert with keys time, user, ip and host.",
                  "Verification rule: Missing key gets a safe default.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Intermediate Python Programming (chapter starts 00:29:49)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Represent one alert with keys time, user, ip and host.",
                "expectedOutcome": "Missing key gets a safe default."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Missing key gets a safe default.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Security events and IOCs often arrive as nested collections.",
            "furtherReading": [
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              },
              {
                "title": "library: official/reference documentation",
                "url": "https://docs.python.org/3/library/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m04-l03",
          "slug": "m04-l3-sets",
          "title": "Module 04 - Lesson 3: Sets",
          "description": "Technique bridge to this module\u2019s security lab. De-duplicate synthetic suspicious IP indicators. Verification: Result contains unique values.",
          "youtubeVideoId": "HGOBQPFzWKo",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 04: Lists, Dictionaries, Sets & Collections",
          "objectives": [
            "De-duplicate synthetic suspicious IP indicators.",
            "Verify implementation: Result contains unique values.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Use dictionaries and nested fields.",
            "De-duplicate indicators with sets."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-04",
            "foundation"
          ],
          "skillsTaught": [
            "Sets",
            "Security Python Scripting (Mod 04)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Sets), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Sets",
                "content": "Security events and IOCs often arrive as nested collections.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "De-duplicate synthetic suspicious IP indicators.",
                  "Verification rule: Result contains unique values.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Intermediate Python Programming (chapter starts 00:42:40)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "De-duplicate synthetic suspicious IP indicators.",
                "expectedOutcome": "Result contains unique values."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Result contains unique values.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Security events and IOCs often arrive as nested collections.",
            "furtherReading": [
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              },
              {
                "title": "library: official/reference documentation",
                "url": "https://docs.python.org/3/library/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m04-l04",
          "slug": "m04-l4-collections-and-counter",
          "title": "Module 04 - Lesson 4: Collections and Counter",
          "description": "Technique bridge to this module\u2019s security lab. Use Counter to identify the most frequent mock source addresses. Verification: Counts agree with hand tally.",
          "youtubeVideoId": "HGOBQPFzWKo",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 04: Lists, Dictionaries, Sets & Collections",
          "objectives": [
            "Use Counter to identify the most frequent mock source addresses.",
            "Verify implementation: Counts agree with hand tally.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Use dictionaries and nested fields.",
            "De-duplicate indicators with sets."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-04",
            "foundation"
          ],
          "skillsTaught": [
            "Collections and Counter",
            "Security Python Scripting (Mod 04)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Collections and Counter), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Collections and Counter",
                "content": "Security events and IOCs often arrive as nested collections.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Use Counter to identify the most frequent mock source addresses.",
                  "Verification rule: Counts agree with hand tally.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Intermediate Python Programming (chapter starts 01:22:50)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Use Counter to identify the most frequent mock source addresses.",
                "expectedOutcome": "Counts agree with hand tally."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Counts agree with hand tally.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Security events and IOCs often arrive as nested collections.",
            "furtherReading": [
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              },
              {
                "title": "library: official/reference documentation",
                "url": "https://docs.python.org/3/library/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-pysec-m04",
        "title": "Lab 04: Lists, Dictionaries, Sets & Collections Hands-on Implementation",
        "objective": "Security events and IOCs often arrive as nested collections. Security events and IOCs often arrive as nested collections. Work only with synthetic data from [LAB_DATASETS.md](../04-LAB-DATASETS.md) or an authorized personal VM.",
        "toolsRequired": [
          "Python 3.10+",
          "VS Code / Preferred Editor",
          "Safe Isolated Lab Directory"
        ],
        "pcapSource": {
          "fileName": "synthetic_m04_dataset.json",
          "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/data/synthetic_labs.json"
        },
        "difficulty": "beginner",
        "estimatedMinutes": 60,
        "instructions": [
          "Create 30 synthetic events with duplicate IPs and varying usernames.",
          "Build per-user, per-IP counts and sorted ranking.",
          "Flag malformed records to a separate errors list.",
          "Export a printed summary of unique IPs and top 5 users."
        ],
        "tasks": [
          {
            "id": "task-m04-1",
            "description": "Create 30 synthetic events with duplicate IPs and varying usernames."
          },
          {
            "id": "task-m04-2",
            "description": "Build per-user, per-IP counts and sorted ranking."
          },
          {
            "id": "task-m04-3",
            "description": "Flag malformed records to a separate errors list."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "environment_provenance",
            "prompt": "Document your Python version, OS environment, and isolated directory path.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "execution_output",
            "prompt": "Provide terminal output demonstrating successful execution and edge-case handling.",
            "expectedEvidenceType": "Terminal output log"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Correct counts.",
          "Bad records recorded, not dropped silently.",
          "Order of ranked results deterministic."
        ]
      }
    },
    {
      "id": "mod-pysec-m05",
      "title": "Module 05: Functions, Modules & Reusable Security Code",
      "description": "Foundation phase. Reusable components simplify investigations and reduce copy/paste errors. 5 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.",
      "order": 5,
      "lessons": [
        {
          "id": "les-pysec-m05-l01",
          "slug": "m05-l1-functions-and-parameters",
          "title": "Module 05 - Lesson 1: Functions and parameters",
          "description": "Direct topic demonstration. Create normalize_ip(value) and document accepted inputs. Verification: No print-only return paths.",
          "youtubeVideoId": "KVmbRdwWohY",
          "videoAttribution": {
            "creator": "Hank Hackerson",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 05: Functions, Modules & Reusable Security Code",
          "objectives": [
            "Create normalize_ip(value) and document accepted inputs.",
            "Verify implementation: No print-only return paths.",
            "Topic alignment: Direct topic demonstration",
            "Define reusable functions with input/output contracts.",
            "Separate parsing from detection."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-05",
            "foundation"
          ],
          "skillsTaught": [
            "Functions and parameters",
            "Security Python Scripting (Mod 05)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Functions and parameters), learn defensive programming with video instruction by Hank Hackerson. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Functions and parameters",
                "content": "Reusable components simplify investigations and reduce copy/paste errors.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Create normalize_ip(value) and document accepted inputs.",
                  "Verification rule: No print-only return paths.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Hank Hackerson \u2014 Build Python Algorithms for Cybersecurity (chapter starts 02:07:10)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Create normalize_ip(value) and document accepted inputs.",
                "expectedOutcome": "No print-only return paths."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "No print-only return paths.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Reusable components simplify investigations and reduce copy/paste errors.",
            "furtherReading": [
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              },
              {
                "title": "library: official/reference documentation",
                "url": "https://docs.python.org/3/library/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m05-l02",
          "slug": "m05-l2-security-investigation-functions",
          "title": "Module 05 - Lesson 2: Security investigation functions",
          "description": "Direct topic demonstration. Implement suspicious_login(event, threshold). Verification: Function accepts a synthetic event.",
          "youtubeVideoId": "KVmbRdwWohY",
          "videoAttribution": {
            "creator": "Hank Hackerson",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 05: Functions, Modules & Reusable Security Code",
          "objectives": [
            "Implement suspicious_login(event, threshold).",
            "Verify implementation: Function accepts a synthetic event.",
            "Topic alignment: Direct topic demonstration",
            "Define reusable functions with input/output contracts.",
            "Separate parsing from detection."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-05",
            "foundation"
          ],
          "skillsTaught": [
            "Security investigation functions",
            "Security Python Scripting (Mod 05)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Security investigation functions), learn defensive programming with video instruction by Hank Hackerson. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Security investigation functions",
                "content": "Reusable components simplify investigations and reduce copy/paste errors.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Implement suspicious_login(event, threshold).",
                  "Verification rule: Function accepts a synthetic event.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Hank Hackerson \u2014 Build Python Algorithms for Cybersecurity (chapter starts 02:17:44)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Implement suspicious_login(event, threshold).",
                "expectedOutcome": "Function accepts a synthetic event."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Function accepts a synthetic event.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Reusable components simplify investigations and reduce copy/paste errors.",
            "furtherReading": [
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              },
              {
                "title": "library: official/reference documentation",
                "url": "https://docs.python.org/3/library/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m05-l03",
          "slug": "m05-l3-modules-and-imports",
          "title": "Module 05 - Lesson 3: Modules and imports",
          "description": "Technique bridge to this module\u2019s security lab. Move reusable logic to a separate local module. Verification: Import succeeds from CLI.",
          "youtubeVideoId": "oDOw5tB3Udw",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 05: Functions, Modules & Reusable Security Code",
          "objectives": [
            "Move reusable logic to a separate local module.",
            "Verify implementation: Import succeeds from CLI.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Define reusable functions with input/output contracts.",
            "Separate parsing from detection."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-05",
            "foundation"
          ],
          "skillsTaught": [
            "Modules and imports",
            "Security Python Scripting (Mod 05)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Modules and imports), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Modules and imports",
                "content": "Reusable components simplify investigations and reduce copy/paste errors.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Move reusable logic to a separate local module.",
                  "Verification rule: Import succeeds from CLI.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Python for Beginners with Hands-On Projects (chapter starts 05:13:47)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Move reusable logic to a separate local module.",
                "expectedOutcome": "Import succeeds from CLI."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Import succeeds from CLI.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Reusable components simplify investigations and reduce copy/paste errors.",
            "furtherReading": [
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              },
              {
                "title": "library: official/reference documentation",
                "url": "https://docs.python.org/3/library/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m05-l04",
          "slug": "m05-l4-docstrings-and-type-hints",
          "title": "Module 05 - Lesson 4: Docstrings and type hints",
          "description": "Technique bridge to this module\u2019s security lab. Write a docstring for one parser and define input format. Verification: Docstring describes errors.",
          "youtubeVideoId": "eWRfhZUzrAc",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 05: Functions, Modules & Reusable Security Code",
          "objectives": [
            "Write a docstring for one parser and define input format.",
            "Verify implementation: Docstring describes errors.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Define reusable functions with input/output contracts.",
            "Separate parsing from detection."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-05",
            "foundation"
          ],
          "skillsTaught": [
            "Docstrings and type hints",
            "Security Python Scripting (Mod 05)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Docstrings and type hints), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Docstrings and type hints",
                "content": "Reusable components simplify investigations and reduce copy/paste errors.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Write a docstring for one parser and define input format.",
                  "Verification rule: Docstring describes errors.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Python for Beginners (Beau Carnes) (chapter starts 03:06:45)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Write a docstring for one parser and define input format.",
                "expectedOutcome": "Docstring describes errors."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Docstring describes errors.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Reusable components simplify investigations and reduce copy/paste errors.",
            "furtherReading": [
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              },
              {
                "title": "library: official/reference documentation",
                "url": "https://docs.python.org/3/library/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-pysec-m05",
        "title": "Lab 05: Functions, Modules & Reusable Security Code Hands-on Implementation",
        "objective": "Reusable components simplify investigations and reduce copy/paste errors. Reusable components simplify investigations and reduce copy/paste errors. Work only with synthetic data from [LAB_DATASETS.md](../04-LAB-DATASETS.md) or an authorized personal VM.",
        "toolsRequired": [
          "Python 3.10+",
          "VS Code / Preferred Editor",
          "Safe Isolated Lab Directory"
        ],
        "pcapSource": {
          "fileName": "synthetic_m05_dataset.json",
          "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/data/synthetic_labs.json"
        },
        "difficulty": "beginner",
        "estimatedMinutes": 60,
        "instructions": [
          "Split a single-file detection script into parser, detector and reporting modules.",
          "Ensure the detection function returns data rather than writing files.",
          "Write three sample calls with expected output.",
          "Demonstrate that a malformed event is returned as a documented error."
        ],
        "tasks": [
          {
            "id": "task-m05-1",
            "description": "Split a single-file detection script into parser, detector and reporting modules."
          },
          {
            "id": "task-m05-2",
            "description": "Ensure the detection function returns data rather than writing files."
          },
          {
            "id": "task-m05-3",
            "description": "Write three sample calls with expected output."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "environment_provenance",
            "prompt": "Document your Python version, OS environment, and isolated directory path.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "execution_output",
            "prompt": "Provide terminal output demonstrating successful execution and edge-case handling.",
            "expectedEvidenceType": "Terminal output log"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Separation of concerns.",
          "No unsafe import side effects.",
          "Three example calls work."
        ]
      }
    },
    {
      "id": "mod-pysec-m06",
      "title": "Module 06: Strings, Regular Expressions & IOC Extraction",
      "description": "Foundation phase. Indicator and log text parsing is a daily SOC task. 6 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.",
      "order": 6,
      "lessons": [
        {
          "id": "les-pysec-m06-l01",
          "slug": "m06-l1-string-operations",
          "title": "Module 06 - Lesson 1: String operations",
          "description": "Direct topic demonstration. Trim and normalize mocked email subjects and hostnames. Verification: Whitespace and Unicode examples handled.",
          "youtubeVideoId": "KVmbRdwWohY",
          "videoAttribution": {
            "creator": "Hank Hackerson",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 06: Strings, Regular Expressions & IOC Extraction",
          "objectives": [
            "Trim and normalize mocked email subjects and hostnames.",
            "Verify implementation: Whitespace and Unicode examples handled.",
            "Topic alignment: Direct topic demonstration",
            "Write bounded regex patterns.",
            "Normalize and validate IPs/domains."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-06",
            "foundation"
          ],
          "skillsTaught": [
            "String operations",
            "Security Python Scripting (Mod 06)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (String operations), learn defensive programming with video instruction by Hank Hackerson. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: String operations",
                "content": "Indicator and log text parsing is a daily SOC task.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Trim and normalize mocked email subjects and hostnames.",
                  "Verification rule: Whitespace and Unicode examples handled.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Hank Hackerson \u2014 Build Python Algorithms for Cybersecurity (chapter starts 03:10:23)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Trim and normalize mocked email subjects and hostnames.",
                "expectedOutcome": "Whitespace and Unicode examples handled."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Whitespace and Unicode examples handled.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Indicator and log text parsing is a daily SOC task.",
            "furtherReading": [
              {
                "title": "regex: official/reference documentation",
                "url": "https://docs.python.org/3/library/re.html"
              },
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              },
              {
                "title": "urlparse: official/reference documentation",
                "url": "https://docs.python.org/3/library/urllib.parse.html"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m06-l02",
          "slug": "m06-l2-finding-suspicious-urls",
          "title": "Module 06 - Lesson 2: Finding suspicious URLs",
          "description": "Direct topic demonstration. Extract URLs from synthetic incident notes. Verification: No URLs requested or visited.",
          "youtubeVideoId": "KVmbRdwWohY",
          "videoAttribution": {
            "creator": "Hank Hackerson",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 06: Strings, Regular Expressions & IOC Extraction",
          "objectives": [
            "Extract URLs from synthetic incident notes.",
            "Verify implementation: No URLs requested or visited.",
            "Topic alignment: Direct topic demonstration",
            "Write bounded regex patterns.",
            "Normalize and validate IPs/domains."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-06",
            "foundation"
          ],
          "skillsTaught": [
            "Finding suspicious URLs",
            "Security Python Scripting (Mod 06)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Finding suspicious URLs), learn defensive programming with video instruction by Hank Hackerson. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Finding suspicious URLs",
                "content": "Indicator and log text parsing is a daily SOC task.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Extract URLs from synthetic incident notes.",
                  "Verification rule: No URLs requested or visited.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Hank Hackerson \u2014 Build Python Algorithms for Cybersecurity (chapter starts 03:37:31)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Extract URLs from synthetic incident notes.",
                "expectedOutcome": "No URLs requested or visited."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "No URLs requested or visited.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Indicator and log text parsing is a daily SOC task.",
            "furtherReading": [
              {
                "title": "regex: official/reference documentation",
                "url": "https://docs.python.org/3/library/re.html"
              },
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              },
              {
                "title": "urlparse: official/reference documentation",
                "url": "https://docs.python.org/3/library/urllib.parse.html"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m06-l03",
          "slug": "m06-l3-regex-essentials",
          "title": "Module 06 - Lesson 3: Regex essentials",
          "description": "Direct topic demonstration. Write a basic date/IP-shaped pattern and discuss validation. Verification: Pattern finds all target examples.",
          "youtubeVideoId": "KVmbRdwWohY",
          "videoAttribution": {
            "creator": "Hank Hackerson",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 06: Strings, Regular Expressions & IOC Extraction",
          "objectives": [
            "Write a basic date/IP-shaped pattern and discuss validation.",
            "Verify implementation: Pattern finds all target examples.",
            "Topic alignment: Direct topic demonstration",
            "Write bounded regex patterns.",
            "Normalize and validate IPs/domains."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-06",
            "foundation"
          ],
          "skillsTaught": [
            "Regex essentials",
            "Security Python Scripting (Mod 06)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Regex essentials), learn defensive programming with video instruction by Hank Hackerson. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Regex essentials",
                "content": "Indicator and log text parsing is a daily SOC task.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Write a basic date/IP-shaped pattern and discuss validation.",
                  "Verification rule: Pattern finds all target examples.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Hank Hackerson \u2014 Build Python Algorithms for Cybersecurity (chapter starts 04:16:13)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Write a basic date/IP-shaped pattern and discuss validation.",
                "expectedOutcome": "Pattern finds all target examples."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Pattern finds all target examples.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Indicator and log text parsing is a daily SOC task.",
            "furtherReading": [
              {
                "title": "regex: official/reference documentation",
                "url": "https://docs.python.org/3/library/re.html"
              },
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              },
              {
                "title": "urlparse: official/reference documentation",
                "url": "https://docs.python.org/3/library/urllib.parse.html"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m06-l04",
          "slug": "m06-l4-regex-log-and-ip-extraction",
          "title": "Module 06 - Lesson 4: Regex log and IP extraction",
          "description": "Direct topic demonstration. Extract IP-looking tokens then validate with ipaddress. Verification: Malformed values excluded.",
          "youtubeVideoId": "KVmbRdwWohY",
          "videoAttribution": {
            "creator": "Hank Hackerson",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 06: Strings, Regular Expressions & IOC Extraction",
          "objectives": [
            "Extract IP-looking tokens then validate with ipaddress.",
            "Verify implementation: Malformed values excluded.",
            "Topic alignment: Direct topic demonstration",
            "Write bounded regex patterns.",
            "Normalize and validate IPs/domains."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-06",
            "foundation"
          ],
          "skillsTaught": [
            "Regex log and IP extraction",
            "Security Python Scripting (Mod 06)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Regex log and IP extraction), learn defensive programming with video instruction by Hank Hackerson. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Regex log and IP extraction",
                "content": "Indicator and log text parsing is a daily SOC task.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Extract IP-looking tokens then validate with ipaddress.",
                  "Verification rule: Malformed values excluded.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Hank Hackerson \u2014 Build Python Algorithms for Cybersecurity (chapter starts 04:52:55)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Extract IP-looking tokens then validate with ipaddress.",
                "expectedOutcome": "Malformed values excluded."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Malformed values excluded.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Indicator and log text parsing is a daily SOC task.",
            "furtherReading": [
              {
                "title": "regex: official/reference documentation",
                "url": "https://docs.python.org/3/library/re.html"
              },
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              },
              {
                "title": "urlparse: official/reference documentation",
                "url": "https://docs.python.org/3/library/urllib.parse.html"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-pysec-m06",
        "title": "Lab 06: Strings, Regular Expressions & IOC Extraction Hands-on Implementation",
        "objective": "Indicator and log text parsing is a daily SOC task. Indicator and log text parsing is a daily SOC task. Work only with synthetic data from [LAB_DATASETS.md](../04-LAB-DATASETS.md) or an authorized personal VM.",
        "toolsRequired": [
          "Python 3.10+",
          "VS Code / Preferred Editor",
          "Safe Isolated Lab Directory"
        ],
        "pcapSource": {
          "fileName": "synthetic_m06_dataset.json",
          "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/data/synthetic_labs.json"
        },
        "difficulty": "beginner",
        "estimatedMinutes": 60,
        "instructions": [
          "Use LAB_DATASETS.md authentication events and email text.",
          "Extract candidate domains, email addresses and IP addresses using regex.",
          "Validate IPs using ipaddress rather than regex alone.",
          "Write matched indicators to a deterministic sorted output."
        ],
        "tasks": [
          {
            "id": "task-m06-1",
            "description": "Use LAB_DATASETS.md authentication events and email text."
          },
          {
            "id": "task-m06-2",
            "description": "Extract candidate domains, email addresses and IP addresses using regex."
          },
          {
            "id": "task-m06-3",
            "description": "Validate IPs using ipaddress rather than regex alone."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "environment_provenance",
            "prompt": "Document your Python version, OS environment, and isolated directory path.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "execution_output",
            "prompt": "Provide terminal output demonstrating successful execution and edge-case handling.",
            "expectedEvidenceType": "Terminal output log"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "No external HTTP requests.",
          "Malformed addresses excluded.",
          "Regex handles no-match safely."
        ]
      }
    },
    {
      "id": "mod-pysec-m07",
      "title": "Module 07: Files, CSV, JSON & Evidence Handling",
      "description": "Foundation phase. SOC scripts must read and preserve evidence without corrupting it. 6 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.",
      "order": 7,
      "lessons": [
        {
          "id": "les-pysec-m07-l01",
          "slug": "m07-l1-read-text-files",
          "title": "Module 07 - Lesson 1: Read text files",
          "description": "Direct topic demonstration. Read a sample access log line-by-line. Verification: No hidden line truncation.",
          "youtubeVideoId": "KVmbRdwWohY",
          "videoAttribution": {
            "creator": "Hank Hackerson",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 07: Files, CSV, JSON & Evidence Handling",
          "objectives": [
            "Read a sample access log line-by-line.",
            "Verify implementation: No hidden line truncation.",
            "Topic alignment: Direct topic demonstration",
            "Read text files safely with encoding.",
            "Parse JSON/CSV with schema checks."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-07",
            "foundation"
          ],
          "skillsTaught": [
            "Read text files",
            "Security Python Scripting (Mod 07)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Read text files), learn defensive programming with video instruction by Hank Hackerson. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Read text files",
                "content": "SOC scripts must read and preserve evidence without corrupting it.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Read a sample access log line-by-line.",
                  "Verification rule: No hidden line truncation.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Hank Hackerson \u2014 Build Python Algorithms for Cybersecurity (chapter starts 05:07:18)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Read a sample access log line-by-line.",
                "expectedOutcome": "No hidden line truncation."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "No hidden line truncation.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. SOC scripts must read and preserve evidence without corrupting it.",
            "furtherReading": [
              {
                "title": "csv: official/reference documentation",
                "url": "https://docs.python.org/3/library/csv.html"
              },
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              },
              {
                "title": "pathlib: official/reference documentation",
                "url": "https://docs.python.org/3/library/pathlib.html"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m07-l02",
          "slug": "m07-l2-parse-file-records",
          "title": "Module 07 - Lesson 2: Parse file records",
          "description": "Direct topic demonstration. Split tabular synthetic events and validate field counts. Verification: Bad rows reported.",
          "youtubeVideoId": "KVmbRdwWohY",
          "videoAttribution": {
            "creator": "Hank Hackerson",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 07: Files, CSV, JSON & Evidence Handling",
          "objectives": [
            "Split tabular synthetic events and validate field counts.",
            "Verify implementation: Bad rows reported.",
            "Topic alignment: Direct topic demonstration",
            "Read text files safely with encoding.",
            "Parse JSON/CSV with schema checks."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-07",
            "foundation"
          ],
          "skillsTaught": [
            "Parse file records",
            "Security Python Scripting (Mod 07)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Parse file records), learn defensive programming with video instruction by Hank Hackerson. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Parse file records",
                "content": "SOC scripts must read and preserve evidence without corrupting it.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Split tabular synthetic events and validate field counts.",
                  "Verification rule: Bad rows reported.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Hank Hackerson \u2014 Build Python Algorithms for Cybersecurity (chapter starts 05:24:16)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Split tabular synthetic events and validate field counts.",
                "expectedOutcome": "Bad rows reported."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Bad rows reported.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. SOC scripts must read and preserve evidence without corrupting it.",
            "furtherReading": [
              {
                "title": "csv: official/reference documentation",
                "url": "https://docs.python.org/3/library/csv.html"
              },
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              },
              {
                "title": "pathlib: official/reference documentation",
                "url": "https://docs.python.org/3/library/pathlib.html"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m07-l03",
          "slug": "m07-l3-json-objects",
          "title": "Module 07 - Lesson 3: JSON objects",
          "description": "Technique bridge to this module\u2019s security lab. Load and serialize nested event dictionaries. Verification: Round-trip keeps fields.",
          "youtubeVideoId": "HGOBQPFzWKo",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 07: Files, CSV, JSON & Evidence Handling",
          "objectives": [
            "Load and serialize nested event dictionaries.",
            "Verify implementation: Round-trip keeps fields.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Read text files safely with encoding.",
            "Parse JSON/CSV with schema checks."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-07",
            "foundation"
          ],
          "skillsTaught": [
            "JSON objects",
            "Security Python Scripting (Mod 07)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (JSON objects), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: JSON objects",
                "content": "SOC scripts must read and preserve evidence without corrupting it.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Load and serialize nested event dictionaries.",
                  "Verification rule: Round-trip keeps fields.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Intermediate Python Programming (chapter starts 02:42:20)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Load and serialize nested event dictionaries.",
                "expectedOutcome": "Round-trip keeps fields."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Round-trip keeps fields.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. SOC scripts must read and preserve evidence without corrupting it.",
            "furtherReading": [
              {
                "title": "csv: official/reference documentation",
                "url": "https://docs.python.org/3/library/csv.html"
              },
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              },
              {
                "title": "pathlib: official/reference documentation",
                "url": "https://docs.python.org/3/library/pathlib.html"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m07-l04",
          "slug": "m07-l4-safe-file-writes-and-context-managers",
          "title": "Module 07 - Lesson 4: Safe file writes and context managers",
          "description": "Technique bridge to this module\u2019s security lab. Use with-open, output directory and UTF-8. Verification: File handles close after execution.",
          "youtubeVideoId": "eWRfhZUzrAc",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 07: Files, CSV, JSON & Evidence Handling",
          "objectives": [
            "Use with-open, output directory and UTF-8.",
            "Verify implementation: File handles close after execution.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Read text files safely with encoding.",
            "Parse JSON/CSV with schema checks."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-07",
            "foundation"
          ],
          "skillsTaught": [
            "Safe file writes and context managers",
            "Security Python Scripting (Mod 07)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Safe file writes and context managers), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Safe file writes and context managers",
                "content": "SOC scripts must read and preserve evidence without corrupting it.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Use with-open, output directory and UTF-8.",
                  "Verification rule: File handles close after execution.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Python for Beginners (Beau Carnes) (chapter starts 03:17:09)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Use with-open, output directory and UTF-8.",
                "expectedOutcome": "File handles close after execution."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "File handles close after execution.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. SOC scripts must read and preserve evidence without corrupting it.",
            "furtherReading": [
              {
                "title": "csv: official/reference documentation",
                "url": "https://docs.python.org/3/library/csv.html"
              },
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              },
              {
                "title": "pathlib: official/reference documentation",
                "url": "https://docs.python.org/3/library/pathlib.html"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-pysec-m07",
        "title": "Lab 07: Files, CSV, JSON & Evidence Handling Hands-on Implementation",
        "objective": "SOC scripts must read and preserve evidence without corrupting it. SOC scripts must read and preserve evidence without corrupting it. Work only with synthetic data from [LAB_DATASETS.md](../04-LAB-DATASETS.md) or an authorized personal VM.",
        "toolsRequired": [
          "Python 3.10+",
          "VS Code / Preferred Editor",
          "Safe Isolated Lab Directory"
        ],
        "pcapSource": {
          "fileName": "synthetic_m07_dataset.json",
          "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/data/synthetic_labs.json"
        },
        "difficulty": "beginner",
        "estimatedMinutes": 60,
        "instructions": [
          "Copy sample JSON and CSV from LAB_DATASETS.md into the isolated workspace.",
          "Parse files into normalized records with explicit timezone metadata.",
          "Preserve source originals; write all derived output to output/.",
          "Create a manifest with filenames and SHA-256 of inputs."
        ],
        "tasks": [
          {
            "id": "task-m07-1",
            "description": "Copy sample JSON and CSV from LAB_DATASETS.md into the isolated workspace."
          },
          {
            "id": "task-m07-2",
            "description": "Parse files into normalized records with explicit timezone metadata."
          },
          {
            "id": "task-m07-3",
            "description": "Preserve source originals; write all derived output to output/."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "environment_provenance",
            "prompt": "Document your Python version, OS environment, and isolated directory path.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "execution_output",
            "prompt": "Provide terminal output demonstrating successful execution and edge-case handling.",
            "expectedEvidenceType": "Terminal output log"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Input files unchanged.",
          "JSON can be parsed again.",
          "Malformed rows retained in error report."
        ]
      }
    },
    {
      "id": "mod-pysec-m08",
      "title": "Module 08: Exceptions, Logging & Troubleshooting",
      "description": "Foundation phase. Security monitoring pipelines must fail visibly rather than silently. 5 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.",
      "order": 8,
      "lessons": [
        {
          "id": "les-pysec-m08-l01",
          "slug": "m08-l1-exceptions",
          "title": "Module 08 - Lesson 1: Exceptions",
          "description": "Direct topic demonstration. Handle missing files and malformed JSON separately. Verification: Program exits with clear message.",
          "youtubeVideoId": "HGOBQPFzWKo",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 08: Exceptions, Logging & Troubleshooting",
          "objectives": [
            "Handle missing files and malformed JSON separately.",
            "Verify implementation: Program exits with clear message.",
            "Topic alignment: Direct topic demonstration",
            "Handle predictable exceptions.",
            "Use structured application logs."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-08",
            "foundation"
          ],
          "skillsTaught": [
            "Exceptions",
            "Security Python Scripting (Mod 08)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Exceptions), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Exceptions",
                "content": "Security monitoring pipelines must fail visibly rather than silently.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Handle missing files and malformed JSON separately.",
                  "Verification rule: Program exits with clear message.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Intermediate Python Programming (chapter starts 02:04:03)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Handle missing files and malformed JSON separately.",
                "expectedOutcome": "Program exits with clear message."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Program exits with clear message.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Security monitoring pipelines must fail visibly rather than silently.",
            "furtherReading": [
              {
                "title": "logging: official/reference documentation",
                "url": "https://docs.python.org/3/library/logging.html"
              },
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              },
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m08-l02",
          "slug": "m08-l2-logging",
          "title": "Module 08 - Lesson 2: Logging",
          "description": "Direct topic demonstration. Create INFO, WARNING and ERROR events with a run ID. Verification: Passwords never appear in logs.",
          "youtubeVideoId": "HGOBQPFzWKo",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 08: Exceptions, Logging & Troubleshooting",
          "objectives": [
            "Create INFO, WARNING and ERROR events with a run ID.",
            "Verify implementation: Passwords never appear in logs.",
            "Topic alignment: Direct topic demonstration",
            "Handle predictable exceptions.",
            "Use structured application logs."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-08",
            "foundation"
          ],
          "skillsTaught": [
            "Logging",
            "Security Python Scripting (Mod 08)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Logging), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Logging",
                "content": "Security monitoring pipelines must fail visibly rather than silently.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Create INFO, WARNING and ERROR events with a run ID.",
                  "Verification rule: Passwords never appear in logs.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Intermediate Python Programming (chapter starts 02:20:10)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Create INFO, WARNING and ERROR events with a run ID.",
                "expectedOutcome": "Passwords never appear in logs."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Passwords never appear in logs.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Security monitoring pipelines must fail visibly rather than silently.",
            "furtherReading": [
              {
                "title": "logging: official/reference documentation",
                "url": "https://docs.python.org/3/library/logging.html"
              },
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              },
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m08-l03",
          "slug": "m08-l3-file-write-failures",
          "title": "Module 08 - Lesson 3: File write failures",
          "description": "Technique bridge to this module\u2019s security lab. Catch and report I/O exceptions. Verification: Error case returns nonzero exit status.",
          "youtubeVideoId": "oDOw5tB3Udw",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 08: Exceptions, Logging & Troubleshooting",
          "objectives": [
            "Catch and report I/O exceptions.",
            "Verify implementation: Error case returns nonzero exit status.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Handle predictable exceptions.",
            "Use structured application logs."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-08",
            "foundation"
          ],
          "skillsTaught": [
            "File write failures",
            "Security Python Scripting (Mod 08)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (File write failures), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: File write failures",
                "content": "Security monitoring pipelines must fail visibly rather than silently.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Catch and report I/O exceptions.",
                  "Verification rule: Error case returns nonzero exit status.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Python for Beginners with Hands-On Projects (chapter starts 06:27:58)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Catch and report I/O exceptions.",
                "expectedOutcome": "Error case returns nonzero exit status."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Error case returns nonzero exit status.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Security monitoring pipelines must fail visibly rather than silently.",
            "furtherReading": [
              {
                "title": "logging: official/reference documentation",
                "url": "https://docs.python.org/3/library/logging.html"
              },
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              },
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m08-l04",
          "slug": "m08-l4-debugging-practice",
          "title": "Module 08 - Lesson 4: Debugging practice",
          "description": "Technique bridge to this module\u2019s security lab. Trigger and fix a KeyError using a malformed synthetic record. Verification: Bug and fix documented.",
          "youtubeVideoId": "eWRfhZUzrAc",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 08: Exceptions, Logging & Troubleshooting",
          "objectives": [
            "Trigger and fix a KeyError using a malformed synthetic record.",
            "Verify implementation: Bug and fix documented.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Handle predictable exceptions.",
            "Use structured application logs."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-08",
            "foundation"
          ],
          "skillsTaught": [
            "Debugging practice",
            "Security Python Scripting (Mod 08)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Debugging practice), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Debugging practice",
                "content": "Security monitoring pipelines must fail visibly rather than silently.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Trigger and fix a KeyError using a malformed synthetic record.",
                  "Verification rule: Bug and fix documented.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Python for Beginners (Beau Carnes) (chapter starts 03:11:30)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Trigger and fix a KeyError using a malformed synthetic record.",
                "expectedOutcome": "Bug and fix documented."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Bug and fix documented.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Security monitoring pipelines must fail visibly rather than silently.",
            "furtherReading": [
              {
                "title": "logging: official/reference documentation",
                "url": "https://docs.python.org/3/library/logging.html"
              },
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              },
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-pysec-m08",
        "title": "Lab 08: Exceptions, Logging & Troubleshooting Hands-on Implementation",
        "objective": "Security monitoring pipelines must fail visibly rather than silently. Security monitoring pipelines must fail visibly rather than silently. Work only with synthetic data from [LAB_DATASETS.md](../04-LAB-DATASETS.md) or an authorized personal VM.",
        "toolsRequired": [
          "Python 3.10+",
          "VS Code / Preferred Editor",
          "Safe Isolated Lab Directory"
        ],
        "pcapSource": {
          "fileName": "synthetic_m08_dataset.json",
          "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/data/synthetic_labs.json"
        },
        "difficulty": "beginner",
        "estimatedMinutes": 60,
        "instructions": [
          "Extend a prior parser with validation and error logging.",
          "Feed a missing file, empty file, malformed JSON and well-formed file.",
          "Ensure errors do not produce false safe status.",
          "Compare console output with a persistent diagnostic log."
        ],
        "tasks": [
          {
            "id": "task-m08-1",
            "description": "Extend a prior parser with validation and error logging."
          },
          {
            "id": "task-m08-2",
            "description": "Feed a missing file, empty file, malformed JSON and well-formed file."
          },
          {
            "id": "task-m08-3",
            "description": "Ensure errors do not produce false safe status."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "environment_provenance",
            "prompt": "Document your Python version, OS environment, and isolated directory path.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "execution_output",
            "prompt": "Provide terminal output demonstrating successful execution and edge-case handling.",
            "expectedEvidenceType": "Terminal output log"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Errors labeled clearly.",
          "Sensitive fields redacted.",
          "Success/failure exit codes distinguishable."
        ]
      }
    },
    {
      "id": "mod-pysec-m09",
      "title": "Module 09: Environments, Packages & Dependency Safety",
      "description": "Foundation phase. Security automation tools depend on a traceable and controlled Python environment. 4 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.",
      "order": 9,
      "lessons": [
        {
          "id": "les-pysec-m09-l01",
          "slug": "m09-l1-creating-a-virtual-environment",
          "title": "Module 09 - Lesson 1: Creating a virtual environment",
          "description": "Direct topic demonstration. Create .venv in a clean local folder. Verification: python points to venv interpreter.",
          "youtubeVideoId": "0sOvCWFmrtA",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 09: Environments, Packages & Dependency Safety",
          "objectives": [
            "Create .venv in a clean local folder.",
            "Verify implementation: python points to venv interpreter.",
            "Topic alignment: Direct topic demonstration",
            "Create per-project virtual environments.",
            "Review package sources and versions."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-09",
            "foundation"
          ],
          "skillsTaught": [
            "Creating a virtual environment",
            "Security Python Scripting (Mod 09)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Creating a virtual environment), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Creating a virtual environment",
                "content": "Security automation tools depend on a traceable and controlled Python environment.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Create .venv in a clean local folder.",
                  "Verification rule: python points to venv interpreter.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Python API Development (FastAPI) (chapter starts 00:22:11)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Create .venv in a clean local folder.",
                "expectedOutcome": "python points to venv interpreter."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "python points to venv interpreter.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Security automation tools depend on a traceable and controlled Python environment.",
            "furtherReading": [
              {
                "title": "venv: official/reference documentation",
                "url": "https://docs.python.org/3/library/venv.html"
              },
              {
                "title": "pip: official/reference documentation",
                "url": "https://pip.pypa.io/en/stable/"
              },
              {
                "title": "packaging: official/reference documentation",
                "url": "https://packaging.python.org/en/latest/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m09-l02",
          "slug": "m09-l2-package-manager-pip",
          "title": "Module 09 - Lesson 2: Package manager pip",
          "description": "Direct topic demonstration. List packages and check direct dependencies. Verification: pip list produces expected set.",
          "youtubeVideoId": "oDOw5tB3Udw",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 09: Environments, Packages & Dependency Safety",
          "objectives": [
            "List packages and check direct dependencies.",
            "Verify implementation: pip list produces expected set.",
            "Topic alignment: Direct topic demonstration",
            "Create per-project virtual environments.",
            "Review package sources and versions."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-09",
            "foundation"
          ],
          "skillsTaught": [
            "Package manager pip",
            "Security Python Scripting (Mod 09)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Package manager pip), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Package manager pip",
                "content": "Security automation tools depend on a traceable and controlled Python environment.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "List packages and check direct dependencies.",
                  "Verification rule: pip list produces expected set.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Python for Beginners with Hands-On Projects (chapter starts 05:41:02)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "List packages and check direct dependencies.",
                "expectedOutcome": "pip list produces expected set."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "pip list produces expected set.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Security automation tools depend on a traceable and controlled Python environment.",
            "furtherReading": [
              {
                "title": "venv: official/reference documentation",
                "url": "https://docs.python.org/3/library/venv.html"
              },
              {
                "title": "pip: official/reference documentation",
                "url": "https://pip.pypa.io/en/stable/"
              },
              {
                "title": "packaging: official/reference documentation",
                "url": "https://packaging.python.org/en/latest/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m09-l03",
          "slug": "m09-l3-installing-pinned-libraries",
          "title": "Module 09 - Lesson 3: Installing pinned libraries",
          "description": "Technique bridge to this module\u2019s security lab. Install from official package indexes after reviewing package names. Verification: requirements pin current tested versions.",
          "youtubeVideoId": "0sOvCWFmrtA",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 09: Environments, Packages & Dependency Safety",
          "objectives": [
            "Install from official package indexes after reviewing package names.",
            "Verify implementation: requirements pin current tested versions.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Create per-project virtual environments.",
            "Review package sources and versions."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-09",
            "foundation"
          ],
          "skillsTaught": [
            "Installing pinned libraries",
            "Security Python Scripting (Mod 09)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Installing pinned libraries), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Installing pinned libraries",
                "content": "Security automation tools depend on a traceable and controlled Python environment.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Install from official package indexes after reviewing package names.",
                  "Verification rule: requirements pin current tested versions.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Python API Development (FastAPI) (chapter starts 00:34:17)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Install from official package indexes after reviewing package names.",
                "expectedOutcome": "requirements pin current tested versions."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "requirements pin current tested versions.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Security automation tools depend on a traceable and controlled Python environment.",
            "furtherReading": [
              {
                "title": "venv: official/reference documentation",
                "url": "https://docs.python.org/3/library/venv.html"
              },
              {
                "title": "pip: official/reference documentation",
                "url": "https://pip.pypa.io/en/stable/"
              },
              {
                "title": "packaging: official/reference documentation",
                "url": "https://packaging.python.org/en/latest/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m09-l04",
          "slug": "m09-l4-hash-checks-and-cryptographic-context",
          "title": "Module 09 - Lesson 4: Hash checks and cryptographic context",
          "description": "Technique bridge to this module\u2019s security lab. Explain why reproducible installs matter to evidence workflows. Verification: Threat model includes dependency compromise.",
          "youtubeVideoId": "kb_scuDUHls",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 09: Environments, Packages & Dependency Safety",
          "objectives": [
            "Explain why reproducible installs matter to evidence workflows.",
            "Verify implementation: Threat model includes dependency compromise.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Create per-project virtual environments.",
            "Review package sources and versions."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-09",
            "foundation"
          ],
          "skillsTaught": [
            "Hash checks and cryptographic context",
            "Security Python Scripting (Mod 09)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Hash checks and cryptographic context), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Hash checks and cryptographic context",
                "content": "Security automation tools depend on a traceable and controlled Python environment.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Explain why reproducible installs matter to evidence workflows.",
                  "Verification rule: Threat model includes dependency compromise.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Cryptography with Python (chapter starts 00:10:40)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Explain why reproducible installs matter to evidence workflows.",
                "expectedOutcome": "Threat model includes dependency compromise."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Threat model includes dependency compromise.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Security automation tools depend on a traceable and controlled Python environment.",
            "furtherReading": [
              {
                "title": "venv: official/reference documentation",
                "url": "https://docs.python.org/3/library/venv.html"
              },
              {
                "title": "pip: official/reference documentation",
                "url": "https://pip.pypa.io/en/stable/"
              },
              {
                "title": "packaging: official/reference documentation",
                "url": "https://packaging.python.org/en/latest/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-pysec-m09",
        "title": "Lab 09: Environments, Packages & Dependency Safety Hands-on Implementation",
        "objective": "Security automation tools depend on a traceable and controlled Python environment. Security automation tools depend on a traceable and controlled Python environment. Work only with synthetic data from [LAB_DATASETS.md](../04-LAB-DATASETS.md) or an authorized personal VM.",
        "toolsRequired": [
          "Python 3.10+",
          "VS Code / Preferred Editor",
          "Safe Isolated Lab Directory"
        ],
        "pcapSource": {
          "fileName": "synthetic_m09_dataset.json",
          "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/data/synthetic_labs.json"
        },
        "difficulty": "beginner",
        "estimatedMinutes": 60,
        "instructions": [
          "Create a fresh virtual environment.",
          "Install a small reviewed dependency set; avoid downloading unknown scripts.",
          "Export an environment snapshot and reproduce it in a second venv.",
          "Explain the difference between pinning package versions and trusting code."
        ],
        "tasks": [
          {
            "id": "task-m09-1",
            "description": "Create a fresh virtual environment."
          },
          {
            "id": "task-m09-2",
            "description": "Install a small reviewed dependency set; avoid downloading unknown scripts."
          },
          {
            "id": "task-m09-3",
            "description": "Export an environment snapshot and reproduce it in a second venv."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "environment_provenance",
            "prompt": "Document your Python version, OS environment, and isolated directory path.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "execution_output",
            "prompt": "Provide terminal output demonstrating successful execution and edge-case handling.",
            "expectedEvidenceType": "Terminal output log"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "No credentials committed.",
          "Third-party names reviewed.",
          "Second environment reproduces import check."
        ]
      }
    },
    {
      "id": "mod-pysec-m10",
      "title": "Module 10: Classes, Data Classes & Automated Unit Tests",
      "description": "Foundation phase. Maintainable security tooling benefits from clear event objects and tests. 6 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.",
      "order": 10,
      "lessons": [
        {
          "id": "les-pysec-m10-l01",
          "slug": "m10-l1-objects-and-classes",
          "title": "Module 10 - Lesson 1: Objects and classes",
          "description": "Direct topic demonstration. Define an Alert with attributes and readable output. Verification: Instances retain independent state.",
          "youtubeVideoId": "eWRfhZUzrAc",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 10: Classes, Data Classes & Automated Unit Tests",
          "objectives": [
            "Define an Alert with attributes and readable output.",
            "Verify implementation: Instances retain independent state.",
            "Topic alignment: Direct topic demonstration",
            "Model an event as a class or dataclass.",
            "Write unit tests for parsers and detectors."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-10",
            "foundation"
          ],
          "skillsTaught": [
            "Objects and classes",
            "Security Python Scripting (Mod 10)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Objects and classes), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Objects and classes",
                "content": "Maintainable security tooling benefits from clear event objects and tests.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Define an Alert with attributes and readable output.",
                  "Verification rule: Instances retain independent state.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Python for Beginners (Beau Carnes) (chapter starts 02:33:02)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Define an Alert with attributes and readable output.",
                "expectedOutcome": "Instances retain independent state."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Instances retain independent state.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Maintainable security tooling benefits from clear event objects and tests.",
            "furtherReading": [
              {
                "title": "pytest: official/reference documentation",
                "url": "https://docs.pytest.org/en/stable/"
              },
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m10-l02",
          "slug": "m10-l2-first-pytest-tests",
          "title": "Module 10 - Lesson 2: First pytest tests",
          "description": "Direct topic demonstration. Test a normal event and malformed input. Verification: pytest reports expected result.",
          "youtubeVideoId": "cHYq1MRoyI0",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 10: Classes, Data Classes & Automated Unit Tests",
          "objectives": [
            "Test a normal event and malformed input.",
            "Verify implementation: pytest reports expected result.",
            "Topic alignment: Direct topic demonstration",
            "Model an event as a class or dataclass.",
            "Write unit tests for parsers and detectors."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-10",
            "foundation"
          ],
          "skillsTaught": [
            "First pytest tests",
            "Security Python Scripting (Mod 10)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (First pytest tests), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: First pytest tests",
                "content": "Maintainable security tooling benefits from clear event objects and tests.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Test a normal event and malformed input.",
                  "Verification rule: pytest reports expected result.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Pytest Tutorial (chapter starts 00:06:06)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Test a normal event and malformed input.",
                "expectedOutcome": "pytest reports expected result."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "pytest reports expected result.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Maintainable security tooling benefits from clear event objects and tests.",
            "furtherReading": [
              {
                "title": "pytest: official/reference documentation",
                "url": "https://docs.pytest.org/en/stable/"
              },
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m10-l03",
          "slug": "m10-l3-parameterized-tests",
          "title": "Module 10 - Lesson 3: Parameterized tests",
          "description": "Technique bridge to this module\u2019s security lab. Test 6 threshold boundary values. Verification: All boundary cases covered.",
          "youtubeVideoId": "cHYq1MRoyI0",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 10: Classes, Data Classes & Automated Unit Tests",
          "objectives": [
            "Test 6 threshold boundary values.",
            "Verify implementation: All boundary cases covered.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Model an event as a class or dataclass.",
            "Write unit tests for parsers and detectors."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-10",
            "foundation"
          ],
          "skillsTaught": [
            "Parameterized tests",
            "Security Python Scripting (Mod 10)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Parameterized tests), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Parameterized tests",
                "content": "Maintainable security tooling benefits from clear event objects and tests.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Test 6 threshold boundary values.",
                  "Verification rule: All boundary cases covered.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Pytest Tutorial (chapter starts 00:41:10)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Test 6 threshold boundary values.",
                "expectedOutcome": "All boundary cases covered."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "All boundary cases covered.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Maintainable security tooling benefits from clear event objects and tests.",
            "furtherReading": [
              {
                "title": "pytest: official/reference documentation",
                "url": "https://docs.pytest.org/en/stable/"
              },
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m10-l04",
          "slug": "m10-l4-mocking-external-inputs",
          "title": "Module 10 - Lesson 4: Mocking external inputs",
          "description": "Technique bridge to this module\u2019s security lab. Mock an API function so no network access occurs. Verification: Tests run fully offline.",
          "youtubeVideoId": "cHYq1MRoyI0",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 10: Classes, Data Classes & Automated Unit Tests",
          "objectives": [
            "Mock an API function so no network access occurs.",
            "Verify implementation: Tests run fully offline.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Model an event as a class or dataclass.",
            "Write unit tests for parsers and detectors."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-10",
            "foundation"
          ],
          "skillsTaught": [
            "Mocking external inputs",
            "Security Python Scripting (Mod 10)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Mocking external inputs), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Mocking external inputs",
                "content": "Maintainable security tooling benefits from clear event objects and tests.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Mock an API function so no network access occurs.",
                  "Verification rule: Tests run fully offline.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Pytest Tutorial (chapter starts 00:55:24)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Mock an API function so no network access occurs.",
                "expectedOutcome": "Tests run fully offline."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Tests run fully offline.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Maintainable security tooling benefits from clear event objects and tests.",
            "furtherReading": [
              {
                "title": "pytest: official/reference documentation",
                "url": "https://docs.pytest.org/en/stable/"
              },
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-pysec-m10",
        "title": "Lab 10: Classes, Data Classes & Automated Unit Tests Hands-on Implementation",
        "objective": "Maintainable security tooling benefits from clear event objects and tests. Maintainable security tooling benefits from clear event objects and tests. Work only with synthetic data from [LAB_DATASETS.md](../04-LAB-DATASETS.md) or an authorized personal VM.",
        "toolsRequired": [
          "Python 3.10+",
          "VS Code / Preferred Editor",
          "Safe Isolated Lab Directory"
        ],
        "pcapSource": {
          "fileName": "synthetic_m10_dataset.json",
          "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/data/synthetic_labs.json"
        },
        "difficulty": "beginner",
        "estimatedMinutes": 60,
        "instructions": [
          "Refactor the event parser into a typed event model.",
          "Implement 10 unit tests including nulls, invalid timestamps and duplicate IDs.",
          "Run pytest in the virtual environment.",
          "Write a short evidence table pairing each test with a requirement."
        ],
        "tasks": [
          {
            "id": "task-m10-1",
            "description": "Refactor the event parser into a typed event model."
          },
          {
            "id": "task-m10-2",
            "description": "Implement 10 unit tests including nulls, invalid timestamps and duplicate IDs."
          },
          {
            "id": "task-m10-3",
            "description": "Run pytest in the virtual environment."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "environment_provenance",
            "prompt": "Document your Python version, OS environment, and isolated directory path.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "execution_output",
            "prompt": "Provide terminal output demonstrating successful execution and edge-case handling.",
            "expectedEvidenceType": "Terminal output log"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "No real network dependency.",
          "All tests pass.",
          "Invalid inputs produce predictable errors."
        ]
      }
    },
    {
      "id": "mod-pysec-m11",
      "title": "Module 11: Command-Line Tools & Argument Validation",
      "description": "Automation phase. SOC automation is easier to operate as predictable CLI tooling. 5 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.",
      "order": 11,
      "lessons": [
        {
          "id": "les-pysec-m11-l01",
          "slug": "m11-l1-command-line-arguments",
          "title": "Module 11 - Lesson 1: Command-line arguments",
          "description": "Direct topic demonstration. Read command-line arguments without hardcoding filenames. Verification: Help documents usage.",
          "youtubeVideoId": "eWRfhZUzrAc",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 11: Command-Line Tools & Argument Validation",
          "objectives": [
            "Read command-line arguments without hardcoding filenames.",
            "Verify implementation: Help documents usage.",
            "Topic alignment: Direct topic demonstration",
            "Create safe CLI arguments.",
            "Use exit status and help pages."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-11",
            "automation"
          ],
          "skillsTaught": [
            "Command-line arguments",
            "Security Python Scripting (Mod 11)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Command-line arguments), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Command-line arguments",
                "content": "SOC automation is easier to operate as predictable CLI tooling.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Read command-line arguments without hardcoding filenames.",
                  "Verification rule: Help documents usage.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Python for Beginners (Beau Carnes) (chapter starts 02:45:55)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Read command-line arguments without hardcoding filenames.",
                "expectedOutcome": "Help documents usage."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Help documents usage.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. SOC automation is easier to operate as predictable CLI tooling.",
            "furtherReading": [
              {
                "title": "argparse: official/reference documentation",
                "url": "https://docs.python.org/3/library/argparse.html"
              },
              {
                "title": "pathlib: official/reference documentation",
                "url": "https://docs.python.org/3/library/pathlib.html"
              },
              {
                "title": "pytest: official/reference documentation",
                "url": "https://docs.pytest.org/en/stable/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m11-l02",
          "slug": "m11-l2-building-a-cli",
          "title": "Module 11 - Lesson 2: Building a CLI",
          "description": "Technique bridge to this module\u2019s security lab. Sketch a menu for defensive file-hash operations. Verification: No default destructive actions.",
          "youtubeVideoId": "kb_scuDUHls",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 11: Command-Line Tools & Argument Validation",
          "objectives": [
            "Sketch a menu for defensive file-hash operations.",
            "Verify implementation: No default destructive actions.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Create safe CLI arguments.",
            "Use exit status and help pages."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-11",
            "automation"
          ],
          "skillsTaught": [
            "Building a CLI",
            "Security Python Scripting (Mod 11)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Building a CLI), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Building a CLI",
                "content": "SOC automation is easier to operate as predictable CLI tooling.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Sketch a menu for defensive file-hash operations.",
                  "Verification rule: No default destructive actions.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Cryptography with Python (chapter starts 00:39:27)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Sketch a menu for defensive file-hash operations.",
                "expectedOutcome": "No default destructive actions."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "No default destructive actions.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. SOC automation is easier to operate as predictable CLI tooling.",
            "furtherReading": [
              {
                "title": "argparse: official/reference documentation",
                "url": "https://docs.python.org/3/library/argparse.html"
              },
              {
                "title": "pathlib: official/reference documentation",
                "url": "https://docs.python.org/3/library/pathlib.html"
              },
              {
                "title": "pytest: official/reference documentation",
                "url": "https://docs.pytest.org/en/stable/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m11-l03",
          "slug": "m11-l3-error-messages",
          "title": "Module 11 - Lesson 3: Error messages",
          "description": "Technique bridge to this module\u2019s security lab. Return useful errors for absent file paths. Verification: Exit status nonzero on failure.",
          "youtubeVideoId": "HGOBQPFzWKo",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 11: Command-Line Tools & Argument Validation",
          "objectives": [
            "Return useful errors for absent file paths.",
            "Verify implementation: Exit status nonzero on failure.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Create safe CLI arguments.",
            "Use exit status and help pages."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-11",
            "automation"
          ],
          "skillsTaught": [
            "Error messages",
            "Security Python Scripting (Mod 11)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Error messages), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Error messages",
                "content": "SOC automation is easier to operate as predictable CLI tooling.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Return useful errors for absent file paths.",
                  "Verification rule: Exit status nonzero on failure.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Intermediate Python Programming (chapter starts 02:04:03)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Return useful errors for absent file paths.",
                "expectedOutcome": "Exit status nonzero on failure."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Exit status nonzero on failure.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. SOC automation is easier to operate as predictable CLI tooling.",
            "furtherReading": [
              {
                "title": "argparse: official/reference documentation",
                "url": "https://docs.python.org/3/library/argparse.html"
              },
              {
                "title": "pathlib: official/reference documentation",
                "url": "https://docs.python.org/3/library/pathlib.html"
              },
              {
                "title": "pytest: official/reference documentation",
                "url": "https://docs.pytest.org/en/stable/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m11-l04",
          "slug": "m11-l4-first-cli-tests",
          "title": "Module 11 - Lesson 4: First CLI tests",
          "description": "Technique bridge to this module\u2019s security lab. Write tests for --help, valid and missing arguments. Verification: CLI tests pass.",
          "youtubeVideoId": "cHYq1MRoyI0",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 11: Command-Line Tools & Argument Validation",
          "objectives": [
            "Write tests for --help, valid and missing arguments.",
            "Verify implementation: CLI tests pass.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Create safe CLI arguments.",
            "Use exit status and help pages."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-11",
            "automation"
          ],
          "skillsTaught": [
            "First CLI tests",
            "Security Python Scripting (Mod 11)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (First CLI tests), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: First CLI tests",
                "content": "SOC automation is easier to operate as predictable CLI tooling.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Write tests for --help, valid and missing arguments.",
                  "Verification rule: CLI tests pass.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Pytest Tutorial (chapter starts 00:06:06)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Write tests for --help, valid and missing arguments.",
                "expectedOutcome": "CLI tests pass."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "CLI tests pass.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. SOC automation is easier to operate as predictable CLI tooling.",
            "furtherReading": [
              {
                "title": "argparse: official/reference documentation",
                "url": "https://docs.python.org/3/library/argparse.html"
              },
              {
                "title": "pathlib: official/reference documentation",
                "url": "https://docs.python.org/3/library/pathlib.html"
              },
              {
                "title": "pytest: official/reference documentation",
                "url": "https://docs.pytest.org/en/stable/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-pysec-m11",
        "title": "Lab 11: Command-Line Tools & Argument Validation Hands-on Implementation",
        "objective": "SOC automation is easier to operate as predictable CLI tooling. SOC automation is easier to operate as predictable CLI tooling. Work only with synthetic data from [LAB_DATASETS.md](../04-LAB-DATASETS.md) or an authorized personal VM.",
        "toolsRequired": [
          "Python 3.10+",
          "VS Code / Preferred Editor",
          "Safe Isolated Lab Directory"
        ],
        "pcapSource": {
          "fileName": "synthetic_m11_dataset.json",
          "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/data/synthetic_labs.json"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Design soc-tool --input PATH --output PATH --dry-run.",
          "Validate file location and extension against allowlisted formats.",
          "Do not overwrite sources; use a separate output folder.",
          "Test nonexistent path, empty path and valid path."
        ],
        "tasks": [
          {
            "id": "task-m11-1",
            "description": "Design soc-tool --input PATH --output PATH --dry-run."
          },
          {
            "id": "task-m11-2",
            "description": "Validate file location and extension against allowlisted formats."
          },
          {
            "id": "task-m11-3",
            "description": "Do not overwrite sources; use a separate output folder."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "environment_provenance",
            "prompt": "Document your Python version, OS environment, and isolated directory path.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "execution_output",
            "prompt": "Provide terminal output demonstrating successful execution and edge-case handling.",
            "expectedEvidenceType": "Terminal output log"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Help page exists.",
          "Inputs validated.",
          "Dry-run is default for operational examples."
        ]
      }
    },
    {
      "id": "mod-pysec-m12",
      "title": "Module 12: Operating System, Processes & Safe Automation",
      "description": "Automation phase. Endpoint observations and system inventory can be automated without intrusive collection. 6 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.",
      "order": 12,
      "lessons": [
        {
          "id": "les-pysec-m12-l01",
          "slug": "m12-l1-os-module",
          "title": "Module 12 - Lesson 1: OS module",
          "description": "Technique bridge to this module\u2019s security lab. Read OS name and current working directory. Verification: No network or privileged access.",
          "youtubeVideoId": "oDOw5tB3Udw",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 12: Operating System, Processes & Safe Automation",
          "objectives": [
            "Read OS name and current working directory.",
            "Verify implementation: No network or privileged access.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Use pathlib and os for system facts.",
            "Explain subprocess safety."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-12",
            "automation"
          ],
          "skillsTaught": [
            "OS module",
            "Security Python Scripting (Mod 12)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (OS module), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: OS module",
                "content": "Endpoint observations and system inventory can be automated without intrusive collection.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Read OS name and current working directory.",
                  "Verification rule: No network or privileged access.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Python for Beginners with Hands-On Projects (chapter starts 06:54:02)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Read OS name and current working directory.",
                "expectedOutcome": "No network or privileged access."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "No network or privileged access.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Endpoint observations and system inventory can be automated without intrusive collection.",
            "furtherReading": [
              {
                "title": "library: official/reference documentation",
                "url": "https://docs.python.org/3/library/"
              },
              {
                "title": "pathlib: official/reference documentation",
                "url": "https://docs.python.org/3/library/pathlib.html"
              },
              {
                "title": "security: official/reference documentation",
                "url": "https://owasp.org/www-project-top-ten/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m12-l02",
          "slug": "m12-l2-files-and-shutil",
          "title": "Module 12 - Lesson 2: Files and shutil",
          "description": "Technique bridge to this module\u2019s security lab. Copy synthetic evidence into an output staging directory. Verification: Original remains byte-identical.",
          "youtubeVideoId": "oDOw5tB3Udw",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 12: Operating System, Processes & Safe Automation",
          "objectives": [
            "Copy synthetic evidence into an output staging directory.",
            "Verify implementation: Original remains byte-identical.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Use pathlib and os for system facts.",
            "Explain subprocess safety."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-12",
            "automation"
          ],
          "skillsTaught": [
            "Files and shutil",
            "Security Python Scripting (Mod 12)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Files and shutil), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Files and shutil",
                "content": "Endpoint observations and system inventory can be automated without intrusive collection.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Copy synthetic evidence into an output staging directory.",
                  "Verification rule: Original remains byte-identical.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Python for Beginners with Hands-On Projects (chapter starts 07:13:12)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Copy synthetic evidence into an output staging directory.",
                "expectedOutcome": "Original remains byte-identical."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Original remains byte-identical.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Endpoint observations and system inventory can be automated without intrusive collection.",
            "furtherReading": [
              {
                "title": "library: official/reference documentation",
                "url": "https://docs.python.org/3/library/"
              },
              {
                "title": "pathlib: official/reference documentation",
                "url": "https://docs.python.org/3/library/pathlib.html"
              },
              {
                "title": "security: official/reference documentation",
                "url": "https://owasp.org/www-project-top-ten/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m12-l03",
          "slug": "m12-l3-processes-and-file-handling-design",
          "title": "Module 12 - Lesson 3: Processes and file-handling design",
          "description": "Technique bridge to this module\u2019s security lab. Explain structured objects for host inventory. Verification: Inventory schema documented.",
          "youtubeVideoId": "eWRfhZUzrAc",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 12: Operating System, Processes & Safe Automation",
          "objectives": [
            "Explain structured objects for host inventory.",
            "Verify implementation: Inventory schema documented.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Use pathlib and os for system facts.",
            "Explain subprocess safety."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-12",
            "automation"
          ],
          "skillsTaught": [
            "Processes and file-handling design",
            "Security Python Scripting (Mod 12)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Processes and file-handling design), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Processes and file-handling design",
                "content": "Endpoint observations and system inventory can be automated without intrusive collection.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Explain structured objects for host inventory.",
                  "Verification rule: Inventory schema documented.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Python for Beginners (Beau Carnes) (chapter starts 02:22:59)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Explain structured objects for host inventory.",
                "expectedOutcome": "Inventory schema documented."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Inventory schema documented.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Endpoint observations and system inventory can be automated without intrusive collection.",
            "furtherReading": [
              {
                "title": "library: official/reference documentation",
                "url": "https://docs.python.org/3/library/"
              },
              {
                "title": "pathlib: official/reference documentation",
                "url": "https://docs.python.org/3/library/pathlib.html"
              },
              {
                "title": "security: official/reference documentation",
                "url": "https://owasp.org/www-project-top-ten/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m12-l04",
          "slug": "m12-l4-automation-safety",
          "title": "Module 12 - Lesson 4: Automation safety",
          "description": "Technique bridge to this module\u2019s security lab. Compare libraries for safe tooling; reject shell=True with untrusted input. Verification: Execution plan is allowlisted.",
          "youtubeVideoId": "Fxh9X3-hO4Y",
          "videoAttribution": {
            "creator": "CyberFlow",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 12: Operating System, Processes & Safe Automation",
          "objectives": [
            "Compare libraries for safe tooling; reject shell=True with untrusted input.",
            "Verify implementation: Execution plan is allowlisted.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Use pathlib and os for system facts.",
            "Explain subprocess safety."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-12",
            "automation"
          ],
          "skillsTaught": [
            "Automation safety",
            "Security Python Scripting (Mod 12)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Automation safety), learn defensive programming with video instruction by CyberFlow. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Automation safety",
                "content": "Endpoint observations and system inventory can be automated without intrusive collection.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Compare libraries for safe tooling; reject shell=True with untrusted input.",
                  "Verification rule: Execution plan is allowlisted.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'CyberFlow \u2014 Best Way to Learn Python for Hacking (chapter starts 04:46)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Compare libraries for safe tooling; reject shell=True with untrusted input.",
                "expectedOutcome": "Execution plan is allowlisted."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Execution plan is allowlisted.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Endpoint observations and system inventory can be automated without intrusive collection.",
            "furtherReading": [
              {
                "title": "library: official/reference documentation",
                "url": "https://docs.python.org/3/library/"
              },
              {
                "title": "pathlib: official/reference documentation",
                "url": "https://docs.python.org/3/library/pathlib.html"
              },
              {
                "title": "security: official/reference documentation",
                "url": "https://owasp.org/www-project-top-ten/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-pysec-m12",
        "title": "Lab 12: Operating System, Processes & Safe Automation Hands-on Implementation",
        "objective": "Endpoint observations and system inventory can be automated without intrusive collection. Endpoint observations and system inventory can be automated without intrusive collection. Work only with synthetic data from [LAB_DATASETS.md](../04-LAB-DATASETS.md) or an authorized personal VM.",
        "toolsRequired": [
          "Python 3.10+",
          "VS Code / Preferred Editor",
          "Safe Isolated Lab Directory"
        ],
        "pcapSource": {
          "fileName": "synthetic_m12_dataset.json",
          "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/data/synthetic_labs.json"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Create a read-only host info summary for your own VM.",
          "List only top-level names in a synthetic evidence directory.",
          "Practice using subprocess.run with explicit argument list and timeout for an allowlisted harmless command.",
          "Never run arbitrary commands based on log contents."
        ],
        "tasks": [
          {
            "id": "task-m12-1",
            "description": "Create a read-only host info summary for your own VM."
          },
          {
            "id": "task-m12-2",
            "description": "List only top-level names in a synthetic evidence directory."
          },
          {
            "id": "task-m12-3",
            "description": "Practice using subprocess.run with explicit argument list and timeout for an allowlisted harmless command."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "environment_provenance",
            "prompt": "Document your Python version, OS environment, and isolated directory path.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "execution_output",
            "prompt": "Provide terminal output demonstrating successful execution and edge-case handling.",
            "expectedEvidenceType": "Terminal output log"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "No elevated privileges required.",
          "No destructive filesystem operations.",
          "Subprocess has timeout."
        ]
      }
    },
    {
      "id": "mod-pysec-m13",
      "title": "Module 13: Linux Authentication Logs & SSH Investigations",
      "description": "Automation phase. Repeated SSH authentication failures are common SOC investigation scenarios. 7 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.",
      "order": 13,
      "lessons": [
        {
          "id": "les-pysec-m13-l01",
          "slug": "m13-l1-regex-log-analysis",
          "title": "Module 13 - Lesson 1: Regex log analysis",
          "description": "Direct topic demonstration. Extract users, source IPs and outcomes from supplied synthetic auth.log. Verification: Extracts known sample records.",
          "youtubeVideoId": "KVmbRdwWohY",
          "videoAttribution": {
            "creator": "Hank Hackerson",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 13: Linux Authentication Logs & SSH Investigations",
          "objectives": [
            "Extract users, source IPs and outcomes from supplied synthetic auth.log.",
            "Verify implementation: Extracts known sample records.",
            "Topic alignment: Direct topic demonstration",
            "Parse synthetic SSH auth events.",
            "Aggregate by source, account and time."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-13",
            "automation"
          ],
          "skillsTaught": [
            "Regex log analysis",
            "Security Python Scripting (Mod 13)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Regex log analysis), learn defensive programming with video instruction by Hank Hackerson. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Regex log analysis",
                "content": "Repeated SSH authentication failures are common SOC investigation scenarios.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Extract users, source IPs and outcomes from supplied synthetic auth.log.",
                  "Verification rule: Extracts known sample records.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Hank Hackerson \u2014 Build Python Algorithms for Cybersecurity (chapter starts 04:52:55)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Extract users, source IPs and outcomes from supplied synthetic auth.log.",
                "expectedOutcome": "Extracts known sample records."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Extracts known sample records.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Repeated SSH authentication failures are common SOC investigation scenarios.",
            "furtherReading": [
              {
                "title": "regex: official/reference documentation",
                "url": "https://docs.python.org/3/library/re.html"
              },
              {
                "title": "logging: official/reference documentation",
                "url": "https://docs.python.org/3/library/logging.html"
              },
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m13-l02",
          "slug": "m13-l2-file-parsing-algorithm",
          "title": "Module 13 - Lesson 2: File parsing algorithm",
          "description": "Direct topic demonstration. Implement separate parse and analyze functions. Verification: Bad lines do not crash parser.",
          "youtubeVideoId": "KVmbRdwWohY",
          "videoAttribution": {
            "creator": "Hank Hackerson",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 13: Linux Authentication Logs & SSH Investigations",
          "objectives": [
            "Implement separate parse and analyze functions.",
            "Verify implementation: Bad lines do not crash parser.",
            "Topic alignment: Direct topic demonstration",
            "Parse synthetic SSH auth events.",
            "Aggregate by source, account and time."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-13",
            "automation"
          ],
          "skillsTaught": [
            "File parsing algorithm",
            "Security Python Scripting (Mod 13)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (File parsing algorithm), learn defensive programming with video instruction by Hank Hackerson. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: File parsing algorithm",
                "content": "Repeated SSH authentication failures are common SOC investigation scenarios.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Implement separate parse and analyze functions.",
                  "Verification rule: Bad lines do not crash parser.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Hank Hackerson \u2014 Build Python Algorithms for Cybersecurity (chapter starts 05:45:02)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Implement separate parse and analyze functions.",
                "expectedOutcome": "Bad lines do not crash parser."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Bad lines do not crash parser.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Repeated SSH authentication failures are common SOC investigation scenarios.",
            "furtherReading": [
              {
                "title": "regex: official/reference documentation",
                "url": "https://docs.python.org/3/library/re.html"
              },
              {
                "title": "logging: official/reference documentation",
                "url": "https://docs.python.org/3/library/logging.html"
              },
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m13-l03",
          "slug": "m13-l3-data-grouping",
          "title": "Module 13 - Lesson 3: Data grouping",
          "description": "Technique bridge to this module\u2019s security lab. Count attempts per IP and username. Verification: Counts match fixture.",
          "youtubeVideoId": "HGOBQPFzWKo",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 13: Linux Authentication Logs & SSH Investigations",
          "objectives": [
            "Count attempts per IP and username.",
            "Verify implementation: Counts match fixture.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Parse synthetic SSH auth events.",
            "Aggregate by source, account and time."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-13",
            "automation"
          ],
          "skillsTaught": [
            "Data grouping",
            "Security Python Scripting (Mod 13)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Data grouping), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Data grouping",
                "content": "Repeated SSH authentication failures are common SOC investigation scenarios.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Count attempts per IP and username.",
                  "Verification rule: Counts match fixture.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Intermediate Python Programming (chapter starts 01:22:50)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Count attempts per IP and username.",
                "expectedOutcome": "Counts match fixture."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Counts match fixture.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Repeated SSH authentication failures are common SOC investigation scenarios.",
            "furtherReading": [
              {
                "title": "regex: official/reference documentation",
                "url": "https://docs.python.org/3/library/re.html"
              },
              {
                "title": "logging: official/reference documentation",
                "url": "https://docs.python.org/3/library/logging.html"
              },
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m13-l04",
          "slug": "m13-l4-logging-results",
          "title": "Module 13 - Lesson 4: Logging results",
          "description": "Technique bridge to this module\u2019s security lab. Output investigation audit messages. Verification: No raw secrets logged.",
          "youtubeVideoId": "HGOBQPFzWKo",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 13: Linux Authentication Logs & SSH Investigations",
          "objectives": [
            "Output investigation audit messages.",
            "Verify implementation: No raw secrets logged.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Parse synthetic SSH auth events.",
            "Aggregate by source, account and time."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-13",
            "automation"
          ],
          "skillsTaught": [
            "Logging results",
            "Security Python Scripting (Mod 13)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Logging results), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Logging results",
                "content": "Repeated SSH authentication failures are common SOC investigation scenarios.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Output investigation audit messages.",
                  "Verification rule: No raw secrets logged.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Intermediate Python Programming (chapter starts 02:20:10)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Output investigation audit messages.",
                "expectedOutcome": "No raw secrets logged."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "No raw secrets logged.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Repeated SSH authentication failures are common SOC investigation scenarios.",
            "furtherReading": [
              {
                "title": "regex: official/reference documentation",
                "url": "https://docs.python.org/3/library/re.html"
              },
              {
                "title": "logging: official/reference documentation",
                "url": "https://docs.python.org/3/library/logging.html"
              },
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-pysec-m13",
        "title": "Lab 13: Linux Authentication Logs & SSH Investigations Hands-on Implementation",
        "objective": "Repeated SSH authentication failures are common SOC investigation scenarios. Repeated SSH authentication failures are common SOC investigation scenarios. Work only with synthetic data from [LAB_DATASETS.md](../04-LAB-DATASETS.md) or an authorized personal VM.",
        "toolsRequired": [
          "Python 3.10+",
          "VS Code / Preferred Editor",
          "Safe Isolated Lab Directory"
        ],
        "pcapSource": {
          "fileName": "synthetic_m13_dataset.json",
          "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/data/synthetic_labs.json"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Copy synthetic auth.log lines from LAB_DATASETS.md.",
          "Parse timestamp, account, host, source IP and action.",
          "Group failures by source IP and 5-minute time bucket.",
          "Write triage conclusions with uncertainty and recommended next checks."
        ],
        "tasks": [
          {
            "id": "task-m13-1",
            "description": "Copy synthetic auth.log lines from LAB_DATASETS.md."
          },
          {
            "id": "task-m13-2",
            "description": "Parse timestamp, account, host, source IP and action."
          },
          {
            "id": "task-m13-3",
            "description": "Group failures by source IP and 5-minute time bucket."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "environment_provenance",
            "prompt": "Document your Python version, OS environment, and isolated directory path.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "execution_output",
            "prompt": "Provide terminal output demonstrating successful execution and edge-case handling.",
            "expectedEvidenceType": "Terminal output log"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Expected source counts match.",
          "UTC normalization documented.",
          "Clear benign vs suspicious uncertainty."
        ]
      }
    },
    {
      "id": "mod-pysec-m14",
      "title": "Module 14: Windows Event Logs, EVTX & Authentication",
      "description": "Automation phase. SOC analysts investigate Windows sign-ins, privilege changes and process events. 7 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.",
      "order": 14,
      "lessons": [
        {
          "id": "les-pysec-m14-l01",
          "slug": "m14-l1-regex-and-record-extraction",
          "title": "Module 14 - Lesson 1: Regex and record extraction",
          "description": "Technique bridge to this module\u2019s security lab. Extract event IDs and usernames from synthetic XML. Verification: No guesswork from incomplete fields.",
          "youtubeVideoId": "KVmbRdwWohY",
          "videoAttribution": {
            "creator": "Hank Hackerson",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 14: Windows Event Logs, EVTX & Authentication",
          "objectives": [
            "Extract event IDs and usernames from synthetic XML.",
            "Verify implementation: No guesswork from incomplete fields.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Recognize relevant Windows event IDs.",
            "Parse exported synthetic event XML or EVTX files offline."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-14",
            "automation"
          ],
          "skillsTaught": [
            "Regex and record extraction",
            "Security Python Scripting (Mod 14)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Regex and record extraction), learn defensive programming with video instruction by Hank Hackerson. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Regex and record extraction",
                "content": "SOC analysts investigate Windows sign-ins, privilege changes and process events.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Extract event IDs and usernames from synthetic XML.",
                  "Verification rule: No guesswork from incomplete fields.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Hank Hackerson \u2014 Build Python Algorithms for Cybersecurity (chapter starts 04:52:55)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Extract event IDs and usernames from synthetic XML.",
                "expectedOutcome": "No guesswork from incomplete fields."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "No guesswork from incomplete fields.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. SOC analysts investigate Windows sign-ins, privilege changes and process events.",
            "furtherReading": [
              {
                "title": "evtx: official/reference documentation",
                "url": "https://pypi.org/project/python-evtx/"
              },
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              },
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m14-l02",
          "slug": "m14-l2-reading-and-validating-files",
          "title": "Module 14 - Lesson 2: Reading and validating files",
          "description": "Technique bridge to this module\u2019s security lab. Read an exported event record with an XML parser. Verification: No dependence on a live domain.",
          "youtubeVideoId": "KVmbRdwWohY",
          "videoAttribution": {
            "creator": "Hank Hackerson",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 14: Windows Event Logs, EVTX & Authentication",
          "objectives": [
            "Read an exported event record with an XML parser.",
            "Verify implementation: No dependence on a live domain.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Recognize relevant Windows event IDs.",
            "Parse exported synthetic event XML or EVTX files offline."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-14",
            "automation"
          ],
          "skillsTaught": [
            "Reading and validating files",
            "Security Python Scripting (Mod 14)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Reading and validating files), learn defensive programming with video instruction by Hank Hackerson. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Reading and validating files",
                "content": "SOC analysts investigate Windows sign-ins, privilege changes and process events.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Read an exported event record with an XML parser.",
                  "Verification rule: No dependence on a live domain.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Hank Hackerson \u2014 Build Python Algorithms for Cybersecurity (chapter starts 05:07:18)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Read an exported event record with an XML parser.",
                "expectedOutcome": "No dependence on a live domain."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "No dependence on a live domain.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. SOC analysts investigate Windows sign-ins, privilege changes and process events.",
            "furtherReading": [
              {
                "title": "evtx: official/reference documentation",
                "url": "https://pypi.org/project/python-evtx/"
              },
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              },
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m14-l03",
          "slug": "m14-l3-json-output",
          "title": "Module 14 - Lesson 3: JSON output",
          "description": "Technique bridge to this module\u2019s security lab. Convert parsed events into normalized JSON objects. Verification: Output round-trips.",
          "youtubeVideoId": "HGOBQPFzWKo",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 14: Windows Event Logs, EVTX & Authentication",
          "objectives": [
            "Convert parsed events into normalized JSON objects.",
            "Verify implementation: Output round-trips.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Recognize relevant Windows event IDs.",
            "Parse exported synthetic event XML or EVTX files offline."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-14",
            "automation"
          ],
          "skillsTaught": [
            "JSON output",
            "Security Python Scripting (Mod 14)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (JSON output), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: JSON output",
                "content": "SOC analysts investigate Windows sign-ins, privilege changes and process events.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Convert parsed events into normalized JSON objects.",
                  "Verification rule: Output round-trips.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Intermediate Python Programming (chapter starts 02:42:20)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Convert parsed events into normalized JSON objects.",
                "expectedOutcome": "Output round-trips."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Output round-trips.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. SOC analysts investigate Windows sign-ins, privilege changes and process events.",
            "furtherReading": [
              {
                "title": "evtx: official/reference documentation",
                "url": "https://pypi.org/project/python-evtx/"
              },
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              },
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m14-l04",
          "slug": "m14-l4-parametrized-regression-checks",
          "title": "Module 14 - Lesson 4: Parametrized regression checks",
          "description": "Technique bridge to this module\u2019s security lab. Test IDs 4624 and 4625 using synthetic records. Verification: Event meanings not confused.",
          "youtubeVideoId": "cHYq1MRoyI0",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 14: Windows Event Logs, EVTX & Authentication",
          "objectives": [
            "Test IDs 4624 and 4625 using synthetic records.",
            "Verify implementation: Event meanings not confused.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Recognize relevant Windows event IDs.",
            "Parse exported synthetic event XML or EVTX files offline."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-14",
            "automation"
          ],
          "skillsTaught": [
            "Parametrized regression checks",
            "Security Python Scripting (Mod 14)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Parametrized regression checks), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Parametrized regression checks",
                "content": "SOC analysts investigate Windows sign-ins, privilege changes and process events.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Test IDs 4624 and 4625 using synthetic records.",
                  "Verification rule: Event meanings not confused.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Pytest Tutorial (chapter starts 00:41:10)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Test IDs 4624 and 4625 using synthetic records.",
                "expectedOutcome": "Event meanings not confused."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Event meanings not confused.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. SOC analysts investigate Windows sign-ins, privilege changes and process events.",
            "furtherReading": [
              {
                "title": "evtx: official/reference documentation",
                "url": "https://pypi.org/project/python-evtx/"
              },
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              },
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-pysec-m14",
        "title": "Lab 14: Windows Event Logs, EVTX & Authentication Hands-on Implementation",
        "objective": "SOC analysts investigate Windows sign-ins, privilege changes and process events. SOC analysts investigate Windows sign-ins, privilege changes and process events. Work only with synthetic data from [LAB_DATASETS.md](../04-LAB-DATASETS.md) or an authorized personal VM.",
        "toolsRequired": [
          "Python 3.10+",
          "VS Code / Preferred Editor",
          "Safe Isolated Lab Directory"
        ],
        "pcapSource": {
          "fileName": "synthetic_m14_dataset.json",
          "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/data/synthetic_labs.json"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Use offline XML sample from LAB_DATASETS.md; optional export an EVTX from an owned lab VM.",
          "Identify Event ID 4624 (successful logon) and 4625 (failed logon) along with account, logon type and timestamp.",
          "Normalize events into a common schema without claiming all failures are malicious.",
          "Produce a comparison table of Linux SSH and Windows authentication records."
        ],
        "tasks": [
          {
            "id": "task-m14-1",
            "description": "Use offline XML sample from LAB_DATASETS.md; optional export an EVTX from an owned lab VM."
          },
          {
            "id": "task-m14-2",
            "description": "Identify Event ID 4624 (successful logon) and 4625 (failed logon) along with account, logon type and timestamp."
          },
          {
            "id": "task-m14-3",
            "description": "Normalize events into a common schema without claiming all failures are malicious."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "environment_provenance",
            "prompt": "Document your Python version, OS environment, and isolated directory path.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "execution_output",
            "prompt": "Provide terminal output demonstrating successful execution and edge-case handling.",
            "expectedEvidenceType": "Terminal output log"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Events parsed offline.",
          "Event IDs accurate.",
          "Original file preserved."
        ]
      }
    },
    {
      "id": "mod-pysec-m15",
      "title": "Module 15: Sockets, IP Addressing, DNS & Authorized Checks",
      "description": "Automation phase. Networking-aware scripts support troubleshooting and narrowly scoped service checks. 7 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.",
      "order": 15,
      "lessons": [
        {
          "id": "les-pysec-m15-l01",
          "slug": "m15-l1-python-sockets",
          "title": "Module 15 - Lesson 1: Python sockets",
          "description": "Direct topic demonstration. Build a connection check to a local test listener. Verification: Only 127.0.0.1 used.",
          "youtubeVideoId": "oDOw5tB3Udw",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 15: Sockets, IP Addressing, DNS & Authorized Checks",
          "objectives": [
            "Build a connection check to a local test listener.",
            "Verify implementation: Only 127.0.0.1 used.",
            "Topic alignment: Direct topic demonstration",
            "Parse IP addresses and network ranges.",
            "Understand TCP socket basics."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-15",
            "automation"
          ],
          "skillsTaught": [
            "Python sockets",
            "Security Python Scripting (Mod 15)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Python sockets), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Python sockets",
                "content": "Networking-aware scripts support troubleshooting and narrowly scoped service checks.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Build a connection check to a local test listener.",
                  "Verification rule: Only 127.0.0.1 used.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Python for Beginners with Hands-On Projects (chapter starts 08:08:07)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Build a connection check to a local test listener.",
                "expectedOutcome": "Only 127.0.0.1 used."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Only 127.0.0.1 used.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Networking-aware scripts support troubleshooting and narrowly scoped service checks.",
            "furtherReading": [
              {
                "title": "library: official/reference documentation",
                "url": "https://docs.python.org/3/library/"
              },
              {
                "title": "urlparse: official/reference documentation",
                "url": "https://docs.python.org/3/library/urllib.parse.html"
              },
              {
                "title": "security: official/reference documentation",
                "url": "https://owasp.org/www-project-top-ten/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m15-l02",
          "slug": "m15-l2-dns-lookup-principles",
          "title": "Module 15 - Lesson 2: DNS lookup principles",
          "description": "Technique bridge to this module\u2019s security lab. Resolve localhost and document result. Verification: No third-party reconnaissance.",
          "youtubeVideoId": "oDOw5tB3Udw",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 15: Sockets, IP Addressing, DNS & Authorized Checks",
          "objectives": [
            "Resolve localhost and document result.",
            "Verify implementation: No third-party reconnaissance.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Parse IP addresses and network ranges.",
            "Understand TCP socket basics."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-15",
            "automation"
          ],
          "skillsTaught": [
            "DNS lookup principles",
            "Security Python Scripting (Mod 15)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (DNS lookup principles), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: DNS lookup principles",
                "content": "Networking-aware scripts support troubleshooting and narrowly scoped service checks.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Resolve localhost and document result.",
                  "Verification rule: No third-party reconnaissance.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Python for Beginners with Hands-On Projects (chapter starts 08:23:58)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Resolve localhost and document result.",
                "expectedOutcome": "No third-party reconnaissance."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "No third-party reconnaissance.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Networking-aware scripts support troubleshooting and narrowly scoped service checks.",
            "furtherReading": [
              {
                "title": "library: official/reference documentation",
                "url": "https://docs.python.org/3/library/"
              },
              {
                "title": "urlparse: official/reference documentation",
                "url": "https://docs.python.org/3/library/urllib.parse.html"
              },
              {
                "title": "security: official/reference documentation",
                "url": "https://owasp.org/www-project-top-ten/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m15-l03",
          "slug": "m15-l3-timeout-handling",
          "title": "Module 15 - Lesson 3: Timeout handling",
          "description": "Technique bridge to this module\u2019s security lab. Handle refused connection and timeout as distinct states. Verification: Script never hangs.",
          "youtubeVideoId": "HGOBQPFzWKo",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 15: Sockets, IP Addressing, DNS & Authorized Checks",
          "objectives": [
            "Handle refused connection and timeout as distinct states.",
            "Verify implementation: Script never hangs.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Parse IP addresses and network ranges.",
            "Understand TCP socket basics."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-15",
            "automation"
          ],
          "skillsTaught": [
            "Timeout handling",
            "Security Python Scripting (Mod 15)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Timeout handling), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Timeout handling",
                "content": "Networking-aware scripts support troubleshooting and narrowly scoped service checks.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Handle refused connection and timeout as distinct states.",
                  "Verification rule: Script never hangs.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Intermediate Python Programming (chapter starts 02:04:03)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Handle refused connection and timeout as distinct states.",
                "expectedOutcome": "Script never hangs."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Script never hangs.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Networking-aware scripts support troubleshooting and narrowly scoped service checks.",
            "furtherReading": [
              {
                "title": "library: official/reference documentation",
                "url": "https://docs.python.org/3/library/"
              },
              {
                "title": "urlparse: official/reference documentation",
                "url": "https://docs.python.org/3/library/urllib.parse.html"
              },
              {
                "title": "security: official/reference documentation",
                "url": "https://owasp.org/www-project-top-ten/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m15-l04",
          "slug": "m15-l4-safe-security-scripting-roadmap",
          "title": "Module 15 - Lesson 4: Safe security-scripting roadmap",
          "description": "Technique bridge to this module\u2019s security lab. Discuss scope and rate controls for checks. Verification: Testing stays inside owned lab.",
          "youtubeVideoId": "Fxh9X3-hO4Y",
          "videoAttribution": {
            "creator": "CyberFlow",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 15: Sockets, IP Addressing, DNS & Authorized Checks",
          "objectives": [
            "Discuss scope and rate controls for checks.",
            "Verify implementation: Testing stays inside owned lab.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Parse IP addresses and network ranges.",
            "Understand TCP socket basics."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-15",
            "automation"
          ],
          "skillsTaught": [
            "Safe security-scripting roadmap",
            "Security Python Scripting (Mod 15)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Safe security-scripting roadmap), learn defensive programming with video instruction by CyberFlow. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Safe security-scripting roadmap",
                "content": "Networking-aware scripts support troubleshooting and narrowly scoped service checks.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Discuss scope and rate controls for checks.",
                  "Verification rule: Testing stays inside owned lab.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'CyberFlow \u2014 Best Way to Learn Python for Hacking (chapter starts 02:00)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Discuss scope and rate controls for checks.",
                "expectedOutcome": "Testing stays inside owned lab."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Testing stays inside owned lab.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Networking-aware scripts support troubleshooting and narrowly scoped service checks.",
            "furtherReading": [
              {
                "title": "library: official/reference documentation",
                "url": "https://docs.python.org/3/library/"
              },
              {
                "title": "urlparse: official/reference documentation",
                "url": "https://docs.python.org/3/library/urllib.parse.html"
              },
              {
                "title": "security: official/reference documentation",
                "url": "https://owasp.org/www-project-top-ten/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-pysec-m15",
        "title": "Lab 15: Sockets, IP Addressing, DNS & Authorized Checks Hands-on Implementation",
        "objective": "Networking-aware scripts support troubleshooting and narrowly scoped service checks. Networking-aware scripts support troubleshooting and narrowly scoped service checks. Work only with synthetic data from [LAB_DATASETS.md](../04-LAB-DATASETS.md) or an authorized personal VM.",
        "toolsRequired": [
          "Python 3.10+",
          "VS Code / Preferred Editor",
          "Safe Isolated Lab Directory"
        ],
        "pcapSource": {
          "fileName": "synthetic_m15_dataset.json",
          "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/data/synthetic_labs.json"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Start a local Python HTTP server on loopback port 8765.",
          "Create a bounded script that checks only loopback port 8765 with a 1-second timeout.",
          "Print open/closed/timeout states without trying other IPs.",
          "Stop the lab server and confirm the output changes to closed."
        ],
        "tasks": [
          {
            "id": "task-m15-1",
            "description": "Start a local Python HTTP server on loopback port 8765."
          },
          {
            "id": "task-m15-2",
            "description": "Create a bounded script that checks only loopback port 8765 with a 1-second timeout."
          },
          {
            "id": "task-m15-3",
            "description": "Print open/closed/timeout states without trying other IPs."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "environment_provenance",
            "prompt": "Document your Python version, OS environment, and isolated directory path.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "execution_output",
            "prompt": "Provide terminal output demonstrating successful execution and edge-case handling.",
            "expectedEvidenceType": "Terminal output log"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Only loopback address accepted.",
          "Timeout bounded.",
          "No port-range scanning of public targets."
        ]
      }
    },
    {
      "id": "mod-pysec-m16",
      "title": "Module 16: HTTP, REST APIs & JSON Threat Data",
      "description": "Automation phase. Many SOC integrations exchange alerts and intelligence through HTTPS APIs. 7 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.",
      "order": 16,
      "lessons": [
        {
          "id": "les-pysec-m16-l01",
          "slug": "m16-l1-http-requests",
          "title": "Module 16 - Lesson 1: HTTP requests",
          "description": "Direct topic demonstration. Identify GET status codes, headers and response bodies. Verification: Can distinguish 200, 429, 500.",
          "youtubeVideoId": "0sOvCWFmrtA",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 16: HTTP, REST APIs & JSON Threat Data",
          "objectives": [
            "Identify GET status codes, headers and response bodies.",
            "Verify implementation: Can distinguish 200, 429, 500.",
            "Topic alignment: Direct topic demonstration",
            "Explain HTTP status and JSON.",
            "Apply safe timeouts and pagination."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-16",
            "automation"
          ],
          "skillsTaught": [
            "HTTP requests",
            "Security Python Scripting (Mod 16)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (HTTP requests), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: HTTP requests",
                "content": "Many SOC integrations exchange alerts and intelligence through HTTPS APIs.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Identify GET status codes, headers and response bodies.",
                  "Verification rule: Can distinguish 200, 429, 500.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Python API Development (FastAPI) (chapter starts 00:57:34)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Identify GET status codes, headers and response bodies.",
                "expectedOutcome": "Can distinguish 200, 429, 500."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Can distinguish 200, 429, 500.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Many SOC integrations exchange alerts and intelligence through HTTPS APIs.",
            "furtherReading": [
              {
                "title": "requests: official/reference documentation",
                "url": "https://requests.readthedocs.io/en/latest/"
              },
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              },
              {
                "title": "security: official/reference documentation",
                "url": "https://owasp.org/www-project-top-ten/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m16-l02",
          "slug": "m16-l2-json-normalization",
          "title": "Module 16 - Lesson 2: JSON normalization",
          "description": "Direct topic demonstration. Read a mock alert API response from disk. Verification: Response schema validated.",
          "youtubeVideoId": "HGOBQPFzWKo",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 16: HTTP, REST APIs & JSON Threat Data",
          "objectives": [
            "Read a mock alert API response from disk.",
            "Verify implementation: Response schema validated.",
            "Topic alignment: Direct topic demonstration",
            "Explain HTTP status and JSON.",
            "Apply safe timeouts and pagination."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-16",
            "automation"
          ],
          "skillsTaught": [
            "JSON normalization",
            "Security Python Scripting (Mod 16)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (JSON normalization), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: JSON normalization",
                "content": "Many SOC integrations exchange alerts and intelligence through HTTPS APIs.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Read a mock alert API response from disk.",
                  "Verification rule: Response schema validated.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Intermediate Python Programming (chapter starts 02:42:20)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Read a mock alert API response from disk.",
                "expectedOutcome": "Response schema validated."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Response schema validated.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Many SOC integrations exchange alerts and intelligence through HTTPS APIs.",
            "furtherReading": [
              {
                "title": "requests: official/reference documentation",
                "url": "https://requests.readthedocs.io/en/latest/"
              },
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              },
              {
                "title": "security: official/reference documentation",
                "url": "https://owasp.org/www-project-top-ten/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m16-l03",
          "slug": "m16-l3-path-and-schema-validation",
          "title": "Module 16 - Lesson 3: Path and schema validation",
          "description": "Technique bridge to this module\u2019s security lab. Define a small expected alert schema. Verification: Unexpected types flagged.",
          "youtubeVideoId": "0sOvCWFmrtA",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 16: HTTP, REST APIs & JSON Threat Data",
          "objectives": [
            "Define a small expected alert schema.",
            "Verify implementation: Unexpected types flagged.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Explain HTTP status and JSON.",
            "Apply safe timeouts and pagination."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-16",
            "automation"
          ],
          "skillsTaught": [
            "Path and schema validation",
            "Security Python Scripting (Mod 16)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Path and schema validation), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Path and schema validation",
                "content": "Many SOC integrations exchange alerts and intelligence through HTTPS APIs.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Define a small expected alert schema.",
                  "Verification rule: Unexpected types flagged.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Python API Development (FastAPI) (chapter starts 01:07:29)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Define a small expected alert schema.",
                "expectedOutcome": "Unexpected types flagged."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Unexpected types flagged.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Many SOC integrations exchange alerts and intelligence through HTTPS APIs.",
            "furtherReading": [
              {
                "title": "requests: official/reference documentation",
                "url": "https://requests.readthedocs.io/en/latest/"
              },
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              },
              {
                "title": "security: official/reference documentation",
                "url": "https://owasp.org/www-project-top-ten/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m16-l04",
          "slug": "m16-l4-managing-environment-variables",
          "title": "Module 16 - Lesson 4: Managing environment variables",
          "description": "Technique bridge to this module\u2019s security lab. Load a local demo token from environment rather than source. Verification: Secret absent from Git history.",
          "youtubeVideoId": "0sOvCWFmrtA",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 16: HTTP, REST APIs & JSON Threat Data",
          "objectives": [
            "Load a local demo token from environment rather than source.",
            "Verify implementation: Secret absent from Git history.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Explain HTTP status and JSON.",
            "Apply safe timeouts and pagination."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-16",
            "automation"
          ],
          "skillsTaught": [
            "Managing environment variables",
            "Security Python Scripting (Mod 16)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Managing environment variables), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Managing environment variables",
                "content": "Many SOC integrations exchange alerts and intelligence through HTTPS APIs.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Load a local demo token from environment rather than source.",
                  "Verification rule: Secret absent from Git history.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Python API Development (FastAPI) (chapter starts 08:53:53)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Load a local demo token from environment rather than source.",
                "expectedOutcome": "Secret absent from Git history."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Secret absent from Git history.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Many SOC integrations exchange alerts and intelligence through HTTPS APIs.",
            "furtherReading": [
              {
                "title": "requests: official/reference documentation",
                "url": "https://requests.readthedocs.io/en/latest/"
              },
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              },
              {
                "title": "security: official/reference documentation",
                "url": "https://owasp.org/www-project-top-ten/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-pysec-m16",
        "title": "Lab 16: HTTP, REST APIs & JSON Threat Data Hands-on Implementation",
        "objective": "Many SOC integrations exchange alerts and intelligence through HTTPS APIs. Many SOC integrations exchange alerts and intelligence through HTTPS APIs. Work only with synthetic data from [LAB_DATASETS.md](../04-LAB-DATASETS.md) or an authorized personal VM.",
        "toolsRequired": [
          "Python 3.10+",
          "VS Code / Preferred Editor",
          "Safe Isolated Lab Directory"
        ],
        "pcapSource": {
          "fileName": "synthetic_m16_dataset.json",
          "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/data/synthetic_labs.json"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Implement mock_fetch_alerts() returning paginated test data locally.",
          "Write a client wrapper that accepts a session object and timeout.",
          "Simulate 429 and 500 responses and explain exponential backoff.",
          "No real API keys or company tenant access are required."
        ],
        "tasks": [
          {
            "id": "task-m16-1",
            "description": "Implement mock_fetch_alerts() returning paginated test data locally."
          },
          {
            "id": "task-m16-2",
            "description": "Write a client wrapper that accepts a session object and timeout."
          },
          {
            "id": "task-m16-3",
            "description": "Simulate 429 and 500 responses and explain exponential backoff."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "environment_provenance",
            "prompt": "Document your Python version, OS environment, and isolated directory path.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "execution_output",
            "prompt": "Provide terminal output demonstrating successful execution and edge-case handling.",
            "expectedEvidenceType": "Terminal output log"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Timeout and retry bounded.",
          "No real credentials.",
          "HTTP failure states handled."
        ]
      }
    },
    {
      "id": "mod-pysec-m17",
      "title": "Module 17: PCAP Forensics with Scapy (Offline)",
      "description": "Automation phase. Packet captures reveal network activity when used with legal authorization. 8 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.",
      "order": 17,
      "lessons": [
        {
          "id": "les-pysec-m17-l01",
          "slug": "m17-l1-scapy-environment-and-packet-parsing",
          "title": "Module 17 - Lesson 1: Scapy environment and packet parsing",
          "description": "Direct topic demonstration. Install Scapy and inspect a sample capture. Verification: Uses static PCAP only.",
          "youtubeVideoId": "ntObHsiCgkE",
          "videoAttribution": {
            "creator": "PenSecurity",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 17: PCAP Forensics with Scapy (Offline)",
          "objectives": [
            "Install Scapy and inspect a sample capture.",
            "Verify implementation: Uses static PCAP only.",
            "Topic alignment: Direct topic demonstration",
            "Read PCAPs without live sniffing.",
            "Extract protocols and conversations."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-17",
            "automation"
          ],
          "skillsTaught": [
            "Scapy environment and packet parsing",
            "Security Python Scripting (Mod 17)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Scapy environment and packet parsing), learn defensive programming with video instruction by PenSecurity. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Scapy environment and packet parsing",
                "content": "Packet captures reveal network activity when used with legal authorization.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Install Scapy and inspect a sample capture.",
                  "Verification rule: Uses static PCAP only.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'PenSecurity \u2014 Analyze PCAP with Scapy and Pandas (chapter starts 00:00)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Install Scapy and inspect a sample capture.",
                "expectedOutcome": "Uses static PCAP only."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Uses static PCAP only.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Packet captures reveal network activity when used with legal authorization.",
            "furtherReading": [
              {
                "title": "scapy: official/reference documentation",
                "url": "https://scapy.readthedocs.io/en/stable/usage.html"
              },
              {
                "title": "pcapsamples: official/reference documentation",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "pandas: official/reference documentation",
                "url": "https://pandas.pydata.org/docs/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m17-l02",
          "slug": "m17-l2-traffic-and-protocol-classification",
          "title": "Module 17 - Lesson 2: Traffic and protocol classification",
          "description": "Direct topic demonstration. Count IP/TCP/UDP/DNS packets in sample. Verification: Counts are reproducible.",
          "youtubeVideoId": "ntObHsiCgkE",
          "videoAttribution": {
            "creator": "PenSecurity",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 17: PCAP Forensics with Scapy (Offline)",
          "objectives": [
            "Count IP/TCP/UDP/DNS packets in sample.",
            "Verify implementation: Counts are reproducible.",
            "Topic alignment: Direct topic demonstration",
            "Read PCAPs without live sniffing.",
            "Extract protocols and conversations."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-17",
            "automation"
          ],
          "skillsTaught": [
            "Traffic and protocol classification",
            "Security Python Scripting (Mod 17)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Traffic and protocol classification), learn defensive programming with video instruction by PenSecurity. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Traffic and protocol classification",
                "content": "Packet captures reveal network activity when used with legal authorization.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Count IP/TCP/UDP/DNS packets in sample.",
                  "Verification rule: Counts are reproducible.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'PenSecurity \u2014 Analyze PCAP with Scapy and Pandas (chapter starts 00:00)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Count IP/TCP/UDP/DNS packets in sample.",
                "expectedOutcome": "Counts are reproducible."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Counts are reproducible.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Packet captures reveal network activity when used with legal authorization.",
            "furtherReading": [
              {
                "title": "scapy: official/reference documentation",
                "url": "https://scapy.readthedocs.io/en/stable/usage.html"
              },
              {
                "title": "pcapsamples: official/reference documentation",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "pandas: official/reference documentation",
                "url": "https://pandas.pydata.org/docs/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m17-l03",
          "slug": "m17-l3-scapy-packet-layers",
          "title": "Module 17 - Lesson 3: Scapy packet layers",
          "description": "Direct topic demonstration. Observe packet fields in tutorial; adapt to rdpcap offline. Verification: No live capture in learner lab.",
          "youtubeVideoId": "rGVipQ1AtU8",
          "videoAttribution": {
            "creator": "Victor Akinode",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 17: PCAP Forensics with Scapy (Offline)",
          "objectives": [
            "Observe packet fields in tutorial; adapt to rdpcap offline.",
            "Verify implementation: No live capture in learner lab.",
            "Topic alignment: Direct topic demonstration",
            "Read PCAPs without live sniffing.",
            "Extract protocols and conversations."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-17",
            "automation"
          ],
          "skillsTaught": [
            "Scapy packet layers",
            "Security Python Scripting (Mod 17)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Scapy packet layers), learn defensive programming with video instruction by Victor Akinode. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Scapy packet layers",
                "content": "Packet captures reveal network activity when used with legal authorization.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Observe packet fields in tutorial; adapt to rdpcap offline.",
                  "Verification rule: No live capture in learner lab.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Victor Akinode \u2014 Packet Analysis with Scapy (chapter starts 00:00)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Observe packet fields in tutorial; adapt to rdpcap offline.",
                "expectedOutcome": "No live capture in learner lab."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "No live capture in learner lab.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Packet captures reveal network activity when used with legal authorization.",
            "furtherReading": [
              {
                "title": "scapy: official/reference documentation",
                "url": "https://scapy.readthedocs.io/en/stable/usage.html"
              },
              {
                "title": "pcapsamples: official/reference documentation",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "pandas: official/reference documentation",
                "url": "https://pandas.pydata.org/docs/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m17-l04",
          "slug": "m17-l4-collections-for-network-metrics",
          "title": "Module 17 - Lesson 4: Collections for network metrics",
          "description": "Technique bridge to this module\u2019s security lab. Summarize top source and destination IPs. Verification: Ranking includes tie behavior.",
          "youtubeVideoId": "HGOBQPFzWKo",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 17: PCAP Forensics with Scapy (Offline)",
          "objectives": [
            "Summarize top source and destination IPs.",
            "Verify implementation: Ranking includes tie behavior.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Read PCAPs without live sniffing.",
            "Extract protocols and conversations."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-17",
            "automation"
          ],
          "skillsTaught": [
            "Collections for network metrics",
            "Security Python Scripting (Mod 17)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Collections for network metrics), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Collections for network metrics",
                "content": "Packet captures reveal network activity when used with legal authorization.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Summarize top source and destination IPs.",
                  "Verification rule: Ranking includes tie behavior.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Intermediate Python Programming (chapter starts 01:22:50)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Summarize top source and destination IPs.",
                "expectedOutcome": "Ranking includes tie behavior."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Ranking includes tie behavior.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Packet captures reveal network activity when used with legal authorization.",
            "furtherReading": [
              {
                "title": "scapy: official/reference documentation",
                "url": "https://scapy.readthedocs.io/en/stable/usage.html"
              },
              {
                "title": "pcapsamples: official/reference documentation",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "pandas: official/reference documentation",
                "url": "https://pandas.pydata.org/docs/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-pysec-m17",
        "title": "Lab 17: PCAP Forensics with Scapy (Offline) Hands-on Implementation",
        "objective": "Packet captures reveal network activity when used with legal authorization. Packet captures reveal network activity when used with legal authorization. Work only with synthetic data from [LAB_DATASETS.md](../04-LAB-DATASETS.md) or an authorized personal VM.",
        "toolsRequired": [
          "Python 3.10+",
          "VS Code / Preferred Editor",
          "Safe Isolated Lab Directory"
        ],
        "pcapSource": {
          "fileName": "synthetic_m17_dataset.json",
          "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/data/synthetic_labs.json"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Download a clearly licensed/public sample capture from Wireshark SampleCaptures or generate a small own-loopback capture.",
          "Use Scapy rdpcap() to load it; never call sniff() in the module lab.",
          "Compute packet counts by protocol and top talkers.",
          "Document the limitations: encrypted payloads, incomplete capture and false positives."
        ],
        "tasks": [
          {
            "id": "task-m17-1",
            "description": "Download a clearly licensed/public sample capture from Wireshark SampleCaptures or generate a small own-loopback capture."
          },
          {
            "id": "task-m17-2",
            "description": "Use Scapy rdpcap() to load it; never call sniff() in the module lab."
          },
          {
            "id": "task-m17-3",
            "description": "Compute packet counts by protocol and top talkers."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "environment_provenance",
            "prompt": "Document your Python version, OS environment, and isolated directory path.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "execution_output",
            "prompt": "Provide terminal output demonstrating successful execution and edge-case handling.",
            "expectedEvidenceType": "Terminal output log"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Input file only; no packet injection.",
          "Counts reproducible.",
          "Packet evidence limitations explained."
        ]
      }
    },
    {
      "id": "mod-pysec-m18",
      "title": "Module 18: Safe URL Analysis, Web Data & OSINT Ethics",
      "description": "Automation phase. SOC triage often begins with suspicious links and publicly shared indicators. 6 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.",
      "order": 18,
      "lessons": [
        {
          "id": "les-pysec-m18-l01",
          "slug": "m18-l1-url-analyzer-project",
          "title": "Module 18 - Lesson 1: URL analyzer project",
          "description": "Direct topic demonstration. Split sample URLs into scheme, host, path and query. Verification: Defanged examples remain offline.",
          "youtubeVideoId": "KVmbRdwWohY",
          "videoAttribution": {
            "creator": "Hank Hackerson",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 18: Safe URL Analysis, Web Data & OSINT Ethics",
          "objectives": [
            "Split sample URLs into scheme, host, path and query.",
            "Verify implementation: Defanged examples remain offline.",
            "Topic alignment: Direct topic demonstration",
            "Parse URL structure without visiting it.",
            "Classify risk indicators without declaring proof."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-18",
            "automation"
          ],
          "skillsTaught": [
            "URL analyzer project",
            "Security Python Scripting (Mod 18)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (URL analyzer project), learn defensive programming with video instruction by Hank Hackerson. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: URL analyzer project",
                "content": "SOC triage often begins with suspicious links and publicly shared indicators.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Split sample URLs into scheme, host, path and query.",
                  "Verification rule: Defanged examples remain offline.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Hank Hackerson \u2014 Build Python Algorithms for Cybersecurity (chapter starts 03:37:31)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Split sample URLs into scheme, host, path and query.",
                "expectedOutcome": "Defanged examples remain offline."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Defanged examples remain offline.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. SOC triage often begins with suspicious links and publicly shared indicators.",
            "furtherReading": [
              {
                "title": "urlparse: official/reference documentation",
                "url": "https://docs.python.org/3/library/urllib.parse.html"
              },
              {
                "title": "regex: official/reference documentation",
                "url": "https://docs.python.org/3/library/re.html"
              },
              {
                "title": "security: official/reference documentation",
                "url": "https://owasp.org/www-project-top-ten/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m18-l02",
          "slug": "m18-l2-string-and-regex-checks",
          "title": "Module 18 - Lesson 2: String and regex checks",
          "description": "Direct topic demonstration. Detect unusual encodings and URL components. Verification: Samples classified without HTTP requests.",
          "youtubeVideoId": "KVmbRdwWohY",
          "videoAttribution": {
            "creator": "Hank Hackerson",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 18: Safe URL Analysis, Web Data & OSINT Ethics",
          "objectives": [
            "Detect unusual encodings and URL components.",
            "Verify implementation: Samples classified without HTTP requests.",
            "Topic alignment: Direct topic demonstration",
            "Parse URL structure without visiting it.",
            "Classify risk indicators without declaring proof."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-18",
            "automation"
          ],
          "skillsTaught": [
            "String and regex checks",
            "Security Python Scripting (Mod 18)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (String and regex checks), learn defensive programming with video instruction by Hank Hackerson. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: String and regex checks",
                "content": "SOC triage often begins with suspicious links and publicly shared indicators.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Detect unusual encodings and URL components.",
                  "Verification rule: Samples classified without HTTP requests.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Hank Hackerson \u2014 Build Python Algorithms for Cybersecurity (chapter starts 04:16:13)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Detect unusual encodings and URL components.",
                "expectedOutcome": "Samples classified without HTTP requests."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Samples classified without HTTP requests.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. SOC triage often begins with suspicious links and publicly shared indicators.",
            "furtherReading": [
              {
                "title": "urlparse: official/reference documentation",
                "url": "https://docs.python.org/3/library/urllib.parse.html"
              },
              {
                "title": "regex: official/reference documentation",
                "url": "https://docs.python.org/3/library/re.html"
              },
              {
                "title": "security: official/reference documentation",
                "url": "https://owasp.org/www-project-top-ten/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m18-l03",
          "slug": "m18-l3-http-foundations",
          "title": "Module 18 - Lesson 3: HTTP foundations",
          "description": "Technique bridge to this module\u2019s security lab. Explain why following a URL can cause network activity. Verification: Analyst keeps URLs unvisited.",
          "youtubeVideoId": "0sOvCWFmrtA",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 18: Safe URL Analysis, Web Data & OSINT Ethics",
          "objectives": [
            "Explain why following a URL can cause network activity.",
            "Verify implementation: Analyst keeps URLs unvisited.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Parse URL structure without visiting it.",
            "Classify risk indicators without declaring proof."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-18",
            "automation"
          ],
          "skillsTaught": [
            "HTTP foundations",
            "Security Python Scripting (Mod 18)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (HTTP foundations), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: HTTP foundations",
                "content": "SOC triage often begins with suspicious links and publicly shared indicators.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Explain why following a URL can cause network activity.",
                  "Verification rule: Analyst keeps URLs unvisited.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Python API Development (FastAPI) (chapter starts 00:57:34)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Explain why following a URL can cause network activity.",
                "expectedOutcome": "Analyst keeps URLs unvisited."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Analyst keeps URLs unvisited.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. SOC triage often begins with suspicious links and publicly shared indicators.",
            "furtherReading": [
              {
                "title": "urlparse: official/reference documentation",
                "url": "https://docs.python.org/3/library/urllib.parse.html"
              },
              {
                "title": "regex: official/reference documentation",
                "url": "https://docs.python.org/3/library/re.html"
              },
              {
                "title": "security: official/reference documentation",
                "url": "https://owasp.org/www-project-top-ten/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m18-l04",
          "slug": "m18-l4-ethical-research-practices",
          "title": "Module 18 - Lesson 4: Ethical research practices",
          "description": "Technique bridge to this module\u2019s security lab. Discuss authorized scope for web research and privacy. Verification: No site crawling performed.",
          "youtubeVideoId": "Fxh9X3-hO4Y",
          "videoAttribution": {
            "creator": "CyberFlow",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 18: Safe URL Analysis, Web Data & OSINT Ethics",
          "objectives": [
            "Discuss authorized scope for web research and privacy.",
            "Verify implementation: No site crawling performed.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Parse URL structure without visiting it.",
            "Classify risk indicators without declaring proof."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-18",
            "automation"
          ],
          "skillsTaught": [
            "Ethical research practices",
            "Security Python Scripting (Mod 18)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Ethical research practices), learn defensive programming with video instruction by CyberFlow. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Ethical research practices",
                "content": "SOC triage often begins with suspicious links and publicly shared indicators.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Discuss authorized scope for web research and privacy.",
                  "Verification rule: No site crawling performed.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'CyberFlow \u2014 Best Way to Learn Python for Hacking (chapter starts 03:33)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Discuss authorized scope for web research and privacy.",
                "expectedOutcome": "No site crawling performed."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "No site crawling performed.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. SOC triage often begins with suspicious links and publicly shared indicators.",
            "furtherReading": [
              {
                "title": "urlparse: official/reference documentation",
                "url": "https://docs.python.org/3/library/urllib.parse.html"
              },
              {
                "title": "regex: official/reference documentation",
                "url": "https://docs.python.org/3/library/re.html"
              },
              {
                "title": "security: official/reference documentation",
                "url": "https://owasp.org/www-project-top-ten/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-pysec-m18",
        "title": "Lab 18: Safe URL Analysis, Web Data & OSINT Ethics Hands-on Implementation",
        "objective": "SOC triage often begins with suspicious links and publicly shared indicators. SOC triage often begins with suspicious links and publicly shared indicators. Work only with synthetic data from [LAB_DATASETS.md](../04-LAB-DATASETS.md) or an authorized personal VM.",
        "toolsRequired": [
          "Python 3.10+",
          "VS Code / Preferred Editor",
          "Safe Isolated Lab Directory"
        ],
        "pcapSource": {
          "fileName": "synthetic_m18_dataset.json",
          "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/data/synthetic_labs.json"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Use five defanged training URLs from LAB_DATASETS.md.",
          "Parse with urllib.parse.urlsplit and preserve the original input.",
          "Flag use of literal IP hostname, unusual lengths and embedded credentials as heuristics only.",
          "Write a triage note distinguishing observation, inference and next steps."
        ],
        "tasks": [
          {
            "id": "task-m18-1",
            "description": "Use five defanged training URLs from LAB_DATASETS.md."
          },
          {
            "id": "task-m18-2",
            "description": "Parse with urllib.parse.urlsplit and preserve the original input."
          },
          {
            "id": "task-m18-3",
            "description": "Flag use of literal IP hostname, unusual lengths and embedded credentials as heuristics only."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "environment_provenance",
            "prompt": "Document your Python version, OS environment, and isolated directory path.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "execution_output",
            "prompt": "Provide terminal output demonstrating successful execution and edge-case handling.",
            "expectedEvidenceType": "Terminal output log"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "No links clicked automatically.",
          "No personal data collection.",
          "Heuristics not labeled as verdicts."
        ]
      }
    },
    {
      "id": "mod-pysec-m19",
      "title": "Module 19: Pandas, Time Windows & Security Analytics",
      "description": "Automation phase. Investigators correlate large events into timelines and patterns. 7 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.",
      "order": 19,
      "lessons": [
        {
          "id": "les-pysec-m19-l01",
          "slug": "m19-l1-dictionaries-and-event-records",
          "title": "Module 19 - Lesson 1: Dictionaries and event records",
          "description": "Technique bridge to this module\u2019s security lab. Normalize nested log events into row-oriented records. Verification: All required fields exist.",
          "youtubeVideoId": "HGOBQPFzWKo",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 19: Pandas, Time Windows & Security Analytics",
          "objectives": [
            "Normalize nested log events into row-oriented records.",
            "Verify implementation: All required fields exist.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Transform events into a tabular schema.",
            "Aggregate time windows safely."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-19",
            "automation"
          ],
          "skillsTaught": [
            "Dictionaries and event records",
            "Security Python Scripting (Mod 19)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Dictionaries and event records), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Dictionaries and event records",
                "content": "Investigators correlate large events into timelines and patterns.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Normalize nested log events into row-oriented records.",
                  "Verification rule: All required fields exist.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Intermediate Python Programming (chapter starts 00:29:49)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Normalize nested log events into row-oriented records.",
                "expectedOutcome": "All required fields exist."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "All required fields exist.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Investigators correlate large events into timelines and patterns.",
            "furtherReading": [
              {
                "title": "pandas: official/reference documentation",
                "url": "https://pandas.pydata.org/docs/"
              },
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              },
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m19-l02",
          "slug": "m19-l2-date-and-time-handling",
          "title": "Module 19 - Lesson 2: Date and time handling",
          "description": "Technique bridge to this module\u2019s security lab. Convert synthetic timestamps to aware UTC datetimes. Verification: No naive datetime at output.",
          "youtubeVideoId": "oDOw5tB3Udw",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 19: Pandas, Time Windows & Security Analytics",
          "objectives": [
            "Convert synthetic timestamps to aware UTC datetimes.",
            "Verify implementation: No naive datetime at output.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Transform events into a tabular schema.",
            "Aggregate time windows safely."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-19",
            "automation"
          ],
          "skillsTaught": [
            "Date and time handling",
            "Security Python Scripting (Mod 19)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Date and time handling), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Date and time handling",
                "content": "Investigators correlate large events into timelines and patterns.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Convert synthetic timestamps to aware UTC datetimes.",
                  "Verification rule: No naive datetime at output.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Python for Beginners with Hands-On Projects (chapter starts 05:26:38)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Convert synthetic timestamps to aware UTC datetimes.",
                "expectedOutcome": "No naive datetime at output."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "No naive datetime at output.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Investigators correlate large events into timelines and patterns.",
            "furtherReading": [
              {
                "title": "pandas: official/reference documentation",
                "url": "https://pandas.pydata.org/docs/"
              },
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              },
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m19-l03",
          "slug": "m19-l3-collections-and-aggregation",
          "title": "Module 19 - Lesson 3: Collections and aggregation",
          "description": "Technique bridge to this module\u2019s security lab. Aggregate failures by 5-minute window. Verification: Counts hand-verified.",
          "youtubeVideoId": "HGOBQPFzWKo",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 19: Pandas, Time Windows & Security Analytics",
          "objectives": [
            "Aggregate failures by 5-minute window.",
            "Verify implementation: Counts hand-verified.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Transform events into a tabular schema.",
            "Aggregate time windows safely."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-19",
            "automation"
          ],
          "skillsTaught": [
            "Collections and aggregation",
            "Security Python Scripting (Mod 19)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Collections and aggregation), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Collections and aggregation",
                "content": "Investigators correlate large events into timelines and patterns.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Aggregate failures by 5-minute window.",
                  "Verification rule: Counts hand-verified.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Intermediate Python Programming (chapter starts 01:22:50)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Aggregate failures by 5-minute window.",
                "expectedOutcome": "Counts hand-verified."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Counts hand-verified.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Investigators correlate large events into timelines and patterns.",
            "furtherReading": [
              {
                "title": "pandas: official/reference documentation",
                "url": "https://pandas.pydata.org/docs/"
              },
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              },
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m19-l04",
          "slug": "m19-l4-pcap-plus-pandas-demonstration",
          "title": "Module 19 - Lesson 4: PCAP plus Pandas demonstration",
          "description": "Technique bridge to this module\u2019s security lab. Adapt group-by concepts to security events. Verification: Small table matches reference output.",
          "youtubeVideoId": "ntObHsiCgkE",
          "videoAttribution": {
            "creator": "PenSecurity",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 19: Pandas, Time Windows & Security Analytics",
          "objectives": [
            "Adapt group-by concepts to security events.",
            "Verify implementation: Small table matches reference output.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Transform events into a tabular schema.",
            "Aggregate time windows safely."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-19",
            "automation"
          ],
          "skillsTaught": [
            "PCAP plus Pandas demonstration",
            "Security Python Scripting (Mod 19)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (PCAP plus Pandas demonstration), learn defensive programming with video instruction by PenSecurity. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: PCAP plus Pandas demonstration",
                "content": "Investigators correlate large events into timelines and patterns.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Adapt group-by concepts to security events.",
                  "Verification rule: Small table matches reference output.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'PenSecurity \u2014 Analyze PCAP with Scapy and Pandas (chapter starts 00:00)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Adapt group-by concepts to security events.",
                "expectedOutcome": "Small table matches reference output."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Small table matches reference output.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Investigators correlate large events into timelines and patterns.",
            "furtherReading": [
              {
                "title": "pandas: official/reference documentation",
                "url": "https://pandas.pydata.org/docs/"
              },
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              },
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-pysec-m19",
        "title": "Lab 19: Pandas, Time Windows & Security Analytics Hands-on Implementation",
        "objective": "Investigators correlate large events into timelines and patterns. Investigators correlate large events into timelines and patterns. Work only with synthetic data from [LAB_DATASETS.md](../04-LAB-DATASETS.md) or an authorized personal VM.",
        "toolsRequired": [
          "Python 3.10+",
          "VS Code / Preferred Editor",
          "Safe Isolated Lab Directory"
        ],
        "pcapSource": {
          "fileName": "synthetic_m19_dataset.json",
          "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/data/synthetic_labs.json"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Build a pandas DataFrame from 100 generated authentication events.",
          "Normalize timezone and detect invalid/missing timestamps.",
          "Produce per-user counts and time-bucket summaries.",
          "Write a markdown table for a shift handover, without overclaiming causation."
        ],
        "tasks": [
          {
            "id": "task-m19-1",
            "description": "Build a pandas DataFrame from 100 generated authentication events."
          },
          {
            "id": "task-m19-2",
            "description": "Normalize timezone and detect invalid/missing timestamps."
          },
          {
            "id": "task-m19-3",
            "description": "Produce per-user counts and time-bucket summaries."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "environment_provenance",
            "prompt": "Document your Python version, OS environment, and isolated directory path.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "execution_output",
            "prompt": "Provide terminal output demonstrating successful execution and edge-case handling.",
            "expectedEvidenceType": "Terminal output log"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Timezones explicit.",
          "Missing values counted.",
          "Aggregation reproducible."
        ]
      }
    },
    {
      "id": "mod-pysec-m20",
      "title": "Module 20: Concurrency, Generators & Performance",
      "description": "Automation phase. A SOC helper must process many alerts without exhausting resources or overloading APIs. 7 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.",
      "order": 20,
      "lessons": [
        {
          "id": "les-pysec-m20-l01",
          "slug": "m20-l1-generators",
          "title": "Module 20 - Lesson 1: Generators",
          "description": "Direct topic demonstration. Stream a file one line at a time. Verification: Memory usage bounded by a small buffer.",
          "youtubeVideoId": "HGOBQPFzWKo",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 20: Concurrency, Generators & Performance",
          "objectives": [
            "Stream a file one line at a time.",
            "Verify implementation: Memory usage bounded by a small buffer.",
            "Topic alignment: Direct topic demonstration",
            "Explain generators vs lists.",
            "Compare threads vs processes."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-20",
            "automation"
          ],
          "skillsTaught": [
            "Generators",
            "Security Python Scripting (Mod 20)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Generators), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Generators",
                "content": "A SOC helper must process many alerts without exhausting resources or overloading APIs.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Stream a file one line at a time.",
                  "Verification rule: Memory usage bounded by a small buffer.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Intermediate Python Programming (chapter starts 03:35:32)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Stream a file one line at a time.",
                "expectedOutcome": "Memory usage bounded by a small buffer."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Memory usage bounded by a small buffer.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. A SOC helper must process many alerts without exhausting resources or overloading APIs.",
            "furtherReading": [
              {
                "title": "library: official/reference documentation",
                "url": "https://docs.python.org/3/library/"
              },
              {
                "title": "pytest: official/reference documentation",
                "url": "https://docs.pytest.org/en/stable/"
              },
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m20-l02",
          "slug": "m20-l2-threading-vs-multiprocessing",
          "title": "Module 20 - Lesson 2: Threading vs multiprocessing",
          "description": "Direct topic demonstration. Choose threads for I/O-bound mock enrichment. Verification: Justification written.",
          "youtubeVideoId": "HGOBQPFzWKo",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 20: Concurrency, Generators & Performance",
          "objectives": [
            "Choose threads for I/O-bound mock enrichment.",
            "Verify implementation: Justification written.",
            "Topic alignment: Direct topic demonstration",
            "Explain generators vs lists.",
            "Compare threads vs processes."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-20",
            "automation"
          ],
          "skillsTaught": [
            "Threading vs multiprocessing",
            "Security Python Scripting (Mod 20)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Threading vs multiprocessing), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Threading vs multiprocessing",
                "content": "A SOC helper must process many alerts without exhausting resources or overloading APIs.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Choose threads for I/O-bound mock enrichment.",
                  "Verification rule: Justification written.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Intermediate Python Programming (chapter starts 03:53:29)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Choose threads for I/O-bound mock enrichment.",
                "expectedOutcome": "Justification written."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Justification written.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. A SOC helper must process many alerts without exhausting resources or overloading APIs.",
            "furtherReading": [
              {
                "title": "library: official/reference documentation",
                "url": "https://docs.python.org/3/library/"
              },
              {
                "title": "pytest: official/reference documentation",
                "url": "https://docs.pytest.org/en/stable/"
              },
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m20-l03",
          "slug": "m20-l3-multithreading",
          "title": "Module 20 - Lesson 3: Multithreading",
          "description": "Technique bridge to this module\u2019s security lab. Run mock independent tasks with a small worker pool. Verification: Thread count bounded.",
          "youtubeVideoId": "HGOBQPFzWKo",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 20: Concurrency, Generators & Performance",
          "objectives": [
            "Run mock independent tasks with a small worker pool.",
            "Verify implementation: Thread count bounded.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Explain generators vs lists.",
            "Compare threads vs processes."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-20",
            "automation"
          ],
          "skillsTaught": [
            "Multithreading",
            "Security Python Scripting (Mod 20)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Multithreading), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Multithreading",
                "content": "A SOC helper must process many alerts without exhausting resources or overloading APIs.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Run mock independent tasks with a small worker pool.",
                  "Verification rule: Thread count bounded.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Intermediate Python Programming (chapter starts 04:07:59)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Run mock independent tasks with a small worker pool.",
                "expectedOutcome": "Thread count bounded."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Thread count bounded.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. A SOC helper must process many alerts without exhausting resources or overloading APIs.",
            "furtherReading": [
              {
                "title": "library: official/reference documentation",
                "url": "https://docs.python.org/3/library/"
              },
              {
                "title": "pytest: official/reference documentation",
                "url": "https://docs.pytest.org/en/stable/"
              },
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m20-l04",
          "slug": "m20-l4-testing-concurrency",
          "title": "Module 20 - Lesson 4: Testing concurrency",
          "description": "Technique bridge to this module\u2019s security lab. Mock delayed responses and timeouts. Verification: Network not required.",
          "youtubeVideoId": "cHYq1MRoyI0",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 20: Concurrency, Generators & Performance",
          "objectives": [
            "Mock delayed responses and timeouts.",
            "Verify implementation: Network not required.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Explain generators vs lists.",
            "Compare threads vs processes."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-20",
            "automation"
          ],
          "skillsTaught": [
            "Testing concurrency",
            "Security Python Scripting (Mod 20)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Testing concurrency), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Testing concurrency",
                "content": "A SOC helper must process many alerts without exhausting resources or overloading APIs.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Mock delayed responses and timeouts.",
                  "Verification rule: Network not required.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Pytest Tutorial (chapter starts 00:55:24)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Mock delayed responses and timeouts.",
                "expectedOutcome": "Network not required."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Network not required.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. A SOC helper must process many alerts without exhausting resources or overloading APIs.",
            "furtherReading": [
              {
                "title": "library: official/reference documentation",
                "url": "https://docs.python.org/3/library/"
              },
              {
                "title": "pytest: official/reference documentation",
                "url": "https://docs.pytest.org/en/stable/"
              },
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-pysec-m20",
        "title": "Lab 20: Concurrency, Generators & Performance Hands-on Implementation",
        "objective": "A SOC helper must process many alerts without exhausting resources or overloading APIs. A SOC helper must process many alerts without exhausting resources or overloading APIs. Work only with synthetic data from [LAB_DATASETS.md](../04-LAB-DATASETS.md) or an authorized personal VM.",
        "toolsRequired": [
          "Python 3.10+",
          "VS Code / Preferred Editor",
          "Safe Isolated Lab Directory"
        ],
        "pcapSource": {
          "fileName": "synthetic_m20_dataset.json",
          "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/data/synthetic_labs.json"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Generate 10,000 synthetic alerts with fixed seed.",
          "Compare line streaming against reading the entire file on the same lab machine.",
          "Process enrichment through a bounded worker pool of 3; simulate rate limit.",
          "Write a brief run-time and resource-use table with caveats."
        ],
        "tasks": [
          {
            "id": "task-m20-1",
            "description": "Generate 10,000 synthetic alerts with fixed seed."
          },
          {
            "id": "task-m20-2",
            "description": "Compare line streaming against reading the entire file on the same lab machine."
          },
          {
            "id": "task-m20-3",
            "description": "Process enrichment through a bounded worker pool of 3; simulate rate limit."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "environment_provenance",
            "prompt": "Document your Python version, OS environment, and isolated directory path.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "execution_output",
            "prompt": "Provide terminal output demonstrating successful execution and edge-case handling.",
            "expectedEvidenceType": "Terminal output log"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "No unbounded work queue.",
          "Output count correct.",
          "Reproducibility documented."
        ]
      }
    },
    {
      "id": "mod-pysec-m21",
      "title": "Module 21: Threat Intelligence & IOC Enrichment",
      "description": "Detection phase. SOC enrichment correlates local indicators with curated, permitted intelligence. 8 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.",
      "order": 21,
      "lessons": [
        {
          "id": "les-pysec-m21-l01",
          "slug": "m21-l1-json-handling-for-ioc-feeds",
          "title": "Module 21 - Lesson 1: JSON handling for IOC feeds",
          "description": "Technique bridge to this module\u2019s security lab. Parse a sample offline threat feed and retain source/time. Verification: Provenance stored.",
          "youtubeVideoId": "HGOBQPFzWKo",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 21: Threat Intelligence & IOC Enrichment",
          "objectives": [
            "Parse a sample offline threat feed and retain source/time.",
            "Verify implementation: Provenance stored.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Normalize IOC types.",
            "Cache mock enrichment responses."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-21",
            "detection"
          ],
          "skillsTaught": [
            "JSON handling for IOC feeds",
            "Security Python Scripting (Mod 21)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (JSON handling for IOC feeds), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: JSON handling for IOC feeds",
                "content": "SOC enrichment correlates local indicators with curated, permitted intelligence.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Parse a sample offline threat feed and retain source/time.",
                  "Verification rule: Provenance stored.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Intermediate Python Programming (chapter starts 02:42:20)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Parse a sample offline threat feed and retain source/time.",
                "expectedOutcome": "Provenance stored."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Provenance stored.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. SOC enrichment correlates local indicators with curated, permitted intelligence.",
            "furtherReading": [
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              },
              {
                "title": "requests: official/reference documentation",
                "url": "https://requests.readthedocs.io/en/latest/"
              },
              {
                "title": "pytest: official/reference documentation",
                "url": "https://docs.pytest.org/en/stable/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m21-l02",
          "slug": "m21-l2-request-api-concepts",
          "title": "Module 21 - Lesson 2: Request API concepts",
          "description": "Technique bridge to this module\u2019s security lab. Design a GET wrapper with timeout and response validation. Verification: No real API token required.",
          "youtubeVideoId": "0sOvCWFmrtA",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 21: Threat Intelligence & IOC Enrichment",
          "objectives": [
            "Design a GET wrapper with timeout and response validation.",
            "Verify implementation: No real API token required.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Normalize IOC types.",
            "Cache mock enrichment responses."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-21",
            "detection"
          ],
          "skillsTaught": [
            "Request API concepts",
            "Security Python Scripting (Mod 21)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Request API concepts), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Request API concepts",
                "content": "SOC enrichment correlates local indicators with curated, permitted intelligence.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Design a GET wrapper with timeout and response validation.",
                  "Verification rule: No real API token required.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Python API Development (FastAPI) (chapter starts 00:57:34)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Design a GET wrapper with timeout and response validation.",
                "expectedOutcome": "No real API token required."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "No real API token required.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. SOC enrichment correlates local indicators with curated, permitted intelligence.",
            "furtherReading": [
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              },
              {
                "title": "requests: official/reference documentation",
                "url": "https://requests.readthedocs.io/en/latest/"
              },
              {
                "title": "pytest: official/reference documentation",
                "url": "https://docs.pytest.org/en/stable/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m21-l03",
          "slug": "m21-l3-string-matching",
          "title": "Module 21 - Lesson 3: String matching",
          "description": "Technique bridge to this module\u2019s security lab. Match normalized indicators against mock alerts. Verification: Case handling explicit.",
          "youtubeVideoId": "KVmbRdwWohY",
          "videoAttribution": {
            "creator": "Hank Hackerson",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 21: Threat Intelligence & IOC Enrichment",
          "objectives": [
            "Match normalized indicators against mock alerts.",
            "Verify implementation: Case handling explicit.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Normalize IOC types.",
            "Cache mock enrichment responses."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-21",
            "detection"
          ],
          "skillsTaught": [
            "String matching",
            "Security Python Scripting (Mod 21)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (String matching), learn defensive programming with video instruction by Hank Hackerson. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: String matching",
                "content": "SOC enrichment correlates local indicators with curated, permitted intelligence.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Match normalized indicators against mock alerts.",
                  "Verification rule: Case handling explicit.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Hank Hackerson \u2014 Build Python Algorithms for Cybersecurity (chapter starts 03:28:08)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Match normalized indicators against mock alerts.",
                "expectedOutcome": "Case handling explicit."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Case handling explicit.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. SOC enrichment correlates local indicators with curated, permitted intelligence.",
            "furtherReading": [
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              },
              {
                "title": "requests: official/reference documentation",
                "url": "https://requests.readthedocs.io/en/latest/"
              },
              {
                "title": "pytest: official/reference documentation",
                "url": "https://docs.pytest.org/en/stable/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m21-l04",
          "slug": "m21-l4-mock-driven-unit-tests",
          "title": "Module 21 - Lesson 4: Mock-driven unit tests",
          "description": "Technique bridge to this module\u2019s security lab. Simulate no match, match and unavailable feed. Verification: All three states distinguished.",
          "youtubeVideoId": "cHYq1MRoyI0",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 21: Threat Intelligence & IOC Enrichment",
          "objectives": [
            "Simulate no match, match and unavailable feed.",
            "Verify implementation: All three states distinguished.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Normalize IOC types.",
            "Cache mock enrichment responses."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-21",
            "detection"
          ],
          "skillsTaught": [
            "Mock-driven unit tests",
            "Security Python Scripting (Mod 21)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Mock-driven unit tests), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Mock-driven unit tests",
                "content": "SOC enrichment correlates local indicators with curated, permitted intelligence.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Simulate no match, match and unavailable feed.",
                  "Verification rule: All three states distinguished.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Pytest Tutorial (chapter starts 00:55:24)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Simulate no match, match and unavailable feed.",
                "expectedOutcome": "All three states distinguished."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "All three states distinguished.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. SOC enrichment correlates local indicators with curated, permitted intelligence.",
            "furtherReading": [
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              },
              {
                "title": "requests: official/reference documentation",
                "url": "https://requests.readthedocs.io/en/latest/"
              },
              {
                "title": "pytest: official/reference documentation",
                "url": "https://docs.pytest.org/en/stable/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-pysec-m21",
        "title": "Lab 21: Threat Intelligence & IOC Enrichment Hands-on Implementation",
        "objective": "SOC enrichment correlates local indicators with curated, permitted intelligence. SOC enrichment correlates local indicators with curated, permitted intelligence. Work only with synthetic data from [LAB_DATASETS.md](../04-LAB-DATASETS.md) or an authorized personal VM.",
        "toolsRequired": [
          "Python 3.10+",
          "VS Code / Preferred Editor",
          "Safe Isolated Lab Directory"
        ],
        "pcapSource": {
          "fileName": "synthetic_m21_dataset.json",
          "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/data/synthetic_labs.json"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Create mock threat feed records with indicator, type, source, published time and confidence.",
          "Normalize IPs/domains/hashes and de-duplicate them.",
          "Join feed data to a sample 40-alert table.",
          "Produce findings labeling feed matches as leads, not proof of compromise."
        ],
        "tasks": [
          {
            "id": "task-m21-1",
            "description": "Create mock threat feed records with indicator, type, source, published time and confidence."
          },
          {
            "id": "task-m21-2",
            "description": "Normalize IPs/domains/hashes and de-duplicate them."
          },
          {
            "id": "task-m21-3",
            "description": "Join feed data to a sample 40-alert table."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "environment_provenance",
            "prompt": "Document your Python version, OS environment, and isolated directory path.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "execution_output",
            "prompt": "Provide terminal output demonstrating successful execution and edge-case handling.",
            "expectedEvidenceType": "Terminal output log"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Feed provenance retained.",
          "Missing feed distinguished from clear verdict.",
          "No personal data."
        ]
      }
    },
    {
      "id": "mod-pysec-m22",
      "title": "Module 22: Cryptography, SHA-256 & File Integrity",
      "description": "Detection phase. File hashes detect changes but do not independently prove maliciousness. 8 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.",
      "order": 22,
      "lessons": [
        {
          "id": "les-pysec-m22-l01",
          "slug": "m22-l1-hash-functions-and-integrity",
          "title": "Module 22 - Lesson 1: Hash functions and integrity",
          "description": "Direct topic demonstration. Hash a local synthetic text file using hashlib. Verification: Digest length is 64 hex characters.",
          "youtubeVideoId": "cMdgDTgxx6o",
          "videoAttribution": {
            "creator": "Adrian Dolinay",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 22: Cryptography, SHA-256 & File Integrity",
          "objectives": [
            "Hash a local synthetic text file using hashlib.",
            "Verify implementation: Digest length is 64 hex characters.",
            "Topic alignment: Direct topic demonstration",
            "Compute SHA-256 safely.",
            "Build a baseline/check workflow."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-22",
            "detection"
          ],
          "skillsTaught": [
            "Hash functions and integrity",
            "Security Python Scripting (Mod 22)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Hash functions and integrity), learn defensive programming with video instruction by Adrian Dolinay. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Hash functions and integrity",
                "content": "File hashes detect changes but do not independently prove maliciousness.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Hash a local synthetic text file using hashlib.",
                  "Verification rule: Digest length is 64 hex characters.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Adrian Dolinay \u2014 Python File Integrity with Hashes (chapter starts 00:01:08)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Hash a local synthetic text file using hashlib.",
                "expectedOutcome": "Digest length is 64 hex characters."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Digest length is 64 hex characters.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. File hashes detect changes but do not independently prove maliciousness.",
            "furtherReading": [
              {
                "title": "hashlib: official/reference documentation",
                "url": "https://docs.python.org/3/library/hashlib.html"
              },
              {
                "title": "cryptography: official/reference documentation",
                "url": "https://cryptography.io/en/latest/"
              },
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m22-l02",
          "slug": "m22-l2-integrity-verification-code",
          "title": "Module 22 - Lesson 2: Integrity verification code",
          "description": "Direct topic demonstration. Create a streaming file-hash helper. Verification: Large file read in chunks.",
          "youtubeVideoId": "kb_scuDUHls",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 22: Cryptography, SHA-256 & File Integrity",
          "objectives": [
            "Create a streaming file-hash helper.",
            "Verify implementation: Large file read in chunks.",
            "Topic alignment: Direct topic demonstration",
            "Compute SHA-256 safely.",
            "Build a baseline/check workflow."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-22",
            "detection"
          ],
          "skillsTaught": [
            "Integrity verification code",
            "Security Python Scripting (Mod 22)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Integrity verification code), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Integrity verification code",
                "content": "File hashes detect changes but do not independently prove maliciousness.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Create a streaming file-hash helper.",
                  "Verification rule: Large file read in chunks.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Cryptography with Python (chapter starts 00:13:46)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Create a streaming file-hash helper.",
                "expectedOutcome": "Large file read in chunks."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Large file read in chunks.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. File hashes detect changes but do not independently prove maliciousness.",
            "furtherReading": [
              {
                "title": "hashlib: official/reference documentation",
                "url": "https://docs.python.org/3/library/hashlib.html"
              },
              {
                "title": "cryptography: official/reference documentation",
                "url": "https://cryptography.io/en/latest/"
              },
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m22-l03",
          "slug": "m22-l3-compare-baseline-and-altered-artifact",
          "title": "Module 22 - Lesson 3: Compare baseline and altered artifact",
          "description": "Direct topic demonstration. Change one byte and observe digest difference. Verification: Modified file detected.",
          "youtubeVideoId": "kb_scuDUHls",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 22: Cryptography, SHA-256 & File Integrity",
          "objectives": [
            "Change one byte and observe digest difference.",
            "Verify implementation: Modified file detected.",
            "Topic alignment: Direct topic demonstration",
            "Compute SHA-256 safely.",
            "Build a baseline/check workflow."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-22",
            "detection"
          ],
          "skillsTaught": [
            "Compare baseline and altered artifact",
            "Security Python Scripting (Mod 22)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Compare baseline and altered artifact), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Compare baseline and altered artifact",
                "content": "File hashes detect changes but do not independently prove maliciousness.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Change one byte and observe digest difference.",
                  "Verification rule: Modified file detected.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Cryptography with Python (chapter starts 00:18:36)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Change one byte and observe digest difference.",
                "expectedOutcome": "Modified file detected."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Modified file detected.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. File hashes detect changes but do not independently prove maliciousness.",
            "furtherReading": [
              {
                "title": "hashlib: official/reference documentation",
                "url": "https://docs.python.org/3/library/hashlib.html"
              },
              {
                "title": "cryptography: official/reference documentation",
                "url": "https://cryptography.io/en/latest/"
              },
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m22-l04",
          "slug": "m22-l4-cryptography-and-passwords",
          "title": "Module 22 - Lesson 4: Cryptography and passwords",
          "description": "Direct topic demonstration. Explain key storage, encryption and password hash distinction. Verification: No passwords stored as plaintext in repo.",
          "youtubeVideoId": "kb_scuDUHls",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 22: Cryptography, SHA-256 & File Integrity",
          "objectives": [
            "Explain key storage, encryption and password hash distinction.",
            "Verify implementation: No passwords stored as plaintext in repo.",
            "Topic alignment: Direct topic demonstration",
            "Compute SHA-256 safely.",
            "Build a baseline/check workflow."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-22",
            "detection"
          ],
          "skillsTaught": [
            "Cryptography and passwords",
            "Security Python Scripting (Mod 22)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Cryptography and passwords), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Cryptography and passwords",
                "content": "File hashes detect changes but do not independently prove maliciousness.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Explain key storage, encryption and password hash distinction.",
                  "Verification rule: No passwords stored as plaintext in repo.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Cryptography with Python (chapter starts 00:30:03)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Explain key storage, encryption and password hash distinction.",
                "expectedOutcome": "No passwords stored as plaintext in repo."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "No passwords stored as plaintext in repo.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. File hashes detect changes but do not independently prove maliciousness.",
            "furtherReading": [
              {
                "title": "hashlib: official/reference documentation",
                "url": "https://docs.python.org/3/library/hashlib.html"
              },
              {
                "title": "cryptography: official/reference documentation",
                "url": "https://cryptography.io/en/latest/"
              },
              {
                "title": "python: official/reference documentation",
                "url": "https://docs.python.org/3/tutorial/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-pysec-m22",
        "title": "Lab 22: Cryptography, SHA-256 & File Integrity Hands-on Implementation",
        "objective": "File hashes detect changes but do not independently prove maliciousness. File hashes detect changes but do not independently prove maliciousness. Work only with synthetic data from [LAB_DATASETS.md](../04-LAB-DATASETS.md) or an authorized personal VM.",
        "toolsRequired": [
          "Python 3.10+",
          "VS Code / Preferred Editor",
          "Safe Isolated Lab Directory"
        ],
        "pcapSource": {
          "fileName": "synthetic_m22_dataset.json",
          "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/data/synthetic_labs.json"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Create two synthetic evidence files.",
          "Compute SHA-256 hashes and store baseline in a JSON manifest.",
          "Modify one test file; report added, removed and changed files.",
          "Discuss why hashes alone cannot identify malicious intent and cannot replace signatures."
        ],
        "tasks": [
          {
            "id": "task-m22-1",
            "description": "Create two synthetic evidence files."
          },
          {
            "id": "task-m22-2",
            "description": "Compute SHA-256 hashes and store baseline in a JSON manifest."
          },
          {
            "id": "task-m22-3",
            "description": "Modify one test file; report added, removed and changed files."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "environment_provenance",
            "prompt": "Document your Python version, OS environment, and isolated directory path.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "execution_output",
            "prompt": "Provide terminal output demonstrating successful execution and edge-case handling.",
            "expectedEvidenceType": "Terminal output log"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Baseline matches originals.",
          "Changes detected.",
          "No insecure encryption invented."
        ]
      }
    },
    {
      "id": "mod-pysec-m23",
      "title": "Module 23: Phishing Email Triage with Python",
      "description": "Detection phase. Email is a major incident intake source and requires careful evidence handling. 8 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.",
      "order": 23,
      "lessons": [
        {
          "id": "les-pysec-m23-l01",
          "slug": "m23-l1-email-and-string-parsing",
          "title": "Module 23 - Lesson 1: Email and string parsing",
          "description": "Direct topic demonstration. Normalize display-name and subject fields from synthetic email. Verification: Raw values preserved separately.",
          "youtubeVideoId": "KVmbRdwWohY",
          "videoAttribution": {
            "creator": "Hank Hackerson",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 23: Phishing Email Triage with Python",
          "objectives": [
            "Normalize display-name and subject fields from synthetic email.",
            "Verify implementation: Raw values preserved separately.",
            "Topic alignment: Direct topic demonstration",
            "Parse offline .eml structure.",
            "Extract sender, URLs and attachments metadata."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-23",
            "detection"
          ],
          "skillsTaught": [
            "Email and string parsing",
            "Security Python Scripting (Mod 23)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Email and string parsing), learn defensive programming with video instruction by Hank Hackerson. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Email and string parsing",
                "content": "Email is a major incident intake source and requires careful evidence handling.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Normalize display-name and subject fields from synthetic email.",
                  "Verification rule: Raw values preserved separately.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Hank Hackerson \u2014 Build Python Algorithms for Cybersecurity (chapter starts 03:10:23)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Normalize display-name and subject fields from synthetic email.",
                "expectedOutcome": "Raw values preserved separately."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Raw values preserved separately.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Email is a major incident intake source and requires careful evidence handling.",
            "furtherReading": [
              {
                "title": "email: official/reference documentation",
                "url": "https://docs.python.org/3/library/email.html"
              },
              {
                "title": "urlparse: official/reference documentation",
                "url": "https://docs.python.org/3/library/urllib.parse.html"
              },
              {
                "title": "security: official/reference documentation",
                "url": "https://owasp.org/www-project-top-ten/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m23-l02",
          "slug": "m23-l2-url-structure-analysis",
          "title": "Module 23 - Lesson 2: URL structure analysis",
          "description": "Direct topic demonstration. Extract and defang training URLs without fetching them. Verification: No network calls.",
          "youtubeVideoId": "KVmbRdwWohY",
          "videoAttribution": {
            "creator": "Hank Hackerson",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 23: Phishing Email Triage with Python",
          "objectives": [
            "Extract and defang training URLs without fetching them.",
            "Verify implementation: No network calls.",
            "Topic alignment: Direct topic demonstration",
            "Parse offline .eml structure.",
            "Extract sender, URLs and attachments metadata."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-23",
            "detection"
          ],
          "skillsTaught": [
            "URL structure analysis",
            "Security Python Scripting (Mod 23)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (URL structure analysis), learn defensive programming with video instruction by Hank Hackerson. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: URL structure analysis",
                "content": "Email is a major incident intake source and requires careful evidence handling.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Extract and defang training URLs without fetching them.",
                  "Verification rule: No network calls.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Hank Hackerson \u2014 Build Python Algorithms for Cybersecurity (chapter starts 03:37:31)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Extract and defang training URLs without fetching them.",
                "expectedOutcome": "No network calls."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "No network calls.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Email is a major incident intake source and requires careful evidence handling.",
            "furtherReading": [
              {
                "title": "email: official/reference documentation",
                "url": "https://docs.python.org/3/library/email.html"
              },
              {
                "title": "urlparse: official/reference documentation",
                "url": "https://docs.python.org/3/library/urllib.parse.html"
              },
              {
                "title": "security: official/reference documentation",
                "url": "https://owasp.org/www-project-top-ten/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m23-l03",
          "slug": "m23-l3-regex-and-iocs",
          "title": "Module 23 - Lesson 3: Regex and IOCs",
          "description": "Direct topic demonstration. Find candidate email addresses, then parse formally. Verification: Invalid candidates handled.",
          "youtubeVideoId": "KVmbRdwWohY",
          "videoAttribution": {
            "creator": "Hank Hackerson",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 23: Phishing Email Triage with Python",
          "objectives": [
            "Find candidate email addresses, then parse formally.",
            "Verify implementation: Invalid candidates handled.",
            "Topic alignment: Direct topic demonstration",
            "Parse offline .eml structure.",
            "Extract sender, URLs and attachments metadata."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-23",
            "detection"
          ],
          "skillsTaught": [
            "Regex and IOCs",
            "Security Python Scripting (Mod 23)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Regex and IOCs), learn defensive programming with video instruction by Hank Hackerson. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Regex and IOCs",
                "content": "Email is a major incident intake source and requires careful evidence handling.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Find candidate email addresses, then parse formally.",
                  "Verification rule: Invalid candidates handled.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Hank Hackerson \u2014 Build Python Algorithms for Cybersecurity (chapter starts 04:24:11)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Find candidate email addresses, then parse formally.",
                "expectedOutcome": "Invalid candidates handled."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Invalid candidates handled.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Email is a major incident intake source and requires careful evidence handling.",
            "furtherReading": [
              {
                "title": "email: official/reference documentation",
                "url": "https://docs.python.org/3/library/email.html"
              },
              {
                "title": "urlparse: official/reference documentation",
                "url": "https://docs.python.org/3/library/urllib.parse.html"
              },
              {
                "title": "security: official/reference documentation",
                "url": "https://owasp.org/www-project-top-ten/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m23-l04",
          "slug": "m23-l4-files-and-reports",
          "title": "Module 23 - Lesson 4: Files and reports",
          "description": "Direct topic demonstration. Process an offline email fixture. Verification: Original source untouched.",
          "youtubeVideoId": "KVmbRdwWohY",
          "videoAttribution": {
            "creator": "Hank Hackerson",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 23: Phishing Email Triage with Python",
          "objectives": [
            "Process an offline email fixture.",
            "Verify implementation: Original source untouched.",
            "Topic alignment: Direct topic demonstration",
            "Parse offline .eml structure.",
            "Extract sender, URLs and attachments metadata."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-23",
            "detection"
          ],
          "skillsTaught": [
            "Files and reports",
            "Security Python Scripting (Mod 23)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Files and reports), learn defensive programming with video instruction by Hank Hackerson. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Files and reports",
                "content": "Email is a major incident intake source and requires careful evidence handling.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Process an offline email fixture.",
                  "Verification rule: Original source untouched.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Hank Hackerson \u2014 Build Python Algorithms for Cybersecurity (chapter starts 05:07:18)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Process an offline email fixture.",
                "expectedOutcome": "Original source untouched."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Original source untouched.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Email is a major incident intake source and requires careful evidence handling.",
            "furtherReading": [
              {
                "title": "email: official/reference documentation",
                "url": "https://docs.python.org/3/library/email.html"
              },
              {
                "title": "urlparse: official/reference documentation",
                "url": "https://docs.python.org/3/library/urllib.parse.html"
              },
              {
                "title": "security: official/reference documentation",
                "url": "https://owasp.org/www-project-top-ten/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-pysec-m23",
        "title": "Lab 23: Phishing Email Triage with Python Hands-on Implementation",
        "objective": "Email is a major incident intake source and requires careful evidence handling. Email is a major incident intake source and requires careful evidence handling. Work only with synthetic data from [LAB_DATASETS.md](../04-LAB-DATASETS.md) or an authorized personal VM.",
        "toolsRequired": [
          "Python 3.10+",
          "VS Code / Preferred Editor",
          "Safe Isolated Lab Directory"
        ],
        "pcapSource": {
          "fileName": "synthetic_m23_dataset.json",
          "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/data/synthetic_labs.json"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Construct a harmless sample .eml from LAB_DATASETS.md.",
          "Use Python email.policy.default to parse headers and MIME parts.",
          "Record From, Reply-To, subject and URL strings; do not open attachments or click links.",
          "Write a verdict with confidence, supporting evidence and escalation recommendation."
        ],
        "tasks": [
          {
            "id": "task-m23-1",
            "description": "Construct a harmless sample .eml from LAB_DATASETS.md."
          },
          {
            "id": "task-m23-2",
            "description": "Use Python email.policy.default to parse headers and MIME parts."
          },
          {
            "id": "task-m23-3",
            "description": "Record From, Reply-To, subject and URL strings; do not open attachments or click links."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "environment_provenance",
            "prompt": "Document your Python version, OS environment, and isolated directory path.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "execution_output",
            "prompt": "Provide terminal output demonstrating successful execution and edge-case handling.",
            "expectedEvidenceType": "Terminal output log"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "No attachments executed.",
          "No links visited.",
          "Triage reasoning based on evidence."
        ]
      }
    },
    {
      "id": "mod-pysec-m24",
      "title": "Module 24: Malware Triage Metadata & YARA Basics",
      "description": "Detection phase. Static metadata analysis is an accessible way to begin defensive malware triage. 9 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.",
      "order": 24,
      "lessons": [
        {
          "id": "les-pysec-m24-l01",
          "slug": "m24-l1-hash-and-file-analysis",
          "title": "Module 24 - Lesson 1: Hash and file analysis",
          "description": "Direct topic demonstration. Hash inert local sample text and compare manifests. Verification: No suspicious binary executed.",
          "youtubeVideoId": "cMdgDTgxx6o",
          "videoAttribution": {
            "creator": "Adrian Dolinay",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 24: Malware Triage Metadata & YARA Basics",
          "objectives": [
            "Hash inert local sample text and compare manifests.",
            "Verify implementation: No suspicious binary executed.",
            "Topic alignment: Direct topic demonstration",
            "Explain hash and file-type evidence.",
            "Work with inert training samples."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-24",
            "detection"
          ],
          "skillsTaught": [
            "Hash and file analysis",
            "Security Python Scripting (Mod 24)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Hash and file analysis), learn defensive programming with video instruction by Adrian Dolinay. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Hash and file analysis",
                "content": "Static metadata analysis is an accessible way to begin defensive malware triage.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Hash inert local sample text and compare manifests.",
                  "Verification rule: No suspicious binary executed.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Adrian Dolinay \u2014 Python File Integrity with Hashes (chapter starts 00:02:38)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Hash inert local sample text and compare manifests.",
                "expectedOutcome": "No suspicious binary executed."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "No suspicious binary executed.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Static metadata analysis is an accessible way to begin defensive malware triage.",
            "furtherReading": [
              {
                "title": "yara: official/reference documentation",
                "url": "https://yara.readthedocs.io/en/stable/"
              },
              {
                "title": "hashlib: official/reference documentation",
                "url": "https://docs.python.org/3/library/hashlib.html"
              },
              {
                "title": "pytest: official/reference documentation",
                "url": "https://docs.pytest.org/en/stable/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m24-l02",
          "slug": "m24-l2-cryptographic-file-integrity",
          "title": "Module 24 - Lesson 2: Cryptographic file integrity",
          "description": "Direct topic demonstration. Explain integrity versus maliciousness. Verification: Conclusions stay limited.",
          "youtubeVideoId": "kb_scuDUHls",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 24: Malware Triage Metadata & YARA Basics",
          "objectives": [
            "Explain integrity versus maliciousness.",
            "Verify implementation: Conclusions stay limited.",
            "Topic alignment: Direct topic demonstration",
            "Explain hash and file-type evidence.",
            "Work with inert training samples."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-24",
            "detection"
          ],
          "skillsTaught": [
            "Cryptographic file integrity",
            "Security Python Scripting (Mod 24)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Cryptographic file integrity), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Cryptographic file integrity",
                "content": "Static metadata analysis is an accessible way to begin defensive malware triage.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Explain integrity versus maliciousness.",
                  "Verification rule: Conclusions stay limited.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Cryptography with Python (chapter starts 00:13:46)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Explain integrity versus maliciousness.",
                "expectedOutcome": "Conclusions stay limited."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Conclusions stay limited.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Static metadata analysis is an accessible way to begin defensive malware triage.",
            "furtherReading": [
              {
                "title": "yara: official/reference documentation",
                "url": "https://yara.readthedocs.io/en/stable/"
              },
              {
                "title": "hashlib: official/reference documentation",
                "url": "https://docs.python.org/3/library/hashlib.html"
              },
              {
                "title": "pytest: official/reference documentation",
                "url": "https://docs.pytest.org/en/stable/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m24-l03",
          "slug": "m24-l3-regex-and-pattern-matching",
          "title": "Module 24 - Lesson 3: Regex and pattern matching",
          "description": "Direct topic demonstration. Write text patterns for suspicious-looking strings in a harmless sample. Verification: Patterns tested on benign examples.",
          "youtubeVideoId": "KVmbRdwWohY",
          "videoAttribution": {
            "creator": "Hank Hackerson",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 24: Malware Triage Metadata & YARA Basics",
          "objectives": [
            "Write text patterns for suspicious-looking strings in a harmless sample.",
            "Verify implementation: Patterns tested on benign examples.",
            "Topic alignment: Direct topic demonstration",
            "Explain hash and file-type evidence.",
            "Work with inert training samples."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-24",
            "detection"
          ],
          "skillsTaught": [
            "Regex and pattern matching",
            "Security Python Scripting (Mod 24)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Regex and pattern matching), learn defensive programming with video instruction by Hank Hackerson. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Regex and pattern matching",
                "content": "Static metadata analysis is an accessible way to begin defensive malware triage.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Write text patterns for suspicious-looking strings in a harmless sample.",
                  "Verification rule: Patterns tested on benign examples.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Hank Hackerson \u2014 Build Python Algorithms for Cybersecurity (chapter starts 04:16:13)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Write text patterns for suspicious-looking strings in a harmless sample.",
                "expectedOutcome": "Patterns tested on benign examples."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Patterns tested on benign examples.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Static metadata analysis is an accessible way to begin defensive malware triage.",
            "furtherReading": [
              {
                "title": "yara: official/reference documentation",
                "url": "https://yara.readthedocs.io/en/stable/"
              },
              {
                "title": "hashlib: official/reference documentation",
                "url": "https://docs.python.org/3/library/hashlib.html"
              },
              {
                "title": "pytest: official/reference documentation",
                "url": "https://docs.pytest.org/en/stable/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m24-l04",
          "slug": "m24-l4-pytest-for-rules",
          "title": "Module 24 - Lesson 4: Pytest for rules",
          "description": "Technique bridge to this module\u2019s security lab. Test true and false matching cases. Verification: False-positive test included.",
          "youtubeVideoId": "cHYq1MRoyI0",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 24: Malware Triage Metadata & YARA Basics",
          "objectives": [
            "Test true and false matching cases.",
            "Verify implementation: False-positive test included.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Explain hash and file-type evidence.",
            "Work with inert training samples."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-24",
            "detection"
          ],
          "skillsTaught": [
            "Pytest for rules",
            "Security Python Scripting (Mod 24)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Pytest for rules), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Pytest for rules",
                "content": "Static metadata analysis is an accessible way to begin defensive malware triage.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Test true and false matching cases.",
                  "Verification rule: False-positive test included.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Pytest Tutorial (chapter starts 00:41:10)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Test true and false matching cases.",
                "expectedOutcome": "False-positive test included."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "False-positive test included.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Static metadata analysis is an accessible way to begin defensive malware triage.",
            "furtherReading": [
              {
                "title": "yara: official/reference documentation",
                "url": "https://yara.readthedocs.io/en/stable/"
              },
              {
                "title": "hashlib: official/reference documentation",
                "url": "https://docs.python.org/3/library/hashlib.html"
              },
              {
                "title": "pytest: official/reference documentation",
                "url": "https://docs.pytest.org/en/stable/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-pysec-m24",
        "title": "Lab 24: Malware Triage Metadata & YARA Basics Hands-on Implementation",
        "objective": "Static metadata analysis is an accessible way to begin defensive malware triage. Static metadata analysis is an accessible way to begin defensive malware triage. Work only with synthetic data from [LAB_DATASETS.md](../04-LAB-DATASETS.md) or an authorized personal VM.",
        "toolsRequired": [
          "Python 3.10+",
          "VS Code / Preferred Editor",
          "Safe Isolated Lab Directory"
        ],
        "pcapSource": {
          "fileName": "synthetic_m24_dataset.json",
          "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/data/synthetic_labs.json"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Use an inert UTF-8 text sample that contains fictional strings only.",
          "Calculate hash and byte size, identify extension and write a YARA rule matching an innocuous test phrase.",
          "Run rule only against owned test fixtures, not unknown executable malware.",
          "Document what the rule does and why one match is insufficient evidence."
        ],
        "tasks": [
          {
            "id": "task-m24-1",
            "description": "Use an inert UTF-8 text sample that contains fictional strings only."
          },
          {
            "id": "task-m24-2",
            "description": "Calculate hash and byte size, identify extension and write a YARA rule matching an innocuous test phrase."
          },
          {
            "id": "task-m24-3",
            "description": "Run rule only against owned test fixtures, not unknown executable malware."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "environment_provenance",
            "prompt": "Document your Python version, OS environment, and isolated directory path.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "execution_output",
            "prompt": "Provide terminal output demonstrating successful execution and edge-case handling.",
            "expectedEvidenceType": "Terminal output log"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "No executable malware required.",
          "False-positive analysis present.",
          "Static-only processing."
        ]
      }
    },
    {
      "id": "mod-pysec-m25",
      "title": "Module 25: Detection Engineering, Sigma & Rule Testing",
      "description": "Detection phase. Detections must be testable and explain why an event matters. 9 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.",
      "order": 25,
      "lessons": [
        {
          "id": "les-pysec-m25-l01",
          "slug": "m25-l1-security-log-analysis-algorithm",
          "title": "Module 25 - Lesson 1: Security log analysis algorithm",
          "description": "Direct topic demonstration. Turn observed failed-login pattern into pseudocode. Verification: Hypothesis is testable.",
          "youtubeVideoId": "KVmbRdwWohY",
          "videoAttribution": {
            "creator": "Hank Hackerson",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 25: Detection Engineering, Sigma & Rule Testing",
          "objectives": [
            "Turn observed failed-login pattern into pseudocode.",
            "Verify implementation: Hypothesis is testable.",
            "Topic alignment: Direct topic demonstration",
            "Translate an investigation hypothesis into a rule.",
            "Understand Sigma fields and log sources."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-25",
            "detection"
          ],
          "skillsTaught": [
            "Security log analysis algorithm",
            "Security Python Scripting (Mod 25)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Security log analysis algorithm), learn defensive programming with video instruction by Hank Hackerson. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Security log analysis algorithm",
                "content": "Detections must be testable and explain why an event matters.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Turn observed failed-login pattern into pseudocode.",
                  "Verification rule: Hypothesis is testable.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Hank Hackerson \u2014 Build Python Algorithms for Cybersecurity (chapter starts 04:52:55)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Turn observed failed-login pattern into pseudocode.",
                "expectedOutcome": "Hypothesis is testable."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Hypothesis is testable.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Detections must be testable and explain why an event matters.",
            "furtherReading": [
              {
                "title": "sigma: official/reference documentation",
                "url": "https://github.com/SigmaHQ/pySigma"
              },
              {
                "title": "pytest: official/reference documentation",
                "url": "https://docs.pytest.org/en/stable/"
              },
              {
                "title": "mitre: official/reference documentation",
                "url": "https://attack.mitre.org/resources/attack-data-and-tools/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m25-l02",
          "slug": "m25-l2-reusable-filtering-functions",
          "title": "Module 25 - Lesson 2: Reusable filtering functions",
          "description": "Direct topic demonstration. Build event filter and count functions. Verification: Inputs documented.",
          "youtubeVideoId": "KVmbRdwWohY",
          "videoAttribution": {
            "creator": "Hank Hackerson",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 25: Detection Engineering, Sigma & Rule Testing",
          "objectives": [
            "Build event filter and count functions.",
            "Verify implementation: Inputs documented.",
            "Topic alignment: Direct topic demonstration",
            "Translate an investigation hypothesis into a rule.",
            "Understand Sigma fields and log sources."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-25",
            "detection"
          ],
          "skillsTaught": [
            "Reusable filtering functions",
            "Security Python Scripting (Mod 25)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Reusable filtering functions), learn defensive programming with video instruction by Hank Hackerson. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Reusable filtering functions",
                "content": "Detections must be testable and explain why an event matters.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Build event filter and count functions.",
                  "Verification rule: Inputs documented.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Hank Hackerson \u2014 Build Python Algorithms for Cybersecurity (chapter starts 02:17:44)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Build event filter and count functions.",
                "expectedOutcome": "Inputs documented."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Inputs documented.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Detections must be testable and explain why an event matters.",
            "furtherReading": [
              {
                "title": "sigma: official/reference documentation",
                "url": "https://github.com/SigmaHQ/pySigma"
              },
              {
                "title": "pytest: official/reference documentation",
                "url": "https://docs.pytest.org/en/stable/"
              },
              {
                "title": "mitre: official/reference documentation",
                "url": "https://attack.mitre.org/resources/attack-data-and-tools/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m25-l03",
          "slug": "m25-l3-parameterization",
          "title": "Module 25 - Lesson 3: Parameterization",
          "description": "Technique bridge to this module\u2019s security lab. Test 4 detection thresholds. Verification: Regression suite includes boundaries.",
          "youtubeVideoId": "cHYq1MRoyI0",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 25: Detection Engineering, Sigma & Rule Testing",
          "objectives": [
            "Test 4 detection thresholds.",
            "Verify implementation: Regression suite includes boundaries.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Translate an investigation hypothesis into a rule.",
            "Understand Sigma fields and log sources."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-25",
            "detection"
          ],
          "skillsTaught": [
            "Parameterization",
            "Security Python Scripting (Mod 25)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Parameterization), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Parameterization",
                "content": "Detections must be testable and explain why an event matters.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Test 4 detection thresholds.",
                  "Verification rule: Regression suite includes boundaries.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Pytest Tutorial (chapter starts 00:41:10)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Test 4 detection thresholds.",
                "expectedOutcome": "Regression suite includes boundaries."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Regression suite includes boundaries.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Detections must be testable and explain why an event matters.",
            "furtherReading": [
              {
                "title": "sigma: official/reference documentation",
                "url": "https://github.com/SigmaHQ/pySigma"
              },
              {
                "title": "pytest: official/reference documentation",
                "url": "https://docs.pytest.org/en/stable/"
              },
              {
                "title": "mitre: official/reference documentation",
                "url": "https://attack.mitre.org/resources/attack-data-and-tools/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m25-l04",
          "slug": "m25-l4-mocking-dependencies",
          "title": "Module 25 - Lesson 4: Mocking dependencies",
          "description": "Technique bridge to this module\u2019s security lab. Mock log ingestion so tests run offline. Verification: No production SIEM needed.",
          "youtubeVideoId": "cHYq1MRoyI0",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 25: Detection Engineering, Sigma & Rule Testing",
          "objectives": [
            "Mock log ingestion so tests run offline.",
            "Verify implementation: No production SIEM needed.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Translate an investigation hypothesis into a rule.",
            "Understand Sigma fields and log sources."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-25",
            "detection"
          ],
          "skillsTaught": [
            "Mocking dependencies",
            "Security Python Scripting (Mod 25)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Mocking dependencies), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Mocking dependencies",
                "content": "Detections must be testable and explain why an event matters.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Mock log ingestion so tests run offline.",
                  "Verification rule: No production SIEM needed.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Pytest Tutorial (chapter starts 00:55:24)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Mock log ingestion so tests run offline.",
                "expectedOutcome": "No production SIEM needed."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "No production SIEM needed.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Detections must be testable and explain why an event matters.",
            "furtherReading": [
              {
                "title": "sigma: official/reference documentation",
                "url": "https://github.com/SigmaHQ/pySigma"
              },
              {
                "title": "pytest: official/reference documentation",
                "url": "https://docs.pytest.org/en/stable/"
              },
              {
                "title": "mitre: official/reference documentation",
                "url": "https://attack.mitre.org/resources/attack-data-and-tools/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-pysec-m25",
        "title": "Lab 25: Detection Engineering, Sigma & Rule Testing Hands-on Implementation",
        "objective": "Detections must be testable and explain why an event matters. Detections must be testable and explain why an event matters. Work only with synthetic data from [LAB_DATASETS.md](../04-LAB-DATASETS.md) or an authorized personal VM.",
        "toolsRequired": [
          "Python 3.10+",
          "VS Code / Preferred Editor",
          "Safe Isolated Lab Directory"
        ],
        "pcapSource": {
          "fileName": "synthetic_m25_dataset.json",
          "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/data/synthetic_labs.json"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Write one Sigma-style YAML example inside markdown for repeated failed logins (logsource and detection).",
          "Discuss need for field mappings to specific SIEM schemas.",
          "Use Python to run equivalent logic against synthetic JSON events.",
          "Measure basic precision/recall on a labeled 20-record toy fixture, noting no real-world performance guarantee."
        ],
        "tasks": [
          {
            "id": "task-m25-1",
            "description": "Write one Sigma-style YAML example inside markdown for repeated failed logins (logsource and detection)."
          },
          {
            "id": "task-m25-2",
            "description": "Discuss need for field mappings to specific SIEM schemas."
          },
          {
            "id": "task-m25-3",
            "description": "Use Python to run equivalent logic against synthetic JSON events."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "environment_provenance",
            "prompt": "Document your Python version, OS environment, and isolated directory path.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "execution_output",
            "prompt": "Provide terminal output demonstrating successful execution and edge-case handling.",
            "expectedEvidenceType": "Terminal output log"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Rule intent clear.",
          "Field mappings acknowledged.",
          "Negative tests included."
        ]
      }
    },
    {
      "id": "mod-pysec-m26",
      "title": "Module 26: MITRE ATT&CK Data & Technique Mapping",
      "description": "Detection phase. Technique mappings improve consistency, but should not be assigned from weak evidence. 8 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.",
      "order": 26,
      "lessons": [
        {
          "id": "les-pysec-m26-l01",
          "slug": "m26-l1-json-and-structured-records",
          "title": "Module 26 - Lesson 1: JSON and structured records",
          "description": "Technique bridge to this module\u2019s security lab. Open a small ATT&CK-like offline JSON fixture. Verification: Schema and version recorded.",
          "youtubeVideoId": "HGOBQPFzWKo",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 26: MITRE ATT&CK Data & Technique Mapping",
          "objectives": [
            "Open a small ATT&CK-like offline JSON fixture.",
            "Verify implementation: Schema and version recorded.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Explain tactics vs techniques.",
            "Read structured STIX/ATT&CK JSON."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-26",
            "detection"
          ],
          "skillsTaught": [
            "JSON and structured records",
            "Security Python Scripting (Mod 26)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (JSON and structured records), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: JSON and structured records",
                "content": "Technique mappings improve consistency, but should not be assigned from weak evidence.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Open a small ATT&CK-like offline JSON fixture.",
                  "Verification rule: Schema and version recorded.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Intermediate Python Programming (chapter starts 02:42:20)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Open a small ATT&CK-like offline JSON fixture.",
                "expectedOutcome": "Schema and version recorded."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Schema and version recorded.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Technique mappings improve consistency, but should not be assigned from weak evidence.",
            "furtherReading": [
              {
                "title": "mitre: official/reference documentation",
                "url": "https://attack.mitre.org/resources/attack-data-and-tools/"
              },
              {
                "title": "attackpy: official/reference documentation",
                "url": "https://github.com/mitre-attack/mitreattack-python"
              },
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m26-l02",
          "slug": "m26-l2-parser-functions",
          "title": "Module 26 - Lesson 2: Parser functions",
          "description": "Technique bridge to this module\u2019s security lab. Normalize technique IDs from report entries. Verification: Unknown IDs not invented.",
          "youtubeVideoId": "KVmbRdwWohY",
          "videoAttribution": {
            "creator": "Hank Hackerson",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 26: MITRE ATT&CK Data & Technique Mapping",
          "objectives": [
            "Normalize technique IDs from report entries.",
            "Verify implementation: Unknown IDs not invented.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Explain tactics vs techniques.",
            "Read structured STIX/ATT&CK JSON."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-26",
            "detection"
          ],
          "skillsTaught": [
            "Parser functions",
            "Security Python Scripting (Mod 26)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Parser functions), learn defensive programming with video instruction by Hank Hackerson. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Parser functions",
                "content": "Technique mappings improve consistency, but should not be assigned from weak evidence.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Normalize technique IDs from report entries.",
                  "Verification rule: Unknown IDs not invented.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Hank Hackerson \u2014 Build Python Algorithms for Cybersecurity (chapter starts 05:45:02)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Normalize technique IDs from report entries.",
                "expectedOutcome": "Unknown IDs not invented."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Unknown IDs not invented.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Technique mappings improve consistency, but should not be assigned from weak evidence.",
            "furtherReading": [
              {
                "title": "mitre: official/reference documentation",
                "url": "https://attack.mitre.org/resources/attack-data-and-tools/"
              },
              {
                "title": "attackpy: official/reference documentation",
                "url": "https://github.com/mitre-attack/mitreattack-python"
              },
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m26-l03",
          "slug": "m26-l3-api-fundamentals",
          "title": "Module 26 - Lesson 3: API fundamentals",
          "description": "Technique bridge to this module\u2019s security lab. Explain public CTI API data structures without an outbound call. Verification: Source metadata documented.",
          "youtubeVideoId": "0sOvCWFmrtA",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 26: MITRE ATT&CK Data & Technique Mapping",
          "objectives": [
            "Explain public CTI API data structures without an outbound call.",
            "Verify implementation: Source metadata documented.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Explain tactics vs techniques.",
            "Read structured STIX/ATT&CK JSON."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-26",
            "detection"
          ],
          "skillsTaught": [
            "API fundamentals",
            "Security Python Scripting (Mod 26)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (API fundamentals), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: API fundamentals",
                "content": "Technique mappings improve consistency, but should not be assigned from weak evidence.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Explain public CTI API data structures without an outbound call.",
                  "Verification rule: Source metadata documented.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Python API Development (FastAPI) (chapter starts 00:57:34)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Explain public CTI API data structures without an outbound call.",
                "expectedOutcome": "Source metadata documented."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Source metadata documented.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Technique mappings improve consistency, but should not be assigned from weak evidence.",
            "furtherReading": [
              {
                "title": "mitre: official/reference documentation",
                "url": "https://attack.mitre.org/resources/attack-data-and-tools/"
              },
              {
                "title": "attackpy: official/reference documentation",
                "url": "https://github.com/mitre-attack/mitreattack-python"
              },
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m26-l04",
          "slug": "m26-l4-regression-testing",
          "title": "Module 26 - Lesson 4: Regression testing",
          "description": "Technique bridge to this module\u2019s security lab. Test known technique IDs and unknown values. Verification: Unsupported mapping leaves unknown status.",
          "youtubeVideoId": "cHYq1MRoyI0",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 26: MITRE ATT&CK Data & Technique Mapping",
          "objectives": [
            "Test known technique IDs and unknown values.",
            "Verify implementation: Unsupported mapping leaves unknown status.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Explain tactics vs techniques.",
            "Read structured STIX/ATT&CK JSON."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-26",
            "detection"
          ],
          "skillsTaught": [
            "Regression testing",
            "Security Python Scripting (Mod 26)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Regression testing), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Regression testing",
                "content": "Technique mappings improve consistency, but should not be assigned from weak evidence.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Test known technique IDs and unknown values.",
                  "Verification rule: Unsupported mapping leaves unknown status.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Pytest Tutorial (chapter starts 00:41:10)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Test known technique IDs and unknown values.",
                "expectedOutcome": "Unsupported mapping leaves unknown status."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Unsupported mapping leaves unknown status.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Technique mappings improve consistency, but should not be assigned from weak evidence.",
            "furtherReading": [
              {
                "title": "mitre: official/reference documentation",
                "url": "https://attack.mitre.org/resources/attack-data-and-tools/"
              },
              {
                "title": "attackpy: official/reference documentation",
                "url": "https://github.com/mitre-attack/mitreattack-python"
              },
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-pysec-m26",
        "title": "Lab 26: MITRE ATT&CK Data & Technique Mapping Hands-on Implementation",
        "objective": "Technique mappings improve consistency, but should not be assigned from weak evidence. Technique mappings improve consistency, but should not be assigned from weak evidence. Work only with synthetic data from [LAB_DATASETS.md](../04-LAB-DATASETS.md) or an authorized personal VM.",
        "toolsRequired": [
          "Python 3.10+",
          "VS Code / Preferred Editor",
          "Safe Isolated Lab Directory"
        ],
        "pcapSource": {
          "fileName": "synthetic_m26_dataset.json",
          "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/data/synthetic_labs.json"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Read the official ATT&CK Data & Tools reference.",
          "Create a synthetic log hypothesis mapped to a plausible ATT&CK technique only with supporting behavior.",
          "Store tactic, technique ID, evidence link, version and confidence.",
          "Explain why ATT&CK taxonomy cannot prove attribution."
        ],
        "tasks": [
          {
            "id": "task-m26-1",
            "description": "Read the official ATT&CK Data & Tools reference."
          },
          {
            "id": "task-m26-2",
            "description": "Create a synthetic log hypothesis mapped to a plausible ATT&CK technique only with supporting behavior."
          },
          {
            "id": "task-m26-3",
            "description": "Store tactic, technique ID, evidence link, version and confidence."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "environment_provenance",
            "prompt": "Document your Python version, OS environment, and isolated directory path.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "execution_output",
            "prompt": "Provide terminal output demonstrating successful execution and edge-case handling.",
            "expectedEvidenceType": "Terminal output log"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Mapping evidence recorded.",
          "No group attribution claim.",
          "ATT&CK version stated."
        ]
      }
    },
    {
      "id": "mod-pysec-m27",
      "title": "Module 27: CVE/NVD Vulnerability Data Triage",
      "description": "Detection phase. Vulnerability alerts require metadata normalization and asset context. 8 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.",
      "order": 27,
      "lessons": [
        {
          "id": "les-pysec-m27-l01",
          "slug": "m27-l1-rest-requests-and-status",
          "title": "Module 27 - Lesson 1: REST requests and status",
          "description": "Technique bridge to this module\u2019s security lab. Plan a read-only CVE API fetch with pagination. Verification: HTTP 429 accounted for.",
          "youtubeVideoId": "0sOvCWFmrtA",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 27: CVE/NVD Vulnerability Data Triage",
          "objectives": [
            "Plan a read-only CVE API fetch with pagination.",
            "Verify implementation: HTTP 429 accounted for.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Parse CVE IDs and vulnerability metadata.",
            "Explain severity vs exploitability vs exposure."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-27",
            "detection"
          ],
          "skillsTaught": [
            "REST requests and status",
            "Security Python Scripting (Mod 27)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (REST requests and status), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: REST requests and status",
                "content": "Vulnerability alerts require metadata normalization and asset context.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Plan a read-only CVE API fetch with pagination.",
                  "Verification rule: HTTP 429 accounted for.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Python API Development (FastAPI) (chapter starts 00:57:34)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Plan a read-only CVE API fetch with pagination.",
                "expectedOutcome": "HTTP 429 accounted for."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "HTTP 429 accounted for.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Vulnerability alerts require metadata normalization and asset context.",
            "furtherReading": [
              {
                "title": "nvd: official/reference documentation",
                "url": "https://nvd.nist.gov/developers/vulnerabilities"
              },
              {
                "title": "cisa: official/reference documentation",
                "url": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog"
              },
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m27-l02",
          "slug": "m27-l2-json-parsing",
          "title": "Module 27 - Lesson 2: JSON parsing",
          "description": "Technique bridge to this module\u2019s security lab. Read synthetic CVE response with nested metrics. Verification: Missing score handled.",
          "youtubeVideoId": "HGOBQPFzWKo",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 27: CVE/NVD Vulnerability Data Triage",
          "objectives": [
            "Read synthetic CVE response with nested metrics.",
            "Verify implementation: Missing score handled.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Parse CVE IDs and vulnerability metadata.",
            "Explain severity vs exploitability vs exposure."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-27",
            "detection"
          ],
          "skillsTaught": [
            "JSON parsing",
            "Security Python Scripting (Mod 27)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (JSON parsing), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: JSON parsing",
                "content": "Vulnerability alerts require metadata normalization and asset context.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Read synthetic CVE response with nested metrics.",
                  "Verification rule: Missing score handled.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Intermediate Python Programming (chapter starts 02:42:20)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Read synthetic CVE response with nested metrics.",
                "expectedOutcome": "Missing score handled."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Missing score handled.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Vulnerability alerts require metadata normalization and asset context.",
            "furtherReading": [
              {
                "title": "nvd: official/reference documentation",
                "url": "https://nvd.nist.gov/developers/vulnerabilities"
              },
              {
                "title": "cisa: official/reference documentation",
                "url": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog"
              },
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m27-l03",
          "slug": "m27-l3-validation",
          "title": "Module 27 - Lesson 3: Validation",
          "description": "Technique bridge to this module\u2019s security lab. Validate CVE ID format and source fields. Verification: Malformed identifiers rejected.",
          "youtubeVideoId": "0sOvCWFmrtA",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 27: CVE/NVD Vulnerability Data Triage",
          "objectives": [
            "Validate CVE ID format and source fields.",
            "Verify implementation: Malformed identifiers rejected.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Parse CVE IDs and vulnerability metadata.",
            "Explain severity vs exploitability vs exposure."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-27",
            "detection"
          ],
          "skillsTaught": [
            "Validation",
            "Security Python Scripting (Mod 27)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Validation), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Validation",
                "content": "Vulnerability alerts require metadata normalization and asset context.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Validate CVE ID format and source fields.",
                  "Verification rule: Malformed identifiers rejected.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Python API Development (FastAPI) (chapter starts 01:07:29)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Validate CVE ID format and source fields.",
                "expectedOutcome": "Malformed identifiers rejected."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Malformed identifiers rejected.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Vulnerability alerts require metadata normalization and asset context.",
            "furtherReading": [
              {
                "title": "nvd: official/reference documentation",
                "url": "https://nvd.nist.gov/developers/vulnerabilities"
              },
              {
                "title": "cisa: official/reference documentation",
                "url": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog"
              },
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m27-l04",
          "slug": "m27-l4-unit-tests",
          "title": "Module 27 - Lesson 4: Unit tests",
          "description": "Technique bridge to this module\u2019s security lab. Test known, missing and disputed severity records. Verification: No unsupported assumptions.",
          "youtubeVideoId": "cHYq1MRoyI0",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 27: CVE/NVD Vulnerability Data Triage",
          "objectives": [
            "Test known, missing and disputed severity records.",
            "Verify implementation: No unsupported assumptions.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Parse CVE IDs and vulnerability metadata.",
            "Explain severity vs exploitability vs exposure."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-27",
            "detection"
          ],
          "skillsTaught": [
            "Unit tests",
            "Security Python Scripting (Mod 27)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Unit tests), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Unit tests",
                "content": "Vulnerability alerts require metadata normalization and asset context.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Test known, missing and disputed severity records.",
                  "Verification rule: No unsupported assumptions.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Pytest Tutorial (chapter starts 00:41:10)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Test known, missing and disputed severity records.",
                "expectedOutcome": "No unsupported assumptions."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "No unsupported assumptions.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Vulnerability alerts require metadata normalization and asset context.",
            "furtherReading": [
              {
                "title": "nvd: official/reference documentation",
                "url": "https://nvd.nist.gov/developers/vulnerabilities"
              },
              {
                "title": "cisa: official/reference documentation",
                "url": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog"
              },
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-pysec-m27",
        "title": "Lab 27: CVE/NVD Vulnerability Data Triage Hands-on Implementation",
        "objective": "Vulnerability alerts require metadata normalization and asset context. Vulnerability alerts require metadata normalization and asset context. Work only with synthetic data from [LAB_DATASETS.md](../04-LAB-DATASETS.md) or an authorized personal VM.",
        "toolsRequired": [
          "Python 3.10+",
          "VS Code / Preferred Editor",
          "Safe Isolated Lab Directory"
        ],
        "pcapSource": {
          "fileName": "synthetic_m27_dataset.json",
          "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/data/synthetic_labs.json"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Use an offline sample modeled after the NVD 2.0 API shape; optional public fetch only if allowed and rate-limited.",
          "Extract CVE ID, published date, English description, references and selected severity.",
          "Add fictitious asset exposure and patch status to rank investigation priority.",
          "Discuss limits of score-only prioritization and verify KEV presence from official source if needed."
        ],
        "tasks": [
          {
            "id": "task-m27-1",
            "description": "Use an offline sample modeled after the NVD 2.0 API shape; optional public fetch only if allowed and rate-limited."
          },
          {
            "id": "task-m27-2",
            "description": "Extract CVE ID, published date, English description, references and selected severity."
          },
          {
            "id": "task-m27-3",
            "description": "Add fictitious asset exposure and patch status to rank investigation priority."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "environment_provenance",
            "prompt": "Document your Python version, OS environment, and isolated directory path.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "execution_output",
            "prompt": "Provide terminal output demonstrating successful execution and edge-case handling.",
            "expectedEvidenceType": "Terminal output log"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "CVE format validated.",
          "CVE score can be absent.",
          "No active vulnerability scanning."
        ]
      }
    },
    {
      "id": "mod-pysec-m28",
      "title": "Module 28: SIEM Query APIs & Safe SOAR Playbooks",
      "description": "Detection phase. Analysts automate repetitive querying while keeping containment decisions auditable. 9 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.",
      "order": 28,
      "lessons": [
        {
          "id": "les-pysec-m28-l01",
          "slug": "m28-l1-rest-api-design",
          "title": "Module 28 - Lesson 1: REST API design",
          "description": "Technique bridge to this module\u2019s security lab. Document query parameters and JSON responses. Verification: Only mock backend used.",
          "youtubeVideoId": "0sOvCWFmrtA",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 28: SIEM Query APIs & Safe SOAR Playbooks",
          "objectives": [
            "Document query parameters and JSON responses.",
            "Verify implementation: Only mock backend used.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Design read-only SIEM query wrappers.",
            "Validate alerts and paginate."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-28",
            "detection"
          ],
          "skillsTaught": [
            "REST API design",
            "Security Python Scripting (Mod 28)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (REST API design), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: REST API design",
                "content": "Analysts automate repetitive querying while keeping containment decisions auditable.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Document query parameters and JSON responses.",
                  "Verification rule: Only mock backend used.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Python API Development (FastAPI) (chapter starts 00:57:34)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Document query parameters and JSON responses.",
                "expectedOutcome": "Only mock backend used."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Only mock backend used.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Analysts automate repetitive querying while keeping containment decisions auditable.",
            "furtherReading": [
              {
                "title": "splunk: official/reference documentation",
                "url": "https://docs.splunk.com/Documentation/Splunk/latest/RESTREF/RESTprolog"
              },
              {
                "title": "sentinel: official/reference documentation",
                "url": "https://learn.microsoft.com/en-us/azure/sentinel/"
              },
              {
                "title": "pytest: official/reference documentation",
                "url": "https://docs.pytest.org/en/stable/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m28-l02",
          "slug": "m28-l2-environment-variables-and-secrets",
          "title": "Module 28 - Lesson 2: Environment variables and secrets",
          "description": "Technique bridge to this module\u2019s security lab. Store placeholder credentials outside code. Verification: No tokens in project files.",
          "youtubeVideoId": "0sOvCWFmrtA",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 28: SIEM Query APIs & Safe SOAR Playbooks",
          "objectives": [
            "Store placeholder credentials outside code.",
            "Verify implementation: No tokens in project files.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Design read-only SIEM query wrappers.",
            "Validate alerts and paginate."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-28",
            "detection"
          ],
          "skillsTaught": [
            "Environment variables and secrets",
            "Security Python Scripting (Mod 28)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Environment variables and secrets), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Environment variables and secrets",
                "content": "Analysts automate repetitive querying while keeping containment decisions auditable.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Store placeholder credentials outside code.",
                  "Verification rule: No tokens in project files.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Python API Development (FastAPI) (chapter starts 08:53:53)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Store placeholder credentials outside code.",
                "expectedOutcome": "No tokens in project files."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "No tokens in project files.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Analysts automate repetitive querying while keeping containment decisions auditable.",
            "furtherReading": [
              {
                "title": "splunk: official/reference documentation",
                "url": "https://docs.splunk.com/Documentation/Splunk/latest/RESTREF/RESTprolog"
              },
              {
                "title": "sentinel: official/reference documentation",
                "url": "https://learn.microsoft.com/en-us/azure/sentinel/"
              },
              {
                "title": "pytest: official/reference documentation",
                "url": "https://docs.pytest.org/en/stable/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m28-l03",
          "slug": "m28-l3-exception-handling",
          "title": "Module 28 - Lesson 3: Exception handling",
          "description": "Technique bridge to this module\u2019s security lab. Distinguish HTTP failure, schema issue and empty results. Verification: Three states distinct.",
          "youtubeVideoId": "HGOBQPFzWKo",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 28: SIEM Query APIs & Safe SOAR Playbooks",
          "objectives": [
            "Distinguish HTTP failure, schema issue and empty results.",
            "Verify implementation: Three states distinct.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Design read-only SIEM query wrappers.",
            "Validate alerts and paginate."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-28",
            "detection"
          ],
          "skillsTaught": [
            "Exception handling",
            "Security Python Scripting (Mod 28)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Exception handling), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Exception handling",
                "content": "Analysts automate repetitive querying while keeping containment decisions auditable.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Distinguish HTTP failure, schema issue and empty results.",
                  "Verification rule: Three states distinct.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Intermediate Python Programming (chapter starts 02:04:03)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Distinguish HTTP failure, schema issue and empty results.",
                "expectedOutcome": "Three states distinct."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Three states distinct.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Analysts automate repetitive querying while keeping containment decisions auditable.",
            "furtherReading": [
              {
                "title": "splunk: official/reference documentation",
                "url": "https://docs.splunk.com/Documentation/Splunk/latest/RESTREF/RESTprolog"
              },
              {
                "title": "sentinel: official/reference documentation",
                "url": "https://learn.microsoft.com/en-us/azure/sentinel/"
              },
              {
                "title": "pytest: official/reference documentation",
                "url": "https://docs.pytest.org/en/stable/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m28-l04",
          "slug": "m28-l4-testing-api-clients",
          "title": "Module 28 - Lesson 4: Testing API clients",
          "description": "Technique bridge to this module\u2019s security lab. Mock a SIEM search API and verify pagination. Verification: No account connection needed.",
          "youtubeVideoId": "cHYq1MRoyI0",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 28: SIEM Query APIs & Safe SOAR Playbooks",
          "objectives": [
            "Mock a SIEM search API and verify pagination.",
            "Verify implementation: No account connection needed.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Design read-only SIEM query wrappers.",
            "Validate alerts and paginate."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-28",
            "detection"
          ],
          "skillsTaught": [
            "Testing API clients",
            "Security Python Scripting (Mod 28)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Testing API clients), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Testing API clients",
                "content": "Analysts automate repetitive querying while keeping containment decisions auditable.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Mock a SIEM search API and verify pagination.",
                  "Verification rule: No account connection needed.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Pytest Tutorial (chapter starts 00:55:24)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Mock a SIEM search API and verify pagination.",
                "expectedOutcome": "No account connection needed."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "No account connection needed.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Analysts automate repetitive querying while keeping containment decisions auditable.",
            "furtherReading": [
              {
                "title": "splunk: official/reference documentation",
                "url": "https://docs.splunk.com/Documentation/Splunk/latest/RESTREF/RESTprolog"
              },
              {
                "title": "sentinel: official/reference documentation",
                "url": "https://learn.microsoft.com/en-us/azure/sentinel/"
              },
              {
                "title": "pytest: official/reference documentation",
                "url": "https://docs.pytest.org/en/stable/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-pysec-m28",
        "title": "Lab 28: SIEM Query APIs & Safe SOAR Playbooks Hands-on Implementation",
        "objective": "Analysts automate repetitive querying while keeping containment decisions auditable. Analysts automate repetitive querying while keeping containment decisions auditable. Work only with synthetic data from [LAB_DATASETS.md](../04-LAB-DATASETS.md) or an authorized personal VM.",
        "toolsRequired": [
          "Python 3.10+",
          "VS Code / Preferred Editor",
          "Safe Isolated Lab Directory"
        ],
        "pcapSource": {
          "fileName": "synthetic_m28_dataset.json",
          "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/data/synthetic_labs.json"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Create a mock SIEM query endpoint implemented as a fixture loader; no real tenant needed.",
          "Query for synthetic failed login and suspicious URL events, supporting read-only parameters.",
          "Assemble a recommended response playbook that drafts a ticket, never disables accounts or blocks IPs automatically.",
          "Add an explicit analyst-approval step and dry-run evidence to the proposed SOAR flow."
        ],
        "tasks": [
          {
            "id": "task-m28-1",
            "description": "Create a mock SIEM query endpoint implemented as a fixture loader; no real tenant needed."
          },
          {
            "id": "task-m28-2",
            "description": "Query for synthetic failed login and suspicious URL events, supporting read-only parameters."
          },
          {
            "id": "task-m28-3",
            "description": "Assemble a recommended response playbook that drafts a ticket, never disables accounts or blocks IPs automatically."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "environment_provenance",
            "prompt": "Document your Python version, OS environment, and isolated directory path.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "execution_output",
            "prompt": "Provide terminal output demonstrating successful execution and edge-case handling.",
            "expectedEvidenceType": "Terminal output log"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Read-only by default.",
          "No account changes executed.",
          "Audit trail and approval explicit."
        ]
      }
    },
    {
      "id": "mod-pysec-m29",
      "title": "Module 29: Secure Python Engineering & Operational Hardening",
      "description": "Advanced phase. A security script can itself become a risk if it mishandles secrets, inputs or dependencies. 9 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.",
      "order": 29,
      "lessons": [
        {
          "id": "les-pysec-m29-l01",
          "slug": "m29-l1-environment-variable-use",
          "title": "Module 29 - Lesson 1: Environment variable use",
          "description": "Direct topic demonstration. Move mock API token out of source file. Verification: No secrets committed.",
          "youtubeVideoId": "0sOvCWFmrtA",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 29: Secure Python Engineering & Operational Hardening",
          "objectives": [
            "Move mock API token out of source file.",
            "Verify implementation: No secrets committed.",
            "Topic alignment: Direct topic demonstration",
            "Design least-privilege automation.",
            "Prevent command injection and secret exposure."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-29",
            "advanced"
          ],
          "skillsTaught": [
            "Environment variable use",
            "Security Python Scripting (Mod 29)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Environment variable use), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Environment variable use",
                "content": "A security script can itself become a risk if it mishandles secrets, inputs or dependencies.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Move mock API token out of source file.",
                  "Verification rule: No secrets committed.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Python API Development (FastAPI) (chapter starts 08:53:53)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Move mock API token out of source file.",
                "expectedOutcome": "No secrets committed."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "No secrets committed.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. A security script can itself become a risk if it mishandles secrets, inputs or dependencies.",
            "furtherReading": [
              {
                "title": "bandit: official/reference documentation",
                "url": "https://bandit.readthedocs.io/en/latest/"
              },
              {
                "title": "ruff: official/reference documentation",
                "url": "https://docs.astral.sh/ruff/"
              },
              {
                "title": "github: official/reference documentation",
                "url": "https://docs.github.com/en/actions"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m29-l02",
          "slug": "m29-l2-pytest-and-fixtures",
          "title": "Module 29 - Lesson 2: Pytest and fixtures",
          "description": "Direct topic demonstration. Create tests for malformed inputs. Verification: Test suite includes negative cases.",
          "youtubeVideoId": "cHYq1MRoyI0",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 29: Secure Python Engineering & Operational Hardening",
          "objectives": [
            "Create tests for malformed inputs.",
            "Verify implementation: Test suite includes negative cases.",
            "Topic alignment: Direct topic demonstration",
            "Design least-privilege automation.",
            "Prevent command injection and secret exposure."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-29",
            "advanced"
          ],
          "skillsTaught": [
            "Pytest and fixtures",
            "Security Python Scripting (Mod 29)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Pytest and fixtures), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Pytest and fixtures",
                "content": "A security script can itself become a risk if it mishandles secrets, inputs or dependencies.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Create tests for malformed inputs.",
                  "Verification rule: Test suite includes negative cases.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Pytest Tutorial (chapter starts 00:29:49)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Create tests for malformed inputs.",
                "expectedOutcome": "Test suite includes negative cases."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Test suite includes negative cases.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. A security script can itself become a risk if it mishandles secrets, inputs or dependencies.",
            "furtherReading": [
              {
                "title": "bandit: official/reference documentation",
                "url": "https://bandit.readthedocs.io/en/latest/"
              },
              {
                "title": "ruff: official/reference documentation",
                "url": "https://docs.astral.sh/ruff/"
              },
              {
                "title": "github: official/reference documentation",
                "url": "https://docs.github.com/en/actions"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m29-l03",
          "slug": "m29-l3-testing-exceptions",
          "title": "Module 29 - Lesson 3: Testing exceptions",
          "description": "Technique bridge to this module\u2019s security lab. Mock failures and verify safe defaults. Verification: No fail-open path.",
          "youtubeVideoId": "cHYq1MRoyI0",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 29: Secure Python Engineering & Operational Hardening",
          "objectives": [
            "Mock failures and verify safe defaults.",
            "Verify implementation: No fail-open path.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Design least-privilege automation.",
            "Prevent command injection and secret exposure."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-29",
            "advanced"
          ],
          "skillsTaught": [
            "Testing exceptions",
            "Security Python Scripting (Mod 29)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Testing exceptions), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Testing exceptions",
                "content": "A security script can itself become a risk if it mishandles secrets, inputs or dependencies.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Mock failures and verify safe defaults.",
                  "Verification rule: No fail-open path.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Pytest Tutorial (chapter starts 00:55:24)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Mock failures and verify safe defaults.",
                "expectedOutcome": "No fail-open path."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "No fail-open path.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. A security script can itself become a risk if it mishandles secrets, inputs or dependencies.",
            "furtherReading": [
              {
                "title": "bandit: official/reference documentation",
                "url": "https://bandit.readthedocs.io/en/latest/"
              },
              {
                "title": "ruff: official/reference documentation",
                "url": "https://docs.astral.sh/ruff/"
              },
              {
                "title": "github: official/reference documentation",
                "url": "https://docs.github.com/en/actions"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m29-l04",
          "slug": "m29-l4-ci-automation-fundamentals",
          "title": "Module 29 - Lesson 4: CI automation fundamentals",
          "description": "Technique bridge to this module\u2019s security lab. Plan a GitHub Actions workflow for tests and lint. Verification: No deployment credentials needed.",
          "youtubeVideoId": "0sOvCWFmrtA",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 29: Secure Python Engineering & Operational Hardening",
          "objectives": [
            "Plan a GitHub Actions workflow for tests and lint.",
            "Verify implementation: No deployment credentials needed.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Design least-privilege automation.",
            "Prevent command injection and secret exposure."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-29",
            "advanced"
          ],
          "skillsTaught": [
            "CI automation fundamentals",
            "Security Python Scripting (Mod 29)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (CI automation fundamentals), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: CI automation fundamentals",
                "content": "A security script can itself become a risk if it mishandles secrets, inputs or dependencies.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Plan a GitHub Actions workflow for tests and lint.",
                  "Verification rule: No deployment credentials needed.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Python API Development (FastAPI) (chapter starts 17:34:15)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Plan a GitHub Actions workflow for tests and lint.",
                "expectedOutcome": "No deployment credentials needed."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "No deployment credentials needed.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. A security script can itself become a risk if it mishandles secrets, inputs or dependencies.",
            "furtherReading": [
              {
                "title": "bandit: official/reference documentation",
                "url": "https://bandit.readthedocs.io/en/latest/"
              },
              {
                "title": "ruff: official/reference documentation",
                "url": "https://docs.astral.sh/ruff/"
              },
              {
                "title": "github: official/reference documentation",
                "url": "https://docs.github.com/en/actions"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-pysec-m29",
        "title": "Lab 29: Secure Python Engineering & Operational Hardening Hands-on Implementation",
        "objective": "A security script can itself become a risk if it mishandles secrets, inputs or dependencies. A security script can itself become a risk if it mishandles secrets, inputs or dependencies. Work only with synthetic data from [LAB_DATASETS.md](../04-LAB-DATASETS.md) or an authorized personal VM.",
        "toolsRequired": [
          "Python 3.10+",
          "VS Code / Preferred Editor",
          "Safe Isolated Lab Directory"
        ],
        "pcapSource": {
          "fileName": "synthetic_m29_dataset.json",
          "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/data/synthetic_labs.json"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Threat-model the course capstone: input, processing, storage and outputs.",
          "Ensure all inputs are validated and external calls use timeouts and allowlists.",
          "Document dependency review, secret management, graceful errors and retention.",
          "Design a CI check with pytest and Ruff; run locally before uploading code anywhere."
        ],
        "tasks": [
          {
            "id": "task-m29-1",
            "description": "Threat-model the course capstone: input, processing, storage and outputs."
          },
          {
            "id": "task-m29-2",
            "description": "Ensure all inputs are validated and external calls use timeouts and allowlists."
          },
          {
            "id": "task-m29-3",
            "description": "Document dependency review, secret management, graceful errors and retention."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "environment_provenance",
            "prompt": "Document your Python version, OS environment, and isolated directory path.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "execution_output",
            "prompt": "Provide terminal output demonstrating successful execution and edge-case handling.",
            "expectedEvidenceType": "Terminal output log"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Tests run locally.",
          "No unsafe shell interpolation.",
          "Secret redaction and retention plan."
        ]
      }
    },
    {
      "id": "mod-pysec-m30",
      "title": "Module 30: Final Capstone \u2014 SOC Automation Pipeline",
      "description": "Advanced phase. Combine the skills into a demonstrable SOC L1 portfolio project. 14 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.",
      "order": 30,
      "lessons": [
        {
          "id": "les-pysec-m30-l01",
          "slug": "m30-l1-cybersecurity-parsing-algorithms",
          "title": "Module 30 - Lesson 1: Cybersecurity parsing algorithms",
          "description": "Direct topic demonstration. Review reusable parsing design before capstone. Verification: Parser module contract written.",
          "youtubeVideoId": "KVmbRdwWohY",
          "videoAttribution": {
            "creator": "Hank Hackerson",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 30: Final Capstone \u2014 SOC Automation Pipeline",
          "objectives": [
            "Review reusable parsing design before capstone.",
            "Verify implementation: Parser module contract written.",
            "Topic alignment: Direct topic demonstration",
            "Implement a reproducible multi-source parser.",
            "Correlate and prioritize synthetic events."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-30",
            "advanced"
          ],
          "skillsTaught": [
            "Cybersecurity parsing algorithms",
            "Security Python Scripting (Mod 30)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Cybersecurity parsing algorithms), learn defensive programming with video instruction by Hank Hackerson. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Cybersecurity parsing algorithms",
                "content": "Combine the skills into a demonstrable SOC L1 portfolio project.\n\nAlignment context: Direct topic demonstration. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Review reusable parsing design before capstone.",
                  "Verification rule: Parser module contract written.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'Hank Hackerson \u2014 Build Python Algorithms for Cybersecurity (chapter starts 05:45:02)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Review reusable parsing design before capstone.",
                "expectedOutcome": "Parser module contract written."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Parser module contract written.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Combine the skills into a demonstrable SOC L1 portfolio project.",
            "furtherReading": [
              {
                "title": "pytest: official/reference documentation",
                "url": "https://docs.pytest.org/en/stable/"
              },
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              },
              {
                "title": "mitre: official/reference documentation",
                "url": "https://attack.mitre.org/resources/attack-data-and-tools/"
              },
              {
                "title": "security: official/reference documentation",
                "url": "https://owasp.org/www-project-top-ten/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m30-l02",
          "slug": "m30-l2-logging-and-json",
          "title": "Module 30 - Lesson 2: Logging and JSON",
          "description": "Technique bridge to this module\u2019s security lab. Add machine-readable audit logs for pipeline runs. Verification: No sensitive input copied unnecessarily.",
          "youtubeVideoId": "HGOBQPFzWKo",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 30: Final Capstone \u2014 SOC Automation Pipeline",
          "objectives": [
            "Add machine-readable audit logs for pipeline runs.",
            "Verify implementation: No sensitive input copied unnecessarily.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Implement a reproducible multi-source parser.",
            "Correlate and prioritize synthetic events."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-30",
            "advanced"
          ],
          "skillsTaught": [
            "Logging and JSON",
            "Security Python Scripting (Mod 30)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Logging and JSON), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Logging and JSON",
                "content": "Combine the skills into a demonstrable SOC L1 portfolio project.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Add machine-readable audit logs for pipeline runs.",
                  "Verification rule: No sensitive input copied unnecessarily.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Intermediate Python Programming (chapter starts 02:20:10)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Add machine-readable audit logs for pipeline runs.",
                "expectedOutcome": "No sensitive input copied unnecessarily."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "No sensitive input copied unnecessarily.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Combine the skills into a demonstrable SOC L1 portfolio project.",
            "furtherReading": [
              {
                "title": "pytest: official/reference documentation",
                "url": "https://docs.pytest.org/en/stable/"
              },
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              },
              {
                "title": "mitre: official/reference documentation",
                "url": "https://attack.mitre.org/resources/attack-data-and-tools/"
              },
              {
                "title": "security: official/reference documentation",
                "url": "https://owasp.org/www-project-top-ten/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m30-l03",
          "slug": "m30-l3-testing-core-functions",
          "title": "Module 30 - Lesson 3: Testing core functions",
          "description": "Technique bridge to this module\u2019s security lab. Write parameterized alert classification tests. Verification: Boundary cases covered.",
          "youtubeVideoId": "cHYq1MRoyI0",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 30: Final Capstone \u2014 SOC Automation Pipeline",
          "objectives": [
            "Write parameterized alert classification tests.",
            "Verify implementation: Boundary cases covered.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Implement a reproducible multi-source parser.",
            "Correlate and prioritize synthetic events."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-30",
            "advanced"
          ],
          "skillsTaught": [
            "Testing core functions",
            "Security Python Scripting (Mod 30)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Testing core functions), learn defensive programming with video instruction by freeCodeCamp. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Testing core functions",
                "content": "Combine the skills into a demonstrable SOC L1 portfolio project.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Write parameterized alert classification tests.",
                  "Verification rule: Boundary cases covered.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'freeCodeCamp \u2014 Pytest Tutorial (chapter starts 00:41:10)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Write parameterized alert classification tests.",
                "expectedOutcome": "Boundary cases covered."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "Boundary cases covered.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Combine the skills into a demonstrable SOC L1 portfolio project.",
            "furtherReading": [
              {
                "title": "pytest: official/reference documentation",
                "url": "https://docs.pytest.org/en/stable/"
              },
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              },
              {
                "title": "mitre: official/reference documentation",
                "url": "https://attack.mitre.org/resources/attack-data-and-tools/"
              },
              {
                "title": "security: official/reference documentation",
                "url": "https://owasp.org/www-project-top-ten/"
              }
            ]
          }
        },
        {
          "id": "les-pysec-m30-l04",
          "slug": "m30-l4-incident-workflow-planning",
          "title": "Module 30 - Lesson 4: Incident workflow planning",
          "description": "Technique bridge to this module\u2019s security lab. Explain portfolio value, safe scope and operational cautions. Verification: README describes limitations.",
          "youtubeVideoId": "Fxh9X3-hO4Y",
          "videoAttribution": {
            "creator": "CyberFlow",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 30: Final Capstone \u2014 SOC Automation Pipeline",
          "objectives": [
            "Explain portfolio value, safe scope and operational cautions.",
            "Verify implementation: README describes limitations.",
            "Topic alignment: Technique bridge to this module\u2019s security lab",
            "Implement a reproducible multi-source parser.",
            "Correlate and prioritize synthetic events."
          ],
          "tags": [
            "python",
            "cybersecurity",
            "module-30",
            "advanced"
          ],
          "skillsTaught": [
            "Incident workflow planning",
            "Security Python Scripting (Mod 30)",
            "Defensive Evidence Handling"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Incident workflow planning), learn defensive programming with video instruction by CyberFlow. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
            "prerequisites": [
              "Python 3.10+ installed and isolated lab configured (previous module)",
              "Command terminal or VS Code configured for defensive scripting"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Incident workflow planning",
                "content": "Combine the skills into a demonstrable SOC L1 portfolio project.\n\nAlignment context: Technique bridge to this module\u2019s security lab. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                "keyPoints": [
                  "Explain portfolio value, safe scope and operational cautions.",
                  "Verification rule: README describes limitations.",
                  "Instructor recommendation: Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Interactive Study & Code Along",
                "instruction": "Watch the timestamped video lesson: 'CyberFlow \u2014 Best Way to Learn Python for Hacking (chapter starts 01:32)'. Pause and recreate the demonstrated code patterns in your development environment.",
                "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
              },
              {
                "step": 2,
                "title": "Execute Practical Security Task",
                "instruction": "Explain portfolio value, safe scope and operational cautions.",
                "expectedOutcome": "README describes limitations."
              },
              {
                "step": 3,
                "title": "Verify Defenses & Provenance",
                "instruction": "Run sanity checks and test against unexpected inputs. Ask learners to explain expected behavior for one normal case and one unexpected input. Keep the example inside the authorized lab.",
                "expectedOutcome": "Script executes deterministically and handles edge cases safely."
              }
            ],
            "expectedObservations": [
              "README describes limitations.",
              "Strict adherence to safe isolated lab boundaries without touching production networks.",
              "Repeatable execution with logged input/output fixtures."
            ],
            "commonMistakes": [
              "Testing scripts against production endpoints without explicit written authorization.",
              "Hardcoding credentials or API keys directly in script source code.",
              "Failing to handle file-not-found, encoding, or malformed data exceptions."
            ],
            "securityRelevance": "In enterprise security operations, automation must be reliable, auditable, and resilient. Combine the skills into a demonstrable SOC L1 portfolio project.",
            "furtherReading": [
              {
                "title": "pytest: official/reference documentation",
                "url": "https://docs.pytest.org/en/stable/"
              },
              {
                "title": "json: official/reference documentation",
                "url": "https://docs.python.org/3/library/json.html"
              },
              {
                "title": "mitre: official/reference documentation",
                "url": "https://attack.mitre.org/resources/attack-data-and-tools/"
              },
              {
                "title": "security: official/reference documentation",
                "url": "https://owasp.org/www-project-top-ten/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-pysec-m30",
        "title": "Lab 30: Final Capstone \u2014 SOC Automation Pipeline Hands-on Implementation",
        "objective": "Combine the skills into a demonstrable SOC L1 portfolio project. Combine the skills into a demonstrable SOC L1 portfolio project. Work only with synthetic data from [LAB_DATASETS.md](../04-LAB-DATASETS.md) or an authorized personal VM.",
        "toolsRequired": [
          "Python 3.10+",
          "VS Code / Preferred Editor",
          "Safe Isolated Lab Directory"
        ],
        "pcapSource": {
          "fileName": "synthetic_m30_dataset.json",
          "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/data/synthetic_labs.json"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Ingest synthetic Linux auth, Windows XML, email metadata and indicators from LAB_DATASETS.md.",
          "Validate all sources and normalize to a common event format with timestamps and provenance.",
          "Run bounded detection and IOC lookup against offline fixtures; summarize priority with evidence and caveats.",
          "Export investigation_report.md and normalized_alerts.json; preserve source files and hash them.",
          "Write 15 tests; produce screenshots, architecture diagram as Mermaid and a 3-minute demo walkthrough."
        ],
        "tasks": [
          {
            "id": "task-m30-1",
            "description": "Ingest synthetic Linux auth, Windows XML, email metadata and indicators from LAB_DATASETS.md."
          },
          {
            "id": "task-m30-2",
            "description": "Validate all sources and normalize to a common event format with timestamps and provenance."
          },
          {
            "id": "task-m30-3",
            "description": "Run bounded detection and IOC lookup against offline fixtures; summarize priority with evidence and caveats."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "environment_provenance",
            "prompt": "Document your Python version, OS environment, and isolated directory path.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "execution_output",
            "prompt": "Provide terminal output demonstrating successful execution and edge-case handling.",
            "expectedEvidenceType": "Terminal output log"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "All inputs synthetic or authorized.",
          "No unattended containment.",
          "15 tests with documented results.",
          "Evidence provenance and false positives explained."
        ]
      },
      "capstoneAssessment": {
        "id": "capstone-python-soc-pipeline",
        "title": "Comprehensive Capstone: Offline SOC Automation Pipeline",
        "scenario": "Given a folder of synthetic Linux authentication lines, Windows Event XML fragments, alert JSON, and a mock IOC feed, build a repeatable, modular Python pipeline that produces an auditable one-page incident investigation report.",
        "pcapSource": {
          "fileName": "soc_capstone_synthetic_fixtures.zip",
          "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/data/soc_capstone_fixtures.zip"
        },
        "totalMarks": 100,
        "passingScore": 75,
        "rubric": [
          {
            "category": "Python Correctness & Maintainability",
            "marks": 20,
            "criteria": [
              "Modular design",
              "Type validation",
              "Clear naming",
              "Defensive error handling"
            ]
          },
          {
            "category": "Evidence Handling & Normalization",
            "marks": 20,
            "criteria": [
              "Original inputs unchanged",
              "Data provenance",
              "UTC normalization",
              "Malformed record handling"
            ]
          },
          {
            "category": "Detection Reasoning & False Positives",
            "marks": 20,
            "criteria": [
              "Documented thresholds",
              "Careful uncertainty",
              "No unwarranted compromise conclusions"
            ]
          },
          {
            "category": "Automated Tests & Reproducibility",
            "marks": 15,
            "criteria": [
              ">=15 unit tests",
              "Boundary and negative test cases",
              "Clear execution instructions"
            ]
          },
          {
            "category": "Security Engineering",
            "marks": 15,
            "criteria": [
              "Offline-by-default execution",
              "Strict input validation",
              "Timeouts and secret protection"
            ]
          },
          {
            "category": "Reporting & Communication",
            "marks": 10,
            "criteria": [
              "Concise incident summary",
              "Actionable recommendations",
              "Clear documentation of limitations"
            ]
          }
        ],
        "submissionSections": [
          {
            "id": "code_repository",
            "title": "Modular Source Code & Test Suite",
            "prompt": "Link your Git repository containing ingest, normalize, triage, and reporting modules with >=15 tests.",
            "maxMarks": 40
          },
          {
            "id": "investigation_report",
            "title": "Investigation Report & Analyst Recommendations",
            "prompt": "Provide your investigation_report.md containing incident timeline, evidence artifacts, confidence scoring, and mitigations.",
            "maxMarks": 30
          },
          {
            "id": "threat_model",
            "title": "Pipeline Threat Model & Operational Hardening",
            "prompt": "Provide your threat model covering secrets handling, sandbox boundaries, error paths, and permission controls.",
            "maxMarks": 30
          }
        ]
      }
    }
  ]
};
