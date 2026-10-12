import React from 'react';
import { useTheme } from './ThemeProvider';

export interface MarqueeProps {
  items?: string[];
  className?: string;
}

const DEFAULT_MARQUEE_ITEMS = [
  'FLUTTER',
  'DART',
  'MOBILE ENGINEERING',
  'REST APIS',
  'FIREBASE',
  'CI/CD',
  'PRODUCT ENGINEERING',
  'SYSTEM DESIGN',
  'PERFORMANCE',
  'UI ENGINEERING',
];

export const Marquee: React.FC<MarqueeProps> = ({
  items = DEFAULT_MARQUEE_ITEMS,
  className = '',
}) => {
  const { isBatmanMode } = useTheme();
  // Duplicate items to ensure a seamless, non-jumping infinite loop
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      className={`relative w-full overflow-hidden bg-gotham-charcoal border-y border-bat-yellow/30 py-3 sm:py-4 select-none group transition-colors duration-300 ${className}`}
      aria-hidden="true"
    >
      {/* Edge gradient fade masks */}
      <div className="absolute top-0 left-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-gotham-black to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-gotham-black to-transparent z-10 pointer-events-none" />

      {/* Marquee Continuous Inner Track */}
      <div className="animate-marquee flex items-center gap-8 sm:gap-12 whitespace-nowrap group-hover:[animation-play-state:paused]">
        {repeatedItems.map((item, index) => (
          <div key={index} className="flex items-center gap-8 sm:gap-12">
            <span className="font-display font-black text-lg sm:text-2xl tracking-[0.25em] text-bat-offwhite/85 hover:text-bat-yellow transition-colors duration-200">
              {item}
            </span>

            {/* Divider: Bat Emblem in Darkest mode, Modern Tech Star in Light/Dark */}
            <div className="flex items-center gap-2 opacity-60">
              {isBatmanMode ? (
                <img
                  src="/assets/batman/bat-emblem.svg"
                  alt="Bat Emblem"
                  className="w-5 sm:w-6 h-auto object-contain"
                />
              ) : (
                <span className="text-bat-yellow text-sm font-bold">✦</span>
              )}
              <span className="text-bat-yellow text-xs font-mono">//</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
