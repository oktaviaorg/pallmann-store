# Configuration Resend - Vérification du domaine ponceur-parquet.fr

## Problème actuel

Votre compte Resend est en **mode test** et peut uniquement envoyer des emails à `julien.68@me.com` (l'adresse du propriétaire du compte).

Pour recevoir les emails de formulaire sur **contact@ponceur-parquet.fr**, vous devez vérifier votre domaine dans Resend.

## Configuration temporaire actuelle

En attendant la vérification du domaine, les emails sont envoyés à :
- **Destinataire :** julien.68@me.com
- **Expéditeur :** onboarding@resend.dev
- **Sujet :** [Ponceur-Parquet] Nouvelle demande de devis - [Nom du client]

Tous les emails contiennent un bandeau jaune indiquant le mode test.

---

## Étapes pour vérifier votre domaine ponceur-parquet.fr

### 1. Connexion à Resend

1. Connectez-vous sur [resend.com](https://resend.com/login)
2. Utilisez les identifiants associés à la clé API `re_VBt2x83m_...`

### 2. Ajouter votre domaine

1. Dans le tableau de bord Resend, cliquez sur **"Domains"** dans le menu
2. Cliquez sur **"Add Domain"**
3. Entrez : `ponceur-parquet.fr`
4. Cliquez sur **"Add"**

### 3. Configurer les enregistrements DNS

Resend va vous fournir 3 enregistrements DNS à ajouter :

#### SPF Record
```
Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com ~all
```

#### DKIM Record (exemple)
```
Type: TXT
Name: resend._domainkey
Value: [valeur fournie par Resend]
```

#### DMARC Record
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:dmarc@ponceur-parquet.fr
```

### 4. Ajouter les enregistrements DNS chez votre hébergeur

Selon votre hébergeur (OVH, Gandi, Cloudflare, etc.) :

1. Connectez-vous à votre espace client
2. Accédez à la gestion DNS de `ponceur-parquet.fr`
3. Ajoutez les 3 enregistrements TXT fournis par Resend
4. Sauvegardez les modifications

**⏱️ Délai de propagation :** 15 minutes à 48 heures (généralement 1-2 heures)

### 5. Vérifier le domaine dans Resend

1. Retournez sur Resend dans **"Domains"**
2. Cliquez sur votre domaine `ponceur-parquet.fr`
3. Cliquez sur **"Verify Domain"**
4. Si les enregistrements DNS sont corrects, le statut passera à **"Verified ✓"**

---

## Après la vérification du domaine

Une fois le domaine vérifié, vous devrez modifier le code pour utiliser votre propre domaine :

### Fichier à modifier : `src/utils/form.ts`

Changez ces lignes (actuellement lignes 97-98) :

```typescript
from: 'onboarding@resend.dev',
to: 'julien.68@me.com',
```

Par :

```typescript
from: 'notifications@ponceur-parquet.fr',
to: 'contact@ponceur-parquet.fr',
```

Supprimez également le bandeau d'alerte "Mode Test" dans l'email (lignes 125-127) :

```html
<div class="alert">
  ⚠️ <strong>Mode Test:</strong> Pour recevoir les emails sur contact@ponceur-parquet.fr, vérifiez votre domaine dans Resend.
</div>
```

---

## Commandes pour mettre à jour après vérification

```bash
# 1. Modifier src/utils/form.ts comme indiqué ci-dessus
# 2. Recompiler le projet
npm run build
```

---

## Vérification que le système fonctionne

### Test avant vérification (maintenant)
✅ Les emails arrivent sur `julien.68@me.com`

### Test après vérification
✅ Les emails arriveront sur `contact@ponceur-parquet.fr`

---

## Besoin d'aide ?

Si vous avez des difficultés avec la vérification DNS :

1. Contactez le support de votre hébergeur DNS
2. Fournissez-leur les enregistrements TXT de Resend
3. Demandez-leur de vérifier la propagation DNS avec `dig` ou `nslookup`

### Vérifier manuellement la propagation DNS

```bash
# Vérifier SPF
dig TXT ponceur-parquet.fr

# Vérifier DKIM
dig TXT resend._domainkey.ponceur-parquet.fr

# Vérifier DMARC
dig TXT _dmarc.ponceur-parquet.fr
```

---

## Récapitulatif

| État | Configuration | Destinataire |
|------|---------------|-------------|
| **Actuellement (Mode Test)** | onboarding@resend.dev → julien.68@me.com | julien.68@me.com |
| **Après vérification** | notifications@ponceur-parquet.fr → contact@ponceur-parquet.fr | contact@ponceur-parquet.fr |

**Date de configuration :** 2026-01-02
**Clé API Resend :** re_VBt2x83m_NoeH48dVVfALxKczjp7KRMnt
