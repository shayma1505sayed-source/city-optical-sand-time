import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'motion/react';
import { X, Ruler, CheckCircle2, Glasses, Clock } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();
  const [activeTab, setActiveTab] = useState<'eyewear' | 'timepieces'>('eyewear');

  if (!isSizeGuideOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-sky-100 overflow-hidden my-6"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-600 to-sky-700 px-6 py-5 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-white/10 rounded-xl">
                <Ruler className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-brand text-lg font-bold text-white">
                  Bespoke Sizing &amp; Fit Concierge
                </h3>
                <p className="text-xs text-sky-100">
                  Precision measurement guides for City Optical eyewear and timepieces
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6">
            {/* Tabs */}
            <div className="flex items-center p-1 bg-sky-50 rounded-xl mb-6 border border-sky-100">
              <button
                type="button"
                onClick={() => setActiveTab('eyewear')}
                className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'eyewear'
                    ? 'bg-white text-sky-700 shadow-sm border border-sky-100'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Glasses className="w-4 h-4" />
                <span>Optical Eyewear Fit</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('timepieces')}
                className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'timepieces'
                    ? 'bg-white text-sky-700 shadow-sm border border-sky-100'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Watch Case Dimensions</span>
              </button>
            </div>

            {activeTab === 'eyewear' ? (
              <div className="space-y-6">
                {/* Visual diagram representation */}
                <div className="p-4 bg-sky-50/50 rounded-2xl border border-sky-100">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Understanding Optical Frame Numbers (e.g. 51-19-145)
                  </h4>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 bg-white rounded-xl border border-sky-100">
                      <div className="text-lg font-bold font-mono text-sky-600">51 mm</div>
                      <div className="text-[11px] font-semibold text-slate-800 mt-1">Lens Width</div>
                      <div className="text-[10px] text-slate-500">Horizontal width across one lens</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-sky-100">
                      <div className="text-lg font-bold font-mono text-sky-600">19 mm</div>
                      <div className="text-[11px] font-semibold text-slate-800 mt-1">Bridge Width</div>
                      <div className="text-[10px] text-slate-500">Distance resting across nose bridge</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-sky-100">
                      <div className="text-lg font-bold font-mono text-sky-600">145 mm</div>
                      <div className="text-[11px] font-semibold text-slate-800 mt-1">Temple Length</div>
                      <div className="text-[10px] text-slate-500">Length of arm curving past ear</div>
                    </div>
                  </div>
                </div>

                {/* Sizing Comparison Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">Size Tag</th>
                        <th className="py-2.5 px-3">Frame Specs</th>
                        <th className="py-2.5 px-3">Best Suited Face Width</th>
                        <th className="py-2.5 px-3">Recommended For</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                      <tr className="hover:bg-sky-50/30">
                        <td className="py-2.5 px-3 font-bold text-slate-900">Small (S)</td>
                        <td className="py-2.5 px-3 font-mono">48-18-140 mm</td>
                        <td className="py-2.5 px-3">Narrow (Under 130mm)</td>
                        <td className="py-2.5 px-3">Petite faces, sharp delicate jawlines</td>
                      </tr>
                      <tr className="bg-sky-50/50 hover:bg-sky-50">
                        <td className="py-2.5 px-3 font-bold text-sky-900">Medium (M) ★</td>
                        <td className="py-2.5 px-3 font-mono text-sky-800 font-bold">51-19-145 mm</td>
                        <td className="py-2.5 px-3 text-sky-900">Standard (130 - 140mm)</td>
                        <td className="py-2.5 px-3 text-sky-800 font-semibold">Universal fit (fits 85% of clients)</td>
                      </tr>
                      <tr className="hover:bg-sky-50/30">
                        <td className="py-2.5 px-3 font-bold text-slate-900">Wide (L)</td>
                        <td className="py-2.5 px-3 font-mono">54-20-150 mm</td>
                        <td className="py-2.5 px-3">Broad (Over 140mm)</td>
                        <td className="py-2.5 px-3">Broader temple width, oversized luxury presence</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Atelier Fit Guarantee:</strong> All eyewear includes an complimentary home adjustment kit and free exchange within 14 days if the fit is not tailored to perfection.
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-4 bg-sky-50/50 rounded-2xl border border-sky-100">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Case Diameter &amp; Wrist Harmony
                  </h4>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 bg-white rounded-xl border border-sky-100">
                      <div className="text-lg font-bold font-mono text-sky-600">38 mm</div>
                      <div className="text-[11px] font-semibold text-slate-800 mt-1">Vintage Classic</div>
                      <div className="text-[10px] text-slate-500">Wrists &lt; 6.5 inches (16.5cm)</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-sky-100">
                      <div className="text-lg font-bold font-mono text-sky-600">40 mm</div>
                      <div className="text-[11px] font-semibold text-slate-800 mt-1">Signature Standard</div>
                      <div className="text-[10px] text-slate-500">Wrists 6.5 – 7.5 in (Universal)</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-sky-100">
                      <div className="text-lg font-bold font-mono text-sky-600">42 mm</div>
                      <div className="text-[11px] font-semibold text-slate-800 mt-1">Grand Presence</div>
                      <div className="text-[10px] text-slate-500">Wrists &gt; 7.5 inches (19cm)</div>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-600 space-y-2">
                  <p>
                    <strong>How to measure your wrist:</strong> Wrap a soft tailor tape or a strip of paper around your wrist just below the wrist bone. Mark the point and measure against a ruler.
                  </p>
                  <p>
                    Each watch includes solid link sizing tools or quick-release spring bars to adjust strap length effortlessly.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(false)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-sky-600 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Got It, Return to Boutique
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
