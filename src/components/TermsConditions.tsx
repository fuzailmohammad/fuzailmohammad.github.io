import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  FileText,
  Download,
  Printer,
  Share2,
  ArrowLeft,
  ArrowUp,
  CheckCircle2,
  Scale,
  ExternalLink,
  Check,
} from 'lucide-react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { useTheme } from './ThemeProvider';
import { termsConditionsData } from '../data/legalData';

export const TermsConditions: React.FC = () => {
  const { isBatmanMode } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const { metadata, intro, sections } = termsConditionsData;

  // SEO & Scroll setup
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    document.title = 'Terms & Conditions | FuzailVerse - Operational Parameters & License';

    const updateMetaTag = (attrName: string, attrVal: string, content: string) => {
      let el = document.querySelector(`meta[${attrName}="${attrVal}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    updateMetaTag('name', 'description', 'FuzailVerse Terms and Conditions: Standard terms of service, role-based access, intellectual property protections, liability disclaimers, and software licensing agreement.');
    updateMetaTag('property', 'og:title', 'Terms & Conditions | FuzailVerse');
    updateMetaTag('property', 'og:description', 'Standard terms of service, intellectual property rights, and software licensing across all FuzailVerse mobile applications.');
    updateMetaTag('property', 'og:url', metadata.websiteUrl);
    updateMetaTag('property', 'og:type', 'article');

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = metadata.websiteUrl;

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.title = 'Mohd Fuzail - Senior Flutter Developer | Mobile Application Specialist';
    };
  }, [metadata.websiteUrl]);

  const handleDownload = () => {
    const pdfUrl = metadata.pdfPath;
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
      window.open(pdfUrl, '_blank');
    } else {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = metadata.pdfFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(metadata.websiteUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gotham-black text-bat-offwhite min-h-screen selection:bg-bat-yellow selection:text-gotham-black">
      <Navigation />

      <main className="pt-[calc(var(--nav-height)+1.5rem)] pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb Navigation */}
          <div className="mb-6 flex items-center justify-between no-print">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-mono text-xs text-bat-muted hover:text-bat-yellow transition-colors group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>{isBatmanMode ? 'RETURN TO BASE TERMINAL' : 'BACK TO PORTFOLIO'}</span>
            </Link>

            <div className="flex items-center gap-2 text-xs font-mono text-bat-muted">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="hidden sm:inline">STATUS:</span>
              <span className="text-emerald-400 font-bold">OPERATIONAL PARAMETERS ACTIVE</span>
            </div>
          </div>

          {/* Document Header Hero Banner */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 p-6 sm:p-8 bg-gotham-charcoal border border-gotham-border rounded-lg relative overflow-hidden shadow-bat-card"
          >
            {/* Left Accent Bar: Neon Green in all modes */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500 shadow-[0_0_12px_#10B981]" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-gotham-surface border border-gotham-border rounded text-emerald-400">
                  <Scale className="w-7 h-7" />
                </div>
                <div>
                  <span className="font-mono text-[11px] text-emerald-400 tracking-wider uppercase font-semibold block">
                    {intro.badge}
                  </span>
                  <h1 className="font-display font-black text-2xl sm:text-4xl text-bat-offwhite tracking-wide">
                    {metadata.title.toUpperCase()}
                  </h1>
                </div>
              </div>

              {/* Document Metadata Badges */}
              <div className="flex flex-wrap sm:flex-col sm:items-end gap-1.5 font-mono text-[11px] text-bat-muted">
                <span className="px-2 py-0.5 bg-gotham-surface border border-gotham-border rounded">
                  DOSSIER: <span className="text-bat-offwhite font-bold">{metadata.documentCode}</span>
                </span>
                <span className="px-2 py-0.5 bg-gotham-surface border border-gotham-border rounded">
                  VERSION: <span className="text-emerald-400 font-bold">{metadata.version}</span>
                </span>
                <span className="px-2 py-0.5 bg-gotham-surface border border-gotham-border rounded">
                  LAST UPDATED: <span className="text-bat-offwhite">{metadata.lastUpdated.toUpperCase()}</span>
                </span>
              </div>
            </div>

            {/* Sub-Headline & Summary */}
            <p className="text-sm sm:text-base text-bat-offwhite/90 leading-relaxed font-sans mb-6">
              {intro.summary}
            </p>

            {/* Quick Metadata Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-gotham-border/60 text-xs font-mono">
              <div className="flex flex-col">
                <span className="text-bat-muted uppercase text-[10px]">Operator:</span>
                <span className="text-bat-offwhite font-bold">{metadata.operatorName}</span>
                <span className="text-bat-muted text-[10px]">{metadata.operatorRole}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-bat-muted uppercase text-[10px]">Governing Jurisdiction:</span>
                <span className="text-bat-offwhite font-bold">New Delhi, India</span>
                <span className="text-bat-muted text-[10px]">Substantive Law of Republic of India</span>
              </div>
              <div className="flex flex-col">
                <span className="text-bat-muted uppercase text-[10px]">Legal Communications:</span>
                <a
                  href={`mailto:${metadata.contactEmail}`}
                  className="text-emerald-400 hover:underline font-bold truncate"
                >
                  {metadata.contactEmail}
                </a>
                <span className="text-bat-muted text-[10px]">Response Window: 48h</span>
              </div>
            </div>
          </motion.div>

          {/* Action Toolbar: Download PDF, Print, Share, Verified Badge */}
          <div className="mb-10 p-4 sm:p-5 bg-gotham-surface border border-gotham-border rounded-lg flex flex-wrap items-center justify-between gap-4 no-print shadow-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
              <span className="font-mono text-xs text-bat-offwhite">
                LEGAL SPECIFICATION · STANDARDIZED OPERATIONAL CONTRACT
              </span>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-gotham-black font-display font-bold text-xs tracking-wider rounded transition-colors shadow-sm"
                title="Download verified A4 PDF document"
              >
                <Download size={14} />
                <span>DOWNLOAD PDF</span>
              </button>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-gotham-charcoal hover:bg-gotham-border text-bat-offwhite border border-gotham-border rounded font-mono text-xs transition-colors"
                title="Print this document or export to PDF"
              >
                <Printer size={14} className="text-bat-muted" />
                <span className="hidden sm:inline">PRINT</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-gotham-charcoal hover:bg-gotham-border text-bat-offwhite border border-gotham-border rounded font-mono text-xs transition-colors"
                title="Copy canonical link to clipboard"
              >
                {copiedLink ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} className="text-bat-muted" />}
                <span>{copiedLink ? 'COPIED!' : 'SHARE'}</span>
              </button>
            </div>
          </div>

          {/* Table of Contents Grid */}
          <nav className="mb-12 p-6 bg-gotham-charcoal/70 border border-gotham-border rounded-lg no-print">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gotham-border/60">
              <h2 className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
                <FileText size={15} />
                <span>TABLE OF CONTENTS // OPERATIONAL CLAUSES</span>
              </h2>
              <span className="text-[10px] font-mono text-bat-muted">
                {sections.length} CLAUSES
              </span>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
              {sections.map((sec) => (
                <li key={sec.id}>
                  <a
                    href={`#${sec.id}`}
                    className="p-1.5 rounded hover:bg-gotham-surface text-bat-muted hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-emerald-500/80 group-hover:text-emerald-400 font-bold w-6">
                      {sec.number}.
                    </span>
                    <span className="truncate">{sec.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* SECTIONS */}
          <div className="space-y-10 text-bat-offwhite/90 leading-relaxed font-sans">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="p-6 sm:p-8 bg-gotham-charcoal/40 border border-gotham-border/80 rounded-lg relative scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-4 pb-2 border-b border-gotham-border/50">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                    CLAUSE {section.number}
                  </span>
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-bat-offwhite tracking-wide">
                    {section.title}
                  </h2>
                </div>

                {section.summary && (
                  <p className="font-mono text-xs text-emerald-400/90 mb-4 bg-emerald-500/5 px-3 py-1.5 rounded border border-emerald-500/20">
                    {section.summary}
                  </p>
                )}

                <div className="space-y-3.5 text-sm sm:text-base text-bat-offwhite/85">
                  {section.paragraphs.map((p, idx) => {
                    const isFlag = p.startsWith('FLAG FOR OPERATOR CONFIRMATION:');
                    return (
                      <p
                        key={idx}
                        className={
                          isFlag
                            ? 'p-3 bg-amber-500/10 border-l-4 border-amber-500 text-amber-200 text-xs font-mono rounded-r'
                            : ''
                        }
                      >
                        {p}
                      </p>
                    );
                  })}
                </div>

                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <ul className="mt-4 space-y-2 text-xs sm:text-sm font-sans pl-1">
                    {section.bulletPoints.map((bp, bidx) => (
                      <li key={bidx} className="flex items-start gap-2.5">
                        <span className="text-emerald-400 font-bold mt-1 text-xs">◆</span>
                        <span className="text-bat-offwhite/80">{bp}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Direct Legal Contact Box */}
          <div className="mt-16 p-8 bg-gotham-charcoal border border-gotham-border rounded-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
            <h2 className="font-display font-bold text-2xl text-bat-offwhite mb-2">
              Questions Regarding Terms or Commercial Licensing?
            </h2>
            <p className="text-sm text-bat-offwhite/80 font-sans mb-6 max-w-2xl">
              For commercial enterprise licensing, code audits, service level discussions, or formal legal correspondence, contact our engineering lead directly:
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${metadata.contactEmail}?subject=Terms%20and%20Licensing%20Inquiry%20-%20FuzailVerse`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-gotham-black font-display font-bold text-sm tracking-wider rounded transition-colors shadow-sm"
              >
                <span>TRANSMIT LEGAL INQUIRY</span>
                <ExternalLink size={14} />
              </a>

              <a
                href={metadata.pdfPath}
                download={metadata.pdfFileName}
                className="inline-flex items-center gap-2 px-5 py-3 bg-gotham-surface hover:bg-gotham-border text-bat-offwhite border border-gotham-border font-mono text-xs tracking-wider rounded transition-colors"
              >
                <Download size={14} className="text-emerald-400" />
                <span>DOWNLOAD VERIFIED DOSSIER (PDF)</span>
              </a>
            </div>
          </div>

        </div>
      </main>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-3 bg-emerald-500 hover:bg-emerald-400 text-gotham-black rounded-full shadow-lg transition-all no-print"
          title="Back to Top"
          aria-label="Back to Top"
        >
          <ArrowUp size={18} />
        </button>
      )}

      <Footer />
    </div>
  );
};
