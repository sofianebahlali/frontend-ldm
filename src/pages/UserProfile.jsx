// Dans un nouveau fichier src/pages/UserProfile.jsx

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { themeService } from '../services/themeService';
import { authService, stripeService } from '../services/api';
import { profileCompletionService } from '../services/profileCompletionService';

const UserProfile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(themeService.getCurrentTheme());
  const [profileCompletion, setProfileCompletion] = useState(profileCompletionService.getCompletion());
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Charger les données utilisateur au montage du composant
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const data = await authService.getUserStatus();
        setUserData(data);
      } catch (err) {
        console.error('Erreur lors du chargement des données utilisateur:', err);
        setError('Impossible de charger vos informations. Veuillez réessayer plus tard.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, []);
  
  // Gérer le changement de thème
  const handleThemeToggle = () => {
    const newDarkMode = themeService.toggleTheme();
    setDarkMode(newDarkMode);
  };
  
  // Construire les sections de complétion du profil
  const getCompletionSections = () => {
    const completionSteps = [
      {
        title: "Création du compte",
        description: "Vous avez créé votre compte avec succès",
        completed: true,
        percentage: 25,
        link: null
      },
      {
        title: "Informations du cabinet",
        description: "Renseignez les informations de votre cabinet pour vos documents",
        completed: profileCompletion > 30,
        percentage: 40,
        link: "/settings/cabinet"
      },
      {
        title: "Conditions générales de vente",
        description: "Personnalisez vos CGV pour vos lettres de mission",
        completed: profileCompletion > 70,
        percentage: 20,
        link: "/settings/cgv" // Cette route devra être créée
      },
      {
        title: "Ajout de clients",
        description: "Commencez à ajouter vos clients",
        completed: profileCompletion > 85,
        percentage: 15,
        link: "/clients/add"
      }
    ];
    
    return completionSteps;
  };
  
  const completionSections = getCompletionSections();
  
  return (
    <div className="py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Mon profil</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Consultez et modifiez vos informations personnelles
          </p>
        </header>
        
        {error && (
          <div className="mb-6 rounded-md bg-red-50 dark:bg-red-900/30 p-4">
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
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Section 1: Informations utilisateur */}
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Informations personnelles</h2>
                
                <div className="flex items-center mb-6">
                  <div className="h-16 w-16 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-xl font-medium">
                    {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{userData?.username || user?.username}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{userData?.email || 'Email non disponible'}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Plan d'abonnement</h4>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white flex items-center">
                      {userData?.is_premium || user?.isPremium ? (
                        <>
                          <span className="inline-flex mr-2 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            Premium
                          </span>
                          Plan complet avec toutes les fonctionnalités
                        </>
                      ) : (
                        <>
                          <span className="inline-flex mr-2 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                            Gratuit
                          </span>
                          Plan de base avec fonctionnalités limitées
                        </>
                      )}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Date d'inscription</h4>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {userData?.created_at || 'Non disponible'}
                    </p>
                  </div>
                </div>
                
                <div className="mt-8">
                  {userData?.is_premium || user?.isPremium ? (
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white"
                      onClick={() => {
                        // Fonction pour gérer l'abonnement
                        // À implémenter
                      }}
                    >
                      Gérer mon abonnement
                    </button>
                  ) : (
                    <Link
                      to="/settings/payment"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white"
                    >
                      Passer à Premium
                    </Link>
                  )}
                </div>
              </div>
            </div>
            
            {/* Section 2: Préférences */}
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Préférences</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Thème de l'interface</h3>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-gray-900 dark:text-white">
                        {darkMode ? 'Mode sombre' : 'Mode clair'}
                      </span>
                      <button
                        type="button"
                        onClick={handleThemeToggle}
                        className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white ${
                          darkMode ? 'bg-black dark:bg-white' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                        aria-pressed={darkMode}
                      >
                        <span className="sr-only">Activer le mode sombre</span>
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white dark:bg-gray-900 shadow transform ring-0 transition ease-in-out duration-200 ${
                            darkMode ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Langue</h3>
                    <div className="mt-4">
                      <select
                        id="language"
                        name="language"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white sm:text-sm rounded-md"
                        defaultValue="fr"
                      >
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Notifications</h3>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="email-notifications"
                            name="email-notifications"
                            type="checkbox"
                            className="focus:ring-black dark:focus:ring-white h-4 w-4 text-black dark:text-white border-gray-300 dark:border-gray-600 rounded"
                            defaultChecked
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="email-notifications" className="font-medium text-gray-700 dark:text-gray-300">Notifications par email</label>
                          <p className="text-gray-500 dark:text-gray-400">Recevoir des emails pour les mises à jour importantes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Section 3: Complétion du profil */}
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Complétion du profil</h2>
                
                <div className="flex items-center mb-4">
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div 
                      className="h-2 bg-black dark:bg-white rounded-full"
                      style={{ width: `${profileCompletion}%` }}
                    ></div>
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">{profileCompletion}%</span>
                </div>
                
                <div className="space-y-6 mt-6">
                  {completionSections.map((section, index) => (
                    <div key={index} className="relative">
                      <div className={`flex items-start ${index < completionSections.length - 1 ? 'pb-6' : ''}`}>
                        <div className={`flex-shrink-0 h-6 w-6 rounded-full ${
                          section.completed 
                            ? 'bg-black dark:bg-white text-white dark:text-black' 
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                          } flex items-center justify-center`}
                        >
                          {section.completed ? (
                            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="text-xs">{index + 1}</span>
                          )}
                        </div>
                        <div className="ml-3">
                          <h3 className={`text-sm font-medium ${
                            section.completed 
                              ? 'text-gray-900 dark:text-white'
                              : 'text-gray-500 dark:text-gray-400'
                          }`}>{section.title}</h3>
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{section.description}</p>
                          {!section.completed && section.link && (
                            <Link to={section.link} className="mt-2 inline-block text-xs font-medium text-black dark:text-white hover:underline">
                              Compléter cette étape
                            </Link>
                          )}
                        </div>
                      </div>
                      
                      {/* Ligne de connexion verticale entre les étapes */}
                      {index < completionSections.length - 1 && (
                        <div className={`absolute top-6 left-3 -ml-px h-full w-0.5 ${
                          section.completed ? 'bg-black dark:bg-white' : 'bg-gray-200 dark:bg-gray-700'
                        }`}></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default UserProfile;