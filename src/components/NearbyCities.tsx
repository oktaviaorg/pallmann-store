import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

interface City {
  name: string;
  url: string;
  distance?: string;
}

interface NearbyCitiesProps {
  currentCity: string;
  cities: City[];
}

const NearbyCities: React.FC<NearbyCitiesProps> = ({ currentCity, cities }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 md:p-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Nous Intervenons Aussi dans les Villes Voisines
        </h2>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          Depuis {currentCity}, nous couvrons toute la région. Découvrez nos services de ponçage et rénovation de parquet dans les villes proches.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {cities.map((city, index) => (
          <Link
            key={index}
            to={city.url}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 group border border-gray-200"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {city.name}
                </h3>
                {city.distance && (
                  <p className="text-sm text-gray-600 mb-2">
                    À {city.distance} de {currentCity}
                  </p>
                )}
                <p className="text-sm text-blue-600 font-semibold group-hover:underline">
                  Voir nos services →
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-gray-600 mb-4">
          Une question sur nos zones d'intervention ?
        </p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold hover:underline"
        >
          Découvrir tous nos services
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default NearbyCities;
