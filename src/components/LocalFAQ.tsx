import React from 'react';
import { ArrowRight } from 'lucide-react';

interface LocalFAQProps {
  cityName: string;
}

const LocalFAQ: React.FC<LocalFAQProps> = ({ cityName }) => {
  const faqs = [
    {
      question: `Combien coûte le ponçage de parquet à ${cityName} ?`,
      answer: `Le tarif du ponçage de parquet à ${cityName} varie selon la surface et l'état du parquet : entre 25€ et 35€/m² pour un ponçage seul. Le ponçage sans poussière (99% de captation) est inclus dans nos prestations. Pour un ponçage avec vitrification, comptez entre 42€ et 55€/m². Nous vous proposons un devis gratuit et détaillé sous 24h pour votre projet à ${cityName}.`
    },
    {
      question: `Comment se déroule la rénovation d'un escalier en bois à ${cityName} ?`,
      answer: `La rénovation d'escalier en bois à ${cityName} comprend plusieurs étapes : décapage ou ponçage des marches et contremarches, réparation des éléments abîmés, rebouchage des fissures, ponçage fin multicouches, et application de finition (vitrification, huile ou cire). Selon l'état de votre escalier, la rénovation prend 2 à 4 jours. Nous intervenons sur tous types d'escaliers : droits, tournants, hélicoïdaux. Devis gratuit pour votre escalier à ${cityName}.`
    },
    {
      question: `Quelle est la durée de vie d'une vitrification de parquet à ${cityName} ?`,
      answer: `Une vitrification de parquet à ${cityName} dure généralement entre 8 et 15 ans selon le passage et l'entretien. Nous utilisons des vernis professionnels bi-composants très résistants à l'usure. Pour les zones à fort passage, nous recommandons un vernis renforcé qui peut durer jusqu'à 20 ans. L'entretien régulier (nettoyage doux sans produits agressifs) prolonge significativement la durée de vie de la vitrification. Nous proposons également des contrats d'entretien à ${cityName}.`
    },
    {
      question: `Peut-on réparer un parquet ancien abîmé à ${cityName} ?`,
      answer: `Oui, nous réparons tous types de parquets anciens à ${cityName} : remplacement de lames cassées ou pourries, comblement de trous et fissures, traitement des grincements, renforcement de la structure, élimination des taches (eau, urine, brûlures). Pour les parquets de valeur (Versailles, point de Hongrie), nous recherchons des essences de bois identiques. Même un parquet très abîmé peut retrouver son éclat d'origine. Diagnostic gratuit de votre parquet ancien à ${cityName}.`
    },
    {
      question: `Quel type de parquet massif choisir pour une pose à ${cityName} ?`,
      answer: `Pour une pose de parquet massif à ${cityName}, plusieurs options s'offrent à vous : le chêne (le plus résistant et intemporel), le châtaignier (idéal pour les pièces humides), le hêtre (économique et chaleureux), ou des essences exotiques (teck, wengé). L'épaisseur standard est de 14-23mm. Pour les pièces à vivre, privilégiez le chêne massif 15mm ou plus. Nous vous conseillons selon votre budget, style de décoration et usage des pièces. Showroom sur rendez-vous pour voir nos essences à ${cityName}.`
    },
    {
      question: `Le ponçage de parquet sans poussière est-il vraiment efficace à ${cityName} ?`,
      answer: `Oui, notre système de ponçage sans poussière à ${cityName} capture plus de 99% des particules grâce à une aspiration haute puissance intégrée à la ponceuse. Contrairement au ponçage traditionnel qui génère énormément de poussière, notre méthode permet de rester dans les lieux pendant les travaux. Aucune protection de meubles n'est nécessaire, et le nettoyage final est minimal. C'est idéal pour les appartements, bureaux occupés et les personnes sensibles aux allergies. Démonstration possible avant devis à ${cityName}.`
    },
    {
      question: `Combien de temps faut-il pour poser du parquet massif à ${cityName} ?`,
      answer: `La durée de pose de parquet massif à ${cityName} dépend de la surface et du type de pose : comptez 1 à 2 jours pour 20m² en pose clouée, 2 à 3 jours pour 30-40m². La pose en point de Hongrie ou Versailles nécessite plus de temps (3-5 jours pour 30m²). Après la pose, il faut prévoir 1 à 2 jours pour le ponçage et la finition. Le parquet est praticable 24h après la vitrification, pleinement utilisable après 7 jours. Planning précis fourni avec le devis à ${cityName}.`
    },
    {
      question: `Quelle finition choisir après ponçage : vitrification, huile ou cire à ${cityName} ?`,
      answer: `À ${cityName}, trois options de finition s'offrent à vous après ponçage : la vitrification (la plus résistante et facile d'entretien, idéale pour passage intense), l'huile (aspect naturel, nourrit le bois, nécessite un entretien régulier), ou la cire (finition traditionnelle pour parquets anciens, entretien fréquent). Pour les pièces à vivre et cuisine, nous recommandons la vitrification. Pour les chambres et ambiance chaleureuse, l'huile est parfaite. Nous vous conseillons selon votre usage et vos préférences esthétiques.`
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-[#fafaf8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Questions fréquentes sur les travaux de parquet à {cityName}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tout ce que vous devez savoir sur le ponçage, la rénovation, la vitrification et la pose de parquet
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="bg-white rounded-xl shadow-lg border-2 border-gray-100 overflow-hidden group hover:border-[#d9b45a]/30 transition-colors"
            >
              <summary className="px-6 py-5 font-bold text-lg text-gray-900 cursor-pointer hover:bg-[#fafaf8] transition-colors flex items-center justify-between">
                <span className="pr-4">{faq.question}</span>
                <ArrowRight className="w-5 h-5 text-[#d9b45a] flex-shrink-0 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100">
                <p className="pt-4">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Vous avez d'autres questions sur vos travaux de parquet à {cityName} ?
          </p>
          <a
            href="#devis"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#d9b45a] to-[#b8941a] text-[#0f1b2b] rounded-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Contactez-nous pour un devis gratuit
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default LocalFAQ;
