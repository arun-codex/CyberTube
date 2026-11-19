-- =============================================================================
-- CYBERTUBE: SEED LINUX ZERO TO ADVANCED COMPLETE COURSE
-- =============================================================================
-- Description:
-- Idempotently seeds the 24-week Linux Zero to Advanced course,
-- all 24 modules, and all 55 video lessons into the Supabase database.
-- =============================================================================

DO $$
DECLARE
  v_course_id CONSTANT UUID := 'd7a00000-0000-4000-8000-000000000001';
BEGIN
  -- 1. Insert/Update Course
  INSERT INTO public.courses (
    id,
    slug,
    title,
    short_description,
    description,
    difficulty,
    estimated_duration,
    total_duration_minutes,
    thumbnail_url,
    instructor_name,
    instructor_title,
    instructor_org,
    status,
    tags,
    prerequisites,
    learning_objectives,
    track,
    domains,
    featured
  ) VALUES (
    v_course_id,
    'linux-zero-to-advanced',
    'Linux Zero → Advanced: Complete Administration & Security',
    'A comprehensive 24-week zero-to-advanced Linux administration and systems security curriculum with 55 video lessons, hands-on labs, command practice, quizzes, and capstone.',
    'An intensive, hands-on 24-week Linux systems administration and server security curriculum designed for junior administrators, SOC analysts, and security engineers. Master Linux kernel fundamentals, bash shell navigation, file permissions, ACLs, package managers, process lifecycle, systemd daemon management, disk partitioning, LVM snapshots, backups with rsync, cron scheduling, network routing and sockets, OpenSSH administration, UFW firewalls, advanced Bash/AWK/sed scripting, centralized logging with journald/syslog, system performance metrics, LUKS disk encryption, server hardening audits, and a comprehensive end-of-course server operations capstone project.',
    'intermediate',
    '24 weeks (240 hours)',
    1650,
    'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=800&q=80',
    'Learn Linux TV & Open Community',
    'Linux Systems Educators',
    'Learn Linux TV, NetworkChuck & tutoriaLinux',
    'published',
    ARRAY['linux', 'sysadmin', 'bash', 'systemd', 'security-hardening', 'networking', 'ufw', 'luks', 'awk-sed', 'server-administration'],
    ARRAY['Basic computer literacy and comfort with general operating system concepts', 'A PC or Mac capable of running a virtual machine with at least 4 GB of RAM (VirtualBox / UTM)', 'Curiosity and commitment to practice daily in the Linux command-line terminal'],
    ARRAY['Install, configure, and maintain production-grade Ubuntu Linux systems in virtual environments', 'Master terminal navigation, core utilities, file management, symlinks, search indexing, and stream redirection', 'Administer user accounts, groups, shadow passwords, sudo privilege boundaries, and access control lists (ACLs)', 'Configure, inspect, and troubleshoot systemd unit files, background daemon targets, and boot targets', 'Manage block storage, partitioning schemes (fdisk), filesystem mounts, and dynamic Logical Volume Management (LVM)', 'Automate routine systems administration tasks using Cron jobs, systemd timers, Bash scripting, and AWK/sed pipelines', 'Configure host network interfaces, static routing tables, DNS resolvers, socket monitoring, and OpenSSH key-based authentication', 'Enforce defensive server security with UFW firewall policies, LUKS full-disk encryption, and CIS-aligned server hardening audits', 'Deploy, operate, and verify an end-to-end secure Linux server environment in the comprehensive capstone assessment'],
    'cybersecurity',
    ARRAY['fundamentals', 'soc-blue-team'],
    TRUE
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    difficulty = EXCLUDED.difficulty,
    estimated_duration = EXCLUDED.estimated_duration,
    total_duration_minutes = EXCLUDED.total_duration_minutes,
    thumbnail_url = EXCLUDED.thumbnail_url,
    instructor_name = EXCLUDED.instructor_name,
    instructor_title = EXCLUDED.instructor_title,
    instructor_org = EXCLUDED.instructor_org,
    status = EXCLUDED.status,
    tags = EXCLUDED.tags,
    prerequisites = EXCLUDED.prerequisites,
    learning_objectives = EXCLUDED.learning_objectives,
    track = EXCLUDED.track,
    domains = EXCLUDED.domains,
    featured = EXCLUDED.featured;

  -- 2. Insert/Update 24 Modules
  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d7a00000-0000-4000-8000-000000000101', v_course_id, 'Module 01: Linux basics, distributions and a safe lab', 'Beginner level (Foundations). 1 week (9–12 hours). Prerequisite: None. Complete all hands-on exercises, review commands, and pass the knowledge check.', 1)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d7a00000-0000-4000-8000-000000000102', v_course_id, 'Module 02: Terminal navigation and Linux filesystem hierarchy', 'Beginner level (Foundations). 1 week (9–12 hours). Prerequisite: Module 01. Complete all hands-on exercises, review commands, and pass the knowledge check.', 2)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d7a00000-0000-4000-8000-000000000103', v_course_id, 'Module 03: Files, directories, links and search', 'Beginner level (Foundations). 1 week (9–12 hours). Prerequisite: Module 02. Complete all hands-on exercises, review commands, and pass the knowledge check.', 3)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d7a00000-0000-4000-8000-000000000104', v_course_id, 'Module 04: File viewers, Nano, Vim and command documentation', 'Beginner level (Foundations). 1 week (9–12 hours). Prerequisite: Module 03. Complete all hands-on exercises, review commands, and pass the knowledge check.', 4)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d7a00000-0000-4000-8000-000000000105', v_course_id, 'Module 05: Pipes, redirection and Linux text filters', 'Beginner level (Foundations). 1 week (9–12 hours). Prerequisite: Module 04. Complete all hands-on exercises, review commands, and pass the knowledge check.', 5)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d7a00000-0000-4000-8000-000000000106', v_course_id, 'Module 06: Accounts, groups, sudo and login sessions', 'Intermediate level (System administration). 1 week (9–12 hours). Prerequisite: Module 05. Complete all hands-on exercises, review commands, and pass the knowledge check.', 6)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d7a00000-0000-4000-8000-000000000107', v_course_id, 'Module 07: Linux file permissions, ownership, ACLs and umask', 'Intermediate level (System administration). 1 week (9–12 hours). Prerequisite: Module 06. Complete all hands-on exercises, review commands, and pass the knowledge check.', 7)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d7a00000-0000-4000-8000-000000000108', v_course_id, 'Module 08: Software packages, repositories and updates', 'Intermediate level (System administration). 1 week (9–12 hours). Prerequisite: Module 07. Complete all hands-on exercises, review commands, and pass the knowledge check.', 8)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d7a00000-0000-4000-8000-000000000109', v_course_id, 'Module 09: Processes, process priorities and job control', 'Intermediate level (System administration). 1 week (9–12 hours). Prerequisite: Module 08. Complete all hands-on exercises, review commands, and pass the knowledge check.', 9)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d7a00000-0000-4000-8000-000000000110', v_course_id, 'Module 10: systemd, services and Linux boot lifecycle', 'Intermediate level (System administration). 1 week (9–12 hours). Prerequisite: Module 09. Complete all hands-on exercises, review commands, and pass the knowledge check.', 10)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d7a00000-0000-4000-8000-000000000111', v_course_id, 'Module 11: Disks, filesystems, partitions and mounting', 'Intermediate level (Storage and automation). 1 week (9–12 hours). Prerequisite: Module 10. Complete all hands-on exercises, review commands, and pass the knowledge check.', 11)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d7a00000-0000-4000-8000-000000000112', v_course_id, 'Module 12: LVM, snapshots and modern Linux filesystems', 'Advanced level (Storage and automation). 1 week (9–12 hours). Prerequisite: Module 11. Complete all hands-on exercises, review commands, and pass the knowledge check.', 12)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d7a00000-0000-4000-8000-000000000113', v_course_id, 'Module 13: Archiving, compression, backups and rsync', 'Intermediate level (Storage and automation). 1 week (9–12 hours). Prerequisite: Module 12. Complete all hands-on exercises, review commands, and pass the knowledge check.', 13)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d7a00000-0000-4000-8000-000000000114', v_course_id, 'Module 14: cron jobs, systemd timers and Linux scheduling', 'Intermediate level (Storage and automation). 1 week (9–12 hours). Prerequisite: Module 13. Complete all hands-on exercises, review commands, and pass the knowledge check.', 14)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d7a00000-0000-4000-8000-000000000115', v_course_id, 'Module 15: IP addressing, routes, DNS and Linux network commands', 'Intermediate level (Networking and automation). 1 week (9–12 hours). Prerequisite: Module 14. Complete all hands-on exercises, review commands, and pass the knowledge check.', 15)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d7a00000-0000-4000-8000-000000000116', v_course_id, 'Module 16: OpenSSH administration, keys and secure file transfer', 'Intermediate level (Networking and automation). 1 week (9–12 hours). Prerequisite: Module 15. Complete all hands-on exercises, review commands, and pass the knowledge check.', 16)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d7a00000-0000-4000-8000-000000000117', v_course_id, 'Module 17: Linux host firewalls with UFW', 'Intermediate level (Networking and automation). 1 week (9–12 hours). Prerequisite: Module 16. Complete all hands-on exercises, review commands, and pass the knowledge check.', 17)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d7a00000-0000-4000-8000-000000000118', v_course_id, 'Module 18: Bash scripting from zero: variables, ifs and loops', 'Intermediate level (Bash and observability). 1 week (9–12 hours). Prerequisite: Module 17. Complete all hands-on exercises, review commands, and pass the knowledge check.', 18)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d7a00000-0000-4000-8000-000000000119', v_course_id, 'Module 19: Advanced Bash, awk, sed, regex and robust scripts', 'Advanced level (Bash and observability). 1 week (9–12 hours). Prerequisite: Module 18. Complete all hands-on exercises, review commands, and pass the knowledge check.', 19)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d7a00000-0000-4000-8000-000000000120', v_course_id, 'Module 20: Linux logging: journald, syslog and logrotate', 'Advanced level (Bash and observability). 1 week (9–12 hours). Prerequisite: Module 19. Complete all hands-on exercises, review commands, and pass the knowledge check.', 20)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d7a00000-0000-4000-8000-000000000121', v_course_id, 'Module 21: Linux performance, capacity and troubleshooting', 'Advanced level (Advanced Linux operations). 1 week (9–12 hours). Prerequisite: Module 20. Complete all hands-on exercises, review commands, and pass the knowledge check.', 21)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d7a00000-0000-4000-8000-000000000122', v_course_id, 'Module 22: Linux storage encryption with LUKS (advanced lab)', 'Advanced level (Advanced Linux operations). 1 week (9–12 hours). Prerequisite: Module 21. Complete all hands-on exercises, review commands, and pass the knowledge check.', 22)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d7a00000-0000-4000-8000-000000000123', v_course_id, 'Module 23: Linux server hardening, auditing and access review', 'Advanced level (Advanced Linux operations). 1 week (9–12 hours). Prerequisite: Module 22. Complete all hands-on exercises, review commands, and pass the knowledge check.', 23)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d7a00000-0000-4000-8000-000000000124', v_course_id, 'Module 24: Final Linux administration and security capstone', 'Advanced level (Capstone). 1 week (9–12 hours). Prerequisite: Module 23. Complete all hands-on exercises, review commands, and pass the knowledge check.', 24)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  -- 3. Insert/Update 55 Lessons
  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000010001',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000101',
    'm01-l1-what-is-a-linux-distribution',
    'Module 01 - Lesson 1: What is a Linux distribution?',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 01: Linux basics, distributions and a safe lab. Practice the commands in your Ubuntu lab environment.',
    '6EKzuBAEbOA',
    30,
    1,
    ARRAY['Explain kernel, distribution, shell and terminal', 'Install an Ubuntu VM without replacing the host OS', 'Navigate a Linux desktop and locate the terminal', 'Collect baseline system information'],
    ARRAY['linux', 'module-01', 'foundations'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000010002',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000101',
    'm01-l2-linux-for-hackers-ep1',
    'Module 01 - Lesson 2: Linux for Hackers EP1',
    'Video lesson presented by NetworkChuck. Covers core concepts of Module 01: Linux basics, distributions and a safe lab. Practice the commands in your Ubuntu lab environment.',
    'VbEx7B_PTOE',
    30,
    2,
    ARRAY['Explain kernel, distribution, shell and terminal', 'Install an Ubuntu VM without replacing the host OS', 'Navigate a Linux desktop and locate the terminal', 'Collect baseline system information'],
    ARRAY['linux', 'module-01', 'foundations'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000020001',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000102',
    'm02-l1-navigating-the-linux-filesystem',
    'Module 02 - Lesson 1: Navigating the Linux Filesystem',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 02: Terminal navigation and Linux filesystem hierarchy. Practice the commands in your Ubuntu lab environment.',
    'BNL3qBN9pP0',
    30,
    1,
    ARRAY['Move through Linux entirely from terminal', 'Distinguish absolute and relative paths', 'Describe major filesystem directories', 'Use built-in command help'],
    ARRAY['linux', 'module-02', 'foundations'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000020002',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000102',
    'm02-l2-how-to-use-ls',
    'Module 02 - Lesson 2: How to use ls',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 02: Terminal navigation and Linux filesystem hierarchy. Practice the commands in your Ubuntu lab environment.',
    '43hcVCt_GMc',
    30,
    2,
    ARRAY['Move through Linux entirely from terminal', 'Distinguish absolute and relative paths', 'Describe major filesystem directories', 'Use built-in command help'],
    ARRAY['linux', 'module-02', 'foundations'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000020003',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000102',
    'm02-l3-full-command-line-course-navigation',
    'Module 02 - Lesson 3: Full command-line course: navigation',
    'Video lesson presented by MichaelsTechTutorials. Covers core concepts of Module 02: Terminal navigation and Linux filesystem hierarchy. Practice the commands in your Ubuntu lab environment.',
    'avg65oY7sj4',
    30,
    3,
    ARRAY['Move through Linux entirely from terminal', 'Distinguish absolute and relative paths', 'Describe major filesystem directories', 'Use built-in command help'],
    ARRAY['linux', 'module-02', 'foundations'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000030001',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000103',
    'm03-l1-the-find-command',
    'Module 03 - Lesson 1: The find command',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 03: Files, directories, links and search. Practice the commands in your Ubuntu lab environment.',
    'skTiK_6DdqU',
    30,
    1,
    ARRAY['Create, organize and rename files safely', 'Search by path and metadata', 'Understand symbolic links and file types', 'Avoid risky recursive deletion'],
    ARRAY['linux', 'module-03', 'foundations'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000030002',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000103',
    'm03-l2-full-command-line-course-files-and-directories',
    'Module 03 - Lesson 2: Full command-line course: files and directories',
    'Video lesson presented by MichaelsTechTutorials. Covers core concepts of Module 03: Files, directories, links and search. Practice the commands in your Ubuntu lab environment.',
    'avg65oY7sj4',
    30,
    2,
    ARRAY['Create, organize and rename files safely', 'Search by path and metadata', 'Understand symbolic links and file types', 'Avoid risky recursive deletion'],
    ARRAY['linux', 'module-03', 'foundations'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000040001',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000104',
    'm04-l1-the-cat-command',
    'Module 04 - Lesson 1: The cat command',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 04: File viewers, Nano, Vim and command documentation. Practice the commands in your Ubuntu lab environment.',
    'z3nJlyrJYW4',
    30,
    1,
    ARRAY['Read small and large text files', 'Make edits confidently in Nano', 'Navigate and save changes in Vim', 'Use man pages to learn new options'],
    ARRAY['linux', 'module-04', 'foundations'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000040002',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000104',
    'm04-l2-learn-the-man-command',
    'Module 04 - Lesson 2: Learn the man command',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 04: File viewers, Nano, Vim and command documentation. Practice the commands in your Ubuntu lab environment.',
    '7BG-Devm7sA',
    30,
    2,
    ARRAY['Read small and large text files', 'Make edits confidently in Nano', 'Navigate and save changes in Vim', 'Use man pages to learn new options'],
    ARRAY['linux', 'module-04', 'foundations'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000040003',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000104',
    'm04-l3-full-command-line-course-nano-and-vi',
    'Module 04 - Lesson 3: Full command-line course: Nano and vi',
    'Video lesson presented by MichaelsTechTutorials. Covers core concepts of Module 04: File viewers, Nano, Vim and command documentation. Practice the commands in your Ubuntu lab environment.',
    'avg65oY7sj4',
    30,
    3,
    ARRAY['Read small and large text files', 'Make edits confidently in Nano', 'Navigate and save changes in Vim', 'Use man pages to learn new options'],
    ARRAY['linux', 'module-04', 'foundations'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000050001',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000105',
    'm05-l1-linux-data-streams',
    'Module 05 - Lesson 1: Linux Data Streams',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 05: Pipes, redirection and Linux text filters. Practice the commands in your Ubuntu lab environment.',
    'zMKacHGuIHI',
    30,
    1,
    ARRAY['Use stdin, stdout and stderr intentionally', 'Chain commands with pipes', 'Search logs and text efficiently', 'Count, sort and deduplicate records'],
    ARRAY['linux', 'module-05', 'foundations'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000050002',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000105',
    'm05-l2-grep-command',
    'Module 05 - Lesson 2: grep command',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 05: Pipes, redirection and Linux text filters. Practice the commands in your Ubuntu lab environment.',
    'Tc_jntovCM0',
    30,
    2,
    ARRAY['Use stdin, stdout and stderr intentionally', 'Chain commands with pipes', 'Search logs and text efficiently', 'Count, sort and deduplicate records'],
    ARRAY['linux', 'module-05', 'foundations'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000050003',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000105',
    'm05-l3-full-command-line-course-redirection',
    'Module 05 - Lesson 3: Full command-line course: redirection',
    'Video lesson presented by MichaelsTechTutorials. Covers core concepts of Module 05: Pipes, redirection and Linux text filters. Practice the commands in your Ubuntu lab environment.',
    'avg65oY7sj4',
    30,
    3,
    ARRAY['Use stdin, stdout and stderr intentionally', 'Chain commands with pipes', 'Search logs and text efficiently', 'Count, sort and deduplicate records'],
    ARRAY['linux', 'module-05', 'foundations'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000060001',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000106',
    'm06-l1-managing-users',
    'Module 06 - Lesson 1: Managing users',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 06: Accounts, groups, sudo and login sessions. Practice the commands in your Ubuntu lab environment.',
    '19WOD84JFxA',
    30,
    1,
    ARRAY['Explain root privileges and least privilege', 'Inspect UID/GID and Linux account records', 'Create and remove disposable test accounts', 'Understand groups and sudo configuration'],
    ARRAY['linux', 'module-06', 'system-administration'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000060002',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000106',
    'm06-l2-managing-groups',
    'Module 06 - Lesson 2: Managing groups',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 06: Accounts, groups, sudo and login sessions. Practice the commands in your Ubuntu lab environment.',
    'GnlgAD8-GhE',
    30,
    2,
    ARRAY['Explain root privileges and least privilege', 'Inspect UID/GID and Linux account records', 'Create and remove disposable test accounts', 'Understand groups and sudo configuration'],
    ARRAY['linux', 'module-06', 'system-administration'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000060003',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000106',
    'm06-l3-full-command-line-course-root-and-user-accounts',
    'Module 06 - Lesson 3: Full command-line course: root and user accounts',
    'Video lesson presented by MichaelsTechTutorials. Covers core concepts of Module 06: Accounts, groups, sudo and login sessions. Practice the commands in your Ubuntu lab environment.',
    'avg65oY7sj4',
    30,
    3,
    ARRAY['Explain root privileges and least privilege', 'Inspect UID/GID and Linux account records', 'Create and remove disposable test accounts', 'Understand groups and sudo configuration'],
    ARRAY['linux', 'module-06', 'system-administration'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000070001',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000107',
    'm07-l1-understanding-file-and-directory-permissions',
    'Module 07 - Lesson 1: Understanding file and directory permissions',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 07: Linux file permissions, ownership, ACLs and umask. Practice the commands in your Ubuntu lab environment.',
    '4e669hSjaX8',
    30,
    1,
    ARRAY['Interpret rwx and octal permissions', 'Configure private/shared directories', 'Understand default umask', 'Inspect ACLs, SUID, SGID and sticky bit'],
    ARRAY['linux', 'module-07', 'system-administration'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000070002',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000107',
    'm07-l2-full-command-line-course-acls',
    'Module 07 - Lesson 2: Full command-line course: ACLs',
    'Video lesson presented by MichaelsTechTutorials. Covers core concepts of Module 07: Linux file permissions, ownership, ACLs and umask. Practice the commands in your Ubuntu lab environment.',
    'avg65oY7sj4',
    30,
    2,
    ARRAY['Interpret rwx and octal permissions', 'Configure private/shared directories', 'Understand default umask', 'Inspect ACLs, SUID, SGID and sticky bit'],
    ARRAY['linux', 'module-07', 'system-administration'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000080001',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000108',
    'm08-l1-the-apt-command',
    'Module 08 - Lesson 1: The apt command',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 08: Software packages, repositories and updates. Practice the commands in your Ubuntu lab environment.',
    '1kicKTbK768',
    30,
    1,
    ARRAY['Understand Linux package managers', 'Install and remove software responsibly', 'Identify software versions and repositories', 'Explain package update versus upgrade'],
    ARRAY['linux', 'module-08', 'system-administration'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000090001',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000109',
    'm09-l1-demystifying-top',
    'Module 09 - Lesson 1: Demystifying top',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 09: Processes, process priorities and job control. Practice the commands in your Ubuntu lab environment.',
    'WsR11EGF9PA',
    30,
    1,
    ARRAY['Identify CPU/memory-intensive processes', 'Manage foreground/background jobs', 'Send appropriate Unix signals', 'Understand priority and resource controls'],
    ARRAY['linux', 'module-09', 'system-administration'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000090002',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000109',
    'm09-l2-full-command-line-course-processes',
    'Module 09 - Lesson 2: Full command-line course: processes',
    'Video lesson presented by MichaelsTechTutorials. Covers core concepts of Module 09: Processes, process priorities and job control. Practice the commands in your Ubuntu lab environment.',
    'avg65oY7sj4',
    30,
    2,
    ARRAY['Identify CPU/memory-intensive processes', 'Manage foreground/background jobs', 'Send appropriate Unix signals', 'Understand priority and resource controls'],
    ARRAY['linux', 'module-09', 'system-administration'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000100001',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000110',
    'm10-l1-systemctl-and-systemd',
    'Module 10 - Lesson 1: systemctl and systemd',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 10: systemd, services and Linux boot lifecycle. Practice the commands in your Ubuntu lab environment.',
    '5JVBpXiYMKo',
    30,
    1,
    ARRAY['Explain Linux boot stages at a high level', 'Inspect unit files and dependencies', 'Start and stop an isolated training service', 'Use journalctl to diagnose service failures'],
    ARRAY['linux', 'module-10', 'system-administration'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000100002',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000110',
    'm10-l2-journalctl-basics',
    'Module 10 - Lesson 2: journalctl basics',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 10: systemd, services and Linux boot lifecycle. Practice the commands in your Ubuntu lab environment.',
    '0dG3vUYt7Uk',
    30,
    2,
    ARRAY['Explain Linux boot stages at a high level', 'Inspect unit files and dependencies', 'Start and stop an isolated training service', 'Use journalctl to diagnose service failures'],
    ARRAY['linux', 'module-10', 'system-administration'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000110001',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000111',
    'm11-l1-formatting-and-mounting-disks',
    'Module 11 - Lesson 1: Formatting and mounting disks',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 11: Disks, filesystems, partitions and mounting. Practice the commands in your Ubuntu lab environment.',
    '2Z6ouBYfZr8',
    30,
    1,
    ARRAY['Inspect block devices without changing them', 'Interpret df, du, UUID and fstab', 'Understand ext4 and XFS basics', 'Mount a dedicated disposable lab disk safely'],
    ARRAY['linux', 'module-11', 'storage-and-automation'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000110002',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000111',
    'm11-l2-full-command-line-course-partitions-and-fdisk',
    'Module 11 - Lesson 2: Full command-line course: partitions and fdisk',
    'Video lesson presented by MichaelsTechTutorials. Covers core concepts of Module 11: Disks, filesystems, partitions and mounting. Practice the commands in your Ubuntu lab environment.',
    'avg65oY7sj4',
    30,
    2,
    ARRAY['Inspect block devices without changing them', 'Interpret df, du, UUID and fstab', 'Understand ext4 and XFS basics', 'Mount a dedicated disposable lab disk safely'],
    ARRAY['linux', 'module-11', 'storage-and-automation'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000120001',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000112',
    'm12-l1-linux-logical-volume-manager-deep-dive',
    'Module 12 - Lesson 1: Linux Logical Volume Manager Deep Dive',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 12: LVM, snapshots and modern Linux filesystems. Practice the commands in your Ubuntu lab environment.',
    'MeltFN-bXrQ',
    30,
    1,
    ARRAY['Explain PV, VG and LV', 'Understand storage resizing and snapshots', 'Compare ext4, XFS, ZFS and Btrfs concepts', 'Practice LVM operations only with disposable storage'],
    ARRAY['linux', 'module-12', 'storage-and-automation'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000120002',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000112',
    'm12-l2-long-command-line-course-lvm',
    'Module 12 - Lesson 2: Long command-line course: LVM',
    'Video lesson presented by MichaelsTechTutorials. Covers core concepts of Module 12: LVM, snapshots and modern Linux filesystems. Practice the commands in your Ubuntu lab environment.',
    'avg65oY7sj4',
    30,
    2,
    ARRAY['Explain PV, VG and LV', 'Understand storage resizing and snapshots', 'Compare ext4, XFS, ZFS and Btrfs concepts', 'Practice LVM operations only with disposable storage'],
    ARRAY['linux', 'module-12', 'storage-and-automation'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000130001',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000113',
    'm13-l1-tar-and-gzip-tutorial',
    'Module 13 - Lesson 1: tar and gzip tutorial',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 13: Archiving, compression, backups and rsync. Practice the commands in your Ubuntu lab environment.',
    '2iwumBcfd58',
    30,
    1,
    ARRAY['Create and inspect tar archives', 'Use compression appropriately', 'Make repeatable local backups', 'Verify restore integrity and document recovery'],
    ARRAY['linux', 'module-13', 'storage-and-automation'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000130002',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000113',
    'm13-l2-rsync-tutorial',
    'Module 13 - Lesson 2: rsync tutorial',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 13: Archiving, compression, backups and rsync. Practice the commands in your Ubuntu lab environment.',
    'KG78O53u8rY',
    30,
    2,
    ARRAY['Create and inspect tar archives', 'Use compression appropriately', 'Make repeatable local backups', 'Verify restore integrity and document recovery'],
    ARRAY['linux', 'module-13', 'storage-and-automation'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000140001',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000114',
    'm14-l1-scheduling-tasks-with-cron',
    'Module 14 - Lesson 1: Scheduling tasks with cron',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 14: cron jobs, systemd timers and Linux scheduling. Practice the commands in your Ubuntu lab environment.',
    '7cbP7fzn0D8',
    30,
    1,
    ARRAY['Understand cron expressions', 'Schedule safe user-level maintenance', 'Recognize systemd timer units', 'Verify scheduled job output'],
    ARRAY['linux', 'module-14', 'storage-and-automation'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000140002',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000114',
    'm14-l2-long-course-systemd-timer',
    'Module 14 - Lesson 2: Long course: systemd timer',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 14: cron jobs, systemd timers and Linux scheduling. Practice the commands in your Ubuntu lab environment.',
    'avg65oY7sj4',
    30,
    2,
    ARRAY['Understand cron expressions', 'Schedule safe user-level maintenance', 'Recognize systemd timer units', 'Verify scheduled job output'],
    ARRAY['linux', 'module-14', 'storage-and-automation'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000150001',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000115',
    'm15-l1-ip-command',
    'Module 15 - Lesson 1: ip command',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 15: IP addressing, routes, DNS and Linux network commands. Practice the commands in your Ubuntu lab environment.',
    'wHfIFZlDxtU',
    30,
    1,
    ARRAY['Explain interface and address information', 'Read routing and DNS information', 'Inspect listening ports and established sockets', 'Troubleshoot a simple DNS or connectivity issue'],
    ARRAY['linux', 'module-15', 'networking-and-automation'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000150002',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000115',
    'm15-l2-ss-command',
    'Module 15 - Lesson 2: ss command',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 15: IP addressing, routes, DNS and Linux network commands. Practice the commands in your Ubuntu lab environment.',
    'phY8Q7Woxsw',
    30,
    2,
    ARRAY['Explain interface and address information', 'Read routing and DNS information', 'Inspect listening ports and established sockets', 'Troubleshoot a simple DNS or connectivity issue'],
    ARRAY['linux', 'module-15', 'networking-and-automation'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000160001',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000116',
    'm16-l1-public-key-authentication',
    'Module 16 - Lesson 1: Public key authentication',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 16: OpenSSH administration, keys and secure file transfer. Practice the commands in your Ubuntu lab environment.',
    'bfwfRCCFTVI',
    30,
    1,
    ARRAY['Use SSH for remote Linux shell access', 'Distinguish password and public-key authentication', 'Transfer files securely with scp and sftp', 'Inspect SSH service configuration and logs'],
    ARRAY['linux', 'module-16', 'networking-and-automation'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000160002',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000116',
    'm16-l2-scp-command',
    'Module 16 - Lesson 2: scp command',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 16: OpenSSH administration, keys and secure file transfer. Practice the commands in your Ubuntu lab environment.',
    'Aa7tKMmeFZI',
    30,
    2,
    ARRAY['Use SSH for remote Linux shell access', 'Distinguish password and public-key authentication', 'Transfer files securely with scp and sftp', 'Inspect SSH service configuration and logs'],
    ARRAY['linux', 'module-16', 'networking-and-automation'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000170001',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000117',
    'm17-l1-ufw-made-easy',
    'Module 17 - Lesson 1: UFW Made Easy',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 17: Linux host firewalls with UFW. Practice the commands in your Ubuntu lab environment.',
    'F-ubkT1WNFk',
    30,
    1,
    ARRAY['Explain inbound versus outbound policy', 'Inspect UFW configuration', 'Test least-privilege access to a lab service', 'Understand how to avoid SSH lockouts'],
    ARRAY['linux', 'module-17', 'networking-and-automation'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000170002',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000117',
    'm17-l2-ss-command',
    'Module 17 - Lesson 2: ss command',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 17: Linux host firewalls with UFW. Practice the commands in your Ubuntu lab environment.',
    'phY8Q7Woxsw',
    30,
    2,
    ARRAY['Explain inbound versus outbound policy', 'Inspect UFW configuration', 'Test least-privilege access to a lab service', 'Understand how to avoid SSH lockouts'],
    ARRAY['linux', 'module-17', 'networking-and-automation'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000180001',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000118',
    'm18-l1-bash-scripting-on-linux-part-1',
    'Module 18 - Lesson 1: Bash scripting on Linux, Part 1',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 18: Bash scripting from zero: variables, ifs and loops. Practice the commands in your Ubuntu lab environment.',
    '2733cRPudvI',
    30,
    1,
    ARRAY['Write executable shell scripts', 'Pass and validate arguments', 'Use conditional logic and loops', 'Understand quoting and shell exit codes'],
    ARRAY['linux', 'module-18', 'bash-and-observability'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000180002',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000118',
    'm18-l2-bash-scripting-for-beginners',
    'Module 18 - Lesson 2: Bash scripting for beginners',
    'Video lesson presented by freeCodeCamp. Covers core concepts of Module 18: Bash scripting from zero: variables, ifs and loops. Practice the commands in your Ubuntu lab environment.',
    'tK9Oc6AEnR4',
    30,
    2,
    ARRAY['Write executable shell scripts', 'Pass and validate arguments', 'Use conditional logic and loops', 'Understand quoting and shell exit codes'],
    ARRAY['linux', 'module-18', 'bash-and-observability'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000190001',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000119',
    'm19-l1-awk',
    'Module 19 - Lesson 1: awk',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 19: Advanced Bash, awk, sed, regex and robust scripts. Practice the commands in your Ubuntu lab environment.',
    'oPEnvuj9QrI',
    30,
    1,
    ARRAY['Parse structured text with awk and sed', 'Handle errors predictably', 'Use functions and temporary files safely', 'Lint and test scripts'],
    ARRAY['linux', 'module-19', 'bash-and-observability'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000190002',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000119',
    'm19-l2-sed',
    'Module 19 - Lesson 2: sed',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 19: Advanced Bash, awk, sed, regex and robust scripts. Practice the commands in your Ubuntu lab environment.',
    'nXLnx8ncZyE',
    30,
    2,
    ARRAY['Parse structured text with awk and sed', 'Handle errors predictably', 'Use functions and temporary files safely', 'Lint and test scripts'],
    ARRAY['linux', 'module-19', 'bash-and-observability'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000190003',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000119',
    'm19-l3-full-course-sed-to-awk-section',
    'Module 19 - Lesson 3: Full course: sed to awk section',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 19: Advanced Bash, awk, sed, regex and robust scripts. Practice the commands in your Ubuntu lab environment.',
    'avg65oY7sj4',
    30,
    3,
    ARRAY['Parse structured text with awk and sed', 'Handle errors predictably', 'Use functions and temporary files safely', 'Lint and test scripts'],
    ARRAY['linux', 'module-19', 'bash-and-observability'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000200001',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000120',
    'm20-l1-understanding-linux-logging',
    'Module 20 - Lesson 1: Understanding Linux Logging',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 20: Linux logging: journald, syslog and logrotate. Practice the commands in your Ubuntu lab environment.',
    '6uP_f_z3CbM',
    30,
    1,
    ARRAY['Find system and service logs', 'Filter by unit, time and priority', 'Understand journald versus text log files', 'Produce a repeatable log review report'],
    ARRAY['linux', 'module-20', 'bash-and-observability'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000200002',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000120',
    'm20-l2-journalctl-basics',
    'Module 20 - Lesson 2: journalctl Basics',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 20: Linux logging: journald, syslog and logrotate. Practice the commands in your Ubuntu lab environment.',
    '0dG3vUYt7Uk',
    30,
    2,
    ARRAY['Find system and service logs', 'Filter by unit, time and priority', 'Understand journald versus text log files', 'Produce a repeatable log review report'],
    ARRAY['linux', 'module-20', 'bash-and-observability'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000210001',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000121',
    'm21-l1-how-to-interpret-linux-load-average',
    'Module 21 - Lesson 1: How to interpret Linux load average',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 21: Linux performance, capacity and troubleshooting. Practice the commands in your Ubuntu lab environment.',
    '4bJmzHh4pg0',
    30,
    1,
    ARRAY['Diagnose CPU, memory, IO and disk problems', 'Read load average and swap usage', 'Use observation before changing settings', 'Write a systematic troubleshooting report'],
    ARRAY['linux', 'module-21', 'advanced-linux-operations'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000210002',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000121',
    'm21-l2-understanding-memory-and-swap',
    'Module 21 - Lesson 2: Understanding memory and swap',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 21: Linux performance, capacity and troubleshooting. Practice the commands in your Ubuntu lab environment.',
    'XTMyJ5l0GLg',
    30,
    2,
    ARRAY['Diagnose CPU, memory, IO and disk problems', 'Read load average and swap usage', 'Use observation before changing settings', 'Write a systematic troubleshooting report'],
    ARRAY['linux', 'module-21', 'advanced-linux-operations'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000210003',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000121',
    'm21-l3-sar-command',
    'Module 21 - Lesson 3: sar command',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 21: Linux performance, capacity and troubleshooting. Practice the commands in your Ubuntu lab environment.',
    '_4WVPSfGqos',
    30,
    3,
    ARRAY['Diagnose CPU, memory, IO and disk problems', 'Read load average and swap usage', 'Use observation before changing settings', 'Write a systematic troubleshooting report'],
    ARRAY['linux', 'module-21', 'advanced-linux-operations'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000220001',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000122',
    'm22-l1-linux-command-line-complete-course-luks-chapter',
    'Module 22 - Lesson 1: Linux Command Line complete course: LUKS chapter',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 22: Linux storage encryption with LUKS (advanced lab). Practice the commands in your Ubuntu lab environment.',
    'avg65oY7sj4',
    30,
    1,
    ARRAY['Explain at-rest disk encryption', 'Understand dm-crypt and LUKS concepts', 'Inspect an encrypted test volume safely', 'Document unlock, mount and recovery principles'],
    ARRAY['linux', 'module-22', 'advanced-linux-operations'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000220002',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000122',
    'm22-l2-same-video-cryptsetup-cli-luks-lesson',
    'Module 22 - Lesson 2: Same video: cryptsetup CLI LUKS lesson',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 22: Linux storage encryption with LUKS (advanced lab). Practice the commands in your Ubuntu lab environment.',
    'avg65oY7sj4',
    30,
    2,
    ARRAY['Explain at-rest disk encryption', 'Understand dm-crypt and LUKS concepts', 'Inspect an encrypted test volume safely', 'Document unlock, mount and recovery principles'],
    ARRAY['linux', 'module-22', 'advanced-linux-operations'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000230001',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000123',
    'm23-l1-ufw-security-guide',
    'Module 23 - Lesson 1: UFW security guide',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 23: Linux server hardening, auditing and access review. Practice the commands in your Ubuntu lab environment.',
    'F-ubkT1WNFk',
    30,
    1,
    ARRAY['Create a practical Linux hardening checklist', 'Audit users, services, permissions and firewall exposure', 'Check patch posture and SSH settings', 'Document an evidence-based remediation plan'],
    ARRAY['linux', 'module-23', 'advanced-linux-operations'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000230002',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000123',
    'm23-l2-public-key-authentication',
    'Module 23 - Lesson 2: Public key authentication',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 23: Linux server hardening, auditing and access review. Practice the commands in your Ubuntu lab environment.',
    'bfwfRCCFTVI',
    30,
    2,
    ARRAY['Create a practical Linux hardening checklist', 'Audit users, services, permissions and firewall exposure', 'Check patch posture and SSH settings', 'Document an evidence-based remediation plan'],
    ARRAY['linux', 'module-23', 'advanced-linux-operations'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000230003',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000123',
    'm23-l3-linux-logging',
    'Module 23 - Lesson 3: Linux logging',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 23: Linux server hardening, auditing and access review. Practice the commands in your Ubuntu lab environment.',
    '6uP_f_z3CbM',
    30,
    3,
    ARRAY['Create a practical Linux hardening checklist', 'Audit users, services, permissions and firewall exposure', 'Check patch posture and SSH settings', 'Document an evidence-based remediation plan'],
    ARRAY['linux', 'module-23', 'advanced-linux-operations'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000240001',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000124',
    'm24-l1-linux-troubleshooting',
    'Module 24 - Lesson 1: Linux troubleshooting',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 24: Final Linux administration and security capstone. Practice the commands in your Ubuntu lab environment.',
    'GPF5lrY9YJY',
    30,
    1,
    ARRAY['Build and maintain a documented Linux server VM', 'Demonstrate all core commands without watching the screen', 'Write reusable admin scripts and troubleshooting reports', 'Present secure and reversible configuration choices'],
    ARRAY['linux', 'module-24', 'capstone'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000240002',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000124',
    'm24-l2-linux-systemd-services',
    'Module 24 - Lesson 2: Linux systemd services',
    'Video lesson presented by Learn Linux TV. Covers core concepts of Module 24: Final Linux administration and security capstone. Practice the commands in your Ubuntu lab environment.',
    '5JVBpXiYMKo',
    30,
    2,
    ARRAY['Build and maintain a documented Linux server VM', 'Demonstrate all core commands without watching the screen', 'Write reusable admin scripts and troubleshooting reports', 'Present secure and reversible configuration choices'],
    ARRAY['linux', 'module-24', 'capstone'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd7a00000-0000-4000-8000-000000240003',
    v_course_id,
    'd7a00000-0000-4000-8000-000000000124',
    'm24-l3-linux-command-line-entire-tutorial-series',
    'Module 24 - Lesson 3: Linux Command Line Entire Tutorial Series',
    'Video lesson presented by MichaelsTechTutorials. Covers core concepts of Module 24: Final Linux administration and security capstone. Practice the commands in your Ubuntu lab environment.',
    'avg65oY7sj4',
    30,
    3,
    ARRAY['Build and maintain a documented Linux server VM', 'Demonstrate all core commands without watching the screen', 'Write reusable admin scripts and troubleshooting reports', 'Present secure and reversible configuration choices'],
    ARRAY['linux', 'module-24', 'capstone'],
    ARRAY['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

END $$;