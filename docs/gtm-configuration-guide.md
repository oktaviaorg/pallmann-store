# Guide de Configuration Google Tag Manager

## Vue d'ensemble

Ce guide vous explique comment configurer les balises Google Tag Manager (GTM) pour votre conteneur `GTM-W2M8N5GZ` et votre flux Google Analytics 4 `G-KYNJN3TK0C` afin de suivre les conversions et les interactions sur votre site ponceur-parquet.fr.

## Prérequis

- Accès à votre compte Google Tag Manager
- Accès à votre compte Google Ads
- Flux Google Analytics 4 configuré (ID: G-KYNJN3TK0C)
- ID de conversion et libellés de conversion de Google Ads

## Configuration des balises

### 0. Configuration Google Analytics 4

**Type de balise :** Google Analytics: Configuration GA4
**Configuration :**
- ID de mesure : G-KYNJN3TK0C
- Paramètres de configuration :
  - anonymize_ip : true
  - allow_google_signals : false (par défaut, activé avec consentement marketing)
  - allow_ad_personalization_signals : false (par défaut, activé avec consentement marketing)

**Déclenchement :** All Pages (Toutes les pages)

### 1. Conversion Linker

**Type de balise :** Conversion Linker
**Déclenchement :** All Pages (Toutes les pages)

Cette balise est essentielle pour garantir la précision du suivi des conversions.

### 2. Suivi des conversions Google Ads

**Type de balise :** Google Ads Conversion Tracking
**Configuration :**
- ID de conversion : [À obtenir depuis Google Ads]
- Libellé de conversion : [À obtenir depuis Google Ads]
- Valeur de conversion : Utiliser la variable `{{estimated_value}}`
- Devise : EUR

**Déclenchement :** Événement personnalisé `form_submission`

**Conditions du déclencheur :**
- Event equals `form_submission`
- Event Category equals `engagement`
- Event Label equals `devis_request`

### 3. Remarketing Google Ads

**Type de balise :** Google Ads Remarketing
**Configuration :**
- ID de conversion : [Même ID que pour le suivi des conversions]

**Déclenchement :** All Pages (Toutes les pages)

### 4. Suivi des appels Google Ads

**Type de balise :** Google Ads Call Conversion
**Configuration :**
- ID de conversion : [À obtenir depuis Google Ads pour les appels]
- Libellé de conversion : [À obtenir depuis Google Ads pour les appels]
- Numéro de téléphone : +33757821306

**Déclenchement :** Événement personnalisé `phone_click`

**Conditions du déclencheur :**
- Event equals `phone_click`
- Event Category equals `engagement`

### 5. Données utilisateur Google Ads

**Type de balise :** Google Ads Enhanced Conversions
**Configuration :**
- ID de conversion : [Même ID que pour le suivi des conversions]
- Données utilisateur : Utiliser les variables de la couche de données

**Variables nécessaires :**
- `{{user_data.email}}`
- `{{user_data.phone}}`
- `{{user_data.first_name}}`
- `{{user_data.last_name}}`
- `{{user_data.address.postal_code}}`

**Déclenchement :** Événement personnalisé `form_submission`

## Variables de couche de données

Créez les variables suivantes dans GTM :

### Variables d'événement
- `Event Category` : Type = Data Layer Variable, Nom = `event_category`
- `Event Label` : Type = Data Layer Variable, Nom = `event_label`
- `Estimated Value` : Type = Data Layer Variable, Nom = `estimated_value`

### Variables de données utilisateur
- `User Email` : Type = Data Layer Variable, Nom = `user_data.email`
- `User Phone` : Type = Data Layer Variable, Nom = `user_data.phone`
- `User First Name` : Type = Data Layer Variable, Nom = `user_data.first_name`
- `User Last Name` : Type = Data Layer Variable, Nom = `user_data.last_name`
- `User Postal Code` : Type = Data Layer Variable, Nom = `user_data.address.postal_code`

## Déclencheurs personnalisés

### 1. Form Submission Trigger
- Type : Événement personnalisé
- Nom de l'événement : `form_submission`

### 2. Phone Click Trigger
- Type : Événement personnalisé
- Nom de l'événement : `phone_click`

### 3. Conversion Trigger
- Type : Événement personnalisé
- Nom de l'événement : `conversion`

## Test et vérification

### 1. Mode Prévisualisation GTM
1. Activez le mode Prévisualisation dans GTM
2. Connectez-vous à votre site web
3. Effectuez les actions suivantes :
   - Remplir et soumettre le formulaire de devis
   - Cliquer sur un numéro de téléphone
   - Naviguer sur différentes pages

### 2. Page de test dédiée
Utilisez la page `/gtm-debug.html` pour tester tous les événements :
- Ouvrez `https://votre-site.com/gtm-debug.html`
- Testez chaque bouton
- Vérifiez que les événements apparaissent dans le journal

### 3. GTM Debugger (Développement)
Le composant `GTMDebugger` s'affiche automatiquement en mode développement :
- Surveille tous les événements envoyés à dataLayer
- Affiche les données en temps réel
- Permet de mettre en pause/reprendre l'enregistrement

## Événements implémentés

| Événement | Description | Déclenchement |
|-----------|-------------|---------------|
| `form_submission` | Soumission formulaire devis | Validation du formulaire |
| `conversion` | Page de remerciement | Redirection après soumission |
| `phone_click` | Clic sur numéro téléphone | Clic sur lien tel: |
| `service_page_view` | Consultation page service | Chargement page services |
| `gallery_view` | Consultation galerie | Chargement page galerie |
| `blog_article_view` | Lecture article blog | Chargement article |
| `document_download` | Téléchargement document | Clic téléchargement |
| `review_submission` | Soumission avis client | Validation formulaire avis |
| `social_share` | Partage réseaux sociaux | Clic partage |
| `cookie_consent` | Consentement cookies | Choix utilisateur |

## Données de conversion typiques

Pour un formulaire de devis standard :
```javascript
{
  event: 'form_submission',
  event_category: 'engagement',
  event_label: 'devis_request',
  surface: 50,
  service_type: 'poncage_vitrification',
  estimated_value: 2100,
  user_data: {
    email: 'client@example.com',
    phone: '+33123456789',
    first_name: 'Jean',
    last_name: 'Dupont',
    address: {
      postal_code: '68000'
    }
  }
}
```

## Conseils de dépannage

1. **Balises qui ne se déclenchent pas :**
   - Vérifiez les conditions du déclencheur
   - Assurez-vous que l'événement est bien envoyé à dataLayer
   - Utilisez le mode Prévisualisation GTM

2. **Données manquantes :**
   - Vérifiez que les variables de couche de données sont correctement configurées
   - Contrôlez la structure des données envoyées

3. **Conversions non comptabilisées :**
   - Vérifiez l'ID et le libellé de conversion dans Google Ads
   - Assurez-vous que la balise Conversion Linker est active

## Publication

Une fois tous les tests validés :
1. Quittez le mode Prévisualisation
2. Cliquez sur "Soumettre" dans GTM
3. Donnez un nom à votre version (ex: "Configuration balises Google Ads")
4. Publiez les modifications

## Suivi post-publication

- Surveillez les conversions dans Google Ads (délai de 24-48h)
- Vérifiez les rapports d'attribution
- Contrôlez la qualité des données de remarketing