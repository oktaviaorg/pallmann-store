import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      company_name, 
      siret, 
      contact_name, 
      email, 
      phone, 
      address, 
      city, 
      postal_code, 
      message 
    } = req.body;

    // Email to admin
    const adminEmailResult = await resend.emails.send({
      from: 'Pallmann Store <noreply@ponceur-parquet.fr>',
      to: ['pro@pallmann-store.com'],
      subject: `🏢 Nouvelle demande PRO - ${company_name}`,
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
            .field { margin-bottom: 15px; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #FF6600; }
            .field-label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; margin-bottom: 5px; }
            .field-value { color: #333; font-size: 16px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🏢 Nouvelle demande PRO</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Un professionnel souhaite obtenir un code réduction</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="field-label">Entreprise</div>
                <div class="field-value">${company_name}</div>
              </div>
              <div class="field">
                <div class="field-label">SIRET</div>
                <div class="field-value">${siret}</div>
              </div>
              <div class="field">
                <div class="field-label">Contact</div>
                <div class="field-value">${contact_name}</div>
              </div>
              <div class="field">
                <div class="field-label">Email</div>
                <div class="field-value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <div class="field-label">Téléphone</div>
                <div class="field-value"><a href="tel:${phone}">${phone}</a></div>
              </div>
              ${address ? `
              <div class="field">
                <div class="field-label">Adresse</div>
                <div class="field-value">${address}<br>${postal_code} ${city}</div>
              </div>
              ` : ''}
              ${message ? `
              <div class="field">
                <div class="field-label">Message</div>
                <div class="field-value">${message}</div>
              </div>
              ` : ''}
            </div>
            <div class="footer">
              <p>Cet email a été envoyé depuis le formulaire PRO de pallmann-store.com</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Confirmation email to the user
    const userEmailResult = await resend.emails.send({
      from: 'Pallmann Store <noreply@ponceur-parquet.fr>',
      to: [email],
      subject: 'Confirmation de votre demande PRO - Pallmann Store',
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
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">✅ Demande reçue !</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Pallmann Store - Espace Professionnel</p>
            </div>
            <div class="content">
              <p>Bonjour <strong>${contact_name}</strong>,</p>
              
              <p>Nous avons bien reçu votre demande d'inscription en tant que client professionnel pour <strong>${company_name}</strong>.</p>
              
              <div class="highlight">
                <p style="margin: 0;"><strong>Que se passe-t-il maintenant ?</strong></p>
                <p style="margin: 10px 0 0 0;">Notre équipe va examiner votre demande et vous contactera dans les <strong>24 à 48h ouvrées</strong> pour vous transmettre votre code réduction personnalisé.</p>
              </div>
              
              <p>En attendant, n'hésitez pas à parcourir notre catalogue sur <a href="https://pallmann-store.com" style="color: #FF6600;">pallmann-store.com</a></p>
              
              <p>À très bientôt,<br><strong>L'équipe Pallmann Store</strong></p>
            </div>
            <div class="footer">
              <p>Pallmann Store - Groupe Epenon SARL</p>
              <p>6 rue du Commerce, 68420 Herrlisheim près Colmar</p>
              <p><a href="mailto:pro@pallmann-store.com" style="color: #FF6600;">pro@pallmann-store.com</a> | 03 89 21 00 00</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('Pro notification emails sent:', { adminEmailResult, userEmailResult });

    res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('Error sending pro notification:', err);
    res.status(500).json({ error: err.message });
  }
}
