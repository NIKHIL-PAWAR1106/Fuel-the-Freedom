import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, BookOpen, Clock } from 'lucide-react';
import { ARTICLES, CATEGORIES } from '../data/articles';
import { Article, CategoryId } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (slug: string) => void;
  onSelectCategory: (categoryId: CategoryId) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle,
  onSelectCategory,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const filteredArticles = ARTICLES.filter((article) => {
    const matchesCategory =
      selectedCategory === 'all' || article.category === selectedCategory;
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) return matchesCategory;

    const matchesQuery =
      article.title.toLowerCase().includes(lowerQuery) ||
      article.subtitle.toLowerCase().includes(lowerQuery) ||
      article.excerpt.toLowerCase().includes(lowerQuery) ||
      article.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      article.categoryLabel.toLowerCase().includes(lowerQuery) ||
      article.author.name.toLowerCase().includes(lowerQuery);

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-3xl bg-[#121212] border border-[#2B2B2B] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#222222] bg-[#161616]">
          <Search className="w-5 h-5 text-[#FF5A1F] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reviews, gear, maintenance guides, road trips..."
            className="flex-1 bg-transparent text-[#F5F5F5] placeholder-[#707070] text-sm sm:text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#777777] hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs font-mono bg-[#222222] text-[#A0A0A0] hover:text-white hover:bg-[#333333] transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Category Quick Filter Strip */}
        <div className="flex items-center gap-1.5 px-5 py-3 border-b border-[#1E1E1E] bg-[#0E0E0E] overflow-x-auto text-xs no-scrollbar">
          <span className="text-[11px] font-mono uppercase text-[#666666] mr-1 shrink-0">
            Filter:
          </span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-2.5 py-1 text-xs font-medium shrink-0 transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#FF5A1F] text-black font-semibold'
                : 'bg-[#181818] text-[#A0A0A0] hover:text-white'
            }`}
          >
            All Topics
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1 text-xs font-medium shrink-0 transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#FF5A1F] text-black font-semibold'
                  : 'bg-[#181818] text-[#A0A0A0] hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-10 h-10 text-[#444444] mx-auto mb-3" />
              <p className="text-base font-display font-semibold text-[#D0D0D0]">
                No articles matched your search
              </p>
              <p className="text-xs text-[#777777] mt-1">
                Try searching for "Ducati", "Gore-Tex", "Chain", "Himalayas", or "Trail braking".
              </p>
              <button
                onClick={() => {
                  setQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 px-4 py-2 bg-[#222222] hover:bg-[#333333] text-xs font-semibold text-[#FF5A1F] transition-colors"
              >
                Clear Search & Filters
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              <div className="text-[11px] font-mono text-[#666666] uppercase px-1">
                Found {filteredArticles.length} Article{filteredArticles.length !== 1 ? 's' : ''}
              </div>

              {filteredArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => {
                    onSelectArticle(art.slug);
                    onClose();
                  }}
                  className="group p-3.5 bg-[#171717] hover:bg-[#202020] border border-[#242424] hover:border-[#FF5A1F]/50 transition-all cursor-pointer flex items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[10px] font-mono tracking-wider uppercase text-[#FF5A1F]">
                      <span>{art.categoryLabel}</span>
                      <span className="text-[#444444]">·</span>
                      <span className="text-[#888888] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {art.readTime}
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-display font-bold text-[#F5F5F5] group-hover:text-[#FF5A1F] transition-colors truncate mt-1">
                      {art.title}
                    </h4>
                    <p className="text-xs text-[#8E8E8E] line-clamp-1 mt-0.5">
                      {art.excerpt}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#555555] group-hover:text-[#FF5A1F] group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-[#0D0D0D] border-t border-[#1F1F1F] text-[11px] text-[#666666] flex items-center justify-between">
          <span>Quick search across all 12 published feature articles</span>
          <span className="font-mono">THROTTLE CULTURE PRESS</span>
        </div>
      </div>
    </div>
  );
};
