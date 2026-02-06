import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const ADMIN_EMAIL = 'contact@ponceur-parquet.fr';

interface FormSubmission {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  postal_code: string;
  surface: number;
  property_type: string;
  has_elevator?: boolean;
  finition: string;
  teinture?: boolean;
  message?: string;
  address?: string;
  created_at?: string;
}

function formatFormDataToHTML(data: FormSubmission): string {
  const basePrice = 42;
  const surfacePrice = basePrice * data.surface;
  const finishExtra = (data.finition === 'huileEnvironnement' || data.finition === 'vernisIntensif') ? 2 * data.surface : 0;
  const teinturePrix = data.teinture ? 12 * data.surface : 0;
  const installationFee = (data.property_type === 'appartement' && data.has_elevator === false) ? 80 : 0;
  const totalPrice = surfacePrice + finishExtra + teinturePrix + installationFee;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #d9b45a 0%, #c4a04f 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; display: inline-block; min-width: 150px; }
        .value { color: #333; }
        .price { background: #d9b45a; color: white; padding: 15px; border-radius: 5px; text-align: center; font-size: 24px; font-weight: bold; margin: 20px 0; }
        .footer { background: #0f1b2b; color: #9bb0c3; padding: 15px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0;">📝 Nouvelle demande de devis</h1>
          <p style="margin: 5px 0 0 0; font-size: 14px;">Ponceur-Parquet.fr</p>
        </div>
        
        <div class="content">
          <h2 style="color: #d9b45a; margin-top: 0;">Informations client</h2>
          
          <div class="field">
            <span class="label">Nom complet:</span>
            <span class="value">${data.full_name}</span>
          </div>
          
          <div class="field">
            <span class="label">Email:</span>
            <span class="value"><a href="mailto:${data.email}">${data.email}</a></span>
          </div>
          
          <div class="field">
            <span class="label">Téléphone:</span>
            <span class="value"><a href="tel:${data.phone}">${data.phone}</a></span>
          </div>
          
          <div class="field">
            <span class="label">Code postal:</span>
            <span class="value">${data.postal_code}</span>
          </div>
          
          ${data.address ? `
          <div class="field">
            <span class="label">Adresse:</span>
            <span class="value">${data.address}</span>
          </div>
          ` : ''}
          
          <h2 style="color: #d9b45a; margin-top: 30px;">Détails du projet</h2>
          
          <div class="field">
            <span class="label">Surface:</span>
            <span class="value">${data.surface} m²</span>
          </div>
          
          <div class="field">
            <span class="label">Type de bien:</span>
            <span class="value">${data.property_type === 'maison' ? 'Maison' : 'Appartement'}</span>
          </div>
          
          ${data.property_type === 'appartement' ? `
          <div class="field">
            <span class="label">Ascenseur:</span>
            <span class="value">${data.has_elevator ? 'Oui' : 'Non'}</span>
          </div>
          ` : ''}
          
          <div class="field">
            <span class="label">Finition:</span>
            <span class="value">${data.finition}</span>
          </div>
          
          <div class="field">
            <span class="label">Teinture:</span>
            <span class="value">${data.teinture ? 'Oui' : 'Non'}</span>
          </div>
          
          ${data.message ? `
          <div class="field" style="margin-top: 20px;">
            <span class="label" style="display: block; margin-bottom: 5px;">Message:</span>
            <div style="background: white; padding: 15px; border-left: 3px solid #d9b45a; border-radius: 3px;">
              ${data.message}
            </div>
          </div>
          ` : ''}
          
          <div class="price">
            Prix estimé: ${totalPrice}€
          </div>
          
          <p style="text-align: center; color: #666; font-size: 13px; margin-top: 10px;">
            Reçu le ${data.created_at ? new Date(data.created_at).toLocaleString('fr-FR') : new Date().toLocaleString('fr-FR')}
          </p>
        </div>
        
        <div class="footer">
          <p style="margin: 0;">Les Ponceurs Réunis</p>
          <p style="margin: 5px 0;">6 rue du Commerce, 68420 Herrlisheim-près-Colmar</p>
          <p style="margin: 5px 0;">📞 07 57 82 13 06 | 📧 contact@poncages.fr</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const formData: FormSubmission = await req.json();

    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not configured');
    }

    const htmlContent = formatFormDataToHTML(formData);

    const emailPayload = {
      from: 'Ponceur-Parquet.fr <notifications@ponceur-parquet.fr>',
      to: [ADMIN_EMAIL],
      subject: `🔔 Nouvelle demande de devis - ${formData.full_name}`,
      html: htmlContent,
      reply_to: formData.email,
    };

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(emailPayload),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(`Resend API error: ${JSON.stringify(result)}`);
    }

    return new Response(
      JSON.stringify({ success: true, data: result }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error sending notification email:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 500,
      }
    );
  }
});