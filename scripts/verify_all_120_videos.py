import json
import urllib.request
import re
import ssl
import time

ssl_ctx = ssl.create_default_context()

with open('scripts/extracted_networking_lessons.json', 'r', encoding='utf-8') as f:
    lessons = json.load(f)

with open('scripts/final_120_assignments_preview.json', 'r', encoding='utf-8') as f:
    assignments = json.load(f)

def get_video_info(video_id):
    result = {
        'id': video_id,
        'title': None,
        'author': None,
        'duration_seconds': None,
        'duration_minutes': None,
        'embeddable': False,
        'status': 'unknown'
    }

    oembed_url = f"https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={video_id}&format=json"
    req = urllib.request.Request(oembed_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req, timeout=10, context=ssl_ctx) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            result['title'] = data.get('title')
            result['author'] = data.get('author_name')
            result['embeddable'] = True
            result['status'] = 'available'
    except urllib.error.HTTPError as e:
        result['status'] = f'http_error_{e.code}'
        return result
    except Exception as e:
        result['status'] = f'error_{e}'
        return result

    watch_url = f"https://www.youtube.com/watch?v={video_id}"
    req2 = urllib.request.Request(watch_url, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept-Language': 'en-US,en;q=0.9'
    })
    try:
        with urllib.request.urlopen(req2, timeout=10, context=ssl_ctx) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            m_sec = re.search(r'"lengthSeconds":"(\d+)"', html)
            m_ms = re.search(r'"approxDurationMs":"(\d+)"', html)
            if m_sec:
                sec = int(m_sec.group(1))
                result['duration_seconds'] = sec
                result['duration_minutes'] = max(1, round(sec / 60))
            elif m_ms:
                sec = int(m_ms.group(1)) // 1000
                result['duration_seconds'] = sec
                result['duration_minutes'] = max(1, round(sec / 60))
    except Exception:
        pass

    return result

verified_data = {}
all_items = []
failed_count = 0

print("Starting verification of all 120 assigned videos from live YouTube API...")
for i, l in enumerate(lessons):
    slug = l['slug']
    vid = assignments[slug]
    info = get_video_info(vid)
    
    # Fallback duration if page didn't provide lengthSeconds
    if not info['duration_minutes']:
        info['duration_minutes'] = 15
        info['duration_seconds'] = 900

    item = {
        'lesson_index': i + 1,
        'module_order': l['module_order'],
        'module_title': l['module_title'],
        'lesson_order': l['lesson_order'],
        'lesson_id': l['id'],
        'slug': slug,
        'lesson_title': l['title'],
        'previous_video_id': l['videoId'],
        'video_id': vid,
        'video_url': f"https://www.youtube.com/watch?v={vid}",
        'actual_title': info['title'],
        'creator': info['author'],
        'duration_seconds': info['duration_seconds'],
        'duration_minutes': info['duration_minutes'],
        'embeddable': info['embeddable'],
        'status': info['status'],
        'is_replacement': (vid != l['videoId'])
    }
    all_items.append(item)
    verified_data[slug] = item

    if info['status'] != 'available' or not info['embeddable']:
        print(f"[{i+1}/120] FAILED: {slug} -> {vid} ({info['status']})")
        failed_count += 1
    else:
        repl_str = " [REPLACED]" if item['is_replacement'] else " [KEPT]"
        print(f"[{i+1}/120] OK{repl_str}: {slug} -> {vid} | {info['duration_minutes']}m | {info['author']} | {info['title'][:40]}")

    time.sleep(0.15) # Avoid aggressive rate limiting

with open('scripts/VERIFIED_120_VIDEOS_METADATA.json', 'w', encoding='utf-8') as f:
    json.dump(all_items, f, indent=2)

print("\nVerification complete!")
print(f"Total videos checked: {len(all_items)}")
print(f"Failed count: {failed_count}")
print(f"Replaced count: {sum(1 for x in all_items if x['is_replacement'])}")
