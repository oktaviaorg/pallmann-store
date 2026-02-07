import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ProBanner from '../components/ProBanner';
import Footer from '../components/Footer';
import SurfaceCalculator from '../components/SurfaceCalculator';
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
  Sparkles,
  Layers
} from 'lucide-react';

type CalculatorTab = 'projet' | 'surface';

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
  const [activeTab, setActiveTab] = useState<CalculatorTab>('projet');
  const [surface, setSurface] = useState<number>(20);
  const [projectType, setProjectType] = useState<'renovation' | 'neuf'>('renovation');
  const [finishType, setFinishType] = useState<'vitrification' | 'huile'>('vitrification');
  const [addedProducts, setAddedProducts] = useState<string[]>([]);
  
  // Options produits complémentaires (cochés par défaut pour pousser à la vente)
  const [includeLiant, setIncludeLiant] = useState<boolean>(true);
  const [includeSpatule, setIncludeSpatule] = useState<boolean>(true);
  const [includeRouleau, setIncludeRouleau] = useState<boolean>(true);
  const [includeNettoyant, setIncludeNettoyant] = useState<boolean>(true);
  const [includeEntretien, setIncludeEntretien] = useState<boolean>(true);

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

    // Liant (pour joints) si rénovation ET si inclus
    if (projectType === 'renovation' && includeLiant) {
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

    // Spatule de mise en œuvre
    if (includeSpatule) {
      products.push({
        id: 'spatule',
        name: 'Spatule inox crantée',
        description: 'Pour application uniforme du fond dur',
        quantity: 1,
        unit: 'pièce',
        pricePerUnit: 18.50,
        totalPrice: 18.50,
        productId: 'spatule-inox'
      });
    }

    // Rouleau applicateur
    if (includeRouleau) {
      const nbRouleaux = Math.ceil(surface / 50);
      products.push({
        id: 'rouleau',
        name: 'Rouleau microfibre PRO',
        description: 'Rouleau 25cm pour vitrificateur/huile',
        quantity: nbRouleaux,
        unit: 'pièce(s)',
        pricePerUnit: 12.90,
        totalPrice: nbRouleaux * 12.90,
        productId: 'rouleau-microfibre'
      });
    }

    // Nettoyant avant application
    if (includeNettoyant) {
      const nettoyantLitres = Math.ceil(surface / 100);
      products.push({
        id: 'nettoyant',
        name: 'CLEAN & GO - Nettoyant',
        description: 'Nettoyage avant application (dilué)',
        quantity: nettoyantLitres,
        unit: 'L',
        pricePerUnit: 15.80,
        totalPrice: nettoyantLitres * 15.80,
        productId: 'clean-and-go'
      });
    }

    // Produit d'entretien
    if (includeEntretien) {
      products.push({
        id: 'entretien',
        name: 'MAGIC OIL CARE - Entretien',
        description: 'Entretien régulier après finition',
        quantity: 1,
        unit: 'L',
        pricePerUnit: 28.50,
        totalPrice: 28.50,
        productId: 'magic-oil-care'
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
        <title>Calculateur PRO parquet | Pallmann Store</title>
        <meta name="description" content="Calculez vos besoins en vitrificateur, huile et produits pour parquet. Estimez la quantité exacte selon votre surface et type de projet." />
        <link rel="canonical" href="https://pallmann-store.com/calculateur-pro" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-[#FFFFFF]">
        <Header />
        <ProBanner />

        <main className="flex-grow">
          {/* Hero */}
          <div 
            className="py-16 text-white relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1A2634 0%, #243B53 30%, #D35400 70%, #E67E22 100%)' }}
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
                Calculateur PRO
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Estimez précisément vos besoins en produits Pallmann selon votre surface et type de finition
              </p>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 py-12">
            {/* Onglets */}
            <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-xl max-w-md mx-auto">
              <button
                onClick={() => setActiveTab('projet')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all ${
                  activeTab === 'projet'
                    ? 'bg-white text-[#E67E22] shadow-md'
                    : 'text-gray-600 hover:text-[#E67E22]'
                }`}
              >
                <Package className="w-4 h-4" />
                Projet complet
              </button>
              <button
                onClick={() => setActiveTab('surface')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all ${
                  activeTab === 'surface'
                    ? 'bg-white text-[#E67E22] shadow-md'
                    : 'text-gray-600 hover:text-[#E67E22]'
                }`}
              >
                <Layers className="w-4 h-4" />
                Surface → Quantité
              </button>
            </div>

            {/* Onglet Calculateur Surface */}
            {activeTab === 'surface' && (
              <div className="max-w-xl mx-auto">
                <SurfaceCalculator 
                  onAddToCart={({ productId, name, quantity, unit }) => {
                    for (let i = 0; i < quantity; i++) {
                      addItem({
                        id: productId,
                        name: name,
                        price_ht: 0,
                        image_url: '',
                        unit: unit,
                      });
                    }
                  }}
                />
              </div>
            )}

            {/* Onglet Projet complet */}
            {activeTab === 'projet' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Formulaire */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-[#1A2634] mb-6 flex items-center gap-2">
                  <Ruler className="w-6 h-6 text-[#E67E22]" />
                  Votre projet
                </h2>

                {/* Surface */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-[#1A2634] mb-2">
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
                        background: `linear-gradient(to right, #E67E22 0%, #E67E22 ${(surface-5)/195*100}%, #BCCCDC ${(surface-5)/195*100}%, #BCCCDC 100%)` 
                      }}
                    />
                    <div className="flex items-center gap-1 bg-[#F8FAFC] px-4 py-2 rounded-xl">
                      <input
                        type="number"
                        min="5"
                        max="500"
                        value={surface}
                        onChange={(e) => setSurface(Number(e.target.value) || 5)}
                        className="w-16 text-center font-bold text-[#1A2634] bg-transparent focus:outline-none"
                      />
                      <span className="text-[#627D98]">m²</span>
                    </div>
                  </div>
                </div>

                {/* Type de projet */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-[#1A2634] mb-2">
                    Type de projet
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setProjectType('renovation')}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        projectType === 'renovation'
                          ? 'border-[#E67E22] bg-[#F8FAFC]'
                          : 'border-gray-200 hover:border-[#E67E22]/50'
                      }`}
                    >
                      <div className="font-bold text-[#1A2634]">Rénovation</div>
                      <div className="text-xs text-[#627D98]">Parquet existant à rénover</div>
                    </button>
                    <button
                      onClick={() => setProjectType('neuf')}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        projectType === 'neuf'
                          ? 'border-[#E67E22] bg-[#F8FAFC]'
                          : 'border-gray-200 hover:border-[#E67E22]/50'
                      }`}
                    >
                      <div className="font-bold text-[#1A2634]">Parquet neuf</div>
                      <div className="text-xs text-[#627D98]">Première mise en finition</div>
                    </button>
                  </div>
                </div>

                {/* Type de finition */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-[#1A2634] mb-2">
                    Type de finition
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setFinishType('vitrification')}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        finishType === 'vitrification'
                          ? 'border-[#E67E22] bg-[#F8FAFC]'
                          : 'border-gray-200 hover:border-[#E67E22]/50'
                      }`}
                    >
                      <Droplets className={`w-5 h-5 mb-2 ${finishType === 'vitrification' ? 'text-[#E67E22]' : 'text-gray-400'}`} />
                      <div className="font-bold text-[#1A2634]">Vitrification</div>
                      <div className="text-xs text-[#627D98]">Protection maximale, brillant à mat</div>
                    </button>
                    <button
                      onClick={() => setFinishType('huile')}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        finishType === 'huile'
                          ? 'border-[#E67E22] bg-[#F8FAFC]'
                          : 'border-gray-200 hover:border-[#E67E22]/50'
                      }`}
                    >
                      <Droplets className={`w-5 h-5 mb-2 ${finishType === 'huile' ? 'text-[#E67E22]' : 'text-gray-400'}`} />
                      <div className="font-bold text-[#1A2634]">Huilage</div>
                      <div className="text-xs text-[#627D98]">Aspect naturel, toucher bois</div>
                    </button>
                  </div>
                </div>

                {/* Options produits complémentaires */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-[#1A2634] mb-3">
                    🛒 Produits complémentaires recommandés
                  </label>
                  <div className="space-y-2">
                    {/* Liant - seulement si rénovation */}
                    {projectType === 'renovation' && (
                      <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-[#E67E22]/50 cursor-pointer transition-all bg-white">
                        <input
                          type="checkbox"
                          checked={includeLiant}
                          onChange={(e) => setIncludeLiant(e.target.checked)}
                          className="w-5 h-5 rounded border-gray-300 text-[#E67E22] focus:ring-[#E67E22]"
                        />
                        <div className="flex-grow">
                          <div className="font-semibold text-[#1A2634] text-sm">PALL-X KITT - Liant</div>
                          <div className="text-xs text-[#627D98]">Rebouchage joints et fissures</div>
                        </div>
                        <span className="text-xs font-bold text-[#E67E22]">24,20€/L</span>
                      </label>
                    )}

                    {/* Spatule */}
                    <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-[#E67E22]/50 cursor-pointer transition-all bg-white">
                      <input
                        type="checkbox"
                        checked={includeSpatule}
                        onChange={(e) => setIncludeSpatule(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-[#E67E22] focus:ring-[#E67E22]"
                      />
                      <div className="flex-grow">
                        <div className="font-semibold text-[#1A2634] text-sm">Spatule inox crantée</div>
                        <div className="text-xs text-[#627D98]">Application uniforme du fond dur</div>
                      </div>
                      <span className="text-xs font-bold text-[#E67E22]">18,50€</span>
                    </label>

                    {/* Rouleau */}
                    <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-[#E67E22]/50 cursor-pointer transition-all bg-white">
                      <input
                        type="checkbox"
                        checked={includeRouleau}
                        onChange={(e) => setIncludeRouleau(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-[#E67E22] focus:ring-[#E67E22]"
                      />
                      <div className="flex-grow">
                        <div className="font-semibold text-[#1A2634] text-sm">Rouleau microfibre PRO</div>
                        <div className="text-xs text-[#627D98]">25cm pour vitrificateur/huile</div>
                      </div>
                      <span className="text-xs font-bold text-[#E67E22]">12,90€</span>
                    </label>

                    {/* Nettoyant */}
                    <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-[#E67E22]/50 cursor-pointer transition-all bg-white">
                      <input
                        type="checkbox"
                        checked={includeNettoyant}
                        onChange={(e) => setIncludeNettoyant(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-[#E67E22] focus:ring-[#E67E22]"
                      />
                      <div className="flex-grow">
                        <div className="font-semibold text-[#1A2634] text-sm">CLEAN & GO - Nettoyant</div>
                        <div className="text-xs text-[#627D98]">Préparation avant application</div>
                      </div>
                      <span className="text-xs font-bold text-[#E67E22]">15,80€/L</span>
                    </label>

                    {/* Entretien */}
                    <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-[#E67E22]/50 cursor-pointer transition-all bg-white">
                      <input
                        type="checkbox"
                        checked={includeEntretien}
                        onChange={(e) => setIncludeEntretien(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-[#E67E22] focus:ring-[#E67E22]"
                      />
                      <div className="flex-grow">
                        <div className="font-semibold text-[#1A2634] text-sm">MAGIC OIL CARE - Entretien</div>
                        <div className="text-xs text-[#627D98]">Entretien régulier après finition</div>
                      </div>
                      <span className="text-xs font-bold text-[#E67E22]">28,50€/L</span>
                    </label>
                  </div>
                </div>

                {/* Info */}
                <div className="bg-[#F8FAFC] p-4 rounded-xl flex items-start gap-3">
                  <Info className="w-5 h-5 text-[#E67E22] flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-[#627D98]">
                    <strong>Conseil pro :</strong> Prévoyez toujours 10-15% de marge pour les pertes et retouches éventuelles.
                  </div>
                </div>
              </div>

              {/* Résultats */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-[#1A2634] mb-6 flex items-center gap-2">
                  <Package className="w-6 h-6 text-[#E67E22]" />
                  Produits recommandés
                </h2>

                {/* Liste des produits (récap simple) */}
                <div className="space-y-3 mb-6">
                  {products.map((product) => (
                    <div 
                      key={product.id}
                      className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-xl"
                    >
                      <div>
                        <h3 className="font-semibold text-[#1A2634]">{product.name}</h3>
                        <p className="text-xs text-[#627D98]">{product.quantity} {product.unit} × {product.pricePerUnit}€</p>
                      </div>
                      <div className="font-bold text-[#E67E22]">{product.totalPrice.toFixed(2)}€</div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="bg-[#1A2634] text-white rounded-xl p-4 mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="opacity-80">Total HT</span>
                    <span className="font-semibold">{totalHT.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-xl">
                    <span>Total TTC</span>
                    <span className="font-extrabold">{totalTTC.toFixed(2)}€</span>
                  </div>
                </div>

                {/* CTA unique */}
                <button
                  onClick={handleAddAllToCart}
                  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                    addedProducts.length > 0 
                      ? 'bg-green-500 text-white'
                      : 'text-white hover:shadow-lg'
                  }`}
                  style={addedProducts.length === 0 ? { background: 'linear-gradient(135deg, #E67E22 0%, #D35400 100%)' } : {}}
                >
                  {addedProducts.length > 0 ? (
                    <>
                      <CheckCircle className="w-6 h-6" />
                      Ajouté au panier !
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-6 h-6" />
                      Valider → Ajouter au panier
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-[#627D98] mt-4">
                  Franco de port dès 630€ HT • Livraison France entière 48-72h
                </p>
              </div>
            </div>
            )}

            {/* FAQ SEO */}
            <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-[#1A2634] mb-6">Questions fréquentes</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-[#1A2634] mb-1">Combien de vitrificateur pour 20m² ?</h3>
                  <p className="text-[#627D98] text-sm">Pour 20m², comptez environ 2L de fond dur et 4L de vitrificateur (2 couches). Le rendement moyen est de 10-12m² par litre.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1A2634] mb-1">Quelle différence entre vitrification et huilage ?</h3>
                  <p className="text-[#627D98] text-sm">La vitrification forme un film protecteur en surface (aspect brillant à mat). L'huilage pénètre le bois pour un aspect naturel. La vitrification est plus résistante, l'huile plus facile à réparer localement.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1A2634] mb-1">Puis-je commander pour un professionnel ?</h3>
                  <p className="text-[#627D98] text-sm">Oui ! Inscrivez-vous sur notre <Link to="/pro" className="text-[#E67E22] underline">espace PRO</Link> pour bénéficier de remises exclusives et de tarifs dégressifs.</p>
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
