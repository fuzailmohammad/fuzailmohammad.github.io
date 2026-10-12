import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { ProjectGalleryItem } from '../data/projects';
import { useTheme } from './ThemeProvider';

interface ScreenshotGalleryProps {
  gallery: ProjectGalleryItem[];
  projectTitle: string;
}

export const ScreenshotGallery: React.FC<ScreenshotGalleryProps> = ({ gallery, projectTitle }) => {
  const { isBatmanMode } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const totalImages = gallery.length;
  const currentImage = gallery[currentIndex] || gallery[0];

  const handlePrev = useCallback(() => {
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  }, [totalImages]);

  const handleNext = useCallback(() => {
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  }, [totalImages]);

  const handleClose = useCallback(() => {
    setIsLightboxOpen(false);
    setIsZoomed(false);
  }, []);

  // Keyboard controls for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === '+' || e.key === '=') {
        setIsZoomed(true);
      } else if (e.key === '-') {
        setIsZoomed(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen, handleClose, handlePrev, handleNext]);

  if (!gallery || gallery.length === 0) {
    return null;
  }

  return (
    <div className="w-full flex flex-col space-y-4">
      {/* Primary Showcase Viewport */}
      <div className="relative group bg-gotham-charcoal border border-gotham-border rounded-lg overflow-hidden shadow-2xl">
        {/* Tactical Corner Brackets */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-bat-yellow pointer-events-none z-10" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-bat-yellow pointer-events-none z-10" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-bat-yellow pointer-events-none z-10" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-bat-yellow pointer-events-none z-10" />

        {/* HUD Telemetry Top Strip */}
        <div className="px-4 py-2 bg-gotham-surface border-b border-gotham-border flex items-center justify-between text-xs font-mono select-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-bat-yellow animate-pulse" />
            <span className="text-bat-yellow font-bold tracking-wider">
              {isBatmanMode ? 'SCHEMATIC VIEW //' : 'PREVIEW //'}
            </span>
            <span className="text-bat-muted truncate max-w-[200px] sm:max-w-md">
              {currentImage.title}
            </span>
          </div>
          <span className="text-bat-muted tracking-widest text-[11px]">
            {String(currentIndex + 1).padStart(2, '0')} / {String(totalImages).padStart(2, '0')}
          </span>
        </div>

        {/* Main Image Frame (Clickable for Fullscreen Lightbox) */}
        <div
          onClick={() => setIsLightboxOpen(true)}
          className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-gotham-black cursor-pointer overflow-hidden flex items-center justify-center"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsLightboxOpen(true);
            }
          }}
          aria-label={`Open full-resolution view of ${currentImage.title}`}
        >
          <img
            src={currentImage.src}
            alt={`${projectTitle} - ${currentImage.title}`}
            className="w-full h-full object-contain p-2 sm:p-4 transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />

          {/* CRT Scanline & Grain Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.4) 2px, rgba(0, 0, 0, 0.4) 4px)',
            }}
          />

          {/* Click to Expand Prompt */}
          <div className="absolute inset-0 bg-gotham-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gotham-black/90 border border-bat-yellow text-bat-yellow font-mono text-xs tracking-widest uppercase rounded shadow-lg backdrop-blur-sm">
              <Maximize2 size={14} />
              <span>{isBatmanMode ? 'EXPAND SCHEMATIC' : 'EXPAND IMAGE'}</span>
            </span>
          </div>

          {/* Quick Prev / Next Controls on Hover */}
          {totalImages > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-gotham-black/80 hover:bg-bat-yellow hover:text-gotham-black border border-gotham-border text-bat-offwhite rounded opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
                aria-label="Previous schematic image"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-gotham-black/80 hover:bg-bat-yellow hover:text-gotham-black border border-gotham-border text-bat-offwhite rounded opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
                aria-label="Next schematic image"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {/* Caption Readout */}
        <div className="p-4 bg-gotham-surface/90 border-t border-gotham-border flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="font-mono text-xs font-bold text-bat-yellow uppercase tracking-wider">
              {currentImage.title}
            </h4>
            <p className="font-sans text-xs text-bat-offwhite/80 mt-0.5">
              {currentImage.caption}
            </p>
          </div>
          <span className="font-mono text-[10px] text-bat-muted uppercase tracking-widest shrink-0">
            {isBatmanMode ? 'CONFIDENTIAL SCHEMATIC // TAP TO EXPAND' : 'PREVIEW // TAP TO EXPAND'}
          </span>
        </div>
      </div>

      {/* Supporting Thumbnails Strip (Desktop & Mobile) */}
      {totalImages > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gotham-border">
          {gallery.map((item, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setIsZoomed(false);
                  setCurrentIndex(idx);
                }}
                className={`relative shrink-0 w-24 sm:w-32 aspect-[16/10] bg-gotham-charcoal rounded overflow-hidden border transition-all duration-200 ${
                  isSelected
                    ? 'border-bat-yellow shadow-[0_0_12px_rgba(244,196,0,0.3)] ring-1 ring-bat-yellow'
                    : 'border-gotham-border hover:border-bat-yellow/50 opacity-70 hover:opacity-100'
                }`}
                aria-label={`Select schematic ${idx + 1}: ${item.title}`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-1 font-mono text-[9px] px-1 py-0.2 bg-gotham-black/90 text-bat-yellow border border-gotham-border">
                  0{idx + 1}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Tactical Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={`${projectTitle} schematic viewer`}
          >
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-gotham-black/95 backdrop-blur-md"
            />

            {/* Lightbox Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-6xl max-h-[95vh] flex flex-col bg-gotham-charcoal border-2 border-bat-yellow/80 rounded-lg overflow-hidden shadow-2xl z-10"
            >
              {/* Lightbox Header Bar */}
              <div className="px-4 sm:px-6 py-3 bg-gotham-surface border-b border-gotham-border flex items-center justify-between z-20">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-bat-yellow tracking-widest">
                    {isBatmanMode ? 'CLASSIFIED SCHEMATIC //' : 'PROJECT SCREENSHOT //'}
                  </span>
                  <span className="font-sans text-xs sm:text-sm font-semibold text-bat-offwhite truncate max-w-[200px] sm:max-w-md">
                    {projectTitle} — {currentImage.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Zoom Toggle */}
                  <button
                    type="button"
                    onClick={() => setIsZoomed((prev) => !prev)}
                    className="p-1.5 sm:p-2 bg-gotham-charcoal hover:bg-bat-yellow text-bat-muted hover:text-gotham-black border border-gotham-border transition-colors rounded font-mono text-xs flex items-center gap-1.5"
                    aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
                  >
                    {isZoomed ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
                    <span className="hidden sm:inline">{isZoomed ? 'RESET' : 'ZOOM'}</span>
                  </button>

                  {/* Close Lightbox */}
                  <button
                    type="button"
                    onClick={handleClose}
                    className="p-1.5 sm:p-2 bg-gotham-charcoal hover:bg-bat-yellow text-bat-muted hover:text-gotham-black border border-gotham-border transition-colors rounded"
                    aria-label="Close schematic viewer (Escape)"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Lightbox Main Stage */}
              <div className="relative flex-1 min-h-[50vh] max-h-[75vh] w-full bg-gotham-black overflow-auto flex items-center justify-center p-4">
                <img
                  src={currentImage.src}
                  alt={`${projectTitle} - ${currentImage.title}`}
                  className={`max-w-full max-h-[70vh] object-contain transition-transform duration-300 ${
                    isZoomed ? 'scale-150 cursor-grab active:cursor-grabbing' : 'scale-100 cursor-zoom-in'
                  }`}
                  onClick={() => setIsZoomed((prev) => !prev)}
                />

                {/* Left / Right Nav Arrows inside modal */}
                {totalImages > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-gotham-surface/90 hover:bg-bat-yellow text-bat-offwhite hover:text-gotham-black border border-gotham-border transition-colors rounded-full shadow-lg z-20"
                      aria-label="Previous image (Left arrow)"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-gotham-surface/90 hover:bg-bat-yellow text-bat-offwhite hover:text-gotham-black border border-gotham-border transition-colors rounded-full shadow-lg z-20"
                      aria-label="Next image (Right arrow)"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>

              {/* Lightbox Footer Bar */}
              <div className="px-4 sm:px-6 py-3 bg-gotham-surface border-t border-gotham-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 z-20">
                <div className="text-xs">
                  <span className="font-mono text-bat-yellow font-bold block sm:inline sm:mr-2">
                    {currentImage.title}
                  </span>
                  <span className="font-sans text-bat-offwhite/80">
                    {currentImage.caption}
                  </span>
                </div>
                <div className="font-mono text-[10px] text-bat-muted flex items-center gap-3 shrink-0">
                  <span>KEYBOARD: [← / →] PREV / NEXT</span>
                  <span>[ESC] CLOSE</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
