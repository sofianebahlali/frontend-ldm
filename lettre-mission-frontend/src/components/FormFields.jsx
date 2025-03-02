import React from 'react';

// Composant pour les champs de texte
export const FormField = ({ 
  id, 
  name, 
  label, 
  value, 
  onChange, 
  type = 'text', 
  placeholder = '', 
  required = false,
  error = null,
  className = ''
}) => {
  return (
    <div className={`${className}`}>
      <label htmlFor={id || name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-1 relative">
        <input
          type={type}
          id={id || name}
          name={name}
          value={value || ''}
          onChange={onChange}
          placeholder={placeholder}
          className="shadow-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md py-2.5 px-3 transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
          required={required}
        />
        {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
      </div>
    </div>
  );
};

// Composant pour les listes déroulantes
export const SelectField = ({
  id,
  name,
  label,
  value,
  onChange,
  options,
  required = false,
  error = null,
  className = '',
  emptyOption = 'Sélectionner'
}) => {
  return (
    <div className={`${className}`}>
      <label htmlFor={id || name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-1 relative">
        <select
          id={id || name}
          name={name}
          value={value || ''}
          onChange={onChange}
          className="shadow-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md py-2.5 px-3 transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500 appearance-none bg-none"
          required={required}
        >
          <option value="">{emptyOption}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
      </div>
    </div>
  );
};

// Composant pour les cases à cocher
export const CheckboxField = ({
  id,
  name,
  label,
  checked,
  onChange,
  required = false,
  error = null,
  className = ''
}) => {
  return (
    <div className={`${className} flex items-center`}>
      <input
        id={id || name}
        name={name}
        type="checkbox"
        checked={checked || false}
        onChange={onChange}
        className="h-5 w-5 text-black dark:text-white focus:ring-black dark:focus:ring-white border-gray-300 dark:border-gray-600 rounded transition-all duration-200"
        required={required}
      />
      <label htmlFor={id || name} className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
};

// Composant pour les zones de texte
export const TextareaField = ({
  id,
  name,
  label,
  value,
  onChange,
  rows = 3,
  required = false,
  error = null,
  placeholder = '',
  className = ''
}) => {
  return (
    <div className={`${className}`}>
      <label htmlFor={id || name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-1">
        <textarea
          id={id || name}
          name={name}
          rows={rows}
          value={value || ''}
          onChange={onChange}
          placeholder={placeholder}
          className="shadow-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-3 transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
          required={required}
        />
        {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
      </div>
    </div>
  );
};

export default {
  FormField,
  SelectField,
  CheckboxField,
  TextareaField
};