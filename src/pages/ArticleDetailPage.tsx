import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Share2,
  Copy,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Wrench,
  Lightbulb,
  Check,
  Bookmark,
  MessageCircle,
} from 'lucide-react';
import { ARTICLES } from '../data/articles';
import { Article } from '../types';
import { MotorcycleImage } from '../components/MotorcycleImage';
import { ArticleCard } from '../components/ArticleCard';

interface ArticleDetailPageProps {
  slug: string;
  onBackToBlog: () => void;
  onSelectArticle: (slug: string) => void;
  onToast: (msg: string) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  slug,
  onBackToBlog,
  onSelectArticle,
  onToast,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>('');

  const currentIndex = ARTICLES.findIndex((a) => a.slug === slug);
  const article = ARTICLES[currentIndex] || ARTICLES[0];

  const prevArticle = currentIndex > 0 ? ARTICLES[currentIndex - 1] : null;
  const nextArticle = currentIndex < ARTICLES.length - 1 ? ARTICLES[currentIndex + 1] : null;

  // Curate 3 related articles (prioritize same category)
  const relatedArticles = ARTICLES.filter((a) => a.id !== article.id)
    .sort((a, b) => (a.category === article.category ? -1 : 1))
    .slice(0, 3);

  // Set active section on scroll
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const handleScroll = () => {
      const headings = article.sections.map((sec) => document.getElementById(sec.id));
      const scrollY = window.scrollY;

      for (let i = headings.length - 1; i >= 0; i--) {
        const el = headings[i];
        if (el && el.offsetTop - 140 <= scrollY) {
          setActiveSectionId(article.sections[i].id);
          return;
        }
      }
      if (article.sections[0]) {
        setActiveSectionId(article.sections[0].id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article]);

  const handleCopyUrl = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        onToast('Article link copied to clipboard!');
        setTimeout(() => setCopied(false), 2500);
      });
    } else {
      onToast('Article URL: ' + url);
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Check out "${article.title}" on THROTTLE CULTURE: ${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F5F5F5]">
      {/* Back to Blog Bar */}
      <div className="bg-[#101010] border-b border-[#202020] py-3.5 px-4 sm:px-6 lg:px-8 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a
            href="/journal"
            onClick={(e) => {
              e.preventDefault();
              onBackToBlog();
            }}
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#A0A0A0] hover:text-[#FF5A1F] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO THE JOURNAL</span>
          </a>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[#666666] hidden sm:inline">
              SHARE:
            </span>
            <button
              onClick={handleShareWhatsApp}
              className="px-2.5 py-1 text-xs bg-[#181818] hover:bg-[#252525] text-[#25D366] border border-[#2B2B2B] transition-colors cursor-pointer"
              title="Share on WhatsApp"
            >
              WhatsApp
            </button>
            <button
              onClick={handleShareFacebook}
              className="px-2.5 py-1 text-xs bg-[#181818] hover:bg-[#252525] text-[#1877F2] border border-[#2B2B2B] transition-colors cursor-pointer"
              title="Share on Facebook"
            >
              Facebook
            </button>
            <button
              onClick={handleCopyUrl}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-[#181818] hover:bg-[#252525] text-[#E0E0E0] hover:text-[#FF5A1F] border border-[#2B2B2B] transition-colors cursor-pointer"
              title="Copy URL"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Link'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Header Area */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-8 text-center">
        {/* Category & Read Time Kicker */}
        <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-widest uppercase text-[#FF5A1F] mb-4 font-semibold">
          <span>{article.categoryLabel}</span>
          <span className="text-[#555555]">·</span>
          <span>{article.readTime}</span>
          <span className="text-[#555555]">·</span>
          <span>{article.publishDate}</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-[#F5F5F5] uppercase leading-[1.05] tracking-tight">
          {article.title}
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-xl text-[#B0B0B0] font-light leading-relaxed max-w-2xl mx-auto">
          {article.subtitle}
        </p>

        {/* Author Byline Lockup */}
        <div className="mt-8 pt-6 border-t border-[#1F1F1F] flex items-center justify-center gap-3">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            referrerPolicy="no-referrer"
            className="w-12 h-12 rounded-full object-cover border-2 border-[#FF5A1F]"
          />
          <div className="text-left">
            <div className="text-sm font-bold text-[#F5F5F5]">{article.author.name}</div>
            <div className="text-xs text-[#808080]">{article.author.role}</div>
            <div className="text-[11px] font-mono text-[#FF5A1F]">{article.author.bike}</div>
          </div>
        </div>
      </header>

      {/* Full-Width Feature Hero Image */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
        <div className="aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-[#121212] border border-[#222222]">
          <MotorcycleImage
            src={article.coverImage}
            alt={article.title}
            category={article.categoryLabel}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-right text-[11px] text-[#606060] font-mono mt-2">
          PHOTO: THROTTLE CULTURE EDITORIAL ARCHIVE / LEICA M11
        </div>
      </div>

      {/* Article Content Layout: Asymmetric 2-Column with Table of Contents */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Sticky Table of Contents & Specs */}
          <aside className="lg:col-span-4 space-y-8 order-2 lg:order-1">
            {/* Table of Contents */}
            <div className="sticky top-36 bg-[#131313] border border-[#242424] p-6">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#FF5A1F] font-bold mb-4 pb-2 border-b border-[#202020]">
                TABLE OF CONTENTS
              </h3>
              <nav className="space-y-2.5 text-xs">
                {article.sections.map((section, idx) => {
                  const isActive = activeSectionId === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToHeading(section.id)}
                      className={`block w-full text-left transition-colors duration-150 cursor-pointer ${
                        isActive
                          ? 'text-[#FF5A1F] font-bold pl-2 border-l-2 border-[#FF5A1F]'
                          : 'text-[#A0A0A0] hover:text-white pl-2'
                      }`}
                    >
                      <span className="font-mono text-[#666666] mr-1.5">0{idx + 1}.</span>
                      {section.heading}
                    </button>
                  );
                })}
              </nav>

              {/* Specs Box if available */}
              {article.specs && article.specs.length > 0 && (
                <div className="mt-8 pt-6 border-t border-[#202020]">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#F5F5F5] font-bold mb-3">
                    TECHNICAL DATA
                  </h4>
                  <dl className="space-y-2 text-xs">
                    {article.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex justify-between py-1 border-b border-[#1A1A1A]"
                      >
                        <dt className="text-[#777777] font-mono">{spec.label}</dt>
                        <dd className="font-semibold text-[#E0E0E0] text-right font-mono">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {/* Key Takeaways */}
              {article.keyTakeaways && (
                <div className="mt-8 pt-6 border-t border-[#202020]">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#FF5A1F] font-bold mb-3">
                    EXECUTIVE TAKEAWAYS
                  </h4>
                  <ul className="space-y-2.5 text-xs text-[#B0B0B0]">
                    {article.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#FF5A1F] font-bold font-mono">▸</span>
                        <span className="leading-relaxed">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>

          {/* Right Column: Editorial Long-Form Body */}
          <main className="lg:col-span-8 order-1 lg:order-2">
            <div className="space-y-12">
              {article.sections.map((section, sIdx) => (
                <section key={section.id} id={section.id} className="scroll-mt-36">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#F5F5F5] uppercase tracking-tight mb-6 pb-2 border-b border-[#202020]">
                    <span className="text-[#FF5A1F] font-mono text-lg mr-2">0{sIdx + 1}.</span>
                    {section.heading}
                  </h2>

                  {/* Paragraphs with Drop-Cap on first section */}
                  <div className="space-y-5 text-base sm:text-lg text-[#C8C8C8] leading-[1.8] font-normal">
                    {section.paragraphs.map((para, pIdx) => {
                      const isFirst = sIdx === 0 && pIdx === 0;
                      return (
                        <p
                          key={pIdx}
                          className={
                            isFirst
                              ? 'first-letter:text-5xl first-letter:font-display first-letter:font-bold first-letter:text-[#FF5A1F] first-letter:float-left first-letter:mr-3 first-letter:mt-1 leading-relaxed'
                              : 'leading-relaxed'
                          }
                        >
                          {para}
                        </p>
                      );
                    })}
                  </div>

                  {/* Pull Quote */}
                  {section.pullQuote && (
                    <blockquote className="my-8 p-6 sm:p-8 bg-[#141414] border border-[#2B2B2B] relative">
                      <div className="text-4xl font-serif text-[#FF5A1F] leading-none mb-2 select-none">
                        “
                      </div>
                      <p className="text-lg sm:text-xl font-display font-medium text-[#F5F5F5] italic leading-relaxed">
                        {section.pullQuote}
                      </p>
                    </blockquote>
                  )}

                  {/* Safety / Pro Tip / Wrench Tip Callout Box */}
                  {section.callout && (
                    <div
                      className={`my-8 p-6 border ${
                        section.callout.type === 'safety'
                          ? 'bg-[#1C1111] border-[#EF4444]/60 text-[#F5F5F5]'
                          : section.callout.type === 'wrench-tip'
                          ? 'bg-[#1C180E] border-[#EAB308]/60 text-[#F5F5F5]'
                          : 'bg-[#141414] border-[#FF5A1F]/60 text-[#F5F5F5]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold uppercase tracking-wider">
                        {section.callout.type === 'safety' && (
                          <ShieldAlert className="w-4 h-4 text-[#EF4444]" />
                        )}
                        {section.callout.type === 'wrench-tip' && (
                          <Wrench className="w-4 h-4 text-[#EAB308]" />
                        )}
                        {section.callout.type === 'pro-tip' && (
                          <Lightbulb className="w-4 h-4 text-[#FF5A1F]" />
                        )}
                        <span
                          className={
                            section.callout.type === 'safety'
                              ? 'text-[#EF4444]'
                              : section.callout.type === 'wrench-tip'
                              ? 'text-[#EAB308]'
                              : 'text-[#FF5A1F]'
                          }
                        >
                          {section.callout.title}
                        </span>
                      </div>
                      <p className="text-sm text-[#D0D0D0] leading-relaxed">
                        {section.callout.text}
                      </p>
                    </div>
                  )}

                  {/* Inline Technical Section Image */}
                  {section.image && (
                    <div className="my-8 overflow-hidden bg-[#141414] border border-[#2B2B2B]">
                      <div className="aspect-[16/9]">
                        <MotorcycleImage
                          src={section.image.url}
                          alt={section.image.caption}
                          category={article.categoryLabel}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="p-3 text-xs text-[#808080] font-mono border-t border-[#202020]">
                        {section.image.caption}
                      </p>
                    </div>
                  )}

                  {/* Bullet Points */}
                  {section.bulletPoints && (
                    <ul className="my-6 space-y-2.5">
                      {section.bulletPoints.map((point, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5 text-sm text-[#C0C0C0]">
                          <span className="w-1.5 h-1.5 bg-[#FF5A1F] rounded-full mt-2 shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              {/* Tags Section */}
              <div className="pt-8 border-t border-[#222222]">
                <span className="text-xs font-mono uppercase text-[#707070] mr-2">Tags:</span>
                <div className="inline-flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono bg-[#161616] border border-[#2B2B2B] px-2.5 py-1 text-[#A0A0A0]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Bio Card */}
              <div className="p-6 sm:p-8 bg-[#131313] border border-[#242424] flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#FF5A1F] shrink-0"
                />
                <div className="text-center sm:text-left">
                  <div className="text-xs font-mono text-[#FF5A1F] uppercase font-semibold">
                    Written by
                  </div>
                  <h4 className="text-lg font-display font-bold text-white mt-0.5">
                    {article.author.name}
                  </h4>
                  <p className="text-xs text-[#808080] mt-0.5">{article.author.role}</p>
                  <p className="text-xs text-[#C0C0C0] mt-2.5 leading-relaxed">
                    {article.author.bio}
                  </p>
                  <div className="text-[11px] font-mono text-[#777777] mt-2">
                    Current Stable: <span className="text-[#FF5A1F]">{article.author.bike}</span>
                  </div>
                </div>
              </div>

              {/* Share & Actions */}
              <div className="p-5 bg-[#121212] border border-[#202020] flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs font-mono uppercase text-[#A0A0A0]">
                  Enjoyed this ride report? Share it with fellow riders.
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShareWhatsApp}
                    className="px-3 py-1.5 text-xs font-semibold bg-[#25D366] text-black hover:bg-[#20ba59] transition-colors cursor-pointer"
                  >
                    Share WhatsApp
                  </button>
                  <button
                    onClick={handleShareFacebook}
                    className="px-3 py-1.5 text-xs font-semibold bg-[#1877F2] text-white hover:bg-[#1569d6] transition-colors cursor-pointer"
                  >
                    Share Facebook
                  </button>
                  <button
                    onClick={handleCopyUrl}
                    className="px-3 py-1.5 text-xs font-semibold bg-[#262626] hover:bg-[#333333] text-white transition-colors cursor-pointer"
                  >
                    {copied ? 'Link Copied!' : 'Copy Link'}
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Prev / Next Article Navigation Strip */}
      <section className="border-y border-[#222222] bg-[#0E0E0E]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#222222]">
          {/* Previous Article */}
          <div className="p-6 sm:p-8">
            {prevArticle ? (
              <a
                href={`/article/${prevArticle.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectArticle(prevArticle.slug);
                }}
                className="group flex flex-col items-start text-left w-full cursor-pointer block"
              >
                <span className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#707070] group-hover:text-[#FF5A1F] transition-colors mb-2">
                  <ChevronLeft className="w-4 h-4" />
                  Previous Story
                </span>
                <span className="text-base sm:text-lg font-display font-bold text-white group-hover:text-[#FF5A1F] transition-colors line-clamp-1">
                  {prevArticle.title}
                </span>
                <span className="text-xs text-[#808080] mt-1 font-mono">{prevArticle.readTime}</span>
              </a>
            ) : (
              <div className="text-xs font-mono text-[#555555]">First article in the archive</div>
            )}
          </div>

          {/* Next Article */}
          <div className="p-6 sm:p-8">
            {nextArticle ? (
              <a
                href={`/article/${nextArticle.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectArticle(nextArticle.slug);
                }}
                className="group flex flex-col items-end text-right w-full cursor-pointer block"
              >
                <span className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#707070] group-hover:text-[#FF5A1F] transition-colors mb-2">
                  Next Story
                  <ChevronRight className="w-4 h-4" />
                </span>
                <span className="text-base sm:text-lg font-display font-bold text-white group-hover:text-[#FF5A1F] transition-colors line-clamp-1">
                  {nextArticle.title}
                </span>
                <span className="text-xs text-[#808080] mt-1 font-mono">{nextArticle.readTime}</span>
              </a>
            ) : (
              <div className="text-xs font-mono text-[#555555] text-right">
                Latest article in the archive
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Articles Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-[#222222]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF5A1F] font-semibold">
              Continue The Journey
            </span>
            <h2 className="text-2xl lg:text-3xl font-display font-bold text-[#F5F5F5] uppercase tracking-tight mt-1">
              RELATED ARTICLES
            </h2>
          </div>
          <a
            href="/journal"
            onClick={(e) => {
              e.preventDefault();
              onBackToBlog();
            }}
            className="text-xs font-bold uppercase tracking-wider text-[#FF5A1F] hover:text-white transition-colors cursor-pointer"
          >
            All Stories →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map((rel) => (
            <ArticleCard
              key={rel.id}
              article={rel}
              onSelect={onSelectArticle}
              layout="standard"
            />
          ))}
        </div>
      </section>
    </div>
  );
};
