import React from 'react';
import { ArrowUpRight, Clock, Calendar } from 'lucide-react';
import { Article } from '../types';
import { MotorcycleImage } from './MotorcycleImage';

interface ArticleCardProps {
  article: Article;
  onSelect: (slug: string) => void;
  layout?: 'standard' | 'compact' | 'horizontal';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  layout = 'standard',
}) => {
  const articleUrl = `/article/${article.slug}`;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onSelect(article.slug);
  };

  if (layout === 'horizontal') {
    return (
      <a
        href={articleUrl}
        onClick={handleClick}
        aria-label={`Read article: ${article.title}`}
        className="group relative bg-[#131313] hover:bg-[#181818] border border-[#222222] hover:border-[#383838] transition-all duration-300 flex flex-col md:flex-row overflow-hidden cursor-pointer block"
      >
        <div className="md:w-5/12 aspect-[16/10] md:aspect-auto relative overflow-hidden">
          <MotorcycleImage
            src={article.coverImage}
            alt={article.title}
            category={article.categoryLabel}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-6 md:w-7/12 flex flex-col justify-between">
          <div>
            {/* Unboxed metadata kicker */}
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-[#FF5A1F] mb-2 font-semibold">
              <span>{article.categoryLabel}</span>
              <span className="text-[#444444]" aria-hidden="true">·</span>
              <span className="text-[#888888]">{article.readTime}</span>
            </div>

            <h3 className="text-xl lg:text-2xl font-display font-bold text-[#F5F5F5] group-hover:text-[#FF5A1F] transition-colors line-clamp-2 leading-tight">
              {article.title}
            </h3>

            <p className="mt-2 text-sm text-[#A0A0A0] line-clamp-2 leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-[#202020] flex items-center justify-between text-xs text-[#808080]">
            <div className="flex items-center gap-2.5">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                referrerPolicy="no-referrer"
                className="w-6 h-6 rounded-full object-cover border border-[#333333]"
              />
              <span className="text-[#C0C0C0] font-medium">{article.author.name}</span>
            </div>
            <div className="flex items-center gap-1 text-[#FF5A1F] font-semibold text-xs group-hover:translate-x-1 transition-transform">
              <span>Read Story</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </a>
    );
  }

  if (layout === 'compact') {
    return (
      <a
        href={articleUrl}
        onClick={handleClick}
        aria-label={`Read article: ${article.title}`}
        className="group relative bg-[#131313] hover:bg-[#181818] border border-[#222222] hover:border-[#383838] transition-all duration-300 p-4 flex gap-4 overflow-hidden cursor-pointer block"
      >
        <div className="w-24 h-24 shrink-0 overflow-hidden relative">
          <MotorcycleImage
            src={article.coverImage}
            alt={article.title}
            category={article.categoryLabel}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="flex flex-col justify-between overflow-hidden">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-wider uppercase text-[#FF5A1F] font-semibold">
              <span>{article.categoryLabel}</span>
              <span className="text-[#444444]" aria-hidden="true">·</span>
              <span className="text-[#888888]">{article.readTime}</span>
            </div>
            <h4 className="text-sm font-display font-bold text-[#F5F5F5] group-hover:text-[#FF5A1F] transition-colors line-clamp-2 mt-1 leading-snug">
              {article.title}
            </h4>
          </div>
          <div className="text-[11px] text-[#707070]">
            <span>{article.publishDate}</span>
          </div>
        </div>
      </a>
    );
  }

  // Standard layout
  return (
    <a
      href={articleUrl}
      onClick={handleClick}
      aria-label={`Read article: ${article.title}`}
      className="group relative bg-[#131313] hover:bg-[#171717] border border-[#222222] hover:border-[#383838] transition-all duration-300 flex flex-col overflow-hidden cursor-pointer block"
    >
      {/* Article thumbnail with zoom effect */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0A0A0A]">
        <MotorcycleImage
          src={article.coverImage}
          alt={article.title}
          category={article.categoryLabel}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Subtle dark gradient scrim at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

        {/* Category kicker bottom overlay */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
          <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#FF5A1F]">
            {article.categoryLabel}
          </span>
          <span className="text-[11px] font-mono text-[#D0D0D0] flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#FF5A1F]" />
            {article.readTime}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg lg:text-xl font-display font-bold text-[#F5F5F5] group-hover:text-[#FF5A1F] transition-colors leading-tight line-clamp-2">
            {article.title}
          </h3>
          <p className="mt-2.5 text-xs text-[#A0A0A0] leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>
        </div>

        {/* Card Footer: Author and Date */}
        <div className="pt-4 mt-5 border-t border-[#202020] flex items-center justify-between text-xs text-[#808080]">
          <div className="flex items-center gap-2">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              referrerPolicy="no-referrer"
              className="w-6 h-6 rounded-full object-cover border border-[#2E2E2E]"
            />
            <span className="text-[#C5C5C5] font-medium text-xs truncate max-w-[120px]">
              {article.author.name}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-[#707070]">
            <Calendar className="w-3 h-3" />
            <span>{article.publishDate}</span>
          </div>
        </div>
      </div>
    </a>
  );
};
