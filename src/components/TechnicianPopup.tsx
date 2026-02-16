import React, { useState, useEffect } from 'react';
import { Phone, X } from 'lucide-react';

const TechnicianPopup: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Afficher après 3 secondes
    const showTimer = setTimeout(() => {
      if (!dismissed) {
        setVisible(true);
      }
    }, 3000);

    // Cacher au scroll
    const handleScroll = () => {
      if (visible) {
        setVisible(false);
        setDismissed(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(showTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visible, dismissed]);

  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-24 right-4 z-40 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 max-w-xs relative">
        {/* Close button */}
        <button 
          onClick={() => { setVisible(false); setDismissed(true); }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center"
        >
          <X className="w-3 h-3 text-gray-500" />
        </button>

        {/* Content */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Phone className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">
              Besoin d'un conseil ?
            </p>
            <p className="text-xs text-gray-500 mb-2">
              Un technicien confirmé vous répond
            </p>
            <a 
              href="tel:+33756971137"
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              07 56 97 11 37
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianPopup;
