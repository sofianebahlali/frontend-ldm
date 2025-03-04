import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';

// Pages
import PremiumLandingPage from './pages/PremiumLandingPage'
import CorsTester from './pages/CorsTester';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import ClientList from './pages/ClientList';
import ClientForm from './pages/ClientForm';
import GenerateLDM from './pages/GenerateLDM';
import CabinetSettings from './pages/CabinetSettings';
import Contact from './pages/Contact';
import SubscriptionPage from './pages/SubscriptionPage';
import UserSettings from './pages/UserSettings';
import CGVSettings from './pages/CGVSettings';
import Settings from './pages/Settings';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ChatbotAdmin from './pages/ChatbotAdmin';
import PremiumAccountingChatbot from './pages/PremiumAccountingChatbot';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Custom hooks
import { useAuth } from './contexts/AuthContext';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="w-12 h-12 border-4 border-black border-t-transparent dark:border-white dark:border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Premium content protection
const PremiumRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="w-12 h-12 border-4 border-black border-t-transparent dark:border-white dark:border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }
  
  if (!user?.isPremium) {
    return <Navigate to="/settings/payment" replace />;
  }
  
  return children;
};

// Home Page Router component to handle redirection
const HomeRouter = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="w-12 h-12 border-4 border-black border-t-transparent dark:border-white dark:border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <PremiumLandingPage />;
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger le script Stripe
    const loadStripe = async () => {
      if (!window.Stripe && document.getElementById('stripe-js') === null) {
        const script = document.createElement('script');
        script.id = 'stripe-js';
        script.src = 'https://js.stripe.com/v3/';
        script.async = true;
        document.body.appendChild(script);
      }
    };

    loadStripe();

    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-950">
        <div className="w-12 h-12 border-4 border-black border-t-transparent dark:border-white dark:border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Marketing/Public Routes - Utilisez HomeRouter pour la page d'accueil */}
          <Route path="/" element={<HomeRouter />} />
          <Route path="/cors-test" element={<CorsTester />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Routes de réinitialisation de mot de passe */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          
          <Route path="/success" element={
            <ProtectedRoute>
              <DashboardLayout>
                <div className="py-6">
                  <h1 className="text-2xl font-bold mb-4">Abonnement activé avec succès!</h1>
                  <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                    <p className="mb-4">Félicitations! Votre abonnement premium est maintenant actif. Vous pouvez profiter de toutes les fonctionnalités premium.</p>
                    <Link to="/dashboard" className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                      Retour au tableau de bord
                    </Link>
                  </div>
                </div>
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          {/* Client Routes */}
          <Route path="/clients" element={
            <ProtectedRoute>
              <DashboardLayout>
                <ClientList />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/clients/add" element={
            <ProtectedRoute>
              <DashboardLayout>
                <ClientForm />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/clients/edit/:id" element={
            <ProtectedRoute>
              <DashboardLayout>
                <ClientForm />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          {/* Letter Generation Route (Premium) */}
          <Route path="/generate-ldm" element={
            <ProtectedRoute>
              <DashboardLayout>
                <GenerateLDM />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          {/* Settings Routes */}
          <Route path="/settings" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/settings/user" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/settings/cabinet" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/settings/cgv" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/settings/payment" element={
            <ProtectedRoute>
              <DashboardLayout>
                <SubscriptionPage />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/chatbot" element={
            <ProtectedRoute>
              <DashboardLayout>
                <ChatbotAdmin />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          {/* Chatbot comptable premium */}
          <Route path="/premium/expert-comptable" element={
            <ProtectedRoute>
              <PremiumRoute>
                <DashboardLayout>
                  <PremiumAccountingChatbot />
                </DashboardLayout>
              </PremiumRoute>
            </ProtectedRoute>
          } />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;