import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PremiumAccountingChatbot = () => {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Bonjour ! Je suis l\'assistant expert-comptable LDM. Je peux vous aider sur des questions de comptabilité, fiscalité, obligations sociales et juridiques. Que souhaitez-vous savoir aujourd\'hui ?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  // Sujets d'expertise pour la navigation rapide
  const expertiseTopics = [
    { id: 'fiscal', name: 'Fiscalité', icon: '📊' },
    { id: 'compta', name: 'Comptabilité', icon: '📝' },
    { id: 'social', name: 'Social', icon: '👥' },
    { id: 'juridique', name: 'Juridique', icon: '⚖️' },
    { id: 'ldm', name: 'Lettres de mission', icon: '📄' },
    { id: 'creation', name: 'Création d\'entreprise', icon: '🚀' },
  ];

  // Vérification premium
  useEffect(() => {
    if (!loading && user) {
      if (!user.isPremium) {
        navigate('/settings/payment');
      }
    }
  }, [user, loading, navigate]);

  // Auto-scroll à chaque nouveau message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus sur l'input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Ajouter le message de l'utilisateur
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Construire les messages
      const systemMessage = {
        role: 'system',
        content: `Tu es un assistant expert en comptabilité et fiscalité française. Réponds avec précision et rigueur
        à toutes les questions dans ces domaines. Cite tes sources lorsque tu donnes des informations
        spécifiques (articles de loi, textes réglementaires, doctrine administrative). Structure tes réponses
        de manière claire et professionnelle. Si une question est en dehors de ton domaine d'expertise, 
        indique-le clairement. Voici quelques sources fiables que tu peux citer: Code général des impôts (CGI),
        Code de commerce, Bulletin Officiel des Finances Publiques (BOFiP), Plan Comptable Général (PCG),
        Publications de l'Ordre des Experts-Comptables.`
      };
      
      const apiMessages = [
        systemMessage,
        ...messages.slice(-5), // Contexte limité aux 5 derniers messages
        userMessage
      ];
      
      // URL de l'API
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      
      // Envoi de la requête au backend
      const response = await fetch(`${baseUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: apiMessages }),
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Formater la réponse pour mettre en évidence les sources
      let formattedResponse = data.response;
      
      if (formattedResponse.includes('Source:') || formattedResponse.includes('Sources:')) {
        formattedResponse = formattedResponse.replace(
          /(Source[s]?:.*?)(\n|$)/g, 
          '<div class="mt-2 text-sm p-2 bg-gray-100 dark:bg-gray-700 rounded-md border-l-4 border-blue-500">$1</div>$2'
        );
      }
      
      // Ajouter la réponse de l'assistant
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: formattedResponse,
        id: data.messageId || null,
        containsHtml: true
      }]);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: 'Désolé, une erreur est survenue lors de la recherche. Veuillez réessayer plus tard.' 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour gérer les feedbacks sur les réponses
  const handleFeedback = async (messageId, response, isHelpful) => {
    try {
      // Trouver le message précédent de l'utilisateur
      const messageIndex = messages.findIndex(m => m.id === messageId);
      let userQuery = "";
      
      if (messageIndex > 0) {
        // Chercher le message utilisateur précédent
        for (let i = messageIndex - 1; i >= 0; i--) {
          if (messages[i].role === 'user') {
            userQuery = messages[i].content;
            break;
          }
        }
      }
      
      // URL de l'API
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      
      // Envoyer le feedback au backend
      await fetch(`${baseUrl}/chat/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messageId,
          feedback: isHelpful ? 'helpful' : 'not_helpful',
          query: userQuery,
          response
        }),
        credentials: 'include',
      });
      
      // Mettre à jour l'état local pour afficher la confirmation
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, feedbackSent: true, wasHelpful: isHelpful } 
            : msg
        )
      );
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi du feedback:', error);
    }
  };

  // Fonction pour choisir un sujet prédéfini
  const handleTopicClick = (topic) => {
    const topicQuestions = {
      fiscal: "Quelles sont les dernières évolutions fiscales pour les entreprises en France ?",
      compta: "Comment comptabiliser correctement les amortissements ?",
      social: "Quelles sont les obligations sociales d'un employeur en France ?",
      juridique: "Quelles sont les différences entre SARL et SAS ?",
      ldm: "Quels sont les éléments essentiels d'une lettre de mission ?",
      creation: "Quelles sont les étapes pour créer une entreprise en France ?"
    };
    
    setInput(topicQuestions[topic.id]);
    inputRef.current?.focus();
  };

  // Style des bulles en fonction du rôle
  const getMessageStyle = (role) => {
    if (role === 'user') {
      return 'bg-black dark:bg-white text-white dark:text-black ml-auto';
    }
    return 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mr-auto';
  };

  // Vérification du chargement de l'authentification
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-black border-t-transparent dark:border-white dark:border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Redirection si non premium (gérée par useEffect)
  if (!user?.isPremium) {
    return null;
  }

  return (
    <div className="flex h-[calc(100vh-80px)] bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden"
          >
            <div className="p-4">
              <h2 className="text-lg font-bold mb-4">Expert-comptable LDM</h2>
              
              {/* Avertissement sur les limites du modèle */}
              <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-md border-l-4 border-yellow-400 dark:border-yellow-500 text-sm">
                <h3 className="font-medium text-yellow-800 dark:text-yellow-300 mb-1">Important</h3>
                <p className="text-yellow-700 dark:text-yellow-200">
                  Cet assistant fournit des informations générales et ne remplace pas les conseils personnalisés d'un expert-comptable. Les informations peuvent ne pas être à jour ou exhaustives.
                </p>
              </div>
              
              {/* Catégories d'expertise */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Thématiques</h3>
                <div className="space-y-2">
                  {expertiseTopics.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => handleTopicClick(topic)}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center"
                    >
                      <span className="mr-2">{topic.icon}</span>
                      <span>{topic.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Information Premium */}
              <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-md p-3 text-white">
                  <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l.707.707L15.414 4a1 1 0 111.414 1.414l-1 1a1 1 0 01-1.414 0l-.707-.707-.707.707a1 1 0 01-1.414-1.414l1-1A1 1 0 0112 2zm-2 5a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-bold">Accès Premium</span>
                  </div>
                  <p className="text-sm">
                    Cet assistant expert-comptable est une fonctionnalité exclusive pour les abonnés Premium.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Zone principale de chat */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* En-tête */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-1 mr-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label={showSidebar ? "Masquer le panneau latéral" : "Afficher le panneau latéral"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {showSidebar ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <div>
              <h1 className="text-xl font-bold">Consultant Expert-Comptable</h1>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>Disponible 24/7 | Accès Premium</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Zone de messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`max-w-[85%] rounded-xl px-4 py-3 mb-4 ${getMessageStyle(message.role)}`}
            >
              {message.containsHtml ? (
                <div dangerouslySetInnerHTML={{ __html: message.content }} />
              ) : (
                <div className="whitespace-pre-wrap">{message.content}</div>
              )}
              
              {/* Boutons de feedback pour les messages de l'assistant avec ID */}
              {message.role === 'assistant' && message.id && !message.feedbackSent && (
                <div className="flex items-center justify-end mt-3 text-xs text-gray-500 dark:text-gray-400">
                  <span className="mr-2">Cette réponse vous a-t-elle aidé ?</span>
                  <button
                    onClick={() => handleFeedback(message.id, message.content, true)}
                    className="ml-1 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    aria-label="Réponse utile"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleFeedback(message.id, message.content, false)}
                    className="ml-1 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    aria-label="Réponse non utile"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904a3.61 3.61 0 01.608-2.006L17 13v-5m-7 10h2m-2-2v-5m0 0v-5m0 5h2m8-2v4a2 2 0 01-2 2h-2.5" />
                    </svg>
                  </button>
                </div>
              )}
              
              {/* Confirmation de feedback */}
              {message.feedbackSent && (
                <div className="text-xs text-gray-500 dark:text-gray-400 text-right mt-2">
                  Merci pour votre feedback !
                </div>
              )}
            </div>
          ))}
          
          {/* Indicateur de chargement */}
          {isLoading && (
            <div className="flex space-x-2 justify-center items-center my-4">
              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Zone de saisie */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex space-x-2">
            <input
              type="text"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez une question à l'expert-comptable..."
              className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black disabled:opacity-50 transition-opacity"
              aria-label="Envoyer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
            Les réponses sont générées par IA et peuvent contenir des erreurs. Consultez un professionnel pour des conseils personnalisés.
          </div>
        </form>
      </div>
    </div>
  );
};

export default PremiumAccountingChatbot;