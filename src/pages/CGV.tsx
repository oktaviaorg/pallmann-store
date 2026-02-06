import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FileText, CheckCircle, AlertCircle, Euro, Truck, CreditCard } from 'lucide-react';

export default function CGV() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>Conditions Générales de Vente | Pallmann Store</title>
        <meta name="description" content="Conditions générales de vente de la boutique en ligne Pallmann Store" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <Header />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 pb-4 border-b-4 border-[#ff9900]">
              Conditions Générales de Vente
            </h1>

            <div className="space-y-8 text-gray-700">
              <section>
                <div className="bg-[#ff9900]/10 border-l-4 border-[#ff9900] p-4 mb-6">
                  <p className="text-gray-800 font-medium">
                    Les présentes Conditions Générales de Vente (CGV) s'appliquent à toutes les ventes de
                    produits effectuées sur le site pallmann-store.com exploité par Groupe Renoline SARL.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <FileText className="w-6 h-6 text-[#ff9900]" />
                  Article 1 - Objet et champ d'application
                </h2>
                <div className="space-y-3 pl-9">
                  <p>
                    Les présentes CGV régissent les ventes de produits Pallmann (vitrificateurs, huiles,
                    colles et accessoires pour parquet) effectuées par Groupe Renoline SARL auprès de
                    clients professionnels et particuliers.
                  </p>
                  <p>
                    Toute commande implique l'acceptation sans réserve des présentes CGV.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Euro className="w-6 h-6 text-[#ff9900]" />
                  Article 2 - Prix
                </h2>
                <div className="space-y-3 pl-9">
                  <p>
                    <strong>2.1 Affichage des prix</strong><br />
                    Les prix sont indiqués en euros hors taxes (HT). La TVA au taux de 20% est ajoutée
                    au moment du paiement.
                  </p>
                  <p>
                    <strong>2.2 Codes professionnels</strong><br />
                    Les clients professionnels disposant d'un code partenaire bénéficient de tarifs
                    préférentiels. Ces codes sont nominatifs et non transmissibles.
                  </p>
                  <p>
                    <strong>2.3 Modification des prix</strong><br />
                    Groupe Renoline SARL se réserve le droit de modifier ses prix à tout moment.
                    Les produits sont facturés au prix en vigueur lors de la validation de la commande.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-[#ff9900]" />
                  Article 3 - Commande et paiement
                </h2>
                <div className="space-y-3 pl-9">
                  <p>
                    <strong>3.1 Processus de commande</strong><br />
                    La commande est validée après sélection des produits, renseignement des informations
                    de livraison et paiement en ligne.
                  </p>
                  <p>
                    <strong>3.2 Moyens de paiement</strong><br />
                    Le paiement s'effectue par carte bancaire via la plateforme sécurisée Stripe.
                  </p>
                  <p>
                    <strong>3.3 Sécurité des paiements</strong><br />
                    Les transactions sont sécurisées par le protocole SSL. Groupe Renoline SARL n'a
                    pas accès à vos données bancaires.
                  </p>
                  <p>
                    <strong>3.4 Confirmation de commande</strong><br />
                    Un email de confirmation est envoyé après validation du paiement.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Truck className="w-6 h-6 text-[#ff9900]" />
                  Article 4 - Livraison
                </h2>
                <div className="space-y-3 pl-9">
                  <p>
                    <strong>4.1 Zone de livraison</strong><br />
                    Les livraisons sont effectuées en France métropolitaine.
                  </p>
                  <p>
                    <strong>4.2 Frais de port</strong><br />
                    Les frais de port sont de 15€ HT. La livraison est offerte (franco de port) pour
                    toute commande supérieure ou égale à 630€ HT.
                  </p>
                  <p>
                    <strong>4.3 Délais de livraison</strong><br />
                    Les délais de livraison sont généralement de 48 à 72 heures ouvrées après validation
                    de la commande, sous réserve de disponibilité des produits.
                  </p>
                  <p>
                    <strong>4.4 Réception</strong><br />
                    À réception, le client doit vérifier l'état des produits. Toute anomalie doit être
                    signalée dans les 48 heures suivant la livraison.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-[#ff9900]" />
                  Article 5 - Droit de rétractation
                </h2>
                <div className="space-y-3 pl-9">
                  <p>
                    <strong>5.1 Délai de rétractation</strong><br />
                    Conformément à l'article L221-18 du Code de la consommation, le client particulier
                    dispose d'un délai de 14 jours à compter de la réception des produits pour exercer
                    son droit de rétractation.
                  </p>
                  <p>
                    <strong>5.2 Exceptions</strong><br />
                    Le droit de rétractation ne s'applique pas aux produits descellés, ouverts ou utilisés.
                  </p>
                  <p>
                    <strong>5.3 Modalités de retour</strong><br />
                    Les produits doivent être retournés dans leur emballage d'origine, complets et en
                    parfait état. Les frais de retour sont à la charge du client.
                  </p>
                  <p>
                    <strong>5.4 Remboursement</strong><br />
                    Le remboursement est effectué dans les 14 jours suivant la réception des produits
                    retournés, par le même moyen de paiement que celui utilisé lors de la commande.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-[#ff9900]" />
                  Article 6 - Garanties
                </h2>
                <div className="space-y-3 pl-9">
                  <p>
                    <strong>6.1 Garantie légale de conformité</strong><br />
                    Les produits bénéficient de la garantie légale de conformité (articles L217-4 et
                    suivants du Code de la consommation).
                  </p>
                  <p>
                    <strong>6.2 Garantie des vices cachés</strong><br />
                    Les produits bénéficient également de la garantie contre les vices cachés
                    (articles 1641 et suivants du Code civil).
                  </p>
                  <p>
                    <strong>6.3 Garantie fabricant</strong><br />
                    Les produits Pallmann bénéficient de la garantie du fabricant. Les conditions
                    sont précisées dans les fiches techniques des produits.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-[#ff9900]" />
                  Article 7 - Responsabilité
                </h2>
                <div className="space-y-3 pl-9">
                  <p>
                    Groupe Renoline SARL ne saurait être tenu responsable des dommages résultant d'une
                    mauvaise utilisation des produits. Il est recommandé de consulter les fiches
                    techniques et de respecter les préconisations du fabricant.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 8 - Propriété des produits</h2>
                <div className="space-y-3 pl-9">
                  <p>
                    Groupe Renoline SARL conserve la propriété des produits vendus jusqu'au paiement
                    complet du prix. Le transfert des risques au client intervient dès la livraison.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 9 - Protection des données</h2>
                <div className="space-y-3 pl-9">
                  <p>
                    Les données personnelles collectées sont nécessaires au traitement des commandes
                    et à la gestion de la relation client. Elles font l'objet d'un traitement
                    informatique conforme au RGPD.
                  </p>
                  <p>
                    Pour plus d'informations, consultez notre{' '}
                    <a href="/politique-confidentialite" className="text-[#ff9900] hover:underline font-medium">
                      Politique de Confidentialité
                    </a>.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 10 - Litiges et médiation</h2>
                <div className="space-y-3 pl-9">
                  <p>
                    En cas de litige, une solution amiable sera recherchée avant toute action judiciaire.
                  </p>
                  <p>
                    Conformément aux dispositions du Code de la consommation, le client peut recourir
                    gratuitement au service de médiation de la consommation.
                  </p>
                  <p>
                    À défaut d'accord amiable, les tribunaux français seront seuls compétents pour
                    connaître du litige.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 11 - Coordonnées du vendeur</h2>
                <div className="space-y-3 pl-9">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Groupe Renoline SARL</strong></p>
                    <p>6 rue du Commerce</p>
                    <p>68420 Herrlisheim près Colmar</p>
                    <p>France</p>
                    <p className="mt-2">
                      Email : <a href="mailto:contact@pallmann-store.com" className="text-[#ff9900] hover:underline">
                        contact@pallmann-store.com
                      </a>
                    </p>
                    <p>SIRET : 832 059 513 00016</p>
                    <p>TVA : FR48832059513</p>
                  </div>
                </div>
              </section>

              <section className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600">
                  <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
