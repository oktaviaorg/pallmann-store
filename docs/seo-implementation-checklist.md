# Checklist d'Implémentation SEO - URLs Canoniques et 404

## 🎯 Objectif
Résoudre les 27 erreurs "Page en double sans URL canonique" et optimiser pour Google + Perplexity AI

---

## ✅ Phase 1 - Corrections Immédiates (Semaine 1)

### **Jour 1-2 : Implémentation Canonical Tags**

#### **A. Vérifier l'intégration des composants**
```bash
# Vérifier que les nouveaux composants sont bien importés
grep -r "SEOCanonicalOptimizer" src/
grep -r "SEO404Manager" src/
```

#### **B. Tester les URLs canoniques**
```bash
# Tester en local
curl -I http://localhost:3001/services/
curl -I http://localhost:3001/gallery/
curl -I http://localhost:3001/about/

# Vérifier la présence du header canonical
# Doit contenir : <link rel="canonical" href="https://ponceur-parquet.fr/services/" />
```

#### **C. Validation HTML**
- [ ] Ouvrir chaque page dans le navigateur
- [ ] Inspecter le `<head>` pour vérifier les canonical tags
- [ ] S'assurer que toutes les URLs se terminent par `/`

### **Jour 3-4 : Déploiement et Redirections**

#### **A. Déployer les modifications**
```bash
npm run build
# Déployer sur Netlify/production
```

#### **B. Tester les redirections 301**
```bash
# Tester les redirections principales
curl -I https://ponceur-parquet.fr/services
# Doit retourner : HTTP/1.1 301 Moved Permanently
# Location: https://ponceur-parquet.fr/services/

curl -I https://ponceur-parquet.fr/gallery
curl -I https://ponceur-parquet.fr/about
```

#### **C. Vérifier dans Google Search Console**
- [ ] Aller dans GSC > Couverture
- [ ] Vérifier que les erreurs "Page en double" diminuent
- [ ] Demander une nouvelle indexation pour les pages corrigées

### **Jour 5-7 : Validation et Monitoring**

#### **A. Test complet des 27 URLs problématiques**
```
✅ À tester une par une :
□ https://ponceur-parquet.fr/blog/tag/rénovation/
□ https://ponceur-parquet.fr/blog/tag/tarifs/
□ https://ponceur-parquet.fr/blog/tag/décapage%20bois/
□ https://ponceur-parquet.fr/services/
□ https://ponceur-parquet.fr/gallery/
□ https://ponceur-parquet.fr/cgv/
□ https://ponceur-parquet.fr/confidentialite/
□ https://ponceur-parquet.fr/about/
```

#### **B. Vérification technique**
- [ ] Toutes les pages ont un canonical tag
- [ ] Toutes les URLs se terminent par `/`
- [ ] Les redirections 301 fonctionnent
- [ ] Pas de chaînes de redirections

---

## 🚀 Phase 2 - Optimisation IA (Semaine 2-3)

### **Semaine 2 : Schema Markup Enrichi**

#### **A. Vérifier le Schema LocalBusiness**
```bash
# Tester avec l'outil Google
# https://search.google.com/test/rich-results
```

#### **B. Ajouter FAQ Schema aux articles**
- [ ] Identifier les 5 articles principaux
- [ ] Ajouter des sections FAQ
- [ ] Implémenter le schema FAQ

#### **C. Optimiser pour Perplexity**
- [ ] Restructurer le contenu avec questions directes
- [ ] Ajouter des réponses immédiates
- [ ] Créer des tableaux de prix

### **Semaine 3 : Test et Validation IA**

#### **A. Tests Perplexity manuels**
```
Questions à tester :
□ "Quel est le prix du ponçage de parquet ?"
□ "Comment rénover un parquet ancien ?"
□ "Les Ponceurs Réunis avis clients"
□ "Ponçage parquet Strasbourg prix"
```

#### **B. Validation Google**
- [ ] Rich Results Test pour toutes les pages
- [ ] Mobile-Friendly Test
- [ ] PageSpeed Insights

---

## 📊 Phase 3 - Performance et Monitoring (Semaine 4)

### **Optimisations Performance**

#### **A. Images et Ressources**
- [ ] Convertir images en WebP
- [ ] Implémenter lazy loading
- [ ] Optimiser Core Web Vitals

#### **B. Monitoring Automatisé**
```javascript
// Script de vérification quotidienne
const dailyCheck = {
  canonical: checkAllCanonicalTags(),
  redirects: validateRedirects(),
  gsc: checkGoogleSearchConsole(),
  perplexity: testPerplexityVisibility()
};
```

---

## 🎯 KPIs de Suivi

### **Métriques Google Search Console**
```
Objectifs Semaine 1 :
□ Erreurs canonical : 27 → 0
□ Pages indexées : +100%
□ Crawl errors : -90%

Objectifs Semaine 2-3 :
□ Rich snippets : +5 nouvelles
□ CTR moyen : +15%
□ Impressions : +25%

Objectifs Semaine 4 :
□ Core Web Vitals : Tous verts
□ Mobile usability : 0 erreur
□ Performance score : >90
```

### **Métriques Perplexity AI**
```
Tests manuels hebdomadaires :
□ Citations directes : +3 par semaine
□ Réponses featured : +2 par semaine  
□ Mentions entreprise : +5 par semaine
□ Visibilité prix : 80% des requêtes
```

---

## 🛠️ Outils de Validation

### **Outils Google**
- [Google Search Console](https://search.google.com/search-console) - Monitoring erreurs
- [Rich Results Test](https://search.google.com/test/rich-results) - Schema validation
- [PageSpeed Insights](https://pagespeed.web.dev/) - Performance
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly) - Mobile

### **Outils Techniques**
- [Screaming Frog](https://www.screamingfrog.co.uk/) - Audit technique
- [Ahrefs](https://ahrefs.com/) - Monitoring positions
- [SEMrush](https://semrush.com/) - Analyse concurrence

### **Tests Perplexity**
- Recherches manuelles sur [Perplexity.ai](https://perplexity.ai)
- Tests avec questions spécifiques métier
- Vérification citations et sources

---

## 🚨 Alertes et Monitoring

### **Alertes Critiques**
```javascript
// Configurer alertes pour :
- Nouvelles erreurs 404 (quotidien)
- Erreurs canonical (hebdomadaire)  
- Baisse positions clés (quotidien)
- Problèmes Core Web Vitals (quotidien)
```

### **Rapports Automatisés**
- **Quotidien :** Erreurs techniques
- **Hebdomadaire :** Positions et trafic
- **Mensuel :** Audit complet SEO
- **Trimestriel :** ROI et optimisations

---

## 📈 Timeline des Résultats Attendus

### **Semaine 1**
- ✅ 0 erreur canonical dans GSC
- ✅ Toutes les redirections actives
- ✅ URLs cohérentes avec trailing slash

### **Semaine 2-3** 
- 📈 +20% pages indexées
- 📈 +15% CTR sur résultats
- 📈 Premières citations Perplexity

### **Mois 1-2**
- 🚀 +25% trafic organique
- 🚀 +40% leads qualifiés  
- 🚀 Top 3 sur requêtes locales

### **Mois 3+**
- 🏆 Référence Perplexity sur ponçage parquet
- 🏆 +50% visibilité recherche vocale
- 🏆 ROI positif sur investissement SEO

---

**🎯 Succès = 0 erreur canonical + Visibilité maximale Google & Perplexity AI**