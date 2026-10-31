import React, { useEffect, useState, useMemo } from 'react';
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
  Shield,
  Smartphone,
  ExternalLink,
  Check,
  Search,
} from 'lucide-react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { useTheme } from './ThemeProvider';
import { privacyPolicyData } from '../data/legalData';

export const PrivacyPolicy: React.FC = () => {
  const { isBatmanMode } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const [selectedAppId, setSelectedAppId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const { metadata, intro, generalSections, appDisclosures } = privacyPolicyData;

  // SEO & Scroll setup
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    document.title = 'Privacy Policy | FuzailVerse - Comprehensive Data Governance';

    const updateMetaTag = (attrName: string, attrVal: string, content: string) => {
      let el = document.querySelector(`meta[${attrName}="${attrVal}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    updateMetaTag('name', 'description', 'FuzailVerse Privacy Policy: Comprehensive data governance, hardware permissions, offline SQLite persistence, and app-specific privacy disclosures for all mobile systems.');
    updateMetaTag('property', 'og:title', 'Privacy Policy | FuzailVerse');
    updateMetaTag('property', 'og:description', 'Comprehensive mobile privacy disclosures, permission rationale, and telemetry guidelines across all FuzailVerse applications.');
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

  // Filtered Apps
  const filteredApps = useMemo(() => {
    return appDisclosures.filter((app) => {
      const matchesApp = selectedAppId === 'all' || app.id === selectedAppId;
      const matchesSearch =
        searchQuery.trim() === '' ||
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.permissions.some((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesApp && matchesSearch;
    });
  }, [appDisclosures, selectedAppId, searchQuery]);

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
              <span className="text-emerald-400 font-bold">COMPLIANCE ACTIVE</span>
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
                  <Shield className="w-7 h-7" />
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
                <span className="text-bat-muted uppercase text-[10px]">Data Operator:</span>
                <span className="text-bat-offwhite font-bold">{metadata.operatorName}</span>
                <span className="text-bat-muted text-[10px]">{metadata.operatorRole}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-bat-muted uppercase text-[10px]">Territorial Jurisdiction:</span>
                <span className="text-bat-offwhite font-bold">{metadata.operatorLocation}</span>
                <span className="text-bat-muted text-[10px]">Global Edge CDN Deployment</span>
              </div>
              <div className="flex flex-col">
                <span className="text-bat-muted uppercase text-[10px]">Direct Governance Contact:</span>
                <a
                  href={`mailto:${metadata.contactEmail}`}
                  className="text-emerald-400 hover:underline font-bold truncate"
                >
                  {metadata.contactEmail}
                </a>
                <span className="text-bat-muted text-[10px]">Formal SLA Response: 48h</span>
              </div>
            </div>
          </motion.div>

          {/* Action Toolbar: Download PDF, Print, Share, Verified Badge */}
          <div className="mb-10 p-4 sm:p-5 bg-gotham-surface border border-gotham-border rounded-lg flex flex-wrap items-center justify-between gap-4 no-print shadow-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
              <span className="font-mono text-xs text-bat-offwhite">
                OFFICIAL VERIFIED PUBLICATION · AUDITED AGAINST LIVE CODEBASES
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
                <span>TABLE OF CONTENTS // DOCUMENT NAVIGATION</span>
              </h2>
              <span className="text-[10px] font-mono text-bat-muted">
                {generalSections.length + 1} CORE DOMAINS
              </span>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
              {generalSections.map((sec) => (
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
              <li>
                <a
                  href="#app-specific-disclosures"
                  className="p-1.5 rounded bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 font-bold transition-colors flex items-center gap-2"
                >
                  <span className="w-6">APP.</span>
                  <span className="truncate">App-Specific Disclosures (8 Production Systems)</span>
                </a>
              </li>
            </ul>
          </nav>

          {/* GENERAL POLICY SECTIONS */}
          <div className="space-y-10 text-bat-offwhite/90 leading-relaxed font-sans">
            {generalSections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="p-6 sm:p-8 bg-gotham-charcoal/40 border border-gotham-border/80 rounded-lg relative scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-4 pb-2 border-b border-gotham-border/50">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                    SECTION {section.number}
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
                  {section.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
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

                {section.subsections && section.subsections.length > 0 && (
                  <div className="mt-6 space-y-5 pt-4 border-t border-gotham-border/50">
                    {section.subsections.map((sub) => (
                      <div key={sub.id} className="p-4 bg-gotham-surface/60 border border-gotham-border/60 rounded">
                        <h3 className="font-display font-bold text-base sm:text-lg text-emerald-400 mb-2">
                          {sub.subtitle}
                        </h3>
                        <div className="space-y-2 text-xs sm:text-sm text-bat-offwhite/80">
                          {sub.content.map((cp, cidx) => (
                            <p key={cidx}>{cp}</p>
                          ))}
                        </div>
                        {sub.bulletPoints && sub.bulletPoints.length > 0 && (
                          <ul className="mt-3 space-y-1.5 text-xs font-mono text-bat-muted pl-1">
                            {sub.bulletPoints.map((sbp, sidx) => (
                              <li key={sidx} className="flex items-start gap-2">
                                <span className="text-bat-muted">-</span>
                                <span>{sbp}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}

            {/* APP-SPECIFIC DISCLOSURES SECTION */}
            <section
              id="app-specific-disclosures"
              className="p-6 sm:p-8 bg-gotham-charcoal border-2 border-emerald-500/40 rounded-lg relative scroll-mt-24 shadow-bat-card"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gotham-border">
                <div>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold">
                    SPECIAL AUDIT MATRIX // 8 PRODUCTION SYSTEMS
                  </span>
                  <h2 className="font-display font-black text-2xl sm:text-3xl text-bat-offwhite mt-2">
                    APP-SPECIFIC PRIVACY & TELEMETRY DISCLOSURES
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <Smartphone size={16} />
                  <span>PER-APPLICATION GRANULARITY</span>
                </div>
              </div>

              <p className="text-sm text-bat-offwhite/85 mb-6">
                Data practices differ fundamentally between a consumer loyalty application, an automotive parts catalog, an offline clinic records database, and a GPS-verified field operations tool. Below is the verified architectural disclosure for every single mobile system and web property in the FuzailVerse portfolio:
              </p>

              {/* Interactive App Selector Tabs & Search Filter */}
              <div className="mb-8 space-y-3 no-print">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    <button
                      onClick={() => setSelectedAppId('all')}
                      className={`px-3 py-1.5 rounded text-xs font-mono whitespace-nowrap transition-colors ${
                        selectedAppId === 'all'
                          ? 'bg-emerald-500 text-gotham-black font-bold'
                          : 'bg-gotham-surface text-bat-muted hover:text-bat-offwhite border border-gotham-border'
                      }`}
                    >
                      ALL APPS ({appDisclosures.length})
                    </button>
                    {appDisclosures.map((app) => (
                      <button
                        key={app.id}
                        onClick={() => setSelectedAppId(app.id)}
                        className={`px-3 py-1.5 rounded text-xs font-mono whitespace-nowrap transition-colors ${
                          selectedAppId === app.id
                            ? 'bg-emerald-500 text-gotham-black font-bold'
                            : 'bg-gotham-surface text-bat-muted hover:text-bat-offwhite border border-gotham-border'
                        }`}
                      >
                        {app.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>

                  <div className="relative min-w-[200px]">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-bat-muted" />
                    <input
                      type="text"
                      placeholder="Filter by feature, permission..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 bg-gotham-surface border border-gotham-border rounded text-xs font-mono text-bat-offwhite placeholder:text-bat-muted focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* App Disclosure Cards */}
              <div className="space-y-8">
                {filteredApps.map((app) => (
                  <article
                    key={app.id}
                    id={app.id}
                    className="p-6 bg-gotham-surface border border-gotham-border rounded-lg relative overflow-hidden transition-all hover:border-emerald-500/60"
                  >
                    {/* Top Identity Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-gotham-border">
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase font-semibold">
                            {app.category}
                          </span>
                          <span className="font-mono text-[10px] text-bat-muted">
                            PLATFORM: {app.platform.join(', ')}
                          </span>
                        </div>
                        <h3 className="font-display font-black text-xl sm:text-2xl text-bat-offwhite">
                          {app.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                          <CheckCircle2 size={12} className="text-emerald-400" />
                          <span>CODEBASE VERIFIED</span>
                        </span>
                      </div>
                    </div>

                    {/* Purpose & Operational Context */}
                    <div className="mb-4">
                      <span className="text-[11px] font-mono text-bat-muted uppercase block mb-1">
                        Purpose & Operational Context:
                      </span>
                      <p className="text-sm text-bat-offwhite/90">
                        {app.purpose}{' '}
                        <span className="text-bat-muted text-xs">({app.operationalContext})</span>
                      </p>
                    </div>

                    {/* Permissions Grid */}
                    <div className="mb-4 p-3.5 bg-gotham-charcoal/80 border border-gotham-border/70 rounded">
                      <span className="text-[11px] font-mono text-emerald-400 uppercase font-bold block mb-2">
                        Device Permissions Requested & Rationale:
                      </span>
                      <ul className="space-y-2 text-xs">
                        {app.permissions.map((perm, pidx) => (
                          <li key={pidx} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                            <span className="font-mono text-bat-offwhite bg-gotham-surface px-1.5 py-0.5 rounded border border-gotham-border/80 text-[11px] font-bold">
                              {perm.name}
                            </span>
                            <span className="text-bat-muted text-[11px] font-mono">[{perm.level}]</span>
                            <span className="text-bat-offwhite/80">{perm.purpose}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Detailed Data Classification Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-xs font-mono">
                      {/* Personal & Tech Data */}
                      <div className="p-3 bg-gotham-charcoal/50 border border-gotham-border/50 rounded">
                        <span className="text-bat-yellow font-bold uppercase block mb-1 text-[11px]">
                          Data Categories Collected:
                        </span>
                        <div className="space-y-1.5 text-bat-offwhite/80">
                          <p>
                            <span className="text-bat-muted">Personal: </span>
                            {app.dataCollected.personal.join(', ')}
                          </p>
                          <p>
                            <span className="text-bat-muted">Technical: </span>
                            {app.dataCollected.technical.join(', ')}
                          </p>
                          {app.dataCollected.transactional.length > 0 && (
                            <p>
                              <span className="text-bat-muted">Transactional: </span>
                              {app.dataCollected.transactional.join(', ')}
                            </p>
                          )}
                          <p>
                            <span className="text-bat-muted">Sensitive Data: </span>
                            <span className={app.dataCollected.sensitive.some(s => s.toLowerCase().includes('sensitive') || s.toLowerCase().includes('identity')) ? 'text-amber-400' : 'text-emerald-400'}>
                              {app.dataCollected.sensitive.join(', ')}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Processing & Persistence */}
                      <div className="p-3 bg-gotham-charcoal/50 border border-gotham-border/50 rounded">
                        <span className="text-emerald-400 font-bold uppercase block mb-1 text-[11px]">
                          Local Processing vs Cloud Sync:
                        </span>
                        <div className="space-y-1.5 text-bat-offwhite/80">
                          <p>
                            <span className="text-bat-muted">Local Device Store: </span>
                            {app.localDataProcessing.join('; ')}
                          </p>
                          <p>
                            <span className="text-bat-muted">Transmission: </span>
                            {app.externalTransmission.join('; ')}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* SDKs, Ads, & Services */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-[11px] font-mono">
                      <div className="p-2.5 bg-gotham-charcoal/30 border border-gotham-border/40 rounded">
                        <span className="text-bat-muted uppercase block text-[10px]">Analytics SDKs:</span>
                        <span className="text-bat-offwhite">{app.analyticsSdk.join(', ')}</span>
                      </div>
                      <div className="p-2.5 bg-gotham-charcoal/30 border border-gotham-border/40 rounded">
                        <span className="text-bat-muted uppercase block text-[10px]">Crash Reporting:</span>
                        <span className="text-bat-offwhite">{app.crashReportingSdk.join(', ')}</span>
                      </div>
                      <div className="p-2.5 bg-gotham-charcoal/30 border border-gotham-border/40 rounded">
                        <span className="text-bat-muted uppercase block text-[10px]">Advertising SDKs:</span>
                        <span className="text-emerald-400 font-bold">{app.advertisingSdk.join(', ')}</span>
                      </div>
                    </div>

                    {/* Retention & Deletion */}
                    <div className="pt-3 border-t border-gotham-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-bat-muted">
                      <div>
                        <span className="text-bat-offwhite font-bold">RETENTION:</span> {app.dataRetention}
                      </div>
                      <div className="text-right">
                        <span className="text-bat-offwhite font-bold">DELETION:</span> {app.dataDeletion}
                      </div>
                    </div>
                  </article>
                ))}

                {filteredApps.length === 0 && (
                  <div className="p-8 text-center bg-gotham-surface border border-gotham-border rounded-lg">
                    <p className="font-mono text-sm text-bat-muted">
                      No applications matched your search query [ {searchQuery} ].
                    </p>
                    <button
                      onClick={() => {
                        setSelectedAppId('all');
                        setSearchQuery('');
                      }}
                      className="mt-3 px-4 py-1.5 bg-emerald-500 text-gotham-black font-mono text-xs font-bold rounded"
                    >
                      RESET FILTERS
                    </button>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Direct Governance Contact Box */}
          <div className="mt-16 p-8 bg-gotham-charcoal border border-gotham-border rounded-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
            <h2 className="font-display font-bold text-2xl text-bat-offwhite mb-2">
              Questions Regarding Data Governance or Permissions?
            </h2>
            <p className="text-sm text-bat-offwhite/80 font-sans mb-6 max-w-2xl">
              For technical inquiries regarding mobile permissions, offline SQLite persistence, enterprise audits, or account deletion requests, communicate directly with our engineering lead:
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${metadata.contactEmail}?subject=Privacy%20Governance%20Inquiry%20-%20FuzailVerse`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-gotham-black font-display font-bold text-sm tracking-wider rounded transition-colors shadow-sm"
              >
                <span>TRANSMIT PRIVACY INQUIRY</span>
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
