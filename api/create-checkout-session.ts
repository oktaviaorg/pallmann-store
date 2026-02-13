import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY!
);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { items, customerInfo, companyCode, subtotalHT, discountAmount, shippingHT, totalHT, totalTTC } = req.body;

    // Créer les line items pour Stripe
    const lineItems = items.map((item: any) => {
      let unitPrice = item.price_ht;
      
      // Appliquer la remise si code pro
      if (companyCode && companyCode.discount_percent) {
        unitPrice = unitPrice * (1 - companyCode.discount_percent / 100);
      }
      
      // Ajouter TVA (Stripe attend le prix TTC en centimes)
      const unitPriceTTC = Math.round(unitPrice * 1.20 * 100);
      
      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
          },
          unit_amount: unitPriceTTC,
        },
        quantity: item.quantity,
      };
    });

    // Ajouter les frais de port si nécessaire
    if (shippingHT > 0) {
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Frais de livraison',
          },
          unit_amount: Math.round(shippingHT * 1.20 * 100),
        },
        quantity: 1,
      });
    }

    // Créer ou récupérer le client Stripe
    let customer;
    const existingCustomers = await stripe.customers.list({
      email: customerInfo.email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
      // Mettre à jour les infos si nécessaire
      await stripe.customers.update(customer.id, {
        name: customerInfo.name,
        phone: customerInfo.phone || undefined,
        address: {
          line1: customerInfo.address,
          city: customerInfo.city,
          postal_code: customerInfo.postalCode,
          country: 'FR',
        },
      });
    } else {
      customer = await stripe.customers.create({
        email: customerInfo.email,
        name: customerInfo.name,
        phone: customerInfo.phone || undefined,
        address: {
          line1: customerInfo.address,
          city: customerInfo.city,
          postal_code: customerInfo.postalCode,
          country: 'FR',
        },
      });
    }

    // Créer la session Stripe Checkout avec facturation automatique
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer: customer.id,
      success_url: `${req.headers.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/panier`,
      // Activer la génération automatique de factures
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: 'Commande Pallmann Store',
          footer: 'Pallmann Store - Groupe Epenon SARL - SIRET 832 059 513 00016 - TVA FR48832059513',
        },
      },
      metadata: {
        customer_name: customerInfo.name,
        customer_phone: customerInfo.phone || '',
        shipping_address: customerInfo.address,
        shipping_city: customerInfo.city || '',
        shipping_postal_code: customerInfo.postalCode || '',
        company_code: companyCode?.code || '',
        subtotal_ht: subtotalHT.toString(),
        discount_amount: discountAmount.toString(),
        shipping_ht: shippingHT.toString(),
        total_ht: totalHT.toString(),
        total_ttc: totalTTC.toString(),
      },
      shipping_address_collection: {
        allowed_countries: ['FR', 'BE', 'CH', 'LU', 'DE'],
      },
    });

    // Créer la commande en base (status pending)
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_email: customerInfo.email,
        customer_name: customerInfo.name,
        customer_phone: customerInfo.phone,
        shipping_address: customerInfo.address,
        shipping_city: customerInfo.city,
        shipping_postal_code: customerInfo.postalCode,
        company_code_id: companyCode?.id || null,
        subtotal_ht: subtotalHT,
        discount_amount: discountAmount,
        shipping_ht: shippingHT,
        total_ht: totalHT,
        total_ttc: totalTTC,
        stripe_session_id: session.id,
        payment_status: 'pending',
        order_status: 'pending',
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
    } else if (order) {
      // Ajouter les lignes de commande
      const orderItems = items.map((item: any) => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        unit_price_ht: item.price_ht,
        total_ht: item.price_ht * item.quantity,
      }));

      await supabase.from('order_items').insert(orderItems);
    }

    res.status(200).json({ sessionId: session.id });
  } catch (err: any) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: err.message });
  }
}
