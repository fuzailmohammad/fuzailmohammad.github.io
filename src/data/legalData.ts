/**
 * Centralized Legal Documentation Data Layer for FuzailVerse
 * General platform policy for FuzailVerse apps and digital services
 * Website: https://fuzailverse.pages.dev/
 * Official Contact: mohdfuzail.dev@gmail.com
 */

export interface LegalSection {
  id: string;
  number: string;
  title: string;
  paragraphs: string[];
  subsections?: Array<{
    id: string;
    subtitle: string;
    content: string[];
  }>;
}

export interface LegalDocumentMetadata {
  title: string;
  subtitle: string;
  effectiveDate: string;
  lastUpdated: string;
  contactEmail: string;
  websiteUrl: string;
  operatorName: string;
  pdfFileName: string;
  pdfPath: string;
}

export const legalMetadata = {
  brandName: 'FuzailVerse',
  domain: 'https://fuzailverse.pages.dev',
  canonicalPrivacyUrl: 'https://fuzailverse.pages.dev/privacy-policy/',
  canonicalTermsUrl: 'https://fuzailverse.pages.dev/terms-and-conditions/',
  contactEmail: 'mohdfuzail.dev@gmail.com',
  operatorName: 'Mohammad Fuzail',
  effectiveDate: '31 October 2026',
  lastUpdated: '31 October 2026',
};

export const privacyPolicyData = {
  metadata: {
    title: 'Privacy Policy',
    subtitle: 'General policy for FuzailVerse apps and digital services',
    effectiveDate: '31 October 2026',
    lastUpdated: '31 October 2026',
    contactEmail: 'mohdfuzail.dev@gmail.com',
    websiteUrl: 'https://fuzailverse.pages.dev/privacy-policy/',
    operatorName: 'Mohammad Fuzail',
    pdfFileName: 'FuzailVerse_Privacy_Policy.pdf',
    pdfPath: '/documents/FuzailVerse_Privacy_Policy.pdf',
  },
  notice:
    "This is a platform-wide framework, not a claim that every app collects the same data. Each app's permissions, SDKs, network traffic, storage, retention and deletion apply based on its actual release.",
  sections: [
    {
      id: 'scope-and-operator',
      number: '1',
      title: 'Scope and operator',
      paragraphs: [
        'This Privacy Policy applies to mobile applications, websites and related digital services published or operated under the FuzailVerse name (the “Services”). Features and data practices may differ between Services. An app-specific notice, where provided, explains additional details for that app.',
        'Privacy contact: mohdfuzail.dev@gmail.com. Before publication, the operator should add any full legal name and postal address required by applicable law.',
      ],
    },
    {
      id: 'information-processed',
      number: '2',
      title: 'Information that may be processed',
      paragraphs: [
        'Information you provide: Depending on the Service, you may submit text, files, images, feedback, support messages, account details or other content needed for a feature.',
        'Device and technical information: Depending on the app and its SDK configuration, this may include device model, operating system and app version, language, time zone, app-instance identifiers, IP address, diagnostic events, performance information and crash logs.',
        'Usage information: Analytics tools may record feature use, screens viewed, session events and interactions. The precise events and identifiers depend on the app implementation and consent settings.',
        'Permissions and sensor data: An app may request camera, microphone, location, photos/media, notifications, Bluetooth or file access when needed for its features. The app should explain the purpose when requesting permission. A permission being available does not necessarily mean the data is uploaded to FuzailVerse.',
        'Content handled by app features: Content may be stored locally, processed by a FuzailVerse server, or shared with a service you select. The relevant app-specific notice must state which applies.',
      ],
    },
    {
      id: 'purposes-of-processing',
      number: '3',
      title: 'Purposes of processing',
      paragraphs: [
        'We may process information, where applicable, to provide app features; save preferences or history; respond to support requests; diagnose crashes and performance issues; maintain security; prevent abuse; understand aggregate usage; improve the Services; and comply with legal obligations.',
      ],
    },
    {
      id: 'local-storage-servers-sharing',
      number: '4',
      title: 'Local storage, servers and sharing',
      paragraphs: [
        'Some apps store settings, history or generated content locally on your device. Other apps may use cloud storage, backend APIs or third-party platforms. Local information may be removed using in-app controls, clearing app data or uninstalling the app, subject to device backup and restore behaviour.',
        'We do not sell personal information. Information may be disclosed to service providers supporting a Service (such as hosting, analytics, crash reporting, authentication, maps, payments or customer support), when you direct us to share content, when required by law, or to protect users and the Services. The providers actually used must be reflected in the relevant app-specific disclosures.',
      ],
    },
    {
      id: 'analytics-and-crash-reporting',
      number: '5',
      title: 'Analytics and crash reporting',
      paragraphs: [
        'Some FuzailVerse apps may use Google Firebase Analytics and Firebase Crashlytics. Depending on configuration, these services may process app events, app-instance identifiers, device and app information, crash traces and diagnostic data. Not every FuzailVerse app necessarily uses these services.',
        'See Firebase privacy and security and Google Privacy Policy. Actual collection depends on SDK versions, configuration, consent controls and the released app.',
      ],
    },
    {
      id: 'advertising-and-purchases',
      number: '6',
      title: 'Advertising and purchases',
      paragraphs: [
        'Some apps or releases may be ad-free; others may use advertising services such as Google AdMob. Where advertising is used, the relevant app-specific notice and app-store disclosures must identify the advertising SDKs and explain applicable data processing and consent choices. Do not assume all FuzailVerse apps display ads.',
        'If a Service offers in-app purchases or subscriptions, payment details are generally handled by the applicable app store or payment provider, whose terms and privacy policy also apply.',
      ],
    },
    {
      id: 'retention-and-deletion',
      number: '7',
      title: 'Retention and deletion',
      paragraphs: [
        'We retain information only for as long as reasonably necessary for the purposes described, unless a longer period is required or permitted by law. Retention varies by app, data type and service provider.',
        'You may be able to delete local information through app controls or device settings. For account-based Services, use any available in-app account deletion feature. You may also contact us. Uninstalling an app does not necessarily delete information already held by third-party providers or backups.',
      ],
    },
    {
      id: 'security-and-international',
      number: '8',
      title: 'Security and international processing',
      paragraphs: [
        'We use reasonable technical and organisational measures appropriate to the nature of the information and Services. No method of electronic storage or transmission is completely secure.',
        'Service providers may process information in countries other than your own. Where required, appropriate safeguards should be used for international transfers.',
      ],
    },
    {
      id: 'childrens-privacy',
      number: '9',
      title: "Children's privacy",
      paragraphs: [
        'Unless a Service expressly states otherwise and has been designed and reviewed for that purpose, FuzailVerse Services are not directed to children. Store age ratings and target-audience declarations must be accurate. We do not knowingly collect children\'s personal information in a manner prohibited by applicable law. A parent or guardian who believes a child has provided information may contact us.',
      ],
    },
    {
      id: 'your-rights-and-choices',
      number: '10',
      title: 'Your rights and choices',
      paragraphs: [
        'Depending on your location and applicable law, you may have rights to request access, correction, deletion, restriction or portability of personal information, or to object to certain processing. You can also control device permissions and use available app controls.',
        'To make a privacy request, email mohdfuzail.dev@gmail.com and identify the app and nature of your request. We may need to verify your request.',
      ],
    },
    {
      id: 'changes-and-disclosures',
      number: '11',
      title: 'Changes and app-specific disclosures',
      paragraphs: [
        'We may update this policy when Services, SDKs or legal requirements change. The “Last updated” date should be revised when material changes are made. Each app\'s store listing and in-app privacy link should point to an accessible current version.',
        'Before releasing an app, its permissions, SDKs, collected data, purposes, sharing, storage, retention, deletion and network behaviour must be reviewed. Google Play Data Safety and Apple privacy disclosures must match the actual released build.',
      ],
    },
    {
      id: 'contact',
      number: '12',
      title: 'Contact',
      paragraphs: [
        'For privacy questions or requests, contact FuzailVerse at mohdfuzail.dev@gmail.com.',
      ],
    },
  ],
};

export const termsConditionsData = {
  metadata: {
    title: 'Terms & Conditions',
    subtitle: 'General terms for FuzailVerse apps and digital services',
    effectiveDate: '31 October 2026',
    lastUpdated: '31 October 2026',
    contactEmail: 'mohdfuzail.dev@gmail.com',
    websiteUrl: 'https://fuzailverse.pages.dev/terms-and-conditions/',
    operatorName: 'Mohammad Fuzail',
    pdfFileName: 'FuzailVerse_Terms_and_Conditions.pdf',
    pdfPath: '/documents/FuzailVerse_Terms_and_Conditions.pdf',
  },
  notice:
    'Confirm the operator\'s legal details, governing law, paid-feature terms and app-specific requirements. This document is a general starting point and is not legal advice.',
  sections: [
    {
      id: 'agreement-and-scope',
      number: '1',
      title: 'Agreement and scope',
      paragraphs: [
        'These Terms & Conditions (“Terms”) apply to mobile applications, websites and related digital services published or operated under the FuzailVerse name (“Services”). By downloading, accessing or using a Service, you agree to these Terms. If you do not agree, do not use that Service.',
        'Some Services may have additional terms, purchase conditions or feature-specific rules. Those additional terms apply alongside these Terms and prevail where they expressly address a specific feature.',
      ],
    },
    {
      id: 'eligibility-and-lawful-use',
      number: '2',
      title: 'Eligibility and lawful use',
      paragraphs: [
        'You must be legally permitted to use the Service in your location. If you are a minor, you may use a Service only with the involvement and permission of a parent or legal guardian where required by law.',
        'You agree to use the Services lawfully and not to misuse or disrupt them, interfere with security, attempt unauthorised access, or use a Service to infringe another person\'s rights. Restrictions on reverse engineering apply only to the extent permitted by applicable law.',
      ],
    },
    {
      id: 'features-and-availability',
      number: '3',
      title: 'Features and availability',
      paragraphs: [
        'Features differ by app and may include scanning, generating, storing or sharing content; productivity tools; games; utilities; or other functions described in the relevant store listing or within the app.',
        'We may add, change, suspend or discontinue features for maintenance, security, legal, technical or business reasons. We do not guarantee that every feature will always be available, compatible with every device or error-free.',
      ],
    },
    {
      id: 'user-content-and-responsibility',
      number: '4',
      title: 'User content and responsibility',
      paragraphs: [
        'You are responsible for content you enter, create, scan, upload, store or share using a Service and for ensuring that you have the necessary rights and permissions.',
        'QR codes, barcodes, links, files and other content may lead to third-party websites or services. Review a destination before opening it, downloading content, making a payment or sharing personal information. FuzailVerse does not control third-party content or guarantee its accuracy, safety or availability.',
      ],
    },
    {
      id: 'intellectual-property-and-licence',
      number: '5',
      title: 'Intellectual property and licence',
      paragraphs: [
        'The Services, including their software, design, branding, text, graphics and other materials, are owned by or licensed to FuzailVerse and are protected by applicable intellectual-property laws.',
        'Subject to these Terms, you receive a limited, personal, non-exclusive, non-transferable and revocable licence to use the relevant app for its intended purpose. You may not copy, modify, distribute, sell, lease or create derivative works from the Services except where authorised by us or permitted by applicable law.',
      ],
    },
    {
      id: 'third-party-services',
      number: '6',
      title: 'Third-party services',
      paragraphs: [
        'A Service may integrate or link to third-party services, SDKs, websites, payment providers, analytics or advertising providers. Those services are governed by their own terms and privacy policies. We are not responsible for third-party services that we do not control.',
      ],
    },
    {
      id: 'advertising-and-purchases',
      number: '7',
      title: 'Advertising and purchases',
      paragraphs: [
        'Some apps or versions may display advertising; others may not. Where advertising is present, it should be presented in accordance with applicable law and platform policies. Availability and format may vary by app, region and release.',
        'Any paid feature, subscription or in-app purchase will be presented with its price, billing period and applicable conditions before purchase. Purchases made through an app store are also subject to that store\'s payment, cancellation and refund rules.',
      ],
    },
    {
      id: 'disclaimers',
      number: '8',
      title: 'Disclaimers',
      paragraphs: [
        'To the maximum extent permitted by law, the Services are provided “as is” and “as available”, without warranties that cannot legally be excluded. We do not warrant uninterrupted operation, compatibility with every device, error-free results, or that content produced or scanned by an app will be accurate or suitable for a particular purpose.',
        'An app that scans or interprets codes is a convenience tool. You are responsible for checking destinations and independently verifying important information before acting on it.',
      ],
    },
    {
      id: 'limitation-of-liability',
      number: '9',
      title: 'Limitation of liability',
      paragraphs: [
        'To the maximum extent permitted by applicable law, FuzailVerse will not be liable for indirect, incidental, special, consequential or punitive loss, or loss of data, profits or goodwill arising from use of a Service.',
        'Nothing in these Terms excludes or limits liability that cannot be excluded or limited under applicable law. Where liability may legally be limited, it is limited to the minimum extent permitted by law.',
      ],
    },
    {
      id: 'suspension-and-termination',
      number: '10',
      title: 'Suspension and termination',
      paragraphs: [
        'We may suspend or restrict access where reasonably necessary to protect users, the Services or our systems, address misuse, or comply with law. You may stop using a Service at any time by uninstalling it or ceasing access. Terms that by their nature should continue after termination will remain in effect.',
      ],
    },
    {
      id: 'changes-to-terms',
      number: '11',
      title: 'Changes to these Terms',
      paragraphs: [
        'We may revise these Terms from time to time. We will publish the updated version and revise the “Last updated” date. Continued use after an update takes effect means you accept the revised Terms to the extent permitted by law.',
      ],
    },
    {
      id: 'governing-law-and-contact',
      number: '12',
      title: 'Governing law and contact',
      paragraphs: [
        'These Terms are subject to applicable laws. The operator should confirm the appropriate governing law, jurisdiction and dispute-resolution provisions based on its place of establishment and the markets in which the Services are offered. Do not assume a legal entity or jurisdiction that has not been confirmed.',
        'Questions about these Terms: mohdfuzail.dev@gmail.com (FuzailVerse).',
      ],
    },
  ],
};
