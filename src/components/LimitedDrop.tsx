import React, { useState, useEffect } from 'react';
import { DROP_IMAGE, PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';
import { Bell, ShoppingBag, Eye, ShieldCheck, Flame } from 'lucide-react';
import { Product } from '../types';

interface LimitedDropProps {
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const LimitedDrop: React.FC<LimitedDropProps> = ({ onSelectProduct, onQuickView }) => {
  const { addToCart, addToast } = useShop();
  const dropProduct = PRODUCTS.find(p => p.id === 'nova-air-limited') || PRODUCTS[0];

  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 18,
    minutes: 42,
    seconds: 19
  });

  const [emailInput, setEmailInput] = useState('');
  const [isNotified, setIsNotified] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      addToast('Please enter a valid email address', 'warning');
      return;
    }
    setIsNotified(true);
    addToast(`You are on the VIP access list for NOVA AIR! Allocation reserved for ${emailInput}`, 'success', 'VIP Drop Access');
    setEmailInput('');
  };

  return (
    <section id="drop-section" className="py-24 bg-[#0A0A0C] text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-[#7C3AED]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono uppercase tracking-wider mb-4">
            <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>EXCLUSIVELY NUMBERED RELEASE (001–500)</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-white uppercase">
            THE NEXT DROP
          </h2>
          <p className="mt-3 text-sm text-zinc-400">
            Strictly capped at 500 units globally. Crafted from vacuum-infused carbon fiber and acoustic beryllium.
          </p>
        </div>

        {/* Drop Feature Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-zinc-900/60 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 lg:p-12 border border-white/10 shadow-2xl">
          
          {/* Left Column: Big Product Visual */}
          <div className="lg:col-span-6 relative group">
            <div 
              className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 border border-white/10 cursor-pointer"
              onClick={() => onSelectProduct(dropProduct)}
            >
              <img
                src={DROP_IMAGE}
                alt="NOVA AIR Limited Edition"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="text-xs font-mono bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-zinc-300 border border-white/15">
                  500 Units Worldwide
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickView(dropProduct);
                  }}
                  className="px-3 py-1 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-xs font-medium text-white flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3 h-3" />
                  <span>Inspect</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Countdown, Specs & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Live Countdown Timer */}
            <div className="mb-6">
              <div className="text-xs font-mono uppercase text-zinc-400 tracking-wider mb-2">
                Drop Launch Countdown
              </div>
              <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-md">
                {[
                  { label: 'DAYS', val: timeLeft.days },
                  { label: 'HOURS', val: timeLeft.hours },
                  { label: 'MINUTES', val: timeLeft.minutes },
                  { label: 'SECONDS', val: timeLeft.seconds }
                ].map((item, i) => (
                  <div key={i} className="bg-black/60 rounded-2xl p-3 sm:p-4 text-center border border-white/10">
                    <span className="text-2xl sm:text-3xl font-mono font-bold text-white tabular-nums">
                      {String(item.val).padStart(2, '0')}
                    </span>
                    <span className="block text-[10px] font-mono tracking-widest text-zinc-400 mt-1">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Title & Details */}
            <div className="mb-6">
              <div className="text-xs font-mono uppercase tracking-wider text-[#A78BFA] font-bold">
                AUDIOPHILE ARCHITECTURE
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
                NOVA AIR — LIMITED EDITION
              </h3>
              <p className="mt-2 text-sm text-zinc-300 leading-relaxed font-normal">
                Featuring bespoke 50mm graphene diaphragms and laser-serialized carbon headband. Every unit ships with a Pelican-grade flight case and authenticated proof of origin.
              </p>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-3xl font-mono font-bold text-white tabular-nums">
                ₹18,499
              </span>
              <span className="text-base font-mono text-zinc-500 line-through tabular-nums">
                ₹22,999
              </span>
              <span className="text-xs font-mono text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                Early Drop Pricing
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <button
                onClick={() => {
                  addToCart(dropProduct, 1);
                }}
                className="flex-1 px-6 py-3.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold rounded-full shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Pre-Order Drop</span>
              </button>

              <button
                onClick={() => onSelectProduct(dropProduct)}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-full border border-white/15 transition-all cursor-pointer"
              >
                <span>Full Specifications</span>
              </button>
            </div>

            {/* Notify Me Form */}
            {!isNotified ? (
              <form onSubmit={handleNotifyMe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter email for VIP drop alert..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-black/50 border border-white/10 rounded-full text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#7C3AED]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium rounded-full border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Bell className="w-3.5 h-3.5 text-amber-400" />
                  <span>Notify Me</span>
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                <ShieldCheck className="w-4 h-4" />
                <span>Your VIP allocation notification is confirmed.</span>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
