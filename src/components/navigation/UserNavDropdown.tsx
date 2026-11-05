'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User, Settings, LogOut, ChevronDown, Award } from 'lucide-react';
import { logoutAction } from '@/app/actions/auth';
import { UserAvatar } from '@/components/ui/UserAvatar';

interface UserNavDropdownProps {
  userEmail: string;
  avatarUrl?: string | null;
  displayName?: string | null;
}

export function UserNavDropdown({ userEmail, avatarUrl, displayName }: UserNavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="User profile options menu"
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-[4px] text-xs font-medium text-[#303055] dark:text-[#f0f0f8] bg-[#f4f4f9] dark:bg-[#1c1c2c] hover:bg-[#e8e8f2] dark:hover:bg-[#252538] border border-[#e4e4ed] dark:border-[#2e2e42] transition-colors min-h-[38px] focus:outline-none focus:ring-2 focus:ring-[#303055] dark:focus:ring-[#6366f1]"
      >
        <UserAvatar
          customAvatarUrl={avatarUrl}
          displayName={displayName}
          email={userEmail}
          size={24}
          className="w-6 h-6 rounded-[3px]"
        />
        <span className="max-w-[120px] truncate hidden sm:inline-block">
          {displayName || userEmail}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-[#6b6b7b] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 rounded-[6px] bg-white dark:bg-[#141422] border border-[#e4e4ed] dark:border-[#2e2e42] shadow-xl py-1 z-50 divide-y divide-[#f4f4f9] dark:divide-[#1c1c2c]"
          role="menu"
          aria-orientation="vertical"
        >
          {/* Header Info */}
          <div className="px-3.5 py-2.5">
            <p className="text-xs font-semibold text-[#303055] dark:text-[#f0f0f8] truncate">
              {displayName || 'Practitioner'}
            </p>
            <p className="text-[11px] font-mono text-[#6b6b7b] truncate mt-0.5">
              {userEmail}
            </p>
          </div>

          {/* Links */}
          <div className="py-1">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-[#403f53] dark:text-[#c0c0d4] hover:text-[#303055] dark:hover:text-[#f0f0f8] hover:bg-[#f4f4f9] dark:hover:bg-[#1c1c2c] transition-colors"
              role="menuitem"
            >
              <User className="w-3.5 h-3.5 text-[#6b6b7b]" />
              <span>My Profile</span>
            </Link>
            <Link
              href="/account"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-[#403f53] dark:text-[#c0c0d4] hover:text-[#303055] dark:hover:text-[#f0f0f8] hover:bg-[#f4f4f9] dark:hover:bg-[#1c1c2c] transition-colors"
              role="menuitem"
            >
              <Settings className="w-3.5 h-3.5 text-[#6b6b7b]" />
              <span>Account Settings</span>
            </Link>
            <Link
              href="/saved"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-[#403f53] dark:text-[#c0c0d4] hover:text-[#303055] dark:hover:text-[#f0f0f8] hover:bg-[#f4f4f9] dark:hover:bg-[#1c1c2c] transition-colors"
              role="menuitem"
            >
              <Award className="w-3.5 h-3.5 text-[#6b6b7b]" />
              <span>Saved Bookmarks</span>
            </Link>
          </div>

          {/* Sign Out */}
          <div className="py-1">
            <form action={logoutAction}>
              <button
                type="submit"
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-[#984e4d] hover:bg-[#fbeaea] dark:hover:bg-[#2b1818] transition-colors text-left"
                role="menuitem"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
