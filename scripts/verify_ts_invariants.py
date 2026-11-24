import re

with open('src/data/networking-for-cybersecurity-course.ts', 'r', encoding='utf-8') as f:
    ts = f.read()

vids = re.findall(r'"youtubeVideoId":\s*"([^"]+)"', ts)
print(f"Total videos in TS: {len(vids)}")
print(f"Unique videos in TS: {len(set(vids))}")
assert len(vids) == 120, f"Expected 120 videos, got {len(vids)}"
assert len(set(vids)) == 120, f"Expected 120 unique videos, got {len(set(vids))}"

# Check m03-l2
assert '7vzjIv2l6wY' in ts, "m03-l2 video 7vzjIv2l6wY missing!"
print("Verified m03-l2 has 7vzjIv2l6wY")

# Check Capstone
assert 'capstone-enterprise-network-security-investigation' in ts, "Capstone missing!"
print("Verified capstone is defined")

# Check lab tasks
labs = re.findall(r'"practicalLab":\s*\{', ts)
print(f"Total practical labs: {len(labs)}")
assert len(labs) == 30, f"Expected 30 labs, got {len(labs)}"

print("ALL TS INVARIANTS PASSED SUCCESSFULLY!")
