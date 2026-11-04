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
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[4px] text-xs font-mono border transition-colors min-h-[38px] ${
        isSaved
          ? 'bg-[#303055] text-white border-[#303055]'
          : 'bg-[#f4f4f9] text-[#403f53] border-[#e4e4ed] hover:border-[#303055] hover:text-[#303055]'
      }`}
    >
      {isSaved ? (
        <>
          <Check className="w-3.5 h-3.5" />
          <span>Saved</span>
        </>
      ) : (
        <>
          <Bookmark className="w-3.5 h-3.5" />
          <span>Save for Later</span>
        </>
      )}
    </button>
  );
};
