import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

export const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Update SEO meta tags
    document.title = 'Privacy Policy | Mohammad Fuzail - Flutter Developer';

    const updateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const updateOgMeta = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMeta('description', 'Privacy Policy for Mohammad Fuzail\'s portfolio website. Learn how we collect, use, and protect your personal information.');
    updateOgMeta('og:title', 'Privacy Policy | Mohammad Fuzail');
    updateOgMeta('og:description', 'Privacy Policy for Mohammad Fuzail\'s portfolio website.');

    return () => {
      document.title = 'Mohammad Fuzail - Senior Flutter Developer | Mobile App Specialist';
    };
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = './documents/privacy-policy.pdf';
    link.download = 'privacy-policy.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sections = [
    { id: 'information-collection', title: 'Information We Collect' },
    { id: 'information-usage', title: 'How We Use Your Information' },
    { id: 'information-sharing', title: 'Information Sharing' },
    { id: 'data-security', title: 'Data Security' },
    { id: 'cookies', title: 'Cookies and Tracking' },
    { id: 'user-rights', title: 'Your Rights' },
    { id: 'children-privacy', title: "Children's Privacy" },
    { id: 'policy-changes', title: 'Changes to This Policy' },
    { id: 'contact', title: 'Contact Information' },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                  <FileText className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Privacy Policy
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Last Updated: June 28, 2026
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-white text-lg font-semibold mb-1">Download Privacy Policy</h3>
                  <p className="text-blue-100 text-sm">Get a PDF copy for your records</p>
                </div>
                <button
                  onClick={handleDownload}
                  className="flex items-center px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  <Download className="mr-2" size={20} />
                  Download PDF
                </button>
              </div>
            </div>

            <nav className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Table of Contents
              </h3>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="prose dark:prose-invert max-w-none">
              <section id="information-collection" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  1. Information We Collect
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  [PLACEHOLDER: Replace this section with your actual privacy policy content regarding information collection.]
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  We may collect personal information that you voluntarily provide when using our services, including but not limited to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mt-4 space-y-2">
                  <li>Name and contact information</li>
                  <li>Email address</li>
                  <li>Professional information</li>
                  <li>Usage data and analytics</li>
                </ul>
              </section>

              <section id="information-usage" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  2. How We Use Your Information
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  [PLACEHOLDER: Replace this section with your actual privacy policy content regarding information usage.]
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  The information we collect is used to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mt-4 space-y-2">
                  <li>Provide and maintain our services</li>
                  <li>Communicate with you about updates and inquiries</li>
                  <li>Improve user experience</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section id="information-sharing" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  3. Information Sharing
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  [PLACEHOLDER: Replace this section with your actual privacy policy content regarding information sharing.]
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business.
                </p>
              </section>

              <section id="data-security" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  4. Data Security
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  [PLACEHOLDER: Replace this section with your actual privacy policy content regarding data security.]
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section id="cookies" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  5. Cookies and Tracking
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  [PLACEHOLDER: Replace this section with your actual privacy policy content regarding cookies and tracking technologies.]
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  We use cookies and similar tracking technologies to improve user experience and analyze website traffic.
                </p>
              </section>

              <section id="user-rights" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  6. Your Rights
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  [PLACEHOLDER: Replace this section with your actual privacy policy content regarding user rights.]
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mt-4 space-y-2">
                  <li>Access your personal information</li>
                  <li>Request correction of your data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to processing of your data</li>
                  <li>Data portability</li>
                </ul>
              </section>

              <section id="children-privacy" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  7. Children's Privacy
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  [PLACEHOLDER: Replace this section with your actual privacy policy content regarding children's privacy.]
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Our services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children.
                </p>
              </section>

              <section id="policy-changes" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  8. Changes to This Policy
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  [PLACEHOLDER: Replace this section with your actual privacy policy content regarding policy changes.]
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>
              </section>

              <section id="contact" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  9. Contact Information
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  [PLACEHOLDER: Replace this section with your actual privacy policy content regarding contact information.]
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mt-4">
                  <p className="text-gray-900 dark:text-white font-semibold">Mohammad Fuzail</p>
                  <a href="mailto:mohdfuzail00786@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                    mohdfuzail00786@gmail.com
                  </a>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
