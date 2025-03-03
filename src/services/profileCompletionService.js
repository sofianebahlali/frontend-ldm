// Service pour calculer le niveau de complétion du profil utilisateur
export const profileCompletionService = {
    // Calcule le pourcentage de complétion du profil
    calculateCompletion: async (services) => {
      try {
        let score = 0;
        let total = 0;
        
        // 1. Création du compte (25% de base)
        score += 25;
        total += 25;
        
        // 2. Informations du cabinet (40% max)
        try {
          const cabinetInfo = await services.cabinetService.getCabinetInfo();
          if (cabinetInfo) {
            // Calcul basé sur le nombre de champs remplis
            const cabinetFields = Object.values(cabinetInfo).filter(val => val && val.toString().trim() !== '').length;
            const maxCabinetFields = Object.keys(cabinetInfo).length;
            
            if (maxCabinetFields > 0) {
              score += Math.round((cabinetFields / maxCabinetFields) * 40);
            }
          }
        } catch (error) {
          console.log("Cabinet info not available yet");
        }
        total += 40;
        
        // 3. CGV (20% max)
        try {
          const cgvInfo = await services.cgvService.getCGVInfo();
          if (cgvInfo) {
            const cgvFields = Object.values(cgvInfo).filter(val => val && val.toString().trim() !== '').length;
            const maxCgvFields = Object.keys(cgvInfo).length;
            
            if (maxCgvFields > 0) {
              score += Math.round((cgvFields / maxCgvFields) * 20);
            }
          }
        } catch (error) {
          console.log("CGV info not available yet");
        }
        total += 20;
        
        // 4. Ajout de clients (15% max)
        try {
          const clients = await services.clientService.getClients();
          if (clients && clients.length > 0) {
            // Si au moins un client est ajouté, c'est déjà bien
            score += Math.min(15, clients.length * 3); // 3 points par client, max 15
          }
        } catch (error) {
          console.log("Client info not available yet");
        }
        total += 15;
        
        // Calculer le pourcentage final
        const completion = Math.round((score / total) * 100);
        
        // Stocker dans localStorage pour référence future
        localStorage.setItem('profileCompletion', completion.toString());
        
        return completion;
      } catch (error) {
        console.error("Error calculating profile completion:", error);
        return 25; // Valeur par défaut en cas d'erreur
      }
    },
    
    // Récupère le pourcentage stocké ou calcule une nouvelle valeur
    getCompletion: () => {
      const stored = localStorage.getItem('profileCompletion');
      return stored ? parseInt(stored, 10) : 25;
    }
  };
  
  export default profileCompletionService;