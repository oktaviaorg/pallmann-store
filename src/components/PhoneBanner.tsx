import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

const PhoneBanner: React.FC = () => {
  return (
    <div 
      className="text-center py-2 text-sm font-medium text-white"
      style={{ background: 'linear-gradient(90deg, #1e3a5f 0%, #2c5282 100%)' }}
    >
      <a 
        href="tel:+33756971137" 
        className="inline-flex items-center gap-2 hover:underline"
      >
        <Phone className="w-4 h-4 animate-pulse" />
        <span>
          <strong>Besoin de conseils ?</strong> Un technicien vous guide : 
          <span className="ml-1 font-bold">07 56 97 11 37</span>
        </span>
        <MessageCircle className="w-4 h-4" />
      </a>
    </div>
  );
};

export default PhoneBanner;
