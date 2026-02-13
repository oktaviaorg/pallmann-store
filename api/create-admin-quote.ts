import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { items, customerInfo, discountPercent, subtotalHT, discountAmount, totalHT, totalTTC } = req.body;

    // Créer ou récupérer le client Stripe
    let customer;
    const existingCustomers = await stripe.customers.list({
      email: customerInfo.email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        email: customerInfo.email,
        name: customerInfo.name,
        phone: customerInfo.phone || undefined,
      });
    }

    // Créer les line items pour Stripe
    const lineItems = items.map((item: any) => {
      let unitPrice = item.price_ht;
      
      // Appliquer la remise
      if (discountPercent > 0) {
        unitPrice = unitPrice * (1 - discountPercent / 100);
      }
      
      // Prix TTC en centimes
      const unitPriceTTC = Math.round(unitPrice * 1.20 * 100);
      
      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            description: `Réf: ${item.ref}`,
          },
          unit_amount: unitPriceTTC,
        },
        quantity: item.quantity,
      };
    });

    // Créer un Payment Link Stripe
    const paymentLink = await stripe.paymentLinks.create({
      line_items: lineItems,
      after_completion: {
        type: 'redirect',
        redirect: {
          url: `${process.env.SITE_URL || 'https://www.pallmann-store.com'}/checkout/success?source=quote`,
        },
      },
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: `Devis Pallmann Store pour ${customerInfo.name}`,
          footer: 'Pallmann Store - Groupe Epenon SARL - SIRET 832 059 513 00016 - TVA FR48832059513',
          metadata: {
            customer_name: customerInfo.name,
            customer_phone: customerInfo.phone || '',
          },
        },
      },
      metadata: {
        customer_email: customerInfo.email,
        customer_name: customerInfo.name,
        discount_percent: discountPercent.toString(),
        source: 'admin_quote',
      },
    });

    // Générer le HTML du devis pour l'email
    const itemsHtml = items.map((item: any) => {
      const itemTotal = item.price_ht * item.quantity * (1 - discountPercent / 100);
      return `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #eee;">${item.name}<br><small style="color: #888;">Réf: ${item.ref}</small></td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">${item.price_ht.toFixed(2)}€</td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">${itemTotal.toFixed(2)}€</td>
        </tr>
      `;
    }).join('');

    // Envoyer l'email au client
    await resend.emails.send({
      from: 'Pallmann Store <onboarding@resend.dev>',
      to: [customerInfo.email],
      subject: `📋 Votre devis Pallmann Store - ${totalTTC.toFixed(2)}€`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #FF6600, #ff8c40); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; background: #f9f9f9; }
            .quote-box { background: white; border-radius: 10px; padding: 20px; margin: 20px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            table { width: 100%; border-collapse: collapse; }
            th { background: #f5f5f5; padding: 12px; text-align: left; font-weight: bold; }
            .total-row { background: #FF6600; color: white; font-size: 18px; }
            .total-row td { padding: 15px; }
            .cta-button { display: inline-block; background: #FF6600; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #888; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">📋 Votre Devis</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Pallmann Store</p>
            </div>
            <div class="content">
              <p>Bonjour <strong>${customerInfo.name}</strong>,</p>
              <p>Suite à notre échange, veuillez trouver ci-dessous votre devis personnalisé :</p>
              
              <div class="quote-box">
                <table>
                  <tr>
                    <th>Produit</th>
                    <th style="text-align: center;">Qté</th>
                    <th style="text-align: right;">Prix unit. HT</th>
                    <th style="text-align: right;">Total HT</th>
                  </tr>
                  ${itemsHtml}
                  ${discountPercent > 0 ? `
                  <tr>
                    <td colspan="3" style="padding: 12px; text-align: right; color: #16a34a;"><strong>Remise ${discountPercent}%</strong></td>
                    <td style="padding: 12px; text-align: right; color: #16a34a;"><strong>-${discountAmount.toFixed(2)}€</strong></td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td colspan="3" style="padding: 12px; text-align: right;"><strong>Total HT</strong></td>
                    <td style="padding: 12px; text-align: right;"><strong>${totalHT.toFixed(2)}€</strong></td>
                  </tr>
                  <tr>
                    <td colspan="3" style="padding: 12px; text-align: right;">TVA (20%)</td>
                    <td style="padding: 12px; text-align: right;">${(totalTTC - totalHT).toFixed(2)}€</td>
                  </tr>
                  <tr class="total-row">
                    <td colspan="3" style="text-align: right;"><strong>TOTAL TTC</strong></td>
                    <td style="text-align: right;"><strong>${totalTTC.toFixed(2)}€</strong></td>
                  </tr>
                </table>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <p style="margin-bottom: 20px;"><strong>Pour valider votre commande, cliquez sur le bouton ci-dessous :</strong></p>
                <a href="${paymentLink.url}" class="cta-button">💳 Payer ${totalTTC.toFixed(2)}€</a>
              </div>
              
              <p style="color: #666; font-size: 14px;">
                Ce devis est valable 30 jours. Paiement sécurisé par Stripe.<br>
                Une facture vous sera envoyée automatiquement après paiement.
              </p>
              
              <p>Une question ? Répondez à cet email ou appelez-nous au <strong>06 04 44 09 03</strong>.</p>
              
              <p>Cordialement,<br><strong>L'équipe Pallmann Store</strong></p>
            </div>
            <div class="footer">
              <p>Pallmann Store - Groupe Epenon SARL<br>
              6 rue du Commerce, 68420 Herrlisheim près Colmar<br>
              SIRET 832 059 513 00016 - TVA FR48832059513</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Envoyer une copie à l'admin
    await resend.emails.send({
      from: 'Pallmann Store <onboarding@resend.dev>',
      to: ['j.dietemann@renoline.fr'],
      subject: `📋 [COPIE] Devis envoyé à ${customerInfo.name} - ${totalTTC.toFixed(2)}€`,
      html: `
        <h2>Devis envoyé</h2>
        <p><strong>Client:</strong> ${customerInfo.name}</p>
        <p><strong>Email:</strong> ${customerInfo.email}</p>
        <p><strong>Téléphone:</strong> ${customerInfo.phone || 'Non renseigné'}</p>
        <p><strong>Montant TTC:</strong> ${totalTTC.toFixed(2)}€</p>
        ${discountPercent > 0 ? `<p><strong>Remise appliquée:</strong> ${discountPercent}%</p>` : ''}
        <p><strong>Lien de paiement:</strong> <a href="${paymentLink.url}">${paymentLink.url}</a></p>
        ${customerInfo.notes ? `<p><strong>Notes:</strong> ${customerInfo.notes}</p>` : ''}
      `,
    });

    res.status(200).json({ 
      success: true, 
      paymentUrl: paymentLink.url,
      paymentLinkId: paymentLink.id,
    });

  } catch (err: any) {
    console.error('Error creating admin quote:', err);
    res.status(500).json({ error: err.message });
  }
}
