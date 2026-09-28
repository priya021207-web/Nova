import React, { useState } from 'react';
import { INITIAL_REVIEWS } from '../data/products';
import { Review } from '../types';
import { Star, ShieldCheck, ThumbsUp, MessageSquarePlus, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ReviewsSection: React.FC = () => {
  const { addToast } = useShop();
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // New review form state
  const [newAuthor, setNewAuthor] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  const handleHelpful = (id: string) => {
    setReviews(prev =>
      prev.map(r => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
    addToast('Thank you for your feedback!', 'success');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      rating: newRating,
      date: 'Just now',
      title: newTitle || 'Exceptional craftsmanship',
      comment: newComment,
      verified: true,
      helpfulCount: 1
    };

    setReviews([newRev, ...reviews]);
    setShowReviewForm(false);
    setNewAuthor('');
    setNewTitle('');
    setNewComment('');
    addToast('Your review has been verified and published!', 'success', 'Review Added');
  };

  return (
    <section className="py-20 bg-white/50 dark:bg-zinc-900/40 border-t border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs font-mono tracking-widest text-[#7C3AED] dark:text-[#A78BFA] uppercase mb-2">
              VERIFIED PATRON VOICES
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-slate-900 dark:text-white">
              WHAT OUR COMMUNITY SAYS
            </h2>
          </div>

          <button
            onClick={() => setShowReviewForm(prev => !prev)}
            className="mt-4 md:mt-0 px-6 py-3 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold rounded-full hover:bg-[#7C3AED] dark:hover:bg-[#A78BFA] transition-colors flex items-center gap-2 self-start cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Breakdown & Aggregate Score Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-center bg-white dark:bg-[#18181B] rounded-3xl p-6 sm:p-8 border border-black/5 dark:border-white/10 shadow-sm">
          
          <div className="lg:col-span-4 text-center lg:border-r border-black/5 dark:border-white/5 lg:pr-8">
            <div className="text-5xl font-mono font-bold text-slate-900 dark:text-white">
              4.9
            </div>
            <div className="flex items-center justify-center gap-1 my-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="text-xs text-slate-500 font-mono">
              Based on 842 verified global orders
            </div>
          </div>

          <div className="lg:col-span-8 space-y-2">
            {[
              { stars: 5, pct: 92 },
              { stars: 4, pct: 6 },
              { stars: 3, pct: 1 },
              { stars: 2, pct: 1 },
              { stars: 1, pct: 0 }
            ].map((row) => (
              <div key={row.stars} className="flex items-center gap-3 text-xs">
                <span className="w-12 font-mono text-slate-500">{row.stars} Stars</span>
                <div className="flex-1 h-2 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
                <span className="w-8 font-mono text-right text-slate-400">{row.pct}%</span>
              </div>
            ))}
          </div>

        </div>

        {/* Write Review Form Expandable */}
        {showReviewForm && (
          <form onSubmit={handleReviewSubmit} className="mb-12 p-6 bg-white dark:bg-[#18181B] rounded-3xl border border-[#7C3AED]/30 shadow-xl animate-in slide-in-from-top-4 duration-200">
            <h3 className="font-display font-bold text-lg mb-4 text-slate-900 dark:text-white">
              Share Your Experience
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[11px] font-mono text-slate-500 uppercase mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Roy"
                  value={newAuthor}
                  onChange={e => setNewAuthor(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-500 uppercase mb-1">Rating</label>
                <div className="flex items-center gap-2 py-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setNewRating(num)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          num <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-zinc-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-mono text-slate-500 ml-2">{newRating} Stars</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-[11px] font-mono text-slate-500 uppercase mb-1">Review Headline</label>
              <input
                type="text"
                placeholder="Summary of your impression..."
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 text-xs"
              />
            </div>

            <div className="mb-4">
              <label className="block text-[11px] font-mono text-slate-500 uppercase mb-1">Detailed Review</label>
              <textarea
                required
                rows={3}
                placeholder="What impressed you about the materials, design, or ergonomics?"
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 text-xs"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-4 py-2 text-xs text-slate-500 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#7C3AED] text-white text-xs font-semibold rounded-xl hover:bg-[#6D28D9]"
              >
                Publish Review
              </button>
            </div>
          </form>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 bg-white dark:bg-[#18181B] rounded-3xl border border-black/5 dark:border-white/10 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-zinc-700'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">{rev.date}</span>
                </div>

                <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-1.5">
                  {rev.title}
                </h4>

                <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed font-normal">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900 dark:text-white">{rev.author}</span>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified Buyer</span>
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleHelpful(rev.id)}
                  className="flex items-center gap-1 text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 transition-colors"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span className="text-[11px] font-mono">{rev.helpfulCount}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
