# Guide du Formulaire

## Structure

Le formulaire est divisé en trois étapes :

1. Informations sur la surface
2. Type de finition
3. Coordonnées client

## Validation

La validation est gérée par la fonction `validateStep` qui vérifie :

- Surface minimale
- Format du numéro de téléphone
- Format de l'email
- Code postal valide

## Calcul de Prix

Le prix est calculé automatiquement selon :

- Surface en m²
- Type de finition
- Options supplémentaires
- Frais d'installation

## Gestion des Photos

Le composant `PhotoUpload` permet :

- Glisser-déposer
- Compression automatique
- Prévisualisation
- Limite de taille

## Envoi des Données

Les données sont envoyées vers :

1. Supabase (stockage principal)
2. Google Sheets (backup)
3. Système de notifications