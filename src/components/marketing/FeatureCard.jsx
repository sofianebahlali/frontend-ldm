import React from 'react';

const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="p-6 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
      <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;