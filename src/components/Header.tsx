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
  Bookmark,
  ChevronDown,
} from 'lucide-react';
import { onSavedChange, localSavedService } from '../lib/saved';
import { ThemeToggle } from './theme/ThemeToggle';
import { GlobalSearchDialog } from './search/GlobalSearchDialog';
import { UserNavDropdown } from './navigation/UserNavDropdown';
import { CyberTubeLogo } from './ui/CyberTubeLogo';
import { useAuth } from '../lib/auth';

export function Header() {
  const pathname = usePathname();
  const [savedCount, setSavedCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [exploreMenuOpen, setExploreMenuOpen] = useState<string | null>(null);

  const { userEmail, userProfile, isAdmin, isAuthLoading } = useAuth();

  useEffect(() => {
    setMobileMenuOpen(false);
    setExploreMenuOpen(null);
    setSearchDialogOpen(false);
  }, [pathname]);

  // Standard global shortcuts: "/" (outside editable fields) or Ctrl/Cmd+K.
  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const editing = Boolean(
        target?.isContentEditable ||
        target?.closest('input, textarea, select, [contenteditable="true"]')
      );
      const shortcutK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
      const shortcutSlash = event.key === '/' && !editing && !event.metaKey && !event.ctrlKey && !event.altKey;
      if (shortcutK || shortcutSlash) {
        event.preventDefault();
        setSearchDialogOpen(true);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Escape key closes mobile menu & dropdown
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setExploreMenuOpen(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    setSavedCount(localSavedService.getSavedIds().length);
    const unsub = onSavedChange((ids) => {
      setSavedCount(ids.length);
    });
    return () => unsub();
  }, []);

  const groups = [
    { title: 'Learn', links: [['Courses','/courses'], ['Learning paths','/learning-paths'], ['Domains','/domains'], ['Skills','/skills'], ['Careers','/careers'], ['Certifications','/certifications']] },
    { title: 'Reference', links: [['Study library','/library'], ['Cheat sheets','/cheat-sheets'], ['Glossary','/glossary'], ['Ethics','/ethics'], ['Support ☕','/#support-cybertube']] },
  ];
  const navLink = (label: string, href: string) => (
    <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined}
      className="block rounded px-3 py-2 text-sm hover:bg-[var(--surface-subtle)] aria-[current=page]:font-bold"
      onClick={() => { setExploreMenuOpen(null); setMobileMenuOpen(false); }}>{label}</Link>
  );

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[var(--canvas)]/85 backdrop-blur-xl border-b border-[var(--border)] transition-colors shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
        <div className="container-max">
          <div className="flex items-center justify-between h-16 min-w-0">
            {/* Logo & Brand Identity */}
            <div className="flex items-center gap-4 lg:gap-8 min-w-0">
              <Link
                href="/"
                className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] rounded-lg p-1 flex-shrink-0"
              >
                <CyberTubeLogo size={32} showText={false} className="shrink-0" />
                <div className="flex items-baseline gap-1.5">
                  <span className="font-sans font-bold text-base tracking-tight text-[var(--text-primary)]">
                    CyberTube
                  </span>
                  <span className="text-[10px] font-mono text-[var(--accent-cyan)] font-semibold uppercase tracking-wider">
                    edu
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation Groups */}
              <nav className="hidden lg:flex items-center gap-1 min-w-0" aria-label="Main Navigation">
                {groups.map(group => <div key={group.title} className="relative" onBlur={event => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setExploreMenuOpen(null);
                }}>
                  <button type="button" className="flex items-center gap-1 px-3 py-2 text-sm" aria-expanded={exploreMenuOpen === group.title}
                    onClick={() => setExploreMenuOpen(exploreMenuOpen === group.title ? null : group.title)}>{group.title}<ChevronDown size={14} /></button>
                  {exploreMenuOpen === group.title && <div className="absolute left-0 w-44 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-1 shadow-lg">
                    {group.links.map(([label,href]) => navLink(label,href))}
                  </div>}
                </div>)}
                {navLink('Practice','/labs')}
                {navLink('Discover','/discover')}
              </nav>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Quick Search Trigger */}
              <button
                type="button"
                onClick={() => setSearchDialogOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-subtle)] text-[var(--text-muted)] text-xs hover:border-[var(--accent-cyan)] hover:text-[var(--text-primary)] transition-colors min-h-[38px]"
                
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Search cybersecurity...</span>
                <span className="xl:hidden">Search</span>
                <kbd className="px-1.5 py-0.5 rounded border border-[var(--border)] bg-[var(--canvas)] font-mono text-[10px]">
                  /
                </kbd>
              </button>

              {/* Bookmarks Link */}
              <Link
                href="/saved"
                className={`relative flex items-center justify-center p-2 rounded-lg border border-[var(--border)] bg-[var(--surface-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-cyan)] transition-colors min-w-[38px] min-h-[38px]`}
                aria-label={`Saved Resources (${savedCount})`}
              >
                <Bookmark className="w-4 h-4" />
                {savedCount > 0 && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-[var(--accent-cyan)] text-[#090D14] text-[10px] font-bold rounded-full min-w-[16px] text-center leading-tight">
                    {savedCount}
                  </span>
                )}
              </Link>

              {/* Theme Toggle */}
              <ThemeToggle className="min-w-[38px] min-h-[38px]" />

              {/* Authentication Status */}
              {isAuthLoading ? (
                <div className="h-[38px] w-8 sm:w-28 rounded-lg bg-[var(--surface-subtle)] animate-pulse border border-[var(--border)]" />
              ) : userEmail ? (
                <UserNavDropdown userEmail={userEmail} displayName={userProfile?.displayName} avatarUrl={userProfile?.avatarUrl} />
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[var(--accent-cyan)] hover:bg-[var(--accent-cyan-hover)] text-[#090D14] transition-colors min-h-[38px] shadow-sm"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Actions: Search + Theme + Drawer Trigger */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setSearchDialogOpen(true)}
                aria-label="Open search"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-[var(--text-primary)] hover:bg-[var(--surface-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)]"
              >
                <Search className="w-5 h-5" />
              </button>

              <ThemeToggle className="min-w-[44px] min-h-[44px]" />

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile navigation menu"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-[var(--text-primary)] hover:bg-[var(--surface-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)]"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-[var(--border)] bg-[var(--card-bg)] px-4 pt-3 pb-6 space-y-3">
            {groups.map(group => <div key={group.title}>
              <h2 className="px-3 text-sm font-semibold">{group.title}</h2>
              <div className="grid grid-cols-2">{group.links.map(([label,href]) => navLink(label,href))}</div>
            </div>)}
            {navLink('Practice','/labs')}
            {navLink('Discover','/discover')}
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--accent-rose)] hover:bg-[var(--surface-subtle)] min-h-[44px]"
              >
                <ShieldAlert className="w-4 h-4" />
                Admin Portal
              </Link>
            )}

            <div className="pt-3 border-t border-[var(--border)] space-y-2">
              <Link
                href="/saved"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-subtle)] min-h-[44px]"
              >
                <span className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-[var(--accent-cyan)]" />
                  Saved Resources
                </span>
                {savedCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-[var(--accent-cyan)] text-[#090D14]">
                    {savedCount}
                  </span>
                )}
              </Link>

              {isAuthLoading ? (
                <div className="h-10 rounded-lg bg-[var(--surface-subtle)] animate-pulse" />
              ) : userEmail ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-[var(--text-primary)] font-medium hover:bg-[var(--surface-subtle)] min-h-[44px]"
                  >
                    <User className="w-4 h-4 text-[var(--text-muted)]" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    href="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-[var(--text-secondary)] font-medium hover:bg-[var(--surface-subtle)] min-h-[44px]"
                  >
                    <Settings className="w-4 h-4 text-[var(--text-muted)]" />
                    <span>Account Settings</span>
                  </Link>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-[#090D14] bg-[var(--accent-cyan)] hover:bg-[var(--accent-cyan-hover)] min-h-[44px] shadow-sm"
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


