import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Layouts
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

// Pages à créer plus tard
const ClientList = () => <div>Liste des clients</div>;
const ClientForm = () => <div>Formulaire client</div>;
const GenerateLDM = () => <div>Génération de lettre de mission</div>;
const CabinetSettings = () => <div>Paramètres du cabinet</div>;

// Composant qui vérifie si l'utilisateur est connecté
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement initial
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
          {/* Routes protégées */}
          <Route path="dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="clients" element={
            <ProtectedRoute>
              <ClientList />
            </ProtectedRoute>
          } />
          
          <Route path="clients/add" element={
            <ProtectedRoute>
              <ClientForm />
            </ProtectedRoute>
          } />
          
          <Route path="clients/edit/:id" element={
            <ProtectedRoute>
              <ClientForm />
            </ProtectedRoute>
          } />
          
          <Route path="generate-ldm" element={
            <ProtectedRoute>
              <GenerateLDM />
            </ProtectedRoute>
          } />
          
          <Route path="settings/cabinet" element={
            <ProtectedRoute>
              <CabinetSettings />
            </ProtectedRoute>
          } />
          
          {/* Route 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;