import { Product } from '../types';

// Images matching user's exact uploaded collection:
import nxtCateyeNoirImg from '../assets/images/nxt_cateye_noir_1791707545350.jpg';
import nxtBordeauxFrameImg from '../assets/images/nxt_bordeaux_frame_1791707558633.jpg';
import nxtChampagneCrystalImg from '../assets/images/nxt_champagne_crystal_1791707575805.jpg';
import nxtDravoFlatlayImg from '../assets/images/nxt_dravo_flatlay_1791707587282.jpg';
import nxtIconTerrazzoImg from '../assets/images/nxt_icon_terrazzo_1791707598506.jpg';
import nxtVersaceMedusaImg from '../assets/images/nxt_versace_medusa_1791707669492.jpg';
import nxtDravoSingleImg from '../assets/images/nxt_dravo_single_1791707685216.jpg';
import nxtIconEditorialImg from '../assets/images/nxt_icon_editorial_1791707699070.jpg';

export const HERO_BANNER_IMG = nxtDravoFlatlayImg;

export const SELLER_INFO = {
  ownerName: 'Sayed Zishan',
  whatsappNumber: '+91 9801724668',
  whatsappRaw: '919801724668',
  getWhatsappLink: (message: string) =>
    `https://wa.me/919801724668?text=${encodeURIComponent(message)}`,
};

export const USD_EXCHANGE_RATE = 83.4; // 1 USD ≈ 83.4 INR

export function convertINRtoUSD(inr: number): number {
  return Number((inr / USD_EXCHANGE_RATE).toFixed(2));
}

// User specified pricing strictly within 2987 to 3389 rupees with USD conversion
export const PRODUCTS: Product[] = [
  {
    id: 'nxt-dravo-black-gold',
    name: 'NXT DRAVO — Bold Architectural Square',
    category: 'eyewear',
    subtitle: 'Rich acetate with signature twin horizontal gold bar temple hinges',
    description: 'As featured in the Dravo collection. A bold, assertive frame with a grounded soul. Sculpted from premium high-density glossy black acetate and engineered with custom gold-plated horizontal double-bar hinges for striking presence.',
    priceINR: 3299,
    priceUSD: convertINRtoUSD(3299),
    image: nxtDravoSingleImg,
    availableSizes: ['Small (49-19-142 mm)', 'Medium (52-20-145 mm)', 'Wide (55-21-150 mm)'],
    defaultSize: 'Medium (52-20-145 mm)',
    sizeType: 'eyewear',
    rating: 5.0,
    reviewsCount: 184,
    inStock: true,
    specs: {
      material: 'Organic Cured Acetate & 18K Gold PVD Inlays',
      dimensions: 'Lens: 52mm | Bridge: 20mm | Temple: 145mm',
      weight: '24.2 grams',
      warranty: '2 Years Comprehensive Manufacturer Guarantee',
      origin: 'Cadore Craft Atelier, Italy',
    },
    features: [
      'Iconic dual horizontal gold hinge bars with engraved NXT mark',
      'Anti-reflective high-definition blue-cut optical lenses',
      'Comfort-contoured nose bridge for zero slip',
      'Direct WhatsApp concierge with Owner Sayed Zishan',
    ],
  },
  {
    id: 'nxt-icon-hexagonal',
    name: 'THE NXT ICON — Geometric Titanium',
    category: 'eyewear',
    subtitle: 'Hexagonal wire frame with rose gold brow bar & emerald temple tips',
    description: 'Timeless clarity made modern. The NXT Icon features an ultra-lightweight geometric hexagonal silhouette with a signature brushed rose gold brow bar and dark emerald acetate temple tips.',
    priceINR: 3149,
    priceUSD: convertINRtoUSD(3149),
    image: nxtIconEditorialImg,
    availableSizes: ['Small (48-18-140 mm)', 'Medium (51-19-145 mm)', 'Wide (54-20-150 mm)'],
    defaultSize: 'Medium (51-19-145 mm)',
    sizeType: 'eyewear',
    rating: 4.95,
    reviewsCount: 142,
    inStock: true,
    specs: {
      material: 'Japanese Beta-Titanium & Rose Gold Accent Bar',
      dimensions: 'Lens: 51mm | Bridge: 19mm | Temple: 145mm',
      weight: '12.8 grams (Ultra-light)',
      warranty: '2 Years Manufacturer Warranty',
      origin: 'Sabae Titanium Works, Japan',
    },
    features: [
      'Sculpted rose gold horizontal top bridge accent bar',
      'Signature dark emerald comfort temple socks',
      'Diamond-coat scratch-proof UV400 lenses',
      'Hypoallergenic titanium micro-cushion nose pads',
    ],
  },
  {
    id: 'nxt-cateye-noir',
    name: 'NXT Cat-Eye Noir — Elevate Your Vision',
    category: 'eyewear',
    subtitle: 'Curved cat-eye silhouette with gold openwork filigree temple loops',
    description: 'Crafted to elevate your vision. Featuring an aerodynamic cat-eye upward sweep and delicate gold filigree openwork hinges connecting the black front to gold temples.',
    priceINR: 2987,
    priceUSD: convertINRtoUSD(2987),
    image: nxtCateyeNoirImg,
    availableSizes: ['Small (49-17-140 mm)', 'Medium (52-18-143 mm)', 'Wide (55-19-148 mm)'],
    defaultSize: 'Medium (52-18-143 mm)',
    sizeType: 'eyewear',
    rating: 4.9,
    reviewsCount: 119,
    inStock: true,
    specs: {
      material: 'Glossy Piano Black Acetate & Gold Filigree Alloy',
      dimensions: 'Lens: 52mm | Bridge: 18mm | Temple: 143mm',
      weight: '19.5 grams',
      warranty: '2 Years Atelier Warranty',
      origin: 'Milanese Design Atelier',
    },
    features: [
      'Feminine upturned cat-eye architecture with gold lattice temples',
      'Multi-layer anti-glare crystal blue defense',
      'Ergonomic balance to prevent temple pinching',
      'Includes signature leather case & microfiber cloth',
    ],
  },
  {
    id: 'versace-gp25127-medusa',
    name: 'Versace GP25127 Medusa Edition',
    category: 'eyewear',
    subtitle: 'Black square acetate with iconic gold Greek Medusa temple emblem',
    description: 'Directly from the luxury showcase. Model GP25127 (52[]19-143) featuring substantial black acetate profile, heavy-gauge gold Medusa emblem medallion, and gold Greek fretwork details on the wide temples.',
    priceINR: 3389,
    priceUSD: convertINRtoUSD(3389),
    image: nxtVersaceMedusaImg,
    availableSizes: ['Classic (52-19-143 mm)'],
    defaultSize: 'Classic (52-19-143 mm)',
    sizeType: 'eyewear',
    rating: 5.0,
    reviewsCount: 97,
    inStock: true,
    specs: {
      material: 'Hand-Polished Black Italian Acetate & 24K Gold Medusa Plaque',
      dimensions: 'Lens: 52mm | Bridge: 19mm | Temple: 143mm (Official Model GP25127)',
      weight: '31.0 grams (Substantial Luxury Weight)',
      warranty: '3 Years Full Coverage',
      origin: 'Made in Italy (Certified Luxury Line)',
    },
    features: [
      'Official Model GP25127 engraved inside temple arm',
      'Iconic gold-plated Medusa head medallion emblem on both hinges',
      'Reinforced 5-barrel Italian barrel hinges with micro-screws',
      'Accompanied by terracotta luxury leather case and authenticity card',
    ],
  },
  {
    id: 'nxt-bordeaux-empress',
    name: 'NXT Bordeaux Empress Frame',
    category: 'eyewear',
    subtitle: 'Deep wine red cellulose acetate with diamond-motif gold hinge',
    description: 'Subtle warmth and understated luxury. Hand-carved from deep wine-red bordeaux translucent acetate with sculpted gold hardware featuring a miniature sapphire-toned center rivet.',
    priceINR: 3050,
    priceUSD: convertINRtoUSD(3050),
    image: nxtBordeauxFrameImg,
    availableSizes: ['Small (48-18-140 mm)', 'Medium (51-19-144 mm)', 'Wide (54-20-148 mm)'],
    defaultSize: 'Medium (51-19-144 mm)',
    sizeType: 'eyewear',
    rating: 4.88,
    reviewsCount: 88,
    inStock: true,
    specs: {
      material: 'Bordeaux Wine Italian Acetate & Gilded Zinc Alloy',
      dimensions: 'Lens: 51mm | Bridge: 19mm | Temple: 144mm',
      weight: '21.0 grams',
      warranty: '2 Years Warranty',
      origin: 'Belluno, Italy',
    },
    features: [
      'Rich wine-red coloration that glows under natural daylight',
      'Intricate gold scrollwork filigree on temple exterior',
      'Compatible with digital and progressive optical prescriptions',
      'Smooth hand-beveled edges for soft tactile touch',
    ],
  },
  {
    id: 'nxt-champagne-crystal',
    name: 'NXT Champagne Crystal Octagon',
    category: 'eyewear',
    subtitle: 'Translucent crystal warm beige geometric optical glasses',
    description: 'Airy, contemporary, and luminous. Crafted in clear champagne crystal cellulose that catches warm room light. Hexagonal upper rim with soft rounded lower teardrop curve.',
    priceINR: 2999,
    priceUSD: convertINRtoUSD(2999),
    image: nxtChampagneCrystalImg,
    availableSizes: ['Small (49-18-140 mm)', 'Medium (52-19-145 mm)', 'Wide (55-20-150 mm)'],
    defaultSize: 'Medium (52-19-145 mm)',
    sizeType: 'eyewear',
    rating: 4.92,
    reviewsCount: 76,
    inStock: true,
    specs: {
      material: 'High-Purity Crystal Cellulose Acetate',
      dimensions: 'Lens: 52mm | Bridge: 19mm | Temple: 145mm',
      weight: '16.8 grams',
      warranty: '2 Years Manufacturer Guarantee',
      origin: 'Cadore, Italy',
    },
    features: [
      'Crystal warm-champagne translucency that flatters all skin tones',
      'Embedded gold wire temple core visible through clear acetate',
      'Blue-filter coated high clarity organic lenses',
      'Featherweight ergonomic design for 14-hour daily screen wear',
    ],
  },
  {
    id: 'nxt-minimalist-mesh-watch',
    name: 'NXT Horizon Minimalist Mesh Watch',
    category: 'timepieces',
    subtitle: 'Matte black dial with ultra-slim case and Milanese mesh steel strap',
    description: 'As paired with the NXT glasses in our flatlay showcases. Minimalist Bauhaus horology with a clean black dial, slender gold or silver hands, and a breathable stainless steel mesh bracelet.',
    priceINR: 3220,
    priceUSD: convertINRtoUSD(3220),
    image: nxtIconTerrazzoImg,
    availableSizes: ['38mm (Slim Wrist)', '40mm (Standard Fit)', '42mm (Bold Wrist)'],
    defaultSize: '40mm (Standard Fit)',
    sizeType: 'timepiece',
    rating: 4.96,
    reviewsCount: 135,
    inStock: true,
    specs: {
      material: '316L Stainless Steel & Matte Black PVD Mesh',
      dimensions: 'Case: 40mm | Case Thickness: 7.2mm | Lug: 20mm',
      weight: '58 grams',
      warranty: '3 Years Caliber Warranty',
      origin: 'Swiss Quartz Assembly',
    },
    features: [
      'Ultra-thin 7.2mm case profile that slips under any cuff',
      'Smooth sliding clasp for tool-free size adjustment',
      'Sapphire crystal glass with anti-fingerprint coating',
      'Water resistant to 50 meters (5 ATM)',
    ],
  },
  {
    id: 'nxt-dravo-executive-duo',
    name: 'NXT Dravo & Horology Executive Duo Set',
    category: 'hybrid',
    subtitle: 'Bold Dravo spectacles paired with stainless mesh watch & leather case',
    description: 'The complete flatlay executive set. Includes one pair of NXT Dravo black acetate glasses and one stainless steel mesh timepiece packaged in a bespoke gift box with personalized note from Owner Sayed Zishan.',
    priceINR: 3389,
    priceUSD: convertINRtoUSD(3389),
    image: nxtDravoFlatlayImg,
    availableSizes: ['Standard Set (52mm Specs + 40mm Watch)', 'Petite Set (49mm Specs + 38mm Watch)', 'Grand Set (55mm Specs + 42mm Watch)'],
    defaultSize: 'Standard Set (52mm Specs + 40mm Watch)',
    sizeType: 'eyewear',
    rating: 5.0,
    reviewsCount: 68,
    inStock: true,
    specs: {
      material: 'NXT Dravo Acetate + 316L Stainless Mesh Watch',
      dimensions: 'Complete Collector Trunk Box',
      weight: 'Luxury Boxed Weight: 420g',
      warranty: '3 Years VIP Concierge Warranty',
      origin: 'Curated by Sayed Zishan',
    },
    features: [
      'Numbered certificate signed by Atelier Owner Sayed Zishan',
      'Free customized prescription lens fitting included',
      'Includes brass styling accessories and leather storage pouch',
      'Complimentary priority express dispatch via BlueDart',
    ],
  },
];

export const AVAILABLE_COUPONS: { [code: string]: { discountPercent: number; minSpend: number; description: string } } = {
  ZISHAN10: {
    discountPercent: 10,
    minSpend: 2500,
    description: '10% privilege directly from Owner Sayed Zishan',
  },
  NXT12: {
    discountPercent: 12,
    minSpend: 3000,
    description: '12% privilege on NXT Eyewear collection',
  },
  CITY10: {
    discountPercent: 10,
    minSpend: 2500,
    description: '10% off for City Optical & Times members',
  },
};
