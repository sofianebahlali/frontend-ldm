import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { stripeService } from '../services/api';

const SubscriptionPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));

  useEffect(() => {
    // Actualiser les informations de l'utilisateur
    const refreshUserStatus = async () => {
      try {
        const status = await stripeService.checkSubscriptionStatus();
        if (status && status.is_premium !== undefined) {
          const updatedUser = { ...user, isPremium: status.is_premium };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setUser(updatedUser);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération du statut:', err);
      }
    };

    refreshUserStatus();
  }, []);

  const handleSubscribe = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Créer une session de paiement
      const session = await stripeService.createCheckoutSession();
      
      if (session && session.sessionId) {
        // Rediriger vers la page de paiement Stripe
        const stripe = window.Stripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
        stripe.redirectToCheckout({ sessionId: session.sessionId });
      } else {
        throw new Error('Session de paiement invalide');
      }
    } catch (err) {
      console.error('Erreur lors de la création de la session:', err);
      setError(err.message || 'Une erreur est survenue lors de la création de la session de paiement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Abonnement Premium</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Débloquez toutes les fonctionnalités avancées pour optimiser votre gestion documentaire
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
        
        {user?.isPremium ? (
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    Vous êtes abonné Premium !
                  </h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400">
                    <p>
                      Profitez de toutes les fonctionnalités avancées pour optimiser votre gestion documentaire.
                    </p>
                  </div>
                </div>
                <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                    Actif
                  </span>
                </div>
              </div>
              
              <div className="mt-6">
                <Link
                  to="/generate-ldm"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white"
                >
                  Générer une lettre de mission
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Passez à l'abonnement Premium
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400">
                <p>
                  Notre abonnement Premium vous donne accès à toutes les fonctionnalités avancées pour 
                  seulement 29€/mois, sans engagement.
                </p>
              </div>
              
              <div className="mt-6 space-y-6">
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="text-base font-medium text-gray-900 dark:text-white">
                    Premium inclut :
                  </h4>
                  <ul className="mt-4 space-y-3">
                    <li className="flex items-start">
                      <svg className="flex-shrink-0 h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3 text-gray-700 dark:text-gray-300">Clients illimités</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="flex-shrink-0 h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3 text-gray-700 dark:text-gray-300">Génération de lettres de mission</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="flex-shrink-0 h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3 text-gray-700 dark:text-gray-300">Personnalisation avancée des documents</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="flex-shrink-0 h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3 text-gray-700 dark:text-gray-300">Support prioritaire</span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={handleSubscribe}
                    disabled={loading}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white dark:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Chargement...
                      </>
                    ) : (
                      'Passer à l\'abonnement premium'
                    )}
                  </button>
                  <p className="ml-4 text-xs text-gray-500 dark:text-gray-400">
                    Essai gratuit de 14 jours, sans engagement
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SubscriptionPage;