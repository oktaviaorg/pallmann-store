import { Resend } from 'resend';
import { generateAdminOrderEmail, generateClientConfirmationEmail } from './email-templates';

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

  // Données de test
  const testOrder = {
    orderId: 'TEST123',
    customerName: 'Jean Dupont',
    customerEmail: 'test@example.com',
    customerPhone: '06 12 34 56 78',
    shippingAddress: '123 rue de la République',
    shippingCity: 'Colmar',
    shippingPostalCode: '68000',
    companyCode: undefined,
    items: [
      { name: 'PALL-X 320 (5L)', quantity: 2, priceHt: 46.00 },
      { name: 'FINISH CARE STOP 5L', quantity: 1, priceHt: 26.54 },
      { name: 'MAGIC OIL CARE 0,75L', quantity: 3, priceHt: 45.60 },
    ],
    subtotalHt: '118.14',
    shippingHt: '9.00',
    discountAmount: '0',
    totalHt: '127.14',
    totalTtc: '152.57',
    isTest: true
  };

  try {
    if (testType === 'admin') {
      const html = generateAdminOrderEmail(testOrder);
      
      const result = await resend.emails.send({
        from: 'Pallmann Store <noreply@ponceur-parquet.fr>',
        to: [testEmail],
        subject: `🧪 TEST - 🛒 Nouvelle commande #${testOrder.orderId} - ${testOrder.totalTtc}€`,
        html,
      });

      return res.status(200).json({ 
        success: true, 
        type: 'admin',
        sentTo: testEmail,
        messageId: result.data?.id 
      });
    }

    if (testType === 'client') {
      const html = generateClientConfirmationEmail(testOrder);
      
      const result = await resend.emails.send({
        from: 'Pallmann Store <noreply@ponceur-parquet.fr>',
        to: [testEmail],
        subject: `🧪 TEST - ✅ Confirmation de commande #${testOrder.orderId} - Pallmann Store`,
        html,
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
