import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authService } from '../services/api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const plan = searchParams.get('plan');

  // Check for dark mode preference
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password !== passwordConfirm) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);
    
    try {
      await authService.register(username, email, password);
      // Rediriger vers la page de connexion avec un message de succès
      navigate('/login?registered=true');
    } catch (err) {
      setError(err.message || 'Une erreur est survenue lors de l\'inscription.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen font-sans ${darkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased min-h-screen flex flex-col">
        {/* Gradient Orbs (decorative) */}
        <div className="fixed pointer-events-none inset-0 overflow-hidden">
          <div className="absolute left-[10%] top-[20%] w-96 h-96 bg-purple-500/20 dark:bg-purple-800/10 rounded-full filter blur-3xl opacity-40 dark:opacity-30 transition-opacity duration-500 animate-blob"></div>
          <div className="absolute right-[15%] top-[10%] w-96 h-96 bg-blue-500/20 dark:bg-blue-800/10 rounded-full filter blur-3xl opacity-40 dark:opacity-30 transition-opacity duration-500 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[10%] left-[15%] w-96 h-96 bg-pink-500/20 dark:bg-pink-800/10 rounded-full filter blur-3xl opacity-40 dark:opacity-30 transition-opacity duration-500 animate-blob animation-delay-4000"></div>
        </div>

        {/* Dot Grid (decorative) */}
        <div className="fixed inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.03] bg-[center_top_-1px] pointer-events-none"></div>

        {/* Header with logo and dark mode toggle */}
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

        <div className="flex-1 flex flex-col md:flex-row py-12 px-4 relative z-10">
          {/* Left panel - Information */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2 md:pr-8 mb-10 md:mb-0"
          >
            <div className="max-w-md mx-auto md:ml-auto md:mr-0">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold">Simplifiez vos lettres de mission</h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                  Rejoignez des milliers d'experts-comptables qui font confiance à LDM pour leurs documents professionnels.
                </p>
              </div>
              
              <div className="mt-10">
                <h3 className="text-lg font-medium mb-4">Ce qui vous attend :</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Création simplifiée de lettres de mission</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Gestion efficace de votre portefeuille clients</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Documents professionnels conformes à la réglementation</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Gain de temps significatif sur les tâches administratives</span>
                  </li>
                </ul>
              </div>

              {plan === 'premium' && (
                <div className="mt-10 bg-black dark:bg-white text-white dark:text-black rounded-lg p-6">
                  <h3 className="font-semibold text-lg">Plan Premium sélectionné !</h3>
                  <p className="mt-2">
                    Vous allez bénéficier de toutes les fonctionnalités avancées de LDM pendant 14 jours gratuitement.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Right panel - Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:w-1/2 md:pl-8"
          >
            <div className="max-w-md mx-auto md:mx-0">
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold">
                  {plan === 'premium' ? 'Commencez votre essai Premium' : 'Créez votre compte'}
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Ou{' '}
                  <Link to="/login" className="font-medium text-black dark:text-white hover:text-gray-800 dark:hover:text-gray-200">
                    connectez-vous à votre compte
                  </Link>
                </p>
              </div>

              {error && (
                <div className="mt-6 rounded-md bg-red-50 dark:bg-red-900/30 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800 dark:text-red-200">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8">
                <div className="bg-white dark:bg-gray-900 py-8 px-6 shadow-xl rounded-xl border border-gray-200 dark:border-gray-800">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Nom d'utilisateur
                      </label>
                      <div className="mt-1">
                        <input
                          id="username"
                          name="username"
                          type="text"
                          autoComplete="username"
                          required
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white dark:bg-gray-800 sm:text-sm"
                          placeholder="Votre nom d'utilisateur"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Adresse email
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white dark:bg-gray-800 sm:text-sm"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Mot de passe
                      </label>
                      <div className="mt-1">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="new-password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white dark:bg-gray-800 sm:text-sm"
                          placeholder="Créez un mot de passe sécurisé"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="password-confirm" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Confirmer le mot de passe
                      </label>
                      <div className="mt-1">
                        <input
                          id="password-confirm"
                          name="password-confirm"
                          type="password"
                          autoComplete="new-password"
                          required
                          value={passwordConfirm}
                          onChange={(e) => setPasswordConfirm(e.target.value)}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white dark:bg-gray-800 sm:text-sm"
                          placeholder="Confirmez votre mot de passe"
                        />
                      </div>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="terms-and-privacy"
                        name="terms-and-privacy"
                        type="checkbox"
                        required
                        className="h-4 w-4 text-black dark:text-white focus:ring-black dark:focus:ring-white border-gray-300 dark:border-gray-700 rounded"
                      />
                      <label htmlFor="terms-and-privacy" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        J'accepte les{' '}
                        <Link to="/terms" className="font-medium text-black dark:text-white hover:text-gray-800 dark:hover:text-gray-200">
                          conditions d'utilisation
                        </Link>{' '}
                        et la{' '}
                        <Link to="/privacy" className="font-medium text-black dark:text-white hover:text-gray-800 dark:hover:text-gray-200">
                          politique de confidentialité
                        </Link>
                      </label>
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white dark:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Création du compte...
                          </>
                        ) : (plan === 'premium' ? 'Commencer l\'essai gratuit' : 'Créer un compte')}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} LDM. Tous droits réservés.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Register;