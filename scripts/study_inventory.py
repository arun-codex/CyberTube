"""Read-only PDF validation; extracted originals and reports stay outside Git.

Requires PyMuPDF. Rendering here is validation only, never a reader asset.
"""
import argparse
import hashlib
import json
import re
import shutil
import stat
import zipfile
from pathlib import Path, PurePosixPath
import pymupdf


def safe_entries(archive):
    entries, seen, total = [], set(), 0
    for entry in archive.infolist():
        name = entry.filename.replace('\\', '/')
        parts = PurePosixPath(name).parts
        mode = entry.external_attr >> 16
        if (name.startswith('/') or any(p in ('..', '.') or ':' in p for p in parts)
                or '\x00' in name or stat.S_ISLNK(mode)):
            raise ValueError('Unsafe ZIP entry: ' + entry.filename)
        key = name.casefold().rstrip('/')
        if key in seen:
            raise ValueError('Duplicate ZIP path: ' + name)
        seen.add(key)
        total += entry.file_size
        if entry.file_size > 100 * 1024**2 or total > 1024**3 or len(seen) > 2000:
            raise ValueError('ZIP extraction limits exceeded')
        if any(p == '__MACOSX' or p.startswith('._') for p in parts):
            continue
        if not entry.is_dir() and name.lower().endswith('.pdf'):
            entries.append((entry, name))
    if not entries:
        raise ValueError('Archive contains no PDFs')
    return entries


def title_for(filename):
    title = re.sub(r'\bsecured\b', '', Path(filename).stem.replace('_', ' '), flags=re.I)
    title = re.sub(r'\s+', ' ', title).strip()
    fixes = {'adminpanal': 'Admin Panel', 'vlnerability checklist': 'Vulnerability Checklist',
             'meta data not extracted': 'Metadata Not Extracted', 'tips tiwtter p2': 'Twitter Tips Part 2'}
    cleaned = fixes.get(title.lower(), title.title())
    for acronym in ['2FA', 'ATO', 'IDOR', 'XSS', 'CSRF', 'CRLF', 'JSON', 'RCE', 'ICC', 'API']:
        cleaned = re.sub(r'\b' + acronym + r'\b', acronym, cleaned, flags=re.I)
    if cleaned.count('(') > cleaned.count(')'):
        cleaned += ')'
    return cleaned


def category_for(name):
    text = name.lower().replace('_', ' ')
    for needles, slug in [
        (['2fa', 'ato', 'authentication', 'reset password', 'cookie', 'rate limit', 'register'], 'authentication-session-security'),
        (['idor', 'authorization', '403', 'adminpanal'], 'authorization-idor'),
        (['xss', 'cross site scripting', 'csrf', 'crlf', 'cross site request'], 'xss-client-side-security'),
        (['business', 'mass', 'json', 'jire'], 'business-logic-api-security'),
        (['file upload', 'rce', 'command injection'], 'file-upload-ssrf'),
        (['twitter', 'tiwtter', 'exposed source', 'host header'], 'reconnaissance-methodology')]:
        if any(n in text for n in needles):
            return slug
    return 'other-materials'


def inspect_pdf(path, original_name):
    raw = path.read_bytes()
    result = dict(original_filename=original_name, title=title_for(original_name),
                  file_path=str(path.resolve()), file_size=len(raw), sha256=hashlib.sha256(raw).hexdigest(),
                  category_slug=category_for(original_name), opens_correctly=False, page_count=0,
                  text_extraction_works=False, is_searchable=False, rendering_valid=False, pages=[], error=None)
    try:
        with pymupdf.open(stream=raw, filetype='pdf') as doc:
            if doc.needs_pass:
                raise ValueError('Password required')
            result.update(opens_correctly=True, page_count=len(doc))
            for page in doc:
                text = page.get_text('text')
                normalized = re.sub(r'\s+', ' ', text).strip()
                pix = page.get_pixmap(matrix=pymupdf.Matrix(0.5, 0.5), alpha=False)
                samples = pix.samples
                nonblank = bool(samples) and min(samples) < 245 and max(samples) - min(samples) > 10
                words = re.findall(r'[A-Za-z]{3,}', text)
                tokens = re.findall(r'\S+', text)
                meaningful = len(words) >= 3 or (len(tokens) >= 3 and len(normalized) >= 20 and any(c.isalpha() for c in normalized))
                result['pages'].append(dict(page=page.number + 1, characters=len(normalized),
                    text_sha256=hashlib.sha256(normalized.encode()).hexdigest(),
                    visual_sha256=hashlib.sha256(samples).hexdigest(),
                    search_term=words[0] if words else (tokens[0] if tokens else None), meaningful_text=meaningful,
                    rendering_valid=nonblank, width=page.rect.width, height=page.rect.height))
            result['text_extraction_works'] = any(p['characters'] for p in result['pages'])
            result['is_searchable'] = bool(result['pages']) and all(p['meaningful_text'] for p in result['pages'])
            result['rendering_valid'] = bool(result['pages']) and all(p['rendering_valid'] for p in result['pages'])
    except Exception as exc:
        result['error'] = str(exc)
    return result


def inventory(zip_path, output, old_dir=None):
    output.mkdir(parents=True, exist_ok=True)
    extracted = output / 'originals'
    extracted.mkdir(exist_ok=True)
    docs = []
    with zipfile.ZipFile(zip_path) as archive:
        entries = safe_entries(archive)  # Validate entire archive before writing any entry.
        for entry, name in entries:
            target = extracted.joinpath(*PurePosixPath(name).parts)
            if not target.resolve().is_relative_to(extracted.resolve()):
                raise ValueError('Extraction escapes destination')
            target.parent.mkdir(parents=True, exist_ok=True)
            with archive.open(entry) as src, target.open('wb') as dst:
                shutil.copyfileobj(src, dst)
            docs.append(inspect_pdf(target, name))
    report = dict(source_zip=str(zip_path.resolve()), zip_sha256=hashlib.sha256(zip_path.read_bytes()).hexdigest(), documents=docs)
    if old_dir:
        backup = output / 'old-local-backup'
        backup.mkdir(exist_ok=True)
        old_docs = []
        for path in sorted(old_dir.rglob('*.pdf')):
            relative = path.relative_to(old_dir)
            target = backup / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(path, target)
            old_docs.append(inspect_pdf(target, str(relative)))
        report['old_local_documents'] = old_docs
    report['summary'] = dict(pdfs=len(docs), pages=sum(d['page_count'] for d in docs),
        valid=sum(d['opens_correctly'] and d['rendering_valid'] for d in docs),
        searchable=sum(d['is_searchable'] for d in docs),
        duplicates=len(docs) - len({d['sha256'] for d in docs}),
        problematic=[d['original_filename'] for d in docs if d['error'] or not d['is_searchable'] or not d['rendering_valid']])
    (output / 'inventory.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
    return report


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--zip', required=True, type=Path)
    parser.add_argument('--output', required=True, type=Path)
    parser.add_argument('--old-dir', type=Path)
    args = parser.parse_args()
    print(json.dumps(inventory(args.zip, args.output, args.old_dir)['summary'], indent=2))
