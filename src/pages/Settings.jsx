import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Import des composants de réglages
import CabinetSettings from './CabinetSettings';
import SubscriptionPage from './SubscriptionPage';
import CGVSettings from './CGVSettings';
import UserSettings from './UserSettings';

const Settings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Déterminer l'onglet actif en fonction de l'URL
  const getActiveTabFromPath = () => {
    const path = location.pathname;
    if (path.includes('/settings/cabinet')) return 'cabinet';
    if (path.includes('/settings/cgv')) return 'cgv';
    if (path.includes('/settings/payment')) return 'payment';
    if (path.includes('/settings/user')) return 'user';
    return 'user'; // Par défaut
  };
  
  const [activeTab, setActiveTab] = useState(getActiveTabFromPath());
  
  // Mettre à jour l'onglet actif lorsque l'URL change
  useEffect(() => {
    setActiveTab(getActiveTabFromPath());
  }, [location.pathname]);
  
  // Changer d'onglet
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/settings/${tab}`);
  };
  
  const tabs = [
    { id: 'user', label: 'Utilisateur', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )},
    { id: 'cabinet', label: 'Cabinet', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )},
    { id: 'cgv', label: 'CGV', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )},
    { id: 'payment', label: 'Abonnement', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    )}
  ];
  
  // Rendre le composant approprié en fonction de l'onglet actif
  const renderContent = () => {
    switch (activeTab) {
      case 'cabinet':
        return <CabinetSettings />;
      case 'cgv':
        return <CGVSettings />;
      case 'payment':
        return <SubscriptionPage />;
      case 'user':
      default:
        return <UserSettings />;
    }
  };
  
  return (
    <div className="py-6">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Paramètres</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Gérez vos préférences et informations
        </p>
      </header>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Navigation des onglets */}
        <div className="w-full md:w-64 flex-shrink-0">
          <nav className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Navigation</h3>
            </div>
            <div className="px-4 py-2">
              <ul className="space-y-1">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => handleTabChange(tab.id)}
                      className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-md transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'bg-black dark:bg-white text-white dark:text-black'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                      {tab.id === 'payment' && user?.isPremium && (
                        <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Premium
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
        
        {/* Contenu des onglets */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden p-6"
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;