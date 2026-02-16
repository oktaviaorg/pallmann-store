import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { jsPDF } from 'jspdf';

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

// Génération du PDF Bon de Commande pour Pallmann
function generateBCPdf(order: {
  orderNumber: string;
  date: string;
  customerName: string;
  customerPhone?: string;
  shippingAddress: string;
  shippingPostalCode: string;
  shippingCity: string;
  items: Array<{ ref: string; name: string; quantity: number }>;
}): string {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = margin;

  // EN-TÊTE
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('BON DE COMMANDE', pageWidth / 2, y, { align: 'center' });
  y += 6;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('PALLMANN STORE - Revendeur agréé France', pageWidth / 2, y, { align: 'center' });
  y += 10;
  doc.setDrawColor(0);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // INFOS COMMANDE
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`Commande : ${order.orderNumber}`, margin, y);
  doc.text(`Date : ${order.date}`, pageWidth - margin, y, { align: 'right' });
  y += 12;

  // ADRESSE LIVRAISON
  doc.setFillColor(245, 245, 245);
  doc.rect(margin, y - 4, pageWidth - margin * 2, 38, 'F');
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('LIVRER À :', margin + 5, y + 2);
  y += 10;
  doc.setFontSize(12);
  doc.text(order.customerName.toUpperCase(), margin + 5, y);
  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.text(order.shippingAddress, margin + 5, y);
  y += 6;
  doc.setFont('helvetica', 'bold');
  doc.text(`${order.shippingPostalCode} ${order.shippingCity.toUpperCase()}`, margin + 5, y);
  y += 6;
  doc.text('FRANCE', margin + 5, y);
  if (order.customerPhone) {
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.text(`Tél: ${order.customerPhone}`, margin + 5, y);
  }
  y += 18;

  // TABLEAU ARTICLES
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('ARTICLES', margin, y);
  y += 6;

  // En-tête tableau
  doc.setFillColor(40, 40, 40);
  doc.rect(margin, y - 3, pageWidth - margin * 2, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text('RÉF.', margin + 3, y + 2);
  doc.text('DÉSIGNATION', margin + 30, y + 2);
  doc.text('QTÉ', pageWidth - margin - 12, y + 2);
  y += 8;
  doc.setTextColor(0, 0, 0);

  // Lignes articles
  order.items.forEach((item, i) => {
    if (i % 2 === 0) {
      doc.setFillColor(250, 250, 250);
      doc.rect(margin, y - 3, pageWidth - margin * 2, 8, 'F');
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(item.ref || '-', margin + 3, y + 2);
    doc.setFont('helvetica', 'normal');
    doc.text(item.name.substring(0, 45), margin + 30, y + 2);
    doc.setFont('helvetica', 'bold');
    doc.text(item.quantity.toString(), pageWidth - margin - 10, y + 2);
    y += 8;
  });

  y += 10;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('Merci de livrer à l\'adresse indiquée ci-dessus.', margin, y);
  y += 4;
  doc.text('Pallmann Store - contact@ponceur-parquet.fr - 07 57 82 13 06', margin, y);

  // PAGE 2 : ÉTIQUETTE
  doc.addPage();
  y = 25;
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(10);
  doc.text('Étiquette à découper et coller sur le colis', pageWidth / 2, y, { align: 'center' });
  y += 12;

  // Pointillés haut
  doc.setLineDashPattern([2, 2], 0);
  doc.line(35, y, pageWidth - 35, y);
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text('✂', 30, y + 1);
  y += 5;

  // Cadre étiquette
  doc.setLineDashPattern([], 0);
  doc.setLineWidth(0.8);
  doc.rect(35, y, pageWidth - 70, 65, 'S');

  // Contenu étiquette
  let ly = y + 12;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('DESTINATAIRE', 42, ly);
  ly += 10;
  doc.setFontSize(16);
  doc.text(order.customerName.toUpperCase(), 42, ly);
  ly += 9;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(order.shippingAddress, 42, ly);
  ly += 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(`${order.shippingPostalCode} ${order.shippingCity.toUpperCase()}`, 42, ly);
  ly += 7;
  doc.text('FRANCE', 42, ly);
  if (order.customerPhone) {
    ly += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Tel: ${order.customerPhone}`, 42, ly);
  }
  doc.setFontSize(8);
  doc.text(`#${order.orderNumber}`, pageWidth - 42, y + 60, { align: 'right' });

  y += 70;
  // Pointillés bas
  doc.setLineDashPattern([2, 2], 0);
  doc.line(35, y, pageWidth - 35, y);
  doc.text('✂', 30, y + 1);

  return doc.output('datauristring').split(',')[1]; // Base64
}

// Email admin sobre
function generateAdminEmailHtml(order: any, metadata: any, orderItems: any[], totalTtc: string) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.6;color:#374151;background:#f9fafb;margin:0;padding:0}
    .w{max-width:600px;margin:0 auto;padding:32px 16px}
    .c{background:#fff;border-radius:8px;border:1px solid #e5e7eb;overflow:hidden}
    .h{padding:24px;text-align:center;border-bottom:1px solid #e5e7eb}
    .h h1{margin:0;font-size:20px;color:#111827}
    .h p{margin:8px 0 0;color:#6b7280;font-size:14px}
    .b{padding:24px}
    .t{text-align:center;padding:20px;background:#f9fafb;border-radius:8px;margin-bottom:20px}
    .t .a{font-size:28px;font-weight:600;color:#111827}
    .s{margin-bottom:16px}
    .s-t{font-size:11px;text-transform:uppercase;color:#6b7280;margin-bottom:4px}
    .s-v{font-size:14px;color:#111827}
    table{width:100%;border-collapse:collapse;font-size:13px;margin:16px 0}
    th{text-align:left;padding:10px;background:#f3f4f6;font-size:11px;text-transform:uppercase;color:#6b7280}
    td{padding:10px;border-bottom:1px solid #f3f4f6}
    .f{padding:20px;background:#f9fafb;text-align:center;font-size:12px;color:#6b7280;border-top:1px solid #e5e7eb}
  </style></head><body><div class="w"><div class="c">
    <div class="h"><h1>Nouvelle commande</h1><p>#${order?.id?.substring(0, 8)}</p></div>
    <div class="b">
      <div class="t"><div class="a">${totalTtc} €</div><div style="font-size:12px;color:#6b7280">TTC</div></div>
      <div class="s"><div class="s-t">Client</div><div class="s-v">${metadata.customer_name || 'Client'}</div></div>
      <div class="s"><div class="s-t">Email</div><div class="s-v">${metadata.customer_email || '-'}</div></div>
      ${metadata.customer_phone ? `<div class="s"><div class="s-t">Téléphone</div><div class="s-v">${metadata.customer_phone}</div></div>` : ''}
      <div class="s"><div class="s-t">Livraison</div><div class="s-v">${metadata.shipping_address || ''}<br>${metadata.shipping_postal_code || ''} ${metadata.shipping_city || ''}</div></div>
      <table><tr><th>Produit</th><th>Qté</th><th style="text-align:right">Prix HT</th></tr>
      ${orderItems?.map(i => `<tr><td>${i.product_name}</td><td>${i.quantity}</td><td style="text-align:right">${i.total_ht?.toFixed(2)}€</td></tr>`).join('') || ''}
      </table>
      <p style="font-size:13px;color:#6b7280;margin-top:20px"><strong>📎 PDF Bon de Commande joint</strong> - À transférer à Pallmann pour expédition.</p>
    </div>
    <div class="f">Pallmann Store · contact@ponceur-parquet.fr · 07 57 82 13 06</div>
  </div></div></body></html>`;
}

// Email client sobre
function generateClientEmailHtml(order: any, metadata: any, orderItems: any[], totalTtc: string) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.6;color:#374151;background:#f9fafb;margin:0;padding:0}
    .w{max-width:600px;margin:0 auto;padding:32px 16px}
    .c{background:#fff;border-radius:8px;border:1px solid #e5e7eb;overflow:hidden}
    .h{padding:24px;text-align:center;border-bottom:1px solid #e5e7eb}
    .h h1{margin:0;font-size:20px;color:#111827}
    .b{padding:24px}
    .t{text-align:center;padding:20px;background:#f9fafb;border-radius:8px;margin-bottom:20px}
    .t .a{font-size:28px;font-weight:600;color:#111827}
    table{width:100%;border-collapse:collapse;font-size:13px;margin:16px 0}
    th{text-align:left;padding:10px;background:#f3f4f6;font-size:11px;text-transform:uppercase;color:#6b7280}
    td{padding:10px;border-bottom:1px solid #f3f4f6}
    .n{background:#f3f4f6;padding:16px;border-radius:6px;margin:16px 0;font-size:13px}
    .f{padding:20px;background:#f9fafb;text-align:center;font-size:12px;color:#6b7280;border-top:1px solid #e5e7eb}
  </style></head><body><div class="w"><div class="c">
    <div class="h"><h1>Commande confirmée</h1></div>
    <div class="b">
      <p>Bonjour ${metadata.customer_name || 'Client'},</p>
      <p>Votre commande <strong>#${order?.id?.substring(0, 8)}</strong> est confirmée et en préparation.</p>
      <div class="t"><div class="a">${totalTtc} €</div><div style="font-size:12px;color:#6b7280">TTC</div></div>
      <table><tr><th>Produit</th><th>Qté</th><th style="text-align:right">Prix HT</th></tr>
      ${orderItems?.map(i => `<tr><td>${i.product_name}</td><td>${i.quantity}</td><td style="text-align:right">${i.total_ht?.toFixed(2)}€</td></tr>`).join('') || ''}
      </table>
      <div class="n"><strong>Livraison</strong><br>${metadata.shipping_address || ''}, ${metadata.shipping_postal_code || ''} ${metadata.shipping_city || ''}<br><br>Expédition sous 24-48h. Vous recevrez le suivi par email.</div>
      <p style="font-size:13px;color:#6b7280">Question ? 07 57 82 13 06 ou contact@ponceur-parquet.fr</p>
      <p>Cordialement,<br><strong>L'équipe Pallmann Store</strong></p>
    </div>
    <div class="f">Pallmann Store · www.pallmann-store.com</div>
  </div></div></body></html>`;
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

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    try {
      // Update order status
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

      if (updateError) console.error('Error updating order:', updateError);

      // Get order items with product refs
      const { data: orderItems } = await supabase
        .from('order_items')
        .select('*, product:product_id(ref)')
        .eq('order_id', order?.id);

      const metadata = session.metadata || {};
      const customerEmail = session.customer_email || metadata.customer_email;
      const totalTtc = (session.amount_total! / 100).toFixed(2);
      const orderNumber = `PS-${new Date().getFullYear()}-${order?.id?.substring(0, 6).toUpperCase()}`;

      // Generate BC PDF
      let pdfBase64 = '';
      try {
        pdfBase64 = generateBCPdf({
          orderNumber,
          date: new Date().toLocaleDateString('fr-FR'),
          customerName: metadata.customer_name || 'Client',
          customerPhone: metadata.customer_phone,
          shippingAddress: metadata.shipping_address || '',
          shippingPostalCode: metadata.shipping_postal_code || '',
          shippingCity: metadata.shipping_city || '',
          items: orderItems?.map(i => ({
            ref: i.product?.ref || '',
            name: i.product_name || '',
            quantity: i.quantity || 1
          })) || []
        });
      } catch (pdfErr) {
        console.error('PDF generation error:', pdfErr);
      }

      // Email admin with PDF attachment
      await resend.emails.send({
        from: 'Pallmann Store <noreply@ponceur-parquet.fr>',
        to: ['j.dietemann@renoline.fr'],
        subject: `Nouvelle commande ${orderNumber} - ${totalTtc}€`,
        html: generateAdminEmailHtml(order, metadata, orderItems || [], totalTtc),
        attachments: pdfBase64 ? [{
          filename: `BC-${orderNumber}.pdf`,
          content: pdfBase64,
        }] : undefined,
      });

      // Email client
      if (customerEmail) {
        await resend.emails.send({
          from: 'Pallmann Store <noreply@ponceur-parquet.fr>',
          to: [customerEmail],
          subject: `Commande ${orderNumber} confirmée - Pallmann Store`,
          html: generateClientEmailHtml(order, metadata, orderItems || [], totalTtc),
        });
      }

      console.log('Order emails sent:', orderNumber);
    } catch (err: any) {
      console.error('Error processing checkout:', err);
    }
  }

  res.status(200).json({ received: true });
}
