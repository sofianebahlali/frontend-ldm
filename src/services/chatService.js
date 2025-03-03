// Service pour communiquer avec l'API backend du chatbot

export const chatService = {
  // Envoyer un message à l'API
  async sendMessage(messages) {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      
      // Simuler un délai pour une expérience plus naturelle
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Envoyer la requête au backend
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
        credentials: 'include', // Pour envoyer les cookies de session
      });

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }

      const data = await response.json();
      
      // Retourner la réponse avec l'ID de message pour le feedback
      return {
        content: data.response,
        id: data.messageId || null,
        role: 'assistant'
      };
    } catch (error) {
      console.error('Erreur chatService:', error);
      
      // Mode de secours en cas d'erreur
      return {
        content: this.getFallbackResponse(messages[messages.length - 1].content),
        role: 'assistant'
      };
    }
  },
  
  // Envoyer un feedback sur une réponse
  async sendFeedback(messageId, query, response, isHelpful) {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      
      const result = await fetch(`${API_URL}/chat/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messageId,
          feedback: isHelpful ? 'helpful' : 'not_helpful',
          query,
          response
        }),
        credentials: 'include',
      });
      
      return result.ok;
    } catch (error) {
      console.error('Erreur lors de l\'envoi du feedback:', error);
      return false;
    }
  },
  
  // Réponses de secours en cas d'échec de connexion au backend
  getFallbackResponse(question) {
    question = question.toLowerCase();
    
    if (question.includes('bonjour') || question.includes('salut')) {
      return "Bonjour ! Je suis l'assistant LDM. Comment puis-je vous aider aujourd'hui ?";
    }
    
    if (question.includes('merci')) {
      return "Je vous en prie ! N'hésitez pas si vous avez d'autres questions.";
    }
    
    return "Je suis désolé, mais je ne peux pas vous répondre pour l'instant. Veuillez vérifier votre connexion internet et réessayer plus tard.";
  }
};

export default chatService;