import React, { useState, useMemo } from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown, RotateCcw, BookOpen } from 'lucide-react';
import { ARTICLES, CATEGORIES } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { CategoryId } from '../types';

interface BlogListingPageProps {
  initialCategory?: CategoryId;
  onSelectArticle: (slug: string) => void;
  onSelectCategory?: (category?: CategoryId) => void;
}

export const BlogListingPage: React.FC<BlogListingPageProps> = ({
  initialCategory,
  onSelectArticle,
  onSelectCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>(
    initialCategory || 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'featured' | 'quickest'>('newest');
  const [visibleCount, setVisibleCount] = useState<number>(8);

  // Sync category if prop changes
  React.useEffect(() => {
    setSelectedCategory(initialCategory || 'all');
  }, [initialCategory]);

  // Filter & Sort
  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      // Category match
      const categoryMatch =
        selectedCategory === 'all' || article.category === selectedCategory;

      // Query match
      const query = searchQuery.toLowerCase().trim();
      if (!query) return categoryMatch;

      const titleMatch = article.title.toLowerCase().includes(query);
      const subtitleMatch = article.subtitle.toLowerCase().includes(query);
      const excerptMatch = article.excerpt.toLowerCase().includes(query);
      const tagMatch = article.tags.some((tag) => tag.toLowerCase().includes(query));
      const categoryLabelMatch = article.categoryLabel.toLowerCase().includes(query);
      const authorMatch = article.author.name.toLowerCase().includes(query);

      return (
        categoryMatch &&
        (titleMatch || subtitleMatch || excerptMatch || tagMatch || categoryLabelMatch || authorMatch)
      );
    }).sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        if (a.editorsPick && !b.editorsPick) return -1;
        if (!a.editorsPick && b.editorsPick) return 1;
      }
      if (sortBy === 'quickest') {
        const timeA = parseInt(a.readTime, 10) || 10;
        const timeB = parseInt(b.readTime, 10) || 10;
        return timeA - timeB;
      }
      // default: newest
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const displayedArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  const handleReset = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('newest');
    setVisibleCount(8);
    onSelectCategory?.(undefined);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F5F5F5] py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Banner */}
        <div className="border-b border-[#222222] pb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#FF5A1F] font-semibold mb-3">
            <span>The Complete Archive</span>
            <span className="text-[#555555]">/</span>
            <span>Uncompromising Motorcycle Journalism</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-bold text-[#F5F5F5] uppercase tracking-tight">
            THE RIDER'S JOURNAL
          </h1>

          <p className="mt-3 text-base sm:text-lg text-[#A0A0A0] max-w-2xl font-light">
            In-depth track telemetry, brutal adventure dispatches, garage blueprints, and gear lab
            tear-downs written by riders who actually wrench and ride.
          </p>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="mt-8 space-y-4">
          {/* Top row: Search input + Sorting dropdown */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FF5A1F]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(8);
                }}
                placeholder="Search by bike model, gear, technique, or keyword..."
                className="w-full bg-[#141414] border border-[#2B2B2B] focus:border-[#FF5A1F] pl-10 pr-10 py-2.5 text-xs sm:text-sm text-[#F5F5F5] placeholder-[#606060] focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777777] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono uppercase text-[#707070] flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5" />
                Sort:
              </span>
              <div className="inline-flex bg-[#141414] border border-[#2B2B2B] p-0.5">
                <button
                  onClick={() => setSortBy('newest')}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                    sortBy === 'newest'
                      ? 'bg-[#FF5A1F] text-black font-semibold'
                      : 'text-[#A0A0A0] hover:text-white'
                  }`}
                >
                  Newest
                </button>
                <button
                  onClick={() => setSortBy('featured')}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                    sortBy === 'featured'
                      ? 'bg-[#FF5A1F] text-black font-semibold'
                      : 'text-[#A0A0A0] hover:text-white'
                  }`}
                >
                  Featured
                </button>
                <button
                  onClick={() => setSortBy('quickest')}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                    sortBy === 'quickest'
                      ? 'bg-[#FF5A1F] text-black font-semibold'
                      : 'text-[#A0A0A0] hover:text-white'
                  }`}
                >
                  Quick Read
                </button>
              </div>
            </div>
          </div>

          {/* Bottom row: Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-[#1E1E1E] no-scrollbar">
            <a
              href="/journal"
              onClick={(e) => {
                e.preventDefault();
                setSelectedCategory('all');
                setVisibleCount(8);
                onSelectCategory?.(undefined);
              }}
              aria-label={`Filter journal articles by all topics (${ARTICLES.length} available)`}
              className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider shrink-0 transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#FF5A1F] text-black'
                  : 'bg-[#151515] text-[#A0A0A0] hover:text-white hover:bg-[#1E1E1E]'
              }`}
            >
              All ({ARTICLES.length})
            </a>
            {CATEGORIES.map((cat) => {
              const count = ARTICLES.filter((a) => a.category === cat.id).length;
              const isActive = selectedCategory === cat.id;
              return (
                <a
                  key={cat.id}
                  href={`/journal/${cat.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory(cat.id);
                    setVisibleCount(8);
                    onSelectCategory?.(cat.id);
                  }}
                  aria-label={`Filter journal articles by ${cat.label} (${count} available)`}
                  className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider shrink-0 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#FF5A1F] text-black'
                      : 'bg-[#151515] text-[#A0A0A0] hover:text-white hover:bg-[#1E1E1E]'
                  }`}
                >
                  {cat.label} ({count})
                </a>
              );
            })}
          </div>
        </div>

        {/* Results Counter & Reset Link */}
        <div className="mt-6 flex items-center justify-between text-xs text-[#707070] font-mono">
          <div>
            Showing <span className="text-[#F5F5F5] font-bold">{displayedArticles.length}</span> of{' '}
            <span className="text-[#F5F5F5] font-bold">{filteredArticles.length}</span> published
            articles
            {selectedCategory !== 'all' && (
              <span className="text-[#FF5A1F] ml-1">
                in {CATEGORIES.find((c) => c.id === selectedCategory)?.label}
              </span>
            )}
            {searchQuery && (
              <span className="text-[#FF5A1F] ml-1">matching “{searchQuery}”</span>
            )}
          </div>

          {(selectedCategory !== 'all' || searchQuery || sortBy !== 'newest') && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-[#FF5A1F] hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>

        {/* Dedicated Riding Gear Spotlight Bar when Gear Category is active */}
        {selectedCategory === 'gear' && (
          <div className="mt-6 p-4 sm:p-6 bg-[#131313] border border-[#FF5A1F]/30 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in duration-200">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1558980394-4c7c9299fe96?auto=format&fit=crop&w=200&q=80"
                alt="Helmet gear"
                className="w-12 h-12 object-cover border border-[#2B2B2B]"
              />
              <div>
                <div className="text-[10px] font-mono text-[#FF5A1F] uppercase font-bold">Helmets & Visors</div>
                <div className="text-xs text-[#E0E0E0]">ECE 22.06 & Rotational Armor</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=200&q=80"
                alt="Armored Jacket"
                className="w-12 h-12 object-cover border border-[#2B2B2B]"
              />
              <div>
                <div className="text-[10px] font-mono text-[#FF5A1F] uppercase font-bold">Jackets & Suits</div>
                <div className="text-xs text-[#E0E0E0]">Gore-Tex Pro & D3O Level 2</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=200&q=80"
                alt="Gloves & Boots"
                className="w-12 h-12 object-cover border border-[#2B2B2B]"
              />
              <div>
                <div className="text-[10px] font-mono text-[#FF5A1F] uppercase font-bold">Gloves & Footwear</div>
                <div className="text-xs text-[#E0E0E0]">Carbon Gauntlets & Torsion Bars</div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredArticles.length === 0 ? (
          <div className="mt-12 p-12 bg-[#121212] border border-[#222222] text-center max-w-md mx-auto">
            <BookOpen className="w-12 h-12 text-[#444444] mx-auto mb-4" />
            <h3 className="text-xl font-display font-bold text-[#F5F5F5]">
              NO STORIES FOUND
            </h3>
            <p className="mt-2 text-xs text-[#888888] leading-relaxed">
              We couldn’t find any articles matching your search query or selected category.
            </p>
            <button
              onClick={handleReset}
              className="mt-6 px-5 py-2.5 bg-[#FF5A1F] hover:bg-[#E04812] text-black text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          /* Article Card Grid */
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {displayedArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onSelect={onSelectArticle}
                layout="standard"
              />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-14 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-8 py-3.5 bg-[#171717] hover:bg-[#202020] text-[#F5F5F5] hover:text-[#FF5A1F] border border-[#2F2F2F] text-xs font-display font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md inline-flex items-center gap-2"
            >
              <span>LOAD MORE STORIES ({filteredArticles.length - displayedArticles.length} REMAINING)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
