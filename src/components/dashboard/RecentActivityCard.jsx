import React from 'react';

const RecentActivityCard = ({ title, activities }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">{title}</h3>
      </div>
      
      <div className="px-5 py-3">
        {activities.length === 0 ? (
          <div className="py-4 text-center text-gray-500 dark:text-gray-400">
            Aucune activité récente
          </div>
        ) : (
          <div className="flow-root">
            <ul className="-mb-8">
              {activities.map((activity, activityIdx) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {activityIdx !== activities.length - 1 ? (
                      <span
                        className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex items-start space-x-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center ring-8 ring-white dark:ring-gray-800">
                          {activity.icon}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {activity.action}
                            </span>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                            {activity.client && <span className="font-medium">{activity.client}</span>}
                            {activity.client && ' - '}
                            {activity.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-900 px-5 py-3">
        <div className="text-sm">
          <a href="#" className="font-medium text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
            Voir toutes les activités
            <span className="ml-1">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecentActivityCard;