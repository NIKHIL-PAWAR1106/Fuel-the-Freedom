import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';
import { CATEGORIES } from '../data/articles';
import { CategoryId, PageRoute } from '../types';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
  onToast: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onToast }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      onToast('Please provide a valid email address.');
      return;
    }
    setSubscribed(true);
    onToast('Welcome to The Throttle Dispatch! Check your inbox.');
    setEmail('');
  };

  return (
    <footer className="bg-[#080808] border-t border-[#1F1F1F] text-[#A0A0A0] text-sm pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#1A1A1A]">
          {/* Col 1 & 2: Brand & Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#FF5A1F] flex items-center justify-center font-display font-bold text-black text-lg">
                TC
              </div>
              <span className="font-display font-bold text-2xl tracking-tighter text-[#F5F5F5]">
                THROTTLE<span className="text-[#FF5A1F]">CULTURE</span>
              </span>
            </div>

            <p className="text-xs font-mono tracking-widest text-[#FF5A1F] uppercase font-semibold">
              “Built for the Ride. Driven by Passion.”
            </p>

            <p className="text-sm text-[#888888] leading-relaxed max-w-sm">
              An independent motorcycle lifestyle publication dedicated to authentic road tests,
              scientific rider safety, workshop craft, and unfiltered travel dispatches. We write for
              riders who live for the journey, not the garage trophy case.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-[#707070]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#FF5A1F]" />
                Independent Editorial Integrity
              </span>
              <span>·</span>
              <span>Zero Sponsored Bias</span>
            </div>
          </div>

          {/* Col 3: Categories */}
          <div>
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-[#F5F5F5] mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <a
                    href={`/journal/${cat.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate({ type: 'journal', category: cat.id });
                    }}
                    className="hover:text-[#FF5A1F] transition-colors text-left cursor-pointer inline-block"
                  >
                    {cat.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Editorial & Community */}
          <div>
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-[#F5F5F5] mb-4">
              Publication
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate({ type: 'about' });
                  }}
                  className="hover:text-[#FF5A1F] transition-colors cursor-pointer inline-block"
                >
                  About the Magazine
                </a>
              </li>
              <li>
                <a
                  href="/journal"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate({ type: 'journal' });
                  }}
                  className="hover:text-[#FF5A1F] transition-colors cursor-pointer inline-block"
                >
                  The Rider’s Journal
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate({ type: 'contact' });
                  }}
                  className="hover:text-[#FF5A1F] transition-colors cursor-pointer inline-block"
                >
                  Contact & Press Bikes
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ type: 'contact' })}
                  className="hover:text-[#FF5A1F] transition-colors cursor-pointer"
                >
                  Submit Rider Dispatches
                </button>
              </li>
              <li>
                <span className="text-[#606060]">Print Archive (Vol. 01–06)</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Newsletter Box */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-[#F5F5F5]">
              The Throttle Dispatch
            </h4>
            <p className="text-xs text-[#808080] leading-relaxed">
              Curated Sunday dispatch featuring one technical tear-down, one secret mountain route, and
              our latest long-term fleet review.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#171717] border border-[#2B2B2B] flex items-center gap-2 text-xs text-[#10B981]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You're on the priority dispatch list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rider@throttleculture.com"
                    className="w-full bg-[#141414] border border-[#2B2B2B] px-3 py-2 text-xs text-[#F5F5F5] placeholder-[#555555] focus:outline-none focus:border-[#FF5A1F]"
                  />
                  <button
                    type="submit"
                    className="bg-[#FF5A1F] hover:bg-[#E04812] text-black px-3 py-2 text-xs font-bold transition-colors shrink-0"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-[10px] text-[#666666] block">
                  Strictly 0% spam. Unsubscribe in one click.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#666666]">
          <div>
            <p>© {new Date().getFullYear()} THROTTLE CULTURE MEDIA GROUP. All rights reserved.</p>
            <p className="text-[11px] text-[#4A4A4A] mt-0.5">
              Always ride within your limits and wear complete personal protective equipment (ATGATT).
            </p>
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-[#F5F5F5] transition-colors cursor-pointer">Instagram</span>
            <span className="hover:text-[#F5F5F5] transition-colors cursor-pointer">YouTube</span>
            <span className="hover:text-[#F5F5F5] transition-colors cursor-pointer">X / Twitter</span>
            <span className="hover:text-[#F5F5F5] transition-colors cursor-pointer">Strava Moto</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
