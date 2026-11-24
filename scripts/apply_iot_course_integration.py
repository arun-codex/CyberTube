#!/usr/bin/env python3
"""Safely integrate only the new IoT course into an existing CyberTube checkout.
Default is preview. Use --apply --repo PATH after reviewing the preview and git diff.
Existing identical files are accepted; conflicting files fail closed before writes.
"""
import argparse,json,os,pathlib,shutil,sys

ROOT=pathlib.Path(__file__).resolve().parents[1]
p=argparse.ArgumentParser();p.add_argument('--repo',required=True,type=pathlib.Path);p.add_argument('--apply',action='store_true');args=p.parse_args()
repo=args.repo.resolve()
if not (repo/'src/data/courses.ts').is_file() or not (repo/'package.json').is_file():
    sys.exit('ERROR: target is not a CyberTube repository checkout')
if not (repo/'.git').exists():
    sys.exit('ERROR: git repository required; make a feature branch first')

sources={
 'src/data/iot-cybersecurity-course.ts':ROOT/'src/data/iot-cybersecurity-course.ts',
 'scripts/generate_iot_cybersecurity_course.py':ROOT/'scripts/generate_iot_cybersecurity_course.py',
 'scripts/compact_ts_template.txt':ROOT/'scripts/compact_ts_template.txt',
 'scripts/apply_iot_course_integration.py':ROOT/'scripts/apply_iot_course_integration.py',
 'test/iot-cybersecurity.test.ts':ROOT/'test/iot-cybersecurity.test.ts',
 'supabase/migrations/20261124180000_seed_iot_cybersecurity_course.sql':ROOT/'supabase/migrations/20261124180000_seed_iot_cybersecurity_course.sql',
 'supabase/VERIFY-IOT-COURSE.sql':ROOT/'supabase/VERIFY-IOT-COURSE.sql',
}
for file in (ROOT/'course-sources').rglob('*'):
    if file.is_file():
        rel=file.relative_to(ROOT/'course-sources')
        sources[str(pathlib.Path('iot_cybersecurity_course')/rel)]=file

# Validate and stage all changes BEFORE touching the repository.
for rel,src in sources.items():
    if not src.is_file():sys.exit(f'Missing source file: {src}')
    dest=repo/rel
    if dest.is_file() and dest.read_bytes()!=src.read_bytes():
        sys.exit(f'ERROR: destination file has conflicting content: {rel}. No files written.')
    if dest.is_dir():sys.exit(f'ERROR: path is a directory: {rel}')

course_path=repo/'src/data/courses.ts'
current=course_path.read_text(encoding='utf-8')
import_stmt="import { IOT_CYBERSECURITY_ZERO_TO_ADVANCED_COURSE } from './iot-cybersecurity-course';"
if import_stmt not in current:
    first='import { Course } from \'../types/course\';'
    if first not in current:sys.exit('ERROR: courses.ts unexpected shape; no changes made')
    updated=current.replace(first,first+'\n'+import_stmt,1)
else:updated=current
course_array='export const COURSES: Course[] = ['
if '  IOT_CYBERSECURITY_ZERO_TO_ADVANCED_COURSE,' not in updated:
    if course_array not in updated:sys.exit('ERROR: COURSES array not found; no changes made')
    updated=updated.replace(course_array,course_array+'\n  IOT_CYBERSECURITY_ZERO_TO_ADVANCED_COURSE,',1)

# Preserve source attribution when Supabase-backed lesson rows are merged.
# This is a one-line additive fix to the shared mapper, not a change to other course data.
lib_path=repo/'src/lib/courses.ts'
lib_new=None
if lib_path.is_file():
    lib_current=lib_path.read_text(encoding='utf-8')
    old="            youtubeVideoId: l.youtube_video_id,\n            durationMinutes: l.duration_minutes,"
    new="            youtubeVideoId: l.youtube_video_id,\n            videoAttribution: staticLesson?.videoAttribution,\n            durationMinutes: l.duration_minutes,"
    if old in lib_current:lib_new=lib_current.replace(old,new,1)
    elif new in lib_current:lib_new=lib_current
    else:sys.exit('ERROR: unexpected src/lib/courses.ts merge mapping; stopped before changing files')

package_path=repo/'package.json' 
package=json.loads(package_path.read_text(encoding='utf-8'))
scripts=package['scripts']
command='tsx --test test/iot-cybersecurity.test.ts'
if 'test:iot-course' in scripts and scripts['test:iot-course']!=command:
    sys.exit('ERROR: test:iot-course script conflicts with existing value')
scripts['test:iot-course']=command
if 'npm run test:iot-course' not in scripts['test']:
    scripts['test']+=' && npm run test:iot-course'
new_pkg=json.dumps(package,ensure_ascii=False,indent=2)+'\n'

print(f"Target: {repo}\nNew/identical files: {len(sources)}\nUpdated catalog: {updated!=current}\nUpdated package.json: {new_pkg!=package_path.read_text(encoding='utf-8')}\nPreserve video attribution: {lib_new is not None and lib_new!=lib_current}\nSQL migration: data-only, no quiz tables or quiz gating.")
if not args.apply:
    print('PREVIEW ONLY. Re-run with --apply to make these changes after reviewing.');sys.exit(0)
for rel,src in sources.items():
    dest=repo/rel;dest.parent.mkdir(parents=True,exist_ok=True)
    if not dest.exists():shutil.copy2(src,dest)
course_path.write_text(updated,encoding='utf-8')
package_path.write_text(new_pkg,encoding='utf-8')
if lib_new is not None and lib_new!=lib_current:lib_path.write_text(lib_new,encoding='utf-8')
print('Applied changes; inspect `git diff`, run typecheck and tests, and review video verification before publishing.')
