import { useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default memo(function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Privacy Policy | Mohammad Fuzail';
    return () => { document.title = 'Mohammad Fuzail - Senior Flutter Developer'; };
  }, []);

  const handleDownload = () => {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      window.open('./documents/privacy-policy.pdf', '_blank');
    } else {
      const a = document.createElement('a');
      a.href = './documents/privacy-policy.pdf';
      a.download = 'privacy-policy.pdf';
      a.click();
    }
  };

  const sections = [
    { id: 'collect', title: 'Information We Collect' },
    { id: 'use', title: 'How We Use Information' },
    { id: 'share', title: 'Information Sharing' },
    { id: 'security', title: 'Data Security' },
    { id: 'rights', title: 'Your Rights' },
    { id: 'contact', title: 'Contact' },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                  <FileText className="w-12 h-12 text-blue-600" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
              <p className="text-gray-600 dark:text-gray-400">Last Updated: June 2026</p>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-white font-semibold mb-1">Download Privacy Policy</h3>
                  <p className="text-blue-100 text-sm">Get a PDF copy</p>
                </div>
                <button onClick={handleDownload} className="flex items-center px-6 py-3 bg-white text-blue-600 rounded-full font-semibold" data-cursor="pointer">
                  <Download className="mr-2" size={20} />
                  Download PDF
                </button>
              </div>
            </div>
            <nav className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-8">
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Table of Contents</h3>
              <ul className="space-y-2">
                {sections.map((s) => (
                  <li key={s.id}><a href={`#${s.id}`} className="text-blue-600 dark:text-blue-400 hover:underline">{s.title}</a></li>
                ))}
              </ul>
            </nav>
            <div className="prose dark:prose-invert max-w-none space-y-8">
              {[
                { id: 'collect', content: '[PLACEHOLDER: Describe information collection practices]' },
                { id: 'use', content: '[PLACEHOLDER: Describe how information is used]' },
                { id: 'share', content: '[PLACEHOLDER: Describe information sharing practices]' },
                { id: 'security', content: '[PLACEHOLDER: Describe data security measures]' },
                { id: 'rights', content: '[PLACEHOLDER: Describe user rights regarding their data]' },
                { id: 'contact', content: 'Contact: mohdfuzail00786@gmail.com' },
              ].map((s) => (
                <section key={s.id} id={s.id}>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{sections.find(x => x.id === s.id)?.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400">{s.content}</p>
                </section>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
});
