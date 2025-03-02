import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authService } from '../services/api';
import { themeService } from '../services/themeService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // État pour la case à cocher
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Initialisation du thème avec le service
  useEffect(() => {
    // Utiliser le service de thème pour initialiser
    const isDarkMode = themeService.initTheme();
    setDarkMode(isDarkMode);
  }, []);

  // Vérifiez si l'utilisateur est déjà connecté (session persistante)
  useEffect(() => {
    const checkPersistentLogin = async () => {
      // Récupérer la session stockée si elle existe
      const persistentSession = localStorage.getItem('persistentSession');
      
      if (persistentSession) {
        try {
          // Vérifier si la session est toujours valide
          const status = await authService.getUserStatus();
          
          if (status && status.username) {
            // Session valide, rediriger vers le dashboard
            navigate('/dashboard');
          }
        } catch (err) {
          // Session expirée ou invalide, supprimer la session persistante
          localStorage.removeItem('persistentSession');
        }
      }
    };
    
    checkPersistentLogin();
  }, [navigate]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = themeService.toggleTheme();
    setDarkMode(newDarkMode);
  };

  // Check if user just registered
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('registered') === 'true') {
      // Could show a success message here
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Passer l'état de rememberMe au service d'authentification
      const result = await authService.login(username, password, rememberMe);
      
      // Si l'option "Se souvenir de moi" est cochée, stocker cette information
      if (rememberMe) {
        localStorage.setItem('persistentSession', 'true');
      }
      
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Une erreur est survenue lors de la connexion.');
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

        <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-md w-full">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="mt-6 text-center text-3xl font-extrabold">Connexion</h2>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                  Ou{' '}
                  <Link to="/register" className="font-medium text-black dark:text-white hover:text-gray-800 dark:hover:text-gray-200">
                    commencez votre essai gratuit
                  </Link>
                </p>
              </motion.div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 rounded-md bg-red-50 dark:bg-red-900/30 p-4"
                >
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
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-8"
              >
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
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Mot de passe
                      </label>
                      <div className="mt-1">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white dark:bg-gray-800 sm:text-sm"
                          placeholder="Votre mot de passe"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 text-black dark:text-white focus:ring-black dark:focus:ring-white border-gray-300 dark:border-gray-700 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          Se souvenir de moi
                        </label>
                      </div>

                      <div className="text-sm">
                        <Link to="/forgot-password" className="font-medium text-black dark:text-white hover:text-gray-800 dark:hover:text-gray-200">
                          Mot de passe oublié ?
                        </Link>
                      </div>
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
                            Connexion en cours...
                          </>
                        ) : 'Se connecter'}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
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

export default Login;