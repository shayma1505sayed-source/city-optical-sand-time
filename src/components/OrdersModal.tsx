import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Order, OrderStatus } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  RotateCcw,
  Ban,
  Calendar,
  MapPin,
  CreditCard,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

export const OrdersModal: React.FC = () => {
  const { isOrdersOpen, setIsOrdersOpen, orders, cancelOrder, formatPrice } = useShop();
  const [selectedOrderForCancel, setSelectedOrderForCancel] = useState<Order | null>(null);
  const [cancelReason, setCancelReason] = useState('Selected wrong frame/watch size');
  const [cancelFeedback, setCancelFeedback] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  if (!isOrdersOpen) return null;

  const handleConfirmCancellation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderForCancel) return;

    setIsCancelling(true);
    setTimeout(async () => {
      const res = await cancelOrder(selectedOrderForCancel.id, cancelReason);
      setIsCancelling(false);
      setCancelFeedback(res.message);
      setTimeout(() => {
        setSelectedOrderForCancel(null);
        setCancelFeedback(null);
      }, 2500);
    }, 600);
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-sky-100 text-sky-800 border border-sky-200">
            Order Confirmed
          </span>
        );
      case 'processing':
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-sky-100 text-sky-800 border border-sky-200">
            Atelier Preparation
          </span>
        );
      case 'shipped':
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-100 text-indigo-800 border border-indigo-200">
            Shipped &amp; Insured
          </span>
        );
      case 'out_for_delivery':
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-purple-100 text-purple-800 border border-purple-200">
            Out for Handover
          </span>
        );
      case 'delivered':
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200">
            Delivered
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-rose-100 text-rose-800 border border-rose-200">
            Cancelled &amp; Refunded
          </span>
        );
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-sky-100 overflow-hidden my-6"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-sky-700 px-6 py-5 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-white/10 rounded-xl">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-brand text-lg font-bold text-white">
                  My Atelier Orders &amp; Handover Tracking
                </h3>
                <p className="text-xs text-sky-100">
                  Real-time status, optical verification, and instant order cancellation
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOrdersOpen(false)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-6">
            {orders.length === 0 ? (
              <div className="py-12 text-center text-slate-500">
                <Package className="w-12 h-12 mx-auto text-sky-300 mb-3" />
                <h4 className="font-brand text-lg font-bold text-slate-800">No Orders Found</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Once you order handcrafted spectacles or watches, track them here.
                </p>
              </div>
            ) : (
              orders.map((order) => {
                const totalFormatted = formatPrice(order.totalINR);
                const isCancelled = order.status === 'cancelled';
                const canCancel = order.status !== 'delivered' && order.status !== 'cancelled';

                return (
                  <motion.div
                    key={order.id}
                    layout
                    className={`rounded-2xl border p-5 sm:p-6 transition-all ${
                      isCancelled
                        ? 'bg-rose-50/30 border-rose-200 opacity-90'
                        : 'bg-white border-sky-100/90 shadow-sm hover:shadow-md'
                    }`}
                  >
                    {/* Top Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-900 text-sm sm:text-base">
                            #{order.orderNumber}
                          </span>
                          {getStatusBadge(order.status)}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>Placed on {new Date(order.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-mono font-bold text-sm sm:text-base text-slate-900">
                          {totalFormatted.primary}
                        </div>
                        <div className="font-mono text-[11px] text-sky-700 font-semibold">
                          ({totalFormatted.secondary})
                        </div>
                      </div>
                    </div>

                    {/* Tracking Timeline Bar */}
                    <div className="py-4">
                      <div className="text-xs font-semibold text-slate-700 mb-3 flex items-center justify-between">
                        <span>Handover Status Timeline:</span>
                        <span className="text-[11px] text-sky-600 font-mono">
                          Tracking: {order.trackingNumber}
                        </span>
                      </div>

                      {isCancelled ? (
                        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2.5">
                          <Ban className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold">Order Cancelled by Patron</div>
                            <div className="text-[11px] text-rose-700 mt-0.5">
                              Reason: {order.cancellationReason || 'Patron requested cancellation'}
                            </div>
                            {order.refundStatus === 'initiated' && (
                              <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                                100% Refund of {totalFormatted.primary} ({totalFormatted.secondary}) initiated to original payment source. Expected in 2–3 business days.
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-semibold">
                          <div className="flex flex-col items-center">
                            <div className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center mb-1">
                              ✓
                            </div>
                            <span className="text-slate-800">Confirmed</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 ${
                              ['processing', 'shipped', 'out_for_delivery', 'delivered'].includes(order.status)
                                ? 'bg-sky-600 text-white'
                                : 'bg-slate-200 text-slate-500'
                            }`}>
                              ✓
                            </div>
                            <span className="text-slate-800">Atelier Prep</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 ${
                              ['shipped', 'out_for_delivery', 'delivered'].includes(order.status)
                                ? 'bg-sky-600 text-white'
                                : 'bg-slate-200 text-slate-500'
                            }`}>
                              ✓
                            </div>
                            <span className="text-slate-800">Shipped</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 ${
                              order.status === 'delivered' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                            }`}>
                              ✓
                            </div>
                            <span className="text-slate-800">Delivered</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Items in this Order */}
                    <div className="pt-3 border-t border-slate-100 space-y-3">
                      <div className="text-xs font-semibold text-slate-700">Order Items:</div>
                      {order.items.map((item, idx) => {
                        const itemPrice = formatPrice(item.priceINR * item.quantity);
                        return (
                          <div key={idx} className="flex items-center gap-3 p-2 rounded-xl bg-slate-50/70">
                            <img
                              src={item.image}
                              alt={item.name}
                              referrerPolicy="no-referrer"
                              className="w-14 h-14 rounded-lg object-cover bg-white border border-slate-200 shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h5 className="font-brand text-xs font-bold text-slate-900 truncate">
                                {item.name}
                              </h5>
                              <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                                <span className="font-semibold text-sky-700">Size: {item.size}</span>
                                <span>·</span>
                                <span>Qty: {item.quantity}</span>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <div className="font-mono font-bold text-xs text-slate-900">
                                {itemPrice.primary}
                              </div>
                              <div className="font-mono text-[10px] text-sky-700">
                                {itemPrice.secondary}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Bottom Actions: Cancellation Feature */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>Deliver to: {order.shippingAddress.city}, {order.shippingAddress.state}</span>
                      </div>

                      {canCancel && (
                        <button
                          type="button"
                          onClick={() => setSelectedOrderForCancel(order)}
                          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Ban className="w-3.5 h-3.5" />
                          <span>Cancel Order &amp; Request Refund</span>
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>

      {/* Cancellation Confirmation Dialog */}
      {selectedOrderForCancel && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-rose-100 space-y-4"
          >
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h4 className="font-brand text-lg font-bold text-slate-900">
                Cancel Order #{selectedOrderForCancel.orderNumber}?
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Full 100% refund of{' '}
                <strong className="text-slate-900">
                  {formatPrice(selectedOrderForCancel.totalINR).primary} (
                  {formatPrice(selectedOrderForCancel.totalINR).secondary})
                </strong>{' '}
                will be credited back to your original payment method.
              </p>
            </div>

            {cancelFeedback ? (
              <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-medium text-center">
                {cancelFeedback}
              </div>
            ) : (
              <form onSubmit={handleConfirmCancellation} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Please Select Reason for Cancellation:
                  </label>
                  <select
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 font-medium"
                  >
                    <option value="Selected wrong frame/watch size">Selected wrong frame/watch size</option>
                    <option value="Found alternative design in atelier">Found alternative design in atelier</option>
                    <option value="Delivery timeline not suitable">Delivery timeline not suitable</option>
                    <option value="Ordered by mistake / Duplicate order">Ordered by mistake / Duplicate order</option>
                    <option value="Changed mind / Financial reasons">Changed mind / Financial reasons</option>
                  </select>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-600 leading-relaxed">
                  ✓ Instant cancellation confirmed in real time.<br />
                  ✓ Bank refund transaction reference generated immediately.
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedOrderForCancel(null)}
                    disabled={isCancelling}
                    className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
                  >
                    Keep Order
                  </button>

                  <button
                    type="submit"
                    disabled={isCancelling}
                    className="py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {isCancelling ? 'Processing...' : 'Confirm Cancellation'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
