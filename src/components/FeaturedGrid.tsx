import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { Product } from '../types';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface FeaturedGridProps {
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const FeaturedGrid: React.FC<FeaturedGridProps> = ({ onSelectProduct, onQuickView }) => {
  const { products, activeCategoryFilter, setActiveCategoryFilter } = useShop();
  
  const [selectedSort, setSelectedSort] = useState<'curated' | 'price-asc' | 'price-desc' | 'rating'>('curated');
  const [priceMax, setPriceMax] = useState<number>(25000);

  const categories = ['All', 'Fashion', 'Electronics', 'Beauty', 'Home & Living', 'Accessories', 'Gadgets'];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (activeCategoryFilter && activeCategoryFilter !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === activeCategoryFilter.toLowerCase());
    }

    // Price filter
    result = result.filter(p => p.price <= priceMax);

    // Sorting
    switch (selectedSort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'curated':
      default:
        // Curated first
        result.sort((a, b) => (b.isCurated ? 1 : 0) - (a.isCurated ? 1 : 0));
        break;
    }

    return result;
  }, [products, activeCategoryFilter, selectedSort, priceMax]);

  return (
    <section id="featured-products" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="text-xs font-mono tracking-widest text-[#7C3AED] dark:text-[#A78BFA] uppercase mb-2">
              EXECUTIVE SELECTION
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-slate-900 dark:text-white">
              CURATED FOR YOU
            </h2>
          </div>
          <p className="mt-2 md:mt-0 text-sm text-slate-600 dark:text-zinc-400 max-w-sm">
            Intentionally engineered pieces designed to balance form, function, and enduring beauty.
          </p>
        </div>

        {/* Filter & Sort Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-2 bg-white dark:bg-[#18181B] rounded-2xl border border-black/5 dark:border-white/10 shadow-sm mb-8">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full no-scrollbar">
            {categories.map((cat) => {
              const active = (!activeCategoryFilter && cat === 'All') || activeCategoryFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryFilter(cat === 'All' ? null : cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400 font-mono">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>SORT:</span>
            </div>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value as any)}
              className="bg-transparent text-xs font-semibold text-slate-800 dark:text-zinc-200 border-none focus:outline-none cursor-pointer pr-4"
            >
              <option value="curated" className="bg-white dark:bg-zinc-900">Recommended</option>
              <option value="price-asc" className="bg-white dark:bg-zinc-900">Price: Low to High</option>
              <option value="price-desc" className="bg-white dark:bg-zinc-900">Price: High to Low</option>
              <option value="rating" className="bg-white dark:bg-zinc-900">Highest Rated</option>
            </select>
          </div>

        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#18181B] rounded-3xl border border-black/5 dark:border-white/10 p-8">
            <SlidersHorizontal className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <h4 className="text-base font-semibold text-slate-800 dark:text-zinc-200">
              No matching items found
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your category or budget filters to explore more items.
            </p>
            <button
              onClick={() => setActiveCategoryFilter(null)}
              className="mt-4 px-4 py-2 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold rounded-full"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
