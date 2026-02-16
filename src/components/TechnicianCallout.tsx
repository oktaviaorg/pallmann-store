import React from 'react';
import { Phone, CheckCircle } from 'lucide-react';

interface TechnicianCalloutProps {
  variant?: 'default' | 'compact';
}

const TechnicianCallout: React.FC<TechnicianCalloutProps> = ({ variant = 'default' }) => {
  if (variant === 'compact') {
    return (
      <a 
        href="tel:+33756971137"
        className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors"
      >
        <Phone className="w-4 h-4 text-blue-600" />
        <span className="text-sm font-medium text-blue-800">
          Un doute ? <strong>07 56 97 11 37</strong>
        </span>
      </a>
    );
  }

  return (
    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-blue-600 rounded-lg">
          <Phone className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 mb-1">
            Besoin de conseils avant de commander ?
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            Un technicien valide votre choix et vos quantités.
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-flex items-center gap-1 text-xs bg-white px-2 py-1 rounded-full text-green-700">
              <CheckCircle className="w-3 h-3" /> Conseil gratuit
            </span>
            <span className="inline-flex items-center gap-1 text-xs bg-white px-2 py-1 rounded-full text-green-700">
              <CheckCircle className="w-3 h-3" /> Réponse immédiate
            </span>
          </div>
          <a 
            href="tel:+33756971137"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
          >
            <Phone className="w-4 h-4" />
            07 56 97 11 37
          </a>
        </div>
      </div>
    </div>
  );
};

export default TechnicianCallout;
