import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GenerateLDM = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Générer une lettre de mission</h1>
        <p className="mt-1 text-sm text-gray-600">
          Créez une lettre de mission personnalisée pour vos clients
        </p>
      </header>
      
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <form className="space-y-6">
            {/* Sélection du client */}
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Informations de la lettre</h3>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="client" className="block text-sm font-medium text-gray-700">
                    Client *
                  </label>
                  <div className="mt-1">
                    <select
                      id="client"
                      name="client"
                      className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="">Sélectionner un client</option>
                    </select>
                  </div>
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Type de mission
                  </label>
                  <div className="mt-1">
                    <select
                      id="type"
                      name="type"
                      className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="complete">Mission complète</option>
                      <option value="partielle">Mission partielle</option>
                      <option value="conseil">Conseil</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Générer la lettre
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GenerateLDM;