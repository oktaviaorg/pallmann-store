import { FormData } from '../types/form';
import { supabase } from '../lib/supabase';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s+()-]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateStep = (step: number, data: any): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (step === 3) {
    if (!data.fullName || data.fullName.trim() === '') {
      errors.fullName = 'Le nom complet est requis';
    }
    if (!data.email || !validateEmail(data.email)) {
      errors.email = 'Email invalide';
    }
    if (!data.phone || !validatePhone(data.phone)) {
      errors.phone = 'Téléphone invalide';
    }
    if (!data.postalCode || data.postalCode.trim() === '') {
      errors.postalCode = 'Le code postal est requis';
    }
  }

  return errors;
};

export const calculatePrice = (data: FormData | { surface: number; serviceType?: string }): string => {
  const surface = data.surface;
  const serviceType = 'serviceType' in data ? data.serviceType : '';

  let basePrice = 42;

  if (serviceType === 'poncage_vitrification') {
    basePrice = 42;
  } else if (serviceType === 'poncage_huilage') {
    basePrice = 48;
  } else if (serviceType === 'escalier') {
    basePrice = 35;
  }

  const estimatedPrice = Math.round(surface * basePrice);

  return estimatedPrice.toLocaleString('fr-FR');
};

export const submitForm = async (data: any): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase
      .from('form_submissions')
      .insert([{
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        surface: data.surface,
        service_type: data.serviceType || 'poncage_vitrification',
        finish_type: data.finishType || 'mat',
        property_type: data.propertyType || 'maison',
        postal_code: data.postalCode,
        address: data.address || '',
        message: data.message || '',
        has_elevator: data.hasElevator || false,
        teinture: data.teinture || false,
        finition: data.finition || ''
      }]);

    if (error) throw error;

    await sendEmailNotification(data);

    return { success: true };
  } catch (error) {
    console.error('Form submission error:', error);
    return { success: false, error: 'Une erreur est survenue' };
  }
};

const sendEmailNotification = async (data: any) => {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    const response = await fetch(`${supabaseUrl}/functions/v1/send-form-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: 'julien.68@me.com',
        subject: `[Les Ponceurs Réunis] Nouvelle demande de devis - ${data.fullName}`,
        html: `
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
              .alert { background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
              .footer { background: #0f1b2b; color: #9bb0c3; padding: 15px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">📝 Nouvelle demande de devis</h1>
                <p style="margin: 5px 0 0 0; font-size: 14px;">Les Ponceurs Réunis</p>
              </div>

              <div class="content">
                <div class="alert">
                  ⚠️ <strong>Mode Test:</strong> Pour recevoir les emails sur contact@ponceur-parquet.fr, vérifiez votre domaine dans Resend.
                </div>

                <h2 style="color: #d9b45a; margin-top: 0;">Informations client</h2>

                <div class="field">
                  <span class="label">Nom complet:</span>
                  <span class="value">${data.fullName}</span>
                </div>

                <div class="field">
                  <span class="label">Email:</span>
                  <span class="value"><a href="mailto:${data.email}">${data.email}</a></span>
                </div>

                <div class="field">
                  <span class="label">Téléphone:</span>
                  <span class="value"><a href="tel:${data.phone}">${data.phone || 'Non renseigné'}</a></span>
                </div>

                <div class="field">
                  <span class="label">Code postal:</span>
                  <span class="value">${data.postalCode}</span>
                </div>

                <h2 style="color: #d9b45a; margin-top: 30px;">Détails du projet</h2>

                <div class="field">
                  <span class="label">Surface:</span>
                  <span class="value">${data.surface} m²</span>
                </div>

                <div class="field">
                  <span class="label">Type de service:</span>
                  <span class="value">${data.serviceType || 'Non renseigné'}</span>
                </div>

                <div class="field">
                  <span class="label">Type de finition:</span>
                  <span class="value">${data.finishType || 'Non renseigné'}</span>
                </div>

                ${data.message ? `
                <div class="field" style="margin-top: 20px;">
                  <span class="label" style="display: block; margin-bottom: 5px;">Message:</span>
                  <div style="background: white; padding: 15px; border-left: 3px solid #d9b45a; border-radius: 3px;">
                    ${data.message}
                  </div>
                </div>
                ` : ''}
              </div>

              <div class="footer">
                <p style="margin: 0;">Les Ponceurs Réunis</p>
                <p style="margin: 5px 0;">6 rue du Commerce, 68420 Herrlisheim-près-Colmar</p>
                <p style="margin: 5px 0;">📞 07 57 82 13 06 | 📧 contact@poncages.fr</p>
              </div>
            </div>
          </body>
          </html>
        `,
        replyTo: data.email,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Email notification failed:', errorText);
      throw new Error(`Email sending failed: ${errorText}`);
    }

    const result = await response.json();
    console.log('Email sent successfully:', result);
  } catch (error) {
    console.error('Error sending email notification:', error);
    throw error;
  }
};
