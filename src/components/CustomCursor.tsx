import React, { useEffect, useState, useCallback, useMemo } from 'react';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Increase number of particles and optimize their rendering
  const particles = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: i,
    delay: i * 0.5,
    scale: 1 - (i * 0.05),
    opacity: 1 - (i * 0.1)
  })), []);

  const checkMobile = useCallback(() => {
    setIsMobile(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
  }, []);

  useEffect(() => {
    checkMobile();
    const debouncedResize = debounce(checkMobile, 250);
    window.addEventListener('resize', debouncedResize);

    let rafId: number;
    let lastX = 0;
    let lastY = 0;
    const smoothing = 0.15; // Lower value for smoother movement

    const updateMousePosition = (e: MouseEvent) => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      
      rafId = requestAnimationFrame(() => {
        // Smooth interpolation for cursor movement
        const targetX = e.clientX;
        const targetY = e.clientY;

        const newX = lastX + (targetX - lastX) * smoothing;
        const newY = lastY + (targetY - lastY) * smoothing;

        lastX = newX;
        lastY = newY;

        setMousePosition({ x: newX, y: newY });
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Optimized event delegation for interactive elements
    const handleInteraction = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.matches('a, button, [data-cursor="pointer"], input, textarea');

      if (isInteractive) {
        setIsHovering(true);
      } else if (isHovering) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', updateMousePosition, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleInteraction, { passive: true });

    return () => {
      window.removeEventListener('resize', debouncedResize);
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleInteraction);
      cancelAnimationFrame(rafId);
    };
  }, [checkMobile, isHovering]);

  if (isMobile) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50"
      style={{ perspective: '1000px' }}
    >
      {particles.map(({ id, delay, scale, opacity }) => (
        <div
          key={id}
          className="fixed rounded-full mix-blend-difference"
          style={{
            transform: `translate3d(${mousePosition.x - 4}px, ${mousePosition.y - 4}px, 0) scale(${
              isHovering ? 2.5 : isClicking ? 0.8 : 1
            })`,
            width: '8px',
            height: '8px',
            backgroundColor: 'white',
            transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
            transitionDelay: `${delay}ms`,
            opacity: opacity * (isHovering ? 0.7 : 1),
            transform: `
              translate3d(
                ${mousePosition.x - 4}px,
                ${mousePosition.y - 4}px,
                ${id * -5}px
              )
              scale(${scale * (isHovering ? 2 : isClicking ? 0.8 : 1)})
            `,
            willChange: 'transform, opacity'
          }}
        />
      ))}
    </div>
  );
};

// Utility function for debouncing
function debounce(fn: Function, ms: number) {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}
