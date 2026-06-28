import React, { useEffect, useRef, memo } from 'react';
import { useLocation } from 'react-router-dom';

interface CursorState {
  mouseX: number;
  mouseY: number;
  cursorX: number;
  cursorY: number;
  isHovering: boolean;
  isClicking: boolean;
  isVisible: boolean;
}

export const CustomCursor: React.FC = memo(() => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<CursorState>({
    mouseX: 0,
    mouseY: 0,
    cursorX: 0,
    cursorY: 0,
    isHovering: false,
    isClicking: false,
    isVisible: false,
  });
  const animationRef = useRef<number | null>(null);
  const listenersRef = useRef<{
    mousemove: ((e: MouseEvent) => void) | null;
    mousedown: (() => void) | null;
    mouseup: (() => void) | null;
    mouseenter: (() => void) | null;
    mouseleave: (() => void) | null;
  }>({
    mousemove: null,
    mousedown: null,
    mouseup: null,
    mouseenter: null,
    mouseleave: null,
  });

  const location = useLocation();

  useEffect(() => {
    const isTouchDevice = () => {
      return 'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        ((navigator as unknown as { msMaxTouchPoints?: number }).msMaxTouchPoints ?? 0) > 0;
    };

    const isCoarsePointer = () => {
      return window.matchMedia('(pointer: coarse)').matches;
    };

    if (isTouchDevice() || isCoarsePointer()) {
      if (cursorRef.current) cursorRef.current.style.display = 'none';
      if (ringRef.current) ringRef.current.style.display = 'none';
      return;
    }

    const state = stateRef.current;
    const cursor = cursorRef.current;
    const ring = ringRef.current;

    if (!cursor || !ring) return;

    const updateCursor = () => {
      const dx = state.mouseX - state.cursorX;
      const dy = state.mouseY - state.cursorY;

      state.cursorX += dx * 0.18;
      state.cursorY += dy * 0.18;

      const scale = state.isClicking ? 0.8 : state.isHovering ? 1.4 : 1;
      const opacity = state.isVisible ? (state.isHovering ? 1 : 0.8) : 0;

      cursor.style.transform = `translate(${state.cursorX - 4}px, ${state.cursorY - 4}px) scale(${scale})`;
      cursor.style.opacity = String(opacity);

      ring.style.transform = `translate(${state.cursorX - 14}px, ${state.cursorY - 14}px) scale(${scale})`;
      ring.style.opacity = String(state.isVisible ? (state.isHovering ? 0.6 : 0.4) : 0);

      animationRef.current = requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
      if (!state.isVisible) {
        state.isVisible = true;
        state.cursorX = e.clientX;
        state.cursorY = e.clientY;
      }
    };

    const handleMouseDown = () => {
      state.isClicking = true;
    };

    const handleMouseUp = () => {
      state.isClicking = false;
    };

    const handleMouseEnterWindow = () => {
      state.isVisible = true;
    };

    const handleMouseLeaveWindow = () => {
      state.isVisible = false;
    };

    const handleElementMouseEnter = () => {
      state.isHovering = true;
    };

    const handleElementMouseLeave = () => {
      state.isHovering = false;
    };

    listenersRef.current = {
      mousemove: handleMouseMove,
      mousedown: handleMouseDown,
      mouseup: handleMouseUp,
      mouseenter: handleMouseEnterWindow,
      mouseleave: handleMouseLeaveWindow,
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnterWindow);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);

    const addInteractiveListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [data-cursor="pointer"], input, textarea, [role="button"], [tabindex]'
      );
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleElementMouseEnter);
        el.addEventListener('mouseleave', handleElementMouseLeave);
      });
    };

    addInteractiveListeners();

    let rafId: number | null = null;
    const debouncedAddListeners = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(addInteractiveListeners);
    };

    const observer = new MutationObserver(debouncedAddListeners);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    animationRef.current = requestAnimationFrame(updateCursor);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      const listeners = listenersRef.current;
      if (listeners.mousemove) document.removeEventListener('mousemove', listeners.mousemove);
      if (listeners.mousedown) document.removeEventListener('mousedown', listeners.mousedown);
      if (listeners.mouseup) document.removeEventListener('mouseup', listeners.mouseup);
      if (listeners.mouseenter) document.removeEventListener('mouseenter', listeners.mouseenter);
      if (listeners.mouseleave) document.removeEventListener('mouseleave', listeners.mouseleave);

      observer.disconnect();

      const interactiveElements = document.querySelectorAll(
        'a, button, [data-cursor="pointer"], input, textarea, [role="button"], [tabindex]'
      );
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementMouseEnter);
        el.removeEventListener('mouseleave', handleElementMouseLeave);
      });
    };
  }, [location]);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full pointer-events-none will-change-transform"
        style={{
          zIndex: 99999,
          opacity: 0,
          mixBlendMode: 'difference',
          transform: 'translate(-100px, -100px)',
        }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-6 h-6 border-2 border-blue-500/60 rounded-full pointer-events-none will-change-transform"
        style={{
          zIndex: 99998,
          opacity: 0,
          transform: 'translate(-100px, -100px)',
        }}
        aria-hidden="true"
      />
    </>
  );
});

CustomCursor.displayName = 'CustomCursor';
