import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Using service role key:', !!process.env.VITE_SUPABASE_SERVICE_ROLE_KEY);

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const newContent = readFileSync(join(__dirname, 'new_article_content.txt'), 'utf-8');
console.log('Content length:', newContent.length, 'characters');

<div class="profile-selector" style="background: linear-gradient(135deg, #f6f8fb 0%, #e9ecf0 100%); padding: 2.5rem; border-radius: 16px; margin: 2rem 0; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
  <h2 style="font-size: 1.8rem; margin-bottom: 1.5rem; color: #1a202c;">👋 Vous êtes...</h2>
  <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; max-width: 800px; margin: 0 auto;">
    <a href="#proprietaire" style="flex: 1; min-width: 200px; background: #2563eb; color: white; padding: 1rem 1.5rem; border-radius: 12px; text-decoration: none; font-weight: 600; transition: all 0.3s; box-shadow: 0 2px 4px rgba(37,99,235,0.3);" onmouseover="this.style.background='#1d4ed8'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='#2563eb'; this.style.transform='translateY(0)'">🏠 Propriétaire bailleur</a>
    <a href="#locataire" style="flex: 1; min-width: 200px; background: #059669; color: white; padding: 1rem 1.5rem; border-radius: 12px; text-decoration: none; font-weight: 600; transition: all 0.3s; box-shadow: 0 2px 4px rgba(5,150,105,0.3);" onmouseover="this.style.background='#047857'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='#059669'; this.style.transform='translateY(0)'">🔑 Locataire</a>
    <a href="#agence" style="flex: 1; min-width: 200px; background: #dc2626; color: white; padding: 1rem 1.5rem; border-radius: 12px; text-decoration: none; font-weight: 600; transition: all 0.3s; box-shadow: 0 2px 4px rgba(220,38,38,0.3);" onmouseover="this.style.background='#b91c1c'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='#dc2626'; this.style.transform='translateY(0)'">🏢 Agence immobilière</a>
  </div>
</div>

---

<section id="proprietaire" style="scroll-margin-top: 100px; background: #eff6ff; padding: 2.5rem; border-radius: 16px; margin: 3rem 0; border-left: 6px solid #2563eb;">

## 🏠 Propriétaire bailleur : Comment récupérer les frais de rénovation ?

### Vos droits et recours face à un parquet abîmé

En tant que propriétaire, vous êtes en droit d'exiger que votre locataire vous restitue le logement dans l'état où il l'a reçu, **usure normale exceptée**. Un parquet abîmé par négligence ou mauvais usage peut justifier une retenue sur le dépôt de garantie.

#### 🎯 Différencier usure normale et dégradation anormale

**Usure normale (à votre charge) :**
- Micro-rayures superficielles dues au passage quotidien
- Léger ternissement du vernis après plusieurs années
- Petites marques de frottement dans les zones de circulation

**Dégradations anormales (à la charge du locataire) :**
- Rayures profondes causées par des meubles déplacés sans protection
- Taches incrustées (vin, graisse, brûlures de cigarettes)
- Lames gondolées par infiltration d'eau non signalée
- Arrachements ou trous
- Usure excessive par rapport à la durée d'occupation

### 📋 Les étapes pour faire valoir vos droits

**1. L'état des lieux de sortie : votre meilleur allié**

Comparez systématiquement avec l'état des lieux d'entrée :
- Photographiez chaque zone endommagée
- Notez précisément la nature et l'étendue des dégâts
- Faites constater les dégradations par le locataire ou un huissier si nécessaire

**2. Obtenez des devis professionnels**

Un devis détaillé d'artisan qualifié renforce votre position :
- Précise la nature des travaux nécessaires
- Chiffre le coût de remise en état
- Permet d'établir la vétusté (réduction proportionnelle selon l'âge du parquet)

**3. Retenez les frais sur le dépôt de garantie**

Vous disposez d'**1 mois maximum** (ou 2 mois si meublé) pour restituer le dépôt de garantie, déduction faite des réparations justifiées.

**4. En cas de conflit : médiation ou tribunal**

Si le montant dépasse le dépôt de garantie ou en cas de désaccord :
- Commission départementale de conciliation (gratuit)
- Tribunal judiciaire pour les sommes importantes

### 💰 Grille tarifaire rénovation parquet (valable en 2024)

<div class="pp-prices-block">
  <table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
    <thead>
      <tr style="background: #2563eb; color: white;">
        <th style="padding: 1rem; text-align: left; border: 1px solid #ddd;">Prestation</th>
        <th style="padding: 1rem; text-align: right; border: 1px solid #ddd;">Prix au m²</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background: white;">
        <td style="padding: 0.8rem; border: 1px solid #ddd;">Ponçage parquet (3 passes)</td>
        <td style="padding: 0.8rem; text-align: right; border: 1px solid #ddd; font-weight: 600;">22 à 32 €/m²</td>
      </tr>
      <tr style="background: #f8fafc;">
        <td style="padding: 0.8rem; border: 1px solid #ddd;">Ponçage + vitrification 3 couches</td>
        <td style="padding: 0.8rem; text-align: right; border: 1px solid #ddd; font-weight: 600;">32 à 45 €/m²</td>
      </tr>
      <tr style="background: white;">
        <td style="padding: 0.8rem; border: 1px solid #ddd;">Huilage parquet naturel</td>
        <td style="padding: 0.8rem; text-align: right; border: 1px solid #ddd; font-weight: 600;">38 à 49 €/m²</td>
      </tr>
      <tr style="background: #f8fafc;">
        <td style="padding: 0.8rem; border: 1px solid #ddd;">Réparation de lames / seuils</td>
        <td style="padding: 0.8rem; text-align: right; border: 1px solid #ddd; font-weight: 600;">Sur devis</td>
      </tr>
      <tr style="background: white;">
        <td style="padding: 0.8rem; border: 1px solid #ddd;">Remplacement partiel de lames</td>
        <td style="padding: 0.8rem; text-align: right; border: 1px solid #ddd; font-weight: 600;">60 à 100 €/m²</td>
      </tr>
    </tbody>
  </table>
  <p style="font-size: 0.9rem; color: #64748b; margin-top: 1rem;">⚠️ Ces tarifs sont indicatifs et peuvent varier selon l'essence du bois, l'état du parquet et la surface totale. Application de la vétusté selon la loi.</p>
</div>

<div class="cta-box" style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 16px; margin: 2rem 0; text-align: center; box-shadow: 0 8px 16px rgba(37,99,235,0.3);">
  <h3 style="font-size: 1.6rem; margin-bottom: 1rem; color: white;">📄 Guide gratuit propriétaire</h3>
  <p style="font-size: 1.1rem; margin-bottom: 1.5rem; opacity: 0.95;">« 5 étapes pour récupérer les frais de rénovation sur la caution »</p>
  <p style="margin-bottom: 1.5rem; opacity: 0.9;">✅ Modèles de courriers • ✅ Calcul de vétusté • ✅ Jurisprudence clé</p>
  <a href="tel:+33757821306" style="display: inline-block; background: white; color: #2563eb; padding: 1rem 2.5rem; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 1.1rem; box-shadow: 0 4px 8px rgba(0,0,0,0.1); transition: all 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">📞 Obtenir un devis gratuit</a>
  <p style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.8;">☎️ 07 57 82 13 06 • Intervention sous 48h en Alsace</p>
</div>

### 🔧 Assurance et parquet : qui couvre quoi ?

**Assurance PNO (Propriétaire Non Occupant) :**
- Couvre les vices cachés et dommages structurels
- Ne couvre PAS les dégradations locatives classiques

**Assurance habitation du locataire :**
- Sa responsabilité civile peut couvrir certains sinistres (dégât des eaux, incendie)
- Ne couvre PAS l'usure anormale ou la négligence

</section>

---

<section id="locataire" style="scroll-margin-top: 100px; background: #f0fdf4; padding: 2.5rem; border-radius: 16px; margin: 3rem 0; border-left: 6px solid #059669;">

## 🔑 Locataire : Réparez avant l'état des lieux et évitez la retenue

### Vous rendez votre logement et le parquet est abîmé ?

**Bonne nouvelle :** Dans la plupart des cas, une rénovation partielle suffit. Agir avant l'état des lieux de sortie vous permet de :

✅ **Éviter une retenue sur caution** (souvent forfaitaire et surévaluée)
✅ **Choisir votre artisan** et maîtriser le coût
✅ **Partir serein** sans contentieux avec le propriétaire

### 🚀 Solutions express pour locataires

#### Option 1 : Ponçage localisé + retouche

**Idéal pour :**
- Rayures sur une zone précise (entrée, salon)
- Taches superficielles
- Parquet terni par endroits

**Délai :** 1 à 2 jours • **Tarif :** à partir de 180€ (forfait 10m²)

#### Option 2 : Ponçage complet + vitrification

**Recommandé si :**
- Rayures généralisées dans plusieurs pièces
- Parquet très terni ou taché
- Vous voulez repartir sur une base neuve

**Délai :** 2 à 3 jours • **Tarif :** 32-45€/m² (voir grille tarifaire)

#### Option 3 : Remplacement de lames

**Nécessaire si :**
- Lames gondolées, fendues ou arrachées
- Trous ou brûlures profondes
- Parquet contrecollé trop fin pour être poncé

**Délai :** 1 jour à 1 semaine selon disponibilité bois • **Tarif :** sur devis

### 📸 Service express : Photo → Devis en 2h

Plus besoin de RDV pour une première estimation ! Voici comment ça marche :

**1.** Prenez 3-4 photos de votre parquet (vue d'ensemble + gros plans des zones abîmées)
**2.** Envoyez-les par WhatsApp au **07 57 82 13 06**
**3.** Précisez la surface et votre ville
**4.** Recevez votre estimation tarifaire dans les **2 heures** (jours ouvrés)

<div class="cta-box" style="background: linear-gradient(135deg, #059669 0%, #047857 100%); color: white; padding: 2rem; border-radius: 16px; margin: 2rem 0; text-align: center; box-shadow: 0 8px 16px rgba(5,150,105,0.3);">
  <h3 style="font-size: 1.6rem; margin-bottom: 1rem; color: white;">📸 Estimation gratuite en 2h</h3>
  <p style="font-size: 1.1rem; margin-bottom: 1.5rem; opacity: 0.95;">Prenez une photo → Recevez votre devis par WhatsApp</p>
  <p style="margin-bottom: 1.5rem; opacity: 0.9;">✅ Sans engagement • ✅ Réponse rapide • ✅ Intervention possible sous 48h</p>
  <a href="https://wa.me/33757821306?text=Bonjour,%20je%20souhaite%20une%20estimation%20pour%20r%C3%A9parer%20mon%20parquet%20avant%20l%27%C3%A9tat%20des%20lieux" style="display: inline-block; background: #25D366; color: white; padding: 1rem 2.5rem; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 1.1rem; box-shadow: 0 4px 8px rgba(0,0,0,0.2); transition: all 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">📲 Envoyer mes photos sur WhatsApp</a>
  <p style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.8;">Ou appelez directement : ☎️ 07 57 82 13 06</p>
</div>

### 🎓 Cas pratiques : locataires ayant évité la retenue

**Témoignage 1 : Laura, Strasbourg**
*« J'ai rayé le parquet du salon en déplaçant mon canapé. J'ai envoyé une photo, reçu un devis de 280€ pour un ponçage localisé + vitrification. Le proprio a validé l'état des lieux sans retenue ! »*

**Témoignage 2 : Mehdi, Colmar**
*« État des lieux dans 10 jours, parquet taché dans la cuisine. Intervention express en 2 jours, j'ai récupéré l'intégralité de ma caution (900€). Meilleur investissement ! »*

### ⚖️ Vos droits en tant que locataire

- Vous n'êtes PAS responsable de l'usure normale
- La vétusté doit être appliquée sur les travaux (réduction selon l'ancienneté)
- Le propriétaire doit PROUVER les dégradations (photos, devis contradictoires)
- En cas de désaccord, la commission de conciliation est gratuite

</section>

---

<section id="agence" style="scroll-margin-top: 100px; background: #fef2f2; padding: 2.5rem; border-radius: 16px; margin: 3rem 0; border-left: 6px solid #dc2626;">

## 🏢 Agences immobilières : Offre dédiée aux professionnels

### Gérez plusieurs biens locatifs ? Optimisez vos coûts de rénovation

En tant qu'agence immobilière ou gestionnaire de parc locatif, vous êtes confrontés régulièrement à des parquets abîmés entre deux locataires. **Les Ponceurs Réunis** vous proposent une offre sur-mesure.

### 💼 Nos services pour les professionnels de l'immobilier

✅ **Interlocuteur dédié** : un seul contact pour tous vos biens
✅ **Devis sous 24h** : réactivité garantie pour vos rotations locatives
✅ **Planning prioritaire** : interventions planifiées selon vos états des lieux
✅ **Facturation groupée** : une seule facture mensuelle pour tous vos chantiers
✅ **Reporting photo** : avant/après systématique pour vos dossiers

### 💰 Tarifs dégressifs volume

<div style="background: white; padding: 1.5rem; border-radius: 12px; margin: 1.5rem 0; border: 2px solid #dc2626;">
  <table style="width: 100%; border-collapse: collapse;">
    <thead>
      <tr style="background: #dc2626; color: white;">
        <th style="padding: 1rem; text-align: left; border: 1px solid #ddd;">Volume annuel</th>
        <th style="padding: 1rem; text-align: center; border: 1px solid #ddd;">Remise</th>
        <th style="padding: 1rem; text-align: right; border: 1px solid #ddd;">Tarif ponçage + vitrif.</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background: #fef2f2;">
        <td style="padding: 0.8rem; border: 1px solid #ddd;">5 à 10 chantiers/an</td>
        <td style="padding: 0.8rem; text-align: center; border: 1px solid #ddd; font-weight: 600; color: #dc2626;">-10%</td>
        <td style="padding: 0.8rem; text-align: right; border: 1px solid #ddd; font-weight: 600;">29-40 €/m²</td>
      </tr>
      <tr style="background: white;">
        <td style="padding: 0.8rem; border: 1px solid #ddd;">11 à 20 chantiers/an</td>
        <td style="padding: 0.8rem; text-align: center; border: 1px solid #ddd; font-weight: 600; color: #dc2626;">-15%</td>
        <td style="padding: 0.8rem; text-align: right; border: 1px solid #ddd; font-weight: 600;">27-38 €/m²</td>
      </tr>
      <tr style="background: #fef2f2;">
        <td style="padding: 0.8rem; border: 1px solid #ddd;">+ de 20 chantiers/an</td>
        <td style="padding: 0.8rem; text-align: center; border: 1px solid #ddd; font-weight: 600; color: #dc2626;">-20%</td>
        <td style="padding: 0.8rem; text-align: right; border: 1px solid #ddd; font-weight: 600;">26-36 €/m²</td>
      </tr>
    </tbody>
  </table>
</div>

### 📊 Pourquoi les agences nous font confiance

**🏆 Expertise technique**
15 ans d'expérience sur tous types de parquets (massif, contrecollé, ancien, moderne)

**⚡ Réactivité**
Nous comprenons vos impératifs de rotation locative. Intervention possible sous 48h.

**📝 Documentation complète**
Photos avant/après, rapports d'intervention, devis conformes pour vos dossiers sinistres

**🤝 Partenariat durable**
Contrats annuels avec tarifs garantis et planning prévisionnel

<div class="cta-box" style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 16px; margin: 2rem 0; text-align: center; box-shadow: 0 8px 16px rgba(220,38,38,0.3);">
  <h3 style="font-size: 1.6rem; margin-bottom: 1rem; color: white;">💼 Devis groupé pour professionnels</h3>
  <p style="font-size: 1.1rem; margin-bottom: 1.5rem; opacity: 0.95;">Bénéficiez de -15% dès 5 logements</p>
  <p style="margin-bottom: 1.5rem; opacity: 0.9;">✅ Facturation mensuelle • ✅ Interlocuteur dédié • ✅ Priorité planning</p>
  <a href="tel:+33757821306" style="display: inline-block; background: white; color: #dc2626; padding: 1rem 2.5rem; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 1.1rem; box-shadow: 0 4px 8px rgba(0,0,0,0.1); transition: all 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">📞 Demander un devis groupé</a>
  <p style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.8;">☎️ 07 57 82 13 06 • contact@les-ponceurs-reunis.fr</p>
</div>

### 🎯 Nos références professionnelles

Nous travaillons actuellement avec :
- Agences immobilières du Bas-Rhin et Haut-Rhin
- Bailleurs sociaux et institutionnels
- Gestionnaires de résidences étudiantes
- Syndics de copropriété

*Références disponibles sur demande*

</section>

---

## 📚 Pour aller plus loin : Guide complet

### Le parquet : un revêtement noble mais sensible

Le parquet en bois (massif, contrecollé ou ancien) reste très prisé pour son cachet et son confort. Mais c'est aussi un matériau vivant, sensible aux chocs, frottements, humidité et à l'usure quotidienne.

### Le cas particulier du parquet ancien

Un parquet ancien (pose clouée, chêne massif, point de Hongrie, Versailles...) nécessite un traitement adapté. Toute tentative de réparation « low-cost » peut aggraver les dégâts et dévaloriser le bien.

**Essences les plus courantes et leur fragilité :**

- **Chêne** : robuste mais marque en profondeur
- **Hêtre** : dur mais sensible à l'humidité
- **Pin** : tendre, fragile aux chocs et talons
- **Pitchpin** : typique des années 40, demande une expertise spécifique

---

## 🏆 Les Ponceurs Réunis : votre expert parquet en Alsace

### Pourquoi nous choisir ?

✅ **15 ans d'expérience** en rénovation de parquets
✅ **Matériel professionnel Pallmann** (leader mondial)
✅ **Devis gratuit sous 24h** avec visite technique
✅ **Intervention Alsace** : Strasbourg, Colmar, Mulhouse, Haguenau, Sélestat, Saverne...
✅ **Garantie satisfaction** : finition soignée et durable

### Nos prestations complètes

- Diagnostic état des lieux
- Ponçage professionnel (parquet, escalier)
- Vitrification (mate, satinée, brillante)
- Huilage naturel écologique
- Réparation et remplacement de lames
- Restauration parquets anciens classés
- Accompagnement litiges et expertises

---

## ✅ En résumé

Un parquet abîmé par un locataire n'est **ni anodin, ni dramatique**. Avec les bons documents (états des lieux), une évaluation juste (devis professionnel) et un artisan qualifié, il est possible de :

✔️ **Pour les propriétaires** : Récupérer les frais de rénovation sur la caution
✔️ **Pour les locataires** : Réparer à moindre coût avant l'état des lieux
✔️ **Pour les agences** : Optimiser les coûts avec des tarifs groupés

---

<div style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); color: white; padding: 3rem 2rem; border-radius: 16px; text-align: center; margin: 3rem 0 2rem 0; box-shadow: 0 10px 25px rgba(14,165,233,0.3);">
  <h2 style="font-size: 2rem; margin-bottom: 1rem; color: white;">💬 Besoin d'un devis pour votre parquet ?</h2>
  <p style="font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.95;">Estimation gratuite • Intervention rapide • Devis sous 24h</p>
  <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; max-width: 600px; margin: 0 auto;">
    <a href="tel:+33757821306" style="flex: 1; min-width: 200px; background: white; color: #0284c7; padding: 1.2rem 2rem; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 1.1rem; box-shadow: 0 4px 8px rgba(0,0,0,0.15); transition: all 0.3s;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 12px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 8px rgba(0,0,0,0.15)'">📞 07 57 82 13 06</a>
    <a href="https://wa.me/33757821306" style="flex: 1; min-width: 200px; background: #25D366; color: white; padding: 1.2rem 2rem; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 1.1rem; box-shadow: 0 4px 8px rgba(0,0,0,0.15); transition: all 0.3s;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 12px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 8px rgba(0,0,0,0.15)'">📲 WhatsApp</a>
  </div>
  <p style="margin-top: 1.5rem; font-size: 0.95rem; opacity: 0.9;">📍 Intervention en Alsace : Strasbourg, Colmar, Mulhouse, Haguenau, Sélestat, Saverne...</p>
</div>`;

async function updateArticle() {
  try {
    console.log('Updating article...');

    const { data, error } = await supabase
      .from('articles')
      .update({
        content: newContent,
        updated_at: new Date().toISOString()
      })
      .eq('id', '704a1de1-f384-497c-b797-b6dc9a5766b8')
      .select();

    if (error) {
      console.error('Error updating article:', error);
      process.exit(1);
    }

    console.log('Article updated successfully!');
    console.log('Updated rows:', data?.length || 0);

    if (data && data.length > 0) {
      console.log('Article title:', data[0].title);
      console.log('Content length:', newContent.length, 'characters');
    }

  } catch (err) {
    console.error('Unexpected error:', err);
    process.exit(1);
  }
}

updateArticle();
