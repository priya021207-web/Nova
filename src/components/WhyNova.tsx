import React from 'react';
import { Sparkles, Truck, ShieldCheck, RefreshCw } from 'lucide-react';

export const WhyNova: React.FC = () => {
  const cards = [
    {
      title: 'Curated Products',
      subtitle: 'Only products worth discovering.',
      description: 'Zero clutter or copycats. Every single item undergoes rigorous aesthetic and durability scrutiny.',
      icon: <Sparkles className="w-6 h-6 text-[#7C3AED]" />
    },
    {
      title: 'Fast Delivery',
      subtitle: 'Quick and reliable doorstep delivery.',
      description: 'Dispatched in custom-cushioned eco packaging within 24 hours. Real-time air cargo tracking.',
      icon: <Truck className="w-6 h-6 text-[#7C3AED]" />
    },
    {
      title: 'Secure Payments',
      subtitle: 'Safe and protected checkout.',
      description: 'Bank-grade 256-bit encryption for instant UPI, credit cards, net banking, or trusted cash on delivery.',
      icon: <ShieldCheck className="w-6 h-6 text-[#7C3AED]" />
    },
    {
      title: 'Easy Returns',
      subtitle: 'Simple and hassle-free returns.',
      description: '14 days doorstep pickup with zero interrogation. Instant refund credit to original payment method.',
      icon: <RefreshCw className="w-6 h-6 text-[#7C3AED]" />
    }
  ];

  return (
    <section id="why-nova" className="py-20 bg-white/40 dark:bg-zinc-950/40 border-t border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-mono tracking-widest text-[#7C3AED] dark:text-[#A78BFA] uppercase mb-2">
            THE NOVA STANDARD
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-slate-900 dark:text-white">
            WHY NOVA?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-zinc-400">
            We built NOVA to liberate online discovery from algorithmic noise and generic warehouses.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="group relative bg-white dark:bg-[#18181B] rounded-3xl p-7 border border-black/5 dark:border-white/10 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#7C3AED]/10 dark:bg-[#7C3AED]/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#7C3AED] group-hover:text-white transition-all duration-300">
                  {card.icon}
                </div>
                
                <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-1.5">
                  {card.title}
                </h3>
                
                <p className="text-xs font-semibold text-[#7C3AED] dark:text-[#A78BFA] mb-3">
                  {card.subtitle}
                </p>
                
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400 dark:text-zinc-500">
                <span>STANDARD 0{idx + 1}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#7C3AED]">✓ VERIFIED</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
