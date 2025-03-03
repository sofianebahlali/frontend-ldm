import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.debug.jsx'
import './index.css'

// Ajout de logs de débogage
console.log("Initialisation de l'application...");

try {
  const rootElement = document.getElementById('root');
  console.log("Élément racine trouvé:", rootElement);
  
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    console.log("Root créé avec succès");
    
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Rendu terminé");
  } else {
    console.error("Élément racine 'root' non trouvé dans le DOM");
  }
} catch (error) {
  console.error("Erreur lors du rendu:", error);
}