import React from 'react';
import { ArrowUpRight, Instagram, Twitter, Youtube, Disc } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  return (
    <footer className="bg-[#FAF9F6] dark:bg-[#0A0A0C] text-slate-800 dark:text-zinc-200 border-t border-black/5 dark:border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-black/5 dark:border-white/10">
          
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-3xl font-display font-black tracking-tight text-slate-900 dark:text-white">
              NOVA
            </span>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 font-serif italic">
              “Shop less. Discover better.”
            </p>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed max-w-sm">
              A studio shopping platform curating high-design objects, pure acoustics, and mindful everyday essentials for living distinct.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3 pt-2 text-slate-500 dark:text-zinc-400">
              <a href="#" className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:text-[#7C3AED] transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:text-[#7C3AED] transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:text-[#7C3AED] transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:text-[#7C3AED] transition-colors" aria-label="Discord">
                <Disc className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
            
            {/* Shop */}
            <div>
              <h4 className="font-mono uppercase tracking-wider text-slate-400 mb-4 text-[11px]">
                Shop
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <button onClick={() => onNavigateSection('featured-products')} className="text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
                    New Arrivals
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateSection('trending')} className="text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
                    Trending
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateSection('featured-products')} className="text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
                    Best Sellers
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateSection('drop-section')} className="text-slate-600 hover:text-[#7C3AED] dark:text-zinc-400 dark:hover:text-[#A78BFA] transition-colors flex items-center gap-1">
                    <span>The Next Drop</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </li>
              </ul>
            </div>

            {/* Help */}
            <div>
              <h4 className="font-mono uppercase tracking-wider text-slate-400 mb-4 text-[11px]">
                Help & Support
              </h4>
              <ul className="space-y-2.5">
                <li><a href="#why-nova" className="text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white">Shipping & Customs</a></li>
                <li><a href="#why-nova" className="text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white">14-Day Returns Policy</a></li>
                <li><a href="#why-nova" className="text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white">Warranty Registration</a></li>
                <li><a href="#why-nova" className="text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white">Frequently Asked Questions</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-mono uppercase tracking-wider text-slate-400 mb-4 text-[11px]">
                Company
              </h4>
              <ul className="space-y-2.5">
                <li><a href="#why-nova" className="text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white">Design Manifesto</a></li>
                <li><a href="#why-nova" className="text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white">Careers (Hiring Designers)</a></li>
                <li><a href="#why-nova" className="text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white">Privacy Standards</a></li>
                <li><a href="#why-nova" className="text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white">Terms of Curated Sale</a></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            © {new Date().getFullYear()} NOVA Retail Lab. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Secured with 256-bit TLS</span>
            <span>·</span>
            <span>Delivered via Climate-Neutral Air</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
