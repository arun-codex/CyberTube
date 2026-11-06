'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { AVATAR_UPDATED_EVENT, AvatarUpdatedDetail } from '@/lib/avatar';

export interface UserProfile {
  displayName?: string | null;
  avatarUrl?: string | null;
}

export interface AuthContextValue {
  user: User | null;
  userId: string | null;
  userEmail: string | null;
  userProfile: UserProfile | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  isSigningIn: boolean;
  isAdmin: boolean;
  authError: string | null;
  signInWithPassword: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [supabase] = useState(() => (typeof window !== 'undefined' ? createClient() : null));
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Sequence counter preventing asynchronous profile requests from an old account
  // overwriting a newer account's profile state
  const profileRequestIdRef = useRef<number>(0);
  const isMountedRef = useRef<boolean>(true);

  const determineIsAdmin = useCallback((email?: string | null): boolean => {
    if (!email) return false;
    const lower = email.toLowerCase();
    return lower.includes('admin') || lower.includes('secops');
  }, []);

  /**
   * Fetches profile data from `profiles` table and `/api/user/avatar`, safely guarded
   * against account-switch race conditions.
   */
  const fetchProfileForUser = useCallback(
    async (
      targetUserId: string,
      targetEmail?: string | null,
      targetMetadata?: { display_name?: string; name?: string } | null
    ) => {
      const currentRequestId = ++profileRequestIdRef.current;

      // Seed optimistic profile immediately using metadata or email prefix
      const initialDisplayName =
        targetMetadata?.display_name ||
        targetMetadata?.name ||
        (targetEmail ? targetEmail.split('@')[0] : 'Practitioner');

      setUserProfile({
        displayName: initialDisplayName,
        avatarUrl: null,
      });

      if (!supabase) return;

      try {
        const { data: profileData } = await (supabase
          .from('profiles') as any)
          .select('display_name, avatar_url')
          .eq('id', targetUserId)
          .single();

        if (!isMountedRef.current || profileRequestIdRef.current !== currentRequestId) {
          return;
        }

        const resolvedDisplayName = profileData?.display_name || initialDisplayName;

        if (profileData) {
          setUserProfile({
            displayName: resolvedDisplayName,
            avatarUrl: profileData.avatar_url || null,
          });
        }

        // Fetch fresh signed avatar URL from /api/user/avatar
        const avatarRes = await fetch('/api/user/avatar', { cache: 'no-store' });
        if (!isMountedRef.current || profileRequestIdRef.current !== currentRequestId) {
          return;
        }

        if (avatarRes.ok) {
          const avatarJson = await avatarRes.json();
          if (
            avatarJson?.avatarUrl !== undefined &&
            profileRequestIdRef.current === currentRequestId
          ) {
            setUserProfile({
              displayName: resolvedDisplayName,
              avatarUrl: avatarJson.avatarUrl,
            });
          }
        }
      } catch {
        // Non-blocking on network / profile errors
      }
    },
    [supabase]
  );

  const refreshProfile = useCallback(async () => {
    if (userId) {
      await fetchProfileForUser(userId, userEmail, user?.user_metadata);
    }
  }, [userId, userEmail, user, fetchProfileForUser]);

  const clearError = useCallback(() => {
    setAuthError(null);
  }, []);

  /**
   * Canonical sign in method using client Supabase auth.
   * Emits SIGNED_IN event to all browser subscribers, immediately updating header
   * and notifying ProgressProvider without manual refresh.
   */
  const signInWithPassword = useCallback(
    async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
      if (!supabase) {
        const err = 'Authentication service is not configured.';
        setAuthError(err);
        return { success: false, error: err };
      }

      setIsSigningIn(true);
      setAuthError(null);

      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          setAuthError(error.message);
          setIsSigningIn(false);
          return { success: false, error: error.message };
        }

        if (data?.user) {
          setUser(data.user);
          setUserId(data.user.id);
          setUserEmail(data.user.email || email.trim());
          setIsAuthenticated(true);
          setIsAdmin(determineIsAdmin(data.user.email || email.trim()));
          setIsAuthLoading(false);
          // Eagerly initiate profile fetch with metadata display name
          fetchProfileForUser(
            data.user.id,
            data.user.email || email.trim(),
            data.user.user_metadata
          );
        }

        setIsSigningIn(false);
        return { success: true };
      } catch (err: any) {
        const msg = err?.message || 'Failed to sign in. Please try again.';
        setAuthError(msg);
        setIsSigningIn(false);
        return { success: false, error: msg };
      }
    },
    [supabase, determineIsAdmin, fetchProfileForUser]
  );

  /**
   * Canonical sign out method using client Supabase auth.
   * Immediately clears in-memory state and notifies subscribers without requiring reload.
   */
  const signOut = useCallback(async () => {
    profileRequestIdRef.current++;
    setUser(null);
    setUserId(null);
    setUserEmail(null);
    setUserProfile(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    setAuthError(null);

    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('[AuthProvider] Client signOut error:', err);
      }
    }
  }, [supabase]);

  // Bootstrap session and subscribe to auth events
  useEffect(() => {
    isMountedRef.current = true;

    if (!supabase) {
      setIsAuthLoading(false);
      return;
    }

    // 1. Initial session check via getUser()
    supabase.auth
      .getUser()
      .then(({ data, error }) => {
        if (!isMountedRef.current) return;
        if (!error && data?.user) {
          setUser(data.user);
          setUserId(data.user.id);
          setUserEmail(data.user.email || null);
          setIsAuthenticated(true);
          setIsAdmin(determineIsAdmin(data.user.email));
          setIsAuthLoading(false);
          fetchProfileForUser(data.user.id, data.user.email, data.user.user_metadata);
        } else {
          setUser(null);
          setUserId(null);
          setUserEmail(null);
          setUserProfile(null);
          setIsAuthenticated(false);
          setIsAdmin(false);
          setIsAuthLoading(false);
        }
      })
      .catch(() => {
        if (isMountedRef.current) {
          setIsAuthLoading(false);
        }
      });

    // 2. Subscribe to auth changes
    const { data: authSub } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isMountedRef.current) return;

      switch (event) {
        case 'SIGNED_IN':
        case 'INITIAL_SESSION': {
          if (session?.user) {
            setUser(session.user);
            setUserId(session.user.id);
            setUserEmail(session.user.email || null);
            setIsAuthenticated(true);
            setIsAdmin(determineIsAdmin(session.user.email));
            setIsAuthLoading(false);
            fetchProfileForUser(
              session.user.id,
              session.user.email,
              session.user.user_metadata
            );
          } else if (event === 'INITIAL_SESSION') {
            setIsAuthLoading(false);
          }
          break;
        }
        case 'SIGNED_OUT': {
          profileRequestIdRef.current++;
          setUser(null);
          setUserId(null);
          setUserEmail(null);
          setUserProfile(null);
          setIsAuthenticated(false);
          setIsAdmin(false);
          setIsAuthLoading(false);
          break;
        }
        case 'TOKEN_REFRESHED': {
          if (session?.user) {
            setUser(session.user);
            // Do not toggle loading or re-fetch profile on token refresh
          }
          break;
        }
        case 'USER_UPDATED': {
          if (session?.user) {
            setUser(session.user);
            setUserEmail(session.user.email || null);
            fetchProfileForUser(
              session.user.id,
              session.user.email,
              session.user.user_metadata
            );
          }
          break;
        }
        case 'PASSWORD_RECOVERY': {
          if (session?.user) {
            setUser(session.user);
            setUserId(session.user.id);
            setUserEmail(session.user.email || null);
            setIsAuthenticated(true);
            setIsAuthLoading(false);
          }
          break;
        }
      }
    });

    // 3. Listen for avatar updates
    const handleAvatarUpdated = (e: Event) => {
      const customEvent = e as CustomEvent<AvatarUpdatedDetail>;
      if (customEvent.detail?.avatarUrl !== undefined) {
        setUserProfile((prev) => ({
          displayName: prev?.displayName || null,
          avatarUrl: customEvent.detail.avatarUrl,
        }));
      }
    };
    window.addEventListener(AVATAR_UPDATED_EVENT, handleAvatarUpdated);

    return () => {
      isMountedRef.current = false;
      authSub?.subscription?.unsubscribe();
      window.removeEventListener(AVATAR_UPDATED_EVENT, handleAvatarUpdated);
    };
  }, [supabase, determineIsAdmin, fetchProfileForUser]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      userId,
      userEmail,
      userProfile,
      isAuthenticated,
      isAuthLoading,
      isSigningIn,
      isAdmin,
      authError,
      signInWithPassword,
      signOut,
      refreshProfile,
      clearError,
    }),
    [
      user,
      userId,
      userEmail,
      userProfile,
      isAuthenticated,
      isAuthLoading,
      isSigningIn,
      isAdmin,
      authError,
      signInWithPassword,
      signOut,
      refreshProfile,
      clearError,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const defaultGuestAuth: AuthContextValue = {
  user: null,
  userId: null,
  userEmail: null,
  userProfile: null,
  isAuthenticated: false,
  isAuthLoading: false,
  isSigningIn: false,
  isAdmin: false,
  authError: null,
  signInWithPassword: async () => ({
    success: false,
    error: 'Authentication provider is not mounted.',
  }),
  signOut: async () => {},
  refreshProfile: async () => {},
  clearError: () => {},
};

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  return context || defaultGuestAuth;
}
