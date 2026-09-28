import React, { useState } from 'react';
import { HERO_IMAGE } from '../data/products';
import { ArrowUpRight, Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onDiscoverStyle: () => void;
  onSelectProduct: (productId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onDiscoverStyle, onSelectProduct }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="hero" className="relative pt-6 pb-16 md:pt-10 md:pb-24 overflow-hidden">
      {/* Subtle organic ambient gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#7C3AED]/10 via-[#C084FC]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#7C3AED] dark:text-[#A78BFA] uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-[#7C3AED] animate-ping" />
              <span>COLLECTION 2026 // EDITION 01</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] [text-wrap:balance]">
              SHOP DIFFERENT.<br />
              <span className="italic font-serif font-light text-slate-700 dark:text-zinc-300">LIVE DISTINCT.</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-zinc-400 font-normal leading-relaxed max-w-xl">
              Discover products designed to match your personality, lifestyle and everyday moments. Handcrafted materials, pure acoustics, and timeless aesthetics.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onExplore}
                className="px-7 py-3.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold text-sm rounded-full hover:bg-slate-800 dark:hover:bg-zinc-100 transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 group cursor-pointer"
              >
                <span>Explore Collection</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={onDiscoverStyle}
                className="px-6 py-3.5 bg-white/80 dark:bg-zinc-800/80 hover:bg-white dark:hover:bg-zinc-800 text-slate-900 dark:text-white font-medium text-sm rounded-full border border-black/10 dark:border-white/10 transition-all shadow-sm hover:border-[#7C3AED]/40 flex items-center gap-2.5 group cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#7C3AED] transition-transform group-hover:rotate-12" />
                <span>Discover Your Style</span>
              </button>
            </div>

            {/* Micro trust indicators */}
            <div className="mt-12 pt-8 border-t border-black/5 dark:border-white/10 grid grid-cols-3 gap-4 text-xs text-slate-600 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#7C3AED] shrink-0" />
                <span className="leading-tight">Free Express Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#7C3AED] shrink-0" />
                <span className="leading-tight">2-Year Official Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-[#7C3AED] shrink-0" />
                <span className="leading-tight">14-Day Easy Exchange</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Collage with Floating Glass Cards */}
          <div className="lg:col-span-6 relative">
            <div 
              className="relative mx-auto max-w-lg lg:max-w-none group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Main Campaign Editorial Frame */}
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] shadow-2xl border border-black/5 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900">
                <img
                  src={HERO_IMAGE}
                  alt="NOVA 2026 Lifestyle and Fashion Campaign"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="eager"
                />
                
                {/* Contrast overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                {/* Overlay Text */}
                <div className="absolute bottom-6 left-6 right-6 text-white flex items-end justify-between">
                  <div>
                    <span className="text-[11px] font-mono tracking-wider text-white/80 uppercase">
                      Curated Runway & Sound
                    </span>
                    <h3 className="text-xl font-display font-bold text-white">
                      The Minimalist Autumn Suite
                    </h3>
                  </div>
                  <span className="text-xs font-mono bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-white border border-white/20">
                    Series 01
                  </span>
                </div>
              </div>

              {/* Floating Product Card 1: Aurora Watch */}
              <div 
                onClick={() => onSelectProduct('aurora-smart-watch')}
                className={`absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-6 glass-panel rounded-2xl p-3 sm:p-4 shadow-xl border border-white/60 dark:border-white/15 flex items-center gap-3.5 cursor-pointer transition-all duration-300 ${
                  isHovered ? 'translate-y-[-4px] shadow-2xl' : ''
                }`}
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 shrink-0">
                  <img
                    src="/src/assets/images/product_aurora_watch_1790579697680.jpg"
                    alt="Aurora Watch"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#7C3AED] dark:text-[#A78BFA] font-bold">
                    Featured
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                    Aurora Watch
                  </div>
                  <div className="text-xs font-mono font-medium text-slate-600 dark:text-zinc-300">
                    ₹14,999
                  </div>
                </div>
              </div>

              {/* Floating Product Card 2: Nova Air Drop */}
              <div 
                onClick={() => onSelectProduct('nova-air-limited')}
                className={`hidden sm:flex absolute -top-4 -right-4 glass-panel rounded-2xl p-3 shadow-xl border border-white/60 dark:border-white/15 items-center gap-3 cursor-pointer transition-all duration-300 ${
                  isHovered ? 'translate-y-[-2px]' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-zinc-900 shrink-0">
                  <img
                    src="/src/assets/images/drop_nova_air_1790579627318.jpg"
                    alt="NOVA Air"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="pr-1">
                  <div className="text-[10px] font-mono tracking-wider text-rose-500 font-bold uppercase">
                    Drop 01
                  </div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-white">
                    NOVA Air Ltd.
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
