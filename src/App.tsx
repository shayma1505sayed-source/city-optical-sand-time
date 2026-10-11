import React, { useState, useMemo } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ShopProvider, useShop } from './context/ShopContext';
import { PRODUCTS, SELLER_INFO } from './data/products';
import { ProductCategory, Product } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrdersModal } from './components/OrdersModal';
import { ProfileModal } from './components/ProfileModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import {
  SlidersHorizontal,
  Ruler,
  Eye,
  Clock,
  Shield,
  Award,
  Sparkles,
  MessageCircle,
} from 'lucide-react';

const MainShop: React.FC = () => {
  const { currency, setIsSizeGuideOpen, toastMessage } = useShop();

  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.features.some((f) => f.toLowerCase().includes(q))
      );
    }

    // Size filter
    if (selectedSizeFilter !== 'all') {
      result = result.filter((p) =>
        p.availableSizes.some((sz) => sz.toLowerCase().includes(selectedSizeFilter.toLowerCase()))
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.priceINR - b.priceINR);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.priceINR - a.priceINR);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [activeCategory, searchQuery, selectedSizeFilter, sortBy]);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-sky-200 selection:text-sky-900">
      {/* Top Navigation Bar */}
      <Navbar
        onSelectCategory={(cat) => setActiveCategory(cat)}
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Campaign Hero Showcase */}
        <Hero onSelectCategory={(cat) => setActiveCategory(cat)} />

        {/* Dashboard Catalog Section */}
        <section id="collection" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {/* Section Header with category tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-sky-100">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-sky-700 mb-1">
                Atelier Catalog &middot; Owner: {SELLER_INFO.ownerName}
              </div>
              <h2 className="font-brand text-2xl sm:text-3xl font-bold text-slate-900">
                {activeCategory === 'eyewear'
                  ? 'NXT Optical Eyewear Collection'
                  : activeCategory === 'timepieces'
                  ? 'Minimalist Luxury Horology'
                  : activeCategory === 'hybrid'
                  ? 'Executive Duo Collector Sets'
                  : 'Curated Eyewear & Horology Collection'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                All bespoke pieces priced strictly between ₹2,987 and ₹3,389 (with USD currency conversions).
              </p>
            </div>

            {/* Interactive Category Segmented Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-sky-50 rounded-xl border border-sky-100/80 overflow-x-auto shrink-0">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-white text-sky-700 shadow-sm border border-sky-100'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Pieces ({PRODUCTS.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('eyewear')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === 'eyewear'
                    ? 'bg-white text-sky-700 shadow-sm border border-sky-100'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                NXT Eyewear
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('timepieces')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === 'timepieces'
                    ? 'bg-white text-sky-700 shadow-sm border border-sky-100'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Timepieces
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('hybrid')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === 'hybrid'
                    ? 'bg-white text-sky-700 shadow-sm border border-sky-100'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Executive Sets
              </button>
            </div>
          </div>

          {/* Filtering & Sorting Controls Bar */}
          <div className="py-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600 border-b border-slate-100 mb-8">
            {/* Filter by Size */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-sky-600" />
                <span>Filter by Size:</span>
              </span>
              <div className="flex items-center gap-1 bg-slate-50 p-0.5 rounded-lg border border-slate-200">
                {['all', 'Small', 'Medium', 'Wide', 'Classic', '40mm'].map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSizeFilter(sz)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                      selectedSizeFilter === sz
                        ? 'bg-sky-500 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {sz === 'all' ? 'All Sizes' : sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizing Concierge & Sort Dropdown */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-sky-700 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Ruler className="w-3.5 h-3.5 text-sky-500" />
                <span>Need Sizing Advice?</span>
              </button>

              <div className="flex items-center gap-1.5">
                <span className="text-slate-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="bg-white border border-slate-200 text-slate-800 text-xs rounded-lg px-2.5 py-1 font-semibold focus:outline-none focus:ring-1 focus:ring-sky-500"
                >
                  <option value="featured">Featured Atelier Picks</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Client Rating (★ 5.0)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Search/Filter summary */}
          {(searchQuery || selectedSizeFilter !== 'all') && (
            <div className="mb-6 flex items-center gap-2 text-xs text-slate-600">
              <span>Showing results for:</span>
              {searchQuery && (
                <span className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded-md font-semibold">
                  "{searchQuery}"
                </span>
              )}
              {selectedSizeFilter !== 'all' && (
                <span className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded-md font-semibold">
                  Size: {selectedSizeFilter}
                </span>
              )}
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSizeFilter('all');
                }}
                className="text-sky-600 hover:underline font-semibold ml-2 cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center text-slate-500 bg-sky-50/30 rounded-3xl border border-sky-100">
              <Eye className="w-12 h-12 mx-auto text-sky-300 mb-3" />
              <h3 className="font-brand text-lg font-bold text-slate-800">No matching pieces found</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try adjusting your search query or size filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                  setSelectedSizeFilter('all');
                }}
                className="mt-4 px-5 py-2 bg-sky-600 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Show All Atelier Pieces
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Brand Atelier Story & Meet Dravo Section */}
        <section className="bg-gradient-to-b from-sky-50/40 via-white to-sky-50/30 border-y border-sky-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="text-xs uppercase tracking-[0.25em] font-semibold text-sky-700">
                  MEET DRAVO &middot; OWNER SAYED ZISHAN
                </div>
                <h2 className="font-brand text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                  Frame Your Look. Own Your Style.
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  A bold frame with a restless spirit. Rich tortoiseshell, glossy black contours, and striking gold accents. Crafted for those who move with purpose and demand precision optical clarity.
                </p>
                <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-medium text-slate-700">
                  <div className="p-3 bg-white rounded-xl border border-sky-100 shadow-2xs flex items-center gap-2.5">
                    <Award className="w-5 h-5 text-sky-600 shrink-0" />
                    <span>Gold-Bar Hinges</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-sky-100 shadow-2xs flex items-center gap-2.5">
                    <Clock className="w-5 h-5 text-sky-600 shrink-0" />
                    <span>Swiss Mesh Timepieces</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-sky-100 shadow-2xs flex items-center gap-2.5">
                    <Shield className="w-5 h-5 text-sky-600 shrink-0" />
                    <span>2-Year Full Warranty</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-sky-100 shadow-2xs flex items-center gap-2.5">
                    <Sparkles className="w-5 h-5 text-sky-600 shrink-0" />
                    <span>Custom Prescription Fitting</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={SELLER_INFO.getWhatsappLink('Hi Sayed Zishan, I would like to consult about prescription lenses for NXT frames.')}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Consult Owner Sayed Zishan (+91 9801724668)</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">
                      The NXT Icon
                    </span>
                    <h3 className="font-brand text-lg font-bold text-slate-900 mt-1">
                      Hexagonal Titanium &middot; Rose Brow
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      Weighing just 12.8 grams with dual-tone rose gold top bar and emerald green temple tips. Engineered for maximum peripheral view.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveCategory('eyewear')}
                    className="mt-4 text-xs font-semibold text-sky-600 hover:text-sky-800 text-left flex items-center gap-1 cursor-pointer"
                  >
                    <span>View NXT Icon &rarr;</span>
                  </button>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">
                      Versace GP25127
                    </span>
                    <h3 className="font-brand text-lg font-bold text-slate-900 mt-1">
                      24K Gold Medusa Emblem
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      Certified Italian luxury acetate with heavy gold Medusa head plaques and terracotta leather presentation case.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveCategory('eyewear')}
                    className="mt-4 text-xs font-semibold text-sky-600 hover:text-sky-800 text-left flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Versace Edition &rarr;</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating WhatsApp Quick Connect Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <a
          href={SELLER_INFO.getWhatsappLink('Hello Sayed Zishan, I am visiting the City Optical boutique and would like to speak with you.')}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-xl shadow-emerald-700/30 transition-all hover:scale-105 border-2 border-white cursor-pointer group"
          title="Direct WhatsApp with Owner Sayed Zishan"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full ring-2 ring-emerald-600" />
          </div>
          <div className="flex flex-col text-left leading-tight pr-1">
            <span className="text-[10px] text-emerald-100 font-medium uppercase tracking-wider">
              Chat with Owner
            </span>
            <span className="text-xs font-bold whitespace-nowrap">
              Sayed Zishan &middot; 9801724668
            </span>
          </div>
        </a>
      </div>

      {/* Global Modals & Drawers */}
      <ProductDetailModal />
      <SizeGuideModal />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <OrdersModal />
      <ProfileModal />
      <AuthModal />

      {/* Animated Toast Feedback Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 right-6 z-50 bg-slate-900/95 backdrop-blur-md text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl border border-sky-400/30 flex items-center gap-2.5"
          >
            <div className="w-2 h-2 rounded-full bg-sky-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ShopProvider>
        <MainShop />
      </ShopProvider>
    </AuthProvider>
  );
}
