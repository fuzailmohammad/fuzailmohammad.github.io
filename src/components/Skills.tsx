import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Cpu, Server, Database, Cloud, GitBranch, Wrench, ShieldAlert } from 'lucide-react';
import { skillsData, SkillCategory } from '../data/skills';
import { useTheme } from './ThemeProvider';

export const Skills: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { isBatmanMode } = useTheme();

  const categoryIcons: Record<string, React.ElementType> = {
    mobile: Cpu,
    backend: Server,
    database: Database,
    cloud: Cloud,
    devops: GitBranch,
    tools: Wrench,
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="skills"
      className="relative py-24 sm:py-28 lg:py-32 bg-gotham-black overflow-hidden border-b border-gotham-border"
    >
      {/* Background Subtle Radar Grid */}
      <div className="absolute inset-0 gotham-grid-bg opacity-20 pointer-events-none" />
      
      {/* Ambient bat yellow glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-bat-yellow/5 rounded-full blur-[140px] pointer-events-none" />

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
            <span>{isBatmanMode ? '// SUBSYSTEM ARSENAL' : '// TECHNICAL STACK'}</span>
            <span className="w-12 h-[1px] bg-bat-yellow" />
            <span>{isBatmanMode ? 'SPECIFICATIONS & CAPABILITIES' : 'PRODUCTION CAPABILITIES'}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-bat-offwhite">
              <span className="text-bat-yellow mr-3">{skillsData.sectionNumber} //</span>
              {isBatmanMode ? skillsData.sectionTitle : 'TECHNICAL SKILLS'}
            </h2>
            <p className="font-mono text-xs tracking-wider text-bat-muted uppercase max-w-md">
              {isBatmanMode ? skillsData.subheading : 'TECHNICAL PROFICIENCIES // PRODUCTION VERIFIED'}
            </p>
          </div>
          <p className="mt-4 font-sans text-sm sm:text-base text-bat-offwhite/70 max-w-2xl">
            {skillsData.intro}
          </p>
        </motion.div>

        {/* Structured Grid with Staggered Viewport Entrance */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {skillsData.categories.map((category: SkillCategory) => {
            const Icon = categoryIcons[category.id] || ShieldAlert;

            return (
              <motion.div
                key={category.id}
                variants={cardVariants}
                className="relative bg-gotham-charcoal/90 border border-gotham-border hover:border-bat-yellow/70 rounded-lg p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-bat-card group"
              >
                {/* Top Corner Chamfer Marker */}
                <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden">
                  <div className="absolute transform rotate-45 bg-gotham-border group-hover:bg-bat-yellow transition-colors w-12 h-2 -top-1 -right-3" />
                </div>

                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-gotham-surface border border-gotham-border flex items-center justify-center text-bat-yellow group-hover:scale-110 group-hover:bg-bat-yellow/10 transition-all">
                        <Icon size={16} />
                      </div>
                      <span className="font-mono text-xs text-bat-yellow tracking-widest">
                        {isBatmanMode ? category.tacticalCode : `SPEC-${category.tacticalCode.replace(/\D/g, '') || '01'}`}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-xl text-bat-offwhite tracking-wide mb-2 group-hover:text-bat-yellow transition-colors">
                    {category.categoryTitle}
                  </h3>

                  <p className="font-sans text-xs text-bat-muted mb-5 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Skills Tag Pills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {category.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gotham-surface border border-gotham-border/70 rounded text-xs hover:border-bat-yellow hover:bg-gotham-border transition-all duration-200"
                      >
                        <span className="text-bat-offwhite/90 font-medium">{skill.name}</span>
                        {skill.tag && (
                          <span className="text-[9px] font-mono text-bat-yellow/80 uppercase">
                            · {skill.tag}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Footer */}
                <div className="pt-3 border-t border-gotham-border/60 flex items-center justify-between text-[10px] font-mono text-bat-muted">
                  <span>{isBatmanMode ? 'SUBSYSTEM STATUS' : 'STATUS'}</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {isBatmanMode ? 'READY' : 'PRODUCTION VERIFIED'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};