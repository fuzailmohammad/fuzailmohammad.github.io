import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { experienceData, ExperienceRecord } from '../data/experience';
import { useTheme } from './ThemeProvider';

export const Experience: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { isBatmanMode } = useTheme();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
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
      id="experience"
      className="relative py-24 sm:py-28 lg:py-32 bg-gotham-black overflow-hidden border-b border-gotham-border"
    >
      {/* Background Subtle Tactical Grid */}
      <div className="absolute inset-0 gotham-grid-bg opacity-20 pointer-events-none" />

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
            <Briefcase className="w-4 h-4 text-bat-yellow" />
            <span>{isBatmanMode ? '// CHRONOLOGICAL DOSSIER' : '// CAREER TIMELINE'}</span>
            <span className="w-12 h-[1px] bg-bat-yellow" />
            <span>{isBatmanMode ? 'CAREER TRACK RECORD' : 'PRODUCTION TRACK RECORD'}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-bat-offwhite">
              <span className="text-bat-yellow mr-3">{experienceData.sectionNumber} //</span>
              {experienceData.sectionTitle}
            </h2>
            <p className="font-mono text-xs tracking-wider text-bat-muted uppercase max-w-md">
              {isBatmanMode ? experienceData.subheading : 'PROFESSIONAL PRODUCTION TRACK RECORD // 3+ YEARS EXP'}
            </p>
          </div>
        </motion.div>

        {/* Editorial Timeline Cards */}
        <motion.div
          className="space-y-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {experienceData.records.map((record: ExperienceRecord) => {
            return (
              <motion.div
                key={record.id}
                variants={itemVariants}
                className="relative bg-gotham-charcoal/90 border border-gotham-border hover:border-bat-yellow/70 rounded-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-bat-card group"
              >
                {/* Header Strip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-gotham-border gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs text-bat-yellow font-bold tracking-widest">
                        {isBatmanMode ? record.operationCode : (record.current ? 'CURRENT ROLE' : 'PREVIOUS ROLE')}
                      </span>
                      {record.current && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-[10px] font-mono text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          {isBatmanMode ? 'ACTIVE RUNTIME' : 'PRESENT'}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-bat-offwhite group-hover:text-bat-yellow transition-colors">
                      {record.role}
                    </h3>
                    <div className="text-sm font-sans font-semibold text-bat-offwhite/90 mt-1">
                      {record.company}
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1.5 font-mono text-xs text-bat-muted">
                    <span className="inline-flex items-center gap-1.5 text-bat-offwhite/90">
                      <Calendar size={13} className="text-bat-yellow" />
                      {record.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={13} />
                      {record.location}
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <p className="font-sans text-sm sm:text-base text-bat-offwhite/85 leading-relaxed mb-6">
                  {record.summary}
                </p>

                {/* Responsibilities Grid */}
                <div className="mb-6">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-bat-yellow mb-3">
                    {isBatmanMode ? 'CORE OPERATIONAL DELIVERABLES' : 'KEY RESPONSIBILITIES'}
                  </h4>
                  <ul className="space-y-2.5">
                    {record.responsibilities.map((resp, rIdx) => (
                      <li
                        key={rIdx}
                        className="flex items-start gap-3 font-sans text-xs sm:text-sm text-bat-offwhite/80"
                      >
                        <CheckCircle2
                          size={15}
                          className="text-bat-yellow shrink-0 mt-0.5"
                        />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Verified Achievements Callout */}
                {record.achievements.length > 0 && (
                  <div className="mb-6 p-4 bg-gotham-surface border-l-2 border-bat-yellow rounded-r">
                    <div className="flex items-center gap-2 font-mono text-xs text-bat-yellow font-bold mb-1">
                      <Award size={15} />
                      <span>{isBatmanMode ? 'MEASURED IMPACT & BENCHMARKS' : 'KEY ACHIEVEMENTS & IMPACT'}</span>
                    </div>
                    <ul className="space-y-1">
                      {record.achievements.map((ach, aIdx) => (
                        <li
                          key={aIdx}
                          className="font-sans text-xs sm:text-sm text-bat-offwhite/90"
                        >
                          {ach}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies Deployed */}
                <div className="pt-4 border-t border-gotham-border/60 flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-bat-muted mr-2">
                    TECHNOLOGIES:
                  </span>
                  {record.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 bg-gotham-surface border border-gotham-border text-[11px] font-mono text-bat-muted group-hover:border-bat-yellow/40 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};