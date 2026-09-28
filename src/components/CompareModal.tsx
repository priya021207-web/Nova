import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, ShoppingBag, Check, Star } from 'lucide-react';
import { Product } from '../types';

interface CompareModalProps {
  onSelectProduct: (product: Product) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({ onSelectProduct }) => {
  const { compareList, toggleCompare, isCompareOpen, setIsCompareOpen, addToCart } = useShop();

  if (!isCompareOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl bg-[#FAF9F6] dark:bg-[#141518] text-slate-900 dark:text-zinc-100 rounded-3xl shadow-2xl border border-black/10 dark:border-white/10 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-black/5 dark:border-white/10">
          <div>
            <div className="text-xs font-mono uppercase text-[#7C3AED] dark:text-[#A78BFA] font-bold">
              SPECIFICATION MATRIX
            </div>
            <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
              Product Comparison ({compareList.length}/3)
            </h2>
          </div>
          <button
            onClick={() => setIsCompareOpen(false)}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {compareList.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-slate-500">No products selected for comparison yet.</p>
            <p className="text-xs text-slate-400 mt-1">Click the scales icon on any product card to compare up to 3 items.</p>
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10">
                  <th className="py-4 px-4 font-mono uppercase text-slate-400 w-1/4">Specification</th>
                  {compareList.map((prod) => (
                    <th key={prod.id} className="py-4 px-4 align-top w-1/4">
                      <div className="relative group">
                        <button
                          onClick={() => toggleCompare(prod)}
                          className="absolute top-1 right-1 p-1 bg-rose-50 text-rose-500 rounded-full hover:bg-rose-100"
                          title="Remove from compare"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div 
                          className="aspect-square w-24 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 mb-2 cursor-pointer"
                          onClick={() => {
                            setIsCompareOpen(false);
                            onSelectProduct(prod);
                          }}
                        >
                          <img src={prod.images[0]} alt={prod.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                        </div>
                        <div className="font-semibold text-sm text-slate-900 dark:text-white">{prod.name}</div>
                        <div className="font-mono text-xs text-[#7C3AED] font-bold mt-1">₹{prod.price.toLocaleString('en-IN')}</div>
                        
                        <button
                          onClick={() => addToCart(prod, 1)}
                          className="mt-2 w-full py-1.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-lg text-xs font-semibold flex items-center justify-center gap-1"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Add to Bag</span>
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5 font-sans">
                <tr>
                  <td className="py-3 px-4 font-mono text-slate-400">Category</td>
                  {compareList.map(p => (
                    <td key={p.id} className="py-3 px-4 font-medium">{p.category}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-slate-400">Rating</td>
                  {compareList.map(p => (
                    <td key={p.id} className="py-3 px-4 font-medium">
                      <span className="flex items-center gap-1 font-mono">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {p.rating} ({p.reviewCount})
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-slate-400">Key Material / Chassis</td>
                  {compareList.map(p => {
                    const material = p.specs.find(s => s.label.toLowerCase().includes('material') || s.label.toLowerCase().includes('upper'))?.value || 'Aerospace Grade Component';
                    return <td key={p.id} className="py-3 px-4 text-slate-600 dark:text-zinc-300">{material}</td>;
                  })}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-slate-400">Primary Features</td>
                  {compareList.map(p => (
                    <td key={p.id} className="py-3 px-4 text-slate-600 dark:text-zinc-300">
                      <ul className="space-y-1">
                        {p.features.slice(0, 3).map((f, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <Check className="w-3 h-3 text-[#7C3AED] shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-slate-400">Stock Availability</td>
                  {compareList.map(p => (
                    <td key={p.id} className="py-3 px-4 font-mono text-emerald-600 font-semibold">
                      {p.inStock ? 'Ready for Dispatch' : 'Backordered'}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};
