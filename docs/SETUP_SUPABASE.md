# Configuration Supabase - Pallmann Store

## Tables à créer

Exécutez les fichiers SQL suivants dans **Supabase SQL Editor** :

### 1. Tables principales
```bash
# Fichier : sql/tables.sql
```

Ce fichier crée :
- `pro_requests` - Demandes d'inscription professionnelle
- `quote_requests` - Demandes de devis
- `company_codes` - Codes promo professionnels (si pas déjà existante)

### 2. Articles de blog
```bash
# Fichier : sql/articles.sql
```

Ce fichier :
- Supprime les articles existants
- Insère 4 nouveaux articles :
  1. Guide vitrificateurs PALL-X (94, 96, 98)
  2. MAGIC OIL 2K : huile professionnelle
  3. Entretien parquet vitrifié avec FINISH CARE
  4. Guide abrasifs ponceuses

## Structure des tables

### `pro_requests`
| Colonne | Type | Description |
|---------|------|-------------|
| id | UUID | Clé primaire |
| company_name | TEXT | Nom entreprise |
| siret | VARCHAR(14) | Numéro SIRET |
| contact_name | TEXT | Nom contact |
| email | TEXT | Email |
| phone | TEXT | Téléphone |
| address, city, postal_code | TEXT | Adresse |
| message | TEXT | Message optionnel |
| status | TEXT | pending/approved/rejected |
| created_at | TIMESTAMP | Date création |

### `quote_requests`
| Colonne | Type | Description |
|---------|------|-------------|
| id | UUID | Clé primaire |
| products | JSONB | Liste produits [{id, name, quantity, price_ht}] |
| company_name | TEXT | Entreprise (optionnel) |
| contact_name | TEXT | Nom contact |
| email | TEXT | Email |
| phone, address, city, postal_code | TEXT | Coordonnées |
| message | TEXT | Message |
| total_ht | DECIMAL | Total estimé HT |
| status | TEXT | pending/quoted/accepted/rejected/expired |
| quote_number | VARCHAR(50) | Numéro devis attribué |
| created_at | TIMESTAMP | Date création |

## Nouvelles fonctionnalités

### Page PRO (/pro)
- Formulaire d'inscription professionnel
- Validation SIRET (14 chiffres)
- Sauvegarde dans `pro_requests`

### Demande de devis (/demande-devis)
- Panier devis séparé du panier d'achat
- Bouton "Ajouter au devis" sur chaque produit
- Formulaire de demande avec liste produits
- Sauvegarde dans `quote_requests`

### Code promo
- Bouton X pour supprimer le code validé
- Reset complet (localStorage + state)

## Déploiement

1. Exécuter `sql/tables.sql` dans Supabase
2. Exécuter `sql/articles.sql` dans Supabase
3. Le site se met à jour automatiquement via Vercel
