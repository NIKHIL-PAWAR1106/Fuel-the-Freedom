import React from 'react';
import { Shield, Compass, Wrench, Heart, Award, ArrowRight } from 'lucide-react';
import { AUTHORS } from '../data/articles';
import { PageRoute } from '../types';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F5F5F5] py-12 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="max-w-4xl border-b border-[#222222] pb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#FF5A1F] font-semibold mb-3">
            <span>The Throttle Culture Manifesto</span>
            <span className="text-[#555555]">/</span>
            <span>Est. 2026</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-[#F5F5F5] uppercase tracking-tight leading-[0.95]">
            MORE THAN MACHINES. <br />
            <span className="text-[#FF5A1F]">IT’S A WAY OF LIFE.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-[#C0C0C0] font-light leading-relaxed">
            We are an independent motorcycle lifestyle publication created for the riders who
            measure life not in odometer numbers, but in heart rate, gravel passes, canyon apexes,
            and the smell of hot motor oil after a 600-mile day.
          </p>

          <div className="mt-6 inline-block bg-[#161616] border border-[#2A2A2A] px-4 py-2 text-xs font-mono tracking-widest text-[#FF5A1F] uppercase font-semibold">
            Brand Tagline: “Built for the Ride. Driven by Passion.”
          </div>
        </div>

        {/* 4 Pillars of Throttle Culture */}
        <section className="py-16 border-b border-[#222222]">
          <div className="mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF5A1F] font-semibold">
              Foundational Principles
            </span>
            <h2 className="text-3xl font-display font-bold text-[#F5F5F5] uppercase mt-1">
              OUR EDITORIAL VALUES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#131313] border border-[#222222] space-y-3">
              <div className="w-10 h-10 bg-[#FF5A1F]/15 border border-[#FF5A1F]/30 flex items-center justify-center text-[#FF5A1F]">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-bold uppercase text-white">
                Uncompromising Truth
              </h3>
              <p className="text-xs text-[#909090] leading-relaxed">
                Zero sponsored puff pieces. If a motorcycle suffers from brake fade, clumsy fueling, or
                an abusive seat, our readers will read the cold, hard telemetry data.
              </p>
            </div>

            <div className="p-6 bg-[#131313] border border-[#222222] space-y-3">
              <div className="w-10 h-10 bg-[#FF5A1F]/15 border border-[#FF5A1F]/30 flex items-center justify-center text-[#FF5A1F]">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-bold uppercase text-white">
                Soul of Adventure
              </h3>
              <p className="text-xs text-[#909090] leading-relaxed">
                We believe true motorcycling begins where cell reception ends. We map the high passes,
                the desert tracks, and the forgotten coastal two-lanes that demand real grit.
              </p>
            </div>

            <div className="p-6 bg-[#131313] border border-[#222222] space-y-3">
              <div className="w-10 h-10 bg-[#FF5A1F]/15 border border-[#FF5A1F]/30 flex items-center justify-center text-[#FF5A1F]">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-bold uppercase text-white">
                Garage Mastery
              </h3>
              <p className="text-xs text-[#909090] leading-relaxed">
                A real rider understands the machine. We celebrate wrenching competence, valve
                clearances, torque specs, and the tactile relationship between tool and steel.
              </p>
            </div>

            <div className="p-6 bg-[#131313] border border-[#222222] space-y-3">
              <div className="w-10 h-10 bg-[#FF5A1F]/15 border border-[#FF5A1F]/30 flex items-center justify-center text-[#FF5A1F]">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-bold uppercase text-white">
                The Community Bond
              </h3>
              <p className="text-xs text-[#909090] leading-relaxed">
                Whether you ride an air-cooled vintage Honda, an Italian superbike, or a loaded
                adventure rig, the wave on the open road unites us in a shared brotherhood.
              </p>
            </div>
          </div>
        </section>

        {/* Editorial Board */}
        <section className="py-16 border-b border-[#222222]">
          <div className="mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF5A1F] font-semibold">
              The Riders Behind the Words
            </span>
            <h2 className="text-3xl font-display font-bold text-[#F5F5F5] uppercase mt-1">
              THE EDITORIAL TEAM
            </h2>
            <p className="text-xs text-[#888888] mt-1">
              Meet our seasoned test riders, engineers, and expedition leaders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.values(AUTHORS).map((author) => (
              <div
                key={author.name}
                className="bg-[#141414] border border-[#242424] p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6"
              >
                <img
                  src={author.avatar}
                  alt={author.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-full object-cover border-2 border-[#FF5A1F] shrink-0"
                />
                <div className="text-center sm:text-left">
                  <span className="text-xs font-mono text-[#FF5A1F] uppercase font-bold">
                    {author.role}
                  </span>
                  <h3 className="text-xl font-display font-bold text-white mt-1">
                    {author.name}
                  </h3>
                  <p className="text-xs text-[#A0A0A0] mt-2 leading-relaxed">
                    {author.bio}
                  </p>
                  <div className="mt-3 pt-3 border-t border-[#222222] text-xs font-mono text-[#777777]">
                    Current Garage: <span className="text-white">{author.bike}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Test Fleet & Ethics Policy */}
        <section className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#131313] border border-[#242424] p-8 sm:p-12">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF5A1F] font-semibold">
                Our Promise to You
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase">
                THE THROTTLE CULTURE TESTING CODE
              </h2>
              <p className="text-sm text-[#A0A0A0] leading-relaxed">
                When manufacturers lend us motorcycles or gear companies ship us jackets for review,
                they sign our charter: we do not accept compensation for positive ratings. If an engine
                overheats in traffic or a zipper shears in rain, we publish it plainly with photographic
                proof. Our allegiance is to the rider on the road, always.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <a
                href="/journal"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate({ type: 'journal' });
                }}
                aria-label="Read our motorcycle reviews in The Rider's Journal"
                className="w-full py-3.5 bg-[#FF5A1F] hover:bg-[#E04812] text-black font-display font-bold text-xs uppercase tracking-wider transition-colors text-center cursor-pointer block"
              >
                READ OUR REVIEWS
              </a>
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate({ type: 'contact' });
                }}
                aria-label="Pitch a ride dispatch to the Throttle Culture editorial desk"
                className="w-full py-3.5 bg-[#1C1C1C] hover:bg-[#252525] text-white border border-[#333333] font-display font-bold text-xs uppercase tracking-wider transition-colors text-center cursor-pointer block"
              >
                PITCH A RIDE DISPATCH
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
