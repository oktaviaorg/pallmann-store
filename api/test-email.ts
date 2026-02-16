import { Resend } from 'resend';

export default async function handler(req: any, res: any) {
  // Only allow in dev/test - protect with secret
  const testSecret = req.query.secret || req.body?.secret;
  if (testSecret !== process.env.EMAIL_TEST_SECRET && testSecret !== 'pallmann2026') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Check config
  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ 
      error: 'RESEND_API_KEY not configured',
      help: 'Add RESEND_API_KEY to Vercel Environment Variables'
    });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const testType = req.query.type || req.body?.type || 'admin';
  const testEmail = req.query.email || req.body?.email || 'j.dietemann@renoline.fr';

  try {
    if (testType === 'admin') {
      // Test email admin (nouvelle commande)
      const result = await resend.emails.send({
        from: 'Pallmann Store <noreply@ponceur-parquet.fr>',
        to: [testEmail],
        subject: `🧪 TEST - Nouvelle commande #TEST123 - 150.00€`,
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
              .test-banner { background: #EF4444; color: white; padding: 10px; text-align: center; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="test-banner">⚠️ CECI EST UN EMAIL DE TEST</div>
              <div class="header">
                <h1 style="margin: 0;">🛒 Nouvelle commande !</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Commande #TEST123</p>
              </div>
              <div class="content">
                <div class="total">150.00€ TTC</div>
                
                <div class="field">
                  <div class="field-label">Client</div>
                  <div class="field-value">Jean Test</div>
                </div>
                <div class="field">
                  <div class="field-label">Email</div>
                  <div class="field-value">test@example.com</div>
                </div>
                <div class="field">
                  <div class="field-label">Téléphone</div>
                  <div class="field-value">06 12 34 56 78</div>
                </div>
                <div class="field">
                  <div class="field-label">Adresse de livraison</div>
                  <div class="field-value">
                    123 rue de Test<br>
                    68000 Colmar
                  </div>
                </div>
                
                <h3>Détail de la commande</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr style="background: #f5f5f5;">
                    <th style="padding: 12px; text-align: left;">Produit</th>
                    <th style="padding: 12px; text-align: left;">Qté</th>
                    <th style="padding: 12px; text-align: left;">Prix HT</th>
                  </tr>
                  <tr>
                    <td style="padding: 12px; border-bottom: 1px solid #ddd;">PALL-X 320 (5L)</td>
                    <td style="padding: 12px; border-bottom: 1px solid #ddd;">2</td>
                    <td style="padding: 12px; border-bottom: 1px solid #ddd;">46.00€</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px; border-bottom: 1px solid #ddd;">FINISH CARE 5L</td>
                    <td style="padding: 12px; border-bottom: 1px solid #ddd;">1</td>
                    <td style="padding: 12px; border-bottom: 1px solid #ddd;">26.54€</td>
                  </tr>
                </table>
                
                <div class="field">
                  <div class="field-label">Récapitulatif</div>
                  <div class="field-value">
                    Sous-total HT: 118.54€<br>
                    Livraison HT: 9.00€<br>
                    <strong>Total HT: 127.54€</strong><br>
                    <strong>Total TTC: 150.00€</strong>
                  </div>
                </div>
              </div>
            </div>
          </body>
          </html>
        `,
      });

      return res.status(200).json({ 
        success: true, 
        type: 'admin',
        sentTo: testEmail,
        messageId: result.data?.id 
      });
    }

    if (testType === 'client') {
      // Test email client (confirmation)
      const result = await resend.emails.send({
        from: 'Pallmann Store <noreply@ponceur-parquet.fr>',
        to: [testEmail],
        subject: `🧪 TEST - ✅ Confirmation de commande #TEST123 - Pallmann Store`,
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
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
              .test-banner { background: #EF4444; color: white; padding: 10px; text-align: center; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="test-banner">⚠️ CECI EST UN EMAIL DE TEST</div>
              <div class="header">
                <h1 style="margin: 0;">✅ Commande confirmée !</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Merci pour votre achat</p>
              </div>
              <div class="content">
                <p>Bonjour <strong>Jean Test</strong>,</p>
                
                <p>Votre commande <strong>#TEST123</strong> a bien été confirmée et est en cours de préparation.</p>
                
                <div class="total">Total: 150.00€ TTC</div>
                
                <h3>Récapitulatif de votre commande</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr style="background: #f5f5f5;">
                    <th style="padding: 12px; text-align: left;">Produit</th>
                    <th style="padding: 12px; text-align: left;">Qté</th>
                    <th style="padding: 12px; text-align: left;">Prix HT</th>
                  </tr>
                  <tr>
                    <td style="padding: 12px; border-bottom: 1px solid #ddd;">PALL-X 320 (5L)</td>
                    <td style="padding: 12px; border-bottom: 1px solid #ddd;">2</td>
                    <td style="padding: 12px; border-bottom: 1px solid #ddd;">46.00€</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px; border-bottom: 1px solid #ddd;">FINISH CARE 5L</td>
                    <td style="padding: 12px; border-bottom: 1px solid #ddd;">1</td>
                    <td style="padding: 12px; border-bottom: 1px solid #ddd;">26.54€</td>
                  </tr>
                </table>
                
                <div class="highlight">
                  <p style="margin: 0;"><strong>Adresse de livraison</strong></p>
                  <p style="margin: 10px 0 0 0;">
                    123 rue de Test<br>
                    68000 Colmar
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

      return res.status(200).json({ 
        success: true, 
        type: 'client',
        sentTo: testEmail,
        messageId: result.data?.id 
      });
    }

    return res.status(400).json({ error: 'Invalid type. Use: admin or client' });

  } catch (error: any) {
    console.error('Test email error:', error);
    return res.status(500).json({ 
      error: 'Failed to send test email',
      details: error.message 
    });
  }
}
