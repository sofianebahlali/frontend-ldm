import React from 'react';

const ChartCard = ({ title, subtitle, data, className }) => {
  const { labels, datasets } = data;
  const maxValue = Math.max(...datasets[0].data) * 1.2; // 20% margin for better visualization
  
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300 ${className}`}>
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">{title}</h3>
        {subtitle && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
      </div>
      
      <div className="p-5">
        {/* Simple responsive bar chart implementation */}
        <div className="h-64 flex flex-col">
          <div className="flex-1 flex items-end">
            {labels.map((label, index) => {
              const value = datasets[0].data[index];
              const heightPercentage = (value / maxValue) * 100;
              
              return (
                <div 
                  key={index} 
                  className="flex-1 flex flex-col items-center justify-end"
                >
                  <div className="flex items-center justify-center w-full px-2">
                    <div 
                      className="w-full bg-black dark:bg-white rounded-t transition-colors duration-300"
                      style={{ height: `${heightPercentage}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">{label}</div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-black dark:bg-white rounded-sm transition-colors duration-300"></div>
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{datasets[0].label}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartCard;