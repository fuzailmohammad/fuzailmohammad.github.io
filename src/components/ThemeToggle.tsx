import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme, Theme } from './ThemeProvider';

// Authentic Batman silhouette emblem icon
const BatIcon: React.FC<{ size?: number; className?: string }> = ({ size = 15, className = '' }) => (
  <svg
    width={size}
    height={Math.round(size * 0.58)}
    viewBox="0 0 187.1643 108.3441"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M60.4363 14.6262c-6.3146,8.2913 -8.158,16.1143 -1.4266,23.0389 4.1793,3.5474 9.131,4.9705 15.2981,3.0514 5.5304,-1.94 8.6055,-6.7561 9.7876,-13.7897 0.6707,-5.2067 0.7145,-10.492 0.8633,-15.764l4.8414 8.86c2.3485,-0.3551 4.8433,-0.3713 7.4868,-0.0434l4.816 -8.7933c0.1756,5.4578 0.252,10.9322 0.917,16.3084 1.3573,6.925 4.6304,11.7848 10.7704,13.554 3.2672,1.229 10.886,0.4106 14.4595,-3.5173 6.5247,-6.6171 4.4429,-15.2397 -1.6014,-22.7578 13.3257,3.1083 25.9841,8.4096 36.0795,15.9904 12.1742,9.8877 17.1528,22.6981 9.2709,36.3205 -4.2848,6.8447 -10.4736,13.7852 -27.1547,21.2529 2.2789,-3.8375 3.8909,-7.5638 4.3063,-11.0906 0.6816,-5.7963 -2.4147,-10.4988 -9.8008,-9.434 -5.2711,0.7599 -10.9501,4.8485 -15.3096,9.1079 -2.1931,-3.5258 -4.5779,-5.8229 -7.0813,-7.3609 -3.5222,-2.216 -7.1154,-1.6197 -10.7618,1.0715 -4.9385,3.9986 -9.4565,12.2292 -12.6507,21.813 -2.5528,-7.7751 -5.7769,-13.7601 -9.4479,-18.5535 -5.4506,-6.4349 -10.5428,-7.0653 -15.3722,-3.4373 -2.2072,1.7448 -4.0711,3.9596 -5.6881,6.512 -3.3819,-3.6867 -7.5085,-6.4251 -12.2571,-8.3726 -7.9066,-3.2699 -14.4339,1.8507 -12.7125,9.2182 0.7588,4.0135 2.0189,7.651 4.2686,10.5462 -13.3727,-5.7267 -23.0043,-13.339 -28.3018,-23.1654 -5.7593,-11.7659 -2.3824,-22.1613 6.7665,-31.691 8.9346,-8.1511 22.1279,-14.4505 39.6345,-18.8746z" />
  </svg>
);

interface ThemeOption {
  id: Theme;
  label: string; // for accessible title/aria-label only, NO visible text!
  icon: (active: boolean) => React.ReactNode;
}

const themeOptions: ThemeOption[] = [
  {
    id: 'light',
    label: 'Light theme',
    icon: () => <Sun size={14} className="shrink-0" />,
  },
  {
    id: 'dark',
    label: 'Dark theme',
    icon: () => <Moon size={14} className="shrink-0" />,
  },
  {
    id: 'darkest',
    label: 'Darkest theme (Batman mode)',
    icon: () => <BatIcon size={16} className="shrink-0" />,
  },
];

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Theme mode selector"
      className={`relative inline-flex items-center h-9 p-0.5 rounded-full bg-gotham-surface border border-gotham-border transition-all duration-200 shadow-sm ${className}`}
    >
      {themeOptions.map((opt) => {
        const isActive = theme === opt.id;

        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={opt.label}
            title={opt.label}
            onClick={() => setTheme(opt.id)}
            className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-150 focus:outline-none select-none ${
              isActive
                ? opt.id === 'darkest'
                  ? 'text-gotham-black font-bold'
                  : 'text-bat-offwhite'
                : 'text-bat-muted hover:text-bat-offwhite'
            }`}
          >
            {/* Sliding Pill Indicator for active icon */}
            {isActive && (
              <motion.div
                layoutId="theme-active-indicator"
                className={`absolute inset-0 rounded-full ${
                  opt.id === 'darkest'
                    ? 'bg-bat-yellow shadow-[0_0_12px_rgba(244,196,0,0.55)]'
                    : opt.id === 'dark'
                    ? 'bg-slate-700/90 text-white shadow-sm'
                    : 'bg-slate-200 text-slate-900 shadow-sm'
                }`}
                transition={{ type: 'spring', stiffness: 500, damping: 36 }}
              />
            )}

            {/* Icon Render (Zero visible text) */}
            <span className="relative z-10 flex items-center justify-center">
              {opt.icon(isActive)}
            </span>
          </button>
        );
      })}
    </div>
  );
};
