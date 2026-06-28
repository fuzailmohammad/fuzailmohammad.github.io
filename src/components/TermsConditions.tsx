import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

export const TermsConditions: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Update SEO meta tags
    document.title = 'Terms & Conditions | Mohammad Fuzail - Flutter Developer';

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

    updateMeta('description', 'Terms and Conditions for Mohammad Fuzail\'s portfolio website. Read our terms of service and usage policies.');
    updateOgMeta('og:title', 'Terms & Conditions | Mohammad Fuzail');
    updateOgMeta('og:description', 'Terms and Conditions for Mohammad Fuzail\'s portfolio website.');

    return () => {
      document.title = 'Mohammad Fuzail - Senior Flutter Developer | Mobile App Specialist';
    };
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = './documents/terms-and-conditions.pdf';
    link.download = 'terms-and-conditions.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sections = [
    { id: 'acceptance', title: 'Acceptance of Terms' },
    { id: 'services', title: 'Description of Services' },
    { id: 'user-obligations', title: 'User Obligations' },
    { id: 'intellectual-property', title: 'Intellectual Property Rights' },
    { id: 'limitations', title: 'Limitation of Liability' },
    { id: ' termination', title: 'Termination' },
    { id: 'governing-law', title: 'Governing Law' },
    { id: 'changes', title: 'Changes to Terms' },
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
                <div className="p-4 bg-purple-100 dark:bg-purple-900/50 rounded-full">
                  <FileText className="w-12 h-12 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Terms & Conditions
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Last Updated: June 28, 2026
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-white text-lg font-semibold mb-1">Download Terms & Conditions</h3>
                  <p className="text-purple-100 text-sm">Get a PDF copy for your records</p>
                </div>
                <button
                  onClick={handleDownload}
                  className="flex items-center px-6 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
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
                      className="text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="prose dark:prose-invert max-w-none">
              <section id="acceptance" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  [PLACEHOLDER: Replace this section with your actual terms and conditions regarding acceptance.]
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  By accessing and using this website and its services, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section id="services" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  2. Description of Services
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  [PLACEHOLDER: Replace this section with your actual terms and conditions regarding services offered.]
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  This website provides professional mobile application development services, specializing in Flutter development. Services include consultation, development, testing, and maintenance of mobile applications.
                </p>
              </section>

              <section id="user-obligations" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  3. User Obligations
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  [PLACEHOLDER: Replace this section with your actual terms and conditions regarding user obligations.]
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  As a user of this website, you agree to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                  <li>Use the services only for lawful purposes</li>
                  <li>Provide accurate and truthful information</li>
                  <li>Not violate any applicable laws or regulations</li>
                  <li>Not infringe on intellectual property rights</li>
                  <li>Not attempt to gain unauthorized access to any systems</li>
                </ul>
              </section>

              <section id="intellectual-property" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  4. Intellectual Property Rights
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  [PLACEHOLDER: Replace this section with your actual terms and conditions regarding intellectual property.]
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  All content on this website, including text, graphics, logos, images, and software, is the property of Mohammad Fuzail and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without explicit permission.
                </p>
              </section>

              <section id="limitations" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  5. Limitation of Liability
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  [PLACEHOLDER: Replace this section with your actual terms and conditions regarding liability limitations.]
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.
                </p>
              </section>

              <section id="termination" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  6. Termination
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  [PLACEHOLDER: Replace this section with your actual terms and conditions regarding termination.]
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  We reserve the right to terminate or suspend access to our services at any time, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
                </p>
              </section>

              <section id="governing-law" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  7. Governing Law
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  [PLACEHOLDER: Replace this section with your actual terms and conditions regarding governing law.]
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
                </p>
              </section>

              <section id="changes" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  8. Changes to Terms
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  [PLACEHOLDER: Replace this section with your actual terms and conditions regarding changes to terms.]
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on this website. Your continued use of the services constitutes acceptance of the modified Terms.
                </p>
              </section>

              <section id="contact" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  9. Contact Information
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  [PLACEHOLDER: Replace this section with your actual terms and conditions regarding contact information.]
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  For questions about these Terms & Conditions, please contact:
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mt-4">
                  <p className="text-gray-900 dark:text-white font-semibold">Mohammad Fuzail</p>
                  <a href="mailto:mohdfuzail00786@gmail.com" className="text-purple-600 dark:text-purple-400 hover:underline">
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
