import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CabinetSettings = () => {
  const [formData, setFormData] = useState({
    Denom_socialexpert: '',
    Siret_expert: '',
    Adresse_expert: '',
    Tel_expert: '',
    Mail_expert: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  
  // Effet pour charger les données existantes du cabinet
  useEffect(() => {
    const fetchCabinetData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/cabinet`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
        
        if (!response.ok) {
          console.log('Erreur lors de la récupération des données du cabinet:', response.status);
          // S'il n'y a pas de données, ce n'est pas une erreur grave
          if (response.status !== 404) {
            throw new Error('Impossible de récupérer les données du cabinet');
          }
        } else {
          // Récupération réussie
          const cabinetData = await response.json();
          console.log('Données cabinet reçues:', cabinetData);
          
          // Mise à jour du formulaire avec les données existantes
          setFormData({
            Denom_socialexpert: cabinetData.Denom_socialexpert || '',
            Siret_expert: cabinetData.Siret_expert || '',
            Adresse_expert: cabinetData.Adresse_expert || '',
            Tel_expert: cabinetData.Tel_expert || '',
            Mail_expert: cabinetData.Mail_expert || ''
          });
        }
      } catch (err) {
        console.error('Erreur détaillée:', err);
        setError('Impossible de charger les données du cabinet. Veuillez réessayer plus tard.');
      } finally {
        setInitialLoading(false);
      }
    };
    
    fetchCabinetData();
  }, [BACKEND_URL]);
  
  // Effet pour faire disparaître le message de succès après quelques secondes
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      console.log('Envoi des données:', formData);
      
      const response = await fetch(`${BACKEND_URL}/cabinet`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      
      // Vérifier la réponse
      console.log('Statut de la réponse:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Réponse d\'erreur:', errorText);
        throw new Error(`Erreur ${response.status}: ${errorText || response.statusText}`);
      }
      
      // Sauvegarde réussie
      setSuccess(true);
      
      // Recharger les données pour confirmer la sauvegarde
      const updatedDataResponse = await fetch(`${BACKEND_URL}/cabinet`, {
        credentials: 'include'
      });
      
      if (updatedDataResponse.ok) {
        const updatedData = await updatedDataResponse.json();
        console.log('Données mises à jour reçues après sauvegarde:', updatedData);
        
        // Vérifier si les données ont bien été enregistrées
        setFormData({
          Denom_socialexpert: updatedData.Denom_socialexpert || '',
          Siret_expert: updatedData.Siret_expert || '',
          Adresse_expert: updatedData.Adresse_expert || '',
          Tel_expert: updatedData.Tel_expert || '',
          Mail_expert: updatedData.Mail_expert || ''
        });
      }
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
      setError(`Erreur lors de la sauvegarde des informations. ${err.message}`);
    } finally {
      setLoading(false);
    }
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Paramètres du cabinet</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Configurez les informations de votre cabinet qui apparaîtront sur vos documents
          </p>
        </header>
        
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
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
                      Les informations du cabinet ont été enregistrées avec succès.
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
            
            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Informations du cabinet */}
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Informations générales</h3>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="Denom_socialexpert" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Dénomination sociale *
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="Denom_socialexpert"
                        id="Denom_socialexpert"
                        value={formData.Denom_socialexpert}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white block w-full sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-md"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="Siret_expert" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Numéro SIRET
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="Siret_expert"
                        id="Siret_expert"
                        value={formData.Siret_expert}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white block w-full sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-6">
                    <label htmlFor="Adresse_expert" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Adresse complète
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="Adresse_expert"
                        name="Adresse_expert"
                        rows={3}
                        value={formData.Adresse_expert}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white block w-full sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Coordonnées */}
              <div className="pt-8">
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Coordonnées</h3>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="Tel_expert" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Téléphone
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="Tel_expert"
                        id="Tel_expert"
                        value={formData.Tel_expert}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white block w-full sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="Mail_expert" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="Mail_expert"
                        id="Mail_expert"
                        value={formData.Mail_expert}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white block w-full sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white"
                    onClick={() => window.location.reload()} // Recharger la page pour annuler
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white dark:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enregistrement...
                      </>
                    ) : 'Enregistrer'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CabinetSettings;