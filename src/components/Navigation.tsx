import { useState, useEffect, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';

export default memo(function Navigation() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  const nav = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors ${scrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">MF</div>
            <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white hidden sm:block">Mohammad Fuzail</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {isHome && nav.map((n) => (
              <button key={n.name} onClick={() => scrollTo(n.href)} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {n.name}
              </button>
            ))}
            {!isHome && <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Home</Link>}
            <button onClick={() => setDark(!dark)} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700" data-cursor="pointer">
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setDark(!dark)} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setOpen(!open)} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            {isHome && nav.map((n) => (
              <button key={n.name} onClick={() => scrollTo(n.href)} className="block w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300">
                {n.name}
              </button>
            ))}
            {!isHome && <Link to="/" className="block px-4 py-3 text-gray-700 dark:text-gray-300">Home</Link>}
          </div>
        )}
      </nav>
    </motion.header>
  );
});
