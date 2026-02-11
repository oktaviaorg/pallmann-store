import React from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, Truck, Award, HeadphonesIcon } from 'lucide-react';

const TrustBar: React.FC = () => {
  const { t } = useTranslation();

  const trustItems = [
    {
      icon: Award,
      titleKey: 'trust.authentic',
      subtitle: '100% Pallmann',
    },
    {
      icon: Truck,
      titleKey: 'trust.shipping',
      subtitle: 'France entière 48-72h',
    },
    {
      icon: Shield,
      titleKey: 'trust.secure',
      subtitle: 'CB, Virement',
    },
    {
      icon: HeadphonesIcon,
      titleKey: 'trust.expert',
      subtitle: 'Pro team',
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
              <item.icon className="w-5 h-5 text-[#E67E22] flex-shrink-0" />
              <div className="text-left">
                <p className="text-xs font-bold text-[#1A1A1A] leading-tight">{t(item.titleKey)}</p>
                <p className="text-[10px] text-[#6B6B6B]">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
