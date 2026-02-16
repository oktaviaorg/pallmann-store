import React from 'react';
import { Link } from 'react-router-dom';
import { X, GitCompare, Trash2 } from 'lucide-react';
import { useCompare } from '../lib/CompareContext';

const CompareBar: React.FC = () => {
  const { products, removeProduct, clearAll } = useCompare();

  if (products.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-blue-500 shadow-2xl z-50 animate-slide-up">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Produits sélectionnés */}
          <div className="flex items-center gap-3 flex-1 overflow-x-auto">
            <div className="flex items-center gap-2 text-blue-600 font-semibold whitespace-nowrap">
              <GitCompare className="w-5 h-5" />
              <span className="hidden sm:inline">Comparer ({products.length}/3)</span>
            </div>
            
            {products.map(product => (
              <div 
                key={product.id}
                className="flex items-center gap-2 bg-gray-100 rounded-lg pl-2 pr-1 py-1 min-w-0"
              >
                {product.image_url && (
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-8 h-8 object-contain rounded"
                  />
                )}
                <span className="text-sm font-medium truncate max-w-[100px] sm:max-w-[150px]">
                  {product.name.split(' ').slice(0, 3).join(' ')}
                </span>
                <button
                  onClick={() => removeProduct(product.id)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={clearAll}
              className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg"
              title="Tout effacer"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            
            {products.length >= 2 && (
              <Link
                to="/comparer"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                <GitCompare className="w-4 h-4" />
                Comparer
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareBar;
