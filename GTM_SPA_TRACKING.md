# Configuration GTM pour SPA React

## Problème résolu

Les pages étaient marquées "Sans balise" car le site est une **Single Page Application (SPA)** React. Dans une SPA, l'URL change sans recharger la page, donc GTM ne détectait pas automatiquement les changements de page.

## Solution implémentée

### 1. Code GTM dans index.html
Le code **GTM-W2M8N5GZ** est présent dans `index.html` et se charge au démarrage :

```html
<!-- Google Tag Manager -->
<script>
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-W2M8N5GZ');
</script>
<!-- End Google Tag Manager -->
```

### 2. Tracker de pages React (GTMPageView)
Le composant `src/components/GTMPageView.tsx` envoie un événement GTM à chaque changement de route :

```typescript
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function GTMPageView() {
  const location = useLocation();

  useEffect(() => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'pageview',
        page: {
          path: location.pathname,
          url: window.location.href,
          title: document.title
        }
      });
    }
  }, [location]);

  return null;
}
```

### 3. Intégration dans App.tsx
Le composant est ajouté dans `App.tsx` pour tracker toutes les routes :

```typescript
export default function App() {
  return (
    <>
      <GTMPageView />
      <Routes>
        {/* Toutes les routes */}
      </Routes>
    </>
  );
}
```

## Comment vérifier

### Dans la console du navigateur (F12)

```javascript
// 1. Vérifier que GTM est chargé
console.log(window.dataLayer);
// Devrait afficher un tableau avec des événements GTM

// 2. Vérifier que le script GTM est présent
console.log(document.querySelector('script[src*="GTM-W2M8N5GZ"]'));
// Devrait afficher l'élément script

// 3. Naviguer entre les pages et vérifier les événements
window.dataLayer.forEach((item, index) => {
  if (item.event === 'pageview') {
    console.log(`Pageview #${index}:`, item.page);
  }
});
```

### Avec Tag Assistant

1. Installer l'extension **Tag Assistant** de Google
2. Aller sur votre site : https://ponceur-parquet.fr
3. Cliquer sur l'extension Tag Assistant
4. Cliquer sur "Connect" pour activer le mode debug
5. Naviguer entre les pages
6. Vérifier que **GTM-W2M8N5GZ** est détecté sur chaque page

### Dans Google Tag Manager

1. Aller dans votre conteneur GTM-W2M8N5GZ
2. Activer le mode "Preview"
3. Entrer l'URL : https://ponceur-parquet.fr
4. Une nouvelle fenêtre s'ouvre avec votre site
5. Naviguer entre les pages
6. Dans Tag Assistant, voir les événements "pageview" à chaque navigation

## Configuration dans GTM (recommandée)

Pour capturer les événements de pageview, créez un déclencheur dans GTM :

### Déclencheur "Pageview SPA"
- **Type** : Événement personnalisé
- **Nom de l'événement** : `pageview`
- **Activation** : Tous les événements personnalisés

### Balise GA4 - Configuration
- **Type** : Google Analytics : événement GA4
- **ID de mesure** : Votre ID GA4
- **Nom de l'événement** : `page_view`
- **Paramètres** :
  - `page_path` : `{{Page Path}}`
  - `page_title` : `{{Page Title}}`
- **Déclencheur** : Pageview SPA

## Toutes les pages sont maintenant couvertes

Avec cette configuration, **TOUTES** les pages suivantes ont maintenant la balise GTM :

- Toutes les pages `/blog/*` (articles dynamiques)
- Toutes les pages `/location-ponceuse/*`
- Toutes les pages `/renovation-parquet-*`
- Toutes les routes définies dans React Router

## Temps de détection

Google Tag Manager peut prendre **jusqu'à 24 heures** pour mettre à jour le statut "Couverture de la balise" dans la console.

Pour une vérification immédiate, utilisez :
- **Tag Assistant** (extension Chrome)
- **Mode Preview** dans GTM
- **Console du navigateur** (F12)

## Support

Si les pages sont toujours marquées "Sans balise" après 24h, vérifier :

1. Le déploiement du site est terminé
2. Le cache du navigateur est vidé
3. Tag Assistant détecte bien GTM-W2M8N5GZ
4. Les événements "pageview" apparaissent dans dataLayer lors de la navigation

## Code nettoyé

Tous les codes analytics redondants ont été supprimés :
- ✅ Conservé : **GTM-W2M8N5GZ** uniquement
- ❌ Supprimé : Code GA4 direct (G-KYNJN3TK0C)
- ❌ Supprimé : Fonction gtag() manuelle
- ❌ Supprimé : Variables Firebase inutilisées

GTM gère maintenant tout le tracking via son conteneur.
