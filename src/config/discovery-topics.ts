// src/config/discovery-topics.ts
// Centralized taxonomy for the Discover platform.
// 16 Categories and comprehensive topics with stable identifiers, slugs, and deterministic keywords.

export interface DiscoveryCategory {
  id: string; // stable slug / identifier matching database slug
  name: string;
  slug: string;
  description: string;
  icon: string;
  enabled: boolean;
  createdAt: string;
}

export interface DiscoveryTopic {
  id: string; // stable slug / identifier matching database slug
  categoryId: string; // references category slug / identifier
  name: string;
  slug: string;
  keywords: string[]; // lower-cased keywords for classification
  description: string;
  priority: number;
  enabled: boolean;
  createdAt: string;
}

export const DISCOVERY_CATEGORIES: DiscoveryCategory[] = [
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    slug: "cybersecurity",
    description: "Security research, threat intelligence, advisories, tools and defense techniques.",
    icon: "shield",
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },
  {
    id: "artificial-intelligence",
    name: "Artificial Intelligence",
    slug: "artificial-intelligence",
    description: "AI breakthroughs, autonomous agents, neural architectures, and safety research.",
    icon: "brain",
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },
  {
    id: "machine-learning",
    name: "Machine Learning",
    slug: "machine-learning",
    description: "ML algorithms, model training, fine-tuning, datasets, and MLOps tooling.",
    icon: "cpu",
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },
  {
    id: "programming",
    name: "Programming",
    slug: "programming",
    description: "Modern languages, systems programming, compilers, and algorithmic design.",
    icon: "code",
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },
  {
    id: "web-development",
    name: "Web Development",
    slug: "web-development",
    description: "Frontend architecture, server-rendered applications, performance, and Web APIs.",
    icon: "globe",
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },
  {
    id: "networking",
    name: "Networking",
    slug: "networking",
    description: "Network protocols, deep packet analysis, routing protocols, and distributed fabrics.",
    icon: "wifi",
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },
  {
    id: "cloud-computing",
    name: "Cloud Computing",
    slug: "cloud-computing",
    description: "Cloud-native architectures, multi-cloud strategy, serverless, and resilient infrastructure.",
    icon: "cloud",
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },
  {
    id: "devops",
    name: "DevOps",
    slug: "devops",
    description: "Continuous integration, infrastructure as code, observability, and container platforms.",
    icon: "gear",
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },
  {
    id: "linux",
    name: "Linux",
    slug: "linux",
    description: "Kernel internals, distributions, systems administration, eBPF, and core tooling.",
    icon: "terminal",
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },
  {
    id: "open-source",
    name: "Open Source",
    slug: "open-source",
    description: "Open-source projects, developer tools, community innovations, and permissive software.",
    icon: "git-pull-request",
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },
  {
    id: "hardware",
    name: "Hardware",
    slug: "hardware",
    description: "Computer architecture, silicon design, microprocessors, and hardware hacking.",
    icon: "cpu",
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },
  {
    id: "iot",
    name: "IoT",
    slug: "iot",
    description: "Connected devices, smart sensors, industrial IoT, edge computing, and Zigbee/MQTT.",
    icon: "anchor",
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },
  {
    id: "embedded-systems",
    name: "Embedded Systems",
    slug: "embedded-systems",
    description: "Microcontrollers, RTOS, embedded C/Rust, firmware reverse engineering, and bare-metal.",
    icon: "chip",
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },
  {
    id: "robotics",
    name: "Robotics",
    slug: "robotics",
    description: "Autonomous mobility, robotic operating systems (ROS), sensor fusion, and kinematics.",
    icon: "bot",
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },
  {
    id: "technology-research",
    name: "Technology Research",
    slug: "technology-research",
    description: "Computer science papers, cryptographic research, security whitepapers, and breakthroughs.",
    icon: "book-open",
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },
  {
    id: "software-releases",
    name: "Software Releases",
    slug: "software-releases",
    description: "Major framework updates, language releases, CVE patches, and critical software milestones.",
    icon: "tag",
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },
];

export const DISCOVERY_TOPICS: DiscoveryTopic[] = [
  // 1. Cybersecurity
  {
    id: "threat-intelligence",
    categoryId: "cybersecurity",
    name: "Threat Intelligence",
    slug: "threat-intelligence",
    keywords: ["cve", "threat", "adversary", "apt", "malware", "advisory", "ioc"],
    description: "Tracking threat actors, Indicators of Compromise (IoCs), and malware campaigns.",
    priority: 1,
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },
  {
    id: "penetration-testing",
    categoryId: "cybersecurity",
    name: "Penetration Testing & Red Teaming",
    slug: "penetration-testing",
    keywords: ["pentest", "red team", "exploit", "burp", "metasploit", "privilege escalation"],
    description: "Offensive security assessments, exploit development, and penetration testing techniques.",
    priority: 1,
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },
  {
    id: "incident-response-forensics",
    categoryId: "cybersecurity",
    name: "Incident Response & Forensics",
    slug: "incident-response-forensics",
    keywords: ["forensics", "dfir", "incident response", "memory analysis", "wireshark", "volatility"],
    description: "Investigating breaches, disk and memory forensics, and containment strategies.",
    priority: 1,
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },

  // 2. Artificial Intelligence
  {
    id: "llm-foundations",
    categoryId: "artificial-intelligence",
    name: "LLMs & Foundation Models",
    slug: "llm-foundations",
    keywords: ["llm", "transformer", "gpt", "gemini", "claude", "reasoning", "tokens"],
    description: "Large language models, transformer architectures, and generative AI research.",
    priority: 1,
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },
  {
    id: "ai-agents-tooling",
    categoryId: "artificial-intelligence",
    name: "AI Agents & Autonomous Systems",
    slug: "ai-agents-tooling",
    keywords: ["agent", "function calling", "tool calling", "mcp", "autonomous", "rag"],
    description: "Autonomous reasoning agents, tool integration, and Model Context Protocol (MCP).",
    priority: 1,
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },

  // 3. Machine Learning
  {
    id: "deep-learning-frameworks",
    categoryId: "machine-learning",
    name: "Deep Learning Frameworks",
    slug: "deep-learning-frameworks",
    keywords: ["pytorch", "tensorflow", "jax", "cuda", "neural network", "backpropagation"],
    description: "Building and training neural models with PyTorch, JAX, and accelerated compute.",
    priority: 1,
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },
  {
    id: "mlops-pipeline",
    categoryId: "machine-learning",
    name: "MLOps & Model Serving",
    slug: "mlops-pipeline",
    keywords: ["mlops", "quantization", "vllm", "huggingface", "tensorrt", "evals"],
    description: "Model deployment, quantization, latency optimization, and continuous evaluation.",
    priority: 2,
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },

  // 4. Programming
  {
    id: "systems-programming-rust",
    categoryId: "programming",
    name: "Systems Programming (Rust & C/C++)",
    slug: "systems-programming-rust",
    keywords: ["rust", "c++", "memory safety", "concurrency", "borrow checker", "compiler"],
    description: "High-performance systems software, low-level memory control, and safety.",
    priority: 1,
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },
  {
    id: "modern-backend-go-node",
    categoryId: "programming",
    name: "Backend Architecture (Go & Node.js)",
    slug: "modern-backend-go-node",
    keywords: ["golang", "node", "typescript", "grpc", "microservices", "concurrency"],
    description: "Scalable backend services, concurrent network services, and API engineering.",
    priority: 1,
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },

  // 5. Web Development
  {
    id: "nextjs-react-ecosystem",
    categoryId: "web-development",
    name: "React & Next.js Architecture",
    slug: "nextjs-react-ecosystem",
    keywords: ["react", "next.js", "server components", "ssr", "tailwind", "web vitals"],
    description: "Modern server-driven web applications, SSR, hydration, and Core Web Vitals.",
    priority: 1,
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },
  {
    id: "web-security-standards",
    categoryId: "web-development",
    name: "Web Security & Browsers",
    slug: "web-security-standards",
    keywords: ["xss", "csrf", "csp", "cors", "oauth", "webauthn", "cookies"],
    description: "Browser security models, authentication handshakes, and application hardening.",
    priority: 1,
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },

  // 6. Networking
  {
    id: "network-protocols-analysis",
    categoryId: "networking",
    name: "Protocol Analysis & Wireshark",
    slug: "network-protocols-analysis",
    keywords: ["tcp", "udp", "ip", "dns", "http3", "quic", "pcap", "wireshark"],
    description: "Deep packet inspection, protocol state machines, and traffic diagnostics.",
    priority: 1,
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },
  {
    id: "routing-switching-sdn",
    categoryId: "networking",
    name: "Routing, Switching & SDN",
    slug: "routing-switching-sdn",
    keywords: ["bgp", "ospf", "vxlan", "sdn", "firewall", "wireguard", "vpn"],
    description: "Enterprise and internet routing, software-defined networking, and encrypted overlays.",
    priority: 2,
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },

  // 7. Cloud Computing
  {
    id: "cloud-architecture-aws-azure-gcp",
    categoryId: "cloud-computing",
    name: "Cloud Architecture & Multi-Cloud",
    slug: "cloud-architecture-aws-azure-gcp",
    keywords: ["aws", "gcp", "azure", "iam", "s3", "vpc", "lambda", "serverless"],
    description: "Designing reliable, isolated, and scalable infrastructure across major cloud providers.",
    priority: 1,
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },

  // 8. DevOps
  {
    id: "kubernetes-containers",
    categoryId: "devops",
    name: "Kubernetes & Container Platforms",
    slug: "kubernetes-containers",
    keywords: ["kubernetes", "k8s", "docker", "containerd", "helm", "service mesh"],
    description: "Container orchestration, workload isolation, ingress controllers, and cluster operations.",
    priority: 1,
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },
  {
    id: "ci-cd-iac",
    categoryId: "devops",
    name: "CI/CD & Infrastructure as Code",
    slug: "ci-cd-iac",
    keywords: ["terraform", "github actions", "ansible", "opentofu", "argocd", "gitops"],
    description: "Automated delivery pipelines, immutable infrastructure, and GitOps deployments.",
    priority: 1,
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },

  // 9. Linux
  {
    id: "linux-kernel-ebpf",
    categoryId: "linux",
    name: "Kernel Internals & eBPF",
    slug: "linux-kernel-ebpf",
    keywords: ["ebpf", "kernel", "syscall", "cgroups", "namespaces", "systemd"],
    description: "Linux kernel subsystems, high-performance tracing with eBPF, and process isolation.",
    priority: 1,
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },
  {
    id: "linux-systems-administration",
    categoryId: "linux",
    name: "Linux Systems Administration",
    slug: "linux-systems-administration",
    keywords: ["bash", "debian", "arch", "rhel", "ssh", "selinux", "apparmor"],
    description: "Server hardening, package management, shell automation, and Linux security modules.",
    priority: 2,
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },

  // 10. Open Source
  {
    id: "open-source-tooling",
    categoryId: "open-source",
    name: "Developer Tools & Libraries",
    slug: "open-source-tooling",
    keywords: ["github", "git", "cli", "oss", "compiler", "framework", "license"],
    description: "Community-driven open-source projects, developer utilities, and modern toolchains.",
    priority: 1,
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },

  // 11. Hardware
  {
    id: "computer-architecture-silicon",
    categoryId: "hardware",
    name: "Computer Architecture & RISC-V",
    slug: "computer-architecture-silicon",
    keywords: ["risc-v", "arm", "x86", "cpu", "gpu", "spectre", "hardware vulnerability"],
    description: "Instruction set architectures, processor design, caching hierarchies, and microarchitectural security.",
    priority: 1,
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },

  // 12. IoT
  {
    id: "smart-devices-protocols",
    categoryId: "iot",
    name: "IoT Protocols & Edge Devices",
    slug: "smart-devices-protocols",
    keywords: ["mqtt", "zigbee", "lorawan", "coap", "sensors", "edge gateway"],
    description: "Telemetry ingestion, lightweight messaging protocols, and connected hardware ecosystems.",
    priority: 1,
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },

  // 13. Embedded Systems
  {
    id: "firmware-reverse-engineering",
    categoryId: "embedded-systems",
    name: "Firmware Analysis & Microcontrollers",
    slug: "firmware-reverse-engineering",
    keywords: ["firmware", "ghidra", "uart", "jtag", "esp32", "stm32", "rtos"],
    description: "Reverse engineering embedded binaries, bus interfacing, and real-time operating systems.",
    priority: 1,
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },

  // 14. Robotics
  {
    id: "autonomous-robotics-ros",
    categoryId: "robotics",
    name: "ROS & Autonomous Robotics",
    slug: "autonomous-robotics-ros",
    keywords: ["ros2", "slam", "lidar", "kinematics", "computer vision", "actuator"],
    description: "Simultaneous localization and mapping (SLAM), robotic motion control, and ROS 2 middleware.",
    priority: 1,
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },

  // 15. Technology Research
  {
    id: "applied-cryptography",
    categoryId: "technology-research",
    name: "Applied Cryptography & Post-Quantum",
    slug: "applied-cryptography",
    keywords: ["cryptography", "zero knowledge", "post-quantum", "pqc", "rsa", "ecc", "zkp"],
    description: "Zero-knowledge proofs, post-quantum cryptographic standards, and protocol proofs.",
    priority: 1,
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },

  // 16. Software Releases
  {
    id: "release-radar-cve-updates",
    categoryId: "software-releases",
    name: "Release Radar & Security Bulletins",
    slug: "release-radar-cve-updates",
    keywords: ["release", "changelog", "security advisory", "patch", "vulnerability", "breaking change"],
    description: "Tracking critical software updates, major version changelogs, and vulnerability patches.",
    priority: 1,
    enabled: true,
    createdAt: "2026-11-06T00:00:00.000Z",
  },
];

// Helper functions for lookup
export const getCategoryById = (id: string): DiscoveryCategory | undefined =>
  DISCOVERY_CATEGORIES.find((c) => c.id === id || c.slug === id);

export const getCategoryBySlug = (slug: string): DiscoveryCategory | undefined =>
  DISCOVERY_CATEGORIES.find((c) => c.slug === slug);

export const getTopicById = (id: string): DiscoveryTopic | undefined =>
  DISCOVERY_TOPICS.find((t) => t.id === id || t.slug === id);

export const getTopicBySlug = (slug: string): DiscoveryTopic | undefined =>
  DISCOVERY_TOPICS.find((t) => t.slug === slug);

export const getTopicsByCategory = (categoryId: string): DiscoveryTopic[] =>
  DISCOVERY_TOPICS.filter((t) => t.categoryId === categoryId);
