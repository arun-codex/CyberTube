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

const ALLOWED_EXACT_HOSTS = new Set([
  'avatars.githubusercontent.com',
  'lh3.googleusercontent.com',
  'github.com',
  'supabase.co',
]);

const ALLOWED_SUFFIX_DOMAINS = [
  '.supabase.co',
  '.googleusercontent.com',
];

export function isSafeHttpsUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    // Allow HTTP only for local development on localhost or 127.0.0.1
    if (parsed.protocol === 'http:') {
      return parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1';
    }
    // All remote URLs must be HTTPS
    if (parsed.protocol !== 'https:') {
      return false;
    }

    const host = parsed.hostname.toLowerCase();

    // 1. Exact match on approved hosts
    if (ALLOWED_EXACT_HOSTS.has(host)) {
      return true;
    }

    // 2. Strict dot-boundary suffix matching (e.g. `*.supabase.co`, `*.googleusercontent.com`)
    // Prevents lookalikes like supabase.co.attacker.example or attacker-supabase.co
    return ALLOWED_SUFFIX_DOMAINS.some((suffix) => host.endsWith(suffix));
  } catch {
    return false;
  }
}

export const isSafeAvatarUrl = isSafeHttpsUrl;

export function UserAvatar({
  customAvatarUrl,
  providerAvatarUrl,
  displayName,
  email,
  size = 40,
  className = '',
  priority = false,
}: UserAvatarProps) {
  // Avatar selection priority:
  // 1. User-uploaded custom image
  // 2. Current Google/GitHub provider picture
  // 3. Profile initial fallback
  const rawTargetUrl = customAvatarUrl || providerAvatarUrl;

  const [imageError, setImageError] = useState(false);
  const [prevTargetUrl, setPrevTargetUrl] = useState<string | null | undefined>(rawTargetUrl);

  // Synchronously reset imageError whenever target URL changes (new upload, refresh, or reset)
  if (rawTargetUrl !== prevTargetUrl) {
    setPrevTargetUrl(rawTargetUrl);
    setImageError(false);
  }

  // Compute fallback initial
  const initial = (displayName || email || 'P').trim().charAt(0).toUpperCase();

  const isCandidateValid = rawTargetUrl && isSafeAvatarUrl(rawTargetUrl);
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
