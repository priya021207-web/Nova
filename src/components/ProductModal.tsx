import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  RefreshCw, 
  Check, 
  ChevronRight,
  MapPin,
  Sparkles,
  Zap
} from 'lucide-react';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onSelectRelated: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onSelectRelated }) => {
  const { 
    products, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setIsCheckoutOpen,
    addToast 
  } = useShop();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0].name : undefined
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState<string | null>(null);

  const isFavorited = isInWishlist(product.id);

  // Check pincode
  const handleCheckDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length < 6) {
      addToast('Please enter a 6-digit PIN code', 'warning');
      return;
    }
    setDeliveryResult(`Estimated Delivery: ${['Tomorrow by 3 PM', 'In 2 Days', 'Express Air within 24h'][Math.floor(Math.random() * 3)]} to ${pincode}`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    onClose();
    setIsCheckoutOpen(true);
  };

  // Related products in same category or general curated
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.isCurated))
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-5xl bg-[#FAF9F6] dark:bg-[#121316] text-slate-900 dark:text-zinc-100 rounded-3xl shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Sticky Close Button Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#FAF9F6]/90 dark:bg-[#121316]/90 backdrop-blur-md border-b border-black/5 dark:border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-zinc-400">
            <span>SHOP</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#7C3AED] dark:text-[#A78BFA] font-medium">{product.category}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="truncate max-w-[200px]">{product.name}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-10">
          
          {/* Main PDP Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Image Gallery */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-black/5 dark:border-white/10 shadow-sm">
                <img
                  src={product.images[activeImageIdx] || product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                
                {product.badge && (
                  <span className="absolute top-4 left-4 text-xs font-mono uppercase tracking-wider bg-white/95 dark:bg-black/95 text-slate-900 dark:text-zinc-100 px-2.5 py-1 rounded-md font-semibold shadow-sm">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`w-18 h-18 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIdx === idx
                          ? 'border-[#7C3AED] ring-2 ring-[#7C3AED]/20'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Highlights callout */}
              <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                <div className="text-xs font-mono font-semibold uppercase text-slate-700 dark:text-zinc-300 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
                  <span>CRAFT & SIGNATURE SPECIFICATIONS</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-zinc-400">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#7C3AED] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Contiguous Purchase Module */}
            <div className="lg:col-span-6 flex flex-col space-y-6">
              
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#7C3AED] dark:text-[#A78BFA] uppercase tracking-wider font-semibold">
                    {product.category}
                  </span>
                  
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold tabular-nums text-slate-800 dark:text-zinc-200">{product.rating}</span>
                    <span className="text-slate-400 dark:text-zinc-500">· {product.reviewCount} Reviews</span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white mt-1">
                  {product.name}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">
                  {product.subtitle}
                </p>
              </div>

              {/* Price display */}
              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm font-mono text-slate-400 line-through tabular-nums">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {product.discount > 0 && (
                    <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  Inclusive of all taxes
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed font-normal">
                {product.longDescription || product.description}
              </p>

              {/* Color Swatches */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <div className="text-xs font-mono uppercase text-slate-500 dark:text-zinc-400 mb-2">
                    COLOR: <span className="font-semibold text-slate-900 dark:text-white">{selectedColor}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`group flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-all cursor-pointer ${
                          selectedColor === c.name
                            ? 'border-[#7C3AED] ring-2 ring-[#7C3AED]/20 font-medium'
                            : 'border-black/10 dark:border-white/10 opacity-80'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/20"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <div className="text-xs font-mono uppercase text-slate-500 dark:text-zinc-400 mb-2">
                    SELECT SIZE: <span className="font-semibold text-slate-900 dark:text-white">{selectedSize}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                          selectedSize === sz
                            ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold shadow-sm'
                            : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 text-slate-700 dark:text-zinc-300'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Actions */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-4">
                  {/* Quantity */}
                  <div className="flex items-center border border-black/10 dark:border-white/15 rounded-full p-1 bg-white dark:bg-zinc-900">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white text-base"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-mono font-bold text-xs tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white text-base"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={() => {
                      addToCart(product, quantity, selectedColor, selectedSize);
                    }}
                    className="flex-1 py-3.5 px-6 bg-slate-900 hover:bg-[#7C3AED] dark:bg-white dark:text-slate-900 dark:hover:bg-[#A78BFA] text-white font-semibold text-xs rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3.5 rounded-full border transition-all cursor-pointer ${
                      isFavorited
                        ? 'border-rose-500 text-rose-500 bg-rose-50 dark:bg-rose-950/40'
                        : 'border-black/10 dark:border-white/15 text-slate-700 dark:text-zinc-300 hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Instant Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 px-6 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-xs rounded-full shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4" />
                  <span>Buy Now — Instant Checkout</span>
                </button>
              </div>

              {/* Delivery Pincode Checker */}
              <div className="pt-4 border-t border-black/5 dark:border-white/10">
                <form onSubmit={handleCheckDelivery} className="flex gap-2">
                  <div className="relative flex-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="Enter Delivery PIN code"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                      className="w-full pl-9 pr-3 py-2 bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/15 rounded-xl text-xs focus:outline-none focus:border-[#7C3AED]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 text-xs font-semibold rounded-xl text-slate-800 dark:text-zinc-200"
                  >
                    Check
                  </button>
                </form>

                {deliveryResult && (
                  <p className="mt-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5" />
                    <span>{deliveryResult}</span>
                  </p>
                )}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-2 text-center text-[11px] text-slate-500 dark:text-zinc-400">
                <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-black/5 dark:border-white/5">
                  <Truck className="w-4 h-4 text-[#7C3AED] mx-auto mb-1" />
                  <span className="font-semibold block text-slate-800 dark:text-zinc-200">Free Air Shipping</span>
                  <span>Orders over ₹999</span>
                </div>
                <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-black/5 dark:border-white/5">
                  <RefreshCw className="w-4 h-4 text-[#7C3AED] mx-auto mb-1" />
                  <span className="font-semibold block text-slate-800 dark:text-zinc-200">14-Day Returns</span>
                  <span>Doorstep pickup</span>
                </div>
                <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-black/5 dark:border-white/5">
                  <ShieldCheck className="w-4 h-4 text-[#7C3AED] mx-auto mb-1" />
                  <span className="font-semibold block text-slate-800 dark:text-zinc-200">2-Year Warranty</span>
                  <span>Official certificate</span>
                </div>
              </div>

            </div>

          </div>

          {/* Technical Specifications Table */}
          {product.specs && product.specs.length > 0 && (
            <div className="pt-6 border-t border-black/5 dark:border-white/10">
              <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-4">
                Technical Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {product.specs.map((spec, i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-black/5 dark:border-white/5 text-xs">
                    <span className="text-slate-500 dark:text-zinc-400 font-mono uppercase">{spec.label}</span>
                    <span className="font-medium text-slate-900 dark:text-zinc-200 text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* “YOU MAY ALSO LIKE” Section */}
          {relatedProducts.length > 0 && (
            <div className="pt-6 border-t border-black/5 dark:border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">
                  YOU MAY ALSO LIKE
                </h3>
                <span className="text-xs font-mono text-slate-500">Curated Harmonious Pairings</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="p-3 bg-white dark:bg-zinc-900 rounded-2xl border border-black/5 dark:border-white/10 hover:shadow-md cursor-pointer group transition-all"
                  >
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 mb-2">
                      <img
                        src={rel.images[0]}
                        alt={rel.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="text-[10px] font-mono uppercase text-[#7C3AED] font-semibold">{rel.category}</div>
                    <h4 className="text-xs font-semibold text-slate-900 dark:text-white line-clamp-1 group-hover:text-[#7C3AED]">
                      {rel.name}
                    </h4>
                    <div className="text-xs font-mono font-bold text-slate-900 dark:text-white mt-1">
                      ₹{rel.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
