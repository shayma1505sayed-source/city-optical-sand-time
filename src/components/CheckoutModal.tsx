import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { Address } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  X,
  CreditCard,
  QrCode,
  Building2,
  Banknote,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Package,
  Sparkles,
  Smartphone,
  Copy,
  Check,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotalINR,
    discountINR,
    shippingChargeINR,
    formatPrice,
    placeOrder,
    setIsOrdersOpen,
  } = useShop();

  const { user } = useAuth();

  // Step state: 'form' | 'processing' | 'success'
  const [checkoutStep, setCheckoutStep] = useState<'form' | 'processing' | 'success'>('form');
  const [processingStage, setProcessingStage] = useState(0);
  const [confirmedOrderNum, setConfirmedOrderNum] = useState('');

  // Shipping Form
  const [fullName, setFullName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [streetAddress, setStreetAddress] = useState(
    user?.addresses?.[0]?.streetAddress || '42 Regent Boulevard, Suite 501'
  );
  const [city, setCity] = useState(user?.addresses?.[0]?.city || 'Mumbai');
  const [state, setState] = useState(user?.addresses?.[0]?.state || 'Maharashtra');
  const [postalCode, setPostalCode] = useState(user?.addresses?.[0]?.postalCode || '400001');

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('4532 8901 2345 6789');
  const [cardHolder, setCardHolder] = useState(user?.name ? user.name.toUpperCase() : 'VALUED PATRON');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('782');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [copiedUpi, setCopiedUpi] = useState(false);

  if (!isCheckoutOpen) return null;

  const totalFormatted = formatPrice(cartTotalINR);

  const handlePayNow = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('processing');
    setProcessingStage(1);

    // Stage 1: Handshake
    setTimeout(() => {
      setProcessingStage(2);
    }, 900);

    // Stage 2: Bank Auth
    setTimeout(() => {
      setProcessingStage(3);
    }, 1800);

    // Stage 3: Order Completed
    setTimeout(async () => {
      const shippingAddress: Address = {
        id: 'addr_' + Date.now(),
        fullName,
        phone,
        streetAddress,
        city,
        state,
        postalCode,
        isDefault: true,
      };

      const order = await placeOrder(paymentMethod, shippingAddress, {
        upiId: paymentMethod === 'upi' ? (upiId || 'client@okhdfcbank') : undefined,
        cardLast4: paymentMethod === 'card' ? cardNumber.slice(-4) : undefined,
        bankName: paymentMethod === 'netbanking' ? selectedBank : undefined,
      });

      setConfirmedOrderNum(order.orderNumber);
      setCheckoutStep('success');

      // Trigger gold & sky blue luxury confetti explosion
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0284c7', '#38bdf8', '#c5a059', '#f7e09e', '#ffffff'],
      });
    }, 2700);
  };

  const handleFinish = () => {
    setIsCheckoutOpen(false);
    setCheckoutStep('form');
  };

  const handleViewOrders = () => {
    setIsCheckoutOpen(false);
    setCheckoutStep('form');
    setIsOrdersOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-sky-100 overflow-hidden my-6"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-sky-700 px-6 py-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-sky-200" />
              <h3 className="font-brand text-base sm:text-lg font-bold text-white tracking-wide">
                Encrypted Checkout &middot; City Optical &amp; Times
              </h3>
            </div>
            {checkoutStep !== 'processing' && (
              <button
                onClick={handleFinish}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close checkout"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Form Step */}
          {checkoutStep === 'form' && (
            <form onSubmit={handlePayNow} className="p-6 sm:p-8 space-y-6 max-h-[82vh] overflow-y-auto">
              {/* Order Summary Strip */}
              <div className="p-4 bg-sky-50/70 rounded-2xl border border-sky-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">
                    Total Payable Amount ({cart.length} items)
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-xl sm:text-2xl font-bold font-mono text-slate-900">
                      {totalFormatted.primary}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold font-mono text-sky-700">
                      ({totalFormatted.secondary})
                    </span>
                  </div>
                </div>
                <div className="text-right text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                  Free Insured Handover
                </div>
              </div>

              {/* Step 1: Shipping Address */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-[11px] font-bold">
                    1
                  </span>
                  <span>Insured Handover Delivery Address</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Full Recipient Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Shayma Sayed"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Contact Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98200 44521"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-600 font-medium mb-1">Street Address / Suite / Residence</label>
                    <input
                      type="text"
                      required
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      placeholder="e.g. 42 Regent Boulevard, Suite 501"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-medium mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Mumbai"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-600 font-medium mb-1">State</label>
                      <input
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="Maharashtra"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-medium mb-1">Postal PIN</label>
                      <input
                        type="text"
                        required
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="400001"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Payment Method */}
              <div className="pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-[11px] font-bold">
                    2
                  </span>
                  <span>Select Payment Gateway</span>
                </h4>

                {/* Tabs for Payment Methods */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'upi'
                        ? 'bg-sky-50 border-sky-500 text-sky-900 ring-2 ring-sky-200 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-sky-300'
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-sky-600" />
                    <span>UPI / QR Code</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-sky-50 border-sky-500 text-sky-900 ring-2 ring-sky-200 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-sky-300'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-sky-600" />
                    <span>Credit / Debit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'netbanking'
                        ? 'bg-sky-50 border-sky-500 text-sky-900 ring-2 ring-sky-200 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-sky-300'
                    }`}
                  >
                    <Building2 className="w-5 h-5 text-sky-600" />
                    <span>Net Banking</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'cod'
                        ? 'bg-sky-50 border-sky-500 text-sky-900 ring-2 ring-sky-200 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-sky-300'
                    }`}
                  >
                    <Banknote className="w-5 h-5 text-sky-600" />
                    <span>Cash on Delivery</span>
                  </button>
                </div>

                {/* UPI Interface */}
                {paymentMethod === 'upi' && (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-sky-100 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    {/* Simulated Dynamic QR Code */}
                    <div className="flex flex-col items-center text-center p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                      <div className="w-32 h-32 bg-slate-900 p-2 rounded-lg relative overflow-hidden flex items-center justify-center">
                        {/* Realistic SVG QR Pattern */}
                        <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
                          <rect x="5" y="5" width="28" height="28" rx="4" fill="white" />
                          <rect x="9" y="9" width="20" height="20" rx="2" fill="black" />
                          <rect x="13" y="13" width="12" height="12" rx="1" fill="white" />

                          <rect x="67" y="5" width="28" height="28" rx="4" fill="white" />
                          <rect x="71" y="9" width="20" height="20" rx="2" fill="black" />
                          <rect x="75" y="13" width="12" height="12" rx="1" fill="white" />

                          <rect x="5" y="67" width="28" height="28" rx="4" fill="white" />
                          <rect x="9" y="71" width="20" height="20" rx="2" fill="black" />
                          <rect x="13" y="75" width="12" height="12" rx="1" fill="white" />

                          {/* Data bits */}
                          <rect x="38" y="10" width="8" height="8" fill="white" />
                          <rect x="50" y="10" width="8" height="8" fill="white" />
                          <rect x="38" y="24" width="18" height="8" fill="white" />
                          <rect x="10" y="38" width="24" height="8" fill="white" />
                          <rect x="42" y="42" width="16" height="16" rx="2" fill="#38bdf8" />
                          <rect x="68" y="38" width="24" height="8" fill="white" />
                          <rect x="68" y="50" width="12" height="12" fill="white" />
                          <rect x="38" y="68" width="10" height="24" fill="white" />
                          <rect x="52" y="74" width="16" height="8" fill="white" />
                          <rect x="72" y="74" width="20" height="18" fill="white" />
                        </svg>
                        {/* Animated scanning laser line */}
                        <motion.div
                          animate={{ y: [-50, 50, -50] }}
                          transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
                          className="absolute inset-x-0 h-0.5 bg-sky-400 shadow-md shadow-sky-400"
                        />
                      </div>
                      <span className="text-[11px] font-bold text-slate-700 mt-2">
                        Scan with any UPI App
                      </span>
                      <span className="text-[10px] text-slate-400">
                        GPay · PhonePe · Paytm · BHIM
                      </span>
                    </div>

                    {/* Or enter UPI ID */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Or Enter UPI VPA Handle
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="e.g. yourname@okhdfcbank"
                            className="flex-1 px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText('cityoptical@icici');
                              setCopiedUpi(true);
                              setTimeout(() => setCopiedUpi(false), 2000);
                            }}
                            className="px-2.5 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-xl hover:bg-slate-50 flex items-center gap-1 text-slate-700"
                            title="Copy official atelier UPI handle"
                          >
                            {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedUpi ? 'Copied' : 'VPA'}</span>
                          </button>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-500 leading-relaxed bg-white p-2.5 rounded-xl border border-slate-100">
                        ⚡ Instant verification. Zero transaction surcharge on all UPI modes.
                      </div>
                    </div>
                  </div>
                )}

                {/* Credit / Debit Card Interface with Interactive 3D Card Preview */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    {/* Realistic Luxury Credit Card Preview */}
                    <div className="w-full max-w-sm mx-auto aspect-[1.586] bg-gradient-to-tr from-slate-900 via-sky-950 to-slate-900 rounded-2xl p-5 text-white shadow-xl border border-sky-400/20 relative overflow-hidden">
                      {/* Gold foil decorative accents */}
                      <div className="absolute top-0 right-0 w-36 h-36 bg-sky-500/10 rounded-full blur-2xl" />
                      <div className="flex justify-between items-start">
                        <span className="font-brand tracking-widest text-xs font-bold text-[#f7e09e]">
                          CITY OPTICAL &amp; TIMES
                        </span>
                        <span className="text-xs font-mono font-bold tracking-wider text-sky-300">
                          PLATINUM
                        </span>
                      </div>

                      {/* Chip */}
                      <div className="w-9 h-7 bg-gradient-to-br from-[#ffd57a] to-[#a87c2a] rounded-md mt-4 shadow-xs" />

                      <div className="mt-4">
                        <div className="font-mono text-base tracking-widest text-white drop-shadow-sm">
                          {cardNumber || '•••• •••• •••• ••••'}
                        </div>
                      </div>

                      <div className="mt-3 flex justify-between items-end text-xs">
                        <div>
                          <div className="text-[9px] uppercase tracking-wider text-sky-200/70">Cardholder</div>
                          <div className="font-medium tracking-wide truncate max-w-[170px]">
                            {cardHolder || 'VALUED PATRON'}
                          </div>
                        </div>
                        <div>
                          <div className="text-[9px] uppercase tracking-wider text-sky-200/70">Expires</div>
                          <div className="font-mono font-bold">{cardExpiry || 'MM/YY'}</div>
                        </div>
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                      <div className="col-span-2 sm:col-span-3">
                        <label className="block text-slate-600 font-medium mb-1">Card Number</label>
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4532 8901 2345 6789"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-medium mb-1">Cardholder Name</label>
                        <input
                          type="text"
                          required
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                          placeholder="SHAYMA SAYED"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl uppercase text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-medium mb-1">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          required
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="08/28"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-medium mb-1">CVV / CVC</label>
                        <input
                          type="password"
                          required
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="•••"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Net Banking */}
                {paymentMethod === 'netbanking' && (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-sky-100 text-xs space-y-3">
                    <label className="block font-semibold text-slate-700">Select Partner Bank</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Standard Chartered'].map(
                        (bank) => (
                          <button
                            key={bank}
                            type="button"
                            onClick={() => setSelectedBank(bank)}
                            className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                              selectedBank === bank
                                ? 'bg-sky-50 border-sky-500 text-sky-900 font-bold'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-sky-300'
                            }`}
                          >
                            {bank}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Cash on Delivery */}
                {paymentMethod === 'cod' && (
                  <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
                    <div className="font-bold text-amber-800">Complimentary Cash on Delivery</div>
                    <p className="text-slate-600">
                      You may pay in cash or via mobile UPI at the time of doorstep handover. Includes free ultrasonic inspection pouch.
                    </p>
                  </div>
                )}
              </div>

              {/* Pay Now Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Full payment refund guaranteed if cancelled before delivery.</span>
                </div>

                <button
                  type="submit"
                  className="px-7 py-3.5 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-semibold text-sm rounded-xl shadow-lg shadow-sky-600/30 transition-all flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <Lock className="w-4 h-4" />
                  <span>Pay Securely {totalFormatted.primary}</span>
                </button>
              </div>
            </form>
          )}

          {/* Processing Animation Step */}
          {checkoutStep === 'processing' && (
            <div className="p-10 sm:p-16 flex flex-col items-center justify-center text-center space-y-6">
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
                  className="w-20 h-20 rounded-full border-4 border-sky-200 border-t-sky-600"
                />
                <div className="absolute inset-0 flex items-center justify-center text-sky-600">
                  <Lock className="w-8 h-8" />
                </div>
              </div>

              <div>
                <h3 className="font-brand text-xl font-bold text-slate-900">
                  Securing Atelier Transaction...
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Please do not refresh. Establishing encrypted session with banking network.
                </p>
              </div>

              {/* Progress Milestones */}
              <div className="w-full max-w-sm space-y-2 text-xs font-medium text-left">
                <div className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${
                  processingStage >= 1 ? 'bg-sky-50 text-sky-800 border-sky-200' : 'text-slate-400 border-slate-100'
                }`}>
                  <CheckCircle2 className={`w-4 h-4 ${processingStage >= 1 ? 'text-sky-600' : 'text-slate-300'}`} />
                  <span>1. Initializing 256-bit TLS Handshake</span>
                </div>
                <div className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${
                  processingStage >= 2 ? 'bg-sky-50 text-sky-800 border-sky-200' : 'text-slate-400 border-slate-100'
                }`}>
                  <CheckCircle2 className={`w-4 h-4 ${processingStage >= 2 ? 'text-sky-600' : 'text-slate-300'}`} />
                  <span>2. Authorizing with Payment Network &middot; {totalFormatted.primary}</span>
                </div>
                <div className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${
                  processingStage >= 3 ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'text-slate-400 border-slate-100'
                }`}>
                  <CheckCircle2 className={`w-4 h-4 ${processingStage >= 3 ? 'text-emerald-600' : 'text-slate-300'}`} />
                  <span>3. Payment Confirmed &middot; Dispatching to Atelier Workshop</span>
                </div>
              </div>
            </div>
          )}

          {/* Order Placed Success Step */}
          {checkoutStep === 'success' && (
            <div className="p-8 sm:p-12 text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-md shadow-emerald-600/20">
                <Check className="w-10 h-10 stroke-[3]" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-sky-700 font-bold block mb-1">
                  Payment Confirmed &middot; Order Reserved
                </span>
                <h3 className="font-brand text-2xl sm:text-3xl font-bold text-slate-900">
                  Thank You for Your Patronage
                </h3>
                <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto">
                  Your luxury order <strong className="text-slate-800 font-mono">#{confirmedOrderNum}</strong> has been received by our master opticians and horologists.
                </p>
              </div>

              {/* Order Details Card */}
              <div className="p-5 bg-sky-50/60 rounded-2xl border border-sky-100 text-xs text-left max-w-md mx-auto space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Order Reference:</span>
                  <span className="font-mono font-bold text-slate-900">{confirmedOrderNum}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Settled:</span>
                  <span className="font-mono font-bold text-slate-900">{totalFormatted.primary} ({totalFormatted.secondary})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment Mode:</span>
                  <span className="uppercase font-semibold text-sky-800">{paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Handover:</span>
                  <span className="font-semibold text-emerald-700">Within 48 Hours &middot; Insured</span>
                </div>
                <div className="pt-2 border-t border-sky-100 text-slate-500">
                  <span className="font-semibold text-slate-700">Cancellation Policy:</span> You can cancel this order anytime prior to delivery with an automatic 100% refund from the "My Orders" panel.
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <button
                  type="button"
                  onClick={handleViewOrders}
                  className="w-full sm:w-auto px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Package className="w-4 h-4" />
                  <span>View in My Orders &amp; Track Status</span>
                </button>
                <button
                  type="button"
                  onClick={handleFinish}
                  className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
