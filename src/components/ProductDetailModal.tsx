import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { SELLER_INFO } from '../data/products';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Heart,
  ShoppingBag,
  Ruler,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  Check,
  Zap,
  MessageCircle,
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductForModal,
    setSelectedProductForModal,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
  } = useShop();

  const product = selectedProductForModal;
  const [selectedSize, setSelectedSize] = useState<string>(product?.defaultSize || '');
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  React.useEffect(() => {
    if (product) {
      setSelectedSize(product.defaultSize);
      setQuantity(1);
      setAddedSuccess(false);
    }
  }, [product]);

  if (!product) return null;

  const wishlisted = isInWishlist(product.id);
  const priceDisplay = formatPrice(product.priceINR);

  const handleAdd = () => {
    addToCart(product, selectedSize, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
    setSelectedProductForModal(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const whatsappMessage = `Hi Sayed Zishan, I am viewing "${product.name}" (Size: ${selectedSize}) at ${priceDisplay.primary}. Can you help me order this with my prescription?`;
  const whatsappUrl = SELLER_INFO.getWhatsappLink(whatsappMessage);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-sky-100 overflow-hidden my-6"
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedProductForModal(null)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 shadow-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Product Image & Gallery */}
            <div className="relative bg-gradient-to-b from-sky-50/50 to-white p-6 sm:p-8 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-sky-100">
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-sky-100 bg-white">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Direct WhatsApp Callout for Seller Sayed Zishan */}
              <div className="mt-4 w-full p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-emerald-950">
                      Owner: {SELLER_INFO.ownerName}
                    </div>
                    <div className="text-[11px] text-emerald-700">
                      WhatsApp: {SELLER_INFO.whatsappNumber}
                    </div>
                  </div>
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs transition-colors shrink-0"
                >
                  Chat Now
                </a>
              </div>

              {/* Atelier Trust Pills */}
              <div className="mt-4 w-full grid grid-cols-3 gap-2 text-center text-[11px] text-slate-500 font-medium">
                <div className="p-2 bg-white rounded-xl border border-sky-100 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 mx-auto text-sky-600 mb-1" />
                  <span>{product.specs.warranty}</span>
                </div>
                <div className="p-2 bg-white rounded-xl border border-sky-100 shadow-2xs">
                  <Truck className="w-4 h-4 mx-auto text-sky-600 mb-1" />
                  <span>Free Insured Delivery</span>
                </div>
                <div className="p-2 bg-white rounded-xl border border-sky-100 shadow-2xs">
                  <RotateCcw className="w-4 h-4 mx-auto text-sky-600 mb-1" />
                  <span>100% Refund Cancel</span>
                </div>
              </div>
            </div>

            {/* Right: Contiguous Purchase Module */}
            <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="uppercase tracking-widest font-semibold text-sky-700 text-[11px]">
                    {product.specs.origin}
                  </span>
                  <div className="flex items-center gap-1 text-amber-600 font-semibold text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-slate-400">({product.reviewsCount} reviews)</span>
                  </div>
                </div>

                <h2 className="font-brand text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                  {product.name}
                </h2>

                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {product.description}
                </p>

                {/* Price Display */}
                <div className="mt-4 p-4 bg-sky-50/70 rounded-2xl border border-sky-100 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold block">
                      Atelier Price
                    </span>
                    <div className="flex items-baseline gap-2.5 mt-0.5">
                      <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
                        {priceDisplay.primary}
                      </span>
                      <span className="text-sm text-sky-700 font-semibold font-mono tabular-nums">
                        ({priceDisplay.secondary})
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200">
                    In Stock · Ships in 48h
                  </span>
                </div>

                {/* Size Selection Module */}
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Select Size / Frame Fit:
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-xs text-sky-600 font-semibold hover:underline flex items-center gap-1"
                    >
                      <Ruler className="w-3.5 h-3.5" /> Open Size Guide
                    </button>
                  </div>

                  <div className="space-y-2">
                    {product.availableSizes.map((sz) => {
                      const isSelected = selectedSize === sz;
                      return (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setSelectedSize(sz)}
                          className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-semibold text-left transition-all flex items-center justify-between border cursor-pointer ${
                            isSelected
                              ? 'bg-sky-50 border-sky-500 text-sky-900 ring-2 ring-sky-200'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-sky-300'
                          }`}
                        >
                          <span>{sz}</span>
                          {isSelected ? (
                            <Check className="w-4 h-4 text-sky-600" />
                          ) : (
                            <span className="text-[10px] text-slate-400 font-normal">Select</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Key Features */}
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Product Specifications
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quantity, Add to Bag & Instant Buy */}
              <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-2 text-slate-600 hover:bg-slate-200 text-sm font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-mono text-sm font-bold text-slate-800">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 py-2 text-slate-600 hover:bg-slate-200 text-sm font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                      wishlisted
                        ? 'bg-rose-50 border-rose-200 text-rose-500'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                    title="Toggle Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${wishlisted ? 'fill-rose-500' : ''}`} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleAdd}
                    className={`py-3.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      addedSuccess
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white hover:bg-sky-50 text-slate-900 border-2 border-slate-900 shadow-xs'
                    }`}
                  >
                    {addedSuccess ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="py-3.5 px-4 rounded-xl font-semibold text-sm bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Zap className="w-4 h-4 text-sky-200" />
                    <span>Instant Checkout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
