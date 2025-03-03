import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatbotAdmin = () => {
  const [stats, setStats] = useState(null);
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState({ feedback: '', is_resolved: '' });
  
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  
  // Charger les statistiques et les interactions
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Charger les statistiques
        const statsResponse = await fetch(`${API_URL}/admin/chat-stats`, {
          credentials: 'include'
        });
        
        // Vérifier si l'utilisateur est autorisé
        if (statsResponse.status === 403) {
          setError('Vous n\'êtes pas autorisé à accéder à cette page.');
          return;
        }
        
        if (!statsResponse.ok) {
          throw new Error('Erreur lors du chargement des statistiques');
        }
        
        const statsData = await statsResponse.json();
        setStats(statsData);
        
        // Charger les interactions
        await fetchInteractions();
      } catch (err) {
        console.error('Erreur:', err);
        setError('Une erreur est survenue lors du chargement des données.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [API_URL]);
  
  // Fonction pour charger les interactions avec filtres et pagination
  const fetchInteractions = async () => {
    try {
      // Construire l'URL avec les filtres
      let url = `${API_URL}/admin/chat-interactions?page=${page}&per_page=10`;
      
      if (filter.feedback) {
        url += `&feedback=${filter.feedback}`;
      }
      
      if (filter.is_resolved) {
        url += `&is_resolved=${filter.is_resolved}`;
      }
      
      const response = await fetch(url, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des interactions');
      }
      
      const data = await response.json();
      setInteractions(data.interactions);
      setTotalPages(data.pages);
    } catch (err) {
      console.error('Erreur:', err);
      setError('Une erreur est survenue lors du chargement des interactions.');
    }
  };
  
  // Gérer le changement de page
  useEffect(() => {
    fetchInteractions();
  }, [page, filter]);
  
  // Appliquer les filtres
  const applyFilter = (e) => {
    e.preventDefault();
    setPage(1); // Revenir à la première page
    fetchInteractions();
  };
  
  // Fonction pour mettre à jour une interaction
  const updateInteraction = async (id, data) => {
    try {
      const response = await fetch(`${API_URL}/admin/chat-interactions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour');
      }
      
      // Actualiser les interactions
      fetchInteractions();
    } catch (err) {
      console.error('Erreur:', err);
      setError('Une erreur est survenue lors de la mise à jour.');
    }
  };
  
  // Formater la date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  if (loading) {
    return (
      <div className="py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Administration du chatbot</h1>
        <div className="flex justify-center my-10">
          <div className="w-12 h-12 border-4 border-black border-t-transparent dark:border-white dark:border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Administration du chatbot</h1>
        <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-md">
          <p className="text-red-800 dark:text-red-200">{error}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md"
          >
            Retour au tableau de bord
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Administration du chatbot</h1>
      
      {/* Statistiques */}
      {stats && (
        <div className="mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2">Total des interactions</h3>
            <p className="text-3xl font-bold">{stats.total_interactions}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2">Taux de satisfaction</h3>
            <p className="text-3xl font-bold">{stats.success_rate.toFixed(1)}%</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {stats.helpful_count} utiles / {stats.not_helpful_count} non utiles
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2">Questions résolues</h3>
            <p className="text-3xl font-bold">
              {stats.resolved_count} / {stats.total_interactions}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {((stats.resolved_count / stats.total_interactions) * 100).toFixed(1)}%
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2">Activité récente</h3>
            <p className="text-3xl font-bold">
              {stats.daily_stats.slice(-1)[0]?.count || 0}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              aujourd'hui
            </p>
          </div>
        </div>
      )}
      
      {/* Questions populaires */}
      {stats && stats.top_queries && stats.top_queries.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Questions les plus fréquentes</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Question
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Occurrences
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {stats.top_queries.map((query, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {query.query.length > 100 ? query.query.substring(0, 100) + '...' : query.query}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {query.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Filtres */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Historique des interactions</h2>
        <form onSubmit={applyFilter} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="feedback-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Feedback
              </label>
              <select
                id="feedback-filter"
                value={filter.feedback}
                onChange={(e) => setFilter({ ...filter, feedback: e.target.value })}
                className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-black focus:ring-black dark:bg-gray-700 dark:text-white sm:text-sm"
              >
                <option value="">Tous</option>
                <option value="helpful">Utile</option>
                <option value="not_helpful">Non utile</option>
                <option value="none">Sans feedback</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="resolved-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Statut
              </label>
              <select
                id="resolved-filter"
                value={filter.is_resolved}
                onChange={(e) => setFilter({ ...filter, is_resolved: e.target.value })}
                className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-black focus:ring-black dark:bg-gray-700 dark:text-white sm:text-sm"
              >
                <option value="">Tous</option>
                <option value="true">Résolu</option>
                <option value="false">Non résolu</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                type="submit"
                className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200"
              >
                Filtrer
              </button>
            </div>
          </div>
        </form>
      </div>
      
      {/* Liste des interactions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {interactions.length === 0 ? (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            Aucune interaction trouvée
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Utilisateur
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Question
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Réponse
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Feedback
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Statut
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {interactions.map((interaction) => (
                    <tr key={interaction.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(interaction.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {interaction.username || 'Inconnu'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        <div className="max-w-xs overflow-hidden text-ellipsis">
                          {interaction.query}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        <div className="max-w-xs overflow-hidden text-ellipsis">
                          {interaction.response}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {interaction.feedback === 'helpful' ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100">
                            Utile
                          </span>
                        ) : interaction.feedback === 'not_helpful' ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100">
                            Non utile
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
                            Sans feedback
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <select
                          value={interaction.is_resolved ? 'true' : 'false'}
                          onChange={(e) => updateInteraction(interaction.id, { is_resolved: e.target.value === 'true' })}
                          className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-black focus:ring-black dark:bg-gray-700 dark:text-white sm:text-sm"
                        >
                          <option value="true">Résolu</option>
                          <option value="false">Non résolu</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <button
                          onClick={() => {
                            // Afficher les détails dans une modal ou une nouvelle page
                            alert(`Question: ${interaction.query}\n\nRéponse: ${interaction.response}`);
                          }}
                          className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                        >
                          Détails
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                >
                  Précédent
                </button>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                >
                  Suivant
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Affichage de <span className="font-medium">{interactions.length}</span> résultats - Page <span className="font-medium">{page}</span> sur <span className="font-medium">{totalPages}</span>
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                    >
                      <span className="sr-only">Précédent</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {/* Pages */}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={i}
                          onClick={() => setPage(pageNum)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            page === pageNum
                              ? 'z-10 bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                              : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                    >
                      <span className="sr-only">Suivant</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatbotAdmin;