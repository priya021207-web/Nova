import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const { addToast } = useShop();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address', 'warning');
      return;
    }
    setIsSubscribed(true);
    addToast(`Welcome to NOVA Private Dispatch! Allocation code sent to ${email}`, 'success', 'Subscribed');
    setEmail('');
  };

  return (
    <section className="py-20 relative overflow-hidden bg-slate-900 text-white dark:bg-black">
      {/* Ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#7C3AED]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-violet-300 text-xs font-mono uppercase tracking-wider mb-4 border border-white/10">
          <Sparkles className="w-3.5 h-3.5" />
          <span>EDITORIAL DISPATCH</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-white uppercase">
          GET THE GOOD STUFF FIRST.
        </h2>

        <p className="mt-3 text-sm sm:text-base text-zinc-300 max-w-lg mx-auto leading-relaxed">
          New drops, exclusive deals and products worth knowing about — straight to your inbox. No spam, ever.
        </p>

        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-zinc-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold rounded-full shadow-lg transition-all flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono">
            <CheckCircle2 className="w-4 h-4" />
            <span>You're subscribed to NOVA Priority Dispatch. Check your inbox for your 10% welcome key!</span>
          </div>
        )}

      </div>
    </section>
  );
};
