// src/styles/FormStyles.js
export const formStyles = {
  input: "appearance-none block w-full px-4 py-3.5 border-2 border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white transition-colors duration-200 dark:bg-gray-800 dark:text-white text-base",
  select: "appearance-none block w-full px-4 py-3.5 border-2 border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white transition-colors duration-200 dark:bg-gray-800 dark:text-white text-base",
  textarea: "appearance-none block w-full px-4 py-3.5 border-2 border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white transition-colors duration-200 dark:bg-gray-800 dark:text-white text-base min-h-32",
  label: "block text-base font-medium text-gray-700 dark:text-gray-300 mb-2",
  button: {
    primary: "w-full flex justify-center py-3.5 px-6 border-2 border-transparent rounded-md shadow-sm text-base font-medium text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
    secondary: "w-full flex justify-center py-3.5 px-6 border-2 border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-base font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white transition-colors duration-200"
  },
  formGroup: "mb-8",
  formSection: "mb-12",
  sectionTitle: "text-xl font-medium text-gray-900 dark:text-white mb-6",
  formContainer: "bg-white dark:bg-gray-800 shadow-lg rounded-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden p-8",
  errorText: "mt-2 text-sm text-red-600 dark:text-red-400",
  helperText: "mt-2 text-sm text-gray-500 dark:text-gray-400",
  checkbox: {
    container: "flex items-center mb-5",
    input: "h-6 w-6 text-black dark:text-white focus:ring-black dark:focus:ring-white border-2 border-gray-300 dark:border-gray-700 rounded",
    label: "ml-3 block text-base text-gray-700 dark:text-gray-300"
  },
  radio: {
    container: "flex items-center mb-5",
    input: "h-6 w-6 text-black dark:text-white focus:ring-black dark:focus:ring-white border-2 border-gray-300 dark:border-gray-700",
    label: "ml-3 block text-base text-gray-700 dark:text-gray-300"
  }
};