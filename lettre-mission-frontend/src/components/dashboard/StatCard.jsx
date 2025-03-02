import React from 'react';
import { Link } from 'react-router-dom';

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendLabel, 
  progress, 
  label, 
  linkTo, 
  linkLabel,
  highlight = false,
  isPremium = false
}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border transition-colors duration-300 ${highlight ? 'border-black dark:border-white' : 'border-gray-200 dark:border-gray-700'}`}>
      <div className="px-5 py-4">
        <div className="flex items-center">
          <div className={`flex-shrink-0 rounded-md p-2 transition-colors duration-300 ${highlight ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                {title}
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {value}
                </div>
                
                {label && (
                  <div className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    {label}
                  </div>
                )}
                
                {trend && (
                  <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                    trend.startsWith('+') ? 'text-green-600 dark:text-green-400' : trend === '0' ? 'text-gray-500 dark:text-gray-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    <svg className="self-center flex-shrink-0 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="sr-only">
                      {trend.startsWith('+') ? 'Augmenté de' : trend === '0' ? 'Inchangé' : 'Diminué de'}
                    </span>
                    {trend}
                    {trendLabel && <span className="text-gray-500 dark:text-gray-400 ml-1">{trendLabel}</span>}
                  </div>
                )}
              </dd>
            </dl>
          </div>
        </div>
      </div>
      
      {progress && (
        <div className="px-5 py-3">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-black dark:bg-white h-2 rounded-full transition-colors duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}
      
      {linkTo && (
        <div className={`bg-gray-50 dark:bg-gray-900 px-5 py-3 ${isPremium ? 'border-t border-yellow-400 dark:border-yellow-600' : 'border-t border-gray-200 dark:border-gray-700'}`}>
          <div className="text-sm">
            <Link to={linkTo} className={`font-medium transition-colors duration-200 ${isPremium ? 'text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300' : 'text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300'}`}>
              {linkLabel}
              <span className="ml-1">&rarr;</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatCard;