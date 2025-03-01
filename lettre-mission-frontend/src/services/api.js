// Service API simplifié pour communiquer avec le backend Flask

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Fonction helper pour les requêtes
async function fetchWithAuth(url, options = {}) {
  console.log(`Fetching ${API_URL}${url} with options:`, options);
  
  try {
    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Important pour les cookies de session
    });

    console.log(`Response status for ${url}:`, response.status);

    if (!response.ok) {
      // Ne redirigez vers login que si nous ne sommes pas déjà sur la route de login
      if (response.status === 401 && !url.includes('/login')) {
        localStorage.removeItem('user');
        window.location.href = '/login';
        throw new Error('Session expirée, veuillez vous reconnecter');
      }

      // Tenter de récupérer le message d'erreur du backend
      try {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Une erreur est survenue');
      } catch (e) {
        if (e.message && !e.message.includes('Une erreur est survenue')) {
          throw e; // Rethrow l'erreur de parsing JSON si on a un message utile
        }
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
    }

    // Pour les réponses sans contenu
    if (response.status === 204) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error(`Fetch error for ${url}:`, error);
    throw error;
  }
}

// Service d'authentification
export const authService = {
  // Inscription
  async register(username, email, password) {
    return fetchWithAuth('/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
  },

  // Connexion
  async login(username, password) {
    try {
      const data = await fetchWithAuth('/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
      
      if (data) {
        localStorage.setItem('user', JSON.stringify({ 
          username, 
          isPremium: data.is_premium 
        }));
      }
      
      return data;
    } catch (error) {
      console.error('Erreur de connexion:', error.message);
      throw error; // Propager l'erreur pour qu'elle soit gérée par le composant
    }
  },

  // Déconnexion
  async logout() {
    const result = await fetchWithAuth('/logout', {
      method: 'POST',
    });
    localStorage.removeItem('user');
    return result;
  },

  // Récupération du statut utilisateur
  async getUserStatus() {
    return fetchWithAuth('/user-status');
  },
};

// Service de gestion des clients
export const clientService = {
  // Récupérer tous les clients
  async getClients() {
    return fetchWithAuth('/clients');
  },

  // Récupérer un client spécifique
  async getClient(id) {
    return fetchWithAuth(`/clients/${id}`);
  },

  // Créer un client
  async createClient(clientData) {
    return fetchWithAuth('/clients', {
      method: 'POST',
      body: JSON.stringify(clientData),
    });
  },

  // Mettre à jour un client
  async updateClient(id, clientData) {
    const url = `/clients/${id}`;
    console.log('Updating client with URL:', url);
    console.log('Client data:', clientData);
    
    return fetchWithAuth(url, {
      method: 'PUT',
      body: JSON.stringify(clientData),
    });
  },

  // Supprimer un client
  async deleteClient(id) {
    return fetchWithAuth(`/clients/${id}`, {
      method: 'DELETE',
    });
  },
};

// Service pour les lettres de mission
export const ldmService = {
  // Générer une lettre de mission
  async generateLDM(replacements) {
    const response = await fetch(`${API_URL}/generate-ldm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ replacements }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }

    // Traitement spécial pour le téléchargement de fichier
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lettre_de_mission.docx';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  },
};

// Service pour les paramètres du cabinet
export const cabinetService = {
  // Récupérer les informations du cabinet
  async getCabinetInfo() {
    return fetchWithAuth('/mon-cabinet');
  },

  // Mettre à jour les informations du cabinet
  async updateCabinetInfo(cabinetData) {
    return fetchWithAuth('/mon-cabinet', {
      method: 'POST',
      body: JSON.stringify(cabinetData),
    });
  },
};

// Service pour les CGV
export const cgvService = {
  // Récupérer les CGV
  async getCGVInfo() {
    return fetchWithAuth('/mes-cgv');
  },

  // Mettre à jour les CGV
  async updateCGVInfo(cgvData) {
    return fetchWithAuth('/mes-cgv', {
      method: 'POST',
      body: JSON.stringify(cgvData),
    });
  },
};

// Service pour Stripe et les paiements
export const stripeService = {
  // Créer une session de paiement
  async createCheckoutSession() {
    try {
      const response = await fetchWithAuth('/create-checkout-session', {
        method: 'POST',
      });
      
      console.log('Checkout session created:', response);
      return response;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  },
  
  // Vérifier le statut de l'abonnement
  async checkSubscriptionStatus() {
    return fetchWithAuth('/user-status');
  }
};

// Export par défaut pour pouvoir importer l'ensemble des services
export default {
  authService,
  clientService,
  ldmService,
  cabinetService,
  cgvService,
  stripeService
};