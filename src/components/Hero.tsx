import React from 'react';
import { HERO_BANNER_IMG, SELLER_INFO } from '../data/products';
import { useShop } from '../context/ShopContext';
import { Ruler, ArrowRight, Clock, Eye, MessageCircle, Phone, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onSelectCategory: (category: 'all' | 'eyewear' | 'timepieces' | 'hybrid') => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectCategory }) => {
  const { setIsSizeGuideOpen } = useShop();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/60 via-white to-white border-b border-sky-100">
      {/* Background glow accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-sky-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Brand & Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Owner & Seller WhatsApp Contact Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-4 w-fit shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Owner: <strong>{SELLER_INFO.ownerName}</strong></span>
              <span className="text-emerald-300">|</span>
              <a
                href={SELLER_INFO.getWhatsappLink('Hello Sayed Zishan, I would like to inquire about City Optical and NXT Eyewear.')}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-700 hover:text-emerald-900 underline flex items-center gap-1 font-bold"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp: {SELLER_INFO.whatsappNumber}</span>
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 uppercase tracking-[0.2em] mb-2">
              <span>NXT Eyewear &middot; City Optical &middot; Haute Horology</span>
            </div>

            <h1 className="font-brand text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15] max-w-2xl text-balance">
              Elevate Your Vision. Timeless Clarity, Made Modern.
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              Featuring <strong>NXT Dravo</strong> with bold gold-bar hinges, <strong>The NXT Icon</strong> hexagonal titanium frames, and certified <strong>Versace Medusa</strong> editions. All pieces personally curated by <strong>Sayed Zishan</strong>.
            </p>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => onSelectCategory('eyewear')}
                className="px-6 py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-sky-600/25 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4 text-sky-200" />
                <span>Explore Eyewear</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={SELLER_INFO.getWhatsappLink('Hi Sayed Zishan, I would like to chat about ordering frames or timepieces.')}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="px-4 py-3.5 text-xs font-semibold text-sky-800 hover:text-sky-950 transition-colors flex items-center gap-1.5 underline underline-offset-4 cursor-pointer"
              >
                <Ruler className="w-3.5 h-3.5 text-sky-600" />
                <span>Size &amp; Fit Guide</span>
              </button>
            </div>

            {/* Reassurance Grid */}
            <div className="mt-8 pt-6 border-t border-sky-100 grid grid-cols-3 gap-4 text-slate-600">
              <div>
                <div className="text-sm sm:text-base font-bold text-slate-900 font-brand">Authentic</div>
                <div className="text-xs text-slate-500 mt-0.5">NXT &amp; Versace Certified</div>
              </div>
              <div>
                <div className="text-sm sm:text-base font-bold text-slate-900 font-brand">Direct Contact</div>
                <div className="text-xs text-slate-500 mt-0.5">Seller Sayed Zishan</div>
              </div>
              <div>
                <div className="text-sm sm:text-base font-bold text-slate-900 font-brand">₹2,987–₹3,389</div>
                <div className="text-xs text-slate-500 mt-0.5">All Items Priced (USD too)</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual with Real Product Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-sky-900/10 border-4 border-white aspect-[4/3] group">
              <img
                src={HERO_BANNER_IMG}
                alt="NXT Dravo Eyewear with Stainless Watch Flatlay - City Optical"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between">
                <div>
                  <div className="text-xs tracking-wider uppercase text-sky-200 font-semibold">
                    The Signature Showcase
                  </div>
                  <div className="text-base sm:text-lg font-brand font-bold text-white">
                    NXT DRAVO &middot; Gold-Bar Hinge Edition
                  </div>
                </div>
                <a
                  href={SELLER_INFO.getWhatsappLink('Hi Sayed Zishan, I am interested in the NXT Dravo frame.')}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold bg-emerald-600/90 hover:bg-emerald-600 backdrop-blur-md px-3 py-1.5 rounded-xl text-white border border-white/20 flex items-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Inquire</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
