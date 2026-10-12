import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion';
import { Github, Smartphone, FileText, ArrowUpRight, ArrowRight, Eye, X, Cpu, CheckCircle } from 'lucide-react';
import { projectsData, CaseFileProject } from '../data/projects';
import { useTheme } from './ThemeProvider';

export const Projects: React.FC = () => {
  const [activeDossier, setActiveDossier] = useState<CaseFileProject | null>(null);
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const { isBatmanMode } = useTheme();

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveDossier(null);
    };
    if (activeDossier) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeDossier]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="projects"
      className="relative py-24 sm:py-28 lg:py-32 bg-gotham-dark overflow-hidden border-b border-gotham-border"
    >
      {/* Background Halftone & Corner Grid */}
      <div className="absolute top-0 left-0 w-80 h-80 gotham-halftone-bg opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 gotham-grid-bg opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          className="flex flex-col mb-16"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2 font-mono text-xs tracking-widest text-bat-yellow">
            <span>{isBatmanMode ? '// ARCHIVAL INVESTIGATION' : '// FEATURED WORK'}</span>
            <span className="w-12 h-[1px] bg-bat-yellow" />
            <span>{isBatmanMode ? 'CONFIDENTIAL DOSSIERS' : 'SELECTED CLIENT & PRODUCT WORK'}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-bat-offwhite">
              <span className="text-bat-yellow mr-3">{projectsData.sectionNumber} //</span>
              {isBatmanMode ? projectsData.sectionTitle : 'FEATURED PROJECTS'}
            </h2>
            <p className="font-mono text-xs tracking-wider text-bat-muted uppercase max-w-md">
              {isBatmanMode ? projectsData.subheading : 'PRODUCTION APPLICATIONS // CROSS-PLATFORM SYSTEMS'}
            </p>
          </div>
          <p className="mt-4 font-sans text-sm sm:text-base text-bat-offwhite/70 max-w-2xl">
            {projectsData.intro}
          </p>
        </motion.div>

        {/* Responsive 2-Column Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {projectsData.projects.map((project: CaseFileProject) => {
            return (
              <motion.div
                key={project.id}
                variants={cardVariants}
                onClick={() => navigate(`/projects/${project.slug}`)}
                className="relative bg-gotham-charcoal/95 border border-gotham-border hover:border-bat-yellow rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(244,196,0,0.14)] flex flex-col group cursor-pointer"
              >
                {/* Case File Header Strip */}
                <div className="px-5 py-3 bg-gotham-surface border-b border-gotham-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-bat-yellow tracking-widest">
                      {isBatmanMode ? project.caseNumber : `PROJECT #${project.caseNumber.replace(/\D/g, '') || '01'}`}
                    </span>
                    <span className="hidden sm:inline-block w-[1px] h-3 bg-gotham-border" />
                    <span className="font-mono text-[10px] text-bat-muted tracking-wider hidden sm:inline-block">
                      {project.classification}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 border border-emerald-800/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {isBatmanMode ? project.status : 'PRODUCTION'}
                  </span>
                </div>

                {/* Case File Visual Imagery Frame with Hover Zoom */}
                <div className="relative aspect-[16/9] w-full bg-gotham-black border-b border-gotham-border overflow-hidden">
                  <img
                    src={project.image}
                    alt={`${project.title} Schematics`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  {/* Subtle Scanlines Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gotham-charcoal via-transparent to-transparent opacity-60" />
                  
                  {/* Corner Accent Brackets */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-bat-yellow pointer-events-none" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-bat-yellow pointer-events-none" />

                  {/* Hover Accent Line */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-bat-yellow transition-all duration-500 group-hover:w-full" />
                </div>

                {/* Case Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Role & Classification Tag */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[11px] text-bat-yellow uppercase tracking-wider font-semibold">
                        {project.role}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-bat-offwhite tracking-wide mb-3 group-hover:text-bat-yellow transition-colors">
                      {project.title}
                    </h3>

                    {/* Short Description */}
                    <p className="font-sans text-sm text-bat-offwhite/80 leading-relaxed mb-5">
                      {project.shortDescription}
                    </p>

                    {/* Technology Stack Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 bg-gotham-surface border border-gotham-border text-[11px] font-mono text-bat-muted group-hover:border-bat-yellow/40 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metrics & External Links Footer */}
                  <div className="pt-4 border-t border-gotham-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Optional Metric Badge */}
                    {project.metrics ? (
                      <div className="flex flex-col">
                        <span className="font-mono font-bold text-sm text-bat-yellow">
                          {project.metrics.primaryMetric}
                        </span>
                        <span className="font-mono text-[9px] text-bat-muted uppercase tracking-wider">
                          {project.metrics.label}
                        </span>
                      </div>
                    ) : (
                      <div className="font-mono text-[10px] text-bat-muted">
                        {isBatmanMode ? 'SECURITY DOSSIER // DEPLOYED' : 'ENTERPRISE APP // PRODUCTION'}
                      </div>
                    )}

                    {/* Action Buttons: Quick Preview + View Full Case Study */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDossier(project);
                        }}
                        className="p-2 bg-gotham-surface hover:bg-gotham-border text-bat-muted hover:text-bat-yellow border border-gotham-border text-xs transition-colors rounded"
                        aria-label={`Quick preview ${project.title}`}
                        title="Quick preview"
                      >
                        <Eye size={14} />
                      </button>

                      <Link
                        to={`/projects/${project.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-bat-yellow/10 hover:bg-bat-yellow text-bat-yellow hover:text-gotham-black border border-bat-yellow/50 hover:border-bat-yellow font-mono text-xs tracking-wider transition-all duration-200 font-bold group/btn"
                        aria-label={`View case study ${project.title}`}
                      >
                        <span>{isBatmanMode ? 'VIEW CASE FILE' : 'VIEW CASE STUDY'}</span>
                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>

      {/* PROJECT DETAIL MODAL */}
      <AnimatePresence>
        {activeDossier && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDossier(null)}
              className="absolute inset-0 bg-gotham-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gotham-charcoal border-2 border-bat-yellow rounded-lg p-6 sm:p-8 shadow-2xl z-10"
              role="dialog"
              aria-modal="true"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveDossier(null)}
                className="absolute top-4 right-4 p-2 bg-gotham-surface border border-gotham-border hover:border-bat-yellow text-bat-muted hover:text-bat-yellow transition-colors rounded"
                aria-label={isBatmanMode ? "Close dossier modal" : "Close project preview modal"}
              >
                <X size={20} />
              </button>

              {/* Modal Header */}
              <div className="mb-6 pb-4 border-b border-gotham-border">
                <div className="flex items-center gap-2 font-mono text-xs text-bat-yellow mb-1">
                  <span>{isBatmanMode ? activeDossier.caseNumber : `PROJECT #${activeDossier.caseNumber.replace(/\D/g, '') || '01'}`}</span>
                  <span>//</span>
                  <span className="text-bat-muted">{activeDossier.classification}</span>
                </div>
                <h3 className="font-display font-black text-3xl sm:text-4xl text-bat-offwhite">
                  {activeDossier.title}
                </h3>
                <p className="font-mono text-xs text-bat-yellow/90 mt-1">
                  {isBatmanMode ? 'TACTICAL ROLE: ' : 'ROLE: '}{activeDossier.role}
                </p>
              </div>

              {/* Artwork Frame */}
              <div className="relative aspect-[16/9] w-full bg-gotham-black border border-gotham-border rounded mb-6 overflow-hidden">
                <img
                  src={activeDossier.image}
                  alt={`${activeDossier.title} Schematics`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description & Overview */}
              <div className="mb-6 space-y-3">
                <h4 className="font-mono text-xs uppercase tracking-widest text-bat-yellow flex items-center gap-2">
                  <FileText size={14} />
                  <span>{isBatmanMode ? 'OPERATIONAL BRIEFING' : 'PROJECT OVERVIEW'}</span>
                </h4>
                <p className="font-sans text-sm sm:text-base text-bat-offwhite/90 leading-relaxed">
                  {activeDossier.shortDescription}
                </p>
              </div>

              {/* Metrics & Architecture Telemetry */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {activeDossier.metrics && (
                  <div className="p-4 bg-gotham-surface border border-gotham-border rounded">
                    <span className="font-mono text-[10px] text-bat-muted uppercase tracking-wider block">
                      MEASURED IMPACT
                    </span>
                    <span className="font-display font-black text-2xl text-bat-yellow">
                      {activeDossier.metrics.primaryMetric}
                    </span>
                    <span className="font-mono text-xs text-bat-offwhite/70 block mt-1">
                      {activeDossier.metrics.label}
                    </span>
                  </div>
                )}

                <div className="p-4 bg-gotham-surface border border-gotham-border rounded">
                  <span className="font-mono text-[10px] text-bat-muted uppercase tracking-wider block">
                    STATUS ASSESSMENT
                  </span>
                  <span className="font-display font-black text-2xl text-emerald-400 flex items-center gap-2">
                    <CheckCircle size={20} />
                    {activeDossier.status}
                  </span>
                  <span className="font-mono text-xs text-bat-offwhite/70 block mt-1">
                    PRODUCTION ACTIVE
                  </span>
                </div>
              </div>

              {/* Technologies Architecture */}
              <div className="mb-8">
                <h4 className="font-mono text-xs uppercase tracking-widest text-bat-yellow mb-3 flex items-center gap-2">
                  <Cpu size={14} />
                  <span>TECHNOLOGY MATRIX</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeDossier.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gotham-surface border border-gotham-border font-mono text-xs text-bat-offwhite"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* External Links Bar */}
              <div className="pt-4 border-t border-gotham-border flex flex-wrap items-center gap-3">
                {activeDossier.links.playStore && (
                  <a
                    href={activeDossier.links.playStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gotham-surface hover:bg-gotham-border text-bat-offwhite hover:text-bat-yellow border border-gotham-border font-mono text-xs tracking-wider transition-colors"
                  >
                    <Smartphone size={14} />
                    <span>PLAY STORE</span>
                  </a>
                )}
                {activeDossier.links.appStore && (
                  <a
                    href={activeDossier.links.appStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gotham-surface hover:bg-gotham-border text-bat-offwhite hover:text-bat-yellow border border-gotham-border font-mono text-xs tracking-wider transition-colors"
                  >
                    <FileText size={14} />
                    <span>APP STORE</span>
                  </a>
                )}
                {activeDossier.links.github && (
                  <a
                    href={activeDossier.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gotham-surface hover:bg-gotham-border text-bat-offwhite hover:text-bat-yellow border border-gotham-border font-mono text-xs tracking-wider transition-colors"
                  >
                    <Github size={14} />
                    <span>REPOSITORY</span>
                  </a>
                )}
                {activeDossier.links.external && (
                  <a
                    href={activeDossier.links.external}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gotham-surface hover:bg-gotham-border text-bat-offwhite hover:text-bat-yellow border border-gotham-border font-mono text-xs tracking-wider transition-colors"
                  >
                    <span>LIVE DEMO</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}

                <Link
                  to={`/projects/${activeDossier.slug}`}
                  onClick={() => setActiveDossier(null)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-bat-yellow text-gotham-black font-mono text-xs font-bold tracking-wider hover:bg-white transition-colors ml-auto"
                >
                  <span>EXPAND FULL CASE FILE</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};