import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  onSelectProduct: (product: Product) => void;
  onExploreProducts: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ onSelectProduct, onExploreProducts }) => {
  const { 
    products, 
    wishlist, 
    isWishlistOpen, 
    setIsWishlistOpen, 
    toggleWishlist, 
    moveToCartFromWishlist 
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistedItems = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="flex-1" onClick={() => setIsWishlistOpen(false)} />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#FAF9F6] dark:bg-[#121316] text-slate-900 dark:text-zinc-100 h-full shadow-2xl flex flex-col z-10 border-l border-black/10 dark:border-white/10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#7C3AED] fill-[#7C3AED]" />
            <h2 className="text-xl font-display font-bold">Wishlist</h2>
            <span className="text-xs font-mono text-slate-400">({wishlistedItems.length} saved)</span>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlistedItems.length === 0 ? (
            <div className="py-24 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mb-4 text-slate-400">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-display font-bold text-slate-800 dark:text-zinc-200">
                Nothing saved yet.
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mt-1 mb-6">
                Your next favorite product could be here. Save items you're contemplating to review later.
              </p>
              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  onExploreProducts();
                }}
                className="px-6 py-3 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold rounded-full shadow-md hover:bg-[#7C3AED] transition-colors flex items-center gap-2"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            wishlistedItems.map((prod) => (
              <div
                key={prod.id}
                className="flex gap-4 p-3.5 bg-white dark:bg-zinc-900 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm group"
              >
                <div 
                  className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0 cursor-pointer"
                  onClick={() => {
                    setIsWishlistOpen(false);
                    onSelectProduct(prod);
                  }}
                >
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] font-mono uppercase text-[#7C3AED] font-semibold">{prod.category}</span>
                      <button
                        onClick={() => toggleWishlist(prod.id)}
                        className="text-slate-400 hover:text-rose-500 transition-colors p-0.5"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 
                      onClick={() => {
                        setIsWishlistOpen(false);
                        onSelectProduct(prod);
                      }}
                      className="font-semibold text-xs text-slate-900 dark:text-white line-clamp-1 cursor-pointer hover:underline"
                    >
                      {prod.name}
                    </h4>

                    <div className="font-mono font-bold text-xs text-slate-900 dark:text-white mt-1">
                      ₹{prod.price.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <button
                    onClick={() => moveToCartFromWishlist(prod)}
                    className="mt-2 py-2 px-3 bg-slate-900 hover:bg-[#7C3AED] dark:bg-white dark:text-slate-900 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Cart</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
