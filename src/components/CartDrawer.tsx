import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Trash2, 
  Heart, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Truck, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
  onExploreProducts: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedToCheckout, onExploreProducts }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    toggleWishlist,
    cartSubtotal,
    freeShippingThreshold,
    freeShippingProgress,
    shippingFee,
    couponDiscount,
    cartTotal,
    activeCoupon,
    applyCoupon,
    removeCoupon
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    if (!couponInput.trim()) return;
    const ok = applyCoupon(couponInput);
    if (ok) {
      setCouponInput('');
    } else {
      setCouponError('Invalid code. Try NOVA10 or FIRST500');
    }
  };

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      
      {/* Background click to close */}
      <div className="flex-1" onClick={() => setIsCartOpen(false)} />

      {/* Slide-out Drawer Container */}
      <div className="relative w-full max-w-md bg-[#FAF9F6] dark:bg-[#121316] text-slate-900 dark:text-zinc-100 h-full shadow-2xl flex flex-col z-10 border-l border-black/10 dark:border-white/10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#7C3AED]" />
            <h2 className="text-xl font-display font-bold">Shopping Bag</h2>
            <span className="text-xs font-mono text-slate-400">
              ({cart.reduce((s, i) => s + i.quantity, 0)} items)
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Dynamic Progress Indicator */}
        <div className="px-6 py-3.5 bg-[#FAF9F6] dark:bg-zinc-900 border-b border-black/5 dark:border-white/5">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="flex items-center gap-1.5 font-medium">
              <Truck className="w-3.5 h-3.5 text-[#7C3AED]" />
              {amountNeededForFreeShipping === 0 ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  You've unlocked FREE EXPRESS SHIPPING! 🎉
                </span>
              ) : (
                <span>
                  Add <strong className="font-mono text-[#7C3AED]">₹{amountNeededForFreeShipping.toLocaleString('en-IN')}</strong> more for FREE SHIPPING
                </span>
              )}
            </span>
            <span className="font-mono font-bold text-slate-500 text-[11px]">
              {freeShippingProgress}%
            </span>
          </div>
          
          <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                freeShippingProgress >= 100 ? 'bg-emerald-500' : 'bg-[#7C3AED]'
              }`}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mb-4 text-slate-400">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-display font-bold text-slate-800 dark:text-zinc-200">
                Your bag is empty
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mt-1 mb-6">
                Explore our curated collection of high-end accessories, audio, and minimal lifestyle essentials.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onExploreProducts();
                }}
                className="px-6 py-3 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold rounded-full shadow-md hover:bg-[#7C3AED] transition-colors"
              >
                Explore Curated Collection
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedColor || ''}-${item.selectedSize || ''}-${idx}`}
                className="flex gap-4 p-3.5 bg-white dark:bg-zinc-900 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold text-xs text-slate-900 dark:text-white line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-400 hover:text-rose-500 p-0.5 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {(item.selectedColor || item.selectedSize) && (
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 dark:text-zinc-400 mt-0.5">
                        {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                        {item.selectedSize && <span>· Size: {item.selectedSize}</span>}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-black/10 dark:border-white/10 rounded-lg p-0.5 bg-zinc-50 dark:bg-zinc-800">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs text-slate-600 dark:text-zinc-300 hover:text-black dark:hover:text-white"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-mono text-xs font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs text-slate-600 dark:text-zinc-300 hover:text-black dark:hover:text-white"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-mono font-bold text-xs text-slate-900 dark:text-white tabular-nums">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Wishlist option */}
                  <button
                    onClick={() => {
                      toggleWishlist(item.product.id);
                      removeFromCart(item.product.id);
                    }}
                    className="mt-2 text-[10px] text-slate-400 hover:text-[#7C3AED] self-start flex items-center gap-1"
                  >
                    <Heart className="w-3 h-3" />
                    <span>Move to Wishlist</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout Module */}
        {cart.length > 0 && (
          <div className="p-6 bg-white dark:bg-zinc-900 border-t border-black/5 dark:border-white/10 space-y-4">
            
            {/* Promo coupon input */}
            <div>
              {activeCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-mono font-bold text-emerald-800 dark:text-emerald-200">
                      {activeCoupon} Applied (-₹{couponDiscount.toLocaleString('en-IN')})
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs font-medium text-emerald-700 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Coupon: NOVA10 or FIRST500"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-black/10 dark:border-white/10 rounded-xl text-xs uppercase font-mono tracking-wider focus:outline-none focus:border-[#7C3AED]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold rounded-xl hover:bg-[#7C3AED] transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && (
                <p className="mt-1 text-[11px] text-rose-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{couponError}</span>
                </p>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500 dark:text-zinc-400">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>Coupon Discount</span>
                  <span className="font-mono tabular-nums">-₹{couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-500 dark:text-zinc-400">
                <span>Estimated Delivery</span>
                <span className="font-mono tabular-nums">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-600 font-semibold">FREE</span>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between text-sm font-bold text-slate-900 dark:text-white">
                <span>Total</span>
                <span className="font-mono text-base text-[#7C3AED] dark:text-[#A78BFA] tabular-nums">
                  ₹{cartTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                onProceedToCheckout();
              }}
              className="w-full py-4 bg-slate-900 hover:bg-[#7C3AED] dark:bg-white dark:text-slate-900 dark:hover:bg-[#A78BFA] text-white font-semibold text-xs uppercase tracking-wider rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
