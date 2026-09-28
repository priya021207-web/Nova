import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { X, Star, ShoppingBag, Eye, Heart } from 'lucide-react';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
  onOpenFullDetail: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose, onOpenFullDetail }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0].name : undefined
  );
  const [quantity, setQuantity] = useState(1);

  const isFavorited = isInWishlist(product.id);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-[#FAF9F6] dark:bg-[#18181B] text-slate-900 dark:text-zinc-100 rounded-3xl shadow-2xl border border-black/10 dark:border-white/10 p-6 sm:p-8 overflow-hidden">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          
          {/* Image */}
          <div className="aspect-square rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
            <img
              src={product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Quick Info */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
                <span className="font-mono uppercase text-[#7C3AED] font-semibold">{product.category}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold tabular-nums">{product.rating}</span>
                </div>
              </div>

              <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mt-1">
                {product.name}
              </h3>
              
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-xl font-mono font-bold text-slate-900 dark:text-white">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xs font-mono text-slate-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <p className="mt-3 text-xs text-slate-600 dark:text-zinc-400 line-clamp-3">
                {product.description}
              </p>

              {/* Color choices */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-4">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Colors:</span>
                  <div className="flex gap-2 mt-1">
                    {product.colors.map(c => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-6 h-6 rounded-full border-2 transition-all ${
                          selectedColor === c.name ? 'border-[#7C3AED] ring-2 ring-[#7C3AED]/20' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5 space-y-2">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    addToCart(product, quantity, selectedColor);
                    onClose();
                  }}
                  className="flex-1 py-2.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold rounded-xl hover:bg-[#7C3AED] dark:hover:bg-[#A78BFA] transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2.5 rounded-xl border ${
                    isFavorited ? 'text-rose-500 border-rose-400 bg-rose-50 dark:bg-rose-950/40' : 'border-black/10 dark:border-white/10 text-slate-600'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenFullDetail(product);
                }}
                className="w-full text-center text-xs text-[#7C3AED] dark:text-[#A78BFA] font-medium hover:underline py-1 flex items-center justify-center gap-1"
              >
                <Eye className="w-3 h-3" />
                <span>View Full Details & Specs</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
