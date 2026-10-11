import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { SELLER_INFO } from '../data/products';
import {
  ShoppingBag,
  Heart,
  User as UserIcon,
  Search,
  Package,
  Ruler,
  Menu,
  X,
  MessageCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onSelectCategory: (category: 'all' | 'eyewear' | 'timepieces' | 'hybrid') => void;
  activeCategory: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectCategory,
  activeCategory,
  searchQuery,
  setSearchQuery,
}) => {
  const {
    currency,
    setCurrency,
    cartCount,
    wishlistIds,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsOrdersOpen,
    setIsProfileOpen,
    setIsSizeGuideOpen,
  } = useShop();

  const { user, isAuthenticated, openAuthModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { label: 'All Atelier', category: 'all' as const },
    { label: 'NXT Eyewear', category: 'eyewear' as const },
    { label: 'Timepieces', category: 'timepieces' as const },
    { label: 'Collector Sets', category: 'hybrid' as const },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sky-100 transition-shadow duration-300">
      {/* Top seller WhatsApp & Announcement Banner */}
      <div className="bg-gradient-to-r from-sky-700 via-sky-600 to-sky-700 text-white text-[11px] sm:text-xs py-1.5 px-4 font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">
              City Optical &middot; NXT Eyewear Boutique
            </span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="text-white/90">
              Owner: <strong>{SELLER_INFO.ownerName}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Direct WhatsApp link */}
            <a
              href={SELLER_INFO.getWhatsappLink('Hi Sayed Zishan, I have a question about the frames.')}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-0.5 rounded-full flex items-center gap-1 font-semibold transition-colors text-[11px]"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp: {SELLER_INFO.whatsappNumber}</span>
            </a>

            <button
              onClick={() => setIsSizeGuideOpen(true)}
              className="hidden md:flex items-center gap-1 hover:underline text-[11px] text-sky-100"
            >
              <Ruler className="w-3 h-3" /> Size Guide
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar: 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-6 md:gap-8">
        {/* Zone 1: Brand Wordmark Element */}
        <div className="shrink-0 flex items-center gap-3">
          <button
            onClick={() => {
              onSelectCategory('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-left focus:outline-none"
            aria-label="City Optical and Times Home"
          >
            <BrandLogo variant="compact" iconSize={40} />
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium tracking-wide">
          {navLinks.map((link) => (
            <button
              key={link.category}
              onClick={() => onSelectCategory(link.category)}
              className={`whitespace-nowrap transition-colors duration-200 py-1 border-b-2 cursor-pointer ${
                activeCategory === link.category
                  ? 'text-sky-600 font-semibold border-sky-500'
                  : 'text-slate-600 hover:text-slate-900 border-transparent'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => setIsSizeGuideOpen(true)}
            className="whitespace-nowrap text-slate-500 hover:text-sky-600 transition-colors py-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider cursor-pointer"
          >
            <Ruler className="w-3.5 h-3.5 text-sky-500" /> Sizing Advisor
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Currency Switcher */}
          <div className="flex items-center bg-sky-50 border border-sky-200/80 rounded-full p-0.5 text-xs font-semibold text-slate-700">
            <button
              onClick={() => setCurrency('INR')}
              className={`px-2 py-0.5 rounded-full transition-all duration-200 cursor-pointer ${
                currency === 'INR'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-sky-700'
              }`}
              title="Display pricing in Indian Rupees"
            >
              ₹ INR
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-2 py-0.5 rounded-full transition-all duration-200 cursor-pointer ${
                currency === 'USD'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-sky-700'
              }`}
              title="Display pricing in US Dollars"
            >
              $ USD
            </button>
          </div>

          {/* Search */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className={`p-2 rounded-full transition-colors cursor-pointer ${
              searchOpen ? 'bg-sky-100 text-sky-700' : 'text-slate-600 hover:bg-slate-100'
            }`}
            aria-label="Search collection"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Orders */}
          <button
            onClick={() => setIsOrdersOpen(true)}
            className="p-2 text-slate-600 hover:text-sky-600 hover:bg-slate-100 rounded-full transition-colors relative cursor-pointer"
            title="My Orders & Status"
            aria-label="Orders"
          >
            <Package className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Wishlist */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="p-2 text-slate-600 hover:text-sky-600 hover:bg-slate-100 rounded-full transition-colors relative cursor-pointer"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            {wishlistIds.length > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1 right-1 w-4 h-4 bg-sky-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white"
              >
                {wishlistIds.length}
              </motion.span>
            )}
          </button>

          {/* User Account */}
          {isAuthenticated && user ? (
            <button
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center gap-2 pl-2 pr-3 py-1 bg-sky-50 hover:bg-sky-100/80 border border-sky-200 text-sky-900 rounded-full transition-colors text-xs font-medium cursor-pointer"
              title="Manage Account"
            >
              <div className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-[11px]">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden md:inline max-w-[85px] truncate font-medium">
                {user.name}
              </span>
            </button>
          ) : (
            <button
              onClick={() => openAuthModal('signup')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-full transition-colors cursor-pointer"
            >
              <UserIcon className="w-3.5 h-3.5 text-sky-600" />
              <span>Sign In</span>
            </button>
          )}

          {/* Cart Bag */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-3.5 py-1.5 bg-slate-900 hover:bg-sky-600 text-white rounded-full transition-all duration-200 shadow-sm cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs font-semibold">{cartCount}</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expandable Search Input Bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-sky-100 bg-sky-50/50 px-4 py-2.5 overflow-hidden"
          >
            <div className="max-w-3xl mx-auto flex items-center gap-3">
              <Search className="w-4 h-4 text-sky-600 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search NXT Dravo, NXT Icon, Versace Medusa, Cat-Eye, sizes..."
                className="w-full bg-white border border-sky-200 rounded-lg px-3.5 py-1.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-slate-500 hover:text-slate-800 font-medium px-2 py-1"
                >
                  Clear
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="lg:hidden border-t border-sky-100 bg-white px-4 py-4 space-y-2 shadow-lg"
          >
            <div className="pb-2 border-b border-slate-100">
              <a
                href={SELLER_INFO.getWhatsappLink('Hi Sayed Zishan, I would like to talk with you regarding an order.')}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 px-3 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-2 border border-emerald-200"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Owner Sayed Zishan ({SELLER_INFO.whatsappNumber})</span>
              </a>
            </div>

            {navLinks.map((link) => (
              <button
                key={link.category}
                onClick={() => {
                  onSelectCategory(link.category);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  activeCategory === link.category
                    ? 'bg-sky-50 text-sky-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsSizeGuideOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm text-sky-700 font-medium flex items-center gap-2"
              >
                <Ruler className="w-4 h-4 text-sky-500" /> Sizing Advisor &amp; Fit Guide
              </button>
              <button
                onClick={() => {
                  setIsOrdersOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm text-slate-700 font-medium flex items-center gap-2"
              >
                <Package className="w-4 h-4 text-slate-500" /> My Orders &amp; Cancellation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
