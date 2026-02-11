import React, { useState, useEffect } from 'react';
import { X, Tag, Sparkles, Gift } from 'lucide-react';

interface PromoCodeBannerProps {
  className?: string;
}

const PromoCodeBanner: React.FC<PromoCodeBannerProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Check localStorage for dismissed state
  useEffect(() => {
    const dismissed = localStorage.getItem('promo-banner-dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed, 10);
      // Show again after 24 hours
      if (Date.now() - dismissedTime < 24 * 60 * 60 * 1000) {
        setIsVisible(false);
      }
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('promo-banner-dismissed', Date.now().toString());
  };

  const handleApplyCode = () => {
    if (promoCode.trim()) {
      // Store the promo code for use in checkout
      localStorage.setItem('pending-promo-code', promoCode.toUpperCase());
      // Navigate to shop or show confirmation
      window.location.href = '/#products';
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Gradient background with animation */}
      <div 
        className="relative py-3 px-4"
        style={{ 
          background: 'linear-gradient(135deg, #1A1A1A 0%, #2D3748 50%, #1A1A1A 100%)',
        }}
      >
        {/* Animated shine effect */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,153,0,0.3) 50%, transparent 100%)',
            animation: 'shine 3s infinite',
          }}
        />
        
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
          {/* Left side - Message */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 items-center justify-center">
              <Gift className="w-5 h-5 text-white" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-white font-bold text-sm sm:text-base flex items-center gap-2 justify-center sm:justify-start">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Code PRO ou Offre spéciale ?
              </p>
              <p className="text-white/70 text-xs sm:text-sm">
                Entrez votre code pour débloquer vos tarifs préférentiels
              </p>
            </div>
          </div>

          {/* Right side - Input and buttons */}
          <div className="flex items-center gap-2">
            {isExpanded ? (
              <div className="flex items-center gap-2 animate-fadeIn">
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="CODE PROMO"
                    className="pl-10 pr-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent w-36 sm:w-44"
                    onKeyDown={(e) => e.key === 'Enter' && handleApplyCode()}
                    autoFocus
                  />
                </div>
                <button
                  onClick={handleApplyCode}
                  disabled={!promoCode.trim()}
                  className="px-4 py-2 rounded-lg font-bold text-sm text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
                  style={{ 
                    background: promoCode.trim() 
                      ? 'linear-gradient(135deg, #FF9900 0%, #F0C300 100%)' 
                      : 'rgba(255,255,255,0.1)'
                  }}
                >
                  Appliquer
                </button>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-2 text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsExpanded(true)}
                className="px-5 py-2 rounded-lg font-bold text-sm text-white transition-all hover:shadow-lg hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #FF9900 0%, #F0C300 100%)' }}
              >
                J'ai un code
              </button>
            )}
            
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="p-2 text-white/40 hover:text-white transition-colors rounded-full hover:bg-white/10"
              title="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* CSS for shine animation */}
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PromoCodeBanner;
