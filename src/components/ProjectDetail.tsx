import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Smartphone,
  Shield,
  Layers,
  Cpu,
  Target,
  CheckCircle2,
  AlertTriangle,
  Award,
  ChevronRight,
  Home,
} from 'lucide-react';
import { projectsData, CaseFileProject } from '../data/projects';
import { ScreenshotGallery } from './ScreenshotGallery';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { useTheme } from './ThemeProvider';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const { isBatmanMode } = useTheme();

  // Locate project by slug or fallback to id
  const projectIndex = projectsData.projects.findIndex(
    (p) => p.slug === slug || p.id === slug
  );
  const project: CaseFileProject | undefined = projectsData.projects[projectIndex];

  // Calculate previous and next dossiers for sequential pagination
  const totalProjects = projectsData.projects.length;
  const prevProject =
    projectIndex > 0 ? projectsData.projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < totalProjects - 1 ? projectsData.projects[projectIndex + 1] : null;

  // Scroll to top and update document SEO title
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (project) {
      document.title = `${project.title} // ${project.caseNumber} - Mohd Fuzail Portfolio`;

      // Update meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute(
        'content',
        `${project.title} Case File: ${project.shortDescription}`
      );
    }

    return () => {
      document.title = 'Mohd Fuzail // Senior Flutter Developer';
    };
  }, [project, slug]);

  // Handle case where project slug does not match any record
  if (!project) {
    return (
      <>
        <Navigation />
        <main className="pt-[var(--nav-height)] min-h-[calc(100vh-var(--nav-height))] flex items-center justify-center bg-gotham-black text-bat-offwhite px-4">
          <div className="max-w-md w-full bg-gotham-charcoal border-2 border-red-500/80 rounded-lg p-8 text-center shadow-2xl">
            <div className="inline-flex p-4 rounded-full bg-red-500/10 text-red-400 mb-4">
              <AlertTriangle size={36} />
            </div>
            <h1 className="font-display font-black text-2xl tracking-wide text-bat-offwhite mb-2">
              {isBatmanMode ? 'CASE FILE SEALED OR MISSING' : 'PROJECT NOT FOUND'}
            </h1>
            <p className="font-mono text-xs text-bat-muted mb-6">
              {isBatmanMode
                ? `SECURITY PROTOCOL // The requested dossier [ ${slug} ] does not exist in the Gotham archives.`
                : `The requested project [ ${slug} ] could not be found.`}
            </p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-bat-yellow text-gotham-black font-mono text-xs font-bold tracking-wider rounded hover:bg-white transition-colors"
            >
              <Home size={14} />
              <span>{isBatmanMode ? 'RETURN TO MAIN TERMINAL' : 'RETURN TO HOME'}</span>
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Animation variants
  const fadeInVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <>
      <Navigation />

      <main className="pt-[var(--nav-height)] bg-gotham-black text-bat-offwhite min-h-screen relative overflow-hidden">
        {/* Subtle Gotham grid and halftone ambient backgrounds */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] gotham-halftone-bg opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] gotham-grid-bg opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative z-10">
          
          {/* Breadcrumb / Return to Archives Link */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gotham-border">
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 font-mono text-xs text-bat-muted hover:text-bat-yellow transition-colors group"
              aria-label={isBatmanMode ? "Return to case files archive" : "Return to all projects"}
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span>{isBatmanMode ? 'RETURN TO ALL CASE FILES' : 'BACK TO ALL PROJECTS'}</span>
            </Link>

            <div className="flex items-center gap-2 font-mono text-[11px] text-bat-muted">
              <span>{isBatmanMode ? 'SECURITY LEVEL // ALPHA' : 'PORTFOLIO // CASE STUDY'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-bat-yellow" />
              <span className="text-bat-yellow font-bold">
                {isBatmanMode ? project.caseNumber : `PROJECT #${project.caseNumber.replace(/\D/g, '') || '01'}`}
              </span>
            </div>
          </div>

          {/* ========================================================
              16. CASE STUDY HERO HEADER
              ======================================================== */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            className="mb-12"
          >
            {/* Classification & Status Bar */}
            <div className="flex flex-wrap items-center gap-3 mb-4 font-mono text-xs">
              <span className="px-2.5 py-1 bg-gotham-surface border border-gotham-border text-bat-yellow font-bold tracking-widest">
                {isBatmanMode ? project.caseNumber : `PROJECT #${project.caseNumber.replace(/\D/g, '') || '01'}`}
              </span>
              <span className="px-2.5 py-1 bg-gotham-charcoal border border-gotham-border text-bat-offwhite/80 tracking-wider">
                {project.classification}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/40 border border-emerald-800/60 text-emerald-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {isBatmanMode ? project.status : 'PRODUCTION'}
              </span>
              <span className="text-bat-muted hidden sm:inline">//</span>
              <span className="text-bat-muted uppercase tracking-wider hidden sm:inline">
                CATEGORY: {project.category}
              </span>
            </div>

            {/* Display Title */}
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-bat-offwhite tracking-tight mb-6">
              {project.title}
            </h1>

            {/* High-Level Overview / Mission Brief */}
            <p className="font-sans text-base sm:text-lg lg:text-xl text-bat-offwhite/85 max-w-4xl leading-relaxed border-l-2 border-bat-yellow/80 pl-4 py-1">
              {project.fullDescription || project.shortDescription}
            </p>
          </motion.div>

          {/* ========================================================
              METADATA & ROLE CROSS-LINKING BAR + CTAs
              ======================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 p-6 bg-gotham-charcoal border border-gotham-border rounded-lg shadow-xl">
            {/* Role */}
            <div className="flex flex-col">
              <span className="font-mono text-[10px] text-bat-muted uppercase tracking-widest">
                {isBatmanMode ? 'TACTICAL ROLE' : 'ROLE / SPECIALIZATION'}
              </span>
              <span className="font-display font-bold text-base text-bat-yellow mt-1">
                {project.role}
              </span>
            </div>

            {/* Company Cross-Link */}
            <div className="flex flex-col">
              <span className="font-mono text-[10px] text-bat-muted uppercase tracking-widest">
                {isBatmanMode ? 'ORGANIZATION // CLIENT' : 'ORGANIZATION'}
              </span>
              <span className="font-sans font-semibold text-sm text-bat-offwhite mt-1">
                {project.company}
              </span>
            </div>

            {/* Period */}
            <div className="flex flex-col">
              <span className="font-mono text-[10px] text-bat-muted uppercase tracking-widest">
                {isBatmanMode ? 'OPERATIONAL TIMELINE' : 'TIMELINE'}
              </span>
              <span className="font-mono text-sm text-bat-offwhite mt-1">
                {project.period}
              </span>
            </div>

            {/* Primary Impact Metric */}
            <div className="flex flex-col justify-center">
              {project.metrics ? (
                <>
                  <span className="font-mono text-[10px] text-bat-muted uppercase tracking-widest">
                    {isBatmanMode ? 'KEY METRIC' : 'IMPACT METRIC'}
                  </span>
                  <span className="font-display font-black text-lg text-bat-yellow">
                    {project.metrics.primaryMetric}
                  </span>
                </>
              ) : (
                <>
                  <span className="font-mono text-[10px] text-bat-muted uppercase tracking-widest">
                    DEPLOYMENT
                  </span>
                  <span className="font-mono text-xs text-emerald-400 font-bold">
                    PRODUCTION VERIFIED
                  </span>
                </>
              )}
            </div>
          </div>

          {/* ========================================================
              18. REAL PROJECT EXTERNAL ACTION LINKS
              ======================================================== */}
          {(project.links.playStore ||
            project.links.appStore ||
            project.links.external ||
            project.links.github) && (
            <div className="mb-14 flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs text-bat-muted uppercase tracking-widest mr-2 flex items-center gap-1.5">
                <Target size={14} className="text-bat-yellow" />
                <span>{isBatmanMode ? 'EXTERNAL DEPLOYMENTS:' : 'LIVE LINKS & DEPLOYMENTS:'}</span>
              </span>

              {project.links.playStore && (
                <a
                  href={project.links.playStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gotham-charcoal hover:bg-bat-yellow text-bat-offwhite hover:text-gotham-black border border-gotham-border font-mono text-xs font-bold tracking-wider transition-all duration-200 rounded"
                >
                  <Smartphone size={14} />
                  <span>GOOGLE PLAY STORE</span>
                  <ExternalLink size={12} />
                </a>
              )}

              {project.links.appStore && (
                <a
                  href={project.links.appStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gotham-charcoal hover:bg-bat-yellow text-bat-offwhite hover:text-gotham-black border border-gotham-border font-mono text-xs font-bold tracking-wider transition-all duration-200 rounded"
                >
                  <Smartphone size={14} />
                  <span>APPLE APP STORE</span>
                  <ExternalLink size={12} />
                </a>
              )}

              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gotham-charcoal hover:bg-bat-yellow text-bat-offwhite hover:text-gotham-black border border-gotham-border font-mono text-xs font-bold tracking-wider transition-all duration-200 rounded"
                >
                  <Github size={14} />
                  <span>SOURCE CODE REPOSITORY</span>
                  <ExternalLink size={12} />
                </a>
              )}

              {project.links.external && (
                <a
                  href={project.links.external}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-bat-yellow text-gotham-black hover:bg-white font-mono text-xs font-bold tracking-wider transition-all duration-200 rounded shadow-md"
                >
                  <span>LIVE DEMO / PLATFORM</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          )}

          {/* ========================================================
              17. INTERACTIVE SCHEMATIC & SCREENSHOT GALLERY
              ======================================================== */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs text-bat-yellow font-bold tracking-widest uppercase">
                {isBatmanMode ? '// ARCHIVAL ARTIFACTS' : '// APPLICATION PREVIEWS'}
              </span>
              <span className="h-[1px] flex-1 bg-gotham-border" />
              <span className="font-mono text-[10px] text-bat-muted uppercase tracking-widest">
                {isBatmanMode ? 'VERIFIED INTERFACE SCHEMATICS' : 'SCREENSHOTS & INTERFACES'}
              </span>
            </div>

            <ScreenshotGallery
              gallery={
                project.gallery && project.gallery.length > 0
                  ? project.gallery
                  : [
                      {
                        src: project.image,
                        title: `${project.title} ${isBatmanMode ? 'Architectural Schematic' : 'UI Preview'}`,
                        caption: project.shortDescription,
                      },
                    ]
              }
              projectTitle={project.title}
            />
          </div>

          {/* ========================================================
              PROBLEM & SOLUTION EDITORIAL PANELS
              ======================================================== */}
          {(project.problem || project.solution) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {/* The Problem / Mission Challenge */}
              {project.problem && (
                <div className="p-6 sm:p-8 bg-gotham-charcoal border border-gotham-border rounded-lg relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-500/80" />
                  <div>
                    <div className="flex items-center gap-2 font-mono text-xs text-red-400 font-bold uppercase tracking-widest mb-3">
                      <AlertTriangle size={16} />
                      <span>{isBatmanMode ? 'THE FIELD CHALLENGE // PROBLEM' : 'THE PROBLEM // CHALLENGE'}</span>
                    </div>
                    <p className="font-sans text-sm sm:text-base text-bat-offwhite/85 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gotham-border/60 font-mono text-[10px] text-bat-muted uppercase tracking-wider">
                    {isBatmanMode ? 'OPERATIONAL FRICTION IDENTIFIED & ISOLATED' : 'CORE CHALLENGE IDENTIFIED & SOLVED'}
                  </div>
                </div>
              )}

              {/* The Engineered Solution */}
              {project.solution && (
                <div className="p-6 sm:p-8 bg-gotham-charcoal border border-gotham-border rounded-lg relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 left-0 w-1 h-full bg-bat-yellow" />
                  <div>
                    <div className="flex items-center gap-2 font-mono text-xs text-bat-yellow font-bold uppercase tracking-widest mb-3">
                      <Shield size={16} />
                      <span>{isBatmanMode ? 'TACTICAL ARCHITECTURE // SOLUTION' : 'ENGINEERED ARCHITECTURE // SOLUTION'}</span>
                    </div>
                    <p className="font-sans text-sm sm:text-base text-bat-offwhite/85 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gotham-border/60 font-mono text-[10px] text-bat-muted uppercase tracking-wider">
                    {isBatmanMode ? 'PRODUCTION ARCHITECTURE DELIVERED & SCALED' : 'PRODUCTION ARCHITECTURE DELIVERED'}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              KEY FEATURES & CORE CAPABILITIES
              ======================================================== */}
          {project.features && project.features.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs text-bat-yellow font-bold tracking-widest uppercase">
                  {isBatmanMode ? '// CAPABILITIES INDEX' : '// KEY FEATURES'}
                </span>
                <span className="h-[1px] flex-1 bg-gotham-border" />
                <span className="font-mono text-[10px] text-bat-muted uppercase tracking-widest">
                  {isBatmanMode ? 'PRODUCTION FEATURES' : 'KEY CAPABILITIES'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-gotham-charcoal/90 border border-gotham-border hover:border-bat-yellow/60 rounded transition-all duration-200 group"
                  >
                    <div className="flex items-start gap-3">
                      <span className="p-1 rounded bg-bat-yellow/10 text-bat-yellow mt-0.5 group-hover:bg-bat-yellow group-hover:text-gotham-black transition-colors shrink-0">
                        <CheckCircle2 size={16} />
                      </span>
                      <span className="font-sans text-sm text-bat-offwhite/90 leading-snug">
                        {feature}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TECHNICAL ARCHITECTURE MATRIX
              ======================================================== */}
          {project.architecture && (
            <div className="mb-16 p-6 sm:p-8 bg-gotham-charcoal border border-gotham-border rounded-lg">
              <div className="flex items-center gap-3 mb-6">
                <Layers size={18} className="text-bat-yellow" />
                <h3 className="font-display font-black text-2xl text-bat-offwhite tracking-wide">
                  {isBatmanMode ? 'SYSTEM ARCHITECTURE MATRIX' : 'TECHNICAL ARCHITECTURE MATRIX'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 bg-gotham-surface border border-gotham-border rounded">
                  <span className="font-mono text-[10px] text-bat-yellow uppercase tracking-widest block mb-1">
                    DESIGN PATTERN
                  </span>
                  <span className="font-mono text-sm text-bat-offwhite font-bold">
                    {project.architecture.pattern}
                  </span>
                </div>

                <div className="p-4 bg-gotham-surface border border-gotham-border rounded">
                  <span className="font-mono text-[10px] text-bat-yellow uppercase tracking-widest block mb-1">
                    STATE MANAGEMENT
                  </span>
                  <span className="font-mono text-sm text-bat-offwhite font-bold">
                    {project.architecture.stateManagement}
                  </span>
                </div>

                <div className="p-4 bg-gotham-surface border border-gotham-border rounded">
                  <span className="font-mono text-[10px] text-bat-yellow uppercase tracking-widest block mb-1">
                    LOCAL PERSISTENCE
                  </span>
                  <span className="font-mono text-sm text-bat-offwhite font-bold">
                    {project.architecture.persistence}
                  </span>
                </div>

                {project.architecture.networking && (
                  <div className="p-4 bg-gotham-surface border border-gotham-border rounded">
                    <span className="font-mono text-[10px] text-bat-yellow uppercase tracking-widest block mb-1">
                      NETWORKING & API
                    </span>
                    <span className="font-mono text-sm text-bat-offwhite font-bold">
                      {project.architecture.networking}
                    </span>
                  </div>
                )}

                {project.architecture.observability && (
                  <div className="p-4 bg-gotham-surface border border-gotham-border rounded">
                    <span className="font-mono text-[10px] text-bat-yellow uppercase tracking-widest block mb-1">
                      {isBatmanMode ? 'OBSERVABILITY & TELEMETRY' : 'MONITORING & CRASH REPORTING'}
                    </span>
                    <span className="font-mono text-sm text-bat-offwhite font-bold">
                      {project.architecture.observability}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================
              RESPONSIBILITIES & ENGINEERING EXECUTION
              ======================================================== */}
          {project.responsibilities && project.responsibilities.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs text-bat-yellow font-bold tracking-widest uppercase">
                  {isBatmanMode ? '// DIRECT RESPONSIBILITIES' : '// KEY RESPONSIBILITIES'}
                </span>
                <span className="h-[1px] flex-1 bg-gotham-border" />
                <span className="font-mono text-[10px] text-bat-muted uppercase tracking-widest">
                  {isBatmanMode ? 'HANDS-ON CONTRIBUTIONS' : 'CORE DELIVERABLES'}
                </span>
              </div>

              <div className="space-y-3">
                {project.responsibilities.map((resp, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-gotham-charcoal border-l-2 border-bat-yellow border-t border-r border-b border-gotham-border flex items-start gap-3"
                  >
                    <span className="font-mono text-xs text-bat-yellow font-bold mt-0.5">
                      0{idx + 1}.
                    </span>
                    <p className="font-sans text-sm text-bat-offwhite/90 leading-relaxed">
                      {resp}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              CHALLENGES & VERIFIED OUTCOMES
              ======================================================== */}
          {(project.challenges || project.outcomes) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {project.challenges && project.challenges.length > 0 && (
                <div className="p-6 bg-gotham-charcoal border border-gotham-border rounded-lg">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-bat-yellow mb-4 flex items-center gap-2">
                    <AlertTriangle size={16} />
                    <span>TECHNICAL HURDLES OVERCOME</span>
                  </h4>
                  <ul className="space-y-3">
                    {project.challenges.map((c, idx) => (
                      <li
                        key={idx}
                        className="font-sans text-sm text-bat-offwhite/85 flex items-start gap-2.5"
                      >
                        <ChevronRight
                          size={16}
                          className="text-bat-yellow shrink-0 mt-0.5"
                        />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.outcomes && project.outcomes.length > 0 && (
                <div className="p-6 bg-gotham-charcoal border border-gotham-border rounded-lg">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-emerald-400 mb-4 flex items-center gap-2">
                    <Award size={16} />
                    <span>MEASURED OUTCOMES & IMPACT</span>
                  </h4>
                  <ul className="space-y-3">
                    {project.outcomes.map((o, idx) => (
                      <li
                        key={idx}
                        className="font-sans text-sm text-bat-offwhite/85 flex items-start gap-2.5"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-emerald-400 shrink-0 mt-0.5"
                        />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              FULL TECHNOLOGY STACK MATRIX
              ======================================================== */}
          <div className="mb-16">
            <h4 className="font-mono text-xs uppercase tracking-widest text-bat-yellow mb-4 flex items-center gap-2">
              <Cpu size={16} />
              <span>FULL PRODUCTION TECH STACK</span>
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 bg-gotham-charcoal border border-gotham-border hover:border-bat-yellow text-bat-offwhite font-mono text-xs transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* ========================================================
              BOTTOM SEQUENTIAL PAGINATION
              ======================================================== */}
          <div className="pt-8 border-t border-gotham-border flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevProject ? (
              <Link
                to={`/projects/${prevProject.slug}`}
                className="w-full sm:w-auto p-4 bg-gotham-charcoal border border-gotham-border hover:border-bat-yellow rounded flex items-center gap-3 group transition-colors"
              >
                <ArrowLeft
                  size={18}
                  className="text-bat-yellow group-hover:-translate-x-1 transition-transform"
                />
                <div className="text-left">
                  <span className="font-mono text-[9px] text-bat-muted uppercase tracking-widest block">
                    {isBatmanMode ? 'PREVIOUS CASE FILE' : 'PREVIOUS PROJECT'}
                  </span>
                  <span className="font-display font-bold text-sm text-bat-offwhite group-hover:text-bat-yellow transition-colors">
                    {prevProject.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div />
            )}

            <Link
              to="/#projects"
              className="px-4 py-2 bg-gotham-surface hover:bg-gotham-border text-bat-muted hover:text-bat-yellow border border-gotham-border font-mono text-xs tracking-wider transition-colors rounded"
            >
              {isBatmanMode ? 'ARCHIVE INDEX' : 'ALL PROJECTS'}
            </Link>

            {nextProject ? (
              <Link
                to={`/projects/${nextProject.slug}`}
                className="w-full sm:w-auto p-4 bg-gotham-charcoal border border-gotham-border hover:border-bat-yellow rounded flex items-center justify-end gap-3 group transition-colors text-right"
              >
                <div>
                  <span className="font-mono text-[9px] text-bat-muted uppercase tracking-widest block">
                    {isBatmanMode ? 'NEXT CASE FILE' : 'NEXT PROJECT'}
                  </span>
                  <span className="font-display font-bold text-sm text-bat-offwhite group-hover:text-bat-yellow transition-colors">
                    {nextProject.title}
                  </span>
                </div>
                <ArrowRight
                  size={18}
                  className="text-bat-yellow group-hover:translate-x-1 transition-transform"
                />
              </Link>
            ) : (
              <div />
            )}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
};
