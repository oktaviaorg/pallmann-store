import { Resend } from 'resend';

// Design sobre et professionnel - style corporate
const emailStyles = `
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #374151; background: #F9FAFB; margin: 0; padding: 0; }
  .wrapper { max-width: 600px; margin: 0 auto; padding: 32px 16px; }
  .container { background: #FFFFFF; border-radius: 8px; border: 1px solid #E5E7EB; overflow: hidden; }
  .header { padding: 32px; text-align: center; border-bottom: 1px solid #E5E7EB; }
  .logo { font-size: 20px; font-weight: 600; color: #111827; letter-spacing: -0.5px; }
  .header h1 { margin: 16px 0 0; font-size: 24px; font-weight: 600; color: #111827; }
  .header p { margin: 8px 0 0; color: #6B7280; font-size: 14px; }
  .content { padding: 32px; }
  .amount-box { text-align: center; padding: 24px; background: #F9FAFB; border-radius: 8px; margin-bottom: 24px; }
  .amount-label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #6B7280; margin-bottom: 4px; }
  .amount { font-size: 32px; font-weight: 600; color: #111827; }
  .section { margin-bottom: 24px; }
  .section-title { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #6B7280; margin-bottom: 12px; }
  .info-row { padding: 12px 0; border-bottom: 1px solid #F3F4F6; }
  .info-row:last-child { border-bottom: none; }
  .info-label { font-size: 13px; color: #6B7280; margin-bottom: 2px; }
  .info-value { font-size: 15px; color: #111827; }
  .products-table { width: 100%; border-collapse: collapse; font-size: 14px; }
  .products-table th { text-align: left; padding: 12px 0; border-bottom: 2px solid #E5E7EB; font-weight: 600; color: #374151; font-size: 12px; text-transform: uppercase; }
  .products-table td { padding: 12px 0; border-bottom: 1px solid #F3F4F6; color: #374151; }
  .products-table .qty { text-align: center; }
  .products-table .price { text-align: right; font-weight: 500; }
  .summary { background: #F9FAFB; padding: 16px; border-radius: 8px; margin-top: 24px; }
  .summary-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 14px; color: #6B7280; }
  .summary-row.total { padding-top: 12px; margin-top: 8px; border-top: 1px solid #E5E7EB; font-weight: 600; font-size: 16px; color: #111827; }
  .notice { background: #F3F4F6; padding: 16px; border-radius: 6px; margin: 24px 0; font-size: 14px; color: #4B5563; }
  .notice strong { color: #111827; }
  .footer { padding: 24px 32px; background: #F9FAFB; text-align: center; font-size: 13px; color: #6B7280; border-top: 1px solid #E5E7EB; }
  .footer p { margin: 4px 0; }
  a { color: #2563EB; text-decoration: none; }
  .test-banner { background: #FEF2F2; color: #991B1B; padding: 10px; text-align: center; font-size: 13px; font-weight: 500; }
  .btn { display: inline-block; background: #111827; color: #FFFFFF !important; padding: 12px 24px; border-radius: 6px; font-size: 14px; font-weight: 500; text-decoration: none; margin-top: 16px; }
`;

function generateAdminEmail(order: any) {
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><style>${emailStyles}</style></head><body>
<div class="wrapper">
  ${order.isTest ? '<div class="test-banner">Email de test</div>' : ''}
  <div class="container">
    <div class="header">
      <div class="logo">PALLMANN STORE</div>
      <h1>Nouvelle commande</h1>
      <p>Commande #${order.orderId}</p>
    </div>
    <div class="content">
      <div class="amount-box">
        <div class="amount-label">Montant total</div>
        <div class="amount">${order.totalTtc} €</div>
      </div>
      
      <div class="section">
        <div class="section-title">Informations client</div>
        <div class="info-row">
          <div class="info-label">Nom</div>
          <div class="info-value">${order.customerName}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Email</div>
          <div class="info-value"><a href="mailto:${order.customerEmail}">${order.customerEmail}</a></div>
        </div>
        ${order.customerPhone ? `<div class="info-row"><div class="info-label">Téléphone</div><div class="info-value">${order.customerPhone}</div></div>` : ''}
        <div class="info-row">
          <div class="info-label">Adresse de livraison</div>
          <div class="info-value">${order.shippingAddress}<br>${order.shippingPostalCode} ${order.shippingCity}</div>
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">Articles commandés</div>
        <table class="products-table">
          <thead><tr><th>Produit</th><th class="qty">Qté</th><th class="price">Prix HT</th></tr></thead>
          <tbody>
            ${order.items.map((i: any) => `<tr><td>${i.name}</td><td class="qty">${i.quantity}</td><td class="price">${i.priceHt.toFixed(2)} €</td></tr>`).join('')}
          </tbody>
        </table>
        
        <div class="summary">
          <div class="summary-row"><span>Sous-total HT</span><span>${order.subtotalHt} €</span></div>
          <div class="summary-row"><span>Livraison</span><span>${order.shippingHt === '0' ? 'Offerte' : order.shippingHt + ' €'}</span></div>
          <div class="summary-row total"><span>Total TTC</span><span>${order.totalTtc} €</span></div>
        </div>
      </div>
    </div>
    <div class="footer">
      <p><strong>Pallmann Store</strong></p>
      <p>6 rue du Commerce, 68420 Herrlisheim près Colmar</p>
      <p>Tél : 07 57 82 13 06 · <a href="mailto:contact@ponceur-parquet.fr">contact@ponceur-parquet.fr</a></p>
    </div>
  </div>
</div></body></html>`;
}

function generateClientEmail(order: any) {
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><style>${emailStyles}</style></head><body>
<div class="wrapper">
  ${order.isTest ? '<div class="test-banner">Email de test</div>' : ''}
  <div class="container">
    <div class="header">
      <div class="logo">PALLMANN STORE</div>
      <h1>Commande confirmée</h1>
      <p>Merci pour votre commande</p>
    </div>
    <div class="content">
      <p style="font-size:15px;color:#374151;margin-bottom:24px">Bonjour ${order.customerName},<br><br>Nous avons bien reçu votre commande <strong>#${order.orderId}</strong> et celle-ci est en cours de préparation.</p>
      
      <div class="amount-box">
        <div class="amount-label">Montant total</div>
        <div class="amount">${order.totalTtc} €</div>
      </div>
      
      <div class="section">
        <div class="section-title">Récapitulatif</div>
        <table class="products-table">
          <thead><tr><th>Produit</th><th class="qty">Qté</th><th class="price">Prix HT</th></tr></thead>
          <tbody>
            ${order.items.map((i: any) => `<tr><td>${i.name}</td><td class="qty">${i.quantity}</td><td class="price">${i.priceHt.toFixed(2)} €</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
      
      <div class="notice">
        <strong>Livraison</strong><br>
        ${order.shippingAddress}, ${order.shippingPostalCode} ${order.shippingCity}<br><br>
        Expédition sous 24-48h ouvrées. Vous recevrez un email avec le numéro de suivi.
      </div>
      
      <p style="font-size:14px;color:#6B7280;margin-top:24px">Une question ? Contactez-nous au 07 57 82 13 06 ou par email à <a href="mailto:contact@ponceur-parquet.fr">contact@ponceur-parquet.fr</a></p>
      
      <p style="margin-top:24px;font-size:15px">Cordialement,<br><strong style="color:#111827">L'équipe Pallmann Store</strong></p>
    </div>
    <div class="footer">
      <p><strong>Pallmann Store</strong></p>
      <p>Produits professionnels pour parquet</p>
      <p>6 rue du Commerce, 68420 Herrlisheim près Colmar</p>
      <p><a href="https://www.pallmann-store.com">www.pallmann-store.com</a></p>
    </div>
  </div>
</div></body></html>`;
}

export default async function handler(req: any, res: any) {
  const testSecret = req.query.secret || req.body?.secret;
  if (testSecret !== process.env.EMAIL_TEST_SECRET && testSecret !== 'pallmann2026') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'RESEND_API_KEY not configured' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const testType = req.query.type || req.body?.type || 'admin';
  const testEmail = req.query.email || req.body?.email || 'j.dietemann@renoline.fr';

  const testOrder = {
    orderId: 'PS-2026-0042',
    customerName: 'Jean Dupont',
    customerEmail: 'client@example.com',
    customerPhone: '06 12 34 56 78',
    shippingAddress: '123 rue de la République',
    shippingCity: 'Colmar',
    shippingPostalCode: '68000',
    items: [
      { name: 'PALL-X 320 (5L)', quantity: 2, priceHt: 46.00 },
      { name: 'FINISH CARE STOP 5L', quantity: 1, priceHt: 26.54 },
      { name: 'MAGIC OIL CARE 0,75L', quantity: 3, priceHt: 45.60 },
    ],
    subtotalHt: '118.14',
    shippingHt: '9.00',
    totalHt: '127.14',
    totalTtc: '152.57',
    isTest: true
  };

  try {
    const html = testType === 'client' ? generateClientEmail(testOrder) : generateAdminEmail(testOrder);
    const subject = testType === 'client' 
      ? `Commande #${testOrder.orderId} confirmée - Pallmann Store`
      : `Nouvelle commande #${testOrder.orderId} - ${testOrder.totalTtc}€`;

    const result = await resend.emails.send({
      from: 'Pallmann Store <noreply@ponceur-parquet.fr>',
      to: [testEmail],
      subject: testOrder.isTest ? `[TEST] ${subject}` : subject,
      html,
    });

    return res.status(200).json({ success: true, type: testType, sentTo: testEmail, messageId: result.data?.id });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to send', details: error.message });
  }
}
