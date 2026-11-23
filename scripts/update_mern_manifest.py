import json
import re

raw_videos = [
  {"id": "fFVZ9xbyBlc", "dur": "23:56", "title": "01 MERN Full Stack Course - React, Node & MongoDB with AI"},
  {"id": "aqtA2zHURbg", "dur": "26:19", "title": "02 Fullstack dev Live 69: Foundation Session"},
  {"id": "PNQiabb5ZjY", "dur": "1:59:22", "title": "03 Fullstack dev Live 69: L1: Introduction to Web Basics"},
  {"id": "VNRecG6jBVs", "dur": "2:00:14", "title": "04 Fullstack dev Live 69: L2: Version Control & CSS Concepts"},
  {"id": "oPTPvRTUZ28", "dur": "1:59:52", "title": "05 Fullstack dev Live 69: L3: CSS Layout Techniques"},
  {"id": "tS86VLQf8qk", "dur": "2:19:01", "title": "06 Fullstack dev Live 69: L4: Responsive Design with Bootstrap"},
  {"id": "3vUKoBACjiE", "dur": "2:07:59", "title": "07 Fullstack dev Live 69: L5: JavaScript Fundamentals"},
  {"id": "fh-AaUvBVA8", "dur": "1:18:30", "title": "08 Fullstack dev Live 69: L6: JavaScript Essentials"},
  {"id": "nMvPH1XYijE", "dur": "1:42:09", "title": "09 Fullstack dev Live 69: L7: JavaScript Core Programming"},
  {"id": "EdEU6vMjwQw", "dur": "1:54:09", "title": "10 Fullstack dev Live 69: L8: Advanced JavaScript Concepts"},
  {"id": "X87VneP5h74", "dur": "1:34:23", "title": "11 Fullstack dev Live 69: L9: Asynchronous JavaScript"},
  {"id": "bpwmQkzA2Aw", "dur": "1:47:29", "title": "12 Fullstack dev Live 69: L10: DOM Manipulation"},
  {"id": "z2EkWsIDqX0", "dur": "1:41:25", "title": "13 Fullstack dev Live 69: L11: Asynchronous JavaScript Deep Dive"},
  {"id": "yxlmLFFn5co", "dur": "2:02:21", "title": "14 Fullstack dev Live 69: L12: React Fundamentals"},
  {"id": "4xbKC__vx18", "dur": "2:06:41", "title": "15 Fullstack dev Live 69: L13: Async Operations in React"},
  {"id": "3RQwna3tA74", "dur": "31:53", "title": "16 Fullstack dev Live 69: L14: Advanced React & Optimization"},
  {"id": "5vjCTqIXD6E", "dur": "2:01:31", "title": "17 Fullstack dev Live 69: L17: State Management"},
  {"id": "vjeHkb4FV7c", "dur": "2:17:31", "title": "18 Full Stack Lecture 15: React Routing"},
  {"id": "mQEbNF0stb4", "dur": "2:06:03", "title": "19 Full Stack Lecture 16: React Performance & UX"},
  {"id": "bPEc9P1likA", "dur": "2:12:11", "title": "20 Full Stack Lecture 17: Advanced State Management"},
  {"id": "wdAGSMZQ2U8", "dur": "2:04:07", "title": "21 Full Stack Lecture 18: Node.js Fundamentals"},
  {"id": "L-RCs6IGeIY", "dur": "2:09:57", "title": "22 Full Stack Lecture 19: Express.js Basics"},
  {"id": "2ljrdOcopFg", "dur": "1:55:53", "title": "23 Full Stack Lecture 20: Express Middleware & Architecture"},
  {"id": "KmGDjuYx_Ng", "dur": "2:15:59", "title": "24 Full Stack Lecture 21: REST API Development"},
  {"id": "WhLe6hCXfGM", "dur": "2:23:57", "title": "25 Full Stack Lecture 22: MongoDB & Mongoose"},
  {"id": "-mrlKY2DreU", "dur": "2:11:59", "title": "26 Full Stack Lecture 23: Authentication & Security"},
  {"id": "xU-oIQMj2pY", "dur": "2:00:17", "title": "27 Full Stack Lecture 24: Capstone Project – Advanced Implementation"},
  {"id": "Xbgz2qpyD8I", "dur": "1:26:18", "title": "28 Full Stack Lecture 25: Extra Session & Architecture Review"},
  {"id": "cx7bEi8OTaw", "dur": "2:18:15", "title": "29 AI For Developers Lecture 1: The AI Toolkit & Developer Setup"},
  {"id": "HCI3HHycNwk", "dur": "2:14:23", "title": "30 AI For Developers Lecture 2: Prompt Engineering & Vibe Coding"},
  {"id": "WYb4X8zEYmA", "dur": "2:13:23", "title": "31 AI For Developers Lecture 3: Spec Driven Development with AI"},
  {"id": "xPByEpzqzl4", "dur": "2:12:01", "title": "32 AI For Developers Lecture 4: RAG Systems & Context Aware AI"},
  {"id": "0JskvyS6ZJk", "dur": "1:48:11", "title": "33 AI For Developers Lecture 5: AI Agents, MCPs & Skills"},
  {"id": "HJgNlw0tFl4", "dur": "1:45:08", "title": "34 AI For Developers Lecture 6: Build & Learn Project 1 Text to SQL"}
]

def to_seconds(s):
    parts = list(map(int, s.split(':')))
    if len(parts) == 2:
        return parts[0] * 60 + parts[1]
    elif len(parts) == 3:
        return parts[0] * 3600 + parts[1] * 60 + parts[2]
    return 0

manifest_entries = []
for i, item in enumerate(raw_videos):
    sec = to_seconds(item['dur'])
    mins = round(sec / 60)
    entry = {
        "position": i + 1,
        "videoId": item['id'],
        "title": item['title'],
        "durationSeconds": sec,
        "durationMinutes": mins,
        "channel": "Codex Arun",
        "url": f"https://www.youtube.com/watch?v={item['id']}",
        "thumbnail": f"https://i.ytimg.com/vi/{item['id']}/maxresdefault.jpg",
        "status": "playable",
        "embeddable": True,
        "availability": "unlisted"
    }
    manifest_entries.append(entry)

total_sec = sum(e['durationSeconds'] for e in manifest_entries)
total_mins = round(total_sec / 60)
hours = total_sec // 3600
rem_mins = (total_sec % 3600) // 60

manifest = {
    "playlistId": "PLQl7ZDyS2qk8",
    "playlistUrl": "https://www.youtube.com/playlist?list=PLQl7ZDyS2qk8",
    "title": "MERN Full Stack Course - React, Node & MongoDB with AI",
    "visibility": "unlisted",
    "visibilityNotice": "This playlist is Unlisted on YouTube. Embedding this playlist in the public CyberTube course catalog allows visitors of the CyberTube course page to access and watch these unlisted videos.",
    "extractedAt": "2026-11-21T14:35:00Z",
    "channel": "Codex Arun",
    "totalEntriesFound": 34,
    "playableLessonsCount": 34,
    "unavailableEntriesCount": 0,
    "totalPlayableDurationSeconds": total_sec,
    "totalPlayableDurationMinutes": total_mins,
    "estimatedDuration": f"{hours} hours {rem_mins} mins",
    "entries": manifest_entries
}

with open('src/data/manifests/mern-playlist-manifest.json', 'w', encoding='utf-8') as f:
    json.dump(manifest, f, indent=2, ensure_ascii=False)

print("Updated src/data/manifests/mern-playlist-manifest.json successfully!")
print(f"Total entries: {len(manifest_entries)}, total seconds: {total_sec}, total minutes: {total_mins}")
