import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowDownRight, Terminal } from 'lucide-react';
import { profileData } from '../data/profile';
import { HeroReveal } from './HeroReveal';
import { HeroPortrait } from './HeroPortrait';
import { MagneticButton } from './MagneticButton';
import { useTheme } from './ThemeProvider';

export const Hero: React.FC = () => {
  const { hero } = profileData;
  const shouldReduceMotion = useReducedMotion();
  const { isBatmanMode } = useTheme();

  // Staggered Entrance Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-var(--nav-height))] min-h-[calc(100svh-var(--nav-height))] flex items-center py-6 sm:py-8 lg:py-10 overflow-hidden bg-gotham-black transition-colors duration-300"
    >
      {/* BATMAN ATMOSPHERE ONLY IN DARKEST MODE: Gotham Skyline */}
      {isBatmanMode && (
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-20 bg-cover bg-bottom mix-blend-screen"
          style={{ backgroundImage: 'url(/assets/batman/gotham-skyline.svg)' }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [0, -8, 0],
                }
          }
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* BAT SIGNAL EFFECT: Ambient Breathing Spotlight */}
      {isBatmanMode && (
        <motion.div
          className="absolute top-10 right-1/4 w-[550px] h-[750px] pointer-events-none rounded-full blur-[110px]"
          style={{
            background: 'radial-gradient(circle, rgba(244, 196, 0, 0.16) 0%, rgba(244, 196, 0, 0.03) 60%, transparent 80%)',
          }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: [1, 1.15, 0.98, 1],
                  opacity: [0.15, 0.28, 0.18, 0.15],
                  x: [0, 20, -15, 0],
                }
          }
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Soft Ambient Spotlight in Light/Dark Mode */}
      {!isBatmanMode && (
        <div
          className="absolute top-1/4 right-1/3 w-[500px] h-[500px] pointer-events-none rounded-full blur-[120px] opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(var(--color-bat-yellow), 0.3) 0%, transparent 70%)',
          }}
        />
      )}

      {/* Atmospheric Halftone Matrix Overlay (Darkest Mode only) */}
      <div className="absolute inset-0 gotham-halftone-bg pointer-events-none opacity-40" />

      {/* Technical Coordinate Watermarks */}
      {isBatmanMode ? (
        <>
          <div className="absolute top-4 left-6 hidden xl:block font-mono text-[9px] text-bat-muted/40 tracking-widest pointer-events-none select-none">
            [COORD: 28.6139° N, 77.2090° E // SECTOR-GOTHAM-04]
          </div>
          <div className="absolute top-4 right-8 hidden xl:block font-mono text-[9px] text-bat-muted/40 tracking-widest pointer-events-none select-none">
            [STATUS: AIRSPACE MONITORED // BAT-FREQ 142.85 MHz]
          </div>
        </>
      ) : (
        <>
          <div className="absolute top-4 left-6 hidden xl:block font-mono text-[9px] text-bat-muted/50 tracking-widest pointer-events-none select-none">
            [LOCATION: NEW DELHI, INDIA // 28.6139° N, 77.2090° E]
          </div>
          <div className="absolute top-4 right-8 hidden xl:block font-mono text-[9px] text-bat-muted/50 tracking-widest pointer-events-none select-none">
            [STATUS: OPEN TO SENIOR & LEAD MOBILE OPPORTUNITIES]
          </div>
        </>
      )}

      {/* Main Content Container with Mobile Recomposition & Desktop 2-Column Asymmetric Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-x-10 lg:gap-y-6 items-center w-full">
          
          {/* SECTION A: Eyebrow + 4-Line Editorial Headline + Narrow Description
              Mobile: Order 1 (Top) | Desktop: Col 1-7, Row 1 */}
          <motion.div
            className="order-1 lg:col-span-7 lg:row-start-1 flex flex-col justify-center text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow Label */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-5">
              <span className="w-2 h-2 bg-bat-yellow rounded-full animate-ping" />
              <span className="w-2 h-2 bg-bat-yellow rounded-full -ml-3" />
              <span className="font-mono text-xs tracking-widest text-bat-yellow uppercase bg-gotham-charcoal px-3 py-1 border border-gotham-border rounded-sm">
                {isBatmanMode ? hero.eyebrow : 'MOBILE SYSTEMS ARCHITECT // VERIFIED RECORD'}
              </span>
            </motion.div>

            {/* Display Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[5.25rem] tracking-tight leading-[0.98] text-bat-offwhite mb-5 select-none"
            >
              <span className="block tracking-tight text-bat-offwhite">ENGINEERING</span>
              <span className="block tracking-tight text-bat-offwhite">MOBILE SYSTEMS</span>
              <span className="block text-bat-yellow drop-shadow-[0_2px_18px_rgba(var(--color-bat-yellow),0.25)] tracking-tight">
                {isBatmanMode ? 'FROM THE SHADOWS' : 'AT ENTERPRISE SCALE'}
              </span>
              <span className="block text-bat-muted/80 tracking-tight">TO 100K+ USERS.</span>
            </motion.h1>

            {/* Narrow Readable Summary with Yellow Accent Rule */}
            <motion.p
              variants={itemVariants}
              className="font-sans text-sm sm:text-base md:text-lg text-bat-offwhite/85 max-w-lg leading-relaxed border-l-2 border-bat-yellow/60 pl-4 py-0.5"
            >
              {hero.supportingText}
            </motion.p>
          </motion.div>

          {/* SECTION B: Interactive Hero Persona Panel
              Mobile: Order 2 | Desktop: Spans Col 8-12, Rows 1-2 */}
          <motion.div
            className="order-2 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:row-span-2 flex justify-center items-center relative my-4 lg:my-0"
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Show Batman Reveal in Darkest mode, or Clean Executive Portrait in Light/Dark */}
            {isBatmanMode ? <HeroReveal /> : <HeroPortrait />}
          </motion.div>

          {/* SECTION C: Dual Magnetic CTAs & Technical Telemetry
              Mobile: Order 3 | Desktop: Col 1-7, Row 2 */}
          <motion.div
            className="order-3 lg:col-span-7 lg:col-start-1 lg:row-start-2 flex flex-col justify-start"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Dual Magnetic CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3.5 sm:gap-5 mb-8">
              {/* Primary Magnetic Accent Button */}
              <MagneticButton href={hero.primaryCta.href} strength={0.15}>
                <div
                  className="group relative h-13 sm:h-14 px-6 sm:px-8 bg-bat-yellow hover:bg-white text-gotham-black font-display font-bold text-sm sm:text-base tracking-widest transition-all duration-200 shadow-bat-sharp active:translate-x-0.5 active:translate-y-0.5 hover:shadow-[0_0_20px_rgba(var(--color-bat-yellow),0.35)] inline-flex items-center justify-center gap-3 select-none rounded-sm"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
                  }}
                >
                  <span>{isBatmanMode ? hero.primaryCta.label : 'EXPLORE PROJECTS'}</span>
                  <ArrowDownRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-45 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-200" />
                </div>
              </MagneticButton>

              {/* Secondary Magnetic Outline Button */}
              <MagneticButton href={hero.secondaryCta.href} target="_blank" rel="noopener noreferrer" strength={0.15}>
                <div
                  className="group h-13 sm:h-14 px-6 sm:px-8 bg-gotham-charcoal/90 hover:bg-gotham-surface text-bat-offwhite hover:text-bat-yellow border border-gotham-border hover:border-bat-yellow font-display font-bold text-sm sm:text-base tracking-widest transition-all duration-200 inline-flex items-center justify-center gap-3 select-none rounded-sm"
                  style={{
                    clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)',
                  }}
                >
                  <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-bat-yellow group-hover:scale-110 transition-transform duration-200" />
                  <span>{isBatmanMode ? hero.secondaryCta.label : 'DOWNLOAD RESUME (PDF)'}</span>
                </div>
              </MagneticButton>
            </motion.div>

            {/* Telemetry Metadata */}
            <motion.div
              variants={itemVariants}
              className="pt-5 border-t border-gotham-border/70 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 font-mono text-[11px] text-bat-muted"
            >
              {hero.telemetry.map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-[10px] text-bat-muted/60 uppercase tracking-widest">
                    {isBatmanMode ? item.label : (item.label === 'COORDINATES' ? 'LOCATION' : item.label)}
                  </span>
                  <span className="text-bat-offwhite/90 font-medium tracking-wider">
                    {item.value}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Subtle Bottom Separator Line with Accent Notch */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gotham-border">
        <div className="w-32 h-[2px] bg-bat-yellow mx-auto" />
      </div>
    </section>
  );
};