import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, Package, ArrowRight } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  ref: string;
  slug: string;
  price_public_ht: number;
  image_url?: string;
}

interface SearchAutocompleteProps {
  products: Product[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onProductSelect?: (product: Product) => void;
  placeholder?: string;
  className?: string;
}

const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({
  products,
  searchTerm,
  onSearchChange,
  onProductSelect,
  placeholder = "Rechercher un produit...",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Normaliser le texte pour la recherche
  const normalize = (str: string) => {
    return str.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, ' ')
      .trim();
  };

  // Suggestions filtrées (max 8)
  const suggestions = useMemo(() => {
    if (!searchTerm || searchTerm.length < 2) return [];
    
    const searchNormalized = normalize(searchTerm);
    const terms = searchNormalized.split(' ').filter(t => t.length > 0);
    
    return products
      .filter(product => {
        const nameNormalized = normalize(product.name);
        const refLower = (product.ref || '').toLowerCase();
        
        // Tous les termes doivent matcher
        return terms.every(term => 
          nameNormalized.includes(term) || refLower.includes(term)
        );
      })
      .slice(0, 8);
  }, [products, searchTerm]);

  // Fermer quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Ouvrir quand il y a des suggestions
  useEffect(() => {
    if (suggestions.length > 0 && searchTerm.length >= 2) {
      setIsOpen(true);
      setHighlightedIndex(-1);
    } else {
      setIsOpen(false);
    }
  }, [suggestions, searchTerm]);

  // Navigation clavier
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
          handleSelect(suggestions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  const handleSelect = (product: Product) => {
    onSearchChange(product.name);
    setIsOpen(false);
    if (onProductSelect) {
      onProductSelect(product);
    }
  };

  // Highlight les termes de recherche dans le texte
  const highlightMatch = (text: string) => {
    if (!searchTerm) return text;
    
    const terms = searchTerm.toLowerCase().split(' ').filter(t => t.length > 0);
    let result = text;
    
    terms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      result = result.replace(regex, '<mark class="bg-amber-200 text-amber-900 rounded px-0.5">$1</mark>');
    });
    
    return result;
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      {/* Input */}
      <div className="relative">
        <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
          searchTerm ? 'text-[#FF9900]' : 'text-gray-400'
        }`} />
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl text-base transition-all ${
            searchTerm 
              ? 'border-[#FF9900] bg-orange-50 focus:ring-2 focus:ring-[#FF9900]/30' 
              : 'border-gray-200 bg-white focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/20'
          }`}
          autoComplete="off"
        />
        {searchTerm && (
          <button
            onClick={() => {
              onSearchChange('');
              inputRef.current?.focus();
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Dropdown suggestions */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="py-2">
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
              {suggestions.length} suggestion{suggestions.length > 1 ? 's' : ''}
            </div>
            {suggestions.map((product, index) => (
              <button
                key={product.id}
                onClick={() => handleSelect(product)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors ${
                  index === highlightedIndex 
                    ? 'bg-amber-50' 
                    : 'hover:bg-gray-50'
                }`}
              >
                {/* Image ou icône */}
                {product.image_url ? (
                  <img 
                    src={product.image_url} 
                    alt="" 
                    className="w-10 h-10 object-contain rounded-lg bg-gray-100 p-1"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Package className="w-5 h-5 text-gray-400" />
                  </div>
                )}
                
                {/* Infos produit */}
                <div className="flex-1 min-w-0">
                  <div 
                    className="font-medium text-gray-900 truncate"
                    dangerouslySetInnerHTML={{ __html: highlightMatch(product.name) }}
                  />
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="font-mono">{product.ref}</span>
                    <span>•</span>
                    <span className="font-semibold text-[#FF9900]">{product.price_public_ht.toFixed(2)} €</span>
                  </div>
                </div>
                
                {/* Flèche */}
                <ArrowRight className={`w-4 h-4 transition-transform ${
                  index === highlightedIndex ? 'text-[#FF9900] translate-x-1' : 'text-gray-300'
                }`} />
              </button>
            ))}
          </div>
          
          {/* Footer */}
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 text-xs text-gray-500">
            ↑↓ pour naviguer • Entrée pour sélectionner • Échap pour fermer
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAutocomplete;
