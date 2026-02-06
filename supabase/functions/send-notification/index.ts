import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { record } = await req.json();

    const emailContent = `
Bonjour,

Un nouveau formulaire a été soumis sur le site LPR PONCEURS RÉUNIS.

Voici les détails de la soumission :

Surface à traiter : ${record.surface} m²
Type de finition : ${record.finition}
${record.teinture ? 'Teinture demandée : Oui' : ''}
Type de bien : ${record.property_type}
${record.property_type === 'appartement' ? `Ascenseur : ${record.has_elevator ? 'Oui' : 'Non'}` : ''}

Prix estimatif : ${calculatePrice(record)}€ TTC

Coordonnées du client :
- Nom : ${record.full_name}
- Téléphone : ${record.phone}
- Email : ${record.email}
- Code postal : ${record.postal_code}

${record.message ? `\nMessage du client :\n${record.message}` : ''}

Date de la demande : ${new Date(record.created_at).toLocaleString('fr-FR', {
  dateStyle: 'full',
  timeStyle: 'short'
})}

Cordialement,
Système de notification LPR
    `.trim();

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'LPR Notifications <notifications@ponceur-parquet.fr>',
        to: 'contact@ponceur-parquet.fr',
        subject: `Nouvelle demande de devis - ${record.full_name}`,
        text: emailContent,
        reply_to: record.email,
      }),
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: res.ok ? 200 : 400,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});

function calculatePrice(data: any) {
  const basePrice = 42;
  const surfacePrice = basePrice * data.surface;
  const finishExtra = data.finition === 'intensif' ? 2 * data.surface : 0;
  const teinturePrix = data.teinture ? 12 * data.surface : 0;
  const installationFee = (data.property_type === 'appartement' && !data.has_elevator) ? 80 : 0;
  return surfacePrice + finishExtra + teinturePrix + installationFee;
}