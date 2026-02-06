import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Building, Mail, Phone, MapPin } from 'lucide-react';

export default function MentionsLegales() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>Mentions Légales | Pallmann Store</title>
        <meta name="description" content="Mentions légales du site Pallmann Store - pallmann-store.com" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <Header />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 pb-4 border-b-4 border-[#ff9900]">
              Mentions Légales
            </h1>

            <div className="space-y-8 text-gray-700">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Building className="w-6 h-6 text-[#ff9900]" />
                  Informations sur l'entreprise
                </h2>
                <div className="space-y-2 pl-9">
                  <p><strong>Raison sociale :</strong> Pallmann Store - Groupe Renoline SARL</p>
                  <p><strong>Forme juridique :</strong> SARL (Société à Responsabilité Limitée)</p>
                  <p><strong>Numéro SIRET :</strong> 832 059 513 00016</p>
                  <p><strong>Numéro TVA intracommunautaire :</strong> FR48832059513</p>
                  <p><strong>Capital social :</strong> 10 000 €</p>
                  <p><strong>Responsable de publication :</strong> Julien Dietemann</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-[#ff9900]" />
                  Siège social
                </h2>
                <div className="space-y-2 pl-9">
                  <p>Groupe Renoline SARL</p>
                  <p>6 rue du Commerce</p>
                  <p>68420 Herrlisheim près Colmar</p>
                  <p>France</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Phone className="w-6 h-6 text-[#ff9900]" />
                  Contact
                </h2>
                <div className="space-y-2 pl-9">
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <a href="mailto:contact@pallmann-store.com" className="text-[#ff9900] hover:underline">
                      contact@pallmann-store.com
                    </a>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Hébergement du site</h2>
                <div className="space-y-2 pl-9">
                  <p><strong>Hébergeur :</strong> Vercel Inc.</p>
                  <p>440 N Barranca Ave #4133</p>
                  <p>Covina, CA 91723</p>
                  <p>États-Unis</p>
                  <p>Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[#ff9900] hover:underline">www.vercel.com</a></p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Propriété intellectuelle</h2>
                <div className="space-y-3 pl-9">
                  <p>
                    Le contenu du site pallmann-store.com (textes, images, graphismes, logo, vidéos, etc.)
                    est la propriété exclusive de Groupe Renoline SARL, à l'exception des marques, logos ou
                    contenus appartenant à Pallmann ou à d'autres sociétés partenaires.
                  </p>
                  <p>
                    La marque Pallmann® est une marque déposée de Uzin Utz AG. L'utilisation de cette marque
                    sur ce site est autorisée dans le cadre de la distribution des produits.
                  </p>
                  <p>
                    Toute reproduction, distribution, modification, adaptation, retransmission ou publication,
                    même partielle, de ces différents éléments est strictement interdite sans l'accord exprès
                    par écrit de Groupe Renoline SARL.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Protection des données personnelles</h2>
                <div className="space-y-3 pl-9">
                  <p>
                    Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
                    Informatique et Libertés, vous disposez d'un droit d'accès, de rectification et de
                    suppression des données vous concernant.
                  </p>
                  <p>
                    Pour exercer ces droits, vous pouvez nous contacter à l'adresse :
                    <a href="mailto:contact@pallmann-store.com" className="text-[#ff9900] hover:underline ml-1">
                      contact@pallmann-store.com
                    </a>
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies</h2>
                <div className="space-y-3 pl-9">
                  <p>
                    Le site pallmann-store.com utilise des cookies pour améliorer votre expérience de
                    navigation et réaliser des statistiques de visites.
                  </p>
                  <p>
                    Vous pouvez à tout moment désactiver ces cookies dans les paramètres de votre navigateur.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Liens hypertextes</h2>
                <div className="space-y-3 pl-9">
                  <p>
                    Le site pallmann-store.com peut contenir des liens hypertextes vers d'autres sites.
                    Groupe Renoline SARL n'exerce aucun contrôle sur ces sites et décline toute responsabilité
                    quant à leur contenu.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation de responsabilité</h2>
                <div className="space-y-3 pl-9">
                  <p>
                    Groupe Renoline SARL s'efforce d'assurer l'exactitude et la mise à jour des informations
                    diffusées sur ce site, dont elle se réserve le droit de corriger, à tout moment et sans
                    préavis, le contenu.
                  </p>
                  <p>
                    Toutefois, Groupe Renoline SARL ne peut garantir l'exactitude, la précision ou l'exhaustivité
                    des informations mises à disposition sur ce site.
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
