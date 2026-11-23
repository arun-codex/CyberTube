import urllib.request
import json
import re

url = 'https://www.youtube.com/playlist?list=PLQl7ZDyS2qk8'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

m = re.search(r'var ytInitialData\s*=\s*({.*?});</script>', html)
if not m:
    m = re.search(r'ytInitialData\s*=\s*({.*?});', html)

if m:
    data = json.loads(m.group(1))
    tabs = data['contents']['twoColumnBrowseResultsRenderer']['tabs']
    items = []
    for tab in tabs:
        content = tab.get('tabRenderer', {}).get('content', {})
        if 'sectionListRenderer' in content:
            sections = content['sectionListRenderer']['contents']
            for sec in sections:
                item_sec = sec.get('itemSectionRenderer', {})
                for it in item_sec.get('contents', []):
                    if 'lockupViewModel' in it:
                        items.append(it['lockupViewModel'])

    def find_all_text(obj):
        texts = []
        if isinstance(obj, dict):
            for k, v in obj.items():
                if k in ['content', 'text', 'simpleText', 'accessibilityLabel'] and isinstance(v, str):
                    texts.append(f"{k}: {v}")
                texts.extend(find_all_text(v))
        elif isinstance(obj, list):
            for i in obj:
                texts.extend(find_all_text(i))
        return texts

    first = items[0]
    print('First item texts:', find_all_text(first['contentImage']))
    
    # Let's extract all 34 items
    results = []
    for i, it in enumerate(items):
        vid_id = it.get('contentId')
        title = it.get('metadata', {}).get('lockupMetadataViewModel', {}).get('title', {}).get('content', '')
        # find duration text in contentImage
        duration = None
        for t in find_all_text(it.get('contentImage')):
            # look for mm:ss or hh:mm:ss
            m_dur = re.search(r'(\d+:\d+(?::\d+)?)', t)
            if m_dur:
                duration = m_dur.group(1)
                break
        results.append({
            'index': i + 1,
            'videoId': vid_id,
            'title': title,
            'duration': duration
        })

    for r in results:
        print(f"{r['index']:02d}. [{r['videoId']}] ({r['duration']}) {r['title']}")
