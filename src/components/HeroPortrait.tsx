import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, ShieldCheck, Smartphone } from 'lucide-react';
import { profileData } from '../data/profile';

export const HeroPortrait: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [portraitSrc, setPortraitSrc] = useState('/assets/portrait/portrait.webp');

  const handlePortraitError = () => {
    if (portraitSrc.endsWith('.webp')) {
      setPortraitSrc('/assets/portrait/portrait.jpg');
    } else if (portraitSrc.endsWith('.jpg')) {
      setPortraitSrc('/assets/portrait/portrait.png');
    } else {
      setPortraitSrc('/assets/portrait/portrait-placeholder.svg');
    }
  };

  return (
    <div className="relative w-[280px] sm:w-[340px] md:w-[380px] lg:w-[420px] aspect-[4/5] flex items-center justify-center select-none group">
      
      {/* Background Soft Accent Glow */}
      <div className="absolute inset-0 bg-bat-yellow/10 rounded-2xl blur-2xl transform group-hover:scale-105 transition-transform duration-500 pointer-events-none" />

      {/* Main Card Frame */}
      <motion.div
        className="relative w-full h-full rounded-2xl bg-gotham-surface border border-gotham-border overflow-hidden shadow-2xl flex flex-col justify-between"
        whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.3 } }}
      >
        {/* Subtle Tech Grid overlay */}
        <div className="absolute inset-0 gotham-grid-bg opacity-30 pointer-events-none" />

        {/* Top Header Bar Inside Card */}
        <div className="relative z-10 px-4 py-3 bg-gotham-charcoal/70 backdrop-blur-sm border-b border-gotham-border/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[11px] font-semibold tracking-wider text-bat-offwhite uppercase">
              {profileData.displayName}
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-bat-yellow">
            <Smartphone size={12} />
            <span>MOBILE ARCHITECT</span>
          </div>
        </div>

        {/* Center Portrait Image */}
        <div className="relative flex-1 w-full overflow-hidden flex items-center justify-center bg-gradient-to-b from-transparent via-gotham-charcoal/30 to-gotham-black/80">
          <img
            src={portraitSrc}
            alt={profileData.name}
            onError={handlePortraitError}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            loading="eager"
          />

          {/* Bottom Gradient Fade for Card Text Legibility */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gotham-surface via-gotham-surface/60 to-transparent pointer-events-none" />
        </div>

        {/* Bottom Floating Telemetry Pills */}
        <div className="relative z-10 p-4 pt-1 bg-gotham-surface/90 backdrop-blur-sm border-t border-gotham-border/50 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs text-bat-offwhite">
              <ShieldCheck size={14} className="text-bat-yellow" />
              <span className="font-bold">LEAD MOBILE DEV</span>
            </div>
            <div className="flex items-center gap-1 font-mono text-[11px] text-bat-yellow bg-bat-yellow/10 px-2 py-0.5 rounded border border-bat-yellow/20">
              <Sparkles size={11} />
              <span>100K+ USERS</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-bat-muted">
            <span>EXP: 3+ YEARS</span>
            <span>FLUTTER • DART • FIREBASE</span>
          </div>
        </div>

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-bat-yellow rounded-tl-sm pointer-events-none" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-bat-yellow rounded-tr-sm pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-bat-yellow rounded-bl-sm pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-bat-yellow rounded-br-sm pointer-events-none" />
      </motion.div>
    </div>
  );
};
