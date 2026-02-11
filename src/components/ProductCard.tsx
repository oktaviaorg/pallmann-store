import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Plus, 
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
  price_public_ht?: number;
  pdf_url?: string;
  unit?: string;
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
  onAddToCart: (product: Product) => void;
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
  const { t } = useTranslation();

  const getDiscountedPrice = (price: number): number => {
    if (!validatedCode) return price;
    return price * (1 - validatedCode.discount_percent / 100);
  };

  const savings = validatedCode && product.price_public_ht 
    ? product.price_public_ht - getDiscountedPrice(product.price_public_ht)
    : 0;

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

      {/* Product Image */}
      <div className="relative bg-gradient-to-br from-[#FFFFFF] via-white to-[#F8FAFC] p-4 pt-10">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className={`w-full h-36 object-contain transition-transform duration-500 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
        ) : (
          <div className="w-full h-36 flex items-center justify-center">
            <ShoppingCart className="w-16 h-16 text-gray-200" />
          </div>
        )}
        
        {/* Quick add overlay on hover */}
        {product.price_public_ht && (
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
          <p className="text-[10px] text-[#64748B] mb-1 uppercase tracking-wide">
            {product.subcategory_name}
          </p>
        )}

        {product.description && (
          <p className="text-[#64748B] text-xs mb-2 line-clamp-2 flex-grow">
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
          <span className="text-[10px] text-[#64748B] ml-1">Pro</span>
        </div>

        {/* Prix - SUPER VISIBLE */}
        {product.price_public_ht && (
          <div className="mb-2 p-2.5 bg-gradient-to-r from-[#F8FAFC] to-[#F0F4F8] rounded-xl border border-blue-100">
            {validatedCode ? (
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[#94A3B8] line-through text-xs">
                    {product.price_public_ht.toFixed(2)}€
                  </span>
                  <span 
                    className="text-lg font-extrabold"
                    style={{ 
                      background: 'linear-gradient(135deg, #E67E22 0%, #D35400 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {getDiscountedPrice(product.price_public_ht).toFixed(2)}€
                  </span>
                  <span className="text-[10px] text-[#64748B]">HT/{product.unit || 'L'}</span>
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
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-extrabold text-[#1A1A1A]">
                  {product.price_public_ht.toFixed(2)}€
                </span>
                <span className="text-[10px] text-[#64748B]">HT/{product.unit || 'L'}</span>
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
            className="inline-flex items-center gap-1 text-[10px] text-[#64748B] hover:text-[#D35400] transition-colors mb-2"
          >
            <Download className="w-3 h-3" />
            Fiche technique PDF
          </a>
        )}
      </div>

      {/* Action Buttons - TRÈS VISIBLES */}
      <div className="p-4 pt-0 space-y-2">
        {/* Bouton Panier - seulement si prix défini */}
        {product.price_public_ht && (
          <button
            onClick={() => onAddToCart(product)}
            className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              addedToCart 
                ? 'bg-green-500 text-white' 
                : 'text-white shadow-md hover:shadow-xl hover:-translate-y-0.5'
            }`}
            style={!addedToCart ? { background: 'linear-gradient(135deg, #E67E22 0%, #D35400 100%)' } : {}}
          >
            {addedToCart ? (
              <>
                <CheckCircle className="w-5 h-5" />
                ✓ {t('common.cart')}
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                {t('common.addToCart')}
              </>
            )}
          </button>
        )}
        
        {/* Bouton Devis - TOUJOURS visible */}
        <button
          onClick={() => onAddToQuote(product)}
          className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
            addedToQuote 
              ? 'bg-[#1A1A1A] text-white' 
              : isInQuote
                ? 'bg-[#D9E2EC] text-[#D35400] border border-[#D35400]/20'
                : product.price_public_ht
                  ? 'bg-[#FFFFFF] hover:bg-[#F8FAFC] text-[#64748B] border border-gray-200'
                  : 'text-white shadow-md hover:shadow-xl'
          }`}
          style={!product.price_public_ht && !addedToQuote && !isInQuote ? { background: 'linear-gradient(135deg, #E67E22 0%, #D35400 100%)' } : {}}
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
