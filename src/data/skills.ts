/**
 * Skills data layer for Portfolio 2.0 (Batcave Arsenal)
 * Source of Truth: Official Resume of Mohd Fuzail
 * Structured strictly by technical disciplines directly confirmed in resume.
 */

export interface SkillItem {
  name: string;
  tag?: string;
}

export interface SkillCategory {
  id: string;
  categoryTitle: string;
  tacticalCode: string;
  description: string;
  skills: SkillItem[];
}

export interface SkillsSectionData {
  sectionNumber: string;
  sectionTitle: string;
  subheading: string;
  intro: string;
  categories: SkillCategory[];
}

export const skillsData: SkillsSectionData = {
  sectionNumber: '03',
  sectionTitle: 'BATCAVE ARSENAL',
  subheading: 'TECHNICAL CAPABILITIES // VERIFIED PRODUCTION TOOLKIT',
  intro:
    'Core technologies, architectural patterns, reactive state frameworks, and DevOps pipelines deployed across production mobile systems.',
  categories: [
    {
      id: 'languages-frameworks',
      categoryTitle: 'LANGUAGES & FRAMEWORKS',
      tacticalCode: 'ARSENAL-01',
      description: 'Primary cross-platform frameworks and native platform languages.',
      skills: [
        { name: 'Flutter', tag: 'Core Framework' },
        { name: 'Dart', tag: 'Primary Language' },
        { name: 'Kotlin', tag: 'Android Native (Basic)' },
        { name: 'Swift', tag: 'iOS Native (Basic)' },
        { name: 'C / C++', tag: 'Foundational' },
      ],
    },
    {
      id: 'state-management',
      categoryTitle: 'STATE MANAGEMENT',
      tacticalCode: 'ARSENAL-02',
      description: 'Reactive state architectures, data streams, and event-driven patterns.',
      skills: [
        { name: 'BLoC Pattern', tag: 'Enterprise State' },
        { name: 'Riverpod', tag: 'Declarative State' },
        { name: 'Provider', tag: 'Inherited Widget' },
      ],
    },
    {
      id: 'backend-apis',
      categoryTitle: 'BACKEND & APIS',
      tacticalCode: 'ARSENAL-03',
      description: 'Data transport protocols, API consumption, and serializations.',
      skills: [
        { name: 'RESTful APIs', tag: 'Network Client' },
        { name: 'JSON Parsing', tag: 'Serialization' },
        { name: 'GraphQL', tag: 'Query Interface (Familiar)' },
      ],
    },
    {
      id: 'cloud-storage',
      categoryTitle: 'CLOUD & LOCAL STORAGE',
      tacticalCode: 'ARSENAL-04',
      description: 'Cloud databases, user authentication, analytics, and offline persistence.',
      skills: [
        { name: 'Firebase Auth', tag: 'Identity' },
        { name: 'Cloud Firestore', tag: 'NoSQL Cloud' },
        { name: 'Firebase Crashlytics', tag: 'Observability' },
        { name: 'Firebase Analytics', tag: 'Telemetry' },
        { name: 'SQLite / SQFLite', tag: 'Offline Storage' },
      ],
    },
    {
      id: 'architecture-payments',
      categoryTitle: 'ARCHITECTURE & PAYMENTS',
      tacticalCode: 'ARSENAL-05',
      description: 'Software design patterns, modular architecture, and payment gateways.',
      skills: [
        { name: 'Clean Architecture', tag: 'Layer Separation' },
        { name: 'MVVM & MVC', tag: 'Design Patterns' },
        { name: 'Offline-First Design', tag: 'Resilience' },
        { name: 'Razorpay Gateway', tag: 'Payments SDK' },
      ],
    },
    {
      id: 'devops-testing',
      categoryTitle: 'DEVOPS, TOOLS & TESTING',
      tacticalCode: 'ARSENAL-06',
      description: 'CI/CD automated deployment, store release management, and testing suites.',
      skills: [
        { name: 'Fastlane', tag: 'Release Automation' },
        { name: 'Codemagic & Bitrise', tag: 'Mobile CI/CD' },
        { name: 'Git & GitHub / GitLab', tag: 'VCS' },
        { name: 'Unit & Widget Testing', tag: 'Verification' },
        { name: 'Integration Testing', tag: 'E2E Testing' },
        { name: 'Code Reviews & Standards', tag: 'Quality' },
      ],
    },
  ],
};
