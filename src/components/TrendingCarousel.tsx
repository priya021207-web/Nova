import React, { useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import { ChevronLeft, ChevronRight, ShoppingBag, Heart, Star, Sparkles } from 'lucide-react';

interface TrendingCarouselProps {
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const TrendingCarousel: React.FC<TrendingCarouselProps> = ({ onSelectProduct, onQuickView }) => {
  const { products, addToCart, toggleWishlist, isInWishlist } = useShop();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const trendingProducts = products.filter(p => p.isTrending || p.badge);

  return (
    <section id="trending" className="py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Navigation Arrows */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#7C3AED] dark:text-[#A78BFA] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COMMUNITY DEMAND</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <span>🔥 TRENDING NOW</span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-full border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-slate-700 dark:text-zinc-200 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-full border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-slate-700 dark:text-zinc-200 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Track */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth no-scrollbar snap-x snap-mandatory"
        >
          {trendingProducts.map((product) => {
            const isSaved = isInWishlist(product.id);

            return (
              <div
                key={product.id}
                className="w-[280px] sm:w-[320px] shrink-0 snap-start bg-white dark:bg-[#18181B] rounded-3xl p-4 border border-black/5 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Image container */}
                  <div 
                    className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900/60 mb-3 cursor-pointer"
                    onClick={() => onSelectProduct(product)}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-2.5 left-2.5">
                        <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-md bg-white/95 dark:bg-black/95 text-slate-900 dark:text-zinc-100 font-semibold shadow-sm">
                          {product.badge}
                        </span>
                      </div>
                    )}

                    {/* Wishlist toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center text-slate-700 dark:text-zinc-200 hover:text-rose-500 transition-colors"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 mb-1">
                    <span className="font-mono text-[10px] uppercase text-[#7C3AED] dark:text-[#A78BFA] font-medium">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="tabular-nums font-medium text-slate-700 dark:text-zinc-300">
                        {product.rating}
                      </span>
                    </div>
                  </div>

                  <h3 
                    onClick={() => onSelectProduct(product)}
                    className="font-semibold text-sm text-slate-900 dark:text-white line-clamp-1 cursor-pointer hover:text-[#7C3AED]"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                    {product.subtitle}
                  </p>
                </div>

                {/* Price & Action */}
                <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono font-bold text-sm text-slate-900 dark:text-white tabular-nums">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-[11px] font-mono text-slate-400 line-through tabular-nums">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(product, 1)}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-[#7C3AED] dark:bg-white dark:text-slate-900 dark:hover:bg-[#A78BFA] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>Bag</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
