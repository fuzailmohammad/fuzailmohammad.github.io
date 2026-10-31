import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Download,
  Printer,
  ArrowLeft,
  ArrowUp,
  Mail,
} from 'lucide-react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { useTheme } from './ThemeProvider';
import { privacyPolicyData } from '../data/legalData';

export const PrivacyPolicy: React.FC = () => {
  const { isBatmanMode } = useTheme();
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  const { metadata, notice, sections } = privacyPolicyData;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    document.title = 'Privacy Policy | FuzailVerse';

    const updateMetaTag = (attrName: string, attrVal: string, content: string) => {
      let el = document.querySelector(`meta[${attrName}="${attrVal}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    updateMetaTag('name', 'description', 'General Privacy Policy for FuzailVerse apps and digital services.');
    updateMetaTag('property', 'og:title', 'Privacy Policy | FuzailVerse');
    updateMetaTag('property', 'og:description', 'General Privacy Policy for FuzailVerse apps and digital services.');
    updateMetaTag('property', 'og:url', metadata.websiteUrl);
    updateMetaTag('property', 'og:type', 'article');

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

  const handlePrint = () => {
    window.print();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gotham-black text-bat-offwhite min-h-screen selection:bg-bat-yellow selection:text-gotham-black transition-colors duration-300">
      <Navigation />

      <main className="pt-[calc(var(--nav-height)+2rem)] pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb Navigation */}
          <div className="mb-6 no-print">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-mono text-xs text-bat-muted hover:text-bat-yellow transition-colors group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>{isBatmanMode ? 'RETURN TO BASE' : 'BACK TO HOME'}</span>
            </Link>
          </div>

          {/* Document Header Card */}
          <div className="mb-8 p-6 sm:p-8 bg-gotham-surface border border-gotham-border rounded-lg shadow-sm">
            <h1 className="font-display font-black text-3xl sm:text-5xl text-bat-offwhite tracking-tight mb-2">
              {metadata.title.toUpperCase()}
            </h1>
            <p className="text-sm sm:text-base text-bat-muted font-sans mb-4">
              {metadata.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-bat-muted pt-4 border-t border-gotham-border/60">
              <span>
                Effective date: <strong className="text-bat-offwhite">{metadata.effectiveDate}</strong>
              </span>
              <span className="text-gotham-border">•</span>
              <span>
                Last updated: <strong className="text-bat-offwhite">{metadata.lastUpdated}</strong>
              </span>
              <span className="text-gotham-border">•</span>
              <span>
                Contact:{' '}
                <a
                  href={`mailto:${metadata.contactEmail}`}
                  className="text-bat-yellow hover:underline"
                >
                  {metadata.contactEmail}
                </a>
              </span>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="mb-8 p-4 sm:p-5 bg-gotham-charcoal border border-gotham-border rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
            <p className="text-xs sm:text-sm text-bat-muted font-sans">
              Download a verified PDF copy for your records or print this document.
            </p>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={metadata.pdfPath}
                download={metadata.pdfFileName}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-bat-yellow text-gotham-black font-display font-bold text-xs tracking-wider rounded hover:bg-white transition-colors shadow-sm"
              >
                <Download size={14} />
                <span>DOWNLOAD PDF</span>
              </a>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-gotham-surface hover:bg-gotham-border text-bat-offwhite hover:text-bat-yellow border border-gotham-border rounded font-mono text-xs transition-colors"
                title="Print this document or export to PDF"
              >
                <Printer size={14} className="text-bat-muted" />
                <span>PRINT</span>
              </button>
            </div>
          </div>

          {/* Regulatory Context Notice */}
          <div className="mb-8 p-4 bg-gotham-surface border-l-4 border-l-bat-yellow border-y border-r border-gotham-border rounded-r-lg text-xs font-sans text-bat-muted leading-relaxed">
            <strong className="text-bat-offwhite font-mono uppercase text-[11px] block mb-1">
              Framework Notice:
            </strong>
            {notice}
          </div>

          {/* Table of Contents */}
          <nav className="mb-10 p-6 bg-gotham-surface border border-gotham-border rounded-lg no-print">
            <h2 className="font-mono text-xs uppercase tracking-widest text-bat-yellow font-bold mb-4">
              TABLE OF CONTENTS
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-bat-muted hover:text-bat-yellow transition-colors flex items-center gap-2 py-1"
                  >
                    <span className="text-bat-yellow/70 font-semibold">{section.number}.</span>
                    <span className="truncate">{section.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Document Content */}
          <div className="space-y-8 text-bat-offwhite/90 leading-relaxed font-sans">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="p-6 sm:p-7 bg-gotham-surface/60 border border-gotham-border rounded-lg scroll-mt-24"
              >
                <h2 className="font-display font-bold text-xl sm:text-2xl text-bat-offwhite mb-4 pb-2 border-b border-gotham-border/60">
                  <span className="text-bat-yellow mr-2 font-mono text-lg">{section.number}.</span>
                  {section.title}
                </h2>

                <div className="space-y-3.5 text-sm sm:text-base text-bat-offwhite/85 leading-relaxed">
                  {section.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Contact Box */}
          <div className="mt-12 p-6 sm:p-8 bg-gotham-surface border border-gotham-border rounded-lg">
            <h2 className="font-display font-bold text-xl sm:text-2xl text-bat-offwhite mb-2">
              Questions or Requests?
            </h2>
            <p className="text-sm text-bat-muted font-sans mb-4">
              If you have any questions about this Privacy Policy or wish to make a privacy request, please contact:
            </p>
            <a
              href={`mailto:${metadata.contactEmail}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gotham-charcoal hover:bg-gotham-border border border-gotham-border text-bat-yellow font-mono text-xs rounded transition-colors"
            >
              <Mail size={14} />
              <span>{metadata.contactEmail}</span>
            </a>
          </div>

        </div>
      </main>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-3 bg-bat-yellow text-gotham-black rounded-full shadow-bat-card hover:bg-white transition-colors no-print"
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
