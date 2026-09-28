import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryDiscovery } from './components/CategoryDiscovery';
import { FeaturedGrid } from './components/FeaturedGrid';
import { NovaMatchQuiz } from './components/NovaMatchQuiz';
import { TrendingCarousel } from './components/TrendingCarousel';
import { WhyNova } from './components/WhyNova';
import { LimitedDrop } from './components/LimitedDrop';
import { ReviewsSection } from './components/ReviewsSection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';

// Modals and Drawers
import { ProductModal } from './components/ProductModal';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { UserProfileModal } from './components/UserProfileModal';
import { CompareModal } from './components/CompareModal';
import { SearchOverlay } from './components/SearchOverlay';
import { ToastContainer } from './components/Toast';
import { BackToTop } from './components/BackToTop';
import { NovaChatbot } from './components/NovaChatbot';
import { Product, Order } from './types';

const MainContent: React.FC = () => {
  const {
    products,
    selectedProduct,
    setSelectedProduct,
    quickViewProduct,
    setQuickViewProduct,
    setIsCheckoutOpen,
    setIsProfileOpen,
    setTrackingOrder,
    setActiveCategoryFilter,
    addToRecentlyViewed
  } = useShop();

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    addToRecentlyViewed(product);
  };

  const handleSelectProductId = (id: string) => {
    const found = products.find(p => p.id === id);
    if (found) {
      handleSelectProduct(found);
    }
  };

  const handleCategoryPick = (catName: string) => {
    setActiveCategoryFilter(catName);
    handleNavigateSection('featured-products');
  };

  const handleOrderCompleted = (order: Order) => {
    setTrackingOrder(order);
    setIsProfileOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] dark:bg-[#0E0F12] text-[#18181B] dark:text-[#F4F4F5] selection:bg-[#7C3AED]/20 selection:text-[#7C3AED]">
      
      {/* Sticky Navigation Bar */}
      <Navbar onNavigateSection={handleNavigateSection} />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onExplore={() => handleNavigateSection('featured-products')}
          onDiscoverStyle={() => handleNavigateSection('nova-match')}
          onSelectProduct={handleSelectProductId}
        />

        {/* 2. Category Discovery */}
        <CategoryDiscovery onSelectCategory={handleCategoryPick} />

        {/* 3. Curated Featured Products Grid */}
        <FeaturedGrid
          onSelectProduct={handleSelectProduct}
          onQuickView={setQuickViewProduct}
        />

        {/* 4. Limited Edition Drop Feature */}
        <LimitedDrop
          onSelectProduct={handleSelectProduct}
          onQuickView={setQuickViewProduct}
        />

        {/* 5. NOVA Match AI Style Discovery Quiz */}
        <NovaMatchQuiz
          onSelectProduct={handleSelectProduct}
          onQuickView={setQuickViewProduct}
        />

        {/* 6. Trending Now Section */}
        <TrendingCarousel
          onSelectProduct={handleSelectProduct}
          onQuickView={setQuickViewProduct}
        />

        {/* 7. Why NOVA Features */}
        <WhyNova />

        {/* 8. Customer Reviews & Community Proof */}
        <ReviewsSection />

        {/* 9. VIP Newsletter Dispatch */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer onNavigateSection={handleNavigateSection} />

      {/* Overlay Modals & Drawers */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSelectRelated={(p) => setSelectedProduct(p)}
        />
      )}

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onOpenFullDetail={(p) => {
            setQuickViewProduct(null);
            handleSelectProduct(p);
          }}
        />
      )}

      <CartDrawer
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onExploreProducts={() => handleNavigateSection('featured-products')}
      />

      <CheckoutModal onOrderComplete={handleOrderCompleted} />

      <WishlistDrawer
        onSelectProduct={handleSelectProduct}
        onExploreProducts={() => handleNavigateSection('featured-products')}
      />

      <UserProfileModal onSelectProduct={handleSelectProduct} />

      <CompareModal onSelectProduct={handleSelectProduct} />

      <SearchOverlay onSelectProduct={handleSelectProduct} />

      <ToastContainer />
      <BackToTop />
      <NovaChatbot onSelectProduct={handleSelectProduct} />

    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
