import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { CheckCircle, ArrowLeft, Play, Package, Wrench, Star } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface MachineDetail {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  mainFeature: string;
  sections: {
    title: string;
    content: string;
  }[];
  advantages: string[];
  dailyRate: number;
  weekendRate: number;
  videoUrl?: string;
  images: string[];
}

const machinesData: Record<string, MachineDetail> = {
  'spider': {
    id: 'spider',
    name: 'PALLMANN SPIDER',
    subtitle: 'Ponceuse multi-disques professionnelle',
    description: 'Ponceuse multi-disques idéale pour les finitions, le rattrapage des vagues et le rendu "haut de gamme". Toujours louée avec un aspirateur + cyclone pour limiter au maximum la poussière.',
    mainFeature: 'Ponçage multidirectionnel et force motrice génèrent un parquet à la surface parfaite. Extrêmement facile à manipuler, peu bruyante, notre SPIDER se distingue par ses multiples possibilités d\'utilisation. Des matériels de haute qualité et un système d\'entraînement dernière génération, avec une réserve puissance, sont déterminants pour un ponçage performant et efficace.',
    sections: [
      {
        title: 'PONÇAGE',
        content: 'La technique du triple disque de la SPIDER permet un ponçage multidirectionnel. La pression exercée peut être ajustée au cas par cas avec du poids supplémentaire et l\'équipement approprié en pad. Le réglage progressif du régime permet d\'adapter idéalement la vitesse de rotation à chaque opération de ponçage. Le plateau triple disque inclus dans la livraison est approprié pour l\'égrenage et le ponçage fin à grossier des parquets.'
      },
      {
        title: 'LUSTRAGE & DÉCRASSAGE',
        content: 'Equipée du plateau porte pad à raccord Clarke, grâce au faible poids de la machine et au réglage progressif de sa vitesse, la ponceuse SPIDER PALLMANN peut être utilisée pour divers types de travaux délicats, p.ex. pour le décrassage et le lustrage.'
      },
      {
        title: 'BROSSAGE',
        content: 'Avec les Brosses techniques PALLMANN, élaborées pour la SPIDER, la structure unique et le caractère particulier d\'un véritable parquet sont mis en valeur en un clin d\'œil. Les cernes les plus tendres sont brossés, le bois le plus dur n\'est pas modifié.'
      }
    ],
    advantages: [
      'Eclairage de la surface du parquet',
      'Réserve de puissance disponible',
      'Ajout de poids possible pour une plus grande pression exercée lors du ponçage',
      'Aspect du ponçage impeccable grâce à la technique du triple disque',
      'Transmission par chaîne robuste',
      'Facile à nettoyer grâce à sa structure accessible',
      'Réglage progressif du régime (50 à 400 trs/mn)',
      'Ponçage haute performance',
      'Démarrage en douceur',
      'Réglage pneumatique du timon',
      'Raccord pour aspirateur',
      'Construction robuste',
      'Anneau antipoussière',
      'Grandes roues, souples, dotées de roulements à billes, pour un déplacement sans trace'
    ],
    dailyRate: 73,
    weekendRate: 146,
    videoUrl: 'https://youtu.be/oj-O2IrpKJ8',
    images: [
      'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/PALLMANN_SPIDERt.jpg',
      'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/PALLMANN_SPIDERt.jpg'
    ]
  },
  'bordureuse': {
    id: 'bordureuse',
    name: 'Bordureuse professionnelle',
    subtitle: 'Pour les bords et zones difficiles',
    description: 'Pour les bords de pièces, les dessous de radiateurs, les zones où la Spider ne passe pas. Toujours louée avec l\'aspiration.',
    mainFeature: 'La bordureuse professionnelle est l\'outil indispensable pour compléter le ponçage des surfaces principales. Elle permet d\'atteindre les zones difficiles d\'accès et garantit une finition uniforme sur l\'ensemble du parquet.',
    sections: [
      {
        title: 'ZONES D\'APPLICATION',
        content: 'Parfaite pour les bordures le long des plinthes, sous les radiateurs, dans les angles et toutes les zones où les ponceuses principales ne peuvent pas accéder. Permet un travail de précision sans endommager les murs ou les plinthes.'
      },
      {
        title: 'PERFORMANCE',
        content: 'Moteur puissant et maniabilité exceptionnelle pour un ponçage efficace même dans les espaces restreints. Le système d\'aspiration intégré garantit un chantier propre.'
      }
    ],
    advantages: [
      'Légère et maniable',
      'Accès aux zones difficiles',
      'Aspiration intégrée',
      'Moteur puissant',
      'Finition parfaite',
      'Protection des plinthes',
      'Réglage facile',
      'Ergonomie optimale'
    ],
    dailyRate: 40,
    weekendRate: 80,
    images: [
      'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/LPONPB-bordeuse-parquet-lagler-flip-1-800x800-1.jpg'
    ]
  },
  'lourde': {
    id: 'lourde',
    name: 'Ponceuse lourde Cobra/Bona',
    subtitle: 'Pour décapage et gros travaux',
    description: 'Machine de ponçage à bande pour enlever rapidement les anciennes finitions, colles, vernis épais ou parquets très marqués.',
    mainFeature: 'Les ponceuses lourdes Cobra et Bona sont conçues pour les travaux de décapage intensif. Leur puissance permet d\'éliminer rapidement les anciennes finitions, la colle de moquette et de préparer efficacement les parquets très abîmés.',
    sections: [
      {
        title: 'DÉCAPAGE INTENSIF',
        content: 'Idéale pour enlever les anciennes couches de vernis, les résidus de colle de moquette ou les taches profondes. La bande abrasive rotative permet un enlèvement rapide et uniforme de la matière.'
      },
      {
        title: 'PARQUETS TRÈS ABÎMÉS',
        content: 'Pour les parquets présentant de fortes irrégularités, des différences de niveau importantes ou des zones très endommagées. Premier passage indispensable avant la finition avec la Spider.'
      }
    ],
    advantages: [
      'Haute puissance de ponçage',
      'Décapage rapide et efficace',
      'Robuste et fiable',
      'Enlèvement de colle',
      'Rattrapage de niveau',
      'Bande abrasive large',
      'Aspiration puissante incluse',
      'Parfait pour gros chantiers'
    ],
    dailyRate: 110,
    weekendRate: 220,
    images: [
      'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/bona-belt-ux.webp'
    ]
  },
  'angle': {
    id: 'angle',
    name: 'Ponçeuse d\'angle',
    subtitle: 'Pour coins et escaliers',
    description: 'Pour les coins, marches, recoins d\'escalier, zones difficiles d\'accès. Parfaite en complément d\'un pack.',
    mainFeature: 'La ponçeuse d\'angle est spécialement conçue pour les zones que les autres machines ne peuvent atteindre : angles serrés, contremarches d\'escalier, recoins complexes.',
    sections: [
      {
        title: 'PRÉCISION MAXIMALE',
        content: 'Sa forme triangulaire permet d\'accéder aux angles les plus difficiles et garantit une finition homogène dans tous les coins de la pièce.'
      },
      {
        title: 'ESCALIERS',
        content: 'Idéale pour poncer les marches, contremarches et tous les détails d\'un escalier en bois. Légère et maniable pour un travail de précision.'
      }
    ],
    advantages: [
      'Accès aux angles serrés',
      'Forme triangulaire adaptée',
      'Légère et maniable',
      'Parfaite pour escaliers',
      'Finition impeccable',
      'Facile à utiliser',
      'Complément indispensable',
      'Aspiration possible'
    ],
    dailyRate: 32,
    weekendRate: 64,
    images: [
      'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/grattoir-triangulaire-6-cm-manche-bois-l-outil-parfait.jpg'
    ]
  },
  'aspirateur': {
    id: 'aspirateur',
    name: 'Aspirateur + cyclone',
    subtitle: 'Aspiration professionnelle',
    description: 'Vous avez déjà la machine, mais pas l\'aspiration ? L\'aspirateur avec cyclone limite drastiquement la poussière et protège le moteur des ponceuses.',
    mainFeature: 'L\'aspirateur professionnel avec système cyclone est essentiel pour un chantier propre et sain. Il capte 99% de la poussière de ponçage et protège les moteurs des ponceuses.',
    sections: [
      {
        title: 'SYSTÈME CYCLONE',
        content: 'La technologie cyclone sépare les particules fines des grosses avant filtration, prolongeant la durée de vie des filtres et maintenant une aspiration constante tout au long du travail.'
      },
      {
        title: 'CHANTIER PROPRE',
        content: 'Réduit drastiquement la poussière dans l\'air et sur les surfaces, permettant de travailler dans de meilleures conditions et de protéger votre santé.'
      }
    ],
    advantages: [
      'Haute capacité d\'aspiration',
      'Système cyclone performant',
      'Filtration HEPA',
      'Protection des moteurs',
      'Chantier propre garanti',
      'Compatible toutes ponceuses',
      'Grande capacité de cuve',
      'Facile à vider'
    ],
    dailyRate: 73,
    weekendRate: 146,
    images: [
      'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/consultant_teaser_dust_extraction.jpg'
    ]
  },
  'grattoir': {
    id: 'grattoir',
    name: 'Grattoir manuel',
    subtitle: 'Pour finitions et détails',
    description: 'Indispensable pour les angles ultra serrés, les petites zones de colle ou les détails que les machines n\'attrapent pas.',
    mainFeature: 'Le grattoir manuel professionnel est l\'outil de finition par excellence. Il permet de traiter les derniers détails impossibles à atteindre avec les machines électriques.',
    sections: [
      {
        title: 'FINITIONS PARFAITES',
        content: 'Pour les angles ultra serrés, les petites zones de colle résiduelle, les détails autour des seuils de porte ou tout autre endroit nécessitant une intervention manuelle précise.'
      },
      {
        title: 'QUALITÉ PROFESSIONNELLE',
        content: 'Lame en acier trempé de haute qualité pour une efficacité maximale et une longue durée de vie. Manche ergonomique pour un travail confortable.'
      }
    ],
    advantages: [
      'Précision maximale',
      'Accès aux moindres recoins',
      'Lame haute qualité',
      'Manche ergonomique',
      'Indispensable pour finitions',
      'Enlève colle résiduelle',
      'Léger et maniable',
      'Complément parfait'
    ],
    dailyRate: 6,
    weekendRate: 12,
    images: [
      'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/grattoir-triangulaire-6-cm-manche-bois-l-outil-parfait.jpg'
    ]
  }
};

export default function MachineDetailPage() {
  const { machineId } = useParams<{ machineId: string }>();
  const navigate = useNavigate();
  const [showContactForm, setShowContactForm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const machine = machineId ? machinesData[machineId] : null;

  if (!machine) {
    return (
      <>
        <Helmet>
          <title>Machine non trouvée - Location de ponceuses | Les Ponceurs Réunis</title>
          <meta name="description" content="Cette machine n'existe pas dans notre catalogue. Découvrez toutes nos ponceuses disponibles à la location en Alsace." />
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Machine non trouvée</h1>
            <Link to="/location-ponceuse" className="text-[#d9b45a] hover:underline">
              Retour à la page location
            </Link>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{machine.name} - Location de ponceuses | Les Ponceurs Réunis</title>
        <meta name="description" content={`Location ${machine.name.toLowerCase()} en Alsace. ${machine.description} Tarif à la journée ou au weekend avec aspiration professionnelle.`} />
        <link rel="canonical" href={`https://ponceur-parquet.fr/location-ponceuse/${machine.id}`} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-[#d9b45a]">Accueil</Link>
            <span>/</span>
            <Link to="/location-ponceuse" className="hover:text-[#d9b45a]">Location</Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">{machine.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Back Button */}
        <button
          onClick={() => navigate('/location-ponceuse')}
          className="flex items-center gap-2 text-gray-600 hover:text-[#d9b45a] mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour aux machines
        </button>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">

          {/* Images Section */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-4">
              <img
                src={machine.images[currentImageIndex]}
                alt={machine.name}
                className="w-full h-96 object-cover"
              />
            </div>
            {machine.images.length > 1 && (
              <div className="flex gap-2">
                {machine.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-1 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === idx ? 'border-[#d9b45a]' : 'border-gray-200'
                    }`}
                  >
                    <img src={img} alt={`${machine.name} ${idx + 1}`} className="w-full h-24 object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div>
            <div className="inline-block bg-[#d9b45a]/10 border border-[#d9b45a] text-[#d9b45a] px-3 py-1 rounded-full text-sm font-semibold mb-4">
              Location avec aspiration incluse
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-3">{machine.name}</h1>
            <p className="text-xl text-gray-600 mb-6">{machine.subtitle}</p>

            <p className="text-gray-700 leading-relaxed mb-8">{machine.description}</p>

            {/* Pricing Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white mb-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="text-sm text-gray-400 mb-2">Journée</div>
                  <div className="text-4xl font-bold text-white">{machine.dailyRate}€</div>
                  <div className="text-sm text-gray-400">TTC / jour</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-2">Week-end</div>
                  <div className="text-4xl font-bold text-[#d9b45a]">{machine.weekendRate}€</div>
                  <div className="text-sm text-gray-400">Ven soir → Lun matin</div>
                </div>
              </div>

              <button
                onClick={() => setShowContactForm(true)}
                className="w-full bg-[#d9b45a] hover:bg-[#c9a54a] text-slate-900 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
              >
                Louer cette machine
              </button>
            </div>

            {machine.videoUrl && (
              <a
                href={machine.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-semibold transition-colors"
              >
                <Play className="w-5 h-5" />
                Voir la vidéo de démonstration
              </a>
            )}
          </div>
        </div>

        {/* Main Feature Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <div className="flex items-start gap-4 mb-6">
            <Star className="w-10 h-10 text-[#d9b45a] flex-shrink-0" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Bien plus qu'une simple machine</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{machine.mainFeature}</p>
            </div>
          </div>
        </div>

        {/* Sections - Multitalent */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Multitalent</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {machine.sections.map((section, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#d9b45a] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    {idx + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{section.title}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Advantages Section */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-white mb-12">
          <div className="flex items-center gap-3 mb-8">
            <Wrench className="w-8 h-8 text-[#d9b45a]" />
            <h2 className="text-3xl font-bold">Ses atouts</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {machine.advantages.map((advantage, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#d9b45a] flex-shrink-0 mt-0.5" />
                <span className="text-gray-200">{advantage}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <Package className="w-16 h-16 text-[#d9b45a] mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Prêt à louer cette machine ?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Réservez dès maintenant ou contactez-nous pour plus d'informations. Livraison possible sur toute l'Alsace.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowContactForm(true)}
              className="bg-[#d9b45a] hover:bg-[#c9a54a] text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
            >
              Réserver maintenant
            </button>
            <a
              href="tel:0757821306"
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg"
            >
              07 57 82 13 06
            </a>
          </div>
        </div>

        {/* Related Machines */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Vous pourriez aussi aimer</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(machinesData)
              .filter(m => m.id !== machine.id)
              .slice(0, 3)
              .map((relatedMachine) => (
                <Link
                  key={relatedMachine.id}
                  to={`/location-ponceuse/${relatedMachine.id}`}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={relatedMachine.images[0]}
                      alt={relatedMachine.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-bold text-gray-900 shadow-lg">
                      {relatedMachine.dailyRate}€/j
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{relatedMachine.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{relatedMachine.subtitle}</p>
                    <div className="text-[#d9b45a] font-semibold flex items-center gap-2">
                      Voir les détails
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

      </div>

      <Footer />

      {/* Contact Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Réservation : {machine.name}</h3>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type de location</label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#d9b45a] focus:ring-2 focus:ring-[#d9b45a]/20 outline-none">
                  <option>Journée ({machine.dailyRate}€)</option>
                  <option>Week-end ({machine.weekendRate}€)</option>
                </select>
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
