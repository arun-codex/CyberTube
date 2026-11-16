# Bug Bounty collection replacement

The ZIP is authoritative. Private originals, extracted text, backups, and temporary renders must remain outside this repository. The importer never deletes storage objects. Production deployment and production imports require separate authorization.

## Setup and inventory

Install Node dependencies with `npm ci` and Python validation with `python -m pip install -r scripts/study-requirements.txt`. Use a private output directory outside the worktree.

```powershell
node scripts/study-replace.mjs --mode inventory --zip 'C:\path\Repaired searchable PDFs.zip' --output 'C:\private\study-import'
```

An optional `--old-dir` backs up and inventories an old local collection for comparison. This is not evidence of hosted catalog contents. Every PDF is parsed, every page rendered for validation, and per-page extracted-text and visual hashes recorded. Originals are never rewritten or replaced with images. `inventory.json` lists all entries and validation failures. Search quality uses a conservative heuristic (at least three alphabetic words of three letters per page); code-only pages may need human review. Nonblank renders do not prove OCR accuracy.

## Hosted dry-run, apply, verify, rollback

Configure `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SECRET_KEY` or `SUPABASE_SERVICE_ROLE_KEY` in the ignored `.env.local`. The URL must match the explicit non-production `--project`. Never paste credentials into reports or commit them.

```powershell
node --env-file=.env.local scripts/study-replace.mjs --mode dry-run --project STAGING_REF --output 'C:\private\study-import'
node --env-file=.env.local scripts/study-replace.mjs --mode apply --project STAGING_REF --output 'C:\private\study-import'
node --env-file=.env.local scripts/study-replace.mjs --mode verify --project STAGING_REF --output 'C:\private\study-import'
node --env-file=.env.local scripts/study-replace.mjs --mode rollback --project STAGING_REF --output 'C:\private\study-import' --run ARCHIVE_SHA256
```

Apply the Study Library schema and the versioned replacement/atomic reader-state migrations to staging before running dry-run. Existing repository migration history differs from hosted history; reconcile versions before any blanket CLI push. Do not run the old generated catalog-seeding migration: catalog data is activated only by the verified importer.

Dry-run downloads and checksums every old hosted original, writes a recoverable snapshot, and generates `replacement-manifest.json`. Changed records reuse IDs only with verified identity. Automatic page correspondence requires matching per-page visual or nonempty extracted-text hashes. Page counts alone are insufficient.

For a manually reviewed identity whose page structure changed, supply `--mapping C:\private\mapping.json`:

```json
[{"filename":"Repaired.pdf","old_id":"existing-document-uuid","old_sha256":"old-64-character-checksum","new_sha256":"new-64-character-checksum"}]
```

The mapping confirms identity; it does not claim page correspondence. Unmapped positions and bookmarks are archived in the service-only import snapshot and reset. Removed documents become inactive, while their historical state and files remain recoverable.

Apply stops on every unresolved PDF validation problem. It uploads immutable checksum-addressed files into the private `original-pdfs` bucket, downloads them for checksum verification, then uses one database transaction to activate the exact manifest and retire unmatched Bug Bounty documents. A catalog change since dry-run aborts activation. Failed uploads leave the old catalog active; rerunning verifies and reuses completed objects. Repeating an active import verifies it without creating records. Use a new ZIP for a revised run after rollback.

Rollback must start with the newest active import. It restores the catalog snapshot and prior reading state, and archives post-import state under `before_rollback`. Files remain available for recovery. There is no automatic asset cleanup.

## Verification

`npm run test:study` exercises archive safety, matching, search, partial-upload recovery, and reader API contracts. `supabase/tests/03_study_replacement.sql` runs database activation, retry, rollback, bounds, bookmark, and progress checks inside a rolled-back transaction. `supabase/tests/04_study_reader_rls.sql` checks two-reader isolation and anonymous denial, also with rollback.

After a production build, run the real-PDF component harness:

```powershell
$env:STUDY_INVENTORY='C:\private\study-import\inventory.json'
npm run test:reader
```

This harness uses the actual PDF.js reader and private PDFs with mocked persistence. It writes screenshots and results beside the inventory. It does **not** verify real login, private hosted storage access, or cloud progress. Those require staging credentials, actual uploaded PDFs, and two authenticated sessions.

The PDF endpoint fails closed when the catalog record or storage object is missing. It never substitutes a local PDF. Progress and bookmarks authenticate the caller, validate the active document and page, then call service-only atomic database functions; document replacement and reader writes serialize on document locks.
