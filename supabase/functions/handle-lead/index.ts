import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface LeadPayload {
  source: string;
  service: string;
  surface: number;
  city: string;
  delay: string;
  housing: string;
  phone: string;
  email: string;
  message?: string;
  estimate_min: number;
  estimate_max: number;
  utm?: Record<string, string>;
  page?: string;
  created_at: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const payload: LeadPayload = await req.json();

    const postalCodeMap: Record<string, string> = {
      'Colmar': '68000',
      'Mulhouse': '68100',
      'Saint-Louis': '68300',
      'Guebwiller': '68500',
      'Thann': '68800',
      'Altkirch': '68130',
      'Autre (Haut‑Rhin)': '68000'
    };

    const postalCode = postalCodeMap[payload.city] || '68000';

    const fullName = `Lead ${payload.city}`;

    const { data, error } = await supabase
      .from('form_submissions')
      .insert([
        {
          full_name: fullName,
          phone: payload.phone,
          email: payload.email,
          postal_code: postalCode,
          surface: payload.surface,
          service_type: payload.service,
          property_type: payload.housing,
          message: payload.message ?
            `${payload.message}\n\nDélai: ${payload.delay}\nVille: ${payload.city}\nEstimation: ${payload.estimate_min}€ - ${payload.estimate_max}€\nSource: ${payload.source}`
            : `Délai: ${payload.delay}\nVille: ${payload.city}\nEstimation: ${payload.estimate_min}€ - ${payload.estimate_max}€\nSource: ${payload.source}`,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error inserting form submission:', error);
      throw error;
    }

    return new Response(
      JSON.stringify({ success: true, submission_id: data.id }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error('Form submission API error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
