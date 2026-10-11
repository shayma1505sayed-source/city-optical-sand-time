import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { SELLER_INFO } from '../data/products';
import { Heart, ShoppingBag, Eye, Star, Check, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSelectedProductForModal,
  } = useShop();

  const [selectedSize, setSelectedSize] = useState<string>(product.defaultSize);
  const [isAddedRecently, setIsAddedRecently] = useState(false);
  const wishlisted = isInWishlist(product.id);
  const priceDisplay = formatPrice(product.priceINR);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedSize, 1);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1400);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const whatsappMessage = `Hello Sayed Zishan, I am interested in ${product.name} (Size: ${selectedSize}) priced at ${priceDisplay.primary} (${priceDisplay.secondary}). Is this in stock?`;
  const whatsappUrl = SELLER_INFO.getWhatsappLink(whatsappMessage);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => setSelectedProductForModal(product)}
      className="group bg-white rounded-2xl border border-sky-100/90 shadow-sm hover:shadow-xl hover:shadow-sky-500/10 hover:border-sky-300 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Product Image Slot */}
      <div className="relative aspect-[4/3] bg-gradient-to-b from-slate-50 to-sky-50/30 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-106"
        />

        {/* Floating Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 ${
            wishlisted
              ? 'bg-rose-50 text-rose-500 shadow-sm shadow-rose-500/20'
              : 'bg-white/80 text-slate-500 hover:text-rose-500 hover:bg-white shadow-xs'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <motion.div whileTap={{ scale: 0.8 }}>
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500' : ''}`} />
          </motion.div>
        </button>

        {/* Quick View Pill */}
        <div className="absolute inset-x-0 bottom-3 px-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <span className="px-3 py-1.5 bg-slate-950/80 backdrop-blur-md text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-lg">
            <Eye className="w-3.5 h-3.5" /> View Product Details
          </span>
        </div>
      </div>

      {/* Card Content & Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="uppercase tracking-wider font-semibold text-[11px] text-sky-700">
              {product.category === 'eyewear'
                ? 'NXT Optical Eyewear'
                : product.category === 'timepieces'
                ? 'Luxury Horology'
                : 'Collector Set'}
            </span>
            <div className="flex items-center gap-1 text-amber-600 font-semibold text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-brand text-base sm:text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-sky-600 transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {product.subtitle}
          </p>
        </div>

        {/* Size Selection Feature */}
        <div className="mt-4 pt-3 border-t border-slate-100" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1.5">
            <span>Select Size:</span>
            <span className="text-sky-700 font-medium truncate max-w-[140px]">{selectedSize}</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {product.availableSizes.map((sz) => {
              const shortLabel = sz.split(' ')[0];
              const isSelected = selectedSize === sz;
              return (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSelectedSize(sz)}
                  className={`py-1 px-1.5 text-[11px] font-semibold rounded-md border transition-all text-center truncate cursor-pointer ${
                    isSelected
                      ? 'bg-sky-500 text-white border-sky-500 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-sky-300 hover:bg-sky-50/50'
                  }`}
                  title={sz}
                >
                  {shortLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pricing, Add to Cart & WhatsApp Seller Button */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            {/* Dual Currency Price Display */}
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold text-slate-900 font-mono tabular-nums leading-tight">
                {priceDisplay.primary}
              </span>
              <span className="text-[11px] text-sky-700/80 font-medium font-mono tabular-nums">
                {priceDisplay.secondary}
              </span>
            </div>

            {/* Quick Add Button */}
            <motion.button
              whileTap={{ scale: 0.94 }}
              type="button"
              onClick={handleQuickAdd}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                isAddedRecently
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-900 hover:bg-sky-600 text-white shadow-sm hover:shadow-md'
              }`}
            >
              {isAddedRecently ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </>
              )}
            </motion.button>
          </div>

          {/* WhatsApp Direct Contact Button to communicate with seller Sayed Zishan */}
          <div onClick={(e) => e.stopPropagation()}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-1.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp Seller (Sayed Zishan)</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
