import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  User, 
  Package, 
  Heart, 
  MapPin, 
  CreditCard, 
  History, 
  LogOut, 
  LogIn, 
  CheckCircle2, 
  Clock, 
  Truck, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Order, Product } from '../types';

interface UserProfileModalProps {
  onSelectProduct: (product: Product) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ onSelectProduct }) => {
  const { 
    user, 
    orders, 
    wishlist, 
    products, 
    recentlyViewed, 
    isProfileOpen, 
    setIsProfileOpen, 
    loginUser, 
    logoutUser,
    trackingOrder,
    setTrackingOrder
  } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'tracking' | 'profile' | 'addresses' | 'recent'>('orders');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginName, setLoginName] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  // If a trackingOrder is actively set, switch tab to tracking
  React.useEffect(() => {
    if (trackingOrder) {
      setActiveTab('tracking');
    }
  }, [trackingOrder]);

  if (!isProfileOpen) return null;

  const currentOrderToTrack = trackingOrder || (orders.length > 0 ? orders[0] : null);

  const trackingStages = [
    { label: 'Placed', icon: <Clock className="w-3.5 h-3.5" /> },
    { label: 'Confirmed', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
    { label: 'Packed', icon: <Package className="w-3.5 h-3.5" /> },
    { label: 'Shipped', icon: <Truck className="w-3.5 h-3.5" /> },
    { label: 'Out for Delivery', icon: <Truck className="w-3.5 h-3.5" /> },
    { label: 'Delivered', icon: <CheckCircle2 className="w-3.5 h-3.5" /> }
  ];

  const getStageIndex = (status: Order['status']) => {
    switch (status) {
      case 'Placed': return 0;
      case 'Confirmed': return 1;
      case 'Packed': return 2;
      case 'Shipped': return 3;
      case 'Out for Delivery': return 4;
      case 'Delivered': return 5;
      default: return 0;
    }
  };

  const currentStageIdx = currentOrderToTrack ? getStageIndex(currentOrderToTrack.status) : 0;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail && loginName) {
      loginUser(loginName, loginEmail);
      setIsSigningIn(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-4xl bg-[#FAF9F6] dark:bg-[#121316] text-slate-900 dark:text-zinc-100 rounded-3xl shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-black/5 dark:border-white/10 flex items-center justify-between bg-[#FAF9F6]/90 dark:bg-[#121316]/90 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center font-display font-bold">
              {user ? user.name.charAt(0) : 'N'}
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-slate-900 dark:text-white">
                {user ? user.name : 'NOVA Account'}
              </h2>
              <span className="text-xs font-mono text-[#7C3AED] dark:text-[#A78BFA]">
                {user ? user.memberTier : 'Guest Discoverer'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsProfileOpen(false)}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 pb-2 border-b border-black/5 dark:border-white/5 bg-white dark:bg-zinc-900 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('tracking')}
            className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'tracking'
                ? 'bg-[#7C3AED] text-white font-semibold'
                : 'text-slate-600 dark:text-zinc-400 hover:text-[#7C3AED]'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Live Tracking</span>
          </button>

          <button
            onClick={() => setActiveTab('recent')}
            className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'recent'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Recently Viewed ({recentlyViewed.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'addresses'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Addresses</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile Info</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1 space-y-6">
          
          {/* TAB 1: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display font-bold text-base">Your Order History</h3>
                <span className="text-xs text-slate-500 font-mono">Real-time sync</span>
              </div>

              {orders.length === 0 ? (
                <div className="py-16 text-center text-slate-500">
                  <Package className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                  <p className="text-sm">No orders found.</p>
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-black/5 dark:border-white/5 text-xs">
                      <div>
                        <span className="text-slate-400 font-mono">ORDER ID: </span>
                        <strong className="font-mono text-slate-900 dark:text-white">{order.id}</strong>
                        <span className="text-slate-400 ml-2">({order.date})</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] dark:text-[#A78BFA] font-mono font-semibold text-[11px]">
                          {order.status}
                        </span>
                        <button
                          onClick={() => {
                            setTrackingOrder(order);
                            setActiveTab('tracking');
                          }}
                          className="text-[#7C3AED] font-semibold hover:underline flex items-center gap-1"
                        >
                          <span>Track</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
                              <img src={item.image} alt={item.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="font-semibold text-slate-900 dark:text-white">{item.name}</div>
                              <div className="text-[11px] text-slate-400">Qty: {item.quantity} {item.selectedColor ? `· ${item.selectedColor}` : ''}</div>
                            </div>
                          </div>
                          <span className="font-mono font-bold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs">
                      <span className="text-slate-500">Paid via {order.paymentMethod}</span>
                      <div className="text-right">
                        <span className="text-slate-400 mr-2">Total:</span>
                        <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                          ₹{order.total.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: LIVE ORDER TRACKING TIMELINE */}
          {activeTab === 'tracking' && (
            <div className="space-y-6">
              {currentOrderToTrack ? (
                <div>
                  <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-black/5 dark:border-white/10 shadow-sm">
                    
                    <div className="flex flex-wrap items-center justify-between pb-4 border-b border-black/5 dark:border-white/5 mb-6 text-xs">
                      <div>
                        <div className="font-mono text-[10px] text-[#7C3AED] uppercase font-bold tracking-wider">
                          CARRIER: {currentOrderToTrack.carrier}
                        </div>
                        <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mt-0.5">
                          Order {currentOrderToTrack.id}
                        </h3>
                        <p className="text-slate-400 font-mono text-[11px]">
                          Air AWB: {currentOrderToTrack.trackingNumber}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] text-slate-400 block">Current Status</span>
                        <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          {currentOrderToTrack.status}
                        </span>
                      </div>
                    </div>

                    {/* Animated Progress Timeline */}
                    <div className="relative my-8">
                      {/* Timeline Bar */}
                      <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-1 bg-black/5 dark:bg-white/10 -translate-y-1/2 z-0" />
                      <div
                        className="hidden sm:block absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#7C3AED] to-emerald-500 -translate-y-1/2 z-0 transition-all duration-700"
                        style={{ width: `${(currentStageIdx / (trackingStages.length - 1)) * 100}%` }}
                      />

                      <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 relative z-10">
                        {trackingStages.map((stage, idx) => {
                          const isDone = idx <= currentStageIdx;
                          const isCurrent = idx === currentStageIdx;

                          return (
                            <div key={idx} className="flex flex-col items-center text-center">
                              <div
                                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                                  isCurrent
                                    ? 'bg-[#7C3AED] text-white ring-4 ring-[#7C3AED]/20 scale-110 shadow-lg'
                                    : isDone
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-black/5 dark:bg-white/10 text-slate-400'
                                }`}
                              >
                                {stage.icon}
                              </div>
                              <span className={`text-[11px] font-mono mt-2 ${isCurrent ? 'font-bold text-[#7C3AED]' : isDone ? 'text-slate-800 dark:text-zinc-200' : 'text-slate-400'}`}>
                                {stage.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Delivery Destination info */}
                    <div className="mt-8 pt-4 border-t border-black/5 dark:border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-slate-400 font-mono text-[10px] uppercase">Destination Address</span>
                        <div className="font-semibold text-slate-800 dark:text-zinc-200 mt-0.5">
                          {currentOrderToTrack.shippingAddress.fullName}
                        </div>
                        <div className="text-slate-500">
                          {currentOrderToTrack.shippingAddress.street}, {currentOrderToTrack.shippingAddress.city}, {currentOrderToTrack.shippingAddress.pincode}
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-400 font-mono text-[10px] uppercase">Delivery Expectation</span>
                        <div className="font-semibold text-emerald-600 mt-0.5">
                          {currentOrderToTrack.estimatedDelivery}
                        </div>
                        <div className="text-slate-500">
                          Dispatched via Climate-Neutral Air Fleet
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-500">
                  <p>No active order available to track right now.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: RECENTLY VIEWED */}
          {activeTab === 'recent' && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-base">Recently Viewed Items</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recentlyViewed.map(prod => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      setIsProfileOpen(false);
                      onSelectProduct(prod);
                    }}
                    className="p-3 bg-white dark:bg-zinc-900 rounded-2xl border border-black/5 dark:border-white/10 hover:shadow-md cursor-pointer transition-all"
                  >
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 mb-2">
                      <img src={prod.images[0]} alt={prod.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-mono uppercase text-[#7C3AED]">{prod.category}</span>
                    <h4 className="font-semibold text-xs text-slate-900 dark:text-white truncate">{prod.name}</h4>
                    <div className="font-mono font-bold text-xs text-slate-900 dark:text-white mt-1">
                      ₹{prod.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-base">Saved Addresses</h3>
                <button className="text-xs text-[#7C3AED] font-semibold hover:underline">
                  + Add New Address
                </button>
              </div>

              {user?.savedAddresses.map(addr => (
                <div key={addr.id} className="p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-black/5 dark:border-white/10 flex items-start justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-slate-900 dark:text-white">{addr.name}</strong>
                      <span className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[10px] font-mono">
                        {addr.type}
                      </span>
                      {addr.isDefault && (
                        <span className="text-[10px] text-emerald-600 font-mono font-semibold">DEFAULT</span>
                      )}
                    </div>
                    <p className="text-slate-600 dark:text-zinc-400 mt-1">{addr.street}</p>
                    <p className="text-slate-600 dark:text-zinc-400">{addr.city}, {addr.state} - {addr.pincode}</p>
                    <p className="text-slate-500 mt-1">Phone: {addr.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: PROFILE & AUTH */}
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-md">
              <h3 className="font-display font-bold text-base">Account Credentials</h3>

              {user ? (
                <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-black/5 dark:border-white/10 space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-mono text-[10px] uppercase">Name</span>
                    <div className="font-semibold text-slate-800 dark:text-zinc-200">{user.name}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono text-[10px] uppercase">Email</span>
                    <div className="font-semibold text-slate-800 dark:text-zinc-200">{user.email}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono text-[10px] uppercase">Phone</span>
                    <div className="font-semibold text-slate-800 dark:text-zinc-200">{user.phone}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono text-[10px] uppercase">Member Status</span>
                    <div className="font-semibold text-[#7C3AED]">{user.memberTier} (Unlocked)</div>
                  </div>

                  <div className="pt-3 border-t border-black/5 dark:border-white/5">
                    <button
                      onClick={logoutUser}
                      className="px-4 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleLoginSubmit} className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-black/5 dark:border-white/10 space-y-3">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-500 uppercase mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={loginName}
                      onChange={e => setLoginName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-black/10 dark:border-white/10 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-500 uppercase mb-1">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="priya@example.com"
                      value={loginEmail}
                      onChange={e => setLoginEmail(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-black/10 dark:border-white/10 text-xs"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#7C3AED] text-white text-xs font-semibold rounded-xl hover:bg-[#6D28D9] flex items-center justify-center gap-1.5"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Sign In to NOVA</span>
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
