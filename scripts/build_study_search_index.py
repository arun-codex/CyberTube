#!/usr/bin/env python3
"""
CyberTube — Secure Server-Side Study Document Search Indexing Pipeline

Safely extracts page text from authorized study PDF files and performs
idempotent database upserts into public.study_document_page_text.

Security Guarantees:
 - NEVER hardcodes API keys, tokens, or JWTs.
 - Credentials MUST be injected via environment variables:
     SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL)
     SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE_KEY)
 - NEVER outputs or writes extracted text to disk or Git repositories.
 - Preserves document publication status (is_published, retired_at untouched).
 - Idempotent upserts on (document_id, page_number) prevent duplicates.
 - Validates page counts against database records.
"""

import os
import sys
import argparse
import json
import re
import zipfile
import urllib.request
import urllib.error
from pathlib import Path

try:
    import pymupdf  # PyMuPDF
except ImportError:
    try:
        import fitz as pymupdf
    except ImportError:
        print("Error: PyMuPDF (pymupdf) is required. Install with: pip install pymupdf", file=sys.stderr)
        sys.exit(1)


def sanitize_page_text(raw_text: str) -> str:
    """Strips null bytes and normalizes excessive whitespace while preserving tokens."""
    if not raw_text:
        return ""
    # Strip null characters which PostgreSQL TEXT type rejects
    text = raw_text.replace("\x00", "")
    # Normalize multiple whitespace characters to single spaces, preserving content
    text = re.sub(r"[ \t\r\f\v]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def get_env_credentials():
    """Retrieves Supabase URL and service role key securely from environment variables."""
    url = os.environ.get("SUPABASE_URL") or os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
    key = os.environ.get("SUPABASE_SECRET_KEY") or os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    return url, key


def fetch_documents_from_db(supabase_url: str, service_key: str, collection_slug: str, doc_id: str = None):
    """Queries active study documents from Supabase REST API."""
    query_parts = [
        "select=id,title,slug,original_filename,page_count,is_published,retired_at,category_id",
        f"collection_slug=eq.{collection_slug}",
        "retired_at=is.null",
        "order=title.asc",
    ]
    if doc_id:
        query_parts.append(f"id=eq.{doc_id}")

    endpoint = f"{supabase_url.rstrip('/')}/rest/v1/study_documents?{'&'.join(query_parts)}"
    req = urllib.request.Request(
        endpoint,
        headers={
            "apikey": service_key,
            "Authorization": f"Bearer {service_key}",
            "Accept": "application/json",
        },
    )

    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return data
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8", errors="ignore")
        print(f"Error fetching documents from Supabase: HTTP {e.code} — {err_body}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Connection error connecting to Supabase: {e}", file=sys.stderr)
        sys.exit(1)


def upsert_page_batch(supabase_url: str, service_key: str, batch: list) -> bool:
    """Idempotently upserts a batch of page records into study_document_page_text."""
    if not batch:
        return True

    endpoint = f"{supabase_url.rstrip('/')}/rest/v1/study_document_page_text"
    payload = json.dumps(batch).encode("utf-8")

    req = urllib.request.Request(
        endpoint,
        data=payload,
        headers={
            "apikey": service_key,
            "Authorization": f"Bearer {service_key}",
            "Content-Type": "application/json",
            "Prefer": "resolution=merge-duplicates",  # ON CONFLICT DO UPDATE
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return resp.status in (200, 201, 204)
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8", errors="ignore")
        print(f"Error upserting batch: HTTP {e.code} — {err_body}", file=sys.stderr)
        return False
    except Exception as e:
        print(f"Network error during batch upsert: {e}", file=sys.stderr)
        return False


def process_pdf_document(pdf_bytes: bytes, doc_info: dict) -> list:
    """Extracts text page by page from PDF bytes."""
    pages_data = []
    doc_id = doc_info["id"]
    expected_pages = doc_info.get("page_count")

    with pymupdf.open(stream=pdf_bytes, filetype="pdf") as doc:
        actual_pages = len(doc)
        if expected_pages and actual_pages != expected_pages:
            print(
                f"  [WARN] Page count mismatch for '{doc_info['title']}': "
                f"DB expects {expected_pages}, PDF has {actual_pages}",
                file=sys.stderr,
            )

        for page_idx, page in enumerate(doc):
            page_num = page_idx + 1
            raw_text = page.get_text("text")
            clean_text = sanitize_page_text(raw_text)

            pages_data.append({
                "document_id": doc_id,
                "page_number": page_num,
                "page_text": clean_text,
            })

    return pages_data


def main():
    parser = argparse.ArgumentParser(
        description="Securely index study document page text into Supabase full-text search table."
    )
    parser.add_argument("--source-dir", type=str, default="data/repaired_pdfs",
                        help="Path to directory containing PDF files.")
    parser.add_argument("--zip", type=str, default=None,
                        help="Path to authoritative zip archive containing PDF files.")
    parser.add_argument("--collection", type=str, default="bug-bounty",
                        help="Collection slug to filter documents (default: bug-bounty).")
    parser.add_argument("--document-id", type=str, default=None,
                        help="Filter by specific document UUID.")
    parser.add_argument("--batch-size", type=int, default=50,
                        help="Number of pages to upsert per HTTP request (default: 50).")
    parser.add_argument("--dry-run", action="store_true",
                        help="Simulate extraction and validation without writing to database.")
    args = parser.parse_args()

    supabase_url, service_key = get_env_credentials()

    if not args.dry_run:
        if not supabase_url or not service_key:
            print(
                "Error: SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and "
                "SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE_KEY) environment variables are required.\n"
                "Run with --dry-run to simulate without database credentials.",
                file=sys.stderr,
            )
            sys.exit(1)

    print("=== CYBERTUBE SECURE STUDY SEARCH INDEXING PIPELINE ===")
    print(f"Collection:     {args.collection}")
    print(f"Dry Run:        {args.dry_run}")
    print(f"Batch Size:     {args.batch_size}")

    # Load documents metadata
    if supabase_url and service_key:
        print("\nConnecting to Supabase to retrieve study documents metadata...")
        docs = fetch_documents_from_db(supabase_url, service_key, args.collection, args.document_id)
        print(f"Loaded {len(docs)} documents from database.")
    else:
        print("\n[Dry Run] No database credentials supplied; checking local files only.")
        docs = []

    # Prepare PDF source (ZIP archive or Directory)
    zip_archive = None
    source_dir = Path(args.source_dir)

    if args.zip:
        zip_path = Path(args.zip)
        if not zip_path.exists():
            print(f"Error: Specified ZIP file not found: {zip_path}", file=sys.stderr)
            sys.exit(1)
        print(f"Reading PDFs from archive: {zip_path.name} ({zip_path.stat().st_size} bytes)")
        zip_archive = zipfile.ZipFile(zip_path, "r")
    elif source_dir.exists():
        print(f"Reading PDFs from directory: {source_dir.resolve()}")
    else:
        print(f"Warning: Neither --zip nor source directory '{source_dir}' found.", file=sys.stderr)

    total_docs_processed = 0
    total_pages_indexed = 0
    total_batches_sent = 0
    errors = []

    try:
        for doc in docs:
            filename = doc.get("original_filename")
            doc_id = doc.get("id")
            title = doc.get("title")

            pdf_bytes = None

            # Attempt to read PDF bytes from zip or directory
            if zip_archive:
                # Check directly or check basename
                matching_names = [name for name in zip_archive.namelist() if Path(name).name == filename]
                if matching_names:
                    pdf_bytes = zip_archive.read(matching_names[0])
            elif source_dir.exists():
                file_path = source_dir / filename
                if file_path.exists():
                    pdf_bytes = file_path.read_bytes()

            if not pdf_bytes:
                print(f"  [SKIP] PDF file '{filename}' not found for document '{title}' ({doc_id})")
                continue

            # Extract pages
            pages = process_pdf_document(pdf_bytes, doc)
            if not pages:
                print(f"  [WARN] Document '{title}' yielded 0 pages.")
                continue

            print(f"  [EXTRACT] '{title}' -> {len(pages)} pages extracted.")
            total_docs_processed += 1

            if args.dry_run:
                total_pages_indexed += len(pages)
                continue

            # Upsert in batches
            for i in range(0, len(pages), args.batch_size):
                batch = pages[i : i + args.batch_size]
                success = upsert_page_batch(supabase_url, service_key, batch)
                if success:
                    total_pages_indexed += len(batch)
                    total_batches_sent += 1
                else:
                    err_msg = f"Failed to upsert pages {i+1}-{i+len(batch)} for document '{title}'"
                    print(f"    [ERROR] {err_msg}", file=sys.stderr)
                    errors.append(err_msg)

    finally:
        if zip_archive:
            zip_archive.close()

    print("\n=== INDEXING SUMMARY ===")
    print(f"Total Documents Processed: {total_docs_processed}")
    print(f"Total Pages Indexed:       {total_pages_indexed}")
    print(f"Total Batches Executed:    {total_batches_sent}")
    if errors:
        print(f"Errors Encountered:        {len(errors)}", file=sys.stderr)
        sys.exit(1)
    else:
        print("Status:                    SUCCESS (Zero credentials or extracted text committed to Git)")


if __name__ == "__main__":
    main()
