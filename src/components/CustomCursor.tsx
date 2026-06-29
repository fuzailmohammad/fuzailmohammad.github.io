import { useEffect, useRef } from 'react';

const CUSTOM_CURSOR_ENABLED = true;

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const stateRef = useRef({ x: 0, y: 0, cx: 0, cy: 0, hover: false });

  useEffect(() => {
    if (!CUSTOM_CURSOR_ENABLED) return;

    const isTouch = 'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    if (isTouch) return;

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    const state = stateRef.current;
    state.x = window.innerWidth / 2;
    state.y = window.innerHeight / 2;
    state.cx = state.x;
    state.cy = state.y;

    cursor.style.opacity = '1';
    ring.style.opacity = '0.5';

    const onMove = (e: MouseEvent) => {
      state.x = e.clientX;
      state.y = e.clientY;
    };

    const onEnter = () => {
      cursor.style.opacity = '1';
      ring.style.opacity = state.hover ? '0.8' : '0.5';
    };

    const onLeave = () => {
      cursor.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const onHoverEnter = () => {
      state.hover = true;
      ring.style.opacity = '0.8';
    };

    const onHoverLeave = () => {
      state.hover = false;
      ring.style.opacity = '0.5';
    };

    const animate = () => {
      const dx = state.x - state.cx;
      const dy = state.y - state.cy;
      state.cx += dx * 0.18;
      state.cy += dy * 0.18;
      const scale = state.hover ? 1.4 : 1;
      cursor.style.transform = `translate3d(${state.cx - 4}px, ${state.cy - 4}px, 0) scale(${scale})`;
      ring.style.transform = `translate3d(${state.cx - 14}px, ${state.cy - 14}px, 0) scale(${scale})`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);

    const selectors = 'a, button, [data-cursor="pointer"], input, textarea, [role="button"]';
    const addListeners = () => {
      document.querySelectorAll(selectors).forEach(el => {
        el.addEventListener('mouseenter', onHoverEnter);
        el.addEventListener('mouseleave', onHoverLeave);
      });
    };
    addListeners();

    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      observer.disconnect();
      document.querySelectorAll(selectors).forEach(el => {
        el.removeEventListener('mouseenter', onHoverEnter);
        el.removeEventListener('mouseleave', onHoverLeave);
      });
    };
  }, []);

  if (!CUSTOM_CURSOR_ENABLED) return null;
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none will-change-transform"
        style={{
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          zIndex: 99999,
          opacity: 0,
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-7 h-7 rounded-full pointer-events-none will-change-transform"
        style={{
          border: '2px solid rgba(59, 130, 246, 0.5)',
          zIndex: 99998,
          opacity: 0,
        }}
      />
    </>
  );
}
