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
    <div className={`bg-white rounded-lg shadow-sm overflow-hidden border ${highlight ? 'border-black' : 'border-gray-200'}`}>
      <div className="px-5 py-4">
        <div className="flex items-center">
          <div className={`flex-shrink-0 rounded-md p-2 ${highlight ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'}`}>
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {value}
                </div>
                
                {label && (
                  <div className="ml-2 text-sm text-gray-500">
                    {label}
                  </div>
                )}
                
                {trend && (
                  <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                    trend.startsWith('+') ? 'text-green-600' : trend === '0' ? 'text-gray-500' : 'text-red-600'
                  }`}>
                    <svg className="self-center flex-shrink-0 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="sr-only">
                      {trend.startsWith('+') ? 'Augmenté de' : trend === '0' ? 'Inchangé' : 'Diminué de'}
                    </span>
                    {trend}
                    {trendLabel && <span className="text-gray-500 ml-1">{trendLabel}</span>}
                  </div>
                )}
              </dd>
            </dl>
          </div>
        </div>
      </div>
      
      {progress && (
        <div className="px-5 py-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-black h-2 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}
      
      {linkTo && (
        <div className={`bg-gray-50 px-5 py-3 ${isPremium ? 'border-t border-yellow-400' : ''}`}>
          <div className="text-sm">
            <Link to={linkTo} className={`font-medium ${isPremium ? 'text-yellow-600 hover:text-yellow-700' : 'text-black hover:text-gray-700'}`}>
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