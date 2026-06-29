import { useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default memo(function TermsConditions() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Terms & Conditions | Mohammad Fuzail';
    return () => { document.title = 'Mohammad Fuzail - Senior Flutter Developer'; };
  }, []);

  const handleDownload = () => {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      window.open('./documents/terms-and-conditions.pdf', '_blank');
    } else {
      const a = document.createElement('a');
      a.href = './documents/terms-and-conditions.pdf';
      a.download = 'terms-and-conditions.pdf';
      a.click();
    }
  };

  const sections = [
    { id: 'acceptance', title: 'Acceptance of Terms' },
    { id: 'services', title: 'Description of Services' },
    { id: 'obligations', title: 'User Obligations' },
    { id: 'ip', title: 'Intellectual Property' },
    { id: 'liability', title: 'Limitation of Liability' },
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
                <div className="p-4 bg-purple-100 dark:bg-purple-900/50 rounded-full">
                  <FileText className="w-12 h-12 text-purple-600" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Terms & Conditions</h1>
              <p className="text-gray-600 dark:text-gray-400">Last Updated: June 2026</p>
            </div>
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-white font-semibold mb-1">Download Terms & Conditions</h3>
                  <p className="text-purple-100 text-sm">Get a PDF copy</p>
                </div>
                <button onClick={handleDownload} className="flex items-center px-6 py-3 bg-white text-purple-600 rounded-full font-semibold" data-cursor="pointer">
                  <Download className="mr-2" size={20} />
                  Download PDF
                </button>
              </div>
            </div>
            <nav className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-8">
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Table of Contents</h3>
              <ul className="space-y-2">
                {sections.map((s) => (
                  <li key={s.id}><a href={`#${s.id}`} className="text-purple-600 dark:text-purple-400 hover:underline">{s.title}</a></li>
                ))}
              </ul>
            </nav>
            <div className="prose dark:prose-invert max-w-none space-y-8">
              {[
                { id: 'acceptance', content: '[PLACEHOLDER: Terms acceptance clause]' },
                { id: 'services', content: '[PLACEHOLDER: Description of services offered]' },
                { id: 'obligations', content: '[PLACEHOLDER: User obligations and responsibilities]' },
                { id: 'ip', content: '[PLACEHOLDER: Intellectual property rights]' },
                { id: 'liability', content: '[PLACEHOLDER: Liability limitations]' },
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
