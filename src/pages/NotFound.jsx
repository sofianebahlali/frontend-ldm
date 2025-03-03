import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function NotFound() {
  const [darkMode, setDarkMode] = useState(false);

  // Check for dark mode preference
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`min-h-screen font-sans ${darkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased min-h-screen">
        {/* Gradient Orbs (decorative) */}
        <div className="fixed pointer-events-none inset-0 overflow-hidden">
          <div className="absolute left-[10%] top-[20%] w-96 h-96 bg-purple-500/20 dark:bg-purple-800/10 rounded-full filter blur-3xl opacity-40 dark:opacity-30 transition-opacity duration-500 animate-blob"></div>
          <div className="absolute right-[15%] top-[10%] w-96 h-96 bg-blue-500/20 dark:bg-blue-800/10 rounded-full filter blur-3xl opacity-40 dark:opacity-30 transition-opacity duration-500 animate-blob animation-delay-2000"></div>
        </div>

        {/* Dot Grid (decorative) */}
        <div className="fixed inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.03] bg-[center_top_-1px] pointer-events-none"></div>
        
        {/* Header */}
        <header className="relative z-10 px-4 py-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-black dark:bg-white flex items-center justify-center">
                <span className="text-white dark:text-black font-bold">LM</span>
              </div>
              <span className="text-xl font-semibold">LDM</span>
            </Link>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </header>

        {/* 404 Content */}
        <div className="flex flex-col justify-center items-center px-6 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-md"
          >
            <h1 className="text-9xl font-bold text-black dark:text-white">404</h1>
            <div className="mt-4 space-y-4">
              <h2 className="text-3xl font-bold">Page non trouvée</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                La page que vous recherchez n'existe pas ou a été déplacée.
              </p>
            </div>
            
            <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
              <Link
                to="/"
                className="px-8 py-3 text-base font-medium rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Retour à l'accueil
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 text-base font-medium rounded-full border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-colors duration-200"
              >
                Nous contacter
              </Link>
            </div>
          </motion.div>

          {/* Decorative 404 elements */}
          <div className="relative mt-16 max-w-2xl w-full">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute -top-16 -left-8 w-20 h-20 bg-gray-200 dark:bg-gray-800 rounded-full"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute top-8 right-20 w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded-full"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-4 right-10 w-24 h-24 bg-gray-100 dark:bg-gray-900 rounded-full"
            ></motion.div>
          </div>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-0 left-0 right-0 py-8 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} LDM. Tous droits réservés.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default NotFound;