import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!)

serve(async () => {
  try {
    // Récupérer les emails non traités
    const { data: emails, error: fetchError } = await supabase
      .from('email_queue')
      .select('*')
      .eq('processed', false)
      .order('created_at', { ascending: true })
      .limit(10)

    if (fetchError) throw fetchError

    if (!emails || emails.length === 0) {
      return new Response(JSON.stringify({ message: 'No emails to process' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    // Traiter chaque email
    for (const email of emails) {
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: email.sender,
            to: email.recipient,
            reply_to: email.reply_to,
            subject: email.subject,
            text: email.body,
          }),
        })

        const data = await res.json()

        // Mettre à jour le statut de l'email
        const { error: updateError } = await supabase
          .from('email_queue')
          .update({
            processed: true,
            processed_at: new Date().toISOString(),
            error: res.ok ? null : JSON.stringify(data),
          })
          .eq('id', email.id)

        if (updateError) throw updateError
      } catch (error) {
        // Marquer l'email comme échoué
        await supabase
          .from('email_queue')
          .update({
            processed: true,
            processed_at: new Date().toISOString(),
            error: error.message,
          })
          .eq('id', email.id)
      }
    }

    return new Response(JSON.stringify({ message: 'Emails processed successfully' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})