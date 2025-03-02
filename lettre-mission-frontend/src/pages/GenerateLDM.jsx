import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FormField, SelectField, CheckboxField, TextareaField } from '../components/FormFields';

const GenerateLDM = () => {
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  
  // États principaux
  const [step, setStep] = useState('initial'); // 'initial', 'form'
  const [activeSection, setActiveSection] = useState('client'); // 'client', 'mission', 'cgv', 'cabinet'
  const [useExistingClient, setUseExistingClient] = useState(null);
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState('');
  const [generating, setGenerating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingClient, setLoadingClient] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dataPreloaded, setDataPreloaded] = useState({
    client: false,
    cgv: false,
    cabinet: false
  });
  
  // Références pour le défilement
  const formSections = {
    client: useRef(null),
    mission: useRef(null),
    cgv: useRef(null),
    cabinet: useRef(null)
  };
  
  // États pour les données de formulaire
  const [formData, setFormData] = useState({
    // Données client
    client: {
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
    },
    // Données lettre de mission
    mission: {
      missionType: "complete",
      honoraryType: "forfait",
      montant: "",
      duree: "12",
      dateDebutMission: "",
      objetMission: "",
      includeTerms: true,
      includeLogo: true
    },
    // Données CGV
    cgv: {
      delais_resiliation: 3,
      delais_interruption: 1,
      Acompte_pourcentage: 30,
      Pourcentage_indemnite: 50,
      Mode_reglement: "Virement bancaire",
      Duree_contestationfacture: 15,
      Ville_tribunal: "Paris"
    },
    // Données cabinet
    cabinet: {
      Denom_socialexpert: "",
      Adresse_expert: "",
      Tel_expert: "",
      Mail_expert: "",
      Site_expert: "",
      Region_expert: "",
      Siret_expert: "",
      Intracom_expert: ""
    }
  });
  
  // Changement de section active et défilement
  const changeSection = (section) => {
    setActiveSection(section);
    // Défilement vers la section
    if (formSections[section] && formSections[section].current) {
      formSections[section].current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  
  // Effet pour charger la liste des clients
  useEffect(() => {
    if (step !== 'initial') {
      const fetchClients = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${BACKEND_URL}/clients`, {
            credentials: 'include'
          });
          
          if (!response.ok) {
            throw new Error('Impossible de récupérer les clients');
          }
          
          const data = await response.json();
          setClients(data);
        } catch (err) {
          console.error('Erreur lors du chargement des clients:', err);
        } finally {
          setLoading(false);
        }
      };
      
      // Charger les informations du cabinet et les CGV par défaut
      const fetchCabinetAndCGV = async () => {
        try {
          // Récupérer les infos du cabinet
          const cabinetResponse = await fetch(`${BACKEND_URL}/mon-cabinet`, {
            credentials: 'include'
          });
          
          if (cabinetResponse.ok) {
            const cabinetData = await cabinetResponse.json();
            if (Object.keys(cabinetData).length > 0) {
              setFormData(prev => ({
                ...prev,
                cabinet: cabinetData
              }));
              setDataPreloaded(prev => ({...prev, cabinet: true}));
            }
          }
          
          // Récupérer les CGV
          const cgvResponse = await fetch(`${BACKEND_URL}/mes-cgv`, {
            credentials: 'include'
          });
          
          if (cgvResponse.ok) {
            const cgvData = await cgvResponse.json();
            if (Object.keys(cgvData).length > 0) {
              setFormData(prev => ({
                ...prev,
                cgv: cgvData
              }));
              setDataPreloaded(prev => ({...prev, cgv: true}));
            }
          }
        } catch (err) {
          console.error('Erreur lors du chargement des données:', err);
        }
      };
      
      fetchClients();
      fetchCabinetAndCGV();
    }
  }, [BACKEND_URL, step]);
  
  // Effet pour charger les données du client sélectionné
  useEffect(() => {
    if (selectedClientId) {
      const fetchClientData = async () => {
        setLoadingClient(true);
        try {
          const response = await fetch(`${BACKEND_URL}/clients/${selectedClientId}`, {
            credentials: 'include'
          });
          
          if (!response.ok) {
            throw new Error('Impossible de récupérer les données du client');
          }
          
          const clientData = await response.json();
          
          // Formatage des dates si nécessaire
          const formatDate = (dateString) => {
            if (!dateString) return '';
            const date = new Date(dateString);
            return date.toISOString().split('T')[0]; // Format YYYY-MM-DD
          };
          
          // Mettre à jour le formulaire avec les données du client
          setFormData(prev => ({
            ...prev,
            client: {
              ...clientData,
              date_debutexercice: formatDate(clientData.date_debutexercice),
              date_finexercice: formatDate(clientData.date_finexercice),
              Tva_client: Boolean(clientData.Tva_client)
            }
          }));
          
          // Indiquer que les données client sont préchargées
          setDataPreloaded(prev => ({...prev, client: true}));
        } catch (err) {
          console.error('Erreur lors du chargement des données du client:', err);
        } finally {
          setLoadingClient(false);
        }
      };
      
      fetchClientData();
    }
  }, [BACKEND_URL, selectedClientId]);
  
  // Définir le titre et l'icône pour chaque section
  const sections = [
    { 
      id: 'client', 
      title: 'Informations client',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    { 
      id: 'mission', 
      title: 'Lettre de mission',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    { 
      id: 'cgv', 
      title: 'Conditions générales',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    { 
      id: 'cabinet', 
      title: 'Informations cabinet',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    }
  ];
  
  // Gérer le choix initial
  const handleInitialChoice = (choice) => {
    setUseExistingClient(choice);
    setStep('form');
  };
  
  // Gérer le changement de client sélectionné
  const handleClientChange = (e) => {
    setSelectedClientId(e.target.value);
  };
  
  // Mettre à jour les données du formulaire
  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };
  
  // Gérer les valeurs des champs de formulaire
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Extraire la section et le champ du nom (format: section.field)
    const [section, field] = name.split('.');
    
    // Mettre à jour la valeur appropriée
    const newValue = type === 'checkbox' ? checked : value;
    
    handleInputChange(section, field, newValue);
  };
  
  // Passer à la section suivante
  const handleNextSection = () => {
    const currentIndex = sections.findIndex(section => section.id === activeSection);
    if (currentIndex < sections.length - 1) {
      changeSection(sections[currentIndex + 1].id);
    }
  };
  
  // Passer à la section précédente
  const handlePrevSection = () => {
    const currentIndex = sections.findIndex(section => section.id === activeSection);
    if (currentIndex > 0) {
      changeSection(sections[currentIndex - 1].id);
    }
  };
  
  // Soumettre le formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    setGenerating(true);
    
    // Simulation de génération de lettre
    setTimeout(() => {
      setGenerating(false);
      setSuccess(true);
      
      // Réinitialiser le succès après quelques secondes
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }, 1500);
  };
  
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
  
  const missionTypeOptions = [
    { value: 'complete', label: 'Mission complète' },
    { value: 'partielle', label: 'Mission partielle' },
    { value: 'conseil', label: 'Mission de conseil' }
  ];
  
  const honoraryTypeOptions = [
    { value: 'forfait', label: 'Forfaitaire' },
    { value: 'taux', label: 'Taux horaire' },
    { value: 'mixte', label: 'Mixte' }
  ];
  
  // Rendu du choix initial
  const renderInitialChoice = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-10"
    >
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-8 sm:p-8">
          <h3 className="text-xl font-medium text-center leading-6 text-gray-900 dark:text-white mb-8">
            Comment souhaitez-vous démarrer votre lettre de mission ?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => handleInitialChoice(true)}
              className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors p-6 rounded-lg border-2 border-gray-300 dark:border-gray-600 flex flex-col items-center text-center h-full"
            >
              <div className="bg-black dark:bg-white text-white dark:text-black p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                À partir d'un client existant
              </h4>
              <p className="text-gray-500 dark:text-gray-400">
                Sélectionnez un client dont les informations seront pré-remplies dans le formulaire.
              </p>
            </button>
            
            <button
              onClick={() => handleInitialChoice(false)}
              className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors p-6 rounded-lg border-2 border-gray-300 dark:border-gray-600 flex flex-col items-center text-center h-full"
            >
              <div className="bg-black dark:bg-white text-white dark:text-black p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Nouvelle lettre de mission
              </h4>
              <p className="text-gray-500 dark:text-gray-400">
                Créez une nouvelle lettre de mission en saisissant toutes les informations manuellement.
              </p>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
  
  // Rendu du formulaire de lettre de mission
  const renderForm = () => (
    <div className="mt-10 flex flex-col lg:flex-row gap-8">
      {/* Navigation latérale */}
      <div className="lg:w-1/4">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg border-2 border-gray-200 dark:border-gray-700 p-4 sticky top-24">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
            Étapes
          </h3>
          
          <div className="space-y-3">
            {sections.map((section, index) => {
              // Déterminer le statut de l'étape
              const isActive = activeSection === section.id;
              const isCompleted = false; // À implémenter si nécessaire
              const isPreloaded = dataPreloaded[section.id];
              
              return (
                <button
                  key={section.id}
                  onClick={() => changeSection(section.id)}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    isActive ? 'bg-black text-white dark:bg-white dark:text-black' :
                    'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex-shrink-0 mr-3">
                    {section.icon}
                  </div>
                  <span className="flex-grow text-left">{section.title}</span>
                  {isPreloaded && (
                    <span className="inline-flex ml-2 items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      Préchargé
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progression</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{getProgressPercentage()}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-black dark:bg-white transition-all duration-300" 
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contenu principal */}
      <div className="lg:w-3/4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Section de sélection du client (si useExistingClient est true) */}
          {useExistingClient && (
            <div className="mb-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-8 sm:p-8">
                <h3 className="text-xl font-medium leading-6 text-gray-900 dark:text-white mb-6">
                  Sélectionner un client
                </h3>
                
                <div className="w-full">
                  {loading ? (
                    <div className="flex justify-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black dark:border-white"></div>
                    </div>
                  ) : (
                    <SelectField
                      id="clientSelect"
                      name="clientSelect"
                      label="Client"
                      value={selectedClientId}
                      onChange={handleClientChange}
                      options={clients.map(client => ({
                        value: client.id,
                        label: client.denom_social || `Client #${client.id}`
                      }))}
                      emptyOption="Sélectionner un client"
                      required
                      className="w-full"
                    />
                  )}
                </div>
              </div>
            </div>
          )}
          
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
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
                    Lettre de mission générée avec succès ! Téléchargement en cours...
                  </p>
                </div>
              </div>
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Informations client */}
            <div 
              ref={formSections.client}
              id="client-section"
              className={`bg-white dark:bg-gray-800 shadow-lg rounded-lg border-2 ${
                activeSection === 'client' 
                  ? 'border-black dark:border-white' 
                  : 'border-gray-200 dark:border-gray-700'
              } overflow-hidden transition-colors duration-300`}
            >
              <div className="px-6 py-8 sm:p-8">
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
                  <div className="flex items-center">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black mr-3">
                      1
                    </span>
                    <h3 className="text-xl font-medium leading-6 text-gray-900 dark:text-white">
                      Informations client
                    </h3>
                  </div>
                  
                  {dataPreloaded.client && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Données préchargées
                    </span>
                  )}
                  
                  {loadingClient && (
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-gray-300 dark:border-gray-600 border-t-black dark:border-t-white rounded-full"></div>
                      Chargement...
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
                  <FormField
                    id="client.denom_social"
                    name="client.denom_social"
                    label="Dénomination sociale"
                    value={formData.client.denom_social}
                    onChange={handleChange}
                    required
                    placeholder="Ex: SARL Dupont & Associés"
                    className="sm:col-span-3"
                  />
                  
                  <SelectField
                    id="client.Forme_client"
                    name="client.Forme_client"
                    label="Forme juridique"
                    value={formData.client.Forme_client}
                    onChange={handleChange}
                    options={formeOptions}
                    emptyOption="Sélectionner"
                    className="sm:col-span-3"
                  />

                  <FormField
                    id="client.Nom_representantclient"
                    name="client.Nom_representantclient"
                    label="Représentant(s)"
                    value={formData.client.Nom_representantclient}
                    onChange={handleChange}
                    placeholder="Ex: Jean Dupont"
                    className="sm:col-span-3"
                  />
                  
                  <SelectField
                    id="client.Impot_client"
                    name="client.Impot_client"
                    label="Type d'impôt"
                    value={formData.client.Impot_client}
                    onChange={handleChange}
                    options={impotOptions}
                    emptyOption="Sélectionner"
                    className="sm:col-span-3"
                  />

                  <CheckboxField
                    id="client.Tva_client"
                    name="client.Tva_client"
                    label="Assujetti à la TVA"
                    checked={formData.client.Tva_client}
                    onChange={handleChange}
                    className="sm:col-span-3"
                  />

                  <FormField
                    id="client.Siren_client"
                    name="client.Siren_client"
                    label={`SIREN ${formData.client.Tva_client ? '*' : ''}`}
                    value={formData.client.Siren_client}
                    onChange={handleChange}
                    placeholder="Ex: 123456789"
                    required={formData.client.Tva_client}
                    className="sm:col-span-3"
                  />

                  <FormField
                    id="client.Activite_client"
                    name="client.Activite_client"
                    label="Activité"
                    value={formData.client.Activite_client}
                    onChange={handleChange}
                    placeholder="Ex: Commerce de détail"
                    className="sm:col-span-6"
                  />
                  
                  <FormField
                    id="client.Adresse_etablissementclient"
                    name="client.Adresse_etablissementclient"
                    label="Adresse"
                    value={formData.client.Adresse_etablissementclient}
                    onChange={handleChange}
                    placeholder="Ex: 1 rue de la Paix"
                    className="sm:col-span-6"
                  />

                  <FormField
                    id="client.code_postaletablissementclient"
                    name="client.code_postaletablissementclient"
                    label="Code postal"
                    value={formData.client.code_postaletablissementclient}
                    onChange={handleChange}
                    placeholder="Ex: 75001"
                    className="sm:col-span-2"
                  />

                  <FormField
                    id="client.ville_etablissementclient"
                    name="client.ville_etablissementclient"
                    label="Ville"
                    value={formData.client.ville_etablissementclient}
                    onChange={handleChange}
                    placeholder="Ex: Paris"
                    className="sm:col-span-4"
                  />
                  
                  <FormField
                    id="client.date_debutexercice"
                    name="client.date_debutexercice"
                    label="Date de début d'exercice"
                    type="date"
                    value={formData.client.date_debutexercice}
                    onChange={handleChange}
                    className="sm:col-span-3"
                  />

                  <FormField
                    id="client.date_finexercice"
                    name="client.date_finexercice"
                    label="Date de fin d'exercice"
                    type="date"
                    value={formData.client.date_finexercice}
                    onChange={handleChange}
                    className="sm:col-span-3"
                  />
                  
                  <FormField
                    id="client.Nom_expertdossier"
                    name="client.Nom_expertdossier"
                    label="Nom de l'expert en charge du dossier"
                    value={formData.client.Nom_expertdossier}
                    onChange={handleChange}
                    placeholder="Ex: Marie Durand"
                    className="sm:col-span-6"
                  />
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextSection}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white"
                  >
                    Suivant
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Section 2: Informations lettre de mission */}
            <div 
              ref={formSections.mission}
              id="mission-section"
              className={`bg-white dark:bg-gray-800 shadow-lg rounded-lg border-2 ${
                activeSection === 'mission' 
                  ? 'border-black dark:border-white' 
                  : 'border-gray-200 dark:border-gray-700'
              } overflow-hidden transition-colors duration-300`}
            >
              <div className="px-6 py-8 sm:p-8">
                <div className="flex items-center border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black mr-3">
                    2
                  </span>
                  <h3 className="text-xl font-medium leading-6 text-gray-900 dark:text-white">
                    Informations lettre de mission
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
                  <SelectField
                    id="mission.missionType"
                    name="mission.missionType"
                    label="Type de mission"
                    value={formData.mission.missionType}
                    onChange={handleChange}
                    options={missionTypeOptions}
                    className="sm:col-span-3"
                  />
                  
                  <FormField
                    id="mission.dateDebutMission"
                    name="mission.dateDebutMission"
                    label="Date de début de mission"
                    type="date"
                    value={formData.mission.dateDebutMission}
                    onChange={handleChange}
                    className="sm:col-span-3"
                  />
                  
                  <SelectField
                    id="mission.honoraryType"
                    name="mission.honoraryType"
                    label="Type d'honoraires"
                    value={formData.mission.honoraryType}
                    onChange={handleChange}
                    options={honoraryTypeOptions}
                    className="sm:col-span-3"
                  />
                  
                  <FormField
                    id="mission.montant"
                    name="mission.montant"
                    label={`Montant ${formData.mission.honoraryType === 'forfait' ? 'forfaitaire' : 'horaire'} (€)`}
                    type="number"
                    value={formData.mission.montant}
                    onChange={handleChange}
                    placeholder={formData.mission.honoraryType === 'forfait' ? '1000' : '75'}
                    className="sm:col-span-3"
                  />
                  
                  <FormField
                    id="mission.duree"
                    name="mission.duree"
                    label="Durée (mois)"
                    type="number"
                    value={formData.mission.duree}
                    onChange={handleChange}
                    placeholder="12"
                    className="sm:col-span-3"
                  />
                  
                  <div className="sm:col-span-3"></div> {/* Espacement */}
                
                  <CheckboxField
                    id="mission.includeTerms"
                    name="mission.includeTerms"
                    label="Inclure les conditions générales"
                    checked={formData.mission.includeTerms}
                    onChange={handleChange}
                    className="sm:col-span-3"
                  />
                  
                  <CheckboxField
                    id="mission.includeLogo"
                    name="mission.includeLogo"
                    label="Inclure le logo du cabinet"
                    checked={formData.mission.includeLogo}
                    onChange={handleChange}
                    className="sm:col-span-3"
                  />
                </div>
                
                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevSection}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                    Précédent
                  </button>
                  <button
                    type="button"
                    onClick={handleNextSection}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white"
                  >
                    Suivant
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Section 3: Informations CGV */}
            <div 
              ref={formSections.cgv}
              id="cgv-section"
              className={`bg-white dark:bg-gray-800 shadow-lg rounded-lg border-2 ${
                activeSection === 'cgv' 
                  ? 'border-black dark:border-white' 
                  : 'border-gray-200 dark:border-gray-700'
              } overflow-hidden transition-colors duration-300`}
            >
              <div className="px-6 py-8 sm:p-8">
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
                  <div className="flex items-center">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black mr-3">
                      3
                    </span>
                    <h3 className="text-xl font-medium leading-6 text-gray-900 dark:text-white">
                      Informations CGV
                    </h3>
                  </div>
                  
                  {dataPreloaded.cgv && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Données préchargées
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
                  <FormField
                    id="cgv.delais_resiliation"
                    name="cgv.delais_resiliation"
                    label="Délai de résiliation (mois)"
                    type="number"
                    value={formData.cgv.delais_resiliation}
                    onChange={handleChange}
                    className="sm:col-span-3"
                  />
                  
                  <FormField
                    id="cgv.delais_interruption"
                    name="cgv.delais_interruption"
                    label="Délai d'interruption (mois)"
                    type="number"
                    value={formData.cgv.delais_interruption}
                    onChange={handleChange}
                    className="sm:col-span-3"
                  />
                  
                  <FormField
                    id="cgv.Acompte_pourcentage"
                    name="cgv.Acompte_pourcentage"
                    label="Pourcentage d'acompte (%)"
                    type="number"
                    value={formData.cgv.Acompte_pourcentage}
                    onChange={handleChange}
                    className="sm:col-span-3"
                  />
                  
                  <FormField
                    id="cgv.Pourcentage_indemnite"
                    name="cgv.Pourcentage_indemnite"
                    label="Pourcentage d'indemnité (%)"
                    type="number"
                    value={formData.cgv.Pourcentage_indemnite}
                    onChange={handleChange}
                    className="sm:col-span-3"
                  />
                  
                  <FormField
                    id="cgv.Mode_reglement"
                    name="cgv.Mode_reglement"
                    label="Mode de règlement"
                    value={formData.cgv.Mode_reglement}
                    onChange={handleChange}
                    placeholder="Ex: Virement bancaire"
                    className="sm:col-span-3"
                  />
                  
                  <FormField
                    id="cgv.Duree_contestationfacture"
                    name="cgv.Duree_contestationfacture"
                    label="Durée de contestation de facture (jours)"
                    type="number"
                    value={formData.cgv.Duree_contestationfacture}
                    onChange={handleChange}
                    className="sm:col-span-3"
                  />
                  
                  <FormField
                    id="cgv.Ville_tribunal"
                    name="cgv.Ville_tribunal"
                    label="Ville du tribunal compétent"
                    value={formData.cgv.Ville_tribunal}
                    onChange={handleChange}
                    placeholder="Ex: Paris"
                    className="sm:col-span-6"
                  />
                </div>
                
                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevSection}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                    Précédent
                  </button>
                  <button
                    type="button"
                    onClick={handleNextSection}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white"
                  >
                    Suivant
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Section 4: Informations cabinet */}
            <div 
              ref={formSections.cabinet}
              id="cabinet-section"
              className={`bg-white dark:bg-gray-800 shadow-lg rounded-lg border-2 ${
                activeSection === 'cabinet' 
                  ? 'border-black dark:border-white' 
                  : 'border-gray-200 dark:border-gray-700'
              } overflow-hidden transition-colors duration-300`}
            >
              <div className="px-6 py-8 sm:p-8">
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
                  <div className="flex items-center">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black mr-3">
                      4
                    </span>
                    <h3 className="text-xl font-medium leading-6 text-gray-900 dark:text-white">
                      Informations cabinet
                    </h3>
                  </div>
                  
                  {dataPreloaded.cabinet && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Données préchargées
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
                  <FormField
                    id="cabinet.Denom_socialexpert"
                    name="cabinet.Denom_socialexpert"
                    label="Dénomination sociale du cabinet"
                    value={formData.cabinet.Denom_socialexpert}
                    onChange={handleChange}
                    className="sm:col-span-3"
                  />
                  
                  <FormField
                    id="cabinet.Adresse_expert"
                    name="cabinet.Adresse_expert"
                    label="Adresse du cabinet"
                    value={formData.cabinet.Adresse_expert}
                    onChange={handleChange}
                    className="sm:col-span-3"
                  />
                  
                  <FormField
                    id="cabinet.Tel_expert"
                    name="cabinet.Tel_expert"
                    label="Téléphone"
                    value={formData.cabinet.Tel_expert}
                    onChange={handleChange}
                    className="sm:col-span-3"
                  />
                  
                  <FormField
                    id="cabinet.Mail_expert"
                    name="cabinet.Mail_expert"
                    label="Email"
                    type="email"
                    value={formData.cabinet.Mail_expert}
                    onChange={handleChange}
                    className="sm:col-span-3"
                  />
                  
                  <FormField
                    id="cabinet.Site_expert"
                    name="cabinet.Site_expert"
                    label="Site web"
                    value={formData.cabinet.Site_expert}
                    onChange={handleChange}
                    className="sm:col-span-3"
                  />
                  
                  <FormField
                    id="cabinet.Region_expert"
                    name="cabinet.Region_expert"
                    label="Région"
                    value={formData.cabinet.Region_expert}
                    onChange={handleChange}
                    className="sm:col-span-3"
                  />
                  
                  <FormField
                    id="cabinet.Siret_expert"
                    name="cabinet.Siret_expert"
                    label="SIRET"
                    value={formData.cabinet.Siret_expert}
                    onChange={handleChange}
                    className="sm:col-span-3"
                  />
                  
                  <FormField
                    id="cabinet.Intracom_expert"
                    name="cabinet.Intracom_expert"
                    label="N° TVA Intracommunautaire"
                    value={formData.cabinet.Intracom_expert}
                    onChange={handleChange}
                    className="sm:col-span-3"
                  />
                </div>
                
                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevSection}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                    Précédent
                  </button>
                  <button
                    type="submit"
                    disabled={generating}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {generating ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white dark:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Génération en cours...
                      </>
                    ) : 'Générer la lettre'}
                  </button>
                </div>
              </div>
            </div>
          </form>
          
          {/* Prévisualisation */}
          <div className="mt-12">
            <h3 className="text-xl font-medium leading-6 text-gray-900 dark:text-white mb-6">Prévisualisation</h3>
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden p-8 flex justify-center">
              <div className="w-full max-w-2xl min-h-[350px] bg-gray-100 dark:bg-gray-700 rounded-lg flex flex-col items-center justify-center p-10">
                {formData.client.denom_social ? (
                  <div className="text-center">
                    <div className="inline-block p-4 bg-black dark:bg-white text-white dark:text-black rounded-full mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-medium text-gray-900 dark:text-white">
                      Lettre de mission - {formData.client.denom_social}
                    </h4>
                    <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
                      {formData.mission.missionType === 'complete' && 'Mission complète comprenant la tenue comptable, l\'établissement des comptes annuels et des déclarations fiscales.'}
                      {formData.mission.missionType === 'partielle' && 'Mission partielle comprenant l\'établissement des comptes annuels à partir d\'une balance fournie par le client.'}
                      {formData.mission.missionType === 'conseil' && 'Mission de conseil en matière comptable, fiscale et sociale.'}
                    </p>
                    <p className="mt-6 text-base text-gray-600 dark:text-gray-400">
                      Type d'honoraires : <span className="font-medium">{formData.mission.honoraryType === 'forfait' ? 'Forfaitaire' : formData.mission.honoraryType === 'taux' ? 'Au taux horaire' : 'Mixte'}</span>
                      {formData.mission.montant && <span> - {formData.mission.honoraryType === 'forfait' ? `${formData.mission.montant}€ annuel` : `${formData.mission.montant}€ / heure`}</span>}
                    </p>
                    
                  </div>
                ) : (
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-base">Remplissez le formulaire pour afficher la prévisualisation</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
  
  // Calculer le pourcentage de progression
  function getProgressPercentage() {
    // Déterminer l'index de la section active
    const sectionIndex = sections.findIndex(section => section.id === activeSection);
    
    // Calculer le pourcentage
    return Math.round(((sectionIndex + 1) / sections.length) * 100);
  }
  
  // Rendu principal
  return (
    <div className="py-8">
      <header className="mb-10">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Générer une lettre de mission</h1>
        <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
          Créez une lettre de mission personnalisée pour vos clients
        </p>
      </header>
      
      <AnimatePresence mode="wait">
        {step === 'initial' ? renderInitialChoice() : renderForm()}
      </AnimatePresence>
    </div>
  );
};

export default GenerateLDM;