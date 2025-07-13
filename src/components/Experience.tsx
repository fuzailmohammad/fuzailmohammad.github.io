import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, MapPin, Briefcase } from 'lucide-react';

export const Experience: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  const experiences = [
    {
      title: 'Senior Flutter Developer',
      company: 'Tech Almonds Solutions',
      location: 'Gurugram, Haryana, India',
      period: '2024 - Present',
      description: [
        'Leading mobile development initiatives and mentoring junior developers',
        'Architecting scalable Flutter applications with advanced state management',
        'Implementing CI/CD pipelines and optimizing app performance',
        'Collaborating with cross-functional teams to deliver high-quality solutions',
      ],
      technologies: ['Flutter', 'Dart', 'Riverpod', 'Firebase', 'CI/CD'],
      color: 'from-blue-500 to-purple-500',
    },
    {
      title: 'Flutter Developer',
      company: 'Teciza Technologies',
      location: 'Nehru Place, New Delhi, India',
      period: '2022 - 2024',
      description: [
        'Developed 10+ production-grade Flutter applications serving 80,000+ users',
        'Integrated payment gateways, real-time databases, and third-party APIs',
        'Optimized app performance resulting in 40% faster load times',
        'Mentored 3 junior developers and conducted code reviews',
      ],
      technologies: ['Flutter', 'Provider', 'BLoC', 'RESTful APIs', 'Razorpay'],
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800/50">
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
            Professional Experience
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"
            variants={itemVariants}
          />
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            My journey in mobile development and the impact I've made
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hidden md:block" />
                
                <motion.div
                  className="md:ml-16 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {exp.title}
                      </h3>
                      <div className="flex items-center text-lg text-gray-600 dark:text-gray-300 mb-2">
                        <Briefcase className="mr-2" size={18} />
                        {exp.company}
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <MapPin className="mr-2" size={16} />
                        {exp.location}
                      </div>
                    </div>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold mt-4 lg:mt-0">
                      <Calendar className="mr-2" size={18} />
                      {exp.period}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {exp.description.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-gray-600 dark:text-gray-300 flex items-start"
                      >
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};