'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Shield,
  Search,
  Menu,
  X,
  User,
  ShieldAlert,
  LogIn,
  Settings,
  Award,
} from 'lucide-react';
import { onSavedChange, localSavedService } from '../lib/saved';
import { createClient } from '../lib/supabase/client';
import { ThemeToggle } from './theme/ThemeToggle';
import { GlobalSearchDialog } from './search/GlobalSearchDialog';
import { UserNavDropdown } from './navigation/UserNavDropdown';

export function Header() {
  const pathname = usePathname();
  const [savedCount, setSavedCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<{ displayName?: string | null; avatarUrl?: string | null } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Global '/' shortcut to open search
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is in an input or textarea
      if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)
      ) {
        e.preventDefault();
        setSearchDialogOpen(true);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  useEffect(() => {
    setSavedCount(localSavedService.getSavedIds().length);
    const unsub = onSavedChange((ids) => {
      setSavedCount(ids.length);
    });

    const supabase = createClient();
    if (supabase) {
      supabase.auth.getUser().then(({ data }) => {
        if (data?.user?.email) {
          setUserEmail(data.user.email);
          if (data.user.email.includes('admin') || data.user.email.includes('secops')) {
            setIsAdmin(true);
          }
          // Fetch profile details
          supabase
            .from('profiles')
            .select('display_name, avatar_url')
            .eq('id', data.user.id)
            .single()
            .then(({ data: profileData }: any) => {
              if (profileData) {
                setUserProfile({
                  displayName: profileData.display_name,
                  avatarUrl: profileData.avatar_url,
                });
              }
            });
        }
      });

      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user?.email) {
          setUserEmail(session.user.email);
          if (session.user.email.includes('admin') || session.user.email.includes('secops')) {
            setIsAdmin(true);
          }
        } else {
          setUserEmail(null);
          setUserProfile(null);
          setIsAdmin(false);
        }
      });

      return () => {
        unsub();
        authListener.subscription.unsubscribe();
      };
    }

    return unsub;
  }, []);

  const navLinks = [
    { label: 'Discover', href: '/discover' },
    { label: 'Courses', href: '/courses' },
    { label: 'Domains', href: '/domains' },
    { label: 'Saved', href: '/saved', badge: savedCount > 0 ? savedCount : null },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#0e0e17]/95 backdrop-blur-sm border-b border-[#e4e4ed] dark:border-[#26263b] transition-colors">
        <div className="container-max">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <div className="flex items-center gap-4 lg:gap-8">
              <Link
                href="/"
                className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#303055] dark:focus-visible:ring-[#6366f1] rounded-[4px] p-1"
              >
                <div className="w-8 h-8 rounded-[4px] bg-[#303055] dark:bg-[#6366f1] flex items-center justify-center text-white">
                  <Shield className="w-4 h-4 fill-white stroke-none" />
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-orbitron font-bold text-base tracking-tight text-[#303055] dark:text-[#f0f0f8]">
                    CyberTube
                  </span>
                  <span className="text-[11px] font-mono text-[#6b6b7b] uppercase tracking-wider">
                    edu
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-[#303055] dark:text-white bg-[#e8e8f2] dark:bg-[#1e1e30]'
                          : 'text-[#403f53] dark:text-[#c0c0d4] hover:text-[#303055] dark:hover:text-white hover:bg-[#f4f4f9] dark:hover:bg-[#141422]'
                      }`}
                    >
                      {link.label}
                      {link.badge !== null && link.badge !== undefined && (
                        <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-[4px] text-[10px] font-mono font-medium bg-[#303055] dark:bg-[#6366f1] text-white">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}

                {isAdmin && (
                  <Link
                    href="/admin"
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-sm font-medium transition-colors ${
                      pathname.startsWith('/admin')
                        ? 'text-[#984e4d] bg-[#f4f4f9] dark:bg-[#1c1c2c]'
                        : 'text-[#984e4d] hover:bg-[#f4f4f9] dark:hover:bg-[#1c1c2c]'
                    }`}
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Admin
                  </Link>
                )}
              </nav>
            </div>

            {/* Desktop Right Utilities */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Functional Search Button with clean subtle border and no heavy outline */}
              <button
                type="button"
                onClick={() => setSearchDialogOpen(true)}
                aria-label="Open search catalog dialog"
                className="flex items-center gap-2 px-3 py-1.5 rounded-[4px] text-xs font-mono text-[#6b6b7b] dark:text-[#8c8ca6] hover:text-[#303055] dark:hover:text-[#f0f0f8] bg-[#f4f4f9] dark:bg-[#141422] border border-[#e4e4ed] dark:border-[#26263b] hover:border-[#d2d2dc] dark:hover:border-[#383854] transition-colors focus:outline-none focus:ring-2 focus:ring-[#303055] dark:focus:ring-[#6366f1]"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search catalog...</span>
                <kbd className="inline-block px-1.5 py-0.2 text-[10px] font-mono rounded bg-white dark:bg-[#1e1e30] text-[#6b6b7b] dark:text-[#a0a0b8] border border-[#e4e4ed] dark:border-[#2e2e42]">
                  /
                </kbd>
              </button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Auth / Account Profile */}
              {userEmail ? (
                <UserNavDropdown
                  userEmail={userEmail}
                  displayName={userProfile?.displayName}
                  avatarUrl={userProfile?.avatarUrl}
                />
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-[4px] text-xs font-medium text-white bg-[#303055] dark:bg-[#6366f1] hover:bg-[#252542] dark:hover:bg-[#4f46e5] transition-colors min-h-[38px]"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Actions: Search + Theme + Drawer Trigger */}
            <div className="flex lg:hidden items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSearchDialogOpen(true)}
                aria-label="Open search"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-[4px] text-[#303055] dark:text-[#f0f0f8] hover:bg-[#f4f4f9] dark:hover:bg-[#141422] focus:outline-none focus:ring-2 focus:ring-[#303055]"
              >
                <Search className="w-5 h-5" />
              </button>

              <ThemeToggle className="min-w-[44px] min-h-[44px]" />

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile navigation menu"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-[4px] text-[#303055] dark:text-[#f0f0f8] hover:bg-[#f4f4f9] dark:hover:bg-[#141422] focus:outline-none focus:ring-2 focus:ring-[#303055]"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-[#e4e4ed] dark:border-[#26263b] bg-white dark:bg-[#0e0e17] px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-[4px] text-sm font-medium text-[#403f53] dark:text-[#c0c0d4] hover:text-[#303055] dark:hover:text-white hover:bg-[#f4f4f9] dark:hover:bg-[#141422]"
              >
                <span>{link.label}</span>
                {link.badge !== null && link.badge !== undefined && (
                  <span className="px-2 py-0.5 rounded-[4px] text-xs font-mono font-medium bg-[#303055] dark:bg-[#6366f1] text-white">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}

            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-[4px] text-sm font-medium text-[#984e4d] hover:bg-[#f4f4f9] dark:hover:bg-[#141422]"
              >
                <ShieldAlert className="w-4 h-4" />
                Admin Portal
              </Link>
            )}

            <div className="pt-2 border-t border-[#e4e4ed] dark:border-[#26263b] space-y-1">
              {userEmail ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-[4px] text-sm text-[#303055] dark:text-[#f0f0f8] font-medium hover:bg-[#f4f4f9] dark:hover:bg-[#141422]"
                  >
                    <User className="w-4 h-4 text-[#6b6b7b]" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    href="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-[4px] text-sm text-[#403f53] dark:text-[#c0c0d4] font-medium hover:bg-[#f4f4f9] dark:hover:bg-[#141422]"
                  >
                    <Settings className="w-4 h-4 text-[#6b6b7b]" />
                    <span>Account Settings</span>
                  </Link>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-[4px] text-sm font-medium text-white bg-[#303055] dark:bg-[#6366f1]"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In / Register
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Global Search Dialog Modal */}
      <GlobalSearchDialog
        isOpen={searchDialogOpen}
        onClose={() => setSearchDialogOpen(false)}
      />
    </>
  );
}
