import React from 'react';
import { Search, Droplets, Shield, X, CheckCircle } from 'lucide-react';

interface ProductSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  productType: 'all' | 'vitrificateurs' | 'huiles';
  onTypeChange: (type: 'all' | 'vitrificateurs' | 'huiles') => void;
  variant?: 'hero' | 'inline';
}

const ProductSearchBar: React.FC<ProductSearchBarProps> = ({
  searchTerm,
  onSearchChange,
  productType,
  onTypeChange,
  variant = 'hero'
}) => {
  const isHero = variant === 'hero';
  const hasSearch = searchTerm.length > 0;
  
  return (
    <div className={`${isHero ? 'bg-gradient-to-r from-gray-50 to-orange-50 py-6 border-y border-gray-200' : 'bg-white/80 backdrop-blur-sm py-4 rounded-xl shadow-sm border border-gray-100'}`}>
      <div className={`${isHero ? 'max-w-7xl mx-auto px-4' : 'px-4'}`}>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Titre (hero only) */}
          {isHero && (
            <div className="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-600 min-w-fit">
              <Search className="w-4 h-4" />
              Recherche rapide :
            </div>
          )}
          
          {/* Search Input with Button */}
          <div className="relative flex-grow w-full sm:max-w-lg flex gap-2">
            <div className="relative flex-grow">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors ${hasSearch ? 'text-[#FF9900]' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Nom ou référence (ex: 041111, PALL-X 96...)"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className={`w-full pl-10 pr-10 py-2.5 border-2 rounded-xl focus:ring-2 focus:ring-[#FF9900] focus:border-[#FF9900] transition-all text-sm ${
                  hasSearch ? 'border-[#FF9900] bg-orange-50' : 'border-gray-200 bg-white'
                }`}
              />
              {searchTerm && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  title="Effacer la recherche"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {/* Search feedback indicator */}
            {hasSearch && (
              <div className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 rounded-xl text-sm font-medium whitespace-nowrap">
                <CheckCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Filtré</span>
              </div>
            )}
          </div>
          
          {/* Type Filters */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onTypeChange('all')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                productType === 'all'
                  ? 'bg-[#1A1A1A] text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => onTypeChange('vitrificateurs')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                productType === 'vitrificateurs'
                  ? 'text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
              style={productType === 'vitrificateurs' ? { background: 'linear-gradient(135deg, #FF9900 0%, #F0C300 100%)' } : {}}
            >
              <Shield className="w-4 h-4" />
              Vitrificateurs
            </button>
            <button
              onClick={() => onTypeChange('huiles')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                productType === 'huiles'
                  ? 'text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
              style={productType === 'huiles' ? { background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' } : {}}
            >
              <Droplets className="w-4 h-4" />
              Huiles
            </button>
          </div>
        </div>
        
        {/* Quick hint */}
        {isHero && (
          <div className="mt-3 text-center sm:text-left">
            <span className="text-xs text-gray-500">
              💡 Tapez pour filtrer instantanément • <strong>Vitrificateurs</strong> = protection filmogène | <strong>Huiles</strong> = finition naturelle
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSearchBar;
