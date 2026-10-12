import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';
import { profileData } from '../data/profile';
import { useTheme } from './ThemeProvider';

export const Footer: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { isBatmanMode } = useTheme();

  return (
    <footer className="bg-gotham-black border-t border-gotham-border text-bat-muted py-12 relative overflow-hidden transition-colors duration-300">
      {/* Subtle Bat Silhouette Crossing the horizon (Darkest Mode Only) */}
      {isBatmanMode && !shouldReduceMotion && (
        <motion.div
          className="absolute top-2 -left-12 pointer-events-none opacity-20"
          initial={{ x: -50, y: 15 }}
          animate={{ x: '110vw', y: 5 }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: 'linear',
            delay: 4,
          }}
        >
          <img
            src="/assets/batman/bat-emblem.svg"
            alt="Batman Emblem"
            className="w-10 h-auto object-contain"
          />
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-gotham-border/60">
          {/* Identity */}
          <div className="flex flex-col items-center md:text-left">
            <div className="flex items-center gap-2.5 mb-1">
              {/* Insignia: Bat emblem in darkest mode, clean monogram in light/dark */}
              {isBatmanMode ? (
                <img
                  src="/assets/batman/bat-emblem.svg"
                  alt="Batman Emblem"
                  className="w-5 h-auto object-contain"
                />
              ) : (
                <div className="w-5 h-5 rounded bg-gotham-surface border border-gotham-border flex items-center justify-center font-display font-black text-[10px] text-bat-yellow">
                  FM
                </div>
              )}
              <span className="font-display font-black text-xl text-bat-offwhite tracking-wider">
                {profileData.name}
              </span>
            </div>
            <p className="font-mono text-xs text-bat-muted">
              {profileData.role}
            </p>
          </div>

          {/* Social Channels */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/fuzailmohammad"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-bat-muted hover:text-bat-yellow hover:scale-110 transition-all duration-200"
              aria-label="GitHub Profile"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/mohammad-fuzail/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-bat-muted hover:text-bat-yellow hover:scale-110 transition-all duration-200"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:mohdfuzail00786@gmail.com"
              className="p-2 text-bat-muted hover:text-bat-yellow hover:scale-110 transition-all duration-200"
              aria-label="Direct Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-bat-muted/80">
          <div>
            © {new Date().getFullYear()} {profileData.name}. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="/privacy-policy"
              className="hover:text-bat-yellow transition-colors"
            >
              PRIVACY POLICY
            </Link>
            <span className="text-gotham-border">/</span>
            <Link
              to="/terms-conditions"
              className="hover:text-bat-yellow transition-colors"
            >
              TERMS & CONDITIONS
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};