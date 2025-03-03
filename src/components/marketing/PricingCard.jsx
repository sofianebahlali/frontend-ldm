import React from 'react';
import { Link } from 'react-router-dom';

const PricingCard = ({ name, price, period, features, ctaText, ctaLink, highlighted }) => {
  return (
    <div className={`
      rounded-lg overflow-hidden h-full flex flex-col 
      ${highlighted 
        ? 'border-2 border-black shadow-xl scale-105 relative z-10' 
        : 'border border-gray-200 shadow-sm'
      }
    `}>
      {highlighted && (
        <div className="absolute top-0 inset-x-0 transform translate-y-px">
          <div className="flex justify-center transform -translate-y-1/2">
            <span className="inline-flex rounded-full bg-black px-4 py-1 text-xs font-semibold tracking-wider uppercase text-white">
              Le plus populaire
            </span>
          </div>
        </div>
      )}
      
      <div className={`px-6 py-8 bg-white sm:p-10 sm:pb-6 flex-1`}>
        <div className="text-center">
          <h3 className="text-xl leading-6 font-bold text-gray-900">
            {name}
          </h3>
          <div className="mt-4 flex items-baseline justify-center">
            <span className="text-5xl font-extrabold text-gray-900">{price}</span>
            {period && <span className="ml-1 text-xl font-semibold text-gray-500">{period}</span>}
          </div>
        </div>
        <ul className="mt-6 space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="ml-3 text-base text-gray-700">{feature}</p>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="px-6 pb-8 pt-6 bg-gray-50 sm:px-10">
        <Link
          to={ctaLink}
          className={`block w-full text-center rounded-md px-4 py-3 text-base font-medium ${
            highlighted
              ? 'bg-black hover:bg-gray-800 text-white'
              : 'bg-white hover:bg-gray-50 text-black border border-gray-300'
          } transition-colors duration-200`}
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
};

export default PricingCard;