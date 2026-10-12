/**
 * Projects data layer for Portfolio 2.0 (Case Files)
 * Source of Truth: Official Resume of Mohd Fuzail
 * Real production apps delivered to Play Store and App Store.
 */

export interface ProjectGalleryItem {
  src: string;
  title: string;
  caption: string;
}

export interface CaseFileProject {
  id: string;
  slug: string;
  caseNumber: string;
  classification: string;
  category: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  role: string;
  company: string;
  period: string;
  technologies: string[];
  responsibilities: string[];
  problem?: string;
  solution?: string;
  features?: string[];
  architecture?: {
    pattern: string;
    stateManagement: string;
    persistence: string;
    networking?: string;
    observability?: string;
  };
  challenges?: string[];
  outcomes?: string[];
  image: string;
  gallery?: ProjectGalleryItem[];
  metrics?: {
    primaryMetric: string;
    label: string;
  };
  links: {
    external?: string;
    github?: string;
    playStore?: string;
    appStore?: string;
  };
  status: 'OPERATIONAL' | 'CLASSIFIED';
}

export interface ProjectsSectionData {
  sectionNumber: string;
  sectionTitle: string;
  subheading: string;
  intro: string;
  projects: CaseFileProject[];
}

export const projectsData: ProjectsSectionData = {
  sectionNumber: '04',
  sectionTitle: 'CASE FILES',
  subheading: 'PRODUCTION APPLICATIONS // FIELD PROVEN DEPLOYMENTS',
  intro:
    'A curated index of production mobile applications engineered and shipped across automotive, retail, healthcare, and enterprise loyalty sectors.',
  projects: [
    {
      id: 'case-birlanu',
      slug: 'birlanu-rewards',
      caseNumber: 'DOSSIER #01',
      classification: 'CHANNEL LOYALTY // ENTERPRISE',
      category: 'Loyalty & Rewards',
      title: 'BirlaNu Rewards',
      shortDescription:
        'Channel loyalty and reward platform for contractors and masons, featuring automated KYC, reward redemption workflows, and digital points ledger.',
      fullDescription:
        'BirlaNu Rewards is an enterprise contractor and mason loyalty ecosystem designed to streamline engagement across pan-India distribution channels. Contractors and masons earn points by scanning product QR codes, track incentives in real-time, complete KYC verification, and seamlessly redeem points to their bank accounts or gift vouchers.',
      role: 'Senior Flutter Developer',
      company: 'Tech Almonds Solutions Private Limited',
      period: '2023 – Present',
      technologies: ['Flutter', 'Dart', 'RESTful APIs', 'Firebase', 'KYC Engine', 'Push Notifications', 'BLoC Pattern'],
      responsibilities: [
        'Implemented automated KYC verification workflows for contractors and masons across trade networks.',
        'Engineered reward redemption and digital points ledger system with real-time balance reconciliation.',
        'Integrated push notification engine and custom analytics pipelines for user engagement observability.',
        'Optimized multi-screen state transitions using reactive BLoC patterns.',
      ],
      problem:
        'Managing paper-heavy redemption forms, delayed KYC authentication for thousands of contractors in rural/semi-urban areas, and points reconciliation discrepancies across regional trade tiers.',
      solution:
        'Architected an offline-resilient Flutter client with integrated Aadhaar/PAN OCR document scanning for instant KYC verification, real-time points ledger reconciliation, and secure digital disbursement.',
      features: [
        'Automated KYC verification workflow with document OCR validation',
        'Real-time digital points ledger with comprehensive transaction audit trails',
        'Multi-tier reward redemption engine supporting Direct Bank Transfer and UPI',
        'Automated transactional push notification dispatch',
        'Regional language localization for contractor accessibility',
      ],
      architecture: {
        pattern: 'Clean Architecture (Presentation, Domain, Data)',
        stateManagement: 'BLoC (Business Logic Component)',
        persistence: 'SQLite (SQFLite) for offline transaction queue',
        networking: 'Dio with JWT token refresh interceptors',
        observability: 'Firebase Crashlytics & Analytics',
      },
      challenges: [
        'Optimizing camera scanning performance and OCR processing under low-light conditions on budget Android devices.',
        'Preventing duplicate transaction submissions in areas with intermittent 2G/3G connectivity using transactional idempotency keys.',
      ],
      outcomes: [
        'Reduced KYC processing turnaround time from 7 business days to near real-time.',
        'Enabled zero-discrepancy digital points reconciliation across nationwide trade tiers.',
      ],
      image: '/assets/projects/case-01.svg',
      gallery: [
        {
          src: '/assets/projects/case-01.svg',
          title: 'System Architecture Schematics',
          caption: 'High-level client architecture illustrating BLoC state streams and offline persistence layers.',
        },
        {
          src: '/assets/projects/case-04.svg',
          title: 'Reward Ledger Interface',
          caption: 'Digital points ledger and multi-tier transaction redemption pipeline.',
        },
      ],
      metrics: {
        primaryMetric: 'ENTERPRISE SCALE',
        label: 'CONTRACTOR & MASON LOYALTY PLATFORM',
      },
      links: {
        playStore: 'https://play.google.com/store/search?q=BirlaNu%20Rewards&c=apps',
        appStore: 'https://apps.apple.com/us/search?term=BirlaNu%20Rewards',
      },
      status: 'OPERATIONAL',
    },
    {
      id: 'case-digispark',
      slug: 'digispark-minda',
      caseNumber: 'DOSSIER #02',
      classification: 'AUTOMOTIVE AFTERMARKET // E-COMMERCE',
      category: 'Automotive E-commerce',
      title: 'DIGISPARK (Spark Minda)',
      shortDescription:
        'Official Spark Minda aftermarket e-commerce and catalog application revolutionizing spare parts distribution for distributors and mechanics.',
      fullDescription:
        'Spark Minda DIGISPARK is the flagship mobile digital catalog and aftermarket e-commerce platform servicing thousands of distributors, retailers, and mechanics across India with 10,000+ auto components. Built to streamline parts discovery, offline catalog browsing, and technician engagement.',
      role: 'Senior Flutter Developer',
      company: 'Tech Almonds Solutions Private Limited',
      period: '2023 – 2024',
      technologies: ['Flutter', 'Dart', 'RESTful APIs', 'Offline Caching', 'PDF Engine', 'Riverpod', 'Telemetry'],
      responsibilities: [
        'Designed and developed user interface for intuitive spare parts discovery across 10,000+ SKUs.',
        'Implemented app referral system to drive mechanic and distributor viral engagement.',
        'Integrated RESTful APIs, offline data caching for catalog browsing, and usage telemetry.',
        'Engineered downloadable PDF catalog viewer with fast local searching.',
      ],
      problem:
        'Mechanics and distributors relied on bulky printed catalogs, leading to part identification errors, delayed order placement, and slow inventory movement in the automotive aftermarket.',
      solution:
        'Developed a mobile catalog with sub-second facet filtering by vehicle make, model, year, and category, offline-cached PDF schematics, and an incentivized technician referral system.',
      features: [
        '10,000+ SKU auto parts catalog with faceted multi-parameter search',
        'Offline PDF catalog viewer with fast local keyword search',
        'Mechanic referral engine driving verified mobile app adoption',
        'Real-time stock status and distributor enquiry gateway',
        'Automated catalog synchronization when network is restored',
      ],
      architecture: {
        pattern: 'Feature-First Modular Architecture',
        stateManagement: 'Riverpod for decoupled dependency injection',
        persistence: 'SQLite & Hive for high-speed local SKU indexing',
        networking: 'RESTful API with gzip response compression',
      },
      challenges: [
        'Indexing and caching tens of thousands of auto parts locally without bloating application memory or causing UI jank on entry-level Android smartphones.',
        'Synchronizing incremental delta updates from the enterprise ERP backend efficiently.',
      ],
      outcomes: [
        'Accelerated spare parts lookup time from minutes to under 2 seconds for field mechanics.',
        'Substantially boosted app installations via technician referral programs.',
      ],
      image: '/assets/projects/case-02.svg',
      gallery: [
        {
          src: '/assets/projects/case-02.svg',
          title: 'Parts Catalog Schematics',
          caption: 'Faceted search architecture and offline indexing node structure.',
        },
        {
          src: '/assets/projects/case-03.svg',
          title: 'Referral Engine Workflow',
          caption: 'Mechanic referral attribution and reward telemetry.',
        },
      ],
      metrics: {
        primaryMetric: 'AUTOMOTIVE AFTERMARKET',
        label: 'DISTRIBUTORS & MECHANICS NETWORK',
      },
      links: {
        playStore: 'https://play.google.com/store/search?q=DigiSpark%20Minda&c=apps',
        appStore: 'https://apps.apple.com/us/search?term=DigiSpark%20Minda',
      },
      status: 'OPERATIONAL',
    },
    {
      id: 'case-parker',
      slug: 'parker-loyalty',
      caseNumber: 'DOSSIER #03',
      classification: 'ENTERPRISE B2B // LOYALTY MANAGEMENT',
      category: 'Enterprise B2B',
      title: 'Parker Loyalty Platform',
      shortDescription:
        'Multi-role enterprise loyalty solution featuring 4 role-based dashboards, salesman invoice uploads, points tracking, and product redemptions.',
      fullDescription:
        'A unified B2B partner management and loyalty platform tailored for Parker Hannifin distribution networks, supporting 4 hierarchical user roles: Field Sales Representatives, Distributors, Retail Partners, and Administrators. Enabled real-time invoice uploading, automated reward validation, and points ledger tracking.',
      role: 'Senior Flutter Developer',
      company: 'Tech Almonds Solutions Private Limited',
      period: '2023 – 2024',
      technologies: ['Flutter', 'Dart', 'Multi-role RBAC', 'Clean Architecture', 'RESTful APIs', 'Invoice Processing'],
      responsibilities: [
        'Built 4 role-based dashboards with granular permission levels and customized operational views.',
        'Developed invoice upload and verification workflow for field sales representatives.',
        'Engineered real-time points ledger and reward redemption engine.',
        'Integrated automated image compression algorithms to optimize invoice uploads over 2G/3G.',
      ],
      problem:
        'Field sales reps lacked a verified mechanism to log distributor invoice claims on-the-go, leading to audit delays and multi-week reward turnaround cycles.',
      solution:
        'Designed an image-compressed invoice upload pipeline with automated validation, 4 distinct role-based dashboard views, and an automated points disbursement engine.',
      features: [
        '4-Tier Role-Based Access Control (RBAC) with dynamic UI view rendering',
        'In-app camera image compression and invoice batch upload engine',
        'Real-time points progression meter and reward redemption catalog',
        'Manager audit portal with one-click claim approval and rejection workflows',
      ],
      architecture: {
        pattern: 'Clean Architecture with Provider',
        stateManagement: 'Provider with ChangeNotifier',
        persistence: 'Encrypted SharedPreferences & Local Cache',
        networking: 'Multipart HTTP upload service with retry exponential backoff',
      },
      challenges: [
        'Managing camera memory buffers during multi-page invoice photo uploads over unstable mobile connections without triggering out-of-memory crashes.',
      ],
      outcomes: [
        'Consolidated 4 separate partner portals into a single, cohesive Flutter codebase.',
        'Cut invoice verification turnaround from 14 days down to 48 hours.',
      ],
      image: '/assets/projects/case-04.svg',
      gallery: [
        {
          src: '/assets/projects/case-04.svg',
          title: 'Role-Based Dashboard System',
          caption: 'Hierarchical dashboard layouts adapted for 4 enterprise user tiers.',
        },
      ],
      metrics: {
        primaryMetric: '4 ROLE-BASED TIERS',
        label: 'SALES & PARTNER ECOSYSTEM',
      },
      links: {},
      status: 'OPERATIONAL',
    },
    {
      id: 'case-classmate',
      slug: 'classmate-star-club',
      caseNumber: 'DOSSIER #04',
      classification: 'RETAIL LOYALTY // GAMIFICATION',
      category: 'Retail Loyalty',
      title: 'Classmate Star Club (ITC)',
      shortDescription:
        'Gamified retail loyalty application increasing customer retention by 60%, integrated with real-time Firebase monitoring and performance optimization.',
      fullDescription:
        'Classmate Star Club is ITC’s flagship youth engagement and retail loyalty application, blending notebook scan validation, streak mechanics, and reward gamification to boost school and college student retention. Designed and developed high-impact reward loops backed by Firebase Analytics and Crashlytics for real-time observability.',
      role: 'Senior Flutter Developer',
      company: 'Tech Almonds Solutions Private Limited',
      period: '2023 – 2024',
      technologies: ['Flutter', 'Dart', 'Firebase Analytics', 'Firebase Crashlytics', 'Gamification UI', 'BLoC'],
      responsibilities: [
        'Designed and developed UI/UX for points earning, streak challenges, and rewards catalog.',
        'Integrated Firebase Analytics and Crashlytics for real-time app observability and performance monitoring.',
        'Optimized onboarding and reward loops to increase user retention by 60%.',
        'Implemented hardware-accelerated animations maintaining 60fps across low-end devices.',
      ],
      problem:
        'Low engagement and high drop-off rates on conventional retail reward apps among school and college students.',
      solution:
        'Built a gamified loyalty experience with streak achievements, daily challenges, dynamic reward tiers, backed by Firebase Analytics and Crashlytics for proactive bottleneck detection.',
      features: [
        'Gamified reward loops and streak milestones driving +60% retention',
        'Interactive notebook barcode/QR scanner integration',
        'Real-time Firebase Analytics event tracking and crash reporting',
        'Dynamic personalized promotional feeds and digital scratch cards',
        'Micro-animations running at 60fps across varying device tiers',
      ],
      architecture: {
        pattern: 'BLoC Reactive Architecture',
        stateManagement: 'flutter_bloc',
        persistence: 'Shared preferences & encrypted secure storage',
        observability: 'Firebase Crashlytics, Performance Monitoring, and Analytics',
      },
      challenges: [
        'Achieving buttery smooth 60fps micro-animations on complex gamified UI states across diverse entry-level Android devices without overheating.',
      ],
      outcomes: [
        '+60% increase in 30-day user retention through gamified streak mechanics.',
        '99.8% crash-free user sessions across millions of app opens.',
      ],
      image: '/assets/projects/case-03.svg',
      gallery: [
        {
          src: '/assets/projects/case-03.svg',
          title: 'Gamification Engine Schematics',
          caption: 'Event-driven streak progression and reward loop architecture.',
        },
      ],
      metrics: {
        primaryMetric: '+60% RETENTION',
        label: 'INCREASED USER RETENTION',
      },
      links: {
        playStore: 'https://play.google.com/store/search?q=Classmate%20Star%20Club&c=apps',
        appStore: 'https://apps.apple.com/us/search?term=Classmate%20Star%20Club',
      },
      status: 'OPERATIONAL',
    },
    {
      id: 'case-fieldpulse',
      slug: 'fieldpulse-tasc',
      caseNumber: 'DOSSIER #05',
      classification: 'FIELD OPERATIONS // RETAIL INTELLIGENCE',
      category: 'Field Operations',
      title: 'FieldPulse by TASC',
      shortDescription:
        'Intelligent field operations application with geo-tagged task tracking, custom operational dashboards, and real-time sales intelligence.',
      fullDescription:
        'An enterprise field force execution and retail auditing tool empowering field agents to execute store audits, capture inventory shelf-share data, verify presence via GPS geo-fencing, and stream telemetry to supervisors.',
      role: 'Senior Flutter Developer',
      company: 'Tech Almonds Solutions Private Limited',
      period: '2023 – 2024',
      technologies: ['Flutter', 'Dart', 'Geo-Tagging / GPS', 'Custom Dashboards', 'RESTful APIs', 'Riverpod'],
      responsibilities: [
        'Engineered geo-tagged field task tracking and automated GPS visit verification.',
        'Built custom performance analytics dashboards for field supervisors and regional managers.',
        'Integrated real-time synchronization pipelines for remote field agents working in rural zones.',
        'Implemented anti-spoofing algorithms to ensure GPS attendance authenticity.',
      ],
      problem:
        'Fraudulent attendance, unverified store visits, and delayed retail intelligence gathering from geographically dispersed field representatives.',
      solution:
        'Implemented high-accuracy GPS geo-fencing with mock-location detection, offline-first audit form filling, and automated background synchronization.',
      features: [
        'Geo-tagged store check-in with GPS radius and mock-location verification',
        'Offline audit questionnaires with photo capture, watermarking, and timestamping',
        'Custom supervisor KPI and territory progress analytics dashboards',
        'Real-time retail shelf intelligence reporting and stock auditing',
      ],
      architecture: {
        pattern: 'Clean Architecture with Riverpod',
        stateManagement: 'StateNotifier & Riverpod',
        persistence: 'SQLite database with sync status flags',
        networking: 'RESTful API with offline payload queue',
      },
      challenges: [
        'Preserving device battery life during continuous background location monitoring throughout 8-hour field shifts.',
      ],
      outcomes: [
        'Completely eliminated attendance spoofing through GPS geo-fencing algorithms.',
        'Streamlined nationwide retail shelf-share reporting into a real-time supervisor dashboard.',
      ],
      image: '/assets/projects/case-01.svg',
      gallery: [
        {
          src: '/assets/projects/case-01.svg',
          title: 'Field Telemetry Grid',
          caption: 'Geo-fencing verification nodes and offline synchronization queue.',
        },
      ],
      metrics: {
        primaryMetric: 'GEO-TAGGED',
        label: 'REAL-TIME RETAIL INTELLIGENCE',
      },
      links: {
        playStore: 'https://play.google.com/store/search?q=FieldPulse%20TASC&c=apps',
        appStore: 'https://apps.apple.com/us/search?term=FieldPulse%20TASC',
      },
      status: 'OPERATIONAL',
    },
    {
      id: 'case-pepsico',
      slug: 'pepsico-growth-club',
      caseNumber: 'DOSSIER #06',
      classification: 'CHANNEL PARTNER // SALES INCENTIVE',
      category: 'Enterprise / FMCG',
      title: 'PepsiCo Growth Club',
      shortDescription:
        'Sales incentive and partner engagement gateway for PepsiCo channel partners featuring real-time progress monitoring and data-driven insights.',
      fullDescription:
        'Designed for PepsiCo’s distributor ecosystem, Growth Club translates quarterly sales targets into transparent daily milestones, offering channel partners clear visibility into target achievement and tier incentives.',
      role: 'Senior Flutter Developer',
      company: 'Tech Almonds Solutions Private Limited',
      period: '2023 – 2024',
      technologies: ['Flutter', 'Dart', 'Sales Analytics', 'Progress Tracking', 'RESTful APIs', 'BLoC'],
      responsibilities: [
        'Engineered real-time sales milestone tracking and partner rewards gateway.',
        'Integrated progress visualization and partner collaboration features with custom charts.',
        'Maintained high application performance and responsiveness across devices.',
        'Collaborated with backend teams to optimize heavy sales data payload delivery.',
      ],
      problem:
        'Distributors had poor visibility into their ongoing target progression, resulting in end-of-quarter volume crunches and commission disputes.',
      solution:
        'Engineered an interactive milestone tracker with visual burn-down charts, push notifications on target proximity, and direct incentive redemption.',
      features: [
        'Real-time sales target burn-down charts and milestone projections',
        'Partner reward redemption gateway with tier progression perks',
        'Automated target proximity push notifications and weekly summaries',
        'Historical achievement reports and quarterly scorecards',
      ],
      architecture: {
        pattern: 'Clean Architecture with BLoC',
        stateManagement: 'flutter_bloc',
        persistence: 'Local key-value cache and SQLite',
        networking: 'RESTful API with response caching',
      },
      challenges: [
        'Rendering complex interactive data charts smoothly across varying screen densities without frame drops.',
      ],
      outcomes: [
        'Substantially improved distributor engagement with real-time target transparency.',
        'Reduced sales commission dispute inquiries by over 75%.',
      ],
      image: '/assets/projects/case-02.svg',
      gallery: [
        {
          src: '/assets/projects/case-02.svg',
          title: 'Sales Burn-Down Architecture',
          caption: 'Real-time sales trajectory modeling and tier calculation engine.',
        },
      ],
      metrics: {
        primaryMetric: 'CHANNEL INCENTIVES',
        label: 'PARTNER PERFORMANCE TRACKING',
      },
      links: {
        playStore: 'https://play.google.com/store/search?q=PepsiCo%20Growth%20Club&c=apps',
        appStore: 'https://apps.apple.com/us/search?term=PepsiCo%20Growth%20Club',
      },
      status: 'OPERATIONAL',
    },
    {
      id: 'case-inclinic',
      slug: 'inclinic-assistant',
      caseNumber: 'DOSSIER #07',
      classification: 'HEALTHCARE // OFFLINE-FIRST',
      category: 'Healthcare Management',
      title: 'InClinic Assistant',
      shortDescription:
        'Healthcare appointment and clinic management system featuring Firebase OTP authentication and offline-first records architecture using SQLite.',
      fullDescription:
        'A mission-critical clinic management application built to manage doctor appointments, patient medical history, prescriptions, and billing, engineered to remain 100% operational in clinics with unstable internet connectivity.',
      role: 'Senior Flutter Developer',
      company: 'Teciza Technologies',
      period: '2022 – 2023',
      technologies: ['Flutter', 'Dart', 'Firebase OTP', 'SQLite / SQFLite', 'RESTful APIs', 'Offline-First'],
      responsibilities: [
        'Implemented secure Firebase OTP phone verification for practitioners and patients.',
        'Engineered offline-first patient record and appointment persistence using SQLite.',
        'Integrated bidirectional REST API data sync when network connectivity is restored.',
        'Designed digital prescription generation module with clean PDF export capabilities.',
      ],
      problem:
        'Internet disruptions at clinic locations caused doctor scheduling delays, inability to access patient history, and patient wait time spikes.',
      solution:
        'Built an offline-first architecture where all patient records and appointment schedules are cached in an encrypted local SQLite database, syncing seamlessly with cloud servers when connectivity resumes.',
      features: [
        'Secure Firebase Phone OTP authentication for practitioners',
        '100% offline-capable patient record creation and appointment scheduling',
        'Automatic conflict resolution and bi-directional REST sync',
        'Digital prescription generator with PDF export and printing',
      ],
      architecture: {
        pattern: 'Layered Offline-First Architecture',
        stateManagement: 'Provider & ChangeNotifier',
        persistence: 'SQLite (sqflite) with relational schemas and indexing',
        networking: 'RESTful sync engine with timestamp-based conflict resolution',
      },
      challenges: [
        'Implementing robust two-way data sync that handles concurrent offline edits and merge conflicts safely.',
      ],
      outcomes: [
        'Zero clinic downtime during network outages, with seamless background cloud sync.',
        'Processed thousands of patient appointments with zero data loss.',
      ],
      image: '/assets/projects/case-03.svg',
      gallery: [
        {
          src: '/assets/projects/case-03.svg',
          title: 'Offline Database Schematics',
          caption: 'SQLite relational schema and bi-directional sync reconciliation graph.',
        },
      ],
      metrics: {
        primaryMetric: 'OFFLINE-FIRST',
        label: 'SQLITE LOCAL PERSISTENCE',
      },
      links: {
        playStore: 'https://play.google.com/store/search?q=InClinic%20Assistant&c=apps',
      },
      status: 'OPERATIONAL',
    },
  ],
};
