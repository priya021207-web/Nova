import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />,
          error: <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />,
          warning: <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />,
          info: <Info className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
        };

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-4 bg-white/95 dark:bg-[#18181B]/95 backdrop-blur-md rounded-2xl shadow-xl border border-black/5 dark:border-white/10 transition-all transform animate-in slide-in-from-bottom-3 duration-200"
          >
            {icons[toast.type]}
            <div className="flex-1 text-sm">
              {toast.title && (
                <div className="font-semibold text-slate-900 dark:text-zinc-100 text-xs tracking-wide uppercase mb-0.5">
                  {toast.title}
                </div>
              )}
              <div className="text-slate-700 dark:text-zinc-300 leading-snug font-normal">
                {toast.message}
              </div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 p-1 -mr-1 -mt-1 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
