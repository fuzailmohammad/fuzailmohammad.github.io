import React, { useEffect } from 'react';
import { Download, FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { useTheme } from './ThemeProvider';

export const PrivacyPolicy: React.FC = () => {
  const { isBatmanMode } = useTheme();
  useEffect(() => {
    window.scrollTo(0, 0);

    // Update SEO meta tags
    document.title = 'Privacy Policy | Mohammad Fuzail - Mobile Systems Architect';

    const updateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMeta('description', "Privacy Policy for Mohammad Fuzail's portfolio website. Learn how we handle information.");

    return () => {
      document.title = 'Mohammad Fuzail - Senior Flutter Developer | Mobile App Specialist';
    };
  }, []);

  const handleDownload = () => {
    const pdfUrl = '/documents/privacy-policy.pdf';
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isIOS) {
      window.open(pdfUrl, '_blank');
    } else {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'privacy-policy.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const sections = [
    { id: 'information-collection', title: 'Information We Collect' },
    { id: 'information-usage', title: 'How We Use Your Information' },
    { id: 'information-sharing', title: 'Information Sharing' },
    { id: 'data-security', title: 'Data Security' },
    { id: 'cookies', title: 'Cookies and Tracking' },
    { id: 'user-rights', title: 'Your Rights' },
    { id: 'children-privacy', title: "Children's Privacy" },
    { id: 'policy-changes', title: 'Changes to This Policy' },
    { id: 'contact', title: 'Contact Information' },
  ];

  return (
    <div className="bg-gotham-black text-bat-offwhite min-h-screen">
      <Navigation />

      <main className="pt-[calc(var(--nav-height)+2rem)] pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-bat-yellow hover:underline mb-6"
            >
              <ArrowLeft size={14} />
              {isBatmanMode ? 'RETURN TO BASE' : 'BACK TO HOME'}
            </Link>

            <div className="p-8 bg-gotham-charcoal border border-gotham-border rounded-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-bat-yellow" />
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gotham-surface border border-gotham-border rounded text-bat-yellow">
                  <FileText className="w-8 h-8" />
                </div>
                <div>
                  <span className="font-mono text-xs text-bat-yellow uppercase tracking-widest">
                    {isBatmanMode ? 'LEGAL SPECIFICATION // DOSSIER-PP' : 'LEGAL NOTICE // PRIVACY POLICY'}
                  </span>
                  <h1 className="font-display font-black text-3xl sm:text-4xl text-bat-offwhite">
                    PRIVACY POLICY
                  </h1>
                </div>
              </div>
              <p className="font-mono text-xs text-bat-muted">
                {isBatmanMode ? 'LAST UPDATED: SEPTEMBER 2026 // COMPLIANCE MATRIX ACTIVE' : 'LAST UPDATED: SEPTEMBER 2026 // PRIVACY COMPLIANT'}
              </p>
            </div>
          </div>

          {/* Download Action Banner */}
          <div className="bg-gotham-surface border border-gotham-border rounded-lg p-6 mb-8 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="font-display font-bold text-lg text-bat-offwhite mb-1">
                {isBatmanMode ? 'OFFLINE DOSSIER DOWNLOAD' : 'OFFLINE DOCUMENT DOWNLOAD'}
              </h3>
              <p className="font-sans text-xs text-bat-muted">
                Download a verified PDF copy for your records
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-bat-yellow text-gotham-black font-display font-bold text-sm tracking-wider hover:bg-white transition-colors"
            >
              <Download size={16} />
              DOWNLOAD PDF
            </button>
          </div>

          {/* Table of Contents */}
          <nav className="bg-gotham-charcoal/80 border border-gotham-border rounded-lg p-6 mb-10">
            <h3 className="font-mono text-xs uppercase tracking-widest text-bat-yellow mb-4">
              TABLE OF CONTENTS
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              {sections.map((section, idx) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-bat-muted hover:text-bat-yellow transition-colors flex items-center gap-2"
                  >
                    <span className="text-bat-yellow/60">0{idx + 1}.</span>
                    <span>{section.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Content Body */}
          <div className="space-y-8 text-bat-offwhite/85 text-sm sm:text-base leading-relaxed">
            <section id="information-collection" className="p-6 bg-gotham-charcoal/40 border border-gotham-border/60 rounded">
              <h2 className="font-display font-bold text-xl text-bat-yellow mb-3">
                1. Information We Collect
              </h2>
              <p className="text-bat-offwhite/80 mb-3">
                {isBatmanMode
                  ? 'We may collect personal information voluntarily submitted through the portfolio dispatch terminal, including:'
                  : 'We may collect personal information voluntarily submitted through the portfolio contact form, including:'}
              </p>
              <ul className="list-disc pl-6 space-y-1 text-bat-muted font-mono text-xs">
                <li>{isBatmanMode ? 'Name and operative identifier' : 'Name and contact identity'}</li>
                <li>{isBatmanMode ? 'Return transmission frequency (Email address)' : 'Email address and phone number'}</li>
                <li>{isBatmanMode ? 'Project scopes and mission parameters' : 'Project inquiries and message details'}</li>
                <li>{isBatmanMode ? 'Anonymous telemetry and performance analytics' : 'Anonymous performance and usage analytics'}</li>
              </ul>
            </section>

            <section id="information-usage" className="p-6 bg-gotham-charcoal/40 border border-gotham-border/60 rounded">
              <h2 className="font-display font-bold text-xl text-bat-yellow mb-3">
                2. How We Use Your Information
              </h2>
              <p className="text-bat-offwhite/80">
                Data collected is strictly deployed to respond to client and engineering inquiries, maintain high availability of portfolio services, and coordinate technical architecture consultations.
              </p>
            </section>

            <section id="data-security" className="p-6 bg-gotham-charcoal/40 border border-gotham-border/60 rounded">
              <h2 className="font-display font-bold text-xl text-bat-yellow mb-3">
                3. Data Security Protocols
              </h2>
              <p className="text-bat-offwhite/80">
                Rigorous transmission encryption standards (TLS/HTTPS) and minimal data retention protocols are maintained. No personal telemetry is sold, traded, or shared with unauthorized commercial entities.
              </p>
            </section>

            <section id="contact" className="p-6 bg-gotham-surface border border-gotham-border rounded">
              <h2 className="font-display font-bold text-xl text-bat-yellow mb-2">
                4. Legal Contact
              </h2>
              <p className="text-bat-muted text-xs font-mono mb-2">
                DIRECT INQUIRIES REGARDING DATA GOVERNANCE:
              </p>
              <a
                href="mailto:mohdfuzail00786@gmail.com"
                className="font-mono text-sm text-bat-offwhite hover:text-bat-yellow transition-colors underline"
              >
                mohdfuzail00786@gmail.com
              </a>
            </section>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};
