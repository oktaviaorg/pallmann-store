# Configuration de Resend dans Supabase - Guide Complet

## Problème identifié

Les edge functions Supabase ne peuvent pas envoyer d'emails car la variable d'environnement `RESEND_API_KEY` n'est pas configurée correctement dans Supabase.

**Erreur actuelle :** `API key is invalid`

---

## Edge Functions disponibles

Vous avez 2 edge functions pour l'envoi d'emails :

### 1. `send-form-notification` (RECOMMANDÉE)
- **Destinataire :** contact@ponceur-parquet.fr
- **Expéditeur :** Ponceur-Parquet.fr <notifications@ponceur-parquet.fr>
- **Design :** Email HTML professionnel avec calcul de prix
- **Status :** ACTIVE mais clé API invalide

### 2. `send-notification`
- **Destinataire :** contact@ponceur-parquet.fr
- **Expéditeur :** LPR Notifications <notifications@ponceur-parquet.fr>
- **Design :** Email texte simple
- **Status :** ACTIVE mais clé API invalide

### 3. `send-form-email`
- **Destinataire :** Actuellement julien.68@me.com (temporaire)
- **Expéditeur :** onboarding@resend.dev
- **Status :** ACTIVE et fonctionne

---

## Solution : Configurer RESEND_API_KEY dans Supabase

### Étape 1 : Accéder aux secrets Supabase

1. Connectez-vous sur [supabase.com](https://supabase.com/dashboard)
2. Sélectionnez votre projet **Ponceur-Parquet**
3. Dans le menu de gauche, cliquez sur **Project Settings** (⚙️)
4. Cliquez sur **Edge Functions**
5. Descendez jusqu'à la section **"Secrets"**

### Étape 2 : Ajouter la clé API Resend

Cliquez sur **"Add new secret"** et ajoutez :

```
Name: RESEND_API_KEY
Value: re_VBt2x83m_NoeH48dVVfALxKczjp7KRMnt
```

### Étape 3 : Sauvegarder et redéployer

1. Cliquez sur **"Save"**
2. Les edge functions vont automatiquement redémarrer avec la nouvelle variable
3. Attendez 1-2 minutes que les changements se propagent

---

## Alternative : Utiliser la CLI Supabase (si vous l'avez installée)

```bash
# Définir le secret
supabase secrets set RESEND_API_KEY=re_VBt2x83m_NoeH48dVVfALxKczjp7KRMnt

# Vérifier que le secret est bien défini
supabase secrets list
```

---

## Après la configuration du secret

### 1. Tester l'edge function

```bash
curl -X POST "https://mjuzyqhxifyvebtnlrra.supabase.co/functions/v1/send-form-notification" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VOTRE_ANON_KEY" \
  -d '{
    "full_name": "Test Client",
    "email": "test@example.com",
    "phone": "0612345678",
    "postal_code": "68000",
    "surface": 50,
    "property_type": "maison",
    "finition": "huileEnvironnement",
    "teinture": false,
    "message": "Test"
  }'
```

### 2. Modifier le frontend

Dans `src/utils/form.ts`, changer l'endpoint de :
```typescript
`${supabaseUrl}/functions/v1/send-form-email`
```

Vers :
```typescript
`${supabaseUrl}/functions/v1/send-form-notification`
```

Et adapter le payload pour correspondre à la structure attendue.

---

## IMPORTANT : Vérification du domaine Resend

Même après avoir configuré le secret dans Supabase, vous devez **vérifier votre domaine ponceur-parquet.fr dans Resend** pour envoyer des emails vers contact@ponceur-parquet.fr.

### Tant que le domaine n'est pas vérifié :

Deux options s'offrent à vous :

#### Option A : Utiliser julien.68@me.com (Solution actuelle - FONCTIONNE)
- Edge function : `send-form-email`
- Expéditeur : `onboarding@resend.dev`
- Destinataire : `julien.68@me.com`
- **Avantage :** Fonctionne immédiatement
- **Inconvénient :** Vous devez transférer les emails manuellement

#### Option B : Configurer send-form-notification avec julien.68@me.com
1. Modifier `send-form-notification/index.ts` ligne 10 :
```typescript
const ADMIN_EMAIL = 'julien.68@me.com'; // Au lieu de contact@ponceur-parquet.fr
```

2. Modifier ligne 166 :
```typescript
from: 'onboarding@resend.dev', // Au lieu de notifications@ponceur-parquet.fr
```

3. Redéployer la fonction
4. Configurer le secret RESEND_API_KEY
5. Mettre à jour le frontend

---

## Après la vérification du domaine (prochaine étape)

Une fois que vous aurez vérifié **ponceur-parquet.fr** dans Resend (voir `RESEND_DOMAIN_VERIFICATION.md`), vous pourrez :

1. Garder `send-form-notification` tel quel (avec contact@ponceur-parquet.fr)
2. Configurer le secret RESEND_API_KEY dans Supabase
3. Tout fonctionnera automatiquement

---

## Récapitulatif des configurations

| Configuration | Statut | Action requise |
|--------------|--------|----------------|
| **Clé API Resend** | ✅ Valide (re_VBt2x83m...) | Aucune |
| **Secret Supabase** | ❌ Non configuré | **À FAIRE : Ajouter dans Supabase Dashboard** |
| **Domaine Resend** | ❌ Non vérifié | À faire (voir RESEND_DOMAIN_VERIFICATION.md) |
| **Edge Function** | ✅ Déployée | Aucune |
| **Frontend** | ⚠️ Utilise send-form-email | À changer après config secret |

---

## Ordre des opérations recommandé

### Solution immédiate (maintenant)
1. ✅ FAIT : Le frontend utilise `send-form-email` → julien.68@me.com
2. Vous recevez les emails sur julien.68@me.com

### Solution à moyen terme (quand vous avez 5 minutes)
1. Ajouter RESEND_API_KEY dans Supabase Dashboard
2. Modifier `send-form-notification` pour utiliser julien.68@me.com et onboarding@resend.dev
3. Redéployer la fonction
4. Modifier le frontend pour utiliser `send-form-notification`
5. Meilleur email HTML avec calcul de prix

### Solution définitive (quand vous vérifiez le domaine)
1. Vérifier ponceur-parquet.fr dans Resend (DNS)
2. Remettre contact@ponceur-parquet.fr dans `send-form-notification`
3. Tout fonctionne parfaitement

---

## Support

Si vous avez besoin d'aide :
- Dashboard Supabase : https://supabase.com/dashboard
- Documentation Secrets : https://supabase.com/docs/guides/functions/secrets
- Support Resend : support@resend.com

**Date :** 2026-01-02
**Projet :** Ponceur-Parquet.fr
