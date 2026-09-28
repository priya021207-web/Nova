import React, { useState, useMemo, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import { Search, X, TrendingUp, Clock, Star, ShoppingBag, ArrowRight } from 'lucide-react';

interface SearchOverlayProps {
  onSelectProduct: (product: Product) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ onSelectProduct }) => {
  const { products, isSearchOpen, setIsSearchOpen, addToCart } = useShop();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [minRating, setMinRating] = useState<number>(0);

  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nova_recent_searches');
      return saved ? JSON.parse(saved) : ['Titanium Watch', 'Sneakers', 'Acoustic', 'Ceramics'];
    } catch {
      return ['Titanium Watch', 'Sneakers', 'Acoustic'];
    }
  });

  const trendingSearches = ['Aurora Watch', 'NOVA Air Drop', 'Ceramic Set', 'Wool Sneaker', 'Aura Backpack'];

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  const handleSearchSubmit = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    setQuery(searchTerm);
    if (!recentSearches.includes(searchTerm)) {
      const updated = [searchTerm, ...recentSearches].slice(0, 6);
      setRecentSearches(updated);
      try {
        localStorage.setItem('nova_recent_searches', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const clearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem('nova_recent_searches');
  };

  // Filtered results
  const results = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();
    return products.filter(p => {
      const matchesQuery = 
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.features.some(f => f.toLowerCase().includes(q));

      const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesRating = p.rating >= minRating;

      return matchesQuery && matchesCat && matchesRating;
    });
  }, [products, query, selectedCategory, minRating]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex flex-col p-4 sm:p-8 animate-in fade-in duration-200">
      
      {/* Top Bar with Input & Close */}
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between pb-6 border-b border-white/10">
        <div className="flex-1 relative flex items-center">
          <Search className="w-5 h-5 text-slate-400 absolute left-4" />
          <input
            type="text"
            autoFocus
            placeholder="Search audio, watches, apparel, homeware, or materials..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearchSubmit(query);
            }}
            className="w-full bg-white/10 text-white placeholder-zinc-400 text-sm sm:text-base font-sans rounded-2xl pl-12 pr-10 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] border border-white/10"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 text-zinc-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          onClick={() => setIsSearchOpen(false)}
          className="ml-4 p-3 rounded-full hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
          aria-label="Close search"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Overlay Content */}
      <div className="max-w-4xl w-full mx-auto flex-1 overflow-y-auto pt-6 text-white space-y-8">
        
        {/* If query is empty, show trending & recent */}
        {!query.trim() && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Recent Searches */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono uppercase text-zinc-400 mb-3">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Recent Searches</span>
                </span>
                {recentSearches.length > 0 && (
                  <button onClick={clearRecent} className="text-zinc-500 hover:text-zinc-300 normal-case">
                    Clear All
                  </button>
                )}
              </div>

              {recentSearches.length === 0 ? (
                <p className="text-xs text-zinc-500">No recent searches yet.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term, i) => (
                    <button
                      key={i}
                      onClick={() => handleSearchSubmit(term)}
                      className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Trending Searches */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-zinc-400 mb-3">
                <TrendingUp className="w-3.5 h-3.5 text-[#A78BFA]" />
                <span>Trending Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((term, i) => (
                  <button
                    key={i}
                    onClick={() => handleSearchSubmit(term)}
                    className="px-3.5 py-1.5 rounded-full bg-[#7C3AED]/20 hover:bg-[#7C3AED]/40 border border-[#7C3AED]/30 text-xs text-[#A78BFA] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{term}</span>
                    <ArrowRight className="w-3 h-3 opacity-60" />
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Filters if typing */}
        {query.trim() && (
          <div className="flex flex-wrap items-center gap-3 pb-3 border-b border-white/10 text-xs">
            <span className="text-zinc-400 font-mono">FILTER:</span>
            {['All', 'Fashion', 'Electronics', 'Gadgets', 'Home & Living', 'Accessories', 'Beauty'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full border transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#7C3AED] border-[#7C3AED] text-white font-semibold'
                    : 'border-white/10 hover:border-white/30 text-zinc-300'
                }`}
              >
                {cat}
              </button>
            ))}
            
            <div className="ml-auto flex items-center gap-2">
              <span className="text-zinc-400 font-mono">MIN RATING:</span>
              {[0, 4.5, 4.8].map((rat) => (
                <button
                  key={rat}
                  onClick={() => setMinRating(rat)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                    minRating === rat ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {rat === 0 ? 'Any' : `${rat}★+`}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Stream */}
        {query.trim() && (
          <div>
            <div className="text-xs font-mono uppercase text-zinc-400 mb-4">
              Found {results.length} results for "{query}"
            </div>

            {results.length === 0 ? (
              <div className="py-16 text-center text-zinc-400">
                <p className="text-sm">No products matched your search parameters.</p>
                <p className="text-xs text-zinc-500 mt-1">Try exploring different keywords like "watch", "headphones", or "backpack".</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      onSelectProduct(product);
                    }}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-white/20 transition-all cursor-pointer flex items-center gap-3.5 group"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-black/40 shrink-0">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-mono text-[#A78BFA] uppercase">
                        {product.category}
                      </div>
                      <h4 className="text-xs font-semibold text-white truncate group-hover:text-violet-300">
                        {product.name}
                      </h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs font-mono font-bold text-zinc-200">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        <div className="flex items-center gap-0.5 text-[10px] text-amber-400">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
