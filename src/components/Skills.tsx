import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const Skills: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  const skillCategories = [
    {
      title: 'Mobile Development',
      skills: [
        { name: 'Flutter', level: 95 },
        { name: 'Dart', level: 95 },
        { name: 'Android', level: 85 },
        { name: 'iOS', level: 80 },
      ],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'State Management',
      skills: [
        { name: 'Provider', level: 90 },
        { name: 'Riverpod', level: 88 },
        { name: 'BLoC', level: 85 },
        { name: 'GetX', level: 80 },
      ],
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Backend & APIs',
      skills: [
        { name: 'RESTful APIs', level: 92 },
        { name: 'Firebase', level: 90 },
        { name: 'GraphQL', level: 75 },
        { name: 'Node.js', level: 70 },
      ],
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Tools & Others',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Razorpay Integration', level: 88 },
        { name: 'CI/CD', level: 80 },
        { name: 'Testing', level: 85 },
      ],
      color: 'from-orange-500 to-red-500',
    },
  ];

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
    <section id="skills" className="py-20 bg-white dark:bg-gray-900">
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
            Skills & Expertise
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"
            variants={itemVariants}
          />
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            A comprehensive toolkit for building exceptional mobile applications
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full bg-gradient-to-r ${category.color}`}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{
                          duration: 1,
                          delay: categoryIndex * 0.2 + skillIndex * 0.1,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};