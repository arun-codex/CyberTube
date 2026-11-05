'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface UserAvatarProps {
  customAvatarUrl?: string | null;
  providerAvatarUrl?: string | null;
  displayName?: string | null;
  email?: string | null;
  size?: number; // size in px, default 40
  className?: string;
  priority?: boolean;
}

const ALLOWED_REMOTE_HOSTS = [
  'avatars.githubusercontent.com',
  'lh3.googleusercontent.com',
  'googleusercontent.com',
  'github.com',
  'supabase.co',
];

function isSafeHttpsUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'http:' && (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1')) {
      return true;
    }
    if (parsed.protocol !== 'https:') return false;
    return ALLOWED_REMOTE_HOSTS.some(
      (host) => parsed.hostname === host || parsed.hostname.endsWith(`.${host}`)
    );
  } catch {
    return false;
  }
}

export function UserAvatar({
  customAvatarUrl,
  providerAvatarUrl,
  displayName,
  email,
  size = 40,
  className = '',
  priority = false,
}: UserAvatarProps) {
  const [imageError, setImageError] = useState(false);

  // Compute fallback initial
  const initial = (displayName || email || 'P').trim().charAt(0).toUpperCase();

  // Avatar selection priority:
  // 1. User-uploaded custom image
  // 2. Current Google/GitHub provider picture
  // 3. Profile initial fallback
  const rawTargetUrl = customAvatarUrl || providerAvatarUrl;
  const isCandidateValid = rawTargetUrl && isSafeHttpsUrl(rawTargetUrl);
  const showImage = !imageError && Boolean(isCandidateValid);

  if (showImage && rawTargetUrl) {
    return (
      <div
        className={`relative inline-block rounded-[4px] overflow-hidden border border-[#e4e4ed] dark:border-[#26263b] bg-[#141424] shrink-0 ${className}`}
        style={{ width: size, height: size }}
      >
        <Image
          src={rawTargetUrl}
          alt={displayName || email || 'User Avatar'}
          width={size}
          height={size}
          priority={priority}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
          unoptimized // Supports signed Supabase or remote OAuth URLs without extra domain config
        />
      </div>
    );
  }

  // Fallback Initials Display
  return (
    <div
      className={`inline-flex items-center justify-center rounded-[4px] bg-[#303055] dark:bg-[#6366f1] text-white font-mono font-bold shrink-0 border border-[#e4e4ed] dark:border-[#26263b] select-none ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: Math.max(11, Math.round(size * 0.42)),
      }}
      aria-label={displayName || email || 'User Initials'}
    >
      {initial}
    </div>
  );
}

