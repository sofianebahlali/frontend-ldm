import { useState } from 'react';

const CorsTester = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const backendUrl = 'https://ubiquitous-eureka-56qrr49jx7c4xw6-5000.app.github.dev';
  
  const testConnection = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      // Test simple sans credentials
      const response = await fetch(`${backendUrl}/open-test`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Une erreur s\'est produite');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4">Testeur de Connexion CORS</h1>
      
      <button 
        onClick={testConnection}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Test en cours...' : 'Tester la connexion'}
      </button>
      
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          <p className="font-bold">Erreur:</p>
          <p>{error}</p>
        </div>
      )}
      
      {result && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
          <p className="font-bold">Résultat:</p>
          <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
      
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Informations:</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>URL Backend: {backendUrl}</li>
          <li>URL Frontend: {window.location.origin}</li>
        </ul>
      </div>
    </div>
  );
};

export default CorsTester;