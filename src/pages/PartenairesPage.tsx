import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MapPin, Phone, Globe, Mail } from 'lucide-react';

interface Partner {
  name: string;
  description: string;
  locations: string[];
  phone?: string;
  email?: string;
  website?: string;
  logo?: string;
  services: string[];
}

const partners: Partner[] = [
  {
    name: 'Les Ponceurs Réunis',
    description: 'Spécialistes du ponçage et de la rénovation de parquets. Intervention rapide et professionnelle sur tout le Grand Est.',
    locations: ['Colmar', 'Belfort', 'Strasbourg', 'Sarrebourg'],
    phone: '06 04 44 09 03',
    email: 'contact@poncages.fr',
    website: 'https://ponceur-parquet.fr',
    services: ['Ponçage parquet', 'Vitrification', 'Huilage', 'Rénovation complète'],
  },
  {
    name: "Parq'line",
    description: 'Expert en pose et rénovation de parquets. Qualité et savoir-faire au service de vos sols.',
    locations: ['Alsace'],
    phone: '',
    email: 'e.nuber@parqline.fr',
    website: '',
    services: ['Pose de parquet', 'Rénovation', 'Ponçage', 'Finition'],
  },
];

export default function PartenairesPage() {
  return (
    <>
      <Helmet>
        <title>Nos Partenaires Applicateurs | Pallmann Store</title>
        <meta name="description" content="Trouvez un applicateur professionnel Pallmann près de chez vous. Réseau de partenaires certifiés pour la pose et rénovation de parquet." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              Nos Partenaires Applicateurs
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des professionnels certifiés Pallmann pour vos projets de parquet. 
              Trouvez un expert près de chez vous.
            </p>
          </div>

          {/* Partners Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {partners.map((partner, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2c5282] p-6 text-white">
                  <h2 className="text-2xl font-bold mb-2">{partner.name}</h2>
                  <div className="flex flex-wrap gap-2">
                    {partner.locations.map((loc, i) => (
                      <span 
                        key={i}
                        className="inline-flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm"
                      >
                        <MapPin className="w-3 h-3" />
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{partner.description}</p>

                  {/* Services */}
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Services :</h3>
                    <div className="flex flex-wrap gap-2">
                      {partner.services.map((service, i) => (
                        <span 
                          key={i}
                          className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="border-t pt-4 space-y-2">
                    {partner.phone && (
                      <a 
                        href={`tel:${partner.phone.replace(/\s/g, '')}`}
                        className="flex items-center gap-2 text-gray-700 hover:text-[#E67E22]"
                      >
                        <Phone className="w-4 h-4" />
                        {partner.phone}
                      </a>
                    )}
                    {partner.email && (
                      <a 
                        href={`mailto:${partner.email}`}
                        className="flex items-center gap-2 text-gray-700 hover:text-[#E67E22]"
                      >
                        <Mail className="w-4 h-4" />
                        {partner.email}
                      </a>
                    )}
                    {partner.website && (
                      <a 
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-700 hover:text-[#E67E22]"
                      >
                        <Globe className="w-4 h-4" />
                        Voir le site web
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              Vous êtes professionnel du parquet ?
            </h2>
            <p className="mb-6 text-orange-100">
              Rejoignez notre réseau de partenaires et bénéficiez de tarifs préférentiels.
            </p>
            <a 
              href="/contact"
              className="inline-block bg-white text-orange-600 px-8 py-3 rounded-lg font-bold hover:bg-orange-50 transition-colors"
            >
              Devenir partenaire
            </a>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
