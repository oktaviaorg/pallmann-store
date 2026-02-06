import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";

const RESEND_WEBHOOK_SECRET = Deno.env.get('RESEND_WEBHOOK_SECRET');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey, svix-id, svix-timestamp, svix-signature",
};

async function verifyWebhookSignature(
  payload: string,
  headers: Headers
): Promise<boolean> {
  const svixId = headers.get('svix-id');
  const svixTimestamp = headers.get('svix-timestamp');
  const svixSignature = headers.get('svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) {
    console.error('Missing required webhook headers');
    return false;
  }

  if (!RESEND_WEBHOOK_SECRET) {
    console.error('RESEND_WEBHOOK_SECRET not configured');
    return false;
  }

  try {
    const signedContent = `${svixId}.${svixTimestamp}.${payload}`;
    const secret = RESEND_WEBHOOK_SECRET.replace('whsec_', '');

    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signature = await crypto.subtle.sign(
      'HMAC',
      key,
      new TextEncoder().encode(signedContent)
    );

    const expectedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)));
    const providedSignatures = svixSignature.split(' ');

    for (const sig of providedSignatures) {
      const [, providedSig] = sig.split(',');
      if (providedSig === expectedSignature) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return false;
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const payload = await req.text();
    const isValid = await verifyWebhookSignature(payload, req.headers);

    if (!isValid) {
      console.error('Invalid webhook signature');
      return new Response(
        JSON.stringify({ error: 'Invalid signature' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        }
      );
    }

    const event = JSON.parse(payload);
    console.log('Received webhook event:', event.type);

    const { error } = await supabase.from('email_webhook_logs').insert({
      event_type: event.type,
      event_data: event.data,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Error logging webhook event:', error);
    }

    return new Response(
      JSON.stringify({ success: true, type: event.type }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});