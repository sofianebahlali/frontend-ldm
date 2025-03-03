import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import ChatBot from '../components/ChatBot';

const PremiumLandingPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('monthly');
  const [activeFaq, setActiveFaq] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Effect for dark mode preference
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  // Effect for scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Function to toggle FAQ items
  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Navigate to dashboard on login
  const handleGetStarted = () => {
    navigate('/register');
  };

  return (
    <div className={`min-h-screen font-sans ${darkMode ? 'dark' : ''}`}>
      <ChatBot />
      <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased transition-colors duration-300">
        {/* Gradient Orbs (decorative) */}
        <div className="fixed pointer-events-none inset-0 overflow-hidden">
          <div className={`absolute left-[10%] top-[20%] w-96 h-96 bg-purple-500/20 dark:bg-purple-800/10 rounded-full filter blur-3xl opacity-40 dark:opacity-30 transition-opacity duration-500 animate-blob`}></div>
          <div className={`absolute right-[15%] top-[10%] w-96 h-96 bg-blue-500/20 dark:bg-blue-800/10 rounded-full filter blur-3xl opacity-40 dark:opacity-30 transition-opacity duration-500 animate-blob animation-delay-2000`}></div>
          <div className={`absolute bottom-[10%] left-[15%] w-96 h-96 bg-pink-500/20 dark:bg-pink-800/10 rounded-full filter blur-3xl opacity-40 dark:opacity-30 transition-opacity duration-500 animate-blob animation-delay-4000`}></div>
        </div>

        {/* Suppression du quadrillage en fond en mode clair */}
        <div className="fixed inset-0 dark:bg-grid-slate-100/[0.03] bg-[center_top_-1px] pointer-events-none"></div>

        {/* Navbar */}
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-sm' : ''}`}>
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
                  <a href="#features" className="text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200">Fonctionnalités</a>
                  <a href="#testimonials" className="text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200">Témoignages</a>
                  <a href="#pricing" className="text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200">Tarifs</a>
                  <a href="#faq" className="text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200">FAQ</a>
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
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none"
                  aria-label="Toggle mobile menu"
                >
                  {mobileMenuOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800"
              >
                <div className="px-4 pt-2 pb-4 space-y-1">
                  <a href="#features" className="block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">Fonctionnalités</a>
                  <a href="#testimonials" className="block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">Témoignages</a>
                  <a href="#pricing" className="block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">Tarifs</a>
                  <a href="#faq" className="block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">FAQ</a>
                  <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-800">
                    <Link to="/login" className="block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">Se connecter</Link>
                    <Link to="/register" className="mt-2 block px-3 py-2 text-base font-medium text-center rounded-md bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200">
                      Démarrer gratuitement
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-3xl mx-auto">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
                >
                  <span className="block">Simplifiez vos</span>
                  <span className="block bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                    lettres de mission
                  </span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-6 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
                >
                  Une solution élégante pour les experts-comptables. Automatisez la création et la gestion de vos lettres de mission en quelques clics.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
                >
                  <Link
                    to="/register"
                    className="px-8 py-3 text-base font-medium rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Démarrer gratuitement
                  </Link>
                  <a
                    href="#features"
                    className="px-8 py-3 text-base font-medium rounded-full border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-colors duration-200"
                  >
                    Voir la démo
                    <svg className="ml-2 -mr-1 w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                </motion.div>
              </div>
              
              {/* Hero Image */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="mt-16 relative mx-auto max-w-5xl"
              >
                <div className="relative shadow-2xl shadow-gray-400/10 dark:shadow-black/30 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                  <img
                    src="https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80"
                    alt="Interface LDM"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-black/60 to-transparent"></div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Clients Section - Modifiée comme demandé */}
          <section className="py-16 border-t border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Rejoignez les plus de 50 experts-comptables qui nous ont déjà choisis <br /> et faites-nous confiance à votre tour !
                </p>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-bold sm:text-4xl"
                >
                  Fonctionnalités puissantes
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
                >
                  Une solution complète conçue pour simplifier votre quotidien professionnel
                </motion.p>
              </div>

              <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col relative group"
                  >
                    <div className="relative rounded-2xl bg-gray-50 dark:bg-gray-900 p-6 border border-gray-200 dark:border-gray-800 transition-all duration-300 group-hover:border-gray-300 dark:group-hover:border-gray-700 group-hover:shadow-xl group-hover:-translate-y-1">
                      <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black dark:bg-white text-white dark:text-black">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                      <p className="mt-3 text-gray-600 dark:text-gray-400">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* How it works section - Titre modifié comme demandé */}
          <section className="py-24 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-bold sm:text-4xl"
                >
                  Générez vos lettres de missions en trois étapes clefs
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
                >
                  Un processus simple et efficace pour optimiser votre travail
                </motion.p>
              </div>

              <div className="mt-20 relative">
                {/* Connect line (desktop) */}
                <div className="hidden lg:block absolute top-24 left-[50%] h-[calc(100%-160px)] w-0.5 bg-gray-200 dark:bg-gray-800"></div>

                {/* Steps */}
                <div className="space-y-16 lg:space-y-28">
                  {howItWorksSteps.map((step, index) => (
                    <div key={index} className="lg:flex lg:items-center lg:gap-16">
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className={`lg:w-1/2 ${index % 2 === 1 ? 'lg:order-2' : ''}`}
                      >
                        <div className="flex items-center mb-4">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold">
                            {index + 1}
                          </div>
                          <h3 className="ml-3 text-xl font-bold">{step.title}</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className={`mt-8 lg:mt-0 lg:w-1/2 ${index % 2 === 1 ? 'lg:order-1' : ''}`}
                      >
                        <div className="overflow-hidden rounded-xl shadow-xl border border-gray-200 dark:border-gray-800">
                          <img
                            src={step.image}
                            alt={step.title}
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Section - Prix modifiés comme demandé */}
          <section id="pricing" className="py-24 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-bold sm:text-4xl"
                >
                  Tarifs simples et transparents
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
                >
                  Choisissez le forfait qui correspond à vos besoins
                </motion.p>
              </div>

              {/* Toggle Month/Year */}
              <div className="flex justify-center mt-8">
                <div className="relative p-1 rounded-full bg-gray-200 dark:bg-gray-800 flex">
                  <button
                    onClick={() => setActiveTab('monthly')}
                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                      activeTab === 'monthly'
                        ? 'text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
                    }`}
                  >
                    Mensuel
                    {activeTab === 'monthly' && (
                      <motion.div
                        layoutId="tabIndicator"
                        className="absolute inset-0 rounded-full bg-black dark:bg-white"
                        style={{ zIndex: -1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('yearly')}
                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                      activeTab === 'yearly'
                        ? 'text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
                    }`}
                  >
                    Annuel
                    {activeTab === 'yearly' && (
                      <motion.div
                        layoutId="tabIndicator"
                        className="absolute inset-0 rounded-full bg-black dark:bg-white"
                        style={{ zIndex: -1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </button>
                </div>
              </div>

              {/* Pricing Cards */}
              <div className="mt-12 grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
                {/* Free Plan */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="rounded-2xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="p-8">
                    <h3 className="text-2xl font-bold">Gratuit</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      Idéal pour les petits cabinets et les indépendants
                    </p>
                    <p className="mt-6 flex items-baseline">
                      <span className="text-5xl font-extrabold">0€</span>
                      <span className="ml-2 text-gray-500">/ mois</span>
                    </p>

                    <ul className="mt-8 space-y-4">
                      {freePlanFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="flex-shrink-0 w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="ml-3 text-gray-600 dark:text-gray-400">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <a
                        href="#"
                        className="block w-full py-3 px-4 rounded-full border border-gray-300 dark:border-gray-700 text-center text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                      >
                        Commencer gratuitement
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Premium Plan - Prix modifiés */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="rounded-2xl bg-black dark:bg-white text-white dark:text-black overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="p-8">
                    <div className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gray-800 dark:bg-gray-200 text-white dark:text-black mb-2">
                      RECOMMANDÉ
                    </div>
                    <h3 className="text-2xl font-bold">Premium</h3>
                    <p className="mt-2 text-gray-300 dark:text-gray-700">
                      Pour les cabinets professionnels
                    </p>
                    <p className="mt-6 flex items-baseline">
                      <span className="text-5xl font-extrabold">
                        {activeTab === 'monthly' ? '8,99€' : '80€'}
                      </span>
                      <span className="ml-2 text-gray-300 dark:text-gray-700">
                        / {activeTab === 'monthly' ? 'mois' : 'an'}
                      </span>
                    </p>
                    {activeTab === 'yearly' && (
                      <p className="mt-2 text-sm text-gray-300 dark:text-gray-700">
                        Équivalent à 6,67€/mois. Économisez 26% !
                      </p>
                    )}

                    <ul className="mt-8 space-y-4">
                      {premiumPlanFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="flex-shrink-0 w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="ml-3 text-gray-300 dark:text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <a
                        href="#"
                        className="block w-full py-3 px-4 rounded-full bg-white dark:bg-black text-black dark:text-white text-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200"
                      >
                        Commencer l'essai gratuit
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-bold sm:text-4xl"
                >
                  Questions fréquentes
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
                >
                  Nous avons répondu aux questions les plus courantes
                </motion.p>
              </div>

              <div className="mt-16 space-y-4">
                {faqItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden"
                  >
                    <button
                      className="flex justify-between items-center w-full text-left p-6 focus:outline-none"
                      onClick={() => toggleFaq(index)}
                    >
                      <span className="text-lg font-medium">{item.question}</span>
                      <svg
                        className={`w-5 h-5 transform transition-transform duration-300 ${
                          activeFaq === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {activeFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="p-6 pt-0 text-gray-600 dark:text-gray-400">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-black dark:bg-white text-white dark:text-black">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold sm:text-4xl"
              >
                Prêt à simplifier votre gestion documentaire ?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-4 text-xl text-gray-300 dark:text-gray-700 max-w-2xl mx-auto"
              >
                Rejoignez des centaines d'experts-comptables qui ont déjà transformé leur façon de travailler.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
              >
                <Link
                  to="/register"
                  className="px-8 py-3 text-base font-medium rounded-full bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-200"
                >
                  Démarrer gratuitement
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-3 text-base font-medium rounded-full border border-gray-600 dark:border-gray-300 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
                >
                  Nous contacter
                </Link>
              </motion.div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <a href="#" className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-lg bg-black dark:bg-white flex items-center justify-center">
                    <span className="text-white dark:text-black font-bold">LM</span>
                  </div>
                  <span className="text-xl font-semibold">LDM</span>
                </a>
                <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
                  Solution innovante pour automatiser et personnaliser vos lettres de mission.
                </p>
                <div className="mt-6 flex space-x-4">
                  <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">Produit</h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <a href="#features" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                      Fonctionnalités
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                      Tutoriels
                    </a>
                  </li>
                  <li>
                    <a href="#pricing" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                      Tarifs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                      Mises à jour
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">Support</h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                      Centre d'aide
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#faq" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">Société</h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                      À propos
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                      Emplois
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                      Mentions légales
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} LDM. Tous droits réservés.
              </p>
              <div className="mt-4 md:mt-0 flex space-x-6">
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100">
                  Confidentialité
                </Link>
                <Link to="/terms" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100">
                  Conditions
                </Link>
                <Link to="/cookies" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

// Data for the features section
const features = [
  {
    title: "Génération automatique",
    description: "Créez des lettres de mission professionnelles en quelques clics à partir de modèles personnalisables.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    title: "Gestion des clients",
    description: "Centralisez et gérez facilement les informations de vos clients pour une réutilisation efficace.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  {
    title: "Personnalisation avancée",
    description: "Adaptez vos documents selon vos besoins avec des options de personnalisation complètes.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    title: "Conformité garantie",
    description: "Assurez-vous que vos lettres de mission sont toujours conformes aux normes professionnelles en vigueur.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: "Gain de temps",
    description: "Réduisez considérablement le temps consacré aux tâches administratives pour vous concentrer sur l'essentiel.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "Modèles multiples",
    description: "Accédez à une bibliothèque de modèles professionnels adaptés à différents types de missions.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
      </svg>
    )
  }
];

// Data for How it works section
const howItWorksSteps = [
  {
    title: "Configurez votre cabinet",
    description: "Renseignez les informations de votre cabinet et vos conditions générales de vente. Ces données seront automatiquement intégrées à vos lettres de mission.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    title: "Créez votre base clients",
    description: "Ajoutez vos clients avec toutes leurs informations : forme juridique, activité, coordonnées, etc. Ces données seront prêtes à être utilisées dans vos documents.",
    image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    title: "Générez vos lettres de mission",
    description: "Sélectionnez un client, choisissez le type d'honoraires (forfait ou temps passé), ajustez les paramètres selon vos besoins et générez votre lettre de mission en un clic.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  }
];

// Data for pricing plans
const freePlanFeatures = [
  "Jusqu'à 5 clients",
  "1 modèle de lettre de mission",
  "Gestion des informations de base",
  "Exports au format Word",
  "Support par email"
];

const premiumPlanFeatures = [
  "Clients illimités",
  "Modèles de lettres illimités",
  "Personnalisation avancée",
  "Gestion des CGV et infos cabinet",
  "Exports dans tous les formats",
  "Support prioritaire",
  "Mises à jour régulières"
];

// Data for FAQ section
const faqItems = [
  {
    question: "Comment fonctionne l'essai gratuit ?",
    answer: "Notre essai gratuit de 14 jours vous donne accès à toutes les fonctionnalités premium sans engagement. Aucune carte bancaire n'est requise pour commencer. À la fin de la période d'essai, vous pouvez choisir de passer à la version premium ou de continuer avec la version gratuite limitée."
  },
  {
    question: "Les lettres de mission générées sont-elles conformes aux normes professionnelles ?",
    answer: "Absolument. Toutes nos lettres de mission sont conformes aux normes professionnelles en vigueur et aux recommandations de l'Ordre des Experts-Comptables. Nos modèles sont régulièrement mis à jour pour refléter les évolutions réglementaires."
  },
  {
    question: "Puis-je personnaliser les modèles de lettres de mission ?",
    answer: "Oui, notre solution permet une personnalisation avancée. Vous pouvez adapter les modes de facturation (forfait ou temps passé), définir vos propres clauses, conditions générales de vente et divers paramètres pour correspondre exactement aux besoins de votre cabinet."
  },
  {
    question: "Comment puis-je exporter les lettres de mission générées ?",
    answer: "Les lettres de mission générées sont exportables au format Word (.docx), ce qui vous permet de les modifier ultérieurement si nécessaire, de les imprimer ou de les envoyer à vos clients par email."
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer: "La sécurité de vos données est notre priorité absolue. Nous utilisons des protocoles de chiffrement avancés et des serveurs sécurisés pour protéger vos informations. Toutes les données sont stockées en France, conformément au RGPD, et vous restez propriétaire de vos informations."
  },
  {
    question: "Est-il possible de changer de formule après inscription ?",
    answer: "Oui, vous pouvez passer de la version gratuite à la version premium à tout moment. Si vous êtes déjà sur la version premium et souhaitez revenir à la version gratuite, ce changement prendra effet à la fin de votre période de facturation actuelle."
  }
];

export default PremiumLandingPage;