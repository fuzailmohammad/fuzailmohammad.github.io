import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Shield, Award, Users, Smartphone, Terminal, GraduationCap, Globe2 } from 'lucide-react';
import { profileData } from '../data/profile';
import { useTheme } from './ThemeProvider';

export const About: React.FC = () => {
  const { about } = profileData;
  const shouldReduceMotion = useReducedMotion();
  const { isBatmanMode } = useTheme();

  const statIcons = [Smartphone, Users, Award, Shield];

  // Variants for staggered section entrance
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="about"
      className="relative py-24 sm:py-28 lg:py-32 bg-gotham-dark overflow-hidden border-b border-gotham-border"
    >
      {/* Background Decorative Halftone */}
      <div className="absolute top-0 right-0 w-96 h-96 gotham-halftone-bg opacity-30 pointer-events-none" />
      <div className="absolute -left-20 bottom-0 w-80 h-80 rounded-full bg-bat-yellow/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Viewport Trigger */}
        <motion.div
          className="flex flex-col mb-16"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2 font-mono text-xs tracking-widest text-bat-yellow">
            <span>{isBatmanMode ? '// ARCHIVE INDEX' : '// PROFESSIONAL RECORD'}</span>
            <span className="w-12 h-[1px] bg-bat-yellow" />
            <span>{isBatmanMode ? 'TRANSITION: THE OPERATIVE' : 'EXECUTIVE SUMMARY'}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-bat-offwhite">
              <span className="text-bat-yellow mr-3">{about.sectionNumber} //</span>
              {isBatmanMode ? about.sectionTitle : 'ABOUT ME'}
            </h2>
            <p className="font-mono text-xs tracking-wider text-bat-muted uppercase max-w-sm">
              {about.tagline}
            </p>
          </div>
        </motion.div>

        {/* 2-Column Asymmetric Storytelling Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Professional Introduction, Bio, Dossier Quote & Stats (7 cols on lg) */}
          <motion.div
            className="lg:col-span-7 flex flex-col"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Storytelling Narrative Paragraphs from Resume */}
            <div className="space-y-5 text-bat-offwhite/85 text-base sm:text-lg leading-relaxed font-sans mb-8">
              {about.bioParagraphs.map((para, idx) => (
                <motion.p
                  key={idx}
                  variants={itemVariants}
                  className="relative pl-5 border-l border-gotham-border hover:border-bat-yellow transition-colors"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Editorial Dossier Quote from Resume SDLC Scope */}
            <motion.div
              variants={itemVariants}
              className="p-6 bg-gotham-surface border border-gotham-border rounded mb-10 relative overflow-hidden group hover:border-bat-yellow/50 transition-colors"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-bat-yellow" />
              <p className="font-sans italic text-bat-offwhite/90 text-sm sm:text-base leading-relaxed">
                {about.dossierQuote}
              </p>
              <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-bat-muted">
                <span>{isBatmanMode ? '— FIELD RECORD // MOHD FUZAIL' : '— ENGINEERING PHILOSOPHY // MOHD FUZAIL'}</span>
                <span>VERIFIED RESUME RECORD</span>
              </div>
            </motion.div>

            {/* Verified Key Statistics Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {about.stats.map((stat, idx) => {
                const Icon = statIcons[idx % statIcons.length];
                return (
                  <div
                    key={idx}
                    className="p-4 bg-gotham-charcoal/80 border border-gotham-border rounded hover:border-bat-yellow/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-bat-card group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Icon className="w-4 h-4 text-bat-yellow group-hover:scale-110 transition-transform" />
                      <span className="font-mono text-[10px] text-bat-muted">0{idx + 1}</span>
                    </div>
                    <div className="font-display font-black text-2xl sm:text-3xl text-bat-offwhite group-hover:text-bat-yellow transition-colors">
                      {stat.value}
                    </div>
                    <div className="font-mono text-[10px] tracking-wider text-bat-yellow uppercase mt-1">
                      {stat.label}
                    </div>
                    <div className="text-[11px] text-bat-muted mt-1 leading-tight hidden sm:block">
                      {stat.subtext}
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Education & Languages Sub-Panel */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Education */}
              <div className="p-4 bg-gotham-surface/60 border border-gotham-border rounded">
                <div className="flex items-center gap-2 font-mono text-xs text-bat-yellow uppercase tracking-wider mb-2">
                  <GraduationCap size={15} />
                  <span>ACADEMIC FOUNDATION</span>
                </div>
                <div className="font-display font-bold text-base text-bat-offwhite">
                  {about.education.degree}
                </div>
                <div className="text-xs font-sans text-bat-muted mt-1">
                  {about.education.institution}, {about.education.location}
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gotham-border/60 text-[11px] font-mono">
                  <span className="text-bat-muted">{about.education.period}</span>
                  <span className="text-bat-yellow font-bold">{about.education.score}</span>
                </div>
              </div>

              {/* Languages */}
              <div className="p-4 bg-gotham-surface/60 border border-gotham-border rounded">
                <div className="flex items-center gap-2 font-mono text-xs text-bat-yellow uppercase tracking-wider mb-2">
                  <Globe2 size={15} />
                  <span>LANGUAGES</span>
                </div>
                <ul className="space-y-1.5 pt-1">
                  {about.languages.map((lang, lIdx) => (
                    <li
                      key={lIdx}
                      className="flex items-center justify-between text-xs font-mono"
                    >
                      <span className="text-bat-offwhite/90">{lang.language}</span>
                      <span className="text-bat-muted">{lang.proficiency}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Classified Portrait Dossier (5 cols on lg) */}
          <motion.div
            className="lg:col-span-5 flex flex-col items-center"
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full max-w-md aspect-[4/5] bg-gotham-surface border border-gotham-border rounded-lg overflow-hidden shadow-2xl group hover:border-bat-yellow/60 transition-colors">
              {/* Halftone texture overlay */}
              <div className="absolute inset-0 gotham-halftone-bg opacity-20 pointer-events-none" />

              {/* Vector Silhouette Portrait Placeholder Asset */}
              <img
                src="/assets/portrait/portrait-placeholder.svg"
                alt={isBatmanMode ? "Behind The Mask - Mohd Fuzail Dossier Portrait" : "Mohd Fuzail - Senior Flutter Developer"}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />

              {/* Status Bar */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 bg-gotham-black/80 border border-gotham-border text-[10px] font-mono text-bat-muted backdrop-blur-sm">
                <span className="flex items-center gap-1.5">
                  <Terminal size={12} className="text-bat-yellow" />
                  {isBatmanMode ? 'SUBJECT: MOHD FUZAIL' : 'MOHD FUZAIL'}
                </span>
                <span className="text-bat-yellow">STATUS: VERIFIED</span>
              </div>

              {/* Bottom Stamp Badge */}
              <div className="absolute bottom-3 left-3 right-3 text-center py-1.5 bg-bat-yellow/10 border border-bat-yellow/30 font-mono text-[10px] text-bat-yellow font-bold tracking-widest uppercase backdrop-blur-sm">
                SENIOR FLUTTER DEVELOPER // 3+ YEARS
              </div>
            </div>

            {/* Experience Summary Note */}
            <div className="mt-4 w-full max-w-md flex items-center justify-between text-xs font-mono text-bat-muted px-2">
              <span>TECH ALMONDS SOLUTIONS</span>
              <span>SPECIALTY: CROSS-PLATFORM SYSTEMS</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};