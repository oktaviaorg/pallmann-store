import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../lib/CartContext';

const MobileCartButton: React.FC = () => {
  const { itemCount, totalHT } = useCart();

  if (itemCount === 0) return null;

  return (
    <Link
      to="/panier"
      className="md:hidden fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl text-white font-bold"
      style={{ background: 'linear-gradient(135deg, #E67E22 0%, #D35400 100%)' }}
    >
      <ShoppingCart className="w-5 h-5" />
      <span>{itemCount}</span>
      <span className="text-sm opacity-90">•</span>
      <span>{totalHT.toFixed(0)}€</span>
    </Link>
  );
};

export default MobileCartButton;
