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
  'This privacy policy applies exclusively to the native Android application "QR Scanner & Generator" (package: com.fuzailverse.qrscanner). It explains the specific permissions, on-device data processing, local storage, Android Auto Backup interactions, and third-party SDK telemetry utilized in this release.';

export const qrScannerSections: QRScannerLegalSection[] = [
  {
    id: 'scope-and-developer',
    number: '1',
    title: 'Scope and Application Identity',
    paragraphs: [
      'This Privacy Policy specifically governs the native Android mobile application "QR Scanner & Generator" (Application ID / Package Name: com.fuzailverse.qrscanner), developed and published by Mohammad Fuzail under the FuzailVerse brand ("we", "us", or "our").',
      'This policy details how the application handles device permissions, on-device operations, local storage, backup behavior, and diagnostic telemetry on your Android device. For any inquiries regarding our privacy practices, the official contact address is mohdfuzail.dev@gmail.com.',
      'This document is application-specific and reflects the exact technical implementation, compiled Gradle dependencies, manifest permissions, and third-party software development kits (SDKs) in the release build of QR Scanner & Generator.',
    ],
  },
  {
    id: 'core-privacy-principles',
    number: '2',
    title: 'Core Privacy Principles',
    paragraphs: [
      'We engineered QR Scanner & Generator around on-device data processing and privacy-first architectural standards:',
    ],
    listItems: [
      'On-Device Scanning and Decoding: Scanning, optical frame evaluation, and barcode decoding happen locally on your device. Raw scan contents are not transmitted to FuzailVerse servers.',
      'Local Storage of Scan History: If you enable scan history (or keep it enabled as configured by default), decoded barcode strings and metadata are stored locally in an on-device SQLite database. You can delete individual entries or clear all history at any time using in-app controls.',
      'No Account Required: The application functions completely without user registration, login credentials, or user profile creation.',
      'No Data Sale: We do not sell, rent, or trade any user information or device identifiers to third parties or data brokers.',
    ],
  },
  {
    id: 'camera-access',
    number: '3',
    title: 'Camera Access & Real-Time Optical Scanning',
    paragraphs: [
      'The application requests access to your device camera through the standard Android runtime permission android.permission.CAMERA (with the hardware feature android.hardware.camera declared as optional to support devices without autofocus hardware).',
      'Purpose: Camera access is used exclusively to display a real-time viewfinder and capture optical frames for detecting and decoding 1D linear barcodes and 2D matrix symbols (such as QR codes, Data Matrix, Aztec, and PDF417).',
      'Technical Processing: Camera frames are analyzed in volatile system memory (RAM) using Google ML Kit Barcode Scanning through Android CameraX.',
      'Data Protection: Video frames are evaluated in real-time in memory and immediately discarded. The application never records video feeds, captures background photos, saves camera frames to disk, or transmits optical imagery over the network. Camera access ceases the moment you exit the scanner screen or background the application.',
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
      'Data Protection: The selected image file is processed entirely in memory on your device and is never uploaded, duplicated, or transmitted to any external server.',
    ],
  },
  {
    id: 'google-ml-kit',
    number: '5',
    title: 'Google ML Kit Barcode Scanning Disclosures',
    paragraphs: [
      'The application utilizes Google ML Kit Barcode Scanning (com.google.mlkit:barcode-scanning:17.3.0), an on-device machine learning library provided by Google LLC.',
      'Distinction Between Image Processing and SDK Telemetry: It is important to distinguish between how your barcode data is processed and how the underlying Google SDK operates:',
    ],
    listItems: [
      'Local Processing of Barcodes and Imagery: All barcode detection and decoding takes place entirely on-device. Camera frames and selected gallery images are not transmitted to Google servers for recognition.',
      'SDK Diagnostics and Telemetry: In accordance with Google’s published ML Kit Data Safety documentation, the ML Kit library may communicate with Google servers to transmit SDK diagnostic data, API usage statistics, error codes, performance metrics, and device specifications (such as OS version, device model, and app package name) to maintain and improve the ML Kit service.',
    ],
  },
  {
    id: 'qr-barcode-data-handling',
    number: '6',
    title: 'Scanned Content & Code Generation Handling',
    paragraphs: [
      'Scanned Barcode Data: When a barcode or QR code is successfully decoded, its textual payload and categorical format are displayed on your screen. Parsing logic (such as identifying Wi-Fi parameters, contact vCards, phone numbers, or email links) is performed strictly on-device using local regular expressions and format parsers.',
      'Network Actions: Scanned content is never transmitted to FuzailVerse servers. If a scanned code contains an internet URL and you tap to open it (or if "Auto-open URLs" is explicitly enabled in Settings), the link is opened in your default web browser via an Android system Intent (Intent.ACTION_VIEW). Any subsequent browsing activity is governed by the privacy policy of the destination website.',
      'QR Code Generation: The application includes a local generator for creating QR codes representing text, URLs, email templates, phone numbers, SMS messages, and Wi-Fi configurations. Generation is executed 100% on-device using the embedded ZXing Core library (com.google.zxing:core:3.5.4). The inputs you type (including sensitive items such as Wi-Fi passwords) are converted directly into bitmap matrices in local memory without network transmission.',
      'Contact Information for QR Generation: When creating a Phone or SMS QR code, you may optionally tap the contact icon to pick a phone number. The app does not request the READ_CONTACTS permission; instead, it delegates selection to Android’s system contact picker (Intent.ACTION_PICK). Only the specific contact number you select is returned to the application and processed locally in volatile memory to populate the input field. This information is processed strictly on-device and is never transmitted off-device or collected by FuzailVerse.',
      'Saving and Sharing: Generated QR codes can be saved to your device photo gallery (under Pictures/QRScanner) via Android’s scoped MediaStore API without broad storage access, or shared through the Android system sharesheet using a private, temporary FileProvider cache directory.',
    ],
  },
  {
    id: 'scan-history-local-storage',
    number: '7',
    title: 'Scan History & Local Device Storage',
    paragraphs: [
      'Local Database: If the "Save Scan History" setting is enabled, scanned items are stored in a local SQLite database on your device using Android Room (database name: qr_scanner_db, table: scan_history).',
      'Stored Records: Stored records include the raw decoded string, formatted display string, format identifier, value type identifier, scan timestamp, and favorite status. This data is stored in the private application sandbox on your device.',
      'User Control & Deletion: You maintain full control over your stored history at all times:',
    ],
    listItems: [
      'Individual Record Deletion: You can delete any specific scan from history by tapping the delete icon on that record.',
      'Complete History Clearance: You can wipe all stored scan records permanently by selecting "Clear History" in the History screen.',
      'Search and Filter: You can search your local scan records and filter favorites directly within the application.',
      'History Disablement: You can disable scan history saving entirely at any time in Settings.',
      'Android Auto Backup Consideration: Because the application declares android:allowBackup="true" without custom exclusion filters in its backup configuration, Android’s system-level backup may automatically store a copy of your local database and preferences in your private Google Drive backup storage associated with your Google Account. While clearing app storage or uninstalling removes files from your physical device, cloud-backed data is managed under your Google Drive / Android Backup settings and may be restored if you reinstall the application on a device associated with the same Google Account.',
      'Zero Developer Cloud Sync: FuzailVerse does not operate a synchronization server, cloud database, or remote backup facility.',
    ],
  },
  {
    id: 'preferences-datastore',
    number: '8',
    title: 'Application Settings & Local Preferences',
    paragraphs: [
      'The application stores user preferences locally using Android Jetpack DataStore Preferences. Stored preferences include UI theme selection (Dark, Light, or System default), accent color choice, vibration on scan toggle, scan sound beep toggle, haptic feedback toggle, remember flash state toggle, continuous scan mode toggle, and local usage counters (total scans completed and QR codes generated).',
      'These preferences are stored on your physical device to maintain your chosen configuration across app launches.',
    ],
  },
  {
    id: 'firebase-analytics',
    number: '9',
    title: 'Google Firebase Analytics Disclosures',
    paragraphs: [
      'The application incorporates Google Firebase Analytics (com.google.firebase:firebase-analytics:24.0.0), a mobile analytics service provided by Google LLC.',
      'Purpose: Firebase Analytics helps us understand aggregate user engagement patterns, identify popular features, measure app stability across diverse Android versions, and guide future application improvements.',
      'Information Collected: Firebase Analytics automatically collects technical and categorical usage telemetry, including:',
    ],
    listItems: [
      'Application Lifecycle Events: Standard lifecycle events (app_open, app_opened with version and build type) and screen transitions (screen_view with screen name).',
      'Categorical Scan Metadata: When a code is scanned or generated, the app logs non-sensitive categorical descriptors: format type (e.g., "QR_CODE", "EAN_13", "CODE_128"), value category (e.g., "URL", "WIFI", "TEXT"), scan source ("camera" or "gallery"), and generated resolution.',
      'Device & Software Characteristics: Device manufacturer, hardware model, Android operating system version, system language, time zone, and app version name.',
      'Pseudonymous Identifiers: Google Firebase Installation IDs (FID) and app-instance identifiers generated randomly by the Firebase SDK to calculate unique active user counts.',
      'Advertising ID (AAID) Collection Disabled: In accordance with our privacy-first design, the Advertising ID permission (com.google.android.gms.permission.AD_ID) has been explicitly removed from the application manifest using tools:node="remove", and advertising identifier collection is explicitly deactivated in Firebase Analytics configuration (google_analytics_adid_collection_enabled = false). The Firebase Analytics SDK does not collect or process the Google Advertising ID from QR Scanner & Generator.',
      'Data Retention: Google Analytics for Firebase provides two project-level retention configurations for user-level and event-level data: 2 months or 14 months, which is administered in the Google Firebase Console. Once this retention window elapses, user-level data is automatically deleted from Google\'s analytics servers. Standard aggregated summary reports (such as total daily scan counts by format category) contain no user identifiers and are retained in aggregate by Google Analytics.',
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
        ['Advertising ID (AAID)', 'NO — Explicitly Disabled', 'Advertising ID collection is disabled in manifest (google_analytics_adid_collection_enabled=false) and AD_ID permission is removed.'],
      ],
    },
  },
  {
    id: 'firebase-crashlytics',
    number: '10',
    title: 'Google Firebase Crashlytics Disclosures',
    paragraphs: [
      'The application incorporates Google Firebase Crashlytics (com.google.firebase:firebase-crashlytics:21.0.1), a real-time crash reporting tool provided by Google LLC.',
      'Purpose: Crashlytics helps us detect, reproduce, and resolve application crashes, fatal exceptions, and non-fatal runtime anomalies, ensuring high stability across diverse Android device variants.',
      'Information Collected on Failure: When an unexpected crash occurs, Crashlytics automatically transmits a diagnostic crash packet to Google servers containing:',
    ],
    listItems: [
      'Stack traces indicating the exact code line where the failure occurred.',
      'Device hardware specifications (device model, CPU architecture, total RAM, available disk space).',
      'Operating system details (Android version, build ID, orientation, whether the device is rooted).',
      'Application runtime state at the instant of the crash (active screen, version code, version name).',
      'No Custom User Breadcrumbs: The application does not configure custom user IDs, custom logging keys with user input, or breadcrumbs containing personal or scanned data.',
      'Data Retention: Google Firebase Crashlytics retains crash events, stack traces, and associated diagnostic metrics for 90 days, after which they are permanently deleted from Google\'s servers in accordance with Firebase Crashlytics data retention terms.',
    ],
  },
  {
    id: 'advertising-and-admob',
    number: '11',
    title: 'Advertising & Ad-Free Status',
    paragraphs: [
      'QR Scanner & Generator is currently provided without advertisements. The application does not display banner, interstitial or rewarded advertisements and does not integrate Google AdMob or Google User Messaging Platform (UMP) for advertising or advertising consent management. The application uses Firebase Analytics and Firebase Crashlytics for analytics and diagnostics, as described in this Privacy Policy. These services are separate from advertising services. If advertising functionality is introduced in a future version, this Privacy Policy will be updated to explain the relevant technologies, data collection and user choices.',
      'Zero Advertising Frameworks: The release build contains no commercial advertising SDKs, ad trackers, or targeting frameworks. No advertising identifier (AAID) is collected, transmitted, or shared with advertisers.',
    ],
  },
  {
    id: 'permissions-summary',
    number: '12',
    title: 'Complete Android Permissions Summary',
    paragraphs: [
      'The table below provides a complete audit of all Android permissions declared or merged into the release build of QR Scanner & Generator:',
    ],
    table: {
      headers: ['Permission Name', 'Protection Level / Source', 'Actual Operational Purpose in Code'],
      rows: [
        ['android.permission.CAMERA', 'Runtime (Dangerous)', 'Required to display the camera viewfinder and scan barcodes visually in real-time. Frames are analyzed in memory and immediately discarded.'],
        ['android.permission.INTERNET', 'Normal', 'Required for Google Firebase Analytics and Crashlytics network telemetry. Also allows launching scanned URLs in your web browser.'],
        ['android.permission.ACCESS_NETWORK_STATE', 'Normal', 'Allows Firebase SDKs to detect network availability and batch diagnostic telemetry efficiently.'],
        ['android.permission.VIBRATE', 'Normal', 'Provides tactile haptic vibration feedback when a barcode is successfully detected.'],
        ['android.permission.WAKE_LOCK', 'Normal (Merged from Firebase)', 'Used internally by Firebase SDKs for background task and diagnostic reporting execution.'],
        ['com.google.android.finsky.permission.BIND_GET_INSTALL_REFERRER_SERVICE', 'Normal (Merged from Play Services)', 'Used by Google Play Store to measure app install referral source.'],
      ],
    },
  },
  {
    id: 'non-collected-data',
    number: '13',
    title: 'Categories of Data Not Collected',
    paragraphs: [
      'To provide complete transparency and align with Google Play Data Safety standards, we explicitly confirm that the application DOES NOT collect, process, or transmit any of the following information:',
    ],
    listItems: [
      'Precise or Approximate Geolocation: The app does not request ACCESS_FINE_LOCATION or ACCESS_COARSE_LOCATION.',
      'Contact Books or Address Books: The app does not request READ_CONTACTS and does not harvest or upload your address book. When using the optional contact picker during QR code creation, the application delegates selection to the system contact picker (Intent.ACTION_PICK), which shares only the single chosen phone number with local in-memory form state.',
      'Microphone or Audio: The app does not request RECORD_AUDIO. Scan beep sounds are synthesized locally via the Android ToneGenerator API.',
      'Storage Files or Media Libraries: The app does not request READ_EXTERNAL_STORAGE or READ_MEDIA_IMAGES. Image scanning uses the system Photo Picker.',
      'Biometric or Health Data: No health, fitness, or biometric sensors are accessed.',
      'Financial or Payment Data: No payment processing, banking information, or credit card collection exists in the app.',
      'Push Notification Tokens: The app does not request POST_NOTIFICATIONS or dispatch push notifications.',
    ],
  },
  {
    id: 'retention-and-deletion',
    number: '14',
    title: 'Data Retention and Deletion Practices',
    paragraphs: [
      'Local Storage Retention: Scan history and application preferences remain stored locally on your device until you choose to delete them. You can delete individual scan items or clear the entire history at any time using the in-app controls. In addition, clearing application storage in Android Settings deletes all local databases immediately.',
      'Android Cloud Backup: If your device has Android Auto Backup enabled, app data may be backed up to your Google Drive backup storage in accordance with Android system settings and your Google Account configuration.',
      'Firebase Analytics Retention: User-level and event-level data sent to Google Firebase Analytics is retained for either 2 months or 14 months (as configured in the Google Firebase Console) and is subsequently purged automatically by Google. Aggregated summary reports containing no user identifiers are retained per Google Analytics standard reporting models.',
      'Firebase Crashlytics Retention: Crash logs, diagnostic traces, and associated device state records are retained by Google Firebase Crashlytics for 90 days, after which they are permanently deleted from Google\'s servers.',
      'Deletion Requests: Because we do not operate user accounts, maintain cloud profiles, or store personal identifiers, we cannot link stored diagnostic data to an individual person. However, if you have questions or specific requests regarding data processed by our service providers, you may contact mohdfuzail.dev@gmail.com.',
    ],
  },
  {
    id: 'security-practices',
    number: '15',
    title: 'Security and Data Protection Practices',
    paragraphs: [
      'We employ sensible administrative, technical, and architectural safeguards to protect information handled by the application:',
      'Encryption in Transit: All diagnostic and analytics telemetry transmitted off-device to third-party endpoints (such as Google Firebase) is encrypted in transit using industry-standard HTTPS / Transport Layer Security (TLS) protocols.',
      'Operating System Sandboxing: Local scan history and settings are housed within Android’s secure per-application data sandbox, preventing unauthorized access by other standard applications on your device.',
      'Realistic Limitations: While we follow rigorous industry standards for mobile application development, no electronic system, local storage mechanism, or wireless transmission can guarantee absolute security. We do not make exaggerated claims of invulnerability.',
    ],
  },
  {
    id: 'childrens-privacy',
    number: '16',
    title: 'Children’s Privacy',
    paragraphs: [
      'QR Scanner & Generator is a general-utility application designed for a general audience and is not directed at children. We do not knowingly collect personal information from children under the age of 13, or under the equivalent minimum age required by applicable law in their jurisdiction (such as under 16 in certain member states of the European Economic Area).',
      'If a parent or guardian becomes aware that a child has provided personal information to third-party services integrated with this application, they may contact us at mohdfuzail.dev@gmail.com so that we can take appropriate steps to investigate and address the inquiry.',
    ],
  },
  {
    id: 'user-rights-and-choices',
    number: '17',
    title: 'Your Privacy Rights and Choices',
    paragraphs: [
      'Depending on your jurisdiction (such as under the European General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA/CPRA), or other applicable data protection legislation), you may have specific rights regarding your personal information, including:',
    ],
    listItems: [
      'Permission Control: You can grant or revoke camera access at any time through your Android device settings under Settings > Apps > QR Scanner > Permissions.',
      'History Management: You can view, search, filter favorites, or permanently clear your local scan history at any time directly within the application.',
      'Resetting Local State: You can reset all application configurations and erase all local data by choosing "Clear Storage" in Android Settings or by uninstalling the application.',
      'Advertising ID Controls: Because the application disables Advertising ID collection and does not include the AD_ID permission, the app does not access your AAID. You can additionally manage or delete your device’s Google Advertising ID across all apps via Android System Settings > Security & Privacy > Privacy > Ads.',
      'Privacy Inquiries: To exercise any applicable legal rights or ask questions about our data practices, email mohdfuzail.dev@gmail.com.',
    ],
  },
  {
    id: 'changes-to-policy',
    number: '18',
    title: 'Changes to This Privacy Policy',
    paragraphs: [
      'We may update this Privacy Policy periodically to reflect enhancements to the application, modifications in integrated third-party SDKs, or evolving regulatory requirements.',
      'Whenever updates are made, we will revise the "Last updated" date displayed at the top of this document. The current, binding version of this policy is always accessible at https://fuzailverse.pages.dev/qr-scanner/privacy-policy/.',
      'We encourage you to review this Privacy Policy periodically to stay informed about how your information is handled.',
    ],
  },
  {
    id: 'contact-information',
    number: '19',
    title: 'Developer Contact Information',
    paragraphs: [
      'If you have questions, feedback, or privacy-related requests concerning QR Scanner & Generator, please contact the developer at:',
      'Developer / Publisher: Mohammad Fuzail (FuzailVerse)',
      'Official Privacy Contact Email: mohdfuzail.dev@gmail.com',
      'Official Portfolio & Publisher Website: https://fuzailverse.pages.dev/',
    ],
  },
];
