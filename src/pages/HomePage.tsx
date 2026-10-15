import React, { useState } from 'react';
import {
  ArrowRight,
  ChevronRight,
  Shield,
  Wrench,
  Compass,
  Zap,
  Flame,
  Award,
  Heart,
  ExternalLink,
  X,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { ARTICLES, CATEGORIES } from '../data/articles';
import { GALLERY_PHOTOS } from '../data/gallery';
import { ArticleCard } from '../components/ArticleCard';
import { MotorcycleImage } from '../components/MotorcycleImage';
import { GalleryPhoto, PageRoute, CategoryId } from '../types';

interface HomePageProps {
  onSelectArticle: (slug: string) => void;
  onNavigate: (route: PageRoute) => void;
  onToast: (msg: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectArticle,
  onNavigate,
  onToast,
}) => {
  const [selectedGalleryPhoto, setSelectedGalleryPhoto] = useState<GalleryPhoto | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [likedPhotos, setLikedPhotos] = useState<Record<string, number>>({});

  // 1. Featured Article (Hero Editorial Card)
  const featuredArticle = ARTICLES.find((a) => a.featured) || ARTICLES[0];

  // 2. Latest Stories (at least 6 articles)
  const latestStories = ARTICLES.filter((a) => a.id !== featuredArticle.id).slice(0, 6);

  // 3. Editor's Picks
  const editorsPicks = ARTICLES.filter((a) => a.editorsPick).slice(0, 3);

  // 4. Maintenance & Safety Spotlight
  const maintenanceSpotlight = ARTICLES.find((a) => a.category === 'maintenance');
  const safetySpotlight = ARTICLES.find((a) => a.slug === 'trail-braking-masterclass-physics-and-street-survival') || ARTICLES.find((a) => a.category === 'safety');

  // 5. Road Trip & Adventure Feature
  const adventureFeature = ARTICLES.find((a) => a.category === 'road-trips') || ARTICLES[1];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      onToast('Please enter a valid email address.');
      return;
    }
    setNewsletterSuccess(true);
    onToast('Subscribed to The Throttle Dispatch! Check your inbox.');
    setNewsletterEmail('');
  };

  const handleLikePhoto = (id: string, initialLikes: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const current = likedPhotos[id] || initialLikes;
    const isLiked = likedPhotos[id] !== undefined;
    if (isLiked) {
      setLikedPhotos((prev) => ({ ...prev, [id]: current - 1 }));
    } else {
      setLikedPhotos((prev) => ({ ...prev, [id]: current + 1 }));
      onToast('Photo liked! Added to community love.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F5F5F5]">
      {/* 4. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[82vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden border-b border-[#222222]">
        {/* Background motorcycle photograph with cinematic dark overlay */}
        <div className="absolute inset-0 z-0">
          <MotorcycleImage
            src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=2000&q=85"
            alt="Motorcycle on misty mountain road at dusk"
            className="w-full h-full object-cover scale-105"
            category="Hero Cover"
          />
          {/* Gradients to ensure text legibility and aesthetic depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/75 to-black/50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0B0B0B_90%)]" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Subtle editorial kicker */}
          <div className="inline-flex items-center gap-2 mb-6 text-xs font-mono tracking-[0.25em] text-[#FF5A1F] uppercase font-semibold">
            <span>Issue 42</span>
            <span className="text-[#666666]">/</span>
            <span>Independent Motorcycle Journal</span>
            <span className="text-[#666666]">/</span>
            <span>Est. 2026</span>
          </div>

          {/* Oversized Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-bold tracking-tight text-[#F5F5F5] uppercase leading-[0.92] text-balance">
            BUILT FOR <br />
            <span className="text-[#FF5A1F] underline decoration-[#FF5A1F]/40 underline-offset-8">
              THE RIDE.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="mt-8 text-lg sm:text-xl lg:text-2xl text-[#C0C0C0] max-w-2xl mx-auto font-light leading-relaxed">
            Stories, machines, and miles that make life on two wheels unforgettable.
          </p>

          {/* Call to Actions */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/journal"
              onClick={(e) => {
                e.preventDefault();
                onNavigate({ type: 'journal' });
              }}
              className="w-full sm:w-auto px-8 py-4 bg-[#FF5A1F] hover:bg-[#E04812] text-black font-display font-bold text-base tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#FF5A1F]/20 cursor-pointer"
            >
              <span>EXPLORE THE STORIES</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="/journal/reviews"
              onClick={(e) => {
                e.preventDefault();
                onNavigate({ type: 'journal', category: 'reviews' });
              }}
              className="w-full sm:w-auto px-8 py-4 bg-[#181818] hover:bg-[#222222] text-[#F5F5F5] hover:text-[#FF5A1F] border border-[#2F2F2F] font-display font-bold text-base tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>LATEST REVIEWS</span>
              <ChevronRight className="w-4 h-4 text-[#888888]" />
            </a>
          </div>

          {/* Quick Metrics Strip */}
          <div className="mt-14 pt-8 border-t border-[#202020] grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-left">
            <div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-[#F5F5F5] tabular-nums">
                12+
              </div>
              <div className="text-xs text-[#7A7A7A] uppercase tracking-wider mt-0.5">
                Deep Dive Stories
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-[#FF5A1F] tabular-nums">
                216 HP
              </div>
              <div className="text-xs text-[#7A7A7A] uppercase tracking-wider mt-0.5">
                V4 S Track Tested
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-[#F5F5F5] tabular-nums">
                17,982 FT
              </div>
              <div className="text-xs text-[#7A7A7A] uppercase tracking-wider mt-0.5">
                Khardung La Summit
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-[#F5F5F5] tabular-nums">
                100%
              </div>
              <div className="text-xs text-[#7A7A7A] uppercase tracking-wider mt-0.5">
                Uncompromising Truth
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FEATURED ARTICLE SECTION: LARGE EDITORIAL CARD */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-[#222222]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF5A1F] font-semibold">
              Cover Feature · Exclusive Track Test
            </span>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-[#F5F5F5] tracking-tight mt-1 uppercase">
              LEAD STORY
            </h2>
          </div>
          <button
            onClick={() => onSelectArticle(featuredArticle.slug)}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF5A1F] hover:text-white transition-colors cursor-pointer"
          >
            <span>Read Full Feature</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div
          onClick={() => onSelectArticle(featuredArticle.slug)}
          className="group relative bg-[#131313] border border-[#222222] hover:border-[#383838] transition-all duration-300 overflow-hidden cursor-pointer"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Column */}
            <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto relative min-h-[360px] lg:min-h-[500px] overflow-hidden">
              <MotorcycleImage
                src={featuredArticle.coverImage}
                alt={featuredArticle.title}
                category={featuredArticle.categoryLabel}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className="inline-block bg-[#FF5A1F] text-black text-xs font-bold font-mono uppercase px-3 py-1 tracking-wider shadow">
                  COVER STORY
                </span>
              </div>
            </div>

            {/* Editorial Content Column */}
            <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-[#131313]">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#FF5A1F] mb-3 font-semibold">
                  <span>{featuredArticle.categoryLabel}</span>
                  <span className="text-[#444444]">·</span>
                  <span className="text-[#888888]">{featuredArticle.readTime}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#F5F5F5] group-hover:text-[#FF5A1F] transition-colors leading-[1.05]">
                  {featuredArticle.title}
                </h3>

                <p className="mt-3 text-sm sm:text-base text-[#D0D0D0] font-light leading-relaxed">
                  {featuredArticle.subtitle}
                </p>

                <p className="mt-4 text-xs sm:text-sm text-[#888888] leading-relaxed line-clamp-3">
                  {featuredArticle.excerpt}
                </p>

                {/* Specs Pill Strip (Tabular presentation) */}
                {featuredArticle.specs && (
                  <div className="mt-6 pt-6 border-t border-[#202020] grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[#666666] block text-[10px] uppercase font-mono">
                        Power
                      </span>
                      <span className="font-mono text-[#F5F5F5] font-semibold">
                        216 hp @ 13,500 rpm
                      </span>
                    </div>
                    <div>
                      <span className="text-[#666666] block text-[10px] uppercase font-mono">
                        Chassis Shift
                      </span>
                      <span className="font-mono text-[#FF5A1F] font-semibold">
                        -37% Lateral Rigidity
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Author byline */}
              <div className="pt-6 mt-8 border-t border-[#202020] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={featuredArticle.author.avatar}
                    alt={featuredArticle.author.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-[#2F2F2F]"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#F5F5F5]">
                      {featuredArticle.author.name}
                    </div>
                    <div className="text-[11px] text-[#7A7A7A]">
                      {featuredArticle.author.role}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF5A1F] group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. BROWSE BY CATEGORY SECTION */}
      <section className="py-14 bg-[#0F0F0F] border-y border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8 pb-3 border-b border-[#202020]">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF5A1F] font-semibold">
                Departments
              </span>
              <h2 className="text-2xl lg:text-3xl font-display font-bold text-[#F5F5F5] tracking-tight mt-1 uppercase">
                BROWSE BY CATEGORY
              </h2>
            </div>
            <span className="text-xs text-[#707070] font-mono">7 Disciplines of Riding</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => {
              const count = ARTICLES.filter((a) => a.category === cat.id).length;
              return (
                <a
                  key={cat.id}
                  href={`/journal/${cat.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate({ type: 'journal', category: cat.id });
                  }}
                  className="group bg-[#141414] hover:bg-[#1A1A1A] border border-[#222222] hover:border-[#FF5A1F]/60 p-5 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[140px] block"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#707070] font-mono">
                      <span>{count} {count === 1 ? 'Story' : 'Stories'}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#555555] group-hover:text-[#FF5A1F] group-hover:translate-x-1 transition-transform" />
                    </div>
                    <h3 className="text-base lg:text-lg font-display font-bold text-[#F5F5F5] group-hover:text-[#FF5A1F] transition-colors mt-2 uppercase">
                      {cat.label}
                    </h3>
                  </div>
                  <p className="text-xs text-[#808080] line-clamp-2 mt-2 leading-relaxed">
                    {cat.description}
                  </p>
                </a>
              );
            })}

            {/* Quick All Journal Card */}
            <a
              href="/journal"
              onClick={(e) => {
                e.preventDefault();
                onNavigate({ type: 'journal' });
              }}
              className="bg-[#1C1C1C] hover:bg-[#252525] border border-[#333333] hover:border-[#FF5A1F] p-5 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[140px] block"
            >
              <div>
                <div className="text-xs text-[#FF5A1F] font-mono font-semibold">COMPLETE ARCHIVE</div>
                <h3 className="text-base lg:text-lg font-display font-bold text-white mt-2 uppercase">
                  All 12+ Features →
                </h3>
              </div>
              <p className="text-xs text-[#A0A0A0]">
                Search, filter, and sort through the full catalog of long-form reports.
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* 9. LATEST STORIES GRID (At least 6 article cards) */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-[#222222]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF5A1F] font-semibold">
              Fresh Off The Tarmac
            </span>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-[#F5F5F5] tracking-tight mt-1 uppercase">
              LATEST STORIES
            </h2>
          </div>
          <button
            onClick={() => onNavigate({ type: 'journal' })}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF5A1F] hover:text-white transition-colors cursor-pointer"
          >
            <span>View All Stories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {latestStories.map((story) => (
            <ArticleCard
              key={story.id}
              article={story}
              onSelect={onSelectArticle}
              layout="standard"
            />
          ))}
        </div>
      </section>

      {/* 11. EDITOR'S PICKS SECTION */}
      <section className="py-16 bg-[#101010] border-y border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8 pb-3 border-b border-[#252525]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF5A1F] font-semibold">
                <Award className="w-3.5 h-3.5" />
                <span>Curated Masterpieces</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-[#F5F5F5] tracking-tight mt-1 uppercase">
                EDITOR’S PICKS
              </h2>
            </div>
            <span className="text-xs text-[#7A7A7A] font-mono hidden sm:inline">
              Recommended by the Senior Staff
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {editorsPicks.map((article, idx) => (
              <div
                key={article.id}
                onClick={() => onSelectArticle(article.slug)}
                className="group relative bg-[#151515] hover:bg-[#1A1A1A] border border-[#242424] hover:border-[#383838] p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-4">
                    <span className="font-display font-bold text-3xl text-[#2F2F2F] group-hover:text-[#FF5A1F] transition-colors">
                      0{idx + 1}
                    </span>
                    <span className="font-mono text-[11px] text-[#FF5A1F] uppercase font-semibold">
                      {article.categoryLabel}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-[#F5F5F5] group-hover:text-[#FF5A1F] transition-colors leading-tight line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="mt-3 text-xs text-[#909090] line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[#222222] flex items-center justify-between text-xs text-[#707070]">
                  <span className="text-[#C0C0C0] font-medium">{article.author.name}</span>
                  <span className="font-mono text-[11px]">{article.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. MOTORCYCLE MAINTENANCE AND RIDER SAFETY FEATURE */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-[#FF5A1F] font-semibold">
            Survival Physics & Workshop Discipline
          </span>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-[#F5F5F5] uppercase tracking-tight mt-1">
            MAINTENANCE & RIDER SAFETY
          </h2>
          <p className="mt-2 text-sm text-[#A0A0A0]">
            The two halves of the true rider: mechanical mastery in the garage and survival competence on the road.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Maintenance Spotlight */}
          {maintenanceSpotlight && (
            <div
              onClick={() => onSelectArticle(maintenanceSpotlight.slug)}
              className="group bg-[#131313] border border-[#222222] hover:border-[#FF5A1F]/50 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#EAB308] uppercase tracking-widest font-semibold mb-3">
                  <Wrench className="w-4 h-4" />
                  <span>Workshop Protocol</span>
                </div>

                <h3 className="text-2xl font-display font-bold text-[#F5F5F5] group-hover:text-[#FF5A1F] transition-colors leading-snug">
                  {maintenanceSpotlight.title}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-[#A0A0A0] leading-relaxed">
                  {maintenanceSpotlight.excerpt}
                </p>

                <div className="mt-6 p-4 bg-[#0D0D0D] border border-[#222222]">
                  <span className="text-[11px] font-mono text-[#EAB308] font-bold block mb-1">
                    KEY WRENCH CHECK:
                  </span>
                  <p className="text-xs text-[#C0C0C0] leading-relaxed">
                    Never adjust chain tension on the side stand if loading luggage. Maximum tension
                    occurs when countershaft, pivot, and axle align horizontally.
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#202020] flex items-center justify-between text-xs">
                <span className="text-[#888888]">By {maintenanceSpotlight.author.name}</span>
                <span className="text-[#FF5A1F] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Master the Guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          )}

          {/* Safety Spotlight */}
          {safetySpotlight && (
            <div
              onClick={() => onSelectArticle(safetySpotlight.slug)}
              className="group bg-[#131313] border border-[#222222] hover:border-[#EF4444]/60 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#EF4444] uppercase tracking-widest font-semibold mb-3">
                  <Shield className="w-4 h-4" />
                  <span>Survival Dynamics</span>
                </div>

                <h3 className="text-2xl font-display font-bold text-[#F5F5F5] group-hover:text-[#FF5A1F] transition-colors leading-snug">
                  {safetySpotlight.title}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-[#A0A0A0] leading-relaxed">
                  {safetySpotlight.excerpt}
                </p>

                <div className="mt-6 p-4 bg-[#0D0D0D] border border-[#222222]">
                  <span className="text-[11px] font-mono text-[#EF4444] font-bold block mb-1">
                    100-POINT TRACTION RULE:
                  </span>
                  <p className="text-xs text-[#C0C0C0] leading-relaxed">
                    Never dump the brake lever abruptly before a turn. Keep light front brake applied
                    to compress the fork, steepen geometry, and expand the tire patch until the apex.
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#202020] flex items-center justify-between text-xs">
                <span className="text-[#888888]">By {safetySpotlight.author.name}</span>
                <span className="text-[#FF5A1F] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Technique <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* TECHNICAL RIDING GEAR & ARMOR LAB */}
      <section className="py-16 bg-[#101010] border-y border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8 pb-3 border-b border-[#252525]">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF5A1F] font-semibold">
                Lab Tested · Impact & Weather Protection
              </span>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-[#F5F5F5] uppercase tracking-tight mt-1">
                RIDING GEAR & ARMOR LAB
              </h2>
            </div>
            <button
              onClick={() => onNavigate({ type: 'journal', category: 'gear' })}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF5A1F] hover:text-white transition-colors cursor-pointer"
            >
              <span>Explore All Gear Reviews</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Gear 1: Full-Face Carbon Helmets */}
            <div
              onClick={() => onSelectArticle('science-of-motorcycle-helmets-ece2206-fim')}
              className="group bg-[#141414] border border-[#242424] hover:border-[#FF5A1F]/60 overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between"
            >
              <div className="aspect-[4/3] overflow-hidden bg-black relative">
                <MotorcycleImage
                  src="https://images.unsplash.com/photo-1558980394-4c7c9299fe96?auto=format&fit=crop&w=800&q=80"
                  alt="Full-Face Motorcycle Racing Helmet"
                  category="ECE 22.06 Certified"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono text-[#FF5A1F] uppercase font-bold tracking-wider mb-1">
                    HELMET TECHNOLOGY
                  </div>
                  <h3 className="text-base font-display font-bold text-white group-hover:text-[#FF5A1F] transition-colors leading-tight">
                    ECE 22.06 Rotational Safety Lids
                  </h3>
                  <p className="text-xs text-[#8E8E8E] mt-2 line-clamp-2">
                    Multi-density EPS, carbon-aramid weave, and oblique rotational crash dissipation.
                  </p>
                </div>
                <div className="pt-3 mt-4 border-t border-[#202020] flex items-center justify-between text-xs text-[#707070]">
                  <span className="font-mono text-[11px]">Lab Tested</span>
                  <span className="text-[#FF5A1F] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Guide <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>

            {/* Gear 2: 4-Season Touring Armor */}
            <div
              onClick={() => onSelectArticle('four-season-motorcycle-touring-armor-guide')}
              className="group bg-[#141414] border border-[#242424] hover:border-[#FF5A1F]/60 overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between"
            >
              <div className="aspect-[4/3] overflow-hidden bg-black relative">
                <MotorcycleImage
                  src="https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80"
                  alt="All-Weather Motorcycle Armored Jacket"
                  category="Gore-Tex Pro 3L"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono text-[#FF5A1F] uppercase font-bold tracking-wider mb-1">
                    JACKETS & SUITS
                  </div>
                  <h3 className="text-base font-display font-bold text-white group-hover:text-[#FF5A1F] transition-colors leading-tight">
                    Four-Season Armored Touring Outerwear
                  </h3>
                  <p className="text-xs text-[#8E8E8E] mt-2 line-clamp-2">
                    Direct lamination Gore-Tex Pro shells, D3O Level 2 armor, and SuperFabric panels.
                  </p>
                </div>
                <div className="pt-3 mt-4 border-t border-[#202020] flex items-center justify-between text-xs text-[#707070]">
                  <span className="font-mono text-[11px]">Class AAA</span>
                  <span className="text-[#FF5A1F] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Guide <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>

            {/* Gear 3: Cold-Weather & Heated Gloves */}
            <div
              onClick={() => onSelectArticle('ultimate-winter-riding-heated-gear-guide')}
              className="group bg-[#141414] border border-[#242424] hover:border-[#FF5A1F]/60 overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between"
            >
              <div className="aspect-[4/3] overflow-hidden bg-black relative">
                <MotorcycleImage
                  src="https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80"
                  alt="Reinforced Leather Riding Gloves"
                  category="12V Heated & Armored"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono text-[#FF5A1F] uppercase font-bold tracking-wider mb-1">
                    RIDING GLOVES
                  </div>
                  <h3 className="text-base font-display font-bold text-white group-hover:text-[#FF5A1F] transition-colors leading-tight">
                    Sub-Zero Heated & Armored Gauntlets
                  </h3>
                  <p className="text-xs text-[#8E8E8E] mt-2 line-clamp-2">
                    Direct 12V coaxial harness draw, carbon knuckle shielding, and waterproof membranes.
                  </p>
                </div>
                <div className="pt-3 mt-4 border-t border-[#202020] flex items-center justify-between text-xs text-[#707070]">
                  <span className="font-mono text-[11px]">-10°C Certified</span>
                  <span className="text-[#FF5A1F] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Guide <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>

            {/* Gear 4: Heavy-Duty Adventure Boots */}
            <div
              onClick={() => onNavigate({ type: 'journal', category: 'gear' })}
              className="group bg-[#141414] border border-[#242424] hover:border-[#FF5A1F]/60 overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between"
            >
              <div className="aspect-[4/3] overflow-hidden bg-black relative">
                <MotorcycleImage
                  src="https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80"
                  alt="Heavy Duty Motorcycle Touring Boots"
                  category="CE Level 2 Boots"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono text-[#FF5A1F] uppercase font-bold tracking-wider mb-1">
                    RIDING FOOTWEAR
                  </div>
                  <h3 className="text-base font-display font-bold text-white group-hover:text-[#FF5A1F] transition-colors leading-tight">
                    Enduro & Adventure Armor Boots
                  </h3>
                  <p className="text-xs text-[#8E8E8E] mt-2 line-clamp-2">
                    Bilateral ankle hinge protection, Vibram lugged soles, and crush-proof shin plates.
                  </p>
                </div>
                <div className="pt-3 mt-4 border-t border-[#202020] flex items-center justify-between text-xs text-[#707070]">
                  <span className="font-mono text-[11px]">Full Archive</span>
                  <span className="text-[#FF5A1F] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    All Gear <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. ROAD TRIP AND ADVENTURE SECTION */}
      <section className="py-16 bg-[#111111] border-y border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF5A1F] font-semibold">
                Expedition Dispatches
              </span>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-[#F5F5F5] uppercase tracking-tight leading-tight">
                THE ROAD TRIPS & ADVENTURE COMPASS
              </h2>
              <p className="text-sm text-[#A0A0A0] leading-relaxed">
                From high-altitude Himalayan passes to the punishing crosswinds of Argentine Patagonia,
                our overland team maps the most breathtaking and demanding routes on earth.
              </p>

              <div className="pt-4 space-y-3">
                <div className="flex items-start gap-3 p-3 bg-[#171717] border border-[#262626]">
                  <Compass className="w-5 h-5 text-[#FF5A1F] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase">Trans-Himalayan Pass</h4>
                    <p className="text-xs text-[#808080]">
                      1,840 km · 5,359m elevation at Khardung La · Glacial river crossings.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#171717] border border-[#262626]">
                  <Flame className="w-5 h-5 text-[#FF5A1F] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase">Patagonia’s Ruta 40</h4>
                    <p className="text-xs text-[#808080]">
                      5,194 km · 90 km/h Antarctic crosswinds · Deep ripio gravel drifts.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate({ type: 'journal', category: 'road-trips' })}
                  className="px-6 py-3 bg-[#FF5A1F] hover:bg-[#E04812] text-black text-xs font-display font-bold tracking-wider uppercase transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore All Road Trips</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              {adventureFeature && (
                <div
                  onClick={() => onSelectArticle(adventureFeature.slug)}
                  className="group relative bg-[#161616] border border-[#282828] overflow-hidden cursor-pointer"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <MotorcycleImage
                      src={adventureFeature.coverImage}
                      alt={adventureFeature.title}
                      category="Trans-Himalayan Crossing"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#FF5A1F] uppercase font-semibold mb-1.5">
                      <span>{adventureFeature.categoryLabel}</span>
                      <span className="text-[#444444]">·</span>
                      <span className="text-[#888888]">{adventureFeature.readTime}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-[#F5F5F5] group-hover:text-[#FF5A1F] transition-colors">
                      {adventureFeature.title}
                    </h3>
                    <p className="text-xs text-[#909090] mt-2 line-clamp-2">
                      {adventureFeature.excerpt}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 15. INSTAGRAM-STYLE RIDER CULTURE GALLERY */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-[#222222]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF5A1F] font-semibold">
              The Brotherhood & Sisterhood of Two Wheels
            </span>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-[#F5F5F5] uppercase tracking-tight mt-1">
              RIDER CULTURE GALLERY
            </h2>
          </div>
          <span className="text-xs text-[#7A7A7A] font-mono hidden sm:inline">
            Tag #ThrottleCulture to be featured
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {GALLERY_PHOTOS.map((photo) => {
            const likesCount = likedPhotos[photo.id] !== undefined ? likedPhotos[photo.id] : photo.likes;
            const isLiked = likedPhotos[photo.id] !== undefined;

            return (
              <div
                key={photo.id}
                onClick={() => setSelectedGalleryPhoto(photo)}
                className="group relative aspect-square bg-[#141414] border border-[#222222] overflow-hidden cursor-pointer"
              >
                <MotorcycleImage
                  src={photo.imageUrl}
                  alt={photo.title}
                  category={photo.rider}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Hover overlay with location & likes */}
                <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-between">
                  <div className="text-[10px] font-mono text-[#FF5A1F] flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{photo.location}</span>
                  </div>

                  <div>
                    <h5 className="text-xs font-display font-bold text-white line-clamp-2 leading-tight">
                      {photo.title}
                    </h5>
                    <div className="flex items-center justify-between text-[11px] text-[#A0A0A0] mt-1 pt-1 border-t border-[#333333]">
                      <span>{photo.rider}</span>
                      <button
                        onClick={(e) => handleLikePhoto(photo.id, photo.likes, e)}
                        className={`flex items-center gap-1 ${
                          isLiked ? 'text-[#FF5A1F]' : 'text-white'
                        }`}
                        title="Like photo"
                      >
                        <Heart
                          className={`w-3 h-3 ${isLiked ? 'fill-[#FF5A1F]' : ''}`}
                        />
                        <span>{likesCount}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Lightbox Modal for Gallery Photo */}
      {selectedGalleryPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedGalleryPhoto(null)}
        >
          <div
            className="w-full max-w-4xl bg-[#121212] border border-[#2A2A2A] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="md:col-span-7 bg-black flex items-center justify-center min-h-[300px]">
              <MotorcycleImage
                src={selectedGalleryPhoto.imageUrl}
                alt={selectedGalleryPhoto.title}
                category={selectedGalleryPhoto.bike}
                className="w-full h-full max-h-[500px] object-contain"
              />
            </div>
            <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#141414]">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#242424]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#FF5A1F]/20 border border-[#FF5A1F]/40 flex items-center justify-center text-[#FF5A1F] text-xs font-bold font-mono">
                      {selectedGalleryPhoto.rider.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">
                        {selectedGalleryPhoto.rider}
                      </div>
                      <div className="text-[10px] text-[#888888] font-mono">
                        {selectedGalleryPhoto.date}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedGalleryPhoto(null)}
                    className="p-1.5 text-[#888888] hover:text-white bg-[#222222] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-4">
                  <div className="text-[11px] font-mono text-[#FF5A1F] flex items-center gap-1 mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{selectedGalleryPhoto.location}</span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white">
                    {selectedGalleryPhoto.title}
                  </h3>

                  <p className="text-xs text-[#B0B0B0] mt-3 leading-relaxed">
                    “{selectedGalleryPhoto.caption}”
                  </p>

                  <div className="mt-4 p-3 bg-[#1A1A1A] border border-[#262626] text-xs">
                    <span className="text-[10px] font-mono text-[#777777] uppercase block">
                      Machine Spec
                    </span>
                    <span className="font-semibold text-white">
                      {selectedGalleryPhoto.bike}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#242424] flex items-center justify-between">
                <button
                  onClick={(e) =>
                    handleLikePhoto(
                      selectedGalleryPhoto.id,
                      selectedGalleryPhoto.likes,
                      e
                    )
                  }
                  className="flex items-center gap-2 text-xs font-semibold px-4 py-2 bg-[#222222] hover:bg-[#333333] text-white transition-colors cursor-pointer"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      likedPhotos[selectedGalleryPhoto.id] !== undefined
                        ? 'fill-[#FF5A1F] text-[#FF5A1F]'
                        : ''
                    }`}
                  />
                  <span>
                    {likedPhotos[selectedGalleryPhoto.id] !== undefined
                      ? likedPhotos[selectedGalleryPhoto.id]
                      : selectedGalleryPhoto.likes}{' '}
                    Likes
                  </span>
                </button>

                <span className="text-[11px] font-mono text-[#666666]">
                  #THROTTLECULTURE
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 14. NEWSLETTER SUBSCRIPTION SECTION */}
      <section className="py-20 bg-[#0C0C0C] border-t border-[#222222] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#FF5A1F_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 text-xs font-mono text-[#FF5A1F] uppercase font-semibold mb-4">
            <Zap className="w-3.5 h-3.5" />
            The Weekly Briefing
          </span>

          <h2 className="text-4xl sm:text-5xl font-display font-bold text-[#F5F5F5] uppercase tracking-tight">
            JOIN 48,000+ DEDICATED RIDERS
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#A0A0A0] max-w-xl mx-auto leading-relaxed">
            Get our Sunday morning dispatch: zero sponsored fluff, one deep technical tear-down,
            and exclusive GPX route files straight to your inbox.
          </p>

          <div className="mt-8 max-w-md mx-auto">
            {newsletterSuccess ? (
              <div className="p-4 bg-[#141414] border border-[#10B981]/50 text-xs text-[#10B981] flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>You are subscribed to The Throttle Dispatch! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-[#161616] border border-[#2B2B2B] px-4 py-3.5 text-sm text-[#F5F5F5] placeholder-[#555555] focus:outline-none focus:border-[#FF5A1F]"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-[#FF5A1F] hover:bg-[#E04812] text-black font-display font-bold text-sm tracking-wider uppercase transition-colors shrink-0 cursor-pointer"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
            <p className="text-[11px] text-[#666666] mt-3">
              We respect your throttle time. No marketing spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
