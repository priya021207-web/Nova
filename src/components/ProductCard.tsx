import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Eye, ShoppingBag, Star, Scale } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, onQuickView }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    toggleCompare, 
    isInCompare 
  } = useShop();

  const isFavorited = isInWishlist(product.id);
  const isComparing = isInCompare(product.id);

  return (
    <div className="group relative flex flex-col bg-white dark:bg-[#18181B] rounded-3xl p-3 sm:p-4 border border-black/5 dark:border-white/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      
      {/* Visual Image Container */}
      <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#F4F3EE] dark:bg-zinc-900/60 mb-4 cursor-pointer" onClick={() => onSelect(product)}>
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Quiet Tag (No pill sandwiches) */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className="text-[11px] font-mono font-medium tracking-wide uppercase px-2 py-0.5 rounded-md bg-white/90 dark:bg-black/90 text-slate-900 dark:text-zinc-100 shadow-sm backdrop-blur-sm border border-black/5 dark:border-white/10">
              {product.badge}
            </span>
          </div>
        )}

        {/* Action Affordances overlay top-right */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isFavorited
                ? 'bg-rose-50 text-rose-500 dark:bg-rose-950/60 dark:text-rose-400 shadow-sm'
                : 'bg-white/80 dark:bg-zinc-800/80 text-slate-700 dark:text-zinc-300 hover:text-rose-500 hover:bg-white backdrop-blur-sm'
            }`}
            aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
            title="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(product);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isComparing
                ? 'bg-[#7C3AED] text-white shadow-sm'
                : 'bg-white/80 dark:bg-zinc-800/80 text-slate-700 dark:text-zinc-300 hover:text-[#7C3AED] hover:bg-white backdrop-blur-sm'
            }`}
            aria-label="Compare specs"
            title="Compare specs"
          >
            <Scale className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick View Button Hover Strip */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-2 bg-white/95 dark:bg-zinc-900/95 text-slate-900 dark:text-white text-xs font-semibold rounded-xl shadow-lg backdrop-blur-md hover:bg-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating Bar */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 mb-1">
            <span className="font-mono uppercase tracking-wider text-[11px] text-[#7C3AED] dark:text-[#A78BFA] font-medium">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-slate-800 dark:text-zinc-200 tabular-nums">
                {product.rating}
              </span>
              <span className="text-[11px] text-slate-400 dark:text-zinc-500">
                ({product.reviewCount})
              </span>
            </div>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => onSelect(product)}
            className="text-base font-semibold text-slate-900 dark:text-white line-clamp-1 hover:text-[#7C3AED] dark:hover:text-[#A78BFA] transition-colors cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="mt-1 text-xs text-slate-600 dark:text-zinc-400 line-clamp-2 leading-relaxed font-normal">
            {product.description}
          </p>
        </div>

        {/* Pricing & Add to Cart Module */}
        <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs font-mono text-slate-400 dark:text-zinc-500 line-through tabular-nums">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            {product.discount > 0 && (
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                Save {product.discount}%
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className="px-3.5 py-2 bg-slate-900 hover:bg-[#7C3AED] dark:bg-white dark:text-slate-900 dark:hover:bg-[#A78BFA] text-white rounded-xl transition-all shadow-sm flex items-center gap-1.5 text-xs font-semibold cursor-pointer group/btn"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
            <span>Add</span>
          </button>
        </div>

      </div>
    </div>
  );
};
