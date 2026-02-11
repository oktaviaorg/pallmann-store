import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, ArrowLeftRight, Package, Ruler, ShoppingCart, CheckCircle } from 'lucide-react';

interface ProductYield {
  id: string;
  name: string;
  category: string;
  yieldPerLiter: number; // m² par litre
  yieldMin?: number;
  yieldMax?: number;
  unit: string;
  coats: number; // nombre de couches recommandées
  containerSizes: number[]; // formats disponibles en litres
}

const PRODUCTS_YIELDS: ProductYield[] = [
  // Abrasifs Ø150 (bordeuse)
  { id: 'abrasif-150-36', name: 'Disque Ø150 grain 36', category: 'Abrasifs Ø150 (bordeuse)', yieldPerLiter: 15, unit: 'disques', coats: 1, containerSizes: [25, 50] },
  { id: 'abrasif-150-40', name: 'Disque Ø150 grain 40', category: 'Abrasifs Ø150 (bordeuse)', yieldPerLiter: 18, unit: 'disques', coats: 1, containerSizes: [25, 50] },
  { id: 'abrasif-150-60', name: 'Disque Ø150 grain 60', category: 'Abrasifs Ø150 (bordeuse)', yieldPerLiter: 25, unit: 'disques', coats: 1, containerSizes: [25, 50] },
  { id: 'abrasif-150-80', name: 'Disque Ø150 grain 80', category: 'Abrasifs Ø150 (bordeuse)', yieldPerLiter: 30, unit: 'disques', coats: 1, containerSizes: [25, 50] },
  { id: 'abrasif-150-100', name: 'Disque Ø150 grain 100', category: 'Abrasifs Ø150 (bordeuse)', yieldPerLiter: 35, unit: 'disques', coats: 1, containerSizes: [25, 50] },
  
  // Abrasifs Ø178 (bordeuse)
  { id: 'abrasif-178-36', name: 'Disque Ø178 grain 36', category: 'Abrasifs Ø178 (bordeuse)', yieldPerLiter: 12, unit: 'disques', coats: 1, containerSizes: [25, 50] },
  { id: 'abrasif-178-40', name: 'Disque Ø178 grain 40', category: 'Abrasifs Ø178 (bordeuse)', yieldPerLiter: 15, unit: 'disques', coats: 1, containerSizes: [25, 50] },
  { id: 'abrasif-178-60', name: 'Disque Ø178 grain 60', category: 'Abrasifs Ø178 (bordeuse)', yieldPerLiter: 20, unit: 'disques', coats: 1, containerSizes: [25, 50] },
  { id: 'abrasif-178-80', name: 'Disque Ø178 grain 80', category: 'Abrasifs Ø178 (bordeuse)', yieldPerLiter: 25, unit: 'disques', coats: 1, containerSizes: [25, 50] },
  { id: 'abrasif-178-100', name: 'Disque Ø178 grain 100', category: 'Abrasifs Ø178 (bordeuse)', yieldPerLiter: 30, unit: 'disques', coats: 1, containerSizes: [25, 50] },
  
  // Abrasifs Ø406 (monobrosse/Spider)
  { id: 'abrasif-406-60', name: 'Disque Ø406 grain 60', category: 'Abrasifs Ø406 (Spider)', yieldPerLiter: 40, unit: 'disques', coats: 1, containerSizes: [10] },
  { id: 'abrasif-406-80', name: 'Disque Ø406 grain 80', category: 'Abrasifs Ø406 (Spider)', yieldPerLiter: 50, unit: 'disques', coats: 1, containerSizes: [10] },
  { id: 'abrasif-406-100', name: 'Disque Ø406 grain 100', category: 'Abrasifs Ø406 (Spider)', yieldPerLiter: 60, unit: 'disques', coats: 1, containerSizes: [10] },
  { id: 'abrasif-406-120', name: 'Disque Ø406 grain 120', category: 'Abrasifs Ø406 (Spider)', yieldPerLiter: 70, unit: 'disques', coats: 1, containerSizes: [10] },
  
  // Bandes COBRA (200x750mm)
  { id: 'bande-cobra-36', name: 'Bande COBRA grain 36', category: 'Bandes COBRA', yieldPerLiter: 20, unit: 'bandes', coats: 1, containerSizes: [10] },
  { id: 'bande-cobra-40', name: 'Bande COBRA grain 40', category: 'Bandes COBRA', yieldPerLiter: 25, unit: 'bandes', coats: 1, containerSizes: [10] },
  { id: 'bande-cobra-60', name: 'Bande COBRA grain 60', category: 'Bandes COBRA', yieldPerLiter: 35, unit: 'bandes', coats: 1, containerSizes: [10] },
  { id: 'bande-cobra-80', name: 'Bande COBRA grain 80', category: 'Bandes COBRA', yieldPerLiter: 45, unit: 'bandes', coats: 1, containerSizes: [10] },
  { id: 'bande-cobra-100', name: 'Bande COBRA grain 100', category: 'Bandes COBRA', yieldPerLiter: 55, unit: 'bandes', coats: 1, containerSizes: [10] },
  
  // Vitrificateurs
  { id: 'pall-x-96', name: 'PALL-X 96', category: 'Vitrificateur', yieldPerLiter: 10, unit: 'L', coats: 2, containerSizes: [1, 5, 10] },
  { id: 'pall-x-98', name: 'PALL-X 98', category: 'Vitrificateur 2K', yieldPerLiter: 10, unit: 'L', coats: 2, containerSizes: [4.95] },
  { id: 'pall-x-extreme', name: 'PALL-X EXTREME', category: 'Vitrificateur 2K', yieldPerLiter: 10, unit: 'L', coats: 2, containerSizes: [5] },
  { id: 'pall-x-zero-2k', name: 'PALL-X ZERO 2K', category: 'Vitrificateur sans solvant', yieldPerLiter: 10, unit: 'L', coats: 2, containerSizes: [4.95, 10] },
  { id: 'pall-x-pure', name: 'PALL-X PURE', category: 'Vitrificateur 2K', yieldPerLiter: 10, unit: 'L', coats: 2, containerSizes: [4.95] },
  
  // Fonds durs
  { id: 'pall-x-320', name: 'PALL-X 320', category: 'Fond dur', yieldPerLiter: 12, unit: 'L', coats: 1, containerSizes: [5, 10] },
  { id: 'pall-x-325', name: 'PALL-X 325', category: 'Fond dur garnissant', yieldPerLiter: 10, unit: 'L', coats: 1, containerSizes: [5, 10] },
  { id: 'pall-x-333', name: 'PALL-X 333', category: 'Fond dur teinté', yieldPerLiter: 10, unit: 'L', coats: 1, containerSizes: [2.5] },
  { id: 'pall-x-base', name: 'PALL-X BASE', category: 'Fond dur', yieldPerLiter: 12, unit: 'L', coats: 1, containerSizes: [5] },
  
  // Huiles
  { id: 'magic-oil-2k', name: 'MAGIC OIL 2K', category: 'Huile', yieldMin: 20, yieldMax: 40, yieldPerLiter: 30, unit: 'L', coats: 1, containerSizes: [1, 2.75] },
  { id: 'magic-oil-ergo', name: 'MAGIC OIL 2K ERGO', category: 'Huile monocouche', yieldMin: 20, yieldMax: 40, yieldPerLiter: 30, unit: 'L', coats: 1, containerSizes: [1, 2.75] },
  { id: 'eco-oil-1k', name: 'ECO OIL 1K', category: 'Huile 1K', yieldPerLiter: 25, unit: 'L', coats: 2, containerSizes: [5] },
  
  // Mastic
  { id: 'pall-x-kitt', name: 'PALL-X KITT', category: 'Mastic', yieldPerLiter: 50, unit: 'L', coats: 1, containerSizes: [1, 5] },
  { id: 'pall-x-filler', name: 'PALL-X FILLER', category: 'Mastic fibré', yieldPerLiter: 40, unit: 'L', coats: 1, containerSizes: [5] },
  
  // Colles
  { id: 'p6', name: 'COLLE P6', category: 'Colle parquet', yieldPerLiter: 1.2, unit: 'kg', coats: 1, containerSizes: [16] },
  { id: 'p9', name: 'COLLE P9', category: 'Colle parquet 2K', yieldPerLiter: 1.2, unit: 'kg', coats: 1, containerSizes: [11] },
];

type CalculatorMode = 'surface-to-quantity' | 'quantity-to-surface';

interface SurfaceCalculatorProps {
  onAddToCart?: (item: { productId: string; name: string; quantity: number; unit: string }) => void;
}

const SurfaceCalculator: React.FC<SurfaceCalculatorProps> = ({ onAddToCart }) => {
  const [mode, setMode] = useState<CalculatorMode>('surface-to-quantity');
  const [addedToCart, setAddedToCart] = useState(false);
  const [surface, setSurface] = useState<string>('50');
  const [quantity, setQuantity] = useState<string>('5');
  const [selectedProduct, setSelectedProduct] = useState<string>('pall-x-96');

  const product = useMemo(() => 
    PRODUCTS_YIELDS.find(p => p.id === selectedProduct),
    [selectedProduct]
  );

  const result = useMemo(() => {
    if (!product) return null;

    if (mode === 'surface-to-quantity') {
      const surfaceNum = parseFloat(surface) || 0;
      const totalNeeded = (surfaceNum / product.yieldPerLiter) * product.coats;
      
      // Trouver le conditionnement optimal
      const sortedSizes = [...product.containerSizes].sort((a, b) => b - a);
      let remaining = totalNeeded;
      const containers: { size: number; count: number }[] = [];
      
      for (const size of sortedSizes) {
        if (remaining >= size) {
          const count = Math.floor(remaining / size);
          containers.push({ size, count });
          remaining -= count * size;
        }
      }
      
      // Ajouter le plus petit format pour le reste
      if (remaining > 0) {
        const smallestSize = Math.min(...product.containerSizes);
        const lastContainer = containers.find(c => c.size === smallestSize);
        if (lastContainer) {
          lastContainer.count += 1;
        } else {
          containers.push({ size: smallestSize, count: 1 });
        }
      }

      return {
        totalLiters: totalNeeded,
        containers,
        surfaceCovered: surfaceNum,
      };
    } else {
      const quantityNum = parseFloat(quantity) || 0;
      const surfaceCovered = quantityNum * product.yieldPerLiter / product.coats;
      const surfaceMin = product.yieldMin ? quantityNum * product.yieldMin / product.coats : surfaceCovered;
      const surfaceMax = product.yieldMax ? quantityNum * product.yieldMax / product.coats : surfaceCovered;
      
      return {
        surfaceCovered,
        surfaceMin,
        surfaceMax,
        hasRange: product.yieldMin !== undefined && product.yieldMax !== undefined,
      };
    }
  }, [mode, surface, quantity, product]);

  const categories = [...new Set(PRODUCTS_YIELDS.map(p => p.category))];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-[#E67E22] to-[#D35400] rounded-xl">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#1A1A1A]">Calculateur de surface</h2>
          <p className="text-sm text-[#64748B]">Estimez vos besoins en produits</p>
        </div>
      </div>

      {/* Mode selector */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMode('surface-to-quantity')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all ${
            mode === 'surface-to-quantity'
              ? 'bg-gradient-to-r from-[#E67E22] to-[#D35400] text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Ruler className="w-4 h-4" />
          Surface → Quantité
        </button>
        <button
          onClick={() => setMode('quantity-to-surface')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all ${
            mode === 'quantity-to-surface'
              ? 'bg-gradient-to-r from-[#E67E22] to-[#D35400] text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Package className="w-4 h-4" />
          Quantité → Surface
        </button>
      </div>

      {/* Product selector */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Produit</label>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E67E22] focus:border-transparent transition-all bg-white"
        >
          {categories.map(category => (
            <optgroup key={category} label={category}>
              {PRODUCTS_YIELDS.filter(p => p.category === category).map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} (~{p.yieldPerLiter} m²/{p.unit})
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {/* Input */}
      <div className="mb-6">
        {mode === 'surface-to-quantity' ? (
          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
              Surface à traiter (m²)
            </label>
            <input
              type="number"
              value={surface}
              onChange={(e) => setSurface(e.target.value)}
              className="w-full p-4 text-2xl font-bold border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E67E22] focus:border-transparent transition-all text-center"
              min="0"
              step="1"
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
              Quantité disponible ({product?.unit || 'L'})
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full p-4 text-2xl font-bold border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E67E22] focus:border-transparent transition-all text-center"
              min="0"
              step="0.5"
            />
          </div>
        )}
      </div>

      {/* Result */}
      {result && product && (
        <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F0F4F8] rounded-xl p-6 border border-[#C7D2FE]">
          <div className="flex items-center gap-2 mb-4">
            <ArrowRight className="w-5 h-5 text-[#E67E22]" />
            <span className="font-bold text-[#1A1A1A]">Résultat</span>
          </div>

          {mode === 'surface-to-quantity' && 'totalLiters' in result && (
            <>
              <div className="text-center mb-4">
                <div className="text-4xl font-extrabold text-[#E67E22]">
                  {result.totalLiters.toFixed(1)} {product.unit}
                </div>
                <div className="text-sm text-[#64748B] mt-1">
                  pour {result.surfaceCovered} m² ({product.coats} couche{product.coats > 1 ? 's' : ''})
                </div>
              </div>

              {result.containers.length > 0 && (
                <div className="bg-white rounded-lg p-4 mt-4">
                  <div className="text-sm font-semibold text-[#1A1A1A] mb-2">
                    📦 Conditionnement suggéré :
                  </div>
                  <div className="space-y-1">
                    {result.containers.map((c, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-[#64748B]">{c.count}x {c.size}{product.unit}</span>
                        <span className="font-semibold text-[#1A1A1A]">{(c.count * c.size).toFixed(1)} {product.unit}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Bouton Ajouter au panier */}
                  {onAddToCart && (
                    <button
                      onClick={() => {
                        const totalQty = result.containers.reduce((sum, c) => sum + c.count * c.size, 0);
                        onAddToCart({
                          productId: product.id,
                          name: product.name,
                          quantity: totalQty,
                          unit: product.unit
                        });
                        setAddedToCart(true);
                        setTimeout(() => setAddedToCart(false), 2000);
                      }}
                      className={`w-full mt-4 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                        addedToCart
                          ? 'bg-green-500 text-white'
                          : 'bg-gradient-to-r from-[#E67E22] to-[#D35400] text-white hover:shadow-lg'
                      }`}
                    >
                      {addedToCart ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Ajouté au panier !
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          Ajouter au panier
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}
            </>
          )}

          {mode === 'quantity-to-surface' && 'surfaceCovered' in result && (
            <div className="text-center">
              {result.hasRange ? (
                <>
                  <div className="text-4xl font-extrabold text-[#E67E22]">
                    {result.surfaceMin?.toFixed(0)} - {result.surfaceMax?.toFixed(0)} m²
                  </div>
                  <div className="text-sm text-[#64748B] mt-1">
                    selon l'absorption du bois ({product.coats} couche{product.coats > 1 ? 's' : ''})
                  </div>
                </>
              ) : (
                <>
                  <div className="text-4xl font-extrabold text-[#E67E22]">
                    ~{result.surfaceCovered.toFixed(0)} m²
                  </div>
                  <div className="text-sm text-[#64748B] mt-1">
                    surface couverte ({product.coats} couche{product.coats > 1 ? 's' : ''})
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}

      <p className="text-xs text-[#94A3B8] mt-4 text-center">
        * Estimations basées sur les fiches techniques Pallmann. Le rendement réel peut varier selon le support.
      </p>
    </div>
  );
};

export default SurfaceCalculator;
