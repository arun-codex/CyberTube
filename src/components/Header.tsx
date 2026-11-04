'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Shield,
  Search,
  Bookmark,
  Sun,
  Moon,
  Menu,
  X,
  User,
  ShieldAlert,
  LogIn,
} from 'lucide-react';
import { onSavedChange, localSavedService } from '../lib/saved';
import { toggleTheme } from '../lib/theme';
import { createClient } from '../lib/supabase/client';

export function Header() {
  const pathname = usePathname();
  const [savedCount, setSavedCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // 1. Initial saved count
    setSavedCount(localSavedService.getSavedIds().length);

    // 2. Listen to saved events
    const unsub = onSavedChange((ids) => {
      setSavedCount(ids.length);
    });

    // 3. Supabase Auth state
    const supabase = createClient();
    if (supabase) {
      supabase.auth.getUser().then(({ data }) => {
        if (data?.user?.email) {
          setUserEmail(data.user.email);
          // Check simulated/env admin email if present
          if (data.user.email.includes('admin') || data.user.email.includes('secops')) {
            setIsAdmin(true);
          }
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
    { label: 'Domains', href: '/domains' },
    { label: 'Saved', href: '/saved', badge: savedCount > 0 ? savedCount : null },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-bg-surface/85 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-slate-950 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
                <Shield className="w-5 h-5 fill-slate-950 stroke-none" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight text-text-primary leading-none">
                    Cyber<span className="text-emerald-400">Tube</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Phase 2
                  </span>
                </div>
                <span className="text-[10px] text-text-muted tracking-tight font-medium">
                  Security Learning Platform
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-emerald-400 bg-emerald-500/10'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-subtle'
                    }`}
                  >
                    {link.label}
                    {link.badge !== null && link.badge !== undefined && (
                      <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold bg-emerald-500 text-slate-950">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}

              {isAdmin && (
                <Link
                  href="/admin"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    pathname.startsWith('/admin')
                      ? 'text-red-400 bg-red-500/10'
                      : 'text-red-400/80 hover:text-red-400 hover:bg-red-500/10'
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Admin
                </Link>
              )}
            </nav>
          </div>

          {/* Desktop Right Utilities */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/discover"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-text-muted hover:text-text-primary bg-bg-card border border-border-subtle hover:border-border-strong transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search resources...</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded bg-bg-subtle text-text-muted border border-border-subtle">
                /
              </kbd>
            </Link>

            {/* Auth / Account Profile */}
            {userEmail ? (
              <Link
                href="/account"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-[10px]">
                  {userEmail.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[120px] truncate">{userEmail}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In
              </Link>
            )}

            {/* Theme Toggle */}
            <button
              onClick={() => toggleTheme()}
              aria-label="Toggle visual theme"
              className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-subtle border border-transparent hover:border-border-subtle transition-colors"
            >
              <Sun className="w-4 h-4 hidden dark:block" />
              <Moon className="w-4 h-4 block dark:hidden" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => toggleTheme()}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-text-muted hover:text-text-primary"
            >
              <Sun className="w-4 h-4 hidden dark:block" />
              <Moon className="w-4 h-4 block dark:hidden" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile navigation menu"
              className="p-2 rounded-lg text-text-secondary hover:text-text-primary focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border-subtle bg-bg-surface px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-base font-medium text-text-secondary hover:text-text-primary hover:bg-bg-subtle"
            >
              <span>{link.label}</span>
              {link.badge !== null && link.badge !== undefined && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500 text-slate-950">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}

          {isAdmin && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-semibold text-red-400 hover:bg-red-500/10"
            >
              <ShieldAlert className="w-4 h-4" />
              Admin Portal
            </Link>
          )}

          <div className="pt-3 border-t border-border-subtle">
            {userEmail ? (
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white font-medium bg-slate-800"
              >
                <User className="w-4 h-4 text-emerald-400" />
                <span>Account ({userEmail})</span>
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30"
              >
                <LogIn className="w-4 h-4" />
                Sign In / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
