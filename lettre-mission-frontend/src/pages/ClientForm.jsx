import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ClientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          {isEditMode ? 'Modifier le client' : 'Ajouter un client'}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {isEditMode 
            ? 'Modifiez les informations du client' 
            : 'Ajoutez un nouveau client à votre portefeuille'}
        </p>
      </header>
      
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <form className="space-y-6">
            {/* Informations de base */}
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Informations générales</h3>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="denom_social" className="block text-sm font-medium text-gray-700">
                    Dénomination sociale *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="denom_social"
                      id="denom_social"
                      className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="Forme_client" className="block text-sm font-medium text-gray-700">
                    Forme juridique
                  </label>
                  <div className="mt-1">
                    <select
                      id="Forme_client"
                      name="Forme_client"
                      className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="">Sélectionner</option>
                      <option value="SARL">SARL</option>
                      <option value="SAS">SAS</option>
                      <option value="EURL">EURL</option>
                      <option value="SA">SA</option>
                      <option value="SCI">SCI</option>
                      <option value="EI">EI</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate('/clients')}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  {isEditMode ? 'Enregistrer les modifications' : 'Créer le client'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClientForm;