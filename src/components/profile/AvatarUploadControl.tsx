'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, RotateCcw, AlertCircle, Check, Loader2, Image as ImageIcon } from 'lucide-react';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { dispatchAvatarUpdated, AVATAR_UPDATED_EVENT, AvatarUpdatedDetail } from '@/lib/avatar';

interface AvatarUploadControlProps {
  initialAvatarUrl?: string | null;
  providerAvatarUrl?: string | null;
  displayName?: string | null;
  email?: string | null;
  onAvatarUpdated?: (url: string | null) => void;
}

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export function AvatarUploadControl({
  initialAvatarUrl,
  providerAvatarUrl,
  displayName,
  email,
  onAvatarUpdated,
}: AvatarUploadControlProps) {
  const [currentAvatarUrl, setCurrentAvatarUrl] = useState<string | null>(initialAvatarUrl || null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state if initialAvatarUrl changes
  useEffect(() => {
    if (initialAvatarUrl) {
      setCurrentAvatarUrl(initialAvatarUrl);
    }
  }, [initialAvatarUrl]);

  // If no avatar was passed in props, query /api/user/avatar to resolve saved avatar_path
  useEffect(() => {
    if (!currentAvatarUrl && !initialAvatarUrl) {
      fetch('/api/user/avatar', { cache: 'no-store' })
        .then((res) => {
          if (res.ok) return res.json();
          return null;
        })
        .then((data) => {
          if (data?.avatarUrl) {
            setCurrentAvatarUrl(data.avatarUrl);
          }
        })
        .catch(() => {});
    }
  }, [currentAvatarUrl, initialAvatarUrl]);

  // Listen for external avatar updates
  useEffect(() => {
    const handleAvatarUpdated = (e: Event) => {
      const customEvent = e as CustomEvent<AvatarUpdatedDetail>;
      if (customEvent.detail?.avatarUrl !== undefined) {
        setCurrentAvatarUrl(customEvent.detail.avatarUrl);
      }
    };
    window.addEventListener(AVATAR_UPDATED_EVENT, handleAvatarUpdated);
    return () => window.removeEventListener(AVATAR_UPDATED_EVENT, handleAvatarUpdated);
  }, []);

  // File selection validation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setSuccess(null);

    const file = e.target.files?.[0];
    if (!file) return;

    // 1. File size check
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setError(`File size (${(file.size / (1024 * 1024)).toFixed(1)} MB) exceeds 5 MB limit.`);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // 2. MIME type check
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      setError('Only JPEG, PNG, and WebP image formats are accepted.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // 3. Client preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleUpload = async () => {
    if (!fileInputRef.current?.files?.[0]) return;
    const file = fileInputRef.current.files[0];

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Create FormData to send to server action
      const formData = new FormData();
      formData.append('avatar', file);

      const res = await fetch('/api/user/avatar', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        if (res.status === 503) {
          throw new Error('Avatar cloud storage is currently being initialized in the database. Please try again shortly or use your provider avatar.');
        }
        throw new Error(data.error || 'Failed to upload image.');
      }

      setCurrentAvatarUrl(data.avatarUrl);
      setPreviewUrl(null);
      setSuccess('Profile picture updated successfully.');

      // Broadcast update across the entire app
      dispatchAvatarUpdated(data.avatarUrl);
      if (onAvatarUpdated) onAvatarUpdated(data.avatarUrl);
    } catch (err: any) {
      setError(err?.message || 'Avatar upload service is currently offline.');
    } finally {
      setLoading(false);
    }
  };

  const handleRestoreProvider = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('/api/user/avatar', {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to reset avatar.');

      setCurrentAvatarUrl(null);
      setPreviewUrl(null);
      setSuccess('Restored OAuth provider picture.');

      // Broadcast reset across the entire app
      dispatchAvatarUpdated(null);
      if (onAvatarUpdated) onAvatarUpdated(null);
    } catch (err: any) {
      setError(err?.message || 'Failed to restore default.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 rounded-[6px] border border-[#e4e4ed] dark:border-[#26263b] bg-[#f4f4f9] dark:bg-[#141422]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Avatar display with priority */}
          <UserAvatar
            customAvatarUrl={previewUrl || currentAvatarUrl}
            providerAvatarUrl={providerAvatarUrl}
            displayName={displayName}
            email={email}
            size={64}
            className="ring-2 ring-[#e4e4ed] dark:ring-[#26263b]"
          />
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#303055] dark:text-[#f0f0f8]">
              Profile Picture
            </h4>
            <p className="text-[11px] text-[#6b6b7b] dark:text-[#8c8ca6] mt-0.5">
              JPG, PNG, or WebP. Max 5 MB.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="hidden"
            id="avatar-file-upload"
          />

          {!previewUrl ? (
            <label
              htmlFor="avatar-file-upload"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[4px] bg-white dark:bg-[#1e1e30] border border-[#e4e4ed] dark:border-[#26263b] hover:border-[#303055] dark:hover:border-[#6366f1] text-xs font-mono text-[#303055] dark:text-[#f0f0f8] cursor-pointer transition-colors min-h-[38px]"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Choose Photo</span>
            </label>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleUpload}
                disabled={loading}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[4px] bg-[#303055] dark:bg-[#6366f1] text-white text-xs font-mono transition-colors disabled:opacity-50 min-h-[38px]"
              >
                {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                <span>Save Upload</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setPreviewUrl(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="p-2 rounded-[4px] bg-white dark:bg-[#1e1e30] border border-[#e4e4ed] dark:border-[#26263b] text-[#6b6b7b] hover:text-[#984e4d] min-h-[38px]"
                aria-label="Cancel preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {currentAvatarUrl && !previewUrl && (
            <button
              type="button"
              onClick={handleRestoreProvider}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[4px] bg-white dark:bg-[#1e1e30] border border-[#e4e4ed] dark:border-[#26263b] hover:border-[#984e4d] text-xs font-mono text-[#984e4d] transition-colors min-h-[38px]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Picture</span>
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-2.5 bg-[#fbeaea] dark:bg-[#341818] border border-[#e8b5b5] dark:border-[#6a2929] text-[#984e4d] dark:text-[#f2a5a5] text-xs font-mono rounded-[4px]">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 p-2.5 bg-[#e8f5e9] dark:bg-[#132d18] border border-[#a5d6a7] dark:border-[#2e7d32] text-[#2e7d32] dark:text-[#a5d6a7] text-xs font-mono rounded-[4px]">
          <Check className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}
    </div>
  );
}
