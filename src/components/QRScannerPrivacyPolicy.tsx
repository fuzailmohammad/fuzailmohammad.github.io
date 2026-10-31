import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Printer,
  ArrowLeft,
  ArrowUp,
  Mail,
  ShieldCheck,
  Smartphone,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { useTheme } from './ThemeProvider';
import {
  qrScannerLegalMetadata,
  qrScannerNotice,
  qrScannerSections,
} from '../data/qrScannerLegalData';

export const QRScannerPrivacyPolicy: React.FC = () => {
  const { isBatmanMode } = useTheme();
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  const metadata = qrScannerLegalMetadata;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const pageTitle = 'QR Scanner & Barcode Scanner – Privacy Policy | FuzailVerse';
    const pageDescription =
      'Privacy Policy for FuzailVerse QR Scanner & Generator. Learn how camera access, scan history, Firebase Analytics and Crashlytics data are handled.';

    document.title = pageTitle;

    const updateMetaTag = (attrName: string, attrVal: string, content: string) => {
      let el = document.querySelector(`meta[${attrName}="${attrVal}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    updateMetaTag('name', 'description', pageDescription);
    updateMetaTag('property', 'og:title', pageTitle);
    updateMetaTag('property', 'og:description', pageDescription);
    updateMetaTag('property', 'og:url', metadata.canonicalUrl);
    updateMetaTag('property', 'og:type', 'article');
    updateMetaTag('name', 'twitter:title', pageTitle);
    updateMetaTag('name', 'twitter:description', pageDescription);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = metadata.canonicalUrl;

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.title = 'Mohd Fuzail - Senior Flutter Developer | Mobile Application Specialist';
    };
  }, [metadata.canonicalUrl]);

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
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-gotham-charcoal border border-gotham-border text-bat-yellow font-mono text-xs uppercase tracking-wider">
              <Smartphone size={13} />
              <span>Android Application Privacy Policy</span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-5xl text-bat-offwhite tracking-tight mb-2">
              {metadata.appName.toUpperCase()}
            </h1>
            <p className="text-base sm:text-lg text-bat-muted font-sans mb-4">
              {metadata.subtitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-gotham-border/60 text-xs font-mono text-bat-muted">
              <div>
                <span>Application ID: </span>
                <strong className="text-bat-offwhite font-mono">{metadata.packageName}</strong>
              </div>
              <div>
                <span>Publisher: </span>
                <strong className="text-bat-offwhite font-sans">{metadata.operatorName} ({metadata.developerBrand})</strong>
              </div>
              <div>
                <span>Effective Date: </span>
                <strong className="text-bat-offwhite font-sans">{metadata.effectiveDate}</strong>
              </div>
              <div>
                <span>Last Updated: </span>
                <strong className="text-bat-offwhite font-sans">{metadata.lastUpdated}</strong>
              </div>
              <div className="sm:col-span-2">
                <span>Privacy Contact: </span>
                <a
                  href={`mailto:${metadata.contactEmail}`}
                  className="text-bat-yellow hover:underline"
                >
                  {metadata.contactEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="mb-8 p-4 sm:p-5 bg-gotham-charcoal border border-gotham-border rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
            <p className="text-xs sm:text-sm text-bat-muted font-sans">
              This document is publicly accessible and can be read online or printed directly from your browser.
            </p>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-bat-yellow text-gotham-black font-display font-bold text-xs tracking-wider rounded hover:bg-white transition-colors shadow-sm"
                title="Print this privacy policy or save as PDF"
              >
                <Printer size={14} />
                <span>PRINT DOCUMENT</span>
              </button>
            </div>
          </div>

          {/* Application-Specific Notice */}
          <div className="mb-8 p-4 bg-gotham-surface border-l-4 border-l-bat-yellow border-y border-r border-gotham-border rounded-r-lg text-xs font-sans text-bat-muted leading-relaxed">
            <div className="flex items-center gap-2 text-bat-offwhite font-mono uppercase text-[11px] font-bold mb-1">
              <ShieldCheck size={14} className="text-bat-yellow" />
              <span>Application Notice:</span>
            </div>
            {qrScannerNotice}
          </div>

          {/* Table of Contents */}
          <nav className="mb-10 p-6 bg-gotham-surface border border-gotham-border rounded-lg no-print">
            <h2 className="font-mono text-xs uppercase tracking-widest text-bat-yellow font-bold mb-4">
              TABLE OF CONTENTS
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
              {qrScannerSections.map((section) => (
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

          {/* Document Sections */}
          <div className="space-y-8 text-bat-offwhite/90 leading-relaxed font-sans">
            {qrScannerSections.map((section) => (
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

                {/* Optional List Items */}
                {section.listItems && section.listItems.length > 0 && (
                  <ul className="mt-4 space-y-2 text-sm sm:text-base text-bat-offwhite/85">
                    {section.listItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 size={16} className="text-bat-yellow shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Optional Structured Table */}
                {section.table && (
                  <div className="mt-5 overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans">
                      <thead>
                        <tr className="border-b border-gotham-border bg-gotham-charcoal">
                          {section.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="p-3 font-mono font-bold text-bat-yellow uppercase text-xs">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gotham-border/40">
                        {section.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-gotham-surface/80 transition-colors">
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className={`p-3 ${
                                  cIdx === 0
                                    ? 'font-medium text-bat-offwhite font-mono text-xs'
                                    : cIdx === 1 && cell.startsWith('NO')
                                    ? 'text-emerald-400 font-semibold'
                                    : cIdx === 1 && cell.startsWith('YES')
                                    ? 'text-bat-yellow font-semibold'
                                    : 'text-bat-muted'
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Contact Box */}
          <div className="mt-12 p-6 sm:p-8 bg-gotham-surface border border-gotham-border rounded-lg">
            <h2 className="font-display font-bold text-xl sm:text-2xl text-bat-offwhite mb-2">
              Privacy Inquiries & Support
            </h2>
            <p className="text-sm text-bat-muted font-sans mb-4">
              If you have any questions, feedback, or data requests concerning QR Scanner &amp; Generator, please contact us directly:
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${metadata.contactEmail}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gotham-charcoal hover:bg-gotham-border border border-gotham-border text-bat-yellow font-mono text-xs rounded transition-colors"
              >
                <Mail size={14} />
                <span>{metadata.contactEmail}</span>
              </a>
              <a
                href="https://fuzailverse.pages.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gotham-surface hover:bg-gotham-border border border-gotham-border text-bat-offwhite hover:text-bat-yellow font-mono text-xs rounded transition-colors"
              >
                <ExternalLink size={14} />
                <span>FuzailVerse Publisher Home</span>
              </a>
            </div>
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

export default QRScannerPrivacyPolicy;
