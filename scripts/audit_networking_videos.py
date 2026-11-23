import urllib.request
import json
import ssl
import time
import re

ssl_ctx = ssl.create_default_context()

with open(r'C:\Users\dutch\.gemini\antigravity\scratch\CyberTube-discover-v3\src\data\networking-for-cybersecurity-course.ts', 'r', encoding='utf-8') as f:
    text = f.read()

vids = set(re.findall(r'youtubeVideoId["\']?\s*:\s*["\']([^"\']+)["\']', text))
print(f'Total unique video IDs: {len(vids)}')

results = {}
for vid in sorted(vids):
    url = f'https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={vid}&format=json'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=10, context=ssl_ctx) as resp:
            data = json.loads(resp.read().decode())
            results[vid] = {
                'status': 'verified_playable_embeddable',
                'title': data.get('title'),
                'author': data.get('author_name')
            }
    except urllib.error.HTTPError as e:
        results[vid] = {'status': f'http_error_{e.code}', 'error': str(e)}
    except Exception as e:
        results[vid] = {'status': 'network_error', 'error': str(e)}
    time.sleep(0.05)

playable = [v for v, r in results.items() if r['status'] == 'verified_playable_embeddable']
print(f'Verified playable and embeddable: {len(playable)} / {len(vids)}')

with open(r'C:\Users\dutch\.gemini\antigravity\scratch\CyberTube-discover-v3\scripts\networking_video_audit.json', 'w', encoding='utf-8') as out:
    json.dump(results, out, indent=2)

for v, r in results.items():
    if r['status'] != 'verified_playable_embeddable':
        print(f'UNRESOLVED: {v} -> {r}')
    else:
        print(f'OK: {v} -> "{r["title"]}" by {r["author"]}')
