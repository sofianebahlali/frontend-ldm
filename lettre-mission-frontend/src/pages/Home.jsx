import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Composants
import Navbar from '../components/marketing/Navbar';
import Footer from '../components/marketing/Footer';
import TestimonialCard from '../components/marketing/TestimonialCard';
import PricingCard from '../components/marketing/PricingCard';
import FeatureCard from '../components/marketing/FeatureCard';

// Images et icônes (ici en placeholder SVG pour simplifier)
const heroImage = (
  <svg className="w-full h-full object-cover" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" fill="#1a1a1a" />
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="24px">
      Dashboard Preview
    </text>
  </svg>
);

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Détecte le scroll pour animer la navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Données des témoignages
  const testimonials = [
    {
      quote: "LDM a complètement transformé notre façon de gérer nos lettres de mission. Nous économisons environ 4 heures par semaine sur les tâches administratives.",
      author: "Marie Dupont",
      role: "Associée, Cabinet Dupont & Associés",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      quote: "L'interface est incroyablement intuitive et le support client est exceptionnel. Je recommande LDM à tous mes confrères experts-comptables.",
      author: "Thomas Lefebvre",
      role: "Expert-comptable indépendant",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    {
      quote: "Depuis que nous utilisons LDM, nos clients sont impressionnés par le professionnalisme de nos documents. C'est un vrai plus pour notre image de marque.",
      author: "Sophie Martin",
      role: "Directrice, Cabinet Martin Finances",
      avatar: "https://i.pravatar.cc/150?img=3"
    }
  ];

  // Données des forfaits
  const pricingPlans = [
    {
      name: "Gratuit",
      price: "0€",
      period: "pour toujours",
      features: [
        "Gestion de 5 clients max",
        "Modèle de lettre de mission basique",
        "Support par email",
      ],
      ctaText: "Commencer gratuitement",
      ctaLink: "/register",
      highlighted: false
    },
    {
      name: "Premium",
      price: "29€",
      period: "par mois",
      features: [
        "Clients illimités",
        "Modèles personnalisables",
        "Génération automatique de documents",
        "Support prioritaire",
        "Intégration avec votre logiciel comptable"
      ],
      ctaText: "Essai gratuit de 14 jours",
      ctaLink: "/register?plan=premium",
      highlighted: true
    },
    {
      name: "Entreprise",
      price: "Sur mesure",
      period: "",
      features: [
        "Tout ce qui est inclus dans Premium",
        "Personnalisation avancée",
        "API complète",
        "Formation dédiée",
        "Gestionnaire de compte dédié"
      ],
      ctaText: "Contacter l'équipe commerciale",
      ctaLink: "/contact",
      highlighted: false
    }
  ];

  // Fonctionnalités principales
  const features = [
    {
      title: "Génération instantanée",
      description: "Créez des lettres de mission professionnelles en quelques clics à partir de vos modèles personnalisés.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Gestion clients intuitive",
      description: "Organisez efficacement votre portefeuille clients avec une interface moderne et intuitive.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      )
    },
    {
      title: "Conformité garantie",
      description: "Assurez-vous que vos lettres de mission respectent toutes les exigences légales et réglementaires.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      )
    },
    {
      title: "Automatisation complète",
      description: "Automatisez l'ensemble du processus, de la création à la signature électronique et au stockage sécurisé.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: "Personnalisation avancée",
      description: "Adaptez vos lettres de mission à votre identité visuelle et aux besoins spécifiques de chaque client.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
        </svg>
      )
    },
    {
      title: "Sécurité et confidentialité",
      description: "Profitez d'un stockage sécurisé avec chiffrement de bout en bout pour protéger vos données sensibles.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white">
      {/* Navigation */}
      <Navbar isScrolled={isScrolled} />
      
      {/* Hero Section */}
      <section className="relative bg-black text-white overflow-hidden" id="home">
        {/* Background pattern */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(120,120,120,0.8)_0,rgba(0,0,0,0)_50%)]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <div className="mt-12 lg:mt-0">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Simplifiez vos</span>{' '}
                  <span className="block text-gray-200 xl:inline">lettres de mission</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-lg text-gray-300 sm:text-xl md:mt-5 md:max-w-3xl">
                  Créez, personnalisez et gérez vos lettres de mission en quelques clics. 
                  Gagnez du temps et impressionnez vos clients.
                </p>
                <div className="mt-10 sm:flex sm:justify-start sm:space-x-4">
                  <div className="rounded-md shadow">
                    <Link
                      to="/register"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10 transition-all duration-200"
                    >
                      Commencer gratuitement
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0">
                    <Link
                      to="#features"
                      className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-100 bg-transparent hover:bg-white/10 md:py-4 md:text-lg md:px-10 transition-all duration-200"
                    >
                      En savoir plus
                    </Link>
                  </div>
                </div>
                
                {/* Stats rapides */}
                <div className="mt-12 border-t border-gray-700 pt-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <p className="text-3xl font-extrabold text-white">98%</p>
                      <p className="text-sm text-gray-400">Taux de satisfaction</p>
                    </div>
                    <div>
                      <p className="text-3xl font-extrabold text-white">+1000</p>
                      <p className="text-sm text-gray-400">Cabinets utilisateurs</p>
                    </div>
                    <div>
                      <p className="text-3xl font-extrabold text-white">4h</p>
                      <p className="text-sm text-gray-400">Économisées par semaine</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full bg-gray-900 rounded-lg overflow-hidden">
                  <div className="w-full">
                    {heroImage}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button type="button" className="bg-white/30 backdrop-blur-sm rounded-full p-4 text-white hover:bg-white/40 transition-all duration-200">
                      <span className="sr-only">Watch demo</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Vague séparatrice */}
        <div className="absolute bottom-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,181.3C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>
      
      {/* Logos partenaires */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold uppercase text-gray-500 tracking-wide">
            Ils nous font confiance
          </p>
          <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6">
            <div className="col-span-1 flex justify-center">
              <img className="h-12 opacity-50 hover:opacity-75 transition-opacity" src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg" alt="Tuple" />
            </div>
            <div className="col-span-1 flex justify-center">
              <img className="h-12 opacity-50 hover:opacity-75 transition-opacity" src="https://tailwindui.com/img/logos/mirage-logo-gray-400.svg" alt="Mirage" />
            </div>
            <div className="col-span-1 flex justify-center">
              <img className="h-12 opacity-50 hover:opacity-75 transition-opacity" src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg" alt="StaticKit" />
            </div>
            <div className="col-span-1 flex justify-center">
              <img className="h-12 opacity-50 hover:opacity-75 transition-opacity" src="https://tailwindui.com/img/logos/transistor-logo-gray-400.svg" alt="Transistor" />
            </div>
            <div className="col-span-1 flex justify-center">
              <img className="h-12 opacity-50 hover:opacity-75 transition-opacity" src="https://tailwindui.com/img/logos/workcation-logo-gray-400.svg" alt="Workcation" />
            </div>
            <div className="col-span-1 flex justify-center">
              <img className="h-12 opacity-50 hover:opacity-75 transition-opacity" src="https://tailwindui.com/img/logos/statamic-logo-gray-400.svg" alt="Statamic" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Section Fonctionnalités */}
      <section className="py-24 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-sm font-semibold tracking-wide uppercase text-black">Fonctionnalités</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Tout ce dont vous avez besoin pour gérer vos lettres de mission
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Une suite complète d'outils conçus spécifiquement pour les experts-comptables et leurs besoins spécifiques.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <FeatureCard 
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Comment ça marche */}
      <section className="py-24 bg-gray-50" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-16">
            <h2 className="text-sm font-semibold tracking-wide uppercase text-black">Comment ça marche</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Simplifiez votre flux de travail en trois étapes
            </p>
          </div>
          
          <div className="relative">
            {/* Ligne de connexion */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200 z-0"></div>
            
            {/* Étapes */}
            <div className="relative z-10 flex flex-col items-center space-y-16">
              {/* Étape 1 */}
              <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className="flex-shrink-0 bg-black text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4 md:mb-0 md:mr-8">
                  1
                </div>
                <div className="md:w-1/2 text-center md:text-left bg-white rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Configurez votre cabinet</h3>
                  <p className="text-gray-600">
                    Personnalisez votre profil, ajoutez votre logo et vos informations de cabinet pour les intégrer automatiquement à vos lettres de mission.
                  </p>
                </div>
              </div>
              
              {/* Étape 2 */}
              <div className="flex flex-col md:flex-row-reverse items-center md:items-start">
                <div className="flex-shrink-0 bg-black text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4 md:mb-0 md:ml-8">
                  2
                </div>
                <div className="md:w-1/2 text-center md:text-right bg-white rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Ajoutez vos clients</h3>
                  <p className="text-gray-600">
                    Créez des fiches clients complètes avec toutes les informations nécessaires pour vos lettres de mission et documents administratifs.
                  </p>
                </div>
              </div>
              
              {/* Étape 3 */}
              <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className="flex-shrink-0 bg-black text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4 md:mb-0 md:mr-8">
                  3
                </div>
                <div className="md:w-1/2 text-center md:text-left bg-white rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Générez vos lettres de mission</h3>
                  <p className="text-gray-600">
                    En quelques clics, créez des lettres de mission professionnelles, personnalisées et conformes à la réglementation. Téléchargez-les ou envoyez-les directement à vos clients.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-16">
            <Link
              to="/register"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 md:py-4 md:text-lg md:px-10 transition-all duration-200"
            >
              Commencer maintenant
            </Link>
          </div>
        </div>
      </section>
      
      {/* Témoignages */}
      <section className="py-24 bg-white" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold tracking-wide uppercase text-black">Témoignages</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Ce que disent nos utilisateurs
            </p>
          </div>
          
          <div className="grid gap-10 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                avatar={testimonial.avatar}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing */}
      <section className="py-24 bg-gray-50" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold tracking-wide uppercase text-black">Tarification</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Des forfaits adaptés à vos besoins
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Choisissez le plan qui vous convient. Tous les forfaits incluent un essai gratuit de 14 jours.
            </p>
          </div>
          
          <div className="grid gap-10 lg:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <PricingCard 
                key={index}
                name={plan.name}
                price={plan.price}
                period={plan.period}
                features={plan.features}
                ctaText={plan.ctaText}
                ctaLink={plan.ctaLink}
                highlighted={plan.highlighted}
              />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-gray-500">
              Des questions sur nos forfaits? <Link to="/contact" className="font-medium text-black hover:text-gray-800">Contactez-nous</Link>
            </p>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Prêt à simplifier votre gestion des lettres de mission?</span>
              <span className="block text-gray-300 mt-1">Essayez LDM gratuitement pendant 14 jours.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 transition-all duration-200"
                >
                  Commencer maintenant
                </Link>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black border-white hover:bg-white/10 transition-all duration-200"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;