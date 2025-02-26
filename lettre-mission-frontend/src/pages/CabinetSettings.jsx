import { useState, useEffect } from 'react';

const CabinetSettings = () => {
  
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Paramètres du cabinet</h1>
        <p className="mt-1 text-sm text-gray-600">
          Configurez les informations de votre cabinet qui apparaîtront sur vos documents
        </p>
      </header>
      
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <form className="space-y-6">
            {/* Informations du cabinet */}
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Informations générales</h3>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="Denom_socialexpert" className="block text-sm font-medium text-gray-700">
                    Dénomination sociale *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="Denom_socialexpert"
                      id="Denom_socialexpert"
                      className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="Siret_expert" className="block text-sm font-medium text-gray-700">
                    Numéro SIRET
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="Siret_expert"
                      id="Siret_expert"
                      className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                <div className="sm:col-span-6">
                  <label htmlFor="Adresse_expert" className="block text-sm font-medium text-gray-700">
                    Adresse complète
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="Adresse_expert"
                      name="Adresse_expert"
                      rows={3}
                      className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Coordonnées */}
            <div className="pt-8">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Coordonnées</h3>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="Tel_expert" className="block text-sm font-medium text-gray-700">
                    Téléphone
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="Tel_expert"
                      id="Tel_expert"
                      className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="Mail_expert" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="Mail_expert"
                      id="Mail_expert"
                      className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CabinetSettings;