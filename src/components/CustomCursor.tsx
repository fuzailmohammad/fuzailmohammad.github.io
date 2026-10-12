import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from './ThemeProvider';

export const CustomCursor: React.FC = () => {
  const { isBatmanMode } = useTheme();
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'batman-reveal' | 'text'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Smooth trailing position for outer ring
  const ringPos = useRef({ x: -100, y: -100 });
  const requestRef = useRef<number | null>(null);

  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check if touch device or coarse pointer or prefers-reduced-motion
    const checkCapabilities = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
      setIsTouchDevice(isTouch);
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setReducedMotion(isReduced);
    };
    checkCapabilities();

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Detect cursor context
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveElement = target.closest('button, a, input, textarea, [data-cursor]');
      if (interactiveElement) {
        const customCursor = interactiveElement.getAttribute('data-cursor');
        if (customCursor === 'batman-reveal' && isBatmanMode) {
          setCursorType('batman-reveal');
        } else if (interactiveElement.tagName === 'INPUT' || interactiveElement.tagName === 'TEXTAREA') {
          setCursorType('text');
        } else {
          setCursorType('pointer');
        }
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Animation frame for smooth trailing outer ring
    const animateRing = () => {
      // Lerp smoothing factor
      const ease = 0.18;
      ringPos.current.x += (cursorPos.x - ringPos.current.x) * ease;
      ringPos.current.y += (cursorPos.y - ringPos.current.y) * ease;

      const outerEl = document.getElementById('gotham-cursor-outer');
      if (outerEl) {
        outerEl.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      requestRef.current = requestAnimationFrame(animateRing);
    };

    requestRef.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [cursorPos, isVisible, isBatmanMode]);

  if (reducedMotion || isTouchDevice || !isVisible || cursorType === 'text') {
    return null;
  }

  const isBatmanReveal = cursorType === 'batman-reveal' && isBatmanMode;
  const isPointer = cursorType === 'pointer' || (cursorType === 'batman-reveal' && !isBatmanMode);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300">
      {/* Inner Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-bat-yellow pointer-events-none transition-transform duration-75 ease-out shadow-[0_0_8px_rgba(var(--color-bat-yellow),0.8)]"
        style={{
          transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0) translate(-50%, -50%)`,
        }}
      />

      {/* Outer Interpolated Ring */}
      <div
        id="gotham-cursor-outer"
        className={`fixed top-0 left-0 pointer-events-none flex items-center justify-center transition-all duration-200 ease-out ${
          isBatmanReveal
            ? 'w-16 h-16 border border-bat-yellow bg-bat-yellow/10'
            : isPointer
            ? 'w-12 h-12 border border-bat-yellow bg-bat-yellow/5'
            : 'w-8 h-8 border border-bat-offwhite/40'
        }`}
        style={{
          borderRadius: isBatmanReveal ? '4px' : '50%',
        }}
      >
        {/* Tactical Crosshair Marks when in Batman mode */}
        {isBatmanReveal && (
          <>
            <div className="absolute -top-1 w-2 h-[1px] bg-bat-yellow" />
            <div className="absolute -bottom-1 w-2 h-[1px] bg-bat-yellow" />
            <div className="absolute -left-1 h-2 w-[1px] bg-bat-yellow" />
            <div className="absolute -right-1 h-2 w-[1px] bg-bat-yellow" />
            <span className="font-mono text-[8px] text-bat-yellow font-bold tracking-tighter absolute -bottom-4">
              REVEAL
            </span>
          </>
        )}

        {/* Pointer Mini Indicator */}
        {isPointer && !isBatmanReveal && (
          <div className="w-1.5 h-1.5 bg-bat-yellow rounded-full animate-ping opacity-60" />
        )}
      </div>
    </div>
  );
};
