import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Check for dark mode preference
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Simulation d'envoi d'email
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className={`min-h-screen font-sans ${darkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased min-h-screen">
        {/* Gradient Orbs (decorative) */}
        <div className="fixed pointer-events-none inset-0 overflow-hidden">
          <div className="absolute left-[10%] top-[20%] w-96 h-96 bg-purple-500/20 dark:bg-purple-800/10 rounded-full filter blur-3xl opacity-40 dark:opacity-30 transition-opacity duration-500 animate-blob"></div>
          <div className="absolute right-[15%] top-[10%] w-96 h-96 bg-blue-500/20 dark:bg-blue-800/10 rounded-full filter blur-3xl opacity-40 dark:opacity-30 transition-opacity duration-500 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[10%] left-[15%] w-96 h-96 bg-pink-500/20 dark:bg-pink-800/10 rounded-full filter blur-3xl opacity-40 dark:opacity-30 transition-opacity duration-500 animate-blob animation-delay-4000"></div>
        </div>

        {/* Dot Grid (decorative) */}
        <div className="fixed inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.03] bg-[center_top_-1px] pointer-events-none"></div>

        {/* Header with logo and dark mode toggle */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-20">
              <div className="flex items-center space-x-4">
                <Link to="/" className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-lg bg-black dark:bg-white flex items-center justify-center">
                    <span className="text-white dark:text-black font-bold">LM</span>
                  </div>
                  <span className="text-xl font-semibold">LDM</span>
                </Link>
                <nav className="hidden md:flex items-center space-x-8">
                  <Link to="/#features" className="text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200">Fonctionnalités</Link>
                  <Link to="/#pricing" className="text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200">Tarifs</Link>
                  <Link to="/contact" className="text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200">Contact</Link>
                </nav>
              </div>
              <div className="flex items-center space-x-4">
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
                <div className="hidden md:flex items-center space-x-4">
                  <Link to="/login" className="text-sm font-medium hover:text-black dark:hover:text-white transition-colors duration-200">Se connecter</Link>
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Démarrer gratuitement
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="pt-32 pb-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h1 className="text-4xl font-bold sm:text-5xl">Contactez-nous</h1>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
                Nous sommes là pour répondre à toutes vos questions et vous aider à tirer le meilleur parti de notre plateforme.
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Contact Information */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-black dark:bg-white text-white dark:text-black p-8 md:p-12"
                  >
                    <h2 className="text-2xl font-bold mb-6">Informations de contact</h2>
                    <p className="text-gray-300 dark:text-gray-700 mb-8">
                      Notre équipe est à votre disposition pour vous accompagner dans l'utilisation de notre solution.
                    </p>

                    <div className="space-y-6">
                      <div className="flex items-start">
                        <svg className="h-6 w-6 text-gray-300 dark:text-gray-700 mt-1 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <div>
                          <h3 className="font-medium">Téléphone</h3>
                          <p className="mt-1 text-gray-300 dark:text-gray-700">+33 1 23 45 67 89</p>
                          <p className="mt-1 text-gray-300 dark:text-gray-700 text-sm">Du lundi au vendredi, 9h-18h</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <svg className="h-6 w-6 text-gray-300 dark:text-gray-700 mt-1 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <h3 className="font-medium">Email</h3>
                          <p className="mt-1 text-gray-300 dark:text-gray-700">contact@ldm-app.com</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <svg className="h-6 w-6 text-gray-300 dark:text-gray-700 mt-1 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div>
                          <h3 className="font-medium">Adresse</h3>
                          <p className="mt-1 text-gray-300 dark:text-gray-700">123 Avenue de la Comptabilité<br/>75008 Paris, France</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-12">
                      <h3 className="font-medium mb-3">Suivez-nous</h3>
                      <div className="flex space-x-4">
                        <a href="#" className="text-gray-300 dark:text-gray-700 hover:text-white dark:hover:text-black transition-colors duration-200">
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                          </svg>
                        </a>
                        <a href="#" className="text-gray-300 dark:text-gray-700 hover:text-white dark:hover:text-black transition-colors duration-200">
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                        <a href="#" className="text-gray-300 dark:text-gray-700 hover:text-white dark:hover:text-black transition-colors duration-200">
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </motion.div>

                  {/* Contact Form */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="p-8 md:p-12"
                  >
                    {success ? (
                      <div className="h-full flex flex-col items-center justify-center">
                        <div className="rounded-full bg-green-100 dark:bg-green-900 p-3 text-green-600 dark:text-green-400 mb-4">
                          <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">Message envoyé !</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-400 text-center">
                          Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.
                        </p>
                        <button
                          onClick={() => setSuccess(false)}
                          className="mt-6 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
                        >
                          Envoyer un autre message
                        </button>
                      </div>
                    ) : (
                      <>
                        <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nom</label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white"
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                            <div className="mt-1">
                              <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white"
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sujet</label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="subject"
                                id="subject"
                                required
                                value={formData.subject}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white"
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                            <div className="mt-1">
                              <textarea
                                id="message"
                                name="message"
                                rows={4}
                                required
                                value={formData.message}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white"
                              />
                            </div>
                          </div>
                          <div>
                            <button
                              type="submit"
                              disabled={loading}
                              className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white transition-colors duration-200"
                            >
                              {loading ? (
                                <>
                                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white dark:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Envoi en cours...
                                </>
                              ) : 'Envoyer'}
                            </button>
                          </div>
                        </form>
                      </>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="md:flex md:items-center md:justify-between">
              <div className="flex justify-center md:justify-start">
                <Link to="/" className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-lg bg-black dark:bg-white flex items-center justify-center">
                    <span className="text-white dark:text-black font-bold">LM</span>
                  </div>
                  <span className="text-xl font-semibold">LDM</span>
                </Link>
              </div>
              <div className="mt-8 md:mt-0">
                <p className="text-center md:text-right text-sm text-gray-500">
                  &copy; {new Date().getFullYear()} LDM. Tous droits réservés.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Contact;