import React, { useState } from 'react';
import { Search, Menu, X, ChevronRight, Compass } from 'lucide-react';
import { CategoryId, PageRoute } from '../types';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; route: PageRoute; categoryId?: CategoryId }[] = [
    { label: 'HOME', route: { type: 'home' } },
    { label: 'REVIEWS', route: { type: 'journal', category: 'reviews' }, categoryId: 'reviews' },
    { label: 'RIDING GEAR', route: { type: 'journal', category: 'gear' }, categoryId: 'gear' },
    { label: 'MAINTENANCE', route: { type: 'journal', category: 'maintenance' }, categoryId: 'maintenance' },
    { label: 'ROAD TRIPS', route: { type: 'journal', category: 'road-trips' }, categoryId: 'road-trips' },
    { label: 'ADVENTURE', route: { type: 'journal', category: 'adventure' }, categoryId: 'adventure' },
    { label: 'CULTURE', route: { type: 'journal', category: 'culture' }, categoryId: 'culture' },
    { label: 'ABOUT', route: { type: 'about' } },
  ];

  const isItemActive = (item: typeof navItems[0]) => {
    if (item.route.type === 'home' && currentRoute.type === 'home') return true;
    if (item.route.type === 'about' && currentRoute.type === 'about') return true;
    if (
      currentRoute.type === 'journal' &&
      item.categoryId &&
      currentRoute.category === item.categoryId
    ) {
      return true;
    }
    return false;
  };

  const handleNavClick = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B0B0B]/95 backdrop-blur-md border-b border-[#222222] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 lg:gap-8">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick({ type: 'home' })}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
            >
              <div className="w-9 h-9 bg-[#FF5A1F] flex items-center justify-center font-display font-bold text-black text-xl tracking-tighter group-hover:bg-white transition-colors duration-200">
                TC
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-2xl tracking-tighter text-[#F5F5F5] group-hover:text-[#FF5A1F] transition-colors leading-none">
                  THROTTLE<span className="text-[#FF5A1F]">CULTURE</span>
                </span>
                <span className="text-[9px] font-mono tracking-[0.25em] text-[#808080] uppercase mt-0.5">
                  Est. 2026 · Built for the Ride
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-6 text-xs font-semibold tracking-wider">
            {navItems.map((item) => {
              const active = isItemActive(item);
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.route)}
                  className={`relative py-1 whitespace-nowrap transition-colors duration-150 cursor-pointer ${
                    active
                      ? 'text-[#FF5A1F]'
                      : 'text-[#C5C5C5] hover:text-white'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF5A1F]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Search, Journal CTA, Mobile Toggle) */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 text-xs font-medium text-[#A0A0A0] hover:text-[#F5F5F5] bg-[#161616] hover:bg-[#202020] border border-[#2B2B2B] px-3 py-2 transition-all cursor-pointer"
              title="Search articles (Cmd+K)"
            >
              <Search className="w-4 h-4 text-[#FF5A1F]" />
              <span className="hidden sm:inline text-xs">Search Journal</span>
              <kbd className="hidden md:inline text-[10px] font-mono text-[#666666] bg-[#0F0F0F] px-1 py-0.5 border border-[#333333]">
                /
              </kbd>
            </button>

            {/* Direct Journal CTA */}
            <button
              onClick={() => handleNavClick({ type: 'journal' })}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase px-4 py-2 bg-[#FF5A1F] hover:bg-[#E04812] text-black transition-colors cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>The Journal</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-[#F5F5F5] hover:text-[#FF5A1F] bg-[#161616] border border-[#2B2B2B] cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0F0F0F] border-b border-[#222222] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const active = isItemActive(item);
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.route)}
                  className={`flex items-center justify-between w-full px-4 py-3 text-sm font-semibold tracking-wide text-left transition-colors ${
                    active
                      ? 'bg-[#1C1C1C] text-[#FF5A1F] border-l-2 border-[#FF5A1F]'
                      : 'text-[#D0D0D0] hover:bg-[#161616] hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#555555]" />
                </button>
              );
            })}

            <button
              onClick={() => handleNavClick({ type: 'contact' })}
              className={`flex items-center justify-between w-full px-4 py-3 text-sm font-semibold tracking-wide text-left transition-colors ${
                currentRoute.type === 'contact'
                  ? 'bg-[#1C1C1C] text-[#FF5A1F] border-l-2 border-[#FF5A1F]'
                  : 'text-[#D0D0D0] hover:bg-[#161616] hover:text-white'
              }`}
            >
              <span>CONTACT & DISPATCH</span>
              <ChevronRight className="w-4 h-4 text-[#555555]" />
            </button>
          </div>

          <div className="pt-3 border-t border-[#222222] flex gap-2">
            <button
              onClick={() => handleNavClick({ type: 'journal' })}
              className="flex-1 py-3 text-center text-xs font-bold uppercase tracking-wider bg-[#FF5A1F] text-black"
            >
              Browse All 12+ Articles
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
