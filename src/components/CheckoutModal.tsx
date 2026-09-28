import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Check, 
  MapPin, 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  ArrowRight, 
  Smartphone, 
  Building, 
  Banknote,
  Sparkles,
  Package
} from 'lucide-react';
import { Order } from '../types';

interface CheckoutModalProps {
  onOrderComplete: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onOrderComplete }) => {
  const { 
    cart, 
    cartSubtotal, 
    couponDiscount, 
    shippingFee, 
    cartTotal, 
    isCheckoutOpen, 
    setIsCheckoutOpen,
    user,
    placeOrder 
  } = useShop();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Address State
  const [formData, setFormData] = useState({
    fullName: user?.name || 'Priya Sharma',
    email: user?.email || 'priya021207@gmail.com',
    phone: user?.phone || '+91 98450 12345',
    street: user?.savedAddresses[0]?.street || 'Flat 402, Highline Residences, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038'
  });

  // Delivery Speed State
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('express');

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('priyasharma@okaxis');
  const [cardInfo, setCardInfo] = useState({
    number: '•••• •••• •••• 4242',
    name: 'Priya Sharma',
    expiry: '08/29',
    cvv: '•••'
  });

  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  if (!isCheckoutOpen) return null;

  const handleNextStep = () => {
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else if (step === 3) {
      // Execute place order
      const order = placeOrder(
        {
          fullName: formData.fullName,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          phone: formData.phone
        },
        paymentMethod.toUpperCase()
      );
      setPlacedOrder(order);
      setStep(4);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-4xl bg-[#FAF9F6] dark:bg-[#121316] text-slate-900 dark:text-zinc-100 rounded-3xl shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden my-auto max-h-[95vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-black/5 dark:border-white/10 flex items-center justify-between bg-[#FAF9F6]/90 dark:bg-[#121316]/90 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <span className="font-display font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
              NOVA
            </span>
            <span className="text-xs font-mono text-slate-400">/ SECURE CHECKOUT</span>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator (Steps 1, 2, 3) */}
        {step < 4 && (
          <div className="px-6 py-3 bg-white dark:bg-zinc-900 border-b border-black/5 dark:border-white/5">
            <div className="flex items-center justify-between max-w-lg mx-auto text-xs font-mono">
              {[
                { s: 1, label: 'Address' },
                { s: 2, label: 'Delivery' },
                { s: 3, label: 'Payment' }
              ].map(({ s, label }) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step === s
                        ? 'bg-[#7C3AED] text-white'
                        : step > s
                        ? 'bg-emerald-500 text-white'
                        : 'bg-black/5 dark:bg-white/10 text-slate-400'
                    }`}
                  >
                    {step > s ? <Check className="w-3.5 h-3.5" /> : s}
                  </div>
                  <span className={step === s ? 'font-bold text-slate-900 dark:text-white' : 'text-slate-400'}>
                    {label}
                  </span>
                  {s < 3 && <span className="text-slate-300 dark:text-zinc-700 mx-2">——</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Checkout Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1">
          
          {step < 4 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Form Controls */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Step 1: Shipping Address */}
                {step === 1 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-[#7C3AED]" />
                      <h3 className="font-display font-bold text-lg">Shipping Destination</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono text-slate-500 uppercase mb-1">Full Name</label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-xs focus:outline-none focus:border-[#7C3AED]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-slate-500 uppercase mb-1">Phone Number</label>
                        <input
                          type="text"
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-xs focus:outline-none focus:border-[#7C3AED]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-500 uppercase mb-1">Street Address</label>
                      <input
                        type="text"
                        value={formData.street}
                        onChange={e => setFormData({ ...formData, street: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-xs focus:outline-none focus:border-[#7C3AED]"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-slate-500 uppercase mb-1">City</label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={e => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-xs focus:outline-none focus:border-[#7C3AED]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-slate-500 uppercase mb-1">State</label>
                        <input
                          type="text"
                          value={formData.state}
                          onChange={e => setFormData({ ...formData, state: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-xs focus:outline-none focus:border-[#7C3AED]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-slate-500 uppercase mb-1">PIN Code</label>
                        <input
                          type="text"
                          value={formData.pincode}
                          onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-xs focus:outline-none focus:border-[#7C3AED]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Delivery Selection */}
                {step === 2 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck className="w-4 h-4 text-[#7C3AED]" />
                      <h3 className="font-display font-bold text-lg">Delivery Method</h3>
                    </div>

                    <div
                      onClick={() => setDeliveryMethod('express')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        deliveryMethod === 'express'
                          ? 'border-[#7C3AED] ring-2 ring-[#7C3AED]/20 bg-[#7C3AED]/5'
                          : 'border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full border flex items-center justify-center border-[#7C3AED]">
                            {deliveryMethod === 'express' && <div className="w-2 h-2 rounded-full bg-[#7C3AED]" />}
                          </div>
                          <div>
                            <div className="font-semibold text-xs text-slate-900 dark:text-white">
                              NOVA Express Priority Air
                            </div>
                            <div className="text-[11px] text-slate-500">Delivered within 24–48 hours</div>
                          </div>
                        </div>
                        <span className="font-mono text-xs font-bold text-emerald-600">FREE</span>
                      </div>
                    </div>

                    <div
                      onClick={() => setDeliveryMethod('standard')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        deliveryMethod === 'standard'
                          ? 'border-[#7C3AED] ring-2 ring-[#7C3AED]/20 bg-[#7C3AED]/5'
                          : 'border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full border flex items-center justify-center border-[#7C3AED]">
                            {deliveryMethod === 'standard' && <div className="w-2 h-2 rounded-full bg-[#7C3AED]" />}
                          </div>
                          <div>
                            <div className="font-semibold text-xs text-slate-900 dark:text-white">
                              Eco-Standard Ground Shipping
                            </div>
                            <div className="text-[11px] text-slate-500">Delivered in 3–5 business days</div>
                          </div>
                        </div>
                        <span className="font-mono text-xs font-bold text-slate-400">FREE</span>
                      </div>
                    </div>

                  </div>
                )}

                {/* Step 3: Payment Method */}
                {step === 3 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="w-4 h-4 text-[#7C3AED]" />
                      <h3 className="font-display font-bold text-lg">Select Payment Method</h3>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { id: 'upi', label: 'UPI / QR', icon: <Smartphone className="w-4 h-4" /> },
                        { id: 'card', label: 'Card', icon: <CreditCard className="w-4 h-4" /> },
                        { id: 'netbanking', label: 'Net Banking', icon: <Building className="w-4 h-4" /> },
                        { id: 'cod', label: 'COD', icon: <Banknote className="w-4 h-4" /> }
                      ].map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setPaymentMethod(m.id as any)}
                          className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                            paymentMethod === m.id
                              ? 'border-[#7C3AED] ring-2 ring-[#7C3AED]/20 bg-[#7C3AED]/5 text-[#7C3AED]'
                              : 'border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-300'
                          }`}
                        >
                          {m.icon}
                          <span className="text-xs font-semibold">{m.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Method details */}
                    <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 mt-4">
                      {paymentMethod === 'upi' && (
                        <div>
                          <label className="block text-[11px] font-mono text-slate-500 uppercase mb-1">
                            Virtual Payment Address (VPA) / UPI ID
                          </label>
                          <input
                            type="text"
                            value={upiId}
                            onChange={e => setUpiId(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800 text-xs font-mono focus:outline-none focus:border-[#7C3AED]"
                          />
                          <p className="mt-2 text-[11px] text-slate-400">
                            Compatible with Google Pay, PhonePe, Paytm, CRED & BHIM.
                          </p>
                        </div>
                      )}

                      {paymentMethod === 'card' && (
                        <div className="space-y-3">
                          <div>
                            <label className="block text-[11px] font-mono text-slate-500 uppercase mb-1">Card Number</label>
                            <input
                              type="text"
                              value={cardInfo.number}
                              onChange={e => setCardInfo({ ...cardInfo, number: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800 text-xs font-mono"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-mono text-slate-500 uppercase mb-1">Expiry</label>
                              <input
                                type="text"
                                value={cardInfo.expiry}
                                onChange={e => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                                className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800 text-xs font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-mono text-slate-500 uppercase mb-1">CVV</label>
                              <input
                                type="password"
                                maxLength={3}
                                value={cardInfo.cvv}
                                onChange={e => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                                className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800 text-xs font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentMethod === 'netbanking' && (
                        <div className="space-y-2">
                          <label className="block text-[11px] font-mono text-slate-500 uppercase">Select Bank</label>
                          <select className="w-full p-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800 text-xs">
                            <option>HDFC Bank</option>
                            <option>ICICI Bank</option>
                            <option>State Bank of India</option>
                            <option>Axis Bank</option>
                            <option>Kotak Mahindra Bank</option>
                          </select>
                        </div>
                      )}

                      {paymentMethod === 'cod' && (
                        <div className="text-xs text-slate-600 dark:text-zinc-400">
                          <p className="font-semibold text-slate-900 dark:text-white mb-1">Cash on Delivery Available</p>
                          <p>Pay upon delivery by cash or UPI QR scanned from our courier delivery partner.</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span>256-bit bank encrypted transactional channel.</span>
                    </div>

                  </div>
                )}

                {/* Step navigation buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-black/5 dark:border-white/10">
                  {step > 1 ? (
                    <button
                      onClick={() => setStep((step - 1) as any)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    >
                      ← Back
                    </button>
                  ) : <div />}

                  <button
                    onClick={handleNextStep}
                    className="px-8 py-3.5 bg-slate-900 hover:bg-[#7C3AED] dark:bg-white dark:text-slate-900 dark:hover:bg-[#A78BFA] text-white font-semibold text-xs uppercase tracking-wider rounded-full shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>{step === 3 ? `Pay ₹${cartTotal.toLocaleString('en-IN')}` : 'Continue'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* Right Column: Order Summary Box */}
              <div className="lg:col-span-5 bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-black/5 dark:border-white/10 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-4">
                    Order Summary ({cart.length} unique items)
                  </h4>

                  <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-xs">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
                          <img src={item.product.images[0]} alt={item.product.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold truncate text-slate-900 dark:text-white">{item.product.name}</div>
                          <div className="text-[11px] text-slate-500">Qty: {item.quantity} {item.selectedColor ? `· ${item.selectedColor}` : ''}</div>
                        </div>
                        <div className="font-mono font-bold text-slate-900 dark:text-white">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/10 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-500">
                      <span>Subtotal</span>
                      <span className="font-mono">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                    </div>
                    {couponDiscount > 0 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Discount</span>
                        <span className="font-mono">-₹{couponDiscount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-500">
                      <span>Express Shipping</span>
                      <span className="font-mono text-emerald-600 font-semibold">FREE</span>
                    </div>
                    <div className="pt-2 border-t border-black/5 dark:border-white/10 flex justify-between text-base font-bold text-slate-900 dark:text-white">
                      <span>Total Due</span>
                      <span className="font-mono text-[#7C3AED] dark:text-[#A78BFA]">
                        ₹{cartTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5 text-[11px] text-slate-400">
                  By completing order, you accept NOVA's 14-day hassle-free return policy.
                </div>
              </div>

            </div>
          ) : (
            /* Step 4: Confirmation Screen */
            <div className="py-10 text-center max-w-lg mx-auto animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-600 mx-auto flex items-center justify-center mb-6">
                <Check className="w-10 h-10" />
              </div>

              <div className="text-xs font-mono uppercase tracking-widest text-[#7C3AED] dark:text-[#A78BFA] font-bold mb-2">
                ORDER CONFIRMED & DISPATCH PREPARED
              </div>

              <h2 className="text-3xl font-display font-extrabold text-slate-900 dark:text-white">
                Thank you for your order!
              </h2>

              <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
                Order <strong className="font-mono text-slate-900 dark:text-white">{placedOrder?.id}</strong> has been received and allocated for express priority air delivery.
              </p>

              <div className="mt-8 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Tracking Code</span>
                  <span className="font-mono font-bold">{placedOrder?.trackingNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Delivery</span>
                  <span className="font-semibold text-emerald-600">{placedOrder?.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Shipping To</span>
                  <span className="truncate max-w-[200px]">{placedOrder?.shippingAddress.street}, {placedOrder?.shippingAddress.city}</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    if (placedOrder) onOrderComplete(placedOrder);
                  }}
                  className="px-6 py-3.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold rounded-full shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Package className="w-4 h-4" />
                  <span>Track Order Live</span>
                </button>

                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="px-6 py-3.5 bg-slate-900 dark:bg-white dark:text-slate-900 text-white text-xs font-semibold rounded-full transition-all cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
