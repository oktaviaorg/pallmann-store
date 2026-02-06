import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, X, ArrowRight, Package } from 'lucide-react';
import { useCart } from '../lib/CartContext';

const CartReminder: React.FC = () => {
  const { itemCount, totalHT } = useCart();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Show reminder after 5 seconds if cart has items
    if (itemCount > 0 && !dismissed) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [itemCount, dismissed]);

  if (!visible || itemCount === 0) return null;

  const francoRemaining = 630 - totalHT;
  const francoProgress = Math.min((totalHT / 630) * 100, 100);

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 max-w-sm">
        {/* Close button */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>

        {/* Content */}
        <div className="flex items-start gap-3">
          <div 
            className="p-2 rounded-xl"
            style={{ background: 'linear-gradient(135deg, #C4943D 0%, #8B5A2B 100%)' }}
          >
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-[#2D1A0D] text-sm">
              {itemCount} article{itemCount > 1 ? 's' : ''} dans votre panier
            </p>
            <p className="text-[#64748B] text-xs mt-0.5">
              Total : <span className="font-bold text-[#2D1A0D]">{totalHT.toFixed(2)}€ HT</span>
            </p>

            {/* Franco progress */}
            {francoRemaining > 0 ? (
              <div className="mt-2">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[#64748B]">Franco de port</span>
                  <span className="font-medium text-[#8B5A2B]">
                    Plus que {francoRemaining.toFixed(0)}€ !
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${francoProgress}%`,
                      background: 'linear-gradient(90deg, #C4943D 0%, #8B5A2B 100%)'
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="mt-2 flex items-center gap-1 text-xs text-green-600 font-medium">
                <Package className="w-3 h-3" />
                Franco de port atteint !
              </div>
            )}

            {/* CTA */}
            <Link
              to="/panier"
              className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #C4943D 0%, #8B5A2B 100%)' }}
            >
              Finaliser ma commande
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartReminder;
