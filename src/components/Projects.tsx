import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Smartphone, Star, Filter } from 'lucide-react';

export const Projects: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  const [selectedCategory, setSelectedCategory] = useState('All');

  const projects = [
    {
      title: 'Lumax Loyalty App',
      description: 'Comprehensive loyalty platform for automotive industry with reward management and user engagement features.',
      category: 'Automotive',
      links: {
        playStore: 'https://play.google.com/store/apps/details?id=com.lumax.loyalty',
        appStore: 'https://apps.apple.com/app/lumax-loyalty/id1234567890',
      },
      technologies: ['Flutter', 'Provider', 'Firebase', 'Razorpay'],
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Shubh Mangal',
      description: 'Wedding planning and management application with vendor booking and event coordination features.',
      category: 'Lifestyle',
      links: {
        playStore: 'https://play.google.com/store/apps/details?id=com.shubhmangal',
        appStore: 'https://apps.apple.com/app/shubh-mangal/id1234567891',
      },
      technologies: ['Flutter', 'BLoC', 'RESTful APIs', 'Payment Gateway'],
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Somany Sales Hero',
      description: 'Sales management platform for retail teams with performance tracking and analytics.',
      category: 'Business',
      links: {
        playStore: 'https://play.google.com/store/apps/details?id=com.somany.saleshero',
      },
      technologies: ['Flutter', 'Riverpod', 'Charts', 'Offline Support'],
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Parker Loyalty Platform',
      description: 'Multi-role loyalty solution with comprehensive dashboards and redemption workflows for 4 different user types.',
      category: 'Loyalty',
      links: {},
      technologies: ['Flutter', 'Provider', 'Multi-role Auth', 'Dashboard'],
      gradient: 'from-orange-500 to-red-500',
    },
    {
      title: 'DigiSpark MINDA',
      description: 'Automotive parts e-commerce application with catalog browsing and order management.',
      category: 'E-commerce',
      links: {
        playStore: 'https://play.google.com/store/apps/details?id=com.digispark.minda',
        appStore: 'https://apps.apple.com/app/digispark-minda/id1234567892',
      },
      technologies: ['Flutter', 'BLoC', 'E-commerce', 'Payment Integration'],
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      title: 'Classmate Star Club',
      description: 'Gamified retail loyalty application with points system and reward redemption.',
      category: 'Retail',
      links: {
        playStore: 'https://play.google.com/store/apps/details?id=com.classmate.starclub',
        appStore: 'https://apps.apple.com/app/classmate-star-club/id1234567893',
      },
      technologies: ['Flutter', 'Gamification', 'Loyalty System', 'Firebase'],
      gradient: 'from-teal-500 to-blue-500',
    },
    {
      title: 'FieldPulse by TASC',
      description: 'Field operations management app with geo-tagging and real-time tracking capabilities.',
      category: 'Field Services',
      links: {
        playStore: 'https://play.google.com/store/apps/details?id=com.tasc.fieldpulse',
        appStore: 'https://apps.apple.com/app/fieldpulse-tasc/id1234567894',
      },
      technologies: ['Flutter', 'Geo-location', 'Real-time Tracking', 'Offline Mode'],
      gradient: 'from-cyan-500 to-teal-500',
    },
    {
      title: 'PepsiCo Growth Club',
      description: 'Sales and reward platform designed for channel partners with performance analytics.',
      category: 'Sales',
      links: {
        playStore: 'https://play.google.com/store/apps/details?id=com.pepsico.growthclub',
        appStore: 'https://apps.apple.com/app/pepsico-growth-club/id1234567895',
      },
      technologies: ['Flutter', 'Analytics', 'Partner Management', 'Rewards'],
      gradient: 'from-red-500 to-pink-500',
    },
    {
      title: 'InClinic Assistant',
      description: 'Secure healthcare application with patient management and offline support for medical professionals.',
      category: 'Healthcare',
      links: {
        playStore: 'https://play.google.com/store/apps/details?id=com.inclinic.assistant',
      },
      technologies: ['Flutter', 'Healthcare', 'Security', 'Offline Support'],
      gradient: 'from-emerald-500 to-green-500',
    },
  ];

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
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
            Featured Projects
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"
            variants={itemVariants}
          />
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            A showcase of mobile applications that have made a real impact
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
              data-cursor="pointer"
            >
              <Filter className="inline mr-2" size={16} />
              {category}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.03, y: -10 }}
            >
              <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                  <Smartphone className="text-gray-400" size={20} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {project.links.playStore && (
                    <motion.a
                      href={project.links.playStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-sm font-medium hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      data-cursor="pointer"
                    >
                      <ExternalLink size={14} className="mr-1" />
                      Play Store
                    </motion.a>
                  )}
                  {project.links.appStore && (
                    <motion.a
                      href={project.links.appStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      data-cursor="pointer"
                    >
                      <Star size={14} className="mr-1" />
                      App Store
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};