import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Code } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">Mohammad Fuzail</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Senior Flutter Developer passionate about creating exceptional mobile experiences 
              that make a difference in people's lives.
            </p>
          </motion.div>

          <motion.div
            className="border-t border-gray-800 pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center space-x-2 text-gray-400">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="text-red-500" size={16} fill="currentColor" />
              </motion.div>
              <span>and</span>
              <Code className="text-blue-500" size={16} />
              <span>by Mohammad Fuzail</span>
            </div>
            <p className="text-gray-500 mt-2">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};