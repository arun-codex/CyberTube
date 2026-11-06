'use client';

// src/components/discovery/InterestSelector.tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Check, LogIn, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { TopicSummary } from "@/lib/discovery/discovery-types";

interface InterestSelectorProps {
  onInterestsChange?: (interests: string[]) => void;
}

export default function InterestSelector({ onInterestsChange }: InterestSelectorProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [topics, setTopics] = useState<TopicSummary[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // 1. Observe Supabase auth state
  useEffect(() => {
    const supabase = createClient();
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getUser().then(({ data }: { data: any }) => {
      if (data?.user?.id) {
        setUserId(data.user.id);
      }
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setUserId(session?.user?.id ?? null);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // 2. Fetch all enabled topics
  useEffect(() => {
    async function loadTopics() {
      try {
        const res = await fetch("/api/discover/topics");
        if (!res.ok) throw new Error("Failed to load discovery topics");
        const data = await res.json();
        setTopics(data.topics || []);
      } catch (err: any) {
        setError(err.message || "Failed to load topics");
      }
    }
    loadTopics();
  }, []);

  // 3. Fetch user's saved interests when user logs in
  useEffect(() => {
    if (!userId) {
      setSelectedIds(new Set());
      return;
    }

    async function loadInterests() {
      try {
        const res = await fetch("/api/discover/interests");
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data.interests)) {
          setSelectedIds(new Set(data.interests));
          if (onInterestsChange) {
            onInterestsChange(data.interests);
          }
        }
      } catch (err) {
        // silent fail on initial interest query
      }
    }
    loadInterests();
  }, [userId, onInterestsChange]);

  // 4. Toggle follow / unfollow with optimistic update and rollback on failure
  const toggleTopic = async (topicIdOrSlug: string) => {
    if (!userId) {
      setError("Please sign in to follow topics and personalize your feed.");
      return;
    }

    setError(null);
    setSuccessMessage(null);

    const previousSet = new Set(selectedIds);
    const newSet = new Set(selectedIds);

    if (newSet.has(topicIdOrSlug)) {
      newSet.delete(topicIdOrSlug);
    } else {
      newSet.add(topicIdOrSlug);
    }

    // Optimistic UI update
    setSelectedIds(newSet);
    if (onInterestsChange) {
      onInterestsChange(Array.from(newSet));
    }

    setSaving(true);
    try {
      const res = await fetch("/api/discover/interests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interests: Array.from(newSet) }),
      });

      if (!res.ok) {
        throw new Error("Failed to persist topic preferences.");
      }

      const data = await res.json();
      if (Array.isArray(data.interests)) {
        setSelectedIds(new Set(data.interests));
      }
      setSuccessMessage("Preferences updated.");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      // Rollback on network or server error
      setSelectedIds(previousSet);
      if (onInterestsChange) {
        onInterestsChange(Array.from(previousSet));
      }
      setError(err.message || "Failed to update preferences. Reverted.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6 space-x-2 text-xs font-mono text-[#64748B] dark:text-[#9BA8B7]">
        <Loader2 className="w-4 h-4 animate-spin text-[#0E7490] dark:text-[#22D3EE]" />
        <span>Loading topics...</span>
      </div>
    );
  }

  return (
    <div className="rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e4e4ed] dark:border-[#243044] pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#0E7490] dark:text-[#22D3EE]" />
          <h3 className="font-rajdhani text-lg font-bold text-[#0F172A] dark:text-[#E6EDF3] tracking-tight">
            Follow Your Technical Interests
          </h3>
        </div>
        {saving && (
          <span className="flex items-center gap-1 text-[11px] font-mono text-[#0E7490] dark:text-[#22D3EE]">
            <Loader2 className="w-3 h-3 animate-spin" /> Saving...
          </span>
        )}
        {successMessage && (
          <span className="text-[11px] font-mono text-[#16A34A] dark:text-[#4ADE80]">
            {successMessage}
          </span>
        )}
      </div>

      {!userId && (
        <div className="flex items-center justify-between p-3 rounded-[6px] bg-[#f8fafc] dark:bg-[#1A2433] border border-[#e2e8f0] dark:border-[#2E3C51] text-xs">
          <span className="text-[#475569] dark:text-[#94A3B8]">
            Sign in to save your followed topics across devices and power your <strong>For You</strong> feed.
          </span>
          <Link
            href="/login?redirect=/discover"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-[#0E7490] hover:bg-[#0891B2] text-white font-mono text-xs transition-colors shrink-0"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </Link>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-[6px] bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-xs text-red-700 dark:text-red-300">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex flex-wrap gap-2 pt-1">
        {topics.map((topic) => {
          const isSelected = selectedIds.has(topic.id) || selectedIds.has(topic.slug);
          return (
            <button
              key={topic.id}
              type="button"
              onClick={() => toggleTopic(topic.id)}
              disabled={saving}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-mono transition-all duration-150 border ${
                isSelected
                  ? "bg-[#0E7490] dark:bg-[#22D3EE] text-white dark:text-[#0B1018] border-[#0E7490] dark:border-[#22D3EE] font-medium shadow-xs"
                  : "bg-[#F8FAFC] dark:bg-[#16202E] text-[#334155] dark:text-[#94A3B8] border-[#E2E8F0] dark:border-[#26354A] hover:border-[#0E7490] dark:hover:border-[#22D3EE]"
              }`}
            >
              {isSelected ? (
                <Check className="w-3 h-3 text-white dark:text-[#0B1018]" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] dark:bg-[#64748B]" />
              )}
              <span>{topic.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
