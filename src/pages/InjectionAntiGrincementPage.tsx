import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  CheckCircle,
  Award,
  Clock,
  Phone,
  Mail,
  Star,
  Shield,
  Users,
  TrendingUp,
  Volume2,
  VolumeX,
  Wrench,
  ArrowRight,
  MessageSquare,
  AlertCircle,
  Sparkles,
  Timer,
  Euro,
  ChevronDown
} from 'lucide-react';

const InjectionAntiGrincementPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    surface: '',
    message: ''
  });

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "Comment fonctionne l'injection contre le grincement de parquet ?",
      answer: "Nous perçons des trous microscopiques (1-2mm) dans les jointures du parquet. Nous y injectons sous pression une résine spécifique qui comble les vides entre la lambourde et la latte. En durcissant, la résine stabilise le bois et élimine le frottement responsable du bruit. C'est une solution chirurgicale précise qui traite la cause profonde du grincement."
    },
    {
      question: "Est-ce que l'injection abîme le parquet ?",
      answer: "Non. C'est une technique mini-invasive. Les trous d'injection sont quasi invisibles et rebouchés à la teinte exacte de votre bois. Aucune latte n'est retirée. Contrairement à un démontage complet qui risque d'endommager votre parquet ancien, notre méthode préserve l'intégrité et la valeur patrimoniale de votre sol."
    },
    {
      question: "Quel est le prix pour réparer un parquet qui grince ?",
      answer: "Chez Les Ponceurs Réunis, nos solutions démarrent à 150€ HT par zone d'injection (environ 0,5 m²). Pour une pièce complète, nous réalisons un devis sur mesure en fonction du nombre de zones lâches. Ce tarif inclut le diagnostic, l'injection de résine professionnelle, et le rebouchage esthétique des points d'injection."
    },
    {
      question: "La réparation est-elle durable dans le temps ?",
      answer: "Oui. Contrairement au talc, à l'huile ou aux cales de bois (solutions temporaires), l'injection fixe mécaniquement le bois de manière permanente. La résine que nous utilisons a une durée de vie de plusieurs décennies. Nous observons une réduction de 90% du bruit, et cette performance se maintient dans le temps grâce à la stabilité chimique de la résine."
    },
    {
      question: "Intervenez-vous partout en France ?",
      answer: "Oui. En tant que référents nationaux sur cette technique pointue, nos équipes se déplacent dans toute la France pour traiter vos parquets anciens. Que vous soyez à Paris, Lyon, Bordeaux, Marseille, Strasbourg ou dans n'importe quelle région, nous intervenons pour vos chantiers de prestige ou vos projets de rénovation particuliers."
    },
    {
      question: "Combien de temps dure l'intervention ?",
      answer: "Pour une zone de passage standard (couloir, zone devant porte), comptez 2 à 3 heures d'intervention. La résine sèche rapidement : vous pouvez remarcher sur votre parquet 2 heures après l'injection. Aucun démontage de meubles n'est nécessaire, nous travaillons de manière ciblée sur les zones problématiques."
    },
    {
      question: "Quelle est la différence avec les méthodes traditionnelles ?",
      answer: "Les méthodes traditionnelles (talc, huile, cales) sont temporaires et inefficaces. Le démontage complet est coûteux (plusieurs milliers d'euros), long (plusieurs jours) et risqué pour les parquets anciens. Notre injection est la solution moderne : rapide, propre, sans poussière, et définitive. C'est la technique utilisée par les restaurateurs du patrimoine historique."
    }
  ];

  const processSteps = [
    {
      number: "1",
      title: "Diagnostic Acoustique",
      description: "Nous identifions précisément les zones problématiques en testant chaque latte."
    },
    {
      number: "2",
      title: "Perçage Micro-Invasif",
      description: "Des trous de 1-2mm sont réalisés aux jointures stratégiques."
    },
    {
      number: "3",
      title: "Injection Sous Pression",
      description: "La résine expansive est injectée jusqu'à saturation complète des vides."
    },
    {
      number: "4",
      title: "Finition Invisible",
      description: "Les points d'injection sont rebouchés et teintés pour disparaître."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#fafaf8] to-white">
      <Helmet>
        <title>Injection Anti-Grincement Parquet | Solution Définitive | Les Ponceurs Réunis</title>
        <meta
          name="description"
          content="⭐ Injection de résine anti-grincement pour parquet ancien : technique mini-invasive, durable, sans démontage. Réduction de 90% du bruit. Précurseurs en France. Intervention nationale. Devis gratuit ☎️ 07 57 82 13 06. À partir de 150€ HT."
        />
        <meta
          name="keywords"
          content="injection parquet grincement, réparation parquet qui grince, stopper grincement parquet, injection résine parquet ancien, solution anti-bruit parquet, parquet qui craque réparation, technique injection parquet, réparer grincement sans démonter"
        />
        <link rel="canonical" href="https://ponceur-parquet.fr/injection-anti-grincement-parquet" />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="Injection Anti-Grincement Parquet | Solution Définitive par Les Ponceurs Réunis" />
        <meta property="og:description" content="Technique d'injection de résine pour stopper définitivement les grincements de parquet ancien. Sans démontage, sans poussière. Intervention nationale." />
        <meta property="og:url" content="https://ponceur-parquet.fr/injection-anti-grincement-parquet" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/avatar%20injection.png" />
        <meta property="og:locale" content="fr_FR" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Injection Anti-Grincement Parquet",
            "name": "Injection Anti-Grincement Parquet",
            "description": "Technique d'injection de résine expansive pour éliminer définitivement les grincements de parquet ancien. Solution mini-invasive, sans démontage, avec garantie de résultat. Réduction de 90% du bruit.",
            "provider": {
              "@type": "LocalBusiness",
              "@id": "https://ponceur-parquet.fr/#business",
              "name": "Les Ponceurs Réunis",
              "telephone": "+33757821306",
              "email": "contact@poncages.fr",
              "priceRange": "€€",
              "areaServed": "France"
            },
            "url": "https://ponceur-parquet.fr/injection-anti-grincement-parquet",
            "offers": {
              "@type": "Offer",
              "price": "150",
              "priceCurrency": "EUR",
              "availability": "https://schema.org/InStock",
              "description": "Injection de résine anti-grincement pour parquet ancien - Tarif à partir de 150€ HT par zone d'injection (environ 0,5 m²)"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5.0",
              "reviewCount": "5",
              "bestRating": "5",
              "worstRating": "1"
            }
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems.map(item => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
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
                "item": {
                  "@type": "WebPage",
                  "@id": "https://ponceur-parquet.fr",
                  "name": "Accueil"
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": {
                  "@type": "WebPage",
                  "@id": "https://ponceur-parquet.fr/services",
                  "name": "Services"
                }
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Injection Anti-Grincement",
                "item": {
                  "@type": "WebPage",
                  "@id": "https://ponceur-parquet.fr/injection-anti-grincement-parquet",
                  "name": "Injection Anti-Grincement"
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <Header />

      <main className="flex-grow">
        <section className="relative isolate overflow-hidden pt-24 pb-16 md:pt-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f1b2b] via-[#1a2b3d] to-[#0f1b2b]" />
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d9b45a' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d9b45a]/20 border border-[#d9b45a]/30 rounded-full mb-6">
                  <Award className="w-4 h-4 text-[#d9b45a]" />
                  <span className="text-sm font-medium text-[#d9b45a]">Précurseurs de la Technique en France</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Injection Anti-Grincement
                  <span className="block text-[#d9b45a] mt-2">La Solution Définitive</span>
                </h1>

                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Stoppez définitivement les grincements de votre parquet ancien avec notre technique d'injection de résine.
                  Sans démontage, sans poussière, réduction de 90% du bruit garantie.
                </p>

                <div className="bg-white/10 backdrop-blur-sm border-2 border-[#d9b45a]/30 rounded-xl p-6 mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <Volume2 className="w-6 h-6 text-red-400" />
                    <p className="text-lg font-semibold text-red-300">Le Problème</p>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Votre parquet grince à chaque pas ? Les lattes bougent, les clous craquent, chaque mouvement réveille toute la maison ?
                  </p>
                  <div className="flex items-center gap-3">
                    <VolumeX className="w-6 h-6 text-green-400" />
                    <p className="text-lg font-semibold text-green-300">Notre Solution</p>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Injection chirurgicale de résine qui fixe mécaniquement les lattes. Silencieux, rapide, définitif.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:+33757821306"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#d9b45a] to-[#b8941a] text-[#0f1b2b] rounded-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
                  >
                    <Phone className="w-5 h-5" />
                    07 57 82 13 06
                  </a>
                  <a
                    href="#devis"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white border-2 border-white/30 rounded-xl font-bold hover:bg-white/20 transition-all duration-300 text-lg backdrop-blur-sm"
                  >
                    Diagnostic Gratuit
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="relative lg:pl-8">
                <div className="absolute -top-8 -left-8 w-full h-full bg-gradient-to-br from-[#d9b45a]/20 to-transparent rounded-3xl blur-3xl"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                  <img
                    src="https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/avatar%20injection.png"
                    alt="Technique d'injection anti-grincement pour parquet ancien - Les Ponceurs Réunis"
                    className="w-full h-[500px] lg:h-[600px] object-cover"
                    loading="eager"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-2xl p-6 border-4 border-[#d9b45a]/30">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-[#d9b45a] mb-1">90%</p>
                    <p className="text-base text-gray-600 font-semibold">Réduction du bruit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Pourquoi Les Ponceurs Réunis ?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Référents nationaux de la technique d'injection anti-grincement
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-[#eee9df] to-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:border-[#d9b45a] transition-all hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-[#d9b45a] to-[#b8941a] rounded-xl flex items-center justify-center mb-4">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Précurseurs</h3>
                <p className="text-gray-600 text-sm">
                  Nous avons perfectionné cette technique avant qu'elle ne devienne standard. Expertise unique en France.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#eee9df] to-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:border-[#d9b45a] transition-all hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-[#d9b45a] to-[#b8941a] rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Intervention Nationale</h3>
                <p className="text-gray-600 text-sm">
                  Nous nous déplaçons partout en France pour vos chantiers de prestige ou projets particuliers exigeants.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#eee9df] to-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:border-[#d9b45a] transition-all hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-[#d9b45a] to-[#b8941a] rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Garantie Résultat</h3>
                <p className="text-gray-600 text-sm">
                  Satisfaction garantie avec réduction drastique des décibels. Technique durable sur plusieurs décennies.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#eee9df] to-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:border-[#d9b45a] transition-all hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-[#d9b45a] to-[#b8941a] rounded-xl flex items-center justify-center mb-4">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Sans Démontage</h3>
                <p className="text-gray-600 text-sm">
                  Aucune latte retirée, aucun meuble à déplacer. Propre, rapide, sans poussière. Résultat immédiat.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-white to-[#fafaf8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Le Processus d'Injection
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Une intervention chirurgicale précise pour votre parquet
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100 h-full">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#d9b45a] to-[#b8941a] rounded-full flex items-center justify-center mb-4 text-white text-2xl font-bold">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#d9b45a]/30" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#d9b45a]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Timer className="w-8 h-8 text-[#d9b45a]" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-2">2-3h</p>
                  <p className="text-gray-600">Durée d'intervention</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#d9b45a]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-[#d9b45a]" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-2">2h</p>
                  <p className="text-gray-600">Séchage de la résine</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#d9b45a]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <VolumeX className="w-8 h-8 text-[#d9b45a]" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-2">90%</p>
                  <p className="text-gray-600">Réduction du bruit</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#fafaf8]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Tarifs Transparents
              </h2>
              <p className="text-xl text-gray-600">
                Une solution accessible pour retrouver le silence
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-[#d9b45a]">
              <div className="bg-gradient-to-r from-[#d9b45a] to-[#b8941a] px-8 py-6">
                <h3 className="text-2xl font-bold text-[#0f1b2b] text-center">Injection Anti-Grincement</h3>
              </div>
              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Euro className="w-8 h-8 text-[#d9b45a]" />
                    <p className="text-5xl font-bold text-gray-900">150€</p>
                    <span className="text-gray-600 text-xl">HT</span>
                  </div>
                  <p className="text-gray-600 text-lg">par zone d'injection (environ 0,5 m²)</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#d9b45a] flex-shrink-0 mt-1" />
                    <p className="text-gray-700">Diagnostic acoustique complet de la zone</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#d9b45a] flex-shrink-0 mt-1" />
                    <p className="text-gray-700">Injection de résine professionnelle haute qualité</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#d9b45a] flex-shrink-0 mt-1" />
                    <p className="text-gray-700">Rebouchage et finition teintée invisible</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#d9b45a] flex-shrink-0 mt-1" />
                    <p className="text-gray-700">Garantie de résultat sur la réduction du bruit</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#d9b45a] flex-shrink-0 mt-1" />
                    <p className="text-gray-700">Intervention rapide sans démontage ni poussière</p>
                  </div>
                </div>

                <div className="bg-[#eee9df] rounded-xl p-6 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-[#d9b45a] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">Pour une pièce complète</p>
                      <p className="text-gray-700 text-sm">
                        Nous réalisons un devis sur mesure en fonction du nombre de zones problématiques.
                        En moyenne, comptez 3 à 5 zones d'injection pour une pièce standard de 15-20m².
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href="#devis"
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#d9b45a] to-[#b8941a] text-[#0f1b2b] rounded-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
                >
                  <MessageSquare className="w-5 h-5" />
                  Demander un Devis Gratuit
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Questions Fréquentes
              </h2>
              <p className="text-xl text-gray-600">
                Tout ce que vous devez savoir sur l'injection anti-grincement
              </p>
            </div>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-[#eee9df] to-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/50 transition-all"
                  >
                    <h3 className="text-lg font-bold text-gray-900 pr-4">{item.question}</h3>
                    <ChevronDown
                      className={`w-6 h-6 text-[#d9b45a] flex-shrink-0 transition-transform duration-300 ${
                        openFaqIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}
                  >
                    <div className="px-6 pb-5">
                      <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-white to-[#fafaf8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Avantages de Notre Technique
              </h2>
              <p className="text-xl text-gray-600">
                Pourquoi l'injection est supérieure aux méthodes traditionnelles
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="w-10 h-10 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Méthodes Anciennes</h3>
                <ul className="text-left space-y-2 text-sm text-gray-600">
                  <li>❌ Talc : Effet temporaire de quelques semaines</li>
                  <li>❌ Huile : Salit le bois et inefficace</li>
                  <li>❌ Cales : Visibles et peu esthétiques</li>
                  <li>❌ Démontage : Coûteux (plusieurs milliers €)</li>
                  <li>❌ Risque d'endommager le parquet ancien</li>
                </ul>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Notre Injection</h3>
                <ul className="text-left space-y-2 text-sm text-gray-700 font-medium">
                  <li>✅ Solution définitive (décennies)</li>
                  <li>✅ Sans démontage ni poussière</li>
                  <li>✅ Finition invisible</li>
                  <li>✅ Tarif accessible (dès 150€)</li>
                  <li>✅ Préserve la valeur patrimoniale</li>
                </ul>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-[#d9b45a]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-10 h-10 text-[#d9b45a]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Résultats Prouvés</h3>
                <ul className="text-left space-y-2 text-sm text-gray-700">
                  <li>🏆 Utilisée par les restaurateurs du patrimoine</li>
                  <li>🏆 Technique approuvée monuments historiques</li>
                  <li>🏆 90% de réduction du bruit mesurée</li>
                  <li>🏆 Satisfaction client 5/5</li>
                  <li>🏆 Aucun retour ou réclamation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#0f1b2b] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Services Complémentaires
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Découvrez nos autres expertises en rénovation de parquet
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                to="/services"
                className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl p-6 hover:bg-white/20 hover:border-[#d9b45a] transition-all group"
              >
                <Sparkles className="w-12 h-12 text-[#d9b45a] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">Ponçage & Vitrification</h3>
                <p className="text-sm text-gray-300">Sans poussière, finitions écologiques</p>
              </Link>
              <Link
                to="/services/pose-parquet"
                className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl p-6 hover:bg-white/20 hover:border-[#d9b45a] transition-all group"
              >
                <Wrench className="w-12 h-12 text-[#d9b45a] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">Pose de Parquet</h3>
                <p className="text-sm text-gray-300">Massif, contrecollé, point de Hongrie</p>
              </Link>
              <Link
                to="/blog"
                className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl p-6 hover:bg-white/20 hover:border-[#d9b45a] transition-all group"
              >
                <MessageSquare className="w-12 h-12 text-[#d9b45a] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">Conseils & Blog</h3>
                <p className="text-sm text-gray-300">Guides d'entretien et astuces</p>
              </Link>
            </div>
          </div>
        </section>

        <section id="devis" className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Demandez Votre Diagnostic Gratuit
              </h2>
              <p className="text-xl text-gray-600">
                Intervention partout en France - Réponse sous 24h
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-[#eee9df] to-white rounded-2xl shadow-xl p-8 border-2 border-gray-200">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none transition-all"
                    placeholder="Jean Dupont"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none transition-all"
                    placeholder="06 12 34 56 78"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none transition-all"
                  placeholder="jean.dupont@email.com"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="address" className="block text-sm font-semibold text-gray-900 mb-2">
                  Adresse du chantier *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none transition-all"
                  placeholder="Ville et code postal"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="surface" className="block text-sm font-semibold text-gray-900 mb-2">
                  Surface approximative concernée (m²)
                </label>
                <input
                  type="number"
                  id="surface"
                  name="surface"
                  min="1"
                  value={formData.surface}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none transition-all"
                  placeholder="20"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                  Description du problème *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none transition-all resize-none"
                  placeholder="Décrivez où se situent les grincements, leur intensité, depuis quand..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-[#d9b45a] to-[#b8941a] text-[#0f1b2b] rounded-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Obtenir mon Diagnostic Gratuit
              </button>

              <p className="text-sm text-gray-500 text-center mt-4">
                Vos données sont sécurisées et ne seront jamais partagées
              </p>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">Ou contactez-nous directement :</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+33757821306"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0f1b2b] text-white rounded-xl font-bold hover:bg-[#1a2b3d] transition-all"
                >
                  <Phone className="w-5 h-5" />
                  07 57 82 13 06
                </a>
                <a
                  href="mailto:contact@poncages.fr"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#0f1b2b] text-[#0f1b2b] rounded-xl font-bold hover:bg-[#0f1b2b] hover:text-white transition-all"
                >
                  <Mail className="w-5 h-5" />
                  contact@poncages.fr
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default InjectionAntiGrincementPage;
