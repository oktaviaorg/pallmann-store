# Guide de Style d'Accessibilité - Les Ponceurs Réunis

## Introduction

Ce guide définit les standards d'accessibilité pour le site web de Les Ponceurs Réunis, garantissant une expérience utilisateur inclusive conforme aux critères WCAG 2.1 niveau AA. Notre engagement envers l'excellence dans la rénovation de parquet s'étend à l'accessibilité numérique.

## 1. Critères de Contraste WCAG 2.1

### 1.1 Ratios de Contraste Requis

#### Texte Normal (moins de 18pt ou 14pt gras)
- **Minimum requis** : 4.5:1
- **Recommandé** : 7:1 (niveau AAA)

#### Texte Large (18pt+ ou 14pt+ gras)
- **Minimum requis** : 3:1
- **Recommandé** : 4.5:1 (niveau AAA)

#### Éléments d'Interface Non-Textuels
- **Minimum requis** : 3:1
- **Concerne** : Bordures de champs, icônes fonctionnelles, états de focus

### 1.2 Palette de Couleurs Accessible

#### Mode Sombre (Défaut)
```css
/* Couleurs principales conformes WCAG 2.1 */
:root {
  /* Arrière-plans */
  --bg-primary: #0f172a;           /* Contraste 21:1 avec blanc */
  --bg-secondary: #1e293b;        /* Contraste 16.8:1 avec blanc */
  --bg-card: #334155;             /* Contraste 9.2:1 avec blanc */
  
  /* Textes */
  --text-primary: #f8fafc;        /* Contraste 19.3:1 avec bg-primary */
  --text-secondary: #e2e8f0;      /* Contraste 15.8:1 avec bg-primary */
  --text-muted: #94a3b8;          /* Contraste 7.1:1 avec bg-primary */
  
  /* Couleur d'accent (or parquet) */
  --accent-primary: #fbbf24;      /* Contraste 8.2:1 avec bg-primary */
  --accent-hover: #f59e0b;        /* Contraste 6.8:1 avec bg-primary */
  
  /* États d'erreur et succès */
  --error: #ef4444;               /* Contraste 5.2:1 avec bg-primary */
  --success: #10b981;             /* Contraste 6.1:1 avec bg-primary */
  --warning: #f59e0b;             /* Contraste 6.8:1 avec bg-primary */
}
```

#### Mode Clair (Alternative)
```css
.light-theme {
  /* Arrière-plans */
  --bg-primary: #ffffff;          /* Contraste 21:1 avec noir */
  --bg-secondary: #f8fafc;        /* Contraste 19.3:1 avec noir */
  --bg-card: #f1f5f9;            /* Contraste 17.1:1 avec noir */
  
  /* Textes */
  --text-primary: #0f172a;        /* Contraste 19.3:1 avec bg-primary */
  --text-secondary: #334155;      /* Contraste 12.6:1 avec bg-primary */
  --text-muted: #64748b;          /* Contraste 7.2:1 avec bg-primary */
  
  /* Couleur d'accent adaptée */
  --accent-primary: #b45309;      /* Contraste 7.1:1 avec bg-primary */
  --accent-hover: #92400e;        /* Contraste 8.9:1 avec bg-primary */
}
```

### 1.3 Outils de Vérification

#### Outils Recommandés
- **WebAIM Contrast Checker** : https://webaim.org/resources/contrastchecker/
- **Colour Contrast Analyser (CCA)** : Application desktop gratuite
- **axe DevTools** : Extension navigateur pour tests automatisés

#### Tests Obligatoires
- Vérifier tous les textes sur leurs arrière-plans respectifs
- Tester les états hover, focus et active
- Valider les icônes et éléments graphiques fonctionnels

## 2. Typographie et Tailles de Police

### 2.1 Hiérarchie Typographique

#### Tailles de Base
```css
/* Système de tailles accessible */
.text-xs { font-size: 0.75rem; line-height: 1.5; }    /* 12px - Usage limité */
.text-sm { font-size: 0.875rem; line-height: 1.6; }   /* 14px - Texte secondaire */
.text-base { font-size: 1rem; line-height: 1.7; }     /* 16px - Texte principal */
.text-lg { font-size: 1.125rem; line-height: 1.7; }   /* 18px - Texte important */
.text-xl { font-size: 1.25rem; line-height: 1.6; }    /* 20px - Sous-titres */
.text-2xl { font-size: 1.5rem; line-height: 1.5; }    /* 24px - Titres sections */
.text-3xl { font-size: 1.875rem; line-height: 1.4; }  /* 30px - Titres principaux */
```

#### Recommandations Spécifiques
- **Texte minimum** : 16px (1rem) pour le contenu principal
- **Interlignage** : Minimum 1.5 pour le texte courant, 1.2 pour les titres
- **Longueur de ligne** : Maximum 75 caractères (45-75 optimal)
- **Espacement des paragraphes** : Minimum 1.5x la hauteur de ligne

### 2.2 Polices Accessibles

#### Police Principale
```css
font-family: 'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
```

#### Critères de Sélection
- **Lisibilité** : Distinction claire entre caractères similaires (l, I, 1)
- **Espacement** : Espacement généreux entre les lettres
- **Poids disponibles** : 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

## 3. Système de Couleurs et Modes

### 3.1 Implémentation du Mode Clair

#### Sélecteur de Thème
```jsx
// Composant ThemeToggle accessible
const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark');
  
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label={`Basculer en mode ${theme === 'dark' ? 'clair' : 'sombre'}`}
      className="theme-toggle"
    >
      {theme === 'dark' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
      <span className="sr-only">
        Mode {theme === 'dark' ? 'clair' : 'sombre'}
      </span>
    </button>
  );
};
```

#### Respect des Préférences Système
```css
/* Détection automatique des préférences */
@media (prefers-color-scheme: light) {
  :root {
    /* Variables mode clair par défaut */
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Variables mode sombre par défaut */
  }
}

/* Respect de prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 3.2 Gestion des États Visuels

#### États de Focus
```css
/* Focus visible et accessible */
.focus-ring {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Focus pour éléments interactifs */
button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  @apply focus-ring;
}
```

#### États Hover et Active
```css
/* États hover avec contraste suffisant */
.btn-primary:hover {
  background-color: var(--accent-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

## 4. Accessibilité des Boutons et Éléments Interactifs

### 4.1 Tailles Minimales

#### Zones de Clic
- **Minimum** : 44x44px (critère WCAG 2.1)
- **Recommandé** : 48x48px pour mobile
- **Espacement** : Minimum 8px entre éléments cliquables

```css
/* Classe utilitaire pour zones de clic */
.touch-target {
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Adaptation mobile */
@media (max-width: 768px) {
  .touch-target {
    min-width: 48px;
    min-height: 48px;
  }
}
```

### 4.2 Labels et Descriptions

#### Boutons Accessibles
```jsx
// Exemple de bouton accessible
<button
  type="submit"
  aria-label="Envoyer la demande de devis pour ponçage de parquet"
  aria-describedby="form-help-text"
  className="btn-primary touch-target"
>
  <Calculator aria-hidden="true" />
  Demander un devis
</button>

<div id="form-help-text" className="sr-only">
  Ce formulaire permet d'obtenir un devis gratuit pour vos travaux de ponçage et rénovation de parquet
</div>
```

#### Liens Descriptifs
```jsx
// Liens avec contexte suffisant
<Link 
  to="/services"
  aria-label="Découvrir nos services de ponçage et rénovation de parquet"
>
  Nos services
</Link>

// Liens externes avec indication
<a 
  href="tel:+33757821306"
  aria-label="Appeler Les Ponceurs Réunis au 07 57 82 13 06"
>
  <Phone aria-hidden="true" />
  07 57 82 13 06
  <span className="sr-only">(Appel téléphonique)</span>
</a>
```

### 4.3 Navigation au Clavier

#### Ordre de Tabulation
```css
/* Ordre logique de navigation */
.tab-order-1 { tab-index: 1; }
.tab-order-2 { tab-index: 2; }

/* Skip links pour navigation rapide */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--accent-primary);
  color: var(--bg-primary);
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 1000;
}

.skip-link:focus {
  top: 6px;
}
```

#### Raccourcis Clavier
```jsx
// Gestion des raccourcis clavier
useEffect(() => {
  const handleKeyDown = (e) => {
    // Échap pour fermer les modales
    if (e.key === 'Escape' && isModalOpen) {
      closeModal();
    }
    
    // Entrée pour activer les boutons
    if (e.key === 'Enter' && e.target.role === 'button') {
      e.target.click();
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, [isModalOpen]);
```

## 5. Icônes et Éléments Graphiques

### 5.1 Icônes Accessibles

#### Implémentation Correcte
```jsx
// Icône décorative
<Phone aria-hidden="true" className="w-5 h-5" />

// Icône fonctionnelle
<button aria-label="Fermer la fenêtre">
  <X aria-hidden="true" className="w-5 h-5" />
</button>

// Icône avec texte alternatif
<div role="img" aria-label="Évaluation 5 étoiles sur 5">
  {[1,2,3,4,5].map(star => (
    <Star key={star} className="text-yellow-400 fill-current" aria-hidden="true" />
  ))}
</div>
```

#### Alternatives Textuelles
```jsx
// Système d'étoiles accessible
const StarRating = ({ rating, maxRating = 5 }) => (
  <div 
    role="img" 
    aria-label={`Note de ${rating} sur ${maxRating} étoiles`}
    className="flex items-center"
  >
    {Array.from({ length: maxRating }, (_, i) => (
      <Star
        key={i}
        aria-hidden="true"
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ))}
    <span className="sr-only">
      {rating} étoile{rating > 1 ? 's' : ''} sur {maxRating}
    </span>
  </div>
);
```

### 5.2 Images et Médias

#### Textes Alternatifs Descriptifs
```jsx
// Images décoratives
<img 
  src="/parquet-renovation.jpg" 
  alt="" 
  role="presentation"
  className="decorative-image"
/>

// Images informatives
<img 
  src="/avant-apres-parquet.jpg" 
  alt="Comparaison avant/après : parquet ancien rayé transformé en parquet rénové brillant par Les Ponceurs Réunis"
  className="comparison-image"
/>

// Images complexes avec description longue
<img 
  src="/processus-poncage.jpg" 
  alt="Processus de ponçage de parquet en 4 étapes"
  aria-describedby="processus-description"
/>
<div id="processus-description" className="sr-only">
  Illustration du processus de ponçage : 1) Préparation et protection, 2) Ponçage gros grain, 3) Ponçage fin, 4) Application de la finition
</div>
```

## 6. Formulaires Accessibles

### 6.1 Labels et Instructions

#### Structure Accessible
```jsx
// Champ avec label et aide
<div className="form-field">
  <label htmlFor="surface" className="form-label required">
    Surface à traiter (m²)
    <span aria-label="Champ obligatoire">*</span>
  </label>
  <input
    id="surface"
    type="number"
    min="1"
    max="500"
    aria-describedby="surface-help surface-error"
    aria-required="true"
    aria-invalid={errors.surface ? 'true' : 'false'}
    className="form-input"
  />
  <div id="surface-help" className="form-help">
    Indiquez la surface totale en mètres carrés
  </div>
  {errors.surface && (
    <div id="surface-error" className="form-error" role="alert">
      {errors.surface}
    </div>
  )}
</div>
```

#### Groupes de Champs
```jsx
// Groupe radio accessible
<fieldset className="form-fieldset">
  <legend className="form-legend">Type de bien</legend>
  <div className="radio-group">
    <label className="radio-label">
      <input
        type="radio"
        name="propertyType"
        value="maison"
        aria-describedby="maison-description"
      />
      <span>Maison</span>
    </label>
    <div id="maison-description" className="radio-description">
      Maison individuelle ou mitoyenne
    </div>
    
    <label className="radio-label">
      <input
        type="radio"
        name="propertyType"
        value="appartement"
        aria-describedby="appartement-description"
      />
      <span>Appartement</span>
    </label>
    <div id="appartement-description" className="radio-description">
      Appartement en immeuble collectif
    </div>
  </div>
</fieldset>
```

### 6.2 Validation et Messages d'Erreur

#### Messages d'Erreur Accessibles
```jsx
// Composant d'erreur accessible
const ErrorMessage = ({ message, fieldId }) => (
  <div 
    id={`${fieldId}-error`}
    role="alert"
    aria-live="polite"
    className="form-error"
  >
    <AlertCircle aria-hidden="true" className="error-icon" />
    {message}
  </div>
);

// Résumé des erreurs en haut de formulaire
const ErrorSummary = ({ errors }) => (
  <div role="alert" aria-labelledby="error-summary-title" className="error-summary">
    <h2 id="error-summary-title">Erreurs dans le formulaire</h2>
    <ul>
      {Object.entries(errors).map(([field, message]) => (
        <li key={field}>
          <a href={`#${field}`}>{message}</a>
        </li>
      ))}
    </ul>
  </div>
);
```

## 7. Navigation et Structure

### 7.1 Structure Sémantique

#### Hiérarchie des Titres
```jsx
// Structure logique des titres
<main>
  <h1>Les Ponceurs Réunis - Experts en Rénovation de Parquet</h1>
  
  <section aria-labelledby="services-title">
    <h2 id="services-title">Nos Services</h2>
    
    <article aria-labelledby="poncage-title">
      <h3 id="poncage-title">Ponçage de Parquet</h3>
      <h4>Techniques Utilisées</h4>
    </article>
  </section>
</main>
```

#### Landmarks ARIA
```jsx
// Navigation principale
<nav aria-label="Navigation principale" role="navigation">
  <ul>
    <li><Link to="/">Accueil</Link></li>
    <li><Link to="/services">Services</Link></li>
    <li><Link to="/contact">Contact</Link></li>
  </ul>
</nav>

// Navigation secondaire
<nav aria-label="Navigation du blog" role="navigation">
  <ol aria-label="Fil d'Ariane">
    <li><Link to="/">Accueil</Link></li>
    <li><Link to="/blog">Blog</Link></li>
    <li aria-current="page">Guide du Ponçage</li>
  </ol>
</nav>

// Contenu principal
<main role="main" aria-labelledby="main-title">
  <h1 id="main-title">Demande de Devis</h1>
</main>

// Informations complémentaires
<aside aria-labelledby="sidebar-title" role="complementary">
  <h2 id="sidebar-title">Conseils d'Experts</h2>
</aside>
```

### 7.2 Navigation au Clavier

#### Skip Links
```jsx
// Liens d'évitement en début de page
<div className="skip-links">
  <a href="#main-content" className="skip-link">
    Aller au contenu principal
  </a>
  <a href="#main-navigation" className="skip-link">
    Aller à la navigation
  </a>
  <a href="#contact-form" className="skip-link">
    Aller au formulaire de contact
  </a>
</div>
```

## 8. Tests et Validation

### 8.1 Outils de Test Automatisés

#### Tests Intégrés
```javascript
// Tests avec axe-core
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('should not have accessibility violations', async () => {
  const { container } = render(<App />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

#### Checklist de Validation
- [ ] Contraste de couleurs vérifié (4.5:1 minimum)
- [ ] Navigation au clavier fonctionnelle
- [ ] Lecteur d'écran testé (NVDA/JAWS)
- [ ] Formulaires avec labels appropriés
- [ ] Images avec textes alternatifs
- [ ] Structure de titres logique
- [ ] Focus visible sur tous les éléments interactifs
- [ ] Messages d'erreur annoncés
- [ ] Pas de clignotement > 3Hz
- [ ] Zoom jusqu'à 200% sans perte de fonctionnalité

### 8.2 Tests Manuels

#### Scénarios de Test
1. **Navigation clavier uniquement** : Tab, Shift+Tab, Entrée, Espace, Échap
2. **Lecteur d'écran** : NVDA (gratuit) ou JAWS
3. **Zoom** : Test jusqu'à 200% de zoom
4. **Contraste** : Vérification avec outils dédiés
5. **Mouvement réduit** : Test avec `prefers-reduced-motion`

## 9. Implémentation Technique

### 9.1 Classes CSS Utilitaires

```css
/* Classes d'accessibilité */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.focus-ring {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}

.high-contrast {
  filter: contrast(150%);
}

.reduced-motion {
  animation: none !important;
  transition: none !important;
}
```

### 9.2 Composants Accessibles

#### Bouton Accessible Réutilisable
```jsx
const AccessibleButton = ({ 
  children, 
  ariaLabel, 
  ariaDescribedBy,
  variant = 'primary',
  size = 'medium',
  ...props 
}) => (
  <button
    aria-label={ariaLabel}
    aria-describedby={ariaDescribedBy}
    className={`btn btn-${variant} btn-${size} touch-target focus-ring`}
    {...props}
  >
    {children}
  </button>
);
```

## 10. Maintenance et Évolution

### 10.1 Processus de Validation

#### Workflow de Développement
1. **Développement** : Tests automatisés axe-core
2. **Review** : Vérification manuelle des critères WCAG
3. **Staging** : Tests avec lecteurs d'écran
4. **Production** : Monitoring continu de l'accessibilité

#### Formation Équipe
- Formation WCAG 2.1 pour tous les développeurs
- Tests réguliers avec utilisateurs en situation de handicap
- Veille technologique sur les nouvelles pratiques d'accessibilité

### 10.2 Métriques et Suivi

#### KPIs d'Accessibilité
- Taux de conformité WCAG 2.1 AA : 100%
- Temps de navigation au clavier : < 30 secondes pour atteindre le formulaire
- Score Lighthouse Accessibility : > 95
- Zéro violation axe-core en production

---

## Conclusion

Ce guide garantit que le site de Les Ponceurs Réunis respecte les plus hauts standards d'accessibilité, reflétant notre engagement envers l'excellence et l'inclusion. Une approche accessible améliore l'expérience pour tous les utilisateurs et renforce notre image de professionnalisme dans le secteur de la rénovation de parquet.

**Contact pour questions d'accessibilité** : accessibility@poncages.fr