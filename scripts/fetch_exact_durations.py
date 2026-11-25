import urllib.request
import re
import ssl

ssl_ctx = ssl.create_default_context()

vids = [
    "eVxCUg0IhqI",
    "fbQRF_IKuo4",
    "I7GUiGoD1w8",
    "9GHKuFoOnVc",
    "sIv6AFW-ONM",
    "WHs-iGG_Vww",
    "lVr88JS-2rM",
    "rloqMGcPMkI",
    "PLx7shQIq6I",
    "-CzvPjZ9hp8",
    "Z0cDqF6HAxs",
    "bfuLNWCHfmE",
    "OFAxXXcLXbc",
    "RkGR_Xv-2Mo"
]

for v in vids:
    url = f"https://www.youtube.com/watch?v={v}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req, timeout=8, context=ssl_ctx) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            m = re.search(r'itemprop="duration" content="PT(\d+M)?(\d+S)?"', html)
            m_sec = re.search(r'"lengthSeconds":"(\d+)"', html)
            m_ms = re.search(r'"approxDurationMs":"(\d+)"', html)
            if m:
                print(f"{v}: duration tag = {m.group(0)}")
            elif m_sec:
                sec = int(m_sec.group(1))
                print(f"{v}: lengthSeconds = {sec} ({sec//60}m {sec%60}s)")
            elif m_ms:
                sec = int(m_ms.group(1)) // 1000
                print(f"{v}: approxMs = {sec} ({sec//60}m {sec%60}s)")
            else:
                # search for "simpleText":"15:23" or similar
                m_txt = re.findall(r'"simpleText":"(\d{1,2}:\d{2})"', html)
                print(f"{v}: found times {m_txt[:3]}")
    except Exception as e:
        print(f"{v}: error {e}")
