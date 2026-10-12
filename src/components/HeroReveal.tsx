import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Eye, Crosshair, Sparkles } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';

export const HeroReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Pointer position and reveal radius state
  const targetPos = useRef({ x: 240, y: 300, active: false });
  const currentPos = useRef({ x: 240, y: 300, rx: 0, ry: 0, opacity: 0 });
  const animFrameId = useRef<number | null>(null);

  // React state for HUD telemetry, mobile toggle, and progressive portrait image loading
  const [telemetry, setTelemetry] = useState({ x: 0, y: 0, active: false });
  const [isMobileRevealed, setIsMobileRevealed] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [portraitSrc, setPortraitSrc] = useState('/assets/portrait/portrait.webp');

  const handlePortraitError = () => {
    // Graceful fallback chain: .webp -> .jpg -> .png -> .svg
    if (portraitSrc.endsWith('.webp')) {
      setPortraitSrc('/assets/portrait/portrait.jpg');
    } else if (portraitSrc.endsWith('.jpg')) {
      setPortraitSrc('/assets/portrait/portrait.png');
    } else {
      setPortraitSrc('/assets/portrait/portrait-placeholder.svg');
    }
  };

  // Check touch capabilities
  useEffect(() => {
    setIsTouchDevice(
      window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window
    );
  }, []);

  // Update mask styles directly via DOM for 60fps performance without re-rendering React trees
  const updateMaskStyles = useCallback(() => {
    const ease = 0.12; // Smoothing factor
    const radiusEase = 0.08;

    // Target dimensions
    const targetRx = targetPos.current.active ? 170 : 0;
    const targetRy = targetPos.current.active ? 230 : 0;
    const targetOpacity = targetPos.current.active ? 1 : 0;

    // Lerp positions
    currentPos.current.x += (targetPos.current.x - currentPos.current.x) * ease;
    currentPos.current.y += (targetPos.current.y - currentPos.current.y) * ease;
    currentPos.current.rx += (targetRx - currentPos.current.rx) * radiusEase;
    currentPos.current.ry += (targetRy - currentPos.current.ry) * radiusEase;
    currentPos.current.opacity += (targetOpacity - currentPos.current.opacity) * radiusEase;

    const portraitLayer = document.getElementById('reveal-portrait-layer');
    const borderGlow = document.getElementById('reveal-border-glow');

    const rx = Math.max(0, currentPos.current.rx);
    const ry = Math.max(0, currentPos.current.ry);
    const x = currentPos.current.x;
    const y = currentPos.current.y;

    if (portraitLayer) {
      if (shouldReduceMotion) {
        // Pure crossfade for users with prefers-reduced-motion
        portraitLayer.style.maskImage = 'none';
        portraitLayer.style.webkitMaskImage = 'none';
        portraitLayer.style.opacity = currentPos.current.opacity.toString();
      } else if (rx > 1) {
        const maskValue = `radial-gradient(ellipse ${rx}px ${ry}px at ${x}px ${y}px, black 35%, rgba(0,0,0,0.85) 55%, transparent 75%)`;
        portraitLayer.style.maskImage = maskValue;
        portraitLayer.style.webkitMaskImage = maskValue;
        portraitLayer.style.opacity = '1';
      } else {
        portraitLayer.style.maskImage = 'none';
        portraitLayer.style.webkitMaskImage = 'none';
        portraitLayer.style.opacity = '0';
      }
    }

    if (borderGlow) {
      if (rx > 5) {
        borderGlow.style.opacity = (currentPos.current.opacity * 0.85).toString();
        borderGlow.style.background = `radial-gradient(ellipse ${rx + 10}px ${ry + 10}px at ${x}px ${y}px, transparent 40%, rgba(244, 196, 0, 0.25) 52%, rgba(244, 196, 0, 0.08) 65%, transparent 75%)`;
      } else {
        borderGlow.style.opacity = '0';
      }
    }

    animFrameId.current = requestAnimationFrame(updateMaskStyles);
  }, [shouldReduceMotion]);

  useEffect(() => {
    animFrameId.current = requestAnimationFrame(updateMaskStyles);
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [updateMaskStyles]);

  // Pointer event handlers for desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || shouldReduceMotion || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    targetPos.current = { x, y, active: true };
    setTelemetry({ x: Math.round(x), y: Math.round(y), active: true });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || shouldReduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    targetPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
    setTelemetry((prev) => ({ ...prev, active: true }));
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    targetPos.current.active = false;
    setTelemetry((prev) => ({ ...prev, active: false }));
  };

  // Mobile tap-to-reveal toggle handler
  const handleCardClick = () => {
    if (!isTouchDevice && !shouldReduceMotion) return;

    const nextState = !isMobileRevealed;
    setIsMobileRevealed(nextState);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      targetPos.current = {
        x: rect.width / 2,
        y: rect.height / 2,
        active: nextState,
      };
      setTelemetry({
        x: Math.round(rect.width / 2),
        y: Math.round(rect.height / 2),
        active: nextState,
      });
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Main Reveal Interactive Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
        data-cursor="batman-reveal"
        className="relative w-full max-w-[440px] aspect-[4/5] bg-gotham-charcoal/90 border border-gotham-border rounded-lg overflow-hidden select-none cursor-pointer group shadow-2xl transition-all duration-500 hover:border-bat-yellow/80 hover:shadow-[0_0_35px_rgba(244,196,0,0.18)]"
        aria-label="Interactive Batman to Mohammad Fuzail portrait reveal"
      >
        {/* Ambient tactical blueprint grid */}
        <div className="absolute inset-0 gotham-grid-bg opacity-30 pointer-events-none" />

        {/* CRT Scanline Overlay Texture */}
        <div
          className="absolute inset-0 pointer-events-none z-20 opacity-35"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.4) 2px, rgba(0, 0, 0, 0.4) 4px)',
          }}
        />

        {/* Tactical Corner HUD Brackets & Technical Markings */}
        <div className="absolute top-2.5 left-2.5 z-30 pointer-events-none flex items-center gap-1">
          <div className="w-3.5 h-3.5 border-t-2 border-l-2 border-bat-yellow transition-transform duration-300 group-hover:scale-110" />
          <span className="font-mono text-[8px] text-bat-yellow/70 tracking-widest pl-0.5">SEC.01</span>
        </div>

        <div className="absolute top-2.5 right-2.5 z-30 pointer-events-none flex items-center gap-1">
          <span className="font-mono text-[8px] text-bat-muted tracking-widest pr-0.5">SYS.HUD</span>
          <div className="w-3.5 h-3.5 border-t-2 border-r-2 border-bat-yellow transition-transform duration-300 group-hover:scale-110" />
        </div>

        <div className="absolute bottom-2.5 left-2.5 z-30 pointer-events-none flex items-center gap-1">
          <div className="w-3.5 h-3.5 border-b-2 border-l-2 border-bat-yellow transition-transform duration-300 group-hover:scale-110" />
          <span className="font-mono text-[8px] text-bat-muted tracking-widest pl-0.5">BIO.04</span>
        </div>

        <div className="absolute bottom-2.5 right-2.5 z-30 pointer-events-none flex items-center gap-1">
          <span className="font-mono text-[8px] text-bat-yellow/70 tracking-widest pr-0.5">TACTICAL</span>
          <div className="w-3.5 h-3.5 border-b-2 border-r-2 border-bat-yellow transition-transform duration-300 group-hover:scale-110" />
        </div>

        {/* Tactical Elevation Ruler Ticks (Left Edge) */}
        <div className="absolute left-1.5 top-16 bottom-16 flex flex-col justify-between items-center z-20 pointer-events-none opacity-40">
          <span className="w-1.5 h-[1px] bg-bat-yellow" />
          <span className="w-1 h-[1px] bg-gotham-border" />
          <span className="w-2 h-[1px] bg-bat-yellow" />
          <span className="w-1 h-[1px] bg-gotham-border" />
          <span className="w-1.5 h-[1px] bg-bat-yellow" />
          <span className="w-1 h-[1px] bg-gotham-border" />
          <span className="w-2 h-[1px] bg-bat-yellow" />
        </div>

        {/* LAYER 1: The Dark Knight Batman Persona Artwork (Base Layer) */}
        <div
          className="absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-500 group-hover:scale-[1.02]"
          data-layer="batman-base"
        >
          <img
            src="/assets/batman/batman-hero.svg"
            alt="The Dark Knight Batman Persona"
            className="w-full h-full object-contain p-4 transition-opacity duration-300 drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
            loading="eager"
          />

          {/* Subtly animated searchlight beam behind cowl */}
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-tr from-transparent via-bat-yellow/10 to-transparent" />
        </div>

        {/* LAYER 2: The Real Portrait (Dynamically Masked by Pointer / Touch) */}
        <div
          id="reveal-portrait-layer"
          className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300"
          style={{
            opacity: 0,
            transition: 'opacity 0.25s ease-out',
          }}
          data-layer="portrait-revealed"
        >
          <img
            src={portraitSrc}
            onError={handlePortraitError}
            alt="Mohammad Fuzail Real Identity Revealed"
            className="w-full h-full object-cover object-top scale-[1.02]"
            loading="eager"
          />
        </div>

        {/* Boundary Feather Glow Effect */}
        <div
          id="reveal-border-glow"
          className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300"
          style={{ opacity: 0 }}
        />

        {/* Realtime Biometric HUD Telemetry Overlay */}
        <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between px-3 py-1.5 bg-gotham-black/90 border border-gotham-border backdrop-blur-md pointer-events-none shadow-md">
          <div className="flex items-center gap-2">
            <Crosshair
              className={`w-3.5 h-3.5 ${
                telemetry.active ? 'text-bat-yellow animate-spin' : 'text-bat-muted'
              }`}
              style={{ animationDuration: '6s' }}
            />
            <span className="font-mono text-[10px] tracking-widest text-bat-offwhite font-medium">
              {telemetry.active ? 'BIOMETRIC REVEAL ACTIVE' : 'PERSONA: THE DARK KNIGHT'}
            </span>
          </div>

          <span className="font-mono text-[9px] text-bat-yellow tracking-wider font-semibold">
            {telemetry.active
              ? `LOC: [${telemetry.x}, ${telemetry.y}]`
              : 'HOVER / TAP TO SCAN'}
          </span>
        </div>

        {/* Bottom Status Ribbon */}
        <div className="absolute bottom-4 left-4 right-4 z-30 flex items-center justify-between px-3 py-2 bg-gotham-black/90 border border-gotham-border/80 backdrop-blur-md pointer-events-none shadow-md">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                telemetry.active ? 'bg-bat-yellow animate-ping' : 'bg-emerald-500'
              }`}
            />
            <span className="font-mono text-[10px] tracking-widest text-bat-muted font-medium">
              {telemetry.active ? 'IDENTITY CONFIRMED // FUZAIL.M' : 'GOTHAM GUARDIAN // ONLINE'}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[9px] font-mono text-bat-yellow font-bold uppercase bg-bat-yellow/10 px-2 py-0.5 border border-bat-yellow/30">
            <Sparkles size={10} />
            <span>PORTFOLIO 2.0</span>
          </div>
        </div>
      </div>

      {/* Touch-Device / Mobile Explicit Reveal Action Toggle */}
      <div className="mt-4 sm:hidden flex items-center gap-2">
        <button
          onClick={handleCardClick}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gotham-charcoal border border-bat-yellow/50 text-bat-yellow font-mono text-xs tracking-wider rounded active:scale-95 transition-transform"
        >
          <Eye size={14} />
          <span>{isMobileRevealed ? 'REVERT TO BATMAN' : 'TAP TO REVEAL IDENTITY'}</span>
        </button>
      </div>
    </div>
  );
};
