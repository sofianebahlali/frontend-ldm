import React, { useState, useEffect } from 'react';
import { 
  CheckIcon, 
  ChevronDownIcon,
  MenuIcon,
  XIcon,
  ArrowRightIcon,
  DocumentTextIcon,
  UserGroupIcon,
  CogIcon,
  ClockIcon,
  ShieldCheckIcon,
  DocumentDuplicateIcon,
  StarIcon,
  QuestionMarkCircleIcon
} from '../components/Icons'; // Importez vos icônes ou utilisez une bibliothèque comme lucide-react

// Composant principal de la landing page
const LdmLandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  // Gestion du header sticky
  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderSticky(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle l'élément d'accordéon actif
  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Header & Navigation */}
      <header className={`w-full py-4 transition-all duration-300 ${isHeaderSticky ? 'fixed top-0 bg-white shadow-md z-50' : ''}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">LDM</span>
              </div>
              <nav className="hidden md:ml-10 md:flex md:space-x-8">
                <a href="#fonctionnalites" className="text-base font-medium text-gray-700 hover:text-blue-600">Fonctionnalités</a>
                <a href="#temoignages" className="text-base font-medium text-gray-700 hover:text-blue-600">Témoignages</a>
                <a href="#tarifs" className="text-base font-medium text-gray-700 hover:text-blue-600">Tarifs</a>
                <a href="#faq" className="text-base font-medium text-gray-700 hover:text-blue-600">FAQ</a>
              </nav>
            </div>
            <div className="hidden md:flex md:items-center md:space-x-6">
              <a href="#" className="text-base font-medium text-gray-700 hover:text-blue-600">Se connecter</a>
              <a href="#" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                Essai gratuit
              </a>
            </div>
            <div className="md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">{isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}</span>
                {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>
            </div>
          </div>
          
          {/* Menu mobile */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a href="#fonctionnalites" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Fonctionnalités</a>
                <a href="#temoignages" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Témoignages</a>
                <a href="#tarifs" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Tarifs</a>
                <a href="#faq" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">FAQ</a>
              </div>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Se connecter</a>
                  </div>
                  <div className="ml-auto">
                    <a href="#" className="block w-full px-5 py-3 text-center font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">
                      Essai gratuit
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
              <div>
                <div className="inline-flex items-center text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-800 mb-5">
                  <span className="font-medium">Nouveau</span>
                  <span className="ml-2 font-normal text-blue-600">Automatisez vos lettres de mission</span>
                </div>
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:leading-tight">
                  <span className="block">Simplifiez votre</span>
                  <span className="block text-blue-600">gestion documentaire</span>
                </h1>
                <p className="mt-5 text-lg text-gray-500 sm:mt-7 sm:text-xl lg:text-lg xl:text-xl">
                  Automatisez la création et la gestion de vos lettres de mission en quelques clics. Une solution conçue spécifiquement pour les experts-comptables.
                </p>
                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                  <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                    <a href="#" className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                      Commencer gratuitement
                    </a>
                    <a href="#demo" className="flex items-center justify-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      Voir la démo
                      <ArrowRightIcon className="ml-2 h-5 w-5" />
                    </a>
                  </div>
                  <p className="mt-4 text-sm text-gray-500">
                    Pas de carte bancaire requise. Essai gratuit de 14 jours.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full bg-white rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <img
                    className="w-full"
                    src="https://via.placeholder.com/600x400?text=LDM+Screenshot"
                    alt="Capture d'écran de l'application"
                  />
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                    <svg className="h-20 w-20 text-blue-600" fill="currentColor" viewBox="0 0 84 84">
                      <circle opacity="0.9" cx="42" cy="42" r="42" fill="white" />
                      <path d="M55 42L35 55V29L55 42Z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos des clients */}
      <section className="pb-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold uppercase text-gray-500 tracking-wide">
            Utilisé par les meilleurs cabinets d'expertise comptable en France
          </p>
          <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <img className="h-12" src="https://via.placeholder.com/150x50?text=Logo+1" alt="Client 1" />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <img className="h-12" src="https://via.placeholder.com/150x50?text=Logo+2" alt="Client 2" />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <img className="h-12" src="https://via.placeholder.com/150x50?text=Logo+3" alt="Client 3" />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-3 lg:col-span-1">
              <img className="h-12" src="https://via.placeholder.com/150x50?text=Logo+4" alt="Client 4" />
            </div>
            <div className="col-span-2 flex justify-center md:col-span-3 lg:col-span-1">
              <img className="h-12" src="https://via.placeholder.com/150x50?text=Logo+5" alt="Client 5" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fonctionnalites" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Fonctionnalités</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Tout ce dont vous avez besoin
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Une solution complète pour simplifier la création et la gestion de vos lettres de mission.
            </p>
          </div>

          <div className="mt-20">
            <dl className="space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-16">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <DocumentTextIcon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Génération automatique
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    Créez des lettres de mission professionnelles en quelques clics à partir de modèles personnalisables.
                  </dd>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <UserGroupIcon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Gestion des clients
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    Centralisez et gérez facilement les informations de vos clients pour une réutilisation efficace.
                  </dd>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <CogIcon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Personnalisation avancée
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    Adaptez vos documents selon vos besoins avec des options de personnalisation complètes.
                  </dd>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <ClockIcon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Gain de temps
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    Réduisez considérablement le temps consacré aux tâches administratives et concentrez-vous sur l'essentiel.
                  </dd>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <ShieldCheckIcon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Conformité garantie
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    Assurez-vous que vos lettres de mission sont toujours conformes aux normes professionnelles en vigueur.
                  </dd>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <DocumentDuplicateIcon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Modèles multiples
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    Accédez à une bibliothèque de modèles professionnels adaptés à différents types de missions.
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="temoignages" className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Ce que nos clients disent
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Découvrez comment nos utilisateurs transforment leur pratique quotidienne grâce à notre solution.
            </p>
          </div>
          <div className="mt-20 pt-10 grid gap-16 lg:grid-cols-3 lg:gap-x-8">
            <div className="lg:col-span-1">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex">
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                  </div>
                  <p className="mt-6 text-lg leading-7 text-gray-500">
                    "LDM a révolutionné notre façon de travailler. Ce qui nous prenait des heures se fait maintenant en quelques minutes. Un gain de temps considérable."
                  </p>
                </div>
                <div className="mt-8">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-12 w-12 rounded-full"
                        src="https://via.placeholder.com/150?text=P"
                        alt="Profile"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-base font-medium text-gray-900">Sophie Dubois</div>
                      <div className="text-sm font-medium text-gray-500">Expert-comptable, Cabinet Dubois</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex">
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                  </div>
                  <p className="mt-6 text-lg leading-7 text-gray-500">
                    "Interface intuitive et personnalisation poussée. Exactement ce dont nous avions besoin pour standardiser nos processus tout en conservant notre touche personnelle."
                  </p>
                </div>
                <div className="mt-8">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-12 w-12 rounded-full"
                        src="https://via.placeholder.com/150?text=T"
                        alt="Profile"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-base font-medium text-gray-900">Thomas Martin</div>
                      <div className="text-sm font-medium text-gray-500">Directeur, Expertise Conseil</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex">
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                  </div>
                  <p className="mt-6 text-lg leading-7 text-gray-500">
                    "Le support client est exceptionnel et les mises à jour régulières apportent constamment de nouvelles fonctionnalités. Un investissement rentabilisé dès le premier mois."
                  </p>
                </div>
                <div className="mt-8">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-12 w-12 rounded-full"
                        src="https://via.placeholder.com/150?text=L"
                        alt="Profile"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-base font-medium text-gray-900">Laura Bernard</div>
                      <div className="text-sm font-medium text-gray-500">Fondatrice, LB Associés</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="tarifs" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center">
              Tarifs simples et transparents
            </h2>
            <p className="mt-5 text-xl text-gray-500 text-center">
              Choisissez la formule qui correspond le mieux à vos besoins
            </p>
          </div>
          <div className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8">
            <div className="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">Gratuit</h3>
                <p className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-5xl font-extrabold tracking-tight">0€</span>
                  <span className="ml-1 text-xl font-semibold">/mois</span>
                </p>
                <p className="mt-6 text-gray-500">
                  Idéal pour découvrir la plateforme et pour les petits cabinets.
                </p>

                <ul className="mt-6 space-y-6">
                  <li className="flex">
                    <CheckIcon className="flex-shrink-0 w-6 h-6 text-green-500" />
                    <span className="ml-3 text-gray-500">Jusqu'à 5 clients</span>
                  </li>

                  <li className="flex">
                    <CheckIcon className="flex-shrink-0 w-6 h-6 text-green-500" />
                    <span className="ml-3 text-gray-500">1 modèle de lettre de mission</span>
                  </li>

                  <li className="flex">
                    <CheckIcon className="flex-shrink-0 w-6 h-6 text-green-500" />
                    <span className="ml-3 text-gray-500">Gestion des informations de base</span>
                  </li>

                  <li className="flex">
                    <CheckIcon className="flex-shrink-0 w-6 h-6 text-green-500" />
                    <span className="ml-3 text-gray-500">Support par email</span>
                  </li>
                </ul>
              </div>

              <a href="#" className="mt-8 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900">
                Commencer gratuitement
              </a>
            </div>

            <div className="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
              <div className="flex-1">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Premium</h3>
                  <p className="absolute top-0 transform -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Recommandé
                  </p>
                </div>
                <p className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-5xl font-extrabold tracking-tight">29€</span>
                  <span className="ml-1 text-xl font-semibold">/mois</span>
                </p>
                <p className="mt-6 text-gray-500">
                  La solution complète pour les cabinets d'expertise comptable.
                </p>

                <ul className="mt-6 space-y-6">
                  <li className="flex">
                    <CheckIcon className="flex-shrink-0 w-6 h-6 text-green-500" />
                    <span className="ml-3 text-gray-500">Clients illimités</span>
                  </li>

                  <li className="flex">
                    <CheckIcon className="flex-shrink-0 w-6 h-6 text-green-500" />
                    <span className="ml-3 text-gray-500">Modèles de lettres illimités</span>
                  </li>

                  <li className="flex">
                    <CheckIcon className="flex-shrink-0 w-6 h-6 text-green-500" />
                    <span className="ml-3 text-gray-500">Personnalisation avancée</span>
                  </li>

                  <li className="flex">
                    <CheckIcon className="flex-shrink-0 w-6 h-6 text-green-500" />
                    <span className="ml-3 text-gray-500">Gestion des CGV et informations cabinet</span>
                  </li>

                  <li className="flex">
                    <CheckIcon className="flex-shrink-0 w-6 h-6 text-green-500" />
                    <span className="ml-3 text-gray-500">Support prioritaire</span>
                  </li>

                  <li className="flex">
                    <CheckIcon className="flex-shrink-0 w-6 h-6 text-green-500" />
                    <span className="ml-3 text-gray-500">Mises à jour régulières</span>
                  </li>
                </ul>
              </div>

              <a href="#" className="mt-8 block w-full bg-blue-600 border border-blue-600 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-blue-700">
                Essai gratuit de 14 jours
              </a>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <p className="text-sm text-gray-500">
              Tous les prix sont HT. Contactez-nous pour un tarif sur mesure pour les grands cabinets.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Questions fréquemment posées
            </h2>
            <p className="mt-4 text-center text-lg text-gray-500">
              Vous ne trouvez pas la réponse que vous cherchez ? <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Contactez notre équipe</a>.
            </p>
          </div>
          <div className="mt-12 max-w-3xl mx-auto">
            <dl className="space-y-6 divide-y divide-gray-200">
              {faqItems.map((item, index) => (
                <div key={index} className="pt-6">
                  <dt className="text-lg">
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="text-left w-full flex justify-between items-start text-gray-900 focus:outline-none"
                    >
                      <span className="font-medium text-gray-900">{item.question}</span>
                      <span className="ml-6 h-7 flex items-center">
                        <ChevronDownIcon
                          className={`${
                            activeAccordion === index ? '-rotate-180' : 'rotate-0'
                          } h-6 w-6 transform transition-transform duration-200 ease-in-out text-blue-500`}
                        />
                      </span>
                    </button>
                  </dt>
                  <dd
                    className={`mt-2 pr-12 transition-all duration-300 ease-in-out ${
                      activeAccordion === index ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'
                    }`}
                  >
                    <p className="text-base text-gray-500">{item.answer}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl text-center">
            Prêt à simplifier votre gestion documentaire ?
          </h2>
          <p className="mt-4 text-lg leading-6 text-blue-100 text-center">
            Rejoignez des centaines d'experts-comptables qui ont déjà transformé leur façon de travailler.
          </p>
          <div className="mt-10 flex justify-center">
            <div className="max-w-md w-full flex flex-col sm:flex-row gap-4">
              <a
                href="#"
                className="flex-1 flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Essai gratuit
              </a>
              <a
                href="#"
                className="flex-1 flex items-center justify-center px-5 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-700"
              >
                Nous contacter
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-8">
              <span className="text-xl font-bold">LDM</span>
              <p className="text-gray-400">
                Solution innovante pour automatiser et personnaliser vos lettres de mission.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>

                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>

                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Produit</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#fonctionnalites" className="text-base text-gray-400 hover:text-white">
                    Fonctionnalités
                  </a>
                </li>
                <li>
                  <a href="#tarifs" className="text-base text-gray-400 hover:text-white">
                    Tarifs
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-base text-gray-400 hover:text-white">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-400 hover:text-white">
                    Tutoriels
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Entreprise</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-400 hover:text-white">
                    À propos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-400 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-400 hover:text-white">
                    Emplois
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-400 hover:text-white">
                    Partenaires
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-400 hover:text-white">
                    Centre d'aide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-400 hover:text-white">
                    Mentions légales
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-400 hover:text-white">
                    Confidentialité
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between">
            <p className="text-base text-gray-400">
              &copy; 2025 LDM. Tous droits réservés.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">Mentions légales</a>
              <a href="#" className="text-gray-400 hover:text-white">Confidentialité</a>
              <a href="#" className="text-gray-400 hover:text-white">CGU</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Data for FAQ section
const faqItems = [
  {
    question: "Comment fonctionne l'essai gratuit ?",
    answer: "Notre essai gratuit de 14 jours vous donne accès à toutes les fonctionnalités premium sans engagement. Aucune carte bancaire n'est requise pour commencer. À la fin de la période d'essai, vous pouvez choisir de passer à la version premium ou de continuer avec la version gratuite limitée."
  },
  {
    question: "Les lettres de mission générées sont-elles conformes aux normes professionnelles ?",
    answer: "Absolument. Toutes nos lettres de mission sont conformes aux normes professionnelles en vigueur et aux recommandations de l'Ordre des Experts-Comptables. Nos modèles sont régulièrement mis à jour pour refléter les évolutions réglementaires."
  },
  {
    question: "Puis-je personnaliser les modèles de lettres de mission ?",
    answer: "Oui, notre solution permet une personnalisation avancée. Vous pouvez adapter les modes de facturation (forfait ou temps passé), définir vos propres clauses, conditions générales de vente et divers paramètres pour correspondre exactement aux besoins de votre cabinet."
  },
  {
    question: "Comment puis-je exporter les lettres de mission générées ?",
    answer: "Les lettres de mission générées sont exportables au format Word (.docx), ce qui vous permet de les modifier ultérieurement si nécessaire, de les imprimer ou de les envoyer à vos clients par email."
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer: "La sécurité de vos données est notre priorité absolue. Nous utilisons des protocoles de chiffrement avancés et des serveurs sécurisés pour protéger vos informations. Toutes les données sont stockées en France, conformément au RGPD, et vous restez propriétaire de vos informations."
  },
  {
    question: "Est-il possible de changer de formule après inscription ?",
    answer: "Oui, vous pouvez passer de la version gratuite à la version premium à tout moment. Si vous êtes déjà sur la version premium et souhaitez revenir à la version gratuite, ce changement prendra effet à la fin de votre période de facturation actuelle."
  }
];


export default LdmLandingPage;