/**
 * Experience data layer for Portfolio 2.0 (Field Operations Log)
 * Source of Truth: Official Resume of Mohd Fuzail
 * Factual, normalized, no exaggeration.
 */

export interface ExperienceRecord {
  id: string;
  operationCode: string;
  role: string;
  company: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string;
  current: boolean;
  summary: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
}

export interface ExperienceSectionData {
  sectionNumber: string;
  sectionTitle: string;
  subheading: string;
  records: ExperienceRecord[];
}

export const experienceData: ExperienceSectionData = {
  sectionNumber: '02',
  sectionTitle: 'EXPERIENCE',
  subheading: 'PROFESSIONAL PRODUCTION TRACK RECORD // GOTHAM DOSSIER',
  records: [
    {
      id: 'exp-tech-almonds',
      operationCode: 'FIELD-RECORD // 01',
      role: 'Senior Flutter Developer',
      company: 'Tech Almonds Solutions Private Limited',
      location: 'Gurugram, Haryana',
      period: 'July 2024 — Present',
      startDate: 'July 2024',
      endDate: 'Present',
      current: true,
      summary:
        'Leading end-to-end mobile architecture and release engineering for enterprise-grade mobile systems across Android and iOS.',
      responsibilities: [
        'Leading end-to-end Flutter development for enterprise-grade mobile applications.',
        'Managing concurrent mobile projects, delivering high-quality releases ahead of schedule.',
        'Resolving critical iOS and Android platform-specific issues and implementing features for legacy apps.',
        'Mentoring junior developers through structured code reviews and enforcing unified coding standards.',
        'Managing iOS and Android releases using Fastlane and automated CI/CD pipelines.',
      ],
      achievements: [
        'Optimized development workflows, improving application stability by 40% and reducing crash rates via proactive Firebase Crashlytics telemetry.',
      ],
      technologies: [
        'Flutter',
        'Dart',
        'Fastlane',
        'Firebase Crashlytics',
        'CI/CD Pipelines',
        'iOS / Swift',
        'Android / Kotlin',
      ],
    },
    {
      id: 'exp-teciza',
      operationCode: 'FIELD-RECORD // 02',
      role: 'Flutter Developer',
      company: 'Teciza Technologies Private Limited',
      location: 'Nehru Place, Delhi',
      period: 'May 2022 — March 2024',
      startDate: 'May 2022',
      endDate: 'March 2024',
      current: false,
      summary:
        'Engineered, integrated, and maintained 12+ high-performance commercial Flutter applications from prototype to store release.',
      responsibilities: [
        'Developed and maintained 12+ Flutter applications with RESTful API integrations and SQFLite local storage.',
        'Integrated Razorpay payment gateway supporting high-volume, secure financial transactions.',
        'Built reusable UI components and contributed to a unified design system.',
        'Collaborated with design and product teams to enhance user experience and consistency across products.',
        'Implemented comprehensive testing strategies and automated builds using CI/CD tools.',
      ],
      achievements: [
        'Processed over ₹10 million in transactions via Razorpay payment gateway integration.',
        'Improved cross-project development efficiency by 30% through the implementation of a reusable UI component library.',
      ],
      technologies: [
        'Flutter',
        'Dart',
        'RESTful APIs',
        'SQLite / SQFLite',
        'Razorpay Integration',
        'CI/CD Tools',
        'State Management',
      ],
    },
  ],
};
