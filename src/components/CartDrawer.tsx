import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Tag,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateQuantity,
    updateCartItemSize,
    removeFromCart,
    clearCart,
    cartSubtotalINR,
    discountINR,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    shippingChargeINR,
    cartTotalINR,
    formatPrice,
    setIsCheckoutOpen,
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    setCouponMessage({
      text: res.message,
      isError: !res.success,
    });
    if (res.success) setCouponInput('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const subtotalFormatted = formatPrice(cartSubtotalINR);
  const totalFormatted = formatPrice(cartTotalINR);
  const discountFormatted = formatPrice(discountINR);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0"
        />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 border-l border-sky-100"
        >
          {/* Header */}
          <div className="p-5 border-b border-sky-100 bg-sky-50/50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-sky-600 text-white rounded-xl shadow-xs">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-brand text-lg font-bold text-slate-900 leading-tight">
                  Atelier Shopping Bag
                </h3>
                <span className="text-xs text-sky-700 font-medium">
                  {cart.length} {cart.length === 1 ? 'handcrafted piece' : 'pieces selected'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <div className="w-16 h-16 rounded-full bg-sky-50 text-sky-400 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-brand text-lg font-bold text-slate-800">
                  Your bag is currently empty
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mt-1">
                  Explore our luxury optical frames and Roman-dial timepieces to curate your look.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors"
                >
                  Browse Collection
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemPrice = formatPrice(item.product.priceINR * item.quantity);
                return (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-3.5 bg-slate-50/70 hover:bg-sky-50/30 rounded-2xl border border-sky-100/90 transition-colors flex gap-3.5"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-brand text-xs font-bold text-slate-900 line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-rose-500 p-0.5 transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Size Changer Inside Cart */}
                        <div className="mt-1 flex items-center gap-1.5 text-[11px]">
                          <span className="text-slate-500">Size:</span>
                          <select
                            value={item.selectedSize}
                            onChange={(e) => updateCartItemSize(item.id, e.target.value)}
                            className="bg-white border border-sky-200 text-sky-800 text-[11px] font-semibold rounded px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-sky-500"
                          >
                            {item.product.availableSizes.map((sz) => (
                              <option key={sz} value={sz}>
                                {sz}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Quantity & Price */}
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden shadow-2xs">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-slate-100 text-slate-600"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-mono text-xs font-bold text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-slate-100 text-slate-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="font-mono font-bold text-xs sm:text-sm text-slate-900">
                            {itemPrice.primary}
                          </div>
                          <div className="font-mono text-[10px] text-sky-700/80">
                            {itemPrice.secondary}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Module */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-sky-100 bg-white space-y-4">
              {/* Coupon Code Input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter privilege code (e.g. CITY10)"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs uppercase font-medium placeholder:normal-case placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-slate-900 hover:bg-sky-600 text-white rounded-xl text-xs font-semibold transition-colors"
                >
                  Apply
                </button>
              </form>

              {/* Coupon Feedback or Active Tag */}
              {couponMessage && (
                <div
                  className={`text-[11px] font-medium p-2 rounded-lg ${
                    couponMessage.isError
                      ? 'bg-red-50 text-red-700 border border-red-100'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                  }`}
                >
                  {couponMessage.text}
                </div>
              )}

              {appliedCoupon && (
                <div className="flex items-center justify-between text-xs bg-sky-50 text-sky-800 p-2 rounded-xl border border-sky-200">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Check className="w-3.5 h-3.5 text-sky-600" />
                    <span>Privilege Code: {appliedCoupon}</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-rose-600 hover:underline font-semibold"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Cost Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-mono font-medium text-slate-900">
                    {subtotalFormatted.primary}
                  </span>
                </div>

                {discountINR > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Privilege Member Discount</span>
                    <span className="font-mono">-{discountFormatted.primary}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Insured Express Shipping</span>
                  <span className="text-emerald-700 font-semibold uppercase text-[11px]">
                    Complimentary (₹0)
                  </span>
                </div>

                <div className="flex items-baseline justify-between pt-2 border-t border-slate-200 font-bold text-slate-900">
                  <span className="text-sm">Final Amount</span>
                  <div className="text-right">
                    <div className="text-base sm:text-lg font-mono text-slate-900">
                      {totalFormatted.primary}
                    </div>
                    <div className="text-xs font-mono text-sky-700 font-semibold">
                      ({totalFormatted.secondary})
                    </div>
                  </div>
                </div>
              </div>

              {/* Security reassure & Checkout CTA */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                <span>256-bit bank encryption · 100% refund on cancellation</span>
              </div>

              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white rounded-xl font-semibold text-sm shadow-md shadow-sky-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
