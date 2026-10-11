import React from 'react';
import { BrandLogo } from './BrandLogo';
import { useShop } from '../context/ShopContext';
import { SELLER_INFO } from '../data/products';
import { Ruler, ShieldCheck, Clock, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setIsSizeGuideOpen } = useShop();

  return (
    <footer className="bg-slate-950 text-white border-t border-sky-950/60 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="full" iconSize={54} className="brightness-110" />
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed mt-4">
              Since 2019, City Optical &amp; Times and NXT Eyewear have delivered handcrafted frames and Swiss-heritage timepieces. Direct boutique ownership under <strong>Sayed Zishan</strong> ensures personalized optical service and guaranteed authenticity.
            </p>

            {/* Direct WhatsApp Callout in Footer */}
            <div className="p-3.5 bg-slate-900 rounded-2xl border border-emerald-500/30 flex items-center justify-between max-w-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">
                    Owner: {SELLER_INFO.ownerName}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-mono font-medium">
                    WhatsApp: {SELLER_INFO.whatsappNumber}
                  </div>
                </div>
              </div>
              <a
                href={SELLER_INFO.getWhatsappLink('Hi Sayed Zishan, I would like to order glasses from City Optical.')}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Chat
              </a>
            </div>

            <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>100% Authenticity Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sky-400" />
                <span>2-Year Atelier Warranty</span>
              </div>
            </div>
          </div>

          {/* Optical Services */}
          <div className="space-y-3 text-xs">
            <h4 className="font-brand font-bold text-sm tracking-wider text-white uppercase">
              Eyewear Collections
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>NXT Dravo (Gold-Bar Hinges)</li>
              <li>The NXT Icon (Hexagonal Titanium)</li>
              <li>Versace GP25127 Medusa Edition</li>
              <li>NXT Cat-Eye Noir</li>
              <li>NXT Bordeaux &amp; Champagne Crystal</li>
              <li>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" /> Virtual Frame Sizing Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Horology & Watches */}
          <div className="space-y-3 text-xs">
            <h4 className="font-brand font-bold text-sm tracking-wider text-white uppercase">
              Timepieces &amp; Sets
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>NXT Horizon Minimalist Mesh Watch</li>
              <li>NXT Dravo &amp; Watch Executive Set</li>
              <li>316L Stainless Steel Milanese Mesh</li>
              <li>5 ATM Water Resistance</li>
              <li>Direct WhatsApp Customization</li>
            </ul>
          </div>

          {/* Atelier Contact & Owner */}
          <div className="space-y-3 text-xs">
            <h4 className="font-brand font-bold text-sm tracking-wider text-white uppercase">
              Seller &amp; Concierge
            </h4>
            <ul className="space-y-2.5 text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-sky-400 font-semibold">Owner:</span>
                <span className="text-white font-medium">{SELLER_INFO.ownerName}</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={SELLER_INFO.getWhatsappLink('Hi Sayed Zishan, please contact me about your optical boutique.')}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:underline font-mono font-medium"
                >
                  WhatsApp: {SELLER_INFO.whatsappNumber}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>+91 98017 24668 / +91 22 4920 1900</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>zishan@cityoptical.in</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>City Optical Atelier, Regent Boulevard, Mumbai</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} City Optical &amp; NXT Eyewear &middot; Owner: Sayed Zishan &middot; WhatsApp: +91 9801724668.
          </div>
          <div className="flex items-center gap-6 text-[11px]">
            <span>100% Refund on Order Cancellation</span>
            <span aria-hidden="true">&middot;</span>
            <span>Free Express Delivery</span>
            <span aria-hidden="true">&middot;</span>
            <span>Authenticity Guaranteed</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
