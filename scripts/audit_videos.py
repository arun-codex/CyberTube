import json
import re
import urllib.request
import urllib.error
import time

def main():
    with open('src/data/linux-zero-to-advanced-course.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    # Find modules and lessons
    # Pattern to match each module and its lessons
    modules = []
    # Let's extract modules by splitting on id: 'lin-mod-
    mod_chunks = content.split("id: 'lin-mod-")
    print(f"Module chunks found: {len(mod_chunks) - 1}")

    lessons_info = []
    for chunk in mod_chunks[1:]:
        mod_num_match = re.search(r'^(\d+)', chunk)
        mod_num = int(mod_num_match.group(1)) if mod_num_match else 0
        mod_title_match = re.search(r"title:\s*['\"](.*?)['\"]", chunk)
        mod_title = mod_title_match.group(1) if mod_title_match else f"Module {mod_num}"

        # Extract lessons in this chunk
        les_chunks = chunk.split("id: 'lin-mod")
        for lc in les_chunks[1:]:
            les_id_match = re.search(r"^(\d+-les\d+)", lc)
            les_id = f"lin-mod{les_id_match.group(1)}" if les_id_match else "unknown"
            
            les_title_match = re.search(r"title:\s*['\"](.*?)['\"]", lc)
            les_title = les_title_match.group(1) if les_title_match else ""
            
            les_yt_match = re.search(r"youtubeVideoId:\s*['\"](.*?)['\"]", lc)
            yt_id = les_yt_match.group(1) if les_yt_match else ""
            
            les_dur_match = re.search(r"durationMinutes:\s*(\d+)", lc)
            dur = int(les_dur_match.group(1)) if les_dur_match else 0

            creator_match = re.search(r"creator:\s*['\"](.*?)['\"]", lc)
            creator = creator_match.group(1) if creator_match else ""

            lessons_info.append({
                "module_num": mod_num,
                "module_title": mod_title,
                "lesson_id": les_id,
                "lesson_title": les_title,
                "youtube_id": yt_id,
                "duration": dur,
                "creator": creator
            })

    print(f"Total extracted lessons: {len(lessons_info)}")
    with open('scripts/extracted_lessons.json', 'w', encoding='utf-8') as f:
        json.dump(lessons_info, f, indent=2)

if __name__ == '__main__':
    main()
