import os

with open('supabase/migrations/20261125000000_phase2_networking_course_remediation.sql', 'r', encoding='utf-8') as f:
    sql = f.read()

# Split into 4 chunks of 30 lessons each
lines = sql.split('\n')

chunks = []
current_chunk = ["BEGIN;"]
course_updated = False

lesson_updates = []
for line in lines:
    if line.startswith("UPDATE public.courses"):
        current_chunk.append(line)
        course_updated = True
    elif line.startswith("UPDATE public.lessons"):
        lesson_updates.append(line)

print(f"Total lesson updates: {len(lesson_updates)}")

os.makedirs('supabase/migrations/phase2_chunks', exist_ok=True)

# Chunk 1: Course + Lessons 1..30
c1 = ["BEGIN;"]
for l in lines:
    if "UPDATE public.courses" in l:
        c1.append(l)
for l in lesson_updates[:30]:
    c1.append(l)
c1.append("COMMIT;")
with open('supabase/migrations/phase2_chunks/chunk_1.sql', 'w', encoding='utf-8') as f:
    f.write('\n'.join(c1))

# Chunk 2: Lessons 31..60
c2 = ["BEGIN;"]
for l in lesson_updates[30:60]:
    c2.append(l)
c2.append("COMMIT;")
with open('supabase/migrations/phase2_chunks/chunk_2.sql', 'w', encoding='utf-8') as f:
    f.write('\n'.join(c2))

# Chunk 3: Lessons 61..90
c3 = ["BEGIN;"]
for l in lesson_updates[60:90]:
    c3.append(l)
c3.append("COMMIT;")
with open('supabase/migrations/phase2_chunks/chunk_3.sql', 'w', encoding='utf-8') as f:
    f.write('\n'.join(c3))

# Chunk 4: Lessons 91..120
c4 = ["BEGIN;"]
for l in lesson_updates[90:]:
    c4.append(l)
c4.append("COMMIT;")
with open('supabase/migrations/phase2_chunks/chunk_4.sql', 'w', encoding='utf-8') as f:
    f.write('\n'.join(c4))

print("Created 4 chunks in supabase/migrations/phase2_chunks/")
