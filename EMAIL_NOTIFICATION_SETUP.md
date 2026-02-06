# Configuration des notifications email

## ✅ Système mis en place

Votre site envoie maintenant **automatiquement** une copie de chaque demande de devis à **contact@poncages.fr**

## 🔧 Ce qui a été configuré

### 1. Edge Function Supabase
**Fichier:** `supabase/functions/send-form-notification/index.ts`
- ✅ Déployée et active
- ✅ Email formaté avec HTML professionnel
- ✅ Comprend toutes les informations du client
- ✅ Calcul automatique du prix estimé

### 2. Déclencheur automatique (Trigger)
**Migration:** Base de données Supabase
- ✅ Se déclenche automatiquement à chaque nouvelle soumission
- ✅ Log des tentatives d'envoi dans `email_notifications_log`
- ✅ Pas besoin d'intervention manuelle

### 3. Code frontend
**Fichier:** `src/utils/form.ts`
- ✅ Appel automatique de l'Edge Function
- ✅ Gestion d'erreur robuste
- ✅ Ne bloque jamais l'utilisateur

## 📧 Format de l'email reçu

Vous recevrez un email avec:
- **Sujet:** 🔔 Nouvelle demande de devis - [Nom du client]
- **De:** Ponceur-Parquet.fr <notifications@ponceur-parquet.fr>
- **Répondre à:** [Email du client]

### Contenu de l'email:
```
📝 Nouvelle demande de devis
Ponceur-Parquet.fr

=== INFORMATIONS CLIENT ===
Nom complet: Jean Dupont
Email: jean.dupont@email.com
Téléphone: 06 12 34 56 78
Code postal: 68420
Adresse: 6 rue du Commerce, 68420 Herrlisheim

=== DÉTAILS DU PROJET ===
Surface: 50 m²
Type de bien: Maison
Finition: Ponçage + Vitrification
Teinture: Non

Message:
[Message du client si présent]

━━━━━━━━━━━━━━━━━━━━━━
Prix estimé: 2100€
━━━━━━━━━━━━━━━━━━━━━━

Reçu le 03/10/2025 à 14:32
```

## 🚀 Utilisation

**C'est automatique !** Rien à faire de votre côté.

1. Un client remplit le formulaire sur le site
2. Le formulaire est envoyé à Supabase ✅
3. **Email envoyé automatiquement à contact@poncages.fr** 📧
4. Client redirigé vers la page de remerciement ✅

## 🔍 Vérifier les envois

Vous pouvez vérifier les logs des emails dans Supabase:

```sql
-- Voir tous les emails envoyés
SELECT * FROM email_notifications_log
ORDER BY created_at DESC;

-- Voir les emails en échec
SELECT * FROM email_notifications_log
WHERE status = 'failed'
ORDER BY created_at DESC;
```

## ⚙️ Configuration requise

### Variables d'environnement Supabase
Ces variables sont **déjà configurées automatiquement**:

- ✅ `RESEND_API_KEY` - Clé API Resend (service d'envoi d'email)
- ✅ `SUPABASE_URL` - URL de votre projet Supabase
- ✅ `SUPABASE_ANON_KEY` - Clé publique Supabase

### Service d'envoi: Resend
Nous utilisons **Resend** comme service d'envoi d'email car:
- ✅ Fiable et rapide
- ✅ Excellente délivrabilité
- ✅ Gratuit jusqu'à 3000 emails/mois
- ✅ Facile à configurer avec Supabase

**Important:** Vérifiez que votre domaine est configuré dans Resend pour éviter que les emails finissent en spam.

## 📊 Statistiques

Chaque email envoyé est logé dans la base de données:

| Champ | Description |
|-------|-------------|
| `id` | ID unique de l'envoi |
| `form_submission_id` | Lien vers la soumission |
| `status` | pending / sent / failed |
| `error_message` | Message d'erreur si échec |
| `sent_at` | Date d'envoi |
| `created_at` | Date de création du log |

## 🔒 Sécurité

- ✅ Les clés API ne sont jamais exposées au frontend
- ✅ L'Edge Function est protégée par Supabase
- ✅ Pas de données sensibles dans les logs
- ✅ CORS correctement configuré

## 🆘 Dépannage

### Les emails n'arrivent pas?

1. **Vérifier le spam**: Les premiers emails peuvent arriver en spam
2. **Vérifier Resend**: Connectez-vous à votre dashboard Resend
3. **Vérifier les logs**:
   ```sql
   SELECT * FROM email_notifications_log WHERE status = 'failed';
   ```
4. **Tester manuellement**:
   - Remplir un formulaire sur le site
   - Vérifier dans 2-3 minutes si l'email arrive

### Tester l'envoi d'email

Pour tester sans passer par le formulaire:

```bash
# Depuis votre terminal
curl -X POST \
  'https://[VOTRE_URL_SUPABASE]/functions/v1/send-form-notification' \
  -H 'Authorization: Bearer [VOTRE_ANON_KEY]' \
  -H 'Content-Type: application/json' \
  -d '{
    "full_name": "Test Client",
    "email": "test@example.com",
    "phone": "0612345678",
    "postal_code": "68420",
    "surface": 50,
    "property_type": "maison",
    "finition": "poncageVitrification",
    "message": "Ceci est un test"
  }'
```

## 📝 Notes importantes

1. **Délai d'envoi**: Les emails sont envoyés en 1-2 secondes
2. **Répondre au client**: Cliquez sur "Répondre" dans votre email pour répondre directement au client
3. **Archivage**: Tous les emails sont également sauvegardés dans Google Sheets (backup)
4. **Limite**: Resend gratuit = 3000 emails/mois (largement suffisant)

## 🎉 C'est tout!

Le système est **complètement automatique**. Vous recevrez un email à chaque nouvelle demande de devis sur **contact@poncages.fr**.

---

**Questions ou problèmes?**
Vérifiez d'abord les logs dans Supabase ou contactez votre développeur.
