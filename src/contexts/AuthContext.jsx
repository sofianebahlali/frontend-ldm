// src/contexts/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const checkUserStatus = async () => {
      try {
        // Vérifier d'abord le localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        
        if (storedUser) {
          // Vérifier auprès du serveur si la session est toujours valide
          const status = await authService.getUserStatus();
          if (status && status.username) {
            // Mettre à jour les informations utilisateur si nécessaire
            const updatedUser = {
              ...storedUser,
              username: status.username,
              isPremium: status.is_premium
            };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
          } else {
            // La session a expiré, nettoyer le localStorage
            localStorage.removeItem('user');
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Erreur lors de la vérification du statut utilisateur:', error);
        localStorage.removeItem('user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUserStatus();
  }, []);

  const login = async (username, password) => {
    try {
      const data = await authService.login(username, password);
      if (data) {
        const userInfo = {
          username,
          isPremium: data.is_premium
        };
        localStorage.setItem('user', JSON.stringify(userInfo));
        setUser(userInfo);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
    } finally {
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};