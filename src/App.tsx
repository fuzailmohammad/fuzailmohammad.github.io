import React, { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { ScrollProgress } from './components/ScrollProgress';
import { Preloader } from './components/Preloader';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <ThemeProvider>
      <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
        {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
        
        {!isLoading && (
          <>
            <ScrollProgress />
            <Navigation />
            <main>
              <Hero />
              <About />
              <Skills />
              <Experience />
              <Projects />
              <Contact />
            </main>
            <Footer />
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;