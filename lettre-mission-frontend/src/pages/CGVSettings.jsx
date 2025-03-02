import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cgvService } from '../services/api';
import { formStyles } from '../styles/FormStyles';

const CGVSettings = () => {
  const [formData, setFormData] = useState({
    delais_resiliation: '',
    delais_interruption: '',
    Acompte_pourcentage: '',
    Pourcentage_indemnite: '',
    Mode_reglement: '',
    Duree_contestationfacture: '',
    Ville_tribunal: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  
  // Effet pour charger les données existantes des CGV
  useEffect(() => {
    const fetchCGVData = async () => {
      try {
        const response = await cgvService.getCGVInfo();
        
        // Si nous avons reçu des données, les utiliser
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
            delais_resiliation: response.delais_resiliation || '',
            delais_interruption: response.delais_interruption || '',
            Acompte_pourcentage: response.Acompte_pourcentage || '',
            Pourcentage_indemnite: response.Pourcentage_indemnite || '',
            Mode_reglement: response.Mode_reglement || '',
            Duree_contestationfacture: response.Duree_contestationfacture || '',
            Ville_tribunal: response.Ville_tribunal || ''
          });
        }
      } catch (err) {
        console.error('Erreur détaillée:', err);
        // Vérifier si c'est une erreur 404 (pas de données) ou une vraie erreur
        if (err.message && err.message.includes('404')) {
          setIsNewUser(true);
        } else {
          setError('Impossible de charger les données des CGV. Veuillez réessayer plus tard.');
        }
      } finally {
        setInitialLoading(false);
      }
    };
    
    fetchCGVData();
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
    const { name, value, type } = e.target;
    // Pour les champs numériques, on convertit la valeur en nombre
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : parseFloat(value)) : value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await cgvService.updateCGVInfo(formData);
      setSuccess(true);
      setIsNewUser(false); // L'utilisateur n'est plus considéré comme nouveau après avoir soumis des données
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
      setError(`Erreur lors de la sauvegarde des CGV. ${err.message}`);
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
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Conditions Générales de Vente</h2>
      
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
                Bienvenue ! Configurez vos conditions générales de vente ci-dessous pour les utiliser dans vos lettres de mission.
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
                Les conditions générales de vente ont été enregistrées avec succès.
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
          {/* Délais */}
          <div className={formStyles.formSection}>
            <h3 className={formStyles.sectionTitle}>Délais et pourcentages</h3>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
              <div>
                <label htmlFor="delais_resiliation" className={formStyles.label}>
                  Délai de résiliation (jours)
                </label>
                <input
                  type="number"
                  name="delais_resiliation"
                  id="delais_resiliation"
                  value={formData.delais_resiliation}
                  onChange={handleChange}
                  min="0"
                  className={formStyles.input}
                />
              </div>
              
              <div>
                <label htmlFor="delais_interruption" className={formStyles.label}>
                  Délai d'interruption (jours)
                </label>
                <input
                  type="number"
                  name="delais_interruption"
                  id="delais_interruption"
                  value={formData.delais_interruption}
                  onChange={handleChange}
                  min="0"
                  className={formStyles.input}
                />
              </div>

              <div>
                <label htmlFor="Duree_contestationfacture" className={formStyles.label}>
                  Délai de contestation facture (jours)
                </label>
                <input
                  type="number"
                  name="Duree_contestationfacture"
                  id="Duree_contestationfacture"
                  value={formData.Duree_contestationfacture}
                  onChange={handleChange}
                  min="0"
                  className={formStyles.input}
                />
              </div>
              
              <div>
                <label htmlFor="Acompte_pourcentage" className={formStyles.label}>
                  Pourcentage d'acompte (%)
                </label>
                <input
                  type="number"
                  name="Acompte_pourcentage"
                  id="Acompte_pourcentage"
                  value={formData.Acompte_pourcentage}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  step="0.01"
                  className={formStyles.input}
                />
              </div>
              
              <div>
                <label htmlFor="Pourcentage_indemnite" className={formStyles.label}>
                  Pourcentage d'indemnité (%)
                </label>
                <input
                  type="number"
                  name="Pourcentage_indemnite"
                  id="Pourcentage_indemnite"
                  value={formData.Pourcentage_indemnite}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  step="0.01"
                  className={formStyles.input}
                />
              </div>
            </div>
          </div>
          
          {/* Règlement et tribunal */}
          <div className={formStyles.formSection}>
            <h3 className={formStyles.sectionTitle}>Mode de règlement et juridiction</h3>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label htmlFor="Mode_reglement" className={formStyles.label}>
                  Mode de règlement
                </label>
                <select
                  name="Mode_reglement"
                  id="Mode_reglement"
                  value={formData.Mode_reglement}
                  onChange={handleChange}
                  className={formStyles.select}
                >
                  <option value="">Sélectionner</option>
                  <option value="Virement">Virement</option>
                  <option value="Chèque">Chèque</option>
                  <option value="Prélèvement">Prélèvement</option>
                  <option value="Carte bancaire">Carte bancaire</option>
                  <option value="Espèces">Espèces</option>
                  <option value="Virement ou chèque">Virement ou chèque</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="Ville_tribunal" className={formStyles.label}>
                  Ville du tribunal compétent
                </label>
                <input
                  type="text"
                  name="Ville_tribunal"
                  id="Ville_tribunal"
                  value={formData.Ville_tribunal}
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

export default CGVSettings;