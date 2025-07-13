import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Users, Award, Zap } from 'lucide-react';

export const About: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  const stats = [
    { icon: Code, label: 'Apps Built', value: '15+', color: 'text-blue-500' },
    { icon: Users, label: 'Users Served', value: '100K+', color: 'text-green-500' },
    { icon: Award, label: 'Years Experience', value: '2.5+', color: 'text-purple-500' },
    { icon: Zap, label: 'Industries', value: '4+', color: 'text-orange-500' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            variants={itemVariants}
          >
            About Me
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"
            variants={itemVariants}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Passionate Flutter Developer with a Vision
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              I'm a Senior Flutter Developer with 2.5+ years of experience building 
              production-grade mobile applications. My journey in mobile development 
              has led me to create 15+ apps that serve over 100,000 users across 
              diverse industries including automotive, retail, healthcare, and field services.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              I specialize in creating scalable, performant, and user-centric mobile 
              solutions using Flutter and Dart. My expertise spans from architecting 
              complex state management solutions to integrating advanced features like 
              payment gateways, real-time databases, and offline capabilities.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Beyond coding, I'm passionate about mentoring junior developers, 
              optimizing application performance, and delivering projects that exceed 
              client expectations. I believe in writing clean, maintainable code 
              that stands the test of time.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className={`${stat.color} mb-4`}>
                  <stat.icon size={32} />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};