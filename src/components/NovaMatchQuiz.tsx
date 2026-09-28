import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import { Sparkles, RefreshCw, ArrowRight, Check, ShoppingBag, Eye } from 'lucide-react';

interface NovaMatchQuizProps {
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const NovaMatchQuiz: React.FC<NovaMatchQuizProps> = ({ onSelectProduct, onQuickView }) => {
  const { products, addToCart } = useShop();

  const [step, setStep] = useState<number>(1);
  const [selectedVibe, setSelectedVibe] = useState<string>('Everyday');
  const [selectedStyle, setSelectedStyle] = useState<string>('Minimalist Chic');
  const [selectedBudget, setSelectedBudget] = useState<string>('mid');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [quizComplete, setQuizComplete] = useState<boolean>(false);

  const vibeOptions = [
    { id: 'Everyday', label: 'Everyday', desc: 'Versatile essentials for routine rhythm' },
    { id: 'Work', label: 'Work & Studio', desc: 'Focus, productivity, executive clean lines' },
    { id: 'Travel', label: 'Travel & Mobility', desc: 'Lightweight, durable, transit-ready' },
    { id: 'Fitness', label: 'Fitness & Ritual', desc: 'Active wellness and recovery ergonomics' },
    { id: 'Gifting', label: 'Artful Gifting', desc: 'Unforgettable heirloom unboxing' },
    { id: 'Just Browsing', label: 'Curated Inspo', desc: 'Discovering novel design expressions' }
  ];

  const styleOptions = [
    { id: 'Minimalist Chic', label: 'Minimalist Chic', desc: 'Monochrome, subtle textures, quiet luxury' },
    { id: 'Tech Forward', label: 'Tech Forward', desc: 'Anodized titanium, smart acoustics, future haptics' },
    { id: 'Streetwear & Bold', label: 'Streetwear & Bold', desc: 'Sculptural sneakers, graphic shapes, urban edge' },
    { id: 'Organic & Earthy', label: 'Organic & Earthy', desc: 'Raw stoneware, botanical squalane, warm woods' },
    { id: 'Luxury Contemporary', label: 'Luxury Contemporary', desc: 'Numbered editions, solid brass, timeless craft' }
  ];

  const budgetOptions = [
    { id: 'low', label: 'Under ₹4,000', range: [0, 4000] },
    { id: 'mid', label: '₹4,000 – ₹10,000', range: [4000, 10000] },
    { id: 'high', label: '₹10,000 – ₹18,000', range: [10000, 18000] },
    { id: 'any', label: 'No Limit / Premium Drops', range: [0, 100000] }
  ];

  const handleFinishQuiz = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setQuizComplete(true);
    }, 850);
  };

  const handleReset = () => {
    setStep(1);
    setQuizComplete(false);
  };

  // Find recommendations based on selections
  const recommendations = products.filter(product => {
    const matchesStyle = product.styleTag === selectedStyle;
    const matchesVibe = product.vibe.includes(selectedVibe as any);
    
    // Budget check
    const budgetObj = budgetOptions.find(b => b.id === selectedBudget);
    const matchesBudget = budgetObj 
      ? product.price >= budgetObj.range[0] && product.price <= budgetObj.range[1]
      : true;

    return (matchesStyle || matchesVibe) && (matchesBudget || true);
  }).slice(0, 3);

  // Fallback to top products if too strict
  const finalPicks = recommendations.length > 0 ? recommendations : products.slice(0, 3);

  return (
    <section id="nova-match" className="py-20 bg-gradient-to-b from-[#FAF9F6] to-white dark:from-[#0E0F12] dark:to-[#141519] border-t border-black/5 dark:border-white/5 relative overflow-hidden">
      
      {/* Background glow decoration */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#7C3AED]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] dark:text-[#A78BFA] text-xs font-mono tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ALGORITHMIC TASTE CURATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-slate-900 dark:text-white">
            NOT SURE WHAT TO BUY?
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-zinc-400">
            Let NOVA find something that fits your vibe. Answer three quick style cues to generate your personal shopping curation.
          </p>
        </div>

        {/* Quiz Container Box */}
        <div className="bg-white/80 dark:bg-[#18181B]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-black/5 dark:border-white/10 shadow-xl">
          
          {!quizComplete ? (
            <div>
              {/* Step Tracker */}
              <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-6 mb-8">
                <div className="flex items-center gap-3">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                        step === s
                          ? 'bg-[#7C3AED] text-white shadow-sm'
                          : step > s
                          ? 'bg-emerald-500 text-white'
                          : 'bg-black/5 dark:bg-white/10 text-slate-400 dark:text-zinc-500'
                      }`}
                    >
                      {step > s ? <Check className="w-3.5 h-3.5" /> : s}
                    </div>
                  ))}
                </div>
                <div className="text-xs font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                  Step {step} of 3
                </div>
              </div>

              {/* Step 1: Vibe */}
              {step === 1 && (
                <div className="animate-in fade-in duration-300">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white mb-2">
                    What are you shopping for?
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mb-6">
                    Select the context or energy driving your discovery today.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {vibeOptions.map((vibe) => (
                      <button
                        key={vibe.id}
                        onClick={() => setSelectedVibe(vibe.id)}
                        className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                          selectedVibe === vibe.id
                            ? 'bg-[#7C3AED]/5 border-[#7C3AED] ring-2 ring-[#7C3AED]/30 dark:bg-[#7C3AED]/15'
                            : 'bg-white dark:bg-zinc-900 border-black/5 dark:border-white/10 hover:border-black/20'
                        }`}
                      >
                        <div className="font-semibold text-sm text-slate-900 dark:text-white">
                          {vibe.label}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-zinc-400 mt-1 leading-snug">
                          {vibe.desc}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={() => setStep(2)}
                      className="px-6 py-3 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold rounded-full hover:bg-slate-800 transition-all flex items-center gap-2"
                    >
                      <span>Continue to Style</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Style */}
              {step === 2 && (
                <div className="animate-in fade-in duration-300">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white mb-2">
                    What is your aesthetic wavelength?
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mb-6">
                    Pick the visual language that speaks to your taste.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {styleOptions.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setSelectedStyle(style.id)}
                        className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                          selectedStyle === style.id
                            ? 'bg-[#7C3AED]/5 border-[#7C3AED] ring-2 ring-[#7C3AED]/30 dark:bg-[#7C3AED]/15'
                            : 'bg-white dark:bg-zinc-900 border-black/5 dark:border-white/10 hover:border-black/20'
                        }`}
                      >
                        <div className="font-semibold text-sm text-slate-900 dark:text-white">
                          {style.label}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-zinc-400 mt-1 leading-snug">
                          {style.desc}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="px-6 py-3 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold rounded-full hover:bg-slate-800 transition-all flex items-center gap-2"
                    >
                      <span>Continue to Budget</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Budget */}
              {step === 3 && (
                <div className="animate-in fade-in duration-300">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white mb-2">
                    What is your target investment range?
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mb-6">
                    Filter by price tier for this curation.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {budgetOptions.map((budget) => (
                      <button
                        key={budget.id}
                        onClick={() => setSelectedBudget(budget.id)}
                        className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                          selectedBudget === budget.id
                            ? 'bg-[#7C3AED]/5 border-[#7C3AED] ring-2 ring-[#7C3AED]/30 dark:bg-[#7C3AED]/15'
                            : 'bg-white dark:bg-zinc-900 border-black/5 dark:border-white/10 hover:border-black/20'
                        }`}
                      >
                        <div className="font-semibold text-sm text-slate-900 dark:text-white">
                          {budget.label}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <button
                      onClick={() => setStep(2)}
                      className="text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleFinishQuiz}
                      disabled={isAnalyzing}
                      className="px-8 py-3.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold rounded-full shadow-lg transition-all flex items-center gap-2.5 cursor-pointer"
                    >
                      {isAnalyzing ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Synthesizing Vibe...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Generate My NOVA Picks</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

            </div>
          ) : (
            /* Results View */
            <div className="animate-in fade-in zoom-in-95 duration-400">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-black/5 dark:border-white/10 mb-8">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#7C3AED] dark:text-[#A78BFA] font-bold">
                    Profile Synthesis: {selectedVibe} · {selectedStyle}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white mt-1">
                    Your NOVA Picks
                  </h3>
                </div>
                <button
                  onClick={handleReset}
                  className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white p-2 rounded-lg bg-black/5 dark:bg-white/5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retake Match Quiz</span>
                </button>
              </div>

              {/* Tailored Product Picks */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {finalPicks.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-black/5 dark:border-white/10 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 mb-3 cursor-pointer" onClick={() => onSelectProduct(product)}>
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="text-[10px] font-mono text-[#7C3AED] uppercase font-bold tracking-wider">
                        98% Match
                      </div>
                      <h4 
                        onClick={() => onSelectProduct(product)}
                        className="font-semibold text-sm text-slate-900 dark:text-white mt-0.5 cursor-pointer hover:underline"
                      >
                        {product.name}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                        {product.subtitle}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                      <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onQuickView(product)}
                          className="p-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 text-slate-700 dark:text-zinc-300"
                          title="Quick view"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => addToCart(product, 1)}
                          className="px-3 py-1.5 bg-[#7C3AED] text-white text-xs font-semibold rounded-lg hover:bg-[#6D28D9] flex items-center gap-1.5"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
