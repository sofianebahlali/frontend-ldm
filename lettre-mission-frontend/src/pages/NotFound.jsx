import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-6">
      <h1 className="text-6xl font-bold text-primary-600">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-900">Page non trouvée</h2>
      <p className="mt-2 text-gray-600">La page que vous recherchez n'existe pas ou a été déplacée.</p>
      <Link
        to="/"
        className="mt-8 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}

export default NotFound;