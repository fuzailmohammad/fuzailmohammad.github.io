/**
 * Profile data layer for Portfolio 2.0
 * Source of Truth: Official Resume of Mohd Fuzail
 * No fabricated or embellished data.
 */

export interface ProfileData {
  name: string;
  displayName: string;
  moniker: string;
  role: string;
  shortHeadline: string;
  experienceYears: string;
  status: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  sectorTag: string;
  securityClearance: string;
  hero: {
    eyebrow: string;
    headlinePart1: string;
    headlineAccent: string;
    headlinePart2: string;
    supportingText: string;
    primaryCta: {
      label: string;
      href: string;
    };
    secondaryCta: {
      label: string;
      href: string;
    };
    telemetry: Array<{
      label: string;
      value: string;
    }>;
  };
  about: {
    sectionNumber: string;
    sectionTitle: string;
    tagline: string;
    bioParagraphs: string[];
    dossierQuote: string;
    stats: Array<{
      value: string;
      label: string;
      subtext: string;
    }>;
    education: {
      degree: string;
      institution: string;
      period: string;
      score: string;
      location: string;
    };
    languages: Array<{
      language: string;
      proficiency: string;
    }>;
  };
}

export const profileData: ProfileData = {
  name: 'Mohd Fuzail',
  displayName: 'Mohd Fuzail',
  moniker: 'MF',
  role: 'Senior Flutter Developer | Mobile Application Specialist',
  shortHeadline: 'Senior Flutter Developer',
  experienceYears: '3+',
  status: 'OPERATIONAL // SENIOR FLUTTER DEVELOPER',
  location: 'New Delhi, India',
  email: 'mohdfuzail00786@gmail.com',
  phone: '+91 7042461480',
  github: 'https://github.com/fuzailmohammad',
  linkedin: 'https://www.linkedin.com/in/mohammad-fuzail',
  resumeUrl: '/documents/Mohammad_Fuzail_Resume.pdf',
  sectorTag: 'OPERATIONAL DOSSIER // MOBILE SPECIALIST',
  securityClearance: 'PRODUCTION VERIFIED // SDLC FULL-CYCLE',
  hero: {
    eyebrow: 'SENIOR FLUTTER DEVELOPER · MOBILE SPECIALIST',
    headlinePart1: 'ENGINEERING MOBILE SYSTEMS',
    headlineAccent: 'FROM THE SHADOWS',
    headlinePart2: 'TO 100K+ USERS.',
    supportingText:
      'Senior Flutter Developer with 3+ years of experience delivering production-grade cross-platform applications for iOS and Android. Proven track record of delivering 15+ production apps across automotive, retail, healthcare, and field operations.',
    primaryCta: {
      label: 'ACCESS CASE FILES',
      href: '#projects',
    },
    secondaryCta: {
      label: 'DOWNLOAD DOSSIER',
      href: '/documents/Mohammad_Fuzail_Resume.pdf',
    },
    telemetry: [
      { label: 'COORDINATES', value: 'NEW DELHI, INDIA' },
      { label: 'EXPERIENCE', value: '3+ YEARS PRODUCTION' },
      { label: 'SPECIALIZATION', value: 'FLUTTER / DART / FULL SDLC' },
    ],
  },
  about: {
    sectionNumber: '01',
    sectionTitle: 'BEHIND THE MASK',
    tagline: 'SENIOR FLUTTER DEVELOPER WITH 3+ YEARS CRAFTING HIGH-PERFORMANCE MOBILE APPS.',
    bioParagraphs: [
      'I am an accomplished Senior Flutter Developer with 3+ years of hands-on experience architecting and delivering production-grade cross-platform applications for Android and iOS.',
      'Throughout my career across Tech Almonds Solutions and Teciza Technologies, I have built and maintained 15+ production applications serving over 100,000 active users in automotive, retail, healthcare, and field operations.',
      'My core expertise spans the full software development lifecycle: reactive state management (BLoC, Riverpod, Provider), offline-first architectures with SQLite, secure Razorpay transaction gateways processing over ₹10M+, and automated CI/CD deployment pipelines using Fastlane, Codemagic, and Bitrise.',
    ],
    dossierQuote:
      '“Experienced across the full SDLC—from architectural design and state modeling to proactive crash analysis, automated CI/CD pipelines, and multi-store deployment.”',
    stats: [
      {
        value: '3+ Years',
        label: 'EXPERIENCE',
        subtext: 'Delivering production mobile apps',
      },
      {
        value: '15+',
        label: 'PRODUCTION APPS',
        subtext: 'Delivered to Play Store & App Store',
      },
      {
        value: '100K+',
        label: 'ACTIVE USERS',
        subtext: 'Served across enterprise platforms',
      },
      {
        value: '₹10M+',
        label: 'PAYMENTS PROCESSED',
        subtext: 'High-volume Razorpay gateways',
      },
    ],
    education: {
      degree: 'Bachelor of Technology (Electronics & Communication Engineering)',
      institution: 'Jamia Hamdard University',
      location: 'New Delhi, India',
      period: '2017 – 2021',
      score: 'CGPA: 7.50 / 10',
    },
    languages: [
      { language: 'English', proficiency: 'Professional' },
      { language: 'Hindi', proficiency: 'Native' },
      { language: 'Urdu', proficiency: 'Native' },
    ],
  },
};
