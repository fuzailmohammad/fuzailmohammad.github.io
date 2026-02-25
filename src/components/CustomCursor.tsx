import React, { useEffect, useRef, useState, useCallback } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const isClicking = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const updateMousePosition = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => {
      isClicking.current = true;
    };

    const handleMouseUp = () => {
      isClicking.current = false;
    };

    document.addEventListener('mousemove', updateMousePosition, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    const animate = () => {
      const dx = mousePos.current.x - cursorPos.current.x;
      const dy = mousePos.current.y - cursorPos.current.y;

      cursorPos.current.x += dx * 0.15;
      cursorPos.current.y += dy * 0.15;

      const scale = isClicking.current ? 0.8 : isHovering.current ? 1.5 : 1;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPos.current.x - 4}px, ${cursorPos.current.y - 4}px) scale(${scale})`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${cursorPos.current.x - 16}px, ${cursorPos.current.y - 16}px) scale(${scale})`;
        ringRef.current.style.opacity = isHovering.current ? '0.8' : '0.5';
      }

      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${cursorPos.current.x - 24}px, ${cursorPos.current.y - 24}px) scale(${isHovering.current ? 2 : 1})`;
        trailRef.current.style.opacity = isHovering.current ? '0.3' : '0.1';
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleMouseEnter = () => {
      isHovering.current = true;
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
    };

    const interactiveSelector = 'a, button, [data-cursor="pointer"], input, textarea';

    const addListeners = () => {
      document.querySelectorAll(interactiveSelector).forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    addListeners();

    const observer = new MutationObserver((mutations) => {
      let shouldUpdate = false;
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          shouldUpdate = true;
        }
      });
      if (shouldUpdate) {
        addListeners();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', checkMobile);
      observer.disconnect();
    };
  }, []);

  if (isMobile) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full pointer-events-none z-50 will-change-transform"
        style={{ mixBlendMode: 'difference' }}
      />

      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border-2 border-blue-500/50 rounded-full pointer-events-none z-50 will-change-transform"
      />

      <div
        ref={trailRef}
        className="fixed top-0 left-0 w-12 h-12 border border-purple-500/20 rounded-full pointer-events-none z-40 will-change-transform"
      />
    </>
  );
};