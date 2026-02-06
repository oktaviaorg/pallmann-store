import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FileText, CheckCircle, AlertCircle, Euro, Package, Truck, Shield, ShoppingCart } from 'lucide-react';

export default function CGVBoutique() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Helmet>
        <title>CGV Boutique en ligne | Les Ponceurs Réunis - RENO'LINE</title>
        <meta name="description" content="Conditions Générales de Vente de la boutique en ligne Les Ponceurs Réunis - Produits Pallmann et accessoires pour parquet" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <Header />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 pb-4 border-b-4 border-[#d9b45a]">
              Conditions Générales de Vente
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Boutique en ligne Les Ponceurs Réunis | RENO'LINE
            </p>

            <div className="bg-[#d9b45a]/10 border-l-4 border-[#d9b45a] p-6 mb-8">
              <p className="text-gray-800 font-semibold mb-2">Société : RENO'LINE</p>
              <p className="text-gray-700">6 rue du Commerce, 68420 Herrlisheim-près-Colmar</p>
              <p className="text-gray-700">SIRET : 832 059 513 00016</p>
            </div>

            <div className="space-y-8 text-gray-700">
              <section>
                <p className="text-gray-800 leading-relaxed">
                  Les présentes Conditions Générales de Vente (ci-après « CGV ») s'appliquent à l'ensemble des ventes
                  réalisées par la société RENO'LINE / Les Ponceurs Réunis (ci-après « le Vendeur ») via sa boutique
                  en ligne, auprès de clients particuliers et professionnels (ci-après « l'Acheteur »).
                </p>
                <p className="text-gray-800 leading-relaxed mt-3 font-medium">
                  En passant commande, l'Acheteur reconnaît avoir lu, compris et accepté sans réserve les présentes CGV.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <FileText className="w-6 h-6 text-[#b8941a]" />
                  1. Objet
                </h2>
                <div className="pl-9">
                  <p className="mb-3">Les présentes CGV encadrent :</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>la vente de produits professionnels Pallmann (vernis, huiles, primaires…),</li>
                    <li>la vente de consommables et accessoires (grilles, abrasifs, disques, grattoirs…),</li>
                    <li>la vente éventuelle d'outils ou petits matériels destinés à la rénovation de parquet.</li>
                  </ul>
                  <p className="mt-3 italic text-gray-600">
                    Ces CGV ne concernent pas la location de machines, qui fait l'objet de CGV distinctes.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <ShoppingCart className="w-6 h-6 text-[#b8941a]" />
                  2. Commandes et formation du contrat
                </h2>
                <div className="space-y-4 pl-9">
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">2.1. Passation de commande</p>
                    <p>La commande est enregistrée lorsque l'Acheteur valide son panier et procède au paiement.
                    Toute commande implique l'ouverture d'un compte client ou la communication des données
                    nécessaires au traitement de la commande.</p>
                    <p className="mt-2">Le Vendeur accepte les commandes dans la limite des stocks disponibles.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-2">2.2. Acceptation de commande</p>
                    <p>Le contrat est formé dès la confirmation de commande envoyée par e-mail par le Vendeur.</p>
                    <p className="mt-2">Le Vendeur se réserve la possibilité de refuser ou d'annuler une commande en cas de :</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>suspicion de fraude,</li>
                      <li>ruptures de stock prolongée,</li>
                      <li>demande anormale ou de mauvaise foi,</li>
                      <li>litige antérieur de paiement.</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-2">2.3. Commandes professionnelles</p>
                    <p>Pour les clients professionnels, le Vendeur peut exiger :</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>un acompte,</li>
                      <li>un paiement comptant,</li>
                      <li>une preuve d'activité.</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-2">2.4. Irrevocabilité</p>
                    <p>Toute commande confirmée est considérée comme ferme et définitive.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Package className="w-6 h-6 text-[#b8941a]" />
                  3. Produits
                </h2>
                <div className="space-y-4 pl-9">
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">3.1. Description</p>
                    <p>Les photos, fiches techniques, notices, couleurs, conditionnements et informations fournies
                    sur le site sont données à titre indicatif. Les produits peuvent évoluer sans préavis (nouveaux
                    packagings, formulations mises à jour par les fabricants, etc.).</p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-2">3.2. Compatibilité et usage</p>
                    <p>Les produits vendus sont destinés à un usage professionnel ou à des particuliers réalisant
                    eux-mêmes leurs travaux. L'Acheteur est seul responsable du choix des produits et de leur
                    compatibilité avec l'usage envisagé.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-2">3.3. Retour de produits</p>
                    <p>Tout retour doit faire l'objet d'un accord préalable écrit du Vendeur. Sauf erreur du Vendeur :</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>les frais de retour sont à la charge de l'Acheteur,</li>
                      <li>les produits doivent être retournés non ouverts, non utilisés, dans leur emballage d'origine.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Truck className="w-6 h-6 text-[#b8941a]" />
                  4. Livraison
                </h2>
                <div className="space-y-4 pl-9">
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">4.1. Modes de livraison</p>
                    <p>Le Vendeur propose :</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Mondial Relay (point relais),</li>
                      <li>Colissimo (domicile),</li>
                      <li>Transporteur palette (produits volumineux ou dangereux),</li>
                      <li>Retrait sur place : agence Les Ponceurs Réunis, Herrlisheim-près-Colmar.</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-2">4.2. Délais</p>
                    <p>Les délais indiqués sur le site sont indicatifs. Un retard ne donne droit ni à indemnisation
                    ni à annulation, sauf disposition légale impérative.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-2">4.3. Force majeure</p>
                    <p>Le Vendeur n'est pas responsable des retards résultant d'événements extérieurs :
                    intempéries, grève transporteur, incident réseau, rupture fournisseur, etc.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Truck className="w-6 h-6 text-[#b8941a]" />
                  5. Transport et transfert des risques
                </h2>
                <div className="space-y-4 pl-9">
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">5.1. Transport</p>
                    <p>Les produits voyagent sous la responsabilité :</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>du transporteur dès la remise du colis,</li>
                      <li>du client en cas de retrait en agence.</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-2">5.2. Réserves transport</p>
                    <p>En cas d'avarie ou manquant :</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>mention obligatoire sur le bon de livraison,</li>
                      <li>confirmation écrite au transporteur dans les 3 jours ouvrables (LRAR),</li>
                      <li>copie au Vendeur.</li>
                    </ul>
                    <p className="mt-2 font-medium text-gray-900">Sans ces réserves, aucun recours n'est possible.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-[#b8941a]" />
                  6. Réception
                </h2>
                <div className="space-y-4 pl-9">
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">6.1. Conformité</p>
                    <p>Toute réclamation pour non-conformité ou défaut apparent doit être signalée au Vendeur
                    dans un délai de 48 heures après livraison, par écrit.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-2">6.2. Retour</p>
                    <p>Tout retour nécessite un accord formel du Vendeur. Le produit doit être strictement neuf,
                    non ouvert, non détérioré.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Euro className="w-6 h-6 text-[#b8941a]" />
                  7. Prix et facturation
                </h2>
                <div className="space-y-4 pl-9">
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">7.1. Prix</p>
                    <p>Les prix affichés sur le site :</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>sont exprimés en euros,</li>
                      <li>s'entendent TTC pour les particuliers,</li>
                      <li>HT/TTC pour les professionnels selon affichage,</li>
                      <li>ne comprennent pas les frais de livraison.</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-2">7.2. Palettes et emballages</p>
                    <p>Les palettes expédiées restent la propriété du Vendeur si elles sont consignées.
                    Si elles ne sont pas restituées, elles pourront être facturées.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Euro className="w-6 h-6 text-[#b8941a]" />
                  8. Paiement
                </h2>
                <div className="space-y-4 pl-9">
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">8.1. Paiement comptant</p>
                    <p>Les produits sont payables comptant, à la commande.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-2">8.2. Commandes professionnelles</p>
                    <p>Possibilité de paiement à 30 jours fin de mois uniquement pour les clients professionnels
                    préalablement agréés. Aucun escompte pour paiement anticipé.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-2">8.3. Retards de paiement</p>
                    <p>Tout retard entraîne :</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>pénalités = 3 × taux d'intérêt légal,</li>
                      <li>indemnité forfaitaire 40 €,</li>
                      <li>suspension ou annulation des commandes en cours.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-[#b8941a]" />
                  9. Réserve de propriété
                </h2>
                <div className="pl-9">
                  <p>Les produits restent la propriété du Vendeur jusqu'au paiement intégral du prix.
                  En revanche, les risques (perte, vol, détérioration) sont transférés à l'Acheteur dès la
                  remise au transporteur.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-[#b8941a]" />
                  10. Garantie
                </h2>
                <div className="space-y-4 pl-9">
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">10.1. Garantie légale</p>
                    <p>Le Vendeur applique exclusivement les garanties légales françaises :</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>garantie légale de conformité (articles L217-3 à L217-20 du Code de la consommation),</li>
                      <li>garantie des vices cachés (articles 1641 à 1649 du Code civil).</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-2">10.2. Exclusions</p>
                    <p>Sont exclus :</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>mauvaise utilisation,</li>
                      <li>stockage inadapté (gel, chaleur),</li>
                      <li>produit ouvert,</li>
                      <li>produit périmé,</li>
                      <li>application non conforme aux recommandations du fabricant.</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-2">10.3. Limitation</p>
                    <p>La garantie couvre uniquement le remplacement du produit défectueux. Elle ne couvre jamais :</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>main-d'œuvre,</li>
                      <li>immobilisation de chantier,</li>
                      <li>pertes indirectes,</li>
                      <li>coûts de mise en œuvre.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-[#b8941a]" />
                  11. Responsabilité
                </h2>
                <div className="pl-9">
                  <p>Le Vendeur n'est pas responsable des :</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>dommages indirects,</li>
                    <li>pertes financières,</li>
                    <li>défauts liés à une application non conforme,</li>
                    <li>incompatibilités de produits,</li>
                    <li>erreurs d'appréciation de l'Acheteur lors du choix des produits.</li>
                  </ul>
                  <p className="mt-3 font-medium text-gray-900">
                    L'Acheteur doit réaliser des essais préalables avant toute mise en œuvre définitive.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Données personnelles (RGPD)</h2>
                <div className="pl-9">
                  <p>Les données collectées servent au :</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>traitement de la commande,</li>
                    <li>service après-vente,</li>
                    <li>gestion du compte client,</li>
                    <li>obligations légales (facturation).</li>
                  </ul>
                  <p className="mt-3">L'Acheteur dispose des droits d'accès, rectification, opposition, suppression.
                  Demande par e-mail : <a href="mailto:contact@poncages.fr" className="text-[#b8941a] hover:underline font-medium">contact@poncages.fr</a></p>
                  <p className="mt-3">Le Vendeur peut recourir à des prestataires (transport, hébergement) dans le respect du RGPD.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Litiges</h2>
                <div className="pl-9">
                  <p>Le droit français s'applique. En cas de litige :</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>tentative de résolution amiable prioritaire,</li>
                    <li>juridiction compétente : tribunal du ressort du siège du Vendeur (Colmar),</li>
                    <li>pour les particuliers : possibilité de saisir un médiateur de la consommation.</li>
                  </ul>
                </div>
              </section>

              <section className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
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
