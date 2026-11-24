#!/usr/bin/env python3
"""Deterministic source-based IoT course generator. Uses only standard library.
Usage: python scripts/generate_iot_cybersecurity_course.py
Reads course-sources/MODULE-MANIFEST.json and all 30 Markdown modules.
No external requests or guessed playback verification.
"""
from __future__ import annotations
import json, re, pathlib, sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'iot_cybersecurity_course'
if not (SOURCE / 'MODULE-MANIFEST.json').is_file():
    SOURCE = ROOT / 'course-sources'
manifest = json.loads((SOURCE / 'MODULE-MANIFEST.json').read_text(encoding='utf-8'))
COURSE_UUID = 'e1000000-0000-4000-8000-000000000001'
SLUG = 'iot-cybersecurity-zero-to-advanced'
TITLE = 'IoT Cybersecurity & Ethical Hacking: Zero to Advanced'
URL_RE = re.compile(r'https://www\.youtube\.com/watch\?v=([\w-]{11})')
LESSON_RE = re.compile(r'^### (\d{2})\.(\d{2}) — ([^\n]+)$', re.M)


def sql_str(s):
    if s is None: return 'NULL'
    return "'" + str(s).replace("'", "''") + "'"


def sql_arr(items):
    return 'ARRAY[' + ','.join(sql_str(s) for s in items) + ']::text[]' if items else 'ARRAY[]::text[]'


def esc_js(obj):
    return json.dumps(obj, ensure_ascii=False, indent=2)


def between(body, heading, following):
    a = body.find(heading)
    if a == -1: raise ValueError(f'Missing section {heading}')
    a += len(heading)
    b = body.find(following, a) if following else -1
    return body[a:b if b != -1 else len(body)].strip()


def bold_value(block, key):
    m = re.search(r'\*\*' + re.escape(key) + r':\*\*\s*([^\n]+)', block)
    if not m: raise ValueError(f'Missing {key}')
    return m.group(1).strip()


def extract_videos(body):
    section = between(body,'## Free YouTube lessons for this module','## Free reference resources')
    found=[]
    for line in section.splitlines():
        m = re.match(r'^- \[([^\]]+)\]\((https://www\.youtube\.com/watch\?v=([\w-]{11}))\)\s*—\s*([^\n]+)',line)
        if m:
            v=dict(title=m.group(1), url=m.group(2), videoId=m.group(3), creator=m.group(4).split(' (')[0].strip())
            found.append(v)
    if not found: raise ValueError('Module has no direct YouTube video ID; manual verification required')
    return found


def extract_reading(body):
    section=between(body,'## Free reference resources','## Guided practical exercise')
    return [{'title':m.group(1),'url':m.group(2)} for m in re.finditer(r'^- \[([^\]]+)\]\((https?://[^)]+)\)',section,re.M)]


def parse_module(info):
    num=info['module']
    path=SOURCE / info['filename']
    body=path.read_text(encoding='utf-8')
    first=body.splitlines()[0]
    if not first.startswith(f'# Module {num:02d} — '): raise ValueError(f'Bad header {path}')
    if len(LESSON_RE.findall(body)) != 4: raise ValueError(f'Expected four lessons in {path}')
    aim=between(body,'## Module aim','## Four lessons (ordered)')
    lessons_block=between(body,'## Four lessons (ordered)','## Free YouTube lessons for this module')
    vids=extract_videos(body)
    reading=extract_reading(body)
    task=bold_value(between(body,'## Guided practical exercise','## Practical acceptance criteria'),'Task')
    deliverable=bold_value(between(body,'## Guided practical exercise','## Practical acceptance criteria'),'Deliverable')
    procedure=between(body,'**Procedure:**','**Deliverable:**')
    steps=[m.group(1).strip() for m in re.finditer(r'^\d+\.\s+(.+)$',procedure,re.M)]
    if len(steps)<4: raise ValueError(f'Expected lab steps {path}')
    prereq=re.search(r'^\*\*Prerequisite:\*\*\s*(.+)$',body,re.M)
    prereq=prereq.group(1).strip() if prereq else 'Prior modules, as applicable'
    lab={
      'id': f'iot-cybersecurity-m{num:02d}-lab',
      'title': f'Module {num:02d} practical — {info["title"]}',
      'objective':task,
      'toolsRequired':['Authorized offline IoT lab or provided static evidence','Markdown editor','Screenshot and SHA-256 tools as applicable'],
      'pcapSource':{'fileName':'No PCAP required; use safely sourced module evidence','fileUrl':'https://owasp.org/owasp-istg/01_introduction/index.html','repositoryUrl':'https://github.com/OWASP/IoTGoat'},
      'difficulty':'beginner' if num<=6 else 'intermediate' if num<=17 else 'advanced',
      'estimatedMinutes': max(40,round(info['hours']*60/3)),
      'instructions':[task]+steps+[f'Deliverable: {deliverable}'],
      'tasks':[{'id':f'm{num:02d}-task-{i+1}','description':s} for i,s in enumerate(steps)],
      'evidenceWorksheet':[
        {'field':'scope','prompt':'Document owned / explicitly authorized asset and test boundary.','expectedEvidenceType':'Scope statement'},
        {'field':'observations','prompt':'Record three labeled observations E1-E3, separating facts from hypotheses.','expectedEvidenceType':'Sanitized screenshots or text evidence'},
        {'field':'mitigation','prompt':'Provide a prioritized remediation and testable SOC detection idea.','expectedEvidenceType':'Risk and detection notes'},
        {'field':'deliverable','prompt':deliverable,'expectedEvidenceType':'Module lab report'}],
      'questions':[],
      'completionCriteria':['Evidence from an authorized or offline training environment','At least three traceable observations and one limitation','Preventive, detective and response control proposed','Sanitized report includes mitigation and safe verification'],
    }
    lessons=[]
    headings=list(LESSON_RE.finditer(lessons_block))
    for idx,h in enumerate(headings):
        nn=int(h.group(1)); ll=int(h.group(2)); topic=h.group(3).strip()
        if nn!=num or ll!=idx+1: raise ValueError(f'Unexpected lesson order {num}.{ll}')
        fragment=lessons_block[h.end():headings[idx+1].start() if idx+1<len(headings) else len(lessons_block)]
        activity=bold_value(fragment,'Learning activity')
        practice=bold_value(fragment,'Practice & evidence')
        check=bold_value(fragment,'Completion check')
        video=vids[idx%len(vids)]
        lesson_id=f'iot-cybersecurity-m{num:02d}-l{ll:02d}'
        slug=f'm{num:02d}-l{ll:02d}-'+re.sub(r'[^a-z0-9]+','-',topic.lower()).strip('-')[:75]
        lesson={
          'id':lesson_id,'slug':slug,'title':f'Module {num:02d} - Lesson {ll}: {topic}',
          'description':f'{activity} Practice: {practice} Completion: {check}',
          'youtubeVideoId': video['videoId'],
          'videoAttribution': {'creator':video['creator'],'platform':'youtube'},
          'durationMinutes':35,
          'order':ll,
          'moduleTitle':f'Module {num:02d}: {info["title"]}',
          'objectives':[topic,activity,practice,check],
          'tags':['iot','cybersecurity',f'module-{num:02d}',info['phase'].lower()],
          'skillsTaught':[topic,info['title'],'IoT security evidence and defensive analysis'],
          'richContent':{
            'introduction':f'Lesson {num:02d}.{ll:02d} addresses {topic}. The video ({video["title"]}, {video["creator"]}) provides module-level supporting instruction, not independently verified exact coverage of this lesson. Study the original lesson text and complete the isolated lab evidence.',
            'prerequisites':[prereq,'Owned or explicitly authorized training environment (or static fictional examples)'],
            'theorySections':[{'title':f'Security theory — {topic}','content':f'{aim}\n\nLearning activity: {activity}','keyPoints':[topic,practice,check]}],
            'stepByStepProcedures':[
              {'step':1,'title':'Watch curated IoT-specific video','instruction':f'Watch {video["title"]} by {video["creator"]}; this is shared module-level supporting material. Link: {video["url"]}.','expectedOutcome':'Summarize relevant concepts and any gaps between video and assigned lesson.'},
              {'step':2,'title':'Explain threat and defense','instruction':activity,'expectedOutcome':'Explain CIA, safety, privacy or operational effect on the named IoT attack surface.'},
              {'step':3,'title':'Perform safe isolated exercise','instruction':practice,'expectedOutcome':'Produce sanitized, labeled evidence and an observation.'},
              {'step':4,'title':'Document security relevance','instruction':f'{check} Relate the evidence to the module lab: {task}','expectedOutcome':'Written finding, limitation, mitigation and detection hypothesis.'}],
            'expectedObservations':['Evidence labeled E1–E3 in module practical report','Facts clearly separated from suspected issues','A plausible preventive control and an actionable detection or response opportunity'],
            'commonMistakes':['Treating supporting module videos as covering all four lessons verbatim','Running reconnaissance or RF tests against unowned devices','Confusing planned lesson effort (35 minutes) with actual YouTube runtime','Publishing sensitive credentials or personal information'],
            'securityRelevance':f'IoT cybersecurity topic: {topic}. Relevance: {info["title"]}. Applied only to authorized isolated systems.',
            'practicalExercise':{'title':task,'objective':f'Demonstrate understanding of {topic} through a scoped IoT evidence report.','instructions':[practice,f'Include evidence in module lab: {deliverable}']},
            'summary':check,
            'furtherReading':reading
          }
        }
        lessons.append(lesson)
    result={
      'id':f'iot-cybersecurity-m{num:02d}',
      'title':f'Module {num:02d}: {info["title"]}',
      'description':f'{info["phase"]} phase. {info["hours"]} hours total learning effort. Prerequisite: {prereq}. {aim}',
      'order':num,'lessons':lessons,'practicalLab':lab,
    }
    return result


def capstone():
    rubric=[
      ('Authorization and scope',10),('IoT architecture and attack-surface model',15),
      ('Firmware and configuration evidence',20),('Network telemetry and threat investigation',15),
      ('SOC detection and triage plan',15),('Prioritized remediation and safe retest',15),
      ('Evidence quality, communication and limitations',10),
    ]
    return {'id':'iot-capstone-soc-handoff','title':'IoT Defensive Assessment & SOC Handoff',
            'scenario':'Analyze only OWASP IoTGoat, synthetic IoT telemetry or a personally owned, expressly authorized isolated lab. Correlate three findings with evidence, defensive controls and SOC detections.',
            'pcapSource':{'fileName':'Use your own authorized lab capture or synthetic evidence; no mandatory PCAP','fileUrl':'https://github.com/OWASP/IoTGoat'},
            'totalMarks':100,'passingScore':75,
            'rubric':[{'category':t,'marks':v,'criteria':['Evidence is reproducible, scoped and correctly sourced','Assessment distinguishes facts, hypotheses, limitations and test conditions']} for t,v in rubric],
            'submissionSections':[{'id':f'iot-capstone-{i+1}','title':t,'prompt':f'Submit the {t.lower()} section with sanitized evidence, reproducible method and precise limitations.','maxMarks':v} for i,(t,v) in enumerate(rubric)]}


def generate():
    infos=manifest['modules']
    assert len(infos)==30 and sum(x['lessons'] for x in infos)==120
    assert sum(x['hours'] for x in infos)==190
    modules=[parse_module(info) for info in infos]
    assert len([l for m in modules for l in m['lessons']])==120
    assert len({l['slug'] for m in modules for l in m['lessons']})==120
    assert all(re.fullmatch(r'[A-Za-z0-9_-]{11}',l['youtubeVideoId']) for m in modules for l in m['lessons'])
    assert not any('quiz' in str(k).lower() for m in modules for k in m)
    c={
        'id':'course-iot-cybersecurity-zero-to-advanced','slug':SLUG,'title':TITLE,
        'shortDescription':'Video-supported IoT security learning: 30 modules, 120 guided lessons, 30 defensive labs, SOC handoff capstone. No quizzes.',
        'description':'Original evidence-based 190-hour IoT security pathway: authorized embedded security, IoT networks, MQTT, BLE/Zigbee, firmware forensics, Ghidra, IoT malware, SOC monitoring, incident response and industrial IoT. Uses 21 curated YouTube links shared across modules, NOT 120 unique or individually playback-verified videos. 35 min is planned guided study allocation per lesson; 190 total study hours includes reading, labs and capstone.',
        'domains':['iot-embedded-security','soc-blue-team','dfir','network-security'],
        'tags':['iot','embedded-security','ethical-hacking','soc','firmware','mqtt','dfir','supply-chain','no-quizzes'],
        'difficulty':'intermediate',
        'thumbnailUrl':'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
        'estimatedDuration':'190 study hours (includes labs, reading and capstone; video runtimes unverified)',
        'totalDurationMinutes':4200,
        'instructor':{'name':'CyberTube IoT Cybersecurity Curriculum','title':'Curated open video lessons and original defensive laboratory guides','organization':'CyberTube'},
        'prerequisites':['Basic computer literacy; first six modules begin at zero','Authorized or deliberately vulnerable isolated IoT lab','No tests against third-party networks, radios, systems or devices'],
        'learningObjectives':['Explain IoT threat models, safety boundaries and defensive architectures','Analyze authorized IoT packet captures and MQTT security configurations','Inspect firmware and hardware interfaces in an isolated training lab','Apply secure boot, identity, firmware update and API protection principles','Investigate IoT malware cases and preserve forensic evidence','Deliver a professional IoT security assessment, mitigation plan and SOC handoff'],
        'featured':False,'track':'cybersecurity','modules':modules,
    }
    c['modules'][29]['capstoneAssessment']=capstone()
    out=ROOT/'src/data/iot-cybersecurity-course.ts';out.parent.mkdir(parents=True,exist_ok=True)
    # Compact, data-driven TypeScript avoids shipping 1 MB of duplicated lesson scaffolding.
    template=(ROOT/'scripts/compact_ts_template.txt').read_text(encoding='utf-8')
    sources=[]
    for info,module in zip(infos,modules):
        source_text=(SOURCE/info['filename']).read_text(encoding='utf-8')
        sources.append({
          'title':info['title'],'phase':info['phase'],'hours':info['hours'],
          'aim':between(source_text,'## Module aim','## Four lessons (ordered)'),
          'prereq':re.search(r'^\*\*Prerequisite:\*\*\s*(.+)$',source_text,re.M).group(1).strip(),
          'task':info['lab'],'output':info['output'],
          'steps':[m.group(1).strip() for m in re.finditer(r'^\d+\.\s+(.+)$', between(source_text,'**Procedure:**','**Deliverable:**'),re.M)],
          'reading':extract_reading(source_text),'videos':extract_videos(source_text),
          'lessons':[{'title':re.sub(r'^Module \d+ - Lesson \d+: ','',lesson['title']),
                      'activity':lesson['objectives'][1],
                      'practice':lesson['objectives'][2],
                      'check':lesson['objectives'][3]} for lesson in module['lessons']]
        })
    out.write_text(template.replace('SOURCE_DATA_GOES_HERE',json.dumps(sources,ensure_ascii=False,separators=(',',':'))),encoding='utf-8')
    # Idempotent migration; all UUIDs belong only to this new course, never touch existing courses.
    rows=['-- AUTO-GENERATED IoT cybersecurity course data. No quiz tables, deletes, RLS alterations, or unlock gates.','-- Source: course-sources/MODULE-MANIFEST.json + 30 Markdown modules.','-- 35 minutes is course study allocation, NOT independently verified YouTube runtime.','BEGIN;',f"DO $$ BEGIN IF EXISTS (SELECT 1 FROM public.courses WHERE slug={sql_str(SLUG)} AND id <> {sql_str(COURSE_UUID)}::uuid) THEN RAISE EXCEPTION 'Course slug already claimed by another UUID'; END IF; END $$;"]
    rows.append('INSERT INTO public.courses (id,slug,title,short_description,description,difficulty,status,estimated_duration,total_duration_minutes,thumbnail_url,instructor_name,instructor_title,instructor_org,prerequisites,learning_objectives,domains,tags,featured,track) VALUES (' + ','.join([sql_str(COURSE_UUID)+'::uuid', sql_str(c['slug']),sql_str(c['title']),sql_str(c['shortDescription']),sql_str(c['description']),sql_str(c['difficulty']),"'published'",sql_str(c['estimatedDuration']),str(c['totalDurationMinutes']),sql_str(c['thumbnailUrl']),sql_str(c['instructor']['name']),sql_str(c['instructor']['title']),sql_str(c['instructor']['organization']),sql_arr(c['prerequisites']),sql_arr(c['learningObjectives']),sql_arr(c['domains']),sql_arr(c['tags']),'false',sql_str(c['track'])]) + ') ON CONFLICT (id) DO UPDATE SET slug=EXCLUDED.slug,title=EXCLUDED.title,short_description=EXCLUDED.short_description,description=EXCLUDED.description,difficulty=EXCLUDED.difficulty,status=EXCLUDED.status,estimated_duration=EXCLUDED.estimated_duration,total_duration_minutes=EXCLUDED.total_duration_minutes,thumbnail_url=EXCLUDED.thumbnail_url,instructor_name=EXCLUDED.instructor_name,instructor_title=EXCLUDED.instructor_title,instructor_org=EXCLUDED.instructor_org,prerequisites=EXCLUDED.prerequisites,learning_objectives=EXCLUDED.learning_objectives,domains=EXCLUDED.domains,tags=EXCLUDED.tags,featured=EXCLUDED.featured,track=EXCLUDED.track;')
    # Deterministic hexadecimal numbering: 0001 to 001e (30); 0101 to 1e04 (30 x 4)
    for info,m in zip(infos,modules):
        n=info['module']; muid=f'e1000000-{n:04x}-4000-8000-000000000001'
        rows.append(f"INSERT INTO public.course_modules (id,course_id,title,description,order_index) VALUES ({sql_str(muid)}::uuid,{sql_str(COURSE_UUID)}::uuid,{sql_str(m['title'])},{sql_str(m['description'])},{n}) ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title,description=EXCLUDED.description,order_index=EXCLUDED.order_index WHERE course_modules.course_id=EXCLUDED.course_id;")
        for j,l in enumerate(m['lessons'],start=1):
            luid=f'e1000000-{(n<<8)+j:04x}-4000-8000-000000000001'
            cols='id,module_id,course_id,slug,title,description,youtube_video_id,duration_minutes,order_index,objectives,tags,skills_taught'
            vals=[sql_str(luid)+'::uuid',sql_str(muid)+'::uuid',sql_str(COURSE_UUID)+'::uuid',sql_str(l['slug']),sql_str(l['title']),sql_str(l['description']),sql_str(l['youtubeVideoId']),str(l['durationMinutes']),str(j),sql_arr(l['objectives']),sql_arr(l['tags']),sql_arr(l['skillsTaught'])]
            rows.append(f"INSERT INTO public.lessons ({cols}) VALUES ({','.join(vals)}) ON CONFLICT (id) DO UPDATE SET slug=EXCLUDED.slug,title=EXCLUDED.title,description=EXCLUDED.description,youtube_video_id=EXCLUDED.youtube_video_id,duration_minutes=EXCLUDED.duration_minutes,order_index=EXCLUDED.order_index,objectives=EXCLUDED.objectives,tags=EXCLUDED.tags,skills_taught=EXCLUDED.skills_taught WHERE lessons.course_id=EXCLUDED.course_id AND lessons.module_id=EXCLUDED.module_id;")
    rows.append(f"DO $$ BEGIN IF (SELECT count(*) FROM public.course_modules WHERE course_id='{COURSE_UUID}') <> 30 OR (SELECT count(*) FROM public.lessons WHERE course_id='{COURSE_UUID}') <> 120 THEN RAISE EXCEPTION 'IoT course counts mismatch: expected 30 modules and 120 lessons'; END IF; END $$;")
    rows.append('COMMIT;')
    migration=ROOT/'supabase/migrations/20261124180000_seed_iot_cybersecurity_course.sql';migration.parent.mkdir(parents=True,exist_ok=True)
    migration.write_text('\n'.join(rows)+'\n',encoding='utf-8')
    print(f'Generated {out} ({out.stat().st_size:,} bytes), {migration} ({migration.stat().st_size:,} bytes)')
    print(f'{len(modules)} modules, 120 lessons, 30 labs, 1 capstone, no quizzes; 190 study hours, 4200 planned lesson minutes; 21 curated source URLs; 19 distinct video IDs assigned to lessons.')

if __name__=='__main__':
    generate()
