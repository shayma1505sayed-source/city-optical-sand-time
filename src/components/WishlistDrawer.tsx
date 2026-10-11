import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlistIds,
    toggleWishlist,
    addToCart,
    formatPrice,
    setSelectedProductForModal,
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsWishlistOpen(false)}
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
              <div className="p-2 bg-rose-50 text-rose-500 rounded-xl border border-rose-200">
                <Heart className="w-5 h-5 fill-rose-500" />
              </div>
              <div>
                <h3 className="font-brand text-lg font-bold text-slate-900 leading-tight">
                  Saved Wishlist
                </h3>
                <span className="text-xs text-sky-700 font-medium">
                  {wishlistedProducts.length} curated luxury pieces
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-white transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8" />
                </div>
                <h4 className="font-brand text-lg font-bold text-slate-800">
                  Your wishlist is empty
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mt-1">
                  Click the heart icon on any optical frames or watches to curate your favorites.
                </p>
                <button
                  type="button"
                  onClick={() => setIsWishlistOpen(false)}
                  className="mt-6 px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-xl transition-colors"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              wishlistedProducts.map((product) => {
                const price = formatPrice(product.priceINR);
                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-slate-50 rounded-2xl border border-sky-100 flex gap-3.5 hover:bg-sky-50/30 transition-colors"
                  >
                    <div
                      onClick={() => {
                        setSelectedProductForModal(product);
                        setIsWishlistOpen(false);
                      }}
                      className="w-20 h-20 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0 cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h4
                            onClick={() => {
                              setSelectedProductForModal(product);
                              setIsWishlistOpen(false);
                            }}
                            className="font-brand text-xs font-bold text-slate-900 line-clamp-1 cursor-pointer hover:text-sky-600"
                          >
                            {product.name}
                          </h4>
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className="text-slate-400 hover:text-rose-500 transition-colors p-0.5"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="mt-1 flex items-baseline gap-1.5">
                          <span className="font-mono font-bold text-xs text-slate-900">
                            {price.primary}
                          </span>
                          <span className="font-mono text-[10px] text-sky-700/80">
                            ({price.secondary})
                          </span>
                        </div>
                      </div>

                      <div className="mt-2.5 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            addToCart(product, product.defaultSize, 1);
                            toggleWishlist(product.id);
                          }}
                          className="flex-1 py-1.5 px-3 bg-slate-900 hover:bg-sky-600 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Move to Bag</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          {wishlistedProducts.length > 0 && (
            <div className="p-4 border-t border-sky-100 bg-white">
              <button
                type="button"
                onClick={() => {
                  wishlistedProducts.forEach((p) => addToCart(p, p.defaultSize, 1));
                  wishlistedProducts.forEach((p) => toggleWishlist(p.id));
                }}
                className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <span>Add All ({wishlistedProducts.length}) to Bag</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
