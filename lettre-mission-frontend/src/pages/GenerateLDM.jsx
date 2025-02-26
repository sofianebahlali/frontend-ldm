import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const GenerateLDM = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [selectedClient, setSelectedClient] = useState('');
  const [missionType, setMissionType] = useState('complete');
  const [honoraryType, setHonoraryType] = useState('forfait');
  const [amount, setAmount] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Charger la liste des clients (simulation)
  useEffect(() => {
    const timer = setTimeout(() => {
      setClients([
        { id: '1', name: 'Dupont SARL' },
        { id: '2', name: 'Martin & Co' },
        { id: '3', name: 'Société ABC' },
        { id: '4', name: 'Entreprise XYZ' },
      ]);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setGenerating(true);
    
    // Simuler la génération de la lettre
    setTimeout(() => {
      setGenerating(false);
      setSuccess(true);
      
      // Réinitialiser le message de succès après 3 secondes
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };
  
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Générer une lettre de mission</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Créez une lettre de mission personnalisée pour vos clients
          </p>
        </header>
        
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
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
                      Lettre de mission générée avec succès ! Téléchargement en cours...
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
            
            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Informations de la lettre */}
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Informations de la lettre</h3>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="client" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Client *
                    </label>
                    <div className="mt-1">
                      <select
                        id="client"
                        name="client"
                        value={selectedClient}
                        onChange={(e) => setSelectedClient(e.target.value)}
                        className="shadow-sm focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white block w-full sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-md"
                        required
                        disabled={loading}
                      >
                        <option value="">Sélectionner un client</option>
                        {clients.map(client => (
                          <option key={client.id} value={client.id}>{client.name}</option>
                        ))}
                      </select>
                      {loading && (
                        <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Chargement des clients...
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Type de mission
                    </label>
                    <div className="mt-1">
                      <select
                        id="type"
                        name="type"
                        value={missionType}
                        onChange={(e) => setMissionType(e.target.value)}
                        className="shadow-sm focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white block w-full sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-md"
                      >
                        <option value="complete">Mission complète</option>
                        <option value="partielle">Mission partielle</option>
                        <option value="conseil">Conseil</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Options de la mission */}
              <div className="pt-8">
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Options de la mission</h3>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="honoraryType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Type d'honoraires
                    </label>
                    <div className="mt-1">
                      <select
                        id="honoraryType"
                        name="honoraryType"
                        value={honoraryType}
                        onChange={(e) => setHonoraryType(e.target.value)}
                        className="shadow-sm focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white block w-full sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-md"
                      >
                        <option value="forfait">Forfait</option>
                        <option value="taux">Taux horaire</option>
                        <option value="mixte">Mixte</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Montant {honoraryType === 'forfait' ? 'forfaitaire' : 'horaire'} (€)
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        name="amount"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="shadow-sm focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white block w-full sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-md"
                        placeholder={honoraryType === 'forfait' ? '1000' : '75'}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Options supplémentaires */}
              <div className="pt-8">
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Options supplémentaires</h3>
                <div className="mt-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="includeTerms"
                        name="includeTerms"
                        type="checkbox"
                        className="focus:ring-black dark:focus:ring-white h-4 w-4 text-black dark:text-white border-gray-300 dark:border-gray-700 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="includeTerms" className="font-medium text-gray-700 dark:text-gray-300">Inclure les conditions générales</label>
                      <p className="text-gray-500 dark:text-gray-400">Les conditions générales seront ajoutées à la fin du document.</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="includeLogo"
                        name="includeLogo"
                        type="checkbox"
                        className="focus:ring-black dark:focus:ring-white h-4 w-4 text-black dark:text-white border-gray-300 dark:border-gray-700 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="includeLogo" className="font-medium text-gray-700 dark:text-gray-300">Inclure le logo du cabinet</label>
                      <p className="text-gray-500 dark:text-gray-400">Le logo de votre cabinet sera placé en en-tête du document.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-5 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={generating || !selectedClient}
                  className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white dark:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Génération en cours...
                    </>
                  ) : 'Générer la lettre'}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Prévisualisation (section ajoutée pour montrer les fonctionnalités premium) */}
        <div className="mt-8">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">Prévisualisation</h3>
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden p-6 flex justify-center">
            <div className="w-full max-w-2xl min-h-[300px] bg-gray-100 dark:bg-gray-700 rounded flex flex-col items-center justify-center p-8">
              {selectedClient ? (
                <div className="text-center">
                  <div className="inline-block p-3 bg-black dark:bg-white text-white dark:text-black rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                    Lettre de mission - {clients.find(c => c.id === selectedClient)?.name || ''}
                  </h4>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {missionType === 'complete' && 'Mission complète comprenant la tenue comptable, l\'établissement des comptes annuels et des déclarations fiscales.'}
                    {missionType === 'partielle' && 'Mission partielle comprenant l\'établissement des comptes annuels à partir d\'une balance fournie par le client.'}
                    {missionType === 'conseil' && 'Mission de conseil en matière comptable, fiscale et sociale.'}
                  </p>
                  <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    Type d'honoraires : <span className="font-medium">{honoraryType === 'forfait' ? 'Forfaitaire' : honoraryType === 'taux' ? 'Au taux horaire' : 'Mixte'}</span>
                    {amount && <span> - {honoraryType === 'forfait' ? `${amount}€ annuel` : `${amount}€ / heure`}</span>}
                  </p>
                </div>
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p>Sélectionnez un client pour afficher la prévisualisation</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GenerateLDM;