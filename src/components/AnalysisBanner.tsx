import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Camera, X, ArrowRight, Sparkles } from 'lucide-react';

const AnalysisBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldShow(true);
      setIsVisible(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldShow || !isVisible) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-green-500 via-emerald-600 to-green-500 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="hidden sm:flex w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl items-center justify-center flex-shrink-0">
              <Camera className="w-6 h-6" />
            </div>

            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full">
                  NOUVEAU SERVICE
                </span>
              </div>
              <p className="font-bold text-sm sm:text-base">
                Diagnostic Gratuit par Photo
                <span className="hidden sm:inline"> • Envoyez 2 photos sur WhatsApp et recevez une analyse en 2h</span>
                <span className="inline sm:hidden"> • Analyse en 2h</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/analyse-parquet-gratuite"
              className="inline-flex items-center gap-2 bg-white text-green-600 px-5 py-2.5 rounded-lg font-bold text-sm hover:scale-105 transition-all duration-300 shadow-lg group"
            >
              <span className="hidden sm:inline">Analyser mon parquet</span>
              <span className="inline sm:hidden">En savoir plus</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={() => setIsVisible(false)}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisBanner;
