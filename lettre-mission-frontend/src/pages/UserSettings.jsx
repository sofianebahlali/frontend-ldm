import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { authService, stripeService } from '../services/api';
import { formStyles } from '../styles/FormStyles';
import { useAuth } from '../contexts/AuthContext';

const UserSettings = () => {
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [subscriptionInfo, setSubscriptionInfo] = useState({
    isActive: false,
    plan: '',
    renewalDate: '',
    price: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  
  // Chargement des données utilisateur
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authService.getUserStatus();
        
        if (userData) {
          setFormData(prev => ({
            ...prev,
            username: userData.username || '',
            email: userData.email || ''
          }));
          
          setSubscriptionInfo({
            isActive: userData.is_premium || false,
            plan: 'Premium',
            renewalDate: userData.subscription_end_date || 'Non disponible',
            price: '29€/mois'
          });
        }
      } catch (err) {
        console.error('Erreur lors du chargement des données utilisateur:', err);
        setError('Impossible de charger vos informations. Veuillez réessayer plus tard.');
      } finally {
        setInitialLoading(false);
      }
    };
    
    fetchUserData();
  }, []);
  
  // Mise à jour des informations du profil
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Cette fonction devrait être implémentée dans votre API
      // await authService.updateProfile({
      //   email: formData.email
      // });
      
      // Simuler la mise à jour pour l'instant
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess({
        message: 'Vos informations de profil ont été mises à jour avec succès.',
        type: 'profile'
      });
    } catch (err) {
      console.error('Erreur lors de la mise à jour du profil:', err);
      setError('Une erreur est survenue lors de la mise à jour de votre profil.');
    } finally {
      setLoading(false);
    }
  };
  
  // Mise à jour du mot de passe
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    setError(null);
    setSuccess(null);
    
    // Vérification de la correspondance des mots de passe
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Les nouveaux mots de passe ne correspondent pas.');
      setPasswordLoading(false);
      return;
    }
    
    try {
      // Cette fonction devrait être implémentée dans votre API
      // await authService.updatePassword({
      //   currentPassword: formData.currentPassword,
      //   newPassword: formData.newPassword
      // });
      
      // Simuler la mise à jour pour l'instant
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Réinitialiser les champs de mot de passe
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
      setSuccess({
        message: 'Votre mot de passe a été mis à jour avec succès.',
        type: 'password'
      });
    } catch (err) {
      console.error('Erreur lors de la mise à jour du mot de passe:', err);
      setError('Une erreur est survenue lors de la mise à jour de votre mot de passe.');
    } finally {
      setPasswordLoading(false);
    }
  };
  
  // Annulation de l'abonnement
  const handleCancelSubscription = async () => {
    setCancelLoading(true);
    setError(null);
    
    try {
      // Cette fonction devrait être implémentée dans votre API
      await stripeService.cancelSubscription();
      
      setSubscriptionInfo(prev => ({
        ...prev,
        isActive: false
      }));
      
      setSuccess({
        message: 'Votre abonnement a été annulé. Vous pouvez continuer à utiliser les fonctionnalités premium jusqu\'à la fin de votre période de facturation actuelle.',
        type: 'subscription'
      });
      
      setShowCancelModal(false);
    } catch (err) {
      console.error('Erreur lors de l\'annulation de l\'abonnement:', err);
      setError('Une erreur est survenue lors de l\'annulation de votre abonnement.');
    } finally {
      setCancelLoading(false);
    }
  };
  
  // Mise à jour des valeurs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white"></div>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Paramètres du compte</h2>
      
      {/* Message de succès */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-md bg-green-50 dark:bg-green-900/30 p-4"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800 dark:text-green-200">
                {success.message}
              </p>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Message d'erreur */}
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
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section Profil */}
        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Informations du profil</h3>
          
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <div>
              <label htmlFor="username" className={formStyles.label}>
                Nom d'utilisateur
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={formStyles.input}
                disabled // Le nom d'utilisateur n'est pas modifiable
              />
              <p className={formStyles.helperText}>Le nom d'utilisateur ne peut pas être modifié.</p>
            </div>
            
            <div>
              <label htmlFor="email" className={formStyles.label}>
                Adresse e-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={formStyles.input}
                required
              />
            </div>
            
            <div className="pt-5 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white dark:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Mise à jour...
                  </>
                ) : 'Mettre à jour'}
              </button>
            </div>
          </form>
        </div>
        
        {/* Section Mot de passe */}
        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Modifier votre mot de passe</h3>
          
          <form onSubmit={handlePasswordUpdate} className="space-y-6">
            <div>
              <label htmlFor="currentPassword" className={formStyles.label}>
                Mot de passe actuel
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className={formStyles.input}
                required
              />
            </div>
            
            <div>
              <label htmlFor="newPassword" className={formStyles.label}>
                Nouveau mot de passe
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className={formStyles.input}
                required
                minLength="8"
              />
              <p className={formStyles.helperText}>8 caractères minimum</p>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className={formStyles.label}>
                Confirmer le nouveau mot de passe
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={formStyles.input}
                required
              />
            </div>
            
            <div className="pt-5 flex justify-end">
              <button
                type="submit"
                disabled={passwordLoading}
                className="inline-flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {passwordLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white dark:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Modification...
                  </>
                ) : 'Modifier le mot de passe'}
              </button>
            </div>
          </form>
        </div>
        
        {/* Section Abonnement */}
        <div className="lg:col-span-2 bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Gérer votre abonnement</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center mb-4">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${subscriptionInfo.isActive ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
                  {subscriptionInfo.isActive ? (
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  )}
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium text-gray-900 dark:text-white">Statut de l'abonnement</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {subscriptionInfo.isActive ? 'Actif' : 'Inactif'}
                  </p>
                </div>
              </div>
              
              <div className="space-y-3 mt-6">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Abonnement</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{subscriptionInfo.plan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Prix</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{subscriptionInfo.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Prochaine facturation</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{subscriptionInfo.renewalDate}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col justify-end">
              {subscriptionInfo.isActive ? (
                <div className="space-y-4">
                  <button
                    onClick={() => setShowCancelModal(true)}
                    className="w-full py-3 px-6 border border-red-600 dark:border-red-500 text-red-600 dark:text-red-500 rounded-md font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                  >
                    Annuler l'abonnement
                  </button>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    En annulant, vous pourrez continuer à utiliser les fonctionnalités premium jusqu'à la fin de votre période de facturation actuelle.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <a
                    href="/settings/payment"
                    className="block w-full py-3 px-6 text-center border border-transparent rounded-md shadow-sm text-base font-medium text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
                  >
                    Passer à l'abonnement Premium
                  </a>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Débloquez toutes les fonctionnalités premium pour seulement 29€/mois, sans engagement.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Section Déconnexion */}
        <div className="lg:col-span-2 bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Déconnexion</h3>
          
          <div className="flex items-center justify-between">
            <p className="text-gray-500 dark:text-gray-400">
              Déconnectez-vous de votre compte sur tous les appareils.
            </p>
            
            <button
              onClick={logout}
              className="py-3 px-6 border border-gray-300 dark:border-gray-700 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
      
      {/* Modal de confirmation d'annulation */}
      {showCancelModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
            
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-red-600 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      Annuler votre abonnement
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Êtes-vous sûr de vouloir annuler votre abonnement ? Vous pourrez continuer à accéder aux fonctionnalités premium jusqu'à la fin de votre période de facturation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleCancelSubscription}
                  disabled={cancelLoading}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cancelLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Annulation...
                    </>
                  ) : 'Confirmer l\'annulation'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCancelModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-700 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSettings;