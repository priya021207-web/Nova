import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Moon, 
  Sun, 
  Menu, 
  X,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateSection }) => {
  const { 
    cartItemCount, 
    wishlist, 
    setIsCartOpen, 
    setIsSearchOpen, 
    setIsWishlistOpen, 
    setIsProfileOpen, 
    isDarkMode, 
    toggleDarkMode,
    setActiveCategoryFilter
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string, categoryFilter?: string) => {
    setMobileMenuOpen(false);
    if (categoryFilter) {
      setActiveCategoryFilter(categoryFilter);
    }
    onNavigateSection(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Announcement Bar */}
      {showAnnouncement && (
        <div className="bg-[#18181B] text-[#FAF9F6] dark:bg-black dark:text-zinc-200 text-[11px] sm:text-xs py-2 px-4 transition-all tracking-wider font-mono uppercase flex items-center justify-between">
          <div className="mx-auto flex items-center gap-3">
            <span>NEW SEASON</span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span>NEW FINDS</span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span className="font-bold text-[#A78BFA]">FREE SHIPPING ABOVE ₹999</span>
          </div>
          <button 
            onClick={() => setShowAnnouncement(false)} 
            className="text-zinc-400 hover:text-white p-0.5 ml-2 transition-colors"
            aria-label="Dismiss announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Glass Navigation Bar */}
      <div 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'glass-panel shadow-sm border-b border-black/5 dark:border-white/10 py-3.5' 
            : 'bg-[#FAF9F6]/80 dark:bg-[#0E0F12]/80 backdrop-blur-md border-b border-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Zone 1: Single element wordmark */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleNavClick('hero')} 
              className="text-2xl sm:text-3xl font-display font-black tracking-tight text-slate-900 dark:text-white hover:opacity-85 transition-opacity focus:outline-none"
            >
              NOVA
            </button>
          </div>

          {/* Zone 2: 4-6 Clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium tracking-wide text-slate-700 dark:text-zinc-300">
            <button 
              onClick={() => handleNavClick('hero')} 
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer py-1"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('featured-products')} 
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer py-1"
            >
              Shop
            </button>
            <button 
              onClick={() => handleNavClick('categories')} 
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer py-1"
            >
              Categories
            </button>
            <button 
              onClick={() => handleNavClick('trending')} 
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer py-1"
            >
              Trending
            </button>
            <button 
              onClick={() => handleNavClick('drop-section')} 
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer py-1 flex items-center gap-1.5"
            >
              <span>The Drop</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-pulse"></span>
            </button>
            <button 
              onClick={() => handleNavClick('nova-match')} 
              className="hover:text-[#7C3AED] dark:hover:text-[#A78BFA] transition-colors cursor-pointer py-1 font-semibold flex items-center gap-1 text-[#7C3AED] dark:text-[#A78BFA]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>NOVA Match</span>
            </button>
            <button 
              onClick={() => handleNavClick('why-nova')} 
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer py-1"
            >
              About
            </button>
          </nav>

          {/* Zone 3: Actions (Search, Wishlist, Cart, Profile, Theme) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 sm:p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-800 dark:text-zinc-200 transition-colors"
              aria-label="Search catalog"
              title="Search (Cmd+K)"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Dark Mode Switch */}
            <button
              onClick={toggleDarkMode}
              className="p-2 sm:p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-800 dark:text-zinc-200 transition-colors"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 sm:p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-800 dark:text-zinc-200 transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#7C3AED] text-white text-[10px] font-mono font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Profile */}
            <button
              onClick={() => setIsProfileOpen(true)}
              className="p-2 sm:p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-800 dark:text-zinc-200 transition-colors"
              aria-label="User Profile & Orders"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 pl-3 pr-4 py-2 bg-slate-900 text-white dark:bg-white dark:text-zinc-900 rounded-full hover:opacity-90 transition-all shadow-sm group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span className="text-xs font-semibold font-mono tracking-tight">{cartItemCount}</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-800 dark:text-zinc-200"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F6] dark:bg-[#0E0F12] border-b border-black/10 dark:border-white/10 px-6 py-6 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4 text-base font-medium">
            <button
              onClick={() => handleNavClick('hero')}
              className="text-left py-2 border-b border-black/5 dark:border-white/5 flex items-center justify-between"
            >
              <span>Home</span>
              <ArrowRight className="w-4 h-4 opacity-40" />
            </button>
            <button
              onClick={() => handleNavClick('featured-products')}
              className="text-left py-2 border-b border-black/5 dark:border-white/5 flex items-center justify-between"
            >
              <span>Curated Collection</span>
              <ArrowRight className="w-4 h-4 opacity-40" />
            </button>
            <button
              onClick={() => handleNavClick('categories')}
              className="text-left py-2 border-b border-black/5 dark:border-white/5 flex items-center justify-between"
            >
              <span>Categories</span>
              <ArrowRight className="w-4 h-4 opacity-40" />
            </button>
            <button
              onClick={() => handleNavClick('trending')}
              className="text-left py-2 border-b border-black/5 dark:border-white/5 flex items-center justify-between"
            >
              <span>🔥 Trending Now</span>
              <ArrowRight className="w-4 h-4 opacity-40" />
            </button>
            <button
              onClick={() => handleNavClick('drop-section')}
              className="text-left py-2 border-b border-black/5 dark:border-white/5 flex items-center justify-between font-semibold text-[#7C3AED]"
            >
              <span>The Next Drop (NOVA AIR)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleNavClick('nova-match')}
              className="text-left py-2 border-b border-black/5 dark:border-white/5 flex items-center justify-between font-bold text-[#7C3AED]"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>NOVA Match (Style Quiz)</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleNavClick('why-nova')}
              className="text-left py-2 flex items-center justify-between"
            >
              <span>Why NOVA</span>
              <ArrowRight className="w-4 h-4 opacity-40" />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
