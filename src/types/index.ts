export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'Fashion' | 'Electronics' | 'Beauty' | 'Home & Living' | 'Accessories' | 'Gadgets' | 'Lifestyle';
  price: number;
  originalPrice: number;
  discount: number; // percentage
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  longDescription: string;
  badge?: 'Trending' | 'New' | 'Limited' | 'Best Seller';
  colors?: { name: string; hex: string; imageIndex?: number }[];
  sizes?: string[];
  specs: { label: string; value: string }[];
  features: string[];
  inStock: boolean;
  vibe: ('Everyday' | 'Work' | 'Travel' | 'Fitness' | 'Gifting' | 'Just Browsing' | 'Home & Living')[];
  styleTag: 'Minimalist Chic' | 'Tech Forward' | 'Streetwear & Bold' | 'Organic & Earthy' | 'Luxury Contemporary';
  isCurated?: boolean;
  isTrending?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'Placed' | 'Confirmed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  estimatedDelivery: string;
  trackingNumber: string;
  carrier: string;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  paymentMethod: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  memberTier: string;
  savedAddresses: {
    id: string;
    type: 'Home' | 'Work' | 'Other';
    name: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
    isDefault: boolean;
  }[];
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  title?: string;
}
