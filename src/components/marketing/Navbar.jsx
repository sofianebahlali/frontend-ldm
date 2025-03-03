import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isScrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Vérifier si un utilisateur est connecté via localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className={`flex items-center ${isScrolled ? 'text-black' : 'text-white'}`}>
              <span className="text-2xl font-bold">LDM</span>
            </Link>
          </div>
          
          {/* Navigation principale - Desktop */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="#features" 
              className={`text-sm font-medium ${isScrolled ? 'text-gray-500 hover:text-black' : 'text-gray-300 hover:text-white'} transition-colors duration-200`}
            >
              Fonctionnalités
            </Link>
            <Link 
              to="#how-it-works" 
              className={`text-sm font-medium ${isScrolled ? 'text-gray-500 hover:text-black' : 'text-gray-300 hover:text-white'} transition-colors duration-200`}
            >
              Comment ça marche
            </Link>
            <Link 
              to="#testimonials" 
              className={`text-sm font-medium ${isScrolled ? 'text-gray-500 hover:text-black' : 'text-gray-300 hover:text-white'} transition-colors duration-200`}
            >
              Témoignages
            </Link>
            <Link 
              to="#pricing" 
              className={`text-sm font-medium ${isScrolled ? 'text-gray-500 hover:text-black' : 'text-gray-300 hover:text-white'} transition-colors duration-200`}
            >
              Tarifs
            </Link>
            <Link 
              to="/contact" 
              className={`text-sm font-medium ${isScrolled ? 'text-gray-500 hover:text-black' : 'text-gray-300 hover:text-white'} transition-colors duration-200`}
            >
              Contact
            </Link>
          </nav>
          
          {/* Boutons d'action - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    isScrolled 
                      ? 'bg-black text-white hover:bg-gray-800' 
                      : 'bg-white text-black hover:bg-gray-100'
                  } transition-colors duration-200`}
                >
                  Mon compte
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    isScrolled 
                      ? 'text-black hover:bg-gray-100' 
                      : 'text-white hover:text-black hover:bg-white/10'
                  } transition-colors duration-200`}
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    isScrolled 
                      ? 'bg-black text-white hover:bg-gray-800' 
                      : 'bg-white text-black hover:bg-gray-100'
                  } transition-colors duration-200`}
                >
                  Essai gratuit
                </Link>
              </>
            )}
          </div>
          
          {/* Menu burger - Mobile */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isScrolled ? 'text-gray-600 hover:text-black' : 'text-gray-300 hover:text-white'
              } focus:outline-none`}
            >
              <span className="sr-only">Ouvrir le menu</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className={`md:hidden ${isScrolled ? 'bg-white' : 'bg-black'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="#features"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 hover:bg-gray-800'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Fonctionnalités
            </Link>
            <Link
              to="#how-it-works"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 hover:bg-gray-800'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Comment ça marche
            </Link>
            <Link
              to="#testimonials"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 hover:bg-gray-800'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Témoignages
            </Link>
            <Link
              to="#pricing"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 hover:bg-gray-800'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Tarifs
            </Link>
            <Link
              to="/contact"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 hover:bg-gray-800'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            {user ? (
              <Link
                to="/dashboard"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isScrolled 
                    ? 'bg-black text-white hover:bg-gray-800' 
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Mon compte
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 hover:bg-gray-800'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isScrolled 
                      ? 'bg-black text-white hover:bg-gray-800' 
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Essai gratuit
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;