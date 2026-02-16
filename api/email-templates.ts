// Templates d'emails Pallmann Store - Design moderne et professionnel

export const emailStyles = `
  body { 
    font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
    line-height: 1.6; 
    color: #2D3748; 
    background-color: #F7FAFC;
    margin: 0;
    padding: 0;
  }
  .wrapper {
    max-width: 600px; 
    margin: 0 auto; 
    padding: 40px 20px;
  }
  .container { 
    background: #FFFFFF;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 20px rgba(0, 0, 0, 0.05);
  }
  .header { 
    background: linear-gradient(135deg, #FF8C00 0%, #FF6B00 100%);
    color: white; 
    padding: 40px 30px;
    text-align: center;
  }
  .header-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }
  .header h1 { 
    margin: 0;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.5px;
  }
  .header p {
    margin: 12px 0 0 0;
    opacity: 0.9;
    font-size: 15px;
  }
  .content { 
    padding: 32px;
  }
  .greeting {
    font-size: 18px;
    color: #1A202C;
    margin-bottom: 24px;
  }
  .total-box { 
    background: linear-gradient(135deg, #FF8C00 0%, #FF6B00 100%);
    color: white; 
    padding: 24px;
    border-radius: 12px;
    text-align: center;
    margin: 24px 0;
  }
  .total-label {
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.9;
    margin-bottom: 8px;
  }
  .total-amount {
    font-size: 36px;
    font-weight: 700;
  }
  .info-card { 
    background: #F7FAFC;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 16px;
  }
  .info-card-header {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }
  .info-card-icon {
    font-size: 20px;
    margin-right: 10px;
  }
  .info-card-title { 
    font-weight: 600;
    color: #4A5568;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0;
  }
  .info-card-value { 
    color: #1A202C;
    font-size: 16px;
    margin: 0;
  }
  .products-table {
    width: 100%;
    border-collapse: collapse;
    margin: 24px 0;
  }
  .products-table th {
    background: #EDF2F7;
    padding: 14px 16px;
    text-align: left;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #4A5568;
    font-weight: 600;
  }
  .products-table th:first-child {
    border-radius: 8px 0 0 8px;
  }
  .products-table th:last-child {
    border-radius: 0 8px 8px 0;
    text-align: right;
  }
  .products-table td {
    padding: 16px;
    border-bottom: 1px solid #EDF2F7;
    color: #2D3748;
  }
  .products-table td:last-child {
    text-align: right;
    font-weight: 600;
  }
  .products-table tr:last-child td {
    border-bottom: none;
  }
  .summary-box {
    background: #F7FAFC;
    border-radius: 12px;
    padding: 20px;
    margin-top: 24px;
  }
  .summary-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    color: #4A5568;
  }
  .summary-row.total {
    border-top: 2px solid #E2E8F0;
    margin-top: 12px;
    padding-top: 16px;
    font-weight: 700;
    color: #1A202C;
    font-size: 18px;
  }
  .highlight-box {
    background: #FFFBEB;
    border-left: 4px solid #FF8C00;
    border-radius: 0 12px 12px 0;
    padding: 20px;
    margin: 24px 0;
  }
  .highlight-box h4 {
    margin: 0 0 8px 0;
    color: #92400E;
    font-size: 14px;
    font-weight: 600;
  }
  .highlight-box p {
    margin: 0;
    color: #78350F;
    font-size: 14px;
  }
  .cta-button {
    display: inline-block;
    background: linear-gradient(135deg, #FF8C00 0%, #FF6B00 100%);
    color: white !important;
    padding: 14px 32px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    font-size: 16px;
    margin: 24px 0;
  }
  .footer { 
    text-align: center;
    padding: 32px;
    color: #718096;
    font-size: 13px;
    border-top: 1px solid #EDF2F7;
  }
  .footer-logo {
    font-weight: 700;
    font-size: 18px;
    color: #FF8C00;
    margin-bottom: 12px;
  }
  .footer p {
    margin: 4px 0;
  }
  .footer a {
    color: #FF8C00;
    text-decoration: none;
  }
  .social-links {
    margin-top: 16px;
  }
  .social-links a {
    display: inline-block;
    margin: 0 8px;
    color: #A0AEC0;
    text-decoration: none;
  }
  .test-banner { 
    background: #FED7D7;
    color: #C53030;
    padding: 12px;
    text-align: center;
    font-weight: 600;
    font-size: 13px;
  }
`;

export function generateAdminOrderEmail(order: {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: string;
  shippingCity: string;
  shippingPostalCode: string;
  companyCode?: string;
  items: Array<{ name: string; quantity: number; priceHt: number }>;
  subtotalHt: string;
  shippingHt: string;
  discountAmount?: string;
  totalHt: string;
  totalTtc: string;
  isTest?: boolean;
}) {
  const itemsHtml = order.items.map(item => `
    <tr>
      <td>${item.name}</td>
      <td style="text-align: center;">${item.quantity}</td>
      <td style="text-align: right; font-weight: 600;">${item.priceHt.toFixed(2)}€</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nouvelle commande - Pallmann Store</title>
      <style>${emailStyles}</style>
    </head>
    <body>
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
              <div class="info-card-header">
                <span class="info-card-icon">👤</span>
                <p class="info-card-title">Client</p>
              </div>
              <p class="info-card-value">${order.customerName}</p>
            </div>
            
            <div class="info-card">
              <div class="info-card-header">
                <span class="info-card-icon">✉️</span>
                <p class="info-card-title">Email</p>
              </div>
              <p class="info-card-value"><a href="mailto:${order.customerEmail}" style="color: #FF8C00;">${order.customerEmail}</a></p>
            </div>
            
            ${order.customerPhone ? `
            <div class="info-card">
              <div class="info-card-header">
                <span class="info-card-icon">📱</span>
                <p class="info-card-title">Téléphone</p>
              </div>
              <p class="info-card-value">${order.customerPhone}</p>
            </div>
            ` : ''}
            
            <div class="info-card">
              <div class="info-card-header">
                <span class="info-card-icon">📍</span>
                <p class="info-card-title">Adresse de livraison</p>
              </div>
              <p class="info-card-value">
                ${order.shippingAddress}<br>
                ${order.shippingPostalCode} ${order.shippingCity}
              </p>
            </div>
            
            ${order.companyCode ? `
            <div class="info-card" style="background: #F0FFF4; border: 1px solid #9AE6B4;">
              <div class="info-card-header">
                <span class="info-card-icon">🏢</span>
                <p class="info-card-title">Code PRO utilisé</p>
              </div>
              <p class="info-card-value" style="color: #22543D; font-weight: 600;">${order.companyCode}</p>
            </div>
            ` : ''}
            
            <h3 style="margin: 32px 0 16px 0; color: #1A202C; font-size: 18px;">📦 Détail de la commande</h3>
            
            <table class="products-table">
              <thead>
                <tr>
                  <th>Produit</th>
                  <th style="text-align: center;">Qté</th>
                  <th style="text-align: right;">Prix HT</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
            
            <div class="summary-box">
              <div class="summary-row">
                <span>Sous-total HT</span>
                <span>${order.subtotalHt}€</span>
              </div>
              ${order.discountAmount && parseFloat(order.discountAmount) > 0 ? `
              <div class="summary-row" style="color: #38A169;">
                <span>Remise PRO</span>
                <span>-${order.discountAmount}€</span>
              </div>
              ` : ''}
              <div class="summary-row">
                <span>Livraison HT</span>
                <span>${order.shippingHt === '0' || order.shippingHt === '0.00' ? '🎁 Offerte' : order.shippingHt + '€'}</span>
              </div>
              <div class="summary-row total">
                <span>Total HT</span>
                <span>${order.totalHt}€</span>
              </div>
              <div class="summary-row total" style="border-top: none; padding-top: 8px; color: #FF8C00;">
                <span>Total TTC</span>
                <span>${order.totalTtc}€</span>
              </div>
            </div>
          </div>
          
          <div class="footer">
            <div class="footer-logo">PALLMANN STORE</div>
            <p>6 rue du Commerce, 68420 Herrlisheim près Colmar</p>
            <p>📞 07 57 82 13 06 • <a href="mailto:contact@pallmann-store.com">contact@pallmann-store.com</a></p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generateClientConfirmationEmail(order: {
  orderId: string;
  customerName: string;
  items: Array<{ name: string; quantity: number; priceHt: number }>;
  shippingAddress: string;
  shippingCity: string;
  shippingPostalCode: string;
  totalTtc: string;
  isTest?: boolean;
}) {
  const itemsHtml = order.items.map(item => `
    <tr>
      <td>${item.name}</td>
      <td style="text-align: center;">${item.quantity}</td>
      <td style="text-align: right; font-weight: 600;">${item.priceHt.toFixed(2)}€</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmation de commande - Pallmann Store</title>
      <style>${emailStyles}</style>
    </head>
    <body>
      <div class="wrapper">
        ${order.isTest ? '<div class="test-banner">⚠️ CECI EST UN EMAIL DE TEST</div>' : ''}
        <div class="container">
          <div class="header" style="background: linear-gradient(135deg, #48BB78 0%, #38A169 100%);">
            <div class="header-icon">✅</div>
            <h1>Commande confirmée !</h1>
            <p>Merci pour votre achat</p>
          </div>
          
          <div class="content">
            <p class="greeting">Bonjour <strong>${order.customerName}</strong>,</p>
            
            <p style="color: #4A5568; font-size: 16px;">
              Votre commande <strong>#${order.orderId}</strong> a bien été confirmée et est en cours de préparation par notre équipe.
            </p>
            
            <div class="total-box" style="background: linear-gradient(135deg, #48BB78 0%, #38A169 100%);">
              <div class="total-label">Montant total</div>
              <div class="total-amount">${order.totalTtc}€ TTC</div>
            </div>
            
            <h3 style="margin: 32px 0 16px 0; color: #1A202C; font-size: 18px;">📦 Récapitulatif de votre commande</h3>
            
            <table class="products-table">
              <thead>
                <tr>
                  <th>Produit</th>
                  <th style="text-align: center;">Qté</th>
                  <th style="text-align: right;">Prix HT</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
            
            <div class="highlight-box">
              <h4>📍 Adresse de livraison</h4>
              <p>
                ${order.shippingAddress}<br>
                ${order.shippingPostalCode} ${order.shippingCity}
              </p>
            </div>
            
            <div class="highlight-box" style="background: #EBF8FF; border-color: #4299E1;">
              <h4 style="color: #2B6CB0;">🚚 Livraison</h4>
              <p style="color: #2C5282;">
                Votre commande sera expédiée sous <strong>24-48h ouvrées</strong>.<br>
                Vous recevrez un email avec le numéro de suivi dès l'expédition.
              </p>
            </div>
            
            <div style="text-align: center; margin: 32px 0;">
              <a href="https://www.pallmann-store.com/boutique" class="cta-button">
                Continuer mes achats →
              </a>
            </div>
            
            <p style="color: #4A5568; font-size: 15px;">
              Une question ? Notre équipe est à votre disposition au <strong>07 57 82 13 06</strong> ou par email à <a href="mailto:contact@pallmann-store.com" style="color: #FF8C00;">contact@pallmann-store.com</a>
            </p>
            
            <p style="color: #1A202C; font-size: 16px; margin-top: 24px;">
              Merci pour votre confiance,<br>
              <strong style="color: #FF8C00;">L'équipe Pallmann Store</strong>
            </p>
          </div>
          
          <div class="footer">
            <div class="footer-logo">PALLMANN STORE</div>
            <p>Produits professionnels pour parquet</p>
            <p>6 rue du Commerce, 68420 Herrlisheim près Colmar</p>
            <p>📞 07 57 82 13 06 • <a href="mailto:contact@pallmann-store.com">contact@pallmann-store.com</a></p>
            <p style="margin-top: 16px;">
              <a href="https://www.pallmann-store.com">www.pallmann-store.com</a>
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
