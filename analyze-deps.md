# Analyse des dépendances

## Dépendances potentiellement inutilisées

### À vérifier avant suppression:

1. **@dnd-kit/*** (drag and drop)
   - Non trouvé dans src/
   - Peut être supprimé si non utilisé dans la galerie

2. **qrcode.react**
   - Non trouvé dans src/
   - Peut être supprimé

3. **canvas-confetti**
   - Utilisé dans: src/components/Confetti.tsx
   - Importé dans: src/pages/ThankYou.tsx
   - **À CONSERVER** (utilisé pour effet de succès)

4. **compressorjs**
   - Utilisé pour compression d'images
   - **À CONSERVER**

5. **react-dropzone**
   - Upload de fichiers
   - **À CONSERVER**

## Commandes de nettoyage (à exécuter manuellement):

```bash
# Supprimer les dépendances inutilisées
npm uninstall @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities qrcode.react

# Cela économisera environ 50MB dans node_modules
```

## Dépendances à garder:
- canvas-confetti (effet confettis sur page merci)
- compressorjs (compression images)
- react-dropzone (upload fichiers)
- Toutes les autres dépendances sont activement utilisées
