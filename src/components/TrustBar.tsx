import React from 'react';
import { Shield, Truck, Award, HeadphonesIcon, CreditCard, CheckCircle } from 'lucide-react';

const TrustBar: React.FC = () => {
  const trustItems = [
    {
      icon: Award,
      title: 'Produits Authentiques',
      subtitle: '100% Pallmann officiel',
    },
    {
      icon: Truck,
      title: 'Livraison Rapide',
      subtitle: '48-72h en France',
    },
    {
      icon: Shield,
      title: 'Paiement Sécurisé',
      subtitle: 'CB, Virement, Chèque',
    },
    {
      icon: HeadphonesIcon,
      title: 'Conseils Experts',
      subtitle: 'Équipe pro à votre écoute',
    },
  ];

  return (
    <div className="bg-white border-b border-gray-100 py-3 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between gap-6 overflow-x-auto scrollbar-hide">
          {trustItems.map((item, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 min-w-max"
            >
              <item.icon className="w-5 h-5 text-[#2563EB] flex-shrink-0" />
              <div className="text-left">
                <p className="text-xs font-bold text-[#0F172A] leading-tight">{item.title}</p>
                <p className="text-[10px] text-[#64748B]">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
