import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatService } from '../services/chatService';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Bonjour ! Je suis votre assistant LDM. Comment puis-je vous aider aujourd\'hui ?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll à chaque nouveau message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus sur l'input quand le chat s'ouvre
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Ajouter le message de l'utilisateur
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Envoyer la conversation à l'API
      const assistantResponse = await chatService.sendMessage(
        messages.concat(userMessage)
      );
      
      // Ajouter la réponse de l'assistant
      setMessages(prev => [...prev, assistantResponse]);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: 'Désolé, une erreur est survenue. Veuillez réessayer plus tard.' 
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
      
      // Envoyer le feedback au backend
      await chatService.sendFeedback(messageId, userQuery, response, isHelpful);
      
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

  // Animations des bulles de messages
  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  // Style des bulles en fonction du rôle
  const getMessageStyle = (role) => {
    if (role === 'user') {
      return 'bg-black dark:bg-white text-white dark:text-black ml-auto';
    }
    return 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mr-auto';
  };

  // Rendu des messages avec des délais pour l'animation
  const renderMessages = () => {
    return messages.map((message, index) => {
      // Si c'est un message de l'assistant avec ID (pour feedback)
      if (message.role === 'assistant' && message.id) {
        return (
          <motion.div
            key={index}
            className={`max-w-[85%] rounded-xl px-4 py-2 mb-3 ${getMessageStyle(message.role)}`}
            initial="hidden"
            animate="visible"
            variants={messageVariants}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="message-content mb-2">
              {message.content}
            </div>
            
            {/* Boutons de feedback */}
            {!message.feedbackSent && (
              <div className="flex items-center justify-end mt-2 text-xs text-gray-500 dark:text-gray-400">
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
            
            {/* Message de confirmation après envoi du feedback */}
            {message.feedbackSent && (
              <div className="text-xs text-gray-500 dark:text-gray-400 text-right mt-2">
                Merci pour votre feedback !
              </div>
            )}
          </motion.div>
        );
      }
      
      // Pour les autres messages, affichage normal
      return (
        <motion.div
          key={index}
          className={`max-w-[85%] rounded-xl px-4 py-2 mb-3 ${getMessageStyle(message.role)}`}
          initial="hidden"
          animate="visible"
          variants={messageVariants}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          {message.content}
        </motion.div>
      );
    });
  };

  return (
    <>
      {/* Bouton d'ouverture */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleOpen}
            className="fixed z-50 bottom-6 right-6 w-14 h-14 rounded-full bg-black dark:bg-white text-white dark:text-black shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
            aria-label="Ouvrir le chat"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Fenêtre de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed z-50 bottom-6 right-6 w-80 sm:w-96 h-[500px] max-h-[80vh] rounded-xl bg-white dark:bg-gray-800 shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {/* En-tête */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-black dark:bg-white text-white dark:text-black">
              <div className="flex items-center space-x-2">
                <span className="font-bold">Assistant LDM</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <button 
                onClick={handleClose}
                className="p-1 rounded-full hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors"
                aria-label="Fermer le chat"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Zone de messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
              {renderMessages()}
              {isLoading && (
                <div className="flex justify-center items-center space-x-2 my-4">
                  <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Zone de saisie */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Posez votre question..."
                  className="flex-1 px-4 py-2 rounded-full border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="p-2 rounded-full bg-black dark:bg-white text-white dark:text-black disabled:opacity-50 transition-opacity"
                  aria-label="Envoyer"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 transform rotate-90" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;