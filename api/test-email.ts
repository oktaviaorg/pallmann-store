import { Resend } from 'resend';

// Styles inline pour éviter problèmes d'import Vercel
const emailStyles = `
  body { font-family: 'Segoe UI', Roboto, Arial, sans-serif; line-height: 1.6; color: #2D3748; background: #F7FAFC; margin: 0; padding: 0; }
  .wrapper { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
  .container { background: #FFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
  .header { background: linear-gradient(135deg, #D97706, #B45309); color: white; padding: 40px 30px; text-align: center; }
  .header-icon { font-size: 48px; margin-bottom: 16px; }
  .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
  .header p { margin: 12px 0 0; opacity: 0.9; }
  .content { padding: 32px; }
  .total-box { background: linear-gradient(135deg, #D97706, #B45309); color: white; padding: 24px; border-radius: 12px; text-align: center; margin: 24px 0; }
  .total-label { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.9; }
  .total-amount { font-size: 36px; font-weight: 700; margin-top: 8px; }
  .info-card { background: #F7FAFC; border-radius: 12px; padding: 20px; margin-bottom: 16px; }
  .info-title { font-weight: 600; color: #718096; font-size: 12px; text-transform: uppercase; margin-bottom: 8px; }
  .info-value { color: #1A202C; font-size: 16px; }
  .products-table { width: 100%; border-collapse: collapse; margin: 24px 0; }
  .products-table th { background: #EDF2F7; padding: 14px 16px; text-align: left; font-size: 12px; text-transform: uppercase; color: #4A5568; }
  .products-table td { padding: 16px; border-bottom: 1px solid #EDF2F7; }
  .summary-box { background: #F7FAFC; border-radius: 12px; padding: 20px; margin-top: 24px; }
  .summary-row { display: flex; justify-content: space-between; padding: 8px 0; color: #4A5568; }
  .summary-total { border-top: 2px solid #E2E8F0; margin-top: 12px; padding-top: 16px; font-weight: 700; color: #1A202C; font-size: 18px; }
  .highlight-box { background: #FFFBEB; border-left: 4px solid #D97706; border-radius: 0 12px 12px 0; padding: 20px; margin: 24px 0; }
  .footer { text-align: center; padding: 32px; color: #718096; font-size: 13px; border-top: 1px solid #EDF2F7; }
  .footer-logo { font-weight: 700; font-size: 18px; color: #D97706; margin-bottom: 12px; }
  .test-banner { background: #FED7D7; color: #C53030; padding: 12px; text-align: center; font-weight: 600; }
  a { color: #D97706; }
`;

function generateAdminEmail(order: any) {
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><style>${emailStyles}</style></head><body>
<div class="wrapper">
  ${order.isTest ? '<div class="test-banner">⚠️ CECI EST UN EMAIL DE TEST</div>' : ''}
  <div class="container">
    <div class="header">
      <div class="header-icon">🛒</div>
      <h1>Nouvelle commande !</h1>
      <p>Commande #${order.orderId}</p>
    </div>
    <div class="content">
      <div class="total-box">
        <div class="total-label">Montant total</div>
        <div class="total-amount">${order.totalTtc}€ TTC</div>
      </div>
      
      <div class="info-card">
        <div class="info-title">👤 Client</div>
        <div class="info-value">${order.customerName}</div>
      </div>
      
      <div class="info-card">
        <div class="info-title">✉️ Email</div>
        <div class="info-value"><a href="mailto:${order.customerEmail}">${order.customerEmail}</a></div>
      </div>
      
      ${order.customerPhone ? `<div class="info-card"><div class="info-title">📱 Téléphone</div><div class="info-value">${order.customerPhone}</div></div>` : ''}
      
      <div class="info-card">
        <div class="info-title">📍 Adresse de livraison</div>
        <div class="info-value">${order.shippingAddress}<br>${order.shippingPostalCode} ${order.shippingCity}</div>
      </div>
      
      <h3 style="margin: 32px 0 16px; color: #1A202C;">📦 Détail de la commande</h3>
      
      <table class="products-table">
        <tr><th>Produit</th><th style="text-align:center">Qté</th><th style="text-align:right">Prix HT</th></tr>
        ${order.items.map((i: any) => `<tr><td>${i.name}</td><td style="text-align:center">${i.quantity}</td><td style="text-align:right">${i.priceHt.toFixed(2)}€</td></tr>`).join('')}
      </table>
      
      <div class="summary-box">
        <div class="summary-row"><span>Sous-total HT</span><span>${order.subtotalHt}€</span></div>
        <div class="summary-row"><span>Livraison HT</span><span>${order.shippingHt === '0' ? '🎁 Offerte' : order.shippingHt + '€'}</span></div>
        <div class="summary-row summary-total"><span>Total TTC</span><span style="color:#D97706">${order.totalTtc}€</span></div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-logo">PALLMANN STORE</div>
      <p>6 rue du Commerce, 68420 Herrlisheim près Colmar</p>
      <p>📞 07 57 82 13 06 • <a href="mailto:contact@ponceur-parquet.fr">contact@ponceur-parquet.fr</a></p>
    </div>
  </div>
</div></body></html>`;
}

function generateClientEmail(order: any) {
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><style>${emailStyles}</style></head><body>
<div class="wrapper">
  ${order.isTest ? '<div class="test-banner">⚠️ CECI EST UN EMAIL DE TEST</div>' : ''}
  <div class="container">
    <div class="header" style="background: linear-gradient(135deg, #059669, #047857);">
      <div class="header-icon">✅</div>
      <h1>Commande confirmée !</h1>
      <p>Merci pour votre achat</p>
    </div>
    <div class="content">
      <p style="font-size:18px;color:#1A202C">Bonjour <strong>${order.customerName}</strong>,</p>
      <p style="color:#4A5568">Votre commande <strong>#${order.orderId}</strong> a bien été confirmée et est en cours de préparation.</p>
      
      <div class="total-box" style="background: linear-gradient(135deg, #059669, #047857);">
        <div class="total-label">Montant total</div>
        <div class="total-amount">${order.totalTtc}€ TTC</div>
      </div>
      
      <h3 style="margin: 32px 0 16px; color: #1A202C;">📦 Récapitulatif</h3>
      
      <table class="products-table">
        <tr><th>Produit</th><th style="text-align:center">Qté</th><th style="text-align:right">Prix HT</th></tr>
        ${order.items.map((i: any) => `<tr><td>${i.name}</td><td style="text-align:center">${i.quantity}</td><td style="text-align:right">${i.priceHt.toFixed(2)}€</td></tr>`).join('')}
      </table>
      
      <div class="highlight-box">
        <strong>📍 Adresse de livraison</strong><br>
        ${order.shippingAddress}<br>${order.shippingPostalCode} ${order.shippingCity}
      </div>
      
      <div class="highlight-box" style="background:#EBF8FF; border-color:#3B82F6;">
        <strong style="color:#1E40AF">🚚 Livraison</strong><br>
        <span style="color:#1E3A5F">Expédition sous 24-48h ouvrées. Vous recevrez un email avec le numéro de suivi.</span>
      </div>
      
      <p style="color:#4A5568;margin-top:24px">
        Une question ? Contactez-nous au <strong>07 57 82 13 06</strong> ou à <a href="mailto:contact@ponceur-parquet.fr">contact@ponceur-parquet.fr</a>
      </p>
      
      <p style="margin-top:24px">Merci pour votre confiance,<br><strong style="color:#D97706">L'équipe Pallmann Store</strong></p>
    </div>
    <div class="footer">
      <div class="footer-logo">PALLMANN STORE</div>
      <p>Produits professionnels pour parquet</p>
      <p>6 rue du Commerce, 68420 Herrlisheim près Colmar</p>
      <p>📞 07 57 82 13 06 • <a href="mailto:contact@ponceur-parquet.fr">contact@ponceur-parquet.fr</a></p>
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
    orderId: 'TEST123',
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
      ? `🧪 TEST - ✅ Confirmation commande #${testOrder.orderId}`
      : `🧪 TEST - 🛒 Nouvelle commande #${testOrder.orderId} - ${testOrder.totalTtc}€`;

    const result = await resend.emails.send({
      from: 'Pallmann Store <noreply@ponceur-parquet.fr>',
      to: [testEmail],
      subject,
      html,
    });

    return res.status(200).json({ success: true, type: testType, sentTo: testEmail, messageId: result.data?.id });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to send', details: error.message });
  }
}
