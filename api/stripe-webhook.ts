import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable: any) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(buf, sig!, webhookSecret);
    } else {
      event = JSON.parse(buf.toString());
    }
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    try {
      // Update order status in database
      const { data: order, error: updateError } = await supabase
        .from('orders')
        .update({
          payment_status: 'paid',
          order_status: 'confirmed',
          stripe_payment_intent: session.payment_intent,
        })
        .eq('stripe_session_id', session.id)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating order:', updateError);
      }

      // Get order items
      const { data: orderItems } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', order?.id);

      // Send confirmation emails
      const metadata = session.metadata || {};
      const customerEmail = session.customer_email || metadata.customer_email;
      const customerName = metadata.customer_name || 'Client';

      // Email to admin
      await resend.emails.send({
        from: 'Pallmann Store <noreply@ponceur-parquet.fr>',
        to: ['j.dietemann@renoline.fr'],
        subject: `🛒 Nouvelle commande #${order?.id?.substring(0, 8)} - ${(session.amount_total! / 100).toFixed(2)}€`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #FF6600, #ff8c40); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .field { margin-bottom: 15px; padding: 15px; background: white; border-radius: 8px; }
              .field-label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; margin-bottom: 5px; }
              .field-value { color: #333; font-size: 16px; }
              .total { background: #FF6600; color: white; padding: 20px; border-radius: 8px; text-align: center; font-size: 24px; font-weight: bold; }
              table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
              th { background: #f5f5f5; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">🛒 Nouvelle commande !</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Commande #${order?.id?.substring(0, 8)}</p>
              </div>
              <div class="content">
                <div class="total">${(session.amount_total! / 100).toFixed(2)}€ TTC</div>
                
                <div class="field">
                  <div class="field-label">Client</div>
                  <div class="field-value">${customerName}</div>
                </div>
                <div class="field">
                  <div class="field-label">Email</div>
                  <div class="field-value"><a href="mailto:${customerEmail}">${customerEmail}</a></div>
                </div>
                ${metadata.customer_phone ? `
                <div class="field">
                  <div class="field-label">Téléphone</div>
                  <div class="field-value">${metadata.customer_phone}</div>
                </div>
                ` : ''}
                <div class="field">
                  <div class="field-label">Adresse de livraison</div>
                  <div class="field-value">
                    ${metadata.shipping_address || ''}<br>
                    ${metadata.shipping_postal_code || ''} ${metadata.shipping_city || ''}
                  </div>
                </div>
                ${metadata.company_code ? `
                <div class="field">
                  <div class="field-label">Code PRO utilisé</div>
                  <div class="field-value">${metadata.company_code}</div>
                </div>
                ` : ''}
                
                <h3>Détail de la commande</h3>
                <table>
                  <tr>
                    <th>Produit</th>
                    <th>Qté</th>
                    <th>Prix HT</th>
                  </tr>
                  ${orderItems?.map(item => `
                  <tr>
                    <td>${item.product_name}</td>
                    <td>${item.quantity}</td>
                    <td>${item.total_ht?.toFixed(2)}€</td>
                  </tr>
                  `).join('') || ''}
                </table>
                
                <div class="field">
                  <div class="field-label">Récapitulatif</div>
                  <div class="field-value">
                    Sous-total HT: ${metadata.subtotal_ht}€<br>
                    ${metadata.discount_amount && parseFloat(metadata.discount_amount) > 0 ? `Remise: -${metadata.discount_amount}€<br>` : ''}
                    Livraison HT: ${metadata.shipping_ht === '0' ? 'Offerte' : metadata.shipping_ht + '€'}<br>
                    <strong>Total HT: ${metadata.total_ht}€</strong><br>
                    <strong>Total TTC: ${metadata.total_ttc}€</strong>
                  </div>
                </div>
              </div>
            </div>
          </body>
          </html>
        `,
      });

      // Email to customer
      if (customerEmail) {
        await resend.emails.send({
          from: 'Pallmann Store <noreply@ponceur-parquet.fr>',
          to: [customerEmail],
          subject: `✅ Confirmation de commande #${order?.id?.substring(0, 8)} - Pallmann Store`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #FF6600, #ff8c40); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .highlight { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FF6600; }
                .total { background: #FF6600; color: white; padding: 15px; border-radius: 8px; text-align: center; font-size: 20px; font-weight: bold; margin: 20px 0; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
                th { background: #f5f5f5; font-weight: bold; }
                .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1 style="margin: 0;">✅ Commande confirmée !</h1>
                  <p style="margin: 10px 0 0 0; opacity: 0.9;">Merci pour votre achat</p>
                </div>
                <div class="content">
                  <p>Bonjour <strong>${customerName}</strong>,</p>
                  
                  <p>Votre commande <strong>#${order?.id?.substring(0, 8)}</strong> a bien été confirmée et est en cours de préparation.</p>
                  
                  <div class="total">Total: ${(session.amount_total! / 100).toFixed(2)}€ TTC</div>
                  
                  <h3>Récapitulatif de votre commande</h3>
                  <table>
                    <tr>
                      <th>Produit</th>
                      <th>Qté</th>
                      <th>Prix HT</th>
                    </tr>
                    ${orderItems?.map(item => `
                    <tr>
                      <td>${item.product_name}</td>
                      <td>${item.quantity}</td>
                      <td>${item.total_ht?.toFixed(2)}€</td>
                    </tr>
                    `).join('') || ''}
                  </table>
                  
                  <div class="highlight">
                    <p style="margin: 0;"><strong>Adresse de livraison</strong></p>
                    <p style="margin: 10px 0 0 0;">
                      ${metadata.shipping_address || ''}<br>
                      ${metadata.shipping_postal_code || ''} ${metadata.shipping_city || ''}
                    </p>
                  </div>
                  
                  <div class="highlight">
                    <p style="margin: 0;"><strong>Délai de livraison</strong></p>
                    <p style="margin: 10px 0 0 0;">Votre commande sera expédiée sous 24-48h ouvrées. Vous recevrez un email avec le numéro de suivi dès l'expédition.</p>
                  </div>
                  
                  <p>Une question ? Contactez-nous à <a href="mailto:contact@pallmann-store.com" style="color: #FF6600;">contact@pallmann-store.com</a></p>
                  
                  <p>Merci pour votre confiance,<br><strong>L'équipe Pallmann Store</strong></p>
                </div>
                <div class="footer">
                  <p>Pallmann Store - Groupe Epenon SARL</p>
                  <p>6 rue du Commerce, 68420 Herrlisheim près Colmar</p>
                </div>
              </div>
            </body>
            </html>
          `,
        });
      }

      console.log('Order confirmation emails sent for order:', order?.id);
    } catch (err: any) {
      console.error('Error processing checkout.session.completed:', err);
    }
  }

  res.status(200).json({ received: true });
}
