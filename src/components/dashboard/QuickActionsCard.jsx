import React from 'react';
import { Link } from 'react-router-dom';

const QuickAction = ({ icon, title, description, link, color = 'black' }) => (
  <Link to={link} className="flex p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-150">
    <div className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-${color}-100 text-${color}-600`}>
      {icon}
    </div>
    <div className="ml-4">
      <h4 className="text-base font-medium text-gray-900">{title}</h4>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  </Link>
);

const QuickActionsCard = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
  const actions = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      title: 'Nouveau client',
      description: 'Ajouter un nouveau client',
      link: '/clients/add',
      color: 'black'
    },
    user?.isPremium ? {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: 'Créer une lettre',
      description: 'Générer une lettre de mission',
      link: '/generate-ldm',
      color: 'green'
    } : {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Passer Premium',
      description: 'Accéder à toutes les fonctionnalités',
      link: '/settings/payment',
      color: 'yellow'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Paramètres',
      description: 'Configurer votre cabinet',
      link: '/settings/cabinet',
      color: 'blue'
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Actions rapides</h3>
      </div>
      
      <div className="divide-y divide-gray-200">
        {actions.map((action, index) => (
          <div key={index} className="p-4">
            <QuickAction {...action} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsCard;