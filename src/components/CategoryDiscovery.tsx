import React from 'react';
import { CATEGORIES } from '../data/products';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface CategoryDiscoveryProps {
  onSelectCategory: (categoryName: string) => void;
}

export const CategoryDiscovery: React.FC<CategoryDiscoveryProps> = ({ onSelectCategory }) => {
  const { activeCategoryFilter } = useShop();

  return (
    <section id="categories" className="py-16 md:py-24 bg-white/50 dark:bg-zinc-900/30 border-y border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#7C3AED] dark:text-[#A78BFA] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INTERACTIVE DISCOVERY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-slate-900 dark:text-white">
              FIND YOUR NEXT FAVORITE
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm text-slate-600 dark:text-zinc-400 max-w-md">
            Explore seven distinct realms of thoughtful design, tactile engineering, and conscious aesthetics.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => {
            const isLarge = idx === 0;
            const isSelected = activeCategoryFilter === cat.name;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.name)}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5 shadow-sm hover:shadow-2xl border ${
                  isSelected 
                    ? 'ring-2 ring-[#7C3AED] border-transparent' 
                    : 'border-black/5 dark:border-white/10'
                } ${isLarge ? 'sm:col-span-2 lg:col-span-2 aspect-[16/9] sm:aspect-[2/1]' : 'aspect-[4/3] sm:aspect-[4/4]'}`}
              >
                {/* Background Image with Zoom */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-108"
                  loading="lazy"
                />

                {/* Subtle base gradient + hover accent gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#7C3AED]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-white/90 border border-white/20">
                      {cat.tag}
                    </span>
                    <span className="text-xs font-mono text-white/70">
                      {cat.count} Items
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-display font-bold tracking-tight text-white group-hover:text-violet-200 transition-colors">
                        {cat.name}
                      </h3>
                      <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-white/80 line-clamp-2 max-w-sm font-normal">
                      {cat.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
