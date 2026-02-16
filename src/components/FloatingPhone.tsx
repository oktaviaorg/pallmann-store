import React from 'react';
import { Phone } from 'lucide-react';

const FloatingPhone: React.FC = () => {
  return (
    <a
      href="tel:+33756971137"
      className="fixed bottom-24 left-4 z-40 md:hidden flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all animate-bounce-slow"
      aria-label="Appeler un technicien"
    >
      <Phone className="w-6 h-6" />
      
      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30"></span>
    </a>
  );
};

export default FloatingPhone;
