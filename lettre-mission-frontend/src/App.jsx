import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import ClientList from './pages/ClientList';
import ClientForm from './pages/ClientForm';
import GenerateLDM from './pages/GenerateLDM';
import CabinetSettings from './pages/CabinetSettings';
import Contact from './pages/Contact';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Premium content protection
const PremiumRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
  if (!user?.isPremium) {
    return <Navigate to="/settings/payment" replace />;
  }
  
  return children;
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Marketing/Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
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
        <Route path="/settings/cabinet" element={
          <ProtectedRoute>
            <DashboardLayout>
              <CabinetSettings />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/settings/payment" element={
          <ProtectedRoute>
            <DashboardLayout>
              <div className="py-6">
                <h1 className="text-2xl font-bold mb-4">Abonnement Premium</h1>
                <div className="bg-white shadow rounded-lg p-6">
                  <p className="mb-4">Passez à l'abonnement premium pour accéder à toutes les fonctionnalités.</p>
                  <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors">
                    Passer à l'abonnement premium
                  </button>
                </div>
              </div>
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;