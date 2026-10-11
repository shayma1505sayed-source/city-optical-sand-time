import React from 'react';

interface BrandLogoProps {
  variant?: 'full' | 'compact' | 'icon-only' | 'stacked';
  className?: string;
  iconSize?: number;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'compact',
  className = '',
  iconSize = 42,
}) => {
  // SVG reproduction of the circular gold medallion with dual clock-spectacles
  const LogoMedallion = (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 200 200"
      className="shrink-0 drop-shadow-md select-none transition-transform duration-300 hover:scale-105"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Outer gold ring gradient */}
        <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f7e09e" />
          <stop offset="35%" stopColor="#c5a059" />
          <stop offset="70%" stopColor="#8d651c" />
          <stop offset="100%" stopColor="#eccd7e" />
        </linearGradient>

        {/* Dial face radial gradient */}
        <radialGradient id="dialBlack" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#252528" />
          <stop offset="85%" stopColor="#111113" />
          <stop offset="100%" stopColor="#08080a" />
        </radialGradient>

        {/* Metallic glass rim */}
        <linearGradient id="goldSpec" x1="0%" y1="0%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#fff3cf" />
          <stop offset="50%" stopColor="#cda557" />
          <stop offset="100%" stopColor="#845e1b" />
        </linearGradient>
      </defs>

      {/* Outer Coin Edge Bezel */}
      <circle cx="100" cy="100" r="96" fill="url(#goldRim)" stroke="#684a14" strokeWidth="2" />
      <circle cx="100" cy="100" r="88" fill="#141416" stroke="url(#goldRim)" strokeWidth="3" />
      <circle cx="100" cy="100" r="84" fill="url(#dialBlack)" />

      {/* Decorative Bezel Notches (Hours ring) */}
      {[...Array(60)].map((_, i) => {
        const angle = (i * 6 * Math.PI) / 180;
        const r1 = i % 5 === 0 ? 81 : 83;
        const r2 = 84;
        const x1 = 100 + r1 * Math.sin(angle);
        const y1 = 100 - r1 * Math.cos(angle);
        const x2 = 100 + r2 * Math.sin(angle);
        const y2 = 100 - r2 * Math.cos(angle);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#c5a059"
            strokeWidth={i % 5 === 0 ? 1.5 : 0.8}
            opacity={0.8}
          />
        );
      })}

      {/* Glasses Frame Bridge & Temples */}
      {/* Center bridge connecting the two clock-lenses */}
      <path
        d="M 86 100 Q 100 93 114 100 Q 100 97 86 100"
        fill="url(#goldSpec)"
        stroke="#ffd57a"
        strokeWidth="1.2"
      />
      {/* Left Temple Wing */}
      <path d="M 38 100 L 28 97 L 24 103" stroke="url(#goldSpec)" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Right Temple Wing */}
      <path d="M 162 100 L 172 97 L 176 103" stroke="url(#goldSpec)" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Left Lens / Left Watch Dial */}
      <g id="left-clock-lens">
        <circle cx="62" cy="100" r="28" fill="#121214" stroke="url(#goldSpec)" strokeWidth="4" />
        <circle cx="62" cy="100" r="24" fill="#0d0d0f" stroke="#c5a059" strokeWidth="1" strokeDasharray="1 2" />
        {/* Roman Numerals: XII, III, VI, IX */}
        <text x="62" y="82" fill="#e8c97e" fontSize="6.5" fontFamily="Cinzel, serif" textAnchor="middle" fontWeight="bold">XII</text>
        <text x="80" y="102" fill="#e8c97e" fontSize="6" fontFamily="Cinzel, serif" textAnchor="middle" fontWeight="bold">III</text>
        <text x="62" y="121" fill="#e8c97e" fontSize="6.5" fontFamily="Cinzel, serif" textAnchor="middle" fontWeight="bold">VI</text>
        <text x="44" y="102" fill="#e8c97e" fontSize="6" fontFamily="Cinzel, serif" textAnchor="middle" fontWeight="bold">IX</text>
        {/* Intermediate dots */}
        <circle cx="71" cy="85" r="0.9" fill="#c5a059" />
        <circle cx="78" cy="92" r="0.9" fill="#c5a059" />
        <circle cx="78" cy="108" r="0.9" fill="#c5a059" />
        <circle cx="71" cy="115" r="0.9" fill="#c5a059" />
        <circle cx="53" cy="115" r="0.9" fill="#c5a059" />
        <circle cx="46" cy="108" r="0.9" fill="#c5a059" />
        <circle cx="46" cy="92" r="0.9" fill="#c5a059" />
        <circle cx="53" cy="85" r="0.9" fill="#c5a059" />
        {/* Hands (10:10 position) */}
        <line x1="62" y1="100" x2="52" y2="88" stroke="#f6dda0" strokeWidth="2" strokeLinecap="round" />
        <line x1="62" y1="100" x2="74" y2="89" stroke="#f6dda0" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="62" cy="100" r="2.2" fill="#ffd885" />
      </g>

      {/* Right Lens / Right Watch Dial */}
      <g id="right-clock-lens">
        <circle cx="138" cy="100" r="28" fill="#121214" stroke="url(#goldSpec)" strokeWidth="4" />
        <circle cx="138" cy="100" r="24" fill="#0d0d0f" stroke="#c5a059" strokeWidth="1" strokeDasharray="1 2" />
        {/* Roman Numerals: XII, III, VI, IX */}
        <text x="138" y="82" fill="#e8c97e" fontSize="6.5" fontFamily="Cinzel, serif" textAnchor="middle" fontWeight="bold">XII</text>
        <text x="156" y="102" fill="#e8c97e" fontSize="6" fontFamily="Cinzel, serif" textAnchor="middle" fontWeight="bold">III</text>
        <text x="138" y="121" fill="#e8c97e" fontSize="6.5" fontFamily="Cinzel, serif" textAnchor="middle" fontWeight="bold">VI</text>
        <text x="120" y="102" fill="#e8c97e" fontSize="6" fontFamily="Cinzel, serif" textAnchor="middle" fontWeight="bold">IX</text>
        {/* Intermediate dots */}
        <circle cx="147" cy="85" r="0.9" fill="#c5a059" />
        <circle cx="154" cy="92" r="0.9" fill="#c5a059" />
        <circle cx="154" cy="108" r="0.9" fill="#c5a059" />
        <circle cx="147" cy="115" r="0.9" fill="#c5a059" />
        <circle cx="129" cy="115" r="0.9" fill="#c5a059" />
        <circle cx="122" cy="108" r="0.9" fill="#c5a059" />
        <circle cx="122" cy="92" r="0.9" fill="#c5a059" />
        <circle cx="129" cy="85" r="0.9" fill="#c5a059" />
        {/* Hands (10:10 position) */}
        <line x1="138" y1="100" x2="128" y2="88" stroke="#f6dda0" strokeWidth="2" strokeLinecap="round" />
        <line x1="138" y1="100" x2="150" y2="89" stroke="#f6dda0" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="138" cy="100" r="2.2" fill="#ffd885" />
      </g>
    </svg>
  );

  if (variant === 'icon-only') {
    return <div className={`inline-flex items-center ${className}`}>{LogoMedallion}</div>;
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {LogoMedallion}
        <div className="mt-3">
          <div className="text-xl sm:text-2xl font-brand font-bold tracking-[0.16em] text-slate-900 leading-none">
            CITY OPTICAL
          </div>
          <div className="my-1.5 h-0.5 w-32 mx-auto bg-gradient-to-r from-transparent via-[#c5a059] to-transparent" />
          <div className="text-lg sm:text-xl font-brand font-bold tracking-[0.2em] bg-gradient-to-r from-[#9e762a] via-[#c5a059] to-[#8d651c] bg-clip-text text-transparent leading-none">
            AND TIMES
          </div>
          <div className="mt-2 text-[10px] tracking-[0.25em] text-slate-500 font-semibold uppercase">
            Optometry · Timepieces · Eyewear
          </div>
          <div className="mt-0.5 text-[9px] tracking-[0.2em] text-[#c5a059] font-medium uppercase">
            Est. 2019 · Luxury Optical
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {LogoMedallion}
        <div className="flex flex-col leading-tight select-none">
          <span className="font-brand text-sm sm:text-base font-bold tracking-[0.14em] text-slate-900 whitespace-nowrap">
            CITY OPTICAL
          </span>
          <span className="font-brand text-xs sm:text-sm font-bold tracking-[0.18em] bg-gradient-to-r from-[#946c24] via-[#c5a059] to-[#b3883a] bg-clip-text text-transparent whitespace-nowrap">
            AND TIMES
          </span>
          <span className="text-[8px] sm:text-[9px] tracking-[0.2em] text-sky-700/80 font-medium uppercase whitespace-nowrap">
            Optometry &middot; Horology
          </span>
        </div>
      </div>
    );
  }

  // variant === 'full'
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {LogoMedallion}
      <div className="flex flex-col select-none">
        <span className="font-brand text-lg sm:text-2xl font-bold tracking-[0.16em] text-slate-900 leading-none">
          CITY OPTICAL
        </span>
        <div className="my-1.5 h-px w-full bg-gradient-to-r from-[#c5a059] via-[#ecd48e] to-transparent" />
        <span className="font-brand text-base sm:text-xl font-bold tracking-[0.22em] bg-gradient-to-r from-[#946c24] via-[#c5a059] to-[#7f5a18] bg-clip-text text-transparent leading-none">
          AND TIMES
        </span>
        <span className="mt-1.5 text-[9px] sm:text-[10px] tracking-[0.28em] text-slate-500 font-medium uppercase whitespace-nowrap">
          Optometry &middot; Timepieces &middot; Eyewear
        </span>
        <span className="text-[8px] sm:text-[9px] tracking-[0.24em] text-[#c5a059] font-medium uppercase">
          Est. 2019 &middot; Luxury Optical
        </span>
      </div>
    </div>
  );
};
