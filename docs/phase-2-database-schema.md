# CyberTube Phase 2: Database Schema Specification

---

## 1. Entity-Relationship Overview

The CyberTube PostgreSQL database is normalized to support rich cybersecurity metadata, multi-domain associations, personalized collections, and community submissions.

```
       +------------------+
       |   auth.users     |
       +--------+---------+
                | 1:1
                v
       +------------------+
       |    profiles      |
       +------------------+
                ^
                | 1:N
       +--------+---------+       +-------------------------+
       |   collections    | <---> |  collection_resources   |
       +------------------+  N:M  +------------+------------+
                ^                              |
                | 1:N                          | N:1
       +--------+---------+                    v
       |    bookmarks     | ---------> +---------------+
       +------------------+     N:1    |   resources   |
                                       +-------+-------+
                                               | N:M
                         +---------------------+---------------------+
                         |                                           |
                         v                                           v
              +----------------------+                    +--------------------+
              |   resource_domains   |                    |   resource_tags    |
              +----------+-----------+                    +---------+----------+
                         |                                          |
                         v                                          v
              +----------------------+                    +--------------------+
              |       domains        |                    |        tags        |
              +----------------------+                    +--------------------+
```

---

## 2. Table Specifications

### A. `profiles`
- `id`: `UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE`
- `username`: `TEXT UNIQUE`
- `display_name`: `TEXT`
- `avatar_url`: `TEXT`
- `bio`: `TEXT`
- `experience_level`: `TEXT CHECK (experience_level IN ('beginner', 'intermediate', 'advanced', 'professional'))`
- `preferred_language`: `TEXT DEFAULT 'English'`
- `country_code`: `TEXT`
- `primary_learning_goal`: `TEXT`
- `interests`: `TEXT[] DEFAULT '{}'`
- `created_at`: `TIMESTAMPTZ DEFAULT NOW()`
- `updated_at`: `TIMESTAMPTZ DEFAULT NOW()`

### B. `resources`
- `id`: `TEXT PRIMARY KEY`
- `slug`: `TEXT UNIQUE NOT NULL`
- `title`: `TEXT NOT NULL`
- `description`: `TEXT NOT NULL`
- `resource_type`: `TEXT NOT NULL` (11 types: video, course, article, documentation, github, lab, ctf, podcast, research, certification, exam-prep)
- `provider`: `TEXT NOT NULL`
- `creator`: `TEXT`
- `canonical_url`: `TEXT UNIQUE NOT NULL`
- `thumbnail_url`: `TEXT`
- `difficulty`: `TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced'))`
- `language`: `TEXT DEFAULT 'English' NOT NULL`
- `pricing_model`: `TEXT NOT NULL CHECK (pricing_model IN ('free', 'freemium', 'paid'))`
- `estimated_duration_minutes`: `INTEGER`
- `estimated_duration_label`: `TEXT`
- `prerequisites`: `TEXT[] DEFAULT '{}'`
- `skills`: `TEXT[] DEFAULT '{}'`
- `learning_outcomes`: `TEXT[] DEFAULT '{}'`
- `featured`: `BOOLEAN DEFAULT FALSE`
- `publication_status`: `TEXT DEFAULT 'published' CHECK (publication_status IN ('draft', 'published', 'archived'))`
- `last_verified_at`: `TIMESTAMPTZ DEFAULT NOW()`
- `created_at`: `TIMESTAMPTZ DEFAULT NOW()`
- `updated_at`: `TIMESTAMPTZ DEFAULT NOW()`
- `created_by`: `UUID REFERENCES auth.users(id) ON DELETE SET NULL`

### C. `domains` & `resource_domains`
- `domains`: `id` (text slug PK), `name`, `slug`, `description`, `icon`, `created_at`.
- `resource_domains`: `resource_id` (FK), `domain_id` (FK). Composite PK.

### D. `tags` & `resource_tags`
- `tags`: `id` (UUID PK), `name`, `slug`.
- `resource_tags`: `resource_id` (FK), `tag_id` (FK). Composite PK.

### E. `bookmarks`
- `id`: `UUID PRIMARY KEY DEFAULT gen_random_uuid()`
- `user_id`: `UUID REFERENCES auth.users(id) ON DELETE CASCADE`
- `resource_id`: `TEXT REFERENCES public.resources(id) ON DELETE CASCADE`
- `created_at`: `TIMESTAMPTZ DEFAULT NOW()`
- `UNIQUE (user_id, resource_id)`

### F. `collections` & `collection_resources`
- `collections`: `id` (UUID PK), `user_id` (FK), `name`, `description`, `created_at`, `updated_at`.
- `collection_resources`: `collection_id` (FK), `resource_id` (FK), `created_at`. Composite PK.

### G. `resource_submissions`
- `id`: `UUID PRIMARY KEY DEFAULT gen_random_uuid()`
- `submitted_by`: `UUID REFERENCES auth.users(id) ON DELETE SET NULL`
- `title`: `TEXT NOT NULL`
- `canonical_url`: `TEXT NOT NULL`
- `description`: `TEXT NOT NULL`
- `resource_type`: `TEXT NOT NULL`
- `suggested_domain`: `TEXT`
- `review_status`: `TEXT DEFAULT 'pending' CHECK (review_status IN ('pending', 'approved', 'rejected'))`
- `moderator_notes`: `TEXT`
- `created_at`: `TIMESTAMPTZ DEFAULT NOW()`
- `updated_at`: `TIMESTAMPTZ DEFAULT NOW()`
