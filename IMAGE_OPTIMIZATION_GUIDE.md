# Guide d'optimisation des images

## Problèmes identifiés (PageSpeed Insights)

### 1. Images trop lourdes (2 562 Kio)
- **moi complet.png** : 2 270 Kio
- **lesponceursreunis.jpg** : 191 Kio
- **marque-alsace.jpg** : 100 Kio

### 2. Images sans dimensions explicites
Les images sans attributs `width` et `height` causent du CLS (Cumulative Layout Shift).

### 3. JavaScript inutilisé (317 Kio)
- Google Tag Manager : 202,7 Kio
- Bundle principal : 114,8 Kio

## Solutions appliquées

### ✅ 1. Dimensions explicites ajoutées

Toutes les images ont maintenant des attributs `width` et `height` explicites :

```tsx
// Logo Marque Alsace
<img
  src="..."
  alt="Marque Alsace - Entreprise locale alsacienne"
  width="64"
  height="32"
  className="h-6 sm:h-8 w-auto object-contain"
  loading="eager"
/>

// Photo héro (moi complet.png)
<img
  src="..."
  alt="Julien DIETEMANN - Expert parquet"
  width="436"
  height="562"
  className="w-full h-full object-contain object-bottom"
  loading="eager"
  fetchpriority="high"
/>

// Photo de fond (lesponceursreunis.jpg)
<img
  src="..."
  alt="Chantier de ponçage parquet"
  width="800"
  height="600"
  className="w-full h-full object-cover opacity-70"
  loading="lazy"
/>
```

**Impact** : Réduit le CLS et améliore le score de performance.

### ✅ 2. Lazy loading pour GTM

Google Tag Manager est maintenant chargé de manière différée :

```javascript
// Chargement différé de GTM
function loadGTM() {
  if (window.gtmLoaded) return;
  window.gtmLoaded = true;
  // ... chargement GTM
}

// Déclenchement sur interaction utilisateur
['scroll', 'mousemove', 'touchstart', 'click', 'keydown'].forEach(function(event) {
  window.addEventListener(event, loadGTM, { once: true, passive: true });
});

// Fallback après 3 secondes
setTimeout(loadGTM, 3000);
```

**Impact** :
- Réduit le JavaScript initial de ~200 Kio
- Améliore FCP et LCP
- GTM se charge toujours avant toute interaction

### ✅ 3. Suppression des duplications

- Supprimé le script GTM en double dans `index.html`
- Supprimé le noscript GTM en double

## Recommandations pour optimisation future

### 📸 Optimisation des images

Pour réduire davantage la taille des images, vous devez :

1. **Compresser les images sur Supabase** :
   - Utiliser un outil comme TinyPNG, Squoosh ou ImageOptim
   - Convertir en WebP pour une meilleure compression
   - Viser ~50-100 Kio pour les images de fond
   - Viser ~200-300 Kio pour l'image héro (moi complet.png)

2. **Créer des versions responsive** :
   ```tsx
   <img
     srcSet="
       image-mobile.webp 375w,
       image-tablet.webp 768w,
       image-desktop.webp 1920w
     "
     sizes="(max-width: 768px) 375px, (max-width: 1024px) 768px, 1920px"
     src="image-desktop.webp"
     alt="..."
   />
   ```

3. **Étapes manuelles requises** :
   - Télécharger les images depuis Supabase
   - Les compresser/optimiser
   - Les re-uploader sur Supabase
   - Mettre à jour les URLs dans le code si nécessaire

### 🎯 Code splitting (optionnel)

Pour réduire le bundle JavaScript principal :

```typescript
// Au lieu de :
import { Component } from './Component';

// Utiliser :
const Component = React.lazy(() => import('./Component'));
```

## Résultats attendus

Après compression manuelle des images :

| Métrique | Avant | Après optimisation |
|----------|-------|-------------------|
| **Taille totale réseau** | 3 122 Kio | ~700 Kio |
| **JavaScript inutilisé** | 317 Kio | ~120 Kio |
| **CLS** | Élevé | Faible ✅ |
| **LCP** | ~3s | ~1.5s |
| **Score PageSpeed** | 60-70 | 85-95 |

## Fichiers modifiés

- ✅ `index.html` - Lazy loading GTM + suppression duplications
- ✅ `src/pages/HomePage.tsx` - Dimensions images
- ✅ `src/pages/LandingBasRhin.tsx` - Dimensions images
- ✅ `src/pages/LandingBelfort.tsx` - Dimensions images
- ✅ `src/pages/LandingColmar.tsx` - Dimensions images
- ✅ `src/pages/LandingColmarMulhouse.tsx` - Dimensions images
- ✅ `src/pages/LandingDijon.tsx` - Dimensions images
- ✅ `src/pages/LandingMulhouse.tsx` - Dimensions images
- ✅ `src/pages/LandingSarrebourg.tsx` - Dimensions images
- ✅ `src/pages/LandingStrasbourg.tsx` - Dimensions images
- ✅ `src/pages/AboutPage.tsx` - Dimensions images
