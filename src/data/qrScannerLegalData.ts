/**
 * QR Scanner & Generator — Dedicated Privacy Policy Data Layer
 * Application: QR Scanner & Generator
 * Package: com.fuzailverse.qrscanner
 * Developer: FuzailVerse / Mohammad Fuzail
 * Official Privacy Contact: mohdfuzail.dev@gmail.com
 * Canonical URL: https://fuzailverse.pages.dev/qr-scanner/privacy-policy/
 */

export interface QRScannerLegalSection {
  id: string;
  number: string;
  title: string;
  paragraphs: string[];
  listItems?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface QRScannerLegalMetadata {
  title: string;
  appName: string;
  packageName: string;
  subtitle: string;
  effectiveDate: string;
  lastUpdated: string;
  contactEmail: string;
  canonicalUrl: string;
  operatorName: string;
  developerBrand: string;
}

export const qrScannerLegalMetadata: QRScannerLegalMetadata = {
  title: 'Privacy Policy',
  appName: 'QR Scanner & Generator',
  packageName: 'com.fuzailverse.qrscanner',
  subtitle: 'Application-Specific Privacy Policy for Android',
  effectiveDate: '1 November 2026',
  lastUpdated: '1 November 2026',
  contactEmail: 'mohdfuzail.dev@gmail.com',
  canonicalUrl: 'https://fuzailverse.pages.dev/qr-scanner/privacy-policy/',
  operatorName: 'Mohammad Fuzail',
  developerBrand: 'FuzailVerse',
};

export const qrScannerNotice =
  'This privacy policy applies exclusively to the native Android application "QR Scanner & Generator" (package: com.fuzailverse.qrscanner). It explains the specific permissions, on-device data processing, local storage, and third-party telemetry utilized in this release.';

export const qrScannerSections: QRScannerLegalSection[] = [
  {
    id: 'scope-and-developer',
    number: '1',
    title: 'Scope and Application Identity',
    paragraphs: [
      'This Privacy Policy specifically governs the native Android mobile application "QR Scanner & Generator" (Application ID / Package Name: com.fuzailverse.qrscanner), developed and published by Mohammad Fuzail under the FuzailVerse brand ("we", "us", or "our").',
      'This policy details how the application handles information, access permissions, local storage, and technical diagnostics on your mobile device. For any inquiries regarding our privacy practices, the official contact address is mohdfuzail.dev@gmail.com.',
      'This document is application-specific and addresses the exact technical architecture, permissions, and third-party software development kits (SDKs) present in the production release of QR Scanner & Generator.',
    ],
  },
  {
    id: 'core-privacy-principles',
    number: '2',
    title: 'Core Privacy Principles',
    paragraphs: [
      'We designed QR Scanner & Generator with an on-device privacy-first architecture based on the following principles:',
    ],
    listItems: [
      'On-Device Processing: Scanning, decoding, and generating barcodes and QR codes are executed locally on your device without transmitting raw content to our servers.',
      'No Account Required: The application functions completely without user registration, login credentials, or user profile creation.',
      'No Content Harvesting: We do not collect, read, store, or monitor the text, URLs, credentials, or personal information contained within the codes you scan or generate.',
      'No Data Sale: We do not sell, rent, or trade any user information or device identifiers to third parties or data brokers.',
    ],
  },
  {
    id: 'camera-access',
    number: '3',
    title: 'Camera Access & Real-Time Optical Scanning',
    paragraphs: [
      'The application requests access to your device camera through the standard Android runtime permission android.permission.CAMERA (with the hardware feature android.hardware.camera declared as optional to support devices without autofocus).',
      'Purpose: Camera access is used exclusively to display a real-time viewfinder and capture optical frames for detecting and decoding 1D linear barcodes and 2D matrix symbols (such as QR codes, Data Matrix, Aztec, and PDF417).',
      'Technical Processing: Camera frames are analyzed in volatile system memory (RAM) using Google ML Kit Barcode Scanning (an on-device machine learning model running through Android CameraX).',
      'Data Protection: Video frames are evaluated in real-time and immediately discarded. The application never records video feeds, captures background photos, saves camera frames to disk, or transmits optical imagery over the network. Camera access ceases the moment you exit the scanner screen or background the application.',
    ],
  },
  {
    id: 'photo-picker',
    number: '4',
    title: 'Gallery Image Scanning & The Android Photo Picker',
    paragraphs: [
      'QR Scanner & Generator allows you to scan barcodes and QR codes from existing images or screenshots stored on your device.',
      'Modern Photo Picker Model: The application implements Android’s official System Photo Picker (ActivityResultContracts.PickVisualMedia). Because this OS-level delegate is used, the application does not request or require broad device storage permissions (such as READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE, or READ_MEDIA_IMAGES).',
      'Scoping and Access: When you select an image, the operating system grants the application a temporary, read-only content URI for that single chosen file. The image is loaded into volatile memory, analyzed locally by the Google ML Kit engine to decode any barcode present, and the memory buffer is promptly released.',
      'Data Protection: The selected image file is processed entirely on your device and is never uploaded, duplicated, or transmitted to any external server.',
    ],
  },
  {
    id: 'qr-barcode-data-handling',
    number: '5',
    title: 'Scanned Content & Code Generation Handling',
    paragraphs: [
      'Scanned Barcode Data: When a barcode or QR code is successfully decoded, its textual payload and categorical format are displayed on your screen. Parsing logic (such as identifying Wi-Fi parameters, contact vCards, phone numbers, or email links) is performed strictly on-device using local regular expressions and format parsers.',
      'Network Actions: Scanned content is never transmitted to FuzailVerse servers. If a scanned code contains an internet URL and you tap to open it (or if "Auto-open URLs" is explicitly enabled in Settings), the link is opened in your default web browser via an Android system Intent (Intent.ACTION_VIEW). Any subsequent browsing activity is governed by the privacy policy of the destination website.',
      'QR Code Generation: The application includes a local generator for creating QR codes representing text, URLs, email templates, phone numbers, SMS messages, and Wi-Fi configurations. Generation is executed 100% on-device using the embedded ZXing Core library. The inputs you type (including sensitive items such as Wi-Fi passwords) are converted directly into bitmap matrices in local memory without any network communication.',
      'Saving and Sharing: Generated QR codes can be saved to your device photo gallery (under Pictures/QRScanner) via Android’s scoped MediaStore API without broad storage access, or shared through the Android system sharesheet using a private, temporary FileProvider cache directory.',
    ],
  },
  {
    id: 'scan-history-local-storage',
    number: '6',
    title: 'Scan History & Local Device Storage',
    paragraphs: [
      'Local Database: If the "Save Scan History" setting is enabled, scanned items are stored in a local SQLite database on your device using Android Room (database name: qr_scanner_database, table: scan_history).',
      'Stored Records: Stored records include the raw decoded string, formatted display string, format identifier, value type identifier, scan timestamp, and favorite status. This data is stored strictly in the private application sandbox on your device and is not accessible to other standard applications.',
      'User Control & Deletion: You maintain full control over your stored history at all times:',
    ],
    listItems: [
      'Individual Record Deletion: You can delete any specific scan from history by tapping the delete icon on that record.',
      'Complete History Clearance: You can wipe all stored scan records permanently by selecting "Clear History" in the History screen.',
      'History Disablement: You can disable scan history saving entirely at any time in Settings.',
      'Complete Purge: Clearing the application data in Android System Settings or uninstalling the application permanently deletes the local SQLite database and all saved records.',
      'Zero Cloud Sync: We do not maintain a cloud database, synchronization service, or remote server backup of your scan history.',
    ],
  },
  {
    id: 'preferences-datastore',
    number: '7',
    title: 'Application Settings & Local Preferences',
    paragraphs: [
      'The application stores user preferences locally using Android Jetpack DataStore Preferences. Stored preferences include UI theme selection (Dark, Light, or System default), accent color choice, vibration on scan toggle, scan sound beep toggle, haptic feedback toggle, remember flash state toggle, continuous scan mode toggle, and local usage counters (total scans completed and QR codes generated).',
      'These preferences are stored solely on your physical device to maintain your preferred app configuration across launches and are never synchronized to any cloud server.',
    ],
  },
  {
    id: 'firebase-analytics',
    number: '8',
    title: 'Google Firebase Analytics Disclosures',
    paragraphs: [
      'The application incorporates Google Firebase Analytics (com.google.firebase:firebase-analytics:24.0.0), a mobile analytics service provided by Google LLC.',
      'Purpose: Firebase Analytics helps us understand aggregate user engagement patterns, identify popular features, measure app stability across diverse Android versions, and guide future application improvements.',
      'Information Collected: Firebase Analytics automatically collects technical and categorical usage telemetry, including:',
    ],
    listItems: [
      'Application Lifecycle Events: App launch, first open, session duration, and screen transitions (e.g., viewing Home, Scanner, Generator, History, or Settings screens).',
      'Categorical Scan Metadata: When a code is scanned or generated, the app logs non-sensitive categorical descriptors: the format type (e.g., "QR_CODE", "EAN_13", "CODE_128"), the value category (e.g., "URL", "WIFI", "TEXT"), the scan source ("camera" or "gallery"), and generated resolution.',
      'Device & Software Characteristics: Device manufacturer, hardware model, Android operating system version, system language, time zone, and app version name.',
      'Pseudonymous Identifiers: Google Firebase Installation IDs (FID) and app-instance identifiers generated randomly by the Firebase SDK to calculate unique active user counts.',
    ],
    table: {
      headers: ['Data Type', 'Logged to Firebase Analytics?', 'Notes / Protections'],
      rows: [
        ['Scanned Raw Content / Text', 'NO — Never logged', 'Raw decoded strings are strictly excluded from all analytics logs.'],
        ['Destination URLs', 'NO — Never logged', 'Scanned or typed URLs are never sent to analytics.'],
        ['Wi-Fi Passwords / Credentials', 'NO — Never logged', 'Network credentials remain strictly in local volatile memory.'],
        ['Contact Details / Phone / Email', 'NO — Never logged', 'No personal contact details are ever passed to analytics.'],
        ['User Account / User ID', 'NO — Never set', 'The app does not call setUserId() or associate data with individuals.'],
        ['Categorical Enums (e.g., "QR_CODE")', 'YES — Aggregated', 'Used solely to calculate format distribution statistics.'],
        ['App Navigation (e.g., "ScannerScreen")', 'YES — Aggregated', 'Used to measure screen flow and feature popularity.'],
      ],
    },
  },
  {
    id: 'firebase-crashlytics',
    number: '9',
    title: 'Google Firebase Crashlytics Disclosures',
    paragraphs: [
      'The application incorporates Google Firebase Crashlytics (com.google.firebase:firebase-crashlytics:21.0.1), a real-time crash reporting tool provided by Google LLC.',
      'Purpose: Crashlytics helps us detect, reproduce, and resolve application crashes, fatal exceptions, and non-fatal runtime anomalies, ensuring high stability across thousands of Android device variants.',
      'Information Collected on Failure: When an unexpected crash occurs, Crashlytics automatically transmits a diagnostic crash packet to Google servers containing:',
    ],
    listItems: [
      'Stack traces indicating the exact code line where the failure occurred.',
      'Device hardware specifications (device model, CPU architecture, total RAM, available disk space).',
      'Operating system details (Android version, build ID, orientation, whether the device is rooted).',
      'Application runtime state at the instant of the crash (active screen, version code, version name).',
    ],
  },
  {
    id: 'advertising-status',
    number: '10',
    title: 'Advertising and Monetization Status',
    paragraphs: [
      'Current Release Status: The application is currently provided as an AD-FREE application.',
      'No Active Advertisements: Although ad framework dependencies (such as Google Mobile Ads / AdMob) may exist in dormant development code, all advertising display calls, interstitial presentations, banner views, rewarded video activations, and Google User Messaging Platform (UMP) consent forms are completely disabled in this release.',
      'No Ad Tracking: The application does not collect, use, or transmit your device’s Google Advertising ID (AAID) for advertising personalization, behavioral ad tracking, or ad conversion attribution.',
      'Future Policy Alignment: Should commercial advertising be introduced in a subsequent update, we will update this Privacy Policy, provide conspicuous in-app disclosures, and implement compliant consent management mechanisms prior to any ad serving.',
    ],
  },
  {
    id: 'permissions-summary',
    number: '11',
    title: 'Complete Android Permissions Summary',
    paragraphs: [
      'The table below provides a complete audit of all Android permissions declared or utilized by the release build of QR Scanner & Generator:',
    ],
    table: {
      headers: ['Permission Name', 'Protection Level', 'Actual Operational Purpose in Code'],
      rows: [
        ['android.permission.CAMERA', 'Runtime (Dangerous)', 'Required to display the camera viewfinder and scan barcodes visually in real-time. Frames are analyzed in memory and immediately discarded.'],
        ['android.permission.INTERNET', 'Normal', 'Required for Google Firebase Analytics and Crashlytics network telemetry. Also allows launching scanned URLs in your web browser.'],
        ['android.permission.ACCESS_NETWORK_STATE', 'Normal', 'Allows Firebase SDKs to detect network availability and batch diagnostic telemetry efficiently.'],
        ['android.permission.VIBRATE', 'Normal', 'Provides tactile haptic vibration feedback when a barcode is successfully detected.'],
      ],
    },
  },
  {
    id: 'non-collected-data',
    number: '12',
    title: 'Categories of Data Not Collected',
    paragraphs: [
      'To provide complete transparency and align with Google Play Data Safety standards, we explicitly confirm that the application DOES NOT collect, process, or transmit any of the following information:',
    ],
    listItems: [
      'Precise or Approximate Geolocation: The app does not request ACCESS_FINE_LOCATION or ACCESS_COARSE_LOCATION.',
      'Contact Books or Address Books: The app does not request READ_CONTACTS. Selecting a phone number for QR creation uses the system contact picker delegate, which shares only the single chosen number with local form state.',
      'Microphone or Audio: The app does not request RECORD_AUDIO. Scan beep sounds are synthesized locally via the Android ToneGenerator API.',
      'Storage Files or Media Libraries: The app does not request READ_EXTERNAL_STORAGE or READ_MEDIA_IMAGES. Image scanning uses the system Photo Picker.',
      'Biometric or Health Data: No health, fitness, or biometric sensors are accessed.',
      'Financial or Payment Data: No payment processing, banking information, or credit card collection exists in the app.',
      'Push Notification Tokens: The app does not request POST_NOTIFICATIONS or send push notifications.',
    ],
  },
  {
    id: 'retention-and-deletion',
    number: '13',
    title: 'Data Retention and Deletion Practices',
    paragraphs: [
      'Local Storage Retention: Scan history and application preferences remain stored locally on your device until you choose to delete them. You can delete individual scan items or clear the entire history at any time using the in-app controls. Uninstalling the application or clearing storage in Android Settings instantly deletes all local databases and preferences.',
      'Firebase Analytics Retention: Aggregated, pseudonymous analytics events sent to Google Firebase Analytics are retained in accordance with standard Firebase retention configurations (typically 2 to 14 months) and are subsequently purged automatically by Google.',
      'Firebase Crashlytics Retention: Crash logs, diagnostic traces, and associated device state records are retained by Google Firebase Crashlytics for 90 days, after which they are permanently deleted.',
      'Deletion Requests: Because we do not operate user accounts, maintain cloud profiles, or store personal identifiers, we cannot link stored diagnostic data to an individual person. However, if you have questions or specific requests regarding data processed by our service providers, you may contact mohdfuzail.dev@gmail.com.',
    ],
  },
  {
    id: 'security-practices',
    number: '14',
    title: 'Security and Data Protection Practices',
    paragraphs: [
      'We employ sensible administrative, technical, and architectural safeguards to protect information handled by the application:',
      'Encryption in Transit: All diagnostic and analytics telemetry transmitted to Google Firebase endpoints is encrypted in transit using industry-standard Transport Layer Security (TLS 1.3 / HTTPS).',
      'Operating System Sandboxing: Local scan history and settings are housed within Android’s secure per-application data sandbox, preventing unauthorized access by other standard applications on your device.',
      'Prudent Limitations: While we follow rigorous industry standards for mobile application development, no electronic system, local storage mechanism, or wireless transmission can guarantee absolute security. We do not make exaggerated claims of invulnerability.',
    ],
  },
  {
    id: 'childrens-privacy',
    number: '15',
    title: 'Children’s Privacy',
    paragraphs: [
      'QR Scanner & Generator is a general-utility utility application designed for a general audience and is not directed to children under the age of 13 (or the applicable age threshold in your jurisdiction, such as under 16 in the European Union).',
      'The application does not knowingly solicit or collect personal information from children. If you are a parent or legal guardian and believe that your child has provided us with personal information, please contact us immediately at mohdfuzail.dev@gmail.com so that we can take appropriate steps to investigate and address the matter.',
    ],
  },
  {
    id: 'user-rights-and-choices',
    number: '16',
    title: 'Your Privacy Rights and Choices',
    paragraphs: [
      'Depending on your jurisdiction (such as under the European General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA/CPRA), or other applicable data protection legislation), you may have specific rights regarding your personal information, including:',
    ],
    listItems: [
      'Permission Control: You can grant or revoke camera access at any time through your Android device settings under Settings > Apps > QR Scanner > Permissions.',
      'History Management: You can view, search, export, or permanently clear your local scan history at any time directly within the application.',
      'Resetting Local State: You can reset all application configurations and erase all local data by choosing "Clear Storage" in Android Settings or by uninstalling the application.',
      'Analytics Reset: You can reset your device’s advertising and app instance identifiers through Android System Settings > Google > Ads.',
      'Privacy Inquiries: To exercise any applicable legal rights or ask questions about our data practices, email mohdfuzail.dev@gmail.com.',
    ],
  },
  {
    id: 'changes-to-policy',
    number: '17',
    title: 'Changes to This Privacy Policy',
    paragraphs: [
      'We may update this Privacy Policy periodically to reflect enhancements to the application, modifications in integrated third-party SDKs, or evolving regulatory requirements.',
      'Whenever updates are made, we will revise the "Last updated" date displayed at the top of this document. The current, binding version of this policy is always accessible at https://fuzailverse.pages.dev/qr-scanner/privacy-policy/.',
      'We encourage you to review this Privacy Policy periodically to stay informed about how your information is handled.',
    ],
  },
  {
    id: 'contact-information',
    number: '18',
    title: 'Developer Contact Information',
    paragraphs: [
      'If you have questions, feedback, or privacy-related requests concerning QR Scanner & Generator, please contact the developer at:',
      'Developer / Publisher: Mohammad Fuzail (FuzailVerse)',
      'Official Privacy Contact Email: mohdfuzail.dev@gmail.com',
      'Official Portfolio & Publisher Website: https://fuzailverse.pages.dev/',
    ],
  },
];
