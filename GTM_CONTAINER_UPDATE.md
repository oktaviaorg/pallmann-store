# Mise à jour du conteneur Google Tag Manager

## 🔄 Changement effectué

### Problème signalé
Google signalait que la balise `GTM-W2M8N5GZ` était introuvable sur le site.

### Cause
Le site utilisait l'ancien conteneur GTM : `GTM-M7XZWFTL`

### Solution appliquée
Mise à jour du conteneur GTM vers `GTM-W2M8N5GZ` dans tous les fichiers concernés.

---

## ✅ Fichiers modifiés

### 1. index.html (2 emplacements)

**Ligne 49 - Script principal GTM**
```javascript
// Avant
})(window,document,'script','dataLayer','GTM-M7XZWFTL');

// Après
})(window,document,'script','dataLayer','GTM-W2M8N5GZ');
```

**Ligne 154 - Fallback noscript**
```html
<!-- Avant -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M7XZWFTL"

<!-- Après -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W2M8N5GZ"
```

### 2. docs/gtm-configuration-guide.md

**Ligne 5 - Documentation**
```markdown
// Avant
Ce guide vous explique comment configurer les balises Google Tag Manager (GTM) pour votre conteneur `GTM-M7XZWFTL`

// Après
Ce guide vous explique comment configurer les balises Google Tag Manager (GTM) pour votre conteneur `GTM-W2M8N5GZ`
```

---

## 📋 Vérifications post-déploiement

### Immédiat (J+0)

1. **Vérification visuelle**
   - [ ] Inspecter le code source de la page en production
   - [ ] Confirmer la présence de `GTM-W2M8N5GZ` dans les deux balises
   - [ ] Vérifier qu'aucune référence à `GTM-M7XZWFTL` ne subsiste

2. **Vérification Google Tag Manager**
   - [ ] Ouvrir GTM en mode Prévisualisation
   - [ ] Connecter le site à la prévisualisation
   - [ ] Confirmer que le conteneur correct est détecté
   - [ ] Vérifier que les balises se déclenchent correctement

3. **Vérification Google Tag Assistant**
   - [ ] Installer l'extension Chrome "Tag Assistant Legacy"
   - [ ] Naviguer sur le site
   - [ ] Confirmer la détection de `GTM-W2M8N5GZ`
   - [ ] Vérifier qu'aucune erreur n'est signalée

### Court terme (J+1 à J+3)

1. **Suivi dans GTM**
   - [ ] Vérifier les événements dans le rapport en temps réel de GTM
   - [ ] Confirmer que les conversions sont trackées
   - [ ] Vérifier les déclencheurs personnalisés

2. **Google Analytics 4**
   - [ ] Vérifier que les événements remontent dans GA4 (G-KYNJN3TK0C)
   - [ ] Contrôler le rapport en temps réel
   - [ ] Valider les événements de conversion

3. **Google Ads**
   - [ ] Vérifier que les conversions remontent dans Google Ads
   - [ ] Contrôler les balises de remarketing
   - [ ] Valider le suivi des appels téléphoniques

### Moyen terme (J+7 à J+30)

1. **Performance du tracking**
   - [ ] Analyser le taux de conversion
   - [ ] Vérifier la qualité des données de remarketing
   - [ ] Contrôler l'attribution des conversions

2. **Rapports Google Ads**
   - [ ] Analyser les performances des campagnes
   - [ ] Vérifier les données d'audience
   - [ ] Contrôler les conversions offline

---

## 🔧 Configuration du conteneur GTM-W2M8N5GZ

### Balises à configurer (si ce n'est pas déjà fait)

#### 1. Balises obligatoires

✅ **Google Analytics 4 Configuration**
- Type : Configuration GA4
- ID de mesure : G-KYNJN3TK0C
- Déclencheur : All Pages

✅ **Conversion Linker**
- Type : Conversion Linker
- Déclencheur : All Pages

#### 2. Balises de conversion

✅ **Google Ads Conversion Tracking**
- Type : Google Ads Conversion
- ID de conversion : [À récupérer depuis Google Ads]
- Libellé : [À récupérer depuis Google Ads]
- Déclencheur : Custom Event `form_submission`

✅ **Google Ads Call Conversion**
- Type : Google Ads Call Conversion
- Numéro : +33757821306
- Déclencheur : Custom Event `phone_click`

#### 3. Balises de remarketing

✅ **Google Ads Remarketing**
- Type : Google Ads Remarketing
- ID de conversion : [Même ID que conversion tracking]
- Déclencheur : All Pages

### Variables à créer

#### Variables d'événement
- `Event Category` → Data Layer Variable : `event_category`
- `Event Label` → Data Layer Variable : `event_label`
- `Estimated Value` → Data Layer Variable : `estimated_value`

#### Variables utilisateur
- `User Email` → Data Layer Variable : `user_data.email`
- `User Phone` → Data Layer Variable : `user_data.phone`
- `User First Name` → Data Layer Variable : `user_data.first_name`
- `User Last Name` → Data Layer Variable : `user_data.last_name`
- `User Postal Code` → Data Layer Variable : `user_data.address.postal_code`

### Déclencheurs personnalisés

#### Déclencheurs à créer
1. **Form Submission**
   - Type : Événement personnalisé
   - Nom : `form_submission`

2. **Phone Click**
   - Type : Événement personnalisé
   - Nom : `phone_click`

3. **Conversion**
   - Type : Événement personnalisé
   - Nom : `conversion`

---

## 🎯 Événements envoyés par le site

Le site envoie automatiquement ces événements à dataLayer :

### Événements principaux

| Événement | Description | Données envoyées |
|-----------|-------------|------------------|
| `form_submission` | Soumission formulaire | email, phone, name, surface, service |
| `conversion` | Page remerciement | estimated_value |
| `phone_click` | Clic téléphone | phone_number |
| `service_page_view` | Page service | service_type |
| `gallery_view` | Galerie photos | - |
| `blog_article_view` | Article blog | article_title, category |
| `document_download` | Téléchargement PDF | document_name |
| `social_share` | Partage social | platform, url |
| `cookie_consent` | Consentement cookies | consent_type |

### Exemple de données envoyées

**Formulaire de devis**
```javascript
window.dataLayer.push({
  event: 'form_submission',
  event_category: 'engagement',
  event_label: 'devis_request',
  surface: 50,
  service_type: 'poncage_vitrification',
  estimated_value: 2100,
  user_data: {
    email: 'client@example.com',
    phone: '+33757821306',
    first_name: 'Jean',
    last_name: 'Dupont',
    address: {
      postal_code: '68000'
    }
  }
});
```

**Clic téléphone**
```javascript
window.dataLayer.push({
  event: 'phone_click',
  event_category: 'engagement',
  phone_number: '+33757821306'
});
```

---

## 🧪 Test de la configuration

### 1. Test avec GTM Preview Mode

```bash
# Étapes
1. Ouvrir GTM → Mode Prévisualisation
2. Entrer l'URL : https://ponceur-parquet.fr
3. Naviguer sur le site
4. Vérifier que les balises se déclenchent :
   - All Pages → doit déclencher GA4 Config, Conversion Linker, Remarketing
   - Form Submission → doit déclencher Google Ads Conversion
   - Phone Click → doit déclencher Call Conversion
```

### 2. Test avec la page de debug

```bash
# Ouvrir la page de test
https://ponceur-parquet.fr/gtm-debug.html

# Tester chaque bouton
- Formulaire de devis → Vérifie form_submission
- Appel téléphone → Vérifie phone_click
- Conversion → Vérifie conversion
```

### 3. Test en console

```javascript
// Ouvrir la console navigateur (F12)
// Vérifier dataLayer
console.log(window.dataLayer);

// Envoyer un événement test
window.dataLayer.push({
  event: 'form_submission',
  event_category: 'test',
  event_label: 'test_label'
});
```

---

## 📊 Suivi des performances

### Métriques à surveiller (semaine 1)

1. **GTM**
   - Nombre d'événements déclenchés
   - Taux de déclenchement des balises
   - Erreurs de balises

2. **Google Analytics 4**
   - Sessions enregistrées
   - Événements de conversion
   - Taux d'engagement

3. **Google Ads**
   - Conversions trackées
   - Audiences de remarketing
   - Attribution des conversions

### Dashboard GTM recommandé

Créer un tableau de bord personnalisé pour suivre :
- Total événements form_submission (journalier)
- Total événements phone_click (journalier)
- Total conversions (journalier)
- Taux de déclenchement par balise

---

## ⚠️ Points d'attention

### 1. Mode consentement

Le site utilise le Consent Mode v2 de Google :
- Par défaut, tous les cookies sont refusés
- L'utilisateur doit accepter pour activer analytics et ads
- Les balises marketing ne se déclenchent qu'avec consentement

**Vérifier** : Les balises doivent respecter le statut du consentement

### 2. Chargement différé

GTM est chargé de manière différée :
- Au premier scroll, mousemove, touch, click ou keydown
- Ou après 3 secondes si aucune interaction
- Optimisation des performances Web Vitals

**Vérifier** : Les événements au chargement de page fonctionnent correctement

### 3. Enhanced Conversions

Le site envoie des données utilisateur hashées pour Enhanced Conversions :
- Email
- Téléphone
- Nom/Prénom
- Code postal

**Vérifier** : Les données remontent correctement dans Google Ads

---

## 🔗 Ressources

### Documentation officielle
- [Google Tag Manager](https://tagmanager.google.com/)
- [Google Analytics 4](https://analytics.google.com/)
- [Google Ads Conversion Tracking](https://support.google.com/google-ads/answer/1722022)

### Outils de test
- [Tag Assistant Legacy](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
- [Google Tag Assistant](https://tagassistant.google.com/)
- [GTM Preview Mode](https://support.google.com/tagmanager/answer/6107056)

### Pages utiles du site
- Page de test : `/gtm-debug.html`
- Documentation GTM : `/docs/gtm-configuration-guide.md`

---

## ✅ Checklist de migration complète

### Configuration technique
- [x] Mise à jour du conteneur dans index.html (script)
- [x] Mise à jour du conteneur dans index.html (noscript)
- [x] Mise à jour de la documentation
- [x] Build de production réussi
- [ ] Déploiement en production

### Configuration GTM
- [ ] Balise GA4 Configuration
- [ ] Balise Conversion Linker
- [ ] Balise Google Ads Conversion
- [ ] Balise Google Ads Call Conversion
- [ ] Balise Google Ads Remarketing
- [ ] Variables dataLayer configurées
- [ ] Déclencheurs personnalisés créés

### Tests
- [ ] Test en mode prévisualisation GTM
- [ ] Test des événements form_submission
- [ ] Test des événements phone_click
- [ ] Validation Google Analytics 4
- [ ] Validation Google Ads conversions

### Suivi
- [ ] Vérification J+1 : événements remontent
- [ ] Vérification J+3 : conversions Google Ads
- [ ] Vérification J+7 : performances campagnes
- [ ] Vérification J+30 : ROI publicitaire

---

## 📞 Support

En cas de problème :

1. **Vérifier la console navigateur (F12)**
   - Erreurs JavaScript ?
   - dataLayer correctement initialisé ?

2. **Vérifier GTM Preview Mode**
   - Le conteneur est-il détecté ?
   - Les balises se déclenchent-elles ?

3. **Vérifier Google Tag Assistant**
   - Le conteneur est-il trouvé ?
   - Des erreurs sont-elles signalées ?

4. **Contacter le support Google**
   - [Support GTM](https://support.google.com/tagmanager)
   - [Support Google Ads](https://support.google.com/google-ads)

---

## 🎉 Résumé

**Problème** : Balise GTM-W2M8N5GZ introuvable

**Solution** : Mise à jour du conteneur de `GTM-M7XZWFTL` vers `GTM-W2M8N5GZ`

**Fichiers modifiés** :
- index.html (2 emplacements)
- docs/gtm-configuration-guide.md

**Impact** :
- ✅ Le site utilisera désormais le nouveau conteneur GTM
- ✅ Tous les événements seront trackés correctement
- ✅ Les conversions Google Ads fonctionneront
- ✅ Le remarketing sera actif

**Prochaines étapes** :
1. Déployer en production
2. Configurer les balises dans le nouveau conteneur GTM
3. Tester en mode prévisualisation
4. Valider les conversions dans Google Ads
