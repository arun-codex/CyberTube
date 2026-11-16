'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Upload,
  FileText,
  CheckCircle,
  Clock,
  Eye,
  Trash2,
  AlertCircle,
  Loader2,
  Plus,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface AdminDoc {
  id: string;
  title: string;
  original_filename: string;
  source_checksum: string;
  page_count: number;
  is_published: boolean;
  difficulty: string | null;
  description: string | null;
  created_at: string;
  category_id: string | null;
  study_categories?: { title: string; slug: string } | null;
}

interface AdminCategory {
  id: string;
  title: string;
  slug: string;
}

interface AdminStudyMaterialsClientProps {
  initialDocuments: AdminDoc[];
  categories: AdminCategory[];
}

export function AdminStudyMaterialsClient({
  initialDocuments,
  categories,
}: AdminStudyMaterialsClientProps) {
  const [documents, setDocuments] = useState<AdminDoc[]>(initialDocuments);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  // Form State
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [description, setDescription] = useState('');

  // Handle PDF Upload
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setUploadError('Please select a PDF file.');
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(null);

    const formData = new FormData();
    formData.append('file', file);
    if (title.trim()) formData.append('title', title.trim());
    if (categoryId) formData.append('categoryId', categoryId);
    if (difficulty) formData.append('difficulty', difficulty);
    if (description.trim()) formData.append('description', description.trim());

    try {
      const res = await fetch('/api/admin/study-materials/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setUploadSuccess(`"${data.document.title}" uploaded successfully! Page count: ${data.document.page_count}`);
      setDocuments((prev) => [data.document, ...prev]);

      // Reset form
      setFile(null);
      setTitle('');
      setDescription('');
    } catch (err: any) {
      setUploadError(err.message || 'An error occurred during upload.');
    } finally {
      setIsUploading(false);
    }
  };

  // Toggle Publication Status
  const handleTogglePublish = async (docId: string, currentStatus: boolean) => {
    try {
      const res = await fetch('/api/admin/study-materials', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: docId, is_published: !currentStatus }),
      });

      if (res.ok) {
        setDocuments((prev) =>
          prev.map((d) => (d.id === docId ? { ...d, is_published: !currentStatus } : d))
        );
      }
    } catch (err) {
      console.error('Failed to toggle publication status:', err);
    }
  };

  // Delete Document
  const handleDeleteDocument = async (docId: string, docTitle: string) => {
    if (!window.confirm(`Are you sure you want to delete "${docTitle}"? This cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/study-materials?id=${docId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setDocuments((prev) => prev.filter((d) => d.id !== docId));
      }
    } catch (err) {
      console.error('Failed to delete document:', err);
    }
  };

  const totalPublished = documents.filter((d) => d.is_published).length;
  const totalPending = documents.filter((d) => !d.is_published).length;

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
          Study Materials Management
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Upload and manage secure Bug Bounty study documents. All uploaded materials remain private and require publication approval.
        </p>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 bg-[var(--card-bg)] border-[var(--border)]">
          <span className="text-xs text-[var(--text-muted)]">Total Documents</span>
          <p className="text-2xl font-bold font-mono mt-1 text-[var(--text-primary)]">{documents.length}</p>
        </Card>
        <Card className="p-4 bg-[var(--card-bg)] border-[var(--border)]">
          <span className="text-xs text-[var(--text-muted)]">Published</span>
          <p className="text-2xl font-bold font-mono mt-1 text-emerald-500">{totalPublished}</p>
        </Card>
        <Card className="p-4 bg-[var(--card-bg)] border-[var(--border)]">
          <span className="text-xs text-[var(--text-muted)]">Pending Review</span>
          <p className="text-2xl font-bold font-mono mt-1 text-amber-500">{totalPending}</p>
        </Card>
      </div>

      {/* Upload Section */}
      <Card className="p-6 bg-[var(--card-bg)] border-[var(--border)] space-y-4">
        <div className="flex items-center gap-2 text-base font-bold text-[var(--text-primary)]">
          <Upload className="w-5 h-5 text-[var(--accent-cyan)]" />
          <span>Upload New Study Material (PDF)</span>
        </div>

        {uploadError && (
          <div className="p-3 text-xs bg-red-950/40 border border-red-800 text-red-300 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{uploadError}</span>
          </div>
        )}

        {uploadSuccess && (
          <div className="p-3 text-xs bg-emerald-950/40 border border-emerald-800 text-emerald-300 rounded-lg flex items-center gap-2">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>{uploadSuccess}</span>
          </div>
        )}

        <form onSubmit={handleUploadSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                PDF File *
              </label>
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full text-xs text-[var(--text-primary)] file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[var(--accent-cyan)] file:text-[#090D14] hover:file:bg-[var(--accent-cyan-hover)] file:cursor-pointer"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                Display Title (Optional, defaults to filename)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 2FA Authentication Bypass Guide"
                className="w-full px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-subtle)] text-xs text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-cyan)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-subtle)] text-xs text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-cyan)]"
              >
                <option value="">Select Category...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                Difficulty Level
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-subtle)] text-xs text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-cyan)]"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
              Description / Notes
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of the vulnerability, methodology, or checklist..."
              className="w-full px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-subtle)] text-xs text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-cyan)]"
            />
          </div>

          <Button
            type="submit"
            disabled={isUploading || !file}
            size="sm"
            className="bg-[var(--accent-cyan)] text-[#090D14] hover:bg-[var(--accent-cyan-hover)] font-semibold gap-2"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Uploading & Parsing Pages...</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Upload Document</span>
              </>
            )}
          </Button>
        </form>
      </Card>

      {/* Materials Table */}
      <Card className="p-6 bg-[var(--card-bg)] border-[var(--border)] space-y-4">
        <h2 className="text-base font-bold text-[var(--text-primary)]">
          All Study Materials ({documents.length})
        </h2>

        {documents.length === 0 ? (
          <p className="text-xs text-[var(--text-secondary)] py-6 text-center">
            No study materials have been uploaded yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[var(--border)] text-[var(--text-muted)] uppercase tracking-wider font-mono">
                <tr>
                  <th className="pb-3 font-semibold">Title</th>
                  <th className="pb-3 font-semibold">Category</th>
                  <th className="pb-3 font-semibold text-center">Pages</th>
                  <th className="pb-3 font-semibold text-center">Status</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-[var(--surface-subtle)] transition-colors">
                    <td className="py-3 pr-4">
                      <div className="font-semibold text-[var(--text-primary)]">{doc.title}</div>
                      <div className="text-[10px] font-mono text-[var(--text-muted)] truncate max-w-xs">
                        {doc.original_filename}
                      </div>
                    </td>
                    <td className="py-3 text-[var(--text-secondary)]">
                      {doc.study_categories?.title || 'Uncategorized'}
                    </td>
                    <td className="py-3 text-center font-mono font-semibold">
                      {doc.page_count}
                    </td>
                    <td className="py-3 text-center">
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(doc.id, doc.is_published)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold transition-colors ${
                          doc.is_published
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
                        }`}
                      >
                        {doc.is_published ? (
                          <>
                            <CheckCircle className="w-3 h-3" /> Published
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3" /> Under Review
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-3 text-right space-x-2">
                      <Link
                        href={`/study-materials/bug-bounty/${doc.id}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 px-2 py-1 rounded border border-[var(--border)] hover:bg-[var(--surface-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Preview</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDeleteDocument(doc.id, doc.title)}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
