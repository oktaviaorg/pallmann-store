import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, CheckCircle, XCircle, X, UserPlus, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCart } from '../lib/CartContext';

interface CompanyCode {
  id: string;
  code: string;
  company_name: string;
  discount_percent: number;
  is_active: boolean;
  contact_email?: string;
  contact_phone?: string;
  address?: string;
  city?: string;
  postal_code?: string;
}

const ProBanner: React.FC = () => {
  const { companyCode, setCompanyCode } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [validatedCode, setValidatedCode] = useState<CompanyCode | null>(companyCode);
  const [codeError, setCodeError] = useState('');
  const [checkingCode, setCheckingCode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(!companyCode);

  const validatePromoCode = async () => {
    if (!promoCode.trim()) return;
    setCheckingCode(true);
    setCodeError('');
    
    try {
      const { data, error } = await supabase
        .from('company_codes')
        .select('*')
        .eq('code', promoCode.toUpperCase())
        .eq('is_active', true)
        .single();
      
      if (error || !data) {
        setCodeError('Code invalide ou expiré');
        setValidatedCode(null);
        setCompanyCode(null);
      } else {
        setValidatedCode(data);
        setCompanyCode(data);
        setCodeError('');
        setIsExpanded(false);
      }
    } catch (err) {
      setCodeError('Erreur de vérification');
    } finally {
      setCheckingCode(false);
    }
  };

  const clearPromoCode = () => {
    setValidatedCode(null);
    setCompanyCode(null);
    setPromoCode('');
    setCodeError('');
    localStorage.removeItem('pallmann-company-code');
    setIsExpanded(true);
  };

  // Si code validé, afficher version compacte
  if (validatedCode && !isExpanded) {
    return (
      <div className="bg-gradient-to-r from-accent-700 to-accent-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3 text-sm">
          <CheckCircle className="w-4 h-4" />
          <span>
            <strong>{validatedCode.company_name}</strong> • Remise {validatedCode.discount_percent}% appliquée sur tout le catalogue
          </span>
          <button 
            onClick={clearPromoCode}
            className="ml-2 hover:bg-white/20 p-1 rounded transition-colors"
            title="Supprimer le code"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-wood-700 via-wood-600 to-primary-600 text-white py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          {/* Titre */}
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary-300" />
            <span className="font-bold text-lg bg-blue-500 text-black px-3 py-1 rounded">Vous êtes PRO ?</span>
          </div>
          
          {/* Input code */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-wood-400" />
              <input
                type="text"
                placeholder="Entrez votre code remise"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === 'Enter' && validatePromoCode()}
                className="pl-10 pr-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:bg-white/20 focus:border-primary-300 focus:outline-none transition-all w-48 md:w-56 font-mono uppercase"
              />
            </div>
            <button
              onClick={validatePromoCode}
              disabled={checkingCode || !promoCode.trim()}
              className="px-5 py-2.5 bg-white text-wood-700 font-bold rounded-lg hover:bg-primary-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {checkingCode ? '...' : 'Appliquer'}
            </button>
          </div>

          {/* Lien inscription */}
          <Link
            to="/pro"
            className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            <span>Pas encore inscrit ? <strong className="underline">Créer un compte PRO</strong></span>
          </Link>
        </div>

        {/* Messages d'erreur/succès */}
        {codeError && (
          <div className="mt-3 flex items-center justify-center gap-2 text-red-200 text-sm">
            <XCircle className="w-4 h-4" />
            <span>{codeError}</span>
          </div>
        )}

        {validatedCode && (
          <div className="mt-3 flex items-center justify-center gap-2 text-green-200 text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>
              Code activé ! <strong>{validatedCode.company_name}</strong> bénéficie de {validatedCode.discount_percent}% de remise
            </span>
            <button onClick={clearPromoCode} className="ml-2 underline hover:no-underline">
              Supprimer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProBanner;
