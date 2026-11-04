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
} from 'lucide-react';
import { onSavedChange, localSavedService } from '../lib/saved';
import { createClient } from '../lib/supabase/client';

export function Header() {
  const pathname = usePathname();
  const [savedCount, setSavedCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

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
    { label: 'Courses', href: '/courses' },
    { label: 'Domains', href: '/domains' },
    { label: 'Saved', href: '/saved', badge: savedCount > 0 ? savedCount : null },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-[#e4e4ed]">
      <div className="container-max">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4 lg:gap-8">
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#303055] rounded-[4px] p-1"
            >
              <div className="w-8 h-8 rounded-[4px] bg-[#303055] flex items-center justify-center text-white">
                <Shield className="w-4 h-4 fill-white stroke-none" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-orbitron font-bold text-base tracking-tight text-[#303055]">
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
                        ? 'text-[#303055] bg-[#e8e8f2]'
                        : 'text-[#403f53] hover:text-[#303055] hover:bg-[#f4f4f9]'
                    }`}
                  >
                    {link.label}
                    {link.badge !== null && link.badge !== undefined && (
                      <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-[4px] text-[10px] font-mono font-medium bg-[#303055] text-white">
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
                      ? 'text-[#984e4d] bg-[#f4f4f9]'
                      : 'text-[#984e4d] hover:bg-[#f4f4f9]'
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
            <Link
              href="/discover"
              className="flex items-center gap-2 px-3 py-1.5 rounded-[4px] text-xs font-mono text-[#6b6b7b] hover:text-[#303055] bg-[#f4f4f9] border border-[#e4e4ed] hover:border-[#d2d2dc] transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search resources...</span>
              <kbd className="hidden lg:inline-block px-1 py-0.2 text-[10px] font-mono rounded bg-white text-[#6b6b7b] border border-[#e4e4ed]">
                /
              </kbd>
            </Link>

            {/* Auth / Account Profile */}
            {userEmail ? (
              <Link
                href="/account"
                className="flex items-center gap-2 px-3 py-1.5 rounded-[4px] text-xs font-medium text-[#303055] bg-[#f4f4f9] hover:bg-[#e8e8f2] border border-[#e4e4ed] transition-colors"
              >
                <div className="w-4 h-4 rounded-full bg-[#303055] text-white flex items-center justify-center font-mono text-[9px]">
                  {userEmail.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[130px] truncate">{userEmail}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-[4px] text-xs font-medium text-white bg-[#303055] hover:bg-[#252542] transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Trigger (min 44x44 touch target) */}
          <div className="flex lg:hidden items-center gap-1">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile navigation menu"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-[4px] text-[#303055] hover:bg-[#f4f4f9] focus:outline-none focus:ring-2 focus:ring-[#303055]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#e4e4ed] bg-white px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-[4px] text-sm font-medium text-[#403f53] hover:text-[#303055] hover:bg-[#f4f4f9]"
            >
              <span>{link.label}</span>
              {link.badge !== null && link.badge !== undefined && (
                <span className="px-2 py-0.5 rounded-[4px] text-xs font-mono font-medium bg-[#303055] text-white">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}

          {isAdmin && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-[4px] text-sm font-medium text-[#984e4d] hover:bg-[#f4f4f9]"
            >
              <ShieldAlert className="w-4 h-4" />
              Admin Portal
            </Link>
          )}

          <div className="pt-2 border-t border-[#e4e4ed]">
            {userEmail ? (
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-[4px] text-sm text-[#303055] font-medium bg-[#f4f4f9]"
              >
                <User className="w-4 h-4 text-[#6b6b7b]" />
                <span className="truncate">Account ({userEmail})</span>
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-[4px] text-sm font-medium text-white bg-[#303055]"
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
