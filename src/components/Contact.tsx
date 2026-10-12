import React, { useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Mail, Github, Linkedin, Send, Radio, MapPin, Terminal, FileText, CheckCircle2 } from 'lucide-react';
import { socialData } from '../data/social';
import { MagneticButton } from './MagneticButton';
import { useTheme } from './ThemeProvider';

export const Contact: React.FC = () => {
  const { isBatmanMode } = useTheme();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSent, setIsSent] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setFormState({ name: '', email: '', message: '' });
    }, 5000);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
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
    <section id="contact" className="relative py-24 sm:py-28 lg:py-32 bg-gotham-black overflow-hidden border-b border-gotham-border">
      {/* BAT SIGNAL SPOTLIGHT: Subtle ambient Gotham searchlight in darkest mode, soft glow in light/dark */}
      {isBatmanMode ? (
        <motion.div
          className="absolute bottom-0 right-1/4 w-[600px] h-[800px] pointer-events-none rounded-full blur-[140px]"
          style={{
            background: 'radial-gradient(circle, rgba(244, 196, 0, 0.12) 0%, rgba(244, 196, 0, 0.02) 60%, transparent 80%)',
          }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: [1, 1.1, 0.95, 1],
                  opacity: [0.1, 0.22, 0.14, 0.1],
                }
          }
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      ) : (
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] pointer-events-none rounded-full blur-[120px] opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(var(--color-bat-yellow), 0.25) 0%, transparent 70%)',
          }}
        />
      )}
      <div className="absolute inset-0 gotham-halftone-bg opacity-20 pointer-events-none" />

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
            <Radio className="w-4 h-4 text-bat-yellow animate-pulse" />
            <span>{isBatmanMode ? '// TRANSMISSION FREQUENCY: 142.85 MHz' : '// DIRECT INQUIRY'}</span>
            <span className="w-12 h-[1px] bg-bat-yellow" />
            <span>{isBatmanMode ? 'DISPATCH PROTOCOL' : 'CONNECT & COLLABORATE'}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-bat-offwhite">
              <span className="text-bat-yellow mr-3">{socialData.sectionNumber} //</span>
              {isBatmanMode ? socialData.sectionTitle : 'GET IN TOUCH'}
            </h2>
            <p className="font-mono text-xs tracking-wider text-bat-muted uppercase max-w-md">
              {isBatmanMode ? socialData.subheading : 'AVAILABLE FOR HIGH-IMPACT MOBILE ROLES & CONTRACTS'}
            </p>
          </div>
          <p className="mt-4 font-sans text-sm sm:text-base text-bat-offwhite/70 max-w-2xl">
            {socialData.intro}
          </p>
        </motion.div>

        {/* 2-Column Terminal & Communication Channels Layout */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          
          {/* LEFT: Dispatch Terminal Form (7 cols on lg) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 bg-gotham-charcoal/90 border border-gotham-border rounded-lg p-6 sm:p-8 relative hover:border-gotham-borderLight transition-colors"
          >
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-gotham-border text-xs font-mono text-bat-muted">
              <span className="flex items-center gap-2">
                <Terminal size={14} className="text-bat-yellow" />
                {isBatmanMode ? 'SIGNAL_TERMINAL // SECURE_DISPATCH' : 'CONTACT FORM // DIRECT MESSAGE'}
              </span>
              <span className="text-bat-yellow">{isBatmanMode ? '[ ENCRYPTED CHANNEL ]' : '[ ONLINE // DIRECT ]'}</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-mono text-xs text-bat-muted uppercase tracking-wider mb-2">
                  {isBatmanMode ? 'OPERATIVE / SENDER IDENTIFIER' : 'YOUR NAME'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isBatmanMode ? "e.g. Bruce Wayne or Engineering Lead" : "e.g. John Doe, Recruiter or Tech Lead"}
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gotham-surface border border-gotham-border rounded text-bat-offwhite font-sans placeholder-bat-subtle focus:outline-none focus:border-bat-yellow focus:ring-1 focus:ring-bat-yellow/40 focus:bg-gotham-surface/90 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-bat-muted uppercase tracking-wider mb-2">
                  {isBatmanMode ? 'RETURN FREQUENCY (EMAIL)' : 'EMAIL ADDRESS'}
                </label>
                <input
                  type="email"
                  required
                  placeholder={isBatmanMode ? "e.g. operative@enterprise.com" : "e.g. name@company.com"}
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gotham-surface border border-gotham-border rounded text-bat-offwhite font-sans placeholder-bat-subtle focus:outline-none focus:border-bat-yellow focus:ring-1 focus:ring-bat-yellow/40 focus:bg-gotham-surface/90 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-bat-muted uppercase tracking-wider mb-2">
                  {isBatmanMode ? 'MISSION BRIEFING (MESSAGE)' : 'YOUR MESSAGE'}
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Outline the mobile architecture goals, engineering initiative, or consulting scope..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-4 py-3 bg-gotham-surface border border-gotham-border rounded text-bat-offwhite font-sans placeholder-bat-subtle focus:outline-none focus:border-bat-yellow focus:ring-1 focus:ring-bat-yellow/40 focus:bg-gotham-surface/90 transition-all duration-200 resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <MagneticButton strength={0.2}>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-bat-yellow text-gotham-black font-display font-bold text-lg tracking-widest hover:bg-white transition-all shadow-bat-sharp active:translate-x-0.5 active:translate-y-0.5"
                    style={{
                      clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
                    }}
                  >
                    <Send size={18} />
                    <span>{isBatmanMode ? 'TRANSMIT DISPATCH' : 'SEND MESSAGE'}</span>
                  </button>
                </MagneticButton>

                {isSent && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 font-mono text-xs text-emerald-400"
                  >
                    <CheckCircle2 size={16} />
                    <span>{isBatmanMode ? '// SIGNAL TRANSMITTED (PHASE 2 PREVIEW)' : '// MESSAGE SENT SUCCESSFULLY'}</span>
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>

          {/* RIGHT: Direct Communication Channels & Telemetry (5 cols on lg) */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* Channel Cards with Subtle Hover Lift */}
            <div className="space-y-4">
              <a
                href="mailto:mohdfuzail00786@gmail.com"
                className="flex items-center gap-4 p-4 bg-gotham-charcoal/80 border border-gotham-border hover:border-bat-yellow rounded-lg transition-all duration-200 hover:-translate-y-0.5 group"
              >
                <div className="w-10 h-10 rounded bg-gotham-surface border border-gotham-border flex items-center justify-center text-bat-yellow group-hover:scale-110 group-hover:bg-bat-yellow/10 transition-all">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-bat-muted uppercase tracking-widest">
                    {isBatmanMode ? 'DIRECT DISPATCH' : 'EMAIL'}
                  </div>
                  <div className="font-mono text-sm text-bat-offwhite group-hover:text-bat-yellow transition-colors">
                    mohdfuzail00786@gmail.com
                  </div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/mohammad-fuzail/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-gotham-charcoal/80 border border-gotham-border hover:border-bat-yellow rounded-lg transition-all duration-200 hover:-translate-y-0.5 group"
              >
                <div className="w-10 h-10 rounded bg-gotham-surface border border-gotham-border flex items-center justify-center text-bat-yellow group-hover:scale-110 group-hover:bg-bat-yellow/10 transition-all">
                  <Linkedin size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-bat-muted uppercase tracking-widest">
                    {isBatmanMode ? 'LINKEDIN NETWORK' : 'LINKEDIN'}
                  </div>
                  <div className="font-mono text-sm text-bat-offwhite group-hover:text-bat-yellow transition-colors">
                    linkedin.com/in/mohammad-fuzail
                  </div>
                </div>
              </a>

              <a
                href="https://github.com/fuzailmohammad"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-gotham-charcoal/80 border border-gotham-border hover:border-bat-yellow rounded-lg transition-all duration-200 hover:-translate-y-0.5 group"
              >
                <div className="w-10 h-10 rounded bg-gotham-surface border border-gotham-border flex items-center justify-center text-bat-yellow group-hover:scale-110 group-hover:bg-bat-yellow/10 transition-all">
                  <Github size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-bat-muted uppercase tracking-widest">
                    {isBatmanMode ? 'GITHUB REPOSITORY' : 'GITHUB'}
                  </div>
                  <div className="font-mono text-sm text-bat-offwhite group-hover:text-bat-yellow transition-colors">
                    github.com/fuzailmohammad
                  </div>
                </div>
              </a>

              <a
                href="/documents/Mohammad_Fuzail_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-gotham-charcoal/80 border border-gotham-border hover:border-bat-yellow rounded-lg transition-all duration-200 hover:-translate-y-0.5 group"
              >
                <div className="w-10 h-10 rounded bg-gotham-surface border border-gotham-border flex items-center justify-center text-bat-yellow group-hover:scale-110 group-hover:bg-bat-yellow/10 transition-all">
                  <FileText size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-bat-muted uppercase tracking-widest">
                    {isBatmanMode ? 'CURRICULUM VITAE' : 'RESUME DOCUMENT'}
                  </div>
                  <div className="font-mono text-sm text-bat-yellow font-bold">
                    {isBatmanMode ? 'DOWNLOAD DOSSIER (PDF)' : 'DOWNLOAD RESUME (PDF)'}
                  </div>
                </div>
              </a>
            </div>

            {/* Tactical / Professional Telemetry Box */}
            <div className="p-4 bg-gotham-surface/60 border border-gotham-border rounded text-xs font-mono text-bat-muted space-y-2">
              <div className="flex items-center gap-2 text-bat-offwhite">
                <MapPin size={14} className="text-bat-yellow" />
                <span>{isBatmanMode ? 'LOCATION: 28.6139° N, 77.2090° E // GLOBAL REMOTE' : 'LOCATION: NEW DELHI, INDIA // REMOTE OPEN'}</span>
              </div>
              <div>{isBatmanMode ? 'PROTOCOLS: ENCRYPTED MISSION COMMUNICATIONS' : 'STATUS: OPEN TO SENIOR & LEAD MOBILE ROLES'}</div>
              <div>RESPONSE WINDOW: &lt; 24 HOURS</div>
            </div>

          </motion.div>

        </motion.div>

      </div>
    </section>
  );
};