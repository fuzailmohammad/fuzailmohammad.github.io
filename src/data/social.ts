/**
 * Social and contact channels data layer for Portfolio 2.0 (Gotham Signal)
 * Source of Truth: Official Resume of Mohd Fuzail
 */

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  handle: string;
  iconName: 'github' | 'linkedin' | 'mail' | 'fileText' | 'phone';
  category: 'primary' | 'social' | 'document';
}

export interface ContactSectionData {
  sectionNumber: string;
  sectionTitle: string;
  subheading: string;
  intro: string;
  location: string;
  phone: string;
  email: string;
  signalFrequency: string;
  responseProtocol: string;
  channels: SocialLink[];
  resumeUrl: string;
}

export const socialData: ContactSectionData = {
  sectionNumber: '05',
  sectionTitle: 'GOTHAM SIGNAL',
  subheading: 'TRANSMIT AN ENCRYPTED FREQUENCY // INITIATE CONTACT',
  intro:
    'Available for high-impact mobile engineering roles, senior Flutter architecture initiatives, and cross-platform leadership. Reach out via email, phone, or professional networks.',
  location: 'New Delhi, India',
  phone: '+91 7042461480',
  email: 'mohdfuzail00786@gmail.com',
  signalFrequency: 'FREQUENCY: DIRECT DISPATCH',
  responseProtocol: 'EXPECTED ACKNOWLEDGMENT WITHIN 24 HOURS',
  channels: [
    {
      id: 'email',
      name: 'Direct Transmission (Email)',
      url: 'mailto:mohdfuzail00786@gmail.com',
      handle: 'mohdfuzail00786@gmail.com',
      iconName: 'mail',
      category: 'primary',
    },
    {
      id: 'phone',
      name: 'Direct Line (Phone)',
      url: 'tel:+917042461480',
      handle: '+91 7042461480',
      iconName: 'phone',
      category: 'primary',
    },
    {
      id: 'linkedin',
      name: 'Professional Network (LinkedIn)',
      url: 'https://www.linkedin.com/in/mohammad-fuzail',
      handle: 'in/mohammad-fuzail',
      iconName: 'linkedin',
      category: 'social',
    },
    {
      id: 'github',
      name: 'Code Repository (GitHub)',
      url: 'https://github.com/fuzailmohammad',
      handle: 'github.com/fuzailmohammad',
      iconName: 'github',
      category: 'social',
    },
    {
      id: 'resume',
      name: 'Official Resume (PDF)',
      url: '/documents/Mohammad_Fuzail_Resume.pdf',
      handle: 'DOWNLOAD RESUME (PDF)',
      iconName: 'fileText',
      category: 'document',
    },
  ],
  resumeUrl: '/documents/Mohammad_Fuzail_Resume.pdf',
};
