import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, FileText, ChevronDown, Palette, Check } from 'lucide-react';

interface ColorVariant {
  id: string;
  name: string;
  slug: string;
  price_ht: number;
  image_url?: string;
  ref?: string;
  colorName: string;
  colorCode: string;
}

interface ColorVariantCardProps {
  title: string;
  description: string;
  variants: ColorVariant[];
  baseImageUrl?: string;
  onAddToCart: (variant: ColorVariant) => void;
  addedToCart?: string | null;
  validatedCode?: { discount_percent: number } | null;
}

// Mapping des couleurs pour les pastilles visuelles
const colorMap: Record<string, string> = {
  'Secret Green': '#2D5A27',
  'Balanced Oak': '#B5935A',
  'Victorian Bronze': '#6B4423',
  'Havana Brown': '#4A3728',
  'Stylish Chestnut': '#8B4513',
  'Shaded Grey': '#6B6B6B',
  'Rich Brown': '#5C3317',
  'Pretty Pink': '#FFB6C1',
  'Concrete Grey': '#808080',
  'Smoked Oak': '#4A3C2E',
  'Nostalgic Brown': '#7B5544',
  'Happy Yellow': '#FFD700',
  'Between Brown': '#6B4E31',
  'Weathered Grey': '#9A9A9A',
  'Sober White': '#F5F5F0',
  'Covered Grey': '#7A7A7A',
  'Exotic Brown': '#3D2817',
  'Elegant Walnut': '#5D432C',
  'Classic Red': '#8B0000',
  'Mystic Blue': '#1E3A5F',
  'Denim Blue': '#1560BD',
  'Black': '#1A1A1A',
  'Grey': '#888888',
  'Dark Brown': '#2F1810',
  'Chocolate Brown': '#3D1F0D',
  'Just Grey': '#A0A0A0',
  'Royal Oak': '#8B6914',
  'Antique Brown': '#5A4A3A',
  'Kashmir': '#D4B895',
  'Sand': '#C2B280',
  'Caramel': '#FFD59A',
};

const ColorVariantCard: React.FC<ColorVariantCardProps> = ({
  title,
  description,
  variants,
  baseImageUrl,
  onAddToCart,
  addedToCart,
  validatedCode,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<ColorVariant | null>(variants[0] || null);
  const [isOpen, setIsOpen] = useState(false);

  const getDiscountedPrice = (price: number): number => {
    if (!validatedCode) return price;
    return price * (1 - validatedCode.discount_percent / 100);
  };

  const getColorHex = (colorName: string): string => {
    return colorMap[colorName] || '#8B7355';
  };

  if (!selectedVariant) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <img
          src={selectedVariant.image_url || baseImageUrl}
          alt={selectedVariant.name}
          className="w-full h-full object-contain"
        />
        <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <Palette className="w-3 h-3" />
          {variants.length} teintes
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-[#1A1A1A] text-lg mb-1">{title}</h3>
        <p className="text-sm text-[#6B6B6B] mb-3">{description}</p>

        {/* Sélecteur de couleur */}
        <div className="relative mb-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between hover:border-[#FF9900] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                style={{ backgroundColor: getColorHex(selectedVariant.colorName) }}
              />
              <span className="font-medium text-[#1A1A1A]">{selectedVariant.colorName}</span>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-64 overflow-y-auto">
              {variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => {
                    setSelectedVariant(variant);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                    selectedVariant.id === variant.id ? 'bg-orange-50' : ''
                  }`}
                >
                  <div 
                    className="w-6 h-6 rounded-full border-2 border-white shadow-md flex-shrink-0"
                    style={{ backgroundColor: getColorHex(variant.colorName) }}
                  />
                  <span className="flex-1 text-left font-medium text-[#1A1A1A]">{variant.colorName}</span>
                  <span className="text-sm text-[#6B6B6B]">{variant.colorCode}</span>
                  {selectedVariant.id === variant.id && (
                    <Check className="w-4 h-4 text-[#FF9900]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Prix */}
        <div className="flex items-center justify-between mb-4">
          <div>
            {validatedCode && (
              <span className="text-sm text-gray-400 line-through mr-2">
                {selectedVariant.price_ht.toFixed(2)}€
              </span>
            )}
            <span className="text-2xl font-extrabold text-[#FF9900]">
              {getDiscountedPrice(selectedVariant.price_ht).toFixed(2)}€
            </span>
            <span className="text-sm text-[#6B6B6B] ml-1">HT</span>
          </div>
          <span className="text-xs text-[#6B6B6B] bg-gray-100 px-2 py-1 rounded">
            Réf: {selectedVariant.ref}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onAddToCart(selectedVariant)}
            className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              addedToCart === selectedVariant.id
                ? 'bg-green-500 text-white'
                : 'text-white hover:shadow-lg'
            }`}
            style={addedToCart === selectedVariant.id ? {} : { background: 'linear-gradient(135deg, #FF9900 0%, #F0C300 100%)' }}
          >
            {addedToCart === selectedVariant.id ? (
              <>
                <Check className="w-5 h-5" />
                Ajouté !
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                Ajouter
              </>
            )}
          </button>
          <Link
            to={`/produit/${selectedVariant.slug}`}
            className="px-4 py-3 border border-gray-200 rounded-xl text-[#6B6B6B] hover:border-[#FF9900] hover:text-[#FF9900] transition-colors"
          >
            <FileText className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ColorVariantCard;
