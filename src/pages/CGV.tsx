import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FileText, CheckCircle, AlertCircle, Euro } from 'lucide-react';

export default function CGV() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Helmet>
        <title>Conditions Générales de Vente | Les Ponceurs Réunis</title>
        <meta name="description" content="Conditions générales de vente des services de ponçage et rénovation de parquet - Les Ponceurs Réunis" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <Header />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 pb-4 border-b-4 border-[#d9b45a]">
              Conditions Générales de Vente
            </h1>

            <div className="space-y-8 text-gray-700">
              <section>
                <div className="bg-[#d9b45a]/10 border-l-4 border-[#d9b45a] p-4 mb-6">
                  <p className="text-gray-800 font-medium">
                    Les présentes Conditions Générales de Vente (CGV) s'appliquent à tous les services de
                    ponçage et rénovation de parquet proposés par Les Ponceurs Réunis.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <FileText className="w-6 h-6 text-[#b8941a]" />
                  Article 1 - Champ d'application
                </h2>
                <div className="space-y-3 pl-9">
                  <p>
                    Les présentes CGV régissent les relations contractuelles entre Les Ponceurs Réunis et
                    ses clients pour tous travaux de ponçage, vitrification, huilage et rénovation de parquet.
                  </p>
                  <p>
                    Toute commande implique l'acceptation sans réserve des présentes CGV qui prévalent sur
                    tout autre document, sauf accord écrit préalable.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Euro className="w-6 h-6 text-[#b8941a]" />
                  Article 2 - Devis et commandes
                </h2>
                <div className="space-y-3 pl-9">
                  <p>
                    <strong>2.1 Établissement du devis</strong><br />
                    Tout devis établi par Les Ponceurs Réunis est gratuit et sans engagement. Il est valable
                    pendant 3 mois à compter de sa date d'émission.
                  </p>
                  <p>
                    <strong>2.2 Acceptation du devis</strong><br />
                    La commande est considérée comme définitive après signature du devis par le client et
                    versement de l'acompte le cas échéant. Tout devis signé vaut acceptation des présentes CGV.
                  </p>
                  <p>
                    <strong>2.3 Modifications</strong><br />
                    Toute modification demandée par le client après signature du devis fera l'objet d'un
                    avenant et pourra entraîner une révision du prix et des délais.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Euro className="w-6 h-6 text-[#b8941a]" />
                  Article 3 - Prix et modalités de paiement
                </h2>
                <div className="space-y-3 pl-9">
                  <p>
                    <strong>3.1 Prix</strong><br />
                    Les prix sont indiqués en euros TTC (TVA applicable au taux en vigueur). Les prix sont
                    fermes et non révisables pendant la durée de validité du devis.
                  </p>
                  <p>
                    <strong>3.2 Modalités de paiement</strong><br />
                    Un acompte de 30% peut être demandé à la signature du devis. Le solde est payable à
                    l'achèvement des travaux, après constat de conformité.
                  </p>
                  <p>
                    <strong>3.3 Moyens de paiement acceptés</strong><br />
                    Espèces (dans la limite légale), chèque, virement bancaire, carte bancaire.
                  </p>
                  <p>
                    <strong>3.4 Retard de paiement</strong><br />
                    En cas de retard de paiement, des pénalités de retard égales à 3 fois le taux d'intérêt
                    légal seront appliquées, ainsi qu'une indemnité forfaitaire de 40€ pour frais de recouvrement.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-[#b8941a]" />
                  Article 4 - Exécution des travaux
                </h2>
                <div className="space-y-3 pl-9">
                  <p>
                    <strong>4.1 Délais</strong><br />
                    Les délais d'intervention sont communiqués à titre indicatif. Les Ponceurs Réunis s'engage
                    à respecter au mieux les délais convenus, sauf cas de force majeure.
                  </p>
                  <p>
                    <strong>4.2 Accès au chantier</strong><br />
                    Le client s'engage à fournir un accès libre et dégagé aux surfaces à traiter. Les meubles
                    et objets doivent être retirés par le client sauf convention contraire.
                  </p>
                  <p>
                    <strong>4.3 État des lieux</strong><br />
                    Un état des lieux contradictoire est réalisé avant et après les travaux pour constater
                    l'état initial et final du chantier.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-[#b8941a]" />
                  Article 5 - Garanties
                </h2>
                <div className="space-y-3 pl-9">
                  <p>
                    <strong>5.1 Garantie de conformité</strong><br />
                    Les travaux réalisés sont garantis conformes aux termes du devis accepté. Toute non-conformité
                    doit être signalée dans les 8 jours suivant la fin des travaux.
                  </p>
                  <p>
                    <strong>5.2 Garantie décennale</strong><br />
                    Les Ponceurs Réunis dispose d'une assurance responsabilité civile professionnelle et
                    décennale couvrant les travaux réalisés.
                  </p>
                  <p>
                    <strong>5.3 Exclusions</strong><br />
                    La garantie ne couvre pas les dommages résultant d'un usage anormal, d'un défaut d'entretien
                    ou de modifications effectuées par le client ou un tiers.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-[#b8941a]" />
                  Article 6 - Responsabilité
                </h2>
                <div className="space-y-3 pl-9">
                  <p>
                    Les Ponceurs Réunis est responsable de la bonne exécution des travaux conformément aux
                    règles de l'art. Sa responsabilité ne peut être engagée en cas de dommages résultant de
                    l'état préexistant du support ou de défauts cachés non décelables lors de l'établissement
                    du devis.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 7 - Annulation</h2>
                <div className="space-y-3 pl-9">
                  <p>
                    <strong>7.1 Droit de rétractation</strong><br />
                    Conformément à l'article L221-18 du Code de la consommation, le client dispose d'un délai
                    de 14 jours pour exercer son droit de rétractation, sauf s'il a expressément renoncé à ce
                    droit pour une exécution immédiate des travaux.
                  </p>
                  <p>
                    <strong>7.2 Annulation par le client</strong><br />
                    Toute annulation par le client après le délai de rétractation entraîne la conservation de
                    l'acompte versé à titre de dédommagement.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 8 - Force majeure</h2>
                <div className="space-y-3 pl-9">
                  <p>
                    Les Ponceurs Réunis ne pourra être tenue responsable de tout retard ou inexécution de ses
                    obligations résultant d'un cas de force majeure tel que défini par la jurisprudence française.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 9 - Protection des données</h2>
                <div className="space-y-3 pl-9">
                  <p>
                    Les données personnelles collectées sont nécessaires à l'exécution du contrat et à la
                    gestion de la relation client. Elles font l'objet d'un traitement informatique conforme au RGPD.
                  </p>
                  <p>
                    Pour plus d'informations, consultez notre{' '}
                    <a href="/politique-confidentialite" className="text-[#b8941a] hover:underline font-medium">
                      Politique de Confidentialité
                    </a>.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 10 - Litiges</h2>
                <div className="space-y-3 pl-9">
                  <p>
                    En cas de litige, une solution amiable sera recherchée avant toute action judiciaire.
                    À défaut, les tribunaux français seront seuls compétents.
                  </p>
                  <p>
                    Le client peut également recourir à la médiation de la consommation dans les conditions
                    prévues par le Code de la consommation.
                  </p>
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
