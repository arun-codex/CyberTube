'use client';

import React, { useState, useEffect } from 'react';
import { Bookmark, Check } from 'lucide-react';
import { localSavedService, onSavedChange } from '../../../src/lib/saved';

interface Props {
  resourceId: string;
}

export const ResourceDetailBookmarkButton: React.FC<Props> = ({ resourceId }) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsSaved(localSavedService.isSaved(resourceId));
    const unsub = onSavedChange((ids) => setIsSaved(ids.includes(resourceId)));
    return unsub;
  }, [resourceId]);

  const handleToggle = () => {
    const next = localSavedService.toggle(resourceId);
    setIsSaved(next);
  };

  return (
    <button
      onClick={handleToggle}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
        isSaved
          ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-sm shadow-cyan-500/20'
          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:border-cyan-500 hover:text-cyan-500'
      }`}
    >
      {isSaved ? (
        <>
          <Check className="w-4 h-4 stroke-[3]" />
          <span>Saved to My Device</span>
        </>
      ) : (
        <>
          <Bookmark className="w-4 h-4" />
          <span>Save for Later</span>
        </>
      )}
    </button>
  );
};

