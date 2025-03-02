import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FormField, SelectField, CheckboxField } from '../components/FormFields';

const ClientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // État pour le formulaire
  const [formValues, setFormValues] = useState({
    denom_social: "",
    Nom_representantclient: "",
    Forme_client: "",
    Impot_client: "",
    Tva_client: false,
    Siren_client: "",
    Activite_client: "",
    Adresse_etablissementclient: "",
    code_postaletablissementclient: "",
    ville_etablissementclient: "",
    date_debutexercice: "",
    date_finexercice: "",
    Nom_expertdossier: ""
  });

  // État pour les erreurs de validation spécifiques par champ
  const [fieldErrors, setFieldErrors] = useState({});

  // États pour gérer le chargement et les erreurs
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showIncompleteModal, setShowIncompleteModal] = useState(false);

  // Si on est en mode édition, charger les données du client
  useEffect(() => {
    if (isEditMode) {
      const fetchClient = async () => {
        try {
          // Afficher les informations pour debug
          console.log(`Tentative de récupération du client avec l'ID: ${id}`);
          console.log(`URL de l'API: ${BACKEND_URL}/clients/${id}`);
          
          // Essai avec un gestionnaire d'erreur plus détaillé
          const response = await fetch(`${BACKEND_URL}/clients/${id}`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            credentials: 'include'
          });
          
          // Vérifier et afficher le statut de la réponse
          console.log(`Statut de la réponse: ${response.status}`);
          
          if (!response.ok) {
            const errorText = await response.text();
            console.error('Réponse d\'erreur:', errorText);
            throw new Error(`Erreur ${response.status}: ${errorText || response.statusText}`);
          }
          
          const clientData = await response.json();
          console.log('Données client reçues:', clientData);
          
          // Formater les dates
          const formatDate = (dateString) => {
            if (!dateString) return '';
            const date = new Date(dateString);
            return date.toISOString().split('T')[0]; // Format YYYY-MM-DD
          };
          
          setFormValues({
            ...clientData,
            date_debutexercice: formatDate(clientData.date_debutexercice),
            date_finexercice: formatDate(clientData.date_finexercice),
            // Assurer que Tva_client est un booléen
            Tva_client: Boolean(clientData.Tva_client)
          });
          
        } catch (err) {
          console.error('Erreur détaillée lors du chargement du client:', err);
          setError(`Impossible de charger les données du client: ${err.message}`);
        } finally {
          setInitialLoading(false);
        }
      };
      
      fetchClient();
    } else {
      // S'assurer que initialLoading est mis à false même en mode création
      setInitialLoading(false);
    }
  }, [BACKEND_URL, id, isEditMode]);

  // Effet pour faire disparaître le message de succès après quelques secondes
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Gérer les changements de champs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Si on change la TVA, on efface l'erreur sur le SIREN
    if (name === 'Tva_client') {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        if (!checked) {
          delete newErrors.Siren_client;
        }
        return newErrors;
      });
    }

    // On efface l'erreur pour le champ en cours d'édition
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  // Fonction pour valider le formulaire
  const validateForm = () => {
    const errors = {};

    // Validation dénomination sociale (obligatoire)
    if (!formValues.denom_social) {
      errors.denom_social = "La dénomination sociale est requise";
    }

    // Validation du SIREN uniquement si TVA cochée
    if (formValues.Tva_client) {
      if (!formValues.Siren_client) {
        errors.Siren_client = "Le SIREN est obligatoire pour les entreprises assujetties à la TVA";
      } else if (!/^\d{9}$/.test(formValues.Siren_client)) {
        errors.Siren_client = "Le SIREN doit contenir exactement 9 chiffres";
      }
    }

    // Validation des dates
    if (formValues.date_debutexercice && formValues.date_finexercice) {
      const dateDebut = new Date(formValues.date_debutexercice);
      const dateFin = new Date(formValues.date_finexercice);
      
      if (dateFin <= dateDebut) {
        errors.date_finexercice = "La date de fin doit être postérieure à la date de début";
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Fonction pour procéder à la soumission
  const proceedToSubmit = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const method = isEditMode ? 'PUT' : 'POST';
      const url = isEditMode
        ? `${BACKEND_URL}/clients/${id}`
        : `${BACKEND_URL}/clients`;
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formValues)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la soumission');
      }
      
      const savedClient = await response.json();
      
      // Afficher le message de succès
      setSuccess({
        message: isEditMode 
          ? `Le client "${savedClient.denom_social}" a été modifié avec succès` 
          : `Le client "${savedClient.denom_social}" a été ajouté avec succès`,
        type: 'success'
      });
      
      // Rediriger après un court délai si c'est un nouvel ajout
      if (!isEditMode) {
        setTimeout(() => {
          navigate('/clients');
        }, 2000);
      }
      
    } catch (err) {
      console.error('Erreur lors de la soumission:', err);
      setError(err.message || 'Une erreur est survenue lors de la soumission.');
    } finally {
      setLoading(false);
    }
  };

  // Vérifier les champs avant soumission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Valider le formulaire
    if (!validateForm()) {
      setError('Veuillez corriger les erreurs dans le formulaire');
      return;
    }

    // Vérifier si des champs essentiels sont vides
    const requiredFields = ['denom_social'];
    const emptyRequiredFields = requiredFields.filter(field => !formValues[field]);
    
    if (emptyRequiredFields.length > 0) {
      setError('Veuillez remplir au moins la dénomination sociale');
      return;
    }
    
    // Vérifier si des champs non-essentiels sont vides
    const emptyFields = Object.entries(formValues)
      .filter(([key, value]) => key !== 'id' && !value && !requiredFields.includes(key));
    
    if (emptyFields.length > 0) {
      setShowIncompleteModal(true);
    } else {
      proceedToSubmit();
    }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white"></div>
      </div>
    );
  }

  // Options pour les champs select
  const formeOptions = [
    { value: 'SARL', label: 'SARL' },
    { value: 'SAS', label: 'SAS' },
    { value: 'SASU', label: 'SASU' },
    { value: 'EURL', label: 'EURL' },
    { value: 'SA', label: 'SA' },
    { value: 'SCI', label: 'SCI' },
    { value: 'EI', label: 'EI' },
    { value: 'Autre', label: 'Autre' }
  ];

  const impotOptions = [
    { value: 'Impôt sur le revenu', label: 'Impôt sur le revenu' },
    { value: 'Impôt sur les sociétés', label: 'Impôt sur les sociétés' },
    { value: 'Non soumis à impôt', label: 'Non soumis à impôt' }
  ];

  return (
    <div className="py-8">
      <header className="mb-10">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {isEditMode ? 'Modifier le client' : 'Ajouter un client'}
        </h1>
        <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
          {isEditMode 
            ? 'Modifiez les informations du client' 
            : 'Ajoutez un nouveau client à votre portefeuille'}
        </p>
      </header>

      {/* Message de succès */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-8 rounded-md bg-green-50 dark:bg-green-900/30 p-5"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-base font-medium text-green-800 dark:text-green-200">
                {success.message}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Message d'erreur */}
      {error && (
        <div className="mb-8 rounded-md bg-red-50 dark:bg-red-900/30 p-5">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-base font-medium text-red-800 dark:text-red-200">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Formulaire */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-8 sm:p-8">
          <form className="space-y-10" onSubmit={handleSubmit}>
            {/* Informations de base */}
            <div>
              <h3 className="text-xl font-medium leading-6 text-gray-900 dark:text-white">Informations générales</h3>
              <div className="mt-8 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
                <FormField
                  id="denom_social"
                  name="denom_social"
                  label="Dénomination sociale"
                  value={formValues.denom_social}
                  onChange={handleChange}
                  required
                  placeholder="Ex: SARL Dupont & Associés"
                  error={fieldErrors.denom_social}
                  className="sm:col-span-3"
                />
                
                <SelectField
                  id="Forme_client"
                  name="Forme_client"
                  label="Forme juridique"
                  value={formValues.Forme_client}
                  onChange={handleChange}
                  options={formeOptions}
                  emptyOption="Sélectionner"
                  error={fieldErrors.Forme_client}
                  className="sm:col-span-3"
                />

                <FormField
                  id="Nom_representantclient"
                  name="Nom_representantclient"
                  label="Représentant(s)"
                  value={formValues.Nom_representantclient}
                  onChange={handleChange}
                  placeholder="Ex: Jean Dupont"
                  className="sm:col-span-3"
                />
                
                <SelectField
                  id="Impot_client"
                  name="Impot_client"
                  label="Type d'impôt"
                  value={formValues.Impot_client}
                  onChange={handleChange}
                  options={impotOptions}
                  emptyOption="Sélectionner"
                  className="sm:col-span-3"
                />

                <CheckboxField
                  id="Tva_client"
                  name="Tva_client"
                  label="Assujetti à la TVA"
                  checked={formValues.Tva_client}
                  onChange={handleChange}
                  className="sm:col-span-3 mt-2"
                />

                <FormField
                  id="Siren_client"
                  name="Siren_client"
                  label={`SIREN ${formValues.Tva_client ? '*' : ''}`}
                  value={formValues.Siren_client}
                  onChange={handleChange}
                  placeholder="Ex: 123456789"
                  required={formValues.Tva_client}
                  error={fieldErrors.Siren_client}
                  className="sm:col-span-3"
                />

                <FormField
                  id="Activite_client"
                  name="Activite_client"
                  label="Activité"
                  value={formValues.Activite_client}
                  onChange={handleChange}
                  placeholder="Ex: Commerce de détail"
                  className="sm:col-span-6"
                />
              </div>
            </div>
            
            {/* Adresse */}
            <div className="pt-6">
              <h3 className="text-xl font-medium leading-6 text-gray-900 dark:text-white">Adresse de l'établissement</h3>
              <div className="mt-8 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
                <FormField
                  id="Adresse_etablissementclient"
                  name="Adresse_etablissementclient"
                  label="Adresse"
                  value={formValues.Adresse_etablissementclient}
                  onChange={handleChange}
                  placeholder="Ex: 1 rue de la Paix"
                  className="sm:col-span-6"
                />

                <FormField
                  id="code_postaletablissementclient"
                  name="code_postaletablissementclient"
                  label="Code postal"
                  value={formValues.code_postaletablissementclient}
                  onChange={handleChange}
                  placeholder="Ex: 75001"
                  className="sm:col-span-2"
                />

                <FormField
                  id="ville_etablissementclient"
                  name="ville_etablissementclient"
                  label="Ville"
                  value={formValues.ville_etablissementclient}
                  onChange={handleChange}
                  placeholder="Ex: Paris"
                  className="sm:col-span-4"
                />
              </div>
            </div>
            
            {/* Exercice comptable */}
            <div className="pt-6">
              <h3 className="text-xl font-medium leading-6 text-gray-900 dark:text-white">Exercice comptable</h3>
              <div className="mt-8 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
                <FormField
                  id="date_debutexercice"
                  name="date_debutexercice"
                  label="Date de début d'exercice"
                  type="date"
                  value={formValues.date_debutexercice}
                  onChange={handleChange}
                  className="sm:col-span-3"
                />

                <FormField
                  id="date_finexercice"
                  name="date_finexercice"
                  label="Date de fin d'exercice"
                  type="date"
                  value={formValues.date_finexercice}
                  onChange={handleChange}
                  error={fieldErrors.date_finexercice}
                  className="sm:col-span-3"
                />
              </div>
            </div>
            
            {/* Informations complémentaires */}
            <div className="pt-6">
              <h3 className="text-xl font-medium leading-6 text-gray-900 dark:text-white">Informations complémentaires</h3>
              <div className="mt-8 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
                <FormField
                  id="Nom_expertdossier"
                  name="Nom_expertdossier"
                  label="Nom de l'expert en charge du dossier"
                  value={formValues.Nom_expertdossier}
                  onChange={handleChange}
                  placeholder="Ex: Marie Durand"
                  className="sm:col-span-6"
                />
              </div>
            </div>
            
            {/* Boutons d'action */}
            <div className="pt-8 flex justify-end space-x-4">
              <Link
                to="/clients"
                className="py-3.5 px-6 border-2 border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-base font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white transition-colors duration-200"
              >
                Annuler
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-3.5 px-6 border-2 border-transparent rounded-md shadow-sm text-base font-medium text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white dark:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Traitement en cours...
                  </>
                ) : (
                  isEditMode ? 'Enregistrer les modifications' : 'Créer le client'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de confirmation pour les champs manquants */}
      {showIncompleteModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-yellow-600 dark:text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      Informations incomplètes
                    </h3>
                    <div className="mt-2">
                      <p className="text-base text-gray-500 dark:text-gray-400">
                        Certains champs n'ont pas été remplis. Souhaitez-vous quand même continuer et enregistrer ce client avec les informations partielles ?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border-2 border-transparent shadow-sm px-4 py-3 bg-black dark:bg-white text-base font-medium text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setShowIncompleteModal(false);
                    proceedToSubmit();
                  }}
                >
                  Continuer
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border-2 border-gray-300 dark:border-gray-600 shadow-sm px-4 py-3 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowIncompleteModal(false)}
                >
                  Revenir au formulaire
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientForm;