import React from 'react';

const MarqueeBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-primary-dark via-primary to-accent text-white py-2 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex">
        {[...Array(4)].map((_, i) => (
          <span key={i} className="mx-8 flex items-center gap-2">
            <span className="text-xl">📞</span>
            <span className="font-medium">Contacter un Technicien pour votre projet</span>
            <span className="mx-4">•</span>
            <span className="text-xl">🛠️</span>
            <span className="font-medium">Conseils d'experts gratuits</span>
            <span className="mx-4">•</span>
            <span className="text-xl">🚚</span>
            <span className="font-medium">Livraison France entière</span>
            <span className="mx-4">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBanner;
