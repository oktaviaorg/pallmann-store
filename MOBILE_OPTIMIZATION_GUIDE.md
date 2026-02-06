# Guide d'optimisation mobile - PageSpeed Insights

## 🔴 Problèmes critiques identifiés (Mobile)

### Performance actuelle
- **LCP** : 15,3s (TRÈS MAUVAIS - objectif < 2,5s)
- **FCP** : 3,1s (objectif < 1,8s)
- **TBT** : 100ms (BON)
- **CLS** : 0.013 (BON)
- **Speed Index** : 5,1s (objectif < 3,4s)

### 1. Images non optimisées pour mobile (2 488 Kio à économiser)

#### Image hero : moi%20complet.png
- **Taille actuelle** : 2 269 KiB
- **Dimensions originales** : 1024×1536 px
- **Dimensions affichées sur mobile** : 333×500 px
- **Gaspillage** : 2 242 KiB (99% de l'image est inutile sur mobile !)

#### Image de fond : lesponceursreunis.jpg
- **Taille actuelle** : 191 KiB
- **Économie potentielle** : 147 KiB avec WebP/compression

#### Logo : marque-alsace.jpg
- **Taille actuelle** : 99 KiB
- **Dimensions originales** : 1200×1188 px
- **Dimensions affichées sur mobile** : 24×24 px
- **Gaspillage** : 99 KiB (image 50× trop grande !)

### 2. Cache Supabase trop court
- **TTL actuel** : 1 heure
- **Recommandé** : 1 an minimum pour les images statiques

### 3. Pas de préconnexion optimale
- **Économie potentielle** : 300ms sur LCP

## ✅ Optimisations appliquées (Code)

### 1. Préconnexion optimisée
```html
<!-- DNS prefetch pour résolution rapide -->
<link rel="dns-prefetch" href="https://mjuzyqhxifyvebtnlrra.supabase.co">

<!-- Preconnect avec crossorigin pour les images -->
<link rel="preconnect" href="https://mjuzyqhxifyvebtnlrra.supabase.co" crossorigin>
```

**Gain estimé** : 200-300ms sur LCP mobile

### 2. Preload de l'image hero (desktop uniquement)
```html
<link rel="preload" as="image"
  href="https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2/moi%20complet.png"
  fetchpriority="high"
  media="(min-width: 768px)">
```

### 3. Lazy loading GTM
Déjà implémenté (voir IMAGE_OPTIMIZATION_GUIDE.md)

## 📸 ACTIONS MANUELLES REQUISES

### Étape 1 : Créer les versions optimisées des images

Vous DEVEZ créer ces versions d'images manuellement :

#### A. Image hero (moi complet.png)

**Versions à créer** :

1. **Mobile** (375px de large max)
   - Nom : `moi-complet-mobile.webp`
   - Dimensions : 333×500 px
   - Format : WebP
   - Qualité : 80%
   - Poids cible : < 50 KiB

2. **Tablet** (768px de large max)
   - Nom : `moi-complet-tablet.webp`
   - Dimensions : 436×562 px
   - Format : WebP
   - Qualité : 85%
   - Poids cible : < 100 KiB

3. **Desktop** (version actuelle optimisée)
   - Nom : `moi-complet-desktop.webp`
   - Dimensions : 1024×1536 px (ou 872×1124 pour économie)
   - Format : WebP
   - Qualité : 85%
   - Poids cible : < 200 KiB

**Outils recommandés** :
- [Squoosh](https://squoosh.app) - gratuit, en ligne
- [TinyPNG](https://tinypng.com) - gratuit
- Photoshop/GIMP - logiciels
- CLI : `cwebp -q 80 input.png -o output.webp`

#### B. Image de fond (lesponceursreunis.jpg)

**Versions à créer** :

1. **Mobile**
   - Nom : `lesponceursreunis-mobile.webp`
   - Dimensions : 600×450 px
   - Poids cible : < 30 KiB

2. **Desktop**
   - Nom : `lesponceursreunis-desktop.webp`
   - Dimensions : 800×600 px
   - Poids cible : < 50 KiB

#### C. Logo (marque-alsace.jpg)

**Version unique optimisée** :
- Nom : `marque-alsace-optimized.webp`
- Dimensions : 128×128 px (4× la taille affichée pour écrans Retina)
- Poids cible : < 5 KiB

### Étape 2 : Uploader sur Supabase

1. Connectez-vous à votre compte Supabase
2. Allez dans Storage → lpr2
3. Uploadez les nouvelles images dans le même dossier
4. Notez les URLs publiques

### Étape 3 : Configurer le cache Supabase

Dans les paramètres Supabase Storage :
```
Cache-Control: public, max-age=31536000, immutable
```

Pour images statiques qui ne changent jamais.

### Étape 4 : Mettre à jour le code (automatique)

Une fois les images créées, je peux mettre à jour automatiquement le code avec les srcset.

## 🎯 Résultats attendus après optimisation

| Métrique | Avant | Après | Amélioration |
|----------|-------|-------|--------------|
| **LCP** | 15,3s | ~2,5s | -12,8s (84%) |
| **FCP** | 3,1s | ~1,5s | -1,6s (52%) |
| **Speed Index** | 5,1s | ~2,5s | -2,6s (51%) |
| **Images** | 2 559 KiB | ~200 KiB | -2 359 KiB (92%) |
| **Score Mobile** | ~50 | ~90 | +40 points |

## 📋 Checklist

### Images à créer
- [ ] `moi-complet-mobile.webp` (333×500, < 50 KiB)
- [ ] `moi-complet-tablet.webp` (436×562, < 100 KiB)
- [ ] `moi-complet-desktop.webp` (872×1124, < 200 KiB)
- [ ] `lesponceursreunis-mobile.webp` (600×450, < 30 KiB)
- [ ] `lesponceursreunis-desktop.webp` (800×600, < 50 KiB)
- [ ] `marque-alsace-optimized.webp` (128×128, < 5 KiB)

### Configuration
- [ ] Uploader les images sur Supabase Storage
- [ ] Configurer Cache-Control à 1 an
- [ ] Tester les URLs publiques
- [ ] Me notifier pour mise à jour du code

## 🛠️ Commandes utiles

### Conversion en WebP (CLI)
```bash
# Installer cwebp (macOS)
brew install webp

# Convertir avec qualité 80
cwebp -q 80 input.png -o output.webp

# Redimensionner et convertir
cwebp -resize 333 500 -q 80 moi-complet.png -o moi-complet-mobile.webp
```

### Vérifier la taille
```bash
ls -lh *.webp
```

## 📞 Prochaines étapes

1. **Créer les images** selon les spécifications ci-dessus
2. **Les uploader** sur Supabase
3. **Me notifier** avec les URLs - je mettrai à jour le code automatiquement
4. **Tester** sur mobile avec PageSpeed Insights

## 🔗 Ressources

- [Squoosh App](https://squoosh.app)
- [TinyPNG](https://tinypng.com)
- [Can I Use WebP](https://caniuse.com/webp)
- [Web.dev - Optimize Images](https://web.dev/fast/#optimize-your-images)
