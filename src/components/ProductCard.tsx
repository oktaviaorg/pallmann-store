import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Plus,
  Minus,
  CheckCircle, 
  FileText, 
  Download, 
  Star, 
  TrendingUp,
  ShoppingCart,
  Zap
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  category_name?: string;
  subcategory_name?: string;
  price_ht?: number;
  pdf_url?: string;
  unit?: string;
  pack_size?: number;
  is_bestseller?: boolean;
  is_new?: boolean;
  stock_status?: 'in_stock' | 'low_stock' | 'out_of_stock';
}

interface ProductCardProps {
  product: Product;
  validatedCode?: {
    company_name: string;
    discount_percent: number;
  } | null;
  onAddToCart: (product: Product, quantity?: number) => void;
  onAddToQuote: (product: Product) => void;
  isInQuote: boolean;
  addedToCart: boolean;
  addedToQuote: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  validatedCode,
  onAddToCart,
  onAddToQuote,
  isInQuote,
  addedToCart,
  addedToQuote,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { t } = useTranslation();

  const getDiscountedPrice = (price: number): number => {
    if (!validatedCode) return price;
    return price * (1 - validatedCode.discount_percent / 100);
  };

  const savings = validatedCode && product.price_ht 
    ? product.price_ht - getDiscountedPrice(product.price_ht)
    : 0;

  // Formater la contenance de façon claire
  const formatContenance = (): string | null => {
    const size = product.pack_size || 1;
    const unit = product.unit;
    
    if (!unit) return null;
    
    if (unit === 'L') {
      return size === 1 ? 'Bidon 1L' : `Bidon ${size}L`;
    } else if (unit === 'UN') {
      if (size === 1) return null; // Pas besoin de préciser pour 1 unité
      return `Lot de ${size}`;
    }
    return size > 1 ? `${size} ${unit}` : unit;
  };

  const contenance = formatContenance();

  return (
    <div
      className="bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-card-hover transition-all duration-300 group flex flex-col h-full relative border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.category_name && (
          <span className="bg-[#1A1A1A] text-white px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide">
            {product.category_name}
          </span>
        )}
        {product.is_bestseller && (
          <span 
            className="px-2 py-0.5 rounded-md text-[10px] font-bold text-white flex items-center gap-1"
            style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)' }}
          >
            <TrendingUp className="w-3 h-3" />
            BEST-SELLER
          </span>
        )}
        {product.is_new && (
          <span 
            className="px-2 py-0.5 rounded-md text-[10px] font-bold text-white flex items-center gap-1"
            style={{ background: 'linear-gradient(135deg, #E67E22 0%, #D35400 100%)' }}
          >
            <Zap className="w-3 h-3" />
            NOUVEAU
          </span>
        )}
      </div>

      {/* Stock status */}
      {product.stock_status === 'low_stock' && (
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-md text-[10px] font-bold">
            Stock limité
          </span>
        </div>
      )}

      {/* Product Image - déborde au-dessus du fond noir */}
      <div className="relative pt-6 pb-0">
        {/* Fond noir en bas */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#1A1A1A] to-[#2D2D2D] rounded-t-3xl"></div>
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className={`relative z-10 w-full h-48 object-contain transition-transform duration-500 drop-shadow-xl ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
        ) : (
          <div className="relative z-10 w-full h-36 flex items-center justify-center">
            <ShoppingCart className="w-16 h-16 text-gray-300" />
          </div>
        )}
        
        {/* Quick add overlay on hover */}
        {product.price_ht && (
          <div 
            className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <button
              onClick={() => onAddToCart(product)}
              className="px-4 py-2 rounded-xl text-white text-sm font-bold flex items-center gap-2 transition-transform hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #E67E22 0%, #D35400 100%)' }}
            >
              <Plus className="w-4 h-4" />
              {t('common.addToCart')}
            </button>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-sm font-bold text-[#1A1A1A] mb-1 group-hover:text-[#E67E22] transition-colors line-clamp-2 leading-tight">
          {product.name}
        </h3>
        
        {product.subcategory_name && (
          <p className="text-[10px] text-[#6B6B6B] mb-1 uppercase tracking-wide">
            {product.subcategory_name}
          </p>
        )}

        {product.description && (
          <p className="text-[#6B6B6B] text-xs mb-2 line-clamp-2 flex-grow">
            {product.description}
          </p>
        )}

        {/* Rating placeholder - adds social proof */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-3 h-3 ${i < 4 ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} 
            />
          ))}
          <span className="text-[10px] text-[#6B6B6B] ml-1">Pro</span>
        </div>

        {/* Prix - SUPER VISIBLE */}
        {product.price_ht && (
          <div className="mb-2 p-2.5 bg-gradient-to-r from-[#F8FAFC] to-[#F0F4F8] rounded-xl border border-blue-100">
            {validatedCode ? (
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[#94A3B8] line-through text-xs">
                    {product.price_ht.toFixed(2)}€
                  </span>
                  <span 
                    className="text-lg font-extrabold"
                    style={{ 
                      background: 'linear-gradient(135deg, #E67E22 0%, #D35400 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {getDiscountedPrice(product.price_ht).toFixed(2)}€
                  </span>
                  <span className="text-[10px] text-[#6B6B6B]">HT</span>
                  {contenance && (
                    <span className="text-[10px] text-[#6B6B6B] ml-1">• {contenance}</span>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <span className="bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    -{validatedCode.discount_percent}%
                  </span>
                  <span className="text-green-600 text-[10px] font-medium">
                    Économisez {savings.toFixed(2)}€
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-baseline gap-1 flex-wrap">
                <span className="text-lg sm:text-xl font-extrabold text-[#E67E22] whitespace-nowrap">
                  {product.price_ht.toFixed(2)}€
                </span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 whitespace-nowrap">HT</span>
                {contenance && (
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 ml-1">• {contenance}</span>
                )}
              </div>
            )}
          </div>
        )}

        {/* PDF Link */}
        {product.pdf_url && (
          <a
            href={product.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[10px] text-[#6B6B6B] hover:text-[#D35400] transition-colors mb-2"
          >
            <Download className="w-3 h-3" />
            Fiche technique PDF
          </a>
        )}
      </div>

      {/* Action Buttons - TRÈS VISIBLES */}
      <div className="p-4 pt-0 space-y-2">
        {/* Sélecteur de quantité + Bouton Panier */}
        {product.price_ht && (
          <div className="flex items-center gap-2">
            {/* Quantité */}
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-gray-100 transition-colors"
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="px-3 py-2 font-bold text-[#1A1A1A] min-w-[40px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-gray-100 transition-colors"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            
            {/* Bouton Ajouter */}
            <button
              onClick={() => {
                onAddToCart(product, quantity);
                setQuantity(1);
              }}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                addedToCart 
                  ? 'bg-green-500 text-white' 
                  : 'text-white shadow-md hover:shadow-xl hover:-translate-y-0.5'
              }`}
              style={!addedToCart ? { background: 'linear-gradient(135deg, #E67E22 0%, #D35400 100%)' } : {}}
            >
              {addedToCart ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  ✓ Ajouté
                </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                {t('common.addToCart')}
              </>
            )}
            </button>
          </div>
        )}
        
        {/* Bouton Devis - TOUJOURS visible */}
        <button
          onClick={() => onAddToQuote(product)}
          className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
            addedToQuote 
              ? 'bg-[#1A1A1A] text-white' 
              : isInQuote
                ? 'bg-[#D9E2EC] text-[#D35400] border border-[#D35400]/20'
                : product.price_ht
                  ? 'bg-[#FFFFFF] hover:bg-[#F8FAFC] text-[#6B6B6B] border border-gray-200'
                  : 'text-white shadow-md hover:shadow-xl'
          }`}
          style={!product.price_ht && !addedToQuote && !isInQuote ? { background: 'linear-gradient(135deg, #E67E22 0%, #D35400 100%)' } : {}}
        >
          {addedToQuote ? (
            <>
              <CheckCircle className="w-4 h-4" />
              ✓ {t('common.quote')}
            </>
          ) : isInQuote ? (
            <>
              <FileText className="w-4 h-4" />
              {t('common.quote')} ✓
            </>
          ) : (
            <>
              <FileText className="w-4 h-4" />
              + {t('common.addToQuote')}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
