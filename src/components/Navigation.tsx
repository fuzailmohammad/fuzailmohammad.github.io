import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Terminal } from 'lucide-react';
import { profileData } from '../data/profile';
import { MagneticButton } from './MagneticButton';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from './ThemeProvider';

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { isBatmanMode } = useTheme();

  // Track scroll position for navbar styling & active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);

      if (!isHomePage) return;

      const sections = ['hero', 'about', 'experience', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const el = document.getElementById(sectionId);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const navLinks = [
    { id: 'about', label: 'ABOUT', href: isHomePage ? '#about' : '/#about' },
    { id: 'experience', label: 'EXPERIENCE', href: isHomePage ? '#experience' : '/#experience' },
    { id: 'skills', label: 'SKILLS', href: isHomePage ? '#skills' : '/#skills' },
    { id: 'projects', label: 'PROJECTS', href: isHomePage ? '#projects' : '/#projects' },
    { id: 'contact', label: 'CONTACT', href: isHomePage ? '#contact' : '/#contact' },
  ];

  // Smooth scroll handler utilizing native CSS scroll-margin-top
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#') && isHomePage) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? 'bg-gotham-black/95 backdrop-blur-md border-b border-gotham-border shadow-bat-card'
          : 'bg-gotham-black/85 backdrop-blur-sm border-b border-gotham-border/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/*
          PRIMARY THREE-ZONE ALIGNED NAVBAR:
          - Uses single source of truth: h-[var(--nav-height)]
          - Column 1 (Left Brand): Fixed boundary, strictly contains brand text.
          - Column 2 (Center Navigation): Centered navigation track.
          - Column 3 (Right System / CTA / Toggle): Utilities sharing exact vertical center.
        */}
        <div className="h-[var(--nav-height)] grid grid-cols-[auto_1fr_auto] items-center gap-4">
          
          {/* ZONE 1 — BRAND (LEFT) */}
          <div className="flex items-center min-w-0 pr-2">
            <Link
              to="/"
              className="flex items-center gap-3 group focus:outline-none min-w-0 max-w-[210px] sm:max-w-[240px] xl:max-w-[280px]"
              aria-label="Mohd Fuzail Portfolio Home"
            >
              {/* Brand Mark (Batman Emblem in Darkest mode, Modern Monogram in Light/Dark) */}
              {isBatmanMode ? (
                <div className="w-9 h-9 shrink-0 bg-gotham-charcoal border border-gotham-border rounded flex items-center justify-center group-hover:border-bat-yellow transition-colors relative overflow-hidden p-1 shadow-sm">
                  <img
                    src="/assets/batman/bat-emblem.svg"
                    alt="Batman Emblem"
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200"
                  />
                  <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-bat-yellow" />
                </div>
              ) : (
                <div className="w-9 h-9 shrink-0 bg-gotham-surface border border-gotham-border rounded flex items-center justify-center group-hover:border-bat-yellow transition-colors relative overflow-hidden shadow-sm">
                  <span className="font-display font-black text-sm text-bat-yellow tracking-wider">
                    FM
                  </span>
                </div>
              )}

              {/* Brand Text Block strictly constrained with fixed height matching mark */}
              <div className="flex flex-col justify-center min-w-0 h-9 overflow-hidden">
                <span className="font-display font-bold text-sm sm:text-base tracking-wider text-bat-offwhite group-hover:text-bat-yellow transition-colors leading-tight truncate">
                  {profileData.displayName}
                </span>
                <span className="text-[10px] font-mono tracking-wider text-bat-muted uppercase truncate leading-tight mt-0.5">
                  {profileData.shortHeadline}
                </span>
              </div>
            </Link>
          </div>

          {/* ZONE 2 — NAVIGATION (CENTER) */}
          <nav
            className="hidden lg:flex items-center justify-center h-9 px-2"
            aria-label="Primary Navigation"
          >
            <div className="flex items-center gap-5 xl:gap-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`h-9 inline-flex items-center font-display text-sm tracking-widest transition-all duration-200 relative group select-none whitespace-nowrap ${
                      isActive
                        ? 'text-bat-yellow font-bold'
                        : 'text-bat-offwhite/75 hover:text-bat-yellow'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-bat-yellow transition-all duration-300 ${
                        isActive ? 'w-full shadow-[0_0_8px_#F4C400]' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </a>
                );
              })}
            </div>
          </nav>

          {/* ZONE 3 — SYSTEM / CTA & THEME TOGGLE (RIGHT) */}
          <div className="flex items-center justify-end gap-2.5 sm:gap-3 lg:gap-3.5 h-9">
            {/* Tactical Status Indicator (Large screens: xl+) */}
            <div className="hidden xl:inline-flex items-center h-9 gap-2 pr-3 border-r border-gotham-border/70 text-xs font-mono text-bat-muted shrink-0">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="tracking-widest text-[11px] uppercase whitespace-nowrap text-bat-muted/90">
                {isBatmanMode ? 'ACTIVE // GOTHAM-04' : 'AVAILABLE // NEW DELHI'}
              </span>
            </div>

            {/* Icon-Only 3-Mode Theme Toggle (Light / Dark / Darkest) */}
            <ThemeToggle />

            {/* Dossier/Resume Action Button */}
            <div className="hidden sm:flex items-center shrink-0 h-9">
              <MagneticButton href={profileData.resumeUrl} target="_blank" rel="noopener noreferrer" strength={0.15}>
                <div className="h-9 px-3.5 bg-gotham-surface hover:bg-gotham-border text-bat-offwhite hover:text-bat-yellow border border-gotham-border hover:border-bat-yellow font-mono text-xs tracking-wider transition-all duration-200 inline-flex items-center gap-2 rounded-sm shadow-sm whitespace-nowrap">
                  <Terminal size={13} className="text-bat-yellow shrink-0" />
                  <span>{isBatmanMode ? 'DOSSIER.PDF' : 'RESUME.PDF'}</span>
                </div>
              </MagneticButton>
            </div>

            {/* MOBILE & TABLET MENU TRIGGER (< 1024px) */}
            <div className="lg:hidden flex items-center h-9">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="h-9 px-2.5 text-bat-offwhite hover:text-bat-yellow border border-gotham-border rounded bg-gotham-charcoal focus:outline-none flex items-center justify-center"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

        </div>

        {/* MOBILE & TABLET DROPDOWN MENU (< 1024px) */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 pb-5 px-3 bg-gotham-charcoal border border-gotham-border rounded-lg shadow-2xl flex flex-col gap-2 animate-fadeIn">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`font-display text-base tracking-widest py-2.5 px-3 border-b border-gotham-border/40 transition-all ${
                    isActive
                      ? 'text-bat-yellow bg-gotham-surface font-bold border-l-2 border-l-bat-yellow'
                      : 'text-bat-offwhite hover:text-bat-yellow hover:bg-gotham-surface'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            <div className="pt-3 px-2 flex items-center justify-between">
              <span className="text-xs font-mono text-bat-muted flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {isBatmanMode ? 'ACTIVE // GOTHAM-04' : 'AVAILABLE // ONLINE'}
              </span>
              <a
                href={profileData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-1.5 bg-gotham-surface text-bat-yellow border border-bat-yellow/40 font-mono text-xs font-bold"
              >
                {isBatmanMode ? 'DOSSIER.PDF' : 'RESUME.PDF'}
              </a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};