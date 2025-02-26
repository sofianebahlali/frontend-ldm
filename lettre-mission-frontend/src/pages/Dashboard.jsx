import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { clientService } from '../services/api';

// Composants Dashboard
import StatCard from '../components/dashboard/StatCard';
import RecentActivityCard from '../components/dashboard/RecentActivityCard';
import ClientListCard from '../components/dashboard/ClientListCard';
import QuickActionsCard from '../components/dashboard/QuickActionsCard';
import ChartCard from '../components/dashboard/ChartCard';

const Dashboard = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  // Simuler des activités récentes
  const recentActivities = [
    { 
      id: 1, 
      action: 'Lettre de mission créée', 
      client: 'Dupont SARL', 
      date: 'Il y a 2 heures',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    },
    { 
      id: 2, 
      action: 'Client ajouté', 
      client: 'Martin & Co', 
      date: 'Hier, 15:30',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
        </svg>
      )
    },
    { 
      id: 3, 
      action: 'Profil cabinet mis à jour', 
      client: null, 
      date: 'Il y a 3 jours',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      )
    }
  ];

  // Simuler des données pour le graphique
  const chartData = {
    labels: ['Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Lettres créées',
        data: [4, 6, 8, 5, 10, 12],
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      }
    ]
  };

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        const response = await clientService.getClients();
        setClients(response);
      } catch (err) {
        console.error('Erreur lors du chargement des clients:', err);
        setError('Impossible de charger les clients. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Tableau de bord</h1>
        <p className="mt-1 text-sm text-gray-600">
          Bienvenue, <span className="font-medium">{user?.username}</span>. Voici un résumé de votre activité.
        </p>
      </header>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Clients" 
          value={loading ? '...' : clients.length}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
          trend={clients.length > 0 ? '+' + Math.floor(Math.random() * 5) : '0'}
          trendLabel="ce mois-ci"
          linkTo="/clients"
          linkLabel="Voir tous les clients"
        />
        
        <StatCard 
          title="Lettres de mission" 
          value={user?.isPremium ? '15' : '0'} 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
          trend={user?.isPremium ? '+3' : '0'}
          trendLabel="cette semaine"
          linkTo={user?.isPremium ? '/generate-ldm' : '/settings/payment'}
          linkLabel={user?.isPremium ? 'Générer une lettre' : 'Passer Premium'}
          isPremium={!user?.isPremium}
        />
        
        <StatCard 
          title="Complétude profil" 
          value="75%" 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          }
          progress={75}
          linkTo="/settings/cabinet"
          linkLabel="Compléter mon profil"
        />
        
        <StatCard 
          title="Temps économisé" 
          value="4h" 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          label="par semaine"
          highlight={true}
        />
      </div>
      
      {/* Ligne principale avec graphique et activités récentes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <ChartCard 
          title="Activité mensuelle" 
          subtitle="Nombre de lettres de mission créées" 
          data={chartData}
          className="lg:col-span-2"
        />
        
        <RecentActivityCard 
          title="Activités récentes" 
          activities={recentActivities}
        />
      </div>
      
      {/* Ligne inférieure avec liste clients et actions rapides */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ClientListCard 
          title="Clients récents" 
          clients={clients.slice(0, 5)} 
          loading={loading}
          className="lg:col-span-2"
        />
        
        <QuickActionsCard />
      </div>
    </div>
  );
};

export default Dashboard;