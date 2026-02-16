import React from 'react';
import { Phone, ShoppingCart, X, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

const AddToCartModal: React.FC<AddToCartModalProps> = ({ isOpen, onClose, productName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-center text-gray-900 mb-2">
          Produit ajouté au panier !
        </h3>
        
        <p className="text-sm text-gray-500 text-center mb-6 line-clamp-1">
          {productName}
        </p>

        {/* Phone CTA */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 border border-blue-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                Avant de commander...
              </p>
              <p className="text-sm text-gray-600">
                Validez votre choix avec un technicien
              </p>
            </div>
          </div>
          
          <a 
            href="tel:+33756971137"
            className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
          >
            <Phone className="w-5 h-5" />
            Appeler le 07 56 97 11 37
          </a>
          <p className="text-xs text-center text-gray-500 mt-2">
            Conseil gratuit • Réponse immédiate
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-gray-200 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Continuer mes achats
          </button>
          <Link
            to="/panier"
            className="flex-1 py-3 bg-[#FF9900] hover:bg-[#E68A00] text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Voir le panier
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;
