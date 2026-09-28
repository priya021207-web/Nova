import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, UserProfile, ToastMessage } from '../types';
import { PRODUCTS, INITIAL_REVIEWS, PROMO_COUPONS } from '../data/products';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  recentlyViewed: Product[];
  compareList: Product[];
  toasts: ToastMessage[];
  activeCoupon: string | null;
  couponDiscount: number;
  isDarkMode: boolean;
  user: UserProfile | null;

  // Drawers & Modals
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  trackingOrder: Order | null;
  setTrackingOrder: (order: Order | null) => void;
  activeCategoryFilter: string | null;
  setActiveCategoryFilter: (cat: string | null) => void;

  // Actions
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (product: Product) => void;
  addToRecentlyViewed: (product: Product) => void;
  toggleCompare: (product: Product) => void;
  isInCompare: (productId: string) => boolean;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  toggleDarkMode: () => void;
  addToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error', title?: string) => void;
  removeToast: (id: string) => void;
  placeOrder: (shippingAddress: any, paymentMethod: string) => Order;
  loginUser: (name: string, email: string) => void;
  logoutUser: () => void;

  // Computed Cart metrics
  cartSubtotal: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  shippingFee: number;
  cartTotal: number;
  cartItemCount: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const SEED_ORDERS: Order[] = [
  {
    id: 'NOV-948201',
    date: '2026-09-24',
    items: [
      {
        productId: 'aurora-smart-watch',
        name: 'Aurora Smart Watch',
        price: 14999,
        quantity: 1,
        image: '/src/assets/images/product_aurora_watch_1790579697680.jpg',
        selectedColor: 'Matte Titanium'
      },
      {
        productId: 'terra-ceramic-set',
        name: 'Terra Ceramic Set',
        price: 3499,
        quantity: 1,
        image: '/src/assets/images/category_home_ceramics_1790579649519.jpg',
        selectedColor: 'Oatmeal Specks'
      }
    ],
    subtotal: 18498,
    discount: 1850,
    shipping: 0,
    total: 16648,
    status: 'Out for Delivery',
    estimatedDelivery: 'Today by 6:00 PM',
    trackingNumber: 'DEL-NX-84920491',
    carrier: 'NOVA Express Priority',
    shippingAddress: {
      fullName: 'Priya Sharma',
      street: 'Flat 402, Highline Residences, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      phone: '+91 98450 12345'
    },
    paymentMethod: 'UPI (PhonePe)'
  }
];

const DEFAULT_USER: UserProfile = {
  id: 'usr-1',
  name: 'Priya Sharma',
  email: 'priya021207@gmail.com',
  phone: '+91 98450 12345',
  memberTier: 'NOVA Noir Member',
  savedAddresses: [
    {
      id: 'addr-1',
      type: 'Home',
      name: 'Priya Sharma',
      street: 'Flat 402, Highline Residences, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      phone: '+91 98450 12345',
      isDefault: true
    },
    {
      id: 'addr-2',
      type: 'Work',
      name: 'Priya Sharma',
      street: 'Studio 9, Tech Quarter, Koramangala',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560034',
      phone: '+91 98450 12345',
      isDefault: false
    }
  ]
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(PRODUCTS);
  
  // Local storage persisted state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('nova_cart');
      return saved ? JSON.parse(saved) : [
        {
          product: PRODUCTS[0], // Aurora watch in cart initially for quick discovery
          quantity: 1,
          selectedColor: 'Matte Titanium'
        }
      ];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nova_wishlist');
      return saved ? JSON.parse(saved) : ['echo-wireless-headphones', 'nova-air-limited'];
    } catch {
      return ['echo-wireless-headphones'];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('nova_orders');
      return saved ? JSON.parse(saved) : SEED_ORDERS;
    } catch {
      return SEED_ORDERS;
    }
  });

  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('nova_recently_viewed');
      return saved ? JSON.parse(saved) : [PRODUCTS[1], PRODUCTS[2], PRODUCTS[4]];
    } catch {
      return [PRODUCTS[1], PRODUCTS[2]];
    }
  });

  const [compareList, setCompareList] = useState<Product[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [activeCoupon, setActiveCoupon] = useState<string | null>('NOVA10');
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('nova_user');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('nova_theme') === 'dark';
    } catch {
      return false;
    }
  });

  // Modal / Drawer visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('nova_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('nova_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('nova_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('nova_recently_viewed', JSON.stringify(recentlyViewed));
    } catch (e) {
      console.error(e);
    }
  }, [recentlyViewed]);

  useEffect(() => {
    try {
      localStorage.setItem('nova_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('nova_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('nova_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  // Toast manager
  const addToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success', title?: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, message, type, title }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
    const chosenColor = color || (product.colors && product.colors.length > 0 ? product.colors[0].name : undefined);
    const chosenSize = size || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined);

    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedColor === chosenColor && item.selectedSize === chosenSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }
      return [...prev, { product, quantity, selectedColor: chosenColor, selectedSize: chosenSize }];
    });

    addToast(`Added "${product.name}" to your shopping bag`, 'success', 'Added to Bag');
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    addToast('Item removed from shopping bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    const isSaved = wishlist.includes(productId);
    const product = products.find(p => p.id === productId);
    if (isSaved) {
      setWishlist(prev => prev.filter(id => id !== productId));
      addToast(`Removed ${product?.name || 'item'} from wishlist`, 'info');
    } else {
      setWishlist(prev => [...prev, productId]);
      addToast(`Saved ${product?.name || 'item'} to your wishlist`, 'success', 'Saved');
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const moveToCartFromWishlist = (product: Product) => {
    addToCart(product, 1);
    setWishlist(prev => prev.filter(id => id !== product.id));
  };

  // Recently viewed
  const addToRecentlyViewed = (product: Product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 8);
    });
  };

  // Product Comparison
  const toggleCompare = (product: Product) => {
    setCompareList(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        addToast(`Removed "${product.name}" from comparison`, 'info');
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 3) {
        addToast('You can compare up to 3 products at a time', 'warning');
        return prev;
      }
      addToast(`Added "${product.name}" to comparison`, 'success');
      return [...prev, product];
    });
  };

  const isInCompare = (productId: string) => compareList.some(p => p.id === productId);

  // Coupon handling
  const applyCoupon = (code: string): boolean => {
    const normalized = code.trim().toUpperCase();
    const coupon = PROMO_COUPONS[normalized];
    if (!coupon) {
      addToast('Invalid promo code. Try NOVA10 or DISTINCT', 'error', 'Coupon Error');
      return false;
    }
    if (cartSubtotal < coupon.minOrder) {
      addToast(`Minimum order of ₹${coupon.minOrder.toLocaleString('en-IN')} required for ${normalized}`, 'warning');
      return false;
    }
    setActiveCoupon(normalized);
    addToast(`Coupon "${normalized}" applied successfully!`, 'success', 'Discount Activated');
    return true;
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
    addToast('Coupon removed', 'info');
  };

  // User actions
  const loginUser = (name: string, email: string) => {
    const newUser: UserProfile = {
      ...DEFAULT_USER,
      name,
      email
    };
    setUser(newUser);
    addToast(`Welcome back, ${name}!`, 'success', 'Signed In');
  };

  const logoutUser = () => {
    setUser(null);
    addToast('You have been signed out', 'info');
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 999;
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const shippingFee = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 99;

  let couponDiscount = 0;
  if (activeCoupon && PROMO_COUPONS[activeCoupon]) {
    const promo = PROMO_COUPONS[activeCoupon];
    if (cartSubtotal >= promo.minOrder) {
      if (promo.discountPercent) {
        couponDiscount = Math.round((cartSubtotal * promo.discountPercent) / 100);
      } else if (promo.flatDiscount) {
        couponDiscount = Math.min(cartSubtotal, promo.flatDiscount);
      }
    }
  }

  const cartTotal = Math.max(0, cartSubtotal - couponDiscount + shippingFee);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Place order
  const placeOrder = (shippingAddress: any, paymentMethod: string): Order => {
    const newOrderId = `NOV-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: newOrderId,
      date: new Date().toISOString().split('T')[0],
      items: cart.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0],
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize
      })),
      subtotal: cartSubtotal,
      discount: couponDiscount,
      shipping: shippingFee,
      total: cartTotal,
      status: 'Placed',
      estimatedDelivery: 'Within 2-3 business days',
      trackingNumber: `EXP-${Math.floor(10000000 + Math.random() * 90000000)}`,
      carrier: 'NOVA Express Priority Air',
      shippingAddress: {
        fullName: shippingAddress.fullName || user?.name || 'Customer',
        street: shippingAddress.street || 'Selected Delivery Address',
        city: shippingAddress.city || 'City',
        state: shippingAddress.state || 'State',
        pincode: shippingAddress.pincode || '110001',
        phone: shippingAddress.phone || '+91 98765 43210'
      },
      paymentMethod
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setTrackingOrder(newOrder);
    addToast(`Order ${newOrderId} placed successfully!`, 'success', 'Order Confirmed');
    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        recentlyViewed,
        compareList,
        toasts,
        activeCoupon,
        couponDiscount,
        isDarkMode,
        user,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isProfileOpen,
        setIsProfileOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isCompareOpen,
        setIsCompareOpen,
        selectedProduct,
        setSelectedProduct,
        quickViewProduct,
        setQuickViewProduct,
        trackingOrder,
        setTrackingOrder,
        activeCategoryFilter,
        setActiveCategoryFilter,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        moveToCartFromWishlist,
        addToRecentlyViewed,
        toggleCompare,
        isInCompare,
        applyCoupon,
        removeCoupon,
        toggleDarkMode,
        addToast,
        removeToast,
        placeOrder,
        loginUser,
        logoutUser,
        cartSubtotal,
        freeShippingThreshold,
        freeShippingProgress,
        shippingFee,
        cartTotal,
        cartItemCount
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
