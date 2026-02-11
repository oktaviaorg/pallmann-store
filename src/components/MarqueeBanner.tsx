import React from 'react';
import { Tag, Truck, Phone, Percent, Gift, Sparkles } from 'lucide-react';

const MarqueeBanner: React.FC = () => {
  const promos = [
    { icon: Percent, text: '-10% sur les vitrificateurs PALL-X' },
    { icon: Truck, text: 'Livraison OFFERTE dès 630€ HT' },
    { icon: Gift, text: 'Kit d\'application OFFERT pour tout achat machine' },
    { icon: Tag, text: 'PROMO : Magic Oil 2K à 89€ HT le litre' },
    { icon: Sparkles, text: 'NOUVEAU : Gamme OUTDOOR disponible' },
    { icon: Phone, text: 'Conseil technicien : 07 57 82 13 06' },
  ];

  return (
    <div className="bg-gradient-to-r from-[#C41E3A] via-[#9B1830] to-[#C41E3A] text-white py-2.5 overflow-hidden border-b border-[#C41E3A]/20">
      <div className="animate-marquee whitespace-nowrap flex">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center">
            {promos.map((promo, j) => (
              <span key={j} className="mx-6 flex items-center gap-2">
                <promo.icon className="w-4 h-4 text-[#C41E3A]" />
                <span className="font-medium text-sm">{promo.text}</span>
                <span className="mx-4 text-[#C41E3A]">•</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBanner;
