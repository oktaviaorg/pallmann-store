import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { HelpCircle, ChevronDown, ChevronUp, Building2, Users, Clock, MapPin, Phone } from 'lucide-react';

const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Les Ponceurs Réunis sont-ils une franchise ou un réseau national ?",
      answer: "Non, absolument pas. Les Ponceurs Réunis est une entreprise artisanale indépendante et familiale, et non une franchise. Fondée en 2004 et basée à Herrlisheim-près-Colmar en Alsace, nous privilégions la qualité artisanale et la relation directe avec nos clients. Nous sommes une équipe à taille humaine d'artisans passionnés, sans aucun lien avec des structures de franchise ou des réseaux commerciaux. Chaque projet est suivi personnellement par nos propres artisans, du devis à la finition, sans sous-traitance.",
      category: "entreprise"
    },
    {
      question: "Qui réalise réellement mes travaux ?",
      answer: "Tous vos travaux sont réalisés par nos propres artisans permanents, formés et employés directement par Les Ponceurs Réunis. Nous ne faisons jamais appel à de la sous-traitance. Notre équipe de 8 artisans qualifiés travaille ensemble depuis des années et partage les mêmes standards de qualité. Vous bénéficiez d'un interlocuteur unique du début à la fin de votre projet.",
      category: "entreprise"
    },
    {
      question: "Êtes-vous vraiment une entreprise locale ?",
      answer: "Oui, à 100%. Notre siège social et notre atelier sont situés au 6 rue du Commerce à Herrlisheim-près-Colmar (68420). Nous sommes implantés en Alsace depuis 2004 et intervenons principalement dans un rayon de 150km autour de notre base. Notre ancrage local nous permet de garantir une grande réactivité et un suivi de proximité pour tous nos clients.",
      category: "entreprise"
    },
    {
      question: "Quelles sont vos zones d'intervention ?",
      answer: "Nous intervenons principalement en Alsace (Bas-Rhin et Haut-Rhin), ainsi que dans le Territoire de Belfort et certaines zones de la Moselle. Notre zone de prédilection inclut Strasbourg, Colmar, Mulhouse, Sélestat, Belfort et Sarrebourg. Pour des projets d'envergure, nous pouvons étudier des interventions dans d'autres départements du Grand Est.",
      category: "services"
    },
    {
      question: "Combien de temps faut-il pour rénover un parquet ?",
      answer: "La durée dépend de la surface et de l'état du parquet. En moyenne, comptez 2 à 3 jours pour une pièce de 30m². Ce délai comprend le ponçage, les finitions et le temps de séchage. Nous vous fournissons toujours un planning précis avant le début des travaux.",
      category: "services"
    },
    {
      question: "Proposez-vous un diagnostic gratuit ?",
      answer: "Oui, nous offrons un diagnostic photo gratuit. Envoyez-nous simplement des photos de votre parquet par email ou WhatsApp, et nous vous donnerons un premier avis technique ainsi qu'une estimation tarifaire. Pour les projets plus complexes, nous nous déplaçons gratuitement pour une évaluation sur place.",
      category: "services"
    },
    {
      question: "Quelles garanties proposez-vous ?",
      answer: "Tous nos travaux sont couverts par notre assurance décennale obligatoire. De plus, nous garantissons la qualité de nos finitions pendant 2 ans. Nous n'utilisons que des produits professionnels de marques reconnues (vitrifications, huiles) qui offrent elles-mêmes des garanties de durabilité.",
      category: "garanties"
    },
    {
      question: "Travaillez-vous aussi pour les professionnels ?",
      answer: "Oui, nous intervenons régulièrement pour des professionnels : architectes, décorateurs d'intérieur, agences immobilières, bailleurs sociaux et entreprises du bâtiment. Nous adaptons notre organisation à vos contraintes de planning et proposons des tarifs préférentiels pour les grands volumes.",
      category: "services"
    },
    {
      question: "Puis-je rester chez moi pendant les travaux ?",
      answer: "Cela dépend de la configuration de votre logement. Le ponçage génère de la poussière et du bruit. Si vous avez plusieurs pièces, nous pouvons organiser les travaux pièce par pièce. Nous utilisons des systèmes d'aspiration performants pour limiter les nuisances. Pendant la phase de séchage des finitions (24 à 48h), il est préférable de ne pas circuler sur le parquet.",
      category: "pratique"
    },
    {
      question: "Quels produits utilisez-vous pour la finition ?",
      answer: "Nous travaillons exclusivement avec des produits professionnels de haute qualité : vitrifications polyuréthane à base d'eau (écologiques et sans odeur), huiles naturelles ou modernes, cires. Nous sommes formés et certifiés par l'un des leaders mondiaux des solutions pour parquets. Tous nos produits sont conformes aux normes européennes et adaptés à chaque essence de bois.",
      category: "technique"
    },
    {
      question: "Comment vous différenciez-vous des grandes enseignes ?",
      answer: "Contrairement aux grandes enseignes qui travaillent souvent avec des sous-traitants différents à chaque intervention, nous sommes une entreprise artisanale avec nos propres équipes permanentes. Vous avez un interlocuteur unique, nos artisans connaissent leur métier sur le bout des doigts, et nous nous adaptons à vos besoins spécifiques. Notre taille humaine nous permet une réactivité et une personnalisation impossibles dans les grandes structures.",
      category: "entreprise"
    },
    {
      question: "Proposez-vous des formations ?",
      answer: "Oui, nous proposons des formations professionnelles au ponçage et à la finition de parquet, destinées aux artisans du bâtiment souhaitant se perfectionner ou se reconvertir. Ces formations pratiques se déroulent sur chantiers réels. Pour plus d'informations, consultez notre page dédiée à la formation.",
      category: "formation"
    },
    {
      question: "Qu'est-ce que le ponçage \"zéro poussière\" ?",
      answer: "Notre technologie de ponçage à aspiration cyclonique déportée HEPA capture 99,8% des résidus de poussière à la source. Contrairement au ponçage classique qui projette des micro-particules dans l'air ambiant, nos extracteurs HEPA couplés à nos ponceuses de dernière génération garantissent un air pur pendant et après les travaux. Plus besoin de calfeutrer les pièces ou de vider vos placards. C'est une révolution pour la santé et la propreté de votre intérieur.",
      category: "technique"
    },
    {
      question: "Quels sont les avantages concrets du ponçage sans poussière ?",
      answer: "Les avantages sont nombreux : 1) Protection de votre santé en éliminant les particules fines dangereuses pour les voies respiratoires. 2) Chantier propre sans nettoyage intensif après intervention. 3) Précision optimale grâce à une visibilité parfaite du grain du bois en temps réel, évitant les marques et coups de tambour. 4) Finition supérieure car l'absence de poussière résiduelle permet une meilleure adhérence des vernis et huiles. 5) Durabilité accrue avec une protection qui dure 30% plus longtemps.",
      category: "technique"
    },
    {
      question: "Comment rebouchez-vous les fentes et fissures du parquet ?",
      answer: "Nous utilisons une technique professionnelle de rebouchage au liant de résine mélangé à la farine de votre propre bois. Cette méthode garantit une colorimétrie parfaite et un résultat invisible une fois vitrifié. Le liant de résine assure une solidité maximale et une flexibilité adaptée aux mouvements naturels du bois. C'est bien plus durable et esthétique que les pâtes à bois standard.",
      category: "technique"
    },
    {
      question: "Qu'est-ce qu'un vitrificateur polyuréthane bi-composant ?",
      answer: "C'est un vernis professionnel haute performance composé de deux éléments qui se mélangent juste avant l'application : une résine et un durcisseur. Cette formulation offre une résistance exceptionnelle au passage intensif, aux rayures, aux UV et à l'humidité. Les vitrificateurs bi-composants durent beaucoup plus longtemps que les vernis standards mono-composants et sont particulièrement adaptés aux zones à fort trafic (entrées, couloirs, cuisines).",
      category: "technique"
    },
    {
      question: "Combien de millimètres retirez-vous lors du ponçage ?",
      answer: "Nous retirons le strict minimum nécessaire, généralement entre 0,5mm et 1mm maximum selon l'état du parquet. Notre expertise nous permet de préserver la couche d'usure de votre parquet. Un ponçage raté par un amateur ou une machine mal réglée peut retirer jusqu'à 2mm inutilement, réduisant la durée de vie de votre patrimoine de 20 ans. Chaque millimètre compte pour la longévité de votre sol.",
      category: "technique"
    },
    {
      question: "Pourquoi voir le grain du bois pendant le ponçage est-il important ?",
      answer: "La visibilité parfaite du grain du bois pendant le ponçage est cruciale pour détecter et corriger en temps réel les défauts, marques de ponçage et 'coups de tambour'. Avec un ponçage classique qui génère de la poussière, ces défauts sont invisibles pendant le travail mais deviennent flagrants après vitrification. Notre système d'aspiration HEPA élimine ce problème en offrant une vue dégagée permanente, garantissant un résultat parfait dès le premier passage.",
      category: "technique"
    },
    {
      question: "Dois-je arracher mon vieux parquet ou le rénover ?",
      answer: "Dans 95% des cas, la rénovation est la meilleure option. Un parquet massif peut être poncé 5 à 10 fois dans sa vie. Arracher un parquet entraîne des coûts cachés : évacuation des gravats, ragréage du sol, achat d'un nouveau revêtement. La rénovation coûte 30% à 50% moins cher qu'un remplacement complet et préserve le cachet de votre bien. De plus, un parquet rénové apporte une plus-value de 3% à 5% sur la valeur immobilière.",
      category: "conseils"
    },
    {
      question: "Mon parquet noirci par l'humidité est-il récupérable ?",
      answer: "Oui, dans la grande majorité des cas. Le noircissement est souvent superficiel et disparaît dès la première passe de ponçage au gros grain. Nous effectuons un diagnostic photo gratuit pour évaluer l'état réel de votre parquet. Même un parquet qui semble très abîmé peut révéler un bois sain et éclatant une fois poncé.",
      category: "conseils"
    },
    {
      question: "Combien de fois peut-on poncer un parquet dans sa vie ?",
      answer: "Un parquet massif peut être poncé entre 5 et 10 fois selon son épaisseur initiale. Lors de chaque ponçage professionnel, nous retirons seulement 0,5mm à 1mm de bois. Si votre parquet a 50 ans et n'a été poncé qu'une ou deux fois, il lui reste probablement encore 100 ans de vie devant lui. C'est un investissement qui traverse les générations.",
      category: "technique"
    },
    {
      question: "Quel est le prix au m² pour poncer et vitrifier un parquet ?",
      answer: "Dans le Haut-Rhin et le Bas-Rhin, le tarif moyen oscille entre 35€ et 50€ HT par m² selon l'état initial du parquet, la finition choisie (vitrification, huile ou cire) et l'accessibilité. Ce prix inclut le ponçage complet, le rebouchage des fentes éventuelles et l'application de la finition. Pour une estimation précise, envoyez-nous des photos par WhatsApp au 07 57 82 13 06.",
      category: "tarifs"
    },
    {
      question: "Peut-on changer la couleur d'un parquet sans le remplacer ?",
      answer: "Absolument ! Grâce aux huiles teintées et aux vernis spécifiques, nous pouvons transformer l'apparence de votre parquet : chêne miel vers chêne blanchi nordique, brun fumé contemporain, gris cendré moderne, etc. C'est une excellente alternative au remplacement, beaucoup plus économique et écologique.",
      category: "technique"
    },
    {
      question: "Un escalier en bois ancien peut-il être rénové ?",
      answer: "Oui, et c'est souvent spectaculaire ! Un escalier en chêne qui craque et dont le vernis est jauni retrouve une seconde jeunesse avec un ponçage de précision et une vitrification adaptée. Nous déconseillons fortement de recouvrir un bel escalier en bois massif avec de la moquette ou des plaques métalliques. La rénovation préserve le patrimoine et le cachet de votre intérieur.",
      category: "services"
    },
    {
      question: "Un parquet rénové augmente-t-il la valeur de ma maison ?",
      answer: "Oui, significativement. Les agents immobiliers confirment qu'un parquet massif rénové (ponçage + vitrification) apporte une plus-value de 3% à 5% sur le prix de vente final. Dans le Haut-Rhin, cela peut représenter plusieurs milliers d'euros. À l'inverse, remplacer un parquet ancien par un sol synthétique bas de gamme peut faire fuir les acheteurs et servir de levier de négociation à la baisse.",
      category: "conseils"
    },
    {
      question: "Combien de temps après la vitrification puis-je marcher sur le parquet ?",
      answer: "Avec nos vitrifications modernes à base d'eau, la pièce est généralement réutilisable 24h après la dernière couche. Pour une surface de 50m², comptez 2 à 3 jours de travail au total, séchage inclus. Nous vous donnons toujours des consignes précises adaptées au produit utilisé et aux conditions climatiques.",
      category: "pratique"
    },
    {
      question: "Faut-il raboter les portes si je pose un nouveau parquet par-dessus l'ancien ?",
      answer: "Oui, dans la plupart des cas. Un parquet flottant ou stratifié avec sous-couche ajoute entre 8mm et 15mm d'épaisseur. Cela nécessite de raboter le bas de chaque porte (coût : 30€ à 60€ par porte). Avec le ponçage de votre parquet existant, aucun rabotage n'est nécessaire : le sol conserve sa hauteur d'origine. Pour un appartement de 8 portes, vous économisez jusqu'à 710€ (rabotage + seuils + quarts-de-rond).",
      category: "conseils"
    },
    {
      question: "Le ponçage ajoute-t-il de l'épaisseur au sol ?",
      answer: "Non, au contraire. Le ponçage retire quelques dixièmes de millimètres (0,5mm à 1mm maximum) de la couche de vernis usée et du bois grisaille. C'est une solution 'épaisseur zéro' qui préserve vos portes, seuils et plinthes. Aucune intervention de menuiserie n'est nécessaire.",
      category: "technique"
    },
    {
      question: "Peut-on poncer un parquet contrecollé (stratifié avec couche de bois) ?",
      answer: "Oui, si la couche d'usure en bois noble fait au moins 2,5mm d'épaisseur. Nous utilisons des abrasifs progressifs (grain 40 à 120) qui préservent au maximum cette couche. Beaucoup de parquets contrecollés de qualité peuvent être poncés 2 à 3 fois dans leur vie. Envoyez-nous une photo pour un diagnostic gratuit.",
      category: "technique"
    },
    {
      question: "Combien coûte le rabotage de portes par un menuisier ?",
      answer: "Un menuisier facture en moyenne entre 30€ et 60€ par porte pour un rabotage. Pour un appartement standard avec 8 portes, comptez 240€ à 480€. Ajoutez à cela les barres de seuil (25€/unité), les quarts-de-rond et le risque d'endommager définitivement des portes anciennes en chêne massif. Le ponçage évite entièrement ces coûts.",
      category: "tarifs"
    },
    {
      question: "Est-ce que le ponçage fait de la poussière sous les portes ?",
      answer: "Non. Nos machines sont équipées d'extracteurs HEPA qui aspirent 99,8% de la sciure instantanément à la source. Le bas de vos portes reste propre, et vous n'avez pas besoin de calfeutrer chaque pièce. C'est l'un des avantages majeurs de notre technologie sans poussière.",
      category: "technique"
    },
    {
      question: "La pose d'un nouveau sol par-dessus règle-t-elle les grincements du parquet ?",
      answer: "Non, rarement. Les grincements proviennent du support (lames qui bougent, fixations desserrées, frottements entre bois). Poser un revêtement par-dessus ne fait qu'étouffer temporairement le bruit. Avec le ponçage, nous pouvons repérer les lames problématiques et les refixer solidement avant d'appliquer la finition. C'est une vraie solution durable.",
      category: "technique"
    },
    {
      question: "Pourquoi raboter une porte ancienne est-il une erreur ?",
      answer: "Une porte ancienne en chêne massif ou moulurée a une valeur patrimoniale. Une fois rabotée, elle perd ses proportions d'origine et ne peut jamais être rallongée. Si vous changez de sol à l'avenir, la porte sera définitivement trop courte. De plus, sur certaines portes alvéolaires modernes, couper trop de matière fragilise la structure. Le ponçage préserve intégralement vos menuiseries.",
      category: "conseils"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#fafaf8] to-white">
      <Helmet>
        <title>FAQ - Questions Fréquentes | Les Ponceurs Réunis</title>
        <meta
          name="description"
          content="Toutes les réponses à vos questions sur Les Ponceurs Réunis, entreprise artisanale familiale de rénovation de parquet en Alsace. Découvrez qui nous sommes vraiment : pas de franchise, que nos propres artisans."
        />
        <meta
          name="keywords"
          content="FAQ parquet, questions rénovation parquet, entreprise locale parquet Alsace, artisan parquet, Les Ponceurs Réunis"
        />
        <link rel="canonical" href="https://ponceur-parquet.fr/faq" />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="FAQ - Questions Fréquentes | Les Ponceurs Réunis" />
        <meta property="og:description" content="Entreprise artisanale familiale, pas de franchise. Découvrez toutes les réponses à vos questions sur nos services de rénovation de parquet en Alsace." />
        <meta property="og:url" content="https://ponceur-parquet.fr/faq" />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </Helmet>

      <Header />

      <main className="flex-grow">
        <section className="relative isolate overflow-hidden pt-24 pb-16 md:pt-32 bg-gradient-to-br from-[#0f1b2b] via-[#1a2b3d] to-[#0f1b2b]">
          <div className="absolute inset-0 -z-10 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d9b45a' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d9b45a]/20 border border-[#d9b45a]/30 rounded-full mb-6">
                <HelpCircle className="w-4 h-4 text-[#d9b45a]" />
                <span className="text-sm font-medium text-[#d9b45a]">Foire Aux Questions</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                Vos Questions,
                <span className="block text-[#d9b45a] mt-2">Nos Réponses</span>
              </h1>

              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Tout ce que vous devez savoir sur notre entreprise artisanale et nos services
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[#d9b45a]/10 to-transparent border-l-4 border-[#d9b45a] p-6 rounded-lg mb-12">
              <div className="flex items-start gap-4">
                <Building2 className="w-6 h-6 text-[#d9b45a] flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Information importante
                  </h2>
                  <p className="text-gray-700">
                    Les Ponceurs Réunis est une <strong>entreprise artisanale familiale indépendante</strong>,
                    basée à Herrlisheim-près-Colmar. Nous ne sommes pas une franchise, ni un réseau commercial.
                    Tous nos travaux sont réalisés par nos propres artisans, sans sous-traitance.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-[#d9b45a] transition-all"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-[#d9b45a] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {openIndex === index && (
                    <div className="px-6 py-5 bg-gradient-to-br from-[#fafaf8] to-white border-t-2 border-gray-100">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-white to-[#fafaf8]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[#0f1b2b] to-[#1a2b3d] rounded-2xl p-8 md:p-12 text-center shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-4">
                Une autre question ?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Notre équipe est à votre écoute pour répondre à toutes vos questions
              </p>

              <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
                <a
                  href="tel:+33757821306"
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-[#d9b45a] text-[#0f1b2b] rounded-xl font-bold hover:bg-[#b8941a] transition-all hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  07 57 82 13 06
                </a>
                <Link
                  to="/services"
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-white/10 text-white border-2 border-white/30 rounded-xl font-bold hover:bg-white/20 transition-all"
                >
                  Découvrir nos services
                </Link>
              </div>

              <div className="flex items-center justify-center gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Entreprise locale • Basée à Herrlisheim-près-Colmar</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;
