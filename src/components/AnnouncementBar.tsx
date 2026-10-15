import React, { useState } from 'react';
import { Sparkles, X, ChevronRight } from 'lucide-react';

interface AnnouncementBarProps {
  onExploreIssue: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onExploreIssue }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-[#111111] border-b border-[#222222] text-xs text-[#F5F5F5] py-2 px-4 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 mx-auto sm:mx-0 overflow-hidden">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-[#FF5A1F]/15 text-[#FF5A1F] border border-[#FF5A1F]/30 font-semibold whitespace-nowrap">
            <Sparkles className="w-3 h-3" />
            Issue No. 42 Live
          </span>
          <span className="text-[#A0A0A0] hidden sm:inline">|</span>
          <p className="text-xs font-medium truncate text-[#E5E5E5]">
            The 2026 Alpine & Trans-Himalayan Expedition Issue is out now.
          </p>
          <a
            href="/journal"
            onClick={(e) => {
              e.preventDefault();
              onExploreIssue();
            }}
            aria-label="Read Issue No. 42: The 2026 Alpine and Trans-Himalayan Expedition Issue"
            className="hidden md:inline-flex items-center gap-1 text-[#FF5A1F] hover:text-[#FFA07A] font-medium tracking-wide transition-colors ml-1 cursor-pointer"
          >
            <span>Read Issue</span>
            <ChevronRight className="w-3 h-3" />
          </a>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="text-[#737373] hover:text-[#F5F5F5] transition-colors p-1"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
