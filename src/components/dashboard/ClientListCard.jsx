import React from 'react';
import { Link } from 'react-router-dom';

const ClientListCard = ({ title, clients, loading, className }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300 ${className}`}>
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">{title}</h3>
        <Link to="/clients/add" className="text-sm font-medium text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 flex items-center transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Ajouter
        </Link>
      </div>
      
      <div className="overflow-hidden">
        {loading ? (
          <div className="py-8 text-center">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-gray-200 dark:border-gray-700 border-t-black dark:border-t-white rounded-full"></div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Chargement des clients...</p>
          </div>
        ) : clients.length === 0 ? (
          <div className="py-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Aucun client</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Commencez par ajouter votre premier client.
            </p>
            <div className="mt-6">
              <Link
                to="/clients/add"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none transition-colors duration-200"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Ajouter un client
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Client
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Forme
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Activité
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Voir</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                          {client.denom_social?.charAt(0) || '?'}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {client.denom_social || 'Non spécifié'}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {client.Siren_client || 'SIREN non spécifié'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{client.Forme_client || 'Non spécifiée'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white truncate max-w-xs">{client.Activite_client || 'Non spécifiée'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/clients/edit/${client.id}`} className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
                        Voir
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {clients.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-900 px-5 py-3">
          <div className="text-sm">
            <Link to="/clients" className="font-medium text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
              Voir tous les clients
              <span className="ml-1">&rarr;</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientListCard;