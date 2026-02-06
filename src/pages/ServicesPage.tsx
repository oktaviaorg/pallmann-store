import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnalysisBanner from '../components/AnalysisBanner';
import { CheckCircle, Award, Shield, Clock, Sparkles, Droplet } from 'lucide-react';
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from '../utils/seoSchemas';

const ServicesPage: React.FC = () => {
  const services = [
    {
      icon: <Sparkles className="w-12 h-12 text-[#b8941a]" />,
      title: 'Ponçage de parquet',
      description: 'Ponçage professionnel de tous types de parquets (massif, contrecollé, stratifié) avec équipement de pointe sans poussière. Notre technique de ponçage en trois passes successives avec grains progressifs garantit un résultat optimal : une surface parfaitement plane, lisse et prête à recevoir la finition de votre choix. Nous utilisons des machines professionnelles Pallmann et Lagler, reconnues pour leur précision et leur système d\'aspiration intégré qui capture 99% des poussières. Idéal pour redonner vie à vos parquets anciens ou préparer vos parquets neufs.',
      features: ['Ponçage sans poussière', 'Tous types de bois', 'Respect des finitions d\'origine']
    },
    {
      icon: <Droplet className="w-12 h-12 text-[#b8941a]" />,
      title: 'Vitrification',
      description: 'Application de vitrification haute qualité pour protéger et sublimer votre parquet. Nous proposons trois niveaux de finition : mate pour un effet contemporain et discret, satinée pour un compromis élégant entre brillance et sobriété, ou brillante pour un rendu luxueux et éclatant. Nos vitrificateurs professionnels Blanchon et Bona offrent une protection exceptionnelle contre les rayures, l\'usure quotidienne et les taches. La vitrification forme une couche protectrice transparente qui facilite grandement l\'entretien au quotidien tout en valorisant le veinage naturel du bois. Garantie 10 ans en usage résidentiel normal.',
      features: ['Produits écologiques', 'Finitions sur mesure', 'Protection longue durée']
    },
    {
      icon: <Shield className="w-12 h-12 text-[#b8941a]" />,
      title: 'Rénovation complète',
      description: 'Rénovation totale de parquets anciens ou abîmés incluant diagnostic approfondi, ponçage intégral, traitement des lames endommagées, rebouchage des fissures et application de la finition professionnelle de votre choix. Nous intervenons sur des parquets ayant subi des dégâts des eaux, des rayures profondes, une usure importante ou simplement vieillis par le temps. Notre expertise nous permet de restaurer même les parquets les plus abîmés et de leur redonner leur splendeur d\'origine. Chaque projet est unique et bénéficie d\'une attention particulière pour un résultat à la hauteur de vos attentes.',
      features: ['Diagnostic gratuit', 'Devis détaillé', 'Garantie satisfaction']
    },
    {
      icon: <Clock className="w-12 h-12 text-[#b8941a]" />,
      title: 'Entretien régulier',
      description: 'Contrats d\'entretien personnalisés pour professionnels et particuliers permettant de maintenir l\'éclat et la protection de vos parquets toute l\'année. Nous proposons des interventions programmées annuelles ou bi-annuelles incluant nettoyage professionnel en profondeur, contrôle de l\'état général, application d\'une couche de vitrificateur ou d\'huile d\'entretien selon votre finition, et petites réparations si nécessaire. Particulièrement recommandé pour les commerces, restaurants, hôtels et espaces recevant du public où le passage intensif nécessite un entretien régulier pour préserver l\'esthétique et prolonger la durée de vie du parquet.',
      features: ['Interventions programmées', 'Tarifs préférentiels', 'Service personnalisé']
    },
    {
      icon: <Award className="w-12 h-12 text-[#b8941a]" />,
      title: 'Huilage et cirage',
      description: 'Traitement traditionnel à l\'huile végétale ou à la cire naturelle pour un aspect authentique, chaleureux et mat qui respecte le caractère naturel du bois. L\'huilage nourrit le bois en profondeur, fait ressortir magnifiquement les veinures et offre une finition écologique et respirante, idéale pour les parquets anciens et les essences nobles comme le chêne massif. Contrairement à la vitrification, l\'huile ne forme pas de film en surface mais imprègne les fibres du bois. Cette technique traditionnelle demande un entretien plus régulier mais permet de réparer localement les zones d\'usure sans avoir à poncer toute la surface.',
      features: ['Produits naturels', 'Finition traditionnelle', 'Effet mat chaleureux']
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-[#b8941a]" />,
      title: 'Réparation de parquet',
      description: 'Remplacement ciblé de lames abîmées, réparation experte de rayures profondes, traitement des zones endommagées par l\'eau ou les chocs, et réfection invisible des joints. Notre savoir-faire artisanal nous permet de rechercher et d\'intégrer des lames de remplacement parfaitement assorties en essence, teinte et dimensions pour un résultat esthétique impeccable. Nous réalisons également des greffes de bois pour combler les impacts, le rebouchage des fissures et des espaces entre lames, ainsi que le remplacement de plinthes. Chaque réparation est suivie d\'une finition sur mesure pour que la zone traitée se fonde naturellement avec le reste du parquet.',
      features: ['Expertise artisanale', 'Recherche de lames identiques', 'Finition invisible']
    }
  ];

  return (
    <>
      <Helmet>
        <title>Services de Ponçage et Rénovation de Parquet | Les Ponceurs Réunis</title>
        <meta name="description" content="Les Ponceurs Réunis : Découvrez nos services professionnels de ponçage, vitrification, rénovation et entretien de parquet en Alsace. Devis gratuit." />
        <link rel="canonical" href="https://ponceur-parquet.fr/services" />
        <meta property="og:title" content="Services de Ponçage et Rénovation de Parquet | Les Ponceurs Réunis" />
        <meta property="og:description" content="Les Ponceurs Réunis : Ponçage, vitrification, huilage et rénovation de parquet en Alsace. Expertise professionnelle depuis 2008." />
        <meta property="og:url" content="https://ponceur-parquet.fr/services" />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify(generateLocalBusinessSchema({
            aggregateRating: { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "127" }
          }))}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbSchema([
            { name: "Accueil", url: "https://ponceur-parquet.fr" },
            { name: "Services", url: "https://ponceur-parquet.fr/services" }
          ]))}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <Header />
        <AnalysisBanner />

        <main className="flex-grow pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Services de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d9b45a] via-[#b8941a] to-[#d9b45a]">Ponçage et Rénovation de Parquet en Alsace</span>
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Des prestations complètes pour sublimer vos parquets : ponçage professionnel, vitrification haute résistance, huilage naturel et réparations expertes. Plus de 20 ans d'expertise artisanale au service de vos sols dans toute l'Alsace.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#eee9df] to-[#f5f0e8] rounded-2xl p-8 border-2 border-gray-200 hover:border-[#d9b45a] transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <div className="mb-6 flex justify-center">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 mb-6 text-center">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                        <CheckCircle className="w-5 h-5 text-[#d9b45a] flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-2xl p-8 md:p-12 mb-8 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Envie de poncer vous-même votre parquet ?
                  </h3>
                  <p className="text-gray-700 mb-4 text-lg">
                    Louez nos <strong>ponceuses professionnelles Pallmann</strong> avec nos packs complets "Prêt à Poncer". Matériel pro utilisé par les maîtres ponceurs, incluant aspiration cyclone et toutes les machines nécessaires.
                  </p>
                  <Link
                    to="/location-ponceuse"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d9b45a] to-[#b8941a] text-white px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    Découvrir nos packs de location
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 md:p-12 mb-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
                  <Sparkles className="w-4 h-4" />
                  Nouveau Service
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Pas sûr de l'état de votre parquet ?
                </h2>
                <p className="text-gray-700 mb-6 max-w-2xl mx-auto text-lg">
                  Bénéficiez d'un diagnostic gratuit par photo ! Envoyez 2 photos de votre parquet sur WhatsApp et recevez une analyse professionnelle en 2 heures.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
                <div className="bg-white rounded-xl p-6 text-center shadow">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Prenez une Photo</h4>
                  <p className="text-sm text-gray-600">De votre parquet avec votre smartphone</p>
                </div>

                <div className="bg-white rounded-xl p-6 text-center shadow">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Envoyez sur WhatsApp</h4>
                  <p className="text-sm text-gray-600">Simple, rapide et sécurisé</p>
                </div>

                <div className="bg-white rounded-xl p-6 text-center shadow">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Recevez l'Analyse</h4>
                  <p className="text-sm text-gray-600">Diagnostic complet sous 2h</p>
                </div>
              </div>

              <div className="text-center">
                <Link
                  to="/analyse-parquet-gratuite"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:scale-105 transition-all duration-300 group"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Obtenir mon analyse gratuite
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <p className="text-sm text-gray-600 mt-4">
                  100% gratuit • Sans engagement • Réponse rapide
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-8 md:p-12 mb-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Votre parquet ne peut pas être rénové ?
                </h2>
                <p className="text-gray-700 mb-6 max-w-2xl mx-auto text-lg">
                  Si votre parquet est trop fin, stratifié ou trop abîmé pour être poncé, nous proposons des <strong>solutions de pose de parquet neuf</strong> avec des essences de qualité et des finitions sur-mesure.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
                <div className="bg-white rounded-xl p-6 text-center shadow">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Parquet Massif</h4>
                  <p className="text-sm text-gray-600">Chêne, châtaignier, teck</p>
                </div>

                <div className="bg-white rounded-xl p-6 text-center shadow">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Pose Clouée ou Collée</h4>
                  <p className="text-sm text-gray-600">Selon votre support</p>
                </div>

                <div className="bg-white rounded-xl p-6 text-center shadow">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-amber-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Motifs Traditionnels</h4>
                  <p className="text-sm text-gray-600">Chevrons, bâtons rompus...</p>
                </div>
              </div>

              <div className="text-center">
                <Link
                  to="/services/pose-parquet"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:scale-105 transition-all duration-300 group"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                  Découvrir nos solutions de pose
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-8 md:p-12 mb-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Solutions pour Problèmes Spécifiques
                </h2>
                <p className="text-gray-700 mb-6 max-w-2xl mx-auto text-lg">
                  Votre parquet présente un problème particulier ? Nous avons développé des <strong>techniques spécialisées</strong> pour traiter les situations les plus délicates.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <Link
                  to="/parquet-raye-meuble"
                  className="bg-white rounded-xl p-6 shadow hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                >
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2 text-center group-hover:text-red-600 transition-colors">
                    Parquet Rayé par Meuble
                  </h4>
                  <p className="text-sm text-gray-600 text-center">
                    Rayures profondes, traces de déplacement, impacts de meubles
                  </p>
                  <div className="text-center mt-4">
                    <span className="text-red-600 font-semibold text-sm group-hover:underline">
                      En savoir plus →
                    </span>
                  </div>
                </Link>

                <Link
                  to="/degat-urine-parquet"
                  className="bg-white rounded-xl p-6 shadow hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                >
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Droplet className="w-8 h-8 text-red-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2 text-center group-hover:text-red-600 transition-colors">
                    Dégât d'Urine sur Parquet
                  </h4>
                  <p className="text-sm text-gray-600 text-center">
                    Taches noircies, odeurs persistantes, décoloration du bois
                  </p>
                  <div className="text-center mt-4">
                    <span className="text-red-600 font-semibold text-sm group-hover:underline">
                      En savoir plus →
                    </span>
                  </div>
                </Link>

                <Link
                  to="/injection-anti-grincement-parquet"
                  className="bg-white rounded-xl p-6 shadow hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                >
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2 text-center group-hover:text-red-600 transition-colors">
                    Injection Anti-Grincement
                  </h4>
                  <p className="text-sm text-gray-600 text-center">
                    Grincements, craquements, bruits de plancher au passage
                  </p>
                  <div className="text-center mt-4">
                    <span className="text-red-600 font-semibold text-sm group-hover:underline">
                      En savoir plus →
                    </span>
                  </div>
                </Link>
              </div>

              <div className="text-center mt-8">
                <p className="text-sm text-gray-600">
                  Des techniques éprouvées pour résoudre les problèmes les plus difficiles
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#d9b45a]/10 to-[#c4a04f]/5 rounded-2xl p-8 md:p-12 border-2 border-[#d9b45a]/20 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Besoin d'un devis personnalisé ?
              </h2>
              <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
                Contactez-nous pour une estimation gratuite et sans engagement. Nous intervenons dans toute l'Alsace et les régions limitrophes.
              </p>
              <a
                href="/#formulaire"
                className="inline-block bg-gradient-to-r from-[#d9b45a] to-[#b8941a] text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
              >
                Demander un devis gratuit
              </a>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ServicesPage;
