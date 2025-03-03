// themeService.js - Service pour gérer le thème à travers l'application

// Clé utilisée pour stocker la préférence de thème dans localStorage
const THEME_STORAGE_KEY = 'ldm-theme-preference';

// Fonction pour initier le thème au chargement de l'application
const initTheme = () => {
  let darkMode;
  
  // Vérifier si une préférence est déjà stockée
  const storedPreference = localStorage.getItem(THEME_STORAGE_KEY);
  
  if (storedPreference !== null) {
    // Utiliser la préférence stockée
    darkMode = storedPreference === 'dark';
  } else {
    // Sinon, utiliser la préférence du système
    darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Stocker cette préférence initiale
    localStorage.setItem(THEME_STORAGE_KEY, darkMode ? 'dark' : 'light');
  }
  
  // Appliquer le thème au document
  applyTheme(darkMode);
  
  return darkMode;
};

// Fonction pour changer le thème
const toggleTheme = () => {
  // Récupérer l'état actuel
  const currentTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  // Stocker la nouvelle préférence
  localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  
  // Appliquer le nouveau thème
  applyTheme(newTheme === 'dark');
  
  return newTheme === 'dark';
};

// Fonction pour obtenir le thème actuel
const getCurrentTheme = () => {
  const storedPreference = localStorage.getItem(THEME_STORAGE_KEY);
  return storedPreference === 'dark';
};

// Fonction pour appliquer le thème à la page
const applyTheme = (isDark) => {
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

export const themeService = {
  initTheme,
  toggleTheme,
  getCurrentTheme,
  applyTheme
};

export default themeService;