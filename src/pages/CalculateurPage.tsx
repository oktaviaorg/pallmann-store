import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ProBanner from '../components/ProBanner';
import Footer from '../components/Footer';
import { useCart } from '../lib/CartContext';
import { 
  Calculator, 
  Ruler, 
  Droplets, 
  ShoppingCart, 
  ArrowRight, 
  Info,
  CheckCircle,
  Package,
  Sparkles
} from 'lucide-react';

interface ProductRecommendation {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  totalPrice: number;
  productId?: string;
}

const CalculateurPage: React.FC = () => {
  const { addItem } = useCart();
  const [surface, setSurface] = useState<number>(20);
  const [projectType, setProjectType] = useState<'renovation' | 'neuf'>('renovation');
  const [finishType, setFinishType] = useState<'vitrification' | 'huile'>('vitrification');
  const [addedProducts, setAddedProducts] = useState<string[]>([]);

  // Calculs des quantités
  const calculateProducts = (): ProductRecommendation[] => {
    const products: ProductRecommendation[] = [];
    
    if (finishType === 'vitrification') {
      // Fond dur : 1L pour 10-12m²
      const fondDurLitres = Math.ceil(surface / 10);
      products.push({
        id: 'fond-dur',
        name: 'PALL-X 320 - Fond dur',
        description: 'Fond dur aqueux universel, 1 couche',
        quantity: fondDurLitres,
        unit: 'L',
        pricePerUnit: 23,
        totalPrice: fondDurLitres * 23,
        productId: 'pall-x-320'
      });

      // Vitrificateur : 1L pour 10-12m² par couche, 2 couches
      const vitrificateurLitres = Math.ceil((surface / 10) * 2);
      products.push({
        id: 'vitrificateur',
        name: 'PALL-X 96 ORIGINAL - Vitrificateur',
        description: 'Vitrificateur mono-composant, 2 couches',
        quantity: vitrificateurLitres,
        unit: 'L',
        pricePerUnit: 40.10,
        totalPrice: vitrificateurLitres * 40.10,
        productId: 'pall-x-96-original'
      });
    } else {
      // Huile : 1L pour 20-25m² par couche, 2 couches
      const huileLitres = Math.ceil((surface / 20) * 2);
      products.push({
        id: 'huile',
        name: 'MAGIC OIL 2K ORIGINAL - Huile',
        description: 'Huile naturelle bi-composante, 2 couches',
        quantity: huileLitres,
        unit: 'L',
        pricePerUnit: 122.86,
        totalPrice: huileLitres * 122.86,
        productId: 'magic-oil-2k-original'
      });
    }

    // Liant (pour joints) si rénovation
    if (projectType === 'renovation') {
      const liantLitres = Math.ceil(surface / 50);
      products.push({
        id: 'liant',
        name: 'PALL-X KITT - Liant',
        description: 'Pour rebouchage des joints et fissures',
        quantity: liantLitres,
        unit: 'L',
        pricePerUnit: 24.20,
        totalPrice: liantLitres * 24.20,
        productId: 'pall-x-kitt'
      });
    }

    return products;
  };

  const products = calculateProducts();
  const totalHT = products.reduce((sum, p) => sum + p.totalPrice, 0);
  const totalTTC = totalHT * 1.2;

  const handleAddToCart = (product: ProductRecommendation) => {
    addItem({
      id: product.productId || product.id,
      name: product.name,
      price_ht: product.pricePerUnit,
      image_url: '',
      unit: product.unit,
    });
    setAddedProducts([...addedProducts, product.id]);
    setTimeout(() => {
      setAddedProducts(prev => prev.filter(id => id !== product.id));
    }, 2000);
  };

  const handleAddAllToCart = () => {
    products.forEach(product => {
      for (let i = 0; i < product.quantity; i++) {
        addItem({
          id: product.productId || product.id,
          name: product.name,
          price_ht: product.pricePerUnit,
          image_url: '',
          unit: product.unit,
        });
      }
    });
    setAddedProducts(products.map(p => p.id));
  };

  return (
    <>
      <Helmet>
        <title>Calculateur de surface parquet | Pallmann Store</title>
        <meta name="description" content="Calculez vos besoins en vitrificateur, huile et produits pour parquet. Estimez la quantité exacte selon votre surface et type de projet." />
        <link rel="canonical" href="https://pallmann-store.com/calculateur" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-[#FFFCF8]">
        <Header />
        <ProBanner />

        <main className="flex-grow">
          {/* Hero */}
          <div 
            className="py-16 text-white relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #2D1A0D 0%, #4A2C17 30%, #8B5A2B 70%, #C4943D 100%)' }}
          >
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
            
            <div className="max-w-4xl mx-auto px-4 text-center relative">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Calculator className="w-4 h-4" />
                Outil gratuit
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                Calculateur de Surface
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Estimez précisément vos besoins en produits Pallmann selon votre surface et type de finition
              </p>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Formulaire */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-[#2D1A0D] mb-6 flex items-center gap-2">
                  <Ruler className="w-6 h-6 text-[#C4943D]" />
                  Votre projet
                </h2>

                {/* Surface */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-[#2D1A0D] mb-2">
                    Surface à traiter (m²)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="5"
                      max="200"
                      value={surface}
                      onChange={(e) => setSurface(Number(e.target.value))}
                      className="flex-1 h-3 rounded-full appearance-none cursor-pointer"
                      style={{ 
                        background: `linear-gradient(to right, #C4943D 0%, #C4943D ${(surface-5)/195*100}%, #E0CDB5 ${(surface-5)/195*100}%, #E0CDB5 100%)` 
                      }}
                    />
                    <div className="flex items-center gap-1 bg-[#FDF8F0] px-4 py-2 rounded-xl">
                      <input
                        type="number"
                        min="5"
                        max="500"
                        value={surface}
                        onChange={(e) => setSurface(Number(e.target.value) || 5)}
                        className="w-16 text-center font-bold text-[#2D1A0D] bg-transparent focus:outline-none"
                      />
                      <span className="text-[#6B4423]">m²</span>
                    </div>
                  </div>
                </div>

                {/* Type de projet */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-[#2D1A0D] mb-2">
                    Type de projet
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setProjectType('renovation')}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        projectType === 'renovation'
                          ? 'border-[#C4943D] bg-[#FDF8F0]'
                          : 'border-gray-200 hover:border-[#C4943D]/50'
                      }`}
                    >
                      <div className="font-bold text-[#2D1A0D]">Rénovation</div>
                      <div className="text-xs text-[#6B4423]">Parquet existant à rénover</div>
                    </button>
                    <button
                      onClick={() => setProjectType('neuf')}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        projectType === 'neuf'
                          ? 'border-[#C4943D] bg-[#FDF8F0]'
                          : 'border-gray-200 hover:border-[#C4943D]/50'
                      }`}
                    >
                      <div className="font-bold text-[#2D1A0D]">Parquet neuf</div>
                      <div className="text-xs text-[#6B4423]">Première mise en finition</div>
                    </button>
                  </div>
                </div>

                {/* Type de finition */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-[#2D1A0D] mb-2">
                    Type de finition
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setFinishType('vitrification')}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        finishType === 'vitrification'
                          ? 'border-[#C4943D] bg-[#FDF8F0]'
                          : 'border-gray-200 hover:border-[#C4943D]/50'
                      }`}
                    >
                      <Droplets className={`w-5 h-5 mb-2 ${finishType === 'vitrification' ? 'text-[#C4943D]' : 'text-gray-400'}`} />
                      <div className="font-bold text-[#2D1A0D]">Vitrification</div>
                      <div className="text-xs text-[#6B4423]">Protection maximale, brillant à mat</div>
                    </button>
                    <button
                      onClick={() => setFinishType('huile')}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        finishType === 'huile'
                          ? 'border-[#C4943D] bg-[#FDF8F0]'
                          : 'border-gray-200 hover:border-[#C4943D]/50'
                      }`}
                    >
                      <Droplets className={`w-5 h-5 mb-2 ${finishType === 'huile' ? 'text-[#C4943D]' : 'text-gray-400'}`} />
                      <div className="font-bold text-[#2D1A0D]">Huilage</div>
                      <div className="text-xs text-[#6B4423]">Aspect naturel, toucher bois</div>
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="bg-[#FDF8F0] p-4 rounded-xl flex items-start gap-3">
                  <Info className="w-5 h-5 text-[#C4943D] flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-[#6B4423]">
                    <strong>Conseil pro :</strong> Prévoyez toujours 10-15% de marge pour les pertes et retouches éventuelles.
                  </div>
                </div>
              </div>

              {/* Résultats */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-[#2D1A0D] mb-6 flex items-center gap-2">
                  <Package className="w-6 h-6 text-[#C4943D]" />
                  Produits recommandés
                </h2>

                <div className="space-y-4 mb-6">
                  {products.map((product) => (
                    <div 
                      key={product.id}
                      className="p-4 bg-[#FFFCF8] rounded-xl border border-[#E0CDB5]"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-[#2D1A0D]">{product.name}</h3>
                          <p className="text-xs text-[#6B4423]">{product.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-[#C4943D]">{product.totalPrice.toFixed(2)}€ HT</div>
                          <div className="text-xs text-[#6B4423]">{product.quantity} {product.unit} × {product.pricePerUnit}€</div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`w-full py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                          addedProducts.includes(product.id)
                            ? 'bg-green-500 text-white'
                            : 'bg-[#FDF8F0] text-[#8B5A2B] hover:bg-[#F0E6D8]'
                        }`}
                      >
                        {addedProducts.includes(product.id) ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            Ajouté au panier
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4" />
                            Ajouter au panier
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="border-t border-[#E0CDB5] pt-4 mb-6">
                  <div className="flex justify-between text-lg mb-1">
                    <span className="text-[#6B4423]">Total HT</span>
                    <span className="font-bold text-[#2D1A0D]">{totalHT.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-xl">
                    <span className="text-[#6B4423]">Total TTC (20%)</span>
                    <span className="font-extrabold text-[#C4943D]">{totalTTC.toFixed(2)}€</span>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={handleAddAllToCart}
                  className="w-full py-4 rounded-xl font-bold text-white text-lg flex items-center justify-center gap-2 transition-all hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #C4943D 0%, #8B5A2B 100%)' }}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Ajouter tout au panier
                  <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-center text-xs text-[#6B4423] mt-3">
                  Franco de port dès 630€ HT • Livraison 48-72h
                </p>
              </div>
            </div>

            {/* FAQ SEO */}
            <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-[#2D1A0D] mb-6">Questions fréquentes</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-[#2D1A0D] mb-1">Combien de vitrificateur pour 20m² ?</h3>
                  <p className="text-[#6B4423] text-sm">Pour 20m², comptez environ 2L de fond dur et 4L de vitrificateur (2 couches). Le rendement moyen est de 10-12m² par litre.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#2D1A0D] mb-1">Quelle différence entre vitrification et huilage ?</h3>
                  <p className="text-[#6B4423] text-sm">La vitrification forme un film protecteur en surface (aspect brillant à mat). L'huilage pénètre le bois pour un aspect naturel. La vitrification est plus résistante, l'huile plus facile à réparer localement.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#2D1A0D] mb-1">Puis-je commander pour un professionnel ?</h3>
                  <p className="text-[#6B4423] text-sm">Oui ! Inscrivez-vous sur notre <Link to="/pro" className="text-[#C4943D] underline">espace PRO</Link> pour bénéficier de remises exclusives et de tarifs dégressifs.</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CalculateurPage;
