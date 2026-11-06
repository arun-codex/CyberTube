-- supabase/migrations/20261106040000_create_discovery_tables.sql
-- CyberTube Phase 22.1 Discovery Platform Schema & Row Level Security

-- Ensure UUID extension is available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Categories
CREATE TABLE IF NOT EXISTS discovery_categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  icon text,
  enabled boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone DEFAULT now()
);

-- 2. Topics linked to categories
CREATE TABLE IF NOT EXISTS discovery_topics (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id uuid NOT NULL REFERENCES discovery_categories(id) ON DELETE CASCADE,
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  keywords text[] DEFAULT '{}'::text[],
  priority integer NOT NULL DEFAULT 1,
  enabled boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone DEFAULT now()
);

-- 3. Sources
CREATE TABLE IF NOT EXISTS discovery_sources (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  type text NOT NULL, -- 'rss', 'atom', 'cisa', 'github', 'official'
  url text NOT NULL,
  category_id uuid REFERENCES discovery_categories(id) ON DELETE SET NULL,
  enabled boolean NOT NULL DEFAULT true,
  fetch_interval_minutes int NOT NULL DEFAULT 60,
  last_fetched_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

-- 4. Discovery Items (curated / ingested technology developments)
CREATE TABLE IF NOT EXISTS discovery_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_id uuid REFERENCES discovery_sources(id) ON DELETE SET NULL,
  external_id text NOT NULL,
  title text NOT NULL,
  description text,
  url text NOT NULL,
  thumbnail_url text,
  published_at timestamp with time zone NOT NULL,
  category_id uuid REFERENCES discovery_categories(id) ON DELETE SET NULL,
  topic_id uuid REFERENCES discovery_topics(id) ON DELETE SET NULL,
  author text,
  content_type text NOT NULL DEFAULT 'article' CHECK (content_type IN ('article', 'video', 'podcast', 'event', 'paper', 'release')),
  published boolean NOT NULL DEFAULT true,
  UNIQUE (source_id, external_id),
  created_at timestamp with time zone DEFAULT now()
);

-- 5. User Interests (Personalization preferences)
CREATE TABLE IF NOT EXISTS user_interests (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id uuid NOT NULL REFERENCES discovery_topics(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE (user_id, topic_id)
);

-- 6. Refresh Jobs (Internal operational schedule logs)
CREATE TABLE IF NOT EXISTS discovery_refresh_jobs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  started_at timestamp with time zone DEFAULT now(),
  completed_at timestamp with time zone,
  status text NOT NULL DEFAULT 'running' CHECK (status IN ('running', 'success', 'failed')),
  details jsonb DEFAULT '{}'::jsonb
);

-- 7. Refresh Logs (Detailed source execution logs)
CREATE TABLE IF NOT EXISTS discovery_refresh_logs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id uuid NOT NULL REFERENCES discovery_refresh_jobs(id) ON DELETE CASCADE,
  source_id uuid REFERENCES discovery_sources(id) ON DELETE SET NULL,
  fetched_at timestamp with time zone DEFAULT now(),
  new_items int NOT NULL DEFAULT 0,
  error text
);

-- 8. Licensed Videos (Admin-curated educational repository)
CREATE TABLE IF NOT EXISTS licensed_videos (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text,
  url text NOT NULL,
  thumbnail_url text,
  license_type text NOT NULL DEFAULT 'partner', -- 'internal', 'partner', 'creative-commons'
  created_at timestamp with time zone DEFAULT now()
);

-- Indexes for performance & query isolation
CREATE INDEX IF NOT EXISTS idx_discovery_topics_category_id ON discovery_topics(category_id);
CREATE INDEX IF NOT EXISTS idx_discovery_items_category_id ON discovery_items(category_id);
CREATE INDEX IF NOT EXISTS idx_discovery_items_topic_id ON discovery_items(topic_id);
CREATE INDEX IF NOT EXISTS idx_discovery_items_published_at ON discovery_items(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_discovery_items_published ON discovery_items(published);
CREATE INDEX IF NOT EXISTS idx_user_interests_user_id ON user_interests(user_id);
CREATE INDEX IF NOT EXISTS idx_user_interests_topic_id ON user_interests(topic_id);
CREATE INDEX IF NOT EXISTS idx_discovery_refresh_logs_job_id ON discovery_refresh_logs(job_id);

-- Enable Row Level Security (RLS) on all eight tables
ALTER TABLE discovery_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE discovery_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE discovery_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE discovery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE discovery_refresh_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE discovery_refresh_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE licensed_videos ENABLE ROW LEVEL SECURITY;

-- Explicit Public Read Policies (Only enabled / published data)
CREATE POLICY "public_read_enabled_categories" ON discovery_categories
  FOR SELECT TO anon, authenticated
  USING (enabled = true);

CREATE POLICY "public_read_enabled_topics" ON discovery_topics
  FOR SELECT TO anon, authenticated
  USING (enabled = true);

CREATE POLICY "public_read_published_items" ON discovery_items
  FOR SELECT TO anon, authenticated
  USING (published = true);

CREATE POLICY "public_read_licensed_videos" ON licensed_videos
  FOR SELECT TO anon, authenticated
  USING (true);

-- User Interests Policies: Strictly restricted to authenticated owner
CREATE POLICY "user_select_own_interests" ON user_interests
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "user_insert_own_interests" ON user_interests
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_delete_own_interests" ON user_interests
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Operational tables: No public access
-- discovery_sources, discovery_refresh_jobs, and discovery_refresh_logs have RLS enabled
-- with NO public policies, preventing anonymous or ordinary users from reading or writing.
-- Privileged server-side jobs interact via the service-role client, which bypasses RLS safely.

-- Revoke default public table permissions to prevent unauthorized access
REVOKE ALL ON discovery_refresh_jobs FROM anon, authenticated;
REVOKE ALL ON discovery_refresh_logs FROM anon, authenticated;
REVOKE ALL ON discovery_sources FROM anon, authenticated;

-- Grant SELECT on public tables to anon and authenticated
GRANT SELECT ON discovery_categories TO anon, authenticated;
GRANT SELECT ON discovery_topics TO anon, authenticated;
GRANT SELECT ON discovery_items TO anon, authenticated;
GRANT SELECT ON licensed_videos TO anon, authenticated;
GRANT SELECT, INSERT, DELETE ON user_interests TO authenticated;

-- Idempotent Seed: 16 Required Categories
INSERT INTO discovery_categories (slug, name, description, icon, enabled)
SELECT slug, name, description, icon, enabled FROM (VALUES
  ('cybersecurity', 'Cybersecurity', 'Security research, threat intelligence, advisories, tools and defense techniques.', 'shield', true),
  ('artificial-intelligence', 'Artificial Intelligence', 'AI breakthroughs, autonomous agents, neural architectures, and safety research.', 'brain', true),
  ('machine-learning', 'Machine Learning', 'ML algorithms, model training, fine-tuning, datasets, and MLOps tooling.', 'cpu', true),
  ('programming', 'Programming', 'Modern languages, systems programming, compilers, and algorithmic design.', 'code', true),
  ('web-development', 'Web Development', 'Frontend architecture, server-rendered applications, performance, and Web APIs.', 'globe', true),
  ('networking', 'Networking', 'Network protocols, deep packet analysis, routing protocols, and distributed fabrics.', 'wifi', true),
  ('cloud-computing', 'Cloud Computing', 'Cloud-native architectures, multi-cloud strategy, serverless, and resilient infrastructure.', 'cloud', true),
  ('devops', 'DevOps', 'Continuous integration, infrastructure as code, observability, and container platforms.', 'gear', true),
  ('linux', 'Linux', 'Kernel internals, distributions, systems administration, eBPF, and core tooling.', 'terminal', true),
  ('open-source', 'Open Source', 'Open-source projects, developer tools, community innovations, and permissive software.', 'git-pull-request', true),
  ('hardware', 'Hardware', 'Computer architecture, silicon design, microprocessors, and hardware hacking.', 'cpu', true),
  ('iot', 'IoT', 'Connected devices, smart sensors, industrial IoT, edge computing, and Zigbee/MQTT.', 'anchor', true),
  ('embedded-systems', 'Embedded Systems', 'Microcontrollers, RTOS, embedded C/Rust, firmware reverse engineering, and bare-metal.', 'chip', true),
  ('robotics', 'Robotics', 'Autonomous mobility, robotic operating systems (ROS), sensor fusion, and kinematics.', 'bot', true),
  ('technology-research', 'Technology Research', 'Computer science papers, cryptographic research, security whitepapers, and breakthroughs.', 'book-open', true),
  ('software-releases', 'Software Releases', 'Major framework updates, language releases, CVE patches, and critical software milestones.', 'tag', true)
) AS v(slug, name, description, icon, enabled)
ON CONFLICT (slug) DO UPDATE
SET name = EXCLUDED.name,
    description = EXCLUDED.description,
    icon = EXCLUDED.icon,
    enabled = EXCLUDED.enabled;

-- Idempotent Seed: Foundational Topics for each category
INSERT INTO discovery_topics (category_id, slug, name, description, keywords, priority, enabled)
SELECT c.id, t.slug, t.name, t.description, t.keywords, t.priority, t.enabled
FROM (VALUES
  ('cybersecurity', 'threat-intelligence', 'Threat Intelligence', 'Tracking threat actors, Indicators of Compromise (IoCs), and malware campaigns.', ARRAY['cve','threat','adversary','apt','malware','advisory','ioc'], 1, true),
  ('cybersecurity', 'penetration-testing', 'Penetration Testing & Red Teaming', 'Offensive security assessments, exploit development, and penetration testing techniques.', ARRAY['pentest','red team','exploit','burp','metasploit','privilege escalation'], 1, true),
  ('cybersecurity', 'incident-response-forensics', 'Incident Response & Forensics', 'Investigating breaches, disk and memory forensics, and containment strategies.', ARRAY['forensics','dfir','incident response','memory analysis','wireshark','volatility'], 1, true),
  ('artificial-intelligence', 'llm-foundations', 'LLMs & Foundation Models', 'Large language models, transformer architectures, and generative AI research.', ARRAY['llm','transformer','gpt','gemini','claude','reasoning','tokens'], 1, true),
  ('artificial-intelligence', 'ai-agents-tooling', 'AI Agents & Autonomous Systems', 'Autonomous reasoning agents, tool integration, and Model Context Protocol (MCP).', ARRAY['agent','function calling','tool calling','mcp','autonomous','rag'], 1, true),
  ('machine-learning', 'deep-learning-frameworks', 'Deep Learning Frameworks', 'Building and training neural models with PyTorch, JAX, and accelerated compute.', ARRAY['pytorch','tensorflow','jax','cuda','neural network','backpropagation'], 1, true),
  ('machine-learning', 'mlops-pipeline', 'MLOps & Model Serving', 'Model deployment, quantization, latency optimization, and continuous evaluation.', ARRAY['mlops','quantization','vllm','huggingface','tensorrt','evals'], 2, true),
  ('programming', 'systems-programming-rust', 'Systems Programming (Rust & C/C++)', 'High-performance systems software, low-level memory control, and safety.', ARRAY['rust','c++','memory safety','concurrency','borrow checker','compiler'], 1, true),
  ('programming', 'modern-backend-go-node', 'Backend Architecture (Go & Node.js)', 'Scalable backend services, concurrent network services, and API engineering.', ARRAY['golang','node','typescript','grpc','microservices','concurrency'], 1, true),
  ('web-development', 'nextjs-react-ecosystem', 'React & Next.js Architecture', 'Modern server-driven web applications, SSR, hydration, and Core Web Vitals.', ARRAY['react','next.js','server components','ssr','tailwind','web vitals'], 1, true),
  ('web-development', 'web-security-standards', 'Web Security & Browsers', 'Browser security models, authentication handshakes, and application hardening.', ARRAY['xss','csrf','csp','cors','oauth','webauthn','cookies'], 1, true),
  ('networking', 'network-protocols-analysis', 'Protocol Analysis & Wireshark', 'Deep packet inspection, protocol state machines, and traffic diagnostics.', ARRAY['tcp','udp','ip','dns','http3','quic','pcap','wireshark'], 1, true),
  ('networking', 'routing-switching-sdn', 'Routing, Switching & SDN', 'Enterprise and internet routing, software-defined networking, and encrypted overlays.', ARRAY['bgp','ospf','vxlan','sdn','firewall','wireguard','vpn'], 2, true),
  ('cloud-computing', 'cloud-architecture-aws-azure-gcp', 'Cloud Architecture & Multi-Cloud', 'Designing reliable, isolated, and scalable infrastructure across major cloud providers.', ARRAY['aws','gcp','azure','iam','s3','vpc','lambda','serverless'], 1, true),
  ('devops', 'kubernetes-containers', 'Kubernetes & Container Platforms', 'Container orchestration, workload isolation, ingress controllers, and cluster operations.', ARRAY['kubernetes','k8s','docker','containerd','helm','service mesh'], 1, true),
  ('devops', 'ci-cd-iac', 'CI/CD & Infrastructure as Code', 'Automated delivery pipelines, immutable infrastructure, and GitOps deployments.', ARRAY['terraform','github actions','ansible','opentofu','argocd','gitops'], 1, true),
  ('linux', 'linux-kernel-ebpf', 'Kernel Internals & eBPF', 'Linux kernel subsystems, high-performance tracing with eBPF, and process isolation.', ARRAY['ebpf','kernel','syscall','cgroups','namespaces','systemd'], 1, true),
  ('linux', 'linux-systems-administration', 'Linux Systems Administration', 'Server hardening, package management, shell automation, and Linux security modules.', ARRAY['bash','debian','arch','rhel','ssh','selinux','apparmor'], 2, true),
  ('open-source', 'open-source-tooling', 'Developer Tools & Libraries', 'Community-driven open-source projects, developer utilities, and modern toolchains.', ARRAY['github','git','cli','oss','compiler','framework','license'], 1, true),
  ('hardware', 'computer-architecture-silicon', 'Computer Architecture & RISC-V', 'Instruction set architectures, processor design, caching hierarchies, and microarchitectural security.', ARRAY['risc-v','arm','x86','cpu','gpu','spectre','hardware vulnerability'], 1, true),
  ('iot', 'smart-devices-protocols', 'IoT Protocols & Edge Devices', 'Telemetry ingestion, lightweight messaging protocols, and connected hardware ecosystems.', ARRAY['mqtt','zigbee','lorawan','coap','sensors','edge gateway'], 1, true),
  ('embedded-systems', 'firmware-reverse-engineering', 'Firmware Analysis & Microcontrollers', 'Reverse engineering embedded binaries, bus interfacing, and real-time operating systems.', ARRAY['firmware','ghidra','uart','jtag','esp32','stm32','rtos'], 1, true),
  ('robotics', 'autonomous-robotics-ros', 'ROS & Autonomous Robotics', 'Simultaneous localization and mapping (SLAM), robotic motion control, and ROS 2 middleware.', ARRAY['ros2','slam','lidar','kinematics','computer vision','actuator'], 1, true),
  ('technology-research', 'applied-cryptography', 'Applied Cryptography & Post-Quantum', 'Zero-knowledge proofs, post-quantum cryptographic standards, and protocol proofs.', ARRAY['cryptography','zero knowledge','post-quantum','pqc','rsa','ecc','zkp'], 1, true),
  ('software-releases', 'release-radar-cve-updates', 'Release Radar & Security Bulletins', 'Tracking critical software updates, major version changelogs, and vulnerability patches.', ARRAY['release','changelog','security advisory','patch','vulnerability','breaking change'], 1, true)
) AS t(category_slug, slug, name, description, keywords, priority, enabled)
JOIN discovery_categories c ON c.slug = t.category_slug
ON CONFLICT (slug) DO UPDATE
SET name = EXCLUDED.name,
    description = EXCLUDED.description,
    keywords = EXCLUDED.keywords,
    priority = EXCLUDED.priority,
    enabled = EXCLUDED.enabled;
