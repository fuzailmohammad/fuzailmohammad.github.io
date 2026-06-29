import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Code } from 'lucide-react';

export default memo(function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h3
          className="text-2xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Mohammad Fuzail
        </motion.h3>
        <motion.p
          className="text-gray-400 max-w-2xl mx-auto mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Senior Flutter Developer building exceptional mobile experiences.
        </motion.p>
        <motion.div
          className="flex justify-center gap-6 text-sm mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link to="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
          <Link to="/terms-conditions" className="text-gray-400 hover:text-white">Terms & Conditions</Link>
        </motion.div>
        <motion.div
          className="border-t border-gray-800 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <span>Made with</span>
            <Heart className="text-red-500" size={16} fill="currentColor" />
            <span>and</span>
            <Code className="text-blue-500" size={16} />
            <span>by Mohammad Fuzail</span>
          </div>
          <p className="text-gray-500 mt-2">{new Date().getFullYear()} All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
});
