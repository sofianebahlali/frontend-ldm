import { useState, useEffect } from 'react';

const CorsTester = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState('/test');
  const [customRoute, setCustomRoute] = useState('');
  const [method, setMethod] = useState('GET');
  const [bodyData, setBodyData] = useState('');
  const [withCredentials, setWithCredentials] = useState(true);
  const [backendInfo, setBackendInfo] = useState({
    url: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
  });
  
  // Routes prédéfinies pour tester différentes fonctionnalités
  const testRoutes = [
    { path: '/test', label: 'Test de base', method: 'GET' },
    { path: '/user-status', label: 'Statut utilisateur', method: 'GET' },
    { path: '/clients', label: 'Liste des clients', method: 'GET' },
    { path: '/mon-cabinet', label: 'Infos cabinet', method: 'GET' },
    { path: '/mes-cgv', label: 'Infos CGV', method: 'GET' },
  ];

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    const route = customRoute || selectedRoute;
    const url = `${backendInfo.url}${route}`;
    
    try {
      console.log(`Testing connection to ${url} with method ${method}`, 
        withCredentials ? '(with credentials)' : '(without credentials)');
      
      const fetchOptions = {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: withCredentials ? 'include' : 'omit'
      };
      
      // Ajouter le body si nécessaire et si ce n'est pas une requête GET
      if (method !== 'GET' && bodyData.trim()) {
        try {
          fetchOptions.body = JSON.stringify(JSON.parse(bodyData));
        } catch (e) {
          // Si ce n'est pas un JSON valide, utiliser le texte brut
          fetchOptions.body = bodyData;
        }
      }
      
      const response = await fetch(url, fetchOptions);
      
      const responseText = await response.text();
      let data;
      
      try {
        // Essayer de parser comme JSON
        data = JSON.parse(responseText);
      } catch (e) {
        // Si ce n'est pas un JSON valide, utiliser le texte brut
        data = { textResponse: responseText };
      }
      
      setResult({
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries([...response.headers.entries()]),
        data
      });
    } catch (err) {
      console.error('Erreur de connexion:', err);
      setError({
        message: err.message || 'Une erreur s\'est produite',
        stack: err.stack
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRouteChange = (e) => {
    const route = e.target.value;
    setSelectedRoute(route);
    const selectedRoute = testRoutes.find(r => r.path === route);
    if (selectedRoute) {
      setMethod(selectedRoute.method);
      setCustomRoute('');
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Testeur de Connexion API</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">URL de l'API Backend</label>
            <div className="text-sm font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded-md break-all">
              {backendInfo.url}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Route de test prédéfinie</label>
            <select
              value={selectedRoute}
              onChange={handleRouteChange}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {testRoutes.map((route) => (
                <option key={route.path} value={route.path}>
                  {route.label} ({route.path}) - {route.method}
                </option>
              ))}
              <option value="custom">Route personnalisée</option>
            </select>
          </div>
          
          {selectedRoute === 'custom' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Route personnalisée</label>
              <input
                type="text"
                value={customRoute}
                onChange={(e) => setCustomRoute(e.target.value)}
                placeholder="/mon-chemin"
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Méthode HTTP</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="PATCH">PATCH</option>
              <option value="OPTIONS">OPTIONS</option>
            </select>
          </div>
          
          {method !== 'GET' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Corps de la requête (JSON)</label>
              <textarea
                value={bodyData}
                onChange={(e) => setBodyData(e.target.value)}
                rows={5}
                placeholder='{"key": "value"}'
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono"
              />
            </div>
          )}
          
          <div className="flex items-center">
            <input
              id="withCredentials"
              name="withCredentials"
              type="checkbox"
              checked={withCredentials}
              onChange={(e) => setWithCredentials(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="withCredentials" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Inclure les credentials (cookies)
            </label>
          </div>
        </div>
        
        <div className="space-y-4">
          <button 
            onClick={testConnection}
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Test en cours...
              </>
            ) : 'Tester la connexion'}
          </button>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-md">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">URL complète</h3>
            <div className="text-sm font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded-md break-all">
              {backendInfo.url}{customRoute || selectedRoute}
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-md">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Configuration de l'application</h3>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-medium">Frontend URL:</span> {window.location.origin}
              </div>
              <div className="text-sm">
                <span className="font-medium">API URL:</span> {backendInfo.url}
              </div>
              <div className="text-sm">
                <span className="font-medium">Mode:</span> {import.meta.env.MODE}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded">
          <p className="font-bold">Erreur:</p>
          <p>{error.message}</p>
          <details className="mt-2">
            <summary className="cursor-pointer text-sm">Détails techniques</summary>
            <pre className="mt-2 whitespace-pre-wrap text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-auto max-h-48">{error.stack}</pre>
          </details>
        </div>
      )}
      
      {result && (
        <div className="mt-4 p-4 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded">
          <p className="font-bold">Résultat:</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
            <div>
              <h4 className="font-medium text-sm mb-1">Statut:</h4>
              <p className="text-sm bg-white dark:bg-gray-800 p-2 rounded">
                {result.status} {result.statusText}
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-sm mb-1">En-têtes:</h4>
              <pre className="text-xs bg-white dark:bg-gray-800 p-2 rounded overflow-auto max-h-40">
                {JSON.stringify(result.headers, null, 2)}
              </pre>
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="font-medium text-sm mb-1">Corps de la réponse:</h4>
            <pre className="text-xs bg-white dark:bg-gray-800 p-2 rounded overflow-auto max-h-96">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </div>
        </div>
      )}
      
      <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
        <h3 className="font-medium text-gray-700 dark:text-gray-300">Résolution des problèmes courants:</h3>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Erreur CORS: Vérifiez que votre backend autorise les requêtes depuis {window.location.origin}</li>
          <li>401 Unauthorized: Vous n'êtes peut-être pas connecté ou votre session a expiré</li>
          <li>404 Not Found: L'URL ou la route est incorrecte</li>
          <li>405 Method Not Allowed: La méthode HTTP n'est pas supportée pour cette route</li>
          <li>500 Server Error: Une erreur s'est produite côté serveur</li>
        </ul>
      </div>
    </div>
  );
};

export default CorsTester;