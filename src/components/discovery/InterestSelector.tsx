// src/components/discovery/InterestSelector.tsx
import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

interface Topic {
  id: string;
  name: string;
}

export default function InterestSelector({ onInterestsChange }: { onInterestsChange?: () => void }) {
  // Supabase client for browser side
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const [sessionUserId, setSessionUserId] = useState<string | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load auth session (user id) on mount
  useEffect(() => {
    async function loadSession() {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      setSessionUserId(data.user?.id ?? null);
    }
    loadSession();
  }, []);

  // Fetch available topics
  useEffect(() => {
    async function load() {
      try {
        const r = await fetch("/api/discover/topics");
        if (!r.ok) throw new Error("Failed to load topics");
        const d = await r.json();
        setTopics(d.topics ?? []);
      } catch (e: any) {
        setError(e.message);
      }
    }
    load();
  }, []);

  // Fetch user interests when we have a user id
  useEffect(() => {
    if (!sessionUserId) return;
    async function load() {
      try {
        const r = await fetch("/api/discover/interests");
        if (!r.ok) throw new Error("Failed to load interests");
        const d = await r.json();
        setSelected(new Set(d.interests ?? []));
        if (onInterestsChange) onInterestsChange();
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [sessionUserId]);

  const toggle = async (id: string) => {
    if (!sessionUserId) {
      setError("Sign in required to modify interests");
      return;
    }
    const newSet = new Set(selected);
    if (newSet.has(id)) newSet.delete(id); else newSet.add(id);
    setSelected(newSet);
    try {
      const r = await fetch("/api/discover/interests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interests: Array.from(newSet) }),
      });
      if (!r.ok) throw new Error("Failed to save interests");
    } catch (e: any) {
      setError(e.message);
    }
  };

  if (loading) return <div className="py-4 text-center">Loading…</div>;
  if (error) return <div className="py-4 text-center text-red-600">{error}</div>;

  return (
    <div className="grid grid-cols-2 gap-2">
      {topics.map((t) => (
        <label key={t.id} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selected.has(t.id)}
            onChange={() => toggle(t.id)}
            className="h-4 w-4"
          />
          <span>{t.name}</span>
        </label>
      ))}
    </div>
  );
}
