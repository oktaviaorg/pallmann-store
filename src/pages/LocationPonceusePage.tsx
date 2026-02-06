import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { CheckCircle, Mail, Phone, MapPin, Clock, Package, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Pack {
  id: string;
  name: string;
  subtitle: string;
  machines: string[];
  dailyRate: number;
  weekendRate: number;
  idealFor: string;
  color: 'gold' | 'red';
}

interface Machine {
  id: string;
  name: string;
  description: string;
  dailyRate: number;
  weekendRate: number;
  image: string;
}

const packs: Pack[] = [
  {
    id: 'standard',
    name: 'Pack prêt à poncer Standard',
    subtitle: 'Pour parquets en bon état',
    machines: [
      'PALLMANN SPIDER (ponceuse multi-disques)',
      'Bordureuse',
      'Ponçeuse d\'angle',
      'Aspirateur + cyclone',
      'Grattoir manuel pour les coins "impossibles"'
    ],
    dailyRate: 220,
    weekendRate: 440,
    idealFor: 'Un appartement ou une maison de taille standard, parquet en bon état général, ponçage + finition sur un week-end.',
    color: 'gold'
  },
  {
    id: 'intensif',
    name: 'Pack prêt à poncer Intensif',
    subtitle: 'Avec ponceuse lourde',
    machines: [
      'PALLMANN SPIDER (finitions & planéité)',
      'Ponceuse lourde type Cobra ou Bona (gros enlèvement)',
      'Bordureuse',
      'Ponçeuse d\'angle',
      'Aspirateur + cyclone',
      'Grattoir manuel'
    ],
    dailyRate: 330,
    weekendRate: 550,
    idealFor: 'Parquet très abîmé, colle de moquette, grosses différences de niveau, plusieurs pièces à traiter.',
    color: 'red'
  }
];

const individualMachines: Machine[] = [
  {
    id: 'spider',
    name: 'PALLMANN SPIDER + aspirateur',
    description: 'Ponceuse multi-disques idéale pour les finitions, le rattrapage des vagues et le rendu "haut de gamme". Toujours louée avec un aspirateur + cyclone pour limiter au maximum la poussière.',
    dailyRate: 73,
    weekendRate: 146,
    image: 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/PALLMANN_SPIDERt.jpg'
  },
  {
    id: 'bordureuse',
    name: 'Bordureuse + aspirateur',
    description: 'Pour les bords de pièces, les dessous de radiateurs, les zones où la Spider ne passe pas. Toujours louée avec l\'aspiration.',
    dailyRate: 40,
    weekendRate: 80,
    image: 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/LPONPB-bordeuse-parquet-lagler-flip-1-800x800-1.jpg'
  },
  {
    id: 'lourde',
    name: 'Ponceuse lourde (Cobra ou Bona) + aspirateur',
    description: 'Machine de ponçage à bande pour enlever rapidement les anciennes finitions, colles, vernis épais ou parquets très marqués.',
    dailyRate: 110,
    weekendRate: 220,
    image: 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/bona-belt-ux.webp'
  },
  {
    id: 'angle',
    name: 'Ponçeuse d\'angle',
    description: 'Pour les coins, marches, recoins d\'escalier, zones difficiles d\'accès. Parfaite en complément d\'un pack.',
    dailyRate: 32,
    weekendRate: 64,
    image: 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/51U47wwEl2L._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: 'aspirateur',
    name: 'Aspirateur + cyclone seul',
    description: 'Vous avez déjà la machine, mais pas l\'aspiration ? L\'aspirateur avec cyclone limite drastiquement la poussière et protège le moteur des ponceuses.',
    dailyRate: 73,
    weekendRate: 146,
    image: 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/consultant_teaser_dust_extraction.jpg'
  },
  {
    id: 'grattoir',
    name: 'Grattoir manuel',
    description: 'Indispensable pour les angles ultra serrés, les petites zones de colle ou les détails que les machines n\'attrapent pas.',
    dailyRate: 6,
    weekendRate: 12,
    image: 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/grattoir-triangulaire-6-cm-manche-bois-l-outil-parfait.jpg'
  }
];

export default function LocationPonceusePage() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const handleReservation = (itemName: string) => {
    setSelectedItem(itemName);
    setShowContactForm(true);
  };

  return (
    <>
      <Helmet>
        <title>Location Ponceuse Pallmann - Packs Prêt à Poncer | Alsace</title>
        <meta name="description" content="Location de ponceuses professionnelles Pallmann en Alsace. Packs complets prêt à poncer ou machines individuelles. Spider, Cobra, Bona. Livraison Colmar, Mulhouse, Strasbourg." />
        <meta name="keywords" content="location ponceuse Pallmann, pack ponçage parquet, Pallmann Spider location, location matériel parquet Alsace, ponceuse Cobra location Colmar" />
        <link rel="canonical" href="https://ponceur-parquet.fr/location-ponceuse" />
        <meta property="og:title" content="Location Ponceuse Pallmann - Packs Prêt à Poncer | Alsace" />
        <meta property="og:description" content="Location de ponceuses professionnelles Pallmann en Alsace. Packs complets prêt à poncer ou machines individuelles." />
        <meta property="og:url" content="https://ponceur-parquet.fr/location-ponceuse" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=630&fit=crop" />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Location Ponceuse Pallmann - Packs Prêt à Poncer",
            "description": "Location de ponceuses professionnelles Pallmann en Alsace. Packs complets prêt à poncer avec Spider, bordureuse, aspirateur.",
            "image": "https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/PALLMANN_SPIDERt.jpg",
            "brand": {
              "@type": "Brand",
              "name": "Pallmann"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "47",
              "bestRating": "5",
              "worstRating": "1"
            },
            "review": [
              {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "Jean-Pierre M."
                },
                "datePublished": "2025-11-15",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                },
                "reviewBody": "Matériel de qualité professionnelle, la Pallmann Spider est un plaisir à utiliser. Pack complet et bien entretenu."
              },
              {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "Marie C."
                },
                "datePublished": "2025-10-28",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                },
                "reviewBody": "Excellente location, machines en parfait état. Les conseils fournis m'ont permis de réussir mon ponçage."
              }
            ],
            "offers": [
              {
                "@type": "Offer",
                "name": "Pack Standard",
                "description": "Pack prêt à poncer Standard avec Pallmann Spider, bordureuse, ponceuse d'angle, aspirateur + cyclone",
                "price": "220",
                "priceCurrency": "EUR",
                "availability": "https://schema.org/InStock",
                "priceValidUntil": "2026-12-31",
                "priceSpecification": {
                  "@type": "UnitPriceSpecification",
                  "price": "220",
                  "priceCurrency": "EUR",
                  "unitText": "jour"
                },
                "seller": {
                  "@type": "LocalBusiness",
                  "name": "Les Ponceurs Réunis"
                },
                "shippingDetails": {
                  "@type": "OfferShippingDetails",
                  "shippingRate": {
                    "@type": "MonetaryAmount",
                    "value": "0",
                    "currency": "EUR"
                  },
                  "shippingDestination": {
                    "@type": "DefinedRegion",
                    "addressCountry": "FR",
                    "addressRegion": ["Grand Est"]
                  },
                  "deliveryTime": {
                    "@type": "ShippingDeliveryTime",
                    "businessDays": {
                      "@type": "OpeningHoursSpecification",
                      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
                    },
                    "cutoffTime": "17:00:00",
                    "handlingTime": {
                      "@type": "QuantitativeValue",
                      "minValue": 0,
                      "maxValue": 1,
                      "unitCode": "DAY"
                    }
                  }
                },
                "hasMerchantReturnPolicy": {
                  "@type": "MerchantReturnPolicy",
                  "applicableCountry": "FR",
                  "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                  "merchantReturnDays": 1,
                  "returnMethod": "https://schema.org/ReturnByMail",
                  "returnFees": "https://schema.org/FreeReturn"
                }
              },
              {
                "@type": "Offer",
                "name": "Pack Intensif",
                "description": "Pack prêt à poncer Intensif avec ponceuse lourde Cobra/Bona, Spider, bordureuse, aspirateur",
                "price": "330",
                "priceCurrency": "EUR",
                "availability": "https://schema.org/InStock",
                "priceValidUntil": "2026-12-31",
                "priceSpecification": {
                  "@type": "UnitPriceSpecification",
                  "price": "330",
                  "priceCurrency": "EUR",
                  "unitText": "jour"
                },
                "seller": {
                  "@type": "LocalBusiness",
                  "name": "Les Ponceurs Réunis"
                },
                "shippingDetails": {
                  "@type": "OfferShippingDetails",
                  "shippingRate": {
                    "@type": "MonetaryAmount",
                    "value": "0",
                    "currency": "EUR"
                  },
                  "shippingDestination": {
                    "@type": "DefinedRegion",
                    "addressCountry": "FR",
                    "addressRegion": ["Grand Est"]
                  },
                  "deliveryTime": {
                    "@type": "ShippingDeliveryTime",
                    "businessDays": {
                      "@type": "OpeningHoursSpecification",
                      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
                    },
                    "cutoffTime": "17:00:00",
                    "handlingTime": {
                      "@type": "QuantitativeValue",
                      "minValue": 0,
                      "maxValue": 1,
                      "unitCode": "DAY"
                    }
                  }
                },
                "hasMerchantReturnPolicy": {
                  "@type": "MerchantReturnPolicy",
                  "applicableCountry": "FR",
                  "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                  "merchantReturnDays": 1,
                  "returnMethod": "https://schema.org/ReturnByMail",
                  "returnFees": "https://schema.org/FreeReturn"
                }
              }
            ],
            "category": "Location matériel ponçage parquet",
            "manufacturer": {
              "@type": "Organization",
              "name": "Pallmann"
            }
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Location de ponceuses professionnelles",
            "name": "Location Ponceuse Pallmann Alsace",
            "description": "Location de ponceuses professionnelles Pallmann (Spider, Cobra, Bona) pour particuliers et professionnels en Alsace",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Les Ponceurs Réunis - RENO'LINE",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "6 rue du Commerce",
                "addressLocality": "Herrlisheim-près-Colmar",
                "postalCode": "68420",
                "addressCountry": "FR"
              },
              "telephone": "+33-3-88-49-30-74",
              "email": "contact@poncages.fr"
            },
            "areaServed": [
              {
                "@type": "City",
                "name": "Colmar"
              },
              {
                "@type": "City",
                "name": "Mulhouse"
              },
              {
                "@type": "City",
                "name": "Strasbourg"
              },
              {
                "@type": "State",
                "name": "Alsace"
              }
            ],
            "offers": {
              "@type": "AggregateOffer",
              "lowPrice": "220",
              "highPrice": "330",
              "priceCurrency": "EUR"
            }
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Accueil",
                "item": "https://ponceur-parquet.fr"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Location Ponceuse",
                "item": "https://ponceur-parquet.fr/location-ponceuse"
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-block bg-[#d9b45a]/10 border border-[#d9b45a] text-[#d9b45a] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Matériel professionnel Pallmann
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Location Ponceuses Pallmann
              <span className="block text-[#d9b45a] mt-2">Packs Prêt à Poncer</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Un week-end pour refaire tout votre parquet, sans vous prendre la tête à choisir la machine ? On vous a préparé deux packs clés en main, avec tout ce qu'il faut pour poncer proprement, y compris l'aspiration.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#packs"
                className="bg-[#d9b45a] hover:bg-[#c9a54a] text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl"
              >
                Voir les packs
              </a>
              <a
                href="tel:0757821306"
                className="bg-white text-slate-900 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                07 57 82 13 06
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Packs Section */}
        <div id="packs" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Packs "Prêt à poncer"
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tout le matériel nécessaire pour poncer votre parquet en un week-end
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {packs.map((pack) => (
              <div
                key={pack.id}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden border-4 ${
                  pack.color === 'gold' ? 'border-[#d9b45a]' : 'border-red-600'
                }`}
              >
                <div
                  className={`p-6 text-white ${
                    pack.color === 'gold'
                      ? 'bg-gradient-to-br from-[#d9b45a] to-[#c9a54a]'
                      : 'bg-gradient-to-br from-red-600 to-red-700'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <Package className="w-10 h-10" />
                    {pack.color === 'gold' && (
                      <span className="bg-white text-[#d9b45a] px-3 py-1 rounded-full text-sm font-bold">
                        POPULAIRE
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{pack.name}</h3>
                  <p className="text-white/90">{pack.subtitle}</p>
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Wrench className="w-5 h-5 text-[#d9b45a]" />
                      Inclus dans le pack :
                    </h4>
                    <ul className="space-y-2">
                      {pack.machines.map((machine, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{machine}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <div className="text-center mb-4">
                      <div className="text-sm text-gray-600 mb-1">À partir de</div>
                      <div className="text-5xl font-bold text-gray-900 mb-1">
                        {pack.dailyRate}€
                      </div>
                      <div className="text-gray-600">TTC / jour</div>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-semibold">Pack week-end</span>
                        <span className="text-2xl font-bold text-[#d9b45a]">{pack.weekendRate}€</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Vendredi soir → Lundi matin
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <div className="text-sm font-semibold text-gray-900 mb-2">Idéal pour :</div>
                    <p className="text-sm text-gray-700">{pack.idealFor}</p>
                  </div>

                  <button
                    onClick={() => handleReservation(pack.name)}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl ${
                      pack.color === 'gold'
                        ? 'bg-[#d9b45a] hover:bg-[#c9a54a] text-slate-900'
                        : 'bg-red-600 hover:bg-red-700 text-white'
                    }`}
                  >
                    Réserver ce pack
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Individual Machines Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Louer les machines individuellement
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Vous avez déjà une partie du matériel ou vous voulez compléter un pack ? Vous pouvez aussi louer chaque machine à l'unité, toujours avec aspiration incluse pour les grosses machines.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {individualMachines.map((machine) => (
              <div
                key={machine.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={machine.image}
                    alt={machine.name}
                    className="w-full h-full object-cover transition-transform hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-bold text-gray-900 shadow-lg">
                    {machine.dailyRate}€/j
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{machine.name}</h3>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3">{machine.description}</p>

                  <div className="flex items-center justify-between mb-4 pb-4 border-b">
                    <div>
                      <div className="text-sm text-gray-500">Journée</div>
                      <div className="text-2xl font-bold text-gray-900">{machine.dailyRate}€</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Week-end</div>
                      <div className="text-xl font-bold text-[#d9b45a]">{machine.weekendRate}€</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/location-ponceuse/${machine.id}`}
                      className="flex-1 bg-white border-2 border-slate-900 hover:bg-slate-50 text-slate-900 py-3 rounded-lg font-semibold transition-colors text-center"
                    >
                      Détails
                    </Link>
                    <button
                      onClick={() => handleReservation(machine.name)}
                      className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                      Louer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-20 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-3xl font-bold mb-8 text-center">Pourquoi louer chez Les Ponceurs Réunis ?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: 'Matériel professionnel',
                description: 'Machines Pallmann utilisées par les meilleurs artisans',
                icon: '⭐'
              },
              {
                title: 'Aspiration incluse',
                description: 'Chantier propre garanti avec aspirateur + cyclone',
                icon: '💨'
              },
              {
                title: 'Conseils d\'expert',
                description: 'Support technique et démonstration sur place',
                icon: '💡'
              },
              {
                title: 'Livraison possible',
                description: 'Sur Colmar, Mulhouse, Strasbourg et toute l\'Alsace',
                icon: '🚚'
              }
            ].map((benefit, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Besoin d'un conseil ?</h2>
              <p className="text-gray-600 mb-8">
                Notre équipe d'experts est à votre disposition pour vous conseiller sur le choix du matériel adapté à votre projet. Disponibilité immédiate, livraison rapide en Alsace.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-[#d9b45a] flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Téléphone</div>
                    <a href="tel:0757821306" className="text-[#d9b45a] hover:underline text-lg font-bold">07 57 82 13 06</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-[#d9b45a] flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Email</div>
                    <a href="mailto:contact@poncages.fr" className="text-[#d9b45a] hover:underline">contact@poncages.fr</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-[#d9b45a] flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Zone d'intervention</div>
                    <div className="text-gray-600">Colmar, Mulhouse, Strasbourg et toute l'Alsace</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-[#d9b45a] flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Horaires</div>
                    <div className="text-gray-600">Lun-Ven : 8h-18h | Sam : 9h-12h</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Demande de réservation</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none transition-all"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none transition-all"
                    placeholder="votre@email.fr"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none transition-all"
                    placeholder="06 12 34 56 78"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Machine(s) souhaitée(s)</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none transition-all">
                    <option>Sélectionnez...</option>
                    <option>Pack Standard</option>
                    <option>Pack Intensif</option>
                    <option>Pallmann Spider</option>
                    <option>Bordureuse</option>
                    <option>Ponceuse lourde</option>
                    <option>Autre / Conseil</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none transition-all"
                    placeholder="Décrivez votre projet..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#d9b45a] hover:bg-[#c9a54a] text-slate-900 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg"
                >
                  Envoyer ma demande
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* SEO Text Section */}
        <div className="mt-16 prose prose-lg max-w-none bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Location de ponceuses Pallmann professionnelles en Alsace</h2>

          <p className="text-gray-700 leading-relaxed mb-4">
            Tous nos <strong>packs de location ponceuse parquet</strong> sont basés sur du matériel Pallmann professionnel, le même que celui utilisé par les maîtres ponceurs. Vous pouvez louer une <strong>ponceuse Pallmann Spider</strong>, une ponceuse lourde type Cobra ou Bona, une bordureuse ou une ponceuse d'angle, toujours avec un aspirateur adapté.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            La <strong>Pallmann Spider</strong> est la référence absolue pour le ponçage fin et les finitions haut de gamme. Son système multi-disques garantit un résultat parfaitement uniforme, sans vagues ni creux, même sur les parquets anciens les plus délicats. <Link to="/blog/location-ponceuse-parquet-professionnelle-pallmann-spider-vs-kiloutou" className="text-[#b8941a] hover:text-[#d9b45a] font-semibold underline">Découvrez pourquoi la Pallmann Spider surpasse les ponceuses Kiloutou</Link>.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            Pour les travaux de dégrossissage sur parquets très abîmés, nos <strong>ponceuses lourdes Cobra ou Bona</strong> permettent un décapage rapide et efficace tout en préservant l'intégrité du bois.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Nos <strong>locations de ponceuses</strong> sont disponibles sur Colmar, Mulhouse, Strasbourg et toute l'Alsace, avec possibilité de retrait en agence ou de livraison sur demande. Matériel entretenu et vérifié avant chaque location, support technique inclus.
          </p>

          <div className="bg-[#d9b45a]/10 border-l-4 border-[#d9b45a] p-6 rounded-r-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Besoin d'un conseil avant de louer ?</h3>
            <p className="text-gray-700 mb-4">
              Vous hésitez sur le pack à choisir ? Pas sûr de l'état de votre parquet ? Envoyez-nous 2 photos et obtenez un diagnostic gratuit en 2h.
            </p>
            <Link
              to="/analyse-parquet-gratuite"
              className="inline-flex items-center gap-2 bg-[#d9b45a] hover:bg-[#c9a54a] text-slate-900 px-6 py-3 rounded-lg font-bold transition-colors"
            >
              Analyse gratuite par photo
            </Link>
          </div>
        </div>

      </div>

      <Footer />

      {/* Contact Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Réservation : {selectedItem}</h3>
              <button
                onClick={() => setShowContactForm(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-600 mb-4">Remplissez ce formulaire et nous vous recontactons rapidement pour finaliser votre réservation.</p>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Nom complet"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none"
              />
              <input
                type="tel"
                placeholder="Téléphone"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dates souhaitées</label>
                <input
                  type="text"
                  placeholder="Ex: 20-22 décembre"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none"
                />
              </div>
              <textarea
                rows={3}
                placeholder="Informations complémentaires..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-[#d9b45a] hover:bg-[#c9a54a] text-slate-900 py-3 rounded-lg font-bold transition-colors"
              >
                Envoyer ma demande
              </button>
            </form>
          </div>
        </div>
      )}
      </div>
    </>
  );
}
