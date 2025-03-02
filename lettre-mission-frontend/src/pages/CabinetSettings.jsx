import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cabinetService } from '../services/api';
import { formStyles } from '../styles/FormStyles';

const CabinetSettings = () => {
  const [formData, setFormData] = useState({
    Denom_socialexpert: '',
    Siret_expert: '',
    Adresse_expert: '',
    Tel_expert: '',
    Mail_expert: '',
    Site_expert: '',
    Region_expert: '',
    Intracom_expert: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  
  // Effet pour charger les données existantes du cabinet
  useEffect(() => {
    const fetchCabinetData = async () => {
      try {
        const response = await cabinetService.getCabinetInfo();
        
        if (response) {
          // Vérifier si les données sont vides (nouvel utilisateur)
          const hasData = Object.values(response).some(value => 
            value !== null && value !== undefined && String(value).trim() !== ''
          );
          
          if (!hasData) {
            // C'est un nouvel utilisateur sans données
            setIsNewUser(true);
          }
          
          setFormData({
            Denom_socialexpert: response.Denom_socialexpert || '',
            Siret_expert: response.Siret_expert || '',
            Adresse_expert: response.Adresse_expert || '',
            Tel_expert: response.Tel_expert || '',
            Mail_expert: response.Mail_expert || '',
            Site_expert: response.Site_expert || '',
            Region_expert: response.Region_expert || '',
            Intracom_expert: response.Intracom_expert || ''
          });
        }
      } catch (err) {
        console.error('Erreur détaillée:', err);
        // Vérifier si c'est une erreur 404 (pas de données) ou une vraie erreur
        if (err.message && err.message.includes('404')) {
          setIsNewUser(true);
        } else {
          setError('Impossible de charger les données du cabinet. Veuillez réessayer plus tard.');
        }
      } finally {
        setInitialLoading(false);
      }
    };
    
    fetchCabinetData();
  }, []);
  
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
      await cabinetService.updateCabinetInfo(formData);
      setSuccess(true);
      setIsNewUser(false); // L'utilisateur n'est plus considéré comme nouveau après avoir soumis des données
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
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Informations du cabinet</h2>
      
      {/* Message pour nouvel utilisateur */}
      {isNewUser && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-md bg-blue-50 dark:bg-blue-900/30 p-4"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Bienvenue ! Configurez les informations de votre cabinet pour les utiliser dans vos lettres de mission.
              </p>
            </div>
          </div>
        </motion.div>
      )}
      
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
        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          {/* Informations du cabinet */}
          <div className={formStyles.formSection}>
            <h3 className={formStyles.sectionTitle}>Informations générales</h3>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label htmlFor="Denom_socialexpert" className={formStyles.label}>
                  Dénomination sociale <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="Denom_socialexpert"
                  id="Denom_socialexpert"
                  value={formData.Denom_socialexpert}
                  onChange={handleChange}
                  className={formStyles.input}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="Siret_expert" className={formStyles.label}>
                  Numéro SIRET
                </label>
                <input
                  type="text"
                  name="Siret_expert"
                  id="Siret_expert"
                  value={formData.Siret_expert}
                  onChange={handleChange}
                  className={formStyles.input}
                />
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="Adresse_expert" className={formStyles.label}>
                  Adresse complète
                </label>
                <textarea
                  id="Adresse_expert"
                  name="Adresse_expert"
                  rows={3}
                  value={formData.Adresse_expert}
                  onChange={handleChange}
                  className={formStyles.textarea}
                />
              </div>
            </div>
          </div>
          
          {/* Coordonnées */}
          <div className={formStyles.formSection}>
            <h3 className={formStyles.sectionTitle}>Coordonnées</h3>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label htmlFor="Tel_expert" className={formStyles.label}>
                  Téléphone
                </label>
                <input
                  type="text"
                  name="Tel_expert"
                  id="Tel_expert"
                  value={formData.Tel_expert}
                  onChange={handleChange}
                  className={formStyles.input}
                />
              </div>
              
              <div>
                <label htmlFor="Mail_expert" className={formStyles.label}>
                  Email
                </label>
                <input
                  type="email"
                  name="Mail_expert"
                  id="Mail_expert"
                  value={formData.Mail_expert}
                  onChange={handleChange}
                  className={formStyles.input}
                />
              </div>
              
              <div>
                <label htmlFor="Site_expert" className={formStyles.label}>
                  Site web
                </label>
                <input
                  type="url"
                  name="Site_expert"
                  id="Site_expert"
                  value={formData.Site_expert}
                  onChange={handleChange}
                  className={formStyles.input}
                  placeholder="https://www.votresite.fr"
                />
              </div>
              
              <div>
                <label htmlFor="Region_expert" className={formStyles.label}>
                  Région
                </label>
                <input
                  type="text"
                  name="Region_expert"
                  id="Region_expert"
                  value={formData.Region_expert}
                  onChange={handleChange}
                  className={formStyles.input}
                />
              </div>
              
              <div>
                <label htmlFor="Intracom_expert" className={formStyles.label}>
                  Numéro TVA intracommunautaire
                </label>
                <input
                  type="text"
                  name="Intracom_expert"
                  id="Intracom_expert"
                  value={formData.Intracom_expert}
                  onChange={handleChange}
                  className={formStyles.input}
                />
              </div>
            </div>
          </div>
          
          <div className="pt-5 flex justify-end space-x-4">
            <button
              type="button"
              className="py-3 px-6 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-base font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white transition-colors duration-200"
              onClick={() => window.location.reload()} // Recharger la page pour annuler
            >
              Annuler
            </button>
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
                  Enregistrement...
                </>
              ) : 'Enregistrer'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CabinetSettings;