-- Seed the canonical discovery taxonomy and explicitly allow only the
-- service role to manage internal source/refresh/catalog tables.
INSERT INTO public.discovery_topics (category_id, slug, name, description, keywords, enabled)
SELECT c.id, v.slug, v.name, v.description, v.keywords, v.enabled
FROM (VALUES
('cybersecurity','threat-intelligence','Threat Intelligence','Tracking threat actors, Indicators of Compromise (IoCs), and malware campaigns.',ARRAY['cve','threat','adversary','apt','malware','advisory','ioc' ]::text[],true),
('cybersecurity','penetration-testing','Penetration Testing & Red Teaming','Offensive security assessments, exploit development, and penetration testing techniques.',ARRAY['pentest','red team','exploit','burp','metasploit','privilege escalation' ]::text[],true),
('cybersecurity','incident-response-forensics','Incident Response & Forensics','Investigating breaches, disk and memory forensics, and containment strategies.',ARRAY['forensics','dfir','incident response','memory analysis','wireshark','volatility' ]::text[],true),
('artificial-intelligence','llm-foundations','LLMs & Foundation Models','Large language models, transformer architectures, and generative AI research.',ARRAY['llm','transformer','gpt','gemini','claude','reasoning','tokens' ]::text[],true),
('artificial-intelligence','ai-agents-tooling','AI Agents & Autonomous Systems','Autonomous reasoning agents, tool integration, and Model Context Protocol (MCP).',ARRAY['agent','function calling','tool calling','mcp','autonomous','rag' ]::text[],true),
('machine-learning','deep-learning-frameworks','Deep Learning Frameworks','Building and training neural models with PyTorch, JAX, and accelerated compute.',ARRAY['pytorch','tensorflow','jax','cuda','neural network','backpropagation' ]::text[],true),
('machine-learning','mlops-pipeline','MLOps & Model Serving','Model deployment, quantization, latency optimization, and continuous evaluation.',ARRAY['mlops','quantization','vllm','huggingface','tensorrt','evals' ]::text[],true),
('programming','systems-programming-rust','Systems Programming (Rust & C/C++)','High-performance systems software, low-level memory control, and safety.',ARRAY['rust','c++','memory safety','concurrency','borrow checker','compiler' ]::text[],true),
('programming','modern-backend-go-node','Backend Architecture (Go & Node.js)','Scalable backend services, concurrent network services, and API engineering.',ARRAY['golang','node','typescript','grpc','microservices','concurrency' ]::text[],true),
('web-development','nextjs-react-ecosystem','React & Next.js Architecture','Modern server-driven web applications, SSR, hydration, and Core Web Vitals.',ARRAY['react','next.js','server components','ssr','tailwind','web vitals' ]::text[],true),
('web-development','web-security-standards','Web Security & Browsers','Browser security models, authentication handshakes, and application hardening.',ARRAY['xss','csrf','csp','cors','oauth','webauthn','cookies' ]::text[],true),
('networking','network-protocols-analysis','Protocol Analysis & Wireshark','Deep packet inspection, protocol state machines, and traffic diagnostics.',ARRAY['tcp','udp','ip','dns','http3','quic','pcap','wireshark' ]::text[],true),
('networking','routing-switching-sdn','Routing, Switching & SDN','Enterprise and internet routing, software-defined networking, and encrypted overlays.',ARRAY['bgp','ospf','vxlan','sdn','firewall','wireguard','vpn' ]::text[],true),
('cloud-computing','cloud-architecture-aws-azure-gcp','Cloud Architecture & Multi-Cloud','Designing reliable, isolated, and scalable infrastructure across major cloud providers.',ARRAY['aws','gcp','azure','iam','s3','vpc','lambda','serverless' ]::text[],true),
('devops','kubernetes-containers','Kubernetes & Container Platforms','Container orchestration, workload isolation, ingress controllers, and cluster operations.',ARRAY['kubernetes','k8s','docker','containerd','helm','service mesh' ]::text[],true),
('devops','ci-cd-iac','CI/CD & Infrastructure as Code','Automated delivery pipelines, immutable infrastructure, and GitOps deployments.',ARRAY['terraform','github actions','ansible','opentofu','argocd','gitops' ]::text[],true),
('linux','linux-kernel-ebpf','Kernel Internals & eBPF','Linux kernel subsystems, high-performance tracing with eBPF, and process isolation.',ARRAY['ebpf','kernel','syscall','cgroups','namespaces','systemd' ]::text[],true),
('linux','linux-systems-administration','Linux Systems Administration','Server hardening, package management, shell automation, and Linux security modules.',ARRAY['bash','debian','arch','rhel','ssh','selinux','apparmor' ]::text[],true),
('open-source','open-source-tooling','Developer Tools & Libraries','Community-driven open-source projects, developer utilities, and modern toolchains.',ARRAY['github','git','cli','oss','compiler','framework','license' ]::text[],true),
('hardware','computer-architecture-silicon','Computer Architecture & RISC-V','Instruction set architectures, processor design, caching hierarchies, and microarchitectural security.',ARRAY['risc-v','arm','x86','cpu','gpu','spectre','hardware vulnerability' ]::text[],true),
('iot','smart-devices-protocols','IoT Protocols & Edge Devices','Telemetry ingestion, lightweight messaging protocols, and connected hardware ecosystems.',ARRAY['mqtt','zigbee','lorawan','coap','sensors','edge gateway' ]::text[],true),
('embedded-systems','firmware-reverse-engineering','Firmware Analysis & Microcontrollers','Reverse engineering embedded binaries, bus interfacing, and real-time operating systems.',ARRAY['firmware','ghidra','uart','jtag','esp32','stm32','rtos' ]::text[],true),
('robotics','autonomous-robotics-ros','ROS & Autonomous Robotics','Simultaneous localization and mapping (SLAM), robotic motion control, and ROS 2 middleware.',ARRAY['ros2','slam','lidar','kinematics','computer vision','actuator' ]::text[],true),
('technology-research','applied-cryptography','Applied Cryptography & Post-Quantum','Zero-knowledge proofs, post-quantum cryptographic standards, and protocol proofs.',ARRAY['cryptography','zero knowledge','post-quantum','pqc','rsa','ecc','zkp' ]::text[],true),
('software-releases','release-radar-cve-updates','Release Radar & Security Bulletins','Tracking critical software updates, major version changelogs, and vulnerability patches.',ARRAY['release','changelog','security advisory','patch','vulnerability','breaking change' ]::text[],true)
) AS v(category_slug, slug, name, description, keywords, enabled)
JOIN public.discovery_categories c ON c.slug = v.category_slug
ON CONFLICT (slug) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  keywords = EXCLUDED.keywords,
  enabled = EXCLUDED.enabled;

CREATE POLICY "service_role_manage_discovery_sources"
  ON public.discovery_sources FOR ALL TO service_role
  USING (true) WITH CHECK (true);
CREATE POLICY "service_role_manage_discovery_refresh_jobs"
  ON public.discovery_refresh_jobs FOR ALL TO service_role
  USING (true) WITH CHECK (true);
CREATE POLICY "service_role_manage_discovery_refresh_logs"
  ON public.discovery_refresh_logs FOR ALL TO service_role
  USING (true) WITH CHECK (true);
CREATE POLICY "service_role_manage_licensed_videos"
  ON public.licensed_videos FOR ALL TO service_role
  USING (true) WITH CHECK (true);
